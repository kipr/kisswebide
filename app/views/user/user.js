"use strict";

angular.module('kissWebIdeControllers')
.controller('UserController', ['$scope', '$q', '$location', '$modal', 'files', 'target',
    function ($scope, $q, $location, $modal, files, target) {
        $scope.target = target;
        
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
            $scope.workspacePath = undefined;
            
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/select_file.html',
                controller: 'SelectFileDialogController',
                size: size,
                resolve: {
                    folderResource: function() { return rootFolderResource; }
                }
            });
            
            modalInstance.result.then(function (workspaceUri) {
                files.getResource(workspaceUri)
                .then(function(filesResource) {
                    $scope.workspacePath = filesResource.path;
                });
            });
        }
    }
]);
