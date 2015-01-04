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
        
        $scope.openSelectProject = function(size) {
            target.rootResource.getProjects()
                .then(function(projectsResource) {
                    var modalInstance = $modal.open({
                        templateUrl: 'dialogs/list_select.html',
                        controller: 'ListSelectDialogController',
                        size: size,
                        resolve: {
                            title: function() { return 'Select a Project'; },
                            list: function() { return projectsResource.projectNames; }
                        }
                    });
                    
                    modalInstance.result.then(function(projectName) {
                        if(projectName) {
                            target.projectName = projectName;
                            $location.path('/project');
                        }
                    });
                })
                .catch(function(error) {
                    alert('Could not load the list of project');
                });
        };
        
        $scope.openSelectFile = function(size) {
            target.rootResource.getProjects()
                .then(function(projectsResource) {
                    return projectsResource.getProject(target.projectName);
                })
                .then(function(projectResource) {
                    return projectResource.getFiles();
                })
                .then(function(filesResource) {
                    var modalInstance = $modal.open({
                        templateUrl: 'dialogs/list_select.html',
                        controller: 'ListSelectDialogController',
                        size: size,
                        resolve: {
                            title: function() { return 'Select a File'; },
                            list: function() { return filesResource.fileNames; }
                        }
                    });
                    
                    modalInstance.result.then(function(fileName) {
                        if(fileName) {
                            target.fileName = fileName;
                            $location.path('/file');
                        }
                    });
                })
                .catch(function(error) {
                    alert('Could not load the list of file');
                });
        };
    }
]);
