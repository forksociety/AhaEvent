import React, {
  PureComponent,
} from 'react';
import {
  Layout,
} from 'antd';
import config from 'react-global-configuration';

import styles from './Footer.module.scss';

const { Footer: AntFooter } = Layout;

class Footer extends PureComponent {
  getItems() {
    const leftItems = [
      {
        text: 'About',
        link: '#about',
      },
      {
        text: 'Submit a FLOSS Event',
        link: '/submit-event',
      },
      {
        text: 'Report an Issue',
        link: '/report',
        target: '_blank',
      },
      {
        text: 'Contact Us',
        link: '/mail',
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
      <a key={link} href={link} target={target} className={styles.item}>
        {text }
      </a>
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
