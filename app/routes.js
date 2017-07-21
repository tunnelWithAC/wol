var Todo = require('./models/todo');
var Workout = require('./models/workout');


function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getWorkouts(res) {
    Workout.find(function (err, workouts) {
        if (err) {
            res.send(err);
        }
        res.json(workouts); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // CONALL
    // api ---------------------------------------------------------------------
        // get all todos
        app.get('/api/workouts', function (req, res) {
            // use mongoose to get all todos in the database
            getWorkouts(res);
        });

        // create todo and send back all todos after creation
        app.post('/api/workouts', function (req, res) {
            console.log("Saving workout");
            //console.log(req.body.exercises);
            //console.log(req.body.exercises[0]);
            console.log(req.body.exercises[0].sets);
            console.log(req.body.exercises[0].sets[0].setID);

            // create a todo, information comes from AJAX request from Angular
            Workout.create({
                name: req.body.name,
                exercises: req.body.exercises,
                //user: req.body.user,

                exercise1: {
                    name: req.body.exercises[0].name, 
                    sets: 
                        {
                            setID: req.body.exercises[0].sets[0].setID, 
                            reps: req.body.exercises[0].sets[0].reps, 
                            sets: req.body.exercises[0].sets[0].sets, 
                            weight: req.body.exercises[0].sets[0].weight
                        }
                    },

                done: false
            }, function (err, workout) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                getWorkouts(res);
            });

        });

        app.delete('/api/workout/:workout_id', function (req, res) {
            Todo.remove({
                _id: req.params.workout_id
            }, function (err, workout) {
                if (err)
                    res.send(err);

                getWorkouts(res);
            });
        });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
