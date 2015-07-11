testsystem.controller('fillTestController', function ($scope, $routeParams, TestService, notify) {
	TestService.findTestByName($routeParams.name).success(function(data){
		$scope.test = data;
		console.log(data);
		$scope.test.points = 0;
		$scope.total = $scope.test.questions.length;

		$scope.sumPoints = function(){
			for(var i = 0; i < $scope.test.questions.length; i++){
				if($scope.test.questions[i].choosen === 
					$scope.test.questions[i].rightAnswer){
					$scope.test.points ++;
				}
			}
		};

		$scope.submitExercise = function(test) {
			$scope.sumPoints();
			console.log(test);
			TestService.submitExercise(test).success(function(data){
				notify(data);
				$scope.testSubmited = true;
		});
	};
	});
	$scope.testFinished = false;
	$scope.testSubmited = false; 
	$scope.continueToSubmiting = function(){
		$scope.testFinished = true;
	};
	$scope.backToTest = function(){
		$scope.testFinished = false;
	};	
})