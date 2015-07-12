var testsystem = angular.module('testsystem',['ngRoute', 'cgNotify', 'ui.bootstrap']);
testsystem.config(function($routeProvider) {
	$routeProvider
   .when('/',{
   	templateUrl : "/home",
      controller : "homeController"
   }).when('/login',{
      templateUrl : "/login",
      //controller : "registerController"
   }).when('/register',{
      templateUrl : "/register",
      controller : "registerController"
   }).when('/viewAllArticles',{
      templateUrl : "/viewAllArticles",
      controller : "viewAllArticles"
   }).when('/viewAllUsers',{
      templateUrl : "/users/viewAllUsers",
      controller : "viewAllUsers"
   }).when('/manageCourses',{
      templateUrl : "/users/manageCourses",
      controller : "manageCoursesCtrl"
   }).when('/import',{
      templateUrl : "/users/import",
      controller : "importCtrl"
   }).when('/myExercises',{
      templateUrl : "/loggedUsers/filledExercises",
      controller : "myFilledExercises"
   }).when('/exercisesForCourse',{
      templateUrl : "/exercisesForCourse",
      controller : "exercisesForCourseCtrl"
   }).when('/test/:name',{
   	templateUrl : function(params){
         return '/test?name=' + params.name + "&R=" + Math.random();
      },
      controller : "fillTestController"
   }).when('/htmlExercise/:name',{
      templateUrl : function(params){
         return '/htmlExercise?name=' + params.name + "&R=" + Math.random();
      },
      controller : "htmlExerciseController"
   }).when('/jsExercise/:name',{
      templateUrl : function(params){
         return '/jsExercise?name=' + params.name + "&R=" + Math.random();
      },
      controller : "jsExerciseController"
   }).when('/newtest', {
   		templateUrl : "/users/newtest",
   		controller : "newTestController"
   }).when('/edittest/:name', {
         templateUrl : "/users/editTest",
         controller : "editTestController"
   }).when('/viewAllHTMLExercises',{
      templateUrl : '/viewAllHTMLExercises',
      controller : 'viewAllHTMLExercisesCtrl'
   }).when('/viewAllJSExercises',{
      templateUrl : '/viewAllJSExercises',
      controller : 'viewAllJSExercisesCtrl'
   }).when('/addHtmlExercise',{
      templateUrl : '/users/addHtmlExercise',
      controller : 'addHtmlExerciseController'
   }).when('/editHtmlExercise/:name',{
      templateUrl : '/users/editHtmlExercise',
      controller : 'editHtmlExerciseCtrl'
   }).when('/editJSExercise/:name',{
      templateUrl : '/users/editJSExercise',
      controller : 'editJSExerciseCtrl'
   }).when('/addJSExercise',{
      templateUrl : '/users/addJSExercise',
      controller : 'addJSExerciseController'
   }).when('/jsExercise',{
      templateUrl : '/jsExercise',
      controller : 'jsExerciseController'
   }).otherwise({
   	redirectTo : "/404"
   })
});

testsystem.directive("excel", function(){
   return {
      scope : {
         excel : "="
      },
      link : function(scope, element, attributes){
         element.bind("change", function(changeEvent){
            var reader = new FileReader();
            var file = changeEvent.target.files[0];

            reader.onload = function(loadEvent){
               scope.$apply(function(){
                  scope.excel = loadEvent.target.result;
               });
            }

            reader.readAsArrayBuffer(file);

         });
      }
   }
});