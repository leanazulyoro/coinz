require('babel-register')({ plugins: ['dynamic-import-node'] }); // @see: https://github.com/webpack/webpack/issues/5703#issuecomment-363267093

import yn from 'yn';
import {client as config, server as configServer} from 'isomorphic-config';
import project from '../../webpack/config';
import configureDevServer from './devServer';

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cacheMiddleware = require('./middleware/cache');
const serverRenderMiddleware = require('./middleware/serverRender');
const clientRenderMiddleware = require('./middleware/clientRender');


if (yn(config.newrelic.enable)) {
  require('newrelic');
}


const server = express();

configureDevServer(server);

const staticTTL = (configServer.cache.static_ttl || 0) * 1000;
const staticsOptions = {
  maxAge: staticTTL,
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Expires', new Date(Date.now() + staticTTL).toUTCString());
  }
};

server.use(cors());
server.use(compression());
server.use(cacheMiddleware);
server.use(serverRenderMiddleware);
server.use(clientRenderMiddleware);
server.use(express.static(project.paths.public(), staticsOptions));
server.use(express.static(`${project.paths.public()}/scripts`, staticsOptions));
server.use(express.static(project.paths.dist(), staticsOptions));


server.listen(project.server_port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.info(`Listening at http://localhost:${project.server_port}`);
  }
});
