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
      anchor_schema_map : {
        chat  : { opened : true, closed : true }
      },
      resize_interval : 200,
      main_html : String()
      + '<section class ="dateCalc"></section>',

      input_html : String()
      + '<h4>Date Calculation Region</h4>'
      + '<p><label for="deathDate">Finish Date</label>'
      + ' <input type="date" id="deathDate" />'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" id="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" id="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" id="days" />'
      + ' <br><input type="button" value="Calc" id="calcButton" />'
      + ' <input type="button" value="Clear" id="clearButton" />'
      + ' <div id="output">Birth:</div>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    calcBirthYear;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Grrrrrrr
    jqueryMap = {
      $container : $container,
      $section : $container.find('.dateCalc'),
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
    $container.html( configMap.main_html );
    setJqueryMap();
    jqueryMap.$section.html( configMap.input_html );

    // Add new elements to jquery map
    jqueryMap['$calcButton'] = jqueryMap.$section.find('#calcButton');
    jqueryMap['$days'] = jqueryMap.$section.find('#days');
    jqueryMap['$clear'] = jqueryMap.$section.find('#clearButton');

    // Then add a click handler to it
    jqueryMap.$calcButton.click(function() {
      var inputDate = $('#deathDate').val(),
        lifeYears = $('#years').val(),
        lifeMonths = $('#months').val(),
        lifeDays = $('#days').val(),
        death = moment(inputDate),
        birth = moment(death);

        birth.subtract(lifeYears, 'years').subtract(lifeMonths, 'months').subtract(lifeDays, 'days'); 
      $('#output').html('Birth: ' + birth.format("dddd, MMMM Do YYYY") );
      });

    // Let user hit enter in final field to calc, too
    // If this logic could be encapsulated that would be boss!
    jqueryMap.$days.keypress(function(e) {
      // 13 = Return key
      if(e.which == 13) {
        // This logic identical to click handler
        var inputDate = $('#deathDate').val(),
        lifeYears = $('#years').val(),
        lifeMonths = $('#months').val(),
        lifeDays = $('#days').val(),
        death = moment(inputDate),
        birth = moment(death);

        birth.subtract(lifeYears, 'years').subtract(lifeMonths, 'months').subtract(lifeDays, 'days');
      $('#output').html('Birth: ' + birth.format("dddd, MMMM Do YYYY"));
      }
      }); 

    // Clear input fields on clear button click
    jqueryMap.$clear.click(function() {
      $('#deathDate').val('');
      $('#years').val('');
      $('#months').val('');
      $('#days').val('');
      });

    // Test moment library functions by showing my age
    var now = moment(),
      birthday = moment('1951-02-20');
    jqueryMap.$section.append('<br>Date now: ' 
      + now.format("dddd, MMMM Do YYYY") 
      + '<br>Capouch\'s precise age: ' + moment.duration(now.diff(birthday)).format());

 } 

  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
