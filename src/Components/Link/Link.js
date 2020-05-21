import React from 'react';
import { Link } from 'react-router-dom'

const CustomLink = ({ to, children, ...rest}) => {
  if(to.startsWith('mailto:')) {
    return (<a href={to} {...rest}>
      {children}
    </a>)
  }

  return (<Link to={to} {...rest}>
    {children}
  </Link>)
};

export default CustomLink;
