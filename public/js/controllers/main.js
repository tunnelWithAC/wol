app.controller('mainController', ['$scope','$http','Todos','Workouts', function($scope, $http, Todos, Workouts) {
    $scope.formData = {};
    $scope.workoutData = {};
    $scope.loading = true;

    $scope.exercises = [{'exerciseID':0, "sets":[{"setID":0}]}];
    $scope.sets = [];
    $scope.workoutData.exercises = $scope.exercises;

    $scope.addNewExercise = function(){
        var newID = $scope.exercises.length;
        $scope.exercises.push({'exerciseID':newID, 'sets':[{"setID":0}] });
    };

    $scope.addNewSet = function(excID) {
        // exercises[id].sets.push(param)
        var newItemNo = $scope.exercises[excID].sets.length+1;
        $scope.exercises[excID].sets.push({'setID':newItemNo});
    };


    Workouts.get()
        .then(function(response) {
            $scope.workouts = response.data;
            $scope.loading = false;
        });

    $scope.createWorkout = function() {
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



    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
        .then(function(response) {
            $scope.todos = response.data;
            $scope.loading = false;
        });






    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Todos.create($scope.formData)

            // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data; // assign our new list of todos
                });
        }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $scope.loading = true;

        Todos.delete(id)
        // if successful creation, call our get function to get all the new todos
            .success(function(data) {
                $scope.loading = false;
                $scope.todos = data; // assign our new list of todos
            });
    };
}]);