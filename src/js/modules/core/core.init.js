/*core init here*/
(function() {
    'use strict';

    function settingsRun($rootScope, $state, $log, $localStorage, APP_CONFIG) {
        $rootScope.app = {
            name: 'MaterializeApp',
            description: ' - Materialize App',
            fullname: 'MaterializeApp',
            year: (new Date).getFullYear(),
            version: '1.0.1',
            viewAnimation: 'ng-fadeInUp',
            background: 'cyan darken-1'
        };

		$rootScope.go = function (path) {
			$state.go(path);
		}

		$rootScope.$on('$stateNotFound', function (event, notFoundState){
			event.preventDefault();
			$log.warn('state not found', notFoundState.to);

			if (APP_CONFIG.DEBUG){
				$log.warn(notFoundState.toParams);
				$log.warn(notFoundState.options);
			}
		});

		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error){
			event.preventDefault();
			$log.error('state error', toState);

			if (APP_CONFIG.DEBUG){
				$log.error(error);
			}
		});
    };

	angular.module('app.core').run(settingsRun);
	settingsRun.$inject = [
		'$rootScope',
		'$state',
		'$log',
		'$localStorage',
		'APP_CONFIG'
	];
})();
