import React from 'react';
import moment from 'moment-timezone';
import {
  Route,
} from 'react-router-dom';

import config from 'Config';
import Routes from './routes';

export const getCoverStyle = (cover, color) => {
  const defaultColor = '#dadada';
  return cover && cover.length > 0
    ? ({
      background: `url(${cover})`,
      backgroundSize: 'cover',
      backgroundColor: color || defaultColor,
      backgroundPosition: 'center',
    }) : ({
      backgroundColor: color || defaultColor,
    });
};

export const getOverlay = (cover) => (cover && cover.length > 0 ? (<div className="overlay" />) : null);

export const isOnlineEvent = (location) => (location.toLowerCase() === 'online');

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

export const getTwitterLink = (handle) => (`https://twitter.com/${handle}`);

export const showBanner = (location) => {
  const pathsForBanner = ['/'];
  const path = Routes.getPathName(location);
  return !!pathsForBanner.includes(path);
};

export const generateRandomString = () => (Math.random().toString(36).substring(2));

export const convertDateToIso = (d) => {
  const dateFormat = 'YYYY-MM-DDThh:mm:ss+00:00';
  return moment(d).utc().format(dateFormat);
};

export const convertDateToReadable = (
  d,
  showYear = true,
  showTime = false,
  showTimezone = false,
) => {
  let format = 'MMMM Do';
  if (showYear) {
    format += ' YYYY';
  }

  if (showTime) {
    format += ', h:mm:ss a';
  }

  if (showTimezone) {
    format += '+00:00';
  }
  return moment(d).format(format);
};

export const convertDateRangeToReadable = (start, end) => {
  // if years match
  let startStr = convertDateToReadable(start);
  const endStr = convertDateToReadable(end);
  if (moment(start).format('YYYY') === moment(end).format('YYYY')) {
    startStr = convertDateToReadable(start, false);
  }
  return `${startStr} - ${endStr}`;
};

export const generateSchema = (content) => {
  const { cfpDate, date, hasCfp, keywords, ...rest } = content;

  let payload = {
    ...rest,
  };

  const keywordsArr = keywords.split(',').map((i) => i.trim());
  let [startDate, endDate] = date;
  startDate = convertDateToIso(startDate);
  endDate = convertDateToIso(endDate);

  if (hasCfp) {
    let [cfpStartDate, cfpEndDate] = cfpDate;
    cfpStartDate = convertDateToIso(cfpStartDate);
    cfpEndDate = convertDateToIso(cfpEndDate);
    payload = {
      ...payload,
      cfpStartDate,
      cfpEndDate,
    };
  }

  return ({
    ...payload,
    startDate,
    endDate,
    keywords: keywordsArr,
  });
};

export const generateDownloadableFile = (filename, content, type) => {
  const element = document.createElement('a');
  const file = new Blob([content], {
    type,
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  // Required for FireFox
  document.body.appendChild(element);
  element.click();
};

export const generateDownloadableJsonFile = (filename, content) => {
  const data = generateSchema(content);
  generateDownloadableFile(filename, JSON.stringify(data, null, 2), 'application/json');
};

export const readableStringToKey = (s, regex = / /g, separator = '_') => s.replace(regex, separator).toLowerCase();

export const generateEventUrl = (id, name) => (`/event/${readableStringToKey(name, / /g, '-')}-${id}`);

export const getIdFromUrlSlug = (slug, separator = '_') => {
  const tmp = slug.split(separator);
  return tmp.length > 0 ? tmp[tmp.length - 1] : null;
};

export default {
  ...Routes,
};
