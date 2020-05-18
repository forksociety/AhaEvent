import React, { PureComponent } from 'react';
import cx from 'classnames';
import config from 'react-global-configuration';

import style from './Logo.module.scss';

class Logo extends PureComponent {
  render() {
    const { className } = this.props;
    return (
      <span className={cx(style.logo, className)}>
        {config.get('appName')}
      </span>
    );
  }
}

export default Logo;
