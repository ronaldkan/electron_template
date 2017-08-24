(function () {
    var app = angular.module('mainApp');

    app.controller('loadingModalController', ['$scope', '$uibModalInstance', '$http', 'statusModel', 'trackingModel', function ($scope, $uibModalInstance, $http, statusModel, trackingModel) {
        
        var controller = this;
        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

        controller.loadTables = function() {
            $http.get('/tables')
            .then(function successCallback(response) {
                _.each(response.data.content, function(data) {
                    statusModel.table[data.tableId].display = data.display;
                    statusModel.table[data.tableId].receiptInfo = data.receiptInfo;
                    statusModel.table[data.tableId].order = data.item;
                });
                $uibModalInstance.dismiss();
            }, function errorCallback(response) {
                console.log("error: " + response);
            });
        };

        controller.loadTables();

    }]);
})();