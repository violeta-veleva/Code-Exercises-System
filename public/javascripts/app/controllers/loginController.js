testsystem.controller('loginController', function($scope, LoginService, notify){
	$scope.userData = {};

	$scope.login = function() {
		LoginService.login($scope.userData)
		.then(
			function(result){
				notify(result.data);

				window.location.reload();
				window.location.href = '/#/';
			},
			function(error){
				notify(error.data);
			}
		)
	};
});