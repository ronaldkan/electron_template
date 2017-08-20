var express = require('express');
var router = express.Router();
var printer = require("node-thermal-printer");
var _ = require('lodash');
var moment = require('moment');
var Order = require('../models/order');

// var iconv = require('iconv-lite');
// var legacy = require('legacy-encoding');
// var cptable = require('codepage');

printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0',
    ip: "192.168.1.148",
    port: '9100'
});
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	// Order().create({
	//     item: {'item3': 'aaa'},
	//     invoiceId: '421081860'
	//   });
});

router.post('/kitchen', function(req, res,next) {
	var tableId = req.body.tableId;
	// printer.setTextDoubleHeight();
	// printer.bold(true); 
	// printer.alignCenter();
	// printer.println("Table Number: " + tableId);
	// printer.println("------------------------------------------");
	// _.forOwn(_.omit(req.body, ['tableId']), function(value, key) {
	// 	printer.alignLeft();
	// 	printer.println("  " + value.quantity + "         " + value.name);
	// });
	// printer.println("------------------------------------------");
	// printer.setTextNormal(); 
	// printer.alignCenter();
	// printer.println("Order Time: " + moment().format('MMMM Do YYYY, HH:mm'));
	// printer.cut();
	// printer.execute(function(err) {
	// 	if (err) {
	// 		console.log("faillll " + err);
	// 	} else {
	// 		console.log("print done");
	// 	}	
	// });
	// printer.clear(); 
	return res.json({'success': 'true'});
});

module.exports = router;
