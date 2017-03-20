/* routes config here*/
(function() {
    'use strict';

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/app/dash');
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: helper.basepath('app.html')
            //resolve: helper.resolveFor('fastclick', 'screenfull', 'classyloader', 'toaster')
        }).state('app.dash', {
            url: '/dash',
            title: 'Dashboard',
            templateUrl: helper.basepath('floatbutton.html')
            //controller: 'DashController',
            //controllerAs: 'DashCtrl',
        });
    }

    angular.module('app.routes').config(routesConfig);
    routesConfig.$inject = [
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'RouteHelpersProvider'
    ];
})();
