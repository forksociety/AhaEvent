import React, {
  PureComponent,
} from 'react';

import styles from './Card.module.scss';

class CustomCard extends PureComponent {
  getCoverStyle(cover, color) {
    return cover && cover.length > 0
      ? ({
        background: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundColor: color,
      }) : ({
        backgroundColor: color,
      });
  }

  render() {
    const { cover, coverBgColor, logo, title, subTitle, description, onClick } = this.props;
    const overlay = cover && cover.length > 0 ? (<div className="overlay" />) : null;

    if (!title) {
      return null;
    }

    return (
      <div className={styles.card}>
        <div
          onClick={onClick}
          className={styles.cover}
          style={this.getCoverStyle(cover, coverBgColor)}
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
          <span className={styles.title}>{title}</span>
          <div className={styles['sub-title']}>{subTitle}</div>
          <div>{description}</div>
        </div>
      </div>
    );
  }
}

export default CustomCard;
