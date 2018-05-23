npm install && cd functions && npm install && cd ../
npm install -g gulp-cli firebase-tools
npm run build-all

if [ ! -f ".env.local" ]
then
  cp .env .env.local
fi

if [ $# -eq 1 ]
then
  firebase use $1
  firebase serve
else
  echo 'Please provide firebase project id. Eg. ./init.sh <project-id>'
fi
