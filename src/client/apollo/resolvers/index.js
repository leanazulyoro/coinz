import merge from 'lodash/merge';
import * as greeting from './greeting';

export const defaults = merge(
  greeting.defaults
);
export const resolvers = merge(
  greeting.resolvers
);
