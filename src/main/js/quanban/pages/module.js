define([
    'angular',
    'text!./board.html',
    'text!./column.html',
    'text!./first.html',
    'text!./home.html',
    'text!./settings.html',
    'text!./task.html',
    //
    '../dirs',
    '../ctrls',
    '../svc',
    '../repos',
    '../settings'
], function (
    angular,
    boardTpl,
    columnTpl,
    firstTpl,
    homeTpl,
    settingsTpl,
    taskTpl
) {

    'use strict';

    function config($routeProvider) {
        $routeProvider.when('/first', {
            template: firstTpl,
            controller: 'firstPageCtrl'
        });
        $routeProvider.when('/home', {
            template: homeTpl,
            controller: 'homePageCtrl'
        });
        $routeProvider.when('/settings', {
            template: settingsTpl,
            controller: 'settingsPageCtrl'
        });
        $routeProvider.when('/board/:boardId', {
            template: boardTpl,
            controller: 'boardPageCtrl'
        });
        $routeProvider.when('/board/:boardId/column/:columnId', {
            template: columnTpl,
            controller: 'columnPageCtrl'
        });
        $routeProvider.when('/board/:boardId/column/:columnId/task/:taskId', {
            template: taskTpl,
            controller: 'taskPageCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
    config.$inject = ['$routeProvider'];

    var exports = angular.module('quanban-pages', [
        'quanban-dirs',
        'quanban-ctrls',
        'quanban-svc',
        'quanban-repos',
        'quanban-settings'
    ]);
    exports.config(config);

    return exports;

});