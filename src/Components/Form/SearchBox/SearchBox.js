import React, { Component } from 'react';
import { Input } from 'antd';
import config from 'react-global-configuration';

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
    onSearch({ sortBy: value });
  }

  render() {
    const {
      onSearch, placeholder, enterButton, showSearchTools, searchInfo,
    } = this.props;
    const filters = config.get('filters');
    const { sortBy } = searchInfo;

    return (
      <>
        <Search
          className={styles.search}
          placeholder={placeholder || 'Search'}
          onSearch={(query) => onSearch({ query })}
          enterButton={enterButton}
        />
        {showSearchTools
        && (
        <div className={styles['filter-sort']}>
          <Dropdown
            className={styles.sort}
            items={config.get('sortBy')}
            selected={sortBy}
            onChange={(e) => this.handleDropdownUpdate(e)}
          />
          {Object.keys(filters).map((key, i) => {
            const text = filters[key];
            return (
              <Checkbox
                className={styles.filter}
                key={key}
                text={text}
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
};

export default SearchBox;
