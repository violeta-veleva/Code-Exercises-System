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
			return $http.get('/allCourses');
		},
		findCoursesByDegree : function(degree) {
			return $http.get('/findCoursesByDegree/'+degree);
		},
		removeCourse : function(id){
			return $http({
				url : "/users/removeCourse",
				method : "POST",
				data : {
					id : id
				}
			})
		},
		editCourse : function(course){
			return $http({
				url : "/users/saveEditedCourse",
				method : "POST",
				data : {
					course : course
				}
			})
		}
	}
})