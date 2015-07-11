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
      + ' <h4>Date Calculation Region</h4>'
      + ' <input type="button" value="Show Cemetery View" id="toggleButton" />'
      + ' <section id="genericDate"></section>'
      + ' <section id = "cemeteryDate"></section>'
      ,

      generic_html: String()
      + '<h3>Generic Date View</h3>'
      + ' <p><label for="finishDate">Date of interest (End)</label>'
      + ' <input type="date" class="finishDate" />'
      + ' <label for="birthDate">Start</label>'
      + ' <input type="date" id="birthDate" />'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" class="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" class="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" class="days" />'
      + ' <input type="radio" name="gen_opcode" value="sub" checked> Subtract'
      + ' <input type="radio" name="gen_opcode" value="add">Add'
      + ' <br><input type="button" value="Calc" class="calcButton" />'
      + ' <input type="button" value="Clear" class="clearButton" />'
      + ' <aside class="output">Target:</aside>'
      ,

      cemetery_html: String()
      + '<h3>Cemetery Date View</h3>'
      + ' <p><label for="finishDate">Death Date</label>'
      + ' <input type="date" class="finishDate" />'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" class="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" class="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" class="days" />'
      + ' <input type="radio" name="cem_opcode" class = "add" value="sub" checked> Subtract'
      + ' <input type="radio" name="cem_opcode" class= "add" value="add">Add'
      + ' <br><input type="button" value="Calc" class="calcButton" />'
      + ' <input type="button" value="Clear" class="clearButton" />'
      + ' <aside class="output">Target:</aside>'
      },

    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},

    // Saves nasty parameter clog
    timespanMap = {
      years: undefined,
      months: undefined,
      days: undefined
    },

    // Local variables, both data and functions
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    calcStartYear, postSection, operation, doDateCalc,
    generic, cemetery, genericView, buttonText,
    swapSection;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  doDateCalc = function(startDate, operation) {
    // Mutate startDate by adding/subtracting timespan
    if (operation === 'add') 
      startDate.add(timespanMap.years, 'years').add(timespanMap.months,'months').add(timespanMap.days, 'days');
    else
      startDate.subtract(timespanMap.years, 'years').subtract(timespanMap.months, 'months').subtract(timespanMap.days, 'days');
    };

  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container     : $container,
      $generic	     : $container.find('#genericDate'),
      $cemetery      : $container.find('#cemeteryDate'),
      $toggle        : $container.find('#toggleButton'),
      $genCalcButton : $container.find('#genericDate').find('.calcButton'),
      $cemCalcButton : $container.find('#cemeteryDate').find('.calcButton'),
      $genDays       : $container.find('#genericDate').find('.days'),
      $cemDays       : $container.find('#cemeteryDate').find('.days'),
      $genClear      : $container.find('#genericDate').find('.clearButton'),
      $cemClear      : $container.find('#cemeteryDate').find('.clearButton')
    };
  };
  // End DOM method /setJqueryMap/

  // Normal entry point - Just render container contents
  postSection = function() {
    // For now, all this does is re-display contents of section
    if (genericView) {
      jqueryMap.$cemetery.hide();
      jqueryMap.$generic.show();
    } else {
      jqueryMap.$generic.hide();
      jqueryMap.$cemetery.show();
    }
  jqueryMap.$container.show();
  } // end postSection 
  
  swapSection = function() {
      if ( genericView )  {
        jqueryMap.$cemetery.hide();
        jqueryMap.$generic.show();
      } else {
       jqueryMap.$generic.hide();
       jqueryMap.$cemetery.show();
     } 
    } // end swapSection 

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  function updateForm(container, operation) {
    var inputDate = $(container.find('.finishDate')).val(),
    // create moment objects
    finish = moment(inputDate),
    // The start object begins the same as the finish
    start = moment(finish);

    // Read the change values from widgets
    timespanMap.years = $(container.find('.years')).val();
    timespanMap.months = $(container.find('.months')).val();
    timespanMap.days = $(container.find('.days')).val();


    // Add or subtract according to opcode value (add/sub)
    doDateCalc(start, operation);
  // Write it to output
  $(container.find('.output')).html('Target: ' + start.format("dddd, MMMM Do YYYY"));
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
    // Start out in generic view
    stateMap.$container = $container;
    $container.hide();

    // Load up all the HTML
    $container.html( configMap.main_html );
    $container.find('#cemeteryDate').html( configMap.cemetery_html );
    $container.find('#genericDate').html( configMap.generic_html );
    
    // Set collection references
    setJqueryMap();

    // Start with the generic view
    genericView = true;
    jqueryMap.$cemetery.hide();

    // Event handlers
    // First: view container specific handlers

    // Click handler for Calc buttons
    jqueryMap.$genCalcButton.click(function() {
      // Parameters are: section container and operation code
      updateForm(jqueryMap.$generic, $('input[name=gen_opcode]:checked').val());
    });

    jqueryMap.$cemCalcButton.click(function() {
      updateForm(jqueryMap.$cemetery, $('input[name=cem_opcode]:checked').val());

    });

    // Handlers when user hits enter in "Days" widget
    jqueryMap.$genDays.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        updateForm(jqueryMap.$generic, $('input[name=gen_opcode]:checked').val());
      }
    });

    jqueryMap.$cemDays.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        updateForm(jqueryMap.$cemetery, $('input[name=cem_opcode]:checked').val());

      }
    });


    // Clear input fields on clear button click
    jqueryMap.$genClear.click(function() {
      $('.finishDate').val('');
      $('.years').val('');
      $('.months').val('');
      $('.days').val('');
      // Also need to reset to subtract at this point
    });

    jqueryMap.$cemClear.click(function() {
      $('.finishDate').val('');
      $('.years').val('');
      $('.months').val('');
      $('.days').val('');
      // Also need to reset to subtract at this point
    });

    // Content container scoped toggle between view containers
    jqueryMap.$toggle.click(function() {
      // Fix up button label
      genericView = (genericView === true)?false:true;
      buttonText = (genericView === true)?'Show Cemetery View':'Show Generic View';
      jqueryMap.$toggle.prop('value', buttonText);

      //Swap actual section contents
      swapSection();
    });


    // Test moment library functions by showing my age
    var now = moment(),
      startday = moment('1951-02-20');
    jqueryMap.$container.append('<br>Date now: ' 
      + now.format("dddd, MMMM Do YYYY"));
 } 

  return { initModule : initModule, 
           postSection : postSection
    };
  //------------------- END PUBLIC METHODS ---------------------
}());
