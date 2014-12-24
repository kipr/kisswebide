"use strict";

angular.module('kissWebIdeControllers')

.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'target',
    function ($scope, $modalInstance, target) {
        $scope.target = target;
        $scope.target.username = 'User';
        $scope.targetPassword = 'KISS';
        $scope.targetIp = '192.168.123.192';
        $scope.targetLocation = 'target_is_server';
        
        $scope.logIn = function() {
            if(!$scope.target.username) {
                alert('Please enter a valid username');
                return;
            }
            
            var url;
            if($scope.targetLocation === 'target_is_server') {
                url = 'http://' + window.location.hostname + '/api';
            } else {
                url = 'http://' + $scope.targetIp + '/api';
            }
            
            $scope.target.logIn(url, $scope.targetPassword).then(
                function(targetInstance) {
                    $modalInstance.close();
                },
                function(reason) {
                    if(reason.error === 'Unauthorized') {
                        alert('Username or password is incorrect');
                    } else {
                        alert('Could not log in');
                    }
                }
            );
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);
