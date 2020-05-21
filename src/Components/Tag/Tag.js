import React from 'react';
import { Tag } from 'antd';
import RandomColor from 'randomcolor';

const CustomTag = ({text, color, luminosity}) => (
  <Tag color={color || RandomColor({ luminosity: (luminosity || 'dark')})}>
    {text}
  </Tag>
);

export default CustomTag;
