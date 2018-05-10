import React, { Component } from 'react'
import { Layout, Row, Col, Card, Icon, Badge } from 'antd'
import moment from 'moment'
import config from 'react-global-configuration'

const { Meta } = Card
const { Content } = Layout

class CustomGrid extends Component {
  render () {
    let intents = []
    let slugs = config.get('slugs')
    let osEventDefaults = config.get('osEventDefaults')

    for (var key in this.props.items) {
      let e = this.props.items[key]

      let startDate = moment(e.timestamp.start)
      let endDate = moment(e.timestamp.end)
      let dateString =
        startDate.format('Do MMM') + ' - ' + endDate.format('Do MMM YYYY')

      let cfpStartDate = moment(e.cfp.timestamp.start)
      let cfpEndDate = moment(e.cfp.timestamp.end)
      let cfpDateString =
        'CFP: ' + cfpStartDate.format('Do MMM') + ' - ' + cfpEndDate.format('Do MMM YYYY')

      let url = slugs.event + e.eId
      let coverImgAltText = e.name + ' Cover Image'
      let logoAltText = e.name + ' Logo'
      let locationLink = osEventDefaults.googleMapsUrl + e.location

      let coverComponent = <img alt={coverImgAltText} src={osEventDefaults.coverImage} />
      if (e.links.coverImg.length > 0 &&
        (e.links.coverImg.indexOf('http://') !== -1 ||
          e.links.coverImg.indexOf('https://') !== -1)
      ) {
        coverComponent = <img alt={coverImgAltText} src={e.links.coverImg} />
      }
      intents.push(
        <Col
          span={8}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={6}
          key={e.eId}
          style={{ marginBottom: '15px' }}
        >
          <span className='custom-badges'>
            <Badge count={0}>
              <a href={e.links.website} target='_blank'>
                <Icon type='link' />
              </a>
            </Badge>
          </span>
          <span className='event-logo'>
            <span>
              <img src={e.links.logo} alt={logoAltText} />
            </span>
          </span>
          <Card
            hoverable
            cover={coverComponent}
          >
            <Meta
              className='custom-meta'
              title={<a href={url}>{e.name}</a>}
              description={
                <span>
                  <div>
                    <a href={locationLink} target='_blank'>
                      <Icon type='environment-o' />
                      {e.location}
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
