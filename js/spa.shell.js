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
        + '<li><a id="clientRoutes" href="bcTest.html">Brian\'s Link</a></li>'
	+ '<li><a id="testRoutes" href="otherTest.html">Craig\'s link</a></li>'
	+ '<li>Nathan\'s link</li>'
	+ '</ul></nav>'
        + '<section id="content">Content Region</section>'
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
    savedContent[pushedCount++] = 'Content Region'; 
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
    addClickHandler(document.getElementById("clientRoutes"), 'Brian Content');
    addClickHandler(document.getElementById("testRoutes"), 'Craig Content');
    // Note this assumes only one pushState . . . 
    window.addEventListener("popstate", function(e) {
      jqueryMap.$content.html(savedContent[--pushedCount]);
      });
    }
  // End DOM method /setClicks/

  // Begin DOM method addClickHandler/
  function addClickHandler(link, verbiage) {
    link.addEventListener("click", function(e) {
      savedContent[pushedCount++] = jqueryMap.$content.html();
      jqueryMap.$content.html(verbiage);
      history.pushState(null, null, link.href); 
      e.preventDefault();
      }, false);
    }
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
    setClicks();
  };
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
