(function() {
	var app = angular.module('mainApp')

	app.controller('orderController', ['$scope', '$http', '$state', '$stateParams', 'menuModel', function($scope, $http, $state, $stateParams, menuModel) {
		var controller = this;
		var tableId = $stateParams.tableId;
		$scope.categories = ['Platter', 'Meat Delight', 'Seafood', 'Vegetable', 'Sides'];
		$scope.platter = 
		{
			'Platter for 4': {'name': 'Platter for 4', 'secondary':'四人套餐', 'price': 39.90},
			'Platter for 2': {'name': 'Platter for 2', 'secondary': '二人套餐', 'price': 29.90}

		};
		$scope.currentItems = $scope.platter;
		$scope.currentOrders = {};
		$scope.table = tableId;
		$scope.totalAmount = 0;
		
		controller.itemClicked = function($event) {
			var itemName = $event.currentTarget.id;
			var item = $scope.currentItems[itemName];
			if (_.has($scope.currentOrders, itemName) === false) {
				$scope.currentOrders[itemName] = {'name': itemName, 'price': item.price, 'quantity': 1};
				$scope.totalAmount += item.price;
				$scope.totalAmount = _.round($scope.totalAmount, 2);
			} else {
				$scope.currentOrders[itemName]['quantity'] += 1;
				$scope.totalAmount += $scope.currentOrders[itemName]['price'];
				$scope.totalAmount = _.round($scope.totalAmount, 2);
			}
			console.log(item);
		};

		controller.checkItemLoop = function(index) {
			if (index % 3 === 0 && index !== 0)
				return true
			return false
		}
	}]);
})();