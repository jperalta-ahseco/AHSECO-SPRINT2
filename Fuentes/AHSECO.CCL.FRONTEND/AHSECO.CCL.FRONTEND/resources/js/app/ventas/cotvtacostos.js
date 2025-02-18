var cotvtacostos = (function ($, win, doc) {

    var $estadoSol = $('#estadoSol');
    var $idCotizacion = $("#idCotizacion");
    var $idRolUsuario = $("#idRolUsuario");
    var $idWorkFlow = $("#idWorkFlow");
    var $tipoSolicitud = $('#TipoSolicitud');

    var $RolVenta_Asesor = $("#RolVenta_Asesor");
    var $RolVenta_Jefe = $("#RolVenta_Jefe");
    var $RolVenta_CoordVta = $("#RolVenta_CoordVta");
    var $RolVenta_ServTecnico = $("#RolVenta_ServTecnico");
    var $RolVenta_Gerente = $("#RolVenta_Gerente");
    var $RolVenta_Importacion = $("#RolVenta_Importacion");
    var $RolVenta_Costos = $("#RolVenta_Costos");
    var $RolVenta_Logistica = $("#RolVenta_Logistica");
    var $RolVenta_CoordServ = $("#RolVenta_CoordServ");
    var $RolVenta_CoordAtc = $("#RolVenta_CoordAtc");
    var $RolVenta_Facturador = $("#RolVenta_Facturador");

    var $PermitirEditarCotDetItem = $("#PermitirEditarCotDetItem");
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
    
    var $DI_btnAgregarCosto = $("#DI_btnAgregarCosto");
    var $DI_tblCostos = $("#DI_tblCostos");
    var $DI_opcGrilla = $("#DI_opcGrilla");

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

    var $CX_cmbCDItem = $("#CX_cmbCDItem");
    var $CX_hdnIdCotDetCosto = $("#CX_hdnIdCotDetCosto");
    var $CX_cmbTipoCosto = $("#CX_cmbTipoCosto");
    var $CX_txtCantCotDet = $("#CX_txtCantCotDet");
    var $CX_txtUnidadMedida = $("#CX_txtUnidadMedida");
    var $CX_hdnUbicacion = $("#CX_hdnUbicacion");
    var $CX_txtUbicacion = $("#CX_txtUbicacion");
    var $CX_txtDireccion = $("#CX_txtDireccion");
    var $CX_txtAmbDestino = $("#CX_txtAmbDestino");
    var $CX_txtNroPiso = $("#CX_txtNroPiso");
    var $CX_txtCantCosteo = $("#CX_txtCantCosteo");
    var $CX_txtCantPrevent = $("#CX_txtCantPrevent");
    var $CX_cmbCicloPreventivo = $("#CX_cmbCicloPreventivo");
    var $CX_btnCerrar = $("#CX_btnCerrar");
    var $CX_CodCosto_LLaveMano = $("#CX_CodCosto_LLaveMano");
    var $CX_CodCosto_Instalacion = $("#CX_CodCosto_Instalacion");
    var $CX_CodCosto_Capacitacion = $("#CX_CodCosto_Capacitacion");
    var $CX_CodCosto_Manuales = $("#CX_CodCosto_Manuales");
    var $CX_CodCosto_Videos = $("#CX_CodCosto_Videos");
    var $CX_CodCosto_MantPrevent = $("#CX_CodCosto_MantPrevent");
    var $CX_CodCosto_Calibra = $("#CX_CodCosto_Calibra");
    var $CX_CodCosto_Flete = $("#CX_CodCosto_Flete");
    var $CX_txtMtoUnitarioCosto = $("#CX_txtMtoUnitarioCosto");
    var $CX_opcGrilla = $("#CX_opcGrilla");
    var $CX_btnGuardar = $("#CX_btnGuardar");
    var $det_nav_tabs = $('#det_nav_tabs');

    var $btnAñadirCosteo = $("#btnAñadirCosteo");
    var $tblCostosUnitarios = $("#tblCostosUnitarios");
    var costeoMultiple = [];

    var $CI_opcGrilla = $("#CI_opcGrilla");

    var $hdnCostosAgregados = $("#hdnCostosAgregados");

    $(Initialize);

    function Initialize() {

        $tabDetCot.addClass("active");

        logicaTabs();
        //console.log(nodeList);
        //element.style

      



        //$DI_btnAgregarCosto.click(agregarCostoItem);

        $CI_btnCerrar.click(cerrarModalCostosItem);
        $CX_btnCerrar.click(cerrarModalCostosItemMultiple);
        
        cargarCiclosPreventivos();
        cargarTipoCostos();


        

        $CI_cmbCDItem.on("change", cargarCotDetSeleccionada);

        $CX_cmbTipoCosto.on("change", configurarModalCostoMultiple);

        //$DI_radInstalacion_Si.click(cargarTipoCostos);
        //$DI_radInstalacion_No.click(cargarTipoCostos);
        //$DI_radCapacitacion_Si.click(cargarTipoCostos);
        //$DI_radCapacitacion_No.click(cargarTipoCostos);
        //$DI_radManuales_Si.click(cargarTipoCostos);
        //$DI_radManuales_No.click(cargarTipoCostos);
        //$DI_radVideos_Si.click(cargarTipoCostos);
        //$DI_radVideos_No.click(cargarTipoCostos);
        //$DI_radMantPrevent_Si.click(cargarTipoCostos);
        //$DI_radMantPrevent_No.click(cargarTipoCostos);
        //$DI_radCalibracion_Si.click(cargarTipoCostos);
        //$DI_radCalibracion_No.click(cargarTipoCostos);

        $CI_cmbTipoCosto.on("change", configurarModalCosto);

        //$CI_btnGuardar.click(guardarCostoItem);
        $CX_btnGuardar.click($CX_btnGuardar_click)

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

        $CI_txtCantCosteo.click(totalizarCostItem);
        $CI_txtMtoUnitarioCosto.click(totalizarCostItem);
        $CI_txtMtoTotalCosto.click(totalizarCostItem);
        $btnAñadirCosteo.click($btnAñadirCosteo_click);

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

    function logicaTabs() {
        var nav = document.getElementById('det_nav_tabs');
        if (nav != undefined) {
            var nodeList = nav.childNodes;
            var tabsActivos = [];

            for (var i = 0; nodeList.length > i; i++) {
                //console.log(nodeList[i].style);
                if (nodeList[i].style != undefined) {
                    var estilos = nodeList[i].style;
                    if (estilos.cssText != 'display: none;') {
                        tabsActivos.push(nodeList[i]);
                    }
                };
            }

            if (tabsActivos.length > 0) {
                var tabActivo = tabsActivos[0];
                $('#' + tabActivo.id.toString()).addClass("active");

                tabActivo = document.getElementById(tabActivo.id.toString());
                var anchor = tabActivo.childNodes;
                var href = anchor[1].hash

                var onclick = anchor[1].getAttribute("onclick");

                eval(onclick);

                $(href.toString()).addClass("active in");
            }
        }
    }

    function LimpiarModalCostos() {
        $CI_hdnIdCotDetCosto.val("");
        $CI_cmbCDItem.removeAttr("disabled");
        //$CI_cmbCDItem.get(0).selectedIndex = 0;
        $CI_cmbCDItem.trigger("change.select2");
        $CI_cmbTipoCosto.removeAttr("disabled");
        //$CI_cmbTipoCosto.get(0).selectedIndex = 0;
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
        }
        else {
            $CI_pnlInfoDestino.css("display", "");
            $CI_txtUbicacion.removeAttr("disabled");
            $("#searchUbigeo").attr("data-target", "#modalUbigeo");
            $("#searchUbigeo").css("cursor", "pointer");
            $CI_txtDireccion.removeAttr("disabled");
            $CI_txtAmbDestino.removeAttr("disabled");
            $CI_txtNroPiso.removeAttr("disabled");
        }

        //Se valida si el tipo de COSTO se agrega solo el MONTO TOTAL
        if ($CI_cmbTipoCosto.val() == $CI_CodCosto_Manuales.val() || $CI_cmbTipoCosto.val() == $CI_CodCosto_Videos.val() ||
            $CI_cmbTipoCosto.val() == $CI_CodCosto_Capacitacion.val()) {
            $CI_pnlInfoCostos_MtoUnitario.css("display", "none");
            $CI_txtMtoUnitarioCosto.attr("disabled", "disabled");
            $CI_pnlInfoCostos_MtoTotal.css("display", "");
            $CI_txtMtoTotalCosto.removeAttr("disabled");
        }
        else {
            $CI_pnlInfoCostos_MtoUnitario.css("display", "");
            $CI_txtMtoUnitarioCosto.removeAttr("disabled");
            $CI_pnlInfoCostos_MtoTotal.css("display", "none");
            $CI_txtMtoTotalCosto.attr("disabled", "disabled");
        }

        //Se valida si el tipo de COSTO se agregará CANTIDAD y CICLO PREVENCION
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

        //Se habilita la pantalla por ROL
        if ($idRolUsuario.val() == $RolVenta_Asesor.val()
            || $idRolUsuario.val() == $RolVenta_CoordServ.val()
            || $idRolUsuario.val() == $RolVenta_CoordAtc.val()) {

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
                //Solo el Asesor para Calibración puede agregar el MONTO UNITARIO
                if ($CI_cmbTipoCosto.val() == $CI_CodCosto_Calibra.val() && $idRolUsuario.val() == $RolVenta_Asesor.val()) {
                    $CI_txtMtoUnitarioCosto.removeAttr("disabled");
                }
                else {
                    $CI_txtMtoUnitarioCosto.attr("disabled", "disabled");
                }
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

    function LimpiarDatosFormulario() {
        $("#CX_hdnUbicacion").val('');
        $("#CX_txtUbicacion").val('');
        $("#CX_txtAmbDestino").val('');
        $("#CX_txtDireccion").val('');
        $("#CX_txtNroPiso").val('');
        $("#CX_txtCantCosteo").val('0');
        $("#CX_txtCantPrevent").val('0');
        $("#CX_txtMtoUnitarioCosto").val('0.00');
        $CX_cmbCicloPreventivo.get(0).selectedIndex = 0;
        $CX_cmbCicloPreventivo.trigger("change.select2");
    }


    function configurarModalCostoMultiple() {

        LimpiarDatosFormulario();
        if ($CX_cmbTipoCosto.val() == $CX_CodCosto_Manuales.val() || $CX_cmbTipoCosto.val() == $CX_CodCosto_Videos.val() ||
            $CX_cmbTipoCosto.val() == $CX_CodCosto_Capacitacion.val()) {


            $("#SeccionDestino").css("display", "none");
            $("#leyInfoDestino").css("display", "none");
            $("#SeccionDireccion").css("display", "none");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $("#SeccionCalibracion").css("display", "none");
           

        }
        else if ($CX_cmbTipoCosto.val() == $CX_CodCosto_Calibra.val()) {
            $("#SeccionDestino").css("display", "none");
            $("#leyInfoDestino").css("display", "none");
            $("#SeccionDireccion").css("display", "none");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $("#SeccionCalibracion").css("display", "");

        }
        else if ($CX_cmbTipoCosto.val() == $CX_CodCosto_LLaveMano.val() ||
            $CX_cmbTipoCosto.val() == $CX_CodCosto_Instalacion.val() ||
            $CX_cmbTipoCosto.val() == $CX_CodCosto_Flete.val()) {
            $("#SeccionDestino").css("display", "");
            $("#leyInfoDestino").css("display", "");
            $("#SeccionDireccion").css("display", "");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $("#SeccionCalibracion").css("display", "none");
        }
        else if ($CX_cmbTipoCosto.val() == $CX_CodCosto_MantPrevent.val())
        {
            $("#SeccionDestino").css("display", "");
            $("#leyInfoDestino").css("display", "");
            $("#SeccionDireccion").css("display", "");
            $("#LeyPreventivo").css("display", "");
            $("#SeccionPreventivo").css("display", "");
            $("#SeccionCalibracion").css("display", "none");
        }
        else {
            $("#SeccionDestino").css("display", "none");
            $("#leyInfoDestino").css("display", "none");
            $("#SeccionDireccion").css("display", "none");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $("#SeccionCalibracion").css("display", "none");
        }
    }
    //function agregarCostoItem() {

    //    if ($DI_txtCantidad.val() == "") {
    //        app.message.error("Validaci&oacute;n", "La Cantidad no puede ser vac&iacute;o");
    //        return false;
    //    }
    //    else {
    //        if (!app.validaNumeroEntero($DI_txtCantidad.val())) {
    //            app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Cantidad");
    //            return false;
    //        }
    //        else {
    //            if (parseInt($DI_txtCantidad.val()) <= 0) {
    //                app.message.error("Validaci&oacute;n", "La cantidad debe ser mayor a 0.");
    //                return false;
    //            }
    //        }
    //    }

    //    cargarComboCotDetItems();
    //    LimpiarModalCostos();
    //    cargarTipoCostos();

    //    configurarModalCosto();

    //    //Para el buscador se selecciona por defecto la cotizacion detalle en pantalla
    //    if ($DI_opcGrilla.val() == "1") {
    //        $CI_opcGrilla.val("1");
    //        $CI_cmbCDItem.attr("data-selected", $DI_hdnIdCotDet.val());
    //        $CI_cmbCDItem.val($DI_hdnIdCotDet.val()).trigger("change.select2");
    //        $CI_cmbTipoCosto.removeAttr("disabled");
    //    }
    //    else {
    //        $CI_opcGrilla.val("2");
    //        $CI_cmbCDItem.attr("data-selected", $DI_hdnIdCotDet.val());
    //        $CI_cmbCDItem.val($DI_hdnIdCotDet.val()).trigger("change.select2");
    //        $CI_cmbTipoCosto.removeAttr("disabled");
    //        //$CI_cmbCDItem.removeAttr("data-selected");
    //        //$CI_cmbCDItem.val("").trigger("change.select2");
    //        //$CI_cmbTipoCosto.attr("disabled", "disabled");
    //    }

    //    $("#modalCostoItem").modal('show');
    //}
    function agregarCostoItem() {


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

        $CX_cmbCDItem.attr("data-selected", $DI_hdnIdCotDet.val());
        $CX_cmbCDItem.val($DI_hdnIdCotDet.val()).trigger("change.select2");
        cargarCiclosPreventivosMultiple();
        cargarComboCotDetItemsMultiple();
        cargarTipoCostosxMultiple();
        LimpiarModalCostos2();
        configurarModalCostoMultiple();

        setTimeout(function () {
            cargarCotDetSeleccionadaMultiple();
            
        }, 1500);

      //  ubigeo.setTxtUbigeo_Id("CX_hdnUbicacion");
     //   ubigeo.setTxtUbigeo_Text("CX_txtUbicacion");
        

        $("#modalCostoItemMultiple").modal('show');
    }

    function consultaCostoListaItem() {

        method = "POST";
        url = "BandejaSolicitudesVentas/ConsultaListaCostoItem";
        var objFiltros = {};
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallback = function (data) {

            costeoMultiple.splice(0, costeoMultiple.length);  


            //Limpiar grilla de costos multiples:
            $("#tblCostosUnitarios tbody tr").remove();

            for (i = 0; i < data.Result.length; i++) {

               

                var id = data.Result[i].strID.replace(/-/g, ""); 

                var idem = i + 1;
                var item = idem.toString().padStart(3, '0');

                costeoMultiple.push({
                    Id: id,
                    IdCotizacionDetalle: data.Result[i].IdCotizacionDetalle,
                    Descripcion: data.Result[i].CotizacionDetalle.Descripcion,
                    Codigo: data.Result[i].IdCotizacion,
                    Item: item,
                    CodigoTipoCosto: data.Result[i].CodCosto,
                    TipoCosto: data.Result[i].DescCosto,
                    Ubigeo: data.Result[i].CodUbigeoDestino,
                    DesUbigeo: data.Result[i].DescUbigeoDestino,
                    Direccion: data.Result[i].Direccion,
                    NroPiso: data.Result[i].NroPiso,
                    LocalDestino: data.Result[i].AmbienteDestino,
                    CantCosteada: parseInt(data.Result[i].CantidadCosto),
                    CantPreventivos: data.Result[i].CantPreventivo,
                    CodPeriodicidad: data.Result[i].CodCicloPreventivo,
                    DesPeriodicidad: data.Result[i].DesPeriodicidad,
                    IdCotizacion: data.Result[i].IdCotizacion,
                    Cantidad: data.Result[i].CantidadCotizada,
                    MontoUnitarioCosto: app.convertirNumero(data.Result[i].MontoUnitarioCosto),
                    strID: data.Result[i].strID
                });


            }

            costeoMultiple.forEach(function (costeo) {

                

                var cant_preventivos = costeo.CantPreventivos;
                if (costeo.CantPreventivos === "0" || costeo.CantPreventivos === 0 || costeo.CantPreventivos === null) {
                    cant_preventivos = "";
                }

                var desPeriodicidad = costeo.DesPeriodicidad;
                if (costeo.DesPeriodicidad === null) {
                    desPeriodicidad = "";
                }

                var desUbigeo = costeo.DesUbigeo;
                if (costeo.DesUbigeo === null) {
                    desUbigeo = "";
                }

                var costoUnitario = costeo.MontoUnitarioCosto;
                if (costeo.MontoUnitarioCosto === null || costeo.MontoUnitarioCosto === "" || costeo.MontoUnitarioCosto === "0" || costeo.MontoUnitarioCosto === "0.00") {
                    costoUnitario = "";
                }
                else {
                    costoUnitario = app.convertirNumero(costoUnitario);
                }

                var html = '<div class="text-center">';
                html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:cotvtacostos.eliminarCosto(' + costeo.IdCotizacion + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
                html += '</div>';

                var nuevoTr = "<tr bgcolor='FFFDC1' id='fila" + costeo.IdCotizacion + "'>" +
                    "<th>" + costeo.Item + "</th>" +
                    "<th>" + costeo.TipoCosto + "</th>" +
                    "<th>" + desUbigeo + "</th>" +
                    "<th>" + costeo.CantCosteada + "</th>" +
                    "<th>" + cant_preventivos + "</th>" +
                    "<th>" + desPeriodicidad + "</th>" +
                    "<th>" + costoUnitario + "</th>"+
                    "<th>" + html + "</th>" +
                    "</tr>";
                $tblCostosUnitarios.append(nuevoTr);

            });

            if (costeoMultiple.length === 0) {
                var nuevoTr = "<tr id='NoRegCostoMultiple'>" +
                    "<td align='center' colspan='8'>No existen registros</td>" +
                    "</tr>";
                $tblCostosUnitarios.append(nuevoTr);
            }
        };

        return app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function $btnAñadirCosteo_click() {
        if ($CX_cmbTipoCosto.val() === "" || $CX_cmbTipoCosto.val() == 0) {
            app.message.error("Validacion", "Debe seleccionar una opción del tipo de costo");
            return;
        }
        if ($CX_txtCantCosteo.val() === "" || $CX_txtCantCosteo.val() == 0) {
            app.message.error("Validacion", "Debe agregar la cantidad a costear");
            return;
        }

        //Para calibración
        if ($CX_cmbTipoCosto.val() === "CXCD0007" && ($CX_txtMtoUnitarioCosto.val() === "" || $CX_txtMtoUnitarioCosto.val() === null)) {
            app.message.error("Validacion", "Debe agregar el monto unitario de costo");
            return;
        }

        if ($CX_cmbTipoCosto.val() === "CXCD0007" && ($CX_txtMtoUnitarioCosto.val() === "0.00" || $CX_txtMtoUnitarioCosto.val() === "0")) {
            app.message.error("Validacion", "El monto unitario de costo no debe ser cero.");
            return;
        }

        //LLave en mano, Instalacion, Mantenimiento Preventivo y Flete:
        if ($CX_cmbTipoCosto.val() === "CXCD0001" || $CX_cmbTipoCosto.val() === "CXCD0002" ||
            $CX_cmbTipoCosto.val() === "CXCD0006" || $CX_cmbTipoCosto.val() === "CXCD0008") {

                if ($CX_txtUbicacion.val() === "" || $CX_txtUbicacion.val() == null) {
                    app.message.error("Validacion", "Debe seleccionar una ubicación destino");
                    return;
                }

                //if ($CX_txtAmbDestino.val() === "" || $CX_txtAmbDestino.val() == null) {
                //    app.message.error("Validacion", "Debe ingresar el local a enviar");
                //    return;
                //}

                if ($CX_txtDireccion.val() === "" || $CX_txtDireccion.val() == null) {
                    app.message.error("Validacion", "Debe ingresar una dirección");
                    return;
                }

                //if ($CX_txtNroPiso.val() === "" || $CX_txtNroPiso.val() == null) {
                //    app.message.error("Validacion", "Debe ingresar datos del piso");
                //    return;
                //}

        }

        //Para preventivos:
        if ($CX_cmbTipoCosto.val() === "CXCD0006") {
            if ($CX_txtCantPrevent.val() === "" || $CX_txtCantPrevent.val() == null || $CX_txtCantPrevent.val() == 0) {
                app.message.error("Validacion", "Debe ingresar la cantidad de preventivo");
                return;
            }

            if ($CX_cmbCicloPreventivo.val() === "" || $CX_cmbCicloPreventivo.val() == null || $CX_cmbCicloPreventivo.val() == 0) {
                app.message.error("Validacion", "Debe seleccionar el ciclo de preventivo");
                return;
            }
        }


        var codigo = 0;
        if (costeoMultiple.length == 0) {
            codigo = 1;
        }
        else {
            var maxCodigo = Math.max(...costeoMultiple.map(item => item.Codigo));
            codigo = maxCodigo + 1;
        }

        var vId = 0;
        if ($CX_hdnIdCotDetCosto.val() != "") { vId = parseInt($CX_hdnIdCotDetCosto.val()); }
        var item = codigo.toString().padStart(3, '0');
        var cod_TipoCosto = $CX_cmbTipoCosto.val();
        var des_TipoCosto = $("#CX_cmbTipoCosto option:selected").text();
        var ubigeo = $CX_hdnUbicacion.val();
        var des_ubigeo = $CX_txtUbicacion.val();
        var cantCosteada = $CX_txtCantCosteo.val();
        var cantPreventivos = $CX_txtCantPrevent.val();
        var cod_Periodicidad = $CX_cmbCicloPreventivo.val();
        var des_Periodicidad = $("#CX_cmbCicloPreventivo option:selected").text();
        var mtoUnitarioCosto =$CX_txtMtoUnitarioCosto.val();
        if (cod_Periodicidad == 0 || cod_Periodicidad === "") {
            des_Periodicidad = "";
        }
        var direccion = $CX_txtDireccion.val();
        var nro_piso = $CX_txtNroPiso.val();
        var local_destino = $CX_txtAmbDestino.val();

        var sumaCantidades = costeoMultiple
            .filter(item => item.CodigoTipoCosto === $CX_cmbTipoCosto.val()) // Filtra solo los que son del mismo tipo
            .reduce((total, item) => total + item.CantCosteada, 0);

        var restante = parseInt($CX_txtCantCotDet.val()) - parseInt(sumaCantidades);
        var nueva_suma = parseInt(sumaCantidades) + parseInt($CX_txtCantCosteo.val());

        if (nueva_suma > $CX_txtCantCotDet.val()) {
            app.message.error("Validacion", "La cantidad ha costear sobrepada la cantidad total de los productos, tiene " + restante + " cantidad(es) para costear para " + des_TipoCosto);
            return;
        }

      
 
        costeoMultiple.push({
            Id: vId,
            IdCotizacionDetalle: $CX_cmbCDItem.val(),
            Descripcion: $DI_txtDescripcion.val(),
            Codigo: codigo,
            Item: item,
            CodigoTipoCosto: cod_TipoCosto,
            TipoCosto: des_TipoCosto,
            Ubigeo: ubigeo,
            DesUbigeo: des_ubigeo,
            Direccion: direccion,
            NroPiso: nro_piso,
            LocalDestino: local_destino,
            CantCosteada: parseInt(cantCosteada),
            CantPreventivos: cantPreventivos,
            CodPeriodicidad: cod_Periodicidad,
            DesPeriodicidad: des_Periodicidad,
            IdCotizacion: $idCotizacion.val(),
            Cantidad: $DI_txtCantidad.val(),
            MontoUnitarioCosto: mtoUnitarioCosto,
            strID: 0
        });
  
        //$('#NoRegCostoMultiple').hide();
        $("#NoRegCostoMultiple").remove();

        var html = '<div class="text-center">';
        html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:cotvtacostos.eliminarCosto(' + codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
        html += '</div>';

        var cantidad_preventivos = cantPreventivos;
        if (cantPreventivos == 0) {
            cantidad_preventivos = "";
        }

        var monto_unitario = mtoUnitarioCosto;
        if (mtoUnitarioCosto === "0" || mtoUnitarioCosto === "0.00" || mtoUnitarioCosto === null) {
            monto_unitario = "";
        }

        var nuevoTr = "<tr bgcolor='FFFDC1' id='fila" + codigo + "'>" +
            "<th>" + item + "</th>" +
            "<th>" + des_TipoCosto + "</th>" +
            "<th>" + des_ubigeo + "</th>" +
            "<th>" + cantCosteada + "</th>" +
            "<th>" + cantidad_preventivos + "</th>" +
            "<th>" + des_Periodicidad + "</th>" +
            "<th>" + monto_unitario + "</th>" +
            "<th>" + html + "</th>" +
            "</tr>";
        $tblCostosUnitarios.append(nuevoTr);

        //Llave en mano: CXCD0001 X
        //Instalacion: CXCD0002 X
        //Capacitacion: CXCD0003
        //Manuales: CXCD0004
        //Videos: CXCD0005
        //Mantenimiento Preventivo: CXCD0006 X
        //Calibracion: CXCD0007
        //Flete: CXCD0008 X

        //costeoMultiple


    }

    function $CX_btnGuardar_click() {


        if (costeoMultiple.length === 0) {
            app.message.error("Validacion", "La bandeja de costos no tiene ningun registro.");
            return;
        }


        var vId = 0;
        if ($CX_hdnIdCotDetCosto.val() != "") { vId = parseInt($CX_hdnIdCotDetCosto.val()); }
        var vCodUbigeoDestino = null;
        var vDireccion = null;
        var vNroPiso = null;
        var vCantidadPreventivo = null;
        var vCodCicloPreventivo = null;
        var vMontoUnitarioCosto = null;
        var vMontoTotalCosto = null;


        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/GrabarDatosCostoItemMultiple";


            var ListaCostoItem = [];
            costeoMultiple.forEach(function (costeo) {
                var CostoItem= {
                        Id: costeo.Id,
                        IdCotizacionDetalle: costeo.IdCotizacionDetalle,
                        IdCotizacion: costeo.IdCotizacion,
                        CotizacionDetalle: {
                            Id: costeo.IdCotizacionDetalle,
                            IdCotizacion: costeo.IdCotizacion,
                            Descripcion: costeo.Descripcion,
                            Cantidad: app.convertirNumero(costeo.Cantidad)
                        },
                        CantidadCotizada: app.convertirNumero(costeo.Cantidad),
                        CodCosto: costeo.CodigoTipoCosto,
                        DescCosto: costeo.TipoCosto,
                        CantidadCosto: app.convertirNumero(costeo.CantCosteada),
                        CantPreventivo: app.convertirNumero(costeo.CantPreventivos),
                        CodCicloPreventivo: costeo.CodPeriodicidad,
                        CodUbigeoDestino: costeo.Ubigeo,
                        DescUbigeoDestino: costeo.DesUbigeo,
                        Direccion: costeo.Direccion,
                        AmbienteDestino: costeo.LocalDestino,
                        NroPiso: costeo.NroPiso,
                        MontoUnitarioCosto: app.convertirNumero(costeo.MontoUnitarioCosto),
                        MontoTotalCosto: app.convertirNumero(vMontoTotalCosto)
                    }

                ListaCostoItem.push(CostoItem);      

            });

            var objDatos = {
                ListaCostoItem: ListaCostoItem,
                opcGrilla: $CX_opcGrilla.val()
            };

            var objParam = JSON.stringify(objDatos);
            var fnDoneCallBack = function (data) {

                cargarGrillaCostosCotDet(data);

                app.message.success("Costos", "Se guard&oacute; los costos correctamente.", "Aceptar", null);
                $('#modalCostoItemMultiple').modal('hide');
                $("#tblCostosUnitarios tbody tr").remove();
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);


           

        }
        return app.message.confirm("Ventas", "&iquest;Esta seguro que desea insertar los costos del producto?", "Si", "No", fnSi, null);

      

    }

    function eliminarCosto(codigo) {
        var fnSi = function () {
            var indice = costeoMultiple.findIndex(item => item.Codigo === codigo);
            if (indice !== -1) {
                costeoMultiple.splice(indice, 1);  // Elimina el elemento en el índice encontrado
            }

            $("#fila" + codigo).remove();

            if (costeoMultiple.length === 0) {
                //$('#NoRegCostoMultiple').show();
                var nuevoTr = "<tr id='NoRegCostoMultiple'>" +
                    "<td align='center' colspan='8'>No existen registros</td>" +
                    "</tr>";
                $tblCostosUnitarios.append(nuevoTr);
            }

        }
        return app.message.confirm("Ventas", "&iquest;Esta seguro de quitar el costo de la bandeja?", "S&iacute;", "No", fnSi, null);

    }

    function LimpiarModalCostos2() {
        $CX_hdnIdCotDetCosto.val("");
        //$CX_cmbCDItem.removeAttr("disabled");
        $CX_cmbCDItem.get(0).selectedIndex = 0;
        $CX_cmbCDItem.trigger("change.select2");
        $CX_cmbTipoCosto.removeAttr("disabled");
        $CX_cmbTipoCosto.get(0).selectedIndex = 0;
        $CX_cmbTipoCosto.trigger("change.select2");
        $CX_txtCantCotDet.val("");
        $CX_txtUnidadMedida.val("");
        $CX_hdnUbicacion.val("");
        $CX_txtUbicacion.val("");
        ubigeo.setUbigeoById("");
        $CX_txtDireccion.val("");
        $CX_txtAmbDestino.val("");
        $CX_txtNroPiso.val("");
        $CX_txtCantCosteo.val("0");
        $CX_txtCantPrevent.val("0");
        $CX_txtMtoUnitarioCosto.val("0.00");
        $CX_cmbCicloPreventivo.get(0).selectedIndex = 0;
        $CX_cmbCicloPreventivo.trigger("change.select2");
    }

    function cargarComboCotDetItemsMultiple() {
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarComboCotDetItems";
        var objFiltros = {};
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallback = function (data) {

            //Cargar combo de items:
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CX_cmbCDItem, data.Result, null, " ", "-- Seleccione --", filters);

        };

        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
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
        var url = "Utiles/ListarCicloPreventivo";
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

    function cargarCiclosPreventivosMultiple() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCiclosPreventivos";
        var oValores = {};
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Ninguno --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CX_cmbCicloPreventivo, data.Result, null, " ", "-- Ninguno --", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function cargarTodoTipoCostos() {
        
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerTipoCostos";
        var oValores = {
            CotizacionDespacho: {}
        };
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CI_cmbTipoCosto, data.Result, $("#modalCostoItem"), " ", "-- Seleccione --", filters);
        }
        return app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallback, null, null, null);
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

            var tipoSol = $tipoSolicitud.val();

            if (tipoSol != "TSOL05") {
                data.Result = data.Result.filter(tipCosto => tipCosto.Id != "CXCD0001");
            };

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CI_cmbTipoCosto, data.Result, $("#modalCostoItem"), " ", "-- Seleccione --", filters);
        }
        return app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function cargarTipoCostosxMultiple() {

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

            var tipoSol = $tipoSolicitud.val();

            if (tipoSol != "TSOL05") {
                data.Result = data.Result.filter(tipCosto => tipCosto.Id != "CXCD0001");
            };

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($CX_cmbTipoCosto, data.Result, $("#modalCostoItemMultiple"), " ", "-- Seleccione --", filters);
        }
        return app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function cargarCotDetSeleccionadaMultiple() {
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetSeleccionada";
        var objFiltros = {
            Id: $CX_cmbCDItem.val(),
            Cantidad: $DI_txtCantidad.val()
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallback = function (data) {
            $CX_txtCantCotDet.val("");
            $CX_txtUnidadMedida.val("");
            if (data.Result != null) {
                $CX_txtCantCotDet.val(data.Result.Cantidad);
                $CX_txtUnidadMedida.val(data.Result.DescUnidad);
            }
            consultaCostoListaItem();
        };

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
            IdCotizacion: $idCotizacion.val(),
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
                data: "CodItemCotizado",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescripcionCotizado",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescUnidadCotizada",
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
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "MontoTotalCosto",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data,type, row ) {
                    var hidden = '<input type="hidden" id="hdnCDCItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                    var editar = '';
                    if ($tipoSolicitud.val() == "TSOL05" || $tipoSolicitud.val() == "TSOL04") {
                        editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCostoItem(' + row.Id+','+ row.IdCotizacionDetalle + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    } 
                    else {
                        editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCostoItem(' + row.Id + ',' + row.IdCotizacionDetalle + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    }
                    var ver = '<a id="btnVerItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCostoItem(' + row.Id + ',' + row.IdCotizacionDetalle + ')"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
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
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "MontoTotalCosto",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Features",
                render: function (data) {
                    var oFeatures = data;
                    var strID = "";
                    var arrProp = oFeatures.SubPropiedades;
                    for (a = 0; a < arrProp.length; a++) {
                        if (arrProp[a].Nombre == "ID") { strID = arrProp[a].Valor; }
                    }
                    var hidden = '<input type="hidden" id="hdnCDCItem_' + $.trim(strID) + '" value=' + String.fromCharCode(39) + strID + String.fromCharCode(39) + '>';
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtacostos.editarCostoItem(' + strID + ',' + String.fromCharCode(39) + $CI_opcGrilla.val() + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var ver = '<a id="btnVerItem" class="btn btn-info btn-xs" title="Ver" href="javascript: cotvtacostos.editarCostoItem(' + strID + ',' + String.fromCharCode(39) + $CI_opcGrilla.val() + String.fromCharCode(39) + ')"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtacostos.quitarCostoItem(' + strID + ',' + String.fromCharCode(39) + $CI_opcGrilla.val() + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';

                    if ($estadoSol.val() == "CAPR" || $estadoSol.val() == "PRVT" || $estadoSol.val() == "VTPG") {
                        return '<center>' + ver + '</center>';
                    }
                    else {
                        if (!oFeatures.IsEnabled) { editar = ver; quitar = ""; }
                        else {
                            if (!oFeatures.IsEditable) { editar = ver; }
                            if (!oFeatures.IsDeletable) { quitar = ""; }
                        }
                        return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                    }
                }
            }
        ];

        ////Se quita los botones de acción por esta en valorizacion
        //if ($PermitirEditarValorizacion.val() == "S") {
        //    columns.pop();
        //}

        ////Se quita los botones de acción para el Asesor que va a modificar su ganancia
        //if ($PermitirEditarGanancia.val() == "S") {
        //    columns.pop();
        //}

        //Se quita los botones de acción por estar deshabilitado la edición de la Cotización Detalle
        //if ($PermitirEditarCotDetItem.val() == "N") {
        //    columns.pop();
        //}

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

        if ($CI_cmbTipoCosto.val() == "" || $CI_cmbTipoCosto.val() == " " || $CI_cmbTipoCosto.val() == null) {
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

            if ($.trim($CI_txtNroPiso.val()) != "") {
                if (!app.validaNumeroEntero($CI_txtNroPiso.val())) {
                    app.message.error("Validación", "Número inválido para el campo Piso");
                    return false;
                }
                else {
                    if (parseInt($CI_txtNroPiso.val()) <= 0) {
                        app.message.error("Validación", "El Nro de Piso debe ser mayor a 0.")
                        return false;
                    }
                    else { vNroPiso = parseInt($CI_txtNroPiso.val()); }
                }
            }

        }

        if ($CI_txtCantCosteo.attr("readonly") != "readonly" && $CI_txtCantCosteo.attr("disabled") != "disabled") {
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
                }
            }
        }

        if (app.validaNumeroDecimal($CI_txtMtoUnitarioCosto.val())) {
            vMontoUnitarioCosto = parseFloat(app.convertirNumero($CI_txtMtoUnitarioCosto.val()));
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
                }
            }
        }

        if (app.validaNumeroDecimal($CI_txtMtoTotalCosto.val())) {
            vMontoTotalCosto = parseFloat(app.convertirNumero($CI_txtMtoTotalCosto.val()));
        }

        if ($CI_pnlInfoPreventivos.css("display") != "none") {
            if (!app.validaNumeroEntero($CI_txtCantPrevent.val())) {
                app.message.error("Validación", "N&uacute;mero inv&aacute;lido en cantidad de Mantenimientos Preventivos")
                return false;
            }
            else {
                if (parseInt($CI_txtCantPrevent.val()) <= 0) {
                    app.message.error("Validación", "La cantidad de Mantenimientos Preventivos debe ser mayor a 0.")
                    return false;
                }
            }
            if ($.trim($CI_cmbCicloPreventivo.val()) == "") {
                app.message.error("Validación", "No ha seleccionado el ciclo de mantenimiento preventivo.")
                return false;
            }
        }

        if ($.trim($CI_cmbCicloPreventivo.val()) != "") { vCodCicloPreventivo = $CI_cmbCicloPreventivo.val(); }
        
        if (app.validaNumeroEntero($CI_txtCantPrevent.val())) { vCantidadPreventivo = parseInt($CI_txtCantPrevent.val()); }
        
        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCostoItem";
        var objDatos = {
            CostoItem: {
                Id: vId,
                IdCotizacionDetalle: $CI_cmbCDItem.val(),
                IdCotizacion: $idCotizacion.val(),
                CotizacionDetalle: {
                    Id: $CI_cmbCDItem.val(),
                    IdCotizacion: $idCotizacion.val(),
                    Descripcion: $DI_txtDescripcion.val(),
                    Cantidad: app.convertirNumero($DI_txtCantidad.val())
                    },
                CantidadCotizada: app.convertirNumero($DI_txtCantidad.val()),
                CodCosto: $CI_cmbTipoCosto.val(),
                DescCosto: $("#select2-" + $CI_cmbTipoCosto.attr("id") + "-container").attr("title"),
                CantidadCosto: app.convertirNumero($CI_txtCantCosteo.val()),
                CantPreventivo: app.convertirNumero(vCantidadPreventivo),
                CodCicloPreventivo: vCodCicloPreventivo,
                CodUbigeoDestino: vCodUbigeoDestino,
                Direccion: vDireccion,
                AmbienteDestino: $CI_txtAmbDestino.val(),
                NroPiso: vNroPiso,
                MontoUnitarioCosto: app.convertirNumero(vMontoUnitarioCosto),
                MontoTotalCosto: app.convertirNumero(vMontoTotalCosto)
            },
            opcGrilla: $CI_opcGrilla.val()
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {

            //Se graba el CODIGO COSTO agregado a COTIZACION DETALLE
            var strCodCostoRef = $CI_hdnIdCotDetCosto.val() + "_" + $CI_cmbTipoCosto.val();
            if ($hdnCostosAgregados.val() == "") { $hdnCostosAgregados.val(strCodCostoRef); }
            else {
                if ($hdnCostosAgregados.val().indexOf(strCodCostoRef) < 0) {
                    $hdnCostosAgregados.val($hdnCostosAgregados.val() + ";" + strCodCostoRef);
                }
            }
            
            if ($CI_opcGrilla.val() == "1" || $CI_opcGrilla.val() == "2") {
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
                        cargarCotDetSeleccionada();
                        $CI_txtCantCotDet.val("");
                        $CI_txtUnidadMedida.val("");
                    }
                    if ($CI_cmbTipoCosto.attr("disabled") != "disabled" && $CI_cmbTipoCosto.attr("readonly") != "readonly") {
                        $CI_cmbTipoCosto.get(0).selectedIndex = 0;
                        $CI_cmbTipoCosto.trigger("change.select2");
                        configurarModalCosto();
                    }
                    if ($CI_pnlInfoDestino.css("display") != "none") {
                        $CI_hdnUbicacion.val("");
                        $CI_txtUbicacion.val("");
                        ubigeo.setUbigeoById("");
                        $CI_txtDireccion.val("");
                        $CI_txtAmbDestino.val("");
                        $CI_txtNroPiso.val("");
                    }
                    $CI_txtCantCosteo.val("");
                    if ($CI_pnlInfoCostos_MtoUnitario.css("display") != "none" || $CI_pnlInfoCostos_MtoTotal.css("display") != "none") {
                        $CI_txtMtoUnitarioCosto.val("");
                        $CI_txtMtoTotalCosto.val("");
                    }
                    if ($CI_pnlInfoPreventivos.css("display") != "none") {
                        $CI_txtCantPrevent.val("");
                        $CI_cmbCicloPreventivo.get(0).selectedIndex = 0;
                        $CI_cmbCicloPreventivo.trigger("change.select2");
                    }
                }
                var fnNo = function () {
                    cerrarModalCostosItem();
                }
                return app.message.confirm("Costos", "¿Desea seguir agregando m&aacute;s costos?", "S&iacute;", "No", fnSi, fnNo);
            };

            if ($CI_cmbTipoCosto.attr("disabled") != "disabled") {
                app.message.success("Costos", "Se guard&oacute; el costo correctamente.", "Aceptar", fnCallback);
            }
            else {
                app.message.success("Costos", "Se guard&oacute; el costo correctamente.", "Aceptar", null);
                cerrarModalCostosItem();
            }
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }
    
    function editarCostoItem(strId, opcGrilla) {

        //Se define la opcion de grilla para saber que tipo de datos se guardan
        $CI_opcGrilla.val(opcGrilla);

        //Se carga todos los tipos de costos para los TABS y para los que se editan desde la COTIZACION DETALLE
        if (opcGrilla == "3") { cargarTodoTipoCostos(); }
        else { cargarTipoCostos(); }

        //cargarComboCotDetItems(); //Ya se llama desde el MODAL de COTIZACION DETALLE y tambien cuando se inicializa el JQUERY de COSTOS

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarDatosCostoItem";
        var objDatos = {
            Id: strId,
            opcGrilla: $CI_opcGrilla.val()
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {

            LimpiarModalCostos();
            ubigeo.setTxtUbigeo_Id("CI_hdnUbicacion");
            ubigeo.setTxtUbigeo_Text("CI_txtUbicacion");

            setTimeout(function () {
                $CI_pnlInfoGeneral.css("display", "");
                $CI_hdnIdCotDetCosto.val(data.Result.Id);
                $CI_cmbCDItem.val(data.Result.IdCotizacionDetalle).trigger("change.select2");
                if ($CI_opcGrilla.val() == "1" || $CI_opcGrilla.val() == "2") {
                    $CI_cmbTipoCosto.val(data.Result.CodCosto).trigger("change.select2");
                }
                if ($CI_opcGrilla.val() == "3") {
                    $CI_cmbTipoCosto.val($CI_hdnCodCosto.val()).trigger("change.select2");
                }
                $CI_cmbTipoCosto.attr("disabled", "disabled");
                if (data.Result.CotizacionDetalle != null) {
                    $CI_txtCantCotDet.val(data.Result.CotizacionDetalle.Cantidad);
                    $CI_txtUnidadMedida.val(data.Result.CotizacionDetalle.DescUnidad);
                }
                $CI_txtCantCotDet.val(data.Result.CantidadCotizada);
                $CI_txtUnidadMedida.val(data.Result.DescUnidadCotizada);
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
                if (data.Result.MontoUnitarioCosto != null) {
                    $CI_txtMtoUnitarioCosto.val(app.formatearEnteroComa(parseFloat(data.Result.MontoUnitarioCosto).toFixed(2)));
                }
                if (data.Result.MontoTotalCosto != null) {
                    $CI_txtMtoTotalCosto.val(app.formatearEnteroComa(parseFloat(data.Result.MontoTotalCosto).toFixed(2)));
                }
                $CI_txtCantPrevent.val(data.Result.CantPreventivo);
                $CI_cmbCicloPreventivo.val(data.Result.CodCicloPreventivo).trigger("change.select2");

                configurarModalCosto();

                //Si el Registro de COSTO está deshabilitado será de SOLO LECTURA
                if (data.Result.Features != null) {
                    if (data.Result.Features.IsEnabled == false) {
                        $CI_cmbCDItem.attr("disabled", "disabled");
                        $CI_cmbTipoCosto.attr("disabled", "disabled");
                        $CI_txtCantCotDet.attr("disabled", "disabled");
                        $CI_txtUnidadMedida.attr("disabled", "disabled");

                        $CI_txtUbicacion.attr("disabled", "disabled");
                        $("#searchUbigeo").attr("data-target", "");
                        $("#searchUbigeo").css("cursor", "not-allowed");
                        $CI_txtDireccion.attr("disabled", "disabled");
                        $CI_txtAmbDestino.attr("disabled", "disabled");
                        $CI_txtNroPiso.attr("disabled", "disabled");

                        $CI_txtDireccion.attr("disabled", "disabled");
                        $CI_txtAmbDestino.attr("disabled", "disabled");
                        $CI_txtNroPiso.attr("disabled", "disabled");
                        $CI_txtCantCosteo.attr("disabled", "disabled");
                        $CI_txtMtoUnitarioCosto.attr("disabled", "disabled");
                        $CI_txtMtoTotalCosto.attr("disabled", "disabled");
                        $CI_txtCantPrevent.attr("disabled", "disabled");
                        $CI_cmbCicloPreventivo.attr("disabled", "disabled");

                        $CI_btnGuardar.css("display", "none");
                    }
                }


                $('#modalCostoItem').modal('show');
            }, 1000); //Se coloca el tiempo para que antes se cargue los valores del combo, para luego poder establecer el código de costo respectivo.
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function totalizarCostItem() {
        if ($CI_txtMtoTotalCosto.attr("readonly") == "readonly" || $CI_txtMtoTotalCosto.attr("disabled") == "disabled") {
            if ($CI_txtCantCosteo.val() != "" && $CI_txtMtoUnitarioCosto.val() != "") {
                if (app.validaNumeroEntero($CI_txtCantCosteo.val()) && app.validaNumeroDecimal($CI_txtMtoUnitarioCosto.val())) {
                    var redondeo = app.obtenerCantidadDecimales($CI_txtMtoUnitarioCosto.val());
                    if ($CI_cmbTipoCosto.val() == "CXCD0006")
                    { //Validamos para mant.preventivo
                        $CI_txtMtoTotalCosto.val((parseFloat($CI_txtMtoUnitarioCosto.val()) * parseInt($CI_txtCantCosteo.val()) * parseInt($CI_txtCantPrevent.val()) ).toFixed(redondeo));
                    }
                    else {
                        $CI_txtMtoTotalCosto.val((parseFloat($CI_txtMtoUnitarioCosto.val()) * parseInt($CI_txtCantCosteo.val())).toFixed(redondeo));
                    }
                }
            }
        }
        if ($CI_txtMtoUnitarioCosto.attr("readonly") == "readonly" || $CI_txtMtoUnitarioCosto.attr("disabled") == "disabled") {
            if ($CI_txtCantCosteo.val() != "" && $CI_txtMtoTotalCosto.val() != "") {
                if (app.validaNumeroEntero($CI_txtCantCosteo.val()) && app.validaNumeroDecimal($CI_txtMtoTotalCosto.val())) {
                    var redondeo = app.obtenerCantidadDecimales($CI_txtMtoTotalCosto.val());
                    var cantidadcosteo = parseInt($CI_txtCantCosteo.val());
                    if (cantidadcosteo === 0) {
                        $CI_txtMtoUnitarioCosto.val(cantidadcosteo.toFixed(redondeo));
                    }
                    else {
                        $CI_txtMtoUnitarioCosto.val((parseFloat($CI_txtMtoTotalCosto.val()) / cantidadcosteo).toFixed(redondeo));
                    }
                    
                }
            }
        }
    }

    function quitarCostoItem(strId, opcGrilla) {
        
        method = "POST";
        url = "BandejaSolicitudesVentas/EliminarCostoItem";
        var objDatos = {
            Id: strId,
            opcGrilla: opcGrilla
        };
        var objParam = JSON.stringify(objDatos);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                //Se retira del array el dato eliminado:
                var index = costeoMultiple.findIndex(item => item.strID === strId);
                if (index !== -1) {
                    costeoMultiple.splice(index, 1);
                }

                cargarGrillaCostosCotDet(data);

                $hdnCostosAgregados.val("");

                //Se actualiza los CODIGO COSTO agregados a COTIZACION DETALLE
                if (data.Result != null) {
                    for (a = 0; a < data.Result.length; a++) {
                        var strCodCostoRef = data.Result[a].Id + "_" + data.Result[a].CodCosto;
                        if ($hdnCostosAgregados.val() == "") { $hdnCostosAgregados.val(strCodCostoRef); }
                        else {
                            if ($hdnCostosAgregados.val().indexOf(strCodCostoRef) < 0) {
                                $hdnCostosAgregados.val($hdnCostosAgregados.val() + ";" + strCodCostoRef);
                            }
                        }
                    }
                }

                app.message.success("Costos", "Se elimin&oacute; el costo correctamente.", "Aceptar", null);
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea quitar el costo seleccionado?", "S&iacute;", "No", fnSi);
    }

    function cerrarModalCostosItem() {
        $('#modalCostoItem').modal('hide');
    }

    function cerrarModalCostosItemMultiple() {

        var fnSi = function () {
            $('#modalCostoItemMultiple').modal('hide');
            $("#tblCostosUnitarios tbody tr").remove();
        }
        return app.message.confirm("Ventas", "Al salir perderá los datos grabados en esta bandeja, &iquest;Desea salir de esta bandeja?", "S&iacute;", "No", fnSi, null);

        
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
        cerrarModalCostosItem: cerrarModalCostosItem,
        eliminarCosto: eliminarCosto
    }
})(window.jQuery, window, document);