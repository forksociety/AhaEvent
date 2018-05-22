import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout, Row, Col, Button, notification, message } from 'antd'
import moment from 'moment'

import GoogleMap from '../../components/GoogleMap/google-map'
import DocumentMeta from '../../components/DocumentMeta/document-meta'
import { defaultResponse, generateResponse } from '../DefaultResponse/default-response'

class OSEvent extends Component {
  constructor (prop) {
    super(prop)
    this.state = {
      eventEnded: false,
      cfpEnded: false,
      metaData: {},
      event: {},
      component: [],
      eId: this.props.eUrl,
      api: config.get('api'),
      appStrings: config.get('appStrings')
    }
    notification.config({
      placement: 'bottomLeft'
    })
  }

  generateApiUrl () {
    return this.state.api.eventUrl + this.state.eId
  }

  componentWillMount () {
    const hide = message.loading(this.state.appStrings.LOADING_TEXT, 0)
    setTimeout(hide, 500)
    this._loadContent()
  }

  _loadContent () {
    fetch(this.generateApiUrl())
      .then(results => {
        if (results.status === 200) return results.json()
        else { return generateResponse(false, results.status, defaultResponse.httpError) }
      }).then(data => {
        if (data.success) {
          let e = data.extras.event
          let slugs = config.get('slugs')
          this.setState({metaData: {
            title: e.name,
            ogUrl: config.get('domain') + slugs.event + e.eId,
            keywords: e.keywords
          }})

          this.setState({event: e})
          let bgColor = (e.resources.coverBackgroundColor)
            ? e.resources.coverBackgroundColor
            : '#ffffff'

          let startDate = moment(e.timestamp.eventDate.start)
          let endDate = moment(e.timestamp.eventDate.end)
          let dateString = startDate.format('Do MMM') + ' - ' +
            endDate.format('Do MMM YYYY')

          let cfpStartDate = moment(e.timestamp.cfp.start)
          let cfpEndDate = moment(e.timestamp.cfp.end)
          let cfpDateString = 'CFP: ' + cfpStartDate.format('Do MMM') +
            ' - ' + cfpEndDate.format('Do MMM YYYY')

          this.setState({eventEnded: endDate.diff(moment(new Date()), 'days') < 0})
          this.setState({cfpEnded: cfpEndDate.diff(moment(new Date()), 'days') < 0})

          let overlay = (e.resources.coverImage.length > 0)
            ? <div className='overlay' /> : ''

          let buttons = []
          if (e.links.website) {
            buttons.push(<Button
              key='website'
              type='primary'
              href={e.links.website}
              target='_blank'
              style={{ marginRight: '10px' }}
            >
              Website
            </Button>)
          }
          if (e.links.register) {
            if (this.state.eventEnded) {
              buttons.push(<Button
                key='register'
                type='dashed'
                href={e.links.register}
                target='_blank'
                style={{ marginRight: '10px' }}
                disabled
              >
                Register (Closed)
              </Button>)
            } else {
              buttons.push(<Button
                key='register'
                type='primary'
                href={e.links.register}
                target='_blank'
                style={{ marginRight: '10px' }}
              >
                Register
              </Button>)
            }
          } else {
            buttons.push(<Button
              key='register'
              style={{ marginRight: '10px' }}
              ghost
              disabled
            >
              Register (Coming Soon)
            </Button>)
          }
          if (e.links.cfp) {
            if (this.state.cfpEnded) {
              buttons.push(<Button
                key='cfp'
                type='dashed'
                href={e.links.cfp}
                target='_blank'
                disabled
              >
                Call for Proposals (Closed)
              </Button>)
            } else {
              buttons.push(<Button
                key='cfp'
                type='primary'
                href={e.links.cfp}
                target='_blank'
              >
                Call for Proposals
              </Button>)
            }
          }

          if (this.state.eventEnded) {
            notification['warning']({
              message: e.name + ' has ended',
              description: 'Some links might not work.',
              duration: 10
            })
          }
          this.setState({component: [
            <Row key='os-event' className='os-event'>
              <Col
                span={10}
                xs={24}
                sm={24}
                md={24}
                lg={10}
                xl={10}
                className='os-event-cover'
                style={e.resources.coverImage.length > 0 ? {
                  background: `url(${e.resources.coverImage}) no-repeat center center fixed`,
                  backgroundSize: 'cover',
                  backgroundColor: bgColor
                } : {
                  backgroundColor: bgColor
                }}
              >
                {overlay}
                <div className='event-logo-container' style={{ zIndex: '999' }}>
                  <img src={e.resources.logo} alt={`${e.name} Logo`} />
                </div>
              </Col>
              <Col
                className='content'
              >
                <h2 style={{ marginBottom: '0px' }}>{e.name}</h2>
                <h4>{dateString}</h4>
                <h4>{e.organization}</h4>
                <div className='description'>{e.description}</div>
                <div><b>Call For Proposals: </b>{cfpDateString}</div>
                <div style={{
                  paddingBottom: '20px'
                }}><b>Location: </b>{e.location}</div>
                <div style={{
                  paddingBottom: '20px'
                }}>
                  {buttons}
                </div>
                <GoogleMap location={e.location} height='200px' />
              </Col>
            </Row>
          ]})
        } else {
          console.log(data)
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <Layout className='layout' style={{ background: '#ffffff', margin: '20px 20px' }}>
        <DocumentMeta {...this.state.metaData} />
        {this.state.component}
      </Layout>
    )
  }
}
export default OSEvent
