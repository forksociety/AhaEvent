import React from 'react';
import {
  Row,
} from 'antd';
import cx from 'classnames';
import {
  node, string, arrayOf, oneOfType,
} from 'prop-types';

import styles from './Row.module.scss';

const CustomRow = ({ className, children, ...rest }) => (
  <Row className={cx(styles.row, className)} {...rest}>
    {children}
  </Row>
);

CustomRow.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  className: string,
};

CustomRow.defaultProps = {
  className: '',
};

export default CustomRow;
