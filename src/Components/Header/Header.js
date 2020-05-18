import React, { Component } from 'react';
import { Button } from 'antd';

import style from './Header.module.scss';

import Menu from 'Components/Menu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={style['awesome-header']}>
        <Menu showLogo={true} />
      </div>
    );
  }
}

export default Header;
