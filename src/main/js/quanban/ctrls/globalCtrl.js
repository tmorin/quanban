define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanCtrls = angular.module('quanban-ctrls');

    /**
     * @public
     */
    function globalCtrl($scope) {
        $scope.hasLocalStorage = typeof window.localStorage === 'object';
        $scope.getBoardTooltip = function getBoardTooltip(board) {
            var value = [];
            if (board) {
                value.push('description: ' + (board.description || ''));
                value.push('columns: ' + board.columns.length);
                value.push('created on: ' + (board.createdOn || ''));
                value.push('updated on: ' + (board.updatedOn || ''));
            }
            return value.join('\n');
        };
        $scope.getColumnTooltip = function getColumnTooltip(column) {
            var value = [];
            if (column) {
                value.push('description: ' + (column.description || ''));
                value.push('tasks: ' + column.tasks.length);
                value.push('created on: ' + (column.createdOn || ''));
                value.push('updated on: ' + (column.updatedOn || ''));
            }
            return value.join('\n');
        };
        $scope.getTaskTooltip = function getTaskTooltip(task) {
            var value = [];
            if (task) {
                value.push('description: ' + (task.description || ''));
                value.push('created on: ' + (task.createdOn || ''));
                value.push('updated on: ' + (task.updatedOn || ''));
            }
            return value.join('\n');
        };
        $scope.isFirstColumn = function isFirstColumn(board, column) {
            if (board && column) {
                var c, i;
                c = board.columns.filter(function (c) {
                    return c.id === column.id;
                })[0];
                i = board.columns.indexOf(c);
                return i === 0;
            }
        };
        $scope.isLastColumn = function isLastColumn(board, column) {
            if (board && column) {
                var c, i;
                c = board.columns.filter(function (c) {
                    return c.id === column.id;
                })[0];
                i = board.columns.indexOf(c);
                return i === board.columns.length - 1;
            }
        };
        $scope.getNextColumn = function getNextColumn(board, column) {
            if (!$scope.isLastColumn(board, column)) {
                var c, i;
                c = board.columns.filter(function (c) {
                    return c.id === column.id;
                })[0];
                i = board.columns.indexOf(c);
                return board.columns[i + 1];
            }
        };
        $scope.getPreviousColumn = function getPreviousColumn(board, column) {
            if (!$scope.isFirstColumn(board, column)) {
                var c, i;
                c = board.columns.filter(function (c) {
                    return c.id === column.id;
                })[0];
                i = board.columns.indexOf(c);
                return board.columns[i - 1];
            }
        };
    }
    globalCtrl.$inject = ['$scope'];
    quanbanCtrls.controller('globalCtrl', globalCtrl);

});