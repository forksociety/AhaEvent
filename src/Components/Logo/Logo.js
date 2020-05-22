import React, {
  PureComponent,
} from 'react';
import cx from 'classnames';
import {
  string,
} from 'prop-types';

import config from 'Config';

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
Logo.propTypes = {
  className: string,
};

Logo.defaultProps = {
  className: '',
};


export default Logo;
