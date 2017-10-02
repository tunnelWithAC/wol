app.directive('modal', function(){
        return {
            template: '<div  class="modal" id="modal" tabindex="-1" role="dialog"><div class="modal-dialog "><div class="modal-content modal-video-content" ng-transclude style="width: 780px"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"></button></div></div></div></div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:{visible:'=', onShown:'&', onHide:'&'},
            link:function postLink(scope, element, attrs){

                $(element).modal({
                    show: false,
                    keyboard: attrs.keyboard,
                    backdrop: attrs.backdrop
                });

                scope.$watch(function(){return scope.visible;}, function(value){

                    if(value == true){
                        $(element).modal('show');
                    }else{
                        $(element).modal('hide');
                    }
                });

                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                  });
                });

                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onShown({});
                  });
                });

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                  });
                });

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onHide({});
                  });
                });
            }
        };
    }
);

app.directive('modalHeader', function(){
    return {
        template:'<div class="modal-header modal-video-header" style=" width: 760px"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">{{title}}</h4></div>',
        replace:true,
        restrict: 'E',
        scope: {title:'@'}
    };
});

app.directive('modalBody', function(){
    return {
        template:'<div class="modal-body modal-video-body" style="width: 760px" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});

app.directive('modalFooter', function(){
    return {
        template:'<div class="modal-footer modal-video-footer" style="width: 760px" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});



app.controller('modalController', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
  $scope.title = "Angularjs Bootstrap Modal Directive Example";
  $scope.showModal1 = false;
  $scope.showModal2 = false;
  $scope.value = 0;

  $scope.enableModal1 = function(){
    $scope.showModal1 = true;
  }

  $scope.setValue = function(){
    $scope.value++;
  }

  $scope.hide = function(m){
      if(m === 1){
          $scope.showModal1 = false;
      }else{
          $scope.showModal2 = false;
      }
  }

  $scope.modalOneShown = function(){
      console.log('model one shown');
  }

  $scope.modalOneHide = function(){
      console.log('model one hidden');
  }

  $('.modal').on('hide.bs.modal', function(e) {
    var $if = $(e.delegateTarget).find('iframe');
    var src = $if.attr("src");
    $if.attr("src", '/empty.html');
    $if.attr("src", src);
});
}]);
