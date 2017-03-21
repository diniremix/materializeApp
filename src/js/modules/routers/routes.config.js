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
        }).state('app.dash', {
            url: '/dash',
            title: 'Dashboard',
            templateUrl: helper.basepath('dash.html')
            //controller: 'DashController',
            //controllerAs: 'DashCtrl'
        }).state('app.floatbtn', {
            url: '/floatbuttons',
            title: 'Float Button',
            templateUrl: helper.basepath('floatbutton.html'),
            //controller: 'floatBtnController',
            //controllerAs: 'floatBtnCtrl'
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
