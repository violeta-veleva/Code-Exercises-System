testsystem.controller('registerController', function($scope, RegisterService, notify){
	$scope.userData = {
		username: '',
		password: '',
		role: 'student'
	}
	$scope.register = function(){
		RegisterService.register($scope.userData)
		.then(
			function(result){
				notify(result.data);
			},
			function(error){
				notify(error.data);
			}
		);
		//console.log($scope.userData)
	}
	$scope.showPasswordMatchError = false;

	$scope.checkPasswords = function(){
		if($scope.userData.password !== $scope.userData.passwordAgain){
			$scope.showPasswordMatchError = true;
		}else{
			$scope.showPasswordMatchError = false;
		}
	}
})