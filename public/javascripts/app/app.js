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
   }).when('/myExercises',{
      templateUrl : "/users/filledExercises",
      controller : "myFilledExercises"
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