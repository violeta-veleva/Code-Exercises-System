testsystem.controller('fillTestController', function ($scope, $routeParams, TestService, notify) {
	TestService.findTestByName($routeParams.name).success(function(data){
		$scope.test = data;
		console.log($scope.test)
	});
	$scope.testFinished = false;
	$scope.continueToSubmiting = function(){
		$scope.testFinished = true;
	}
	$scope.backToTest = function(){
		$scope.testFinished = false;
	}
	$scope.submitExercise = function(test) {
		console.log(test);
		TestService.submitExercise(test).success(function(data){
			notify(data);
		});
	};	
})