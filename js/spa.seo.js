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
        + '<section id="seoPage">SEO Demonstration'
      + '</br>'
         + ' Make sure the prerender server is running'
      + '</br>'
      + '<a id="seoLink" href="http://localhost:3000/http://localhost:8000/dates/?_escaped_fragment_=">The Solution</a>'
      + '</section>'
   
    },
    stateMap = {
      $container  : undefined
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks,postSection, seoPage;
    
  //----------------- END MODULE SCOPE VARIABLES ---------------

// Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container : $container,
      $seoPage  : $container.find('#seoPage')
    };
  };
  // End DOM method /setJqueryMap/

  //--------------------- BEGIN PUBLIC METHODS --------------------
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.hide();
    $container.html( configMap.main_html );

    setJqueryMap();
    //jqueryMap.$socketIO.html( configMap.main_html );
    //queryMap.$container.show();

  };


  
    // Begin method /postSection/
  // Normal entry point - Just render container contents
  postSection = function() {
    jqueryMap.$seoPage.show();
    jqueryMap.$container.show();
  } // end postSection

  return { initModule : initModule,
          postSection : postSection
         };
  //------------------- END PUBLIC METHODS ---------------------
})();
