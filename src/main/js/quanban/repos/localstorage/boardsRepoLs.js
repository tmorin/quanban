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
    function BoardsRepo($q, $log) {

        function create(board) {
            var d = $q.defer();
            d.resolve(H.createBoard(board));
            $log.log('BoardsRepo#create', 'resolve', board);
            return d.promise;
        }

        function get(boardId) {
            var d = $q.defer(),
                board = H.findBoardById(boardId);
            if (board) {
                $log.log('BoardsRepo#get', 'resolve', board);
                d.resolve(board);
            } else {
                $log.error('BoardsRepo#get', 'reject', boardId);
                d.reject('Unable to get the board');
            }
            return d.promise;
        }

        function del(board) {
            var d = $q.defer();
            if (H.delBoard(board.id)) {
                $log.log('BoardsRepo#del', 'resolve', board.id);
                d.resolve(board);
            } else {
                $log.error('BoardsRepo#del', 'reject', board.id);
                d.reject('Unable to delete the board');
            }
            return d.promise;
        }

        function update(board) {
            var d = $q.defer();
            if (H.updateBoard(board)) {
                $log.log('BoardsRepo#update', 'resolve', board.id);
                d.resolve(board);
            } else {
                $log.error('BoardsRepo#update', 'reject', board.id);
                d.reject('Unable to update the board');
            }
            return d.promise;
        }

        function list(query) {
            var d, boards;
            d = $q.defer();
            boards = H.listBoards(query);
            $log.log('BoardsRepo#list', 'resolve', boards);
            d.resolve(boards);
            return d.promise;
        }

        function clear(newBoards) {
            var d = $q.defer(),
                oldBoards = H.listBoards();
            oldBoards.forEach(function (board) {
                H.delBoard(board.id);
            });
            if (newBoards) {
                newBoards.forEach(function (board) {
                    var json = JSON.stringify(board);
                    window.localStorage.setItem(board.id, json);
                });
            }
            $log.log('BoardsRepo#clear', 'resolve', oldBoards);
            d.resolve(oldBoards);
            return d.promise;
        }

        return {
            create: create,
            update: update,
            override: update,
            del: del,
            list: list,
            get: get,
            clear: clear
        };
    }
    BoardsRepo.$inject = ['$q', '$log'];
    quanbanLocalstorage.service('boardsRepoLs', BoardsRepo);

});