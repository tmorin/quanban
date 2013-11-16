define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanPages = angular.module('quanban-pages');

    function firstPageCtrl($scope, $location, settingsRepo) {
        $scope.settings = settingsRepo.get({
            provider: 'localStorage'
        });
        $scope.settingsProvider = angular.copy($scope.settings);
        $scope.resetProvider = function resetProvider() {
            $scope.settingsProvider = angular.copy($scope.settings);
        };
        $scope.updateProvider = function updateProvider() {
            settingsRepo.set($scope.settingsProvider);
            $location.path('/home');
        };
    }
    firstPageCtrl.$inject = ['$scope', '$location', 'settingsRepo'];
    quanbanPages.controller('firstPageCtrl', firstPageCtrl);

});