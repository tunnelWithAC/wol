/*
Returns a new ObjectId value. The 12-byte ObjectId value consists of:

a 4-byte value representing the seconds since the Unix epoch,
a 3-byte machine identifier,
a 2-byte process id, and
a 3-byte counter, starting with a random value.
*/
angular.module('mongoSearchService', []).factory('mongoSearchService', ['$http',function($http) {
		return {
			binarySearch: function(currentID, desiredID){
				var epoch, machineID, processID, counter;
				epoch = currentID.substring(0,3);
				machineID = currentID.substring(4,6);
				processID = currentID.substring(7,8);
				counter= currentID.substring(9,11);
			}
			/*get : function() {
				return $http.get('/api/workouts');
			},
			create : function(workoutData) {
				return $http.post('/api/workouts', workoutData);
			},
			delete : function(id) {
				return $http.delete('/api/workouts/' + id);
			}*/
		}
	}]);