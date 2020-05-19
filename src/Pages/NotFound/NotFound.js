import React from 'react';

import Content from 'Components/Content';

import styles from './NotFound.module.scss';

const NotFound = () => (
  <main>
    <Content className={styles['not-found']}>
      404
    </Content>
  </main>
);

export default NotFound;
