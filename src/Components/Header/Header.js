import React, {
  Component,
} from 'react';
import config from 'react-global-configuration';

import Nav from 'Components/Nav';
import Logo from 'Components/Logo';
import Form from 'Components/Form';

import styles from './Header.module.scss';

const { SearchBox } = Form;

class Header extends Component {
  constructor(props) {
    super(props);
    const sortBy = config.get('sortBy');
    this.state = {
      searchInfo: {
        query: '',
        sortBy: sortBy.DATE_ASC,
        filters: [],
      },
    };
  }

  componentDidMount() {
  }

  onSearch(searchQuery) {
    const { searchInfo: { query: prevQ, sortBy: prevS, filters: prevF } } = this.state;
    const { query, sortBy, filter } = searchQuery;
    if (filter) {
      const { key, value } = filter;
      if (value) {
        prevF.push(key);
      } else {
        const i = prevF.indexOf(key);
        if (i > -1) {
          prevF.splice(i, 1);
        }
      }
    }

    const searchInfo = {
      query: query || prevQ,
      sortBy: sortBy || prevS,
      filters: prevF,
    };

    this.setState({
      searchInfo,
    }, () => {
      console.log('###', this.state);
    });
  }

  getSearchBox() {
    const { searchInfo } = this.state;
    return (
      <div className={styles.search}>
        <SearchBox
          searchInfo={searchInfo}
          onSearch={(q) => this.onSearch(q)}
        />
      </div>
    );
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
