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
	  	type: Sequelize.STRING
	  },
	  isCheckedOut: {
	  	type: Sequelize.BOOLEAN,
	  	defaultValue: false
	  },
	  receiptInfo: {
	  	type: Sequelize.JSON
	  }
	});

	return Order;
};
