import React, { Component } from 'react';
import { Menu, Modal } from 'antd';
import config from 'react-global-configuration';
import cx from 'classnames';

import Logo from 'Components/Logo';
import Icon from 'Components/Icon';

import style from './Menu.module.scss';

class CustomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  isRedirectLink(link) {
    const redirectUrls = config.get('redirectUrls');
    return (
      link.indexOf('http://') !== -1 || link.indexOf('https://') !== -1 || link.substring(1) in redirectUrls
    );
  }

  getLink(data) {
    const { link, text, icon } = data;

    return (
      <a href={link} title={text} target={this.isRedirectLink(link)}>
        <Icon type={icon} className={style.icon} />
      </a>
    );
  }

  getMenuItems() {
    const { showLogo } = this.props;
    const menuData = config.get('menu');
    const leftItems = [];
    const rightItems = [];

    menuData.forEach((e) => {
      const link = this.getLink(e);

      rightItems.push(
        <Menu.Item
          key={e.icon}
          className={cx(style.item, style.right)}
        >
          {link}
        </Menu.Item>,
      );
    });

    if (showLogo) {
      leftItems.push(
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

    return [...leftItems, ...rightItems];
  }

  render() {
    const menuItems = this.getMenuItems();

    return (
      <div className={style.menu}>
        <Menu
          className={style['aha-menu']}
          selectedKeys={['home']}
          mode="horizontal"
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

export default CustomMenu;
