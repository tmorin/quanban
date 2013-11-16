define([
    'angular',
    'text!./qMessages.html',
    //
    './module'
], function (angular, tpl) {

    'use strict';

    var quanbanDirs = angular.module('quanban-dirs');

    function qMessagesCtrl($scope, $element) {
        var containers = {
            danger: $element.find('.danger-container').first(),
            warning: $element.find('.warning-container').first(),
            success: $element.find('.success-container').first(),
            info: $element.find('.info-container').first()
        };
        function appendDivMessage(container, args) {
            var divAlert, li;
            divAlert = container.find('> div.alert').first();
            if (divAlert.size() < 1) {
                divAlert = document.createElement('div');
                divAlert.classList.add('alert', 'alert-' + args.level);
                divAlert.innerHTML = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><ul class="alerts"></ul>';
                container.append(divAlert);
            }
            li = document.createElement('li');
            li.innerHTML = args.content;
            if (args.cause) {
                li.innerHTML = li.innerHTML + '<br><small class="text-muted">' + args.cause + '</small>';
            }
            container.find('> div.alert > ul.alerts').first().append(li);
        }
        $scope.$on('message', function onMessage(evt, args) {
            /*jslint unparam:true */
            var container;
            if (containers.hasOwnProperty(args.level)) {
                container = containers[args.level];
                if (container) {
                    appendDivMessage(container, args);
                }
            }
        });
    }
    qMessagesCtrl.$inject = ['$scope', '$element'];
    quanbanDirs.directive('qMessages', function () {
        return {
            replace: true,
            restrict: 'EA',
            template: tpl,
            controller: qMessagesCtrl
        };
    });

});