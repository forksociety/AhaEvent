import React, { Component } from 'react'
import { Layout, Row, Col, Icon } from 'antd'
import config from 'react-global-configuration'

import CustomCard from '../CustomCard/custom-card'
import OSEventModel from '../../models/OSEventModel'

const { Content } = Layout

class CustomGrid extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let api = config.get('api')
    let intents = []
    for (let key in this.props.items) {
      let osEvent = new OSEventModel(this.props.items[key])

      let title = osEvent.getName()
      let subTitle = <a href={api.googleMapsUrl + osEvent.getLocation()} target='_blank'>
        <Icon type='environment-o' />
        {osEvent.getLocation()}
      </a>
      let description = <div>
        {osEvent.getDateString()} <br />
          CFP: {osEvent.getCfpDateString()}
      </div>
      let cardLink = osEvent.getEventUrl()
      let cover = {
        image: osEvent.getCoverImage(),
        bgColor: osEvent.getCoverBackgroundColor()
      }
      let logo = <img alt={`${osEvent.getName()} logo`} src={osEvent.getLogo()} />
      let websiteLink = osEvent.getWebsite()

      let cardDetails = {
        title, subTitle, description, cardLink, cover, logo, websiteLink
      }

      intents.push(
        <Col
          span={8}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={6}
          key={osEvent.getEid()}
          style={{ marginBottom: '15px' }}
        >
          <CustomCard {...cardDetails} />
        </Col>
      )
    }
    return (
      <Content style={{ padding: '0 50px', marginBottom: '20px' }}>
        <Row gutter={16} justify='center'>
          {intents}
        </Row>
      </Content>
    )
  }
}

export default CustomGrid
