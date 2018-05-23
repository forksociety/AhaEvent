import React, { Component } from 'react'
import { Layout, Row, Col, Card, Icon, Badge } from 'antd'

import OSEventModel from '../../models/OSEventModel'

const { Meta } = Card
const { Content } = Layout


class CustomGrid extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let intents = []

    if (this.props.items.length === 1 &&
      typeof this.props.items[0]['success'] !== 'undefined' &&
      !this.props.items[0]['success']
    ) {
      intents = [
        <div
          key='empty-response'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          No event found. Try another combination of filters.
        </div>
      ]
    } else {
      for (var key in this.props.items) {
        let osEvent = new OSEventModel(this.props.items[key])

        let name = osEvent.getName()
        let dateString = osEvent.getDateString()
        let cfpDateString = 'CFP: ' + osEvent.getCfpDateString()
        let url = osEvent.getEventUrl()
        let coverImgAltText = name + ' Cover Image'
        let logoAltText = name + ' Logo'
        let locationLink = osEvent.getGoogleMapUrl()
        let coverComponent = <img alt={coverImgAltText} src={osEvent.getCoverImage()} />

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
            <span className='custom-badges'>
              <Badge count={0}>
                <a href={osEvent.getWebsite()} target='_blank'>
                  <Icon type='link' />
                </a>
              </Badge>
            </span>
            <span className='event-logo'>
              <span>
                <img src={osEvent.getLogo()} alt={logoAltText} />
              </span>
            </span>
            <Card
              hoverable
              cover={coverComponent}
            >
              <Meta
                className='custom-meta'
                title={<a href={url}>{name}</a>}
                description={
                  <span>
                    <div>
                      <a href={locationLink} target='_blank'>
                        <Icon type='environment-o' />
                        {osEvent.getLocation()}
                      </a>
                    </div>
                    <div>{dateString}</div>
                    <div>{cfpDateString}</div>
                  </span>
                }
              />
            </Card>
          </Col>
        )
      }
    }
    return (
      <Content style={{ padding: '0 50px' }}>
        <Row gutter={16} justify='center'>
          {intents}
        </Row>
      </Content>
    )
  }
}

export default CustomGrid
