var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
var Order = require('../models/order');
var printer = require('node-thermal-printer');
printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0',
    ip: "192.168.1.148",
    port: '9100'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/log', function(req, res, next) {
	 var responsePromise = Order().findAll({
		  where: {
		    isCheckedOut: true
		  }
		}).then(function(response){
			console.log(response);
			return res.json({'content': response});
		});
});

router.post('/eod', function(req, res, next) {
	var netSales = req.body.totalSold - req.body.discount;
	var totalSold = req.body.totalSold.toFixed(2);
	var discount  = req.body.discount.toFixed(2);
	var numChecks = req.body.numChecks;
	var cash = req.body.cash;
	var nets = req.body.nets;
	printer.alignCenter();
	printer.println("Sales Report");
	printer.println("Day of Operation: " + moment().format('MMMM Do YYYY'));
	printer.println("------------------------------------------");
	printer.alignLeft();
	printer.println("Overview");
	printer.println("Items Sold: $" + totalSold);
	printer.println("-Discount: $" + discount);
	printer.println("Net Sales: $" + netSales);
	printer.println("------------------------------------------");
	printer.println("Payment breakdown")
	printer.println("Cash: $" + cash);
	printer.println("Nets: $" + nets);
	printer.println("------------------------------------------");
	printer.println("Printed At: " + moment().format('MMMM Do YYYY, HH:mm'));
	printer.cut();
	printer.execute(function(err){
		if (err) {
		    console.error("Print failed", err);
		} else {
		 console.log("Print done");
		}
	});
	printer.clear();
	return res.json({'success': 'true'});
});

router.post('/checkout', function(req, res, next) {
	var order = req.body.order;
	var tableId = req.body.tableId;
	var totalAmount = parseFloat(req.body.totalAmount).toFixed(2);
	totalAmount = _.padStart(totalAmount, 7, " ");
	var invoiceId = req.body.invoiceId;
	var firstOrder = req.body.firstOrder;
	var cash = "";
	var nets = "";
	var change = "";
	var discountedAmount = "";
	var discPct = "";
	printer.alignCenter();
	printer.println("Bangkok Street Mookata");
	printer.println("421 Ang Mo Kio Avenue 10 #01-1149");
	printer.println("Singapore 560421");
	printer.println("------------------------------------------");
	printer.alignLeft();
	printer.println("Table: " + tableId);
	printer.println("Receipt: " + invoiceId);
	printer.println("Open at: " + firstOrder);
	printer.println("------------------------------------------");
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
		printer.println("  " + value.quantity + "      " + name +
		 "       $" + parseFloat(value.price).toFixed(2).toString());
	});
	if (_.has(req.body, 'discountedAmount') === true) {
		discountedAmount = req.body.discountedAmount;
		discountedAmount = _.padStart(discountedAmount, 7, " ");
		printer.alignRight();
		printer.println("------------------------------------------");
		printer.println("Subtotal: " + totalAmount)
		printer.println("Total(" + req.body.discPct +" off): " + discountedAmount);
	} else {
		printer.alignRight();
		printer.println("------------------------------------------");
		printer.println("Subtotal: " + totalAmount);
		printer.println("Total: " + totalAmount);
	}
	if (_.has(req.body, 'cash') === true && req.body.cash !== 0) {
		cash = req.body.cash.toFixed(2);
		cash = _.padStart(cash, 7, " ");
		printer.println("Cash: " + cash);
	}
	if (_.has(req.body, 'nets') === true && req.body.nets !== 0) {
		nets = req.body.nets.toFixed(2);
		nets = _.padStart(nets, 7, " ");
		printer.println("Nets: " + nets);
	}
	if (_.has(req.body, 'change') === true && req.body.change !== 0) {
		change = req.body.change.toFixed(2);
		change = _.padStart(change, 7, " ");
		printer.println("Change: " + change);
	}
	printer.println("------------------------------------------")
	printer.alignCenter();
	var printTime = moment().format('MMMM Do YYYY, HH:mm');
	printer.println("Printed at: " + printTime);
	printer.println("Thank you!")
	printer.cut();
	printer.execute(function(err){
		if (err) {
		    console.error("Print failed", err);
		} else {
		 console.log("Print done");
		}
	});
	printer.clear();

	var receiptInfo = {
		totalAmount: totalAmount,
		firstOrder: firstOrder,
		discountedAmount: discountedAmount,
		discPct: discPct,
		cash: cash,
		nets: nets,
		change: change,
		printTime: printTime
	}

	Order().findAll({
	  where: {
	    tableId: tableId,
	    isCheckedOut: false
	  }
	})
	.then(function(data) {
		if (_.isEmpty(data) == true) {
			Order().create({
		    	item: order,
		    	invoiceId: invoiceId,
		    	isCheckedOut: true,
		    	tableId: tableId,
		    	receiptInfo: receiptInfo
		  	});
		} else {
			var currentItem = data.item;
			Order().update({
				item: order,
				invoiceId: invoiceId,
				isCheckedOut: true,
				receiptInfo: receiptInfo
			}, {
				where: {
					tableId: tableId,
					isCheckedOut: false
				}
			});

		}
	});

	return res.json({'success': 'true'});
});

