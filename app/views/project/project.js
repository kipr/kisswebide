"use strict";

angular.module('kissWebIdeControllers')
.controller('ProjectController', ['$scope', '$q', '$location', '$route', '$modal', 'target', 'workspace',
    function ($scope, $q, $location, $route, $modal, target, workspace) {
        $scope.target = target;
        
        var projectFolderResource = $q(function(resolve, reject) {
            if(target.workspaceUri) {
                workspace.getResource(target.workspaceUri)
                    .then(function(workspaceResource) {
                        return workspaceResource.getProject(target.projectName);
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
                    });
            } else {
                reject({});
            }
        });
        
        $scope.createSourceFile = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/create_file.html',
                controller: 'CreateFileDialogController',
                size: size,
                resolve: {
                    folderResource: function() { return projectFolderResource; },
                    extensions: function() { return ['.c']; }
                }
            });

            modalInstance.result.then(function() {
                $route.reload();
            });
        }
        
        $scope.createHeaderFile = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/create_file.html',
                controller: 'CreateFileDialogController',
                size: size,
                resolve: {
                    folderResource: function() { return projectFolderResource; },
                    extensions: function() { return ['.h']; }
                }
            });

            modalInstance.result.then(function() {
                $route.reload();
            });
        }
        
        $scope.createUserDataFile = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/create_file.html',
                controller: 'CreateFileDialogController',
                size: size,
                resolve: {
                    folderResource: function() { return projectFolderResource; },
                    extensions: function() { return undefined; }
                }
            });

            modalInstance.result.then(function() {
                $route.reload();
            });
        }
        
        $scope.selectItem = function(fileName) {
            if(fileName == $scope.target.fileName) {
                $scope.target.fileName = undefined;
            } else {
                $scope.target.fileName = fileName;
            }
        }
        
        $scope.deleteItem = function(fileName) {
            projectFolderResource.then(function(projectFolderResource_) {
                projectFolderResource_.deleteChild(fileName)
                .then(function() {
                    $route.reload();
                });
            });
        }
        
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
])

.filter('sourceFiles', function() {
    return function(files) {
        files = files || [];
        var sourceFiles = [];
        for(var i=0; i < files.length; ++i) {
            var file = files[i];
            if(/(\.c)$/.test(file)) {
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
            if(/(\.h)$/.test(file)) {
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
            if(! /(\.h|\.c|\.exe|\.kissproj|\.ops)$/.test(file)) {
                userDataFiles.push(file);
            }
        }
        return userDataFiles;
    };
});
