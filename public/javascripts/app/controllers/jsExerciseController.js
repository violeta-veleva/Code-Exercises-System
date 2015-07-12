testsystem.controller('jsExerciseController', function($scope, $routeParams, $timeout, 
	JSExerciseService, notify){
	JSExerciseService.findJSExerciseByName($routeParams.name).success(function(data){
		$scope.exercise = data;

		(function(){
			if($scope.exercise.currentExercise == 'undefined' || $scope.exercise.currentExercise == undefined){
				$scope.currentExercise = 0;
			}
			else{
				$scope.currentExercise = $scope.exercise.currentExercise;
			}
		})();
		
		$scope.exerciseLen = $scope.exercise.exercises.length;
		
		$scope.progressbar = function(){
			$scope.progressBarWidth = parseInt((($scope.currentExercise + 1) / $scope.exerciseLen) * 100);
			$('.progress-bar').css('width', $scope.progressBarWidth + '%')
		}
		$scope.progressbar();

		$scope.showMsgCorrect = false;
		$scope.showMsgInCorrect = false;


		$timeout(function(){
			 $scope.submitExercise = function(jsExercise) {
				// get editor's value
				$scope.exercise.exercises[$scope.currentExercise].js = JSEditor.getSession().getValue();

				JSExerciseService.submitExercise(jsExercise).success(function(data){
					notify(data);
				});
			};

			$scope.checkIfCurrentExerciseIsCorrect = function(){
				$scope.exercise.exercises[$scope.currentExercise].js = JSEditor.getSession().getValue();
				$scope.isCorrect = false;
				
				var returnedValue = 
				eval('((' + $scope.exercise.exercises[$scope.currentExercise].checkFunction + ')())')
				
				if(returnedValue){
					$scope.isCorrect = true;
					$scope.showMsgCorrect = true;
					$scope.showMsgInCorrect = false;
					

					if($scope.currentExercise < $scope.exerciseLen){
						
						if($scope.currentExercise < $scope.exerciseLen - 1){
							$scope.currentExercise ++;
							JSEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].js);
						}
						//save the progress
						$scope.exercise.currentExercise = $scope.currentExercise;
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