router.post('/preprint', function(req, res, next) {
	var order = req.body.order;
	var tableId = req.body.tableId;
	var totalAmount = parseFloat(req.body.totalAmount).toFixed(2).toString();
	printer.alignCenter();
	printer.println("--PREPRINT");
	printer.println("------------------------------------------")
	printer.println("Bangkok Street Mookata")
	printer.println("421 Ang Mo Kio Avenue 10 #01-1149")
	printer.println("Singapore 560421")
	printer.println("------------------------------------------")
	printer.alignLeft();
	printer.println("Table: " + tableId)
	printer.println("Receipt: 123142")
	printer.println("Open at:")
	printer.println("------------------------------------------");
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
		printer.println("  " + value.quantity + "      " + name +
		 "       $" + parseFloat(value.price).toFixed(2).toString());
	});
	printer.alignRight();
	printer.println("------------------------------------------")
	printer.println("subtotal: $" + totalAmount)
	printer.println("total: $" + totalAmount)
	printer.println("------------------------------------------")
	printer.alignCenter();
	printer.println("Printed at: " + moment().format('MMMM Do YYYY, HH:mm'))
	printer.println("Thank you!")
	printer.cut();
	printer.execute(function(err){
		if (err) {
		    console.error("Print failed", err);
		} else {
		 console.log("Print done");
		}
	});
	printer.clear();

	return res.json({'success': 'true'});
});

router.post('/kitchen', function(req, res,next) {
	var tableId = req.body.tableId;
	var items = _.omit(req.body, ['tableId']);
	printer.alignCenter();
	printer.setTextDoubleHeight();
	printer.println("Table: " + tableId);
	printer.println("------------------------------------------");
	_.forOwn(_.omit(req.body, ['tableId']), function(value, key) {
		printer.alignLeft();
		printer.println("  " + value.quantity + "         " + value.name + " " + value.secondary, 'GB18030');
	});
	printer.println("------------------------------------------")
	printer.alignCenter();
	printer.println("Order at: " + moment().format('MMMM Do YYYY, HH:mm'))
	printer.cut();
	printer.execute(function(err){
		if (err) {
		    console.error("Print failed", err);
		} else {
		 console.log("Print done");
		}
	});
	printer.clear();

	Order().findAll({
	  where: {
	    tableId: tableId,
	    isCheckedOut: false
	  }
	})
	.then(function(data) {
		if (_.isEmpty(data) == true) {
			Order().create({
		    	item: items,
		    	invoiceId: '421081860',
		    	isCheckedOut: false,
		    	tableId: tableId
		  	});
		} else {
			var currentItem = data.item;
			var newItem = _.merge(data.item, items);
			Order().update({
				item: newItem
			}, {
				where: {
					tableId: tableId,
					isCheckedOut: false
				}
			});

		}
	});
	return res.json({'success': 'true'});
});

module.exports = router;
