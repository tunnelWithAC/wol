app.controller('viewController', ['$scope','$http','Workouts', function($scope, $http, Workouts, moment) {
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


    Workouts.get().then(function(response) {
    	$scope.count = response.data.length;
    	$scope.mostRecent = response.data[response.data.length -1];
    	$scope.currentWorkout = response.data[response.data.length -1];
    	console.log(response.data[0].name);
    	
    })
  
       
    $scope.selectWorkout = function(index){
        console.log(index);
        console.log($scope.workouts.length);
        for(var i = $scope.workouts.length-1;  i>0; i--){
        	if($scope.workouts[i]._id == index){
        		console.log("Match found at " + i);
        		$scope.currentWorkout = $scope.workouts[i];
        	}
        }
    };

}]);