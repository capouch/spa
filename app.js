// This is craig's branch



/*
 * app.js - Express server with routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  setWatch,

  http    = require( 'http'                 ),
  express = require( 'express'              ),
  bodyParser = require('body-parser'        ),
  methodOverride = require('method-override'),
  morgan = require('morgan'		    ),
  socketIo = require( 'socket.io'),
  fsHandle = require( 'fs'),

  app     = express(),
  router = express.Router(),
  routes = require('./js/routes.js'),
  server  = http.createServer( app ),
  io = socketIo.listen(server),
  watchMap = {}
  ;

// ------------- END MODULE SCOPE VARIABLES ---------------

// --------------- BEGIN UTILITY METHODS ------------------
setWatch = function ( url_path, file_type ) {
  console.log( 'setWatch called on ' + url_path );

  if ( ! watchMap[ url_path ] ) {
    console.log( 'setting watch on ' + url_path );

    fsHandle.watchFile(
      url_path.slice(1),
      function ( current, previous ) {
        console.log( 'file accessed' );
        if ( current.mtime !== previous.mtime ) {
          console.log( 'file changed' );
          io.sockets.emit( file_type, url_path );
        }
      }
    );
    watchMap[ url_path ] = true;
  }

};
// ---------------- END UTILITY METHODS -------------------

// ------------- BEGIN SERVER CONFIGURATION ---------------

  app.use( function ( request, response, next ) {
    console.log("in app.use");
    if ( request.url.indexOf( '/js/'  ) >= 0 ) {
      setWatch( request.url, 'script' );
    }
    else if ( request.url.indexOf( '/css/' ) >= 0 ) {
      setWatch( request.url, 'stylesheet' );
    }
    next();

    app.use( express.static( __dirname + '/' ) );
  });

  app.get( '/', function ( request, response ) {
    console.log("in app.get");
    //response.redirect( '/' );
    response.sendFile(__dirname + '/html/index.html');
  });

  app.use( express.static( __dirname + '' ) );
  app.use( bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // Turn on verbose logging
  // app.use(morgan('combined'));
  routes.configRoutes( router, server );
  app.use('/', router);

  

  // Socket.IO Functions // commentted this out since the same method
  // is needed above for dynamic loading
  /*app.get('/', function(req, res){
      console.log("in app.get");
      res.sendFile(__dirname + './html/index.html');
  });*/

  io.on('connection', function(socket){
    console.log("making io connection");
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      console.log("sending chat message");
    });
  });

  

// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen(8000);
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
