var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
var Order = require('../models/order');
var escpos = require('escpos');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/checkout', function(req, res, next) {
	var device  = new escpos.Network('192.168.1.148', 9100); 
	var printer1 = new escpos.Printer(device);
	var order = req.body.order;
	var tableId = req.body.tableId;
	var totalAmount = parseFloat(req.body.totalAmount).toFixed(2).toString();
	var invoiceId = req.body.invoiceId;
	var firstOrder = req.body.firstOrder;
	device.open(function(){
		printer1
		.font('a')
		.align('ct')
		.size(1, 1)
		.text("Bangkok Street Mookata")
		.text("421 Ang Mo Kio Avenue 10 #01-1149")
		.text("Singapore 560421")
		.text("------------------------------------------")
		.align("lt")
		.text("Table: " + tableId)
		.text("Receipt: " + invoiceId)
		.text("Open at: " + firstOrder)
		.text("------------------------------------------");
		_.forOwn(order, function(value, key) {
			var name = value.name;
			if (name.length < 20) {
				if (value.price < 10)
					name = _.padEnd(name, 20, " ");
				else if (value.price < 100)
					name = _.padEnd(name, 19, " ");
				else if (value.price < 1000)
					name = _.padEnd(name, 18, " ");
			}
			printer1
			.align('lt')
			.text("  " + value.quantity + "      " + name + "        " + parseFloat(value.price).toFixed(2).toString());
		});
		printer1
		.align('rt')
		.text("------------------------------------------")
		.text("Subtotal: " + totalAmount)
		.text("Total: " + totalAmount);
		if (_.has(req.body, 'cash') === true) {
			printer1
			.text("Cash: " + req.body.cash);
		}
		if (_.has(req.body, 'change') === true) {
			printer1
			.text("Change: " + req.body.change);
		}
		printer1
		.text("------------------------------------------")
		.align('ct')
		.text("Printed at: " + moment().format('MMMM Do YYYY, HH:mm'))
		.text("Thank you!")
		.flush()
		.cut('', 5)
		.close();
	});
	return res.json({'success': 'true'});
});

router.post('/preprint', function(req, res, next) {
	var device  = new escpos.Network('192.168.1.148', 9100); 
	var printer1 = new escpos.Printer(device);
	var order = req.body.order;
	var tableId = req.body.tableId;
	var totalAmount = parseFloat(req.body.totalAmount).toFixed(2).toString();
	device.open(function(){
		printer1
		.font('a')
		.align('ct')
		.size(1, 1)
		.text("-PREPRINT-")
		.text("------------------------------------------")
		.text("Bangkok Street Mookata")
		.text("421 Ang Mo Kio Avenue 10 #01-1149")
		.text("Singapore 560421")
		.text("------------------------------------------")
		.align("lt")
		.text("Table: " + tableId)
		.text("Receipt: 123142")
		.text("Open at:")
		.text("------------------------------------------");
		_.forOwn(order, function(value, key) {
			var name = value.name;
			if (name.length < 20) {
				if (value.price < 10)
					name = _.padEnd(name, 20, " ");
				else if (value.price < 100)
					name = _.padEnd(name, 19, " ");
				else if (value.price < 1000)
					name = _.padEnd(name, 18, " ");
			}
			printer1
			.align('lt')
			.text("  " + value.quantity + "      " + name + "        " + parseFloat(value.price).toFixed(2).toString());
		});
		printer1
		.align('rt')
		.text("------------------------------------------")
		.text("subtotal: " + totalAmount)
		.text("total: " + totalAmount)
		.text("------------------------------------------")
		.align('ct')
		.text("Printed at: " + moment().format('MMMM Do YYYY, HH:mm'))
		.text("Thank you!")
		.flush()
		.cut('', 5)
		.close();
	});
	return res.json({'success': 'true'});
});

router.post('/kitchen', function(req, res,next) {
	var device  = new escpos.Network('192.168.1.148', 9100); 
	var printer1 = new escpos.Printer(device);
	var tableId = req.body.tableId;
	var items = _.omit(req.body, ['tableId']);
	// device.open(function(){
	// 	printer1
	// 	.font('a')
	// 	.align('ct')
	// 	.size(1, 2)
	// 	.text("Table Number: " + tableId)
	// 	.text("------------------------------------------");
	// 	_.forOwn(_.omit(req.body, ['tableId']), function(value, key) {
	// 		printer1
	// 		.align('lt')
	// 		.text("  " + value.quantity + "         " + value.name + " " + value.secondary);
	// 	});
	// 	printer1
	// 	.size(1,2)
	// 	.align('ct')
	// 	.size(1,1)
	// 	.text("------------------------------------------")
	// 	.text("Order Time: " + moment().format('MMMM Do YYYY, HH:mm'))
	// 	.flush()
	// 	.cut('', 5)
	// 	.close();
	// });

	// Order().findAll({
	//   where: {
	//     tableId: tableId,
	//     isCheckedOut: false
	//   }
	// })
	// .then(function(data) {
	// 	if (_.isEmpty(data) == true) {
	// 		Order().create({
	// 	    	item: items,
	// 	    	invoiceId: '421081860',
	// 	    	isCheckedOut: false,
	// 	    	tableId: tableId
	// 	  	});
	// 	} else {
	// 		var currentItem = data.item;
	// 		var newItem = _.merge(data.item, items);
	// 		Order().update({
	// 			item: newItem
	// 		}, {
	// 			where: {
	// 				tableId: tableId,
	// 				isCheckedOut: false
	// 			}
	// 		});

	// 	}
	// });
	return res.json({'success': 'true'});
});

module.exports = router;
