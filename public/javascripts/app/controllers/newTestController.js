testsystem.controller('newTestController', function($scope, TestService, notify, $timeout){
	function init(){
		$scope.newTest = {
			name : "",
			article : "",
			questions : [
				TestService.createNewQuestion()
			]
		}
	}
	init();
	
	$scope.currentExercise = 0;
	$scope.questionsCount = $scope.newTest.questions.length;

	$scope.noAnswers = true;
	

	$scope.addNewQuestion = function() {
		if($scope.questionsCount == ($scope.currentExercise + 1) ){
			$scope.newTest.questions.push(TestService.createNewQuestion());
			$scope.currentExercise ++;
			$scope.questionsCount ++;
		}
	};

	$(document).ready(function(){
			$('.question-name-input').focusout(function(){
				//console.log($scope.newTest.questions.length);
			})
	})

	$scope.prevExercise = function(){
		$scope.currentExercise -= 1;
	}

	$scope.nextExercise = function(){
		$scope.currentExercise += 1;
	}

	$scope.addNewAnswer = function() {
		$scope.newTest.questions[$scope.currentExercise].answers.push(TestService.createNewAnswer());
		$scope.checkAnswersLen();
	};

	$scope.removeAnswer = function(answerIndex){
		$scope.newTest.questions[$scope.currentExercise].answers.splice(answerIndex, 1);
		$scope.checkAnswersLen();
	}

	$scope.checkAnswersLen = function(){

		$scope.answersLen = $scope.newTest.questions[$scope.currentExercise].answers.length;

		if($scope.answersLen >= 2 ){
			$scope.noAnswers = false;
		}
		else{
			$scope.noAnswers = true;
		}

	}

	$scope.saveTest = function() {
		$scope.newTest.article = CKEDITOR.instances.editor1.getData();
		TestService.saveTest($scope.newTest).success(function(data){
			notify(data);
			init();
		});
	};


	TestService.createEditor();

});	