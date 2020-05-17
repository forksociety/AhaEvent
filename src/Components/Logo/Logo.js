import React, { PureComponent } from 'react';
import cx from 'classnames';

import style from './Logo.module.scss';

class Logo extends PureComponent {
  render() {
    const { className } = this.props;
    return (
      <span className={cx(style.logo, className)}>AhaEvent</span>
    );
  }
}

export default Logo;
