/*
 * spa.js
 * OSCON Demo project base script
*/

var spa = (function () {
  'use strict';
  var initModule = function ( $container ) {
    // cem.data.initModule();
    // cem.model.initModule();
    spa.shell.initModule( $container );
  };

  return { initModule: initModule };
}());
