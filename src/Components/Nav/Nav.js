import React, {
  Component,
} from 'react';
import {
  Menu,
} from 'antd';
import config from 'react-global-configuration';
import cx from 'classnames';
import {
  bool,
} from 'prop-types';

import Logo from 'Components/Logo';
import Icon from 'Components/Icon';

import style from './Nav.module.scss';


class Nav extends Component {
  static isRedirectLink(link) {
    const redirectUrls = config.get('redirectUrls');
    return (
      link.indexOf('http://') !== -1 || link.indexOf('https://') !== -1 || link.substring(1) in redirectUrls
    );
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getLink(data) {
    const { link, text, icon } = data;
    const target = this.isRedirectLink(link) ? '_blank' : null;

    return (
      <a href={link} title={text} target={target}>
        <Icon type={icon} className={style.icon} />
      </a>
    );
  }

  getNavItems() {
    const { showLogo } = this.props;
    const menuData = config.get('menu');
    const items = [];

    menuData.forEach((e) => {
      const link = this.getLink(e);

      items.push(
        <Menu.Item
          key={e.icon}
          className={cx(style.item, style.right)}
        >
          {link}
        </Menu.Item>,
      );
    });

    if (showLogo) {
      items.push(
        <Menu.Item
          key="logo"
          className={cx(style.item, style.left)}
        >
          <a href="/">
            <Logo className={style.logo} />
          </a>
        </Menu.Item>,
      );
    }

    return items;
  }

  render() {
    const menuItems = this.getNavItems();

    return (
      <nav className={style.menu}>
        <Menu
          className={style['aha-menu']}
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
