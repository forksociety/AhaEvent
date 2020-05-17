import React, { Component } from 'react';
import { Menu, Modal } from 'antd';
import config from 'react-global-configuration';

import Logo from 'Components/Logo';
import Icon from 'Components/Icon';

import style from './Menu.module.scss';

class CustomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getMenuItems() {
    const menuData = config.get('menu');
    const menuBarItems = {
      left: [],
      right: [],
    };
    menuData.forEach((e) => {
      let menuItemLink = (
        <a href={e.link} title={e.text}>
          <Icon type={e.icon} />
        </a>
      );

      const redirectUrls = config.get('redirectUrls');

      // if url refers to a different domain, open in a new tab
      if (e.link.indexOf('http://') !== -1
        || e.link.indexOf('https://') !== -1
        || e.link.substring(1) in redirectUrls
      ) {
        menuItemLink = (
          <a href={e.link} title={e.text} target="_blank">
            <Icon type={e.icon} />
          </a>
        );
      }

      menuBarItems.right.push(
        <Menu.Item
          key={e.icon}
          style={{
            float: 'right',
            color: '#fff',
            fontSize: '150%',
            borderBottom: '0px',
            padding: '0 10px 0px 0px',
          }}
        >
          {menuItemLink}
        </Menu.Item>,
      );
    });
    if (this.props.showLogo) {
      console.log('#########', this.props)
      menuBarItems.left.push(
        <Menu.Item
          key="logo"
          className="logo"
          style={{
            float: 'left',
            color: '#fff',
            fontSize: '150%',
            borderBottom: '0px',
            padding: '0 0px 0px 20px',
          }}
        >
          <a href="/">
            <Logo />
        </a>
        </Menu.Item>,
      );
    }

    return menuBarItems;
  }

  render() {
    const menuItems = this.getMenuItems();
    const { left: leftMenuItems, right: rightMenuItems } = menuItems;

    return (
      <div className={style.menu}>
        <Menu
          className={style["aha-menu"]}
          selectedKeys={['home']}
          mode="horizontal"
        >
          {leftMenuItems}
          {rightMenuItems}
        </Menu>
      </div>
    );
  }
}

export default CustomMenu;
