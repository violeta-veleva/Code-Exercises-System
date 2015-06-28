testsystem.controller('importCtrl', function($scope, notify, ImportService){
	$scope.importData = {};

	$scope.save = function() {
		console.log($scope.importData);
		ImportService.importExcel($scope.importData).success(function(data){
			console.log(data)
		})
	}
});