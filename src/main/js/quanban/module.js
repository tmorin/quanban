define([
    'angular',
    //
    'quanban/pages',
    'quanban/mocks',
    'quanban/repos'
], function (angular) {

    'use strict';

    function config($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }
    config.$inject = ['$routeProvider'];

    function run($location, settingsRepo, boardsMocker) {
        var board0, board1, provider, queryParams;

        queryParams = $location.search();
        if (queryParams && queryParams.mock) {
            window.localStorage.clear();
            window.localStorage.setItem('quanban-settings', JSON.stringify({provider: 'localStorage'}));
            board0 = boardsMocker.generateBoard(0, 3, 3);
            window.localStorage.setItem(board0.id, JSON.stringify(board0));
            board1 = boardsMocker.generateBoard(1, 3, 2);
            window.localStorage.setItem(board1.id, JSON.stringify(board1));
        }

        provider = settingsRepo.get({}).provider;
        if (!provider) {
            $location.path('/first');
        }
    }
    run.$inject = ['$location', 'settingsRepo', 'boardsMocker'];

    var quanbanRepos = angular.module('quanban', ['quanban-pages', 'quanban-mocks', 'quanban-repos']);
    quanbanRepos.config(config);
    quanbanRepos.run(run);

});
