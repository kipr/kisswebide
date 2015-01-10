"use strict";

angular.module('kissWebIdeControllers')
.controller('FileController', ['$rootScope', '$scope', '$location', 'target', 'workspace',
    function ($rootScope, $scope, $location, target, workspace) {
        $scope.target = target;
        
        var fileResource = undefined;
        var projectResource = undefined;
        var editor = undefined;
        
        if(target.workspaceUri) {
            workspace.getResource(target.workspaceUri)
                .then(function(workspaceResource) {
                    return workspaceResource.getProject(target.projectName);
                })
                .then(function(projectResource_) {
                    projectResource = projectResource_;
                    return projectResource.getFiles();
                })
                .then(function(filesResource) {
                    return filesResource.getFile(target.fileName);
                })
                .then(function(fileResource_) {
                    fileResource = fileResource_;
                    
                    var content = '';
                    if(fileResource.content) {
                        content = Base64.decode(fileResource.content);
                    }
                    editor = ace.edit('file_content');
                    editor.setTheme('ace/theme/crimson_editor');
                    editor.getSession().setMode('ace/mode/c_cpp');
                    editor.setValue(content, -1);
                    editor.on('change', function(e) {
                        $scope.documentChanged = true;
                        $scope.$apply(function() {
                            $scope.documentChanged = true;
                        });
                    });
                    
                    $scope.documentChanged = false;
                });
        }
        
        $scope.documentChanged = false;
        
        var fileContentElement = document.getElementById('file_content');
        var rect = fileContentElement.getBoundingClientRect();
        fileContentElement.style.height = ((window.innerHeight - rect.top - 20)*3/4) + 'px';
        var compileErrorElement = document.getElementById('compiler_error');
        compileErrorElement.style.height = ((window.innerHeight - rect.top - 20)/4) + 'px';
        
        $scope.save = function() {
            if(editor && $scope.documentChanged) {
                fileResource.content = editor.getValue();
                $scope.documentChanged = false;
            }
        }
        
        $scope.output = '';
        $scope.compile = function() {
            $scope.save();
            
            $scope.output = 'Compiling...';
            
            projectResource.compile(fileResource.path).then(
                function(response) {
                    
                    if(response.output.length == 0) {
                        $scope.output = 'Compilation Successful';
                    } else {
                        $scope.output = 'Compiler Output:';
                        
                        for(var i = 0; i < response.output.length; ++i) {
                            $scope.output += '\n' + response.output[i];
                        }
                    }
                });
        }
        
        // there is a better way to do this
        var onLocationChangeStartUrl = undefined;
        
        $scope.clickSave = function() {
            $('#discardChangesDialog').modal('toggle');
            $scope.save();
            $location.path(onLocationChangeStartUrl.substring($location.absUrl().length - $location.url().length));
            onRouteChangeOff();
        }
        
        $scope.clickDiscard = function() {
            $('#discardChangesDialog').modal('toggle');
            $location.path(onLocationChangeStartUrl.substring($location.absUrl().length - $location.url().length));
            onRouteChangeOff();
        }
        
        // Display a message box if the user leaves the page without triggering $locationChangeStart
        window.onbeforeunload = function() {
            if($scope.documentChanged) {
                return 'You have unsaved changes. Are you sure you want to leave this page and discard your changes?';
            } else {
                return;
            }
        }
        
        // Controller clean-up
        $scope.$on('$destroy', function() {
            
            // Unregister onbeforeunload
            delete window.onbeforeunload;
        });
        
        // Display a unsaved changes dialog box if we have unsaved changes and navigate to another in-app page
        var onRouteChangeOff = $rootScope.$on('$locationChangeStart', function routeChange(event, newUrl) {
            onLocationChangeStartUrl = newUrl;
            
            if($scope.documentChanged) {
                $('#discardChangesDialog').modal('toggle');
                event.preventDefault();
            } else {
                onRouteChangeOff();
            }
        });
        
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
]);
