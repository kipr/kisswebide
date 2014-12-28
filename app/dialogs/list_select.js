"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectSelectDialogController', ['$scope', '$modalInstance', 'title', 'list',
    function ($scope, $modalInstance, title, list) {
        $scope.title = title;
        $scope.list = list;
        $scope.selectedItem = false;
        
        $scope.selectItem = function(item) {
            if(item == $scope.selectedItem) {
                $scope.selectedItem = false;
            } else {
                $scope.selectedItem = item;
            }
        }
        
        $scope.select = function() {
            $modalInstance.close($scope.selectedItem);
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);
