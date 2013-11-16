define([
    'angular',
    'text!./qTaskList.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qTaskListCtrl($scope, $log, $attrs, repoResolver) {
        $scope.embedded = $attrs.embedded === '' || $attrs.embedded;
        $scope.listOpts = {
            axis: 'y',
            connectWith: '.tasks',
            handle: ".handle",
            stop: function stop() {
                $scope.board.columns.forEach(function (c) {
                    c.tasks.forEach(function (t, i) {
                        t.priority = i;
                    });
                });
                /*$scope.board.columns.forEach(function (c) {
                    c.tasks.forEach(function (t, i) {
                        console.log(c.id, t.id, t.priority);
                    });
                });
                $scope.column.tasks.forEach(function (t, i) {
                    console.log($scope.column.id, t.id, t.priority);
                });*/
                return repoResolver.getBoardsRepo().override($scope.board).then(null, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to order tasks :(',
                        cause: error
                    });
                });
            }
        };
        $scope.addTask = function addTask() {
            if ($scope.transientTask && $scope.transientTask.name) {
                repoResolver.getTasksRepo().add($scope.board.id, $scope.column.id, $scope.transientTask).then(function onAdded(task) {
                    $scope.column.tasks.push(task);
                    $scope.transientTask = {};
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to add a task :(',
                        cause: error
                    });
                });
            }
        };
        $scope.removeTask = function removeTask(board, column, task) {
            if (board && column && task && window.confirm('Do you realy want to delete this task?')) {
                repoResolver.getTasksRepo().remove(board.id, column.id, task).then(function onDeleted() {
                    var i, t;
                    t = column.tasks.filter(function (t) {
                        return t.id === task.id;
                    })[0];
                    i = column.tasks.indexOf(t);
                    column.tasks.splice(i, 1);
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to remove a task :(',
                        cause: error
                    });
                });
            }
        };
        $scope.moveTask = function moveTask(board, fromCol, task, offset) {
            if (board && fromCol && task && offset !== 0) {
                var fromI, toI, toCol;
                fromI = board.columns.indexOf(board.columns.filter(function (c) {
                    return c.id === fromCol.id;
                })[0]);
                toI = fromI + offset;
                toCol = board.columns[toI];
                $log.info('will move (', offset, ')', task.id, 'from', fromCol.id, 'to', toCol.id, '/', toI);
                repoResolver.getTasksRepo().moveTask(board.id, fromCol.id, task, toCol.id).then(function onMoved(movedTask) {
                    var i, t;
                    t = fromCol.tasks.filter(function (t) {
                        return t.id === task.id;
                    })[0];
                    i = fromCol.tasks.indexOf(t);
                    fromCol.tasks.splice(i, 1);
                    toCol.tasks.push(movedTask);
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to move a task :(',
                        cause: error
                    });
                });
            }
        };
    }
    qTaskListCtrl.$inject = ['$scope', '$log', '$attrs', 'repoResolver'];
    quanbanDirs.directive('qTaskList', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qTaskListCtrl
        };
    });

});