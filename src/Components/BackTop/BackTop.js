import React from 'react';
import {
  BackTop,
} from 'antd';

import Icon from 'Components/Icon';
import styles from './BackTop.module.scss';

const CustomBackTop = () => (
  <BackTop>
    <div className={styles.backtop}>
      <Icon type="up-caret" />
    </div>
  </BackTop>
);

export default CustomBackTop;
