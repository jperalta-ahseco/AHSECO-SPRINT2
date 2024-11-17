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

    var $CI_cmbCDItem = $("#CI_cmbCDItem");
    var $CI_hdnUbicacion = $("#CI_hdnUbicacion");
    var $CI_txtDireccion = $("#CI_txtDireccion");
    var $CI_txtAmbDestino = $("#CI_txtAmbDestino");
    var $CI_txtNroPiso = $("#CI_txtNroPiso");
    var $CI_txtCantidad = $("#CI_txtCantidad");
    var $CI_txtCosto = $("#CI_txtCosto");

    var $CI_btnGuardar = $("#CI_btnGuardar");
    var $CI_btnCerrar = $("#CI_btnCerrar");

    $(Initialize);

    function Initialize() {

        ubigeo.setTxtUbigeo_Id("CI_hdnUbicacion");
        ubigeo.setTxtUbigeo_Text("CI_txtUbicacion");

        $CI_btnGuardar.click(guardarCostoItem);
        $CI_btnCerrar.click(cerrarModalCostosItem);

        if ($estadoSol.val() == "CVAL") {
            cargarComboCotDetItems();
        }

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
            CodItemPadre: $DI_hdnCodigoPadre.val()
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
        cerrarModalCostosItem: cerrarModalCostosItem
    }
})(window.jQuery, window, document);