from git import Repo
import re
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from dotenv import load_dotenv
import os
import requests
import sys
import json

def getChangedFiles(response):
    changedFileList = []
    try:
        data = response.json()
        for item in data:
            changedFileList.append(item['filename'])
        return changedFileList
    except:
        return []

def filterChangedFiles(changedFiles):
    filteredFiles = []
    regex = "^events/.*\.json$"
    for file in changedFiles:
        if re.search(regex, file):
            filteredFiles.append(file)
    return filteredFiles

def checkExists(db, event):
    existingDocs = []
    query = db.collection('events').where('name', '==', event['name'])
    existingDocs = [snapshot.reference for snapshot in query.stream()]
    if len(existingDocs) == 0:
        return False
    else:
        return existingDocs

def createEvent(db, event):
    try:
        eventRef = db.collection('events').document()
        eventId = eventRef.id
        event['id'] = eventId
        eventRef.set(event)
        print("Created event:", event['name'])
    except:
        print("Could not make entry to the database.")
    
def deleteEvent(existingDocs):
    for doc in existingDocs:
        try:
            name = doc.get().to_dict()['name']
            doc.delete()
            print("Deleted event:", name)
        except:
            print("Could not delete event.")
    


def getResponseFromMessage(message):
    prNumber = int(message.split(' ')[3].strip('#'))
    baseURL = 'https://api.github.com/repos/'+ os.getenv('GITHUB_REPOSITORY') +'/pulls/'
    response = requests.get(url=baseURL + str(prNumber) + '/files')
    return response

def createCertificate():
    serviceAccount = json.loads(os.getenv('SERVICE_ACCOUNT'))
    return serviceAccount

def saveCertificate(serviceAccount):
    f = open('serviceAccount.json', 'w')
    json.dump(serviceAccount, f)

def deploy(message):
    print("Merge to master detected. Starting deployment.")
    response = getResponseFromMessage(message)
    changedFiles = getChangedFiles(response)
    changedFiles = filterChangedFiles(changedFiles)
    print("Changed files:", changedFiles)
    saveCertificate(createCertificate())
    cred = credentials.Certificate('serviceAccount.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    for file in changedFiles:
        f = open(file, 'r')
        event = json.loads(f.read())
        existingDocs = checkExists(db, event)
        if not existingDocs:
            createEvent(db, event)
        else:
            print("Found existing event. Overwriting.")
            deleteEvent(existingDocs)
            createEvent(db, event)

def travis(repopulate=False):
    if repopulate:
        print('Repopulating Database.')
        cred = credentials.Certificate('serviceAccount.json')
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        files = os.listdir('events')
        for file in files:
            f = open(os.path.join('events', file) , 'r')
            event = json.loads(f.read())
            existingDocs = checkExists(db, event)
            if not existingDocs:
                createEvent(db, event)
            else:
                print("Found existing event. Overwriting.")
                deleteEvent(existingDocs)
                createEvent(db, event)
    else:
        repo = Repo('./')
        assert not repo.bare
        message = repo.git.log('-1', '--pretty=%B')
        if re.search("^Merge pull request #*", message):
            deploy(message)

if __name__ == '__main__':
    if os.getenv('SEED_DATABASE'):
        travis(repopulate=True)
    else:
        travis()
