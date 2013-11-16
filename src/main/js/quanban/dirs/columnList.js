define([
    'angular',
    'text!./qColumnList.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qColumnListCtrl($scope, $attrs, repoResolver) {
        $scope.embedded = $attrs.embedded === '' || $attrs.embedded;
        $scope.listOpts = {
            axis: 'y',
            connectWith: '.columns',
            handle: ".handle",
            stop: function stop() {
                $scope.board.columns.forEach(function (c, i) {
                    c.priority = i;
                });
                return repoResolver.getBoardsRepo().override($scope.board).then(null, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to order columns :(',
                        cause: error
                    });
                });
            }
        };
        $scope.addColumn = function addColumn() {
            if ($scope.transientColumn && $scope.transientColumn.name) {
                repoResolver.getColumnsRepo()
                    .add($scope.board.id, $scope.transientColumn)
                    .then(function onAdded(column) {
                        $scope.board.columns.push(column);
                        $scope.transientColumn = {};
                    }, function onFailed(error) {
                        $scope.$emit('message', {
                            level: 'danger',
                            content: 'Unable to update list columns :(',
                            cause: error
                        });
                    });
            }
        };
        $scope.removeColumn = function removeColumn(board, column) {
            if (board && column && window.confirm('Do you realy want to delete this column?')) {
                repoResolver.getColumnsRepo().remove(board.id, column).then(function onDeleted() {
                    var i, c;
                    c = board.columns.filter(function (c) {
                        return c.id === column.id;
                    })[0];
                    i = board.columns.indexOf(c);
                    board.columns.splice(i, 1);
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to remove a column :(',
                        cause: error
                    });
                });
            }
        };
    }
    qColumnListCtrl.$inject = ['$scope', '$attrs', 'repoResolver'];
    quanbanDirs.directive('qColumnList', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qColumnListCtrl
        };
    });

});