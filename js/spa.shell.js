/*
 * spa.shell.js
 * Shell for OSCON Demo
*/

spa.shell = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      anchor_schema_map : {
        chat  : { opened : true, closed : true }
      },
      resize_interval : 200,
      main_html : String()
            + '<main>'
            + '<header><h1>Saint Joseph\'s College SPA Demo</h1></header>'
        + '<nav id="side">'
        + '<h3>Nav Region</h3>'
        + '<ul>'
        + '<li><a id="date" href="/dates">Date calculator</a></li>'
	+ '<li><a id="socket" href="/socket">Socket.io View</a></li>'
	+ '<li>SEO link</li>'
	+ '<li><a href=".">Reload</a><li'
	+ '</ul></nav>'
        + '<section id="content">Feature Content Region</section>'
	+ '</main>'
    },
    stateMap = {
      $container  : undefined,
      anchor_map  : {},
      resize_idto : undefined
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    pushedCount = 0, savedContent = [];
    savedContent[pushedCount++] = 'Feature Content Region'; 
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // Returns copy of stored anchor map; minimizes overhead
  copyAnchorMap = function () {
    return $.extend( true, {}, stateMap.anchor_map );
  };
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Only three regions for now
    jqueryMap = {
      $container : $container,
      $nav       : $container.find('#side'),
      $content   : $container.find('#content'),
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /setClicks/
  function setClicks() {
    addClickHandler(document.getElementById("date"), 'dates');
    addClickHandler(document.getElementById("socket"), 'socket');
    // Enable backing up through content
    window.addEventListener("popstate", function(e) {
      jqueryMap.$content.html(savedContent[--pushedCount]);
      });
    }
  // End DOM method /setClicks/

  // Begin DOM method addClickHandler/
  function addClickHandler(link, verbiage) {
    link.addEventListener("click", function(e) {
      savedContent[pushedCount++] = jqueryMap.$content.html();
      // jqueryMap.$content.html(verbiage);
      if (verbiage === 'dates')
        spa.dates.initModule(jqueryMap.$content);
      else
        spa.socket.initModule(jqueryMap.$content);
      history.pushState(null, null, link.href); 
      e.preventDefault();
      }, false);
    }

  function index() {
    initModule(stateMap.$container);
    }

  function dates() {
    spa.dates.initModule(jqueryMap.$content);
    }

  function socket() {
    spa.socket.initModule(jqueryMap.$content);
    }

  // End DOM method /addClickHandler/

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

    // Set up our routes
    // page.base('/');
    page('/', index);
    page('/dates', dates);
    page('/socket', socket);
    page();

    //setClicks();
  };
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
