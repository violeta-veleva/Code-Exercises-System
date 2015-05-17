testsystem.controller('viewAllHTMLExercisesCtrl', function($scope, HTMLExerciseService){
	HTMLExerciseService.findAllHTMLExercises().success(function(data){
		$scope.htmlExercises = data;
	})
})