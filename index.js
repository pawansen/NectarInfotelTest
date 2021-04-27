var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Request = require("request");
var path = require('path');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var createError = require('http-errors');
var mysql = require('mysql');
var connectionDB  = require('./config/database');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* check port*/
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//app.use(expressValidator());

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

/*parse application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true, limit:'500mb' }))

/*parse application/json*/
app.use(bodyParser.json());

var http = require('http').createServer(app);


app.get('/',function(req,res){
    res.render('index',{
        topicHead : 'Student Form',
    });
    console.log('user accessing Home page');
});


var server = http.listen(port, function () {
    console.log('server is running ' + port);
});