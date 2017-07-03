import './application.scss';

import * as services from './services';

// set client socket
services.server.on$('test')
  .map(d => d + 'Whoa')
  .subscribe(item => {
    console.log(`Got ${item} from server!`);
  });

// auth

// components

// bootstrap
console.log('services.socket :', services.socket);
services.socket.connect();