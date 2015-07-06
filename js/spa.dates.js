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
      + '<section class ="dateCalc"><b>Date Calculation Region</b></section>',
      input_html : String()
      + '<p><label for="deathDate">Death Date</label>'
      + ' <input type="date" id="deathDate" />'
      + ' <p><label for="years">Years</label>'
      + ' <input type="number" maxlength="3" id="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" id="months" /><br>'
      + ' <label for="days">Days</label>'
      + ' <input type="number" maxlength="2" id="days" />'
      + ' <br><input type="button" value="Calc" id="calcButton" />'
      + ' <div id="output">Birth: </div>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    calcButton;
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

  // Begin DOM method addClickHandler/
  function addClickHandler(link, verbiage) {
    link.addEventListener("click", function(e) {
      savedContent[pushedCount++] = jqueryMap.$content.html();
      jqueryMap.$content.html(verbiage);
      history.pushState(null, null, link.href); 
      e.preventDefault();
      }, false);
    }
  // End DOM method /addClickHandler/

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
    calcButton = jqueryMap.$section.find('#calcButton');

    calcButton.click(function() {
      var inputDate = $('#deathDate').val(),
        lifeYears = $('#years').val(),
        lifeMonths = $('#months').val(),
        lifeDays = $('#days').val(),
        death = moment(inputDate),
        birth = moment(death);

        birth.subtract(lifeYears, 'years', lifeMonths, 'months', lifeDays, 'days'); 
      $('#output').html('Birth: ' + birth.format("dddd, MMMM Do YYYY") );
      });

    // Test moment library functions
    var now = moment(),
      birthday = moment('1951-02-20');
    jqueryMap.$section.append('<br>Now ' 
      + now.format("dddd, MMMM Do YYYY") 
      + '<br>My exact age: ' + moment.duration(now.diff(birthday)).format());

 } 

  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
