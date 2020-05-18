import { prop } from 'ramda';

export const getPathName = (location) => prop('pathname', location);
