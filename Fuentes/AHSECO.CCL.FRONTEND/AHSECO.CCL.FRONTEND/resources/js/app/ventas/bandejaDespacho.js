var bandejaDespacho = (function ($, win, doc) {
    /***/
    var $btnBuscar = $('#btnBuscar');
    var $btnNuevo = $('#btnNuevo');
    var $btnRegresar = $('#btnRegresar');
    var $txtOrdenCompra = $('#txtOrdenCompra');
    var $txtNumContrato = $('#txtNumContrato');
    var $cmbTipoDespacho = $('#cmbTipoDespacho');
    var $cmbEstadoDespacho = $('#cmbEstadoDespacho');
    var $NumSol = $('#NumSol');
    var $IdCotizacion = $('#IdCotizacion');
    var $nombreRol = $('#nombreRol');


    /*Tabla*/
    var $tblDespacho = $('#tblDespacho');


    /*Mensajes*/
    var mensajes = {

    };


    $(Initialize);

    function Initialize() {
        CargarCombos();
     
        $btnBuscar.click(Buscar);
        $btnRegresar.click(Regresar);
        $btnNuevo.click(Nuevo);

        setTimeout(function () {
            Buscar();
        }, 1000);
        
    };

    function cargarTablaDespachos(despachos) {
        var data = Result = [];
        data.Result = despachos;
        var columns = [
            {
                data: "IdDespacho",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NombreTipoDespacho",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Numero",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Fecha",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "FechaMaxima",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NombreEstado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "IdDespacho",
                render: function (data, type, row) {
                    var params = "'" + row.IdDespacho + "'"; 
                    var seleccionar = '<a id="btnVerDespacho" class="btn btn-default btn-xs" title="Ver Despacho" href="javascript: bandejaDespacho.verDespacho(' + params + ')"><i class="fa fa-plus" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + seleccionar + '</center>';
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];

        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + data.IdContacto);
        };

        app.llenarTabla($tblDespacho, data, columns, columnDefs, "#tblDespacho", rowCallback);
    };

    function verDespacho(IdDespacho) {
       
        method = "POST";
        url = "BandejaSolicitudesVentas/InicializarNumDespacho?NumDespacho=" + IdDespacho;
        var objComb = "";
        objComb = JSON.stringify(objComb);
        var fnDoneCallback = function (data) {

            app.redirectTo("BandejaSolicitudesVentas/DetalleDespacho")  
        }
        var fnFailCallback = function () {
            app.message.error("Validación", "Error al guardar la variable.");
        };

        app.llamarAjax(method, url, objComb, fnDoneCallback, fnFailCallback, null, null);
    }

    function CargarCombos() {
        method = "POST";
        url = "BandejaSolicitudesVentas/FiltrosDespacho?idDespacho=0" + "&rolUsuario=" + $nombreRol.val() ;
        var objComb = "";
        objComb = JSON.stringify(objComb);
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            
            app.llenarComboMultiResult($cmbTipoDespacho, data.Result.TipDespacho, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbEstadoDespacho, data.Result.Estados, null, " ", "-- Todos --", filters);
        };
        var fnFailCallback = function () {
            app.message.error("Validación", "Error al cargar los combos.");
        };

        app.llamarAjax(method, url, objComb, fnDoneCallback, fnFailCallback, null, null);
    }

    function Buscar() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ConsultaBandejaDespacho";
        var obj = {
            IdSolicitud: $NumSol.val(),
            TipoDespacho: $cmbTipoDespacho.val() == null ? "" : $cmbTipoDespacho.val(),
            NumeroOrden: $txtOrdenCompra.val() == null ? "" : $txtOrdenCompra.val(),
            NumeroContrato: $txtNumContrato.val() == null ? "" : $txtNumContrato.val(),
            Estado: $cmbEstadoDespacho.val() == null ? "" : $cmbEstadoDespacho.val()
        };
        obj = JSON.stringify(obj);
        var fnDoneCallback = function (data) {
            cargarTablaDespachos(data.Result)
        };
        var fnFailCallback = function () {
            app.message.error("Validación", "Error al realizar la búsqueda.");
        };

        app.llamarAjax(method, url, obj, fnDoneCallback, fnFailCallback, null, null);
    };


    function Regresar() {
        app.redirectTo("BandejaVentas")
    };

    
    function Nuevo() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/InicializarNumDespacho";
        var obj = {
            NumDespacho: "0"
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaSolicitudesVentas/DetalleDespacho")  
        };

        var fnFailCallBack = function () {

        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    return {
        verDespacho: verDespacho

    };
})(window.jQuery, window, document);