angular.module('workoutService', []).factory('Workouts', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/workouts');
			},
			create : function(workoutData) {
				return $http.post('/api/workouts', workoutData);
			},
			delete : function(id) {
				return $http.delete('/api/workouts/' + id);
			}
		}
	}]);