$(document).ready(function() {
	'use strict';
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    //initialize slide
    $('.slider').slider({ full_width: true });

    //initialize modal
    $('.modal-trigger').leanModal();

    //initialize materialboxed
    $('.materialboxed').materialbox();

    //submit message
    $("#action").click(function(e) {
        console.log("sending...");
        var frmMsg = pulseJS.getFormsElements('frmMsg');
        var isValid = pulseJS.validateForms(frmMsg);

        if (isValid) {
            $('#modalMsg').closeModal();
            $("#frmMsg")[0].reset();

            pulseJS.callAjax('messages', 'POST', frmMsg, 'json', function(data, status) {
                if (data.errorCode == 0) {
                    Materialize.toast('Gracias por tus comentarios!', 4000);
                } else if (data.errorCode > 0) {
                    Materialize.toast('Ops!, Ocurrio un error al enviar tu mensaje', 4000);
                } else {
                    Materialize.toast('Ops!, Ocurrio un error, Estas conectado a internet?', 4000);
                }
            });

        } else {
            Materialize.toast('Escribe tu nombre y un mensaje...', 4000);
        }
    });

    // pulseJS config
    pulseJS.config({
        url_base: 'pulsePHP/api/v1/',
        token_name: 'public_key',
        public_key_token: '',
        data_request: 'jsonData'
    });

});

function initMap() {
    console.info('loading google maps');
    // Google Maps
    $('#map-canvas').addClass('loading');
    var latlng = new google.maps.LatLng(40.6700, -73.9400); // Set your Lat. Log. New York
    var settings = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false,
        draggable: true,
        styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
        navigationControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), settings);

    google.maps.event.addDomListener(window, "resize", function() {
        console.log('event to resize');
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
        $('#map-canvas').removeClass('loading');
    });
}
