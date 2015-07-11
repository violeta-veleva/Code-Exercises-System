testsystem.controller('importCtrl', function($scope, notify, ImportService){
	$scope.importData = {};

	$scope.save = function() {
		//console.log($scope.importData);
		ImportService.importExcel($scope.importData).then(
			function(result){
				notify(result.data)
			},
			function(error){
				notify("The file was not imported! " + error.data[0]);
			}
		)
	}

});