'use strict';

function Resource(jsonData) {
    Object.defineProperties(this, {
        'uri': { get: function() { return jsonData.links.self.href; }, enumerable: true },
        'resourceClass': { get: function() { return jsonData.about.resource_class; }, enumerable: true },
        'resourceVersion': { get: function() { return jsonData.about.resource_version; }, enumerable: true },
        'resourceHomepage': { get: function() { return jsonData.about.resource_homepage; }, enumerable: true }
    });
}

angular.module('BotWebApiServices', [])

.factory('file', ['$http', '$q',
    function($http, $q) {
        
        // Files Resource prototype
        function FileResource(jsonData) {
            Resource.call(this, jsonData);
            Object.defineProperties(this, { 
                'content' : {
                    enumerable: true,
                    get: function() { return jsonData.content; },
                    set: function(value) {
                        var request = { content: Base64.encode(value) }
                        
                        return $q(function(resolve, reject) {
                            $http.put(jsonData.links.self.href, request)
                            
                            .success(function(data, status, headers, config) {
                                resolve();
                            })
                            .error(function(data, status, headers, config) {
                                reject({
                                    status: status,
                                    data: data
                                });
                            });
                        });
                    }
                },
                'name': { get: function() { return jsonData.name; }, enumerable: true },
                'path': { get: function() { return jsonData.path; }, enumerable: true },
                'hasParent': { get: function() { return !(/api\/fs#/.test(jsonData.links.parent.href)); }, enumerable: true },
                'parentUri': { get: function() { return jsonData.links.parent.href; }, enumerable: true }
            });
        }
        
        // Create the service object
        return {
            getResource: function(url) {
                return $q(function(resolve, reject) {
                    $http.get(url)
                    .success(function(data, status, headers, config) {
                        resolve(new FileResource(data));
                    })
                    .error(function(data, status, headers, config) {
                        reject({
                            status: status,
                            data: data
                        });
                    });
                });
            }
        };
    }
])

.factory('files', ['$http', '$q', 'file',
    function($http, $q, file) {
        var service = {
            getResource: function(url) {
                return $q(function(resolve, reject) {
                    $http.get(url)
                    .success(function(data, status, headers, config) {
                        resolve(new FilesResource(data));
                    })
                    .error(function(data, status, headers, config) {
                        reject({
                            status: status,
                            data: data
                        });
                    });
                });
            }
        };
        
        // Files Resource prototype
        function FilesResource(jsonData) {
            Resource.call(this, jsonData);
            var fileNames = [];
            var directoryNames = [];
            
            if(jsonData.links.files) {
                for(var i = 0; i < jsonData.links.files.length; i++) {
                    fileNames[i] = jsonData.links.files[i].name;
                }
            }
            
            if(jsonData.links.directories) {
                for(var i = 0; i < jsonData.links.directories.length; i++) {
                    directoryNames[i] = jsonData.links.directories[i].name;
                }
            }
            
            Object.defineProperties(this, { 
                'fileNames' : { get: function() { return fileNames; }, enumerable: true },
                'directoryNames' : { get: function() { return directoryNames; }, enumerable: true },
                'getFile' : {
                    enumerable: true,
                    value: function(name) {
                        for(var i = 0; i < jsonData.links.files.length; i++) {
                            if(jsonData.links.files[i].name === name) {
                                return file.getResource(jsonData.links.files[i].href);
                            }
                        }
                        
                        return $q(function(resolve, reject) { reject(); });
                    }
                },
                'getFileUri' : {
                    enumerable: true,
                    value: function(name) {
                        for(var i = 0; i < jsonData.links.files.length; i++) {
                            if(jsonData.links.files[i].name === name) {
                                return jsonData.links.files[i].href;
                            }
                        }
                        
                        return false;
                    }
                },
                'getFolder' : {
                    enumerable: true,
                    value: function(name) {
                        for(var i = 0; i < jsonData.links.directories.length; i++) {
                            if(jsonData.links.directories[i].name === name) {
                                return service.getResource(jsonData.links.directories[i].href);
                            }
                        }
                        
                        return $q(function(resolve, reject) { reject(); });
                    }
                },
                'getFolderUri' : {
                    enumerable: true,
                    value: function(name) {
                        for(var i = 0; i < jsonData.links.directories.length; i++) {
                            if(jsonData.links.directories[i].name === name) {
                                return jsonData.links.directories[i].href;
                            }
                        }
                        
                        return false;
                    }
                },
                'createFile' : {
                    enumerable: true,
                    value: function(name, isDirectory, content) {
                        var request = { name: name, is_dir: isDirectory };
                        if(!isDirectory && content) {
                            request.content = Base64.encode(content);
                        }
                        
                        return $q(function(resolve, reject) {
                            $http.post(jsonData.links.self.href, request)
                            
                            .success(function(data, status, headers, config) {
                                console.log(data);
                                console.log(status);
                                console.log(headers('Location'));
                                resolve();
                            })
                            .error(function(data, status, headers, config) {
                                reject({
                                    status: status,
                                    data: data
                                });
                            });
                        });
                    }
                },
                'name': { get: function() { return jsonData.name; }, enumerable: true },
                'path': { get: function() { return jsonData.path; }, enumerable: true },
                'hasParent': { get: function() { return /api\/fs/.test(jsonData.links.parent.href); }, enumerable: true },
                'parentUri': { get: function() { return jsonData.links.parent.href; }, enumerable: true }
            });
        }
        
        // Create the service object
        return service;
    }
])

.factory('project', ['$http', '$q', 'files',
    function($http, $q, files) {
        
        // Project Resource prototype
        function ProjectResource(jsonData) {
            Resource.call(this, jsonData);
            Object.defineProperties(this, { 
                'type' : { get: function() { return jsonData.type; }, enumerable: true },
                'language' : { get: function() { return jsonData.language; }, enumerable: true },
                'getFiles' : {
                    enumerable: true,
                    value: function() {
                        return files.getResource(jsonData.links.files.href);
                    },
                },
                'compile' : {
                    enumerable: true,
                    value: function(filePath) {
                        var request = { sourceFile: filePath }
                        
                        return $q(function(resolve, reject) {
                            $http.put(jsonData.links.binary.href, request)
                            
                            .success(function(data, status, headers, config) {
                                resolve(data);
                            })
                            .error(function(data, status, headers, config) {
                                reject({
                                    status: status,
                                    data: data
                                });
                            });
                        });
                    }
                }
            });
        }
        
        // Create the service object
        return {
            getResource: function(url) {
                return $q(function(resolve, reject) {
                    $http.get(url)
                    .success(function(data, status, headers, config) {
                        resolve(new ProjectResource(data));
                    })
                    .error(function(data, status, headers, config) {
                        reject({
                            status: status,
                            data: data
                        });
                    });
                });
            }
        };
    }
])

.factory('workspace', ['$http', '$q', 'project',
    function($http, $q, project) {
        
        // Projects Resource prototype
        function WorkspaceResource(jsonData) {
            Resource.call(this, jsonData);
            var projectNames = [];
            
            if(jsonData.links.projects) {
                for(var i = 0; i < jsonData.links.projects.length; i++) {
                    projectNames[i] = jsonData.links.projects[i].name;
                }
            }
            
            Object.defineProperties(this, {
                'name' : { get: function() { return jsonData.name; }, enumerable: true },
                'projectNames' : { get: function() { return projectNames; }, enumerable: true },
                'getProject' : {
                    enumerable: true,
                    value: function(name) {
                        for(var i = 0; i < jsonData.links.projects.length; i++) {
                            if(jsonData.links.projects[i].name === name) {
                                return project.getResource(jsonData.links.projects[i].href);
                            }
                        }
                        
                        return $q(function(resolve, reject) { reject(); });
                    }
                }
            });
        }
        
        // Create the service object
        return {
            getResource: function(url) {
                return $q(function(resolve, reject) {
                    $http.get(url)
                    .success(function(data, status, headers, config) {
                        resolve(new WorkspaceResource(data));
                    })
                    .error(function(data, status, headers, config) {
                        reject({
                            status: status,
                            data: data
                        });
                    });
                });
            }
        };
    }
])

.factory('workspaceProvider', ['$http', '$q', 'workspace',
    function($http, $q, workspace) {
        
        // Workspace providers resource prototype
        function WorkspaceProviderResource(jsonData) {
            Resource.call(this, jsonData);
            
            Object.defineProperties(this, {
                'openWorkspace' : {
                    enumerable: true,
                    value: function(path) {
                        var request = { path: path};
                        
                        return $q(function(resolve, reject) {
                            $http.post(jsonData.links.self.href, request)
                            
                            .success(function(data, status, headers, config) {
                                if(headers('Location')) {
                                    workspace.getResource(headers('Location'))
                                    .then(function(WorkspaceResource) {
                                        resolve(WorkspaceResource);
                                    },
                                    function(errorObj) {
                                        reject(errorObj);
                                    });
                                } else {
                                    reject({
                                        status: status,
                                        data: data,
                                        headers: headers
                                    });
                                }
                            })
                            .error(function(data, status, headers, config) {
                                reject({
                                    status: status,
                                    data: data
                                });
                            });
                        });
                    }
                }
            });
        }
        
        // Create the service object
        return {
            getResource: function(url) {
                return $q(function(resolve, reject) {
                    $http.get(url)
                    .success(function(data, status, headers, config) {
                        resolve(new WorkspaceProviderResource(data));
                    })
                    .error(function(data, status, headers, config) {
                        reject({
                            status: status,
                            data: data
                        });
                    });
                });
            }
        };
    }
])

.factory('workspaceProviders', ['$http', '$q', 'workspaceProvider',
    function($http, $q, workspaceProvider) {
        
        // Workspace providers resource prototype
        function WorkspaceProvidersResource(jsonData) {
            Resource.call(this, jsonData);
            var workspaceProviderNames = [];
            
            if(jsonData.links.workspace_provider) {
                for(var i = 0; i < jsonData.links.workspace_provider.length; i++) {
                    workspaceProviderNames[i] = jsonData.links.workspace_provider[i].name;
                }
            }
            
            Object.defineProperties(this, {
                'workspaceProviderNames' : {
                    enumerable: true,
                    get: function() { return workspaceProviderNames; }
                },
                'getWorkspaceProvider' : {
                    enumerable: true,
                    value: function(name) {
                        for(var i = 0; i < jsonData.links.workspace_provider.length; i++) {
                            if(jsonData.links.workspace_provider[i].name === name) {
                                return workspaceProvider.getResource(jsonData.links.workspace_provider[i].href);
                            }
                        }
                        
                        return $q(function(resolve, reject) { reject(); });
                    }
                }
            });
        }
        
        // Create the service object
        return {
            getResource: function(url) {
                return $q(function(resolve, reject) {
                    $http.get(url)
                    .success(function(data, status, headers, config) {
                        resolve(new WorkspaceProvidersResource(data));
                    })
                    .error(function(data, status, headers, config) {
                        reject({
                            status: status,
                            data: data
                        });
                    });
                });
            }
        };
    }
])

.factory('botWebApi', ['$q', 'files', 'workspaceProviders',
    function($q, files, workspaceProviders) {
        
        // Root Resource prototype
        function RootResource(jsonData) {
            Resource.call(this, jsonData);
            Object.defineProperties(this, {
                'getRootFolder' : {
                    enumerable: true,
                    value: function() {
                        return files.getResource(jsonData.links.fs.href);
                    }
                },
                'getWorkspaceProviders' : {
                    enumerable: true,
                    value: function() {
                        return workspaceProviders.getResource(jsonData.links.workspaces.href);
                    }
                }
            });
        }
        
        // Create the service object
        return {
            getRootResource: function(url, username, password) {
                return $q(function(resolve, reject) {
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: url,
                        username: username,
                        password: password,
                        success: function(data, xhr, status) {
                            resolve(new RootResource(data));
                        },
                        error: function(xhr, status, error) {
                            reject({
                                status: status,
                                error: error
                            });
                        }
                    });
                });
            }
        };
    }
]);