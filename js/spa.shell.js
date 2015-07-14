/*
 * spa.shell.js
 * Shell for OSCON Demo
*/

spa.shell = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        + '<header><h1>Saint Joseph\'s College SPA Header</h1></header>'
        + '<nav><div id="side">'
        + '<h3>Nav Region</h3>'
        + '<ul>'
        + '<li><a id="date" href="/dates">Date calculator</a></li>'
	+ '<li><a id="socket" href="/socket">Socket.io View</a></li>'
	+ '<li><a id="seo" href="/seo">SEO stuff</a></li>'
	+ '<li><a href=".">Reload</a><li'
	+ '</ul></div></nav>'
        + '<section><div id="content-main">Feature Content Region'
        + '</div></section>'
	+ '<section><div id="content-dates"></div></section>'
	+ '<section><div id="content-socket"></div></section>'
	+ '<section><div id="content-seo"></div></section>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},

    initModule, setJqueryMap,
    currentMod;    
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Only three regions for now
    jqueryMap = {
      $container : $container,
      $nav       : $container.find('#side'),
      $content   : $container.find('#content-main'),
      $dates     : $container.find('#content-dates'),
      $socket    : $container.find('#content-socket'),
      $seo       : $container.find('#content-seo')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin client-side router methods

  // Base route 
  function index() {
    currentMod.hide();
    currentMod = jqueryMap.$content; 
    jqueryMap.$content.show();
    }

  // One function per feature module
  function dates() { 
    // Don't be bad if user keeps clicking same menu choice
    if( currentMod != jqueryMap.$dates ) 
	currentMod.hide();
    // Remember where we're at
    currentMod = jqueryMap.$dates;
    spa.dates.postSection();
    }

  function socket() {
    if( currentMod != jqueryMap.$socket )
      currentMod.hide();
    currentMod = jqueryMap.$socket
    // This changes once Nathan is ready 
    spa.socket.initModule(jqueryMap.$socket);
    }

  function seo() {
    if( currentMod != jqueryMap.$seo )
      currentMod.hide()
    currentMod = jqueryMap.$seo;
    // Nothing going on here yet
    }

  // End DOM client-side router methods

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------

  // Begin Public method /initModule/
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );

    // Keep track of our elements
    setJqueryMap();

    // Initialize each feature module
    spa.dates.initModule(jqueryMap.$dates);
    jqueryMap.$socket.hide();
    jqueryMap.$seo.hide();
    // spa.socket.initModule(jqueryMap.$socket);
    // spa.seo.initModule(jqueryMap.$seo);

    // Default content is "home" screen
    currentMod = jqueryMap.$content;

    // Set up routes
    page('/', index);
    page('/dates', dates);
    page('/socket', socket);
    page('/seo', seo);
    page();

  };

  // Public API
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
