"use strict";

angular.module('kissWebIdeApp').directive('wsProjSelectDialog', ['target',
    function(target) {
        return {
            restrict: 'E',
            templateUrl: 'dialogs/ws_proj_select.html',
            scope: {
                dialogId: '='
            },
            link: function($scope, element, attributes) {
                $scope.currentlySelected = false;
                $scope.target = target;
                
                // wait until we are logged in
                $scope.$watch('target.loggedIn', function(newValue, oldValue) {
                    if(newValue) {
                        target.rootResource.getProjects()
                            .then(function(projectsResource) {
                                $scope.projectNames = projectsResource.projectNames;
                            })
                            .catch(function(error) {
                                reject({});
                                alert('Could not open list of project');
                            });
                    } else {
                        $scope.projectNames = [];
                    }
                });
                
                $scope.selectItem = function(projectName) {
                    if(projectName == $scope.currentlySelected) {
                        $scope.currentlySelected = false;
                    } else {
                        $scope.currentlySelected = projectName;
                    }
                }
                
                $scope.select = function() {
                    target.projectName = $scope.currentlySelected;
                }
            }
        };
    }
]);