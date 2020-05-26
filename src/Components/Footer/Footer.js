import React, {
  PureComponent,
} from 'react';
import {
  Layout,
} from 'antd';

import config from 'Config';
import Link from 'Components/Link';

import styles from './Footer.module.scss';

const { Footer: AntFooter } = Layout;

class Footer extends PureComponent {
  getItems() {
    const appAuthorEmail = config.get('appAuthorEmail');
    const leftItems = [
      {
        text: 'Submit an Event',
        link: '/submit-event',
      },
      {
        text: 'Report an Issue',
        link: '/report',
        target: '_blank',
      },
      {
        text: 'Contact Us',
        link: `mailto:${appAuthorEmail}`,
        target: '_blank',
      },
    ];

    const rightItems = [
      {
        text: config.get('appAuthor'),
        link: config.get('appAuthorSite'),
        target: '_blank',
      },
      {
        text: config.get('license'),
        link: '/license',
        target: '_blank',
      },
    ];

    return {
      leftItems, rightItems,
    };
  }

  render() {
    const { leftItems, rightItems } = this.getItems();
    const renderItem = ({ text, link, target }) => (
      <Link key={link} to={link} className={styles.item} target={target}>
        {text}
      </Link>
    );

    const renderItems = (items) => {
      const len = items.length;
      return items.map((item, i) => {
        const isNotLast = (len - 1) !== i;
        return (
          <span key={i}>
            {renderItem(item)}
            {isNotLast && ' | '}
          </span>
        );
      });
    };

    return (
      <AntFooter className={styles.footer}>
        <span>
          {renderItems(leftItems)}
        </span>
        <span>
          {renderItems(rightItems)}
        </span>
      </AntFooter>
    );
  }
}

export default Footer;
