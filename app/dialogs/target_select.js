"use strict";

angular.module('kissWebIdeApp').directive('targetSelectDialog', ['target',
    function(target) {
        return {
            restrict: 'E',
            templateUrl: 'dialogs/target_select.html',
            transclude: true,
            scope: {
                dialogId: '='
            },
            link: function($scope, element, attributes) {
                $scope.targetUsername = 'user';
                $scope.targetPassword = 'KISS';
                $scope.targetIp = '192.168.123.192';
                $scope.targetLocation = 'target_is_server';
                
                $scope.target = target;
                
                $scope.logIn = function() {
                    if(!$scope.targetUsername) {
                        alert('Please enter a valid username');
                        return;
                    }
                    
                    var url;
                    if($scope.targetLocation === 'target_is_server') {
                        url = 'http://' + window.location.hostname + '/api';
                    } else {
                        url = 'http://' + $scope.targetIp + '/api';
                    }
                    
                    $scope.target.logIn(url, $scope.targetUsername, $scope.targetPassword).then(
                        function(targetInstance) {
                            $('#' + $scope.dialogId).modal('toggle')
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
            }
        };
    }
]);