import React, { Component } from 'react';
import { Button } from 'antd';

import Menu from 'Components/Menu';
import style from './Header.module.scss';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={style['awesome-header']}>
        <Menu showLogo />
      </div>
    );
  }
}

export default Header;
