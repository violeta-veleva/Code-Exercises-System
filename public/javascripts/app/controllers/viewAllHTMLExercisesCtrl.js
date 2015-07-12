testsystem.controller('viewAllHTMLExercisesCtrl', function($scope, HTMLExerciseService, $modal, notify){
	HTMLExerciseService.findAllHTMLExercises().success(function(data){
		$scope.htmlExercises = data;
	});
	$scope.confirmRemovingHTMLExercise = function(exercise, index){
		$scope.removeExercise = function() {
			HTMLExerciseService.removeHTMLExercise(exercise._id).success(function(data){
				$scope.htmlExercises.splice(index, 1);
				$scope.htmlExercisesCount = $scope.htmlExercises.length;
				notify(data);
			});
		}
		var modalInstance = $modal.open({
			templateUrl: '/users/confirmRemovingHTMLExercise',
			scope : $scope,
			controller : 'modalInstanceCtrl'
		});
	};
})