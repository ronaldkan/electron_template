(function() {
	var app = angular.module('mainApp')

	app.controller('floorController', ['$scope', '$http', '$state', function($scope, $http, $state) {
		var controller = this;

		controller.selectTable = function($event) {
			var tableId = $event.currentTarget.id;
			$state.go('order', {tableId: tableId});
		};

	}]);
})();