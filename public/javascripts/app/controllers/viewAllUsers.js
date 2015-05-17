testsystem.controller('viewAllUsers', function($scope, LoginService, notify){
	LoginService.findAllUsers().success(function(data){
		$scope.users = data;
	});
	$scope.editRole = function(user){
		LoginService.editRole(user).success(function(data){
			notify(data);
		})
	}
});