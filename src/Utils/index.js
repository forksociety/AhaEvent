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

export const generateRandomString = () => (Math.random().toString(36).substring(2));

export const generateDownloadableFile = (filename, content, type) => {
  const element = document.createElement("a");
  const file = new Blob([content], {type});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  // Required for FireFox
  document.body.appendChild(element);
  element.click();
}

export const generateDownloadableJsonFile = (filename, content) => {
  generateDownloadableFile(filename, JSON.stringify(content, null, 2), 'application/json');
}

export const readableStringToKey = (s) => s.replace(' ', '_').toLowerCase();

export default {
  Routes,
};
