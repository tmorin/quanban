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
    function ColumnsRepo($q, $log) {

        function add(boardId, column) {
            var d = $q.defer();
            if (H.addColumn(boardId, column)) {
                $log.log('ColumnsRepo#add', 'resolve', column);
                d.resolve(column);
            } else {
                $log.error('ColumnsRepo#add', 'reject', column);
                d.reject('Unable to add the column');
            }
            return d.promise;
        }

        function get(boardId, columnId) {
            var d, board, column;
            d = $q.defer();
            board = H.findBoardById(boardId);
            if (board) {
                column = H.findColumnById(board, columnId);
                if (column) {
                    $log.log('ColumnsRepo#get', 'resolve', column);
                    d.resolve(column);
                } else {
                    $log.error('ColumnsRepo#get', 'reject', boardId, columnId);
                    d.reject('Unable to find the column');
                }
            } else {
                $log.error('ColumnsRepo#get', 'reject', boardId, columnId);
                d.reject('Unable to find the board');
            }
            return d.promise;
        }

        function update(boardId, column) {
            var d = $q.defer();
            if (H.updateColumn(boardId, column)) {
                $log.log('ColumnsRepo#update', 'resolve', column);
                d.resolve(column);
            } else {
                $log.error('ColumnsRepo#update', 'reject', boardId, column);
                d.reject('Unable to update the column');
            }
            return d.promise;
        }

        function remove(boardId, column) {
            var d = $q.defer();
            if (H.removeColumn(boardId, column.id)) {
                $log.log('ColumnsRepo#remove', 'resolve', column);
                d.resolve(column);
            } else {
                $log.error('ColumnsRepo#remove', 'reject', boardId, column.id);
                d.reject('Unable to remove the column');
            }
            return d.promise;
        }

        function list(boardId) {
            var d, board;
            d = $q.defer();
            board = H.findBoardById(boardId);
            if (board) {
                $log.log('ColumnsRepo#list', 'resolve', board.columns);
                d.resolve(board.columns);
            } else {
                $log.error('ColumnsRepo#list', 'reject', boardId);
                d.reject('Unable to find the board');
            }
            return d.promise;
        }

        return {
            add: add,
            update: update,
            remove: remove,
            list: list,
            get: get
        };
    }
    ColumnsRepo.$inject = ['$q', '$log'];
    quanbanLocalstorage.service('columnsRepoLs', ColumnsRepo);

});