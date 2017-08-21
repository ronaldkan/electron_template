(function() {
	var app = angular.module('mainApp')

	app.controller('floorController', ['$scope', '$http', '$state', 'statusModel', function($scope, $http, $state, statusModel) {
		var controller = this;

		$scope.checkTableStatus = function(tableId) {
			if (_.isEmpty(statusModel.table[tableId].display) === true)
				return 'floor-button';
			else
				return 'floor-button-occupied';
		};

		controller.selectTable = function($event) {
			var tableId = $event.currentTarget.id;
			$state.go('order', {tableId: tableId});
		};
	}]);
})();