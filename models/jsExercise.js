module.exports = {
	attributes : {
		name : {
			type : 'string',
			required : true
		},
		suitable : {
			type : 'string',
			required : 'true'
		},
		exercises : {
			type : 'object',
			collection : 'jsExerciseItem',
			required : true
		}
	}
}