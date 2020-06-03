/*
  Creado por Luis Alfonso Olvera Mendoza

  Controlador para el Login, que permite al usuario ingresar un email y una contraseña
  para ser validada por un servicio y permitir el acceso al Dashboard.
*/
angular.module('testApp')
.controller('LoginController', ['$scope', '$location', "LoginService", "DataFactory", function ($scope, $location, $loginService, DataFactory){
    /* Formato para el correo electronico */
    $scope.mailformat = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
    /* Variables del usuario (controladas por la directiva ng-model) */
    $scope.password = "";
    $scope.email = {
        text: ''
    };

    /* 
        Realiza una peticion REST para hacer un login 
        junto con una serie de validaciones para las variables del usuario.
    */
    $scope.doLogin = function(){
        /* Validaciones del email y la contraseña */
        if($scope.isEmailInputValid() && $scope.isPasswordInputValid()){
            $scope.$emit('LOAD');
            /* Realiza una peticion REST mediante el LoginService para validar los datos del Login */
            $loginService.login($scope.email.text, $scope.password, 'APP_BCK')
            .then(function(response){
                /* Se dispara un evento para indicarle al 'LoadingController' que muestre un loader */
                $scope.$emit('UNLOAD');
                if (response.data.length == undefined){
                    /* Se recibe la informacion del usuario y se guarda mediante el DataFactory para poder ser accesible desde otros Controllers */
                    DataFactory.setMyData(JSON.stringify(response.data, null, 4));
                    console.log(DataFactory.getMyData());
                    /* Redireccionamiento */
                    $location.url('/dashboard')
                }else{
                    alert(response.data);
                }
            })
            .catch(function(err){
                console.log(err);
                alert(err.data);
            });
        }
    }

    /* Valida que el correo ingresado no este vacio y tenga una sintaxis correcta. */
    $scope.isEmailInputValid = function(){
        if($scope.email.text == undefined || $scope.email.text.length == 0 || $scope.email.text.match($scope.mailformat).length == 0){
            alert("Please, type a valid email address.")
            return false;
        }else{
            return true;
        }
    }
    /* Valida que la contraseña no este vacia */
    $scope.isPasswordInputValid = function(){
        if($scope.password.length == 0){
            alert("Please, type a password to continue.");
            return false;
        }else{
            return true;
        }
    }
}]);
