define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanCtrls = angular.module('quanban-mocks');

    /**
     * @constructor
     */
    function BoardsMocker($log) {
        function generateTask(i) {
            var task;
            task = {
                id: 'quanban-task-' + i,
                name: 'task name' + i,
                description: 'description' + i,
                createdOn: new Date()
            };
            return task;
        }
        function generateColumn(i, taskNb) {
            var column, j, task;
            column = {
                id: 'quanban-column-' + i,
                name: 'column name' + i,
                description: 'description' + i,
                createdOn: new Date(),
                tasks: []
            };
            for (j = 0; j < taskNb; j = j + 1) {
                task = generateTask(j);
                column.tasks.push(task);
            }
            return column;
        }
        function generateBoard(i, colNb, taskNb) {
            var board, j, column;
            board = {
                id: 'quanban-board-' + i,
                name: 'board name' + i,
                description: 'description' + i,
                createdOn: new Date(),
                columns: []
            };
            for (j = 0; j < colNb; j = j + 1) {
                column = generateColumn(j, taskNb);
                board.columns.push(column);
            }
            $log.log('quanban-mocks', 'boardsMocker', 'generate', board);
            return board;
        }
        return {
            generateBoard: generateBoard
        };
    }
    BoardsMocker.$inject = ['$log'];
    quanbanCtrls.service('boardsMocker', BoardsMocker);

});