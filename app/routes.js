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
            var firstSet = req.body.exercises[0].sets[0] || null;
            var secondSet = req.body.exercises[0].sets[1];
            var secondExercise = req.body.exercises[1];
            var thirdSet = req.body.exercises[2];
            var emptySet = null/*[{setID: null, reps: null, sets: null, weight:null}]*/;

            if(secondSet === null || secondSet === undefined){
                secondSet = emptySet
            }
            console.log(secondSet);
     
            // create a workout object, information comes from AJAX request from Angular
            Workout.create({
                name: req.body.name,
                exercises: req.body.exercises,

                exercise1: {
                    name: req.body.exercises[0].name, 
                    sets: 
                        {
                            set1: {
                                setID: firstSet.setID, 
                                reps: req.body.exercises[0].sets[0].reps, 
                                sets: req.body.exercises[0].sets[0].sets, 
                                weight: req.body.exercises[0].sets[0].weight    
                            },    
                            set2: {
                                setID: secondSet.setID, 
                                reps: secondSet.reps, 
                                sets: secondSet.sets, 
                                weight: secondSet.weight
                            }
                            /*,
                            set3: {
                                setID: req.body.exercises[0].sets[2].setID || null, 
                                reps: req.body.exercises[0].sets[2].reps || null, 
                                sets: req.body.exercises[0].sets[2].sets || null, 
                                weight: req.body.exercises[0].sets[2].weight || null
                            }
                            /*,
                            set4: {
                                setID: req.body.exercises[0].sets[3].setID || null, 
                                reps: req.body.exercises[0].sets[3].reps || null, 
                                sets: req.body.exercises[0].sets[3].sets || null, 
                                weight: req.body.exercises[0].sets[3].weight || null   
                            },
                            set5: {
                                setID: req.body.exercises[0].sets[4].setID || null, 
                                reps: req.body.exercises[0].sets[4].reps || null, 
                                sets: req.body.exercises[0].sets[4].sets || null, 
                                weight: req.body.exercises[0].sets[4].weight || null    
                            }*/
                        }
                    },
                    /*exercise2: {
                    name: req.body.exercises[1].name, 
                    sets: 
                        {
                            set1: {
                                setID: req.body.exercises[1].sets[0].setID || null, 
                                reps: req.body.exercises[1].sets[0].reps || null, 
                                sets: req.body.exercises[1].sets[0].sets || null, 
                                weight: req.body.exercises[1].sets[0].weight || null    
                            },
                            set2: {
                                setID: req.body.exercises[1].sets[1].setID || null, 
                                reps: req.body.exercises[1].sets[1].reps || null,  
                                sets: req.body.exercises[1].sets[1].sets || null, 
                                weight: req.body.exercises[1].sets[1].weight || null   
                            },

                            set3: {
                                setID: req.body.exercises[1].sets[2].setID || null, 
                                reps: req.body.exercises[1].sets[2].reps || null, 
                                sets: req.body.exercises[1].sets[2].sets || null, 
                                weight: req.body.exercises[1].sets[2].weight || null    
                            }/*,
                            set4: {
                                setID: req.body.exercises[1].sets[3].setID || null, 
                                reps: req.body.exercises[1].sets[3].reps || null, 
                                sets: req.body.exercises[1].sets[3].sets || null, 
                                weight: req.body.exercises[1].sets[3].weight || null    
                            },
                            set5: {
                                setID: req.body.exercises[1].sets[4].setID || null,  
                                reps: req.body.exercises[1].sets[4].reps || null, 
                                sets: req.body.exercises[1].sets[4].sets || null, 
                                weight: req.body.exercises[1].sets[4].weight || null   
                            }
                        }
                    },*/

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
