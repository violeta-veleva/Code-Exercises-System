testsystem.controller('homeController', function($scope, TestService, HTMLExerciseService, JSExerciseService, notify, $modal){
	TestService.findAllTest().success(function(data){
		$scope.tests = data;
		$scope.testsCount = $scope.tests.length;
	});

	HTMLExerciseService.findAllHTMLExercises().success(function(data){
		$scope.htmlExercises = data;
		$scope.htmlExercisesCount = $scope.htmlExercises.length;
	});

	JSExerciseService.findAllJSExercises().success(function(data){
		$scope.jsExercises = data;
		$scope.jsExercisesCount = $scope.jsExercises.length;
	});

	$scope.confirmRemovingTest = function(test, index){
			$scope.removeTest = function() {
				TestService.removeTest(test._id).success(function(data){
					$scope.tests.splice(index, 1);
					$scope.testsCount = $scope.tests.length;
					notify(data);
				});
			}
			var modalInstance = $modal.open({
			templateUrl: '/users/confirmRemovingTest',
			scope : $scope,
			controller : 'modalInstanceCtrl'
		});
	};
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
	
});
