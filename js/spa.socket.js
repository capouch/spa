/*
 * spa.socket.js
 * Socket.io feature module for OSCON Demo
 * Brian Capouch 
*/

spa.socket = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        + '<section id="socketIO">Socket.io Demonstration'
          + '<ul id="messages"></ul>'
          + '<form action="">'
            + '<input id="m" autocomplete="off" /><button>Send</button>'
          + '</form>'
        + '</section>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks, postSection,
    socketIO, socket;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Overkill for small amount of functionality
    jqueryMap = {
      $container : $container,
      $socketIO  : $container.find('#socketIO')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /setClicks/
  function setClicks() {
    addClickHandler(document.getElementById("clientRoutes"), 'Brian Content');
    addClickHandler(document.getElementById("testRoutes"), 'Craig Content');
    // Enable backing up through content
    window.addEventListener("popstate", function(e) {
      jqueryMap.$content.html(savedContent[--pushedCount]);
      });
    }
  // End DOM method /setClicks/

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
  // Example   : spa.socket.initModule( $('#app_div_id') );
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
    //jqueryMap.$socketIO.html( configMap.main_html );
    //queryMap.$container.show();

    // socket.io
    socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
      // keep scrollbar at bottom
      $('#messages').scrollTop(100000000);
    });

  };

  postSection = function() {
    jqueryMap.$socketIO.show();
    jqueryMap.$container.show();
  };

  return { initModule : initModule,
           postSection : postSection
    };
  //------------------- END PUBLIC METHODS ---------------------
}());
