import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout } from 'antd'

import { defaultResponse, generateResponse } from '../DefaultResponse/default-response'

const { Content } = Layout

class OSEvent extends Component {
  constructor (prop) {
    super(prop)
    this.state = {
      event: {},
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
          this.setState({event: e})
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
        <Content style={{ padding: '0 50px', color: '#000' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {this.state.event.name}
          </div>
        </Content>
      </Layout>
    )
  }
}
export default OSEvent
