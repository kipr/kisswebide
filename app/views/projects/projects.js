"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectsController', ['$scope', '$location', 'target', 'workspace',
    function ($scope, $location, target, workspace) {
        $scope.target = target;
        
        if(target.workspaceUri) {
            workspace.getResource(target.workspaceUri)
                .then(function(workspaceResource) {
                    $scope.projectNames = workspaceResource.projectNames;
                })
                .catch(function(error) {
                    reject({});
                    alert('Could not open projects');
                });
        }
        
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
