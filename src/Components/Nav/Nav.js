import React, {
  Component,
} from 'react';
import {
  Menu,
} from 'antd';
import {
  Link,
} from 'react-router-dom';
import cx from 'classnames';
import {
  bool,
} from 'prop-types';

import config from 'Config';
import Logo from 'Components/Logo';
import Icon from 'Components/Icon';

import styles from './Nav.module.scss';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getLink(data) {
    const { link, text, icon } = data;
    const target = this.isRedirectLink(link) ? '_blank' : null;

    return (
      <Link to={link} title={text} target={target}>
        <Icon type={icon} className={styles.icon} />
      </Link>
    );
  }

  getNavItems() {
    const { showLogo } = this.props;
    const menuData = config.get('menu');
    const items = [];
    const showOnMobile = ['home', 'send', 'github'];

    menuData.forEach((item) => {
      const link = this.getLink(item);
      const { icon } = item;


      items.push(
        <Menu.Item
          key={icon}
          className={cx(
            styles.item,
            styles.right,
            {
              [styles['hide-on-mobile']]: !showOnMobile.includes(icon),
            },
          )}
        >
          {link}
        </Menu.Item>,
      );
    });

    if (showLogo) {
      items.push(
        <Menu.Item
          key="logo"
          className={cx(styles.item, styles.left)}
        >
          <Link to="/">
            <Logo className={styles.logo} />
          </Link>
        </Menu.Item>,
      );
    }

    return items;
  }

  isRedirectLink(link) {
    const redirectUrls = config.get('redirectUrls');
    return (
      link.indexOf('http://') !== -1
      || link.indexOf('https://') !== -1
      || link.substring(1) in redirectUrls
    );
  }

  render() {
    const menuItems = this.getNavItems();

    return (
      <nav className={styles.menu}>
        <Menu
          className={styles['aha-menu']}
          selectedKeys={['home']}
          mode="horizontal"
        >
          {menuItems}
        </Menu>
      </nav>
    );
  }
}

Nav.propTypes = {
  showLogo: bool,
};

Nav.defaultProps = {
  showLogo: true,
};

export default Nav;
