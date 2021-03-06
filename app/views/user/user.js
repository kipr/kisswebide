"use strict";

angular.module('kissWebIdeControllers')
.controller('UserController', ['$scope', '$q', '$location', '$modal', 'fs', 'target', 'workspace',
    function ($scope, $q, $location, $modal, fs, target, workspace) {
        $scope.target = target;
        
        if(target.workspaceUri) {
            $scope.workspacePath = undefined;
            
            workspace.getResource(target.workspaceUri)
                .then(function(workspaceResource) {
                    $scope.workspacePath = workspaceResource.path;
                });
        } else if(target.name.indexOf('127.0.0.1') == -1) {
            target.rootResource.getWorkspaceProviders()
            .then(function(workspaceProvidersResource) {
                workspaceProvidersResource.getWorkspaceProvider('kissPlatformWorkspaces')
                .then(function(workspaceProviderResource) {
                    workspaceProviderResource.getWorkspace()
                    .then(function(WorkspaceResource) {
                        target.workspaceUri = WorkspaceResource.uri;
                    });
                });
            });
        }
        
        var rootFolderResource = $q(function(resolve, reject) {
            target.rootResource.getRootFolder()
                .then(function(filesResource) {
                    resolve(filesResource);
                })
                .catch(function(error) {
                    reject({});
                    //alert('Could not open ' + target.projectName);
                });
        });
        
        $scope.openWorkspace = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/select_file.html',
                controller: 'SelectFileDialogController',
                size: size,
                resolve: {
                    folderResource: function() { return rootFolderResource; }
                }
            });
            
            modalInstance.result.then(function (workspaceFileUri) {
                $scope.workspacePath = undefined;
                target.workspaceUri = undefined;
                
                fs.getResource(workspaceFileUri)
                .then(function(filesResource) {
                    target.rootResource.getWorkspaceProviders()
                    .then(function(workspaceProvidersResource) {
                        workspaceProvidersResource.getWorkspaceProvider('directoryBasedWorkspaces')
                        .then(function(workspaceProviderResource) {
                            workspaceProviderResource.openWorkspace(filesResource.path)
                            .then(function(WorkspaceResource) {
                                $scope.workspacePath = WorkspaceResource.path;
                                target.workspaceUri = WorkspaceResource.uri;
                            });
                        });
                    });
                });
            });
        }
        
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
]);
