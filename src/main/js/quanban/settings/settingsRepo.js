define([
    'angular',
    //
    './module'
], function (angular) {

    'use strict';

    var quanbanSettings = angular.module('quanban-settings');

    /**
     * @constructor
     */
    function SettingsRepo() {

        function get(def) {
            var json, settings = def;
            json = window.localStorage.getItem('quanban-settings');
            if (json) {
                settings = JSON.parse(json);
                return settings;
            }
            return settings;
        }

        function set(settings) {
            var json;
            json = JSON.stringify(settings);
            window.localStorage.setItem('quanban-settings', json);
            return settings;
        }

        return {
            get: get,
            set: set
        };
    }
    SettingsRepo.$inject = [];
    quanbanSettings.service('settingsRepo', SettingsRepo);

});