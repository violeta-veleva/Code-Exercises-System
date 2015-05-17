testsystem.controller('jsExerciseController', function($scope, $routeParams, $timeout, JSExerciseService){
	JSExerciseService.findJSExerciseByName($routeParams.name).success(function(data){
		$scope.exercise = data;

		$scope.currentExercise = 0;
		$scope.exerciseLen = $scope.exercise.exercises.length;
		
		$scope.progressbar = function(){
			$scope.progressBarWidth = parseInt(($scope.currentExercise / $scope.exerciseLen) * 100);
			$('.progress-bar').css('width', $scope.progressBarWidth + '%')
		}
		$scope.progressbar();

		$scope.showMsgCorrect = false;
		$scope.showMsgInCorrect = false;


		$timeout(function(){
			$scope.checkIfCurrentExerciseIsCorrect = function(){
				$scope.exercise.exercises[$scope.currentExercise].js = JSEditor.getSession().getValue();
				$scope.isCorrect = false;
				var returnedValue = eval('(' + $scope.exercise.exercises[$scope.currentExercise].checkFunction + ')')
				if(returnedValue){
					$scope.isCorrect = true;
					$scope.showMsgCorrect = true;
					$scope.showMsgInCorrect = false;
					//save the progress
					$scope.exercise.currentExercise = $scope.currentExercise;

					if($scope.currentExercise < $scope.exerciseLen){
						$scope.currentExercise ++;
						if($scope.currentExercise < $scope.exerciseLen - 1){
							JSEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].js);
						}
						$scope.progressbar();
					}
					else if($scope.currentExercise === $scope.exerciseLen - 1){
						$scope.progressbar();
					}
				}
				else{
					$scope.showMsgInCorrect = true;
					$scope.showMsgCorrect = false;
				}
				
				return $scope.isCorrect;
			}
			//js editor declaration
	        var JSEditor = JSExerciseService.declareJSEditor();		
		})
		//attach run script function
		$('#btn-run').on('click', function(){
			JSExerciseService.runScript()
		})
	})
})