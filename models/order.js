'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('../config/sequelizeUtil');

module.exports = function () {
	
	var Order = sequelize().define('Order', {
	  item: {
	    type: Sequelize.JSON
	  },
	  invoiceId: {
	  	type: Sequelize.STRING
	  },
	  tableId: {
	  	type: Sequelize.INTEGER
	  },
	  isCheckedOut: {
	  	type: Sequelize.BOOLEAN
	  }
	});

	return Order;
};
