testsystem.factory('AppService',function($http){
	return {
		getUserDetails : function() {
			return $http.get('/userDetails');
		}
	}
})