"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectController', ['$scope', '$q', '$location', 'target',
    function ($scope, $q, $location, target) {
        $scope.target = target;
        $scope.createSourceFileDialogId = 'ProjectController_createSourceFileDialogId';
        $scope.createHeaderFileDialogId = 'ProjectController_createHeaderFileDialogId';
        $scope.createUserDataFileDialogId = 'ProjectController_createUserDataFileDialogId';
        $scope.sourceFileExtensions = ['.c'];
        $scope.headerFileExtensions = ['.h'];
        
        $scope.projectFolderResource = $q(function(resolve, reject) {
            target.rootResource.getProjects()
                .then(function(projectsResource) {
                    return projectsResource.getProject(target.projectName);
                })
                .then(function(projectResource) {
                    $scope.projectLanguage = projectResource.language;
                    return projectResource.getFiles();
                })
                .then(function(filesResource) {
                    resolve(filesResource);
                    $scope.fileNames = filesResource.fileNames;
                })
                .catch(function(error) {
                    reject({});
                    alert('Could not open ' + target.projectName);
                });
        });
        
        $scope.selectItem = function(fileName) {
            if(fileName == $scope.target.fileName) {
                $scope.target.fileName = undefined;
            } else {
                $scope.target.fileName = fileName;
            }
        }
        
        $scope.openItem = function(fileName) {
            if(fileName != $scope.target.fileName) {
                $scope.selectItem(fileName);
            }
            $location.path('/file');
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
