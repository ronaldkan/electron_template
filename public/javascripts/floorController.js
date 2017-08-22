(function() {
	var app = angular.module('mainApp')

	app.controller('floorController', ['$scope', '$http', '$state', 'statusModel', function($scope, $http, $state, statusModel) {
		var controller = this;
		$scope.tables = statusModel.tableConfig;

		$scope.checkTableStatus = function(tableId) {
			if (_.isEmpty(statusModel.table[tableId].display) === true)
				return '/images/table.png';
			else
				return '/images/table-active.png';
		};

		controller.selectTable = function($event) {
			var tableId = $event.currentTarget.id;
			$state.go('order', {tableId: tableId});
		};

		controller.setTableLocation = function(config) {
			return { top: config.top + 'px', left: config.left + 'px' }
		};

	}]);
})();