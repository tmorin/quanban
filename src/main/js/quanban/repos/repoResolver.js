define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanRepos = angular.module('quanban-repos');

    function RepoResolver($injector, settingsRepo) {
        function resolveSuffixById(providerId) {
            if (providerId === 'localStorage') {
                return 'Ls';
            }
            if (providerId === 'dropboxApi') {
                return 'DpApi';
            }
        }
        function getRepo(prefix, providerId) {
            var settings, suffix, repo;
            if (providerId) {
                suffix = resolveSuffixById(providerId);
            }
            if (!suffix) {
                settings = settingsRepo.get();
                suffix = resolveSuffixById(settings.provider);
            }
            repo = $injector.get(prefix + suffix);
            if (!repo) {
                throw 'Unable to resolved the provider [' + prefix + suffix + '].';
            }
            return repo;
        }
        function getBoardsRepo(providerId) {
            return getRepo('boardsRepo', providerId);
        }
        function getColumnsRepo(providerId) {
            return getRepo('columnsRepo', providerId);
        }
        function getTasksRepo(providerId) {
            return getRepo('tasksRepo', providerId);
        }
        return {
            getBoardsRepo: getBoardsRepo,
            getColumnsRepo: getColumnsRepo,
            getTasksRepo: getTasksRepo
        };
    }
    RepoResolver.$inject = [
        '$injector',
        'settingsRepo'
    ];
    quanbanRepos.service('repoResolver', RepoResolver);

});