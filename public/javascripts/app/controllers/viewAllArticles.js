testsystem.controller('viewAllArticles', function($scope, TestService, $modal, notify){
	TestService.findAllTest().success(function(data){
		$scope.tests = data;
	});
	$scope.confirmRemovingTest = function(test, index){
		$scope.removeTest = function() {
			TestService.removeTest(test._id).success(function(data){
				$scope.tests.splice(index, 1);
				$scope.testsCount = $scope.tests.length;
				notify(data);
			});
		}
		var modalInstance = $modal.open({
			templateUrl: '/users/confirmRemovingTest',
			scope : $scope,
			controller : 'modalInstanceCtrl'
		});
	};
});