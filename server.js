var express = require('express');
var path = require('path');
var mongo = require('mongoskin');
var multer  = require('multer');
var logger = require('morgan');

var mongoLabURI = "mongodb://heroku_app37016502:p1sbe9ln8etukcd8eegchpk5jd@ds031852.mongolab.com:31852/heroku_app37016502";
var db =  mongo.db(mongoLabURI, {native_parser:true});
//var db =  mongo.db('mongodb://localhost:27017/testsystem', {native_parser:true});
var ObjectID = mongo.ObjectID;
var app = express();
var utils = require('./utils/validation.js');

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var loggedUsers = require('./routes/loggedUsers.js');

var session = require('express-session');

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function(req,res,next){
	req.db = db;
	req.ObjectID = ObjectID;
	req.utils = utils;
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

app.use(
	multer({ 
		dest: './import/',
		onFileUploadStart: function (file, req, res) {
	  		console.log(file.fieldname + ' is starting ...')
		},
		onFileUploadData: function (file, data, req, res) {
		  console.log(data.length + ' of ' + file.fieldname + ' arrived')
		},
		onFileUploadComplete: function (file, req, res) {
		  console.log(file.fieldname + ' uploaded to  ' + file.path)
		}
	})
);

app.use('/',index);
app.use('/loggedUsers', loggedUsers)
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
/*
db.collection('filledTests').remove({}, function(err, result){
	if(err) throw err;
	console.log("DELETED FILLED TESTS " + result);
})
*/
app.listen(app.get('port'), function(){
	console.log('Test System is running...');
	console.log("PORT : " + app.get('port'));
});

