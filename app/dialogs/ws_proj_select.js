"use strict";

angular.module('kissWebIdeControllers')

.controller('ProjectSelectDialogController', ['$scope', '$modalInstance', 'target',
    function ($scope, $modalInstance, target) {
        $scope.target = target;
        $scope.currentlySelected = false;
        target.rootResource.getProjects()
            .then(function(projectsResource) {
                $scope.projectNames = projectsResource.projectNames;
            })
            .catch(function(error) {
                alert('Could not open list of project');
            });
        
        $scope.selectItem = function(projectName) {
            if(projectName == $scope.currentlySelected) {
                $scope.currentlySelected = false;
            } else {
                $scope.currentlySelected = projectName;
            }
        }
        
        $scope.select = function() {
            target.projectName = $scope.currentlySelected;
            $modalInstance.close();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);
