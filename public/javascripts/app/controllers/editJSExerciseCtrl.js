testsystem.controller('editJSExerciseCtrl', function($scope, JSExerciseService, ExerciseService, $timeout, notify, $routeParams){
	JSExerciseService.findJSExerciseByName($routeParams.name).success(function(data){
		$scope.exercise = data;
		$scope.currentExercise = 0;

		$scope.exerciseCount = $scope.exercise.exercises.length;

			$timeout(function(){
				var JSEditor = JSExerciseService.declareJSEditor();

				$scope.addNewExercise = function(){
					$scope.updateJSInJSON();

					$scope.exercise.exercises.push(ExerciseService.createNewExercise());
					$scope.currentExercise ++;
					$scope.exerciseCount ++;

					$scope.updateEditor();
				}

				$scope.editJSExercise = function(){
		         	$scope.updateJSInJSON();
		         	console.log($scope.exercise);

					JSExerciseService.editJSExercise($scope.exercise).success(function(data){
						notify(data);
					})
				}

				$scope.updateJSInJSON = function(){
					$scope.exercise.exercises[$scope.currentExercise].js = JSEditor.getSession().getValue();
				}

				$scope.updateEditor = function(){
					// update the editor
					JSEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].js);
				}

				$scope.prevExercise = function(){
					$scope.currentExercise -= 1;
					$scope.updateEditor();
				}

				$scope.nextExercise = function(){
					$scope.currentExercise += 1;
					$scope.updateEditor();
				}
			})
			

			//attach run script function
			$('#btn-run').on('click', function(){
				JSExerciseService.runScript()
			})

	});
})