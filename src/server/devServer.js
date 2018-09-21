import webpack from 'webpack';
import webpackDevConfig from '../../webpack/webpack.dev.config';
import project from '../../webpack/config';
import chokidar from 'chokidar';

export default function configureDevServer(server) {
  if (process.env.NODE_ENV === 'development') {

    const compiler = webpack(webpackDevConfig);

    server.use(require('webpack-dev-middleware')(compiler, {
      publicPath: project.compiler_public_path,
      contentBase: project.paths.client(),
      hot: true,
      lazy: false,
      serverSideRender: true
    }));

    server.use(require('webpack-hot-middleware')(compiler, {
      path: '/__webpack_hmr'
    }));


    // @todo: use webpack-hot-server-middleware instead of chokindar
    const watcher = chokidar.watch('./server');

    watcher.on('ready', function () {
      watcher.on('all', function () {
        console.log('Clearing /server/ module cache from server');
        Object.keys(require.cache)
          .forEach(function (id) {
            if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
          });
      });
    });

    return server;
  }
};
