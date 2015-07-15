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
      + ' <label for="startDate">(Start</label>'
      + ' <input type="date" id="startDate" />)'
      + ' <p><label for="finishDate">End</label>'
      + ' <input type="date" class="finishDate" /><b>(Date of interest)</b>'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" class="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" class="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" class="days" />'
      + ' <input type="radio" id="gen_default" name="gen_whichOp" value="sub" checked> Subtract'
      + ' <input type="radio" name="gen_whichOp" value="add">Add'
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
      + ' <input type="radio" id="cem_default" name="cem_whichOp" class = "add" value="sub" checked> Subtract'
      + ' <input type="radio" name="cem_whichOp" class= "add" value="add">Add'
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
    swapSection, dateSpan;
  //----------------- END MODULE SCOPE VARIABLES ---------------

 //------------------- BEGIN UTILITY METHODS ------------------

  // Begin method /doDateCalc/
  doDateCalc = function(startDate, operation) {
    // Mutate moment startDate by adding/subtracting timespan
    if (operation === 'add') 
      startDate.add(timespanMap.years, 'years').add(timespanMap.months,'months').add(timespanMap.days, 'days');
    else
      startDate.subtract(timespanMap.years, 'years').subtract(timespanMap.months, 'months').subtract(timespanMap.days, 'days');
    };

  // Begin method /dateSpan/
  dateSpan = function() {
    // Get dates from the input widgets
    var earlier = moment(jqueryMap.$container.find('#startDate').val()),
      later = moment(jqueryMap.$container.find('.finishDate').val()),

      // Calculate duration
      duration = (moment.duration(later.diff(earlier)).format("Y[y] M[m] D[d]")),
      // Use regex to extract years, months, and days
      matchString = /((\d+)y )*((\d+)m )*((\d+)d)*/,
      match = matchString.exec(duration),
      yrs, mos, days;

    // Put them into input/display widgets
    // Set field values 
    yrs = (match[2])?match[2]:'';
    mos = (match[4])?match[4]:'';
    days = (match[6])?match[6]:'';
    // Write them into boxes
    jqueryMap.$generic.find('.years').val(yrs);
    jqueryMap.$generic.find('.months').val(mos);
    jqueryMap.$generic.find('.days').val(days);
    } // end /dateSpan

  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------

  // Begin method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container     : $container,
      $generic	     : $container.find('#genericDate'),
      $cemetery      : $container.find('#cemeteryDate'),
      $toggle        : $container.find('#toggleButton'),

      // We need one of each of these per view container
      $genCalcButton : $container.find('#genericDate').find('.calcButton'),
      $cemCalcButton : $container.find('#cemeteryDate').find('.calcButton'),
      $genDays       : $container.find('#genericDate').find('.days'),
      $cemDays       : $container.find('#cemeteryDate').find('.days'),
      $genClear      : $container.find('#genericDate').find('.clearButton'),
      $cemClear      : $container.find('#cemeteryDate').find('.clearButton')
    };
  }; // end setJqueryMap

  // Begin method /swapSection/
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

  // Begin event handler /updateForm/
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


    // Add or subtract according to whichOp value (add/sub)
    doDateCalc(start, operation);
    // Write it to output
    $(container.find('.output')).html('Target: ' + start.format("dddd, MMMM Do YYYY"));
  } // end updateForm

  // Begin event handler /clear/
  function clear(container) { 
    container.find('.finishDate').val('');
    container.find('.years').val('');
    container.find('.months').val('');
    container.find('.days').val('');
    // Reset "sub" as default operation
    $('#gen_default').prop('checked', true);
    } // end /clear/ 

  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------

  // Begin Public method /initModule/
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
      // In genericDate view, Calc button has two functions
      if ($container.find('#startDate').val() && $container.find('.finishDate').val())
        // Figure distance between two dates
        dateSpan();
      else
        // Add to or subtract from a date
        // Parameters are view container and operation code
        updateForm(jqueryMap.$generic, $('input[name=gen_whichOp]:checked').val());
    });

    jqueryMap.$cemCalcButton.click(function() {
      updateForm(jqueryMap.$cemetery, $('input[name=cem_whichOp]:checked').val());
    }); // end handlers for Calc buttons

    // Handlers when user hits enter in "Days" widget
    jqueryMap.$genDays.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        updateForm(jqueryMap.$generic, $('input[name=gen_whichOp]:checked').val());
      }
    }); 

    jqueryMap.$cemDays.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        updateForm(jqueryMap.$cemetery, $('input[name=cem_whichOp]:checked').val());

      }
    }); // End handlers for enter key pressed


    // Clear input fields on clear button click
    jqueryMap.$genClear.click(function() {
      clear(jqueryMap.$generic);
      $('#startDate').val('');
      $('#gen_default').prop('checked', true);
    });

    jqueryMap.$cemClear.click(function() {
      clear(jqueryMap.$cemetery);
      $('#cem_default').prop('checked', true);
    }); // End handlers for Clear button pressed

    // Begin handler for view toggle button
    jqueryMap.$toggle.click(function() {
      // Fix up button label
      genericView = (genericView === true)?false:true;
      buttonText = (genericView === true)?'Show Cemetery View':'Show Generic View';
      jqueryMap.$toggle.prop('value', buttonText);

      //Swap actual section contents
      swapSection();
    }); // End handler for view toggle button


    // Test moment library functions by showing my age
    var now = moment(),
      startday = moment('1951-02-20');
    jqueryMap.$container.append('<br>Date now: ' 
      + now.format("dddd, MMMM Do YYYY"));
 } // End public method /initModule

  // Begin method /postSection/
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

  return { initModule : initModule, 
           postSection : postSection
    };
  //------------------- END PUBLIC METHODS ---------------------
}());
