(function() {
    var app = angular.module('mainApp');

    app.factory('menuModel', ['$rootScope', function($rootScope) {
        var model = {};
        model.categories = ['Platter', 'Meat Delight', 'Seafood', 'Vegetable', 'Sides'];
        model.platter = 
		{
			'Platter for 4': {'name': 'Platter for 4', 'secondary':'四人套餐', 'price': 39.90},
			'Platter for 2': {'name': 'Platter for 2', 'secondary': '二人套餐', 'price': 29.90}

		};
		model.meat = 
		{
			'Chicken Thigh': {'name': 'Chicken Thigh', 'secondary': '鸡肉', 'price': 1.90},
			'Garlic Chicken': {'name': 'Garlic Chicken', 'secondary': '蒜头鸡肉', 'price': 2.20},
			'Premium Beef': {'name': 'Premium Beef', 'secondary': '牛肉', 'price': 2.90},
			'Pork Belly': {'name': 'Pork Belly', 'secondary': '三层肉', 'price': 1.90},
			'Garlic Pork Collar': {'name': 'Garlic Pork Collar', 'secondary': '蒜头猪颈肉', 'price': 2.20},
			'Pork Collar': {'name': 'Pork Collar', 'secondary': '猪颈肉', 'price': 2.20},
			'Pig Liver': {'name': 'Pig Liver', 'secondary': '猪肝', 'price': 1.90},
			'Pork Ball': {'name': 'Pork Ball', 'secondary': '猪肉丸', 'price': 1.90},
			'Streaky Pork Bacon': {'name': 'Streaky Pork Bacon', 'secondary': '熏肉', 'price': 1.90},
			'Luncheon Meat': {'name': 'Luncheon Meat', 'secondary': '午餐肉', 'price': 1.90},
			'Smoked Duck': {'name': 'Smoked Duck', 'secondary': '熏鸭肉', 'price': 2.90},
		};
		model.seafood = 
		{
			'Crayfish': {'name': 'Crayfish', 'secondary': '鸡肉', 'price': 1.90},
			'Prawn': {'name': 'Prawn', 'secondary': '鸡肉', 'price': 1.90},
			'Scallop': {'name': 'Scallop', 'secondary': '鸡肉', 'price': 1.90},
			'Salmon': {'name': 'Salmon', 'secondary': '鸡肉', 'price': 1.90},
			'Grouper Slice': {'name': 'Grouper Slice', 'secondary': '鸡肉', 'price': 1.90},
			'Shishamo': {'name': 'Shishamo', 'secondary': '鸡肉', 'price': 1.90},
			'Squid': {'name': 'Squid', 'secondary': '鸡肉', 'price': 1.90},
			'Cuttlefish': {'name': 'Chicken Thigh', 'secondary': '鸡肉', 'price': 1.90},
			'White Claims': {'name': 'Chicken Thigh', 'secondary': '鸡肉', 'price': 1.90},
			'Seabass Fillet': {'name': 'Seabass Fillet', 'secondary': '鸡肉', 'price': 1.90},
		};
		model.vegetable = 
		{
			'Chinese Cabbage': {'name': 'Chinese Cabbage', 'secondary': '鸡肉', 'price': 1.90},
			'Kang Kong': {'name': 'Kang Kong', 'secondary': '鸡肉', 'price': 1.90},
			'Scallop': {'name': 'Scallop', 'secondary': '鸡肉', 'price': 1.90},
			'Salmon': {'name': 'Salmon', 'secondary': '鸡肉', 'price': 1.90},
			'Grouper Slice': {'name': 'Grouper Slice', 'secondary': '鸡肉', 'price': 1.90},
			'Shishamo': {'name': 'Shishamo', 'secondary': '鸡肉', 'price': 1.90},
			'Squid': {'name': 'Squid', 'secondary': '鸡肉', 'price': 1.90},
			'Cuttlefish': {'name': 'Chicken Thigh', 'secondary': '鸡肉', 'price': 1.90},
			'White Claims': {'name': 'Chicken Thigh', 'secondary': '鸡肉', 'price': 1.90},
			'Seabass Fillet': {'name': 'Seabass Fillet', 'secondary': '鸡肉', 'price': 1.90},
		};
        return model;
    }]);
})();