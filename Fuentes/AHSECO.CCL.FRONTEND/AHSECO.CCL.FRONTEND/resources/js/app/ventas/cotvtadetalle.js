var cotvtadet = (function ($, win, doc) {

    var $estadoSol = $('#estadoSol');
    var $idCotizacion = $("#idCotizacion");
    var $idRolUsuario = $("#idRolUsuario");
    var $idWorkFlow = $("#idWorkFlow");
    var $modalCotDetItem = $('#modalCotDetItem');
    var $cmbTipo = $('#cmbTipo');


    /*Implementación tabla multifunción*/
    var $bodyProducts = $('#bodyProducts');
    var $NoExisteRegProd = $('#NoExisteRegProd');
    var $tblProductos = $('#tblProductos');

    var $TipoSolicitud = $('#TipoSolicitud');

    var $TipoSol_Servicio = $("#TipoSol_Servicio");
    var $TipoSol_RepOComes = $("#TipoSol_RepOComes");
    var $TipoSol_ServYRep = $("#TipoSol_ServYRep");
    var $TipoSol_VentaMat = $("#TipoSol_VentaMat");
    var $TipoSol_VentaEqu = $("#TipoSol_VentaEqu");
    var $TipoSolicitud = $("#TipoSolicitud");

    var $DI_hdnTipoItem_PRO = $("#DI_hdnTipoItem_PRO");
    var $DI_hdnTipoItem_ACC = $("#DI_hdnTipoItem_ACC");
    var $DI_hdnTipoItem_SER = $("#DI_hdnTipoItem_SER");

    var $idCliente = $("#idCliente");
    var $numeroSolicitud = $("#numeroSolicitud");
    var $idWorkFlow = $("#idWorkFlow");
    var $idCotizacion = $("#idCotizacion");
    var $txtCodContacto = $('#txtCodContacto');
    var $nombreContacto = $('#nombreContacto');
    var $txtAreaContacto = $('#txtAreaContacto');
    var $txtTelefono = $('#txtTelefono');
    var $txtCorreo = $('#txtCorreo');
    var $dateCotizacion = $('#dateCotizacion');
    var $txtPlazoEntrega = $('#txtPlazoEntrega');
    var $cmbTipoPago = $('#cmbTipoPago');
    var $cmbTipMoneda = $('#cmbTipMoneda');
    var $txtVigencia = $('#txtVigencia');
    var $cmbGarantia = $('#cmbGarantia');
    var $txtObs = $('#txtObs');
    var $txtPorcentajeDscto = $("#txtPorcentajeDscto");
    var $dateSolicitud = $('#dateSolicitud');

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

    var $PermitirEnvioCotizacion = $("#PermitirEnvioCotizacion");
    var $PermitirEditarCotDetItem = $("#PermitirEditarCotDetItem");
    var $PermitirEditarValorizacion = $("#PermitirEditarValorizacion");
    var $EsCotizacionValorizada = $("#EsCotizacionValorizada");
    var $EsCotizacionCosteada = $("#EsCotizacionCosteada");
    var $PermitirEditarGanancia = $("#PermitirEditarGanancia");

    var $modalCotDetItem = $("#modalCotDetItem");
    var $DI_pnlInfoGeneral_COL01 = $("#DI_pnlInfoGeneral_COL01");
    var $DI_pnlInfoGeneral_Codigo = $("#DI_pnlInfoGeneral_Codigo");
    var $DI_pnlInfoGeneral_Dimensiones = $("#DI_pnlInfoGeneral_Dimensiones");
    var $DI_pnlInfoGeneral_DescripcionAdic = $("#DI_pnlInfoGeneral_DescripcionAdic");
    var $DI_pnlCostos_PrecioVenta = $("#DI_pnlCostos_PrecioVenta");
    var $DI_pnlCostos_CostoFOB = $("#DI_pnlCostos_CostoFOB");
    var $DI_pnlCostos_CostoFOB_Etiqueta = $("#DI_pnlCostos_CostoFOB_Etiqueta");
    var $DI_pnlCostos_ValorUnitario = $("#DI_pnlCostos_ValorUnitario");
    var $DI_pnlCostos_ValorUnitario_Etiqueta = $("#DI_pnlCostos_ValorUnitario_Etiqueta");
    var $DI_pnlCostos_TieneStock = $("#DI_pnlCostos_TieneStock");
    var $DI_pnlCostos_Calibracion = $("#DI_pnlCostos_Calibracion");
    var $DI_pnlCostos_Ganancia = $("#DI_pnlCostos_Ganancia");
    var $DI_pnlCostos_CompraLocal = $("#DI_pnlCostos_CompraLocal");
    var $DI_pnlCostos_ReqPlaca = $("#DI_pnlCostos_ReqPlaca");
    var $DI_pnlCostos_MantPrevent = $("#DI_pnlCostos_MantPrevent");
    var $DI_pnlCostos_Manuales = $("#DI_pnlCostos_Manuales");
    var $DI_pnlCostos_Videos = $("#DI_pnlCostos_Videos");
    var $DI_pnlCostos_Instalacion = $("#DI_pnlCostos_Instalacion");
    var $DI_pnlCostos_Capacitacion = $("#DI_pnlCostos_Capacitacion");
    var $DI_pnlCostos_GarantAdic = $("#DI_pnlCostos_GarantAdic");
    var $DI_pnlCostos_GarantAdic_Combo = $("#DI_pnlCostos_GarantAdic_Combo");
    var $DI_pnlCostos_Flete = $("#DI_pnlCostos_Flete");
    var $DI_pnlCostos_RequierePlaca = $("#DI_pnlCostos_RequierePlaca");
    var $DI_pnlInfoGeneral_UnidadMedida = $("#DI_pnlInfoGeneral_UnidadMedida");
    var $DI_pnlCostos_ReqCliente = $("#DI_pnlCostos_ReqCliente");
    var $DI_pnlCostos_ObsInsta = $("#DI_pnlCostos_ObsInsta");
    var $DI_pnlDestinos = $("#DI_pnlDestinos");
    var $DI_pnlCostos_Moneda = $('#DI_pnlCostos_Moneda');
    var $DI_pnlCostoDespacho = $('#DI_pnlCostoDespacho');

    var $CI_CodCosto_LLaveMano = $("#CI_CodCosto_LLaveMano");
    var $CI_CodCosto_Instalacion = $("#CI_CodCosto_Instalacion");
    var $CI_CodCosto_Capacitacion = $("#CI_CodCosto_Capacitacion");
    var $CI_CodCosto_Manuales = $("#CI_CodCosto_Manuales");
    var $CI_CodCosto_Videos = $("#CI_CodCosto_Videos");
    var $CI_CodCosto_MantPrevent = $("#CI_CodCosto_MantPrevent");
    var $CI_CodCosto_Calibra = $("#CI_CodCosto_Calibra");
    var $CI_CodCosto_Flete = $("#CI_CodCosto_Flete");

    var $BI_cmbFamilia = $('#BI_cmbFamilia');
    var $BI_txtCodProducto = $('#BI_txtCodProducto');
    var $BI_txtNomProducto = $('#BI_txtNomProducto');
    var $BI_cmbTipoMedida = $('#BI_cmbTipoMedida');
    var $BI_cmbMarca = $('#BI_cmbMarca');
    var $BI_cmbAlmacen = $("#BI_cmbAlmacen");
    var $BI_txtModelo = $('#BI_txtModelo');
    
    var $btnBuscarItems = $('#btnBuscarItems');
    var $tblItems = $('#tblItems');
    var $tblCotDet = $('#tblCotDet');

    var $DI_hdnIdCotDet = $("#DI_hdnIdCotDet");
    var $DI_hdnCodigoPadre = $("#DI_hdnCodigoPadre");
    var $DI_hdnCodigo = $("#DI_hdnCodigo");
    var $DI_txtCodigo = $("#DI_txtCodigo");
    var $DI_txtDescripcion = $("#DI_txtDescripcion");
    var $DI_txtDescripcionAdic = $("#DI_txtDescripcionAdic");
    var $DI_txtCantidad = $("#DI_txtCantidad");
    var $DI_txtCostoFOB = $("#DI_txtCostoFOB");
    var $DI_txtValorUnitario = $("#DI_txtValorUnitario");
    var $DI_txtGanancia = $("#DI_txtGanancia");
    var $DI_radTieneStock_Si = $("#DI_radTieneStock_Si");
    var $DI_radTieneStock_No = $("#DI_radTieneStock_No");
    var $DI_radCompraLocal_Si = $("#DI_radCompraLocal_Si");
    var $DI_radCompraLocal_No = $("#DI_radCompraLocal_No");
    var $DI_txtDimensiones = $("#DI_txtDimensiones");
    var $DI_radReqPlaca_Si = $("#DI_radReqPlaca_Si");
    var $DI_radReqPlaca_No = $("#DI_radReqPlaca_No");
    var $DI_radMantPrevent_Si = $("#DI_radMantPrevent_Si");
    var $DI_radMantPrevent_No = $("#DI_radMantPrevent_No");
    var $DI_radCalibracion_Si = $("#DI_radCalibracion_Si");
    var $DI_radCalibracion_No = $("#DI_radCalibracion_No");
    var $DI_radGarantAdic_Si = $("#DI_radGarantAdic_Si");
    var $DI_radGarantAdic_No = $("#DI_radGarantAdic_No");
    var $DI_cmbGarantias = $("#DI_cmbGarantias");
    var $DI_radManuales_Si = $("#DI_radManuales_Si");
    var $DI_radManuales_No = $("#DI_radManuales_No");
    var $DI_radVideos_Si = $("#DI_radVideos_Si");
    var $DI_radVideos_No = $("#DI_radVideos_No");
    var $DI_radInstalacion_Si = $("#DI_radInstalacion_Si");
    var $DI_radInstalacion_No = $("#DI_radInstalacion_No");
    var $DI_radCapacitacion_Si = $("#DI_radCapacitacion_Si");
    var $DI_radCapacitacion_No = $("#DI_radCapacitacion_No");
    var $DI_radFlete_Si = $("#DI_radFlete_Si");
    var $DI_radFlete_No = $("#DI_radFlete_No");
    var $DI_txtReqCliente = $("#DI_txtReqCliente");
    var $DI_txtObsInsta = $("#DI_txtObsInsta");
    
    var $DI_btnGuardar = $("#DI_btnGuardar");
    var $DI_btnCerrar = $("#DI_btnCerrar");

    var $DC_btnGuardar = $("#DC_btnGuardar");
    var $DC_btnCerrar = $("#DC_btnCerrar");

    var $btnEnviarCotizacion = $("#btnEnviarCotizacion");
    var $btnGuardarCotizacion = $("#btnGuardarCotizacion");
    var $btnRecotizacion = $("#btnRecotizacion");
    var $btnGuardarValorizacion = $("#btnGuardarValorizacion");
    var $btnSolicitarDscto = $('#btnSolicitarDscto');
    
    var $tblDetCotCostos = $('#tblDetCotCostos');

    var mensajes = {
        BuscandoPrecios: "Buscando Precios, porfavor espere...",
        obteniendoFiltros: "Obteniendo filtros de lista de precios...",
        GuardarCosto: "Guardando costo, por favor espere..."
    }

    var $DI_opcGrilla = $("#DI_opcGrilla");
    var $CI_opcGrilla = $("#CI_opcGrilla");

    var $hdnCostosAgregados = $("#hdnCostosAgregados");
    var $DI_hdnHabilitado = $("#DI_hdnHabilitado");

    var $DI_txtUnidadMedida = $("#DI_txtUnidadMedida");
    var $CX_cmbTipoCosto = $("#CX_cmbTipoCosto");
    var $CX_cmbCicloPreventivo = $("#CX_cmbCicloPreventivo");
    var $CX_txtCantCosteo = $("#CX_txtCantCosteo");
    var $CX_txtMtoUnitarioCosto = $("#CX_txtMtoUnitarioCosto");
    var $CX_hdnUbicacion = $("#CX_hdnUbicacion");
    var $CX_txtUbicacion = $("#CX_txtUbicacion");
    var $CX_txtAmbDestino = $("#CX_txtAmbDestino");
    var $CX_txtDireccion = $("#CX_txtDireccion");
    var $CX_txtNroPiso = $("#CX_txtNroPiso");
    var $CX_txtCantPrevent = $("#CX_txtCantPrevent");
    var $DI_btnAgregarCosto = $("#DI_btnAgregarCosto");
    var $DI_radRequierePlaca_Si = $("#DI_radRequierePlaca_Si");
    var $DI_radRequierePlaca_No = $("#DI_radRequierePlaca_No");
    var $CI_Item = $("#CI_Item");
    var $CI_Descripcion = $("#CI_Descripcion");
    var $CI_txtCantCotDet = $("#CI_txtCantCotDet");
    var $CI_txtUnidadMedida = $("#CI_txtUnidadMedida");
    var $CI_Dimensiones = $("#CI_Dimensiones");
    var $CI_hdnUbicacion = $("#CI_hdnUbicacion");
    var $CI_txtUbicacion = $("#CI_txtUbicacion");
    var $CI_txtDireccion = $("#CI_txtDireccion");
    var $CI_txtAmbDestino = $("#CI_txtAmbDestino");
    var $CI_txtNroPiso = $("#CI_txtNroPiso");
    var $CI_txtCantPrevent = $("#CI_txtCantPrevent");
    var $CI_cmbCicloPreventivo = $("#CI_cmbCicloPreventivo");
    var $CI_txtCantCosteo = $("#CI_txtCantCosteo");
    var $CI_txtMtoUnitarioCosto = $("#CI_txtMtoUnitarioCosto");
    var $CI_txtMtoTotalCosto = $("#CI_txtMtoTotalCosto");
    var $CI_TipoCosto = $("#CI_TipoCosto");
    var $CI_btnGuardar = $("#CI_btnGuardar");
    var $CI_hdnCodTipoCosto = $("#CI_hdnCodTipoCosto");
    var $CI_hdnCodCosto = $("#CI_hdnCodCosto");
    var $CI_hdnCantidadCostearAnt = $("#CI_hdnCantidadCostearAnt");
    var $CI_txtMoneda = $("#CI_txtMoneda");
    var $DI_Moneda = $("#DI_Moneda");
    var $DI_Tipo = $("#DI_Tipo");
    var $DI_txtMargenUtilidad = $("#DI_txtMargenUtilidad");
    var $DI_txtTransporte = $("#DI_txtTransporte");
    var $DI_btnGuardarCosteo = $("#DI_btnGuardarCosteo");
    var $CI_btnGuardarCosteo = $("#CI_btnGuardarCosteo");
    var $CI_hdnIdCotDet = $("#CI_hdnIdCotDet");
    var $DA_btnGuardar = $("#DA_btnGuardar");
    var $DA_radCompraLocal_Si = $("#DA_radCompraLocal_Si");
    var $DA_radCompraLocal_No = $("#DA_radCompraLocal_No");
    var $DA_btnCerrar = $("#DA_btnCerrar");
    var costeoMultiple = [];

    $(Initialize);

    var baseUrl = baseSiteUrl;
    let arrayFamilias = [];
    let arrayTipMedida = [];
    let arrayAlmacen = [];
    let opcTodasFamilias = "";
    var cantidadProductosHijo = 0;
    var cantidadProductos = 0;
    var nroItems = [];
    var childProducts = [];
    var padreProducts = [];
    var tipoTransporte = [];
    function Initialize() {

        $btnBuscarItems.click(buscarItems);
        $DI_btnGuardar.click(grabarDatosCotDetItem);
        $DC_btnGuardar.click(grabarDatosCotDet);
        $DI_btnCerrar.click(cerrarModalDetItem);
        $DC_btnCerrar.click(cerrarModalDetCot);
        $btnEnviarCotizacion.click(enviarCotVenta);
        $btnGuardarCotizacion.click(guardarCotVenta)
        $btnRecotizacion.click(recotizarSolicitud);
        $btnGuardarValorizacion.click(guardarValorizacion);
        $btnSolicitarDscto.click(SolicitarDscto);
        $DI_btnGuardarCosteo.click(DI_btnGuardarCosteoClick);

        $DI_radInstalacion_No.click(validarIndicadorCosteo);
        $DI_radCapacitacion_No.click(validarIndicadorCosteo);
        $DI_radManuales_No.click(validarIndicadorCosteo);
        $DI_radVideos_No.click(validarIndicadorCosteo);
        $DI_radMantPrevent_No.click(validarIndicadorCosteo);
        $DI_radCalibracion_No.click(validarIndicadorCosteo);
        $DI_radFlete_No.click(validarIndicadorCosteo);

        $DI_radGarantAdic_Si.click(configurarGarantias);
        $DI_radGarantAdic_No.click(configurarGarantias);
        $DI_btnAgregarCosto.click(btnAgregarCosteo);
        $CX_cmbTipoCosto.on("change", configurarModalCostoMultiple);
        $CI_btnGuardar.click(guardarEditarCosteo);
        $CI_btnGuardarCosteo.click(btnGuardarCosteoClick);
        $DA_btnGuardar.click(btnGuardarCosteoAccesorioClick);
        $DA_radCompraLocal_Si.click(validarcompraLocalClick);
        $DA_radCompraLocal_No.click(validarcompraLocalClick);
        $DA_btnCerrar.click(DAbtnCerrarClick);
        //$DI_radTieneStock_Si.click(configurarTieneStock);
        //$DI_radTieneStock_No.click(configurarTieneStock);
        //if ($TipoSolicitud.val() == "TSOL05") {
        //    ConsultaItemDetalle();
        //} else { 
        //}
        listarCotDetItems();
        cargarGarantias();

    

    }

    function DAbtnCerrarClick() {
        $('#modalDetalleItemAccesorio').modal('hide');
    }

    function validarcompraLocalClick() {
        if ($DA_radCompraLocal_Si.is(':checked')) {
            $("#DA_txtValorUnitario").removeAttr("disabled");
            $("#DA_txtValorUnitario").val("0.00");
        }
        else {
            $("#DA_txtValorUnitario").attr("disabled", "disabled");
        }
    }

    function btnGuardarCosteoAccesorioClick() {
       // var codigo_costo = $CI_hdnCodTipoCosto.val();

        //if ($CI_txtCantCosteo.val() === "" || $CI_txtCantCosteo.val() == 0) {
        //    app.message.error("Validacion", "Debe agregar la cantidad a costear");
        //    return;
        //}

        if ($("#DA_txtCantidad").val() === "" || $("#DA_txtCantidad").val() === "0") {
            app.message.error("Validacion", "Debe agregar la cantidad del accesorio");
            return;
        }

        if ($("#DA_radCompraLocal_Si").is(':checked') && ($("#DA_txtValorUnitario").val() === "" || $("#DA_txtValorUnitario").val() === null || $("#DA_txtValorUnitario").val() === "0")) {
               app.message.error("Validacion", "Debe agregar el valor venta unitario para la compra local");
               return;
        }

     

        var fnSi = function () {

            var ind_stock = "";
            if ($("#DA_radTieneStock_Si").is(':checked')) {
                ind_stock = "S";
            }
            else {
                ind_stock = "N";
            }

            var ind_compralocal = "";
            if ($("#DA_radCompraLocal_Si").is(':checked')) {
                ind_compralocal = "S";
            }
            else {
                ind_compralocal = "N";
            }


            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantCosteoItem";
            var obj = {
                Tipo: "X",
                CodigoUbigeo: ind_stock,
                CantidadCosto: parseInt($("#DA_txtCantidad").val()),
                MontoUnitario: app.convertirNumero($("#DA_txtValorUnitario").val()),
                CodigoCicloPreventivo: ind_compralocal,
                CodigoCotizacionDetalle: $("#DA_hdnCodigoPadre").val()
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {

                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", null);

                    $('#modalDetalleItemAccesorio').modal('hide');
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.GuardarCosto);
        }
        return app.message.confirm("Ventas", "&iquest;Est&aacute; seguro que desea guardar el costo?", "Si;", "No", fnSi, null);

    }

    function btnGuardarCosteoClick() {


        if ($CI_txtMtoUnitarioCosto.val() === "0" || $CI_txtMtoUnitarioCosto.val() === "0.00" || $CI_txtMtoUnitarioCosto.val() === "") {
            app.message.error("Validacion", "Debe agregar el monto unitario de costo");
            return;
        }

        var fnSi = function () {


            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantCosteoItem";
            var obj = {
                Tipo: "U",
                CantidadCosto: parseInt($CI_txtCantCosteo.val()),
                CantidadPreventivo: $CI_txtCantPrevent.val(),
                CodigoCicloPreventivo: $CI_cmbCicloPreventivo.val(),
                CodigoUbigeo: $CI_hdnUbicacion.val(),
                Direccion: $CI_txtDireccion.val(),
                AmbienteDestino: $CI_txtAmbDestino.val(),
                NumeroPiso: $CI_txtNroPiso.val(),
                MontoUnitario: app.convertirNumero($CI_txtMtoUnitarioCosto.val()),
                CodigoCotizacionDetalle: $CI_hdnIdCotDet.val(),
                IdCosto: parseInt($CI_hdnCodCosto.val())
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {

                if (data.Result.Codigo > 0) {
                    guardarValorizacion();
                    //location.reload();
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.GuardarCosto);
        }
        return app.message.confirm("Ventas", "&iquest;Est&aacute; seguro que desea guardar el monto unitario costo?", "Si;", "No", fnSi, null);

    }

    function DI_btnGuardarCosteoClick() {
        if ($DI_txtCantidad.val() === null || $DI_txtCantidad.val() === "" || $DI_txtCantidad.val() === "0" || $DI_txtCantidad.val() < 0) {
            app.message.error("Validacion", "Ingresar la cantidad del producto.");
            return;
        }


        var fnSi = function () {

            var cotizacion_detalle = $DI_hdnIdCotDet.val();

            var method = "POST";
            var url = "BandejaSolicitudesVentas/MantCosteoCotizacion";
            var objDatos = {
                Tipo: "C",
                CodigoCotizacionDetalle: parseInt(cotizacion_detalle),
                Cantidad: parseInt($DI_txtCantidad.val()),
                MontoUnitario: app.convertirNumero($DI_txtValorUnitario.val()),
            };
            var objParam = JSON.stringify(objDatos);

            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", null);
                    location.reload();
                }
                else {
                    app.message.success("Error", data.Result.Mensaje, "Aceptar", null);
                }

            };

            var fnFailCallback = function () {

            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);


        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea guardar el valor venta unitario de la cotizaci&oacute;n?", "S&iacute;", "No", fnSi);

    }

    function ObtenerFiltrosPrecios() {
        var method = "POST";
        var url = "CatalogoPrecios/FiltrosPrecios";
        var oValores = {
            CodTipoSol: $TipoSolicitud.val()
        };
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {

            if ($TipoSolicitud.val() == "TSOL05" || $TipoSolicitud.val() == "TSOL04") {

                var filters1 = {};
                filters1.placeholder = "--Seleccionar--";
                filters1.allowClear = false;

                arrayMarcas = data.Result.Marcas
                arrayTipMedida = data.Result.Medidas;
                arrayAlmacen = data.Result.Almacenes;
                arrayFamilias = data.Result.Familias;
                opcTodasFamilias = data.Result.TodasFamilias;

                llenarCombos('#BI_cmbMarca', data.Result.Marcas, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1, cantidadProductos);
                llenarCombos('#BI_cmbTipoMedida', data.Result.Medidas, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1, cantidadProductos);
                llenarCombos('#BI_cmbAlmacen', data.Result.Almacenes, $("#modalDetalleCotizacion"), " ", "No definido", filters1, cantidadProductos);
                llenarCombos('#BI_cmbFamilia', data.Result.Familias, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1, cantidadProductos);

            } else {
                //Cargar combo de marcas:
                var filters1 = {};
                filters1.placeholder = "-- Todos --";
                filters1.allowClear = false;
                app.llenarComboMultiResult($BI_cmbMarca, data.Result.Marcas, $("#modalDetalleCotizacion"), " ", "-- Todos --", filters1);

                //Cargar combo de medidas:
                var filters2 = {};
                filters2.placeholder = "-- Todos --";
                filters2.allowClear = false;
                app.llenarComboMultiResult($BI_cmbTipoMedida, data.Result.Medidas, $("#modalDetalleCotizacion"), " ", "-- Todos --", filters2);

                //Cargar combo de almacenes:
                var filters3 = {};
                filters3.placeholder = "-- Todos --";
                filters3.allowClear = false;
                var opcTodos = data.Result.TodosAlmacenes;
                if (opcTodos == "" || opcTodos == null) { opcTodos = " "; }
                app.llenarComboMultiResult($BI_cmbAlmacen, data.Result.Almacenes, $("#modalDetalleCotizacion"), opcTodos, "-- Todos --", filters3);
            };
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
    }


    function RecargarFiltroFamilia() {
        var method = "POST";
        var url = "CatalogoPrecios/FiltrosPrecios";
        var oValores = {
            CodTipoSol: $cmbTipo.val()
        };
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {

            //Cargar combo de familias:
            var filters3 = {};
            filters3.placeholder = "-- Todos --";
            filters3.allowClear = false;
            var opcTodos = data.Result.TodasFamilias;
            if (opcTodos == "" || opcTodos == null) { opcTodos = " "; }
            app.llenarComboMultiResult($BI_cmbFamilia, data.Result.Familias, $("#modalDetalleCotizacion"), opcTodos, "-- Todos --", filters3);

        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
    }

    
    function buscarItems() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ObtenerArticulos";
        var objFiltros = {
            CodsArticulo: $BI_txtCodProducto.val(),
            DescArticulo: $BI_txtNomProducto.val(),
            CodsUnidad: $BI_cmbTipoMedida.val(),
            CodsFamilia: $BI_cmbFamilia.val(),
            CodsMarca: $BI_cmbMarca.val(),
            CodsAlma: $BI_cmbAlmacen.val(),
            AddDescriptionAsNewRecord: true,
            CodsAlma: $BI_cmbAlmacen.val(),
            CodsModelo: $BI_txtModelo.val(),
            CantidadRegistros: 20
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaItems(data);
        };

        var fnFailCallback = function () {
            app.message.error("Validaci&oacute;n", "No hay productos.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cargarTablaItems(data) {

        var columns = [
            {
                data: "CodArticuloTemp",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescFamilia",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescRealArticulo",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescAlmacen",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "StockDisponible",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "PrecioRef",
                render: function (data) {
                    var precio = data.toFixed(2)
                    return '<center>' + precio + '</center>';
                }
            },
            {
                data: "DescMonCompra",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescUnidad",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescMarca",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescModelo",
                render: function (data, type, row) {
                    var modelo = data
                    if (data == null || data == ""){
                        modelo = row.DescRealModelo == null || row.DescRealModelo == "" ? "" : row.DescRealModelo; //En la situación de no encontrar un modelo, realiza la búsqueda 
                    }
                    return '<center>' + modelo  + '</center>';
                }
            },
            {
                data: "CodArticulo",
                render: function (data) {
                    var seleccionar = '<a class="btn btn-default btn-xs" title="Agregar" href="javascript: cotvtadet.agregarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) +')"><i class="fa fa-level-down" aria-hidden="true"></i> Agregar</a>';
                    return '<center>' + seleccionar + '</center>';
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
        filters.dataTablePageLength = 3;

        app.llenarTabla($tblItems, data, columns, columnDefs, "#tblItems", rowCallback, null, filters);
    }

    function agregarItem(CodigoItem) {
        method = "POST";
        url = "BandejaSolicitudesVentas/AgregarItemCotDet";
        var objFiltros = {
            CodItem: CodigoItem
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaCotDet(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaCotDet(data) {
        
        var columns = [
            {
                data: "Select",
                render: function (data) {
                    var select = "";
                    if (data == true) { select = "checked='checked'"; }
                    var input = "<input type='checkbox' id='chkCotDet' " + select + " onclick='javascript:cotvtadet.SeleccionarRowCotDet(this)'>";
                    return '<center>' + input + '</center>';
                }
            },
            {
                data: "CantSubItem",
                render: function (data) {
                    if (data == 0) { return ""; }
                    else { return '<center><span id="btnVerAdic" class="btn btn-link btn-xs" onclick="javascript: cotvtadet.VerSubItems(this)"><i class="fa fa-arrow-down" aria-hidden="true"></i></span></center>'; }
                }
            },
            {
                data: "CodItemTemp",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Features",
                render: function (data, type, row) {
                    if (data != null) {
                        var oFeatures = data;
                        var strID = "";
                        var strCodItem = "";
                        var arrProp = oFeatures.SubPropiedades;
                        for (a = 0; a < arrProp.length; a++) {
                            if (arrProp[a].Nombre == "ID") { strID = arrProp[a].Valor; }
                            if (arrProp[a].Nombre == "CodItem") { strCodItem = arrProp[a].Valor; }
                        }

                        if ($TipoSolicitud.val() == "TSOL05" || $TipoSolicitud.val() == "TSOL04") {
                            var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                            var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.EditarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                            var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarCotDetItem(' + String.fromCharCode(39) + row.CodItem + String.fromCharCode(39) + ',1)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                            return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                        }
                        else {
                            var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                            var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',1)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                            var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarCotDetItem(' + String.fromCharCode(39) + row.CodItem + String.fromCharCode(39) + ',1)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                            return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                        };
                    }
                    else {
                        return '<center></center>';
                    }
                    
                }
            }
        ];


        if ($TipoSolicitud.val() != "TSOL05") // Para las solicitudes de tipo "Venta de Materiales" se prescinde de las columnas: seleccionar, ver accesorios. 
        {
            columns.splice(0, 2);
        };

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
        filters.dataTablePageLength = 3;

        //En el BUSCADOR DE PRODUCTOS solo se mostrarán los que no son ACCESORIOS
        var arrPRO = [];
        if (data.Result != null) {
            for (a = 0; a < data.Result.length; a++) {
                var oItem = data.Result[a];
                if (oItem.TipoItem != $DI_hdnTipoItem_ACC.val()) {
                    arrPRO.push(oItem);
                }
            }
        }

        var dataNueva = { Status: 1, Result: arrPRO };
        
        app.llenarTabla($tblCotDet, dataNueva, columns, columnDefs, "#tblCotDet", rowCallback, null, filters);
    }
    
    function quitarCotDetItem(CodigoItem, opc) {

        var fnSi = function () {

            var method = "POST";
            var url = "BandejaSolicitudesVentas/QuitarItemCotDet";
            var objFiltros = {
                CotizacionDetalle: { CodItem: CodigoItem },
                opcGrillaItems: opc
            };
            var objParam = JSON.stringify(objFiltros);
            var fnDoneCallBack = function (data) {
                var fnCallback = function () {
                    cargarTablaCotDet(data);
                    if (opc == "2") {
                        cargarTablaDetCotCostos(data);
                    }
                };
                app.message.success("Grabar", "Registro eliminado con &eacute;xito.", "Aceptar", fnCallback);
            };
            return app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Ventas", "&iquest;Esta seguro de quitar un producto de la cotizaci&oacute;n?", "S&iacute;", "No", fnSi, null);
    }

    function cargarGarantias() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerGarantias";
        var oValores = {};
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarComboMultiResult($DI_cmbGarantias, data.Result, $modalCotDetItem, " ", "-- Seleccione --", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function configurarGarantias() {

        if ($DI_radGarantAdic_Si.is(':checked')) {
            $DI_cmbGarantias.removeAttr("disabled");
        }

        if ($DI_radGarantAdic_No.is(':checked')) {
            $DI_cmbGarantias.val("").trigger("change.select2");
            $DI_cmbGarantias.attr("disabled", "disabled");
        }

        if (!$DI_radGarantAdic_Si.is(':checked') && !$DI_radGarantAdic_No.is(':checked')) {
            $DI_cmbGarantias.val("").trigger("change.select2");
            $DI_cmbGarantias.attr("disabled", "disabled");
        }

        if ($DI_radGarantAdic_No.attr("disabled") == "disabled" || $DI_radGarantAdic_Si.attr("disabled") == "disabled"){
            $DI_cmbGarantias.attr("disabled", "disabled");
        }

    }

    function configurarTieneStock() {

        if ($DI_radTieneStock_Si.is(':checked')) {
            $DI_txtCostoFOB.attr("disabled", "disabled");
        }

        if ($DI_radTieneStock_No.is(':checked')) {
            $DI_txtCostoFOB.val("");
            //$DI_txtCostoFOB.removeAttr("disabled");
        }

        //Si no es para VALORIZACION se deshabilitará
        if ($PermitirEditarValorizacion.val() != "S") {
            $DI_txtCostoFOB.attr("disabled", "disabled");
        }

        //Para las solicitudes de tipo REPUESTOS no usan FOB
        if ($PermitirEditarValorizacion.val() == "S") {
            if ($cmbTipo.val() == $TipoSol_RepOComes.val() || $cmbTipo.val() == $TipoSol_ServYRep.val()) {
                $DI_txtCostoFOB.attr("disabled", "disabled");
            }
        }



    }

    function LimpiarModalDetItem() {
        $DI_txtDescripcionAdic.val("");
        $DI_txtCantidad.val("");
        $DI_txtCostoFOB.val("");
        $DI_txtValorUnitario.val("");
        $DI_txtGanancia.val("");
        $DI_radTieneStock_Si.removeAttr("checked");
        $DI_radTieneStock_No.removeAttr("checked");
        $DI_radCompraLocal_Si.removeAttr("checked");
        $DI_radCompraLocal_No.removeAttr("checked");
        $DI_radReqPlaca_Si.removeAttr("checked");
        $DI_radReqPlaca_No.removeAttr("checked");
        $DI_txtDimensiones.val("");
        $DI_radManuales_Si.removeAttr("checked");
        $DI_radManuales_No.removeAttr("checked");
        $DI_radVideos_Si.removeAttr("checked");
        $DI_radVideos_No.removeAttr("checked");
        $DI_radMantPrevent_Si.removeAttr("checked");
        $DI_radMantPrevent_No.removeAttr("checked");
        $DI_radGarantAdic_Si.removeAttr("checked");
        $DI_radGarantAdic_No.removeAttr("checked");
        configurarGarantias();
        $DI_radInstalacion_Si.removeAttr("checked");
        $DI_radInstalacion_No.removeAttr("checked");
        $DI_radCapacitacion_Si.removeAttr("checked");
        $DI_radCapacitacion_No.removeAttr("checked");
        $DI_radCalibracion_Si.removeAttr("checked");
        $DI_radCalibracion_No.removeAttr("checked");
        $DI_radFlete_Si.removeAttr("checked");
        $DI_radFlete_No.removeAttr("checked");
        $DI_txtReqCliente.val("");
        $DI_txtObsInsta.val("");
    }

    function MostrarDatosItem(data) {
        $DI_hdnIdCotDet.val("");
        $DI_hdnCodigo.val(data.Result.CodItem);
        $DI_hdnHabilitado.val("N");
        if (data.Result.Features != null) {
            if (data.Result.Features.IsEnabled) { $DI_hdnHabilitado.val("S"); }
        }
        if (data.Result.CodItem_IsUpdatable == true) {
            $DI_txtCodigo.removeAttr("disabled");
            $DI_txtCodigo.val(data.Result.CodItemTemp);
            $DI_txtDescripcion.removeAttr("disabled");
        }
        else {
            $DI_txtCodigo.attr("disabled", "");
            $DI_txtCodigo.val(data.Result.CodItem);
            $DI_txtDescripcion.attr("disabled", "");
        }
        $DI_txtDescripcion.val(data.Result.Descripcion);

        //Cargando Datos
        if (data.Result.Id != 0) {
            $DI_hdnIdCotDet.val(data.Result.Id);
            $DI_txtDescripcionAdic.val(data.Result.DescripcionAdicional);
            $DI_txtCantidad.val(data.Result.Cantidad);
            $DI_txtCostoFOB.val(data.Result.CostoFOB);
            $DI_txtGanancia.val(data.Result.PorcentajeGanancia);

            $DI_radTieneStock_Si.prop("checked", false);
            $DI_radTieneStock_No.prop("checked", false);
            if (data.Result.IndStock != null) {
                if (data.Result.TipoItem == $DI_hdnTipoItem_ACC.val() && data.Result.CotizacionDespacho.IndCompraLocal == true) {
                    $DI_radTieneStock_Si.prop("checked", false);
                    $DI_radTieneStock_No.prop("checked", false);
                }
                else {

                    if (data.Result.IndStock == true) {
                        $DI_radTieneStock_Si.prop("checked", true);
                    }
                    else {
                        $DI_radTieneStock_No.prop("checked", true);
                    }
                }
            }
            else {
                if (data.Result.Cantidad > data.Result.Stock || data.Result.Stock == 0) {
                    $DI_radTieneStock_No.prop("checked", true);
                }
                else {
                    $DI_radTieneStock_Si.prop("checked", true);
                }
                //Para los ACCESORIOS no se cargará por defecto el INDICADOR de TIENE STOCK
                if (data.Result.TipoItem != null) {
                    if (data.Result.TipoItem == $DI_hdnTipoItem_ACC.val()) {
                        $DI_radTieneStock_Si.prop("checked", false);
                        $DI_radTieneStock_No.prop("checked", false);
                    }
                }
            }

            if (data.Result.CotizacionDespacho != null) {
                $DI_txtDimensiones.val(data.Result.CotizacionDespacho.Dimensiones);
                if (data.Result.CotizacionDespacho.IndRequierePlaca != null) {
                    if (data.Result.CotizacionDespacho.IndRequierePlaca == true) { $DI_radReqPlaca_Si.prop("checked", true); }
                    else { $DI_radReqPlaca_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndInfoManual != null) {
                    if (data.Result.CotizacionDespacho.IndInfoManual == true) { $DI_radManuales_Si.prop("checked", true); }
                    else { $DI_radManuales_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndInfoVideo != null) {
                    if (data.Result.CotizacionDespacho.IndInfoVideo == true) { $DI_radVideos_Si.prop("checked", true); }
                    else { $DI_radVideos_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndInstalacion != null) {
                    if (data.Result.CotizacionDespacho.IndInstalacion == true) { $DI_radInstalacion_Si.prop("checked", true); }
                    else { $DI_radInstalacion_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndCapacitacion != null) {
                    if (data.Result.CotizacionDespacho.IndCapacitacion == true) { $DI_radCapacitacion_Si.prop("checked", true); }
                    else { $DI_radCapacitacion_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndMantPreventivo != null) {
                    if (data.Result.CotizacionDespacho.IndMantPreventivo == true) { $DI_radMantPrevent_Si.prop("checked", true); }
                    else { $DI_radMantPrevent_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndCalibracion != null) {
                    if (data.Result.CotizacionDespacho.IndCalibracion == true) { $DI_radCalibracion_Si.prop("checked", true); }
                    else { $DI_radCalibracion_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndGarantiaAdicional != null) {
                    if (data.Result.CotizacionDespacho.IndGarantiaAdicional == true) { $DI_radGarantAdic_Si.prop("checked", true); }
                    else { $DI_radGarantAdic_No.prop("checked", true); }
                }
                configurarGarantias();
                $DI_cmbGarantias.val(data.Result.CotizacionDespacho.CodGarantiaAdicional).trigger("change.select2");
                if (data.Result.CotizacionDespacho.IndCompraLocal != null) {
                    if (data.Result.CotizacionDespacho.IndCompraLocal == true)
                    {
                        $DI_radCompraLocal_Si.prop("checked", true);
                    }
                    else
                    {
                        $DI_radCompraLocal_No.prop("checked", true);
                    }
                }
                if (data.Result.CotizacionDespacho.IndFlete != null) {
                    if (data.Result.CotizacionDespacho.IndFlete == true) { $DI_radFlete_Si.prop("checked", true); }
                    else { $DI_radFlete_No.prop("checked", true); }
                }
                $DI_txtReqCliente.val(data.Result.CotizacionDespacho.ObsCliente);
                $DI_txtObsInsta.val(data.Result.CotizacionDespacho.ObsDespacho);


                $DI_txtValorUnitario.val(app.formatearEnteroComa(parseFloat(data.Result.VentaUnitaria).toFixed(2)));
            }
        }
    }

    function configurarModalCotDet() {

        $DI_pnlInfoGeneral_DescripcionAdic.css("display", "");

        //Se muestra según TIPO de SOLICITUD
        if ($cmbTipo.val() == $TipoSol_VentaMat.val()) {
            $DI_pnlInfoGeneral_Dimensiones.css("display", "none");
            $DI_txtDescripcionAdic.attr("rows", "4");
            $DI_pnlCostos_Calibracion.css("display", "none");
            $DI_pnlCostos_Ganancia.css("display", "none");
            $DI_pnlCostos_CompraLocal.css("display", "none");
            $DI_pnlCostos_ReqPlaca.css("display", "none");
            $DI_pnlCostos_MantPrevent.css("display", "none");
            $DI_pnlCostos_Manuales.css("display", "none");
            $DI_pnlCostos_Videos.css("display", "none");
            $DI_pnlCostos_Instalacion.css("display", "none");
            $DI_pnlCostos_Capacitacion.css("display", "none");
            $DI_pnlCostos_GarantAdic.css("display", "none");
            $DI_pnlCostos_GarantAdic_Combo.css("display", "none");
            $DI_pnlCostos_Flete.css("display", "");
            $DI_pnlCostos_ObsInsta.css("display", "none");
            $DI_pnlDestinos.css("display", "");
        }
        else if ($cmbTipo.val() == $TipoSol_RepOComes.val()) {
            $DI_pnlInfoGeneral_Dimensiones.css("display", "none");
            $DI_txtDescripcionAdic.attr("rows", "4");
            $DI_pnlCostos_Calibracion.css("display", "none");
            $DI_pnlCostos_Ganancia.css("display", "none");
            $DI_pnlCostos_CompraLocal.css("display", "none");
            $DI_pnlCostos_ReqPlaca.css("display", "none");
            $DI_pnlCostos_MantPrevent.css("display", "none");
            $DI_pnlCostos_Manuales.css("display", "none");
            $DI_pnlCostos_Videos.css("display", "none");
            $DI_pnlCostos_Instalacion.css("display", "none");
            $DI_pnlCostos_Capacitacion.css("display", "none");
            $DI_pnlCostos_GarantAdic.css("display", "none");
            $DI_pnlCostos_GarantAdic_Combo.css("display", "none");
            $DI_pnlCostos_Flete.css("display", "none");
            $DI_pnlCostos_ObsInsta.css("display", "none");
            $DI_pnlDestinos.css("display", "none");
        }
        else {
            $DI_pnlInfoGeneral_Dimensiones.css("display", "");
            $DI_txtDescripcionAdic.attr("rows", "6");
            $DI_pnlCostos_Calibracion.css("display", "");
            $DI_pnlCostos_Ganancia.css("display", "");
            $DI_pnlCostos_CompraLocal.css("display", "");
            $DI_pnlCostos_ReqPlaca.css("display", "");
            $DI_pnlCostos_MantPrevent.css("display", "");
            $DI_pnlCostos_Manuales.css("display", "");
            $DI_pnlCostos_Videos.css("display", "");
            $DI_pnlCostos_Instalacion.css("display", "");
            $DI_pnlCostos_Capacitacion.css("display", "");
            $DI_pnlCostos_GarantAdic.css("display", "");
            $DI_pnlCostos_GarantAdic_Combo.css("display", "");
            $DI_pnlCostos_Flete.css("display", "");
            $DI_pnlCostos_ObsInsta.css("display", "");
            $DI_pnlDestinos.css("display", "");
        }

        $DI_btnGuardar.css("display", "none");

        //Se valida los campos si el Cotizacion Detalle es editable
        if ($PermitirEditarCotDetItem.val() == "S") {
            if ($DI_pnlInfoGeneral_Dimensiones.css("display") != "none") {
                $DI_txtDimensiones.removeAttr("disabled");
            }
            if ($DI_pnlCostos_ObsInsta.css("display") != "none") {
                $DI_txtObsInsta.removeAttr("disabled");
            }
            $DI_btnGuardar.css("display", "");
        }

     
        //Para flujo de valorizacion puede agregar el COSTO FOB y el VALOR UNITARIO
        if ($PermitirEditarValorizacion.val() == "S") {
            if ($idRolUsuario.val() == $RolVenta_Gerente.val()) {
                var strCostoFOB = $DI_txtCostoFOB.val();
                configurarTieneStock();
                $DI_txtCostoFOB.val(strCostoFOB);
                $DI_txtCostoFOB.focus();
                //Para REPUESTOS no va a modificar el COSTO FOB se ocultará el campo
                if ($cmbTipo.val() == $TipoSol_RepOComes.val() || $cmbTipo.val() == $TipoSol_ServYRep.val()) {
                    $DI_btnGuardar.css("display", "none");
                    $DI_pnlCostos_CostoFOB.css("display", "none");
                }
                else {
                    $DI_btnGuardar.css("display", "");
                    $DI_pnlCostos_CostoFOB.css("display", "");
                }
            }
            if ($idRolUsuario.val() == $RolVenta_Costos.val()) {
                //Si tiene Costo FOB quiere decir que puede proseguir con el VALOR UNITARIO
                if ($DI_txtCostoFOB.val() != "") {
                    $DI_txtValorUnitario.removeAttr("disabled");
                    $DI_txtValorUnitario.focus();
                }
                //Si es tipo REPUESTOS quiere decir que puede proseguir con el VALOR UNITARIO ya que no usan FOB
                if ($cmbTipo.val() == $TipoSol_RepOComes.val() || $cmbTipo.val() == $TipoSol_ServYRep.val()) {
                    $DI_txtValorUnitario.removeAttr("disabled");
                    $DI_txtValorUnitario.focus();
                }
                //Si tiene stock quiere decir que puede proseguir con el VALOR UNITARIO
                if ($DI_radTieneStock_Si.is(':checked')) {
                    $DI_txtValorUnitario.removeAttr("disabled");
                    $DI_txtValorUnitario.focus();
                }
                $DI_btnGuardar.css("display", "");
            }
        }

        //Cuando a la cotización detalle se le asignó el VALOR UNITARIO recien se puede agregar una ganancia
        if ($DI_pnlCostos_Ganancia.css("display") != "none") {
            if ($PermitirEditarGanancia.val() == "S") {
                if ($DI_txtValorUnitario.val() != "") {
                    $DI_btnGuardar.css("display", "");
                    $DI_txtGanancia.removeAttr("disabled");
                    $DI_txtGanancia.focus();
                }
            }
            else {
                $DI_txtGanancia.attr("disabled", "disabled");
            }
        }

    }
    
    function validarIndicadorCosteo() {

        if ($DI_radInstalacion_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_Instalacion.val()) >= 0) {
                $DI_radInstalacion_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de INSTALACION, debe eliminar previamente sus costos");
                return false;
            }
        }

        if ($DI_radCapacitacion_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_Capacitacion.val()) >= 0) {
                $DI_radCapacitacion_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de CAPACITACION, debe eliminar previamente sus costos");
                return false;
            }
        }

        if ($DI_radManuales_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_Manuales.val()) >= 0) {
                $DI_radManuales_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de MANUALES, debe eliminar previamente sus costos");
                return false;
            }
        }

        if ($DI_radVideos_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_Videos.val()) >= 0) {
                $DI_radVideos_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de VIDEOS, debe eliminar previamente sus costos");
                return false;
            }
        }

        if ($DI_radMantPrevent_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_MantPrevent.val()) >= 0) {
                $DI_radMantPrevent_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de MANTENIMIENTO PREVENTIVO, debe eliminar previamente sus costos");
                return false;
            }
        }

        if ($DI_radCalibracion_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_Calibra.val()) >= 0) {
                $DI_radCalibracion_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de CALIBRACION, debe eliminar previamente sus costos");
                return false;
            }
        }

        if ($DI_radFlete_No.is(':checked')) {
            if ($hdnCostosAgregados.val().indexOf($CI_CodCosto_Flete.val()) >= 0) {
                $DI_radFlete_No.prop("checked", false);
                app.message.error("Validaci&oacute;n", "Para marcar como NO al indicador de FLETE, debe eliminar previamente sus costos");
                return false;
            }
        }

    }

    function cargarPropiedadesPorCotDetItem(oFeatures) {
        if (oFeatures != null) {

            if (oFeatures.IsEnabled) { $DI_btnGuardar.css("display", ""); }
            else { $DI_btnGuardar.css("display", "none"); }

            if ($idRolUsuario.val() === "SGI_VENTA_GERENTE") {
                $DI_btnGuardar.css("display", "none");
            }

            var arrSubProp = oFeatures.SubPropiedades

            for (a = 0; a < arrSubProp.length; a++) {
                var oProp = arrSubProp[a];
                if (oProp.IdControl != null && oProp.IdControl != "") {
                    var oCampo = document.getElementById(oProp.IdControl);
                    if (oCampo != null && oCampo != undefined) {
                        var $Campo = $("#" + oProp.IdControl);
                        if (oProp.Nombre != null && oProp.Nombre != "" && oProp.Valor != null) {
                            $Campo.removeAttr(oProp.Nombre);
                            $Campo.attr(oProp.Nombre, oProp.Valor);
                        }
                        if (oProp.IsVisible) { $Campo.css("display", ""); }
                        else { $Campo.css("display", "none"); }
                        if (oProp.IsEnabled) {
                            for (b = 0; b < $Campo.find("button").length; b++) {
                                var $button = $("#" + $Campo.find("button")[b].id);
                                $button.css("display", "");
                            }
                            for (b = 0; b < $Campo.find("input").length; b++) {
                                var $input = $("#" + $Campo.find("input")[b].id);
                                $input.removeAttr("disabled");
                            }
                            for (b = 0; b < $Campo.find("textarea").length; b++) {
                                var $textarea = $("#" + $Campo.find("textarea")[b].id);
                                $textarea.removeAttr("disabled");
                            }
                            for (b = 0; b < $Campo.find("select").length; b++) {
                                var $select = $("#" + $Campo.find("select")[b].id);
                                $select.removeAttr("disabled");
                            }
                        }
                        else {
                            for (b = 0; b < $Campo.find("button").length; b++) {
                                var $button = $("#" + $Campo.find("button")[b].id);
                                $button.css("display", "none");
                            }
                            for (b = 0; b < $Campo.find("input").length; b++) {
                                var $input = $("#" + $Campo.find("input")[b].id);
                                $input.attr("disabled", "disabled");
                            }
                            for (b = 0; b < $Campo.find("textarea").length; b++) {
                                var $textarea = $("#" + $Campo.find("textarea")[b].id);
                                $textarea.attr("disabled", "disabled");
                            }
                            for (b = 0; b < $Campo.find("select").length; b++) {
                                var $select = $("#" + $Campo.find("select")[b].id);
                                $select.attr("disabled", "disabled");
                            }
                        }
                    }
                }
            }

        }

    }

    function cargarLogicaAccesorios_Stock() {

        if ($DI_radTieneStock_Si.attr("disabled") != "disabled" && $DI_radTieneStock_Si.attr("readonly") != "disabled" &&
            $DI_radTieneStock_No.attr("disabled") != "disabled" && $DI_radTieneStock_No.attr("readonly") != "disabled") {
            if ($DI_radTieneStock_Si.is(':checked') || $DI_radTieneStock_No.is(':checked')) {
                $DI_radCompraLocal_Si.prop("checked", false);
                $DI_radCompraLocal_No.prop("checked", true);
                $DI_txtValorUnitario.attr("disabled", "disabled");
                $DI_txtValorUnitario.val("");
            }
        }

    }

    function cargarLogicaAccesorios_CompraLocal() {

        if ($DI_radCompraLocal_Si.attr("disabled") != "disabled" && $DI_radCompraLocal_Si.attr("readonly") != "disabled") {
            if ($DI_radCompraLocal_Si.is(':checked')) {
                $DI_txtValorUnitario.removeAttr("disabled");
                $DI_radTieneStock_Si.attr("disabled", "disabled");
                $DI_radTieneStock_No.attr("disabled", "disabled");
                $DI_radTieneStock_Si.prop("checked", false);
                $DI_radTieneStock_No.prop("checked", false);
            }
        }

        if ($DI_radCompraLocal_No.attr("disabled") != "disabled" && $DI_radCompraLocal_No.attr("readonly") != "disabled") {
            if ($DI_radCompraLocal_No.is(':checked')) {
                $DI_txtValorUnitario.attr("disabled", "disabled");
                $DI_txtValorUnitario.val("");
                $DI_radTieneStock_Si.removeAttr("disabled");
                $DI_radTieneStock_No.removeAttr("disabled");
            }
        }

    }

    function configurarModalPorTipoItem(strTipoItem) {

        //Para Accesorios se ajusta su MODAL de la siguiente manera
        if (strTipoItem != null) {
            if (strTipoItem == $DI_hdnTipoItem_ACC.val()) {
                $modalCotDetItem.css("width", "40%");
                $DI_pnlInfoGeneral_COL01.removeClass("col-md-5");
                $DI_pnlCostos_CostoFOB_Etiqueta.removeClass("col-md-3");
                $DI_pnlCostos_ValorUnitario_Etiqueta.removeClass("col-md-3");
                $DI_pnlCostos_TieneStock.removeClass("col-md-4");
                $DI_pnlCostos_CompraLocal.removeClass("col-md-4");

                $DI_pnlInfoGeneral_COL01.addClass("col-md-12");
                $DI_pnlCostos_CostoFOB_Etiqueta.addClass("col-md-6");
                $DI_pnlCostos_ValorUnitario_Etiqueta.addClass("col-md-6");
                $DI_pnlCostos_TieneStock.addClass("col-md-8");
                $DI_pnlCostos_CompraLocal.addClass("col-md-8");
            }
            else {
                $modalCotDetItem.css("width", "80%");
                $DI_pnlInfoGeneral_COL01.removeClass("col-md-12");
                $DI_pnlCostos_CostoFOB_Etiqueta.removeClass("col-md-6");
                $DI_pnlCostos_ValorUnitario_Etiqueta.removeClass("col-md-6");
                $DI_pnlCostos_TieneStock.removeClass("col-md-8");
                $DI_pnlCostos_CompraLocal.removeClass("col-md-8");

                $DI_pnlInfoGeneral_COL01.addClass("col-md-5");
                $DI_pnlCostos_CostoFOB_Etiqueta.addClass("col-md-3");
                $DI_pnlCostos_ValorUnitario_Etiqueta.addClass("col-md-3");
                $DI_pnlCostos_TieneStock.addClass("col-md-4");
                $DI_pnlCostos_CompraLocal.addClass("col-md-4");
            }
        }

        //Para Accesorios se modificarán los siguientes comportamientos
        if (strTipoItem != null) {
            if (strTipoItem == $DI_hdnTipoItem_ACC.val()) {
                $DI_radTieneStock_Si.click(cargarLogicaAccesorios_Stock);
                $DI_radTieneStock_No.click(cargarLogicaAccesorios_Stock);
                $DI_radCompraLocal_Si.click(cargarLogicaAccesorios_CompraLocal);
                $DI_radCompraLocal_No.click(cargarLogicaAccesorios_CompraLocal);
            }
            else {
                $DI_radTieneStock_Si.click(null);
                $DI_radTieneStock_No.click(null);
                $DI_radCompraLocal_Si.click(null);
                $DI_radCompraLocal_No.click(null);
            }
        }

    }

    function editarCotDetItem(ID, opc) {

        LimpiarFormularioCosteo();
        $DI_hdnCodigoPadre.val("");
        $DI_opcGrilla.val(opc);
        $CI_opcGrilla.val(opc);

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetItemAnt";
        var objFiltros = {
            CotizacionDetalle: { Id: ID },
            opcGrillaItems: opc
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {

            $('#modalDetalleItem').modal('show');

            if ($TipoSolicitud.val() === "TSOL04") { //Para venta de materiales:
                $('#CX_cmbTipoCosto option[value="CXCD0001"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0002"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0003"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0004"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0005"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0006"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0007"]').remove();
                $DI_pnlCostos_ObsInsta.css('display', 'none');
                $DI_pnlInfoGeneral_Dimensiones.css('display', 'none');
                $DI_pnlCostos_RequierePlaca.css('display', 'none');
                $DI_pnlCostos_GarantAdic_Combo.css('display', 'none');
                $DI_pnlCostos_CompraLocal.css('display', 'none');
                $DI_pnlInfoGeneral_UnidadMedida.css('display', 'none');
                $('#divMoneda').removeClass('col-md-5').addClass('col-md-6');
                $('#divlblMoneda').removeClass('col-md-7').addClass('col-md-5');
            }
            else if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03") {
                $('#DI_pnlCostos_ValorUnitario').css('display', 'none');
                $DI_pnlCostos_Moneda.css('display', 'none');
                $DI_pnlCostos_Ganancia.css('display', 'none');
                $('#DI_pnlCostoDespacho').css('display', 'none');
                $DI_pnlCostos_ObsInsta.css('display', 'none');
                $DI_pnlInfoGeneral_UnidadMedida.css('display', 'none');
                $DI_pnlInfoGeneral_Dimensiones.css('display', 'none');
                $DI_pnlCostos_RequierePlaca.css('display', 'none');
                $DI_pnlCostos_GarantAdic_Combo.css('display', 'none');
                $DI_pnlCostos_CompraLocal.css('display', 'none');
            };
            
            $hdnCostosAgregados.val("");

            if ($idRolUsuario.val() != "SGI_VENTA_GERENTE" && $idRolUsuario.val() != "SGI_VENTA_COSTOS" && $idRolUsuario.val() != "SGI_VENTA_IMPORTACION") {
                $DI_pnlCostos_PrecioVenta.css('display', 'none');
            }
            else {
                $DI_pnlCostos_PrecioVenta.css('display', '');

                if ($idRolUsuario.val() === "SGI_VENTA_GERENTE") {
                    $DI_btnGuardar.hide();
                }
            }

            if (data.Result.Id != 0) {
                $DI_hdnIdCotDet.val(data.Result.Id);
            }

            if (data.Result != null) {
                $DI_Tipo.val("U");
                //$("#DI_pnlCostoDespacho").css('display', '');
                $DI_txtCodigo.val(data.Result.CodItem);
                $DI_txtCantidad.val(data.Result.Cantidad);
                $DI_txtDescripcion.val(data.Result.Descripcion);
                $DI_txtUnidadMedida.val(data.Result.Unidad);
                $DI_txtDimensiones.val(data.Result.Dimensiones);
                $DI_txtDescripcionAdic.val(data.Result.DescripcionAdicional);
                $DI_txtObsInsta.val(data.Result.ObservacionDespacho);
                $DI_Moneda.val(data.Result.DescripcionMoneda);
                $DI_txtMargenUtilidad.val(data.Result.MargenUtilidad);
                $DI_txtTransporte.val(data.Result.NombreTransporte);

                if (data.Result.CotizacionDespacho != null) {
                    $DI_txtReqCliente.val(data.Result.CotizacionDespacho.ObsCliente);
                }

                var tiene_stock = data.Result.IndStock;
                if (tiene_stock == true) {
                    $DI_radTieneStock_No.prop("checked", false);
                    $DI_radTieneStock_Si.prop("checked", true);
                }
                else {
                    $DI_radTieneStock_No.prop("checked", true);
                    $DI_radTieneStock_Si.prop("checked", false);
                }


                var es_compralocal = data.Result.IndicadorCompraLocal;
                if (es_compralocal === "S") {
                    $DI_radCompraLocal_Si.prop("checked", true);
                    $DI_radCompraLocal_No.prop("checked", false);
                }
                else {
                    $DI_radCompraLocal_Si.prop("checked", false);
                    $DI_radCompraLocal_No.prop("checked", true);
                }

                var es_requiereplaca = data.Result.IndicadorRequierePlaca;
                if (es_requiereplaca === "S") {
                    $DI_radRequierePlaca_Si.prop("checked", true);
                    $DI_radRequierePlaca_No.prop("checked", false);
                }
                else {
                    $DI_radRequierePlaca_Si.prop("checked", false);
                    $DI_radRequierePlaca_No.prop("checked", true);
                }

                $DI_txtGanancia.val(data.Result.MargenAdicional);
                $DI_txtCostoFOB.val(data.Result.ExWork);
                $DI_txtValorUnitario.val(data.Result.VentaUnitaria == null ? "" : data.Result.VentaUnitaria.toFixed(2));


                var codigo_garantia_adicional = data.Result.CodigoGarantiaAdicional;

            }
            else {
                $DI_Tipo.val("N");
                $("#DI_pnlCostoDespacho").css('display', 'none');
                $DI_Moneda.val($("#cmbTipMoneda option:selected").text());
                $DI_radRequierePlaca_Si.prop("checked", false);
                $DI_radRequierePlaca_No.prop("checked", true);
            }

            //Limpiar grilla de costos multiples:
            $("#DI_tblCostos tbody tr").remove();

            $DI_txtGanancia.prop('disabled', true);
            if ($estadoSol.val() != "SCOT") {
                $("#SeccionAgregarCosto").css('display', 'none');
                $("#SeccionAgregarCostoBoton").css('display', 'none');
                //Se bloquea controles si no es en estado "En Cotizacion":
                $DI_txtCantidad.prop('disabled', true);
                $DI_txtDimensiones.prop('disabled', true);
                $DI_txtDescripcionAdic.prop('disabled', true);
                $DI_txtReqCliente.prop('disabled', true);
                $DI_txtObsInsta.prop('disabled', true);
                $DI_txtCostoFOB.prop('disabled', true);
                $DI_txtValorUnitario.prop('disabled', true);
                $DI_radTieneStock_Si.prop('disabled', true);
                $DI_radTieneStock_No.prop('disabled', true);
                $DI_radCompraLocal_Si.prop('disabled', true);
                $DI_radCompraLocal_No.prop('disabled', true);
                $DI_txtGanancia.prop('disabled', true);
                $DI_radRequierePlaca_Si.prop('disabled', true);
                $DI_radRequierePlaca_No.prop('disabled', true);
                $DI_cmbGarantias.prop('disabled', true);
            }

            if ($estadoSol.val() != "SCOT" && $estadoSol.val() != "CVAL") {
                $DI_btnGuardar.hide();
            }

            if ($idRolUsuario.val() === "SGI_VENTA_COSTOS" && $estadoSol.val() === "CVAL") {
                $DI_txtValorUnitario.prop('disabled', false);
                $DI_btnGuardar.hide();
                $DI_btnGuardarCosteo.show();
            }

            if (($idRolUsuario.val() === "SGI_VENTA_ASESOR" || $idRolUsuario.val() === "SGI_VENTA_COORDINASERV"
                || $idRolUsuario.val() === "SGI_VENTA_COORDINAATC") && $estadoSol.val() === "CVAL" &&
                data.Result.CabCosteoDetalle.IndicadorCosteo === "S" && data.Result.CabCosteoDetalle.IndicadorCosteo === "S") {
                $DI_txtGanancia.prop('disabled', false);
            }



            if (data.Result != null) {
                if (data.Result.CotizacionCostos != null && data.Result.CotizacionCostos.length > 0) {
                    var resCostos = { Status: 1, Result: data.Result.CotizacionCostos };
                    cotvtacostos.cargarGrillaCostosCotDet(resCostos);
                    //Se captura el CODIGO COSTO agregado a COTIZACION DETALLE
                    for (a = 0; a < data.Result.CotizacionCostos.length; a++) {
                        var strCodCostoRef = data.Result.CotizacionCostos[a].Id + "_" + data.Result.CotizacionCostos[a].CodCosto;
                        if ($hdnCostosAgregados.val() == "") { $hdnCostosAgregados.val(strCodCostoRef); }
                        else { $hdnCostosAgregados.val(";" + strCodCostoRef); }
                    }
                }
            }

            cotvtacostos.cargarComboCotDetItems();

            
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }



    function EditarCotDetItem(ID) {
        $DI_hdnIdCotDet.val(ID);
        ubigeo.setTxtUbigeo_Id("CX_hdnUbicacion");
        ubigeo.setTxtUbigeo_Text("CX_txtUbicacion");
        LimpiarFormularioCosteo();
        configurarModalCostoMultiple();

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetItem?codDetalleCotizacion="+ ID;
        var objFiltros = "";
        objParam = JSON.stringify(objFiltros);
        var fnDoneCallBack = function (data) {


            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;

            app.llenarComboMultiResult($CX_cmbTipoCosto, data.Result.Costos, null, " ", "-- Seleccione --", filters);
            app.llenarComboMultiResult($DI_cmbGarantias, data.Result.Garantias, null, " ", "-- Ninguno --", filters);
            app.llenarComboMultiResult($CX_cmbCicloPreventivo, data.Result.CicloPreventivo, null, " ", "-- Seleccione --", filters);

            $DI_txtValorUnitario.prop('disabled', true);
            var tipo_venta = $cmbTipo.val();
            if (tipo_venta === "TSOL04") { //Para venta de materiales:
                $('#CX_cmbTipoCosto option[value="CXCD0001"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0002"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0003"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0004"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0005"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0006"]').remove();
                $('#CX_cmbTipoCosto option[value="CXCD0007"]').remove();
                $DI_pnlCostos_ObsInsta.css('display', 'none');
                $DI_pnlInfoGeneral_Dimensiones.css('display', 'none');
                $DI_pnlCostos_RequierePlaca.css('display', 'none');
                $DI_pnlCostos_GarantAdic_Combo.css('display', 'none');
                $DI_pnlCostos_CompraLocal.css('display', 'none');
                $DI_pnlInfoGeneral_UnidadMedida.css('display', 'none');
                $('#divMoneda').removeClass('col-md-5').addClass('col-md-6');
                $('#divlblMoneda').removeClass('col-md-7').addClass('col-md-5');
            }
            else if (tipo_venta === "TSOL02" || tipo_venta === "TSOL03") {
                $DI_pnlCostos_ObsInsta.css('display', 'none');
                $DI_pnlInfoGeneral_UnidadMedida.css('display', 'none');
                $DI_pnlInfoGeneral_Dimensiones.css('display', 'none');
                $DI_pnlCostos_RequierePlaca.css('display', 'none');
                $DI_pnlCostos_GarantAdic_Combo.css('display', 'none');
                $DI_pnlCostos_CompraLocal.css('display', 'none');
                $("#DI_pnlCostoDespacho").css('display', 'none');
            }

            if ($idRolUsuario.val() != "SGI_VENTA_GERENTE" && $idRolUsuario.val() != "SGI_VENTA_COSTOS" && $idRolUsuario.val() != "SGI_VENTA_IMPORTACION") {
                $DI_pnlCostos_PrecioVenta.css('display', 'none');
            }
            else {
                $DI_pnlCostos_PrecioVenta.css('display', '');

                if ($idRolUsuario.val() === "SGI_VENTA_GERENTE") {
                    $DI_btnGuardar.hide();
                }
            }

            
            $DI_txtGanancia.prop('disabled', true);
            if ($estadoSol.val() != "SCOT") {
                $("#SeccionAgregarCosto").css('display', 'none');
                $("#SeccionAgregarCostoBoton").css('display', 'none');
                //Se bloquea controles si no es en estado "En Cotizacion":
                $DI_txtCantidad.prop('disabled', true);
                $DI_txtDimensiones.prop('disabled', true);
                $DI_txtDescripcionAdic.prop('disabled', true);
                $DI_txtReqCliente.prop('disabled', true);
                $DI_txtObsInsta.prop('disabled', true);
                $DI_txtCostoFOB.prop('disabled', true);
                $DI_txtValorUnitario.prop('disabled', true);
                $DI_radTieneStock_Si.prop('disabled', true);
                $DI_radTieneStock_No.prop('disabled', true);
                $DI_radCompraLocal_Si.prop('disabled', true);
                $DI_radCompraLocal_No.prop('disabled', true);
                $DI_txtGanancia.prop('disabled', true);
                $DI_radRequierePlaca_Si.prop('disabled', true);
                $DI_radRequierePlaca_No.prop('disabled', true);
                $DI_cmbGarantias.prop('disabled', true);
            }

            if ($estadoSol.val() != "SCOT" && $estadoSol.val() != "CVAL") {
                $DI_btnGuardar.hide();
            }

            if ($idRolUsuario.val() === "SGI_VENTA_COSTOS" && $estadoSol.val() === "CVAL") {
                $DI_txtValorUnitario.prop('disabled', false);
                $DI_btnGuardar.hide();
                $DI_btnGuardarCosteo.show();
            }

            if (($idRolUsuario.val() === "SGI_VENTA_ASESOR" || $idRolUsuario.val() === "SGI_VENTA_COORDINASERV"
                || $idRolUsuario.val() === "SGI_VENTA_COORDINAATC") && $estadoSol.val() === "CVAL" &&
                data.Result.CabCosteoDetalle.IndicadorCosteo === "S" && data.Result.CabCosteoDetalle.IndicadorCosteo === "S") {
                $DI_txtGanancia.prop('disabled', false);
            }


            if (data.Result.CabCosteoDetalle != null) {
                $DI_Tipo.val("U");
                $("#DI_pnlCostoDespacho").css('display', '');
                $DI_txtCodigo.val(data.Result.CabCosteoDetalle.CodigoItem);
                $DI_txtCantidad.val(data.Result.CabCosteoDetalle.Cantidad);
                $DI_txtDescripcion.val(data.Result.CabCosteoDetalle.Descripcion);
                $DI_txtUnidadMedida.val(data.Result.CabCosteoDetalle.Unidad);
                $DI_txtDimensiones.val(data.Result.CabCosteoDetalle.Dimensiones);
                $DI_txtDescripcionAdic.val(data.Result.CabCosteoDetalle.DescripcionAdicional);
                $DI_txtReqCliente.val(data.Result.CabCosteoDetalle.ObservacionCliente);
                $DI_txtObsInsta.val(data.Result.CabCosteoDetalle.ObservacionDespacho);
                $DI_Moneda.val(data.Result.CabCosteoDetalle.DescripcionMoneda);
                $DI_txtMargenUtilidad.val(data.Result.CabCosteoDetalle.MargenUtilidad);
                $DI_txtTransporte.val(data.Result.CabCosteoDetalle.NombreTransporte);

                var tiene_stock = data.Result.CabCosteoDetalle.IndicadorStock;
                if (tiene_stock === "S") {
                    $DI_radTieneStock_No.prop("checked", false);
                    $DI_radTieneStock_Si.prop("checked", true);
                }
                else {
                    $DI_radTieneStock_No.prop("checked", true);
                    $DI_radTieneStock_Si.prop("checked", false);
                }


                var es_compralocal = data.Result.CabCosteoDetalle.IndicadorCompraLocal;
                if (es_compralocal === "S") {
                    $DI_radCompraLocal_Si.prop("checked", true);
                    $DI_radCompraLocal_No.prop("checked", false);
                }
                else {
                    $DI_radCompraLocal_Si.prop("checked", false);
                    $DI_radCompraLocal_No.prop("checked", true);
                }

                var es_requiereplaca = data.Result.CabCosteoDetalle.IndicadorRequierePlaca;
                if (es_requiereplaca === "S") {
                    $DI_radRequierePlaca_Si.prop("checked", true);
                    $DI_radRequierePlaca_No.prop("checked", false);
                }
                else {
                    $DI_radRequierePlaca_Si.prop("checked", false);
                    $DI_radRequierePlaca_No.prop("checked", true);
                }

                $DI_txtGanancia.val(data.Result.CabCosteoDetalle.MargenAdicional);
                $DI_txtCostoFOB.val(data.Result.CabCosteoDetalle.ExWork);
                $DI_txtValorUnitario.val(data.Result.CabCosteoDetalle.VentaUnitaria.toFixed(2));


                var codigo_garantia_adicional = data.Result.CabCosteoDetalle.CodigoGarantiaAdicional;

                if (codigo_garantia_adicional != "") {
                    $DI_cmbGarantias.val(codigo_garantia_adicional).trigger("change.select2");
                }

            }
            else {
                $DI_Tipo.val("N");
                $("#DI_pnlCostoDespacho").css('display', 'none');
                $DI_Moneda.val($("#cmbTipMoneda option:selected").text());
                $DI_radRequierePlaca_Si.prop("checked", false);
                $DI_radRequierePlaca_No.prop("checked", true);
            }

            //Limpiar grilla de costos multiples:
            $("#DI_tblCostos tbody tr").remove();

            var lista_costos = data.Result.ListaCostos;

            if (lista_costos.length === 0) {
                var nuevoTrNew = "<tr id='NoRegCosteos'><td align='center' colspan='6'> No existen registros</td></tr>"
                $('#DI_tblCostos').append(nuevoTrNew);
            }


            for (i = 0; i < lista_costos.length; i++) {
                var html = '<div class="text-center">';
                var sel_html = ''
                var strID = lista_costos[i].IdCosto;
                var hidden = '<input type="hidden" id="hdnCDCItem_' + $.trim(strID) + '" value=' + String.fromCharCode(39) + strID + String.fromCharCode(39) + '>';
                if (($estadoSol.val() == "SCOT") && ($idRolUsuario.val() == "SGI_VENTA_ASESOR" || $idRolUsuario.val() == "SGI_VENTA_COORDINASERV" || $idRolUsuario.val() == "SGI_VENTA_COORDINAATC") ) {

                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCostoItem(' + strID + ',' + $DI_hdnIdCotDet.val() + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                  
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript:cotvtadet.quitarCostoItemVta(' + strID + ',' + $DI_hdnIdCotDet.val() +')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    html += '<center>' + hidden + editar + ' ' + quitar + '</center>';
                }
                else {
                    var ver = '<a id="btnVerItem" class="btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarCostoItem(' + strID + ',' + $DI_hdnIdCotDet.val() + ')"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                    html += '<center>' + hidden + ver + '</center>';
                }
                html += '</div>';
                var nuevoTr = "<tr bgcolor='d0f2f7' id='fila" + lista_costos[i].IdCosto + "'>" + sel_html +
                    "<th>" + lista_costos[i].DescripcionCosto + "</th>" +
                    "<th>" + lista_costos[i].DescripcionUbigeo + "</th>" +
                    "<th>" + lista_costos[i].CantidadCosto + "</th>" +
                    "<th>" + lista_costos[i].MontoUnitarioCosto + "</th>" +
                    "<th>" + lista_costos[i].MontoTotalCosto + "</th>" +
                    "<th>" + html + "</th>" +
                    "</tr>";

                $('#DI_tblCostos').append(nuevoTr);

                costeoMultiple.push({
                    Id: lista_costos[i].IdCosto,
                    CodCosto: lista_costos[i].CodigoCosto,
                    DesCosto: lista_costos[i].DescripcionCosto,
                    CantCosto: parseInt(lista_costos[i].CantidadCosto),
                    MontoUnitario: app.convertirNumero(lista_costos.MontoUnitarioCosto),
                    MontoTotal: app.convertirNumero(lista_costos[i].MontoTotalCosto),
                    CodUbigeo: lista_costos[i].CodigoUbigeo,
                    DesUbigeo: lista_costos[i].DescripcionUbigeo
                });
            }
            

           

            $('#modalDetalleItem').modal('show');
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }


    function configurarModalCostoMultiple() {


        if ($CX_cmbTipoCosto.val() == "CXCD0004" || $CX_cmbTipoCosto.val() == "CXCD0005" ||
            $CX_cmbTipoCosto.val() == "CXCD0003") {


            $("#SeccionDestino").css("display", "none");
            $("#leyInfoDestino").css("display", "none");
            $("#SeccionDireccion").css("display", "none");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $CX_txtMtoUnitarioCosto.prop("disabled", true);

        }
        else if ($CX_cmbTipoCosto.val() == "CXCD0007") {
            $("#SeccionDestino").css("display", "none");
            $("#leyInfoDestino").css("display", "none");
            $("#SeccionDireccion").css("display", "none");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $CX_txtMtoUnitarioCosto.prop("disabled", false);
        }
        else if ($CX_cmbTipoCosto.val() == "CXCD0001" ||
            $CX_cmbTipoCosto.val() == "CXCD0002" ||
            $CX_cmbTipoCosto.val() == "CXCD0008") {
            $("#SeccionDestino").css("display", "");
            $("#leyInfoDestino").css("display", "");
            $("#SeccionDireccion").css("display", "");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $CX_txtMtoUnitarioCosto.prop("disabled", true);
        }
        else if ($CX_cmbTipoCosto.val() == "CXCD0006") { //Preventivos
            $("#SeccionDestino").css("display", "");
            $("#leyInfoDestino").css("display", "");
            $("#SeccionDireccion").css("display", "");
            $("#LeyPreventivo").css("display", "");
            $("#SeccionPreventivo").css("display", "");
            $CX_txtMtoUnitarioCosto.prop("disabled", true);
        }
        else {
            $("#SeccionDestino").css("display", "none");
            $("#leyInfoDestino").css("display", "none");
            $("#SeccionDireccion").css("display", "none");
            $("#LeyPreventivo").css("display", "none");
            $("#SeccionPreventivo").css("display", "none");
            $CX_txtMtoUnitarioCosto.prop("disabled", true);
        }
    }
    function LimpiarFormularioCosteo() {
        $DI_txtCantidad.val('0');
        $DI_txtDimensiones.val('');
        $DI_txtDescripcionAdic.val('');
        $DI_txtReqCliente.val('');
        $DI_txtObsInsta.val('');
        $DI_txtCostoFOB.val('');
        $DI_txtValorUnitario.val('');
        $DI_radTieneStock_No.prop("checked", false);
        $DI_radTieneStock_Si.prop("checked", true);
        $DI_radCompraLocal_Si.prop("checked", false);
        $DI_radCompraLocal_No.prop("checked", true);
        $DI_txtGanancia.val('');       
        $DI_cmbGarantias.get(0).selectedIndex = 0;
        $DI_cmbGarantias.trigger("change.select2");
        $CX_cmbTipoCosto.get(0).selectedIndex = 0;
        $CX_cmbTipoCosto.trigger("change.select2");
        $CX_txtCantCosteo.val('0');
        $CX_txtMtoUnitarioCosto.val('0.00');
        $CX_hdnUbicacion.val('');
        $CX_txtUbicacion.val('');
        $CX_txtAmbDestino.val('');
        $CX_txtDireccion.val('');
        $CX_txtNroPiso.val('');
        $CX_txtCantPrevent.val('0');
        $CX_cmbCicloPreventivo.get(0).selectedIndex = 0;
        $CX_cmbCicloPreventivo.trigger("change.select2");
    }

    function btnAgregarCosteo() {

        if ($CX_cmbTipoCosto.val() === "" || $CX_cmbTipoCosto.val() == 0) {
            app.message.error("Validacion", "Debe seleccionar una opcion del tipo de costo");
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
                app.message.error("Validacion", "Debe seleccionar una ubicacion destino");
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


        var cod_TipoCosto = $CX_cmbTipoCosto.val();
        var des_TipoCosto = $("#CX_cmbTipoCosto option:selected").text();
        var ubigeo = $CX_hdnUbicacion.val();
        var des_ubigeo = $CX_txtUbicacion.val();
        var cantCosteada = $CX_txtCantCosteo.val();
        var cantPreventivos = $CX_txtCantPrevent.val();
        var cod_Periodicidad = $CX_cmbCicloPreventivo.val();
        var des_Periodicidad = $("#CX_cmbCicloPreventivo option:selected").text();
        var mtoUnitarioCosto = $CX_txtMtoUnitarioCosto.val();
        if (cod_Periodicidad == 0 || cod_Periodicidad === "") {
            des_Periodicidad = "";
            cod_Periodicidad = null;
        }
        var direccion = $CX_txtDireccion.val();
        var nro_piso = $CX_txtNroPiso.val();
        var local_destino = $CX_txtAmbDestino.val();

        var sumaCantidades = costeoMultiple
            .filter(item => item.CodCosto === $CX_cmbTipoCosto.val()) // Filtra solo los que son del mismo tipo
            .reduce((total, item) => total + item.CantCosto, 0);

        var restante = parseInt($DI_txtCantidad.val()) - parseInt(sumaCantidades);
        var nueva_suma = parseInt(sumaCantidades) + parseInt($CX_txtCantCosteo.val());

        if (nueva_suma > $DI_txtCantidad.val()) {
            app.message.error("Validacion", "La cantidad ha costear sobrepada la cantidad total de los productos, tiene " + restante + " cantidad(es) para costear para " + des_TipoCosto);
            return;
        }

        var des_TipoCosto = $("#CX_cmbTipoCosto option:selected").text();
        var cantCosteada = $CX_txtCantCosteo.val();
        var mtoUnitarioCosto = $CX_txtMtoUnitarioCosto.val();
        var ubigeo = $CX_hdnUbicacion.val();
        var des_ubigeo = $CX_txtUbicacion.val();

      

        var cantidad_preventivos = cantPreventivos;
        if (cantPreventivos == 0) {
            cantidad_preventivos = null;
        }

        var monto_unitario = mtoUnitarioCosto;
        if (mtoUnitarioCosto === "0" || mtoUnitarioCosto === "0.00" || mtoUnitarioCosto === null) {
            monto_unitario = "";
        }

        var fnSi = function () {
            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantCosteoItem";
            var obj = {
                Tipo: "I",
                CodigoCotizacionDetalle: $DI_hdnIdCotDet.val(),
                CodigoCosto: cod_TipoCosto,
                CantidadCosto: parseInt(cantCosteada),
                CantidadPreventivo: cantidad_preventivos,
                CodigoCicloPreventivo: cod_Periodicidad,
                CodigoUbigeo: ubigeo,
                Direccion: direccion,
                AmbienteDestino: local_destino,
                NumeroPiso: nro_piso,
                MontoUnitario: app.convertirNumero(mtoUnitarioCosto),
                IdCosto: parseInt(0)
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {

                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", null);

                    var html = '<div class="text-center">';
                    var sel_html = ''
                    var strID = data.Result.Codigo;
                    var hidden = '<input type="hidden" id="hdnCDCItem_' + $.trim(strID) + '" value=' + String.fromCharCode(39) + strID + String.fromCharCode(39) + '>';
                    if (($estadoSol.val() == "SCOT" || $estadoSol.val() == "CVAL") && ($idRolUsuario.val() == "SGI_VENTA_ASESOR" || $idRolUsuario.val() == "SGI_VENTA_COORDINASERV" || $idRolUsuario.val() == "SGI_VENTA_COORDINAATC")) {

                        var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCostoItem(' + strID + ',' + $DI_hdnIdCotDet.val() + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';

                        var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript:cotvtadet.quitarCostoItemVta(' + strID + ',' + $DI_hdnIdCotDet.val() +')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                        html += '<center>' + hidden + editar + ' ' + quitar + '</center>';
                    }
                    else {
                        var ver = '<a id="btnVerItem" class="btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarCostoItem(' + strID + ',' + $DI_hdnIdCotDet.val() + ')"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                        html += '<center>' + hidden + ver + '</center>';
                    }

                    //Calculo de calibracion:
                    var monto_total = (0).toFixed(2);
                    if (cod_TipoCosto === "CXCD0007") { //Calibracion:
                        monto_total = (app.convertirNumero(mtoUnitarioCosto) * cantCosteada).toFixed(2);
                    }

                    html += '</div>';
                    var nuevoTr = "<tr bgcolor='d0f2f7' id='fila" + data.Result.Codigo + "'>" + sel_html +
                        "<th>" + des_TipoCosto + "</th>" +
                        "<th>" + des_ubigeo + "</th>" +
                        "<th>" + cantCosteada + "</th>" +
                        "<th>" + app.convertirNumero(mtoUnitarioCosto) + "</th>" +
                        "<th>" + monto_total + "</th>" +
                        "<th>" + html + "</th>" +
                        "</tr>";

                    $('#DI_tblCostos').append(nuevoTr);

                    costeoMultiple.push({
                        Id: $DI_hdnIdCotDet.val(),
                        IdCosto: parseInt(strID),
                        CodCosto: cod_TipoCosto,
                        DesCosto: des_TipoCosto,
                        CantCosto: parseInt(cantCosteada),
                        MontoUnitario: mtoUnitarioCosto,
                        MontoTotal: monto_total,
                        CodUbigeo: ubigeo,
                        DesUbigeo: des_ubigeo
                    });

                    if (costeoMultiple.length > 0) {
                        //$('#NoRegCosteos').hide();
                        $('#DI_tblCostos tr#NoRegCosteos').remove()
                    }
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.GuardarCosto);
        }
        return app.message.confirm("Ventas", "&iquest;Est&aacute; seguro que desea guardar el costo?", "Si;", "No", fnSi, null);

        //Llave en mano: CXCD0001 X
        //Instalacion: CXCD0002 X
        //Capacitacion: CXCD0003
        //Manuales: CXCD0004
        //Videos: CXCD0005
        //Mantenimiento Preventivo: CXCD0006 X
        //Calibracion: CXCD0007
        //Flete: CXCD0008 X

    }

    function guardarEditarCosteo() {
        var codigo_costo = $CI_hdnCodTipoCosto.val();

        if ($CI_txtCantCosteo.val() === "" || $CI_txtCantCosteo.val() == 0) {
            app.message.error("Validacion", "Debe agregar la cantidad a costear");
            return;
        }

        //Para calibración
        if (codigo_costo === "CXCD0007" && ($CI_txtMtoUnitarioCosto.val() === "" || $CI_txtMtoUnitarioCosto.val() === null)) {
            app.message.error("Validacion", "Debe agregar el monto unitario de costo");
            return;
        }

        if (codigo_costo === "CXCD0007" && ($CI_txtMtoUnitarioCosto.val() === "0.00" || $CI_txtMtoUnitarioCosto.val() === "0")) {
            app.message.error("Validacion", "El monto unitario de costo no debe ser cero.");
            return;
        }

        //LLave en mano, Instalacion, Mantenimiento Preventivo y Flete:
        if (codigo_costo === "CXCD0001" || codigo_costo === "CXCD0002" ||
            codigo_costo === "CXCD0006" || codigo_costo === "CXCD0008") {

            if ($CI_txtUbicacion.val() === "" || $CI_txtUbicacion.val() == null) {
                app.message.error("Validacion", "Debe seleccionar una ubicacion destino");
                return;
            }

            if ($CI_txtDireccion.val() === "" || $CI_txtDireccion.val() == null) {
                app.message.error("Validacion", "Debe ingresar una dirección");
                return;
            }

        }

        //Para preventivos:
        if (codigo_costo=== "CXCD0006") {
            if ($CI_txtCantPrevent.val() === "" || $CI_txtCantPrevent.val() == null || $CI_txtCantPrevent.val() == 0) {
                app.message.error("Validacion", "Debe ingresar la cantidad de preventivo");
                return;
            }

            if ($CI_cmbCicloPreventivo.val() === "" || $CI_cmbCicloPreventivo.val() == null || $CI_cmbCicloPreventivo.val() == 0) {
                app.message.error("Validacion", "Debe seleccionar el ciclo de preventivo");
                return;
            }
        }

        var sumaCantidades = costeoMultiple
            .filter(item => item.CodCosto === codigo_costo) // Filtra solo los que son del mismo tipo
            .reduce((total, item) => total + item.CantCosto, 0);


        // Convierte los valores a enteros
        var sumaCantidadesNumerica = parseInt(sumaCantidades);
        var cantidadAntigua = parseInt($CI_hdnCantidadCostearAnt.val());

        // Verifica si la conversión fue exitosa (no es NaN)
        if (isNaN(sumaCantidadesNumerica)) {
            console.log("Error: sumaCantidades no es un número válido.");
        } else if (isNaN(cantidadAntigua)) {
            console.log("Error: El valor de $CI_hdnCantidadCostearAnt no es un número válido.");
        } else {
            // Realiza la resta si ambos valores son números válidos
            var nueva_sumaCantidades = sumaCantidadesNumerica - cantidadAntigua;
            //console.log(nueva_sumaCantidades);  // Muestra el resultado de la resta
        }


        var restante = parseInt($CI_txtCantCotDet.val()) - parseInt(nueva_sumaCantidades);
        var nueva_suma = parseInt(nueva_sumaCantidades) + parseInt($CI_txtCantCosteo.val());
        var des_TipoCosto = $CI_TipoCosto.val();

        if (nueva_suma > $CI_txtCantCotDet.val()) {
            app.message.error("Validacion", "La cantidad ha costear sobrepada la cantidad total de los productos, tiene " + restante + " cantidad(es) para costear para " + des_TipoCosto);
            return;
        }

        var fnSi = function () {


            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantCosteoItem";
            var obj = {
                Tipo: "U",
                CantidadCosto: parseInt($CI_txtCantCosteo.val()),
                CantidadPreventivo: $CI_txtCantPrevent.val(),
                CodigoCicloPreventivo: $CI_cmbCicloPreventivo.val(),
                CodigoUbigeo: $CI_hdnUbicacion.val(),
                Direccion: $CI_txtDireccion.val(),
                AmbienteDestino: $CI_txtAmbDestino.val(),
                NumeroPiso: $CI_txtNroPiso.val(),
                MontoUnitario: app.convertirNumero($CI_txtMtoUnitarioCosto.val()),
                CodigoCotizacionDetalle: $DI_hdnIdCotDet.val(),
                IdCosto: parseInt($CI_hdnCodCosto.val())
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {

                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", null);
                    costeoMultiple = [];

                    EditarCotDetItem($DI_hdnIdCotDet.val());
                    $('#modalCostoItem').modal('hide');
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.GuardarCosto);
        }
        return app.message.confirm("Ventas", "&iquest;Est&aacute; seguro que desea guardar el costo?", "Si;", "No", fnSi, null);


        
    }

    function editarCostoItem(idCosteo, codDetalleCot) {

        var estado = $estadoSol.val();

        method = "POST";
        url = "BandejaSolicitudesVentas/ConsultaItemCosto";
        var objDatos = {
            CodigoCotizacionDetalle: codDetalleCot,
            IdCosto: idCosteo
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            $CI_hdnIdCotDet.val(codDetalleCot);
            $CI_Item.val(data.Result.CodigoItem);
            $CI_Descripcion.val(data.Result.Descripcion);
            $CI_txtCantCotDet.val(data.Result.Cantidad);
            $CI_txtUnidadMedida.val(data.Result.UnidadMedida);
            $CI_Dimensiones.val(data.Result.Dimensiones);
            $CI_hdnUbicacion.val(data.Result.CodigoUbigeo);
            $CI_txtUbicacion.val(data.Result.DescripcionUbigeo);
            $CI_txtDireccion.val(data.Result.Direccion);
            $CI_txtAmbDestino.val(data.Result.AmbienteDestino);
            $CI_txtNroPiso.val(data.Result.NroPiso);
            $CI_txtCantPrevent.val(data.Result.CantidadPreventivos);
            $CI_cmbCicloPreventivo.val(data.Result.CodigoCicloPreventivo).trigger("change");
            $CI_txtCantCosteo.val(data.Result.CantidadCosto);
            $CI_hdnCantidadCostearAnt.val(data.Result.CantidadCosto);
            $CI_txtMtoUnitarioCosto.val(data.Result.MontoUnitario.toFixed(2));
            $CI_txtMtoTotalCosto.val(data.Result.MontoTotal.toFixed(2));
            $CI_TipoCosto.val(data.Result.DescripcionCosto);
            $CI_txtMoneda.val(data.Result.DescripcionMoneda);
            $CI_hdnCodTipoCosto.val(data.Result.CodigoCosto);
            $CI_hdnCodCosto.val(idCosteo);


            var codigo_costo = data.Result.CodigoCosto;
            $CI_txtMtoTotalCosto.prop("disabled", true);
            if (codigo_costo == "CXCD0004" || codigo_costo == "CXCD0005" ||
                codigo_costo == "CXCD0003") {

                $("#CI_pnlInfoDestino").css("display", "none");
                $("#CI_pnlInfoPreventivos").css("display", "none");
                $CI_txtMtoUnitarioCosto.prop("disabled", true);
            }
            else if (codigo_costo == "CXCD0007") { //Calibracion
                $("#CI_pnlInfoDestino").css("display", "none");
                $("#CI_pnlInfoPreventivos").css("display", "none");
                $CI_txtMtoUnitarioCosto.prop("disabled", false);

            }
            else if (codigo_costo == "CXCD0001" ||
                codigo_costo == "CXCD0002" ||
                codigo_costo == "CXCD0008") {

                $("#CI_pnlInfoDestino").css("display", "");
                $("#CI_pnlInfoPreventivos").css("display", "none");
                $CI_txtMtoUnitarioCosto.prop("disabled", true);
            }
            else if (codigo_costo == "CXCD0006") { //Preventivos
                $("#CI_pnlInfoDestino").css("display", "");
                $("#CI_pnlInfoPreventivos").css("display", "");
                $CI_txtMtoUnitarioCosto.prop("disabled", true);
            }
            else {
                $("#CI_pnlInfoDestino").css("display", "none");
                $("#CI_pnlInfoPreventivos").css("display", "none");
                $CI_txtMtoUnitarioCosto.prop("disabled", true);
            }

            var tipo_venta = $cmbTipo.val();
            if (tipo_venta === "TSOL02" || tipo_venta === "TSOL03" || tipo_venta === "TSOL04") { //Para venta de materiales:
                $("#divDimensionItemCosto").css('display', 'none');
            }
            else {
                $("#divDimensionItemCosto").css('display', '');
            }

            if (estado != "SCOT") {

                $("#searchUbigeo").prop("disabled", true);
                $('#searchUbigeo').removeAttr('data-target');
                $CI_txtUbicacion.prop("disabled", true);
                $CI_txtDireccion.prop("disabled", true);
                $CI_txtAmbDestino.prop("disabled", true);
                $CI_txtNroPiso.prop("disabled", true);
                $CI_cmbCicloPreventivo.prop("disabled", true);
                $CI_txtCantCosteo.prop("disabled", true);
                $CI_txtMtoUnitarioCosto.prop("disabled", true);
                $CI_btnGuardar.hide();
            }
            else {
                $("#searchUbigeo").prop("disabled", false);
                $CI_txtUbicacion.prop("disabled", false);
                $CI_txtDireccion.prop("disabled", false);
                $CI_txtAmbDestino.prop("disabled", false);
                $CI_txtNroPiso.prop("disabled", false);
                $CI_cmbCicloPreventivo.prop("disabled", false);
                $CI_txtCantCosteo.prop("disabled", false);

                if (codigo_costo === "CXCD0007" && $idRolUsuario.val() === "SGI_VENTA_ASESOR") {
                    $CI_txtMtoUnitarioCosto.prop("disabled", false);
                }
               

                $CI_btnGuardar.show();
            }


            if ($estadoSol.val() == "CVAL" && ($idRolUsuario.val() === "SGI_VENTA_LOGISTICA" || $idRolUsuario.val() === "SGI_VENTA_SERVICIOTECNICO")) {
                $("#searchUbigeo").css("disabled", true);
                $('#searchUbigeo').removeAttr('data-target');
                $CI_btnGuardarCosteo.show();
                $CI_txtMtoUnitarioCosto.prop("disabled", false);
            }


            $('#modalCostoItem').modal('show');
        };

        var fnFailCallback = function () {

        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);

        
    }

    function quitarCostoItemVta(strId,codDetalle) {

        method = "POST";
        url = "BandejaSolicitudesVentas/MantCosteoItem";
        var objDatos = {
            Tipo: "D",
            CodigoCotizacionDetalle: codDetalle,
            IdCosto: strId
        };
        var objParam = JSON.stringify(objDatos);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo > 0) {
                    //Se retira del array el dato eliminado:
                    var index = costeoMultiple.findIndex(item => item.IdCosto === parseInt(strId));
                    if (index !== -1) {
                        costeoMultiple.splice(index, 1);
                    }

                    $("#fila" + strId).remove();
                    if (costeoMultiple.length === 0) {
                        var nuevoTrNew = "<tr id='NoRegCosteos'><td align='center' colspan='6'> No existen registros</td></tr>"
                        $('#DI_tblCostos').append(nuevoTrNew);
                    }

                    app.message.success("Costos", "Se elimin&oacute; el costo correctamente.", "Aceptar", null);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea quitar el costo seleccionado?", "S&iacute;", "No", fnSi);
    }
    function SeleccionarRowCotDet(chk) {
        var ID = ObtenerCodItemxFila(chk);

        method = "POST";
        url = "BandejaSolicitudesVentas/SeleccionarRowCotDet";
        var objFiltros = {
            CodItem: ID
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function ObtenerCodItemxFila(obj) {
        var $ID = "";
        var $TR = $(obj).closest('tr');
        var $arrTD = $($TR).children("td");
        var a = 0;
        for (a = 0; a < $arrTD.length; ++a) {
            var $arrInput = $($arrTD[a]).find("input");
            var b = 0;
            if ($arrInput.length > 0) {
                for (b = 0; b < $arrInput.length; ++b) {
                    if ($arrInput[b].type == "hidden") {
                        $ID = $arrInput[b].value;
                    }
                }
            }
        };
        return $ID;
    }

    function VerSubItems(obj) {
        var CodItem = ObtenerCodItemxFila(obj);
        var $hdnCodItem = $("#hdnCodItem_" + $.trim(CodItem));
        var tr = $($hdnCodItem).closest('tr');
        var row = $('#tblCotDet').dataTable().api().row(tr);

        if (tr.attr('class').indexOf("shown") > 0) {
            row.child.hide();
            tr.removeClass('shown');
            return;
        }

        var childTableHtml = '';
        childTableHtml += '<table id="tblAcc_' + $.trim(CodItem) + '" class="table table-condensed table-striped table-bordered" style="width:95%; margin-left: 15px">';
        childTableHtml += '<thead>';
        childTableHtml += '<th style="text-align:center; width:10%">Cod. Acce.</th>';
        childTableHtml += '<th style="text-align:center; width:50%">Descripci&oacute;n</th>';
        childTableHtml += '<th style="text-align:center; width:5%">Cantidad</th>';
        childTableHtml += '<th style="text-align:center; width:5%">Acci&oacute;n</th>';
        childTableHtml += '</thead>';
        childTableHtml += "</table>";
        row.child(childTableHtml).show();
        tr.addClass('shown');
        obtenerSubItems(CodItem);
    }

    function obtenerSubItems(CodigoItem) {
        method = "POST";
        url = "BandejaSolicitudesVentas/ObtenerSubItems";
        var objFiltros = {
            CodItem: CodigoItem
        };
        var objParam = JSON.stringify(objFiltros);

        var CodItemPadre = $.trim(CodigoItem);

        var fnDoneCallBack = function (data) {
            cargarTablaSubItems(CodItemPadre, data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaSubItems(CodItemPadre, data) {

        var columns = [
            {
                data: "CodItem",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodItem",
                render: function (data) {
                    var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                    var editar = "";
                    var quitar = "";
                    if ($PermitirEditarCotDetItem.val() == "S") {
                        editar = '<a id="btnEditarSubItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarSubItem(' + String.fromCharCode(39) + CodItemPadre + String.fromCharCode(39) + ',' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        quitar = '<a id="btnQuitarSubItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarSubItem(' + String.fromCharCode(39) + CodItemPadre + String.fromCharCode(39) + ',' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    }
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
        filters.dataTableInfo = false;
        filters.dataTablePaging = false;

        app.llenarTabla($("#tblAcc_" + $.trim(CodItemPadre)), data, columns, columnDefs, "#tblAcc_" + $.trim(CodItemPadre), rowCallback, null, filters);
    }

    function quitarSubItem(CodigoItemPadre, CodigoItem) {

        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/QuitarSubItemCotDet";
            var objFiltros = {
                CotizacionDetallePadre: { CodItem: CodigoItemPadre },
                CotizacionDetalle: { CodItem: CodigoItem }
            };
            var objParam = JSON.stringify(objFiltros);
            var CodItemPadre = CodigoItemPadre;

            var fnDoneCallBack = function (data) {
                if (data.Result.length == 0) {
                    //$('#tblAcc_' + $.trim(CodItemPadre)).remove();
                    var tblAcc = $('#tblAcc_' + $.trim(CodItemPadre));
                    var p1 = tblAcc.parent().parent().parent().parent().parent(); //Row de Grilla de Accesorios
                    p1.remove();
                    var hdn = $('#hdnCodItem_' + $.trim(CodItemPadre)) //referenciamos al padre
                    var p2 = hdn[0].parentElement; //recorremos hacia el row padre
                    p2 = p2.parentElement; 
                    p2 = p2.parentElement;
                    var childVerAdic = p2.children[1]; //localizamos el td con la flecha "Ver Accesorios"
                    childVerAdic.innerHTML = ""; //Inicializamos
                }
                else {
                    cargarTablaSubItems(CodItemPadre, data);
                }
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea eliminar el accesorio seleccionado?", "Si", "No", fnSi);
    }

    function editarSubItem(CodigoItemPadre, CodigoItem,codCotizacionDetalle) {

        $("#DA_hdnCodigoPadre").val(codCotizacionDetalle);
        $("#DA_txtValorUnitario").attr("disabled", "disabled");
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetSubItem";
        var objFiltros = {
            CotizacionDetallePadre: { CodItem: CodigoItemPadre },
            CotizacionDetalle: { CodItem: CodigoItem }
        };
        var objParam = JSON.stringify(objFiltros);
        var fnDoneCallBack = function (data) {
            var moneda = $('#cmbTipMoneda option:selected').text();
            $("#DA_Moneda").val(moneda);
            $("#DA_txtCodigo").val(data.Result.CodItem);
            $("#DA_txtDescripcion").val(data.Result.Descripcion);
            $("#DA_txtCantidad").val(data.Result.Cantidad);
            var valorventaUnitario = data.Result.VentaUnitaria;
            var ventaUnitario = 0;
            if (valorventaUnitario != null) {
                ventaUnitario = app.convertirNumero(valorventaUnitario).toFixed(2);
                $("#DA_txtValorUnitario").val(ventaUnitario);
            }
            else {
                $("#DA_txtValorUnitario").val('0.00');
            }


            var tiene_stock = data.Result.IndStock;
            if (tiene_stock) {
                $("#DA_radTieneStock_No").prop("checked", false);
                $("#DA_radTieneStock_Si").prop("checked", true);
            }
            else {
                $("#DA_radTieneStock_No").prop("checked", true);
                $("#DA_radTieneStock_Si").prop("checked", false);
            }

            var compra_local = data.Result.CotizacionDespacho.IndCompraLocal

            if (compra_local != null) {
                if (compra_local == true) {
                    $("#DA_radCompraLocal_Si").prop("checked", true);
                    $("#DA_radCompraLocal_No").prop("checked", false);
                    $("#DA_txtValorUnitario").removeAttr("disabled");
                }
                else {
                    $("#DA_radCompraLocal_Si").prop("checked", false);
                    $("#DA_radCompraLocal_No").prop("checked", true);
                    $("#DA_txtValorUnitario").attr("disabled", "disabled");
                }
            }
            else {
                $("#DA_radCompraLocal_Si").prop("checked", false);
                $("#DA_radCompraLocal_No").prop("checked", true);
                $("#DA_txtValorUnitario").attr("disabled", "disabled");
            }

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);


        $('#modalDetalleItemAccesorio').modal('show');
        return

        //method = "POST";
        //url = "BandejaSolicitudesVentas/CargarCotDetSubItem";
        //var objFiltros = {
        //    CotizacionDetallePadre: { CodItem: CodigoItemPadre },
        //    CotizacionDetalle: { CodItem: CodigoItem }
        //};
        //var objParam = JSON.stringify(objFiltros);

        //var fnDoneCallBack = function (data) {

        //    $DI_opcGrilla.val("1");
        //    LimpiarModalDetItem();
        //    MostrarDatosItem(data);

        //    //$DI_pnlInfoGeneral_Dimensiones.css("display", "none");
        //    //$DI_pnlInfoGeneral_DescripcionAdic.css("display", "none");
        //    //$DI_pnlCostos_PrecioVenta.css("display", "");
        //    //$DI_pnlCostos_CostoFOB.css("display", "none");
        //    //$DI_pnlCostos_ValorUnitario.css("display", "");
        //    //$DI_txtValorUnitario.removeAttr("disabled");
        //    //$DI_pnlCostos_TieneStock.css("display", "");
        //    //$DI_pnlCostos_Calibracion.css("display", "none");
        //    //$DI_pnlCostos_Ganancia.css("display", "none");
        //    //$DI_pnlCostos_CompraLocal.css("display", "");
        //    //$DI_pnlCostos_ReqPlaca.css("display", "none");
        //    //$DI_pnlCostos_MantPrevent.css("display", "none");
        //    //$DI_pnlCostos_Manuales.css("display", "none");
        //    //$DI_pnlCostos_Videos.css("display", "none");
        //    //$DI_pnlCostos_Instalacion.css("display", "none");
        //    //$DI_pnlCostos_Capacitacion.css("display", "none");
        //    //$DI_pnlCostos_GarantAdic.css("display", "none");
        //    //$DI_pnlCostos_GarantAdic_Combo.css("display", "none");
        //    //$DI_pnlCostos_Flete.css("display", "none");
        //    //$DI_pnlCostos_ReqCliente.css("display", "none");
        //    //$DI_pnlCostos_ObsInsta.css("display", "none");
        //    //$DI_pnlDestinos.css("display", "none");

        //    //Se habilita el MODAL según la configuración del PRODUCTO (Equipo, Material, Repuesto)
        //    var oFeatures = data.Result.Features;
        //    cargarPropiedadesPorCotDetItem(oFeatures);

        //    //Se configura la lógica de STOCK para ACCESORIOS
        //    configurarModalPorTipoItem(data.Result.TipoItem);
        //    $DI_txtValorUnitario.prop('disabled', true);
        //    cargarLogicaAccesorios_Stock();
        //    cargarLogicaAccesorios_CompraLocal();

        //    $('#modalDetalleItem').modal('show');
        //};

        //app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function grabarDatosCotDetItem() {

        if ($DI_txtCantidad.val() === null || $DI_txtCantidad.val() === "" || $DI_txtCantidad.val() === "0" || $DI_txtCantidad.val() < 0) {
            app.message.error("Validacion", "Ingresar la cantidad del producto.");
            return;
        }

        if ($TipoSolicitud.val() == "TSOL02" || $TipoSolicitud.val() == "TSOL03") {
            grabarDatosCotDetRepyServ();
        }
        else {
            var fnSi = function () {
                var tipo = "U";
                var cotizacion_detalle = $DI_hdnIdCotDet.val();
                if ($DI_Tipo.val() == "N") {
                    tipo = "I";
                }

                var indicador_stock = "";
                if ($DI_radTieneStock_Si.is(':checked')) { indicador_stock = "S"; }
                else { indicador_stock = "N"; }

                var indicador_compralocal = "";
                if ($DI_radCompraLocal_Si.is(':checked')) { indicador_compralocal = "S"; }
                else { indicador_compralocal = "N"; }

                var indicador_requiereplaca = "";
                if ($DI_radRequierePlaca_Si.is(':checked')) { indicador_requiereplaca = "S"; }
                else { indicador_requiereplaca = "N"; }

                var method = "POST";
                var url = "BandejaSolicitudesVentas/MantCosteoCotizacion";
                var objDatos = {
                    Tipo: tipo,
                    CodigoCotizacionDetalle: cotizacion_detalle,
                    Cantidad: $DI_txtCantidad.val(),
                    IndicadorStock: indicador_stock,
                    Dimensiones: $DI_txtDimensiones.val(),
                    ObservacionCliente: $DI_txtReqCliente.val(),
                    ObservacionDespacho: $DI_txtObsInsta.val(),
                    DescripcionAdicional: $DI_txtDescripcionAdic.val(),
                    MontoUnitario: $DI_txtValorUnitario.val().replace(",", ""),
                    IndicadorCompraLocal: indicador_compralocal,
                    IndicadorRequierePlaca: indicador_requiereplaca,
                    CodigoGarantiaAdicional: $DI_cmbGarantias.val(),
                    PorcentajeGanancia: $DI_txtGanancia.val()
                };
                var objParam = JSON.stringify(objDatos);

                var fnDoneCallBack = function (data) {
                    if (data.Result.Codigo > 0) {

                        var aceptar = function () {
                            ConsultaItemDetalle();
                        };

                        app.message.success("Grabar", data.Result.Mensaje, "Aceptar", aceptar);
                        $DI_Tipo.val("U");
                        $('#modalDetalleItem').modal('hide');
                    }
                    else {
                        app.message.success("Error", data.Result.Mensaje, "Aceptar", null);
                    }

                };

                var fnFailCallback = function () {

                };

                app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);


            }
            return app.message.confirm("Confirmaci&oacute;n", "Desea guardar el detalle de cotizaci&oacute;n?", "S&iacute;", "No", fnSi);
        };
    };


    function grabarDatosCotDetRepyServ() {

        var bTieneStock = null;
        var bCompraLocal = null;
        var bReqPlaca = null;
        var bManuales = null;
        var bVideos = null;
        var bInstalacion = null;
        var bCapacitacion = null;
        var bGarantiaAdic = null;
        var bMantPrevent = null;
        var bCalib = null;
        var bFlete = null;

        if ($.trim($DI_txtCodigo.val()) == "") {
            app.message.error("Validaci&oacute;n", "Campo C&oacute;digo no puede ser vac&iacute;o");
            return false;
        }

        if ($.trim($DI_txtDescripcion.val()) == "") {
            app.message.error("Validaci&oacute;n", "Campo Descripcion no puede ser vac&iacute;o");
            return false;
        }

        if ($DI_txtCantidad.val() == "") {
            app.message.error("Validaci&oacute;n", "Campo Cantidad no puede ser vac&iacute;o");
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

        if ($DI_pnlCostos_PrecioVenta.css("display") != "none") {
            //if ($DI_pnlCostos_CostoFOB.css("display") != "none") {
            //    if ($DI_txtCostoFOB.attr("readonly") != "readonly" && $DI_txtCostoFOB.attr("disabled") != "disabled") {
            //        if ($DI_txtCostoFOB.val() == null || $DI_txtCostoFOB.val() === "") {
            //            app.message.error("Validaci&oacute;n", "El campo Ex-Work no debe estar vac&iacute;o.");
            //                return false;
            //        }

            //    }
            //}
            if ($DI_pnlCostos_ValorUnitario.css("display") != "none") {
                if ($DI_txtValorUnitario.attr("readonly") != "readonly" && $DI_txtValorUnitario.attr("disabled") != "disabled") {
                    if (!app.validaNumeroDecimal($DI_txtValorUnitario.val())) {
                        app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Valor Unitario");
                        return false;
                    }
                    else {
                        if (parseFloat($DI_txtValorUnitario.val()) <= 0) {
                            app.message.error("Validaci&oacute;n", "el valor unitario debe ser mayor a 0.");
                            return false;
                        }
                    }
                }
            }
        }

        if ($DI_pnlCostos_Ganancia.css("display") != "none") {
            if ($DI_txtGanancia.attr("readonly") != "readonly" && $DI_txtGanancia.attr("disabled") != "disabled") {
                if (!app.validaNumeroDecimal($DI_txtGanancia.val())) {
                    app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Ganancia");
                    return false;
                }
                else {
                    if (parseFloat($DI_txtGanancia.val()) <= 0) {
                        app.message.error("Validaci&oacute;n", "La ganancia no debe ser menor a 0.");
                        return false;
                    }
                }
            }
        }

        if ($DI_pnlCostos_GarantAdic_Combo.css("display") != "none") {
            if ($DI_cmbGarantias.attr("readonly") != "readonly" && $DI_cmbGarantias.attr("disabled") != "disabled") {
                if ($.trim($DI_cmbGarantias.val()) == "") {
                    app.message.error("Validaci&oacute;n", "Se debe elegir el tipo de garant&iacute;a.");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_TieneStock.css("display") != "none") {
            if ($DI_radTieneStock_Si.attr("readonly") != "readonly" && $DI_radTieneStock_Si.attr("disabled") != "disabled" &&
                $DI_radTieneStock_No.attr("readonly") != "readonly" && $DI_radTieneStock_No.attr("disabled") != "disabled") {
                if (!$DI_radTieneStock_Si.is(':checked') && !$DI_radTieneStock_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No si el producto tiene STOCK");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_CompraLocal.css("display") != "none") {
            if ($DI_radCompraLocal_Si.attr("readonly") != "readonly" && $DI_radCompraLocal_Si.attr("disabled") != "disabled" &&
                $DI_radCompraLocal_No.attr("readonly") != "readonly" && $DI_radCompraLocal_No.attr("disabled") != "disabled") {
                if (!$DI_radCompraLocal_Si.is(':checked') && !$DI_radCompraLocal_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No si el producto es COMPRA LOCAL");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_RequierePlaca.css("display") != "none") {
            if ($DI_radReqPlaca_Si.attr("readonly") != "readonly" && $DI_radReqPlaca_Si.attr("disabled") != "disabled" &&
                $DI_radReqPlaca_No.attr("readonly") != "readonly" && $DI_radReqPlaca_No.attr("disabled") != "disabled") {
                if (!$DI_radReqPlaca_Si.is(':checked') && !$DI_radReqPlaca_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo de Requiere placa");
                    return false;
                }
            }
        }

        if ($DI_radCompraLocal_Si.is(':checked')) { bCompraLocal = true; }
        if ($DI_radCompraLocal_No.is(':checked')) { bCompraLocal = false; }

        if ($DI_radTieneStock_Si.is(':checked')) { bTieneStock = true; }
        if ($DI_radTieneStock_No.is(':checked')) { bTieneStock = false; }

        if ($DI_radFlete_Si.is(':checked')) { bFlete = true; }
        if ($DI_radFlete_No.is(':checked')) { bFlete = false; }

        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/GrabarDatosCotDetItem";
            var objDatos = {
                CotizacionDetallePadre: { CodItem: $DI_hdnCodigoPadre.val() },
                CotizacionDetalle: {
                    Id: $DI_hdnIdCotDet.val(),
                    CodItem: $DI_hdnCodigo.val(),
                    CodItemTemp: $DI_txtCodigo.val(),
                    Descripcion: $DI_txtDescripcion.val(),
                    DescripcionAdicional: $DI_txtDescripcionAdic.val(),
                    Cantidad: app.convertirNumero($DI_txtCantidad.val()),
                    CostoFOB: $DI_txtCostoFOB.val(),
                    VentaUnitaria: app.convertirNumero($DI_txtValorUnitario.val()),
                    PorcentajeGanancia: app.convertirNumero($DI_txtGanancia.val()),
                    IndStock: bTieneStock,
                    CotizacionDespacho: {
                        IndCompraLocal: bCompraLocal,
                        IndRequierePlaca: bReqPlaca,
                        Dimensiones: $DI_txtDimensiones.val(),
                        IndInfoManual: bManuales,
                        IndInfoVideo: bVideos,
                        IndInfoVideo: bVideos,
                        IndMantPreventivo: bMantPrevent,
                        IndCalibracion: bCalib,
                        IndGarantiaAdicional: bGarantiaAdic,
                        CodGarantiaAdicional: $DI_cmbGarantias.val(),
                        IndInstalacion: bInstalacion,
                        IndCapacitacion: bCapacitacion,
                        IndFlete: bFlete,
                        ObsCliente: $DI_txtReqCliente.val(),
                        ObsDespacho: $DI_txtObsInsta.val()
                    }
                },
                opcGrillaItems: $DI_opcGrilla.val()
            };
            var objParam = JSON.stringify(objDatos);

            var fnDoneCallBack = function (data) {
                $('#modalDetalleItem').modal('hide');
                cargarTablaCotDet(data);
                if ($DI_opcGrilla.val() == "2") {
                    cargarTablaDetCotCostos(data);
                }
            };

            var fnFailCallback = function () {

            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea guardar el detalle de cotizaci&oacute;n?", "S&iacute;", "No", fnSi);
    }
    function cerrarModalDetItem() {

        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/CancelarCotDetItem";
            var objFiltros = {
                CotizacionDetalle: { Id: $DI_hdnIdCotDet.val() }
            };
            var objParam = JSON.stringify(objFiltros);

            var fnDoneCallBack = function (data) {
                $('#modalDetalleItem').modal('hide');
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        if ($DI_hdnHabilitado.val() != "S") {
            $('#modalDetalleItem').modal('hide');
        }
        else if ($idRolUsuario.val() === "SGI_VENTA_GERENTE") {
            $('#modalDetalleItem').modal('hide');
        }
        else {
            return app.message.confirm("Validaci&oacute;n", "Desea retroceder sin guardar? Se perder&aacute;n los datos no guardados", "S&iacute;", "No", fnSi);
        }
    }

    function grabarDatosCotDet() {
        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCotDet";
        var objDatos = { TipoItem: "PRO" };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            $('#modalDetalleCotizacion').modal('hide');
            cargarTablaDetCotCostos(data);
            if ($PermitirEnvioCotizacion.val() == "S") {
                $btnEnviarCotizacion.css("display", "");
            }
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaDetCotCostos(data) {

        var columns = [];


        if ($PermitirEditarValorizacion.val() == "S") {

            columns = [
                {
                    data: "NroItem",
                    render: function (data, type, row) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
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
                    data: "DescUnidad",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "Cantidad",
                    render: function (data, type, row) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "CostoFOB",
                    render: function (data, type, row) {
                        if (data == null) { data = ""; }
                        else { data }

                        var ex_work = "";
                        if (row.CostoFOB != "") {
                            ex_work = "<b>Ex-Work: </b><br>" + row.CostoFOB;
                        }

                        var mar_utilidad = "";
                        if (row.MargenUtilidad != "") {
                            mar_utilidad = "<b>Margen Utilidad: </b><br>" + row.MargenUtilidad;
                        }

                        var trans = "";
                        if (row.NombreTransporte != "") {
                            trans = "<b>Transporte: </b><br>" + row.NombreTransporte;
                        }

                        var exwork = "<label id='txtExWork" + row.NroItem + row.Id + "' >" + ex_work + "</label>" + "<label id='lblExWork" + row.NroItem + row.Id + "' style='display:none;'></label><input type='text'  id='ExWork" + row.NroItem + row.Id + "' value='" + row.CostoFOB + "' style='display:none; maxlength='50'/>&nbsp;";
                        var margenUtil = "<label id='txtMargenUtil" + row.NroItem + row.Id + "' >" + mar_utilidad + "</label><label id='lblMargenUtil" + row.NroItem + row.Id + "' style='display:none;'></label><input type='text'  id='MargenUtil" + row.NroItem + row.Id + "' value='" + row.MargenUtilidad + "' style='display:none;' maxlength='50'/>&nbsp;";
                        var transporte = "<label id='txtTransporte" + row.NroItem + row.Id + "' >" + trans + "</label><label id='lblTransporte" + row.NroItem + row.Id + "' style='display:none;'></label><div id='divTransporte" + row.NroItem + row.Id + "' style='display:none;'><input type='hidden' id='hdTransporte" + row.NroItem + row.Id + "' value='" + row.CodigoTransporte + "' ><select id='Transporte" + row.NroItem + row.Id + "'  style='width:150px; display:none;' value='" + row.CodigoTransporte + "'/></div>";

                        return exwork + margenUtil + transporte;
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
                    data: "Features",
                    render: function (data, type, row) {
                        var oFeatures = data;
                        var strID = "";
                        var strCodItem = "";
                        var arrProp = oFeatures.SubPropiedades;
                        for (a = 0; a < arrProp.length; a++) {
                            if (arrProp[a].Nombre == "ID") { strID = arrProp[a].Valor; }
                            if (arrProp[a].Nombre == "CodItem") { strCodItem = arrProp[a].Valor; }
                        }

                        if ($TipoSolicitud.val() == "TSOL05" || $TipoSolicitud.val() == "TSOL04") {
                            var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                            var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.EditarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                            var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.EditarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ')"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                            var editar_FOB = '<a id="btnEditarFOBItem' + strID + '" value="' + strID + '" name="BtnExWord" class="botonDetCot btn btn-info btn-xs" title="Editar Ex-Work" href="javascript: cotvtadet.editarExWork(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.NroItem + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.CodigoTransporte + String.fromCharCode(39) + ',' + row.IndStock + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Editar</a>';
                            var guardar_FOB = '<a id="btnGuardarFOBItem' + strID + '" class="botonDetCot btn btn-info btn-xs" title="Guardar Ex-Work" href="javascript: cotvtadet.guardarExWork(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.NroItem + String.fromCharCode(39) + ',' + row.IndStock + ')" style=' + String.fromCharCode(39) + 'display:none' + String.fromCharCode(39) + '><i class="fa fa-pencil-save" aria-hidden="true"></i>Guardar</a>';

                            if ($estadoSol.val() == "CAPR" || $estadoSol.val() == "PRVT" || $estadoSol.val() == "VTPG") {
                                return '<center>' + ver + '</center>';
                            }
                            else {

                                var fob = "";
                                var guardar_fob = "";
                                if ($estadoSol.val() === "CVAL" && $idRolUsuario.val() === "SGI_VENTA_GERENTE") {
                                    fob = String.fromCharCode(32) + "<br><br>" + editar_FOB;
                                    guardar_fob = guardar_FOB;
                                    editar = ver;
                                }
                                else if (!oFeatures.IsEnabled) { editar = ver; }
                                else {
                                    editar = ver;
                                }


                                return '<center>' + hidden + editar + fob + guardar_fob + '</center>';
                            }
                        }
                        else {
                            var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                            var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                            var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                            var editar_FOB = '<a id="btnEditarFOBItem' + strID + '" value="' + strID + '" name="BtnExWord" class="botonDetCot btn btn-info btn-xs" title="Editar Ex-Work" href="javascript: cotvtadet.editarExWork(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.NroItem + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Ex-Work</a>';
                            var guardar_FOB = '<a id="btnGuardarFOBItem' + strID + '" class="botonDetCot btn btn-info btn-xs" title="Guardar Ex-Work" href="javascript: cotvtadet.guardarExWork(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.NroItem + String.fromCharCode(39) + ')" style=' + String.fromCharCode(39) + 'display:none' + String.fromCharCode(39) + '><i class="fa fa-pencil-save" aria-hidden="true"></i>Guardar</a>';

                            if ($estadoSol.val() == "CAPR" || $estadoSol.val() == "PRVT" || $estadoSol.val() == "VTPG") {
                                return '<center>' + ver + '</center>';
                            }
                            else {

                                var fob = "";
                                var guardar_fob = "";
                                if (oFeatures.IsEnabled && $idRolUsuario.val() === "SGI_VENTA_GERENTE") {
                                    fob = String.fromCharCode(32) + "<br><br>" + editar_FOB;
                                    guardar_fob = guardar_FOB;
                                    editar = ver;
                                }

                                if (!oFeatures.IsEnabled) { editar = ver; }
                                return '<center>' + hidden + editar + fob + guardar_fob + '</center>';
                            };
                        };
                    }
                }
            ];

            //El tipo de Solicitud REPUESTOS no muestra PORCENTAJE DE GANANCIA
            if ($TipoSolicitud.val() == $TipoSol_RepOComes.val() || $TipoSolicitud.val() == $TipoSol_ServYRep.val()) {
                columns.splice(8, 2);
            };

            if ($TipoSolicitud.val() == $TipoSol_RepOComes.val() || $TipoSolicitud.val() == $TipoSol_ServYRep.val()) {
                columns.splice(5, 1);
            };


        }
        else {

            columns = [
                {
                    data: "Cuenta",
                    render: function (data, type, row) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
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
                    data: "DescUnidad",
                    render: function (data, type, row) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "Cantidad",
                    render: function (data, type, row) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
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
                    data: "Features",
                    render: function (data, type, row) {
                        if (data != null) {
                            var oFeatures = data;
                            var strID = "";
                            var strCodItem = "";
                            var arrProp = oFeatures.SubPropiedades;
                            for (a = 0; a < arrProp.length; a++) {
                                if (arrProp[a].Nombre == "ID") { strID = arrProp[a].Valor; }
                                if (arrProp[a].Nombre == "CodItem") { strCodItem = arrProp[a].Valor; }
                            }

                            if ($TipoSolicitud.val() == "TSOL05" || $TipoSolicitud.val() == "TSOL04") {
                                var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                                var editar = '';
                                if (row.TipoItem == "ACC") {
                                    //editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarSubItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                                    var dato2 = '"' + row.CodItemPadre + '"' + "," + '"' + row.CodItem + '","' + row.Id + '"';
                                    editar = "<a id='btnEditarItem' class='botonDetCot btn btn-info btn-xs' title='Editar' href='javascript: cotvtadet.editarSubItem(" + dato2 + ")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Editar</a>";
                                } else if (row.TipoItem == "PRO") {
                                    editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.EditarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                                }
                                var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.EditarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ')"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                                var quitar = "";
                                if ($TipoSolicitud.val() == "TSOL05" || $TipoSolicitud.val() == "TSOL04") {
                                    quitar = "<a class='botonDetCot btn btn-danger btn-xs' title='Eliminar' id=btnQuitarItem  href = 'javascript: cotvtadet.eliminarItemProducto(" + row.Id + ")'><i class='fa fa-trash-o' aria-hidden='true'></i> Quitar</a>"
                                }
                                else {
                                    quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarCotDetItem(' + String.fromCharCode(39) + row.CodItem + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                                }

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
                            else {
                                var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                                var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                                var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                                var quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarCotDetItem(' + String.fromCharCode(39) + row.CodItem + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';

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
                        else {
                            return '<center></center>'
                        }                        
                    }
                }
            ];

            //El tipo de Solicitud REPUESTOS no muestra PORCENTAJE DE GANANCIA
            if ($TipoSolicitud.val() == $TipoSol_RepOComes.val() || $TipoSolicitud.val() == $TipoSol_ServYRep.val()) {
                columns.splice(7, 2);
            };

        }

        var columnDefs =
        {
            targets: [0],
            visible: false
        }

        //Cuando ya se avanza la SOLICITUD mas allá de la cotización se elimina los campos de ACCION
        //if ($estadoSol.val() != "SCOT" && $estadoSol.val() != "CVAL") { columns.pop(); }

        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + index);
        };

        var filters = {}
        filters.dataTableInfo = false;
        filters.dataTablePaging = true;

        app.llenarTabla($tblDetCotCostos, data, columns, columnDefs, "#tblDetCotCostos", rowCallback, null, filters);
    }
    
    function cerrarModalDetCot() {

     
        var fnSi = function () {

            method = "POST";
            url = "BandejaSolicitudesVentas/DeshacerCambiosPROTemporales";
            var objDatos = { };
            var objParam = JSON.stringify(objDatos);

            var fnDoneCallBack = function (data) {
                cargarTablaCotDet(data);
                $('#modalDetalleCotizacion').modal('hide');
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);

        }
        return app.message.confirm("Ventas", " Al salir perder&aacute; todos los datos registrados. &iquest;Desea Salir?", "S&iacute;", "No", fnSi, null);
    }

    function validarCotizacion() {


        if ($nombreContacto.val().trim() === "" || $nombreContacto.val().trim().length <= 0 || $nombreContacto.val().trim() == null) {
            app.message.error("Validaci&oacute;n", "Debe de seleccionar un contacto registrado o ingresar el nombre de un nuevo contacto.");
            return;
        };

        if (!isNaN($nombreContacto.val())) {
            app.message.error("Validaci&oacute;n", "El nombre del contacto no puede contener números.")
            return;
        };

        if ($txtAreaContacto.val().trim() === "" || $txtAreaContacto.val().trim().length <= 0 || $txtAreaContacto.val().trim() == null) {
            app.message.error("Validaci&oacute;n", "Debe de seleccionar un contacto registrado o ingresar el área de un nuevo contacto.");
            return;
        };

        if (!isNaN($txtAreaContacto.val())) {
            app.message.error("Validaci&oacute;n", "El área del contacto no puede contener números.")
            return;
        };

        if ($txtTelefono.val().trim() === "" || $txtTelefono.val().trim().length <= 0 || $txtTelefono.val().trim() == null) {
            app.message.error("Validaci&oacute;n", "Debe de seleccionar un contacto registrado o ingresar el teléfono de un nuevo contacto.");
            return;
        };

        var telefono = $txtTelefono.val().trim();

        telefono = telefono.replace(/\s+/g, ' ');

        if (isNaN($txtTelefono.val().trim()) || (telefono.length === 0 && telefono != "")) {
            app.message.error("Validaci&oacute;n", "El teléfono no está en el formato correcto.");
            return
        };

        if ($txtCorreo.val().trim() === "" || $txtCorreo.val().trim().length <= 0 || $txtCorreo.val().trim() == null) {
            app.message.error("Validaci&oacute;n", "Debe de seleccionar un contacto registrado o ingresar el correo de un nuevo contacto.");
            return;
        };

        if (!app.validarEmail($txtCorreo.val().trim()) && $txtCorreo.val().trim() != "") {
            app.message.error("Validaci&oacute;n", "Debe de colocar un correo con el formato correcto.");
            return
        };

        if ($dateCotizacion.val().trim() === "" || $dateCotizacion.val().trim().length <= 0 || $dateCotizacion.val().trim() == null) {
            app.message.error("Validaci&oacute;n", "Debe ingresar la fecha de cotización.");
            return;
        };

        if ($txtVigencia.val().trim() === "" || $txtVigencia.val().trim().length <= 0 || $txtVigencia.val().trim() == null) {
            app.message.error("Validaci&oacute;n", "Debe de ingresar el plazo de vigencia de la cotización.");
            return;
        };

        if ($.trim($txtPlazoEntrega.val()) == "") {
            app.message.error("Validaci&oacute;n", "Debe de ingresar el plazo de entrega de la cotización.");
            return;
        }
        else {
            if (!app.validaNumeroEntero($txtPlazoEntrega.val())) {
                app.message.error("Validaci&oacute;n", "Número inválido para el Plazo de Entrega.");
                return;
            }
        };

        if ($cmbGarantia.attr("disabled") != "disabled") {
            if ($.trim($cmbGarantia.val()) === "" || $cmbGarantia.val() == undefined || $cmbGarantia.val() == null) {
                app.message.error("Validaci&oacute;n", "Debe de ingresar el periodo de garantía.");
                return;
            };
        }

        if ($.trim($cmbTipoPago.val()) === "" || $cmbTipoPago.val() == undefined || $cmbTipoPago.val() == null) {
            app.message.error("Validaci&oacute;n", "Debe de seleccionar la forma de pago.");
            return;
        };

        if ($cmbTipMoneda.attr("disabled") != "disabled") {
            if ($.trim($cmbTipMoneda.val()) === "" || $cmbTipMoneda.val() == undefined || $cmbTipMoneda.val() == null) {
                app.message.error("Validaci&oacute;n", "Debe de seleccionar el tipo de moneda.");
                return;
            };
        }

        var vFecCotizacion = null;
        if ($dateCotizacion.val() != "") {
            vFecCotizacion = app.stringToDate($dateCotizacion.val());
        }

        var vPorcDscto = null;
        if ($txtPorcentajeDscto.attr("disabled") != "disabled") {
            if ($txtPorcentajeDscto.val() != "") {
                if (!app.validaNumeroDecimal($txtPorcentajeDscto.val())) {
                    app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido del campo Porcentaje de Descuento");
                    return;
                }
                else { vPorcDscto = parseFloat($txtPorcentajeDscto.val()); }
            }
        }

        return true;

    }

    function enviarCotVenta() {

        if (!validarCotizacion()) { return false; }

        var vFecCotizacion = null;
        if ($dateCotizacion.val() != "") {
            vFecCotizacion = app.stringToDate($dateCotizacion.val());
        }

        var vPorcDscto = null;
        if ($txtPorcentajeDscto.val() != "") {
            if (app.validaNumeroDecimal($txtPorcentajeDscto.val())) { vPorcDscto = parseFloat($txtPorcentajeDscto.val()); }
        }

        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/EnviarCotizacion";
            var objDatos = {
                IdCliente: $idCliente.val(),
                IdCotizacion: $idCotizacion.val(),
                IdSolicitud: $numeroSolicitud.val(),
                IdWorkFlow: $idWorkFlow.val(),
                IdContacto: $txtCodContacto.val(),
                NombreContacto: $nombreContacto.val(),
                AreaContacto: $txtAreaContacto.val(),
                TelefonoContacto: $txtTelefono.val(),
                EmailContacto: $txtCorreo.val(),
                FecCotizacion: vFecCotizacion,
                PlazoEntrega: $txtPlazoEntrega.val(),
                FormaPago: $cmbTipoPago.val(),
                Moneda: $cmbTipMoneda.val(),
                Vigencia: $txtVigencia.val(),
                Garantia: $cmbGarantia.val(),
                Observacion: $txtObs.val(),
                PorcentajeDescuento: vPorcDscto
            };
            var objParam = JSON.stringify(objDatos);

            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
            };

            var fnDoneCallBack = function (data) {
                app.message.success("Cotizaci&oacute;n", "Se envi&oacute; la cotizaci&oacute;n correctamente.", "Aceptar", redirect);
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea enviar la cotizaci&oacute;n?", "S&iacute;", "No", fnSi);        
    }

    function recotizarSolicitud() {

        method = "POST";
        url = "BandejaSolicitudesVentas/RecotizarSolicitud";
        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IdWorkFlow: $idWorkFlow.val()
        };
        var objParam = JSON.stringify(objDatos);

        var fnSi = function () {
            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
            };

            var fnDoneCallBack = function (data) {
                app.message.success("Cotizaci&oacute;n", "Se gener&oacute; una nueva cotizaci&oacute;n correctamente.", "Aceptar", redirect);
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea recotizar la solicitud?", "S&iacute;", "No", fnSi);
    }

    function guardarCotVenta() {

        if (!validarCotizacion()) { return false; }

        var vFecCotizacion = null;
        if ($dateCotizacion.val() != "") {
            vFecCotizacion = app.stringToDate($dateCotizacion.val());
        };

        var fnsol = app.stringToDate($dateSolicitud.val());
        var fnCot = app.stringToDate($dateCotizacion.val());

        if (fnsol > fnCot) {
            app.message.error("Validaci&oacute;n", "La Fecha de Cotizaci&oacute;n no puede ser menor a la Fecha de Solicitud");
            return;
        };

        var vPorcDscto = null;
        if ($txtPorcentajeDscto.val() != "") {
            if (app.validaNumeroDecimal($txtPorcentajeDscto.val())) { vPorcDscto = parseFloat($txtPorcentajeDscto.val()); }
        }


        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/GuardarCotizacion";
            var objDatos = {
                IdCliente: $idCliente.val(),
                IdCotizacion: $idCotizacion.val(),
                IdSolicitud: $numeroSolicitud.val(),
                IdWorkFlow: $idWorkFlow.val(),
                IdContacto: $txtCodContacto.val(),
                NombreContacto: $nombreContacto.val(),
                AreaContacto: $txtAreaContacto.val(),
                TelefonoContacto: $txtTelefono.val(),
                EmailContacto: $txtCorreo.val(),
                FecCotizacion: vFecCotizacion,
                PlazoEntrega: $txtPlazoEntrega.val(),
                FormaPago: $cmbTipoPago.val(),
                Moneda: $cmbTipMoneda.val(),
                Vigencia: $txtVigencia.val(),
                Garantia: $cmbGarantia.val(),
                Observacion: $txtObs.val(),
                PorcentajeDescuento: vPorcDscto
            };
            var objParam = JSON.stringify(objDatos);

            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
            };

            var fnDoneCallBack = function (data) {
                app.message.success("Cotizaci&oacute;n", "Se grabo correctamente.", "Aceptar", redirect);
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea guardar la cotizaci&oacute;n?", "S&iacute;", "No", fnSi);
    }

    function listarCotDetItems() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ListarCotDetItems";
        var objFiltros = {
            opcGrillaItems: "2"
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            if ($TipoSolicitud.val() == "TSOL05" || $TipoSolicitud.val() == "TSOL04") {
                ConsultaItemDetalle();
            } else {
                cargarTablaCotDet(data);
                cargarTablaDetCotCostos(data);
            }
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }
    
    //function listarCotDetItemsTemp() {
    //    method = "POST";
    //    url = "BandejaSolicitudesVentas/ListarCotDetItems";
    //    var objFiltros = {
    //        opcGrillaItems: "1"
    //    };
    //    var objParam = JSON.stringify(objFiltros);

    //    var fnDoneCallBack = function (data) {
    //        cargarTablaCotDet(data);
    //    };

    //    app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    //}

    //function listarCotDetItemsCostos() {
    //    method = "POST";
    //    url = "BandejaSolicitudesVentas/ListarCotDetItems";
    //    var objFiltros = {
    //        opcGrillaItems: "2"
    //    };
    //    var objParam = JSON.stringify(objFiltros);

    //    var fnDoneCallBack = function (data) {
    //        cargarTablaDetCotCostos(data);
    //    };

    //    app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    //}

    function guardarValorizacion() {

        if ($idRolUsuario.val() === "SGI_VENTA_GERENTE") {
            let fobs = [];

            // Recorrer cada checkbox marcado
            $("#tblDetCotCostos tbody tr").each(function () {
                const fila = $(this).closest('tr');
                // Verificar si el boton de esta fila existe
                if ($(this).find("a[name='BtnExWord']").length > 0) {
                    // Obtener el texto de la sexta celda (Nombre de ex-works)
                    let item = $(this).find("td:eq(0)").text();
                    const id_boton = fila.find("a[name='BtnExWord']").attr('id');
                    let id = id_boton.replace("btnEditarFOBItem", "");
                    let valor_fob = $("#ExWork" + item+id).val();
                    fobs.push(valor_fob.trim());
                }
            });

            // Usando .filter() para eliminar duplicados
            let fobsOri = fobs.filter((valor, indice, self) => {
                return self.indexOf(valor) === indice;
            });

            const tieneVacio = fobsOri.some(elemento => elemento === "" || elemento === null || elemento === undefined);


            if (tieneVacio) {
                app.message.error("Validacion", "Debe ingresar todos los valores de Ex-Work de la cotizacion.");
                return;
            }

        }
        

        if (!validarCotizacion()) { return false; }

        var vFecCotizacion = null;
        if ($dateCotizacion.val() != "") {
            vFecCotizacion = app.stringToDate($dateCotizacion.val());
        }

        var vPorcDscto = null;
        if ($txtPorcentajeDscto.val() != "") {
            if (app.validaNumeroDecimal($txtPorcentajeDscto.val())) { vPorcDscto = parseFloat($txtPorcentajeDscto.val()); }
        }

        method = "POST";
        url = "BandejaSolicitudesVentas/GuardarValorizacion";
        var objDatos = {
            IdCliente: $idCliente.val(),
            IdCotizacion: $idCotizacion.val(),
            IdSolicitud: $numeroSolicitud.val(),
            IdWorkFlow: $idWorkFlow.val(),
            IdContacto: $txtCodContacto.val(),
            NombreContacto: $nombreContacto.val(),
            AreaContacto: $txtAreaContacto.val(),
            TelefonoContacto: $txtTelefono.val(),
            EmailContacto: $txtCorreo.val(),
            FecCotizacion: vFecCotizacion,
            PlazoEntrega: $txtPlazoEntrega.val(),
            FormaPago: $cmbTipoPago.val(),
            Moneda: $cmbTipMoneda.val(),
            Vigencia: $txtVigencia.val(),
            Garantia: $cmbGarantia.val(),
            Observacion: $txtObs.val(),
            PorcentajeDescuento: vPorcDscto
        };
        var objParam = JSON.stringify(objDatos);

        var fnSi = function () {
            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
            };

            var fnDoneCallBack = function (data) {
                app.message.success("Cotizaci&oacute;n", "Se guard&oacute; la cotizaci&oacute;n correctamente.", "Aceptar", redirect);
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea guardar la valoraci&oacute;n?", "S&iacute;", "No", fnSi);
    }

    function editarExWork(id, NroItem, CodTransporte, indStock) {
        $('#btnEditarFOBItem' + id).hide();
        $('#btnGuardarFOBItem' + id).show();


        //Para casilla Ex-Work:
        if (!indStock) {
            $('#txtExWork' + NroItem + id).hide();
            $('#ExWork' + NroItem + id).css('display', 'block');
            $('#lblExWork' + NroItem + id).css('display', 'block');
            $('#lblExWork' + NroItem + id).text('Ex-Work:');
        }


        //Para casilla Margen Utilidad:
        $('#txtMargenUtil' + NroItem + id).hide();
        $('#MargenUtil' + NroItem + id).css('display', 'block');
        $('#lblMargenUtil' + NroItem + id).css('display', 'block');
        $('#lblMargenUtil' + NroItem + id).text('Margen Utilidad:');

        //Para casilla Transporte:
        var method = "POST";
        var url = "Utiles/ListarTransportes";
        var objParam = "";

        var fnDoneCallback = function (data) {
            $('#txtTransporte' + NroItem + id).hide();


            $('#divTransporte' + NroItem + id).css('display', 'block');
            $('#Transporte' + NroItem + id).css('display', 'block');
            $('#lblTransporte' + NroItem + id).css('display', 'block');
            $('#lblTransporte' + NroItem + id).text('Transporte:');
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($('#Transporte' + NroItem + id), data, null, 0, "--Seleccione--", filters);
            var cod_transporte = $('#hdTransporte' + NroItem + id).val();
            if (cod_transporte != null && cod_transporte != "" && cod_transporte != "0") {
               
                $('#Transporte' + NroItem + id).val(cod_transporte).trigger("change.select2");
            }

        };
        app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);



    
        



        $("#btnGuardarValorizacion").prop("disabled", true);
       // $(".BtnExWord").prop("disabled", true);

        $("a[name='BtnExWord']").css({
            "pointer-events": "none",
            "cursor": "not-allowed",
            "color": "gray"
        });
    }

    function guardarExWork(id, NroItem, indStock) {

        var margenUtilidad = $('#MargenUtil' + NroItem + id).val();
        var transporte = $('#Transporte' + NroItem + id).val();
        if (!indStock) {
            var text_exwork = $('#ExWork' + NroItem + id).val();
            if (text_exwork === "" || text_exwork === null) {
                $('#ExWork' + NroItem + id).focus();
                app.message.error("Validacion", "Debe ingresar el valor del Ex-Work.");
                return false;
            }

        }

        if (margenUtilidad === "" || margenUtilidad === null) {
            $('#MargenUtil' + NroItem + id).focus();
            app.message.error("Validacion", "Debe ingresar el valor del Margen de Utilidad.");
            return false;
        }

        if (transporte === "0" || transporte === null || transporte === 0) {
            $('#Transporte' + NroItem + id).focus();
            app.message.error("Validacion", "Debe seleccionar el transporte.");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "W",
                CodigoSolicitud: id,
                NumeroOrden: text_exwork,
                NumeroContrato: margenUtilidad,
                NumeroGuiaRemision: transporte,
                EstadoAprobacion: $estadoSol.val(),
                CodigoWorkFlow: $idWorkFlow.val()
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    //location.reload();

                    var text_transporte = $('#Transporte' + NroItem + id + ' option:selected').text();

                    if (!indStock) {
                        $('#txtExWork' + NroItem + id).show();
                        $('#txtExWork' + NroItem + id).text('Ex-Work: ' + text_exwork);
                        $('#ExWork' + NroItem + id).css('display', 'none');
                        $('#lblExWork' + NroItem + id).css('display', 'none');
                    }


                    $('#txtMargenUtil' + NroItem + id).show();
                    $('#txtMargenUtil' + NroItem + id).text('Margen Util: ' + margenUtilidad);
                    $('#MargenUtil' + NroItem + id).css('display', 'none');
                    $('#lblMargenUtil' + NroItem + id).css('display', 'none');

                    $('#txtTransporte' + NroItem + id).show();
                    $('#txtTransporte' + NroItem + id).text('Transporte: ' + text_transporte);
                    $('#divTransporte' + NroItem + id).css('display', 'none');
                    $('#Transporte' + NroItem + id).css('display','none');
                    $('#lblTransporte' + NroItem + id).css('display', 'none');
                    $('#hdTransporte' + NroItem + id).val($('#Transporte' + NroItem + id).val());

                    


                    $("#btnGuardarValorizacion").prop("disabled", false);
                   // $(".BtnExWord").prop("disabled", false);
                    $("a[name='BtnExWord']").css({
                        "pointer-events": "auto",
                        "cursor": "pointer",
                        "color": ""
                    });
                    $('#btnEditarFOBItem' + id).show();
                    $('#btnGuardarFOBItem' + id).hide();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.RegistrarGestionVenta);
        }
        return app.message.confirm("Ventas", "Esta seguro que desea guardar los datos?", "Si", "No", fnSi, null);
    };


    function InicializarLogicaHijos() {

        $('#tblProductos tbody').off('click', 'td #btnAñadirChild');
        $('#tblProductos tbody').on('click', 'td #btnAñadirChild', function () {

            var tr = $(this).closest('tr');
        
            var row = $('#tblProductos').dataTable().api().row(tr);
        
            var childTableHtml = '';

            var data = row.data();

                if (row.child.isShown()) {
                    // Si la fila hija está visible, ocultarla
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    childTableHtml = GeneraTabla(data.NroItem);
                    var hijos = {}
                    hijos.Result = childProducts.filter(d => d.NroItem == data.NroItem) == null ? [] : childProducts.filter(d => d.NroItem == data.NroItem);
                    row.child(childTableHtml).show();
                    row.child().show();
                    tr.addClass('shown');
                    cargarTablaHijosProductos(hijos, '#tblAccesorios' + data.NroItem, data.NroItem, data.CodItem );
                }
            });
            // Función para dar formato a la fila hija
    }
    //function detalleHijo(NroItem, index) {
    //    //var tr = $(this).closest('tr');
    //
    //    var tr = $('#row' + index)
    //    var row = $('#tblProductos').dataTable().api().row(tr);
    //
    //    if (row.child.isShown()) {
    //        // Si la fila hija está visible, ocultarla
    //        row.child.hide();
    //        tr.removeClass('shown');
    //    } else {
    //        // Si no, mostrar la fila hija
    //        var table = GeneraTabla();
    //        row.child(table).show();            
    //
    //        //row.child(format(2)).show();
    //        tr.addClass('shown');
    //    }
    //    function format(data) {
    //        var tabla = GeneraTabla();
    //        return tabla;
    //    };
    //}


    function implementarTabla(selector, data, columns, columnsDefs, tableName, rowCallback, drawCallback, filters) {

        var table;
        if ($.fn.dataTable.isDataTable(tableName)) {
            table = selector.dataTable().api();
        } else {
            table = selector.dataTable({
                paging: filters != null ? filters.dataTablePaging : false,
                searching: false,//filters != null ? (filters.dataTableSearching /*|| defaults.dataTableSearching*/) : defaults.dataTableSearching,
                info: filters.info,//filters != null ? filters.dataTableInfo : true,
                ordering: filters.ordering,//defaults.dataTableOrdering,
                select: {
                    style: 'multi'
                },
                order: [],
                columns: columns,
                columnDefs: columnsDefs,
                lengthMenu:false,
                language: filters.language,
                //scrollX: true,  // Permite el desplazamiento horizontal
                //fixedColumns: {
                //    leftColumns: 1,   // Fija la primera columna
                //    rightColumns: 1   // Fija la última columna
                //},
                rowCallback: rowCallback,
                drawCallback: drawCallback,
                pageLength: filters.dataTablePageLength == null ? 10 : filters.dataTablePageLength,// filters != null ? (filters.dataTablePageLength || defaults.dataTablePageLength) : defaults.dataTablePageLength,
                lengthChange: false//filters != null ? (filters.dataTableLengthChange || defaults.dataTableLengthChange) : defaults.dataTableLengthChange
            }).api();
        }
        table.clear();
        if (data.Result.length > 0 ) {
            if ($estadoSol.val() == "SCOT") {
                data.Result.push([]);
            }
            table.rows.add(data.Result);
        } else {
            var result = GeneraTabla2();
            table.rows.add(result);
        };

        table.draw();
    }

    function GeneraTabla2() {
        var table = [];
        table.push({
            CodItem: null,
            CodFamilia: null,
            Descripcion:null,
            CodAlmacen:null,
            Stock: null,
            PrecioRef: null,
            DescMonCompra :null,
            DescUnidad :null,
            Cantidad :null,
            Marca :null,
            Modelo :null,
        });
        return table;
    };

    function GeneraTabla(NroItem) {
        var td = "<td colspan='10'><center>Accesorios</center></td>"
        var table = "<center><table  class='table table-condensed table-striped table-bordered dataTable no-footer' style='width:90%'  id=tblAccesorios" + NroItem + " >contenido</table></center>";
        var thead = "<thead style='background-color: #ef000096; color:white' >" +
                "<tr>" +
            "<th style='text-align:center; width:2%'><center>Cod.Producto</center></th>" +
            "<th style='text-align:center; width:5%'><center>Familia</center></th>" +
            "<th style='text-align:center; width:5%'><center>Almac&eacute;n</center></th>" +
            "<th style='text-align:center; width:5%'><center>Descripci&oacute;n</center></th>" +
            "<th style='text-align:center; width:5%'><center>Marca</center></th>" +
            "<th style='text-align:center; width:5%'><center>Modelo</center></th>" +
            "<th style='text-align:center; width:1%'><center>Cantidad</center></th>" +
            "<th style='text-align:center; width:3%'><center>Unidad de Medida</center></th>" +
            "<th style='text-align:center; width:2%'><center>Acciones</center></th>" +
                "</tr>" +
            "</thead>";
        var tbody = "<tbody></tbody>";

        table = table.replace("contenido", thead + tbody);
        return table;
    };


    function cargarTablaHijosProductos(data, selector, NroItem, CodItemPadre) {
        var columns = [
            {
                data: "CodItem",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='text' style='width: 100%' placeholder='Cod.Producto' onblur='javascript: cotvtadet.IniciarLogicaHijosInputs(event,this, this.value)' />";
                        //casilla = "<input type='text' placeholder='Cod.Producto'/>";

                    }
                    else {
                        casilla = "<input disabled type='text' style='width: 100%' placeholder='Cod.Producto' value='" + data + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodFamilia",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;' data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;' data-selected='08'></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodAlmacen",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input placeholder='Nombre Equipo' type='text' onblur='javascript: cotvtadet.IniciarLogicaInputs(event,this, this.value)' />";
                        //casilla = "<input placeholder='Nombre Equipo' type='text'/>";
                    }
                    else {
                        casilla = "<input disabled placeholder='Nombre Equipo' type='text' value='" + data + "' disabled />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Marca",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;'  data-selected=" + data + "></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Modelo",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null && row.Id == null) {
                        casilla = "<input placeholder='Modelo' type='text' />";
                    }
                    else {
                        casilla = "<input disabled placeholder='Modelo' type='text' value='" + (data == null ? '' : data) + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input style='width: 100%' type='number' placeholder='Cantidad' />"
                    }
                    else {
                        casilla = "<input style='width: 100%' disabled type='number' placeholder='Cantidad' value='" + data + "' />"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodUnidad",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;'  data-selected='" + data + "'></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    var seleccionar = "";
                    var eliminar = "";
                    if (data == null) {
                        seleccionar = '<a class="btn btn-default btn-xs" title="Agregar" id=btnAgregarItem><i class="fa fa-level-down" aria-hidden="true"></i> Agregar</a>';
                    } else {
                        seleccionar = ""
                        if ($PermitirEditarCotDetItem.val() == 'S') {

                            var dato = row.Id + "," + '"' + row.TipoItem + '"';
                            var dato2 = '"' + CodItemPadre + '"' + "," + '"' + row.CodItem + '","'+row.Id+'"';
                            seleccionar = "<a id='btnCostearItem' class='btn btn-info btn-xs' title='Editar' href='javascript: cotvtadet.editarSubItem("+ dato2 +")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Costear</a>";


                            eliminar = "<a class='btn btn-default btn-xs' title='Eliminar' id=btnEliminarItem  href = 'javascript: cotvtadet.eliminarItemProducto("+ dato +")'><i class='fa fa-trash' aria-hidden='true'></i> Eliminar</a>";
                        }
                    }

                    return '<center>' + seleccionar + eliminar + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: true
        }

        var rowCallback = function (row, data, index) {

            // Asignar un ID único basado en el índice de datos o algún identificador único
            nroItems.push(NroItem);
            cantidadProductosHijos = index + 1;


            $(row).attr('id', 'row' + index);

            var input = $(row.cells[0])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', index + '_' + NroItem + 'BI_CodProd_Child');

            var select = $(row.cells[1])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', NroItem + 'BI_cmbFamilia_Child' + index);

            var select = $(row.cells[2])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', NroItem + 'BI_cmbAlmacen_Child' + index);

            var input = $(row.cells[3])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', index + '_' + NroItem + 'BI_DescEquipo_Child');


            var select = $(row.cells[4])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', NroItem + 'BI_cmbMarca_Child' + index);


            var input = $(row.cells[5])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', index + '_' + NroItem + 'BI_Modelo_Child');

            var input = $(row.cells[6])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', NroItem + 'BI_Cantidad_Child' + index);


            var select = $(row.cells[7])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', NroItem + 'BI_cmbTipoMedida_Child' + index);

            if (data.Id == null || data.Id == "") {
                var btn = $(row.cells[8])
                btn = btn[0];
                btn = btn.children[0];
                btn = btn.children[0];
                $(btn).attr('href', "javascript: cotvtadet.agregarItemHijo('" + index + "'" + ","+ "'" + NroItem + "')");
            }

            $('#' + index + '_' + NroItem + 'BI_CodProd_Child', row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            CodProd: request.term,
                            CodFamilia: '08', //Buscar en accesorios
                            CantidadRegistros: 20
                        };
                        var objParam = JSON.stringify(objFiltros);

                        $.ajax({
                            url: baseUrl + "BandejaSolicitudesVentas/ObtenerSugerencias", // Ruta del método en el controlador
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: objParam
                        }).done(function (data, textStatus, jqXhr) {
                            response(data.Result);
                        }).fail(function (jqXhr, textStatus, errorThrow) {
                            app.message.error("Error inesperado", errorThrow)
                        })
                    }, // Array con los valores de autocompletado
                    position: { collision: "flip" }, // Muestra la lista debajo o arriba del input según la posición
                    appendTo: '#modalDetalleCotizacion', // Muestra la lista fuera de la tabla
                    autoFocus: true,  // Selección automática del primer item
                    minLength: 2, // Mínimo de caracteres para activar el autocompletado
                    select: function (event, ui) {
                        $(this).val(ui.item.value); // Inserta el valor seleccionado en el input
                        //IniciarLogicaInputs(event, $(this), $(this).val());
                        return false;
                    }
                });
            });

            $('#' + index + '_' + NroItem + 'BI_DescEquipo_Child', row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescEquipo: request.term,
                            CodFamilia: "08",
                            DescMarca: $(NroItem + '#BI_cmbMarca_Child' + index).val(),
                            CodUndMed: $(NroItem + '#BI_cmbTipoMedida_Child' + index).val(),
                            CantidadRegistros: 20
                        };
                        var objParam = JSON.stringify(objFiltros);

                        $.ajax({
                            url: baseUrl + "BandejaSolicitudesVentas/ObtenerSugerencias", // Ruta del método en el controlador
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: objParam
                        }).done(function (data, textStatus, jqXhr) {
                            response(data.Result);
                        }).fail(function (jqXhr, textStatus, errorThrow) {
                            app.message.error("Error inesperado", errorThrow)
                        })
                    }, // Array con los valores de autocompletado
                    position: { collision: "flip" }, // Muestra la lista debajo o arriba del input según la posición
                    appendTo: '#modalDetalleCotizacion', // Muestra la lista fuera de la tabla
                    autoFocus: true,  // Selección automática del primer item
                    minLength: 2, // Mínimo de caracteres para activar el autocompletado
                    select: function (event, ui) {
                        $(this).val(ui.item.value); // Inserta el valor seleccionado en el input
                        //IniciarLogicaInputs(event, $(this), $(this).val())
                        return false;
                    }
                });
            });

            $('#' + index + '_' + NroItem + 'BI_Modelo_Child', row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescModelo: request.term,
                            CodFamilia: $('#' + nroItem + 'BI_cmbFamilia_Child' + index).val() == "" ? "08" : $('#' + nroItem + 'BI_cmbFamilia_Child' + index).val(),
                            DescMarca: $('#' + nroItem + 'BI_cmbMarca_Child' + index).val(),
                            CodUndMed: $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index).val(),
                            CantidadRegistros: 20
                        };
                        var objParam = JSON.stringify(objFiltros);

                        $.ajax({
                            url: baseUrl + "BandejaSolicitudesVentas/ObtenerSugerencias", // Ruta del método en el controlador
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: objParam
                        }).done(function (data, textStatus, jqXhr) {
                            response(data.Result);
                        }).fail(function (jqXhr, textStatus, errorThrow) {
                            app.message.error("Error inesperado", errorThrow)
                        })
                    }, // Array con los valores de autocompletado
                    position: { collision: "flip" }, // Muestra la lista debajo o arriba del input según la posición
                    appendTo: '#modalDetalleCotizacion', // Muestra la lista fuera de la tabla
                    autoFocus: true,  // Selección automática del primer item
                    minLength: 2, // Mínimo de caracteres para activar el autocompletado
                    select: function (event, ui) {
                        $(this).val(ui.item.value); // Inserta el valor seleccionado en el input
                        //IniciarLogicaInputs(event, $(this),$(this).val())
                        return false;
                    }
                });
            });

        };


        var filters = {}
        filters.dataTableInfo = false;
        filters.dataTablePageLength = 100;
        filters.info = false;
        filters.ordering = false;
        filters.language = "";
        filters.dataTablePaging = false;



        implementarTabla($(selector), data, columns, columnDefs, selector, rowCallback, null, filters);

        cargarCombosHijos();
    };


    function cargarCombosHijos() {
        var filters1 = {};
        filters1.placeholder = "--Seleccionar--";
        filters1.allowClear = false;

        arrayFamiliaAcc = arrayFamilias.filter(d => d.Id == "08");

        for (var i = 0; nroItems.length > i; i++) {

            llenarCombos('#' + nroItems[i] + 'BI_cmbMarca_Child', arrayMarcas, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1, cantidadProductosHijos);
            llenarCombos('#' + nroItems[i] + 'BI_cmbTipoMedida_Child', arrayTipMedida, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1, cantidadProductosHijos);
            llenarCombos('#' + nroItems[i] + 'BI_cmbAlmacen_Child', arrayAlmacen, $("#modalDetalleCotizacion"), " ", "No definido", filters1, cantidadProductosHijos);
            llenarCombos('#' + nroItems[i] + 'BI_cmbFamilia_Child', arrayFamiliaAcc, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1, cantidadProductosHijos)
        }
        nroItems = [];
    };

    function agregarItemHijo(index, nroItem) {
        var descripcion = $('#' + index.toString() + '_' + nroItem + 'BI_DescEquipo_Child').val();
        var codItem = $('#' + index.toString() + '_' + nroItem +  'BI_CodProd_Child').val();
        var stock = $('#' + nroItem + 'BI_Stock_Child' + index.toString()).val();
        var codMoneda = $('#' + nroItem + 'BI_CodMoneda_Child' + index.toString()).val();
        var unidad = $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index.toString()).val();
        var descUnidad = $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index.toString() + ' option:selected').text();
        var cantidad = $('#' + nroItem + 'BI_Cantidad_Child' + index.toString()).val();
        var marca = $('#' + nroItem + 'BI_cmbMarca_Child' + index.toString()).val();
        var modelo = $('#' + index.toString() + '_' + nroItem + 'BI_Modelo_Child').val();
        var familia = $('#' + nroItem + 'BI_cmbFamilia_Child' + index.toString()).val();
        var codAlmacen = $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).val();

        if (codItem == "" || codItem == null || codItem == undefined || codItem.trim().length == 0) {
            app.message.error("Validaci&oacute;n", "El campo Cod.Producto de la fila, debe estar completo");
            return;
        };

        if (descripcion == "" || descripcion == null || descripcion == undefined || descripcion.trim().length == 0) {
            app.message.error("Validaci&oacute;n", "El campo Descripci&oacute;n de la fila, debe estar completo");
            return;
        };

        if (familia == "" || familia == null) {
            app.message.error("Validaci&oacute;n", "Debe de seleccionar la familia del producto, no puede estar vac&iacute;o")
            return;
        };

        if (cantidad < 0) {
            app.message.error("Validaci&oacute;n", "El valor de cantidad no debe de ser menor a 0");
            return;
        };

        var validador = 0;


        childProducts.forEach((element) => {
            if (element != null && element != "" && element != undefined) {
                if (element.CodItem.trim() == codItem && element.NroItem == nroItem) {
                    validador = 1;
                };
            }
        });

        if (validador == 1) {
            app.message.error("Validaci&oacute;n", "El c&oacute;digo de producto ya ha sido ingresado, por favor revisar");
            return;
        }

        info = {
            IdCotizacion: $idCotizacion.val(),
            NroItem: nroItem,
            CodItem: codItem,
            Descripcion: descripcion,
            Stock: stock,
            Cantidad: cantidad,
            CodUnidad: unidad,
            DescUnidad: descUnidad,
            Marca: marca,
            Modelo: modelo,
            CodFamilia: familia,
            CodAlmacen: codAlmacen,
            EsItemPadre: false,
            Eliminado: false,
        };

        var method = "POST";
        var url = "BandejaSolicitudesVentas/InsertCotDet";
        var objParam = JSON.stringify(info);

        var fnDoneCallBack = function () {
            app.message.success("&Eacute;xito", "Se agreg&oacute; correctamente");
            listarCotDetItems();
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    }

    function CargarTablaProductos(data) {
        var columns = [
            {
                data: "NroItem",
                render: function (data, type, row) {
                    if (data == null) {
                        return '';
                    }
                    else {
                        if (row.CodFamilia == "08" || $TipoSolicitud.val() == "TSOL04") {//Inhabilitado para Accesorios y para venta de materiales. 
                            return '';
                        } else {
                            return '<center><a id="btnAñadirChild" class="btn btn-green btn-xs" ><i class="fa fa-arrow-down" aria-hidden="true"></i></a></center>';
                        }
                    };
                }
            },
            {
                data: "CodItem",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='text' placeholder='Cod.Producto' style='width:100%' onblur='javascript: cotvtadet.IniciarLogicaInputs(event,this, this.value)' />";
                        //casilla = "<input type='text' placeholder='Cod.Producto'/>";
                        
                    }
                    else {
                        casilla = "<input disabled type='text' placeholder='Cod.Producto' style='width:100%' value='" + data + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodFamilia",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;' data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;' data-selected='" + data + "'></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodAlmacen",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;'  data-selected='" + data + "'></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input placeholder='Nombre Equipo' type='text' onblur='javascript: cotvtadet.IniciarLogicaInputs(event,this, this.value)' />";
                        //casilla = "<input placeholder='Nombre Equipo' type='text'/>";
                    }
                    else {
                        casilla = "<input disabled placeholder='Nombre Equipo' type='text' value='"+ data +"' disabled />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Marca",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;'  data-selected=" + data +"></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Modelo",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null && row.NroItem == null) {
                        casilla = "<input placeholder='Modelo' type='text' />";
                    }
                    else {
                        casilla = "<input disabled placeholder='Modelo' type='text' value='" + (data == null ? '' : data) + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null)
                    {
                        casilla = "<input type='number' style='width:100%' placeholder='Cantidad' />"
                    }
                    else{
                        casilla = "<input disabled type='number' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodUnidad",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;'  data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;'  data-selected='" + data + "'></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    var seleccionar = "";
                    var eliminar = "";
                    if (data == null) {
                        seleccionar = '<a class="btn btn-default btn-xs" title="Agregar" id=btnAgregarItem><i class="fa fa-level-down" aria-hidden="true"></i> Agregar</a>';
                    } else {
                        seleccionar = ""
                        if ($PermitirEditarCotDetItem.val() == "S") {
                            var dato = row.Id + "," + '"' + row.TipoItem + '"';

                            seleccionar = "<a id='btnCostearItem' class='btn btn-info btn-xs' title='Editar' href='javascript: cotvtadet.EditarCotDetItem(" + data + ")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Costear</a>";


                            eliminar = "<a class='btn btn-default btn-xs' title='Eliminar' id=btnEliminarItem  href = 'javascript: cotvtadet.eliminarItemProducto(" + dato + ")'><i class='fa fa-trash' aria-hidden='true'></i> Eliminar</a>";
                        }
                    }
                    
                    return '<center>' + seleccionar + eliminar + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: true
        }

        var rowCallback = function (row, data, displayNum, displayIndex, dataIndex) {

            var index = dataIndex;

            cantidadProductos = index + 1 ;
            $(row).attr('id', 'row' + index);

            var input = $(row.cells[1])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', index + 'BI_CodProd');

            var select = $(row.cells[2])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbFamilia' + index);

            var select = $(row.cells[3])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbAlmacen' + index);

            var input = $(row.cells[4])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', index + 'BI_DescEquipo' );


            var select = $(row.cells[5])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbMarca' + index);


            var input = $(row.cells[6])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', index + 'BI_Modelo');

            var input = $(row.cells[7])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Cantidad' + index);


            var select = $(row.cells[8])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbTipoMedida' + index);


            if (data.Id == null || data.Id ==   "") {
                var btn = $(row.cells[9])
                btn = btn[0];
                btn = btn.children[0];
                btn = btn.children[0];
                $(btn).attr('href', "javascript: cotvtadet.agregarItemProducto('" + index + "')");
            }

            $('#' + index + 'BI_CodProd', row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            CodProd: request.term,
                            CodFamilia: $('#BI_cmbFamilia' + index).val() == "" ? opcTodasFamilias : $('#BI_cmbFamilia' + index).val(),
                            CantidadRegistros: 20
                        };
                        var objParam = JSON.stringify(objFiltros);

                        $.ajax({
                            url: baseUrl + "BandejaSolicitudesVentas/ObtenerSugerencias", // Ruta del método en el controlador
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: objParam
                        }).done(function (data, textStatus, jqXhr) {
                            response(data.Result);
                        }).fail(function (jqXhr, textStatus, errorThrow) {
                            app.message.error("Error inesperado", errorThrow)
                        })
                    }, // Array con los valores de autocompletado
                    position: { collision: "flip" }, // Muestra la lista debajo o arriba del input según la posición
                    appendTo: '#modalDetalleCotizacion', // Muestra la lista fuera de la tabla
                    autoFocus: true,  // Selección automática del primer item
                    minLength: 2, // Mínimo de caracteres para activar el autocompletado
                    select: function (event, ui) {
                        $(this).val(ui.item.value); // Inserta el valor seleccionado en el input
                        //IniciarLogicaInputs(event, $(this), $(this).val());
                        return false;
                    }
                });
            });

            $('#' + index +'BI_DescEquipo', row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescEquipo: request.term,
                            CodFamilia: $('#BI_cmbFamilia' + index).val() == "" ? opcTodasFamilias : $('#BI_cmbFamilia' + index).val(),
                            DescMarca: $('#BI_cmbMarca' + index).val(),
                            CodUndMed: $('#BI_cmbTipoMedida' + index).val(),
                            CantidadRegistros: 20
                        };
                        var objParam = JSON.stringify(objFiltros);

                        $.ajax({
                            url: baseUrl + "BandejaSolicitudesVentas/ObtenerSugerencias", // Ruta del método en el controlador
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: objParam
                        }).done(function (data, textStatus, jqXhr) {
                            response(data.Result);
                        }).fail(function (jqXhr, textStatus, errorThrow) {
                            app.message.error("Error inesperado", errorThrow)
                        })
                    }, // Array con los valores de autocompletado
                    position: { collision: "flip" }, // Muestra la lista debajo o arriba del input según la posición
                    appendTo: '#modalDetalleCotizacion', // Muestra la lista fuera de la tabla
                    autoFocus: true,  // Selección automática del primer item
                    minLength: 2, // Mínimo de caracteres para activar el autocompletado
                    select: function (event, ui) {
                        $(this).val(ui.item.value); // Inserta el valor seleccionado en el input
                        //IniciarLogicaInputs(event, $(this), $(this).val())
                        return false;
                    }
                });
            });

            $('#' + index +'BI_Modelo', row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescModelo: request.term,
                            CodFamilia: $('#BI_cmbFamilia' + index).val() == "" ? opcTodasFamilias : $('#BI_cmbFamilia' + index).val(),
                            DescMarca: $('#BI_cmbMarca' + index).val(),
                            CodUndMed: $('#BI_cmbTipoMedida' + index).val(),
                            CantidadRegistros: 20
                        };
                        var objParam = JSON.stringify(objFiltros);

                        $.ajax({
                            url: baseUrl + "BandejaSolicitudesVentas/ObtenerSugerencias", // Ruta del método en el controlador
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: objParam
                        }).done(function (data, textStatus, jqXhr) {
                            response(data.Result);
                        }).fail(function (jqXhr, textStatus, errorThrow) {
                            app.message.error("Error inesperado", errorThrow)
                        })
                    }, // Array con los valores de autocompletado
                    position: { collision: "flip" }, // Muestra la lista debajo o arriba del input según la posición
                    appendTo: '#modalDetalleCotizacion', // Muestra la lista fuera de la tabla
                    autoFocus: true,  // Selección automática del primer item
                    minLength: 2, // Mínimo de caracteres para activar el autocompletado
                    select: function (event, ui) {
                        $(this).val(ui.item.value); // Inserta el valor seleccionado en el input
                        //IniciarLogicaInputs(event, $(this),$(this).val())
                        return false;
                    }
                });
            });

        };


        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 7;
        filters.info = true;
        filters.ordering = false;
        filters.language = {
            "paginate": {
                "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                "last": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                "next": '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                "previous": '<i class="fa fa-angle-left" aria-hidden="true"></i>'
            },
            "search": "Buscar:",
            "emptyTable": "Sin datos",
            "info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 al 0 registros",
            "infoFiltered": "(Filtrado de _MAX_ registros en total)",
            "select": {
                "rows": {
                    "_": "", //%d registros seleccionados
                    "0": "",
                    "1": "" //1 registro seleccionado
                }
            }
        };

        var drawCallBack = function () {
            ObtenerFiltrosPrecios();
        };

        implementarTabla($tblProductos, data, columns, columnDefs, "#tblProductos", rowCallback, drawCallBack, filters);

        InicializarLogicaHijos();
        
        //cargarBtnAgregarItem();
        //IniciarLogicaInputs(e, selector, valueInput);
    };


    function IniciarLogicaHijosInputs(event, selector, valueInput) {

        //var id = selector[0].getAttribute("id");
        var id = selector.getAttribute("id");
        var index = id.substring(0, id.indexOf('_'))
        var nroItem = id.substring(id.indexOf('_') + 1, id.indexOf('BI'));
        var newid = id.substring(id.indexOf('BI'), id.length);

        if (valueInput != "" && valueInput != null && valueInput != undefined) {
            method = "POST";
            url = "BandejaSolicitudesVentas/ObtenerArticulos";

            if (newid == "BI_CodProd_Child") {
                var objFiltros = {
                    CodsArticulo: $('#' + index.toString() + '_' + nroItem + newid).val(),
                    CantidadRegistros: 1
                };
            } else if (newid == "BI_DescEquipo_Child") {
                var objFiltros = {
                    DescArticulo: $('#' + index.toString() + newid).val(),
                    CodsUnidad: $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index).val() == "" ? "" : $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index).val(),
                    CodsFamilia: $('#' + nroItem + 'BI_cmbFamilia_Child' + index).val() == "" ? "08" : $('#' + nroItem + 'BI_cmbFamilia_Child' + index).val(),
                    CodsAlma: $('#' + nroItem + 'BI_cmbAlmacen_Child' + index).val() == "" ? "0015;0001;0017" : $('#' + nroItem + 'BI_cmbAlmacen_Child' + index).val(),
                    CantidadRegistros: 1
                };
            }
            var objParam = JSON.stringify(objFiltros);

            var fnDoneCallBack = function (data) {
                if (data.Result.length == 0) {
                    $('#' + nroItem + 'BI_cmbFamilia_Child' + index.toString()).prop('disabled', false);
                    $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).prop('disabled', false);
                    $('#' + index.toString() + '_' + nroItem + 'BI_DescEquipo_Child').prop('disabled', false);
                    $('#' + nroItem + 'BI_cmbMarca_Child' + index.toString()).prop('disabled', false);
                    $('#' + index.toString() + '_' + nroItem + 'BI_Modelo_Child').prop('disabled', false);
                    $('#' + index.toString() + '_' + nroItem + 'BI_CodProd_Child').prop('disabled', false);
                    $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index.toString()).prop('disabled', false);
                    $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).val(" ").trigger('change.select2');
                }
                else {
                    var codAcceso = 0
                    if (newid == "BI_CodProd_Child") {
                        codAcceso = 1;
                    }
                    else if (newid == "BI_DescEquipo_Child") {
                        codAcceso = 2;
                    };
                    rellenarInputsHijosTabla(data.Result, index, codAcceso, nroItem);
                };
            };

            var fnFailCallback = function () {
                app.message.error("Validaci&oacute;n", "No hay productos.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
        }
        else {
            $('#' + nroItem + 'BI_cmbFamilia_Child' + index.toString()).prop('disabled', false);
            $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).prop('disabled', false);
            $('#' + index.toString() + '_' + nroItem + 'BI_DescEquipo_Child').prop('disabled', false);
            $('#' + index.toString() + '_' + nroItem + 'BI_CodProd_Child').prop('disabled', false);
            $('#' + nroItem + 'BI_cmbMarca_Child' + index.toString()).prop('disabled', false);
            $('#' + index.toString() + '_' + nroItem + 'BI_Modelo_Child_Child').prop('disabled', false);
            $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index.toString()).prop('disabled', false);
            $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).val(" ").trigger('change.select2');
            $('#' + nroItem + 'BI_Moneda_Child' + index.toString()).val("");
            $('#' + nroItem + 'BI_Cantidad_Child' + index.toString()).val("");
            $('#' + nroItem + 'BI_Stock_Child' + index.toString()).val("");
            $('#' + nroItem + 'BI_Precio_Child' + index.toString()).val("");
            $('#' + nroItem + 'BI_CodMoneda_Child' + index.toString()).val("");
        };
    };


    function IniciarLogicaInputs(event, selector, valueInput) {

        //var id = selector[0].getAttribute("id");
        var id = selector.getAttribute("id");
        var index = id.substring(0, id.indexOf('BI'))
        var newid = id.substring(id.indexOf('BI'), id.length);

        if (valueInput != "" && valueInput != null && valueInput != undefined) {
            method = "POST";
            url = "BandejaSolicitudesVentas/ObtenerArticulos";

            if (newid == "BI_CodProd") {
                var objFiltros = {
                    CodsArticulo: $('#' + index.toString() + newid).val(),
                    CantidadRegistros: 1
                };
            } else if (newid == "BI_DescEquipo") {
                var objFiltros = {
                    DescArticulo: $('#' + index.toString() + newid).val(),
                    CodsUnidad: $('#BI_cmbTipoMedida' + index).val() == "" ? "" : $('#BI_cmbTipoMedida' + index).val(),
                    CodsFamilia: $('#BI_cmbFamilia' + index).val() == "" ? opcTodasFamilias : $('#BI_cmbFamilia' + index).val(),
                    CodsAlma: $('#BI_cmbAlmacen' + index).val() == "" ? "0015;0001;0017" : $('#BI_cmbAlmacen' + index).val(),
                    CantidadRegistros: 1
                };
            }
            var objParam = JSON.stringify(objFiltros);

            var fnDoneCallBack = function (data) {
                if (data.Result.length == 0) {
                    $('#BI_cmbFamilia' + index.toString()).prop('disabled', false);
                    $('#BI_cmbAlmacen' + index.toString()).prop('disabled', false);
                    $('#' + index.toString() + 'BI_DescEquipo').prop('disabled', false);
                    $('#BI_cmbMarca' + index.toString()).prop('disabled', false);
                    $('#' + index.toString() + 'BI_Modelo').prop('disabled', false);
                    $('#' + index.toString() + 'BI_CodProd').prop('disabled', false);
                    $('#BI_cmbTipoMedida' + index.toString()).prop('disabled', false);
                    $('#BI_cmbAlmacen' + index.toString()).val(" ").trigger('change.select2');
                }
                else {
                    var codAcceso = 0
                    if (newid == "BI_CodProd") {
                        codAcceso = 1;
                    }
                    else if (newid == "BI_DescEquipo") {
                        codAcceso = 2;
                    };
                    rellenarInputsTabla(data.Result, index, codAcceso);
                };
            };

            var fnFailCallback = function () {
                app.message.error("Validaci&oacute;n", "No hay productos.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
        }
        else {
            $('#BI_cmbFamilia' + index.toString()).prop('disabled', false);
            $('#BI_cmbAlmacen' + index.toString()).prop('disabled', false);
            $('#' + index.toString() + 'BI_DescEquipo').prop('disabled', false);
            $('#' + index.toString() + 'BI_CodProd').prop('disabled', false);
            $('#BI_cmbMarca' + index.toString()).prop('disabled', false);
            $('#' + index.toString() + 'BI_Modelo').prop('disabled', false);
            $('#BI_cmbTipoMedida' + index.toString()).prop('disabled', false);
            $('#BI_cmbAlmacen' + index.toString()).val(" ").trigger('change.select2');
            $('#BI_Moneda' + index.toString()).val("");
            $('#BI_Cantidad' + index.toString()).val("");
            $('#BI_Stock' + index.toString()).val("");
            $('#BI_Precio' + index.toString()).val("");
            $('#BI_CodMoneda' + index.toString()).val("");
        };
    };

    function rellenarInputsHijosTabla(data, index, codAcceso, nroItem) {
        $('#' + nroItem + 'BI_cmbFamilia_Child' + index.toString()).val(data[0].CodFamilia).trigger('change.select2');
        $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).val(data[0].CodAlmacen == "" || data[0].CodAlmacen == null ? " " : data[0].CodAlmacen).trigger('change.select2');
        if (codAcceso == 1) {
            $('#' + index.toString() + '_' + nroItem +'BI_DescEquipo_Child').val(data[0].DescArticulo);
        }
        else if (codAcceso == 2) {
            $('#' + index.toString() + '_' + nroItem + 'BI_CodProd_Child').val(data[0].CodArticulo);
        };
        $('#' + nroItem + 'BI_cmbMarca_Child' + index.toString()).val(data[0].CodMarca).trigger('change.select2');
        $('#' + + index.toString() + '_' + nroItem + 'BI_Modelo_Child').val(data[0].DescModelo);
        $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index.toString()).val(data[0].CodUnidad).trigger('change.select2');



        $('#' + nroItem + 'BI_Moneda_Child' + index.toString()).val(data[0].DescMonCompra);
        $('#' + nroItem + 'BI_CodMoneda_Child' + index.toString()).val(data[0].CodMonCompra);



        $('#' + nroItem + 'BI_Cantidad_Child' + index.toString()).val(0);
        $('#' + nroItem + 'BI_Stock_Child' + index.toString()).val(data[0].StockDisponible);
        $('#' + nroItem + 'BI_Precio_Child' + index.toString()).val(data[0].PrecioRef.toFixed(2));


        //Inhabilitar para que no puedan realizar modificaciones
        if (codAcceso == 1) {
            $('#' + index.toString() + '_' + nroItem + 'BI_DescEquipo_Child').prop('disabled', true);
        } else if (codAcceso == 2) {
            $('#' + index.toString() + '_' + nroItem + 'BI_CodProd_Child').prop('disabled', true);
        }
        $('#' + nroItem + 'BI_cmbFamilia_Child' + index.toString()).prop('disabled', true);
        $('#' + nroItem + 'BI_cmbAlmacen_Child' + index.toString()).prop('disabled', true);
        $('#' + nroItem + 'BI_cmbMarca_Child' + index.toString()).prop('disabled', true);
        $('#' + index.toString() + '_' + nroItem + 'BI_Modelo_Child').prop('disabled', true);
        $('#' + nroItem + 'BI_cmbTipoMedida_Child' + index.toString()).prop('disabled', true);
    }


    function rellenarInputsTabla(data, index,codAcceso) { //Se ajustan los valores de la tabla según la selección.
        $('#BI_cmbFamilia' + index.toString()).val(data[0].CodFamilia).trigger('change.select2');
        $('#BI_cmbAlmacen' + index.toString()).val(data[0].CodAlmacen == "" || data[0].CodAlmacen == null ? " " : data[0].CodAlmacen).trigger('change.select2');
        if (codAcceso == 1) {
            $('#' + index.toString() + 'BI_DescEquipo' ).val(data[0].DescArticulo);
        }
        else if (codAcceso == 2) {
            $('#' + index.toString() + 'BI_CodProd').val(data[0].CodArticulo);
        };
        $('#BI_cmbMarca' + index.toString()).val(data[0].CodMarca).trigger('change.select2');
        $('#' + + index.toString()  + 'BI_Modelo').val(data[0].DescModelo);
        $('#BI_cmbTipoMedida' + index.toString()).val(data[0].CodUnidad).trigger('change.select2');



        $('#BI_Moneda' + index.toString()).val(data[0].DescMonCompra); 
        $('#BI_CodMoneda' + index.toString()).val(data[0].CodMonCompra); 

        

        $('#BI_Cantidad' + index.toString()).val(0);
        $('#BI_Stock' + index.toString()).val(data[0].StockDisponible); 
        $('#BI_Precio' + index.toString()).val(data[0].PrecioRef.toFixed(2));    
        

        //Inhabilitar para que no puedan realizar modificaciones
        if (codAcceso == 1) {
            $('#' + index.toString() + 'BI_DescEquipo').prop('disabled', true);
        } else if (codAcceso == 2){
            $('#' + index.toString() + 'BI_CodProd').prop('disabled', true);
        }
        $('#BI_cmbFamilia' + index.toString()).prop('disabled', true);
        $('#BI_cmbAlmacen' + index.toString()).prop('disabled', true);
        $('#BI_cmbMarca' + index.toString()).prop('disabled', true);
        $('#' + index.toString() + 'BI_Modelo').prop('disabled', true);
        $('#BI_cmbTipoMedida' + index.toString()).prop('disabled', true);
    };
    function cargarBtnAgregarItem() {
    
        $('#tblProductos tbody').off('click', 'td #btnAgregarItem');
    
        $('#tblProductos tbody').on('click', 'td #btnAgregarItem', function () {
            var tr = $(this).closest('tr');

            var row = tr[0].getAttribute("id");
            var index = row.slice(-1);
            var newid = row.substring(0, (row.length - 1));

            var descripcion = $('#' + index.toString() + 'BI_DescEquipo').val();
            var codItem = $('#' + index.toString() + 'BI_CodProd').val();
            var stock = $('#' + index.toString() + 'BI_CodProd').val();
            var codMoneda = $('#BI_CodMoneda' + index.toString()).val();
            var unidad = $('#BI_cmbTipoMedida' + index.toString()).val();      
            var cantidad = $('#BI_Cantidad' + index.toString()).val(); 
            var marca = $('#BI_cmbMarca' + index.toString()).val(); 
            var modelo = $('#' + index.toString() + 'BI_Modelo').val(); 


            if (descripcion == "" || descripcion == null || descripcion == undefined || descripcion.trim.length == 0) {
                app.message.error("Validación", "El campo Descripción de la fila, debe estar completo");
                return;
            };

            if (codItem == "" || codItem == null || codItem == undefined || codItem.trim.length == 0) {
                app.message.error("Validación", "El campo Cod.Producto de la fila, debe estar completo");
                return;
            };

            info = {
                IdCotizacion: $idCotizacion.val(),
                Stock: 0,
                NroItem: (parseInt(index) + 1),
                CodItem: codItem,
                Descripcion: descripcion,
                Stock: stock,
                Cantidad: cantidad,
                CodUnidad: unidad,
                Marca: marca,
                Modelo: modelo,
                EsItemPadre: true
            };

            agregarItemProducto(info)
        });
    }

    function eliminarItemProducto(Id, tipoItem) {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/EliminarCotDet";
        var obj = {
            Id: Id,
            TipoItem: tipoItem
        }
        var objParam = JSON.stringify(obj);

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.success("&Eacute;xito", "Se elimin&oacute; correctamente el registro");
                ConsultaItemDetalle();
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
        }
        return app.message.confirm("Confirmaci&oacute;n", "Desea eliminar el registro seleccionado?", "Si", "No", fnSi);
    };

    function agregarItemProducto(index) {

        if (padreProducts.Result.length > 0) {
            var mayorNroItem = padreProducts.Result.reduce((previous, current) => {
                return current.NroItem > previous.NroItem ? current : previous;
            });
        }
        
        var descripcion = $('#' + index.toString() + 'BI_DescEquipo').val();
        var codItem = $('#' + index.toString() + 'BI_CodProd').val();
        var stock = $('#BI_Stock' + index.toString()).val();
        var codMoneda = $('#BI_CodMoneda' + index.toString()).val();
        var unidad = $('#BI_cmbTipoMedida' + index.toString()).val();
        var descUnidad = $('#BI_cmbTipoMedida' + index.toString() + ' option:selected').text();
        var cantidad = $('#BI_Cantidad' + index.toString()).val();
        var marca = $('#BI_cmbMarca' + index.toString()).val();
        var modelo = $('#' + index.toString() + 'BI_Modelo').val();
        var familia = $('#BI_cmbFamilia' + index.toString()).val();
        var codAlmacen = $('#BI_cmbAlmacen' + index.toString()).val();
        
        if (codItem == "" || codItem == null || codItem == undefined || codItem.trim().length == 0) {
            app.message.error("Validaci&oacute;n", "El campo Cod.Producto de la fila, debe estar completo");
            return;
        };
        
        if (descripcion == "" || descripcion == null || descripcion == undefined || descripcion.trim().length == 0) {
            app.message.error("Validaci&oacute;n", "El campo Descripci&oacute;n de la fila, debe estar completo");
            return;
        };
        
        if (familia == "" || familia == null) {
            app.message.error("Validaci&oacute;n","Debe de seleccionar la familia del producto, no puede estar vac&iacute;o")
            return;
        };

        if (cantidad < 0) {
            app.message.error("Validaci&oacute;n", "El valor de cantidad no debe de ser menor a 0");
            return;
        };

        var validador = 0;

        padreProducts.Result.forEach((element) => {
            if (element != null && element != "" && element != undefined) {
                if (element.CodItem.trim() == codItem) {
                    validador = 1;
                };
            }
        });


        if (validador == 1) {
            app.message.error("Validaci&oacute;n", "El c&oacute;digo de producto ya ha sido ingresado, por favor revisar");
            return;
        };

        
        info = {
            IdCotizacion: $idCotizacion.val(),
            NroItem: mayorNroItem == null || mayorNroItem == undefined ? parseInt(index) + 1 : parseInt(mayorNroItem.NroItem) + 1, //Conseguimos el número más grande.
            CodItem: codItem,
            Descripcion: descripcion,
            Stock: stock,
            Cantidad: cantidad,
            CodUnidad: unidad,
            DescUnidad: descUnidad,
            Marca: marca,
            Modelo: modelo,
            CodFamilia: familia,
            CodAlmacen: codAlmacen,
            EsItemPadre: true,
            Eliminado: false,
        };
        
        var method = "POST";
        var url = "BandejaSolicitudesVentas/InsertCotDet";
        var objParam = JSON.stringify(info);
        
        var fnDoneCallBack = function () {
            app.message.success("&Eacute;xito", "Se agreg&oacute; correctamente");
            ConsultaItemDetalle();
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    };

    function ConsultaItemDetalle() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ConsultaItemDetalle"
        var obj = {
            IdCotizacion: $idCotizacion.val()
        };

        var objParam = JSON.stringify(obj);


        var fnDoneCallBack = function (data) {

            
            padreProducts.Result = data.Result.filter(d => d.TipoItem == "PRO") == null ? [] : data.Result.filter(d => d.TipoItem == "PRO");
            CargarTablaProductos(padreProducts);
            cargarTablaCotDet(data);
            cargarTablaDetCotCostos(data);
            childProducts = data.Result.filter(d => d.TipoItem == "ACC") == null ? [] : data.Result.filter(d => d.TipoItem == "ACC");

            //cargarTablaCotDet(data);
            //cargarTablaDetCotCostos(data);
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al realizar la consulta del detalle de cotización.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null);
    };


    function llenarCombos(selector, data, selectorParent, firstValue, firstItem, filters, cantidad) {  
        var list = data; //Se inicializa para que no haya reinserción de datos.

        if (list.length > 0) {
            if (firstItem || (filters != null && filters.placeholder)) {
                var item = list[0];
                if (item.Id != null && item.Text != null) {
                    var obj = {
                        Id: firstValue,
                        Text: firstItem || (filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder)
                    };
                    list.splice(0, 0, obj);
                }
            }
        }

        for (var i = 0; cantidad > i; i++) {
            $(selector + i).empty();
            $(selector + i).select2({
                dropdownParent: selectorParent,
                language: 'es',
                allowClear: filters.allowClear,  // filters != null && filters.allowClear != null ? defaults.allowClear : defaults.select2AllowClear,
                placeholder: filters.placeholder, //filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder,
                data: $.map(list, function (obj, i) {
                    if (obj.Id != null && obj.Text != null) {
                        return {
                            id: obj.Id,
                            text: obj.Text
                        };
                    } else {
                        return null;
                    }
                })
            });
            var selected = $(selector + i).attr('data-selected');
            if (selected) {
                $(selector + i).val(selected).trigger("change");
            }
        } 
    }


    function SolicitarDscto() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/SolicitarDscto";
        var obj = {
            TipoProceso: "D",
            IdCotizacion: $idCotizacion.val(),
            IndDsctoRequiereAprob: true
        };

        var objParam = JSON.stringify(obj);

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.success("&Eacute;xito", "Se realiz&oacute; la solicitud");
                $btnSolicitarDscto.css('display', 'none');
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Hubo un error al solicitar el descuento, por favor revisar");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null, null);
        };
        app.message.confirm("Confirmacion", "Desea solicitar un descuento?", "Si", "No", fnSi);
    };

    return {
        buscarItems: buscarItems,
        ObtenerFiltrosPrecios: ObtenerFiltrosPrecios,
        RecargarFiltroFamilia: RecargarFiltroFamilia,
        agregarItem: agregarItem,
        agregarItemProducto: agregarItemProducto,
        agregarItemHijo: agregarItemHijo,
        quitarCotDetItem: quitarCotDetItem,
        EditarCotDetItem: EditarCotDetItem,
        editarCotDetItem: editarCotDetItem,
        quitarSubItem: quitarSubItem,
        editarSubItem: editarSubItem,
        SeleccionarRowCotDet: SeleccionarRowCotDet,
        VerSubItems: VerSubItems,
        grabarDatosCotDetItem: grabarDatosCotDetItem,
        cerrarModalDetItem: cerrarModalDetItem,
        grabarDatosCotDet: grabarDatosCotDet,
        cargarTablaDetCotCostos: cargarTablaDetCotCostos,
        cerrarModalDetCot: cerrarModalDetCot,
        enviarCotVenta: enviarCotVenta,
        listarCotDetItems: listarCotDetItems,
        //listarCotDetItemsTemp: listarCotDetItemsTemp,
        //listarCotDetItemsCostos: listarCotDetItemsCostos,
        CargarTablaProductos: CargarTablaProductos,
        recotizarSolicitud: recotizarSolicitud,
        editarExWork: editarExWork,
        guardarExWork: guardarExWork,
        //detalleHijo: detalleHijo,
        IniciarLogicaInputs: IniciarLogicaInputs,
        IniciarLogicaHijosInputs: IniciarLogicaHijosInputs,
        eliminarItemProducto: eliminarItemProducto,
	    quitarCostoItemVta: quitarCostoItemVta,
        editarCostoItem: editarCostoItem
    }
})(window.jQuery, window, document);