require.config({
    baseUrl: './',
    paths: {
        'text': 'assets/requirejs/text-2.0.10',
        'jquery': 'assets/jquery-1.10.2',
        'jquery-ui': 'assets/jquery-ui-1.10.3',
        'bootstrap': 'assets/bootstrap-3/js/bootstrap',
        'angular': 'assets/angular/angular-1.0.8',
        'angular-ui-sortable': 'assets/angular/ui-sortable-2013-10-03',
        'Blob': 'assets/polyfill/Blob-2013-06-20',
        'classList': 'assets/polyfill/classList-2012-11-15',
        'FileSaver': 'assets/polyfill/FileSaver-2013-01-23',
        'json2': 'assets/polyfill/json2-2013-05-26'
    },
    shim: {
        'jquery-ui': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-ui-sortable': {
            deps: ['jquery-ui', 'angular']
        },
        'FileSaver': {
            deps: ['Blob']
        }
    },
    packages: [
        'quanban',
        'quanban/dirs',
        'quanban/ctrls',
        'quanban/mocks',
        'quanban/pages',
        'quanban/repos',
        'quanban/repos/localstorage',
        'quanban/settings',
        'quanban/svc'
    ],
    urlArgs: '${project.version}'
});

require([
    'angular',
    //
    'text',
    'jquery',
    'jquery-ui',
    'bootstrap',
    'angular',
    'angular-ui-sortable',
    'Blob',
    'classList',
    'FileSaver',
    'json2',
    'quanban'
], function (angular) {

    'use strict';

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['quanban']);
    });
});