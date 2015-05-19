var express = require('express');
var path = require('path');
var mongo = require('mongoskin');
var mongoLabURI = "mongodb://heroku_app37016502:p1sbe9ln8etukcd8eegchpk5jd@ds031852.mongolab.com:31852/heroku_app37016502";
var db =  mongo.db(mongoLabURI, {native_parser:true});
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

db.collection('users').find().toArray(function(err, users){
	if(users.length == 0){
		db.collection('users').insert({ username : "admin", password : "123456", role : "admin"},
			function(err, result){
				if(err){
					throw err;
				} else {
					console.log("admin inserted");
				}
			})
	}
});


