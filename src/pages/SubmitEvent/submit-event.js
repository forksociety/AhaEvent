import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Layout, Form, Input, message } from 'antd'

import DocumentMeta from '../../components/DocumentMeta/document-meta'
import CustomMenu from '../../components/CustomMenu/custom-menu'
import CustomFooter from '../../components/CustomFooter/custom-footer'

class SubmitEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      metaData: {},
      formComponents: [],
      appStrings: config.get('appStrings')
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillMount () {
    const hide = message.loading(this.state.appStrings.LOADING_TEXT, 0)
    setTimeout(hide, 500)

    let formElements = []
    let eventName = <Input key='name' placeholder='Basic usage' />
    formElements.push(eventName)

    this.setState({formComponents: formElements})
  }

  handleFormItemChange () {
    console.log('on change')
  }

  handleFormSubmit () {
    console.log('submit')
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
          minHeight: '300px',
          alignText: 'center'
        }}>
          <h2>Event Details</h2>
          <Form onSubmit={this.handleSubmit}>
            {this.state.formComponents}
          </Form>
        </Layout>
        <CustomFooter />
      </Layout>
    )
  }
}

export default SubmitEvent
