(function() {
    var app = angular.module('mainApp');

    app.factory('statusModel', ['$rootScope', function($rootScope) {
        var model = {};
        model.table = 
        {
        	'S1': {},
        	'S2': {},
        	'S3': {},
        	'S4': {}
        }
        return model;
    }]);
})();