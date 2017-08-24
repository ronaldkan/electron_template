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
	
	var historyState = {
		name: 'history',
        url: '/history',
        controller: 'historyController',
        controllerAs: 'vm',
        templateUrl: 'templates/history.html'
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
	$stateProvider.state(historyState);
	$stateProvider.state(orderState);
	$urlRouterProvider.otherwise('/floor');
});

app.controller('mainController', ['$scope', '$http', '$state', 'statusModel', '$uibModal', function($scope, $http, $state, statusModel, $uibModal) {
    var controller = this;

    controller.barTouch = function() {
        $state.go('floor');
    };

    controller.appInitialize = function() {
        modalInstance = $uibModal.open({
            backdrop: 'static',
            keyboard: 'false',
            templateUrl: 'templates/loading.html',
            controller: 'loadingModalController',
            controllerAs: 'vm',
            size: 'sm'
        });
    };

    controller.endOfDay = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/eodModal.html',
            controller: 'eodModalController',
            controllerAs: 'vm',
            resolve: {
            },
            size: 'sm'
        });
    };
    statusModel.initializeTables();
    // controller.appInitialize();
}]);