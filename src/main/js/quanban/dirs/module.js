define([
    'angular',
    //
    'angular-ui-sortable',
    '../repos'
], function (angular) {

    'use strict';

    var exports = angular.module('quanban-dirs', ['ui.sortable', 'quanban-repos']);

    return exports;
});