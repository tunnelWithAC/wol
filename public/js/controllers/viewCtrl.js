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



    var id1, id2;
    id1 = "5981933790c52c4c0826d6ab"; //old
    id2 = "59847b01599881719f0ce0de"; //new

    console.log(id1 < id2); 

    Workouts.get().then(function(response) {
    	$scope.count = response.data.length;
    	$scope.mostRecent = response.data[response.data.length -1];
    	$scope.currentWorkout = response.data[response.data.length -1];
    	console.log(response.data[0].name);
    	
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
