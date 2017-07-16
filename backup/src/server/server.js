// import 'source-map-support/register';

/*
var express = require('express'),
  http = require('http'),
  socketIo = require('socket.io'),
  ObservableSocket = require('shared/observable-socket'),
  Observale = require('rxjs').Observable;
  */

import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import chalk from 'chalk';
import {ObservableSocket} from 'shared/observable-socket';

const isDevelopment = process.env.NODE_ENV !== 'production';

// setup
const app = express();
const server = new http.Server(app);
const io = socketIo(server);

// client webpack

// configure express
app.locals.pretty = true;
// app.set('view engine', 'pug');
// app.set('views', './views');
app.use(express.static('public'));

// const useExternalStyles = !isDevelopment;

app.get('/', (req, res) => {
  res.send('Hello world');
  // res.render('index.pug');
});

// modules



// socket
io.on('connection', (socket) => {
  console.log(`got connection from ${socket.request.connection.remoteAddress}`);

  const client = new ObservableSocket(socket);

  client.onAction('login', creds => {
    return Observable.of({username: creds.username});
  });

  /*
  client.onAction('login', creds => {
    return database
      .find$('user', {username: creds.username})
      .flatMap(user => {
        if(!user || user.password != creds.password) {
          return Observable.throw('user not found');
        }

        return Observable.of(user);
      });
  });
  */

  /*
  let index = 0;

  setInterval(() => {
    socket.emit('test', `On Index ${index++}`);
  }, 1000);
  */
});

// start up
const port = process.env.PORT || 3000;

function startServer() {
  server.listen(port, () => {
    console.log(`started http server ${port}`);
  });
}

startServer();

