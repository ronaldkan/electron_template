(function () {
    var app = angular.module('mainApp');

    app.controller('transferModalController', ['$scope', '$uibModalInstance', 'tableId', '$http', 'statusModel', function ($scope, $uibModalInstance, tableId, $http, statusModel) {
        
        var controller = this;
        $scope.AllTables = statusModel.table;
        $scope.tableId = tableId;
        $scope.newTableId = "";

        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

        controller.checkItemLoop = function(index) {
            if (index % 4 === 0 && index !== 0)
                return true
            return false
        };

        controller.onNumberClick = function($event) {
            if ($event.currentTarget.style.backgroundColor === "rgb(255, 102, 102)")
                return;
            var tableId = $event.currentTarget.textContent.trim();
            $scope.newTableId = tableId;
        };

        controller.onCancelClick = function() {
            $scope.newTableId = "";
        };

        controller.onConfirmClick = function() {
            $uibModalInstance.close($scope.newTableId);
        };

        controller.checkAvailability = function(table) {
            if (_.isEmpty(table.display) === true)
                return {};
            else
                return {'background-color': '#ff6666'};
        };

    }]);
})();