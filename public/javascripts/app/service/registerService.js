testsystem.factory('RegisterService',function($http){
	return {
		register : function(userData){
			return $http({
				url : '/register',
				method : 'POST',
				data : userData
			})
		},
		findCoursesByDegree : function(degree) {
			return $http.get('/users/findCoursesByDegree/'+degree);
		}
	}
})