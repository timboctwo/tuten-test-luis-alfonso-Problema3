/*
  Creado por Luis Alfonso Olvera Mendoza

  Controlador para el Dashboard, que muestra una tabala filtrable
  con el contenido de bookings mediante una peticion REST
*/
angular.module('testApp')
.controller('DashboardController', ['$scope', '$location', "DashboardService", "DataFactory", "uiGridConstants", function ($scope, $location, $dashboardService, DataFactory, uiGridConstants){
    
  /* Coonfiguracion de la tabla donde se mostratan los bookings (Ui-Grid) */
    $scope.gridOptions = {};
    $scope.gridOptions.data = 'booking';
    $scope.gridOptions.enableFiltering = true;

    /* Resalta el encabezado filtrado */
    $scope.highlightFilteredHeader = function(row, rowRenderIndex, col, colRenderIndex
) {
        if( col.filters[0].term ){
          return 'header-filtered';
        } else {
          return '';
        }
      };

      /* Establece los encabezador de la tabla hy opciones de cada uno de ellos. */
    $scope.gridOptions.columnDefs= [
      /* Filtro para la columna BookingId
          @Filtro MAYOR
          @Filtro MENOR QUE
          @Filtro EMPIEZA CON
      */
        { field: 'BookingId', enableSorting: true, filters:[
            {
              condition: uiGridConstants.filter.GREATER_THAN,
              placeholder: 'Mayor que'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN,
              placeholder: 'Menor que'
            },
            {
              condition: uiGridConstants.filter.STARTS_WITH,
              placeholder: 'Buscar...'
            }
          ], headerCellClass: $scope.highlightFilteredHeader},
          /* Las columnas 'Cliente', 'Fecha de Creacion' y 'Direccion' solo son de lectura y se desactiva la opcion de filtrar. */
        { field: 'Cliente', enableSorting: false, enableFiltering : false, enableCellEdit: true},
        { field: 'Fecha de Creación', displayName: 'FechaCreacion', enableSorting: false, enableFiltering : false, enableCellEdit: true},
        { field: 'Dirección', enableSorting: false, enableFiltering : false, enableCellEdit: true},
        /* Filtro para la columna Precio
          @Filtro MAYOR
          @Filtro MENOR QUE
          @Filtro EMPIEZA CON
      */
        { field: 'Precio', enableSorting: true, filters:[
            {
              condition: uiGridConstants.filter.GREATER_THAN,
              placeholder: 'Mayor que'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN,
              placeholder: 'Menor que'
            },
            {
              condition: uiGridConstants.filter.STARTS_WITH,
              placeholder: 'Buscar...'
            }
          ],headerCellClass: $scope.highlightFilteredHeader }
    ];

    /* Se recupera la informacion del usuario para poder hacer la llamada al servicio 'bookings' */
    this.loginData = angular.fromJson(DataFactory.getMyData());

    /* Si no esta definida la informacion, se redirecciona al usuario al login */
    if(this.loginData == undefined){
        $location.url("/login");
    }
    var token = this.loginData.sessionTokenBck;
    var emailAdmin = this.loginData.email;

    /*
      Ejecucion del servicio 'bookings'
      Parseo de información del servicio para mostrar unicamente los campos solicitados. 
    */
    $scope.data = function(){
        /* @booking vaiable para almacenar el array con los campos 
              "BookingId"
              "Cliente"
              "Fecha de Creación"
              "Direccion"
              "Precio"
        */
        $scope.booking = [];
        /* Se dispara un evento para indicarle al 'LoadingController' que muestre un loader */
        $scope.$emit('LOAD');
        /* Se ejecuta un servicio REST mediante el uso del DashboardService para obtener la lista de bookings */
        $dashboardService.bookings(emailAdmin, "contacto@tuten.cl", token,'APP_BCK')
        .then(function(response){

        /* se dispara un evento para indicarle al 'LoadingController' que oculte un loader */
          $scope.$emit('UNLOAD');
          if (response.data.length == undefined){
            $scope.loading = true;
          }else{
            /* Se recorre el JSONArray obtenido por el servicio para seleccionar unicamente 
              los campos a mostrar al usuario y se almacenan en el JSONArray 'bookings'  */
            for(var i in response.data){
              /* Seleccion de campos */
                var formatedBooking = {
                    'BookingId' : response.data[i].bookingId,
                    'Cliente' : response.data[i].tutenUserClient.firstName,
                    'Fecha de Creación' : getDate(response.data[i].bookingTime),
                    'Dirección' : angular.fromJson(response.data[i].bookingFields).location.streetAddress,
                    'Precio' : response.data[i].bookingPrice
                };
                /* Se agrega al nuevo JSONArray */
                $scope.booking.push(formatedBooking);
            }
            console.log($scope.booking);
          }
        })
        .catch(function(err){
            console.log(err);
            alert(err.data);
        });
    }

    /* Crea una fecha legible para el humano en base una fecha especificada en milisegundos */
    function getDate($timeInMilliseconds){
        var date = new Date($timeInMilliseconds);
        var formattedDate =  date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
          });
        return formattedDate;
    }

}]);

