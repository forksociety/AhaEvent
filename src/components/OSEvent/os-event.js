import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout } from 'antd'

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
              <p
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
              </p>
              <p style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px'
              }}>
                <iframe
                  title='Event Location'
                  width='80%' height='200' frameborder='0' style={{ border: 0 }} allowfullscreen
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234.1908612260695!2d-3.2093089999999993!3d55.94606379999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c7a3b32bf011%3A0xa023b5bcda49d536!2sEdinburgh+International+Conference+Centre%2C+150+Morrison+St%2C+Edinburgh+EH3+8EE%2C+UK!5e0!3m2!1sen!2sin!4v1526254117053'
                />

              </p>
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
