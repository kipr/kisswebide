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
            when('/projects/:projectName?/:fileName?', {
                templateUrl: 'views/projects/projects.html',
                controller: 'ProjectsController'
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
        
        $scope.$watch('target.projectName', function(newValue, oldValue) {
            if(newValue) {
                $location.path('/projects/' + newValue);
            } else {
                $location.path('/');
            }
        });
        
        $scope.$watch('target.fileName', function(newValue, oldValue) {
            if(newValue) {
                $location.path('/projects/' + target.projectName + '/' + newValue);
            } else {
                $location.path('/');
            }
        });
    }
]);
