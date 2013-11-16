define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanPages = angular.module('quanban-pages');

    function homePageCtrl($scope, repoResolver) {
        $scope.boards = null;
        function onFound(boards) {
            $scope.boards = boards;
        }
        function onFailed(error) {
            $scope.$emit('message', {
                level: 'danger',
                content: 'Unable to load the boards :(',
                cause: error
            });
        }
        repoResolver.getBoardsRepo().list().then(onFound, onFailed);
    }
    homePageCtrl.$inject = ['$scope', 'repoResolver'];
    quanbanPages.controller('homePageCtrl', homePageCtrl);

});