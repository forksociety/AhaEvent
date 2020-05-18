import React from 'react';
import { Spin } from 'antd';

import Icon from 'Components/Icon';

import styles from './Loader.module.scss';

const Loader = () => {
  const icon = (<Icon type="loader" />);
  return (
    <span className={styles.loader}>
      <Spin className={styles.icon} indicator={icon} />
      <span>Loading...</span>
    </span>
  );
};

export default Loader;
