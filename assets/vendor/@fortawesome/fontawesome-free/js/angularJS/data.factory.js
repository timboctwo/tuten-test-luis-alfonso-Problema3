/*
  Creado por Luis Alfonso Olvera Mendoza

  Factory para manipular la data del usuario, guardarla en una sesion 
  y poder ser recuperado desde un Controlador
*/
angular.module('testApp')
.factory("DataFactory", function() {
     /* Objeto con los metodos para interactuar con la informacion del usuario */
     var service = {};
     /* Almacena la informacion del usuario */
     var _myData;

     service.setMyData = function(myData) {
         sessionStorage.dataFactory = myData;
         _myData = myData;
     }
 
     service.getMyData = function() {
         _myData = sessionStorage.dataFactory;
         return _myData;
     }
     /* Retorna el objeto para poder acceder a los metodos. */
     return service;
});