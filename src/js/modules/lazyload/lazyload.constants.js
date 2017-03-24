/*lazyload constants here*/
(function() {
    'use strict';
    angular.module('app.lazyload').constant('APP_REQUIRES', {
        debug: true,
        scripts: {
            'fastclick': ['libs/fastclick/lib/fastclick.js'],
            'Maps': [
                'libs/gmaps/gmaps.min.js',
                'libs/gmap.js'
            ]
        }
    });
})();
