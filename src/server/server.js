// import 'source-map-support/register';

import express from 'express';
import http from 'http';
// import socketIo from 'socket.io';

// const isDevelopment = process.env.NODE_ENV !== 'production';

// setup
const app = express();
const server = new http.Server(app);
// const io = socketIo(server);

// client webpack

// configure express
app.locals.pretty = true;
// app.set('view engine', 'jade');
// app.set('views', './views');
app.use(express.static('public'));

// const useExternalStyles = !isDevelopment;

app.get('/', (req, res) => {
  console.log('ok');

  res.send('Hello world');

  /*
  res.render('index', {
    useExternalStyles
  });
  */
});

// modules


// socket
/*
io.on('connection', (socket) => {
  console.log('socket :', socket);
  // console.log(`got connection from ${socket.request.connection.remoteAddress}`);
});
*/

// start up
const port = process.env.PORT || 3000;

function startServer() {
  server.listen(port, () => {
    console.log(`started http server ${port}`);
  });
}

startServer();

