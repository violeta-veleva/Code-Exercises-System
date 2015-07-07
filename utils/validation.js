module.exports.validate = function(model, object){
	var testModel = require('../models/' + model + '.js');
	var attributes = testModel.attributes;
	var missing = [];

	for(var key in attributes) {
		console.log(key);
		var type = attributes[key].type;
		var required = attributes[key].required;
		var model = attributes[key].model;
		var collection = attributes[key].collection;
		var unique = attributes[key].unique;
		
		if(required){
			if(!object[key]) {
				console.log('Missing attribute : ' + key);
				missing.push('Missing attribute : ' + key);
				return {valid : false, missing : missing };
			}

			if(typeof(object[key]) !== type){
				console.log('Invalid type required is ' + type + ' but found ' + typeof(object[key]) + '. Field :' + key);
				missing.push('Invalid type required is ' + type + ' but found ' + typeof(object[key]) + '. Field :' + key);
				return {valid : false, missing : missing};
			}

			if(model){
				var object = object[model];
				var isValid = module.exports.validate(model, object);
				var isValidModel = isValid.valid;
				if(!isValidModel){
					missing.push.apply(missing, isValid.missing);
					return {valid : false, missing : missing};
				}
			}

			if(collection) {
				var array = object[key];

				for(var i = 0; i < array.length; i++){
					var isValid = module.exports.validate(collection,array[i]).valid;

					if(!isValid){
						missing.push.apply(missing, isValid.missing);
						return {valid : false , missing : missing };
					}
				}
			}

		}
		

	}

	
	return {valid : true } ;
}

// module.exports.isValidHTMLExercise = function(){}

// module.exports.isValidJSExercise = function(){}

// module.exports.isValidUser = function() {}

// module.exports.isValidCourse = function(){}
