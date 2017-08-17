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
			'Crayfish': {'name': 'Crayfish', 'secondary': '虾婆', 'price': 4.90},
			'Prawn': {'name': 'Prawn', 'secondary': '虾', 'price': 3.90},
			'Scallop': {'name': 'Scallop', 'secondary': '扇贝', 'price': 3.90},
			'Salmon': {'name': 'Salmon', 'secondary': '三文鱼片', 'price': 3.20},
			'Grouper Slice': {'name': 'Grouper Slice', 'secondary': '石斑鱼', 'price': 2.90},
			'Shishamo': {'name': 'Shishamo', 'secondary': '鱼', 'price': 2.40},
			'Squid': {'name': 'Squid', 'secondary': '墨鱼', 'price': 2.40},
			'Cuttlefish': {'name': 'Cuttlefish', 'secondary': '鱿鱼', 'price': 2.40},
			'White Claims': {'name': 'White Claims', 'secondary': '白蛤', 'price': 2.40},
			'Seabass Fillet': {'name': 'Seabass Fillet', 'secondary': '鱼', 'price': 3.20},
		};
		model.vegetable = 
		{
			'Chinese Cabbage': {'name': 'Chinese Cabbage', 'secondary': '大白菜', 'price': 1.50},
			'Kang Kong': {'name': 'Kang Kong', 'secondary': '空心菜', 'price': 1.50},
			'Xiao Bai Chye': {'name': 'Xiao Bai Chye', 'secondary': '小白菜', 'price': 1.50},
			'Lettuce': {'name': 'Lettuce', 'secondary': '生菜', 'price': 1.80},
			'Spinach': {'name': 'Spinach', 'secondary': '苋菜', 'price': 1.50},
			'Tang Oh': {'name': 'Tang Oh', 'secondary': '茼蒿', 'price': 1.80},
			'Round Cabbage': {'name': 'Round Cabbage', 'secondary': '包菜', 'price': 1.50},
			'Eryngii Mushroom': {'name': 'Eryngii Mushroom', 'secondary': '杏鲍菇', 'price': 1.50},
			'Oyster Mushroom': {'name': 'Oyster Mushroom', 'secondary': '蚝菇', 'price': 1.50},
			'Golden Mushroom': {'name': 'Golden Mushroom', 'secondary': '金针菇', 'price': 1.50},
			'Baby Corn': {'name': 'Baby Corn', 'secondary': '玉米', 'price': 1.50},
			'Corn': {'name': 'Corn', 'secondary': '玉米', 'price': 1.50},
			'Broccoli': {'name': 'Broccoli', 'secondary': '西兰菜', 'price': 1.80},
		};
		model.side = 
		{
			'Fishcake': {'name': 'Fishcake', 'secondary': '泰式鱼饼', 'price': 1.90},
			'Fish Balls': {'name': 'Fish Balls', 'secondary': '鱼丸', 'price': 1.90},
			'Egg Tofu': {'name': 'Egg Tofu', 'secondary': '蛋豆腐', 'price': 1.90},
			'Crabstick': {'name': 'Crabstick', 'secondary': '蟹肉', 'price': 1.90},
			'Hotdog': {'name': 'Hotdog', 'secondary': '鸡肉', 'price': 1.90},
			'Cheese Hotdog': {'name': 'Cheese Hotdog', 'secondary': '奶酪热狗', 'price': 2.40},
			'Cheese Tofu': {'name': 'Cheese Tofu', 'secondary': '奶酪豆腐', 'price': 2.40},
			'Cheese Ball': {'name': 'Cheese Ball', 'secondary': '芝士球', 'price': 2.40},
			'Quail Egg': {'name': 'Quail Egg', 'secondary': '鹌鹑蛋', 'price': 1.90},
			'Egg': {'name': 'Egg', 'secondary': '鸡蛋', 'price': 0.50},
			'Rice': {'name': 'Rice', 'secondary': '香米饭', 'price': 0.80},
			'Tang Hoon': {'name': 'Tang Hoon', 'secondary': '冬粉', 'price': 0.80},
			'Thai Maggie': {'name': 'Thai Maggie', 'secondary': '泰式面条', 'price': 1.00},
		};
        return model;
    }]);
})();