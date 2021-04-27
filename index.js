var express = require('express');
var bodyParser = require('body-parser');
var Request = require("request");
var path = require('path');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var createError = require('http-errors');
var mysql = require('mysql');
var connectionDB  = require('./config/database');
var customerRouter = require('./routes/customer');
var app = express();
/** check port **/
const port = process.env.PORT || 3000;
var http = require('http').createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** parse application/json **/
app.use(bodyParser.json());

/** parse application/x-www-form-urlencoded **/
app.use(bodyParser.urlencoded({ extended: true, limit:'500mb' }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//app.use(expressValidator());

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({ 
    secret: 'NectarTech007',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

/** customer html form reder **/
app.get('/',function(req,res){
    res.render('index',{
        topicHead : 'Customer Info',
    });
    console.log('Customer Info');
});

/** set root customer **/
app.use('/customer', customerRouter);

/** server listen **/
var server = http.listen(port, function () {
    console.log('server is running ' + port);
});