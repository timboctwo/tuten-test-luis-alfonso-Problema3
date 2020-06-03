/*
  Creado por Luis Alfonso Olvera Mendoza

  Modulo de la aplicacion testApp, involucrando la declaracion de los componentes por cada direccion de la App
  y el componente de cada uno.
*/
(function(angular){
    'use strict';
    angular.module('testApp', ["ngRoute", "ui.grid", "ui.grid.edit"])
    /* 
        Se declaran las configuraciones del modulo, 
        involucrando el route para las direcciones URL
     */
    .config(function ($routeProvider){
        $routeProvider
        /* Configuracion para el login */
        .when("/login", {
            templateUrl : "assets/templates/login.html",
            controller: "LoginController"
        })
        /* Configuracion para el dashboard */
        .when("/dashboard", {
            templateUrl : "assets/templates/dashboard.html",
            controller: "DashboardController"
        })
        /* 
            En caso de que se ingrese una URL no valida,
            se redirige al usuario a la pagina del login.
        */
        .otherwise({
            redirectTo : "/login"
        });
    });
})(window.angular);