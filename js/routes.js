/*
 * routes.js - module to provide routing
*/

// --- Local variables
'use strict';
var
  configRoutes;
// --- End variable declarations

// --- Public API

configRoutes = function ( router, server ) {

  // Serve files from html sibling directory
  var options = {
    root: __dirname + '/../html/'
    };

  router.get('/', function(req, res) {
    res.sendFile('index.html', options);
  });

  router.get('/dates', function(req, res) {
    res.sendFile('index.html', options);
  });

  router.get('/socket', function(req, res) {
    res.sendFile('index.html', options);
  });

  // This will be commented out before the show
  router.get('/seo', function(req, res) {
    res.sendFile('index.html', options);
  });
  
  router.get('/robots.txt', function(req, res) {
    res.sendFile('robots.txt', options);
  });
  
 router.get('/Sitemap.xml', function(req, res) {
    res.sendFile('Sitemap.xml', options);
  });

}; 
 
module.exports = { configRoutes : configRoutes };

