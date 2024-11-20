var cotvtacostos = (function ($, win, doc) {

    var $estadoSol = $('#estadoSol');
    var $idCotizacion = $("#idCotizacion");
    var $idRolUsuario = $("#idRolUsuario");
    var $idWorkFlow = $("#idWorkFlow");
    var $RolVenta_Asesor = $("#RolVenta_Asesor");
    var $RolVenta_Jefe = $("#RolVenta_Jefe");
    var $RolVenta_Coordinadora = $("#RolVenta_Coordinadora");
    var $RolVenta_ServTecnio = $("#RolVenta_ServTecnio");
    var $RolVenta_Gerente = $("#RolVenta_Gerente");
    var $RolVenta_Importacion = $("#RolVenta_Importacion");
    var $RolVenta_Costos = $("#RolVenta_Costos");
    var $RolVenta_Logistica = $("#RolVenta_Logistica");
    var $HabilitarValorizacionCotDet = $("#HabilitarValorizacionCotDet");
    var $EsCotizacionValorizada = $("#EsCotizacionValorizada");

    var $CI_CodCosto_LLaveMano = $("#CI_CodCosto_LLaveMano");
    var $CI_CodCosto_InstCapa = $("#CI_CodCosto_InstCapa");
    var $CI_CodCosto_Manuales = $("#CI_CodCosto_Manuales");
    var $CI_CodCosto_Videos = $("#CI_CodCosto_Videos");
    var $CI_CodCosto_MantPrevent = $("#CI_CodCosto_MantPrevent");
    var $CI_CodCosto_GarantAdic = $("#CI_CodCosto_GarantAdic");
    var $CI_CodCosto_Calibra = $("#CI_CodCosto_Calibra");
    var $CI_CodCosto_Flete = $("#CI_CodCosto_Flete");

    var $btnAC_Insta = $("#btnAC_Insta");
    var $btnAC_MantPrevent = $("#btnAC_MantPrevent");
    var $btnAC_LLaveMano = $("#btnAC_LLaveMano");
    var $btnAC_Manual = $("#btnAC_Manual");
    var $btnAC_Video = $("#btnAC_Video");
    var $btnAC_GarantAdic = $("#btnAC_GarantAdic");
    var $btnAC_Calib = $("#btnAC_Calib");
    var $btnAC_Flete = $("#btnAC_Flete");

    var $pnlInfoGeneral = $("#pnlInfoGeneral");
    var $pnlInfoDestino = $("#pnlInfoDestino");
    var $pnlInfoCostos = $("#pnlInfoCostos");
    var $pnlInfoCostos_MtoUnitario = $("#pnlInfoCostos_MtoUnitario");
    var $pnlInfoCostos_MtoTotal = $("#pnlInfoCostos_MtoTotal");
    var $pnlInfoPreventivos = $("#pnlInfoPreventivos");

    var $CI_hdnIdCotDetCosto = $("#CI_hdnIdCotDetCosto");
    var $CI_hdnCodCosto = $("#CI_hdnCodCosto");
    var $CI_cmbCDItem = $("#CI_cmbCDItem");
    var $CI_txtCantCotDet = $("#CI_txtCantCotDet");
    var $CI_txtUnidadMedida = $("#CI_txtUnidadMedida");
    var $CI_hdnUbicacion = $("#CI_hdnUbicacion");
    var $CI_txtUbicacion = $("#CI_txtUbicacion");
    var $CI_txtDireccion = $("#CI_txtDireccion");
    var $CI_txtAmbDestino = $("#CI_txtAmbDestino");
    var $CI_txtNroPiso = $("#CI_txtNroPiso");
    var $CI_txtCantCosteo = $("#CI_txtCantCosteo");
    var $CI_txtMtoUnitarioCosto = $("#CI_txtMtoUnitarioCosto");
    var $CI_txtMtoTotalCosto = $("#CI_txtMtoTotalCosto");
    var $CI_txtCantPrevent = $("#CI_txtCantPrevent");
    var $CI_cmbCicloPreventivo = $("#CI_cmbCicloPreventivo");
    
    var $CI_btnGuardar = $("#CI_btnGuardar");
    var $CI_btnCerrar = $("#CI_btnCerrar");

    var $tblDetCotCostos = $('#tblDetCotCostos');
    var $tblInstaCostos = $("#tblInstaCostos");
    var $tblMantPreventCostos = $("#tblMantPreventCostos");
    var $tblLLaveManoCostos = $("#tblLLaveManoCostos");
    var $tblManualesCostos = $("#tblManualesCostos");
    var $tblVideosCostos = $("#tblVideosCostos");
    var $tblGarantAdicCostos = $("#tblGaranAdicCostos");
    var $tblCalibCostos = $("#tblCalibCostos");
    var $tblFleteCostos = $("#tblFleteCostos");

    $(Initialize);

    function Initialize() {

        ubigeo.setTxtUbigeo_Id("CI_hdnUbicacion");
        ubigeo.setTxtUbigeo_Text("CI_txtUbicacion");

        $CI_btnCerrar.click(cerrarModalCostosItem);

        if ($estadoSol.val() == "CVAL") {

            cargarComboCotDetItems();
            cargarCiclosPreventivos();

            $CI_cmbCDItem.on("change", cargarCotDetSeleccionada);

            $btnAC_Insta.click(agregarCostoItem);
            $btnAC_MantPrevent.click(agregarCostoItem);
            $btnAC_LLaveMano.click(agregarCostoItem);
            $btnAC_Manual.click(agregarCostoItem);
            $btnAC_Video.click(agregarCostoItem);
            $btnAC_GarantAdic.click(agregarCostoItem);
            $btnAC_Calib.click(agregarCostoItem);
            $btnAC_Flete.click(agregarCostoItem);

            $CI_btnGuardar.click(guardarCostoItem);

            cargarCostosItemsxTab($CI_CodCosto_LLaveMano.val());
            cargarCostosItemsxTab($CI_CodCosto_InstCapa.val());
            cargarCostosItemsxTab($CI_CodCosto_Manuales.val());
            cargarCostosItemsxTab($CI_CodCosto_Videos.val());
            cargarCostosItemsxTab($CI_CodCosto_MantPrevent.val());
            cargarCostosItemsxTab($CI_CodCosto_GarantAdic.val());
            cargarCostosItemsxTab($CI_CodCosto_Calibra.val());
            cargarCostosItemsxTab($CI_CodCosto_Flete.val());

            $CI_txtCantCosteo.on("keyup", totalizarCostItem);
            $CI_txtMtoUnitarioCosto.on("keyup", totalizarCostItem);
            $CI_txtMtoTotalCosto.on("keyup", totalizarCostItem);

        }

    }

    function setTab_LLaveMano() {
        $CI_hdnCodCosto.val($CI_CodCosto_LLaveMano.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.removeAttr("disabled");
        $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_InstCapa() {
        $CI_hdnCodCosto.val($CI_CodCosto_InstCapa.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.removeAttr("disabled");
        $CI_txtMtoTotalCosto.attr("disabled","disabled");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Manuales() {
        $CI_hdnCodCosto.val($CI_CodCosto_Manuales.val());
        $pnlInfoDestino.css("display", "none");
        $pnlInfoCostos_MtoUnitario.css("display", "none");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.attr("disabled", "disabled"); //No se utiliza costo unitario
        $CI_txtMtoTotalCosto.removeAttr("disabled");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Videos() {
        $CI_hdnCodCosto.val($CI_CodCosto_Videos.val());
        $pnlInfoDestino.css("display", "none");
        $pnlInfoCostos_MtoUnitario.css("display", "none");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.attr("disabled", "disabled"); //No se utiliza costo unitario
        $CI_txtMtoTotalCosto.removeAttr("disabled");
        $pnlInfoPreventivos.css("display", "none");
    }
    
    function setTab_MantPrevent() {
        $CI_hdnCodCosto.val($CI_CodCosto_MantPrevent.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.removeAttr("disabled");
        $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        $pnlInfoPreventivos.css("display", "");
    }

    function setTab_GarantAdic() {
        $CI_hdnCodCosto.val($CI_CodCosto_GarantAdic.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.removeAttr("disabled");
        $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Calibra() {
        $CI_hdnCodCosto.val($CI_CodCosto_Calibra.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.removeAttr("disabled");
        $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Flete() {
        $CI_hdnCodCosto.val($CI_CodCosto_Flete.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $CI_txtMtoUnitarioCosto.removeAttr("disabled");
        $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        $pnlInfoPreventivos.css("display", "none");
    }

    function LimpiarModalCostos() {
        $CI_hdnIdCotDetCosto.val("");
        $CI_cmbCDItem.removeAttr("disabled");
        $CI_cmbCDItem.val("").trigger("change.select2");
        $CI_txtCantCotDet.val("");
        $CI_txtUnidadMedida.val("");
        $CI_hdnUbicacion.val("");
        $CI_txtUbicacion.val("");
        ubigeo.setUbigeoById("");
        $CI_txtDireccion.val("");
        $CI_txtAmbDestino.val("");
        $CI_txtNroPiso.val("");
        $CI_txtCantCosteo.val("");
        $CI_txtMtoUnitarioCosto.val("");
        $CI_txtMtoTotalCosto.val("");
        $CI_cmbCicloPreventivo.val("").trigger("change.select2");
    }

    function agregarCostoItem() {
        LimpiarModalCostos();
    }

    function cargarComboCotDetItems() {
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarComboCotDetItems";
        var objFiltros = {};
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallback = function (data) {

            //Cargar combo de items:
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CI_cmbCDItem, data.Result, null, " ", "-- Seleccione --", filters);

        };
        
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function cargarCiclosPreventivos() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCiclosPreventivos";
        var oValores = {};
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Ninguno --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CI_cmbCicloPreventivo, data.Result, null, " ", "-- Ninguno --", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function cargarCotDetSeleccionada() {
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetSeleccionada";
        var objFiltros = {
            Id : $CI_cmbCDItem.val()
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallback = function (data) {
            $CI_txtCantCotDet.val("");
            $CI_txtUnidadMedida.val("");
            if (data.Result != null) {
                $CI_txtCantCotDet.val(data.Result.Cantidad);
                $CI_txtUnidadMedida.val(data.Result.DescUnidad);
            }
        };

        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function loadGridbyCost(data, strCodCosto) {
        if (strCodCosto == $CI_CodCosto_LLaveMano.val()) {
            cargarGrillaCostos_Default(data, $tblLLaveManoCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_InstCapa.val()) {
            cargarGrillaCostos_Default(data, $tblInstaCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_Manuales.val()) {
            cargarGrillaCostos_Default(data, $tblManualesCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_Videos.val()) {
            cargarGrillaCostos_Default(data, $tblVideosCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_MantPrevent.val()) {
            cargarGrillaCostos_Default(data, $tblMantPreventCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_GarantAdic.val()) {
            cargarGrillaCostos_Default(data, $tblGarantAdicCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_Calibra.val()) {
            cargarGrillaCostos_Default(data, $tblCalibCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_Flete.val()) {
            cargarGrillaCostos_Default(data, $tblFleteCostos.attr("id"));
        }
    }

    function cargarCostosItemsxTab(strCodCosto) {
        method = "POST";
        url = "BandejaSolicitudesVentas/ListarCDCostosItems";
        var objDatos = {
            CotizacionDetalle: {
                IdCotizacion: $idCotizacion.val()
            },
            CodCosto: strCodCosto
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            loadGridbyCost(data, strCodCosto);
        };

        var fnFailCallback = function () {
            app.message.error("Validación", "Error al listar los costos");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cargarGrillaCostos_Default(data, idDatatable) {

        var columns = [
            {
                data: "CotizacionDetalle.CodItem",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CotizacionDetalle.Descripcion",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CotizacionDetalle.DescUnidad",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CantidadCosto",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "MontoUnitarioCosto",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "MontoTotalCosto",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data) {
                    var hidden = '<input type="hidden" id="hdnCDCItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtacostos.editarCostoItem(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtacostos.quitarCostoItem(' + data + ',' + String.fromCharCode(39) + $CI_hdnCodCosto.val() + String.fromCharCode(39) +')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        }

        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + index);
        };

        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 10;

        app.llenarTabla($("#" + idDatatable), data, columns, columnDefs, "#" + idDatatable, rowCallback, null, filters);

    }

    function guardarCostoItem() {
        
        if ($CI_cmbCDItem.val() == "") {
            app.message.error("Validación", "Se debe seleccionar un producto / servicio");
            return false;
        }

        if ($pnlInfoDestino.css("display") != "none") {

            if ($CI_hdnUbicacion.val().length < 6) {
                app.message.error("Validación", "Se debe seleccionar el ubigeo destino");
                return false;
            }

            if ($CI_txtDireccion.val() == "") {
                app.message.error("Validación", "Se debe ingresar la dirección");
                return false;
            }

            if ($CI_txtNroPiso.val() != "") {
                if (!app.validaNumeroEntero($CI_txtNroPiso.val())) {
                    app.message.error("Validación", "Número inválido para el Piso");
                }
            }

        }

        if ($CI_txtCantCosteo.val() == "") {
            app.message.error("Validación", "Se debe ingresar la cantidad a costear");
            return false;
        }
        else {
            if (!app.validaNumeroEntero($CI_txtCantCosteo.val())) {
                app.message.error("Validación", "N&uacute;mero inv&aacute;lido en campo Cantidad");
                return false;
            }
            else {
                if (parseInt($CI_txtCantCosteo.val()) <= 0) {
                    app.message.error("Validación", "Se debe ingresar cantidades mayor a 0");
                    return false;
                }
            }
        }

        if ($CI_txtMtoUnitarioCosto.attr("readonly") != "readonly" || $CI_txtMtoUnitarioCosto.attr("disabled") != "disabled") {
            if ($CI_txtMtoUnitarioCosto.val() == "") {
                app.message.error("Validación", "Se debe ingresar el monto unitario");
                return false;
            }
            else {
                if (!app.validaNumeroDecimal($CI_txtMtoUnitarioCosto.val())) {
                    app.message.error("Validación", "N&uacute;mero inv&aacute;lido en campo Monto Unitario");
                    return false;
                }
                else {
                    if (parseFloat($CI_txtMtoUnitarioCosto.val()) <= 0) {
                        app.message.error("Validación", "el monto unitario debe ser mayor a 0.");
                        return false;
                    }
                }
            }
        }
        
        if ($CI_txtMtoTotalCosto.attr("readonly") != "readonly" || $CI_txtMtoTotalCosto.attr("disabled") != "disabled") {
            if ($CI_txtMtoTotalCosto.val() == "") {
                app.message.error("Validación", "Se debe ingresar el monto unitario");
                return false;
            }
            else {
                if (!app.validaNumeroDecimal($CI_txtMtoTotalCosto.val())) {
                    app.message.error("Validación", "N&uacute;mero inv&aacute;lido en campo Monto Unitario");
                    return false;
                }
                else {
                    if (parseFloat($CI_txtMtoTotalCosto.val()) <= 0) {
                        app.message.error("Validación", "el monto total debe ser mayor a 0.");
                        return false;
                    }
                }
            }
        }

        var vId = 0;
        if ($CI_hdnIdCotDetCosto.val() != "") { vId = parseInt($CI_hdnIdCotDetCosto.val()); }
        var vCantidadPreventivo = null;
        var vCodCicloPreventivo = null;
        var vCodUbigeoDestino = null;
        var vDireccion = null;
        var vNroPiso = null;
        var vMontoUnitarioCosto = null;
        var vMontoTotalCosto = null;

        if ($CI_txtCantPrevent.val() != "") { vCantidadPreventivo = parseInt($CI_txtCantPrevent.val()); }
        if ($CI_cmbCicloPreventivo.val() != "") { vCodCicloPreventivo = $CI_cmbCicloPreventivo.val(); }
        if ($CI_hdnUbicacion.val() != "") { vCodUbigeoDestino = $CI_hdnUbicacion.val(); }
        if ($CI_txtDireccion.val() != "") { vDireccion = $CI_txtDireccion.val(); }
        if ($CI_txtNroPiso.val() != "") { vNroPiso = $CI_txtNroPiso.val(); }
        if ($CI_txtMtoUnitarioCosto.val() != "") { vMontoUnitarioCosto = parseFloat($CI_txtMtoUnitarioCosto.val()); }
        if ($CI_txtMtoTotalCosto.val() != "") { vMontoTotalCosto = parseFloat($CI_txtMtoTotalCosto.val()); }

        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCostoItem";
        var objDatos = {
            Id: vId,
            IdCotizacionDetalle: $CI_cmbCDItem.val(),
            CotizacionDetalle: {
                IdCotizacion: $idCotizacion.val(),
                IdCotizacionDetalle: $CI_cmbCDItem.val()
            },
            CodCosto: $CI_hdnCodCosto.val(),
            CantidadCosto: $CI_txtCantCosteo.val(),
            CantPreventivo: vCantidadPreventivo,
            CodCicloPreventivo: vCodCicloPreventivo,
            CodUbigeoDestino: vCodUbigeoDestino,
            Direccion: vDireccion,
            AmbienteDestino: $CI_txtAmbDestino.val(),
            NroPiso: vNroPiso,
            MontoUnitarioCosto: vMontoUnitarioCosto,
            MontoTotalCosto: vMontoTotalCosto
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            loadGridbyCost(data, $CI_hdnCodCosto.val());
            cerrarModalCostosItem();
            app.message.success("Costos", "Se guard&oacute; el costos correctamente.", "Aceptar", null);
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function editarCostoItem(strId) {

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarDatosCostoItem";
        var objDatos = {
            Id: strId
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            LimpiarModalCostos();
            $CI_hdnIdCotDetCosto.val(data.Result.Id);
            $CI_cmbCDItem.attr("disabled", "disabled");
            $CI_cmbCDItem.val(data.Result.IdCotizacionDetalle).trigger("change.select2");
            $CI_txtCantCotDet.val(data.Result.CotizacionDetalle.Cantidad);
            $CI_txtUnidadMedida.val(data.Result.CotizacionDetalle.DescUnidad);
            if (data.Result.CodUbigeoDestino != null) {
                ubigeo.setUbigeoById(data.Result.CodUbigeoDestino);
            }
            $CI_txtDireccion.val(data.Result.Direccion);
            $CI_txtAmbDestino.val(data.Result.AmbienteDestino);
            $CI_txtNroPiso.val(data.Result.NroPiso);
            $CI_txtCantCosteo.val(data.Result.CantidadCosto);
            $CI_txtMtoUnitarioCosto.val(data.Result.MontoUnitarioCosto);
            $CI_txtMtoTotalCosto.val(data.Result.MontoTotalCosto);
            $CI_txtCantPrevent.val(data.Result.CantPreventivo);
            $CI_cmbCicloPreventivo.val(data.Result.CodCicloPreventivo).trigger("change.select2");

            $('#modalCostoItem').modal('show');
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function totalizarCostItem() {
        var vMtoUnit = null;
        if ($CI_txtMtoTotalCosto.attr("readonly") == "readonly" || $CI_txtMtoTotalCosto.attr("disabled") == "disabled") {
            if ($CI_txtCantCosteo.val() != "" && $CI_txtMtoUnitarioCosto.val() != "") {
                if (app.validaNumeroEntero($CI_txtCantCosteo.val()) && app.validaNumeroDecimal($CI_txtMtoUnitarioCosto.val())) {
                    var strMonto = $CI_txtMtoUnitarioCosto.val();
                    var position = strMonto.indexOf(".");
                    var redondeo = 0;
                    if (position > 0) {
                        var dec = (strMonto.length - position) - 1;
                        if (dec > 0) { redondeo = dec; }
                    }
                    $CI_txtMtoTotalCosto.val((parseFloat($CI_txtMtoUnitarioCosto.val()) * parseInt($CI_txtCantCosteo.val())).toFixed(redondeo));
                }
            }
        }
        if ($CI_txtMtoUnitarioCosto.attr("readonly") == "readonly" || $CI_txtMtoUnitarioCosto.attr("disabled") == "disabled") {
            if ($CI_txtCantCosteo.val() != "" && $CI_txtMtoTotalCosto.val() != "") {
                if (app.validaNumeroEntero($CI_txtCantCosteo.val()) && app.validaNumeroDecimal($CI_txtMtoTotalCosto.val())) {
                    var strMonto = $CI_txtMtoTotalCosto.val();
                    var position = strMonto.indexOf(".");
                    var redondeo = 0;
                    if (position > 0) {
                        var dec = (strMonto.length - position) - 1;
                        if (dec > 0) { redondeo = dec; }
                    }
                    $CI_txtMtoUnitarioCosto.val((parseFloat($CI_txtMtoTotalCosto.val()) / parseInt($CI_txtCantCosteo.val())).toFixed(redondeo));
                }
            }
        }
    }

    function quitarCostoItem(strId, strCodCosto) {

        method = "POST";
        url = "BandejaSolicitudesVentas/EliminarCostoItem";
        var objDatos = {
            Id: strId
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            loadGridbyCost(data, strCodCosto);
            app.message.success("Costos", "Se elimin&oacute; el costo correctamente.", "Aceptar", null);
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cerrarModalCostosItem() {
        $('#modalCostoItem').modal('hide');
    }

    return {
        setTab_LLaveMano: setTab_LLaveMano,
        setTab_InstCapa: setTab_InstCapa,
        setTab_Manuales: setTab_Manuales,
        setTab_Videos: setTab_Videos,
        setTab_MantPrevent: setTab_MantPrevent,
        setTab_GarantAdic: setTab_GarantAdic,
        setTab_Calibra: setTab_Calibra,
        setTab_Flete: setTab_Flete,
        LimpiarModalCostos: LimpiarModalCostos,
        agregarCostoItem: agregarCostoItem,
        editarCostoItem: editarCostoItem,
        quitarCostoItem: quitarCostoItem,
        cargarComboCotDetItems: cargarComboCotDetItems,
        cargarCiclosPreventivos: cargarCiclosPreventivos,
        cargarCotDetSeleccionada: cargarCotDetSeleccionada,
        cargarCostosItemsxTab: cargarCostosItemsxTab,
        cargarGrillaCostos_Default: cargarGrillaCostos_Default,
        guardarCostoItem: guardarCostoItem,
        cerrarModalCostosItem: cerrarModalCostosItem
    }
})(window.jQuery, window, document);