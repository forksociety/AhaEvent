import React, { Component } from 'react'
import { Layout } from 'antd'

import CustomMenu from '../../components/CustomMenu/custom-menu'
import OSEvent from '../../components/OSEvent/os-event'
import CustomFooter from '../../components/CustomFooter/custom-footer'

class EventPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let menuProps = {
      showLogo: true
    }
    return (
      <Layout style={{ background: '#f0f2f5' }}>
        <Layout className='awesome-header'>
          <CustomMenu {...menuProps} />
        </Layout>
        <OSEvent {...this.props.match.params} />
        <CustomFooter />
      </Layout>
    )
  }
}

export default EventPage
