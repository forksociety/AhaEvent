import React from 'react';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';

import config from 'Config';

const Analytics = () => {
  console.log('$', process.env.NODE_ENV, process.env.NODE_ENV === 'production')
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY,
    });
    if(window) {
      const {location: {pathname, search}} = window;
      console.log(pathname + search)
      ReactGA.initialize(config.get('gaTrackingId'));
      ReactGA.pageview(pathname + search);
    }
  }
  return;
};

export default Analytics;
