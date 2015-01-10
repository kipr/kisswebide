"use strict";

angular.module('kissWebIdeControllers')
.controller('TargetController', ['$scope', '$location', '$route', '$modal', 'target',
    function ($scope, $location, $route, $modal, target) {
        $scope.target = target;
        
        $scope.refresh = function() {
            //TODO
        }
        
        $scope.switchTarget = function() {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/target_select.html',
                controller: 'TargetSelectDialogController'
            });
        }
        
        $scope.logOut = function() {
            $location.path('/home');
            target.logOut();
        }
        
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
]);
