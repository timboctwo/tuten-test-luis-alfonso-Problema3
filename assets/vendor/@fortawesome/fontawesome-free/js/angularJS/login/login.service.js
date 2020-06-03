/*
  Creado por Luis Alfonso Olvera Mendoza

  Servicios para el Login, declara una instancia HTTP para
  realizar peticiones REST
*/
angular.module('testApp')
.service('LoginService', ['$http',function($http) {

  /* se pasan los siguientes parametros:
          @email -> correo del usuario que quiere valdiar sus credenciales
          @pass -> contraseña del usuario que quiere validar sus credenciales
          @app -> el tipo de App desde el cual se realiza el servicio (suposicion en base a la documentacion de Swagger)
      retorna una rspuesta y su respectivo error, en caso de que ocurra uno.
   */
    this.login = function($email, $pass, $app) {
      /* Se modifica el header 'Accept' para esta instancia de http */
      $http.defaults.headers.common['Accept'] = 'application/json'
      return $http.put('https://dev.tuten.cl:443/TutenREST/rest/user/'+$email,{}, 
      {
        /*
          Se modifican los headers para poder establecer la comunicacion con el servicio
        */
        headers :
                { 'Password': $pass, 
                  'App': $app,
                  'Content-Type': 'application/json'
                }
      }
        )
      .then(function(response){
        return response;
      })
      .catch(function(err){
        return err;
      })
    };

}]);