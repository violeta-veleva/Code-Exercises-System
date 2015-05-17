var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/testsystem').connection;
var ObjectID = mongoose.ObjectID;
var Deferred = require('Deferred');

module.exports.findAllTests = function() {
	var deferred = Deferred();
	db.collection('tests').find().toArray(function(err,tests){
		if(err){
			deferred.reject(err);
		}
		deferred.resolve(tests);
	});
	return deferred.promise();
};

module.exports.updateTest = function(test){
	db.collection('tests').update({_id : new ObjectID(test._id)},{$set : test},{},function(err,res){
		console.log(err);
	});
};