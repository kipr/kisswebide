"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectsController', ['$scope', '$location', 'target',
    function ($scope, $location, target) {
        $scope.target = target;

        target.rootResource.getProjects()
            .then(function(projectsResource) {
                $scope.projectNames = projectsResource.projectNames;
            })
            .catch(function(error) {
                reject({});
                alert('Could not open projects');
            });
        
        $scope.selectItem = function(projectName) {
            if(projectName == $scope.target.projectName) {
                $scope.target.projectName = undefined;
            } else {
                $scope.target.projectName = projectName;
            }
        }
        
        $scope.createItem = function() {
        }
        
        $scope.openItem = function(projectName) {
            if(projectName != $scope.target.projectName) {
                $scope.selectItem(projectName);
            }
            $location.path('/project/');
        }
        
        $scope.deleteItem = function(projectName) {
        }
    }
]);
