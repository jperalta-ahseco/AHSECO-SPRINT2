var detalleDespacho = (function ($, win, doc) {
    /***/
    var $cmbTipoDespacho = $('#cmbTipoDespacho');
    var $txtNumOrden = $('#txtNumOrden');
    var $tblDetalleCotizacion = $('#tblDetalleCotizacion');
    var $IdCotizacion = $('#IdCotizacion');
    var $checkSeleccionar = $('#checkSeleccionar');
    var $checkSeleccionarTodos = $('#checkSeleccionarTodos');
    var $btnRegresar = $('#btnRegresar');
    var $NumSol = $('#NumSol');
    var $IdCotizacion = $('#IdCotizacion');
    /*Mensajes*/
    var mensajes = {

    };


    $(Initialize);

    function Initialize() {
        detalleDespacho.xComprar = [];
        CargarDatosDetalle()
        CargarCombos();
        $btnRegresar.click(Regresar);
    }

    function CargarCombos() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/FiltrosDespacho";

        var fnDoneCallBack = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbTipoDespacho, data.Result.TipDespacho, null, " ", "-- Seleccione --", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se presentó un error al cargar combos");
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null);
    };


    function Registrar() {

    };

    function CargarDatosDetalle() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCotizacionVentaDetalle"
        var obj = {
            IdCotizacion: $IdCotizacion.val()
        };

        var objParam = JSON.stringify(obj);


        var fnDoneCallBack = function (data) {
            CargarTablaDetalleCot(data);
            btnCheck();
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al realizar la consulta del detalle de cotización.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null);
    };

    function CargarTablaDetalleCot(data) {
        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    var seleccionar = '<input class="form-check-input cheks" name="checkSeleccionar" type="checkbox" value="' + data + '" id="checkSeleccionar">';
                    return '<center>' + seleccionar + '</center>';
                }

            },
            {
                data: "CodItem",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input type='number' min='0' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "VentaUnitaria",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VentaTotalSinIGV",
                render: function (data, type, row) {
                    var valor;
                    if (row.VentaTotalSinIGVDscto == null) {
                        if (data == null) {
                            valor = "";
                        }
                        else {
                            valor = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                        }
                    }
                    else {
                        valor = app.formatearEnteroComa(parseFloat(row.VentaTotalSinIGVDscto).toFixed(2));
                    };
                    return '<center>' + valor + '</center>';
                }
            },
            {
                data: "PorcentajeGanancia",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VentaTotalSinIGVConGanacia",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.EditarCotDetItem(' + data + ')"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + ver + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        };

        app.llenarTabla($tblDetalleCotizacion, data, columns, columnDefs, "#tblDetalleCotizacion", null, null, null);
    };

    function Regresar() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/InicializarDespacho";
        var obj = {
            Solicitud: $NumSol.val(),
            IdCotizacion: $IdCotizacion.val()
        };
        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaSolicitudesVentas/BandejaDespacho");
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Se presentó un error al tratar de acceder a la bandeja de despacho.");
            return;
        };

        app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallBack, fnFailCallBack);
    };

    function RemoverDetalle() {

    };

    function GuardarDetalle() {

    };


    function btnCheck() {
        $(document).on('change', '#checkSeleccionar', function (e) {
            if (this.checked) {
                detalleDespacho.xComprar.push(this.value);
            }
            else {
                detalleDespacho.xComprar = detalleDespacho.xComprar.filter(valor => valor != this.value);
            }
        });

        $(document).on('change', '#checkSeleccionarTodos', function (e) {
            if (this.checked) {
                $checkSeleccionar.prop('checked', true);
                $('input').filter('#checkSeleccionar').prop('checked', true);
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                var a = [];
                for (var i = 0; i < ids.length; i++) {
                    registroInstalacionTec.xasignar.push(ids[i].value);
                }
            }
            else {
                $('input').filter('#checkSeleccionar').prop('checked', false);
                registroInstalacionTec.xasignar = []
            }
        });
    }


    return {
    };
})(window.jQuery, window, document);