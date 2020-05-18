import React from 'react';
import { Input } from 'antd';

import styles from './SearchBox.module.scss';

const { Search } = Input;

const SearchBox = ({ onSearch, placeholder }) => (
  <Search
    className={styles.search}
    placeholder={placeholder || 'Search'}
    onSearch={(value) => onSearch(value)}
  />
);

export default SearchBox;
