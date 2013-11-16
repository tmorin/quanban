define([
    'angular',
    'text!./qTaskDetails.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qTaskDetailsCtrl($scope, $attrs, repoResolver) {
        $scope.open = $attrs.open === 'true';
        $scope.$watch('task', function (task) {
            $scope.editable = angular.copy(task);
        });
        $scope.updateTask = function updateTask() {
            repoResolver.getTasksRepo().update($scope.board.id, $scope.column.id, $scope.editable).then(function onUpdated(task) {
                $scope.task = task;
                $scope.resetTask();
                $scope.$emit('message', {
                    level: 'success',
                    content: 'The task has been updated :)'
                });
            }, function onFailed(error) {
                $scope.$emit('message', {
                    level: 'danger',
                    content: 'Unable to update the task :(',
                    cause: error
                });
            });
        };
        $scope.resetTask = function resetTask() {
            $scope.editable = angular.copy($scope.task);
        };
    }
    qTaskDetailsCtrl.$inject = ['$scope', '$attrs', 'repoResolver'];
    quanbanDirs.directive('qTaskDetails', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qTaskDetailsCtrl
        };
    });

});