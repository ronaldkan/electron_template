(function () {
    var app = angular.module('mainApp');

    app.controller('depositModalController', ['$scope', '$uibModalInstance', 'tableId', '$http', 'statusModel', 'deposit', function ($scope, $uibModalInstance, tableId, $http, statusModel, deposit) {
        
        var controller = this;
        $scope.tableId = tableId;
        $scope.inputAmount = deposit;

        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

        controller.onNumberClick = function($event) {
            if ($scope.inputAmount === "0.00") {
                $scope.inputAmount = $event.currentTarget.textContent.trim();
            } else {
                $scope.inputAmount += $event.currentTarget.textContent.trim();
            }
        };

        controller.onClearClick = function() {
            $scope.inputAmount = $scope.inputAmount.substring(0, $scope.inputAmount.length -1);
            if ($scope.inputAmount === "")
                $scope.inputAmount = "0.00";
        };

        controller.onConfirmClick = function(fixAmount) {
            if(_.isNil(fixAmount) === true) {
                var dotNum = $scope.inputAmount.split(".").length;
                if (dotNum === 1)
                    $scope.inputAmount += ".00";
                if (dotNum > 2) {

                } else {
                    $uibModalInstance.close($scope.inputAmount);
                }
            }
            else
                $uibModalInstance.close(fixAmount);
        };

    }]);
})();