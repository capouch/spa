/*
 * spa.socket.js
 * Socket.io feature module for OSCON Demo
 * Brian Capouch 
*/

spa.socket = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        + '<section id="socketIO">Socket.io Demonstration</section>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Overkill for small amount of functionality
    jqueryMap = {
      $container : $container,
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /setClicks/
  function setClicks() {
    addClickHandler(document.getElementById("clientRoutes"), 'Brian Content');
    addClickHandler(document.getElementById("testRoutes"), 'Craig Content');
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
      jqueryMap.$content.html(verbiage);
      history.pushState(null, null, link.href); 
      e.preventDefault();
      }, false);
    }
  // End DOM method /addClickHandler/

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : spa.socket.initModule( $('#app_div_id') );
  // Purpose   :
  //   Sets up data calculations
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
    // setClicks();
  };
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
