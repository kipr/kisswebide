"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectController', ['$scope', 'target',
    function ($scope, target) {
        $scope.target = target;
                
        $scope.selectItem = function(fileName) {
            if(fileName == $scope.target.fileName) {
                $scope.target.fileName = undefined;
            } else {
                $scope.target.fileName = fileName;
            }
        }
    }
]);
