testsystem.controller('htmlExerciseController', function($scope, $routeParams, HTMLExerciseService, $timeout, notify){
	HTMLExerciseService.findHTMLExerciseByName($routeParams.name).success(function(data){
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
			$scope.progressBarWidth = parseInt(($scope.currentExercise / $scope.exerciseLen) * 100);	
			$('.progress-bar').css('width', $scope.progressBarWidth + '%')
		}
		$scope.progressbar();

		$scope.showMsgCorrect = false;
		$scope.showMsgInCorrect = false;

		$scope.updatePage = function(){
			 HTMLExerciseService.updatePage();
		}
	
		$timeout(function(){

	        $scope.updatePage();

		    $scope.submitExercise = function(htmlExercise) {
				// get editors values
				$scope.exercise.exercises[$scope.currentExercise].html = htmlEditor.getSession().getValue();
				$scope.exercise.exercises[$scope.currentExercise].css = cssEditor.getSession().getValue();

				HTMLExerciseService.submitExercise(htmlExercise).success(function(data){
					notify(data);
				});
			};

	        $scope.checkIfCurrentExerciseIsCorrect = function(){
	        	$scope.exercise.exercises[$scope.currentExercise].html = htmlEditor.getSession().getValue();
				$scope.exercise.exercises[$scope.currentExercise].css = cssEditor.getSession().getValue();

				$scope.isCorrect = false;
				var returnedValue = eval('(' + $scope.exercise.exercises[$scope.currentExercise].checkFunction + ')')			
				if(returnedValue){
					$scope.isCorrect = true;
					$scope.showMsgCorrect = true;
					$scope.showMsgInCorrect = false;
					//save the progress
					$scope.exercise.currentExercise = $scope.currentExercise;
					$scope.exercise.progess = $scope.progressBarWidth;

					if($scope.currentExercise < $scope.exerciseLen){
						
						if($scope.currentExercise < $scope.exerciseLen - 1){
							$scope.currentExercise ++;
							htmlEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].html);
							cssEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].css); 
						}
						$scope.progressbar();
					}
				}
				else{
					$scope.showMsgInCorrect = true;
					$scope.showMsgCorrect = false;
				}
				return $scope.isCorrect;
			}

	        //html editor
	        var htmlEditor = HTMLExerciseService.declareHTMLEditor();

			htmlEditor.getSession().on('change', function(){
		        // Get the value from the editor and place it into the texrarea.
		        var text = htmlEditor.getSession().getValue();
		        $('#html-content').val(text);
		        $scope.updatePage();
	        });

	        //css editor
	        var cssEditor = HTMLExerciseService.declareCSSEditor();

			cssEditor.getSession().on('change', function(){
		        // Get the value from the editor and place it into the texrarea.
		        var text = cssEditor.getSession().getValue();
		        $('#css-content').val(text);
		        $scope.updatePage();

	        });
	    });
	});	
	
})