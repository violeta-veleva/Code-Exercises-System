var express = require('express');
var router = express.Router();
var service = require('./service.js');
var Deferred = require('Deferred');

//TODO: password encryption

router.get('/', function(req,res){
	
	res.render("index.ejs");
});

router.get('/home', function(req,res){
	res.render("home.ejs", {title: 'Test System'});
});

router.get('/register', function(req,res){
	res.render("register.ejs", {title: 'Registration'});
});

router.post('/register', function(req,res){
	var userData = req.body;
	req.db.collection('users').findOne({ username : userData.username }, function(err,user){
		if(user){
			res.status(403).send("Username " + userData.username + " is taken")
		} 
		else {
			req.db.collection('users').insert(userData, function(err, result){
				res.send("Congrats, you are registered");
			});
		}
	});
});

router.get('/userDetails', function(req,res){
	if(!req.session.loggedIn) {
		res.send({ loggedIn : false});
	} else {
		res.send({ loggedIn : true, role : req.session.loggedIn.role, username : req.session.loggedIn.username });
	}
});

router.get('/login', function(req,res){
	res.render("login.ejs", {title: 'Login'});
});

router.post('/login', function(req,res){
	var userData = req.body;
	req.db.collection('users').findOne(userData, function(err,user){
		if(user){
			req.session.loggedIn = user;
			req.session.save();
			res.send('You are logged in');
		}
		else{
			res.status(401).send('invalid login information')
		}
	})
})

router.get('/viewAllArticles', function(req,res){
	res.render("viewAllArticles.ejs", {title: 'View All Articles'});
});

router.get('/viewAllHTMLExercises', function(req,res){
	res.render("viewAllHTMLExercises.ejs", {title: 'View All HTML Exercises'});
});

router.get('/viewAllJSExercises', function(req,res){
	res.render("viewAllJSExercises.ejs", {title: 'View All HTML Exercises'});
});

router.get('/404', function(req,res){
	res.render("404.ejs");
});

router.get('/alltests', function(req,res){
	req.db.collection('tests').find().toArray(function(err, tests){
		res.send(tests);
	});
});

router.get('/allHTMLExercises', function(req,res){
	req.db.collection('htmlExercises').find().toArray(function(err, exercises){
		res.send(exercises);
	});
});

router.get('/allJSExercises', function(req,res){
	req.db.collection('jsExercises').find().toArray(function(err, exercises){
		res.send(exercises);
	});
});

router.get('/htmlExercise', function(req, res){
	res.render('htmlExercise.ejs');
});

router.get('/jsExercise', function(req, res){
	res.render('jsExercise.ejs');
});

router.get('/test', function(req, res){
	var name = req.param('name');
	req.db.collection('tests').findOne({name: name}, function(err, test){
		if (err) throw err;
		res.render('test.ejs', {article : test.article });
	});
});

router.get('/htmlExercise', function(req, res){
	var name = req.param('name');
	req.db.collection('htmlExercises').findOne({name: name}, function(err, exercise){
		if (err) throw err;
		res.render('htmlExercise.ejs');
		console.log(exercise);
	});
});

router.get('/jsExercise', function(req, res){
	var name = req.param('name');
	req.db.collection('jsExercises').findOne({name: name}, function(err, exercise){
		if (err) throw err;
		res.render('jsExercise.ejs');
		console.log(exercise);
	});
});

function getExerciseByName(db,collection, name) {
	var def = Deferred();
	db.collection('htmlExercises').findOne({name : name}, function(err,exercise){
		def.resolve(exercise);
	});
	return def.promise();
}

function getJSExerciseByName(db,collection, name) {
	var def = Deferred();
	db.collection('jsExercises').findOne({name : name}, function(err,exercise){
		def.resolve(exercise);
	});
	return def.promise();
}

function getTestByName(db,collection, name) {
	var def = Deferred();
	db.collection('tests').findOne({name : name}, function(err,exercise){
		def.resolve(exercise);
	});
	return def.promise();
}

function getHtmlExercise(db,ObjectID, user, name) {
	var def = Deferred();
	console.log("user", user);
	if(user) {
		db.collection('filledHTMLExercises').findOne(
			{
				userId : user._id.toString(), 
				"htmlExercise.name" : name 
			},
		 function(err, exercise){
		 	console.log(exercise);
			if(!exercise) {
				getExerciseByName(db,'htmlExercises', name).done(function(exercise){
					def.resolve(exercise);
				});
			} else {
				def.resolve(exercise.htmlExercise);
			}
		});
	} else {
		getExerciseByName(db,'htmlExercises', name).done(function(exercise){
			def.resolve(exercise);
		});
	}
	return def.promise();
}

function getJSExercise(db,ObjectID, user, name) {
	var def = Deferred();
	console.log("user", user);
	if(user) {
		db.collection('filledJSExercises').findOne(
			{
				userId : user._id.toString(), 
				"jsExercise.name" : name 
			},
		 function(err, exercise){
		 	console.log(exercise);
			if(!exercise) {
				getJSExerciseByName(db,'jsExercises', name).done(function(exercise){
					def.resolve(exercise);
				});
			} else {
				def.resolve(exercise.jsExercise);
			}
		});
	} else {
		getJSExerciseByName(db,'jsExercises', name).done(function(exercise){
			def.resolve(exercise);
		});
	}
	return def.promise();
}

function getTest(db, ObjectID, user, name) {
	var def = Deferred();
	console.log("user", user);
	if(user) {
		db.collection('filledTests').findOne(
			{
				userId : user._id.toString(), 
				"test.name" : name 
			},
		 function(err, exercise){
		 	console.log(exercise);
			if(!exercise) {
				getExerciseByName(db,'tests', name).done(function(exercise){
					def.resolve(exercise);
				});
			} else {
				def.resolve(exercise.test);
			}
		});
	} else {
		getTestByName(db,'tests', name).done(function(exercise){
			def.resolve(exercise);
		});
	}
	return def.promise();
}

router.get('/htmlExercise/:name', function(req,res){
	//console.log("htmlExercise")
	getHtmlExercise(req.db,req.ObjectID, req.session.loggedIn, req.params.name)
	.done(function(exercise){	
		res.send(exercise);
	});
});

router.get('/jsExercise/:name', function(req,res){
	//req.db.collection('jsExercises').findOne({name: req.params.name}, function(err, exercise){
		//if (err) throw err;
		//res.send(exercise);
	//})
	getJSExercise(req.db, req.ObjectID, req.session.loggedIn, req.params.name)
	.done(function(exercise){	
		res.send(exercise);
	});
});

router.get('/test/:name', function(req,res){
	//req.db.collection('tests').findOne({name: req.params.name}, function(err, test){
		//if (err) throw err;
		//res.send(test);
	//})
	getTest(req.db, req.ObjectID, req.session.loggedIn, req.params.name)
	.done(function(test){	
		res.send(test);
	});
});



module.exports = router;