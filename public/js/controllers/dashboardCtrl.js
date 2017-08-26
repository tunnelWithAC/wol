app.controller('dashboardController', ['$scope','$http','$filter','Workouts', function($scope, $http, $filter, Workouts) {
  $scope.today = new Date();
  var d = new Date();
  console.log(d);
  console.log($filter('date')(d, "MMM EEEE dd"));

  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  console.log(firstDay);
  console.log(lastDay);

  Workouts.get().then(function(response) {
    $scope.workouts = response.data;
  });
}]);
