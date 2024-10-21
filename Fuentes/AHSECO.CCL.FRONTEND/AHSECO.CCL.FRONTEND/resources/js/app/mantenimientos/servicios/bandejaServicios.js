var bandejaServicios = (function ($, win, doc) {
    /**Combos*/
    var $cmbTipoServicio = $("#cmbTipoServicio");
    var $cmbEquipo = $("#cmbEquipo");
    var $txtModelo = $("#txtModelo");
    var $txtMarca = $("#txtMarca");
    var $cmbEstado = $("#cmbEstado");
    /**Tablas*/
    var $tblServicio = $("#tblServicio");
    /**Botones*/
    var $btnBuscar = $("#btnBuscar");
    var $btnExportar = $("#btnExportar");
    var $btnNuevo = $("#btnNuevo");

    var $formServicio = $("#formServicio");
    
    var mensajes = {
        obteniendoServicio: "Buscando Servicios, porfavor espere...",
        redirigirPagina:"Redirigiendo a Editar Servicio, porfavor espere..."
    }
    $(Initializer)
    function Initializer() {
        CargarCombos();
        cargarEstados();
        btnBuscarClick();
        $btnBuscar.click(btnBuscarClick);
        $btnExportar.click(btnExportarClick);
        $btnNuevo.click(btnNuevoClick);
    }
    function cargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";

        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "--Todos--";
            filters.allowClear = false;
            app.llenarComboMultiResult($cmbEstado, data.Result, null, " ", "--Todos--", filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    };
    function CargarCombos() {
        method = "POST";
        url = "BandejaServicios/FiltroServicios"
        obj = []
        opjParam = JSON.stringify(obj);

        var fnDoneCallBack = function (data) {
            var filters = {};
            filters.placeholder = "--Todos--";
            filters.allowClear = false;
            app.llenarComboMultiResult($cmbEquipo, data.Result.Equipos, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbTipoServicio, data.Result.TipServicio, null, 0, "--Todos--", filters);

        };
        var fnFailCallBack = function () {
            app.message.error("Sistema", "Ocurrió un error al realizar la carga de los filtros");
        };

        app.llamarAjax(method, url, opjParam, fnDoneCallBack, fnFailCallBack, null, mensajes.ObteniendoFiltros);
    };

    function btnBuscarClick() {
        var method = "POST";
        var url = "BandejaServicios/ObtenerServicios";
        var objServicio = {
            CodigoServicio:0,
            CodEquipo: $cmbEquipo.val() == '' ? '' : $cmbEquipo.val(),
            Marca: $txtMarca.val() == '' ? '' : $txtMarca.val(),
            Modelo: $txtModelo.val() == '' ? '' : $txtModelo.val(),
            Estado: $cmbEstado.val() == ' ' ? ' ' : $cmbEstado.val(),
            TipoServicio: $cmbTipoServicio.val() == "0" ? '' : $cmbTipoServicio.val()
        }
        var data = JSON.stringify(objServicio);
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        };
        var fnFailCallback = function () {
            app.message.error("Búsqueda", "La búsqueda no encontró resultados.")
        };
        return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoServicio);
    }
    function cargarTabla(data) {
        var columns = [
            { data:"CodigoServicio"},
            { data: "Equipo" },
            { data: "Modelo" },
            { data: "Marca" },
            {
                data: "PrecioActualizacion",
                render: function (data) {
                    return "S/." + data.toFixed(2)
                }
            },
            {
                data: "PrecioPreventivo",
                render: function (data) {
                    return "S/." + data.toFixed(2)
                }
            },
            {
                data: "PrecioCapacitacion",
                render: function (data) {
                    return "S/." + data.toFixed(2)
                }    
            },
            { data: "TipoServicio"},
            {
                data: "Estado",
                render: function (data, type, row) {
                    if (data == "0") {
                        return '<center>Inactivo</center>'
                    }
                    else if (data == "1") {
                        return '<center>Activo</center>'
                    }
                }
            },
            {
                data: "CodigoServicio",
                render: function (data, type, row) {
                    var editar = '<a class="btn btn-default btn-xs" title="Editar" href="javascript:bandejaServicios.editar('+ "'" + row.CodigoServicio + "'" +')"><i class="fa fa-pencil-square-o" aria-hidden=true></i></a>';
                    var ver = '<a class="btn btn-info btn-xs" title="Ver" href="javascript:bandejaServicios.ver('+ "'" + row.CodigoServicio + "'" +')"><i class="fa fa-eye" aria-hidden=true></i></a>';
                    return '<center>' + editar + ' '+ ver +'</center>';
                   
                }
            }
        ]
        var columnDefs =
        {
            targets: [],
            visible: false
        }
        var filters =
        {
            dataTableSearching: false,
            dataTablePageLength: 10
        }
        app.llenarTabla($tblServicio, data, columns, columnDefs, "#tblServicio", null, null, filters);
    }
    function editar(codigoServicio) {
        var method = "POST";
        var url = "BandejaServicios/SetDatosServicios";
        var objServicio = {
            tipoProceso:"U",
            codServicio: codigoServicio
        }
        var data = JSON.stringify(objServicio);
        var fnDoneCallback = function () {
            app.redirectTo("BandejaServicios/RegistroServicio");
        }
        var fnFailCallback = function (Mensaje) {
            app.message.error("Validación", Mensaje);
            return;
        }
        return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, null);
    }
    function ver(codigoServicio) {
        var method = "POST";
        var url = "BandejaServicios/SetDatosServicios";
        var objServicio = {
            tipoProceso:"V",
            codServicio: codigoServicio
        }
        var data = JSON.stringify(objServicio);
        var fnDoneCallback = function () {
            app.redirectTo("BandejaServicios/RegistroServicio");
        }
        var fnFailCallback = function (Mensaje) {
            app.message.error("Validación", Mensaje);
            return;
        }
        return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, null);
    }
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr("href");
        e.preventDefault();


        var cant = $tblServicio.DataTable().rows().length;

        if (cant === 0) {
            app.message.error("Reporte de Servicios", "La búsqueda no produjo resultados.", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoServicio", value: null }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodEquipo", value: $cmbEquipo.val() == '' ? '' : $cmbEquipo.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Marca", value: $txtMarca.val() == '' ? '' : $txtMarca.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Modelo", value: $txtModelo.val().trim() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbEstado.val() == '' ? '' : $cmbEstado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoServicio", value: $cmbEquipo.val() == '0' ? '' : $cmbEquipo.val() }).appendTo("#hidden_fields");
        $formServicio.attr('action', href);
        $formServicio.submit();
    }
    function btnNuevoClick() {
        app.redirectTo("BandejaServicios/RegistroServicio");
    }
    return {
        editar: editar,
        ver:ver
    }
})(window.jQuery, window, document);