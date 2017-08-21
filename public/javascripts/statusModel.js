(function() {
    var app = angular.module('mainApp');

    app.factory('statusModel', ['$rootScope', function($rootScope) {
        var model = {};
        model.table = 
        {
        	'S1': {'display': [], 'order': {}, 'totalAmount': 0, 'firstOrder': ""},
        	'S2': {},
        	'S3': {},
        	'S4': {},
        	'S5': {},
        	'S6': {},
        	'S7': {},
        	'F1': {},
        	'F2': {},
        	'F3': {},
        	'F4': {},
        	'F5': {},
        	'F6': {},
        	'F7': {},
        	'N1': {},
        	'N2': {},
        	'N3': {},
        	'N4': {},
        	'N5': {},
        	'N6': {}
        }
        return model;
    }]);
})();