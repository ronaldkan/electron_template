(function () {
    var app = angular.module('mainApp');

    app.controller('checkoutModalController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
        
        var controller = this;

        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

    }]);
})();