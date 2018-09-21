const path = require('path');
const ip = require('ip');
const isomorphicConfig = require('isomorphic-config');

const config = {

    env: process.env.NODE_ENV || 'production',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'src/client',
    dir_dist: 'build',
    dir_public: 'public',
    dir_server: 'src/server',
    dir_test: 'tests',

    // ----------------------------------
    // Server Configuration
    // ----------------------------------
    server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
    server_port : isomorphicConfig.server.port,

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_public_path     : isomorphicConfig.client.cdn_static_url + "/",
    compiler_devtool         : 'source-map',
    cdn_url                  : isomorphicConfig.client.cdn_static_url,
    build_number             : process.env.CIRCLE_BUILD_NUM
};

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env),
        'CIRCLE_BUILD_NUM' : JSON.stringify(config.build_number)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'development',
    '__PROD__'     : config.env === 'production',
    '__TEST__'     : config.env === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
    const args = [config.path_base].concat([].slice.call(arguments));
    return path.resolve.apply(path, args)
}

config.paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    public : base.bind(null, config.dir_public),
    dist   : base.bind(null, config.dir_dist),
    server : base.bind(null, config.dir_server)
};

module.exports = config;
