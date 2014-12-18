'use strict';

angular.module('kissWebIdeApp', [
    'ngRoute',
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
                controller: 'HomeController'
            }).
            when('/target', {
                templateUrl: 'views/target/target.html',
                controller: 'TargetController'
            }).
            when('/user', {
                templateUrl: 'views/user/user.html',
                controller: 'UserController'
            }).
            when('/projects', {
                templateUrl: 'views/projects/projects.html',
                controller: 'ProjectsController'
            }).
            when('/projects/:projectName', {
                templateUrl: 'views/project/project.html',
                controller: 'ProjectController'
            }).
            when('/projects/:projectName/:fileName', {
                templateUrl: 'views/file/file.html',
                controller: 'FileController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]);

angular.module('kissWebIdeControllers', [])

.controller('HeaderController', ['$scope', '$location', '$routeParams', 'target', 'botWebApi',
    function ($scope, $location, $routeParams, target, botWebApi) {
        $scope.$routeParams = $routeParams;
        $scope.target = target;
        
        $scope.page =  function() {
            return $location.path().split('/')[1];
        }
        
        $scope.targetSelectDialogId = 'HeaderController_targetSelectDialogId';
        $scope.wsProjSelectDialogId = 'HeaderController_wsProjSelectDialogId';
        $scope.fileSelectDialogId = 'HeaderController_fileSelectDialogId';
        
        $scope.$watch('target.loggedIn', function(newValue, oldValue) {
            if(newValue) {
                $location.path('/target');
            } else {
                $location.path('/');
            }
        });
    }
]);
