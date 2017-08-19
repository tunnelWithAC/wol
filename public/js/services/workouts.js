angular.module('workoutService', []).factory('Workouts', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/workouts', {
					cache: true
				});
			},
			create : function(workoutData) {
				return $http.post('/api/workouts', workoutData);
			},
			getVolume: function(workoutData){
				return $http.post('/api/workouts', searchData);
			},
			delete : function(id) {
				return $http.delete('/api/workout/' + id);
			}
		}
	}]);
