"use strict";

angular.module('kissWebIdeApp').directive('createFileDialog',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'dialogs/create_file.html',
            scope: {
                dialogId: '=',
                folderResource: '=',
                extensions: '=?'
            },
            link: function($scope, element, attributes) {
                $scope.folderResource.then(function(folderResource) {
                    $scope.newFilePath = folderResource.path;
                    
                    $scope.create = function() {
                        $scope.folderResource.createFile(
                            $scope.fileName + ($scope.extension ? $scope.extension : ''),
                            false
                        );
                    }
                });
                
                if($scope.extensions) {
                    if($scope.extensions.constructor !== Array || $scope.extensions.length == 0) {
                        $scope.extensions = undefined;
                    } else {
                        $scope.extension = $scope.extensions[0];
                    }
                }
                
                $scope.selectExtension = function(extension) {
                    $scope.extension = extension;
                }
                
            }
        };
    }
);