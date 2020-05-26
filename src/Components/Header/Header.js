import React, {
  Component,
} from 'react';

import config from 'Config';
import history from 'Config/History';
import Nav from 'Components/Nav';
import Logo from 'Components/Logo';
import Form from 'Components/Form';
import Utils from 'Utils';

import styles from './Header.module.scss';

const { getSearchParams, getSearchUrl } = Utils;
const { SearchBox } = Form;

class Header extends Component {
  constructor(props) {
    super(props);
    const defaults = config.get('defaults');
    const { sortBy } = defaults;
    this.state = {
      searchInfo: {
        query: '',
        sortBy,
        filters: [],
      },
    };
  }

  componentDidMount() {
    this.loadSearchParams();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  loadSearchParams() {
    const { location: { search } } = this.props;
    const searchInfo = getSearchParams(search);

    this.setState({
      searchInfo,
    });
  }

  onSearch(searchQuery) {
    const { searchInfo: { query: prevQ, sortBy: prevS, filters: prevF } } = this.state;
    const { query, sortBy, filter } = searchQuery;

    let newFilters = [];
    if (filter) {
      const { key, value } = filter;
      newFilters = [...prevF];
      if (!newFilters.includes(key)) {
        newFilters.push(key);
      }

      if (!value) {
        newFilters = newFilters.filter((item) => (item !== key));
      }
    }
    const searchInfo = {
      query: query || prevQ,
      sortBy: sortBy || prevS,
      filters: newFilters,
    };

    this.setState({
      searchInfo,
    });

    // ToDO: History.push won't work without redux. Implement redux
    // history.push(getSearchUrl(searchInfo))
    window.location.href = getSearchUrl(searchInfo);
  }

  getSearchBox() {
    const { searchInfo } = this.state;
    return (
      <div className={styles.search}>
        <SearchBox
          hideSearchBar
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
