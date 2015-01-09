"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectsController', ['$scope', '$location', '$route', '$modal', 'target', 'workspace',
    function ($scope, $location, $route, $modal, target, workspace) {
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
        
        $scope.createItem = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/string_prompt.html',
                controller: 'StringPromptDialogController',
                size: size,
                resolve: {
                    title: function() { return "Create a Project"; },
                    message: function() { return "Project name: "; }
                }
            });

            modalInstance.result.then(function(projectName) {
                if(target.workspaceUri) {
                    workspace.getResource(target.workspaceUri)
                    .then(function(workspaceResource) {
                        return workspaceResource.createProject(projectName);
                    })
                    .then(function() {
                        $route.reload();
                    });
                    
                    $route.reload();
                }
            });
        }
        
        $scope.openItem = function(projectName) {
            if(projectName != $scope.target.projectName) {
                $scope.selectItem(projectName);
            }
            $location.path('/project/');
        }
        
        $scope.deleteItem = function(projectName) {
            if(target.workspaceUri) {
                workspace.getResource(target.workspaceUri)
                    .then(function(workspaceResource) {
                        console.log('abc');
                        return workspaceResource.getProject(projectName);
                    })
                    .then(function(projectResource) {
                        console.log('abc');
                        return projectResource.projectLocation;
                    })
                    .then(function(projectLocationResource) {
                        console.log('do delete');
                        return projectLocationResource.delete();
                    })
                    .then(function() {
                        console.log('done');
                        $route.reload();
                    });
            }
        }
    }
]);
