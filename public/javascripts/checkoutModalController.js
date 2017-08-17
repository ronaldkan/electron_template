(function () {
    var app = angular.module('mainApp');

    app.controller('checkoutModalController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
        
        var controller = this;
        $scope.test = [{'a': {'name': 'a', 'price': 39.90, 'quantity': 1}}, {'message': 'sent on 13:30'}, {'chicken rice': {'name': 'chicken rice', 'price': 39.90, 'quantity': 1}}, {'a': {'name': 'a', 'price': 39.90, 'quantity': 1}}];

        controller.gotMessage = function(obj) {
        	return (_.has(obj, 'message'));
        };
        controller.onActionCancel = function () {
            $uibModalInstance.dismiss();
        };

        var abc = {};
        _.forEach($scope.test, function(data) {
        	console.log(data);
        	if(_.has(data, 'message') === false) {
        		_.merge(abc, data);
        	}
        });
        console.log(abc);
    }]);
})();