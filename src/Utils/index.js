import React from 'react';
import config from 'react-global-configuration';
import {
  Route,
} from 'react-router-dom';

import Routes from './routes';

export const getRedirectUrls = () => {
  const redirectUrls = config.get('redirectUrls');

  const redirectUrlsArray = Object.keys(redirectUrls).map((k) => (
    <Route
      key={k}
      exact
      path={`/${k}`}
      render={() => {
        window.location.assign(redirectUrls[k]);
      }}
    />
  ));
  return redirectUrlsArray;
};

export const showBanner = (location) => {
  const pathsForBanner = ['/'];
  const path = Routes.getPathName(location);
  return !!pathsForBanner.includes(path);
};

export default {
  Routes,
};
