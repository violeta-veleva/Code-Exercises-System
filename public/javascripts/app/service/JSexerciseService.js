testsystem.factory('JSExerciseService',function($http){
	return{
		saveJSExercise : function(jsExercise){
			return $http({
				url: '/users/saveJSExercise',
				method: 'POST',
				data: jsExercise 
			})
		},
		findAllJSExercises : function(){
			return $http.get('/allJSExercises')
		},
		findUsersJSExercises : function(){
			return $http.get('/loggedUsers/getUsersJSExercises');
		},
		findJSExerciseByName : function(name){
			return $http.get('/jsExercise/' + name);
		},
		removeJSExercise : function(id){
			return $http({
				url : "/users/removeJSExercise",
				method : "POST",
				data : {
					id : id
				}
			})
		},
		editJSExercise : function(jsExercise){
			return $http({
				url : "/users/saveEditedJSExercise",
				method : "POST",
				data : {
					jsExercise : jsExercise
				}
			})
		},
		submitExercise : function(jsExercise){
			return $http({
				url : "/loggedUsers/submitJSExercise",
				method : "POST",
				data: {
					jsExercise : jsExercise
				}
			})
		},
		declareJSEditor : function(){
			var jsEditor = ace.edit("jsEditor");
			jsEditor.getSession().setMode("ace/mode/javascript");
			jsEditor.setTheme("ace/theme/dawn");
			jsEditor.getSession().setUseWrapMode(true);
			jsEditor.getSession().on('change', function(){
		        // Get the value from the editor and place it into the texrarea.
		        var text = jsEditor.getSession().getValue();
		        $('#js-content').val(text);
	        });
	        return jsEditor;
		},
		runScript : function() {
			var el = document.getElementById('js-content');
			var scriptText = el.value;
			var oldScript = document.getElementById('scriptContainer');
			var newScript;

			if (oldScript) {
			  oldScript.parentNode.removeChild(oldScript);
			}

			newScript = document.createElement('script');
			newScript.id = 'scriptContainer';
			newScript.text = el.value;
			document.body.appendChild(newScript);

			//enable the console
			console.log = jsConsole.writeLine;
		} 
	}
})