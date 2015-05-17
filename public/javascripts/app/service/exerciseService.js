testsystem.factory('ExerciseService',function(){
	return{
		prevExercise : function(currentExercise){
			currentExercise -= 1;
		},
		nextExercise : function(currentExercise){
			currentExercise += 1;
		},
		createNewExercise : function(){
			var newExercise = {
			}
			return newExercise;
		},
	}
})