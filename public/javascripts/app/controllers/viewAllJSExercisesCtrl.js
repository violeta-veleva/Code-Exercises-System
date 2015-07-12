testsystem.controller('viewAllJSExercisesCtrl', function($scope, JSExerciseService, $modal, notify){
	JSExerciseService.findAllJSExercises().success(function(data){
		$scope.jsExercises = data;
	});
	$scope.confirmRemovingJSExercise = function(exercise, index){
		$scope.removeExercise = function() {
			JSExerciseService.removeJSExercise(exercise._id).success(function(data){
				$scope.jsExercises.splice(index, 1);
				$scope.jsExercisesCount = $scope.jsExercises.length;
				notify(data);
			});
		}
		var modalInstance = $modal.open({
			templateUrl: '/users/confirmRemovingJSExercise',
			scope : $scope,
			controller : 'modalInstanceCtrl'
		});
	};
})