const moment = require('moment')
const airtable = require('airtable')

const configFile = require('../config/config')

class AirtableModel {
  constructor() {
    this.config = configFile

    const filterKeys = this.config.apiRequest.filters
    this.airtableBase = new airtable({apiKey: this.config.airtable.apiKey})
      .base(this.config.airtable.base)

    this.airtableSchema = {
      name: "Name",
      organization: "Organization",
      location: "Location",
      description: "Description",
      keywords: "Keywords",
      eventStartDate: "Event Start Date",
      eventEndDate: "Event End Date",
      cfpStartDate: "Call For Proposals Start Date",
      cfpEndDate: "Call For Proposals End Date",
      logo: "Logo",
      coverImage: "Cover Image",
      coverBackgroundColor: "Cover Background Color",
      website: "Website",
      registerLink: "Registration Link",
      cfpLink: "Call For Proposals Link",
      twitter: "Twitter Handle",
    }

    this.airtableFilterQueries = {}
    this.airtableFilterQueries[filterKeys.ALL_EVENTS] = ''
    this.airtableFilterQueries[filterKeys.ENDED_EVENTS] = `DATETIME_DIFF({${this.airtableSchema.eventEndDate}}, TODAY(), "days") < 0`
    this.airtableFilterQueries[filterKeys.CFP_OPEN] = `DATETIME_DIFF({${this.airtableSchema.cfpEndDate}}, TODAY(), "days") >= 0`

    this.selectData = {
      view: this.config.airtable.views.allEvents,
      sort: [{
        field: this.airtableSchema.eventStartDate,
        direction: 'asc'
      }],
      filterByFormula: `DATETIME_DIFF({${this.airtableSchema.eventEndDate}}, TODAY(), "days") >= 0`
    }

    this.eventTagsFound = []

    this.data = []
  }

  parseRecords(records, callback) {
    let self = this
    let eJsonKeys = this.config.eventJsonKeys

    records.forEach((record) => {
      let logo = record.get(this.airtableSchema.logo)
      logo = logo ? logo[0].url : ""

      let coverImage = record.get(this.airtableSchema.coverImage)
      coverImage = coverImage ? coverImage[0].url : ""

      let e = {}
      e[eJsonKeys.EID.k] = record.get(this.airtableSchema.name).toLowerCase().split(' ').join('-')
      e[eJsonKeys.NAME.k] = record.get(this.airtableSchema.name)
      e[eJsonKeys.ORGANIZATION.k] = record.get(this.airtableSchema.organization)
      e[eJsonKeys.LOCATION.k] = record.get(this.airtableSchema.location)
      e[eJsonKeys.DESCRIPTION.k] = record.get(this.airtableSchema.description)

      e[eJsonKeys.TIMESTAMP.k] = {}
      e[eJsonKeys.TIMESTAMP.k][eJsonKeys.TIMESTAMP_EVENT_START.k] = record.get(this.airtableSchema.eventStartDate)
      e[eJsonKeys.TIMESTAMP.k][eJsonKeys.TIMESTAMP_EVENT_END.k] = record.get(this.airtableSchema.eventEndDate)
      e[eJsonKeys.TIMESTAMP.k][eJsonKeys.TIMESTAMP_CFP_START.k] = record.get(this.airtableSchema.cfpStartDate)
      e[eJsonKeys.TIMESTAMP.k][eJsonKeys.TIMESTAMP_CFP_END.k] = record.get(this.airtableSchema.cfpEndDate)

      e[eJsonKeys.RESOURCES.k] = {}
      e[eJsonKeys.RESOURCES.k][eJsonKeys.LOGO.k] = logo
      e[eJsonKeys.RESOURCES.k][eJsonKeys.COVER_IMAGE.k] = coverImage
      e[eJsonKeys.RESOURCES.k][eJsonKeys.COVER_COLOR.k] = record.get(this.airtableSchema.coverBackgroundColor)

      e[eJsonKeys.LINKS.k] = {}
      e[eJsonKeys.LINKS.k][eJsonKeys.LINK_WEBSITE.k] = record.get(this.airtableSchema.website)
      e[eJsonKeys.LINKS.k][eJsonKeys.LINK_REGISTER.k] = record.get(this.airtableSchema.registerLink)
      e[eJsonKeys.LINKS.k][eJsonKeys.LINK_CFP.k] = record.get(this.airtableSchema.cfpLink)

      e[eJsonKeys.SOCIAL.k] = {}
      e[eJsonKeys.SOCIAL.k][eJsonKeys.SOCIAL_TWITTER.k] = record.get(this.airtableSchema.twitter)

      self.eventTagsFound = self.eventTagsFound.concat(record.get(this.airtableSchema.keywords))
      self.data.push(e);
    });
    callback()
  }

  fetchDataFromAirtable(callback, finish) {
    let self = this
    this.airtableBase(this.config.airtable.tables.flossEvents)
      .select(this.selectData)
      .eachPage((records, callback) => {
        self.parseRecords(records, callback)
      }, (err) => {
        if (err) {
          console.log('Error while fetching data from airtable', err)
          finish()
        } else { finish() }
    });
  }

  fetchEvents(
    queryParams = {
      filtersSet: {},
      tagsSet: {},
      sortByValue: "",
      startIndex: 0,
      endIndex: this.config.eventsPerPage - 1
    },
    callback
  ) {

    let filters = []
    const filterKeys = this.config.apiRequest.filters
    const sortByKeys = this.config.apiRequest.sortBy
    switch(queryParams.sortByValue) {
      case sortByKeys.DATE_DES:
        this.selectData.sort = [{
          field: this.airtableSchema.eventStartDate,
          direction: 'desc'
        }]
        break
      case sortByKeys.CFP_ASC:
        filters.push(this.airtableFilterQueries[filterKeys.CFP_OPEN])
        this.selectData.sort = [{
          field: this.airtableSchema.cfpEndDate,
          direction: 'asc'
        }]
        break
      case sortByKeys.CFP_DES:
        filters.push(this.airtableFilterQueries[filterKeys.CFP_OPEN])
        this.selectData.sort = [{
          field: this.airtableSchema.cfpEndDate,
          direction: 'desc'
        }]
        break
      default:
        break
    }

    if (queryParams.filtersSet.has(filterKeys.ALL_EVENTS) && queryParams.filtersSet.size === 1) {
      filters.push('1')
    } else {
      for (let i of queryParams.filtersSet) {
        if (i in this.airtableFilterQueries && this.airtableFilterQueries[i]) {
          filters.push(this.airtableFilterQueries[i])
        }
      }
    }
    for (let i of queryParams.tagsSet) {
      filters.push(`Find(LOWER("${i}"), LOWER(Keywords)) > 0`)
    }
    this.selectData.filterByFormula = filters.length
      ? `AND(${filters.toString()})`
      : this.selectData.filterByFormula

    this.fetchDataFromAirtable(this.fetchDataFromAirtable, () => {
      let eventsData = this.data.slice(queryParams.startIndex, queryParams.endIndex+1)
      let tags = Array.from(new Set(this.eventTagsFound))
      callback({
        tags: tags,
        data: eventsData
      })
    })
  }

  fetchEvent(eId,callback) {
    eId = eId.split('-').join(" ")
    this.selectData.sort = []
    this.selectData.filterByFormula = `LOWER(Name) = LOWER("${eId}")`

    this.fetchDataFromAirtable(this.fetchDataFromAirtable, () => {
      callback(this.data)
    })
  }
}

module.exports = AirtableModel
