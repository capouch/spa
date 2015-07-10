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
      + '<p><label for="finishDate">Date of interest</label>'
      + ' <input type="date" id="finishDate" />'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" id="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" id="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" id="days" />'
      + ' <input type="radio" name="opcode" value="sub" checked> Subtract'
      + ' <input type="radio" name="opcode" value="add">Add'
      + ' <br><input type="button" value="Calc" id="calcButton" />'
      + ' <input type="button" value="Clear" id="clearButton" />'
      + ' <aside id="output">Target:</aside>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},

    // Saves passing a nasty number of parameters
    timespanMap = {
      years: undefined,
      months: undefined,
      days: undefined
    },

    // Local variables, both data and functions
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    calcStartYear, postSection, operation, doDateCalc;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  doDateCalc = function(startDate, operation) {
        // Is this the best way to do it?
        if (operation === 'add') {
          timespanMap.years = -(timespanMap.years);
          timespanMap.months = -(timespanMap.months);
          timespanMap.days = -(timespanMap.days);
          }

        // Subtract each piece from the finish time to mutate the start
        startDate.subtract(timespanMap.years, 'years').subtract(timespanMap.months, 'months').subtract(timespanMap.days, 'days');
    };

  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container  : $container,
      $calcButton : $container.find('#calcButton'),
      $days       : $container.find('#days'),
      $clear      : $container.find('#clearButton')
    };
  };
  // End DOM method /setJqueryMap/

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  function updateForm() {
    var inputDate = $('#finishDate').val(),

    // create moment objects
    finish = moment(inputDate),
    // The start object begins the same as the finish
    start = moment(finish);

    // Read the change values from widgets
    timespanMap.years = $('#years').val();
    timespanMap.months = $('#months').val();
    timespanMap.days = $('#days').val();


  // Add or subtract according to opcode value (add/sub)
  doDateCalc(start, $('input[name=opcode]:checked').val());

  // Write it to output
  $('#output').html('Target: ' + start.format("dddd, MMMM Do YYYY"));
  }

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
    // load HTML and map jQuery collections SILENTLY!
    stateMap.$container = $container;
    $container.hide();
    $container.html( configMap.main_html );
    setJqueryMap();

    // Everything below is event handlers
    //    * Calc button
    //    * Clear button
    //    * Hit enter while in days input box

    // Click handler for Calc button
    jqueryMap.$calcButton.click(function() {
        updateForm();
      });

    // Handler when user hits enter in "Days" widget
    jqueryMap.$days.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        updateForm();
      }
    });

    // Clear input fields on clear button click
    jqueryMap.$clear.click(function() {
      $('#finishDate').val('');
      $('#years').val('');
      $('#months').val('');
      $('#days').val('');
      // Also need to reset to subtract at this point
      });

    // Test moment library functions by showing my age
    var now = moment(),
      startday = moment('1951-02-20');
    jqueryMap.$container.append('<br>Date now: ' 
      + now.format("dddd, MMMM Do YYYY") 
      + '<br>Capouch\'s precise age: ' + moment.duration(now.diff(startday)).format());

 } 
 
 // Main entry point - Just render container contents
 postSection = function() {
  // For now, all this does is re-display contents of section    
  jqueryMap.$container.show();
  }

  return { initModule : initModule, 
	   postSection : postSection
         };
  //------------------- END PUBLIC METHODS ---------------------
}());
