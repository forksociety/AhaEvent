import React from 'react';
import {
  DatePicker,
} from 'antd';
import cx from 'classnames';

import C from 'Config/Constants';
import {
  generateRandomString,
} from 'Utils';

import styles from './DatePicker.module.scss';

const { RangePicker } = DatePicker;
const { DATE_TYPES } = C;

const CustomInput = (props) => {
  const { className, type, placeholder, ...rest } = props;

  const classes = cx(styles.date, className);
  const popupContainerId = `${styles.date}_${generateRandomString()}`;
  const dateFormat  = 'MMMM Do YYYY, h:mm:ss a';

  let component = '';

  const newProps = {
    getPopupContainer: () => document.getElementById(popupContainerId),
    className: classes,
    placeholder,
    format: dateFormat,
    ...rest,
  };

  switch (type) {
    case DATE_TYPES.RANGE:
      component = (
        <RangePicker {...newProps} />
      );
      break;
    case DATE_TYPES.RANGE_TIME:
      component = (
        <RangePicker
          showTime
          {...newProps}
        />
      );
      break;
    case DATE_TYPES.DATE_TIME:
      component = (
        <DatePicker
          {...newProps}
        />
      );
      break;
    case DATE_TYPES.DATE:
    default:
      component = (
        <DatePicker
          {...newProps}
        />
      );
      break;
  }

  return (
    <>
      <span id={popupContainerId} />
      {component}
    </>
  );
};

CustomInput.defaultProps = {
  type: DATE_TYPES.DATE,
  className: '',
};

export default CustomInput;
