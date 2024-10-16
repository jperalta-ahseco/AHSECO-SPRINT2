var bandejaServicios = (function ($, win, doc) {
    /**Combos*/
    var $cmbTipoServicio = $("#cmbTipoServicio");
    var $cmbEquipo = $("#cmbEquipo");
    var $cmbModelo = $("#cmbModelo");
    var $cmbMarca = $("#cmbMarca");
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
        btnBuscarClick();
        $btnBuscar.click(btnBuscarClick);
        $btnExportar.click(btnExportarClick);
        $btnNuevo.click(btnNuevoClick);
    }
    function btnBuscarClick() {
        var method = "POST";
        var url = "BandejaServicios/ObtenerServicios";
        var objServicio = {
            CodigoServicio:0,
            CodigoEquipo: $cmbEquipo.val() == '' ? '' : $cmbEquipo.val(),
            CodigoMarca: $cmbMarca.val() == '' ? '' : $cmbMarca.val(),
            Modelo: $cmbModelo.val() == '' ? '' : $cmbModelo.val(),
            Estado: $cmbEstado.val() == '' ? '' : $cmbEstado.val(),
            TipoServicio: $cmbTipoServicio.val() == '' ? '' : $cmbTipoServicio.val()
        }
        var data = JSON.stringify(objServicio);
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function () {
            app.message.error("Búsqueda","La búsqueda no encontró resultados.")
        }
        return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoServicio);
    }
    function cargarTabla(data) {
        var columns = [
            { data:"CodigoServicio"},
            { data: "Equipo" }, 
            { data: "Modelo" },
            { data: "Marca" },
            {
                data: "PrecioPreventivo",
                render: function (data) {
                    return "S/." + data
                }
            },
            {
                data: "PrecioCapacitacion",
                render: function (data) {
                    return "S/." + data
                }    
            },
            { data: "TipoServicio"},
            { data: "Estado"},
            {
                data: "CodigoServicio",
                render: function (data, type, row) {
                    var editar = '<a class="btn btn-default btn-xs" title="Editar" href="javascript:bandejaServicios.editar('
                        + "'" + row.CodigoServicio + "'" + ","
                        + "'" + row.Equipo + "'" + ","
                        + "'" + row.Marca + "'" + ","
                        + "'" + row.Modelo + "'" + ","
                        + "'" + row.Estado + "'" + ","
                        + "'" + row.PrecioPreventivo + "'" + ","
                        + "'" + row.PrecioCapacitacion + "'" + ","
                        + "'" + (row.PrecioActualizacion || '') + "'" + ","
                        + "'" + (row.Instrumentos || '') + "'" + ","
                        + "'" + (row.Herramientas || '') + "'" + ","
                        + "'" + (row.HerramientasEspeciales || '') + "'" +
                        ')"><i class="fa fa-pencil-square-o" aria-hidden=true></i></a>';
                    var ver = '<a class="btn btn-info btn-xs" title="Ver" href="javascript:bandejaServicios.ver('
                        + "'" + row.CodigoServicio + "'" + ","
                        + "'" + row.Equipo + "'" + ","
                        + "'" + row.Marca + "'" + ","
                        + "'" + row.Modelo + "'" + ","
                        + "'" + row.Estado + "'" + ","
                        + "'" + row.PrecioPreventivo + "'" + ","
                        + "'" + row.PrecioCapacitacion + "'" + ","
                        + "'" + (row.PrecioActualizacion || '') + "'" + ","
                        + "'" + (row.Instrumentos || '') + "'" + ","
                        + "'" + (row.Herramientas || '') + "'" + ","
                        + "'" + (row.HerramientasEspeciales || '') + "'" +
                        ')"><i class="fa fa-eye" aria-hidden=true></i></a>';
                    return '<center>' + editar + ' '+ ver +'</center>';
                   
                }
            }
        ]
        var columnDefs =
        {
            targets: [0],
            visible: false
        }
        var filters =
        {
            dataTableSearching: false,
            dataTablePageLength: 10
        }
        app.llenarTabla($tblServicio, data, columns, columnDefs, "#tblServicio", null, null, filters);
    }
    function editar(codigoServicio, equipo, marca, modelo, estado, precioPreventivo, precioCapacitacion, precioActualizacion, instrumentos, herramientas, herramientasEspeciales) {
        var method = "POST";
        var url = "BandejaServicios/ObtenerServiciosDos";
        var objServicio = {
            TipoProceso:"U",
            CodigoServicio: codigoServicio,
            Equipo: equipo == '' ? '' : equipo,
            Marca: marca == '' ? '' : marca,
            Modelo: modelo,
            Estado: estado == '' ? '' : estado,
            PrecioPreventivo: precioPreventivo,
            PrecioCapacitacion: precioCapacitacion,
            PrecioActualizacion: precioActualizacion,
            Instrumentos: instrumentos,
            Herramientas: herramientas,
            HerramientasEspeciales: herramientasEspeciales
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
    function ver(codigoServicio, equipo, marca, modelo, estado, precioPreventivo, precioCapacitacion, precioActualizacion, instrumentos, herramientas, herramientasEspeciales) {
        var method = "POST";
        var url = "BandejaServicios/ObtenerServiciosDos";
        var objServicio = {
            TipoProceso:"V",
            CodigoServicio: codigoServicio,
            Equipo: equipo == '' ? '' : equipo,
            Marca: marca == '' ? '' : marca,
            Modelo: modelo,
            Estado: estado == '' ? '' : estado,
            PrecioPreventivo: precioPreventivo,
            PrecioCapacitacion: precioCapacitacion,
            PrecioActualizacion: precioActualizacion,
            Instrumentos: instrumentos,
            Herramientas: herramientas,
            HerramientasEspeciales: herramientasEspeciales
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
    function btnExportarClick() {
        var self = $(this);
        var href = self.attr('href');
        var cant = $tblServicio.DataTable().rows().length;

        if (cant === 0) {
            app.message.error("Reporte de Servicios", "La búsqueda no produjo resultados.", "Aceptar");
            return false;
        }
        $("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoServicio", value: null }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoEquipo", value: $cmbEquipo.val() == '' ? '' : $cmbEquipo.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Marca", value: $cmbMarca.val() == '' ? '' : $cmbMarca.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Modelo", value: $txtModelo.val().trim() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbEstado.val() == '' ? '' : $cmbEstado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoServicio", value: $cmbEquipo.val() == '' ? '' : $cmbEquipo.val() }).appendTo("#hidden_fields");
        $formServicio.attr('action', href);
        $formServicio.submit();
    }
    function btnNuevoClick() {
        var method = "POST";
        var url = "BandejaServicios/ObtenerServiciosDos";
        var objServicio = {
            TipoProceso:"",
            CodigoServicio: 0,
            Equipo: '',
            Marca:'',
            Modelo: '',
            Estado: '',
            PrecioPreventivo: '',
            PrecioCapacitacion: '',
            PrecioActualizacion: '',
            Instrumentos: '',
            Herramientas: '',
            HerramientasEspeciales: ''
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
    return {
        editar: editar,
        ver:ver
    }
})(window.jQuery, window, document);