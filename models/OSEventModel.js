const moment = require('moment')
const configFile = require('../config/config')

// firebase/backend works on es5 and and frontend is on es6
// due to this module exports work differently.
// TODO: improve this structure
const config = (typeof configFile.default !== 'undefined')
  ? configFile.default
  : configFile

class OSEventModel {
  constructor(e) {
    this.defaultVal = {
      coverBackgroundColor: '#ffffff'
    }

    this.eJsonKeys = config.appStrings.eventJsonKeys
    this.eventData = e
    this.eventeMetaData = {
      defaultCoverImage: config.osEventDefaults.coverImage,
      eventUrl: config.slugs.event + '/' + this.eventData[this.eJsonKeys.EID.k],
      completeUrl: config.appUrl + config.slugs.event + this.eventData[this.eJsonKeys.EID.k],
      googleMapsUrl: config.osEventDefaults.googleMapsUrl + this.eventData[this.eJsonKeys.LOCATION.k]
    }
  }

  whatsMissing(sampleEvent = {}) {
    let missingKeys = []
    let emptyObject = (obj) => {
      return (Object.keys(obj).length === 0 && obj.constructor === Object)
    }

    let isValid = (a,b) => {
      if(typeof a === 'string')
        return (typeof b === 'string' && b.length >0)

      if(!isNaN(a))
        return (!isNaN(b) && b > 0)

      if(typeof a === 'object' && typeof b === 'object') {
        if(!emptyObject(b)) {
          let keys = Object.keys(b)
          for(let i of keys) {
            let f = isValid(a[i], b[i])
            if(!f) {
              missingKeys.push(i)
            }
          }
          return true
        }
      }
      return false
    }

    let e = this.eventData
    for(let k in sampleEvent) {
      if(typeof sampleEvent[k] !== typeof e[k]) {
        missingKeys.push(k)
      }
      if(!isValid(sampleEvent[k], e[k])) {
        missingKeys.push(k)
      }
    }

    let missingItems = []
    for(let i of Object.keys(this.eJsonKeys)) {
      let item = this.eJsonKeys[i]
      if(missingKeys.indexOf(item.k) !== -1) {
        missingItems.push({text: item.text, mandatory: item.mandatory})
      }
    }
    return missingItems
  }

  getEid() {
    return this.eventData[this.eJsonKeys.EID.k]
  }

  getName() {
    return this.eventData[this.eJsonKeys.NAME.k]
  }

  getOrganisation() {
    return this.eventData[this.eJsonKeys.ORGANIZATION.k]
  }

  getKeywords() {
    return this.eventData[this.eJsonKeys.KEYWORDS.k]
  }

  getLocation() {
    return this.eventData[this.eJsonKeys.LOCATION.k]
  }

  getDescription() {
    return this.eventData[this.eJsonKeys.DESCRIPTION.k]
  }

  getStartDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP.k][this.eJsonKeys.TIMESTAMP_EVENT_START.k]
  }

  getEndDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP.k][this.eJsonKeys.TIMESTAMP_EVENT_END.k]
  }

  getCfpStartDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP.k][this.eJsonKeys.TIMESTAMP_CFP_START.k]
  }

  getCfpEndDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP.k][this.eJsonKeys.TIMESTAMP_CFP_END.k]
  }

  getLogo() {
    return this.eventData[this.eJsonKeys.RESOURCES.k][this.eJsonKeys.LOGO.k]
  }

  getCoverImage() {
    return (this.hasCover())
      ? this.eventData[this.eJsonKeys.RESOURCES.k][this.eJsonKeys.COVER_IMAGE.k]
      : this.eventeMetaData.defaultCoverImage
  }

  getCoverBackgroundColor() {
    return this.eventData[this.eJsonKeys.RESOURCES.k][this.eJsonKeys.COVER_COLOR.k]
      ? this.eventData[this.eJsonKeys.RESOURCES.k][this.eJsonKeys.COVER_COLOR.k]
      : this.defaultVal.coverBackgroundColor
  }

  getWebsite() {
    return this.eventData[this.eJsonKeys.LINKS.k][this.eJsonKeys.LINK_WEBSITE.k]
  }

  getRegisterLink() {
    return this.eventData[this.eJsonKeys.LINKS.k][this.eJsonKeys.LINK_REGISTER.k]
  }

  getCfpLink() {
    return this.eventData[this.eJsonKeys.LINKS.k][this.eJsonKeys.LINK_CFP.k]
  }

  getTwitterLink() {
    return (this.eventData[this.eJsonKeys.SOCIAL.k][this.eJsonKeys.SOCIAL_TWITTER.k])
      ? 'https://twitter.com/'
        + this.eventData[this.eJsonKeys.SOCIAL.k][this.eJsonKeys.SOCIAL_TWITTER.k]
      : ''
  }

  getDateString() {
    let startDate = moment(this.getStartDate())
    let endDate = moment(this.getEndDate())
    return (startDate.format('Do MMM') + ' - ' + endDate.format('Do MMM YYYY'))
  }

  getCfpDateString() {
    let startDate = moment(this.getCfpStartDate())
    let endDate = moment(this.getCfpEndDate())
    return (startDate.format('Do MMM') + ' - ' + endDate.format('Do MMM YYYY'))
  }

  getCompleteUrl() {
    return this.eventeMetaData.completeUrl
  }

  getEventUrl() {
    return this.eventeMetaData.eventUrl
  }

  getGoogleMapUrl() {
    return this.eventeMetaData.googleMapsUrl
  }

  hasCover() {
    let has = (typeof this.eventData[this.eJsonKeys.RESOURCES.k] !== 'undefined'
      && typeof this.eventData[this.eJsonKeys.RESOURCES.k][this.eJsonKeys.COVER_IMAGE.k] !== 'undefined'
      && this.eventData[this.eJsonKeys.RESOURCES.k][this.eJsonKeys.COVER_IMAGE.k].length > 0
    ) ? true : false
    return has
  }

  hasEventEnded() {
    let endDate = moment(this.getEndDate())
    return (endDate.diff(moment(new Date()), 'days') < 0)
  }

  hasCfpEnded() {
    let endDate = moment(this.getCfpEndDate())
    return (endDate.diff(moment(new Date()), 'days') < 0)
  }
}

module.exports = OSEventModel
