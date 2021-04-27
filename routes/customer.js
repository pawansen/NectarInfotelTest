var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dateFormat = require('dateformat');
var connectionDB  = require('../config/database');


router.post('/customer_info',function(req,res){
	var dateObj = new Date();
	let createDate = dateFormat(dateObj.request_date,"yyyy-mm-dd hh:MM:ss");
	const customerInfo = req.body;
	customerInfo.EntryDate = createDate;

	var sql = "INSERT INTO customer_information SET ?";
	connectionDB.query(sql,customerInfo,function(err,data){
		if(err) throw err;
			console.log("Customer information is inserted successfully");
	});
	res.redirect('/');
});

module.exports = router;