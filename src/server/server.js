// import 'source-map-support/register';

var express = require('express'),
  http = require('http'),
  socketIo = require('socket.io');

var isDevelopment = process.env.NODE_ENV !== 'production';

// setup
var app = express();
var server = new http.Server(app);
var io = socketIo(server);

// client webpack

// configure express
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

// const useExternalStyles = !isDevelopment;

app.get('/', (req, res) => {
  // res.send('Hello world');
  res.render('index.pug');
});

// modules



// socket
io.on('connection', (socket) => {
  console.log(`got connection from ${socket.request.connection.remoteAddress}`);
});

// start up
const port = process.env.PORT || 3000;

function startServer() {
  server.listen(port, () => {
    console.log(`started http server ${port}`);
  });
}

startServer();

