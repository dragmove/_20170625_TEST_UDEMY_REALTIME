import gulp from 'gulp';
import webpack from 'webpack';
import chalk from 'chalk';
import rimraf from 'rimraf';

import {create as createServerConfig} from './webpack.server.js';
import {create as createClientConfig} from './webpack.client.js';

const $ = require('gulp-load-plugins')();

// public
gulp.task('clean:server', cb => rimraf('./build', cb));
gulp.task('clean:client', cb => rimraf('./public/build', cb));
gulp.task('clean', gulp.parallel('clean:server', 'clean:client'));

gulp.task('dev:server', gulp.series('clean:server', devServerBuild));
gulp.task('dev', gulp.series('clean', devServerBuild, gulp.parallel(devServerWatch, devServerReload)));
// gulp.task('watch:dev:server', gulp.series(devServerWatch));

// gulp.task('prod:server', gulp.series('clean:server', prodServerBuild));
gulp.task('prod:client', gulp.series('clean:client', prodClientBuild));
// gulp.task('prod', gulp.series('clean', gulp.parallel(prodServerBuild, prodClientBuild)));

// private client
function prodClientBuild(callback) {
  const compiler = webpack(createClientConfig(false));

  compiler.run((error, stats) => {
    outputWebpack('prod:client', error, stats);
    callback();
  });
}

// private server
const devServerWebpack = webpack(createServerConfig(true));

function devServerBuild(callback) {
  devServerWebpack.run((error, stats) => {
    outputWebpack('dev:server', error, stats);
    callback();
  });
}

function devServerWatch() {
  devServerWebpack.watch({}, (error, stats) => {
    outputWebpack('dev:server', error, stats);
  });

  /*
  return $.nodemon({
    script: './src/server/server.js',
    watch: './src/server',
    env: {
      'NODE_ENV': 'development',
      'USE_WEBPACK': 'true'
    }
  });
  */
}

function devServerReload() {
  return $.nodemon({
    script: './build/server.js',
    watch: './build',
    env: {
      'NODE_ENV': 'development',
      'USE_WEBPACK': 'true'
    }
  });
}

/*
const devServerWebpack = webpack(createServerConfig(true));
const prodServerWebpack = webpack(createServerConfig(false));

function devServerBuild(callback) {
  devServerWebpack.run((error, stats) => {
    outputWebpack('dev:server', error, stats);
    callback();
  });
}

function devServerWatch() {
  // cmd.run('babel src/server/server.js --watch --out-file build/server.js');

  devServerWebpack.watch({}, (error, stats) => {
    outputWebpack('dev:server', error, stats);
  });
}

function devServerReload() {
  return $.nodemon({
    script: './build/server.js',
    watch: './build',
    env: {
      'NODE_ENV': 'development',
      'USE_WEBPACK': 'true'
    }
  });
}

function prodServerBuild(callback) {
  prodServerWebpack.run((error, stats) => {
    outputWebpack('prod:server', error, stats);
    callback();
  });
}
*/

// helpers
function outputWebpack(label, error, stats) {
  if (error) {
    throw new Error(error);
  }

  if (stats.hasErrors()) {
    $.util.log(stats.toString({colors: true})); // use gulp-util

  } else {
    const time = stats.endTime - stats.startTime;
    $.util.log(chalk.green(`Built ${label} in ${time} ms`));
  }

  $.util.log(stats.toString());
}