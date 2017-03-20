/*core init here*/
(function() {
    'use strict';

    function settingsRun($rootScope, $state, $log, $localStorage) {
        $rootScope.app = {
            name: 'MaterializeApp',
            description: ' - Materialize App',
            fullname: 'MaterializeApp',
            year: (new Date).getFullYear(),
            version: '1.0.1',
            viewAnimation: 'ng-fadeInUp',
            background: 'cyan darken-1'
        };
    };

	angular.module('app.core').run(settingsRun);
	settingsRun.$inject = [
		'$rootScope',
		'$state',
		'$log',
		'$localStorage'
	];
})();
