testsystem.controller('appController', function($scope, AppService, $timeout, HTMLExerciseService){
	AppService.getUserDetails().success(function(data){
		$scope.isLoggedIn = data.loggedIn;
		$scope.role = data.role;
		$scope.username = data.username;
		$scope.editor = ($scope.role == 'admin' || $scope.role == 'teacher');
	});

	HTMLExerciseService.findUsersHTMLExercises().success(function(data){
		console.log("APP DATA" + data);
		
		for(var i = 0; i<data.length; i++){
			console.log(data[i].htmlExercise.name);
		}
	});

	$(document).ready(function(){
		$('.sidebar-menu li').click(function(){
			$('.sidebar-menu li').removeClass('active');
			$(this).addClass('active');
		})
	});
});