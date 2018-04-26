import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout } from 'antd'

import DocumentMeta from '../../components/DocumentMeta/document-meta'
import CustomMenu from '../../components/CustomMenu/custom-menu'
import OSEvent from '../../components/OSEvent/os-event'

class EventPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      metaData: {}
    }
  }

  render () {
    return (
      <Layout style={{ background: '#f0f2f5' }}>
        <Layout className='awesome-bg'>
          <DocumentMeta {...this.state.metaData} />
          <CustomMenu />
          <span className='logo'>{config.get('siteName')}</span>
          <p className='tagline'>{config.get('siteTagline')}</p>
        </Layout>
        <OSEvent {...this.props.match.params} />
      </Layout>
    )
  }
}

export default EventPage
