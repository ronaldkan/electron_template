var app = angular.module('mainApp', ["ui.router", "ui.bootstrap"])

app.config(function($stateProvider, $urlRouterProvider) {
    var adminState = {
        name: 'admin',
        url: '/',
        templateUrl: 'templates/admin.html'
	}

	var floorState = {
        name: 'floor',
        url: '/floor',
        controller: 'floorController',
        controllerAs: 'vm',
        templateUrl: 'templates/floor.html'
	}
	
	var checkoutState = {
		name: 'checkout',
        url: '/checkout',
        templateUrl: 'templates/checkout.html'
	}

	var orderState = {
		name: 'order',
        url: '/order',
      	controller: 'orderController',
      	controllerAs: 'vm',
        templateUrl: 'templates/order.html',
        params: {
        	tableId: null
        }
	}

	$stateProvider.state(adminState);
	$stateProvider.state(floorState);
	$stateProvider.state(checkoutState);
	$stateProvider.state(orderState);
	$urlRouterProvider.otherwise('/floor');
});

app.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    var controller = this;

    controller.barTouch = function() {
        $state.go('floor');
    };
}]);