import React from 'react';
import { Row } from 'antd';
import cx from 'classnames';

import styles from './Row.module.scss';

const CustomRow = ({ className, children, ...rest }) => (
  <Row className={cx(styles.row, className)} {...rest}>
    {children}
  </Row>
);

export default CustomRow;
