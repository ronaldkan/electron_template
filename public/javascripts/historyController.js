(function() {
	var app = angular.module('mainApp')

	app.controller('historyController', ['$scope', '$http', '$state', 'statusModel', function($scope, $http, $state, statusModel) {
		var controller = this;
		$scope.isLoading = true;
		$scope.logs = [];
		$scope.display = {};
		
		app.filter('priceDisplay', function() {
	        return function (input) {
	            return parseFloat(input).toFixed(2);
	        };
	    });

		controller.getLogs = function() {
			controller.abc
			abc = [];
			$http.get('/log')
			.then(function (response) {
				$scope.logs = response.data.content;
				console.log($scope.logs);
				$scope.display = response.data.content[5];
			});
		};

		controller.onLogClick = function($event) {
			var id = $event.currentTarget.id;
			$scope.display = $scope.logs[id];
		};

		controller.getLogs();	

	}]);
})();