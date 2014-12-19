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
                $scope.newFilePath = $scope.folderResource.path;
                
                if($scope.extensions) {
                    if($scope.extensions.constructor !== Array || $scope.extensions.length == 0) {
                        $scope.extensions = undefined;
                    } else {
                        $scope.extension = $scope.extensions[0];
                    }
                }
                
                $scope.create = function() {
                    $scope.folderResource.createFile(
                        $scope.fileName + ($scope.extension ? $scope.extension : ''),
                        false
                    );
                }
                
                $scope.selectExtension = function(extension) {
                    $scope.extension = extension;
                }
                
            }
        };
    }
);