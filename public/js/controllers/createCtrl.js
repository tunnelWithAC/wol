app.controller('mainController', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
    $scope.formData = {};
    $scope.workoutData = {};
    $scope.exercises = [{'exerciseID':0, "sets":[{"setID":0}]}];
    $scope.workoutData.exercises = $scope.exercises;
    $scope.loading = true;

    $scope.saveVideo = function(name, url){
      if(url.includes('drive.google')){
        url = url.replace('open?id=', 'file/d/');
        console.log('replacing tex');
        url += '/preview';
      }
      $scope.workoutData.videos.push({'name': name, 'url': url});
    };

    $scope.showAccessory = function(){
      $scope.accessoryVisible = true;
    };

    $scope.clearForm = function(){
        $scope.workoutData = {};
        $scope.exercises = [{'exerciseID':0, "sets":[{"setID":0}]}];
        $scope.sets = [];
        $scope.workoutData.exercises = $scope.exercises;
        $scope.videos = [];
    };

    $scope.addNewExercise = function(){
        if($scope.exercises.length < 5){
            var newID = $scope.exercises.length;
            $scope.exercises.push({'exerciseID':newID, 'sets':[{"setID":0}] });
        }
    };

    $scope.calculateTotalVolume = function(){
       var totalV = 0;
       // loop through each exercise
       for(i=0;i<$scope.exercises.length;i++) {
            console.log("Calculating volume for set: " + (i + 1));
            var exerciseVolume = 0;
            var currentSetArray = $scope.exercises[i].sets;

            // loop throught each set in an exercise
            for(j=0;j<currentSetArray.length;j++) {
                var currentSet = currentSetArray[j];
                exerciseVolume += (currentSet.weight * currentSet.reps * currentSet.sets);
                totalV += (currentSet.weight * currentSet.reps * currentSet.sets);
            }
            $scope.exercises[i].exerciseVolume = exerciseVolume;
            console.log("Set volume: " + exerciseVolume);
        }
        $scope.workoutData.totalVolume = totalV;
    };

    $scope.addNewSet = function(excID) {
        if($scope.exercises[excID].sets.length < 5 ){
            var newItemNo = $scope.exercises[excID].sets.length;
            $scope.exercises[excID].sets.push({'setID':newItemNo});
        }
    };

    $scope.removeSet = function(excID, setID) {
        if($scope.exercises[excID].sets.length > 1){
            $scope.exercises[excID].sets.pop();
        }
    };

    $scope.createWorkout = function() {
        $scope.calculateTotalVolume();
        if ($scope.workoutData.name != undefined) {
            $scope.loading = true;
            Workouts.create($scope.workoutData)
                .then(function(response) {
                    $scope.loading = false;
                    $scope.formData = {};
                    $scope.workouts = response.data;
                });
        }
    };

    Workouts.get()
        .then(function(response) {
            $scope.workouts = response.data;
            $scope.loading = false;
    });


    $scope.deleteWorkout = function(id) {
        $scope.loading = true;
        Workouts.delete(id)
        // if successful creation, call our get function to get all the new todos
            .success(function(data) {
                $scope.loading = false;
                $scope.workouts = response.data;
            });
    };
}]);
