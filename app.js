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

  setWatch, hasChanged,

  http    = require( 'http'                 ),
  express = require( 'express'              ),
  bodyParser = require('body-parser'        ),
  methodOverride = require('method-override'),
  morgan = require('morgan'		    ),
  fs = require('fs'         ),

  app     = express(),
  router = express.Router(),
  routes = require('./js/routes.js'),
  server  = http.createServer( app ),
  io = require('socket.io').listen(server),
  watchMap = {};

// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN UTILITY METHODS --------------------

setWatch = function ( url_path, file_type ) {
  console.log( 'setWatch called on ' + url_path );

  if ( ! watchMap[ url_path ] ) {
    console.log( 'setting watch on ' + url_path );

    fs.watchFile(

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

// ------------- END UTILITY METHODS ----------------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
  app.use( express.static( __dirname + '' ) );
  app.use( bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // Turn on verbose logging
  // app.use(morgan('combined'));
  routes.configRoutes( router, server );
  app.use('/', router);
/*
  // use custom middleware to set a watch for any statically served files
  app.configure( function () {
    // if the requested file is in the js folder, consider it a script file
    app.use( function ( req, res, next ) {
      if ( req.url.indexOf( '/js/' ) >= 0) {
        setWatch( req.url, 'script' );
      }
      // else if the requested file is in the css folder, consider it a stylesheet file
      else if ( req.url.indexOf( '/css/' ) >= 0 ) {
        setWatch( req.url, 'stylesheet' );
      }
      next();
    });
    app.use( express.static( __dirname + '/' ) );
  });
*/
  /////////////////////////// Socket.IO Functions ///////////////////////////
  app.get('/', function(req, res){
      res.sendFile(__dirname + './html/index.html');
  });

  io.on('connection', function(socket){

    //hasChanged = false;

    // when the client emits 'chat message', this listens and executes
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
    /*//
    // creating new websocket to keep the content updated without page refresh
    console.log( __dirname + '/css/main.css');
    // watching files
    fs.watchFile( __dirname + '/css/main.css', function( curr, prev ) {
      // on file change, read the those changes
      fs.readFile( __dirname + '/css/main.css', function( err, data ) {
        if (err) throw err;
        // prompt client changes have been made
        //socket.volatile.emit('notification', data);
        //window.alert("CHANGES!");
        console.log("changes!!!");
        hasChanged = true;

        /*app.get('/', function(req, res){
          res.sendFile(__dirname + '/css/main.css');
          console.log("in app.get");
        });

        if (hasChanged) {
          console.log("hasChanged is true");
          
        }

      });
    });*/

    

  });

// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen( 8001 );
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
