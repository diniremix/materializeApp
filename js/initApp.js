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
  $( "#action" ).click(function( e ) {
    console.log("sending...");
    var frmMsg=pulseJS.getFormsElements('frmMsg');
    var isValid=pulseJS.validateForms(frmMsg);

    if(isValid){
      $('#modalMsg').closeModal();
      $("#frmMsg")[0].reset();

      pulseJS.callAjax('messages','POST',frmMsg,'json',function(data,status){
        if(data.errorCode==0){
          Materialize.toast('Gracias por tus comentarios!', 4000);
        }else if(data.errorCode>0){
          Materialize.toast('Ops!, Ocurrio un error al enviar tu mensaje', 4000);
        }else{
          Materialize.toast('Ops!, Ocurrio un error, Estas conectado a internet?', 4000);
        }
      });
      
    }else{
      Materialize.toast('Escribe tu nombre y un mensaje...', 4000);
    }
  });

  // pulseJS config
  pulseJS.config({
    url_base:'pulsePHP/api/v1/',
    token_name:'public_key',
    public_key_token:'',
    data_request:'jsonData'
  });

});