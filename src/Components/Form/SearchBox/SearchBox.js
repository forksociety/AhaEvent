import React, {
  Component,
} from 'react';
import {
  Input,
} from 'antd';
import {
  reduce,
} from 'ramda';

import config from 'Config';

import Checkbox from '../Checkbox';
import Dropdown from '../Dropdown';

import styles from './SearchBox.module.scss';

const { Search } = Input;

class SearchBox extends Component {
  handleCheckboxUpdate(e, key) {
    const { onSearch } = this.props;
    if (e) {
      const { target: { checked } } = e;
      onSearch({
        filter: {
          key,
          value: checked,
        },
      });
    }
  }

  handleDropdownUpdate(value) {
    const { onSearch } = this.props;
    onSearch({
      sortBy: value,
    });
  }

  getSortByItems() {
    const allSortBy = config.get('sortBy');
    return reduce((acc, key) => ({
      ...acc, [key]: allSortBy[key].text,
    }), {
    }, Object.keys(allSortBy));
  }

  onChange(e) {
    const { onSearch } = this.props;
    if (e) {
      const { target } = e;
      onSearch({
        query: target.value,
      });
    }
  }

  render() {
    const { onSearch, placeholder, enterButton, showSearchTools, hideSearchBar, searchInfo } = this.props;
    const allSortByItems = this.getSortByItems();
    const allFilters = config.get('filters');
    const { sortBy, filters, query } = searchInfo;

    return (
      <>
        {!hideSearchBar && (
        <Search
          className={styles.search}
          placeholder={placeholder || 'Search'}
          onSearch={(query) => onSearch({
            query,
          }, true)}
          value={query}
          enterButton={enterButton}
        />
        )}
        {showSearchTools
        && (
        <div className={styles['filter-sort']}>
          <Dropdown
            className={styles.sort}
            items={allSortByItems}
            selected={sortBy}
            onChange={(e) => this.handleDropdownUpdate(e)}
          />
          {Object.keys(allFilters).map((key, i) => {
            const { text } = allFilters[key];
            return (
              <Checkbox
                className={styles.filter}
                key={key}
                text={text}
                checked={filters.includes(key)}
                onChange={(e) => this.handleCheckboxUpdate(e, key)}
              />
            );
          })}
        </div>
        )}
      </>
    );
  }
}

SearchBox.defaultProps = {
  enterButton: true,
  showSearchTools: true,
  hideSearchBar: false,
};

export default SearchBox;
