define([
    'angular',
    'jquery',
    //
    './module'
], function (angular, $) {

    'use strict';

    var quanbanSvc = angular.module('quanban-svc');

    function BackupAndRestoreSvc($log, $q, repoResolver) {
        function backup(providerId) {
            return repoResolver.getBoardsRepo(providerId).list().then(function onListed(boards) {
                var blob, content, filename;
                content = JSON.stringify(boards);
                filename = 'boards.backup.' + Date.now() + '.json';
                blob = new window.Blob([content], {
                    type: 'octet/stream;charset=utf-8'
                });
                window.saveAs(blob, filename);
            });
        }
        function restore(providerId) {
            var d, $inputFile, msg;
            d = $q.defer();
            function onFileLoaded(reader, evt) {
                var json, boards;
                evt.preventDefault();
                json = reader.result;
                try {
                    boards = JSON.parse(json);
                    msg = 'Do you realy want to restore your boards?\n';
                    msg = msg + 'Will restore: ' + boards.map(function (b) { return b.name; }).join(', ');
                    if (window.confirm(msg)) {
                        repoResolver.getBoardsRepo(providerId).clear(boards).then(function (r) {
                            $log.log('BackupAndRestoreSvc', 'resolve after clear', r);
                            d.resolve(r);
                        }, function (r) {
                            d.reject(r);
                        });
                    } else {
                        d.resolve();
                    }
                } catch (exc) {
                    $log.error('BackupAndRestoreSvc', 'restore', exc);
                    d.reject('Unable to parse the backup file.');
                }
            }
            function onFileSelected(evt) {
                var reader, file;
                evt.preventDefault();
                file = evt.target.files[0];
                if (file) {
                    reader = new window.FileReader();
                    reader.onload = onFileLoaded.bind(reader, reader);
                    reader.readAsText(file);
                } else {
                    d.resolve();
                }
            }
            $inputFile = $('<input type="file">').first();
            $inputFile.one('change', onFileSelected);
            $inputFile.click();
            return d.promise;
        }
        function isAvailable() {
            return !!(window.File && window.FileReader && window.Blob);
        }
        return {
            backup: backup,
            restore: restore,
            isAvailable: isAvailable
        };
    }
    BackupAndRestoreSvc.$inject = [
        '$log',
        '$q',
        'repoResolver'
    ];
    quanbanSvc.service('backupAndRestoreSvc', BackupAndRestoreSvc);

});