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
    var $CI_txtDireccion = $("#CI_txtDireccion");
    var $CI_txtAmbDestino = $("#CI_txtAmbDestino");
    var $CI_txtNroPiso = $("#CI_txtNroPiso");
    var $CI_txtCantCosteo = $("#CI_txtCantCosteo");
    var $CI_txtMtoUnitarioCosto = $("#CI_txtMtoUnitarioCosto");
    var $CI_txtMtoTotalCosto = $("#CI_txtMtoTotalCosto");
    var $CI_cmbCicloPreventivo = $("#CI_cmbCicloPreventivo");

    var $CI_Editar_UbiDest = $("CI_Editar_UbiDest");
    var $CI_Editar_MtoUni = $("CI_Editar_MtoUni");
    var $CI_Editar_MtoTot = $("CI_Editar_MtoTot");

    var $CI_btnGuardar = $("#CI_btnGuardar");
    var $CI_btnCerrar = $("#CI_btnCerrar");

    var $tblDetCotCostos = $('#tblDetCotCostos');
    var $tblInstaCostos = $("#tblInstaCostos");
    var $tblMantPreventCostos = $("#tblMantPreventCostos");
    var $tblLLaveManoCostos = $("#tblLLaveManoCostos");
    var $tblManualesCostos = $("#tblManualesCostos");
    var $tblVideosCostos = $("#tblVideosCostos");
    var $tblCalibCostos = $("#tblCalibCostos");
    var $tblFleteCostos = $("#tblFleteCostos");

    $(Initialize);

    function Initialize() {

        ubigeo.setTxtUbigeo_Id("CI_hdnUbicacion");
        ubigeo.setTxtUbigeo_Text("CI_txtUbicacion");

        $CI_btnCerrar.click(cerrarModalCostosItem);

        if ($estadoSol.val() == "CVAL") {
            cargarComboCotDetItems();
        }

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

    }

    function setTab_LLaveMano() {
        $CI_hdnCodCosto.val($CI_CodCosto_LLaveMano.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_InstCapa() {
        $CI_hdnCodCosto.val($CI_CodCosto_InstCapa.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Manuales() {
        $CI_hdnCodCosto.val($CI_CodCosto_Manuales.val());
        $pnlInfoDestino.css("display", "none");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Videos() {
        $CI_hdnCodCosto.val($CI_CodCosto_Videos.val());
        $pnlInfoDestino.css("display", "none");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }
    
    function setTab_MantPrevent() {
        $CI_hdnCodCosto.val($CI_CodCosto_MantPrevent.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "");
    }

    function setTab_GarantAdic() {
        $CI_hdnCodCosto.val($CI_CodCosto_GarantAdic.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Calibra() {
        $CI_hdnCodCosto.val($CI_CodCosto_Calibra.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }

    function setTab_Flete() {
        $CI_hdnCodCosto.val($CI_CodCosto_Flete.val());
        $pnlInfoDestino.css("display", "");
        $pnlInfoCostos_MtoUnitario.css("display", "");
        $pnlInfoCostos_MtoTotal.css("display", "");
        $pnlInfoPreventivos.css("display", "none");
    }

    function LimpiarModalCostos() {
        $CI_hdnIdCotDetCosto.val("");
        $CI_hdnCodCosto.val("");
        $CI_cmbCDItem.val("");
        $CI_hdnUbicacion.val("");
        $CI_txtDireccion.val("");
        $CI_txtAmbDestino.val("");
        $CI_txtNroPiso.val("");
        $CI_txtCantCosteo.val("");
        $CI_txtMtoUnitarioCosto.val("");
        $CI_txtMtoTotalCosto.val("");
        $CI_cmbCicloPreventivo.val("");
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

    function guardarCostoItem() {
        
        if ($CI_cmbCDItem.val() == "") {
            app.message.error("Validación", "Se debe seleccionar un producto / servicio");
            return false;
        }

        if ($CI_hdnUbicacion.val() == "") {
            app.message.error("Validación", "Se debe seleccionar el ubigeo destino");
            return false;
        }

        if ($CI_txtDireccion.val() == "") {
            app.message.error("Validación", "Se debe ingresar la dirección");
            return false;
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
                    app.message.error("Validación", "el monto unitario debe ser mayor a 0.");
                    return false;
                }
            }
        }

        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCostoItem";
        var objDatos = {
            IdCotizacionDetalle: $CI_cmbCDItem.val()
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            cerrarModalCostosItem();
        };

        var fnFailCallback = function () {
            app.message.error("Validación", "Error al grabar los costos");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cerrarModalCostosItem() {
        $('#modalCostoItem').modal('hide');
    }

    return {
        cargarComboCotDetItems: cargarComboCotDetItems,
        cargarCiclosPreventivos: cargarCiclosPreventivos,
        cargarCotDetSeleccionada: cargarCotDetSeleccionada,
        LimpiarModalCostos: LimpiarModalCostos,
        guardarCostoItem: guardarCostoItem,
        setTab_LLaveMano: setTab_LLaveMano,
        setTab_InstCapa: setTab_InstCapa,
        setTab_Manuales: setTab_Manuales,
        setTab_Videos: setTab_Videos,
        setTab_MantPrevent: setTab_MantPrevent,
        setTab_GarantAdic: setTab_GarantAdic,
        setTab_Calibra: setTab_Calibra,
        setTab_Flete: setTab_Flete,
        cerrarModalCostosItem: cerrarModalCostosItem
    }
})(window.jQuery, window, document);