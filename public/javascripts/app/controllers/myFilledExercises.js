testsystem.controller('myFilledExercises', function($scope, HTMLExerciseService, JSExerciseService, TestService){
	HTMLExerciseService.findUsersHTMLExercises().success(function(data){
		$scope.filledHTMLExercises = data;
		//for(var i = 0; i<data.length; i++){
			//console.log(data[i].htmlExercise.name);
		//}
		$scope.showHTMLSection = false;
		if($scope.filledHTMLExercises.length > 0){
			$scope.showHTMLSection = true;
		}
	});
	JSExerciseService.findUsersJSExercises().success(function(data){
		$scope.filledJSExercises = data;

		$scope.showJSSection = false;
		if($scope.filledJSExercises.length > 0){
			$scope.showJSSection = true;
		}
	});
	TestService.findUsersTests().success(function(data){
		$scope.filledTests = data;

		$scope.showTestsSection = false;
		if($scope.filledTests.length > 0){
			$scope.showTestsSection = true;
		}
		for(var i = 0; i<data.length; i++){
			console.log(data[i].test.name);
		}
	});

})