"use strict";

angular.module('kissWebIdeApp').directive('fileSelectDialog',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'dialogs/file_select.html',
            scope: {
                dialogId: '=',
                fileNames: '=',
                selected: '='
            },
            link: function($scope, element, attributes) {
                $scope.currentlySelected = false;
                
                $scope.selectItem = function(fileName) {
                    if(fileName == $scope.currentlySelected) {
                        $scope.currentlySelected = false;
                    } else {
                        $scope.currentlySelected = fileName;
                    }
                }
                
                $scope.select = function() {
                    $scope.selected = $scope.currentlySelected;
                }
            }
        };
    }
);