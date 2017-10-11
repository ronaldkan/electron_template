var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
var printer = require('node-thermal-printer');
printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0',
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


module.exports = router;
