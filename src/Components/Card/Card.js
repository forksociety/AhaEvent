import React, {
  PureComponent,
} from 'react';
import Icon from 'Components/Icon';

import styles from './Card.module.scss';

class CustomCard extends PureComponent {
  getCoverStyle(cover, color) {
    return cover.length > 0
      ? ({
        background: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundColor: color,
      }) : ({
        backgroundColor: color,
      });
  }

  handleClick(e, newTab = false) {
    if (newTab) {
      window.open(this.props.websiteLink, '_blank');
    } else {
      window.location = this.props.link;
    }
  }

  render() {
    const { cover, logo, link, title, subTitle, description } = this.props;

    if (!title) {
      return null;
    }

    const { image: coverImage, bgColor } = cover;
    const overlay = coverImage.length > 0 ? (<div className="overlay" />) : null;

    return (
      <div className={styles.card}>
        <div
          onClick={(e) => this.handleClick(e)}
          className={styles.cover}
          style={this.getCoverStyle(coverImage, bgColor)}
        >
          {overlay}
          <div className={styles.icons}>
            <Icon onClick={(e) => this.handleClick(e, true)} type="link" />
          </div>
          <img alt={`${title} logo`} src={logo} />
        </div>
        <div
          className={styles['card-content']}
          style={{
            padding: '20px',
          }}
        >
          <a href={link} className={styles.title}>{title}</a>
          <div className={styles['sub-title']}>{subTitle}</div>
          <div>{description}</div>
        </div>
      </div>
    );
  }
}

export default CustomCard;
