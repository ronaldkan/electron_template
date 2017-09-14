var app = angular.module('mainApp', ["ui.router", "ui.bootstrap", "720kb.datepicker"])

app.config(function($stateProvider, $urlRouterProvider) {
    var indexState = {
        name: 'index',
        url: '/',
        templateUrl: 'templates/index.html'
	}

	// var orderState = {
	// 	name: 'order',
 //        url: '/order',
 //      	controller: 'orderController',
 //      	controllerAs: 'vm',
 //        templateUrl: 'templates/order.html',
 //        params: {
 //        	tableId: null
 //        }
	// }

	$stateProvider.state(indexState);
	$urlRouterProvider.otherwise('/');
});

app.controller('mainController', ['$scope', '$http', '$state', '$uibModal', function($scope, $http, $state, $uibModal) {
    var controller = this;

}]);