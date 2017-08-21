(function () {
    var app = angular.module('mainApp');

    app.controller('checkoutModalController', ['$scope', '$uibModalInstance', 'tableId', 'totalAmount', '$http', 'statusModel', function ($scope, $uibModalInstance, tableId, totalAmount, $http, statusModel) {
        
        var controller = this;
        $scope.isKeyPad = true;
        $scope.isDiscounted = false;
        $scope.discountPct = "0%";
        $scope.tableId = tableId;
        $scope.totalAmount = totalAmount;
        $scope.inputAmount = "0.00";
        $scope.discountedAmount = 0.00;
        $scope.discountedPrettyPrint = "";
        $scope.amountPrettyPrint = "$" + parseFloat(totalAmount).toFixed(2).toString();
        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

        controller.onNumberClick = function($event) {
            console.log($event.currentTarget);
            if ($scope.inputAmount === "0.00") {
                $scope.inputAmount = $event.currentTarget.textContent.trim();
            } else {
                $scope.inputAmount += $event.currentTarget.textContent.trim();
            }
        };

        controller.onClearClick = function() {
            $scope.inputAmount = $scope.inputAmount.substring(0, $scope.inputAmount.length -1);
        };

        controller.changeKeyPad = function() {
            if ($scope.isKeyPad === true)
                $scope.isKeyPad = false;
            else
                $scope.isKeyPad = true;
        };

        controller.onDiscountClick = function($event) {
            var pct = $event.currentTarget.textContent.trim();
            $scope.discountedPrettyPrint = "$";
            if (pct === "5%") {
                $scope.discountedAmount = $scope.totalAmount * 0.95;
            } else if (pct === "10%") {
                $scope.discountedAmount = $scope.totalAmount * 0.90;
            } else if (pct === "20%") {
                $scope.discountedAmount = $scope.totalAmount * 0.80;
            };
            $scope.discountPct = pct;
            $scope.isDiscounted = true;
            $scope.discountedPrettyPrint += parseFloat($scope.discountedAmount).toFixed(2).toString();
        };

        controller.removeDiscountClick = function() {
            $scope.discountedAmount = 0.00;
            $scope.isDiscounted = false;
            $scope.discountedPrettyPrint = "$";
        };

        controller.preprintClick = function() {
            var tableStatus = statusModel.table[$scope.tableId];
            $http.post('/preprint', {'tableId': $scope.tableId, 'order': tableStatus.order, 'totalAmount': tableStatus.totalAmount})
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("error: " + response);
            });
        };

    }]);
})();