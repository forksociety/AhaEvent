import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout } from 'antd'

const { Footer } = Layout

class CustomFooter extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Footer style={{ background: '#e0e0e0' }}>
        <div className='footer-left'>
          <a href='/submitevent' target='_blank'>
            Submit a FLOSS Event
          </a>|
          <a href='/report' target='_blank'>
            Report an Issue
          </a>|
          <a href={`mailto:${ config.get('appAuthorEmail') }`} target='_blank'>
            Contact Us
          </a>|
          <a href='/credits' target='_blank'>
            Credits
          </a>
        </div>
        <div className='footer-right'>
          <a href={config.get('appAuthorSite')} target='_blank'>
            { config.get('appAuthor') }
          </a> |
          <a href='/license' target='_blank'>
            {config.get('license')}
          </a>
        </div>
      </Footer>
    )
  }
}

export default CustomFooter
