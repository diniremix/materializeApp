/*lazyload constants here*/
(function() {
    'use strict';
    angular.module('app.lazyload').constant('APP_REQUIRES', {
        scripts: {
            'classyloader': ['libs/jquery-classyloader/js/jquery.classyloader.min.js'],
            'fastclick': ['libs/fastclick/lib/fastclick.js'],
            'slimscroll': ['libs/slimScroll/jquery.slimscroll.min.js'],
            'screenfull': ['libs/screenfull/dist/screenfull.js'],
            'loadGoogleMapsJS': ['libs/gmap/load-google-maps.js'],
            'jquery-ui': ['libs/jquery-ui/ui/core.js', 'libs/jquery-ui/ui/widget.js'],
            'jquery-ui-widgets': ['libs/jquery-ui/ui/core.js', 'libs/jquery-ui/ui/widget.js', 'libs/jquery-ui/ui/mouse.js', 'libs/jquery-ui/ui/draggable.js', 'libs/jquery-ui/ui/droppable.js', 'libs/jquery-ui/ui/sortable.js', 'libs/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
            'moment': ['libs/moment/min/moment-with-locales.min.js'],
            'fullcalendar': ['libs/fullcalendar/dist/fullcalendar.min.js', 'libs/fullcalendar/dist/fullcalendar.css']
        },
        modules: [{
            name: 'toaster',
            files: [
                'libs/angularjs-toaster/toaster.js',
                'libs/angularjs-toaster/toaster.css'
            ]
        }, {
            name: 'angularFileUpload',
            files: [
                'libs/angular-file-upload/angular-file-upload.js'
            ]
        }, {
            name: 'ui.map',
            files: [
                'libs/angular-ui-map/ui-map.js'
            ]
        }, {
            name: 'datatables',
            files: [
                'libs/datatables/media/css/jquery.dataTables.css',
                'libs/datatables/media/js/jquery.dataTables.js',
                'libs/angular-datatables/dist/angular-datatables.js'
            ],
            serie: true
        }]
    });
})();
