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
      <Footer style={{ textAlign: 'center' }}>
        <a href={config.get('appAuthorSite')} target='_blank'>
          { config.get('appAuthor') }
        </a> | {config.get('license')}
      </Footer>
    )
  }
}

export default CustomFooter
