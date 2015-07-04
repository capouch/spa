/*
 * routes.js - module to provide routing
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
  configRoutes;
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------

configRoutes = function ( router, server ) {
    router.get('/', function(req, res) {
      var options = {
        root: __dirname + '/html/'
      };
      res.sendFile('index.html',options);
    });
}; 
 
module.exports = { configRoutes : configRoutes };

