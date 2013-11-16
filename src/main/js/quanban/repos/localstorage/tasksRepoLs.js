define([
    'angular',
    './helpers',
    //
    './module'
], function (angular, H) {

    'use strict';

    var quanbanLocalstorage = angular.module('quanban-repos-localstorage');

    /**
     * @constructor
     */
    function TasksRepo($q, $log) {

        function add(boardId, columnId, task) {
            var d = $q.defer();
            if (H.addTask(boardId, columnId, task)) {
                $log.log('TasksRepo#add', 'resolve', task);
                d.resolve(task);
            } else {
                $log.error('TasksRepo#add', 'reject', boardId, columnId, task);
                d.reject('Unable to add the task');
            }
            return d.promise;
        }

        function get(boardId, columnId, taskId) {
            var d = $q.defer(),
                task = H.findTaskById(boardId, columnId, taskId);
            if (task) {
                $log.log('TasksRepo#get', 'resolve', task);
                d.resolve(task);
            } else {
                $log.error('TasksRepo#get', 'reject', boardId, columnId, taskId);
                d.reject('Unable to get the task');
            }
            return d.promise;
        }

        function update(boardId, columnId, task) {
            var d = $q.defer();
            if (H.updateTask(boardId, columnId, task)) {
                $log.log('TasksRepo#update', 'resolve', task);
                d.resolve(task);
            } else {
                $log.error('TasksRepo#update', 'reject', boardId, columnId, task);
                d.reject('Unable to update the task');
            }
            return d.promise;
        }

        function remove(boardId, columnId, task) {
            var d = $q.defer();
            if (H.removeTask(boardId, columnId, task)) {
                $log.log('TasksRepo#remove', 'resolve', task);
                d.resolve(task);
            } else {
                $log.error('TasksRepo#remove', 'reject', boardId, columnId, task);
                d.reject('Unable to remove the task');
            }
            return d.promise;
        }

        function list(boardId, columnId) {
            var d, board, column;
            d = $q.defer();
            board = H.findBoardById(boardId);
            if (board) {
                column = H.findColumnById(board, columnId);
                if (column) {
                    $log.log('TasksRepo#list', 'resolve', column.tasks);
                    d.resolve(column.tasks);
                } else {
                    $log.error('TasksRepo#list', 'reject', boardId, columnId);
                    d.reject('Unable to find the column');
                }
            } else {
                $log.error('TasksRepo#list', 'reject', boardId, columnId);
                d.reject('Unable to find the board');
            }
            return d.promise;
        }

        function moveTask(boardId, fromColId, task, toColId) {
            var d, board, fromCol, toCol, t, i;
            d = $q.defer();
            board = H.findBoardById(boardId);
            if (board) {
                fromCol = H.findColumnById(board, fromColId);
                toCol = H.findColumnById(board, toColId);
                if (fromCol && toCol) {
                    t = H.findTaskById(fromCol, task.id);
                    if (t) {
                        // remove task in fromCol
                        i = fromCol.tasks.indexOf(t);
                        fromCol.tasks.splice(i, 1);
                        // push task in toCol
                        toCol.tasks.push(t);
                        t.updatedOn = new Date();
                        $log.log('TasksRepo#moveTask', 'resolve', task);
                        d.resolve(task);
                    } else {
                        $log.error('TasksRepo#moveTask', 'reject', boardId, fromColId, task, toColId);
                        d.reject('Unable to find the task');
                    }
                } else {
                    $log.error('TasksRepo#moveTask', 'reject', boardId, fromColId, task, toColId);
                    d.reject('Unable to find the colums');
                }
            } else {
                $log.error('TasksRepo#moveTask', 'reject', boardId, fromColId, task, toColId);
                d.reject('Unable to find the board');
            }
            return d.promise;
        }

        return {
            add: add,
            update: update,
            remove: remove,
            list: list,
            get: get,
            moveTask: moveTask
        };
    }
    TasksRepo.$inject = ['$q', '$log'];
    quanbanLocalstorage.service('tasksRepoLs', TasksRepo);

});