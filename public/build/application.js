!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var o=t();for(var n in o)("object"==typeof exports?exports:e)[n]=o[n]}}(this,function(){return webpackJsonp([0],{119:function(e,t,o){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.ObservableSocket=void 0;var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),c=o(60);t.ObservableSocket=function(){function e(t){n(this,e),this._socket=t}return r(e,[{key:"on$",value:function(e){return c.Observable.fromEvent(this._socket,e)}},{key:"on",value:function(e,t){this._socket.on(e,t)}},{key:"off",value:function(e,t){this._socket.off(e,t)}},{key:"emit",value:function(e,t){this._socket.emit(e,t)}}]),e}()},92:function(e,t,o){e.exports=o(93)},93:function(e,t,o){"use strict";o(94);var n=o(95),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}(n);r.server.on$("test").map(function(e){return e+"Whoa"}).subscribe(function(e){console.log("Got "+e+" from server!")}),console.log("services.socket :",r.socket),r.socket.connect()},94:function(e,t){},95:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.server=t.socket=void 0;var n=o(46),r=function(e){return e&&e.__esModule?e:{default:e}}(n),c=o(119),u=t.socket=(0,r.default)({autoConnect:!1});t.server=new c.ObservableSocket(u)}},[92])});