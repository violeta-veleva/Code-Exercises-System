testsystem.controller('editHtmlExerciseCtrl', function($scope, HTMLExerciseService, ExerciseService, $timeout, notify, $routeParams){
	HTMLExerciseService.findHTMLExerciseByName($routeParams.name, true).success(function(data){
		console.log(data);
		$scope.exercise = data;
		$scope.currentExercise = 0;

		$scope.exerciseCount = $scope.exercise.exercises.length;

		$scope.updatePage = function(){
			 HTMLExerciseService.updatePage();
		}


		$timeout(function(){
			$scope.updatePage();
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

				$scope.addNewExercise = function(){
					$scope.updateHTMLAndCSSInJSON();

					$scope.exercise.exercises.push(ExerciseService.createNewExercise());
					$scope.currentExercise ++;
					$scope.exerciseCount ++;

					$scope.updateEditors();
				}

		         $scope.editHTMLExercise = function(){
		         	$scope.updateHTMLAndCSSInJSON();
		         	console.log($scope.exercise);
					HTMLExerciseService.editHTMLExercise($scope.exercise).success(function(data){
						notify(data);
					})
				}

				$scope.updateEditors = function(){
					// update the editors content
					htmlEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].html);
					cssEditor.getSession().setValue($scope.exercise.exercises[$scope.currentExercise].css); 
				}

				$scope.updateHTMLAndCSSInJSON = function(){
					$scope.exercise.exercises[$scope.currentExercise].html = htmlEditor.getSession().getValue();
					$scope.exercise.exercises[$scope.currentExercise].css = cssEditor.getSession().getValue();
				}

				$scope.prevExercise = function(){
					$scope.currentExercise -= 1;
					console.log($scope.exercise);
					$scope.updateEditors();
					console.log($scope.exercise);
				}

				$scope.nextExercise = function(){
					$scope.currentExercise += 1;
					$scope.updateEditors();
				}
		})

			
	});
})