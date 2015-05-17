testsystem.controller('viewAllArticles', function($scope, TestService){
	TestService.findAllTest().success(function(data){
		$scope.tests = data;
	});
});