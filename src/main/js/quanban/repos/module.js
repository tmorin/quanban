define([
    'angular',
    //
    '../settings',
    './localstorage'
], function (angular) {

    'use strict';

    var exports = angular.module('quanban-repos', [
        'quanban-settings',
        'quanban-repos-localstorage'
    ]);

    return exports;
});