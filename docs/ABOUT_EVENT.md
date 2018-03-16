# Event JSON Schema

### What type of events can be showcased on AhaEvent.org?

For an event to be showcased on AhaEvent.org, following conditions must be met:
- It should be an open source related event.
- It should include talks on Free/Libre/Open Source Software (FLOSSS) projects.
- It should have definite start and end date for call for proposals.
- Duration of the event must be 2 days or more.


### Basic JSON structure as follows:

```
{
    "EVENT_ID": {
        "eventId": EVENT_ID,
        "name": EVENT_NAME,
        "url": URL_SLUG,
        "timestamp": {
            "start": START_DATE_TIMESTAMP,
            "end": END_DATE_TIMESTAMP
        },
        "location": LOCATION_NAME,
        "geolocation": {
            "longitude": LONGITUDE,
            "latitude": LATITUDE
        },
        "links": {
            "website": WEBSITE_URL,
            "register": REGISTRATION_URL,
            "coverImg": COVER_IMG_URL
        },
        "cfp": {
            "timestamp": {
                "start": CFP_START_TIMESTAMP,
                "end": CFP_END_TIMESTAMP
            },
            "cfp": CALL_FOR_PROPOSAL_URL
        }
    }
}
```

### About Keys Used in the above Schema

| Key                   | Mandatory | Description | Example |
|-----------------------|-----------|-------------|---------|
| EVENT_ID              | Yes       | Unique event ID | See Below |
| EVENT_NAME            | Yes       | Name of the event in English | Open Source Summit 2018                                                                  |
| URL_SLUG              | Yes       | URL slug for the event. It should meet the following conditions: i) All characters must be small ii) It should include event name, city and year only. iii) Space can be replaced by a dash ( '-' ) only. | open-source-summit-tokyo-2018 |
| START_DATE_TIMESTAMP  | Yes       | Timestamp of the day and time at which the event starts.| 1529433000000 for 20th June 2018 10 AM |
| END_DATE_TIMESTAMP    | Yes       | Timestamp of the day and time at which the event ends.| 1529433000000 for 20th June 2018 10 AM |
| LOCATION_NAME         | Yes       | Location where the event is going to take place.| Tokyo Conference Center Ariake, Tokyo, Japan |
| LONGITUDE/LATITUDE    | Yes       | Longitude/Latitude of the location. In case the coordinates are not available, city coordinates can be provided.| 139.6917 / 35.6895 |
| WEBSITE_URL           | Yes       | Complete website link of the event| https://events.linuxfoundation.org/events/open-source-summit-japan-2018/ |
| REGISTRATION_URL      | Yes       | Complete event registration link| https://events.linuxfoundation.org/events/open-source-summit-japan-2018/attend/register/ |
| COVER_IMG_URL         | Yes       | A cover image to show on event card. This must be a link posted on the event's website.| https://events.linuxfoundation.org/wp-content/uploads/2017/11/tokyo-2.jpg |
| CFP_START_TIMESTAMP   | Yes       | Timestamp at which the call for proposals will open.| 1529433000000 for 20th June 2018 10 AM |
| CFP_END_TIMESTAMP     | Yes       | Timestamp at which the call for proposals will close.| 1529433000000 for 20th June 2018 10 AM |
| CALL_FOR_PROPOSAL_URL | Yes       | Complete link to the call for proposal landing page.| https://events.linuxfoundation.org/events/open-source-summit-japan-2018/program/cfp/ |


