var app = angular.module('materializeApp', ['ui.materialize'])
    .controller('BodyController', ["$scope", function ($scope) {

        console.log('loading angular', $scope.select);

		//initialize MaterializeCSS
        $scope.toast = function (message, duration) {
            Materialize.toast(message, duration);
        }

		$('.button-collapse').sideNav({
			menuWidth: 300, // Default is 300
			edge: 'left', // Choose the horizontal origin
			closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
		});

		//initialize slide
		$('.slider').slider({full_width: true});

		//initialize modal
		$('.modal').modal();

		//initialize materialboxed
		$('.materialboxed').materialbox();

    }]);

function initMap(){
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
        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
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
