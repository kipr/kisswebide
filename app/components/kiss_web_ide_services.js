'use strict';

angular.module('kissWebIdeServices', [])

.factory('target', ['$rootScope', '$q', '$location', '$route', 'botWebApi', 'workspace',
    function($rootScope, $q, $location, $route, botWebApi, workspace) {
        
        // Selected file name of the selected project
        var fileName = undefined;
        
        // Selected project name
        var projectName = undefined;
        
        // Workspace URI
        var workspaceUri = undefined;
        var workspaceName = undefined;
        
        // Login / root resource
        var rootResource = undefined;
        var loggedIn = false;
        var loggingIn = false;
        var url = undefined;
        var name = undefined;
        var username = undefined;
        var password = undefined;
        
        var logOut = function() {
            fileName = undefined;
            projectName = undefined;
            
            rootResource = undefined;
            loggedIn = false;
            loggingIn = false;
            url = undefined;
            password = undefined;
        }
        
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            var searchObj = $location.search();
            
            if(!('user' in searchObj) && username) {
                // restore the query string
                $location.search('user', username);
            } else if(searchObj.user !== username) {
                // user changed by somebody external --> log out but update the name
                if(loggedIn) {
                    logOut();
                }
                username = searchObj.user;
            }
            
            if(!('target' in searchObj) && name) {
                // restore the query string
                $location.search('target', name);
            } else if(searchObj.target !== name) {
                // target changed by somebody external --> log out but update the target
                if(loggedIn) {
                    logOut();
                }
                name = searchObj.target;
            }
        });
        
        // Redirect if required
        var onRouteChangeOff = $rootScope.$on('$locationChangeStart', function routeChange(event, newUrl) {
            
            var nextPath = $location.path();
            var nextRoute = $route.routes[nextPath];
            
            // redirect to /home if we are not logged in
            if(nextRoute && nextRoute.targetLoginRequired && !loggedIn) {
                $location.path("/home");
            }
        });
        
        // Create the service object
        return Object.create(Object.prototype, {
            
            // Files resource of the selected project properties
            'fileName': {
                enumerable: true,
                get: function() { return fileName; },
                set: function(value) {
                    if(value === fileName) {
                        return;
                    }
                    
                    if(value) {
                        // check if it is a valid value
                        if(workspaceUri) {
                            workspace.getResource(workspaceUri)
                                .then(function(workspaceResource) {
                                    return workspaceResource.getProject(projectName);
                                })
                                .then(function(projectResource) {
                                    return projectResource.getFiles();
                                })
                                .then(function(filesResource) {
                                    if(filesResource.fileNames.indexOf(value) > -1) {
                                        fileName = value;
                                    } else {
                                        fileName = undefined;
                                    }
                                })
                                .catch(function(error) {
                                    fileName = undefined;
                                });
                        } else {
                            fileName = undefined;
                        }
                    } else {
                        fileName = value;
                    }
                    
                    $route.reload();
                }
            },
            
            // Project resource properties
            'projectName': {
                enumerable: true,
                get: function() { return projectName; },
                set: function(value) {
                    if(value === projectName) {
                        return;
                    }
                    
                    fileName = undefined;
                    
                    if(value) {
                        // check if it is a valid value
                        if(workspaceUri) {
                            workspace.getResource(workspaceUri)
                                .then(function(workspaceResource) {
                                    if(workspaceResource.projectNames.indexOf(value) > -1) {
                                        projectName = value;
                                    } else {
                                        projectName = undefined;
                                    }
                                })
                                .catch(function(error) {
                                    projectName = undefined;
                                });
                        } else {
                            projectName = undefined;
                        }
                    } else {
                        projectName = value;
                    }
                    
                    $route.reload();
                },
            },
            
            // Workspace related properties
            'workspaceUri': {
                enumerable: true,
                get: function() { return workspaceUri; },
                set: function(value) {
                    workspaceUri = value;
                    workspaceName = undefined;
                    if(workspaceUri) {
                        workspace.getResource(workspaceUri)
                            .then(function(workspaceResource) {
                                workspaceName = workspaceResource.name;
                            });
                    }
                },
            },
            'workspaceName': {
                enumerable: true,
                get: function() { return workspaceName; }
            },
            
            // Login / root resource
            'rootResource': { get: function() { return rootResource; }, enumerable: true },
            'loggedIn': { get: function() { return loggedIn; }, enumerable: true },
            'loggingIn': { get: function() { return loggingIn; }, enumerable: true },
            'url': { get: function() { return url; }, enumerable: true },
            'name': { get: function() { return name; }, enumerable: true },
            'username': {
                enumerable: true,
                get: function() { return username; },
                set: function(value) { if(loggedIn) { this.logOut(); } username = value; },
            },
            'logIn': {
                enumerable: true,
                value: function(url_, password_) {
                    this.logOut();
                    
                    loggingIn = true;
                    url = url_;
                    password = password_;
                    
                    return $q(function(resolve, reject) {
                        botWebApi.getRootResource(url,  username, password).then(
                            function(data, xhr, status) {
                                rootResource = data;
                                loggingIn = false;
                                loggedIn = true;
                                
                                $location.search('user', username);
                                
                                name = url; // TODO
                                $location.search('target', name);
                                
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
                value: logOut
            },
            
            // Query string
            'queryString': {
                enumerable: true,
                get: function() {
                    var cnt = 0;
                    var queryString = '';
                    
                    if(name) {
                        queryString += ((++cnt == 1)? '?' : '&') + 'target=' + name;
                    }
                    if(username) {
                        queryString += ((++cnt == 1)? '?' : '&') + 'username=' + username;
                    }
                    
                    return queryString;
                }
            }
        });
    }
]);
