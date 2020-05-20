import React from 'react';
import {
  Input,
} from 'antd';
import cx from 'classnames';

import C from 'Config/Constants';

import styles from './Input.module.scss';

const { INPUT_TYPES } = C;

const { TextArea } = Input;

const CustomInput = (props) => {
  const { placeholder, className, minRows, maxRows, type, ...rest } = props;

  const classes = cx(styles.input, className);

  switch (type) {
    case INPUT_TYPES.TEXTAREA:
      return (
        <TextArea
          className={classes}
          placeholder={placeholder}
          autoSize={{
            minRows, maxRows,
          }}
          {...rest}
        />
      );
    default:
      return (
        <Input
          className={classes}
          placeholder={placeholder}
          {...rest}
        />
      );
  }
};

CustomInput.defaultProps = {
  placeholder: 'type here...',
  type: INPUT_TYPES.INPUT,
  className: '',
  minRows: 5,
  maxRows: 10,
};

export default CustomInput;
