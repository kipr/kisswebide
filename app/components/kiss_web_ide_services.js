'use strict';

angular.module('kissWebIdeServices', [])

.factory('target', ['$q', 'botWebApi', 
    function($q, botWebApi) {
        
        // Selected file resource of the selected project
        var fileResource = undefined;
        var fileName = undefined;
        
        // Files resource of the selected project
        var filesResource = undefined;
        var fileNames = undefined;
        
        // Selected project resource
        var projectResource = undefined;
        var projectName = undefined;
        var projectLanguage = undefined;
        var projectType = undefined;
    
        // Projects resource
        var projectsResource = undefined;
        var projectNames = undefined;
        
        // Login / root resource
        var rootResource = undefined;
        var loggedIn = false;
        var loggingIn = false;
        var url = undefined;
        var username = undefined;
        var password = undefined;
        
        // Create the service object
        return Object.create(Object.prototype, {
            
            // Files resource of the selected project properties
            'fileResource': { get: function() { return fileResource; }, enumerable: true },
            'fileNames': { get: function() { return fileNames; }, enumerable: true },
            'fileName': {
                enumerable: true,
                get: function() { return fileName; },
                set: function(value) {
                    if(fileNames.indexOf(value) > -1) {
                        fileName = value;
                        
                        filesResource.getFile(fileName).then(
                            function(fileResource_) {
                                fileResource = fileResource_;
                            }
                        );
                    } else {
                        fileName = undefined;
                    }
                }
            },
            
            // Projects resource properties
            'projectResource': { get: function() { return projectResource; }, enumerable: true },
            'projectNames': { get: function() { return projectNames; }, enumerable: true },
            'projectType': { get: function() { return projectType; }, enumerable: true },
            'projectLanguage': { get: function() { return projectLanguage; }, enumerable: true },
            'projectName': {
                enumerable: true,
                get: function() { return projectName; },
                set: function(value) {
                    fileResource = undefined;
                    fileName = undefined;
                    filesResource = undefined;
                    fileNames = undefined;
                    projectResource = undefined;
                    
                    if(projectNames.indexOf(value) > -1) {
                        projectName = value;
                        
                        projectsResource.getProject(projectName).then(
                            function(projectResource_) {
                                projectResource = projectResource_;
                                
                                projectType = projectResource.type;
                                projectLanguage = projectResource.language;
                                projectResource.getFiles().then(
                                    function(filesResource_) {
                                        filesResource = filesResource_;
                                        if(filesResource) {
                                            fileNames = filesResource.fileNames;
                                        }
                                    }
                                );
                            }
                        );
                    } else {
                        projectName = undefined;
                    }
                },
            },
            
            // Login / root resource
            'loggedIn': { get: function() { return loggedIn; }, enumerable: true },
            'loggingIn': { get: function() { return loggingIn; }, enumerable: true },
            'url': { get: function() { return url; }, enumerable: true },
            'username': { get: function() { return username; }, enumerable: true },
            'logIn': {
                enumerable: true,
                value: function(url_, username_, password_) {
                    this.logOut();
                    
                    loggingIn = true;
                    url = url_;
                    username = username_;
                    password = password_;
                    
                    return $q(function(resolve, reject) {
                        botWebApi.getRootResource(url,  username, password).then(
                            function(data, xhr, status) {
                                rootResource = data;
                                loggingIn = false;
                                loggedIn = true;
                                
                                rootResource.getProjects().then(
                                    function(projectsResource_) {
                                        projectsResource = projectsResource_;
                                        projectNames = projectsResource.projectNames;
                                    }
                                );
                                resolve({});
                            },
                            function(xhr, status, error) {
                                loggingIn = false;
                                loggedIn = false;
                                reject({
                                    status: status,
                                    error: error
                                });
                            }
                        );
                    });
                }
            },
            'logOut': {
                enumerable: true,
                value: function() {
                    fileResource = undefined;
                    fileName = undefined;
                    
                    filesResource = undefined;
                    fileNames = undefined;
                
                    projectResource = undefined;
                    
                    projectsResource = undefined;
                    projectNames = undefined;
                    projectName = undefined;
                
                    rootResource = undefined;
                    loggedIn = false;
                    loggingIn = false;
                    url = undefined;
                    username = undefined;
                    password = undefined;
                }
            }
        });
    }
]);
