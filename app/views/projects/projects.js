"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectsController', ['$scope', '$location', 'target',
    function ($scope, $location, target) {
        $scope.target = target;
                
        $scope.selectItem = function(projectName) {
            if(projectName == $scope.target.projectName) {
                $scope.target.projectName = undefined;
            } else {
                $scope.target.projectName = projectName;
            }
        }
        
        $scope.createItem = function() {
        }
        
        $scope.openItem = function(projectName) {
            if(projectName != $scope.target.projectName) {
                $scope.selectItem(projectName);
            }
            $location.path('/projects/' + projectName);
        }
        
        $scope.deleteItem = function(projectName) {
        }
    }
]);
