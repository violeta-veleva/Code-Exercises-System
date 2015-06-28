testsystem.controller('manageCoursesCtrl', function($scope, ManageCoursesService, notify, $modal){
	
	$scope.newCourses = [];
	$scope.bachelorCount = 4;
	$scope.masterCount = 2;

	$scope.showNewCourseForm = false;
	$scope.showForm = function(){
		if($scope.showNewCourseForm === false){
			$scope.showNewCourseForm = true;
		}
	}
	$scope.showResults = false;
	$scope.continueToResults = function(){
		$scope.showResults = true;
		$scope.crateCourses();
	}

	$scope.crateCourses = function(){
		if($scope.courseName){
			if($scope.courseDegree === "Bachelor"){
				for(var i = 0; i < $scope.bachelorCount; i++){
					$scope.newCourses.push({name: i + 1 + " year " + $scope.courseName, degree: "Bachelor"});
				}
			}
			else if($scope.courseDegree === "Master"){
				for(var i = 0; i < $scope.masterCount; i++){
					$scope.newCourses.push({name: i + 1 + " year " + $scope.courseName, degree: "Master"});
				}
			}
		}
	}

	$scope.saveCourses = function(){
		var coursesCount = $scope.newCourses.length;
		for(var i = 0; i < coursesCount; i++){
			console.log($scope.newCourses[i]);
			
			var notificationCount = 0;
			ManageCoursesService.saveCourse($scope.newCourses[i]).success(function(data){
				if(notificationCount === 0){
					notify(data);
					notificationCount += 1;
				}
				$scope.showNewCourseForm = false;
				$scope.newCourses = [];
				$scope.courseDegree = "";
				$scope.courseName = "";

				// update courses list
				ManageCoursesService.findCoursesByDegree("Bachelor").success(function(data){
					$scope.bachelorCourses = data;
				});
				ManageCoursesService.findCoursesByDegree("Master").success(function(data){
					$scope.masterCourses = data;
				});
			})	
		}
	}

	ManageCoursesService.findCoursesByDegree("Bachelor").success(function(data){
		$scope.bachelorCourses = data;
	});
	ManageCoursesService.findCoursesByDegree("Master").success(function(data){
		$scope.masterCourses = data;
	});

	$scope.confirmRemovingCourse = function(course, index){
			$scope.removeCourse = function() {
				ManageCoursesService.removeCourse(course._id).success(function(data){
					if(course.degree === "Bachelor"){
						$scope.bachelorCourses.splice(index, 1);
					}
					else if (course.degree === "Master"){
						$scope.masterCourses.splice(index, 1);
					}
					notify(data);
				});
			}
			var modalInstance = $modal.open({
				templateUrl: '/users/confirmRemovingCourse',
				scope : $scope,
				controller : 'modalInstanceCtrl'
			});
	};

	$scope.editable = {};

	$scope.showEditForm = function(id){
		$scope.editable[id] = true;
	}
	$scope.hideEditForm = function(id){
		$scope.editable[id] = false;
	}
	$scope.editCourse = function(course){
		ManageCoursesService.editCourse(course).success(function(data){
			$scope.hideEditForm(course._id);
			notify(data);
		});
		ManageCoursesService.findCoursesByDegree("Bachelor").success(function(data){
		$scope.bachelorCourses = data;
		});
		ManageCoursesService.findCoursesByDegree("Master").success(function(data){
			$scope.masterCourses = data;
		});
	}
	
});