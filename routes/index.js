var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
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

router.get('/tables', function(req, res, next) {
	Order().findAll({
		where: {
			isCheckedOut: false
		}
	})
	.then(function(response) {
		return res.json({'content': response});
	});
});

router.get('/drawer', function(req, res, next) {
	printer.openCashDrawer();
	printer.execute(function(err){
		if (err) {
		    console.error("Print failed", err);
		} else {
		 console.log("Print done");
		}
	});
	printer.clear();
});

router.post('/tracks' , function(req, res, next) {
	var trackId = req.body.trackId;
	Track().findAll({
		where: {
			trackId: trackId
		}
	})
	.then(function(response){
		return res.json({'content': response});
	});
});

router.post('/log', function(req, res, next) {
	var filterDate = req.body.filterDate;
	var date = filterDate.substring(filterDate.length-2, filterDate.length);
	var date = parseInt(date) + 1;
	var monthYear = filterDate.substring(0, filterDate.length-2);
	var nextDay = monthYear + date.toString();
	var today = new Date(filterDate);
	var tomorrow = new Date(nextDay);
	 var responsePromise = Order().findAll({
		  where: {
		    isCheckedOut: true,
		    createdAt: {
		    	$lt: tomorrow.setHours(4,0,0,0),
		    	$gt: today.setHours(16,0,0,0)
		    }
		  }
		}).then(function(response){
			return res.json({'content': response});
		});
});

router.post('/void', function(req, res, next) {
	var display = req.body.display;
	var order = req.body.order;
	var tableId = req.body.tableId;
	var receiptInfo = req.body.receiptInfo;
	Order().findAll({
	  where: {
	    tableId: tableId,
	    isCheckedOut: false
	  }
	})
	.then(function(data) {
		if (_.isEmpty(data) == true) {
			
		} else {
			Order().update({
				display: display,
				order: order,
				receiptInfo: receiptInfo
			}, {
				where: {
					tableId: tableId,
					isCheckedOut: false
				}
			});

		}
	});
	return res.json({'content': response});

});

router.post('/track', function(req, res, next) {
	var trackId = req.body.trackId;
	var totalSold = req.body.totalSold;
	var discount = req.body.discount;
	var numTransaction = req.body.numChecks;
	var cash = req.body.cash;
	var nets = req.body.nets;
	Track().findAll({
	  where: {
	    trackId: trackId
	  }
	})
	.then(function(data) {
		if (_.isEmpty(data) == true) {
			Track().create({
				trackId:trackId,
		    	totalSold: totalSold,
				discount: discount,
				numTransaction: numTransaction,
				cash: cash,
				nets: nets
		  	});
		} else {
			Track().update({
				totalSold: totalSold,
				discount: discount,
				numTransaction: numTransaction,
				cash: cash,
				nets: nets
			}, {
				where: {
					trackId: trackId
				}
			});
		}
	});
	return res.json({'success': 'true'});
});

router.post('/transfer', function(req, res, next) {
	var newTable = req.body.newTable;
	var oldTable = req.body.oldTable;
	Order().findAll({
	  where: {
	    tableId: oldTable,
	    isCheckedOut: false
	  }
	})
	.then(function(data) {
		if (_.isEmpty(data) == true) {
			
		} else {
			Order().update({
				tableId: newTable
			}, {
				where: {
					tableId: oldTable,
					isCheckedOut: false
				}
			});

		}
	});
	return res.json({'content': response});
});

router.post('/eod', function(req, res, next) {
	var netSales = parseFloat(req.body.totalSold - req.body.discount).toFixed(2);
	var totalSold = req.body.totalSold.toFixed(2);
	var discount  = req.body.discount.toFixed(2);
	var numChecks = req.body.numChecks;
	var cash = parseFloat(req.body.cash).toFixed(2);
	var nets = parseFloat(req.body.nets).toFixed(2);
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
	printer.println("Number of Transactions: " + numChecks);
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
	var discountAmount = "";
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
	if (_.has(req.body, 'discountAmount') === true) {
		discountAmount = req.body.discountAmount;
		discountAmount = _.padStart(discountAmount, 7, " ");
		discPct = req.body.discPct;
		printer.alignRight();
		printer.println("------------------------------------------");
		printer.println("Subtotal: " + totalAmount)
		printer.println("Total(" + discPct +" off): " + discountAmount);
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
	printer.openCashDrawer();
	printer.execute(function(err){
		if (err) {
		    console.error("Print failed", err);
		} else {
		 console.log("Print done");
		}
	});
	printer.clear();

	var receiptInfo = {
		totalAmount: parseFloat(totalAmount),
		firstOrder: firstOrder,
		discountAmount: parseFloat(discountAmount),
		discountPct: discPct,
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
	console.log(req.body);
	var tableId = req.body.tableId;
	var items = req.body.currentOrders;
	var order = req.body.order;
	var display = req.body.display;
	var invoiceId = req.body.invoiceId;
	var receiptInfo = req.body.receiptInfo;
	printer.alignCenter();
	printer.setTextDoubleHeight();
	printer.println("Table: " + tableId);
	printer.println("------------------------------------------");
	_.forOwn(items, function(value, key) {
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
		    	item: order,
		    	invoiceId: invoiceId,
		    	isCheckedOut: false,
		    	tableId: tableId,
		    	display: display,
		    	receiptInfo: receiptInfo
		  	});
		} else {
			Order().update({
				item: order,
				display: display,
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

module.exports = router;
