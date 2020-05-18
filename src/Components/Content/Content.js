import React, {
  PureComponent,
} from 'react';
import cx from 'classnames';

import styles from './Content.module.scss';

class Content extends PureComponent {
  render() {
    const { children, className } = this.props;
    return (
      <span className={cx(styles.main, className)}>
        {children}
      </span>
    );
  }
}

export default Content;
