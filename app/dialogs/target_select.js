"use strict";

angular.module('kissWebIdeControllers')

.controller('TargetSelectDialogController', ['$scope', '$modalInstance', 'target',
    function ($scope, $modalInstance, target) {
        $scope.target = target;
        
        $scope.targetUsername = target.username || '';
        $scope.targetPassword = '';
        $scope.targetIp = '';
        $scope.targetLocation = 'target_is_server';
        
        if(target.name) {
            var matches = target.name.match(/^http:\/\/(.*)\/api/);
            if(matches[1]) {
                if(matches[1] == window.location.hostname) {
                    $scope.targetLocation = 'target_is_server';
                } else {
                    $scope.targetLocation = 'target_by_ip';
                    $scope.targetIp = matches[1];
                }
            }
        }
        
        $scope.logIn = function() {
            if(!$scope.targetUsername) {
                alert('Please enter a valid username');
                return;
            }
            
            target.username = $scope.targetUsername;
            
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
