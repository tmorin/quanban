define([
    'angular',
    'text!./qFooter.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qFooterCtrl($scope, settingsRepo) {
        $scope.settings = settingsRepo.get();
    }
    qFooterCtrl.$inject = ['$scope', 'settingsRepo'];
    quanbanDirs.directive('qFooter', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qFooterCtrl
        };
    });

});