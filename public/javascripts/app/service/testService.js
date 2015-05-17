testsystem.factory('TestService',function($http){

	return {
			saveTest : function(test) {
			return $http({
						url : "/users/saveTest",
						method : "POST",
						data : test
					});
			},
			findAllTest : function() {
				return $http.get('/alltests');
			},
			findTestByName : function(name){
				return $http.get('/test/' + name);
			},
			removeTest : function(id){
				return $http({
					url : "/users/removeTest",
					method : "POST",
					data : {
						id : id
					}
				})
			},
			editTest : function(test){
				return $http({
					url : "/users/saveEditedTest",
					method : "POST",
					data : {
						test : test
					}
				})
			},
			createNewQuestion : function(){
				var newQuestion = {
					name : "",
					answers : [],
					choosen : ''
				}
				newQuestion.answers.push(this.createNewAnswer());

				return newQuestion;
			},
			createNewAnswer : function(){
				return	{
					name : ""
				}
			},
			createEditor : function(){
        		CKEDITOR.replace('editor1');
        	}
    	
		}
});