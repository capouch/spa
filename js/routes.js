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
      // I don't like this very much 
      root: __dirname + '/../html/'
    };
    res.sendFile('index.html', options);
  });

  router.get('/dates', function(req, res) {
    var options = {
      // I don't like this very much
      root: __dirname + '/../html/'
    };
    res.sendFile('index.html', options);
  });

  router.get('/socket', function(req, res) {
    var options = {
      // I don't like this very much
      root: __dirname + '/../html/'
    };
    res.sendFile('index.html', options);
  });

  // This will be commented out before the show
  router.get('/seo', function(req, res) {
    var options = {
      // I don't like this very much
      root: __dirname + '/../html/'
    };
    res.sendFile('index.html', options);
  });
  
  router.get('/robots.txt', function(req, res) {
    var options = {
      // I don't like this very much
      root: __dirname + '/../html/'
    };
    res.sendFile('robots.txt', options);
  });
  
    router.get('/Sitemap.xml', function(req, res) {
    var options = {
      // I don't like this very much
      root: __dirname + '/../html/'
    };
    res.sendFile('Sitemap.xml', options);
  });

}; 
 
module.exports = { configRoutes : configRoutes };

