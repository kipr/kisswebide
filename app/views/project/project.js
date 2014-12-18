"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectController', ['$scope', '$location', 'target',
    function ($scope, $location, target) {
        $scope.target = target;
        
        $scope.selectItem = function(fileName) {
            if(fileName == $scope.target.fileName) {
                $scope.target.fileName = undefined;
            } else {
                $scope.target.fileName = fileName;
            }
        }
        
        $scope.createItem = function() {
        }
        
        $scope.openItem = function(fileName) {
            if(fileName != $scope.target.fileName) {
                $scope.selectItem(fileName);
            }
            $location.path('/projects/' + $scope.target.projectName + '/' + fileName);
        }
        
        $scope.deleteItem = function(fileName) {
        }
    }
])

.filter('sourceFiles', function() {
    return function(files) {
        files = files || [];
        var sourceFiles = [];
        for(var i=0; i < files.length; ++i) {
            var file = files[i];
            if(/(.c)$/.test(file)) {
                sourceFiles.push(file);
            }
        }
        return sourceFiles;
    };
})

.filter('headerFiles', function() {
    return function(files) {
        files = files || [];
        var headerFiles = [];
        for(var i=0; i < files.length; ++i) {
            var file = files[i];
            if(/(.h)$/.test(file)) {
                headerFiles.push(file);
            }
        }
        return headerFiles;
    };
})

.filter('userDataFiles', function() {
    return function(files) {
        files = files || [];
        var userDataFiles = [];
        for(var i=0; i < files.length; ++i) {
            var file = files[i];
            if(/^(?!.*(.h|.c|.exe|.kissproj))/.test(file)) {
                userDataFiles.push(file);
            }
        }
        return userDataFiles;
    };
});
