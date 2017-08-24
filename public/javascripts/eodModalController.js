(function () {
    var app = angular.module('mainApp');

    app.controller('eodModalController', ['$scope', '$uibModalInstance', '$http', 'statusModel', 'trackingModel', function ($scope, $uibModalInstance, $http, statusModel, trackingModel) {
        
        var controller = this;
        console.log("this");
        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

        controller.onPrintClick = function() {
            console.log("in?");
            var totalSold = trackingModel.totalSold;
            var discount = trackingModel.discounts;
            var numChecks = trackingModel.numChecks;
            var cash = trackingModel.cash;
            var nets = trackingModel.nets;
            var payload = {
                totalSold: totalSold,
                discount: discount,
                numChecks: numChecks,
                cash: cash,
                nets:nets
            }
            $http.post('/eod', payload)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("error: " + response);
            });

        };

    }]);
})();