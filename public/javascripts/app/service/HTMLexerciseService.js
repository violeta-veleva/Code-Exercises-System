testsystem.factory('HTMLExerciseService',function($http){
	return{
		saveHTMLExercise : function(htmlExercise){
			return $http({
				url: '/users/saveHTMLExercise',
				method: 'POST',
				data: htmlExercise
			})
		},
		findAllHTMLExercises : function(){
			return $http.get('/allHTMLExercises?random=' + Math.random());
		},
		findUsersHTMLExercises : function(){
			return $http.get('/users/getUsersHTMLExercises');
		},
		findHTMLExerciseByName : function(name){
			return $http.get('/htmlExercise/' + name);
		},
		removeHTMLExercise : function(id){
			return $http({
				url : "/users/removeHTMLExercise",
				method : "POST",
				data : {
					id : id
				}
			})
		},
		editHTMLExercise : function(htmlExercise){
			return $http({
				url : "/users/saveEditedHTMLExercise",
				method : "POST",
				data : {
					htmlExercise : htmlExercise
				}
			})
		},
		submitExercise : function(htmlExercise){
			return $http({
				url : "/users/submitHTMLExercise",
				method : "POST",
				data: {
					htmlExercise : htmlExercise
				}
			})
		},
		updatePage : function(){
			$('#user-output').contents().find('body').html($('#html-content').val());
			$('#user-output').contents().find('head').append('<style id="iframe-syle"></style>')
			$('#user-output').contents().find('#iframe-syle').html($('#css-content').val());
		},
		declareHTMLEditor : function(){
			var htmlEditor = ace.edit("htmlEditor");
			htmlEditor.getSession().setMode("ace/mode/html");
			htmlEditor.setTheme("ace/theme/dawn");
			htmlEditor.getSession().setUseWrapMode(true);
			return htmlEditor;
		},
		declareCSSEditor : function(){
			var cssEditor = ace.edit("cssEditor");
			cssEditor.getSession().setMode("ace/mode/css");
			cssEditor.setTheme("ace/theme/dawn");
			cssEditor.getSession().setUseWrapMode(true);
			return cssEditor;
		}
	}
});