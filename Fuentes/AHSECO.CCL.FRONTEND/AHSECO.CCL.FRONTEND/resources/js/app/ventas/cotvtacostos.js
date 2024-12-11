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
    var $PermitirEditarValorizacion = $("#PermitirEditarValorizacion");
    var $PermitirEditarGanancia = $("#PermitirEditarGanancia");

    var $DI_hdnIdCotDet = $("#DI_hdnIdCotDet");
    var $DI_hdnCodigo = $("#DI_hdnCodigo");
    var $DI_txtDescripcion = $("#DI_txtDescripcion");
    var $DI_txtCantidad = $("#DI_txtCantidad");
    var $DI_radInstalacion_Si = $("#DI_radInstalacion_Si");
    var $DI_radInstalacion_No = $("#DI_radInstalacion_No");
    var $DI_radCapacitacion_Si = $("#DI_radCapacitacion_Si");
    var $DI_radCapacitacion_No = $("#DI_radCapacitacion_No");
    var $DI_radManuales_Si = $("#DI_radManuales_Si");
    var $DI_radManuales_No = $("#DI_radManuales_No");
    var $DI_radVideos_Si = $("#DI_radVideos_Si");
    var $DI_radVideos_No = $("#DI_radVideos_No");
    var $DI_radMantPrevent_Si = $("#DI_radMantPrevent_Si");
    var $DI_radMantPrevent_No = $("#DI_radMantPrevent_No");
    var $DI_radCalibracion_Si = $("#DI_radCalibracion_Si");
    var $DI_radCalibracion_No = $("#DI_radCalibracion_No");
    var $DI_radFlete_Si = $("#DI_radFlete_Si");
    var $DI_radFlete_No = $("#DI_radFlete_No");
    
    var $DI_tblCostos = $("#DI_tblCostos");

    var $CI_CodCosto_LLaveMano = $("#CI_CodCosto_LLaveMano");
    var $CI_CodCosto_Instalacion = $("#CI_CodCosto_Instalacion");
    var $CI_CodCosto_Capacitacion = $("#CI_CodCosto_Capacitacion");
    var $CI_CodCosto_Manuales = $("#CI_CodCosto_Manuales");
    var $CI_CodCosto_Videos = $("#CI_CodCosto_Videos");
    var $CI_CodCosto_MantPrevent = $("#CI_CodCosto_MantPrevent");
    var $CI_CodCosto_Calibra = $("#CI_CodCosto_Calibra");
    var $CI_CodCosto_Flete = $("#CI_CodCosto_Flete");

    var $CI_opcGrilla = $("#CI_opcGrilla");
    
    var $CI_pnlInfoGeneral = $("#CI_pnlInfoGeneral");
    var $CI_pnlInfoDestino = $("#CI_pnlInfoDestino");
    var $CI_pnlInfoCostos = $("#CI_pnlInfoCostos");
    var $CI_pnlInfoCostos_MtoUnitario = $("#CI_pnlInfoCostos_MtoUnitario");
    var $CI_pnlInfoCostos_MtoTotal = $("#CI_pnlInfoCostos_MtoTotal");
    var $CI_pnlInfoPreventivos = $("#CI_pnlInfoPreventivos");

    var $CI_hdnIdCotDetCosto = $("#CI_hdnIdCotDetCosto");
    var $CI_hdnCodCosto = $("#CI_hdnCodCosto");
    var $CI_cmbTipoCosto = $("#CI_cmbTipoCosto");
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
    var $tblCapaCostos = $("#tblCapaCostos");
    var $tblMantPreventCostos = $("#tblMantPreventCostos");
    var $tblLLaveManoCostos = $("#tblLLaveManoCostos");
    var $tblManualesCostos = $("#tblManualesCostos");
    var $tblVideosCostos = $("#tblVideosCostos");
    var $tblCalibCostos = $("#tblCalibCostos");
    var $tblFleteCostos = $("#tblFleteCostos");

    var $tabDetCot = $("#tabDetCot");
    var $tabInsta = $("#tabInsta");
    var $tabMantPrevent = $("#tabMantPrevent");
    var $tabLLaveMano = $("#tabLLaveMano");
    var $tabManuales = $("#tabManuales");
    var $tabVideos = $("#tabVideos");
    var $tabCalib = $("#tabCalib");
    var $tabFlete = $("#tabFlete");

    $(Initialize);

    function Initialize() {

        $tabDetCot.addClass("active");

        ubigeo.setTxtUbigeo_Id("CI_hdnUbicacion");
        ubigeo.setTxtUbigeo_Text("CI_txtUbicacion");

        $CI_btnCerrar.click(cerrarModalCostosItem);
        
        cargarCiclosPreventivos();
        cargarTipoCostos();

        $CI_cmbCDItem.on("change", cargarCotDetSeleccionada);

        $DI_radInstalacion_Si.click(cargarTipoCostos);
        $DI_radInstalacion_No.click(cargarTipoCostos);
        $DI_radCapacitacion_Si.click(cargarTipoCostos);
        $DI_radCapacitacion_No.click(cargarTipoCostos);
        $DI_radManuales_Si.click(cargarTipoCostos);
        $DI_radManuales_No.click(cargarTipoCostos);
        $DI_radVideos_Si.click(cargarTipoCostos);
        $DI_radVideos_No.click(cargarTipoCostos);
        $DI_radMantPrevent_Si.click(cargarTipoCostos);
        $DI_radMantPrevent_No.click(cargarTipoCostos);
        $DI_radCalibracion_Si.click(cargarTipoCostos);
        $DI_radCalibracion_No.click(cargarTipoCostos);

        $CI_cmbTipoCosto.on("change", configurarModalCosto);

        $CI_btnGuardar.click(guardarCostoItem);

        cargarCostosItemsxTab($CI_CodCosto_LLaveMano.val());
        cargarCostosItemsxTab($CI_CodCosto_Instalacion.val());
        cargarCostosItemsxTab($CI_CodCosto_Capacitacion.val());
        cargarCostosItemsxTab($CI_CodCosto_Manuales.val());
        cargarCostosItemsxTab($CI_CodCosto_Videos.val());
        cargarCostosItemsxTab($CI_CodCosto_MantPrevent.val());
        cargarCostosItemsxTab($CI_CodCosto_Calibra.val());
        cargarCostosItemsxTab($CI_CodCosto_Flete.val());

        $CI_txtCantCosteo.on("keyup", totalizarCostItem);
        $CI_txtMtoUnitarioCosto.on("keyup", totalizarCostItem);
        $CI_txtMtoTotalCosto.on("keyup", totalizarCostItem);

        if ($estadoSol.val() == "CVAL") {
            cargarComboCotDetItems();
        }

    }

    function setTab(strCodCosto) {
        $CI_hdnCodCosto.val(strCodCosto);
    }

    function setTab_LLaveMano() {
        setTab($CI_CodCosto_LLaveMano.val());
    }

    function setTab_Instalacion() {
        setTab($CI_CodCosto_Instalacion.val());
    }

    function setTab_Capacitacion() {
        setTab($CI_CodCosto_Capacitacion.val());
    }

    function setTab_Manuales() {
        setTab($CI_CodCosto_Manuales.val());
    }

    function setTab_Videos() {
        setTab($CI_CodCosto_Videos.val());
    }
    
    function setTab_MantPrevent() {
        setTab($CI_CodCosto_MantPrevent.val());
    }
    
    function setTab_Calibra() {
        setTab($CI_CodCosto_Calibra.val());
    }

    function setTab_Flete() {
        setTab($CI_CodCosto_Flete.val());
    }

    function LimpiarModalCostos() {
        $CI_hdnIdCotDetCosto.val("");
        $CI_cmbCDItem.removeAttr("disabled");
        $CI_cmbCDItem.get(0).selectedIndex = 0;
        $CI_cmbCDItem.trigger("change.select2");
        $CI_cmbTipoCosto.removeAttr("disabled");
        $CI_cmbTipoCosto.get(0).selectedIndex = 0;
        $CI_cmbTipoCosto.trigger("change.select2");
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
        $CI_txtCantPrevent.val("");
        $CI_cmbCicloPreventivo.get(0).selectedIndex = 0;
        $CI_cmbCicloPreventivo.trigger("change.select2");
    }

    function configurarModalCosto() {

        $CI_cmbCDItem.attr("disabled", "disabled");

        //Se configura la pantalla por TIPO DE COSTO

        if ($CI_cmbTipoCosto.val() == $CI_CodCosto_Manuales.val() || $CI_cmbTipoCosto.val() == $CI_CodCosto_Videos.val() ||
            $CI_cmbTipoCosto.val() == $CI_CodCosto_Capacitacion.val() || $CI_cmbTipoCosto.val() == $CI_CodCosto_Calibra.val()) {
            $CI_pnlInfoDestino.css("display", "none");
            $CI_txtUbicacion.attr("disabled", "disabled");
            $("#searchUbigeo").attr("data-target", "");
            $("#searchUbigeo").css("cursor", "not-allowed");
            $CI_txtDireccion.attr("disabled", "disabled");
            $CI_txtAmbDestino.attr("disabled", "disabled");
            $CI_txtNroPiso.attr("disabled", "disabled");
            //Los costos de manuales y videos solo agregan totales
            $CI_pnlInfoCostos_MtoUnitario.css("display", "none");
            $CI_txtMtoUnitarioCosto.attr("disabled", "disabled");
            $CI_pnlInfoCostos_MtoTotal.css("display", "");
            $CI_txtMtoTotalCosto.removeAttr("disabled");
        }
        else {
            $CI_pnlInfoDestino.css("display", "");
            $CI_txtUbicacion.removeAttr("disabled");
            $("#searchUbigeo").attr("data-target", "#modalUbigeo");
            $("#searchUbigeo").css("cursor", "pointer");
            $CI_txtDireccion.removeAttr("disabled");
            $CI_txtAmbDestino.removeAttr("disabled");
            $CI_txtNroPiso.removeAttr("disabled");
            //Los demás costos agregan montos unitarios
            $CI_pnlInfoCostos_MtoUnitario.css("display", "");
            $CI_txtMtoUnitarioCosto.removeAttr("disabled");
            $CI_pnlInfoCostos_MtoTotal.css("display", "none");
            $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        }

        if ($CI_cmbTipoCosto.val() == $CI_CodCosto_MantPrevent.val()) {
            $CI_pnlInfoPreventivos.css("display", "");
            $CI_txtCantPrevent.removeAttr("disabled");
            $CI_cmbCicloPreventivo.removeAttr("disabled");
        }
        else {
            $CI_pnlInfoPreventivos.css("display", "none");
            $CI_txtCantPrevent.attr("disabled", "disabled");
            $CI_cmbCicloPreventivo.attr("disabled", "disabled");
        }

        //Se configura la pantalla por ROL

        if ($idRolUsuario.val() == $RolVenta_Asesor.val()) {

            if ($CI_pnlInfoDestino.css("display") != "none") {
                $CI_txtUbicacion.removeAttr("disabled");
                $("#searchUbigeo").attr("data-target", "#modalUbigeo");
                $("#searchUbigeo").css("cursor", "pointer");
                $CI_txtDireccion.removeAttr("disabled");
                $CI_txtAmbDestino.removeAttr("disabled");
                $CI_txtNroPiso.removeAttr("disabled");
            }

            if ($CI_pnlInfoPreventivos.css("display") != "none") {
                $CI_txtCantPrevent.removeAttr("disabled");
                $CI_cmbCicloPreventivo.removeAttr("disabled");
            }

            $CI_txtCantCosteo.removeAttr("disabled");
            if ($CI_pnlInfoCostos_MtoUnitario.css("display") != "none") {
                $CI_txtMtoUnitarioCosto.attr("disabled", "disabled");
            }
            if ($CI_pnlInfoCostos_MtoTotal.css("display") != "none") {
                $CI_txtMtoTotalCosto.attr("disabled", "disabled");
            }
        }
        else {

            if ($CI_pnlInfoDestino.css("display") != "none") {
                $CI_txtUbicacion.attr("disabled", "disabled");
                $("#searchUbigeo").attr("data-target", "");
                $("#searchUbigeo").css("cursor", "not-allowed");
                $CI_txtDireccion.attr("disabled", "disabled");
                $CI_txtAmbDestino.attr("disabled", "disabled");
                $CI_txtNroPiso.attr("disabled", "disabled");
            }

            if ($CI_pnlInfoPreventivos.css("display") != "none") {
                $CI_txtCantPrevent.attr("disabled", "disabled");
                $CI_cmbCicloPreventivo.attr("disabled", "disabled");
            }

            $CI_txtCantCosteo.attr("disabled", "disabled");
            if ($CI_pnlInfoCostos_MtoUnitario.css("display") != "none") {
                $CI_txtMtoUnitarioCosto.removeAttr("disabled");
            }
            if ($CI_pnlInfoCostos_MtoTotal.css("display") != "none") {
                $CI_txtMtoTotalCosto.removeAttr("disabled");
            }
        }

    }

    function agregarCostoItem(opcGrilla) {

        if ($DI_txtCantidad.val() == "") {
            app.message.error("Validaci&oacute;n", "La Cantidad no puede ser vac&iacute;o");
            return false;
        }
        else {
            if (!app.validaNumeroEntero($DI_txtCantidad.val())) {
                app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Cantidad");
                return false;
            }
            else {
                if (parseInt($DI_txtCantidad.val()) <= 0) {
                    app.message.error("Validaci&oacute;n", "La cantidad debe ser mayor a 0.");
                    return false;
                }
            }
        }

        cargarComboCotDetItems();
        LimpiarModalCostos();

        //Para el buscador se selecciona por defecto la cotizacion detalle en pantalla
        if (opcGrilla == "1") {
            $CI_opcGrilla.val("1");
            $CI_cmbCDItem.attr("data-selected", $DI_hdnIdCotDet.val());
            $CI_cmbCDItem.val($DI_hdnIdCotDet.val()).trigger("change.select2");
            $CI_cmbTipoCosto.removeAttr("disabled");
        }
        else {
            $CI_opcGrilla.val("2");
            $CI_cmbCDItem.removeAttr("data-selected");
            $CI_cmbCDItem.val("").trigger("change.select2");
            $CI_cmbTipoCosto.attr("disabled", "disabled");
        }

        configurarModalCosto();

        $("#modalCostoItem").modal('show');
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

    function cargarTipoCostos() {

        var vInstalacion = null;
        var vCapacitacion = null;
        var vManuales = null;
        var vVideos = null;
        var vMantPrevent = null;
        var vCalibracion = null;
        var vFlete = null;

        if ($DI_radInstalacion_Si.is(':checked')) { vInstalacion = true; }
        if ($DI_radInstalacion_No.is(':checked')) { vInstalacion = false; }

        if ($DI_radCapacitacion_Si.is(':checked')) { vCapacitacion = true; }
        if ($DI_radCapacitacion_No.is(':checked')) { vCapacitacion = false; }

        if ($DI_radManuales_Si.is(':checked')) { vManuales = true; }
        if ($DI_radManuales_No.is(':checked')) { vManuales = false; }

        if ($DI_radVideos_Si.is(':checked')) { vVideos = true; }
        if ($DI_radVideos_No.is(':checked')) { vVideos = false; }

        if ($DI_radMantPrevent_Si.is(':checked')) { vMantPrevent = true; }
        if ($DI_radMantPrevent_No.is(':checked')) { vMantPrevent = false; }

        if ($DI_radCalibracion_Si.is(':checked')) { vCalibracion = true; }
        if ($DI_radCalibracion_No.is(':checked')) { vCalibracion = false; }

        if ($DI_radFlete_Si.is(':checked')) { vFlete = true; }
        if ($DI_radFlete_No.is(':checked')) { vFlete = false; }

        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerTipoCostos";
        var oValores = {
            CotizacionDespacho: {
                IndInstalacion: vInstalacion,
                IndCapacitacion: vCapacitacion,
                IndInfoManual: vManuales,
                IndInfoVideo: vVideos,
                IndMantPreventivo: vMantPrevent,
                IndCalibracion: vCalibracion,
                IndFlete: vFlete
            }
        };
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CI_cmbTipoCosto, data.Result, null, " ", "-- Seleccione --", filters);
        }
        return app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function cargarCotDetSeleccionada() {
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetSeleccionada";
        var objFiltros = {
            Id: $CI_cmbCDItem.val(),
            Cantidad: $DI_txtCantidad.val()
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
        if (strCodCosto == $CI_CodCosto_Instalacion.val()) {
            cargarGrillaCostos_Default(data, $tblInstaCostos.attr("id"));
        }
        if (strCodCosto == $CI_CodCosto_Capacitacion.val()) {
            cargarGrillaCostos_Default(data, $tblCapaCostos.attr("id"));
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
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtacostos.editarCostoItem(' + data + ',' + String.fromCharCode(39) + '2' + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    //var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtacostos.quitarCostoItem(' + data + ',' + String.fromCharCode(39) + $CI_hdnCodCosto.val() + String.fromCharCode(39) + ',' + String.fromCharCode(39) + '2' + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    //return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                    return '<center>' + hidden + editar + '</center>';
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

    function cargarGrillaCostosCotDet(data) {

        var columns = [
            {
                data: "DescCosto",
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
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtacostos.editarCostoItem(' + data + ',' + String.fromCharCode(39) + '1' + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtacostos.quitarCostoItem(' + data + ',' + String.fromCharCode(39) + $CI_hdnCodCosto.val() + String.fromCharCode(39) + ',' + String.fromCharCode(39) + '1' + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                }
            }
        ];

        //Se quita los botones de acción por esta en valorizacion
        if ($PermitirEditarValorizacion.val() == "S") {
            columns.pop();
        }

        //Se quita los botones de acción para el Asesor que va a modificar su ganancia
        if ($PermitirEditarGanancia.val() == "S") {
            columns.pop();
        }

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

        app.llenarTabla($DI_tblCostos, data, columns, columnDefs, "#DI_tblCostos", rowCallback, null, filters);

    }

    function guardarCostoItem() {

        var vId = 0;
        if ($CI_hdnIdCotDetCosto.val() != "") { vId = parseInt($CI_hdnIdCotDetCosto.val()); }
        var vCodUbigeoDestino = null;
        var vDireccion = null;
        var vNroPiso = null;
        var vCantidadPreventivo = null;
        var vCodCicloPreventivo = null;
        var vMontoUnitarioCosto = null;
        var vMontoTotalCosto = null;

        if ($CI_pnlInfoGeneral.css("display") != "none") {
            if ($CI_cmbCDItem.val() == "") {
                app.message.error("Validación", "Se debe seleccionar un producto / servicio");
                return false;
            }
        }

        if ($CI_cmbTipoCosto.val() == "") {
            app.message.error("Validación", "Se debe seleccionar un tipo de costo");
            return false;
        }

        if ($CI_pnlInfoDestino.css("display") != "none") {

            if ($CI_hdnUbicacion.val().length < 6) {
                app.message.error("Validación", "Se debe seleccionar el ubigeo destino");
                return false;
            }
            else {
                vCodUbigeoDestino = $CI_hdnUbicacion.val();
            }

            if ($CI_txtDireccion.val() == "") {
                app.message.error("Validación", "Se debe ingresar la dirección");
                return false;
            }
            else {
                vDireccion = $CI_txtDireccion.val();
            }

            if (!app.validaNumeroEntero($CI_txtNroPiso.val())) {
                app.message.error("Validación", "Número inválido para el campo Piso");
            }
            else {
                if (parseInt($CI_txtNroPiso.val()) <= 0) {
                    app.message.error("Validación", "El Nro de Piso debe ser mayor a 0.")
                }
                else { vNroPiso = parseInt($CI_txtNroPiso.val()); }
            }

        }

        if ($CI_txtCantCosteo.attr("readonly") != "readonly" || $CI_txtCantCosteo.attr("disabled") != "disabled") {
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
        }

        if ($CI_txtMtoUnitarioCosto.attr("readonly") != "readonly" && $CI_txtMtoUnitarioCosto.attr("disabled") != "disabled") {
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
                    else {
                        vMontoUnitarioCosto = parseFloat($CI_txtMtoUnitarioCosto.val());
                    }
                }
            }
        }
        
        if ($CI_txtMtoTotalCosto.attr("readonly") != "readonly" && $CI_txtMtoTotalCosto.attr("disabled") != "disabled") {
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
                    else {
                        vMontoTotalCosto = parseFloat($CI_txtMtoTotalCosto.val());
                    }
                }
            }
        }

        if ($CI_txtCantPrevent.attr("readonly") != "readonly" && $CI_txtCantPrevent.attr("disabled") != "disabled") {

            if (!app.validaNumeroEntero($CI_txtCantPrevent.val())) {
                app.message.error("Validación", "N&uacute;mero inv&aacute;lido en cantidad de Mantenimientos Preventivos")
                return false;
            }
            else {
                if (parseInt($CI_txtCantPrevent.val()) <= 0) {
                    app.message.error("Validación", "La cantidad de Mantenimientos Preventivos debe ser mayor a 0.")
                }
                else {
                    vCantidadPreventivo = parseInt($CI_txtCantPrevent.val());
                    if ($CI_cmbCicloPreventivo.attr("readonly") != "readonly" || $CI_cmbCicloPreventivo.attr("disabled") != "disabled") {
                        if ($CI_cmbCicloPreventivo.val() != "") { vCodCicloPreventivo = $CI_cmbCicloPreventivo.val(); }
                    }
                }
            }

        }
        
        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCostoItem";
        var objDatos = {
            cotdetCosto: {
            Id: vId,
            IdCotizacionDetalle: $CI_cmbCDItem.val(),
            CotizacionDetalle: {
                Id: $CI_cmbCDItem.val(),
                IdCotizacion: $idCotizacion.val(),
                Descripcion: $DI_txtDescripcion.val(),
                Cantidad: $DI_txtCantidad.val()
                },
            CodCosto: $CI_cmbTipoCosto.val(),
            DescCosto: $("#select2-" + $CI_cmbTipoCosto.attr("id") + "-container").attr("title"),
            CantidadCosto: $CI_txtCantCosteo.val(),
            CantPreventivo: vCantidadPreventivo,
            CodCicloPreventivo: vCodCicloPreventivo,
            CodUbigeoDestino: vCodUbigeoDestino,
            Direccion: vDireccion,
            AmbienteDestino: $CI_txtAmbDestino.val(),
            NroPiso: vNroPiso,
            MontoUnitarioCosto: vMontoUnitarioCosto,
            MontoTotalCosto: vMontoTotalCosto
            },
            opcGrilla: $CI_opcGrilla.val()
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            if ($CI_opcGrilla.val() == "1") {
                cargarGrillaCostosCotDet(data);
            }
            else {
                loadGridbyCost(data, $CI_hdnCodCosto.val());
            }

            var fnCallback = function () {
                var fnSi = function () {

                    $CI_hdnIdCotDetCosto.val("");
                    if ($CI_cmbCDItem.attr("disabled") != "disabled" && $CI_cmbCDItem.attr("readonly") != "readonly") {
                        $CI_cmbCDItem.get(0).selectedIndex = 0;
                        $CI_cmbCDItem.trigger("change.select2");
                        $CI_txtCantCotDet.val("");
                        $CI_txtUnidadMedida.val("");
                    }
                    if ($CI_cmbTipoCosto.attr("disabled") != "disabled" && $CI_cmbTipoCosto.attr("readonly") != "readonly") {
                        $CI_cmbTipoCosto.get(0).selectedIndex = 0;
                        $CI_cmbTipoCosto.trigger("change.select2");
                    }
                    $CI_hdnUbicacion.val("");
                    $CI_txtUbicacion.val("");
                    ubigeo.setUbigeoById("");
                    $CI_txtDireccion.val("");
                    $CI_txtAmbDestino.val("");
                    $CI_txtNroPiso.val("");
                    $CI_txtCantCosteo.val("");
                    $CI_txtMtoUnitarioCosto.val("");
                    $CI_txtMtoTotalCosto.val("");
                    $CI_txtCantPrevent.val("");
                    $CI_cmbCicloPreventivo.get(0).selectedIndex = 0;
                    $CI_cmbCicloPreventivo.trigger("change.select2");
                    return true;
                }
                var fnNo = function () {
                    cerrarModalCostosItem();
                    return true;
                }
                return app.message.confirm("Costos", "¿Des&eacute;a seguir agregando m&aacute;s costos?", "S&iacute;", "No", fnSi, fnNo);
            };

            app.message.success("Costos", "Se guard&oacute; el costo correctamente.", "Aceptar", fnCallback);
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function editarCostoItem(strId, opcGrilla) {

        //Se define la opcion de grilla para saber que tipo de datos se guardan
        $CI_opcGrilla.val(opcGrilla);

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarDatosCostoItem";
        var objDatos = {
            Id: strId
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {

            LimpiarModalCostos();

            $CI_pnlInfoGeneral.css("display", "");
            $CI_hdnIdCotDetCosto.val(data.Result.Id);
            $CI_cmbCDItem.val(data.Result.IdCotizacionDetalle).trigger("change.select2");
            if ($CI_opcGrilla.val() == "1") {
                $CI_cmbTipoCosto.val(data.Result.CodCosto).trigger("change.select2");
            }
            if ($CI_opcGrilla.val() == "2") {
                $CI_cmbTipoCosto.val($CI_hdnCodCosto.val()).trigger("change.select2");
            }
            $CI_cmbTipoCosto.attr("disabled", "disabled");
            $CI_txtCantCotDet.val(data.Result.CotizacionDetalle.Cantidad);
            $CI_txtUnidadMedida.val(data.Result.CotizacionDetalle.DescUnidad);
            if (data.Result.CodUbigeoDestino != null) {
                ubigeo.setUbigeoById(data.Result.CodUbigeoDestino);
                if ($CI_txtUbicacion.attr("readonly") == "readonly") {
                    $CI_txtUbicacion.removeAttr("readonly");
                    $CI_txtUbicacion.attr("disabled", "disabled");
                }
            }
            $CI_txtDireccion.val(data.Result.Direccion);
            $CI_txtAmbDestino.val(data.Result.AmbienteDestino);
            $CI_txtNroPiso.val(data.Result.NroPiso);
            $CI_txtCantCosteo.val(data.Result.CantidadCosto);
            $CI_txtMtoUnitarioCosto.val(data.Result.MontoUnitarioCosto);
            $CI_txtMtoTotalCosto.val(data.Result.MontoTotalCosto);
            $CI_txtCantPrevent.val(data.Result.CantPreventivo);
            $CI_cmbCicloPreventivo.val(data.Result.CodCicloPreventivo).trigger("change.select2");

            configurarModalCosto();

            $('#modalCostoItem').modal('show');
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function totalizarCostItem() {
        if ($CI_txtMtoTotalCosto.attr("readonly") == "readonly" || $CI_txtMtoTotalCosto.attr("disabled") == "disabled") {
            if ($CI_txtCantCosteo.val() != "" && $CI_txtMtoUnitarioCosto.val() != "") {
                if (app.validaNumeroEntero($CI_txtCantCosteo.val()) && app.validaNumeroDecimal($CI_txtMtoUnitarioCosto.val())) {
                    var redondeo = app.obtenerCantidadDecimales($CI_txtMtoUnitarioCosto.val());
                    $CI_txtMtoTotalCosto.val((parseFloat($CI_txtMtoUnitarioCosto.val()) * parseInt($CI_txtCantCosteo.val())).toFixed(redondeo));
                }
            }
        }
        if ($CI_txtMtoUnitarioCosto.attr("readonly") == "readonly" || $CI_txtMtoUnitarioCosto.attr("disabled") == "disabled") {
            if ($CI_txtCantCosteo.val() != "" && $CI_txtMtoTotalCosto.val() != "") {
                if (app.validaNumeroEntero($CI_txtCantCosteo.val()) && app.validaNumeroDecimal($CI_txtMtoTotalCosto.val())) {
                    var redondeo = app.obtenerCantidadDecimales($CI_txtMtoTotalCosto.val());
                    $CI_txtMtoUnitarioCosto.val((parseFloat($CI_txtMtoTotalCosto.val()) / parseInt($CI_txtCantCosteo.val())).toFixed(redondeo));
                }
            }
        }
    }

    function quitarCostoItem(strId, strCodCosto, opcGrilla) {

        var bEsTemp = false;
        if (opcGrilla == "1") { bEsTemp = true; }

        method = "POST";
        url = "BandejaSolicitudesVentas/EliminarCostoItem";
        var objDatos = {
            Id: strId,
            IsTempRecord: bEsTemp
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
        setTab_Instalacion: setTab_Instalacion,
        setTab_Capacitacion: setTab_Capacitacion,
        setTab_Manuales: setTab_Manuales,
        setTab_Videos: setTab_Videos,
        setTab_MantPrevent: setTab_MantPrevent,
        setTab_Calibra: setTab_Calibra,
        setTab_Flete: setTab_Flete,
        LimpiarModalCostos: LimpiarModalCostos,
        agregarCostoItem: agregarCostoItem,
        editarCostoItem: editarCostoItem,
        quitarCostoItem: quitarCostoItem,
        cargarComboCotDetItems: cargarComboCotDetItems,
        cargarCiclosPreventivos: cargarCiclosPreventivos,
        cargarTipoCostos: cargarTipoCostos,
        cargarCotDetSeleccionada: cargarCotDetSeleccionada,
        cargarGrillaCostosCotDet: cargarGrillaCostosCotDet,
        cargarCostosItemsxTab: cargarCostosItemsxTab,
        cargarGrillaCostos_Default: cargarGrillaCostos_Default,
        guardarCostoItem: guardarCostoItem,
        cerrarModalCostosItem: cerrarModalCostosItem
    }
})(window.jQuery, window, document);