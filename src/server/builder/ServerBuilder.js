const express = require('express');
const cors = require('cors');
const compression = require('compression');

class ServerBuilder {

  _statics;
  _port;
  _baseRouter;
  _middlewares;
  _cors;
  _compression;

  constructor() {
    this._statics = [];
    this._port = null;
    this._baseRouter = null;
    this._middlewares = [];
    this._cors = false;
    this._compression = false;
  }

  withPort(port) {
    this._port = port;
    return this;
  }

  withStatic(_path, _options) {
    const file = {
      path: _path,
      options: _options || {}
    };

    this._statics.push(file);
    return this;
  }

  withBaseRouter(router) {
    this._baseRouter = router;
    return this;
  }

  withMiddleWare(component) {
    this._middlewares.push(component);
    return this;
  }

  withCors(enable) {
    this._cors = enable;
    return this;
  }

  withCompression(enable) {
    this._compression = enable;
    return this;
  }

  build() {
    const server = express();

    if (this._statics.length > 0) {
      for (const _static in this._statics) {
        if (this._statics.hasOwnProperty(_static)) {
          server.use(express.static(
            this._statics[_static].path,
            this._statics[_static].options
          ));
        }
      }
    }

    if (this._cors) {
      server.use(cors());
    }

    if (this._compression) {
      server.use(compression());
    }

    if (this._middlewares.length > 0) {
      for (const _middleware in this._middlewares) {
        if (this._middlewares.hasOwnProperty(_middleware)) {
          server.use(this._middlewares[_middleware]);
        }
      }
    }

    if (!!this._baseRouter) {
      server.get('*', this._baseRouter);
    }

    return server.listen(this._port, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.info(`Listening at http://localhost:${this._port}`);
      }
    });
  }
}

export default ServerBuilder;
