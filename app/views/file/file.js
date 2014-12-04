"use strict";

angular.module('kissWebIdeControllers')
.controller('FileController', ['$scope', '$location', 'target',
    function ($scope, $location, target) {
        $scope.target = target;
        
        var editor = ace.edit( 'file_content' );
        editor.setTheme( 'ace/theme/crimson_editor' );
        editor.getSession().setMode( 'ace/mode/c_cpp' );
        
        $scope.$watch('target.fileResource', function(newValue, oldValue) {
            if(newValue) {
                editor.setValue(Base64.decode(target.fileResource.content), -1);
            }
        });
    }
]);
