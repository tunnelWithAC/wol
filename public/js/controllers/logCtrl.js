app.controller('logController', ['$scope','$http', '$filter', '$sce', 'Workouts', function($scope, $http, $filter, $sce, Workouts) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.workouts = {};
  $scope.maxes = {
    "squat": 150,
    "front squat": 110,
    "sumo deadlift": 200,
    "conventional deadlift": 210,
    "bench press": 80,
    "incline press": 70,
    "shoulder press": 57.5
  }
  $scope.lowerBodyExerciseNames = ['squat', 'deadlift', 'lower'];
  $scope.upperBodyExerciseNames = ['incline',/*'incline press',*/ 'bench', 'press', 'upper body'];
  $scope.lowerBodyExercises = [];
  $scope.upperBodyExercises = [];

  $scope.volume = [];
  Workouts.get().then(function(response) {
    $scope.count = response.data.length;
    $scope.mostRecent = response.data[response.data.length -1];
    $scope.baseData = $scope.mostRecent.date;
    $scope.currentWorkout = response.data[response.data.length -1];
    $scope.workouts = response.data;
    $scope.classExercises($scope.workouts);
  });

  $scope.currentVideo = 'https://drive.google.com/file/d/0BzH4eneWolYAaEtkNFRVWXMzeVE/preview';
  $scope.setVideo = function(url){
    $scope.currentVideo = url;
    console.log($scope.currentVideo);
  };
  var id1, id2;
  id1 = "5981933790c52c4c0826d6ab"; //old
  id2 = "59847b01599881719f0ce0de"; //new

  $scope.classExercises = function(workouts){

    for(var i=0; i<workouts.length; i++){
      for(var j=0; j<$scope.lowerBodyExerciseNames.length; j++){
        if($scope.lowerBodyExerciseNames[j].includes(workouts[i].name.toLowerCase()))
            $scope.lowerBodyExercises.push(workouts[i]);
      }
      for(var j=0; j<$scope.upperBodyExerciseNames.length; j++){
        if($scope.upperBodyExerciseNames[j].includes(workouts[i].name.toLowerCase()) )
        // don't add if already exit
            $scope.upperBodyExercises.push(workouts[i]);
            //j = $scope.upperBodyExerciseNames.length;
      }
    }
    console.log($scope.lowerBodyExercises);
    console.log($scope.upperBodyExercises);

  };

  $scope.loadNames = function(){
    console.log("method called");
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
    if(workout.videos.video1 !== null && workout.videos.video1 !== undefined)
      $scope.currentVideo = workout.videos.video1.url;
  };

  // collects the total exercise (exc1+exc2+exc3) volume associated with the param
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
  };
}]);
