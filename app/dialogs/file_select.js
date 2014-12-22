"use strict";

angular.module('kissWebIdeApp').directive('fileSelectDialog', ['target',
    function(target) {
        return {
            restrict: 'E',
            templateUrl: 'dialogs/file_select.html',
            scope: {
                dialogId: '='
            },
            link: function($scope, element, attributes) {
                $scope.currentlySelected = false;
                $scope.target = target;
                
                // wait until we are logged in
                $scope.$watch('target.projectName', function(newValue, oldValue) {
                    if(newValue) {
                        target.rootResource.getProjects()
                            .then(function(projectsResource) {
                                return projectsResource.getProject(target.projectName);
                            })
                            .then(function(projectResource) {
                                return projectResource.getFiles();
                            })
                            .then(function(filesResource) {
                                $scope.fileNames = filesResource.fileNames;
                            })
                            .catch(function(error) {
                                alert('Could not open list of file');
                            });
                    } else {
                        $scope.fileNames = [];
                    }
                });
                
                $scope.selectItem = function(fileName) {
                    if(fileName == $scope.currentlySelected) {
                        $scope.currentlySelected = false;
                    } else {
                        $scope.currentlySelected = fileName;
                    }
                }
                
                $scope.select = function() {
                    target.fileName = $scope.currentlySelected;
                }
            }
        };
    }
]);