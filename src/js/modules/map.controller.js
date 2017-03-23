/*
* map controller here
*
*/
(function() {
	'use strict';

	function mapController($scope, $timeout, $log) {
		$log.info('initialize Map');
		var currentPos={'lat': 4.7030696, 'lng': -74.0702179};

        $scope.removeMarkers= function(){
			Anuket.removeMarkers();
        };

        $scope.getCurrentPos= function(){
			Anuket.getCurrentPosition();
        };

		Anuket.run();
        Anuket.loadMap('#map-canvas');
	}

	angular.module('app.core').controller('mapController', mapController);
	mapController.$inject = [
		'$scope',
		'$timeout',
		'$log'
	];
})();
