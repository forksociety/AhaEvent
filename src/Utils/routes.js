import { prop } from 'ramda';

const getPathName = (location) => prop('pathname', location);

export default {
  getPathName,
};
