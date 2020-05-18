import React, {
  PureComponent,
} from 'react';
import {
  Col,
} from 'antd';

import Content from 'Components/Content';
import Row from 'Components/Row';

import styles from './Grid.module.scss';

class Grid extends PureComponent {
  getIntents() {
    const { items } = this.props;
    return items.map((item, i) => (
      <Col
        span={8}
        xs={24}
        sm={24}
        md={8}
        lg={8}
        xl={6}
        key={`grid-ele-${i}`}
        className={styles.col}
      >
        {item}
      </Col>
    ));
  }

  render() {
    const intents = this.getIntents();
    return (
      <Content className={styles.grid}>
        <Row gutter={16}>
          {intents}
        </Row>
      </Content>
    );
  }
}

export default Grid;
