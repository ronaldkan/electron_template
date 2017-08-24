(function() {
    var app = angular.module('mainApp');

    app.factory('trackingModel', ['$rootScope', function($rootScope) {
        var model = {};
        
        model.totalSold = 0.0;
        model.discounts = 0.0;
        model.numChecks = 0;
        model.cash = 0;
        model.nets = 0;
        
        return model;
    }]);
})();