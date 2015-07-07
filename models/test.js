module.exports = {
	attributes : {
		name : {
			type : 'string',
			required : true
		},
		suitable : {
			type : 'string',
			required : true
		},
		article : {
			type : 'string',
			required : true
		},
		questions : {
			type : 'object',
			collection : 'question',
			required : true
		}
	}
}