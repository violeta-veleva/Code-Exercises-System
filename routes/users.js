var express = require('express');
var router = express.Router();
var excelParser = require('excel-parser');

function loginFilter(req, res, next){
	if(!req.session.loggedIn || (req.session.loggedIn.role != 'teacher' && req.session.loggedIn.role != 'admin')) {
		res.render('login.ejs');
	} else {
		next();
	}
}

router.get('/*', loginFilter);

router.post('/*', loginFilter);

router.get('/logout', function(req, res){
	req.session.destroy(function(err){
		res.redirect("/");
	});
})

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

router.get('/filledExercises', function(req, res){
    res.render('filledExercises.ejs')
})

router.get('/confirmRemovingTest', function(req, res){
    res.render('confirmRemovingTest.ejs')
})

router.get('/confirmRemovingHTMLExercise', function(req, res){
    res.render('confirmRemovingHTMLExercise.ejs')
})

router.get('/confirmRemovingJSExercise', function(req, res){
    res.render('confirmRemovingJSExercise.ejs')
})

router.get('/confirmRemovingCourse', function(req, res){
    res.render('confirmRemovingCourse.ejs')
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

router.get('/editHtmlExercise', function(req,res){
	res.render('editHtmlExercise.ejs', {title: 'Edit HTML Exericise'});
});

router.get('/editJSExercise', function(req,res){
	res.render('editJSExercise.ejs', {title: 'Edit JS Exericise'});
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

router.get('/manageCourses', function(req,res){
	res.render("manageCourses.ejs", {title: 'Manage Courses'});
});

router.get('/import', function(req,res){
	res.render("import.ejs", {title: 'Import'});
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

router.post('/saveCourse', function(req,res){
	var newCourse = req.body;
	req.db.collection('courses').insert(newCourse, function(err,result){
		if(err) throw err;
		res.send("Your course was saved successfully");
		console.log(newCourse);
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

router.post('/removeCourse', function(req, res){
	var courseId = req.body.id;
	console.log(req.body.id);
	req.db.collection('courses').remove({_id: new req.ObjectID(courseId)}, function(err, result){
		if(err) throw err;
		res.send('The course was delated successfully');
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
		update({_id: new req.ObjectID(test._id)}, {$set:{name:test.name, suitable:test.suitable, article:test.article, questions:test.questions}}, function(err, result) {
	    if(err) throw err;
	    res.send('The test was updated');
	});
})

router.post('/saveEditedCourse', function(req, res){
	var course = req.body.course;

	req.db.collection('courses').
		update({_id: new req.ObjectID(course._id)}, {$set:{name:course.name, degree:course.degree}}, function(err, result) {
	    if(err) throw err;
	    res.send('The course was updated');
	});
})

router.post('/saveEditedHTMLExercise', function(req, res){
	var htmlExercise = req.body.htmlExercise;
	console.log(htmlExercise);

	req.db.collection('htmlExercises').
		update({_id: new req.ObjectID(htmlExercise._id)}, {$set:{name:htmlExercise.name, suitable:htmlExercise.suitable, exercises:htmlExercise.exercises}}, function(err, result) {
	    if(err) throw err;
	    res.send('The exercise was updated');
	});
})

router.post('/saveEditedJSExercise', function(req, res){
	var jsExercise = req.body.jsExercise;
	console.log(jsExercise);

	req.db.collection('jsExercises').
		update({_id: new req.ObjectID(jsExercise._id)}, {$set:{name:jsExercise.name, suitable:jsExercise.suitable, exercises:jsExercise.exercises}}, function(err, result) {
	    if(err) throw err;
	    res.send('The exercise was updated');
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
});

function convertRows(type, row){
	var object = undefined;
	console.log(type)
	switch(type) {
		case 'tests' : {
			object = {
				name : row[0],
				suitable : row[1],
				article : row[2],
				questionName : row[3],
				answerName : row[4],
				rightAnswer : row[5]
			}
			break;
		}
	}
	return object;
}

router.post('/import', function(req,res){
	console.log(req.body)
	var types = {
		"Article with test" : "tests",
		"HTML Exercise" : "htmlExercises",
		"JS Exercise" : "jsExercises",
		"Users" : "users",
		"Courses" : "courses"
	}

	var models = {
		"Article with test" : "test",
		"HTML Exercise" : "htmlExercise",
		"JS Exercise" : "jsExercise",
		"Users" : "user",
		"Courses" : "course"
	}

	if(!types[req.body.type]){
		return res.status(400).send("");
	}
	
	var model = models[req.body.type];

	var type = types[req.body.type];

	var path = req.files.excel.path;
	var fs = require('fs');
	var data = fs.readFileSync(path, "utf8");
	var parsed = JSON.parse(data);

	parsed.forEach(function(object){
		delete object._id;

	});
	for(var i = 0; i < parsed.length; i++){
		delete parsed[i]._id;
		var result = req.utils.validate(model, parsed[i]);
		var valid = result.valid;
		console.log(result.missing);
		if(!valid) {
			result.missing.forEach(function(msg){
				console.log(msg);
			});
			return res.status(400).send(result.missing)
		}
	}

	req.db.collection(type).insert(parsed, function(err, result){
		if(err) throw err;
		res.send('Data has been imported successfully');
	});
	// excelParser.parse({
	//   inFile: path,
	//   worksheet: 1
	// }, function(err, rows){
	// 	if(err) throw err;
	// 	var colName = 'imported' + type;

	// 	req.db.collection(colName).remove({}, function(err, result){
	// 		console.log('previous imported data removed');
	// 		var convertedRows = [];

	// 		for(var i=0; i<rows.length; i++){
	// 			convertedRows.push(convertRows(type,rows[i]));
	// 		}

	// 		req.db.collection(colName).insert(convertedRows, function(err, result){
	// 			if(err) throw err;
	// 			console.log('inserted');
	// 		});
	// 		res.send('ok')
			
	// 	});
		
	// });
	
});

module.exports = router;