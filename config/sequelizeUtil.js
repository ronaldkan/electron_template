'use strict';
var Sequelize = require('sequelize');

module.exports = function() {
	var sequelize = new Sequelize('postgres://posadmin:Pass1234@localhost/posdb');
	sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

	return sequelize;
};