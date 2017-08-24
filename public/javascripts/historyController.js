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

	    controller.setFirstClass = function(index) {
	    	if (index === 0)
	    		return 'logListActive';
	    };

		controller.getLogs = function() {
			// $http.get('/log')
			// .then(function (response) {
			// 	$scope.logs = response.data.content;
			// 	$scope.display = response.data.content[0];
			// });
		};

		controller.onLogClick = function($event) {
			var id = $event.currentTarget.id;
			$scope.display = $scope.logs[id];
			$('.historyLogList').each(function() {
				$(this).removeClass('logListActive');
			});
			$event.currentTarget.children[0].classList.add('logListActive');
		};

		controller.getLogs();	

	}]);
})();