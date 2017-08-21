(function() {
	var app = angular.module('mainApp')

	app.filter('priceDisplay', function() {
        return function (input) {
            return parseFloat(input).toFixed(2);
        };
    });

	app.controller('orderController', ['$scope', '$http', '$state', '$stateParams', 'menuModel', '$uibModal', 'statusModel', function($scope, $http, $state, $stateParams, menuModel, $uibModal, statusModel) {
		var controller = this;
		var tableId = $stateParams.tableId;
		controller.statusModel = statusModel;
		$scope.orderDisplay = controller.statusModel.table[tableId].display;
		$scope.selectedAll = false;
		$scope.categories = menuModel.categories;
		$scope.platter = menuModel.platter;
		$scope.currentItems = $scope.platter;
		$scope.currentOrders = controller.statusModel.table[tableId].currentOrders;
		$scope.table = tableId;
		$scope.totalAmount = controller.statusModel.table[tableId].totalAmount;
		
		controller.itemClicked = function($event) {
			var itemName = $event.currentTarget.id;
			var item = $scope.currentItems[itemName];
			if (_.has($scope.currentOrders, itemName) === false) {
				$scope.currentOrders[itemName] = {'name': itemName, 'price': item.price, 'quantity': 1, 'secondary': item.secondary};
			} else {
				$scope.currentOrders[itemName].quantity += 1;
				$scope.currentOrders[itemName].price += item.price;
			}

			if (_.has(controller.statusModel .table[$scope.table].order, itemName) === false) {
				controller.statusModel.table[$scope.table].order[itemName] = {'name': itemName, 'price': item.price, 'quantity': 1, 'secondary': item.secondary};
			} else {
				controller.statusModel.table[$scope.table].order[itemName].quantity += 1;
				controller.statusModel.table[$scope.table].order[itemName].price += item.price;
			}

			$scope.totalAmount += item.price;
			$scope.totalAmount = _.round($scope.totalAmount, 2);
			controller.statusModel.table[tableId].totalAmount = $scope.totalAmount;
			controller.statusModel.table[tableId].currentOrders = $scope.currentOrders;
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
			else if (category === 'Seafood')
				$scope.currentItems = menuModel.seafood;
			else if (category === 'Vegetable')
				$scope.currentItems = menuModel.vegetable;
			else if (category === 'Sides')
				$scope.currentItems = menuModel.side;
			else
				$scope.currentItems = menuModel.platter;
		};

		controller.sentClicked = function($event) {
			var target = $event.currentTarget;
			if (target.children[0].id !== "message") {
				if (target.classList.contains('active'))
					target.classList.remove('active');
				else
					target.classList.add('active');
			}

		};

		controller.orderClicked = function($event) {
			var target = $event.currentTarget;
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
				$scope.currentOrders = _.omit($scope.currentOrders, [itemName]);
				$scope.totalAmount -= itemDetails.price;
				$scope.totalAmount = _.round($scope.totalAmount, 2);

				if(controller.statusModel.table[$scope.table].order[itemName].quantity === itemDetails.quantity)
					controller.statusModel.table[$scope.table].order = _.omit(controller.statusModel.table[$scope.table].order, [itemName]);
				else {
					controller.statusModel.table[$scope.table].order[itemName].quantity -= itemDetails.quantity;
					controller.statusModel.table[$scope.table].order[itemName].price -= itemDetails.price;
				}
				controller.statusModel.table[tableId].currentOrders = $scope.currentOrders;
				$(this)[0].remove();
			});
			
			$('.sentRow.active').each(function() {
				var sentEntry = $(this);
				var name = sentEntry[0].children[0].textContent;
				var index = sentEntry[0].children[0].id;
				var price = controller.statusModel.table[$scope.table].display[index][name].price;
				var quantity = controller.statusModel.table[$scope.table].display[index][name].quantity;
				controller.statusModel.table[$scope.table].display[index] = _.omit(controller.statusModel.table[$scope.table].display[index], [name]);

				if (_.keys(controller.statusModel.table[$scope.table].display[index]).length === 1) {
					var display = [];
					for (var i = 0; i < controller.statusModel.table[$scope.table].display.length; i ++) {
						if (i !== parseInt(index) && i !== parseInt(index) + 1)
							display.push(controller.statusModel.table[$scope.table].display[i]);
					}
					controller.statusModel.table[$scope.table].display = display;
					$scope.orderDisplay = controller.statusModel.table[$scope.table].display;
				}

				if(controller.statusModel.table[$scope.table].order[name].quantity === quantity) 
					controller.statusModel.table[$scope.table].order = _.omit(controller.statusModel.table[$scope.table].order, [name]);
				else {
					controller.statusModel.table[$scope.table].order[name].quantity -= quantity;
					controller.statusModel.table[$scope.table].order[name].price -= price;
				}
				$scope.totalAmount -= price;
				$scope.totalAmount = _.round($scope.totalAmount, 2);
				sentEntry[0].remove();
			});
			controller.statusModel.table[tableId].totalAmount = $scope.totalAmount;
		};

		controller.sendClicked = function() {
			if (controller.statusModel.table[$scope.table].firstOrder === "")
				controller.statusModel.table[$scope.table].firstOrder = moment().format('HH:mm:ss')
			var displayMessage = {'message': 'Sent on ' + moment().format('HH:mm:ss')};
			controller.statusModel.table[$scope.table].display.push(_.clone($scope.currentOrders));
			controller.statusModel.table[$scope.table].display.push(displayMessage);
			$http.post('/kitchen', _.merge($scope.currentOrders, {'tableId': $scope.table}))
			.then(function successCallback(response) {
				$scope.currentOrders = {};
				controller.statusModel.table[tableId].currentOrders = $scope.currentOrders;
			}, function errorCallback(response) {
				console.log("error: " + response);
			});
		};

		controller.checkIfMessage = function(rowId) {
			return (rowId !== 'message');
		};

		controller.checkoutClicked = function() {
			var modalInstance = $uibModal.open({
                templateUrl: 'templates/checkoutModal.html',
                controller: 'checkoutModalController',
                controllerAs: 'vm',
                resolve: {
                    tableId: function() {
                        return $scope.table;
                    },
                    totalAmount: function() {
                    	return $scope.totalAmount;
                    }
                },
                size: 'md'
            });
		};
	}]);
})();