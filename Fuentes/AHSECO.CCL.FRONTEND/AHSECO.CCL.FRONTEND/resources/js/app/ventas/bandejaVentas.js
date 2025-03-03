var bandejaVentas = (function ($, win, doc) {
    /***/
    var $CodUsuario = $("#CodUsuario");
    var $txtRuc = $("#txtRuc");
    var $txtNomEmpresa = $("#txtNomEmpresa");

    var $CodEmpleado = $("#CodEmpleado");

    var $tblSolicitudes = $("#tblSolicitudes");
    var $formFiltroSolicitudes = $("#formFiltroSolicitudes");
    var $btnBuscar = $("#btnBuscar");
    var $btnExportar = $("#btnExportar");

    var $cmbAsesor = $("#cmbAsesor");

    var $cmbTipoVenta = $("#cmbTipoVenta");
    var $cmbTipoSolicitud = $("#cmbTipoSolicitud");
    var $cmbEmpresa = $("#cmbEmpresa");
    var $cmbFormaPago = $("#cmbFormaPago");
    var $cmbMoneda = $("#cmbMoneda");
    var $cmbEstado = $("#cmbEstado");
    var $cmbGarantia = $("#cmbGarantia");
    var $cmbFlujo = $("#cmbFlujo");

    var $txtNroSol = $("#txtNroSol");
    var $dateFechaIniSol = $("#dateFechaIniSol");
    var $dateFechaFinSol = $("#dateFechaFinSol");
    var $txtRuc = $("#txtRuc");
    var $txtNombreCliente = $("#txtNombreCliente");
    var $txtNombreVendedor = $("#txtNombreVendedor");
    var $txtNombreEquipo = $("#txtNombreEquipo");
    var $txtNumeroOrden = $("#txtNumeroOrden");
    var $txtNumeroProceso = $("#txtNumeroProceso");
    var $txtNumeroContrato = $("#txtNumeroContrato");
    var $txtNroFianzaPP = $("#txtNroFianzaPP");

    var $txtNroFianzaPA = $("#txtNroFianzaPA");
    var $RolUsuario = $("#RolUsuario");
    var $chkGestion = $("#chkGestion");
    var $openRegdateFechaIniSol = $("#openRegdateFechaIniSol");
    var $openRegdateFechaFinSol = $("#openRegdateFechaFinSol");
    var $LimpiardateFechaIniSol = $("#LimpiardateFechaIniSol");
    var $LimpiardateFechaFinSol = $("#LimpiardateFechaFinSol");

    var $btnNuevo = $("#btnNuevo");

    /*Mensajes*/
    var mensajes = {
        cargandoClientes: "Cargando los clientes del asesor, por favor espere...",
        cargandoFiltroSolicitudes: "Cargando filtros de la bandeja de solicitudes, por favor espere...",
        buscandoSolicitudes: "Buscando resultado de la bandeja de solicitudes, por favor espere..."
    };


    $(Initialize);

    function Initialize() {

        $btnBuscar.click(BuscarSolicitudes);
        $btnExportar.click(btnExportarClick);
        $chkGestion.click(chkGestionClick);
        $LimpiardateFechaIniSol.click(LimpiardateFechaIniSolClick);
        $LimpiardateFechaFinSol.click(LimpiardateFechaFinSolClick);
        $btnNuevo.click(btnNuevoClick);

        $dateFechaIniSol.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFechaFinSol.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });


        CargarCombosFiltros();

        BuscarSolicitudes();

        setInterval(function () {
            refrescar();
        },60000);
    }

    function btnNuevoClick() {
        app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
    };

    function LimpiardateFechaIniSolClick() {
        $dateFechaIniSol.val('');
    }

    function LimpiardateFechaFinSolClick() {
        $dateFechaFinSol.val('');
    }

    function chkGestionClick() {
        $dateFechaIniSol.val('');
        $dateFechaFinSol.val('');
        $cmbTipoVenta.val('').trigger("change");
        $cmbTipoSolicitud.val('').trigger("change");
        $txtRuc.val('');
        $txtNombreCliente.val('');
        $txtNombreVendedor.val('');
        $cmbEmpresa.val('').trigger("change");
        $txtNombreEquipo.val('');
        $cmbFormaPago.val('').trigger("change");
        $cmbMoneda.val('').trigger("change");
        $cmbEstado.val('').trigger("change");
        $txtNumeroOrden.val('');
        $txtNumeroProceso.val('');
        $txtNumeroContrato.val('');
        $cmbGarantia.val('').trigger("change");
        $txtNroSol.val('');
        $txtNroFianzaPP.val('');
        $txtNroFianzaPA.val('');
        $cmbFlujo.val('').trigger("change");

        if ($chkGestion.prop('checked')) {
            $dateFechaIniSol.prop('disabled', true);
            $openRegdateFechaIniSol.prop('disabled', true);
            $dateFechaFinSol.prop('disabled', true);
            $openRegdateFechaFinSol.prop('disabled', true);
            $cmbTipoVenta.prop('disabled', true);
            $cmbTipoSolicitud.prop('disabled', true);
            $txtRuc.prop('disabled', true);
            $txtNombreCliente.prop('disabled', true);
            $txtNombreVendedor.prop('disabled', true);
            $cmbEmpresa.prop('disabled', true);
            $txtNombreEquipo.prop('disabled', true);
            $cmbFormaPago.prop('disabled', true);
            $cmbMoneda.prop('disabled', true);
            $cmbEstado.prop('disabled', true);
            $txtNumeroOrden.prop('disabled', true);
            $txtNumeroProceso.prop('disabled', true);
            $txtNumeroContrato.prop('disabled', true);
            $cmbGarantia.prop('disabled', true);
            $txtNroSol.prop('disabled', true);
            $txtNroFianzaPP.prop('disabled', true);
            $txtNroFianzaPA.prop('disabled', true);
            $cmbFlujo.prop('disabled', true);
        } else {

            $dateFechaIniSol.prop('disabled', false);
            $openRegdateFechaIniSol.prop('disabled', false);
            $dateFechaFinSol.prop('disabled', false);
            $openRegdateFechaFinSol.prop('disabled', false);
            $cmbTipoVenta.prop('disabled', false);
            $cmbTipoSolicitud.prop('disabled', false);
            $txtRuc.prop('disabled', false);
            $txtNombreCliente.prop('disabled', false);
            $txtNombreVendedor.prop('disabled', false);
            $cmbEmpresa.prop('disabled', false);
            $txtNombreEquipo.prop('disabled', false);
            $cmbFormaPago.prop('disabled', false);
            $cmbMoneda.prop('disabled', false);
            $cmbEstado.prop('disabled', false);
            $txtNumeroOrden.prop('disabled', false);
            $txtNumeroProceso.prop('disabled', false);
            $txtNumeroContrato.prop('disabled', false);
            $cmbGarantia.prop('disabled', false);
            $txtNroSol.prop('disabled', false);
            $txtNroFianzaPP.prop('disabled', false);
            $txtNroFianzaPA.prop('disabled', false);
            $cmbFlujo.prop('disabled', false);
        }
    }

    function btnExportarClick(e) {

        var codSolicitud = $txtNroSol.val();
        var codFlujo = $cmbFlujo.val();
        var fechaIniSol = $dateFechaIniSol.val();
        var fechaFinSol = $dateFechaFinSol.val();
        var codTipoVenta = $cmbTipoVenta.val();
        var codTipoSol = $cmbTipoSolicitud.val();
        var rucCliente = $txtRuc.val();
        var nombreCliente = $txtNombreCliente.val();
        var nombreVendedor = $txtNombreVendedor.val();
        var codEmpresa = $cmbEmpresa.val();
        var codEstado = $cmbEstado.val();
        var nombreContacto = $txtNombreEquipo.val();
        var codFormaPago= $cmbFormaPago.val();
        var codMoneda = $cmbMoneda.val();
        var codGarantia = $cmbGarantia.val();
        var nroOrden = $txtNumeroOrden.val();          
        var nroProceso = $txtNumeroProceso.val();
        var numContrato = $txtNumeroContrato.val();
        var numFianzaPP = $txtNroFianzaPP.val();
        var numFianzaPA = $txtNroFianzaPA.val();
        var rolUsuario = $RolUsuario.val();

        var flagGerencia = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_GERENTE") {
            flagGerencia = "S";
        }

        var flagLogistica = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_LOGISTICA") {
            flagLogistica = "S";
        }

        var flagCosteo = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_COSTOS") {
            flagCosteo = "S";
        }

        var flagServTec = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_SERVICIOTECNICO") {
            flagServTec = "S";
        }

        var flagImportacion = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_IMPORTACION") {
            flagImportacion = "S";
        }

        var flagFacturacion = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_FACTURA") {
            flagFacturacion = "S";
        } 


        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblSolicitudes.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Solicitudes", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }

        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoSolicitud", value: codSolicitud == "" ? "0" : codSolicitud }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoFlujo", value: codFlujo == "" || codFlujo == null? "0" : codFlujo }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaInicioSol", value: fechaIniSol == "" ? "" : fechaIniSol.toString().replace("/", "") }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaFinSol", value: fechaFinSol == "" ? "" : fechaFinSol.toString().replace("/", "") }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoTipoVenta", value: codTipoVenta == "" ? "" : codTipoVenta }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoTipoSol", value: codTipoSol == "" ? "" : codTipoSol }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "RucCliente", value: rucCliente == "" ? "" : rucCliente }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreCliente", value: nombreCliente }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreVendedor", value: nombreVendedor }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoEmpresa", value: codEmpresa == "" ? "" : codEmpresa }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoEstado", value: codEstado == "" ? "" : codEstado }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreContacto", value: nombreContacto == "" ? "" : nombreContacto }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoFormaPago", value: codFormaPago == "" ? "" : codFormaPago }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoMoneda", value: codMoneda == "" ? "" : codMoneda }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoGarantia", value: codGarantia == "" ? "" : codGarantia }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NroOrden", value: nroOrden == "" ? "" : nroOrden }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NroProceso", value: nroProceso == "" ? "" : nroProceso }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumeroContrato", value: numContrato == "" ? "" : numContrato }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumFianzaPP", value: numFianzaPP == "" ? "" : numFianzaPP }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumFianzaPA", value: numFianzaPA == "" ? "" : numFianzaPA }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FlagGerencia", value: flagGerencia == "" ? "" : flagGerencia }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FlagLogistica", value: flagLogistica == "" ? "" : flagLogistica }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FlagCosteo", value: flagCosteo == "" ? "" : flagCosteo }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FlagServTec", value: flagServTec == "" ? "" : flagServTec }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FlagImportacion", value: flagImportacion == "" ? "" : flagImportacion }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FlagFacturacion", value: flagFacturacion == "" ? "" : flagFacturacion }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "RolUsuario", value: rolUsuario == "" ? "" : rolUsuario }).appendTo("#hidden_fields");


        $formFiltroSolicitudes.attr('action', href);
        $formFiltroSolicitudes.submit();

    }

    function CargarCombosFiltros() {
        var m = "POST";
        var url = "BandejaVentas/GrupoBandejaSolicitudesFiltro";
        var objParam = '';
        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            
            app.llenarComboMultiResult($cmbTipoVenta, data.Result.TipoVentas, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbTipoSolicitud, data.Result.TipoSolicitudes, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbEmpresa, data.Result.Empresas, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbFormaPago, data.Result.FormaPagos, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbMoneda, data.Result.Monedas, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbGarantia, data.Result.Garantias, null, " ", "-- Todos --", filters);
            app.llenarComboMultiResult($cmbFlujo, data.Result.Flujos, null, " ", "-- Todos --", filters);

            var rol = $RolUsuario.val();
            if (rol == "SGI_VENTA_ASESOR" || 
                rol == "SGI_VENTA_JEFE" || rol == "SGI_VENTA_COORDINAVENTA") {
                    $('#cmbTipoSolicitud option[value="TSOL01"]').remove();
                    $('#cmbTipoSolicitud option[value="TSOL02"]').remove();
                    $('#cmbTipoSolicitud option[value="TSOL03"]').remove();
                    $('#cmbFlujo option[value="2"]').remove();
                }
                if (rol == "SGI_VENTA_COORDINASERV" || rol == "SGI_VENTA_COORDINAATC") {
                    $('#cmbTipoSolicitud option[value="TSOL04"]').remove();
                    $('#cmbTipoSolicitud option[value="TSOL05"]').remove();
                    $('#cmbFlujo option[value="1"]').remove();
                }


        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.cargandoFiltroSolicitudes);
    }


    function BuscarSolicitudes() {

        if ($dateFechaIniSol.val() != "" && $dateFechaFinSol.val() === "") {
            app.message.error("Validacion", "Debe seleccionar la fecha final de la búsqueda");
            return;
        }

        if ($dateFechaIniSol.val() === "" && $dateFechaFinSol.val() != "") {
            app.message.error("Validacion", "Debe seleccionar la fecha inicial de la búsqueda");
            return;
        }

        var fecIni = app.stringToDate($dateFechaIniSol.val());
        var fecFin = app.stringToDate($dateFechaFinSol.val());

        if (fecIni > fecFin) {
            app.message.error("Validacion", "La fecha Inicial no puede ser mayor a la fecha Final del registro");
            return;
        }

        var flag_gerencia = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_GERENTE") {
            flag_gerencia = "S";
        } 

        var flag_logistica = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_LOGISTICA") {
            flag_logistica = "S";
        } 

        var flag_costeo = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_COSTOS") {
            flag_costeo = "S";
        } 

        var flag_servTec = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_SERVICIOTECNICO") {
            flag_servTec = "S";
        } 

        var flag_Import = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_IMPORTACION") {
            flag_Import = "S";
        } 

        var flag_Facturacion = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_FACTURA") {
            flag_Facturacion = "S";
        } 

        var m = "POST";
        var url = "BandejaVentas/ConsultaBandejaSolicitudes";
        var objParam = '';
        objBuscar = {
            CodigoSolicitud: $txtNroSol.val(),
            CodigoFlujo: $cmbFlujo.val() == null || $cmbFlujo.val() == "" ? 0 : $cmbFlujo.val(),
            FechaInicioSol: $dateFechaIniSol.val() == null ? "" : $dateFechaIniSol.val(),
            FechaFinSol: $dateFechaFinSol.val() == null ? "" : $dateFechaFinSol.val(),
            CodigoTipoVenta: $cmbTipoVenta.val(),
            CodigoTipoSol: $cmbTipoSolicitud.val(),
            RucCliente: $txtRuc.val(),
            NombreCliente: $txtNombreCliente.val(),
            NombreVendedor: $txtNombreVendedor.val(),
            CodigoEmpresa: $cmbEmpresa.val(),
            CodigoEstado: $cmbEstado.val(),
            NombreEquipo: $txtNombreEquipo.val(),
            CodigoFormaPago: $cmbFormaPago.val(),
            CodigoMoneda: $cmbMoneda.val(),
            CodigoGarantia: $cmbGarantia.val(),
            NroOrden: $txtNumeroOrden.val(),
            NroProceso: $txtNumeroProceso.val(),
            NumeroContrato: $txtNumeroContrato.val(),
            NumFianzaPP: $txtNroFianzaPP.val(),
            NumFianzaPA: $txtNroFianzaPA.val(),
            FlagGerencia: flag_gerencia,
            FlagLogistica: flag_logistica,
            FlagCosteo: flag_costeo,
            FlagServTec: flag_servTec,
            FlagImportacion: flag_Import,
            FlagFacturacion: flag_Facturacion,
            RolUsuario: $RolUsuario.val(),
        };

        objParam = JSON.stringify(objBuscar);
        var fnDoneCallback = function (data) {

            cargarTabla(data);

        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.buscandoSolicitudes);
    }
    function refrescar() {

        var flag_gerencia = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_GERENTE") {
            flag_gerencia = "S";
        }

        var flag_logistica = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_LOGISTICA") {
            flag_logistica = "S";
        }

        var flag_costeo = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_COSTOS") {
            flag_costeo = "S";
        }

        var flag_servTec = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_SERVICIOTECNICO") {
            flag_servTec = "S";
        }

        var flag_Import = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_IMPORTACION") {
            flag_Import = "S";
        }

        var flag_Facturacion = "N";
        if ($chkGestion.prop('checked') && $RolUsuario.val() === "SGI_VENTA_FACTURA") {
            flag_Facturacion = "S";
        } 


        var baseUrl = baseSiteUrl;
        method = "POST";
        url = "BandejaVentas/ConsultaBandejaSolicitudes";

        objBuscar = {
            CodigoSolicitud: $txtNroSol.val(),
            CodigoFlujo: $cmbFlujo.val() == null || $cmbFlujo.val() == "" ? 0 : $cmbFlujo.val(),
            FechaInicioSol: $dateFechaIniSol.val(),
            FechaFinSol: $dateFechaFinSol.val(),
            CodigoTipoVenta: $cmbTipoVenta.val(),
            CodigoTipoSol: $cmbTipoSolicitud.val(),
            RucCliente: $txtRuc.val(),
            NombreCliente: $txtNombreCliente.val(),
            NombreVendedor: $txtNombreVendedor.val(),
            CodigoEmpresa: $cmbEmpresa.val(),
            CodigoEstado: $cmbEstado.val(),
            NombreContacto: $txtNombreEquipo.val(),
            CodigoFormaPago: $cmbFormaPago.val(),
            CodigoMoneda: $cmbMoneda.val(),
            CodigoGarantia: $cmbGarantia.val(),
            NroOrden: $txtNumeroOrden.val(),
            NroProceso: $txtNumeroProceso.val(),
            NumeroContrato: $txtNumeroContrato.val(),
            NumFianzaPP: $txtNroFianzaPP.val(),
            NumFianzaPA: $txtNroFianzaPA.val(),
            FlagGerencia: flag_gerencia,
            FlagLogistica: flag_logistica,
            FlagCosteo: flag_costeo,
            FlagServTec: flag_servTec,
            FlagImportacion: flag_Import,
            FlagFacturacion: flag_Facturacion,
            RolUsuario: $RolUsuario.val(),
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
                app.message.error("Error", data.CurrentException, "Aceptar", null);
            }
        }).fail(function (jqXhr, textStatus, errorThrow) {
            message.error("Error inesperado", errorThrow, "Aceptar", null);
        }).always(function () {

            if (typeof (fnAlwaysCallback) !== "undefined" && fnAlwaysCallback != null) {
                fnAlwaysCallback();
            }
        });
    }


    function solicitud(id, nomEmpresa, numRUC) {

        method = "POST";
        url = "BandejaVentas/InicializaDetalle";

        objCliente = {
            nomEmpresa: nomEmpresa,
            ID: id,
            RUC: numRUC
        }

        objParam = JSON.stringify(objCliente)

        var fnDoneCallBack = function (data) {
            app.redirectTo("BandejaSolicitudesVentas");
        };

        var fnFailCallBack = function () {
        };

        app.mostrarLoading();
        app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }

    function cargarTabla(data) {
      
            var columns = [
                {
                    data: "NumeroSolicitud",
                    render: function (data, type, row) {
                        return '<center><span title="N° Orden Compra: ' + row.NumOrden + ' N° Contrato: ' + row.NumContrato + '">' + data + '</span></center>';
                    }
                },
                {
                    data: "NombreFlujo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "FechaSolicitud",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "TipoVenta",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "TipoSolicitud",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "NombreCliente",
                    render: function (data, type, row) {
                        var celda = row.NombreCliente + ' Sede: ' + row.NomSede
                        return '<center><span title="Ruc: ' + row.RucEmpresa + ' Contacto: ' + row.NombreContacto + '">' + celda + '</span></center>';
                    }
                },
                {
                    data: "NombreVendedor",
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
                    data: "NumeroSolicitud",
                    render: function (data, type, row) {

                        var detalle = "'" + row.IdWorkFlow + "','" + row.IdSolicitud + "','" + row.IdEstado + "','" + row.NombreEstado + "','" + row.EstadoAbreviado + "','" + row.CodigoTipoSolicitud + "','" + row.CodigoFlujo + "','" + row.IdCliente + "','" + row.NombreCliente + "','" + row.RucEmpresa + "'";
                        var detalle_finalizar = "'" + row.IdSolicitud + "'";

                        var finalizar = "";
                        if (row.IdEstado === "VTPG" && ($RolUsuario.val() === "SGI_VENTA_ASESOR" || $RolUsuario.val() === "SGI_VENTA_COORDINASERV" || $RolUsuario.val() === "SGI_VENTA_COORDINAATC")) {
                            finalizar = '<a id="btnFinalizar" class="btn btn-danger btn-xs" title="Finalizar" href="javascript: bandejaVentas.finalizar(' + detalle_finalizar + ')"><i class="fa fa-check-square" aria-hidden="true"></i> Finalizar</a>';
                        }

                        var seleccionar = '<a id="btnSeleccionar" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: bandejaVentas.seleccionar(' + detalle + ')"><i class="fa fa-book" aria-hidden="true"></i> Ver Solicitud</a>';
                        var despacho = "";
                        if (row.IdEstado === "CAPR" || row.IdEstado === "PRVT" || row.IdEstado === "VTPG" || row.IdEstado === "SFIN") {
                            despacho = '<a id="btnDespacho" class="btn btn-primary btn-xs" title="Despacho" href="javascript: bandejaVentas.despachar(' + "'" + row.IdSolicitud + "','" + (row.NumeroCotizacion != null ? row.NumeroCotizacion.substring(row.NumeroCotizacion.indexOf('-') + 1, row.NumeroCotizacion.length) : 0) + "'" + ')"><i class="fa fa-usd" aria-hidden="true"></i> Despacho</a>';
                        }

                        return '<center>' + seleccionar + '</center>' + '\n \n' + '<center>' + despacho + '</center>' + '\n \n' + '<center>' + finalizar + '</center>';
                    }
                }
            ];
        


        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];

        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 10;
        app.llenarTabla($tblSolicitudes, data, columns, columnDefs, "#tblSolicitudes", null, null, filters);

    }

    function seleccionar(idWorkFlow, nomSolicitud, estadoSol, nomEstado, abrevEstado, tipoSol, idflujo, idCliente,nombreEmpresa,Ruc) {

        method = "POST"
        url = "BandejaSolicitudesVentas/ObtenerDetallexSolicitud";
        var objResponse = {
            Id_WorkFlow: idWorkFlow,
            Id_Solicitud: nomSolicitud,
            IdCliente:idCliente,
            Estado: estadoSol,
            nomEstado: nomEstado,
            abrevEstado: abrevEstado,
            Tipo_Sol: tipoSol,
            Id_Flujo: idflujo,
            RUC: Ruc,
            RazonSocial: nombreEmpresa
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

    function despachar(idSolicitud, idCotizacion) {

        var method = "POST";
        var url = "BandejaSolicitudesVentas/InicializarDespacho";
        var obj = {
            Solicitud: idSolicitud,
            IdCotizacion: idCotizacion
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

    function finalizar(idSolicitud) {
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/FinalizarVenta";
            var obj = {
                CodigoSolicitud: idSolicitud
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {


                    location.reload();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.FinalizandoVenta);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea finalizar la venta?", "S&iacute;", "No", fnSi, null);

    };

    return {
        solicitud: solicitud,
        seleccionar: seleccionar,
        despachar: despachar,
        finalizar: finalizar
    };
})(window.jQuery, window, document);