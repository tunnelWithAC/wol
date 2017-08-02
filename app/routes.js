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
            //console.log(req.body.exercises[0].sets);
            var firstSet = req.body.exercises[0].sets[0] || null;
            var secondSet = req.body.exercises[0].sets[1];
            var secondExercise = req.body.exercises[1];
            var thirdSet = req.body.exercises[2];
            var emptySet = null/*[{setID: null, reps: null, sets: null, weight:null}]*/;
            var nullSet = {setID: null, reps: null, sets: null, weight:null};
            var sampleSet = {setID: 1, reps: 3, sets: 4, weight: 75}
            if(secondSet === null || secondSet === undefined){
                secondSet = emptySet
            }

            var exc1set1, exc1set2, exc1set3, exc1set4, exc1set5;
            var exc2Name, exc2set1, exc2set2, exc2set3, exc2set4, exc2set5;
            var exc3Name, exc3set1, exc3set2, exc3set3, exc3set4, exc3set5;

            if(req.body.exercises[0] !== undefined && req.body.exercises[0] !== null){
                exc1Name = req.body.exercises[0].name;
                exc1Set1 = req.body.exercises[0].sets[0] || null;
                exc1Set2 = req.body.exercises[0].sets[1] || null;
                exc1Set3 = req.body.exercises[0].sets[2] || null;
                exc1Set4 = req.body.exercises[0].sets[3] || null;
                exc1Set5 = req.body.exercises[0].sets[4] || null;    
            }

            if(req.body.exercises[1] !== undefined && req.body.exercises[1] !== null){
                exc2Name = req.body.exercises[1].name;
                exc2set1 = req.body.exercises[1].sets[0] || null;
                exc2set2 = req.body.exercises[1].sets[1] || null;
                exc2set3 = req.body.exercises[1].sets[2] || null;
                exc2set4 = req.body.exercises[1].sets[3] || null;
                exc2set5 = req.body.exercises[1].sets[4] || null;    
            }

            if(req.body.exercises[2] !== undefined && req.body.exercises[2] !== null){
                exc3Name = req.body.exercises[2].name;
                exc3set1 = req.body.exercises[2].sets[0] || null;
                exc3set2 = req.body.exercises[2].sets[1] || null;
                exc3set3 = req.body.exercises[2].sets[2] || null;
                exc3set4 = req.body.exercises[2].sets[3] || null;
                exc3set5 = req.body.exercises[2].sets[4] || null;    
            }
            
           
            // create a workout object, information comes from AJAX request from Angular
            Workout.create({
                name: req.body.name,
                exercises: req.body.exercises,
                exercise1: {
                    name: exc1Name, 
                    sets: 
                        {
                            set1: exc1Set1,    
                            set2: exc1Set2,
                            set3: exc1Set3,
                            set4: exc1Set4,
                            set5: exc1Set5
                        }
                    },
                    exercise2: {
                    name: exc2Name, 
                    sets: 
                        {
                            set1: exc2set1,
                            set2: exc2set2,
                            set3: exc2set3,
                            set4: exc2set4,
                            set5: exc2set5
                        }
                    },
                    exercise3: {
                    name: exc3Name, 
                    sets: 
                        {
                            set1: exc3set1,
                            set2: exc3set2,
                            set3: exc3set3,
                            set4: exc3set4,
                            set5: exc3set5
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
            Workout.remove({
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
