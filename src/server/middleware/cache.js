import { server as configServer } from 'isomorphic-config';

const cache = function (req, res, next) {
  // Set max-age for Cache-Control header
  res.set('Cache-Control', `max-age=${configServer.cache.ttl || 0}`);
  res.set('Expires', new Date(Date.now() + (configServer.cache.ttl * 1000)).toUTCString());
  next();
};
module.exports = cache;
