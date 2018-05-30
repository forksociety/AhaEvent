import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout, message } from 'antd'

import DocumentMeta from '../../components/DocumentMeta/document-meta'
import CustomMenu from '../../components/CustomMenu/custom-menu'
import CustomFooter from '../../components/CustomFooter/custom-footer'

class Page404 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      metaData: {},
      appStrings: config.get('appStrings')
    }
  }

  componentWillMount () {
    const hide = message.loading(this.state.appStrings.LOADING_TEXT, 0)
    setTimeout(hide, 500)
  }

  render () {
    let menuProps = {
      showLogo: true
    }

    return (
      <Layout style={{ background: '#f0f2f5' }}>
        <DocumentMeta {...this.state.metaData} />
        <Layout className='awesome-header box-shadow'>
          <CustomMenu {...menuProps} />
        </Layout>
        <Layout style={{
          background: '#ffffff',
          margin: '20px',
          padding: '20px',
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1>404</h1>
          <h3>Oops! not found. Let's go <a href='/'>home</a></h3>
        </Layout>
        <CustomFooter />
      </Layout>
    )
  }
}

export default Page404
