import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout } from 'antd'

import GoogleMap from '../../components/GoogleMap/google-map'
import DocumentMeta from '../../components/DocumentMeta/document-meta'
import { defaultResponse, generateResponse } from '../DefaultResponse/default-response'

const { Content } = Layout

class OSEvent extends Component {
  constructor (prop) {
    super(prop)
    this.state = {
      metaData: {},
      event: {},
      component: [],
      eId: this.props.eUrl,
      api: config.get('api')
    }
  }

  generateApiUrl () {
    return this.state.api.eventUrl + this.state.eId
  }

  componentWillMount () {
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
          let bgColor = (
            typeof e.resources.coverBackgroundColor !== 'undefined' &&
            e.resources.coverBackgroundColor.length > 0
          ) ? e.resources.coverBackgroundColor : '#cccccc'

          this.setState({component: [
            <div key='os-event'>
              <span
                className='os-event-cover'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  background: `url(${e.resources.coverImage}) no-repeat center center fixed`,
                  backgroundSize: 'cover',
                  backgroundColor: bgColor
                }}
              >
                <div className='event-logo-container'>
                  <img src={e.resources.logo} alt={`Logo ${e.name}`} />
                </div>
              </span>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px'
              }}>
                <GoogleMap {...{ location: e.location }} />
              </span>
            </div>
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
        <Content style={{ color: '#000' }}>
          <div style={{
            background: '#fff',
            minHeight: 280
          }}>
            {this.state.component}
          </div>
        </Content>
        <DocumentMeta {...this.state.metaData} />
      </Layout>
    )
  }
}
export default OSEvent
