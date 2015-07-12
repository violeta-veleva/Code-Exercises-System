testsystem.factory('ExercisesForCourseService',function($http){
	return{
		findHTMLExercisesByCourseName : function(course) {
			return $http.get('/findHTMLExercisesByCourseName/'+ course);
		},
		findJSExercisesByCourseName : function(course) {
			return $http.get('/findJSExercisesByCourseName/'+ course);
		},
		findTestsByCourseName : function(course) {
			return $http.get('/findTestsByCourseName/'+ course);
		}
	}
})