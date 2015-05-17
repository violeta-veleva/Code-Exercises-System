var express = require('express');
var router = express.Router();
var service = require('./service.js');

function loginFilter(req,res,next){
	if(!req.session.loggedIn || (req.session.loggedIn.role != 'teacher' && req.session.loggedIn.role != 'admin')) {
		res.render('login.ejs');
	} else {
		next();
	}
}

router.get('/*', loginFilter);

router.post('/*', loginFilter);

router.get('/getUsersHTMLExercises', function(req, res){
	var query = { userId : req.session.loggedIn._id.toString() }
	req.db.collection('filledHTMLExercises').find(query).toArray(
		function(err, result){
			if (result){
				res.send(result);
			}
		})
})

router.post('/submitHTMLExercise', function(req, res){
	var submitData = req.body;
	console.log(submitData);
	
	submitData.userId = req.session.loggedIn._id;
	//console.log('userid1' + typeof submitData.userId);
	var query = { 
		userId : req.session.loggedIn._id.toString(),
		"htmlExercise.name" : submitData.htmlExercise.name
	}

	req.db.collection('filledHTMLExercises').findOne(query,
	 function(err, result){
		console.log("result" + result);
		if(result){
			//update
			console.log('existed');
			req.db.collection('filledHTMLExercises').
			update(query, submitData, function(err, result) {
			    if(err) throw err;
			    res.send('Your exercise was updated');
			})
		}
		else{
			req.db.collection('filledHTMLExercises').insert(submitData, function(err, result){
				if(err){
					throw err;
				}
				else{
					console.log("submited" + submitData);
					res.send("Your Exercise was submited.");
				}
			});
		}
	})
	
});

router.get('/confirmRemovingTest', function(req, res){
    res.render('confirmRemovingTest.ejs')
})

router.get('/confirmRemovingHTMLExercise', function(req, res){
    res.render('confirmRemovingHTMLExercise.ejs')
})

router.get('/confirmRemovingJSExercise', function(req, res){
    res.render('confirmRemovingJSExercise.ejs')
})

router.get('/newtest', function(req,res){
	res.render('new-test.ejs', {title: 'New Test'});
});

router.get('/edittest', function(req,res){
	res.render('editTest.ejs', {title: 'Edit Test'});
});

router.get('/addHtmlExercise', function(req,res){
	res.render('addHtmlExercise.ejs', {title: 'Add New HTML Exericise'});
});

router.get('/addJSExercise', function(req,res){
	res.render('addJSExercise.ejs', {title: 'Add New JS Exericise'});
});

router.get('/allUsers', function(req,res){
	req.db.collection('users').find().toArray(function(err, users){
		res.send(users);
	});
});

router.get('/viewAllUsers', function(req,res){
	res.render("viewAllUsers.ejs", {title: 'View All Users'});
});

router.post('/saveTest', function(req,res){
	var newTest = req.body;
	req.db.collection('tests').insert(newTest, function(err,result){
		if(err) throw err;
		res.send("your test was saved successfully");
	});
	
});

router.post('/saveHTMLExercise', function(req,res){
	var newExercise = req.body;
	req.db.collection('htmlExercises').insert(newExercise, function(err,result){
		if(err) throw err;
		res.send("your exercise was saved successfully");
		console.log(newExercise);
	});
	
});

router.post('/saveJSExercise', function(req,res){
	var newExercise = req.body;
	req.db.collection('jsExercises').insert(newExercise, function(err,result){
		if(err) throw err;
		res.send("your exercise was saved successfully");
		console.log(newExercise);
	});
	
});

router.post('/removeTest', function(req, res){
	var testId = req.body.id;
	console.log(req.body.id);
	req.db.collection('tests').remove({_id: new req.ObjectID(testId)}, function(err, result){
		if(err) throw err;
		res.send('The test was delated successfully');
		console.log(result);
	});
})

router.post('/removeHTMLExercise', function(req, res){
	var htmlExercise = req.body.id;
	req.db.collection('htmlExercises').remove({_id: new req.ObjectID(htmlExercise)}, function(err, result){
		if(err) throw err;
		res.send('The exercise was delated successfully');
		console.log(result);
	});
})

router.post('/removeJSExercise', function(req, res){
	var jsExercise = req.body.id;
	req.db.collection('jsExercises').remove({_id: new req.ObjectID(jsExercise)}, function(err, result){
		if(err) throw err;
		res.send('The exercise was delated successfully');
		console.log(result);
	});
})

router.post('/saveEditedTest', function(req, res){
	var test = req.body.test;
	console.log(req.body.test);

	req.db.collection('tests').
		update({_id: new req.ObjectID(test._id)}, test, function(err, result) {
	    if(err) throw err;
	    res.send('The test was updated');
	});
})

router.post('/saveEditedRole', function(req, res){
	var user = req.body.user;
	console.log(req.body.user);

	req.db.collection('users').
		update({_id: new req.ObjectID(user._id)}, {$set:{role: user.role}}, function(err, result) {
	    if(err) throw err;
	    res.send('The role of the user was updated');
	    console.log(user);
	});
})

module.exports = router;