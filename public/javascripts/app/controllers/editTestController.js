testsystem.controller('editTestController', function($scope, $routeParams, TestService, notify){
	TestService.findTestByName($routeParams.name).success(function(data){
		$scope.test = data;
		TestService.createEditor();
	});
	$scope.editTest = function(test){
		test.article = CKEDITOR.instances.editor1.getData();
		TestService.editTest(test).success(function(data){
			notify(data);
		})
	}

	$scope.addQuestion = function(){
		$scope.test.questions.push(TestService.createNewQuestion());
	}
	$scope.addAnswer = function(question){
		question.answers.push(TestService.createNewAnswer());
	}

});