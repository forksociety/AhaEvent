import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout, Row, Col, Button, message } from 'antd'

import GoogleMap from '../../components/GoogleMap/google-map'
import DocumentMeta from '../../components/DocumentMeta/document-meta'
import { generateResponse, showNotification } from '../../models/Utils'

import OSEventModel from '../../models/OSEventModel'

class OSEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      metaData: {},
      event: {},
      component: [],
      eId: this.props.eUrl,
      api: config.get('api'),
      appStrings: config.get('appStrings')
    }
    this.getButton = this.getButton.bind(this)
    this.generateApiUrl = this.generateApiUrl.bind(this)
  }

  getButton(i) {
    if (i.href) {
      return (<Button
          key={i.key}
          type={i.type}
          href={i.href}
          target='_blank'
          style={{ marginRight: '10px' }}
          disabled={i.disabled}
          ghost={i.ghost}
        >
          {i.text}
        </Button>)
    }
    return (<Button
        key={i.key}
        type={i.type}
        target='_blank'
        style={{ marginRight: '10px' }}
        disabled={i.disabled}
        ghost={i.ghost}
      >
        {i.text}
      </Button>)
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
        else {
          return generateResponse(
            false,
            results.status,
            this.state.appStrings.error.HTTP_ERROR
          )
        }
      }).then(data => {
        if (data.success) {
          let osEvent = new OSEventModel(data.extras.event)
          let dateString = osEvent.getDateString()
          let cfpDateString = osEvent.getCfpDateString()
          let website = osEvent.getWebsite()
          let registerLink = osEvent.getRegisterLink()
          let cfpLink = osEvent.getCfpLink()
          let overlay = (osEvent.hasCover()) ? <div className='overlay' /> : ''

          this.setState({event: osEvent})
          this.setState({metaData: {
            title: osEvent.getName(),
            ogUrl: osEvent.getCompleteUrl(),
            keywords: osEvent.getKeywords()
          }})

          let buttonComponents = []
          let defaultButton = {
            key: '',
            type: 'primary',
            href: '',
            text: 'button',
            disabled: false,
            ghost: false
          }

          if (website) {
            let websiteButton = {...defaultButton}
            websiteButton.key = 'website'
            websiteButton.href = website
            websiteButton.text = 'Website'
            buttonComponents.push(this.getButton(websiteButton))
          }

          let registerButton = {...defaultButton}
          registerButton.key = 'register'
          if (registerLink) {
            registerButton.href = registerLink
            registerButton.text = 'Register'
            if (osEvent.hasEventEnded()) {
              registerButton.type = 'dashed'
              registerButton.disabled = true
              registerButton.text = 'Register (Closed)'
            }
          } else {
            registerButton.ghost = true
            registerButton.disabled = true
            registerButton.text = 'Register (Coming Soon)'
          }
          buttonComponents.push(this.getButton(registerButton))

          if (cfpLink) {
            let cfpButton = {...defaultButton}
            cfpButton.key = 'cfp'
              cfpButton.href = cfpLink
              cfpButton.text = 'Call for Proposals'
              if (osEvent.hasCfpEnded()) {
                cfpButton.type = 'dashed'
                cfpButton.disabled = true
                cfpButton.text = 'Call for Proposals (Closed)'
              }
            buttonComponents.push(this.getButton(cfpButton))
          }

          if (osEvent.hasEventEnded()) {
            showNotification(
              osEvent.getName() + ' has ended',
              'Some links might not work.'
            )
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
                style={osEvent.hasCover() ? {
                  background: `url(${osEvent.getCoverImage()}) no-repeat center center fixed`,
                  backgroundSize: 'cover',
                  backgroundColor: osEvent.getCoverBackgroundColor()
                } : {
                  backgroundColor: osEvent.getCoverBackgroundColor()
                }}
              >
                {overlay}
                <div className='event-logo-container' style={{ zIndex: '999' }}>
                  <img src={osEvent.getLogo()} alt={`${osEvent.getName()} Logo`} />
                </div>
              </Col>
              <Col
                className='content'
              >
                <h2 className="tac" style={{ marginBottom: '0px' }}>{osEvent.getName()}</h2>
                <h4 className="tac">{dateString}</h4>
                <h4 className="tac">{osEvent.getOrganisation()}</h4>
                <div className='description'>{osEvent.getDescription()}</div>
                <div><b>Call For Proposals: </b>{cfpDateString}</div>
                <div style={{
                  paddingBottom: '20px'
                }}><b>Location: </b>{osEvent.getLocation()}</div>
                <div style={{
                  paddingBottom: '20px'
                }}>
                  {buttonComponents}
                </div>
                <GoogleMap location={osEvent.getLocation()} height='200px' />
              </Col>
            </Row>
          ]})
        } else {
          this.setState({component: [
            <Row key='os-event' className='os-event'></Row>
          ]})

          showNotification(
            data.extras.message,
            (data.extras.message ? data.extras.message : this.state.appStrings.error.SOMETHING_WRONG)
          )
        }
      }).catch((error) => {
        this.setState({component: [
          <Row key='os-event' className='os-event'></Row>
        ]})

        showNotification(
          this.state.appStrings.error.NETWORK_ERROR,
          error.toString()
        )
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
