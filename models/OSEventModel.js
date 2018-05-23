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
    this.eventData.meta = {
      defaultCoverImage: config.osEventDefaults.coverImage,
      eventUrl: config.slugs.event + this.eventData[this.eJsonKeys.EID],
      completeUrl: config.appUrl + config.slugs.event + this.eventData[this.eJsonKeys.EID],
      googleMapsUrl: config.osEventDefaults.googleMapsUrl + this.eventData[this.eJsonKeys.LOCATION]
    }
  }

  getEid() {
    return this.eventData[this.eJsonKeys.EID]
  }

  getName() {
    return this.eventData[this.eJsonKeys.NAME]
  }

  getOrganisation() {
    return this.eventData[this.eJsonKeys.ORGANIZATION]
  }

  getKeywords() {
    return this.eventData[this.eJsonKeys.KEYWORDS]
  }

  getLocation() {
    return this.eventData[this.eJsonKeys.LOCATION]
  }

  getDescription() {
    return this.eventData[this.eJsonKeys.DESCRIPTION]
  }

  getStartDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP][this.eJsonKeys.TIMESTAMP_EVENT_DATE][this.eJsonKeys.TIMESTAMP_START]
  }

  getEndDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP][this.eJsonKeys.TIMESTAMP_EVENT_DATE][this.eJsonKeys.TIMESTAMP_END]
  }

  getCfpStartDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP][this.eJsonKeys.TIMESTAMP_CFP][this.eJsonKeys.TIMESTAMP_START]
  }

  getCfpEndDate() {
    return this.eventData[this.eJsonKeys.TIMESTAMP][this.eJsonKeys.TIMESTAMP_CFP][this.eJsonKeys.TIMESTAMP_END]
  }

  getLogo() {
    return this.eventData[this.eJsonKeys.RESOURCES][this.eJsonKeys.LOGO]
  }

  getCoverImage() {
    return (this.hasCover())
      ? this.eventData[this.eJsonKeys.RESOURCES][this.eJsonKeys.COVER_IMAGE]
      : this.eventData.meta.defaultCoverImage
  }

  getCoverBackgroundColor() {
    return this.eventData[this.eJsonKeys.RESOURCES][this.eJsonKeys.COVER_COLOR]
      ? this.eventData[this.eJsonKeys.RESOURCES][this.eJsonKeys.COVER_COLOR]
      : this.defaultVal.coverBackgroundColor
  }

  getWebsite() {
    return this.eventData[this.eJsonKeys.LINKS][this.eJsonKeys.LINK_WEBSITE]
  }

  getRegisterLink() {
    return this.eventData[this.eJsonKeys.LINKS][this.eJsonKeys.LINK_REGISTER]
  }

  getCfpLink() {
    return this.eventData[this.eJsonKeys.LINKS][this.eJsonKeys.LINK_CFP]
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
    return this.eventData.meta.completeUrl
  }

  getEventUrl() {
    return this.eventData.meta.eventUrl
  }

  getGoogleMapUrl() {
    return this.eventData.meta.googleMapsUrl
  }

  hasCover() {
    let has = (typeof this.eventData[this.eJsonKeys.RESOURCES] !== 'undefined'
      && typeof this.eventData[this.eJsonKeys.RESOURCES][this.eJsonKeys.COVER_IMAGE] !== 'undefined'
      && this.eventData[this.eJsonKeys.RESOURCES][this.eJsonKeys.COVER_IMAGE].length > 0
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
