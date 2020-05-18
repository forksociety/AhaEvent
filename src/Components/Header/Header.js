import React, { Component } from 'react';
import config from 'react-global-configuration';

import Nav from 'Components/Nav';
import Logo from 'Components/Logo';
import Form from 'Components/Form';

import styles from './Header.module.scss';

const { SearchBox } = Form;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  getSearchBox() {
    return (
      <div className={styles.search}>
        <SearchBox
          onSearch={(value) => this.onSearch(value)}
        />
      </div>
    )
  }

  getBanner() {
    return (
      <span className={styles.banner}>
        <Logo className={styles.logo} />
        <span className={styles.tagline}>
          {config.get('tagline')}
        </span>
        {this.getSearchBox()}
      </span>
    );
  }

  render() {
    const { showBanner } = this.props;
    return (
      <header className={styles['awesome-header']}>
        <Nav showLogo={!showBanner} />
        {showBanner && this.getBanner()}
      </header>
    );
  }
}

export default Header;
