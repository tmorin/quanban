define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanPages = angular.module('quanban-pages');

    function boardPageCtrl($scope, $routeParams, repoResolver) {
        $scope.board = null;
        repoResolver.getBoardsRepo().get($routeParams.boardId).then(function onFound(board) {
            $scope.board = board;
        },  function onFailed(error) {
            $scope.$emit('message', {
                level: 'danger',
                content: 'Unable to load the board :(',
                cause: error
            });
        });
    }
    boardPageCtrl.$inject = ['$scope', '$routeParams', 'repoResolver'];
    quanbanPages.controller('boardPageCtrl', boardPageCtrl);

});