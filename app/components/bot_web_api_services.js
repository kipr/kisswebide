'use strict';

angular.module('BotWebApiServices', [])

.factory('file', ['$http', '$q',
    function($http, $q) {
        
        // Files Resource prototype
        function FileResource(jsonData) {
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
                'path': { get: function() { return jsonData.path; }, enumerable: true }
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
        
        // Files Resource prototype
        function FilesResource(jsonData) {
            var fileNames = [];
            
            if(jsonData.links.files) {
                for(var i = 0; i < jsonData.links.files.length; i++) {
                    fileNames[i] = jsonData.links.files[i].name;
                }
            }
            
            Object.defineProperties(this, { 
                'fileNames' : { get: function() { return fileNames; }, enumerable: true },
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
                'path': { get: function() { return jsonData.path; }, enumerable: true }
            });
        }
        
        // Create the service object
        return {
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
    }
])

.factory('project', ['$http', '$q', 'files',
    function($http, $q, files) {
        
        // Project Resource prototype
        function ProjectResource(jsonData) {
            
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

.factory('projects', ['$http', '$q', 'project',
    function($http, $q, project) {
        
        // Projects Resource prototype
        function ProjectsResource(jsonData) {
            var projectNames = [];
            
            if(jsonData.links.projects) {
                for(var i = 0; i < jsonData.links.projects.length; i++) {
                    projectNames[i] = jsonData.links.projects[i].name;
                }
            }
            
            Object.defineProperties(this, { 
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
                        resolve(new ProjectsResource(data));
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

.factory('botWebApi', ['$q', 'projects',
    function($q, projects) {
        
        // Root Resource prototype
        function RootResource(jsonData) {
            Object.defineProperties(this, {
                'getProjects' : {
                    enumerable: true,
                    value: function() {
                        return projects.getResource(jsonData.links.projects.href);
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