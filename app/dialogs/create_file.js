"use strict";

angular.module('kissWebIdeControllers')
.controller('CreateFileDialogController', ['$scope', '$modalInstance', 'folderResource', 'extensions',
    function ($scope, $modalInstance, folderResource, extensions) {
        $scope.newFilePath = folderResource.path;
        $scope.extensions = extensions;
        
        if($scope.extensions) {
            if($scope.extensions.constructor !== Array || $scope.extensions.length == 0) {
                $scope.extensions = undefined;
            } else {
                $scope.extension = $scope.extensions[0];
            }
        }
        
        $scope.create = function() {
            folderResource.createFile(
                $scope.fileName + ($scope.extension ? $scope.extension : ''),
                false
            );
            $modalInstance.close();
        }
        
        $scope.selectExtension = function(extension) {
            $scope.extension = extension;
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);