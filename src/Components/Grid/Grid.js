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
    const { items, colInfo } = this.props;

    const colProps = colInfo || {
      span: 8,
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
    };
    return items.map((item, i) => (
      <Col
        {...colProps}
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
