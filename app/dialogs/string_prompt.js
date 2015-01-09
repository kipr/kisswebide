"use strict";

angular.module('kissWebIdeControllers')
.controller('StringPromptDialogController', ['$scope', '$modalInstance', 'title', 'message',
    function ($scope, $modalInstance, title, message) {
        $scope.title = title;
        $scope.message = message;
        $scope.inputString = '';
        
        $scope.ok = function() {
            $modalInstance.close($scope.inputString);
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);
