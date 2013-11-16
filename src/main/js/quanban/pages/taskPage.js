define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanPages = angular.module('quanban-pages');

    function taskPageCtrl($scope, $routeParams, repoResolver) {
        $scope.board = null;
        $scope.column = null;
        $scope.task = null;
        repoResolver.getBoardsRepo().get($routeParams.boardId).then(function onBoardFound(board) {
            $scope.board = board;
            $scope.column = board.columns.filter(function (c) {
                return c.id === $routeParams.columnId;
            })[0];
            if ($scope.column) {
                $scope.task = $scope.column.tasks.filter(function (t) {
                    return t.id === $routeParams.taskId;
                })[0];
                if (!$scope.task) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to find the task :('
                    });
                }
            } else {
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
    taskPageCtrl.$inject = ['$scope', '$routeParams', 'repoResolver'];
    quanbanPages.controller('taskPageCtrl', taskPageCtrl);

});