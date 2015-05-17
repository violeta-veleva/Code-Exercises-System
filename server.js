var express = require('express');
var path = require('path');
var mongo = require('mongoskin');
var db =  mongo.db("mongodb://localhost:27017/testsystem", {native_parser:true});
var ObjectID = mongo.ObjectID;
var app = express();
var index = require('./routes/index.js');
var users = require('./routes/users.js');

var session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function(req,res,next){
	req.db = db;
	req.ObjectID = ObjectID;
	next();
});
app.use(
	session({
		cookie: { maxAge: 60*60*60 * 1000 },
		secret: 'keyboard cat',
  		resave: false,
  		saveUninitialized: true
	})
);
app.use('/',index);
app.use('/users', users);


console.log('Test System is running...');
app.listen(3000, function(){
	console.log("PORT : 3000")
});

