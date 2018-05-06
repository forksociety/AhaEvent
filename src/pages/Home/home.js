import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout } from 'antd'

import DocumentMeta from '../../components/DocumentMeta/document-meta'
import OSEvents from '../../components/OSEvents/os-events'
import CustomMenu from '../../components/CustomMenu/custom-menu'
import CustomFooter from '../../components/CustomFooter/custom-footer'

class HomePage extends Component {
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
          <span className='logo'>{config.get('appName')}</span>
          <p className='tagline'>{config.get('appTagline')}</p>
        </Layout>
        <OSEvents />
        <CustomFooter />
      </Layout>
    )
  }
}

export default HomePage
