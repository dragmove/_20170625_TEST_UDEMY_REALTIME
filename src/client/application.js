import './application.scss';

import * as services from './services';

// set client socket
/*
 services.server.on$('test')
 .map(d => d + 'Whoa')
 .subscribe(item => {
 console.log(`Got ${item} from server!`);
 });

 services.server.status$
 .subscribe(status => console.log(status));
 */

services.server.emitAction$('login', {
  username: 'foo',
  password: bar

}).subscribe(result => {
  if (result.error) {
    console.error(result.error);

  } else {
    console.log('we are logged in');
  }
})

// auth

// components

// bootstrap
console.log('services.socket :', services.socket);
services.socket.connect();