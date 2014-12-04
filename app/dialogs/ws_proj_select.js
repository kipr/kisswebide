"use strict";

angular.module('kissWebIdeApp').directive('wsProjSelectDialog',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'dialogs/ws_proj_select.html',
            scope: {
                dialogId: '=',
                projectNames: '=',
                selected: '='
            },
            link: function($scope, element, attributes) {
                $scope.currentlySelected = false;
                
                $scope.selectItem = function(projectName) {
                    if(projectName == $scope.currentlySelected) {
                        $scope.currentlySelected = false;
                    } else {
                        $scope.currentlySelected = projectName;
                    }
                }
                
                $scope.select = function() {
                    $scope.selected = $scope.currentlySelected;
                }
            }
        };
    }
);