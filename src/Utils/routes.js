import {
  prop,
} from 'ramda';

import config from 'Config';

const getPathName = (location) => prop('pathname', location);

const getSearchParams = (search) => {
  const searchFields = config.get('searchFields');
  const defaults = config.get('defaults');
  const params = new URLSearchParams(search);

  const sort = params.get(searchFields.sort);
  const query = params.get(searchFields.query);
  let filters = params.get(searchFields.filters);
  filters = filters ? filters.split(',') : defaults.filters;

  const searchParams = {
    sortBy: sort || defaults.sort,
    filters,
    query: query || '',
  };
  Object.keys(searchParams).forEach((key) => (searchParams[key] ? {
  } : delete searchParams[key]));

  return searchParams;
};

const getSearchUrl = (searchPayload) => {
  const searchFields = config.get('searchFields');
  const { query, sortBy, filters } = searchPayload;
  const params = {
    [searchFields.sort]: sortBy,
    [searchFields.filters]: filters.length > 0 ? filters : null,
    [searchFields.query]: query,
  };

  Object.keys(params).forEach((key) => (params[key] ? {
  } : delete params[key]));
  return `/?${new URLSearchParams(params)}`;
};

export default {
  getPathName,
  getSearchParams,
  getSearchUrl,
};
