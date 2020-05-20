import React from 'react';
import {
  Select,
} from 'antd';
import cx from 'classnames';

import Icon from 'Components/Icon';
import {
  generateRandomString,
} from 'Utils';

import styles from './Dropdown.module.scss';

const { Option } = Select;

const CustomDropdown = ({ items, selected, onChange, className, ...rest }) => {
  const selectedItem = (<span className={styles.item}>{selected}</span>);
  const popupContainerId = `${styles.date}_${generateRandomString()}`;

  return (
    <>
      <span id={popupContainerId} />
      <Select
        className={cx(styles.dropdown, className)}
        defaultValue={selectedItem}
        onChange={onChange}
        suffixIcon={
          <Icon type="down-arrow" className={styles['dropdown-icon']} />
        }
        getPopupContainer={() => document.getElementById(popupContainerId)}
        bordered={false}
        {...rest}
      >
        {Object.keys(items).map((k, i) => {
          const text = items[k];
          return (
            <Option key={k} value={k}><span className={styles.item}>{text}</span></Option>
          );
        })}
      </Select>
    </>
  );
};

export default CustomDropdown;
