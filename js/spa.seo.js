/*
 * spa.seo.js
 * Shell for OSCON Demo
*/

spa.seo = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String() 
        + '<section id="content-seo">SEO Demonstration</section>'
   
    },
    stateMap = {
      $container  : undefined
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks;
    
  //----------------- END MODULE SCOPE VARIABLES ---------------

// Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container : $container
    };
  };
  // End DOM method /setJqueryMap/

  //--------------------- BEGIN PUBLIC METHODS --------------------
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();
    jqueryMap.$container.show();
    
  };
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
})();
