import React from 'react';
import {
  Checkbox,
} from 'antd';

const CustomCheckbox = ({ onChange, text, ...rest }) => (
  <Checkbox onChange={onChange} {...rest}>
    {text}
  </Checkbox>
);

export default CustomCheckbox;
