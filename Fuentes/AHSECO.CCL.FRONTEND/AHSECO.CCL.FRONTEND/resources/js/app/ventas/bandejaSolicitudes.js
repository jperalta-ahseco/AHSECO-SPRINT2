var bandejaSolicitudes = (function ($, win, doc) {
    var $idCliente = $("#idCliente");
    var $btnNuevo = $('#btnNuevo');
    var $btnBuscar = $('#btnBuscar');
    var $txtSolicitud = $('#txtSolicitud');
    var $btnRegresar = $('#btnRegresar');
    var $tblSolicitudes = $('#tblSolicitudes');
    var $cmbEstado = $("#cmbEstado");

    var mensajes = {
        cargandoSolicitudes: "Cargando Solicitudes, por favor espere....."
    };
    
    $(Initialize);

    function Initialize() {

        Buscar();
        $btnBuscar.click(Buscar);
        $btnNuevo.click(btnNuevoClick);
        $btnRegresar.click(btnRegresarClick);
        CargarComboEstado();

        setInterval(function () {
            refrescar();
        }, 60000);
    };

    function CargarComboEstado() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ObtenerEstadosSolicitud"
        var objComb = "";
        objComb = JSON.stringify(objComb);

        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            
            app.llenarComboMultiResult($cmbEstado, data.EstadosSolicitud, null, " ", "-- Todos --", filters);
        };

        var fnFailCallback = function () {
            app.message.error("Validación", "Error al cargar los combos.");
        };

        app.llamarAjax(method, url, objComb, fnDoneCallback, fnFailCallback, null, null);
    };

    function refrescar() {
        var baseUrl = baseSiteUrl;
        method = "POST";
        url = "BandejaSolicitudesVentas/ObtenerSolicitudes"

        objBuscar = {
            IdCliente: $idCliente.val(),
            Id_Solicitud: $txtSolicitud.val() == "" || $txtSolicitud.val() == "0" ? 0 : $txtSolicitud.val(),
            Estado: $cmbEstado.val()
        };

        objParam = JSON.stringify(objBuscar);

        var m = method;
        var u = baseUrl + url;
        var d = objParam;



        return $.ajax({
            method: m,
            url: u,
            data: d,
            contentType: 'application/json',
            dataType: "json"
        }).done(function (data, textStatus, jqXhr) {
            if (data.Status === 1) {
                cargarTabla(data);
            } else if (data.Status === 0) {
                message.error("Error", data.CurrentException, "Aceptar", null);
            }
        }).fail(function (jqXhr, textStatus, errorThrow) {
            message.error("Error inesperado", errorThrow, "Aceptar", null);
        }).always(function () {

            if (typeof (fnAlwaysCallback) !== "undefined" && fnAlwaysCallback != null) {
                fnAlwaysCallback();
            }
        });
    }

    function Buscar() {
        if (isNaN($txtSolicitud.val())) {
            app.message.error("Validación", "El número de solicitud no puede contener letras")
            return;
        };

        method = "POST";
        url = "BandejaSolicitudesVentas/ObtenerSolicitudes"
        objBuscar = {
            IdCliente: $idCliente.val(),
            Id_Solicitud: $txtSolicitud.val() == "" || $txtSolicitud.val() == "0" ? 0 : $txtSolicitud.val(),
            Estado: $cmbEstado.val()
        };

        objParam = JSON.stringify(objBuscar);

        var fnDoneCallBack = function (data) {
            cargarTabla(data);
        }

        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null)
    };

    function cargarTabla(data) {
        var columns = [
            {
                data: "Id_WorkFlow",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id_Solicitud",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "nomFlujo",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Fecha_Sol",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NomTipoSol",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "nomEstado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "AsesorVenta",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id_Solicitud",
                render: function (data, type, row) {
                    var detalle = "'" + row.Id_WorkFlow + "','" + row.Id_Solicitud + "','" + row.Estado + "','" + row.nomEstado + "','" + row.abrevEstado + "','" + row.Tipo_Sol + "','" + row.Id_Flujo+"'";
                    var seleccionar = '<a id="btnSeleccionar" class="btn btn-primary btn-xs" title="Seleccionar" href="javascript: bandejaSolicitudes.seleccionar(' + detalle + ')"><i class="fa fa-plus" aria-hidden="true"></i> Seleccionar</a>';
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
        /*
        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + data.IdContacto);
        };*/

        app.llenarTabla($tblSolicitudes, data, columns, columnDefs, "#tblSolicitudes", null);
    };

    function btnRegresarClick() {
        app.redirectTo("BandejaVentas");
    };

    function seleccionar(idWorkFlow, nomSolicitud, estadoSol, nomEstado, abrevEstado, tipoSol, idflujo) {
     
        method = "POST"
        url = "BandejaSolicitudesVentas/ObtenerDetallexSolicitud";
        var objResponse = {
            Id_WorkFlow: idWorkFlow,
            Id_Solicitud: nomSolicitud,
            Estado: estadoSol,
            nomEstado: nomEstado,
            abrevEstado: abrevEstado,
            Tipo_Sol: tipoSol,
            Id_Flujo: idflujo
        };
        objParam = JSON.stringify(objResponse);

        var fnDoneCallBackSol = function () {
            app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
        };

        var fnFailCallBackSol = function (Mensaje) {
            app.message.error("Validación", Mensaje);
            return;
        };

        app.mostrarLoading();
        app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallBackSol, fnFailCallBackSol, null, null);
    };
    function btnNuevoClick() {
        app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
    };

    return {
        seleccionar: seleccionar
    };    
})(window.jQuery, window, document);