testsystem.factory('LoginService',function($http){
	return {
		login : function(userData){
			return $http({
				url : '/login',
				method : 'POST',
				data : userData
			})
		},
		findAllUsers : function() {
			return $http.get('/users/allUsers');
		},
		editRole : function(user){
			return $http({
				url : "/users/saveEditedRole",
				method : "POST",
				data : {
					user : user
				}
			})
		},
	}
})