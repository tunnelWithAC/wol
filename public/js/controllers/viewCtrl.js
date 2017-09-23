app.controller('viewController', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
        //var searchObject = $location.search();
        console.log("Controller loaded");
        //console.log(searchObject);
	//$scope.currentWorkout = null;



	/*Workouts.create($scope.workoutData)
                .then(function(response) {
                    $scope.loading = false;
                    $scope.formData = {};
                    $scope.workouts = response.data;
                });*/

    $scope.volume = [];
    $scope.currentVideo = "";

    var id1, id2;
    id1 = "5981933790c52c4c0826d6ab"; //old
    id2 = "59847b01599881719f0ce0de"; //new

    console.log(id1 < id2);

    Workouts.get().then(function(response) {
    	$scope.count = response.data.length;
    	$scope.mostRecent = response.data[response.data.length -1];
    	$scope.currentWorkout = response.data[response.data.length -1];
    });

    $scope.loadNames = function(){
        console.log("method called f");
        console.log($scope.workouts.length);
        angular.forEach($scope.workouts, function(value, key) {
                 console.log(key + ': ' + value);
        });
    };

    $scope.aggregateVolume = function(){
        for(var i = $scope.workouts.length-1;  i>0; i--){
            for(var j = $scope.workouts[i].exercises.length-1;  j>0; j--){
                console.log($scope.workouts[i].exercises[j].exerciseVolume);
            }
        }
    };

    $scope.graphVolume = function(exerciseName){
      var count = 0;

      for(var i=0; i<$scope.workouts.length;i++){
        console.log($scope.workouts[i].exercises.exercise1);
          if($scope.workouts[i].exercises.exercise1.name == exerciseName){
            count++;
            $scope.volume.push($scope.workouts[i].exercises.exercise1.exerciseVolume);
            //push exercise volume
          }
          if($scope.workouts[i].exercises.exercise2.name == exerciseName){
            count++;
            $scope.volume.push($scope.workouts[i].exercises.exercise2.exerciseVolume);
          }
          if( $scope.workouts[i].exercises.exercise3.name == exerciseName){
            count++;
            $scope.volume.push($scope.workouts[i].exercises.exercise3.exerciseVolume);
          }
      }
      console.log(count);

      console.log($scope.volume);
    };

    $scope.deleteWorkout = function(id){
      Workouts.delete(id)
          .then(function(response) {
              console.log(response.data);
              $scope.workouts = response.data;
              $scope.currentWorkout = response.data[response.data.length -1];
          });
    };

    $scope.selectWorkout = function(workout){
        console.log(workout);
        $scope.currentWorkout = workout;
        /*$scope.loadNames();
        console.log($scope.workouts.length);
        for(var i = $scope.workouts.length-1;  i>0; i--){
        	if($scope.workouts[i]._id == index){
        		console.log("Match found at " + i);
        		$scope.currentWorkout = $scope.workouts[i];
        	}
        }*/
    };

}]);
