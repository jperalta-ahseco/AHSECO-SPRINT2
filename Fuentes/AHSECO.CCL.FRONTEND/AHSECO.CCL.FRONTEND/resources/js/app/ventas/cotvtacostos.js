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

    var $CI_hdnIdCotDetCosto = $("#CI_hdnIdCotDetCosto");
    var $CI_hdnCodCosto = $("#CI_hdnCodCosto");
    var $CI_cmbCDItem = $("#CI_cmbCDItem");
    var $CI_hdnUbicacion = $("#CI_hdnUbicacion");
    var $CI_txtDireccion = $("#CI_txtDireccion");
    var $CI_txtAmbDestino = $("#CI_txtAmbDestino");
    var $CI_txtNroPiso = $("#CI_txtNroPiso");
    var $CI_txtCantidad = $("#CI_txtCantidad");
    var $CI_txtCosto = $("#CI_txtCosto");

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

        $CI_btnGuardar.click(guardarCostoItem);

    }

    function LimpiarModalCostos() {
        $CI_hdnIdCotDetCosto.val("");
        $CI_hdnCodCosto.val("");
        $CI_cmbCDItem.val("");
        $CI_hdnUbicacion.val("");
        $CI_txtDireccion.val("");
        $CI_txtAmbDestino.val("");
        $CI_txtNroPiso.val("");
        $CI_txtCantidad.val("");
        $CI_txtCosto.val("");
    }

    function setTab_LLaveMano() {
        $CI_hdnCodCosto.val($CI_CodCosto_LLaveMano.val());
    }

    function setTab_InstCapa() {
        $CI_hdnCodCosto.val($CI_CodCosto_InstCapa.val());
    }

    function setTab_Manuales() {
        $CI_hdnCodCosto.val($CI_CodCosto_Manuales.val());
    }

    function setTab_Videos() {
        $CI_hdnCodCosto.val($CI_CodCosto_Videos.val());
    }

    function setTab_Videos() {
        $CI_hdnCodCosto.val($CI_CodCosto_Videos.val());
    }

    function setTab_MantPrevent() {
        $CI_hdnCodCosto.val($CI_CodCosto_MantPrevent.val());
    }

    function setTab_GarantAdic() {
        $CI_hdnCodCosto.val($CI_CodCosto_GarantAdic.val());
    }

    function setTab_Calibra() {
        $CI_hdnCodCosto.val($CI_CodCosto_Calibra.val());
    }

    function setTab_Flete() {
        $CI_hdnCodCosto.val($CI_CodCosto_Flete.val());
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

    function guardarCostoItem() {
        
        if ($CI_cmbCDItem.val() == "") {
            app.message.error("Validaci&oacute;n", "Se debe seleccionar un producto / servicio");
            return false;
        }

        if ($CI_hdnUbicacion.val() == "") {
            app.message.error("Validaci&oacute;n", "Se debe seleccionar el ubigeo destino");
            return false;
        }

        if ($CI_txtDireccion.val() == "") {
            app.message.error("Validaci&oacute;n", "Se debe ingresar la dirección");
            return false;
        }

        if ($CI_txtCantidad.val() == "") {
            app.message.error("Validaci&oacute;n", "Se debe ingresar la cantidad a despachar");
            return false;
        }
        else {
            if (!app.validaNumeroEntero($CI_txtCantidad.val())) {
                app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Cantidad");
                return false;
            }
            else {
                if (parseInt($CI_txtCantidad.val()) <= 0) {
                    app.message.error("Validaci&oacute;n", "Se debe ingresar cantidades mayor a 0");
                    return false;
                }
            }
        }

        if ($CI_txtCosto.val() == "") {
            app.message.error("Validaci&oacute;n", "Se debe ingresar el monto del costo");
            return false;
        }
        else {
            if (!app.validaNumeroDecimal($CI_txtCosto.val())) {
                app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Monto de Costo");
                return false;
            }
            else {
                if (parseFloat($CI_txtCosto.val()) <= 0) {
                    app.message.error("Validaci&oacute;n", "el monto de costo debe ser mayor a 0.");
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
            app.message.error("Validaci&oacute;n", "Error al grabar los costos");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cerrarModalCostosItem() {
        $('#modalCostoItem').modal('hide');
    }

    return {
        cargarComboCotDetItems: cargarComboCotDetItems,
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