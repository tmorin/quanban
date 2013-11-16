define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanPages = angular.module('quanban-pages');

    function columnPageCtrl($scope, $routeParams, repoResolver) {
        $scope.board = null;
        $scope.column = null;
        repoResolver.getBoardsRepo().get($routeParams.boardId).then(function onBoardFound(board) {
            $scope.board = board;
            $scope.column = board.columns.filter(function (c) {
                return c.id === $routeParams.columnId;
            })[0];
            if (!$scope.column) {
                $scope.$emit('message', {
                    level: 'danger',
                    content: 'Unable to find the column :('
                });
            }
        }, function onFailed(error) {
            $scope.$emit('message', {
                level: 'danger',
                content: 'Unable to load the board :(',
                cause: error
            });
        });
    }
    columnPageCtrl.$inject = ['$scope', '$routeParams', 'repoResolver'];
    quanbanPages.controller('columnPageCtrl', columnPageCtrl);

});