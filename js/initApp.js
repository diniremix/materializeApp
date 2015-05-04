$(document).ready(function(){

  //initialize sidebar nav
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

  //initialize slide
  $('.slider').slider({full_width: true});

  //initialize modal
  $('.modal-trigger').leanModal();

  //initialize materialboxed
  $('.materialboxed').materialbox();

  //submit message
  $( "#frmMsg" ).submit(function( event ) {
    $('#modal2').closeModal();
    console.log("sending...");
  });

});