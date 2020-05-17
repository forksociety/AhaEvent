import React, { PureComponent } from 'react';

import style from './Logo.module.scss';

class Logo extends PureComponent {
  render() {
    return (
      <span className={style.logo}>AhaEvent</span>
    )
  }
}

export default Logo;
