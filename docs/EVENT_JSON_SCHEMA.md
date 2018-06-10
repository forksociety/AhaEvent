# Event JSON Schema

```
{
    "EVENT_ID": {
        "eId": EVENT_ID,
        "name": EVENT_NAME,
        "organization": ORG_NAME,
        "keywords": KEYWORDS,
        "location": LOCATION_NAME,
        "description": DESCRIPTION,
        "timestamp": {
          "eventStart": START_DATE_TIMESTAMP,
          "eventEnd": END_DATE_TIMESTAMP,
          "cfpStart": CFP_START_TIMESTAMP,
          "cfpEnd": CFP_END_TIMESTAMP
        },
        "resources": {
          "logo": LOGO_URL,
          "coverImage": COVER_IMG_URL,
          "coverBackgroundColor": BG_HEX_CODE
        },
        "links": {
          "website": WEBSITE_URL,
          "register": REGISTRATION_URL,
          "cfp": CALL_FOR_PROPOSAL_URL
        },
        "social": {
          "twitter": TWITTER_USERNAME
        }
    }
}
```

### About Keys Used in the above Schema

| Key                   | Mandatory | Description | Example |
|-----------------------|-----------|-------------|---------|
| EVENT_ID              | Yes       | Unique event ID | See Below |
| EVENT_NAME            | Yes       | Name of the event in English | Open Source Summit 2018                                                                  |
| ORG_NAME              | Yes       | Name of the organisation related to the event | The Linux Foundation                                                            |
| KEYWORDS              | Yes       | Key words related to the event  | `open source summit, open source, japan, os summit, summit 2018` |
| LOCATION_NAME         | Yes       | Location where the event is going to take place.| Tokyo Conference Center Ariake, Tokyo, Japan |
| DESCRIPTION           | Yes       | The description of the event. | Open Source Summit Japan is the leading conference in Japan connecting the open source ecosystem under one roof, providing a forum for technologists and open source industry leaders to collaborate and share information, learn about the latest in open source technologies and find out how to gain a competitive advantage by using innovative open solutions. |
| START_DATE_TIMESTAMP  | Yes       | Timestamp of the day and time at which the event start.| 1529433000000 for 20th June 2018 |
| END_DATE_TIMESTAMP    | Yes       | Timestamp of the day and time at which the event ends.| 1529433000000 for 20th June 2018 |
| CFP_START_TIMESTAMP   | Yes       | Timestamp at which the call for proposals will open.| 1529433000000 for 20th June 2018 |
| CFP_END_TIMESTAMP     | Yes       | Timestamp at which the call for proposals will close.| 1529433000000 for 20th June 2018 |
| LOGO_URL              | Yes       | Complete link of the event's logo. If not available, logo of the organization can be used. | https://events.linuxfoundation.org/wp-content/uploads/2017/11/logo_ossummit_jp.png |
| COVER_IMG_URL         | No       | A cover image to show on event card. It can be an image of the event or the city hosting it. Don't use someone's IP without permission | https://events.linuxfoundation.org/wp-content/uploads/2017/11/tokyo-2.jpg |
| BG_HEX_CODE           | No       | Background Hex color code if background is missing | `#ffffff` for white |
| WEBSITE_URL           | Yes       | Complete website link of the event| https://events.linuxfoundation.org/events/open-source-summit-japan-2018/ |
| REGISTRATION_URL      | No       | Complete event registration link. If registrations are not open yet, please mention in your pull request. Tentative date can be added in pull request.| https://events.linuxfoundation.org/events/open-source-summit-japan-2018/attend/register/ |
| CALL_FOR_PROPOSAL_URL | Yes       | Complete link to the call for proposal landing page.| https://events.linuxfoundation.org/events/open-source-summit-japan-2018/program/cfp/ |
| TWITTER_USERNAME      | No        | Twitter username of the event                  | linuxfoundation for https://twitter.com/linuxfoundation |


### Event ID

Currently EVENT_ID is just URL_SLUG.

| Key                   | Mandatory | Description | Example |
|-----------------------|-----------|-------------|---------|
| URL_SLUG              | Yes       | URL slug for the event. It should meet the following conditions: i) All characters must be small ii) It should include event name and year only. iii) Space can be replaced by a dash ( '-' ) only. | open-source-summit-2018 |
