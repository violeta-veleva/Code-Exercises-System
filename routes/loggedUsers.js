var express = require('express');
var router = express.Router();

function loginFilter(req, res, next){
	if(!req.session.loggedIn) {
		res.render('login.ejs');
	} else {
		next();
	}
}

router.get('/*', loginFilter);

router.post('/*', loginFilter);

router.get('/filledExercises', function(req, res){
    res.render('filledExercises.ejs')
});

router.get('/myCourseExercises', function(req, res){
    res.render('myCourseExercises.ejs')
});

router.get('/getUsersHTMLExercises', function(req, res){
	var query = { userId : req.session.loggedIn._id.toString() }
	req.db.collection('filledHTMLExercises').find(query).toArray(
		function(err, result){
			if (result){
				res.send(result);
			}
		})
})

router.get('/getUsersJSExercises', function(req, res){
	var query = { userId : req.session.loggedIn._id.toString() }
	req.db.collection('filledJSExercises').find(query).toArray(
		function(err, result){
			if (result){
				res.send(result);
			}
		})
})

router.get('/getUsersTests', function(req, res){
	var query = { userId : req.session.loggedIn._id.toString() }
	req.db.collection('filledTests').find(query).toArray(
		function(err, result){
			if (result){
				res.send(result);
			}
		})
});

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

router.post('/submitJSExercise', function(req, res){
	var submitData = req.body;
	console.log(submitData);
	
	submitData.userId = req.session.loggedIn._id;
	//console.log('userid1' + typeof submitData.userId);
	var query = { 
		userId : req.session.loggedIn._id.toString(),
		"jsExercise.name" : submitData.jsExercise.name
	}

	req.db.collection('filledJSExercises').findOne(query,
	 function(err, result){
		console.log("result" + result);
		if(result){
			//update
			console.log('existed');
			req.db.collection('filledJSExercises').
			update(query, submitData, function(err, result) {
			    if(err) throw err;
			    res.send('Your exercise was updated');
			})
		}
		else{
			req.db.collection('filledJSExercises').insert(submitData, function(err, result){
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

router.post('/submitTestExercise', function(req, res){
	var submitData = req.body;
	console.log(submitData);
	
	submitData.userId = req.session.loggedIn._id;
	//console.log('userid1' + typeof submitData.userId);
	var query = { 
		userId : req.session.loggedIn._id.toString(),
		"test.name" : submitData.test.name
	}

	req.db.collection('filledTests').findOne(query,
	 function(err, result){
		console.log("result" + result);
		if(result){
			//update
			console.log('existed');
			req.db.collection('filledTests').
			update(query, submitData, function(err, result) {
			    if(err) throw err;
			    res.send('Your test was updated');
			})
		}
		else{
			req.db.collection('filledTests').insert(submitData, function(err, result){
				if(err){
					throw err;
				}
				else{
					console.log("submited" + submitData);
					res.send("Your test was submited.");
				}
			});
		}
	})
	
});

module.exports = router;