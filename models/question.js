module.exports = {
	attributes : {
		name : {
			type : 'string',
			required : true
		},
		answers : {
			type : 'object',
			required : true,
			collection : 'answer'
		}
	}
}