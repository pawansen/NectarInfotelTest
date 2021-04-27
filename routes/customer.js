var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var connectionDB  = require('../config/database');
const { check, validationResult } = require('express-validator');
router.use(bodyParser.json({limit:'1500mb'}));
router.use(bodyParser.urlencoded({limit:'1500mb',extended:true}));
router.use(express.static(path.join(__dirname, '../public')));

router.post('/customer_info',  [
    check('Name', 'Name field is required').not().isEmpty(),
    check('Title', 'Title field is required').not().isEmpty(),
    check('Corporation', 'Corporation field is required').not().isEmpty(),
    check('AddressFirst', 'Address 1 field is required').not().isEmpty(),
    check('AddressSecond', 'Address 2 field is required').not().isEmpty(),
    check('City', 'City field is required').not().isEmpty(),
    check('State', 'State field is required').not().isEmpty(),
    check('Zip', 'Zip field is required').not().isEmpty().isLength({ min: 6 }).withMessage('Zip must be 6 characters'),
    check('OfficeTele', 'OfficeTele field is required').not().isEmpty().isNumeric(),
    check('CellTele', 'CellTele field is required').not().isEmpty().isNumeric().isLength({ min: 10 }).withMessage('CellTele must be 10 characters'),
    check('Email', 'Email field is required').not().isEmpty().isEmail(),
    check('Url', 'Url field is required').not().isEmpty(),
    check('CustomerType', 'CustomerType field is required').not().isEmpty()
  ], function(req,res,next){

    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
         var dateObj = new Date();
		let createDate = dateFormat(dateObj.request_date,"yyyy-mm-dd hh:MM:ss");
		const customerInfo = req.body;
		customerInfo.EntryDate = createDate;

		var sql = "INSERT INTO customer_information SET ?";
		connectionDB.query(sql,customerInfo,function(err,data){
			if(err) throw err;
				console.log("Customer information is inserted successfully");
		});
		req.flash('success', "Customer information is inserted successfully");
		res.redirect('/');
        }
    else { 
       req.flash('error', errors.errors[0].msg);
       res.render('index',{
        Name:req.body.Name,
        Title:req.body.Title,
        Corporation:req.body.Corporation,
        AddressFirst:req.body.AddressFirst,
        AddressSecond:req.body.AddressSecond,
        City:req.body.City,
        State:req.body.State,
        Zip:req.body.Zip,
        OfficeTele:req.body.OfficeTele,
        CellTele:req.body.CellTele,
        Email:req.body.Email,
        Url:req.body.Url,
        CustomerType:req.body.CustomerType
    });
       //res.redirect('/',{Name:req.body.Name});
    }


});

router.post('/customer_info1',function(req,res,next){

	check('Name').trim().isLength({ min: 1 }).withMessage('Name empty.')
    .isAlpha().withMessage('Name must be alphabet letters.');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        }
    else {
       console.log(errors.isEmpty())  
       req.flash('error', "All fields are required!");
       res.redirect('/');
    }


});

module.exports = router;