"use strict";

angular.module('kissWebIdeControllers')
.controller('SelectFileDialogController', ['$scope', '$modalInstance', 'fs', 'folderResource',
    function ($scope, $modalInstance, fs, folderResource) {
        $scope.currentDirectory = folderResource;
        $scope.selectedFile = undefined;
        $scope.selectedFolder = undefined;
        
        $scope.showParent = function() {
            fs.getResource($scope.currentDirectory.parentUri)
            .then(function(filesResource) {
                $scope.currentDirectory = filesResource;
                $scope.selectedFile = undefined;
                $scope.selectedFolder = undefined;
            });
        }
        
        $scope.selectFolder = function(folder) {
            $scope.selectedFile = undefined;
            if($scope.selectedFolder == folder) {
                $scope.open(folder);
            } else {
                $scope.selectedFolder = folder;
            }
        }
        
        $scope.selectFile = function(file) {
            $scope.selectedFolder = undefined;
            if($scope.selectedFile == file) {
                $scope.selectedFile = undefined;
            } else {
                $scope.selectedFile = file;
            }
        }
        
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
        
        $scope.open = function(name) {
            $scope.selectedFile = undefined;
            $scope.selectedFolder = undefined;
            $scope.currentDirectory.getFolder(name)
            .then(function(filesResource) {
                $scope.currentDirectory = filesResource;
            });
        }
        
        $scope.select = function() {
            if($scope.selectedFolder) {
                $modalInstance.close($scope.currentDirectory.getFolderUri($scope.selectedFolder));
            } else if($scope.selectedFile) {
                $modalInstance.close($scope.currentDirectory.getFileUri($scope.selectedFile));
            } else {
                $modalInstance.close($scope.currentDirectory.uri);
            }
        }
    }
]);
