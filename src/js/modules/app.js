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

		$log.info('initialize MaterializeCSS');
	}

	angular.module('app.core').controller('bodyController', bodyController);
	bodyController.$inject = [
		'$scope',
		'$timeout',
		'$log'
	];
})();
