testsystem.factory('ManageCoursesService', function($http){
	return {
		saveCourse : function(course){
			return $http({
				url: '/users/saveCourse',
				method: 'POST',
				data: course
			})
		},
		findAllCourses : function() {
			return $http.get('/users/allCourses');
		},
		findCoursesByDegree : function(degree) {
			return $http.get('/users/findCoursesByDegree/'+degree);
		}
	}
})