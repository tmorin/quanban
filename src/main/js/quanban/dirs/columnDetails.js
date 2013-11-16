define([
    'angular',
    'text!./qColumnDetails.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qColumnDetailsCtrl($scope, repoResolver) {
        $scope.$watch('column', function (column) {
            $scope.editable = angular.copy(column);
        });
        $scope.updateColumn = function updateColumn() {
            repoResolver.getColumnsRepo().update($scope.board.id, $scope.editable).then(function onUpdated(column) {
                $scope.column = column;
                $scope.resetColumn();
                $scope.$emit('message', {
                    level: 'success',
                    content: 'The column has been updated :)'
                });
            }, function onFailed(error) {
                $scope.$emit('message', {
                    level: 'danger',
                    content: 'Unable to update the column :(',
                    cause: error
                });
            });
        };
        $scope.resetColumn = function resetColumn() {
            $scope.editable = angular.copy($scope.column);
        };
    }
    qColumnDetailsCtrl.$inject = ['$scope', 'repoResolver'];
    quanbanDirs.directive('qColumnDetails', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qColumnDetailsCtrl
        };
    });

});