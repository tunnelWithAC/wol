var Todo = require('./models/todo');
var Workout = require('./models/workout');
//var User = require('./models/user');

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
    res.json(workouts); // return all workouts in JSON format
  });
};

function getNames(res) {
  Workout.find(function (err, names) {
    if (err) {
      res.send(err);
    }
    res.json(names); // return all workouts in JSON format
  });
};

module.exports = function (app) {

  // CONALL
  // api ---------------------------------------------------------------------

  app.get('/api/user', function (req, res) {
    /*console.log("Creating user");
    User.create({
    name: 'conall',
    email: 'conall.daly95@gmail.com',
    password: 'test1234'
  });*/
  res.send("defunct");
});
// get all todos
app.get('/api/workouts', function (req, res) {
  // use mongoose to get all todos in the database
  getWorkouts(res);
});

app.get('/api/volume/:exercise', function(req, res){

});

// create todo and send back all todos after creation
app.post('/api/workouts', function (req, res) {
  console.log("Saving workout");

  var exc1set1, exc1Volume, exc1set2, exc1set3, exc1set4, exc1set5;
  var exc2Name, exc2Volume, exc2set1, exc2set2, exc2set3, exc2set4, exc2set5;
  var exc3Name, exc3Volume, exc3set1, exc3set2, exc3set3, exc3set4, exc3set5;
  var exc4Name, exc4Volume, exc4set1, exc4set2, exc4set3, exc4set4, exc4set5;
  var exc5Name, exc5Volume, exc5set1, exc5set2, exc5set3, exc5set4, exc5set5;

  if(req.body.exercises[0] !== undefined && req.body.exercises[0] !== null){
    exc1Name = req.body.exercises[0].name;
    exc1Volume = req.body.exercises[0].exerciseVolume || null;
    exc1Set1 = req.body.exercises[0].sets[0] || null;
    exc1Set2 = req.body.exercises[0].sets[1] || null;
    exc1Set3 = req.body.exercises[0].sets[2] || null;
    exc1Set4 = req.body.exercises[0].sets[3] || null;
    exc1Set5 = req.body.exercises[0].sets[4] || null;
  }

  if(req.body.exercises[1] !== undefined && req.body.exercises[1] !== null){
    exc2Name = req.body.exercises[1].name;
    exc2Volume = req.body.exercises[1].exerciseVolume || null;
    exc2set1 = req.body.exercises[1].sets[0] || null;
    exc2set2 = req.body.exercises[1].sets[1] || null;
    exc2set3 = req.body.exercises[1].sets[2] || null;
    exc2set4 = req.body.exercises[1].sets[3] || null;
    exc2set5 = req.body.exercises[1].sets[4] || null;
  }

  if(req.body.exercises[2] !== undefined && req.body.exercises[2] !== null){
    exc3Name = req.body.exercises[2].name;
    exc3Volume = req.body.exercises[2].exerciseVolume || null;
    exc3set1 = req.body.exercises[2].sets[0] || null;
    exc3set2 = req.body.exercises[2].sets[1] || null;
    exc3set3 = req.body.exercises[2].sets[2] || null;
    exc3set4 = req.body.exercises[2].sets[3] || null;
    exc3set5 = req.body.exercises[2].sets[4] || null;
  }

  if(req.body.exercises[3] !== undefined && req.body.exercises[3] !== null){
    exc4Name = req.body.exercises[3].name;
    exc4Volume = req.body.exercises[3].exerciseVolume || null;
    exc4set1 = req.body.exercises[3].sets[0] || null;
    exc4set2 = req.body.exercises[3].sets[1] || null;
    exc4set3 = req.body.exercises[3].sets[2] || null;
    exc4set4 = req.body.exercises[3].sets[3] || null;
    exc4set5 = req.body.exercises[3].sets[4] || null;
  }

  if(req.body.exercises[4] !== undefined && req.body.exercises[4] !== null){
    exc5Name = req.body.exercises[4].name;
    exc5Volume = req.body.exercises[4].exerciseVolume || null;
    exc5set1 = req.body.exercises[4].sets[0] || null;
    exc5set2 = req.body.exercises[4].sets[1] || null;
    exc5set3 = req.body.exercises[4].sets[2] || null;
    exc5set4 = req.body.exercises[4].sets[3] || null;
    exc5set5 = req.body.exercises[4].sets[4] || null;
  }

  var videos = req.body;
  var video1, video2, video3;

  if(req.body.videos !== undefined && req.body.videos !== null){
    video1 = req.body.videos[0];
      if(req.body.videos[1] !== undefined && req.body.videos[1] !== null){
        video2 = req.body.videos[1] || null;
      }
      if(req.body.videos[2] !== undefined && req.body.videos[2] !== null){
        video3 = req.body.videos[2];
      }
  }
  // create a workout object, information comes from AJAX request from Angular
  Workout.create({
    userID: '598a2c2fd5937c37eb53b9cd',
    name: req.body.name,
    //exercises: req.body.exercises,
    workoutVolume: req.body.totalVolume,
    accessoryWork: req.body.accessoryWork,
    videos: {
      video1: video1,
      video2: video2,
      video3: video3
    },
    exercises: {
      exercise1: {
        name: exc1Name,
        exerciseVolume: exc1Volume,
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
        exerciseVolume: exc2Volume,
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
        exerciseVolume: exc3Volume,
        sets:
        {
          set1: exc3set1,
          set2: exc3set2,
          set3: exc3set3,
          set4: exc3set4,
          set5: exc3set5
        }
      },
      exercise4: {
        name: exc4Name,
        exerciseVolume: exc4Volume,
        sets:
        {
          set1: exc4set1,
          set2: exc4set2,
          set3: exc4set3,
          set4: exc4set4,
          set5: exc4set5
        }
      },
      exercise5:{
        name: exc5Name,
        exerciseVolume: exc5Volume,
        sets:
        {
          set1: exc5set1,
          set2: exc5set2,
          set3: exc5set3,
          set4: exc5set4,
          set5: exc5set5
        }
      }
    },

    done: false
  }, function (err, workout) {
    if (err)
    res.send(err);

    // get and return all the todos after you create another
    getWorkouts(res);
  });
  //  getWorkouts(res);
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
