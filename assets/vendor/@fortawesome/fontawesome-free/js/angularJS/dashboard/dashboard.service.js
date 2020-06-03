/*
  Creado por Luis Alfonso Olvera Mendoza

  Servicios para el Dashboard, declara una instancia HTTP para
  realizar peticiones REST
*/
angular.module('testApp')
.service('DashboardService', ['$http',function($http) {

  /* se pasan los siguientes parametros:
          @emailAdmin -> correo del administrador
          @email -> correo del usuario a buscar (suposicion en base a la documentacion de Swagger)
          @token -> cadena de texto variable para otorgar el acceso al servicio
          @app -> el tipo de App desde el cual se realiza el servicio (suposicion en base a la documentacion de Swagger)
      retorna una rspuesta y su respectivo error, en caso de que ocurra uno.
   */
    this.bookings = function($emailAdmin, $email, $token, $app) {
      $http.defaults.headers.common['Accept'] = 'application/json'
      return $http.get('https://dev.tuten.cl:443/TutenREST/rest/user/'+$email+'/bookings?current=true', 
      { 
        /* 
          Se modifican los headers para la comunicacion con el servicio.
        */
        headers :
                {   
                    'Token': $token,
                    'Adminemail': $emailAdmin, 
                    'App': $app,
                    'Content-Type': 'application/json'
                }
      }
        )
        /* Callbacks */
      .then(function(response){
        return response;
      })
      .catch(function(err){
        return err;
      })
    };

}]);