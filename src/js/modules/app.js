/*
* app module here
*
*/
(function() {
	'use strict';

	function bodyController($scope, $timeout, $log) {

	    $scope.toast = function (message, duration) {
	        Materialize.toast(message, duration);
	    }

	    $timeout(function(){
			$log.info('initialize MaterializeCSS');

			//initialize MaterializeCSS
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
	    }, 300);
	}

	angular.module('app.core').controller('bodyController', bodyController);
	bodyController.$inject = [
		'$scope',
		'$timeout',
		'$log'
	];
})();
