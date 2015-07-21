/*
 * app.js - Express server with routing
*/

/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  setWatch,
  http    = require( 'http'                 ),
  express = require( 'express'              ),
  socketIo  = require( 'socket.io'          ),
  bodyParser = require('body-parser'        ),
  methodOverride = require('method-override'),
  morgan = require('morgan'		    ),
  fsHandle  = require( 'fs'                 ),

  app     = express(),
  router = express.Router(),
  routes = require('./js/routes.js'),
  server  = http.createServer( app ),
  io      = socketIo.listen( server ),
  watchMap = {};

// ------------- END MODULE SCOPE VARIABLES ---------------

setWatch = function ( url_path, file_type ) {
  console.log( 'setWatch called on ' + url_path );

  if ( ! watchMap[ url_path ] ) {
    console.log( 'setting watch on ' + url_path );

    fsHandle.watchFile(
      url_path.slice(1),
      function ( current, previous ) {
        console.log( 'file accessed' );
        if ( current.mtime !== previous.mtime ) {
          console.log( 'file changed: ' + url_path);
          io.sockets.emit( file_type, url_path );
        }
      }
    );
    watchMap[ url_path ] = true;
  }
};

// ------------- BEGIN SERVER CONFIGURATION ---------------
  app.use( function ( request, response, next ) {
    if ( request.url.indexOf( '/js/data.js'  ) >= 0 ) {
      setWatch( '/js/data.js', 'script' );
    }
    else if ( request.url.indexOf( '/css/sockstyle.css' ) >= 0 ) {
      setWatch( request.url, 'stylesheet' );
    }
    next();

  app.use( express.static( __dirname + '/' ) );
});

  // app.use( express.static( __dirname + '' ) );
  app.use( bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // Turn on verbose logging
  // app.use(morgan('combined'));
  routes.configRoutes( router, server );
  app.use('/', router);

  // 
  app.get('/', function(req, res){
      res.sendFile(__dirname + './html/index.html');
  });

// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen(8000);
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
