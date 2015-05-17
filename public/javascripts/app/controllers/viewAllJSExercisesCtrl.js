testsystem.controller('viewAllJSExercisesCtrl', function($scope, JSExerciseService){
	JSExerciseService.findAllJSExercises().success(function(data){
		$scope.jsExercises = data;
	})
})