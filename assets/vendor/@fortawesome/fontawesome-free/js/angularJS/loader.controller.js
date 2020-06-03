
/*
  Creado por Luis Alfonso Olvera Mendoza

  Controlador para mostrar un loader en la vista, sin importar el controlador
*/
angular.module('testApp')
.controller('LoadingController', ['$scope', function ($scope){
    $scope.loading = false;
    /* se ejecuta un 'on' para esuchar cuando se muestre el loader y ciando se oculte */
    $scope.$on('LOAD', function(){$scope.loading=true;});
    $scope.$on('UNLOAD', function(){$scope.loading=false;});
}]);