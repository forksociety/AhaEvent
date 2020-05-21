import React, {
  PureComponent,
} from 'react';
import cx from 'classnames';

import {
  getCoverStyle, getOverlay,
} from 'Utils';

import styles from './Card.module.scss';

class CustomCard extends PureComponent {
  render() {
    const { cover, coverBgColor, logo, title, subTitle, description, onClick } = this.props;
    const overlay = getOverlay(cover);

    if (!title) {
      return null;
    }

    return (
      <div
        className={styles.card}
        onClick={onClick}
      >
        <div
          className={styles.cover}
          style={getCoverStyle(cover, coverBgColor)}
        >
          {overlay}
          <div className={styles.icons}>
            {
              // removed icons
            }
          </div>
          <img alt={`${title} logo`} src={logo} />
        </div>
        <div
          className={styles['card-content']}
          style={{
            padding: '20px',
          }}
        >
          <span className={cx(styles.title, styles['hide-overflow'])}>{title}</span>
          <div className={cx(styles['sub-title'], styles['hide-overflow'])}>{subTitle}</div>
          <div className={styles['hide-overflow']}>{description}</div>
        </div>
      </div>
    );
  }
}

export default CustomCard;
