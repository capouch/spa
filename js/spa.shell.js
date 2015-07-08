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
            + '<main>'
            + '<header><h1>Saint Joseph\'s College SPA Demo</h1></header>'
        + '<nav id="side">'
        + '<h3>Nav Region</h3>'
        + '<ul>'
        + '<li><a id="date" href="/dates">Date calculator</a></li>'
	+ '<li><a id="socket" href="/socket">Socket.io View</a></li>'
	+ '<li><a id="seo" href="/seo">SEO stuff</a></li>'
	+ '<li><a href=".">Reload</a><li'
	+ '</ul></nav>'
        + '<section id="content-main">Feature Content Region</section>'
	+ '<section id="content-dates"></section>'
	+ '<section id="content-socket"></section>'
	+ '<section id="content-seo"></section>'
	+ '</main>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap;
    
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
      $socket    : $container.find('#content-seo')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin client-side router methods

  function index() {
    // This needs to be more sophisticated
    //   i.e. what if we're leaving the socket module
    jqueryMap.$dates.hide();
    jqueryMap.$content.show();
    }

  function dates() {
    // Fragile div swap for testing
    jqueryMap.$content.hide();
    spa.dates.postSection();
    }

  function socket() {
    spa.socket.initModule(jqueryMap.$content);
    }

  function seo() {
    // Nothing going on here yet
    }

  // End DOM client-side router methods

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : spa.shell.initModule( $('#app_div_id') );
  // Purpose   :
  //   Directs the Shell to offer its capability to the user
  // Arguments :
  //   * $container (example: $('#app_div_id')).
  //     A jQuery collection that should represent 
  //     a single DOM container
  // Action    :
  //   Populates $container with the shell of the UI
  //   and then configures and initializes feature modules.
  //   The Shell is also responsible for browser-wide issues
  //   such as URI anchor and cookie management
  // Returns   : none 
  // Throws    : none
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // Initialize module ONCE 
    spa.dates.initModule(jqueryMap.$dates);

    // Set up routes
    page('/', index);
    page('/dates', dates);
    page('/socket', socket);
    page('/seo', seo);
    page();

  };
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
