define([
    'angular',
    'text!./qBoardDetails.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qBoardDetailsCtrl($scope, repoResolver) {
        $scope.$watch('board', function (board) {
            $scope.editable = angular.copy(board);
        });
        $scope.updateBoard = function updateBoard() {
            repoResolver.getBoardsRepo().update($scope.editable).then(function onUpdated(board) {
                $scope.board = board;
                $scope.resetBoard();
                $scope.$emit('message', {
                    level: 'success',
                    content: 'The board has been updated :)'
                });
            }, function onFailed(error) {
                $scope.$emit('message', {
                    level: 'danger',
                    content: 'Unable to update the board :(',
                    cause: error
                });
            });
        };
        $scope.resetBoard = function resetBoard() {
            $scope.editable = angular.copy($scope.board);
        };
    }
    qBoardDetailsCtrl.$inject = ['$scope', 'repoResolver'];
    quanbanDirs.directive('qBoardDetails', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qBoardDetailsCtrl
        };
    });

});