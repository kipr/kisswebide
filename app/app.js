'use strict';

angular.module('kissWebIdeApp', [
    'ngRoute',
    'ui.bootstrap',
    'kissWebIdeControllers',
    'kissWebIdeServices',
    'BotWebApiServices'
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                redirectTo: '/home'
            }).
            when('/home', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController',
                targetLoginRequired: false
            }).
            when('/target', {
                templateUrl: 'views/target/target.html',
                controller: 'TargetController',
                targetLoginRequired: true
            }).
            when('/user', {
                templateUrl: 'views/user/user.html',
                controller: 'UserController',
                targetLoginRequired: true
            }).
            when('/projects', {
                templateUrl: 'views/projects/projects.html',
                controller: 'ProjectsController',
                targetLoginRequired: true
            }).
            when('/project', {
                templateUrl: 'views/project/project.html',
                controller: 'ProjectController',
                targetLoginRequired: true
            }).
            when('/file', {
                templateUrl: 'views/file/file.html',
                controller: 'FileController',
                targetLoginRequired: true
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]);

angular.module('kissWebIdeControllers', [])

.controller('HeaderController', ['$scope', '$location', '$modal', 'target', 'botWebApi',
    function ($scope, $location, $modal, target, botWebApi) {
        $scope.$location = $location;
        $scope.target = target;
        
        $scope.targetSelectDialogId = 'HeaderController_targetSelectDialogId';
        $scope.wsProjSelectDialogId = 'HeaderController_wsProjSelectDialogId';
        $scope.fileSelectDialogId = 'HeaderController_fileSelectDialogId';
        
        $scope.openSelectTarget = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/target_select.html',
                controller: 'TargetSelectDialogController',
                size: size
            });

            modalInstance.result.then(function() {
                $location.path('/target');
            });
        };
    }
]);
