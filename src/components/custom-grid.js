import React, { Component } from 'react';
import { Layout, Row, Col, Card, Icon, Badge } from 'antd';
import moment from 'moment';

const { Meta } = Card;
const { Content } = Layout;

class CustomGrid extends Component {
    render() {
        let intents = [];
        this.props.items.forEach(function(e) {
            let startDate = moment(e.timestamp.start);
            let endDate = moment(e.timestamp.end);
            let dateString = startDate.format('Do MMM') + ' - ' + endDate.format('Do MMM YYYY');
            let url = '/' + e.url;
            let altText = e.name + ' Cover Image';
            let locationLink = 'https://www.google.com/maps/search/?api=1&query=' + e.location;

            intents.push(
                    <Col span={8} key={ e.eventId }>
                            <span className="custom-badges">
                                    <Badge count={0}>
                                        <a href={ e.links.website } target="_blank"><Icon type="link" /></a>
                                    </Badge>
                            </span>
                            <Card
                                hoverable
                                cover={ <img alt={ altText } src={ e.links.coverImg } /> }
                            >
                                <Meta
                                    className="custom-meta"
                                    title={ <a href={ url }>{ e.name }</a> }
                                    description={
                                        <span>
                                            <div>
                                                <a href={ locationLink } target="_blank">
                                                    <Icon type="environment-o" />
                                                    { e.location }
                                                </a>
                                            </div>
                                            <div>{ dateString }</div>
                                        </span>
                                    }
                                />
                            </Card>
                    </Col>
                );
        })
        return (
             <Content style={{ padding: '0 50px' }}>
                <Row gutter={16} justify="center">
                    { intents }
                </Row>
            </Content>
        );
    }
}

export default CustomGrid;
