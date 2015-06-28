testsystem.controller('appController', function($scope, AppService, $timeout){
	AppService.getUserDetails().success(function(data){
		$scope.isLoggedIn = data.loggedIn;
		$scope.role = data.role;
		$scope.username = data.username;
		$scope.editor = ($scope.role == 'admin' || $scope.role == 'teacher');
	});

	$(window).load(getCurrentMenuItem);

	$(window).on('hashchange', getCurrentMenuItem);

	function getCurrentMenuItem(){
		$('.sidebar-menu li').click(function(){
			$('.sidebar-menu li').removeClass('active');
			$(this).addClass('active');
		});
	};
			
});