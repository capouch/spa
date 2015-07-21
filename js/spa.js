/*
 * spa.js
 * OSCON Demo project base script
*/

var spa = (function () {
  'use strict';
  var initModule = function ( $container ) {
    // Start the shell
    spa.shell.initModule( $container );
  };
  return { initModule: initModule };
}());
