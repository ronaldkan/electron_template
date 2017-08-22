(function () {
    var app = angular.module('mainApp');

    app.controller('checkoutModalController', ['$scope', '$uibModalInstance', 'tableId', 'totalAmount', '$http', 'statusModel', 'deposit', '$state', '$timeout', function ($scope, $uibModalInstance, tableId, totalAmount, $http, statusModel, deposit, $state, $timeout) {
        
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

        $scope.deposit = deposit;
        $scope.cash = 0;
        $scope.nets = 0;
        $scope.change = 0;

        controller.onConfirmationClick = function() {
            if ($scope.inputAmount !== "0.00") {
                $scope.cash = parseFloat($scope.inputAmount).toFixed(2);
                $scope.inputAmount = "0.00";
            }
            var tableStatus = statusModel.table[$scope.tableId];
            if (tableStatus.firstOrder === "")
                tableStatus.firstOrder = moment().format('MMMM Do YYYY, HH:mm');
            if (tableStatus.invoiceId === "")
                tableStatus.invoiceId = moment().format('YY') + 'AMK' + moment().format('HHDDmmss');
            var info = {
                'order': tableStatus.order,
                'firstOrder': tableStatus.firstOrder,
                'invoiceId': tableStatus.invoiceId,
                'tableId': $scope.tableId,
                'totalAmount': tableStatus.totalAmount
            }
            var currentTotal = parseFloat($scope.deposit) + parseFloat($scope.cash) + parseFloat($scope.nets);
            // discount price
            if($scope.discountedAmount !== 0.00) {
                if (currentTotal >= $scope.discountedAmount) {
                    $scope.change = parseFloat(currentTotal - $scope.discountedAmount).toFixed(2);
                    info['discountedAmount'] = parseFloat($scope.discountedAmount).toFixed(2);
                    info['discPct'] = $scope.discountPct;
                } else {
                    return;
                }
            } else {
                // fully paid
                if (currentTotal >= $scope.totalAmount) {
                    $scope.change = parseFloat(currentTotal - $scope.totalAmount).toFixed(2);
                } else {
                    return;
                }
            }
            info['cash'] = parseFloat($scope.deposit) + parseFloat($scope.cash);
            info['nets'] = parseFloat($scope.nets);
            info['change'] = parseFloat($scope.change);
            $http.post('/checkout', _.merge($scope.currentOrders, info))
            .then(function successCallback(response) {
                statusModel.clearTable($scope.tableId);
                $state.go('floor');
                $timeout(function() {
                    $uibModalInstance.dismiss();
                }, 5000);
            }, function errorCallback(response) {
                console.log("error: " + response);
            });
        };

        controller.onNetsClick = function() {
            $scope.nets = parseFloat($scope.inputAmount).toFixed(2);
            $scope.inputAmount = "0.00";
            controller.onConfirmationClick();
        };

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