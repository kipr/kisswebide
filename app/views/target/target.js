"use strict";

angular.module('kissWebIdeControllers')
.controller('TargetController', ['$scope', 'target',
    function ($scope, target) {
        $scope.target = target;
    }
]);
