(function() {
	var app = angular.module('mainApp')

	app.filter('priceDisplay', function() {
        return function (input) {
            return parseFloat(input).toFixed(2);
        };
    });

	app.controller('orderController', ['$scope', '$http', '$state', '$stateParams', 'menuModel', function($scope, $http, $state, $stateParams, menuModel) {
		var controller = this;
		var tableId = $stateParams.tableId;
		$scope.selectedAll = false;
		$scope.categories = menuModel.categories;
		$scope.platter = menuModel.platter;
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
		};

		controller.checkItemLoop = function(index) {
			if (index % 3 === 0 && index !== 0)
				return true
			return false
		};

		controller.categoryClicked = function($event) {
			var category = $event.currentTarget.id;
			if (category === 'Meat Delight')
				$scope.currentItems = menuModel.meat;
			else
				$scope.currentItems = menuModel.platter;
		};

		controller.orderClicked = function($event) {
			var target = $event.currentTarget;
			itemName = target.children[0].id;
			$('.orderRow').each(function() {
				$(this).removeClass('active');
			});
			target.classList.add('active');
		};

		controller.selectAllRow = function() {
			if ($scope.selectedAll === false) {
				$('.orderRow').each(function() {
					$(this).addClass('active');
				});
				$scope.selectedAll = true;
			} else {
				$('.orderRow').each(function() {
					$(this).removeClass('active');
				});
				$scope.selectedAll = false;
			}
			
		};

		controller.deleteRow = function() {
			$('.orderRow.active').each(function() {
				var itemName = $(this)[0].children[0].id;
				var itemDetails = $scope.currentOrders[itemName];
				var price = itemDetails['price'];
				var quantity = itemDetails['quantity'];
				$scope.currentOrders = _.omit($scope.currentOrders, [itemName]);
				$scope.totalAmount -= quantity * price;
				$scope.totalAmount = _.round($scope.totalAmount, 2);
				$(this)[0].remove();
			});
		};
	}]);
})();