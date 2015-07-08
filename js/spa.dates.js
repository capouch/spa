/*
 * spa.dates.js
 * Dates feature module for OSCON Demo
 * Brian Capouch 
*/

spa.dates = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
      + '<h4>Date Calculation Region</h4>'
      + '<p><label for="finishDate">Finish Date</label>'
      + ' <input type="date" id="finishDate" />'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" id="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" id="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" id="days" />'
      + ' <br><input type="button" value="Calc" id="calcButton" />'
      + ' <input type="button" value="Clear" id="clearButton" />'
      + ' <div id="output">Start:</div>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},

    // Local variables, both data and functions
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    calcStartYear, postSection;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container : $container,
      $calcButton :  $container.find('#calcButton'),
      $days :  $container.find('#days'),
      $clear :  $container.find('#clearButton')
    };
  };
  // End DOM method /setJqueryMap/

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : spa.dates.initModule( $('#app_div_id') );
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
    $container.hide();
    $container.html( configMap.main_html );
    setJqueryMap();

    // Click handler for Calc button
    jqueryMap.$calcButton.click(function() {
      // store the date input by user
      var inputDate = $('#finishDate').val(),

        // Read the change values from widgets
        elapsedYears = $('#years').val(),
        elapsedMonths = $('#months').val(),
        elapsedDays = $('#days').val(),

        // create moment objects
        finish = moment(inputDate),
        // The start object begins the same as the finish
        start = moment(finish);

        // Subtract each piece from the finish time to mutate the start
        start.subtract(elapsedYears, 'years').subtract(elapsedMonths, 'months').subtract(elapsedDays, 'days'); 
      // Write it to output
      $('#output').html('Birth: ' + start.format("dddd, MMMM Do YYYY") );
      });

    // Handler when user hits enter in "Days" widget
    // This logic should be in a macro or function
    jqueryMap.$days.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        // This logic is identical to click handler above!
        var inputDate = $('#finishDate').val(),
        elapsedYears = $('#years').val(),
        elapsedMonths = $('#months').val(),
        elapsedDays = $('#days').val(),
        finish = moment(inputDate),
        start = moment(finish);

        start.subtract(elapsedYears, 'years').subtract(elapsedMonths, 'months').subtract(elapsedDays, 'days');
      $('#output').html('Birth: ' + start.format("dddd, MMMM Do YYYY"));
      }
      }); 

    // Clear input fields on clear button click
    jqueryMap.$clear.click(function() {
      $('#finishDate').val('');
      $('#years').val('');
      $('#months').val('');
      $('#days').val('');
      });

    // Test moment library functions by showing my age
    var now = moment(),
      startday = moment('1951-02-20');
    jqueryMap.$container.append('<br>Date now: ' 
      + now.format("dddd, MMMM Do YYYY") 
      + '<br>Capouch\'s precise age: ' + moment.duration(now.diff(startday)).format());

 } 
 
 postSection = function() {
  // For now, all this does is re-display contents of section    
  jqueryMap.$container.show();
  }

  return { initModule : initModule, 
	   postSection : postSection
         };
  //------------------- END PUBLIC METHODS ---------------------
}());
