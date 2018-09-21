require('babel-register')({ plugins: ['dynamic-import-node'] }); // @see: https://github.com/webpack/webpack/issues/5703#issuecomment-363267093

import yn from 'yn';
import {client as config, server as configServer} from 'isomorphic-config';
import ServerBuilder from './builder/ServerBuilder';
import project from '../../webpack/config';
import configureDevServer from './devServer';

if (yn(config.newrelic.enable)) {
  require('newrelic');
}

let server = (new ServerBuilder());

configureDevServer(server);

const static_ttl = (configServer.cache.static_ttl || 0) * 1000;
const statics_options = {
  maxAge: static_ttl,
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Expires', new Date(Date.now() + static_ttl).toUTCString());
  }
};
server.withCors(true)
  .withCompression(true)
  .withPort(project.server_port)
  .withMiddleWare(require('./middleware/cache'))
  .withMiddleWare(require('./middleware/serverRender'))
  .withMiddleWare(require('./middleware/clientRender'))
  .withStatic(project.paths.public(), statics_options)
  .withStatic(`${project.paths.public()}/scripts`, statics_options)
  .withStatic(project.paths.dist(), statics_options);


server.build();
