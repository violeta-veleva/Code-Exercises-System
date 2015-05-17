testsystem.controller('modalInstanceCtrl', function($scope, $modalInstance){
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	}
});	