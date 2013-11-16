define(['angular'], function (angular) {

    'use strict';

    var exports = {};

    /*
     * BOARDS REPO
     *
     */

    exports.findBoardById = function findBoardById(boardId) {
        var json;
        json = window.localStorage.getItem(boardId);
        if (json) {
            return JSON.parse(json);
        }
    };

    exports.createBoard = function createBoard(board) {
        var json;
        board.id = 'quanban-board-' + Date.now();
        board.createdOn = new Date();
        if (!angular.isArray(board.columns)) {
            board.columns = [];
        }
        json = JSON.stringify(board);
        window.localStorage.setItem(board.id, json);
        return board;
    };

    exports.listBoards = function listBoards(query) {
        var key, boards, json, board;
        boards = [];
        for (key in window.localStorage) {
            if (window.localStorage.hasOwnProperty(key) && key.indexOf('quanban-board') === 0) {
                json = window.localStorage.getItem(key);
                board = JSON.parse(json);
                if (query) {
                    if (board.name.indexOf(query) > -1) {
                        boards.push(board);
                    }
                } else {
                    boards.push(board);
                }
            }
        }
        return boards;
    };

    exports.delBoard = function delBoard(boardId) {
        var board = exports.findBoardById(boardId);
        if (board) {
            window.localStorage.removeItem(boardId);
            return board;
        }
    };

    exports.updateBoard = function updateBoard(board) {
        var json;
        if (exports.findBoardById(board.id)) {
            board.updatedOn = new Date();
            json = JSON.stringify(board);
            window.localStorage.setItem(board.id, json);
            return board;
        }
    };

     /*
      * COLUMNS REPO
      *
      */

    exports.findColumnById = function findColumnById(board, columnId) {
        if (angular.isArray(board.columns)) {
            return board.columns.filter(function (c) {
                return c.id === columnId;
            })[0];
        }
    };

    exports.addColumn = function addColumn(boardId, column) {
        var board = exports.findBoardById(boardId);
        if (board) {
            column.id = 'col-' + (new Date()).getTime();
            column.createdOn = new Date();
            column.tasks = [];
            if (!angular.isArray(board.columns)) {
                board.columns = [];
            }
            board.columns.push(column);
            exports.updateBoard(board);
            return column;
        }
    };

    exports.updateColumn = function updateColumn(boardId, column) {
        var board, c, i;
        board = exports.findBoardById(boardId);
        if (board) {
            c = exports.findColumnById(board, column.id);
            if (c) {
                i = board.columns.indexOf(c);
                column.updatedOn = new Date();
                board.columns.splice(i, 1, column);
                exports.updateBoard(board);
                return column;
            }
        }
    };

    exports.removeColumn = function removeColumn(boardId, columnId) {
        var board, column, i;
        board = exports.findBoardById(boardId);
        if (board) {
            column = exports.findColumnById(board, columnId);
            if (column) {
                i = board.columns.indexOf(column);
                board.columns.splice(i, 1);
                exports.updateBoard(board);
                return column;
            }
        }
    };

     /*
      * TASKS REPO
      *
      */

    exports.findTaskById = function findTaskById(column, taskId) {
        if (angular.isArray(column.tasks)) {
            return column.tasks.filter(function (t) {
                return t.id === taskId;
            })[0];
        }
    };

    exports.addTask = function addTask(boardId, columnId, task) {
        var board, column;
        board = exports.findBoardById(boardId);
        if (board) {
            column = exports.findColumnById(board, columnId);
            if (column) {
                task.id = 'task-' + Date.now();
                task.createdOn = new Date();
                if (!angular.isArray(column.tasks)) {
                    column.tasks = [];
                }
                column.tasks.push(task);
                exports.updateBoard(board);
                return task;
            }
        }
    };

    exports.updateTask = function updateTask(boardId, columnId, task) {
        var board, column, t, i;
        board = exports.findBoardById(boardId);
        if (board) {
            column = exports.findColumnById(board, columnId);
            if (column) {
                t = exports.findTaskById(column, task.id);
                if (t) {
                    i = column.tasks.indexOf(t);
                    task.updatedOn = new Date();
                    column.tasks.splice(i, 1, task);
                    exports.updateBoard(board);
                    return task;
                }
            }
        }
    };

    exports.removeTask = function removeTask(boardId, columnId, task) {
        var board, column, t, i;
        board = exports.findBoardById(boardId);
        if (board) {
            column = exports.findColumnById(board, columnId);
            if (column) {
                t = exports.findTaskById(column, task.id);
                if (t) {
                    i = column.tasks.indexOf(t);
                    task.updatedOn = new Date();
                    column.tasks.splice(i, 1);
                    exports.updateBoard(board);
                    return task;
                }
            }
        }
    };

    return exports;
});