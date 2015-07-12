testsystem.controller('exercisesForCourseCtrl', function($scope, ManageCoursesService, ExercisesForCourseService){
	$scope.findCoursesByDegree = function(degree){
		ManageCoursesService.findCoursesByDegree(degree).success(function(data){
			$scope.courses = data;
			console.log($scope.courses);
		});
	}
	$scope.findExercisesByCourseName = function(course){
		ExercisesForCourseService.findHTMLExercisesByCourseName(course).success(function(data){
			$scope.htmlExercises = data;
			$scope.showHTMLSection = false;
			if($scope.htmlExercises.length > 0){
				$scope.showHTMLSection = true;
			}
		});
		ExercisesForCourseService.findJSExercisesByCourseName(course).success(function(data){
			$scope.jsExercises = data;
			$scope.showJSSection = false;
			if($scope.jsExercises.length > 0){
				$scope.showJSSection = true;
			}
		});
		ExercisesForCourseService.findTestsByCourseName(course).success(function(data){
			$scope.tests = data;
			$scope.showTestsSection = false;
			if($scope.tests.length > 0){
				$scope.showTestsSection = true;
			}
		});
	}
	
});