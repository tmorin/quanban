define([
    'angular',
    'text!./qBoardList.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qBoardListCtrl($scope, $attrs, repoResolver) {
        $scope.embedded = $attrs.embedded === '' || $attrs.embedded;
        $scope.addBoard = function addBoard() {
            if ($scope.transientBoard && $scope.transientBoard.name) {
                repoResolver.getBoardsRepo().create($scope.transientBoard).then(function onCreated(board) {
                    $scope.boards.push(board);
                    $scope.transientBoard = {};
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to list boards :(',
                        cause: error
                    });
                });
            }
        };
        $scope.removeBoard = function removeBoard(board) {
            if (board && window.confirm('Do you realy want to delete this board?')) {
                repoResolver.getBoardsRepo().del(board).then(function onDeleted(board) {
                    var i;
                    i = $scope.boards.indexOf(board);
                    $scope.boards.splice(i, 1);
                }, function onFailed(error) {
                    $scope.$emit('message', {
                        level: 'danger',
                        content: 'Unable to remove board :(',
                        cause: error
                    });
                });
            }
        };
    }
    qBoardListCtrl.$inject = ['$scope', '$attrs', 'repoResolver'];
    quanbanDirs.directive('qBoardList', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qBoardListCtrl
        };
    });

});