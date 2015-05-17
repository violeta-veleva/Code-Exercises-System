testsystem.controller('fillTestController', function ($scope, $routeParams, TestService) {
	TestService.findTestByName($routeParams.name).success(function(data){
		$scope.test = data;
		console.log($scope.test)
	});
	$scope.testFinished = false;
	$scope.submitTest = function(){
		$scope.testFinished = true;
	}
	$scope.backToTest = function(){
		$scope.testFinished = false;
	}
	
})