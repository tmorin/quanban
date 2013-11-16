define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanPages = angular.module('quanban-pages');

    function settingsPageCtrl($scope, settingsRepo, repoResolver, backupAndRestore) {
        $scope.settings = settingsRepo.get({
            provider: 'localStorage'
        });
        $scope.settingsProvider = angular.copy($scope.settings);
        $scope.resetProvider = function resetProvider() {
            $scope.settingsProvider = angular.copy($scope.settings);
        };
        $scope.updateProvider = function updateProvider() {
            settingsRepo.set($scope.settingsProvider);
            $scope.settingsProvider = angular.copy(settingsRepo.get());
            $scope.$emit('message', {
                level: 'success',
                content: 'The settings has been updated :)'
            });
        };
        $scope.clearLocalStorageData = function clearLocalStorageData() {
            if (window.confirm('Do you realy want to clear all boards?')) {
                repoResolver.getBoardsRepo().clear().then(function onCleared() {
                    $scope.$emit('message', {
                        level: 'success',
                        content: 'All boards has been cleared :)'
                    });
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to clear boards :(',
                        cause: error
                    });
                });
            }
        };
        $scope.backupAndRestoreAvailable = backupAndRestore.isAvailable();
        $scope.backupBoards = function backupBoards() {
            backupAndRestore.backup().then(null, function onFailed(error) {
                $scope.$emit('message', {
                    level: 'danger',
                    content: 'Unable to backup boards :(',
                    cause: error
                });
            });
        };
        $scope.restoreBoards = function restoreBoards() {
            backupAndRestore.restore().then(function () {
                $scope.$emit('message', {
                    level: 'success',
                    content: 'Boards has bean restored :)'
                });
            }, function onFailed(error) {
                $scope.$emit('message', {
                    level: 'danger',
                    content: 'Unable to restore boards :(',
                    cause: error
                });
            });
        };
    }
    settingsPageCtrl.$inject = ['$scope', 'settingsRepo', 'repoResolver', 'backupAndRestoreSvc'];
    quanbanPages.controller('settingsPageCtrl', settingsPageCtrl);

});