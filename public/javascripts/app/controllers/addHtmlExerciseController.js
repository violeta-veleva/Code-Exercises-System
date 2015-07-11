testsystem.controller('addHtmlExerciseController', function($scope, HTMLExerciseService, ExerciseService, ManageCoursesService, $timeout, notify){
	function init(){
		$scope.exercise = {
			name : "",
			exercises : [
				ExerciseService.createNewExercise()
			]
		}
	}
	init();

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

	        $scope.saveHTMLExercise = function(){
	         	$scope.updateHTMLAndCSSInJSON();
	         	console.log($scope.exercise);
				HTMLExerciseService.saveHTMLExercise($scope.exercise).success(function(data){
					notify(data);
					init();
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
				$scope.updateEditors();
			}

			$scope.nextExercise = function(){
				$scope.currentExercise += 1;
				$scope.updateEditors();
			}
	});
	$scope.findCoursesByDegree = function(degree){
		ManageCoursesService.findCoursesByDegree(degree).success(function(data){
			$scope.courses = data;
		});
	}
})