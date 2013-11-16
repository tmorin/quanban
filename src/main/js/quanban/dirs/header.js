define([
    'angular',
    'text!./qHeader.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qHeaderCtrl($scope, $location, settingsRepo) {
        $scope.settings = settingsRepo.get();
        $scope.isActive = function isActive() {
            var i;
            for (i = 0; i < arguments.length; i = i + 1) {
                if ($location.path().indexOf(arguments[i]) > -1) {
                    return true;
                }
            }
        };
    }
    qHeaderCtrl.$inject = ['$scope', '$location', 'settingsRepo'];
    quanbanDirs.directive('qHeader', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qHeaderCtrl
        };
    });

});