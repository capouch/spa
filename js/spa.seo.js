/*
 * spa.seo.js
 * Shell for OSCON Demo
*/

spa.seo = (function () {
  'use strict';
  //--- Local variables
  var
    configMap = {
      main_html : String() 
      + '<section id="seoPage">SEO Demonstration'
      + '</section>'
   
    },

    stateMap = {
      $container  : undefined
    },

    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks,postSection, seoPage;
    
  //--- end local variables



  // Begin DOM method /setJqueryMap
  setJqueryMap = function () {
   var $container = stateMap.$container;

   // Set initial jQuery map values
   jqueryMap = {
      $container : $container,
      $seoPage  : $container.find('#seoPage')
    };
  };
  // End DOM method /setJqueryMap

  //--- Public methods
  initModule = function ( $container ) {

    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.hide();
    $container.html( configMap.main_html );

    setJqueryMap();
  };


  
  // Begin method /postSection
  // Normal entry point - Just render container contents
  postSection = function() {
    jqueryMap.$seoPage.show();
    jqueryMap.$container.show();
  } // end postSection

  // We only expose two methods to the outside
  return { initModule : initModule,
          postSection : postSection
         };
  //--- end public methods
})();
