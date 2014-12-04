"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectsController', ['$scope', 'target',
    function ($scope, target) {
        $scope.target = target;
                
        $scope.selectItem = function(projectName) {
            if(projectName == $scope.target.projectName) {
                $scope.target.projectName = undefined;
            } else {
                $scope.target.projectName = projectName;
            }
        }
    }
]);
