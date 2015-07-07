module.exports = {
	attributes : {
		username : {
			type : 'string',
			unique : true,
			required : true
		},
		password : {
			type : 'string',
			required : true
		},
		role : {
			type : 'string',
			required : true
		},
		degree : {
			type : 'string',
			required : false
		},
		course : {
			type : 'string',
			required : false
		}
	}
}