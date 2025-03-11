var detalleDespacho = (function ($, win, doc) {
    /***/
    var $nombreusuario = $('#nombreusuario');
    var $contadordoc = $("#contadordoc");
    var $PermitirEditarCotDetItem = $("#PermitirEditarCotDetItem");
    var $btnAgregarDetServ = $("#btnAgregarDetServ");
    var $DS_btnGuardar = $("#DS_btnGuardar");
    var $DS_btnCerrar = $('#DS_btnCerrar');
    var $btnEditarFacturaLogistica = $("#btnEditarFacturaLogistica");
    var $btnGuardarDespacho = $('#btnGuardarDespacho');
    var $chkPrestacionPrincipal = $('#chkPrestacionPrincipal');
    var $chkPrestacionAccesoria = $('#chkPrestacionAccesoria');
    var $txtNroFianzaPA = $('#txtNroFianzaPA');
    var $txtNroFianzaPP = $('#txtNroFianzaPP');
    var $vigencia = $('#vigencia');
    var $estadoDespacho = $('#estadoDespacho');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $perfilnombre = $('#perfilnombre');
    var $txtEstado = $('#txtEstado');
    var $btnRegistrar = $('#btnRegistrar');
    var $btnGuardarCabecera = $('#btnGuardarCabecera');
    var $cmbTipoDespacho = $('#cmbTipoDespacho');
    var $txtNumOrden = $('#txtNumOrden');
    var $txtNumContrato = $('#txtNumContrato');
    var $btnGuardarFacturaLogistica = $("#btnGuardarFacturaLogistica");
    var $divNumOrden = $('#divNumOrden');
    var $divContrato = $('#divContrato');
    var $divFecOrden = $('#divFecOrden');
    var $divFecContrato = $('#divFecContrato');
    var $dateFechaOrdenCompra = $('#dateFechaOrdenCompra');
    var $dateFechaContrato = $('#dateFechaContrato');
    var $dateFechaMax = $('#dateFechaMax');
    var $openRegdateMax = $('#openRegdateMax');
    var $openRegdateContrato = $('#openRegdateContrato');
    var $openRegdateOrdenCompra = $('#openRegdateOrdenCompra');
    var $LimpiardateFechaMax = $('#LimpiardateFechaMax');
    var $LimpiardateOrdenCompra = $('#LimpiardateOrdenCompra');
    var $LimpiardateFechaContrato = $('#LimpiardateFechaContrato');
    var $radFianza = $("#radFianza");
    var $btnRegistrarDespacho = $("#btnRegistrarDespacho");
    var $btnRegistrarDespachoSE = $("#btnRegistrarDespachoSE");
    var $radFianza2 = $('#radFianza2');
    var $NumDespacho = $('#NumDespacho');
    var $PorcentajeDscto = $('#PorcentajeDscto');
    var $txtCodigoPedidoSE = $('#txtCodigoPedidoSE'); // Agregado
    var $checkSeleccionarTodosServ = $('#checkSeleccionarTodosServ');
    var $tblDetalleServicios = $('#tblDetalleServicios');
    var $boxDetalleCotizacion = $('#boxDetalleCotizacion');
    var $boxDetalleServicios = $('#boxDetalleServicios');
    var $tblCostosUbi = $('#tblCostosUbi');
    var $bodyCostosUbi = $('#bodyCostosUbi');
    var $NoRegCostosUbi = $('#NoRegCostosUbi');
    var $hdnCodDetalle = $('#hdnCodDetalle');
    var $estadoSol = $('#estadoSol');

    /* Modales */
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalObservacion = $('#modalObservacion');
    var $modalSeries = $('#modalSeries');
    var $modalCostosUbi = $('#modalCostosUbi');

    /* Modales Observación */
    var $hdnObservacionId = $('#hdnObservacionId');
    var $NoExisteRegObs = $('#NoExisteRegObs');
    var $btnAgregarObservacion = $('#btnAgregarObservacion');
    var $tblObservaciones = $('#tblObservaciones');
    var $tituloModalObservacion = $('#tituloModalObservacion');
    var $grpAuditoriaObservacion = $('#grpAuditoriaObservacion');
    var $txtObservacion = $('#txtObservacion');
    var $btnGuardarObservacionReq = $('#btnGuardarObservacionReq');
    var $tbodyObservaciones = $('#tbodyObservaciones');
    var $tabObservaciones = $('#tabObservaciones');
    var $navObservaciones = $('#navObservaciones');
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');

    /* Modal Adjuntos */
    var $tipoDocAdjuntos = $('#tipoDocAdjuntos');
    var $fileCargaDocumentoSustento = $('#fileCargaDocumentoSustento');
    var $btnAgregarDocumento = $('#btnAgregarDocumento');
    var $NoExisteRegDoc = $('#NoExisteRegDoc');
    var $tbodyDocAdjuntos = $('#tbodyDocAdjuntos');
    var $tblDocumentosCargados = $('#tblDocumentosCargados');
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');
    var $cmbTipoDocumentoCarga = $('#cmbTipoDocumentoCarga');
    var $btnAdjuntarDocumento = $('#btnAdjuntarDocumento');
    var $btnCargarDocumento = $('#btnCargarDocumento');
    var $hdnDocumentoCargadoId = $('#hdnDocumentoCargadoId');
    var $cmbDocumentoCarga = $('#cmbDocumentoCarga');
    var $lblNombreArchivo = $('#lblNombreArchivo');
    /* Modal Seguimiento */
    var $tblSeguimiento = $('#tblSeguimiento');
    var $NoExisteRegSeg = $('#NoExisteRegSeg');

    var $tblDetalleCotizacion = $('#tblDetalleCotizacion');
    var $IdCotizacion = $('#IdCotizacion');
    var $checkSeleccionar = $('#checkSeleccionar');
    var $checkSeleccionarTodos = $('#checkSeleccionarTodos');
    var $btnRegresar = $('#btnRegresar');
    var $NumSol = $('#NumSol');
    var $numeroSolicitud = $('#numeroSolicitud');
    var $TipoSolicitud = $('#TipoSolicitud');
    var $estadoDesp = $('#estadoDesp');
    var $nombreRol = $('#nombreRol');

    /* Botones y lógica de despacho */
    var $btnEnviarGuiaTotal = $('#btnEnviarGuiaTotal');
    var $btnGuiaPedidoTotal = $('#btnGuiaPedidoTotal');
    var $FlagStock = $('#FlagStock');
    var $hdnDocumentoCargadoIdGuia = $('#hdnDocumentoCargadoIdGuia');
    var $cmbDocumentoCargaGuia = $('#cmbDocumentoCargaGuia');
    var $txtDescripcionDocumentoCargaGuia = $('#txtDescripcionDocumentoCargaGuia');
    var $cmbTipoDocumentoCargaGuia = $('#cmbTipoDocumentoCargaGuia');
    var $lblNombreArchivoGuia = $('#lblNombreArchivoGuia');
    var $modalCargaDocumentoGuia = $('#modalCargaDocumentoGuia');
    var $btnGuiaBOTotal = $('#btnGuiaBOTotal');
    var $btnEnviarGuiaBOTotal = $('#btnEnviarGuiaBOTotal');
    var $btnAdjuntarDocumentoGuia = $("#btnAdjuntarDocumentoGuia");
    var $fileCargaDocumentoSustentoGuia = $('#fileCargaDocumentoSustentoGuia');
    var $btnCargarDocumentoGuia = $("#btnCargarDocumentoGuia");
    var $btnAprobarGestionSS = $('#btnAprobarGestionSS');
    var $btnObservarGestionSS = $('#btnObservarGestionSS');
    var $tblSeriesSS = $("#tblSeriesSS");
    var $txtNumeroGuiaRemisionSE = $('#txtNumeroGuiaRemisionSE');

    /* Sección de Despacho */
    var $dateOrdenCompra = $("#dateOrdenCompra");
    var $txtFechaEntregaMax = $("#txtFechaEntregaMax");
    var $txtNroOrdenCompra = $("#txtNroOrdenCompra");
    var $btnGuardarGestion = $("#btnGuardarGestion");
    var $NoRegSeries = $("#NoRegSeries");
    var $tblSeriesCS = $("#tblSeriesCS");
    var $modalSeries = $("#modalSeries");
    var $txtCodigoProductoSerie = $("#txtCodigoProductoSerie");
    var $txtMarcaSerie = $("#txtMarcaSerie");
    var $txtDescripcion = $("#txtDescripcion");
    var $txtSerie = $("#txtSerie");
    var $codDetalleDespacho = $("#codDetalleDespacho");
    var $dateEntregaPedidoCE = $("#dateEntregaPedidoCE");
    var $dateEntregaPedido = $('#dateEntregaPedido');
    var $txtNumeroFactura = $('#txtNumeroFactura');
    var $txtNumeroFacturaCE = $("#txtNumeroFacturaCE");
    var $txtNumeroGuiaRemisionCE = $("#txtNumeroGuiaRemisionCE");
    var $btnRegistrarSerie = $("#btnRegistrarSerie");
    var $btnActualizarGestion = $("#btnActualizarGestion");
    var $btnEditarGestion = $("#btnEditarGestion");
    var $btnEnviarGuiaCS = $("#btnEnviarGuiaCS");
    var $btnEnviarGuiaSS = $("#btnEnviarGuiaSS");
    var $btnGuardarGestionLogistica = $("#btnGuardarGestionLogistica");
    var $btnEnviarGestionDespacho = $("#btnEnviarGestionDespacho");
    var $btnGuardarGestionLogisticaSE = $("#btnGuardarGestionLogisticaSE");
    var $btnEditarGestionLogistica = $("#btnEditarGestionLogistica");
    var $btnEnviarGestionDespachoSE = $("#btnEnviarGestionDespachoSE");
    var $ContadorSeriesCS = $("#ContadorSeriesCS");
    var $ContadorSeriesSS = $("#ContadorSeriesSS");
    var $TotalSeriesCS = $("#TotalSeriesCS");
    var $TotalSeriesSS = $("#TotalSeriesSS");
    var $btnFinalizarVenta = $("#btnFinalizarVenta");
    var $btnEnviarGuiaBOSS = $("#btnEnviarGuiaBOSS");
    var $btnGuardarImportacion = $("#btnGuardarImportacion");
    var $hdnIdZonaDespacho = $('#hdnIdZonaDespacho');
    var $NoRegSeriesSS = $('#NoRegSeriesSS');
    var $searchZonaDespacho = $('#searchZonaDespacho');
    var $txtZonaDepacho = $('#txtZonaDepacho');
    var $txtDireccion = $('#txtDireccion');
    var $txtGuia = $('#txtGuia');
    var $lblNombreArchivoDespacho = $('#lblNombreArchivoDespacho');
    var $CodigoDocumentoDespacho = $('#CodigoDocumentoDespacho');
    var $rowTablaSeriesGuias = $('#rowTablaSeriesGuias');
    var $rowSerieGuia = $('#rowSerieGuia');
    var $dateIngresoAlmacenSE = $('#dateIngresoAlmacenSE');
    var $opendateIngresoAlmacenSE = $('#opendateIngresoAlmacenSE');
    var $TipoReg = $('#TipoReg');
    var $FlagCargaDocumentoDespacho = $('#FlagCargaDocumentoDespacho');
    var $btnCargarOtroDocumento = $('#btnCargarOtroDocumento');
    var $ArchivoBase64 = $('#ArchivoBase64');
    var $ValidaBtnObservacion = $('#ValidaBtnObservacion');
    var $btnAdjuntarDocumentoDespacho = $("#btnAdjuntarDocumentoDespacho");
    var $btnGuardarUbigeoDespachoSel = $("#btnGuardarUbigeoDespachoSel");
    var $btnGuardarUbigeoSel = $("#btnGuardarUbigeoSel");
    var $cmbProvinciaServ = $('#cmbProvinciaServ');
    var $cmbDistritoServ = $('#cmbDistritoServ');
    var $cmbDepartamentoServ = $('#cmbDepartamentoServ');
    var $cmbProvinciaServ = $('#cmbProvinciaServ');
    var $cmbDistritoServ = $('#cmbDistritoServ');
    var $modalZonaTecSol = $('#modalZonaTecSol');
    var $txtCodUbicacionServ = $('#txtCodUbicacionServ');
    var $codigosIds = $("#codigosIds");
    var $fileCargaDocumentoSustentoDespacho = $('#fileCargaDocumentoSustentoDespacho');
    var $RegStock = $('#RegStock');
    var $tblSeriesGuia = $('#tblSeriesGuia');
    var $dateEntregaPedidoSE = $('#dateEntregaPedidoSE');
    var $btnBuscarTecnicos = $('#btnBuscarTecnicos');
    var $btnAñadirTecnico = $('#btnAñadirTecnico'); 
    var $btnGuardarProg = $('#btnGuardarProg');
    var $dateProg = $('#dateProg');
    var $btnRegistrarFechaProg = $("#btnRegistrarFechaProg");
    var $cmbTipDocTecnico = $('#cmbTipDocTecnico')
    var $txtNumDocTec = $('#txtNumDocTec')
    var $cmbTipoEmpleado = $('#cmbTipoEmpleado')
    var $txtNombres = $('#txtNombres')
    var $txtApePat = $('#txtApePat')
    var $txtApeMat = $('#txtApeMat')
    var $tblTecnicos = $('#tblTecnicos ');
    var tecnicosAsig = [];
    var $NoExisteTec = $('#NoExisteTec ');
    var $tblMainTecnicos = $('#tblMainTecnicos');
    var $EnvioServicio = $('#EnvioServicio ');
    var $dateProgramacionServ = $('#dateProgramacionServ');
    var $btnGuiaManuscritaTotal = $('#btnGuiaManuscritaTotal');
    var $btnRegistrarTecnicoExterno = $('#btnRegistrarTecnicoExterno');
    var $cmbTipoCredencial = $('#cmbTipoCredencial');
    var $txtNombreTecnico = $('#txtNombreTecnico')
    var $txtApellidoPaternoTec = $('#txtApellidoPaternoTec')
    var $txtApellidoMaternoTec = $('#txtApellidoMaternoTec')
    var $txtNumDocumento = $('#txtNumDocumento')
    var $txtTelefonoServ = $('#txtTelefonoServ')
    var $txtCorreoServ = $('#txtCorreoServ')
    var $txtZona = $('#txtZona')
    var $hdnIdZona = $("#hdnIdZona");
    var $searchZona = $("#searchZona");
    var $hdnIdTecnico = $('#hdnIdTecnico')
    var $cmbTipoCredencial = $('#cmbTipoCredencial');
    var $txtTipoTecnico = $('#txtTipoTecnico');
    var $hdnTipoEmpleado = $('#hdnTipoEmpleado');
    var $añadirTecnico = $('#añadirTecnico');
    var $btnBuscarTecnico = $('#btnBuscarTecnico');
    var $modalBusquedaTecnico = $('#modalBusquedaTecnico');
    var $btnEnviarServicio = $('#btnEnviarServicio ');
    var $dateFactura = $("#dateFactura");
    var $opendateFactura = $("#opendateFactura");
    var $txtNumeroFacturaServ = $("#txtNumeroFacturaServ");
    var $btnGuardarFactura = $("#btnGuardarFactura");
    var $txtCodigoPedidoCE = $('#txtCodigoPedidoCE');
    var $opendateIngresoAlmacenCE = $('#opendateIngresoAlmacenCE');
    var $dateIngresoAlmacenCE = $('#dateIngresoAlmacenCE');
    var $opendateEntregaPedidoCE = $('#opendateEntregaPedidoCE');
    var $DS_txtCodigo = $("#DS_txtCodigo");
    var $DS_txtDescripcion = $("#DS_txtDescripcion");
    var $DS_txtCantidad = $("#DS_txtCantidad");
    var $DS_txtPrecio = $("#DS_txtPrecio");
    var $DS_hdnIdCotDetServ = $('#DS_hdnIdCotDetServ');
    var $DS_txtTotalVenta = $('#DS_txtTotalVenta');
    var $DS_tblServiciosDetalle = $("#DS_tblServiciosDetalle");
    var $CI_btnCerrar = $("#CI_btnCerrar");
    var $txtNroPiso = $('#txtNroPiso');

    /*Mensajes*/
    var mensajes = {
        guardandoObservacion: "Por favor espere, se esta guardando la observación."
    };

    let observaciones = [];
    let adjuntos = [];

    let ContSerieSS = 0;
    let ContSerieCS = 0;
    let NumeroSinStock = 0;
    let NumeroConStock = 0;
    
    $(Initialize);

    function Initialize() {
        detalleDespacho.contadorObservaciones = 0;
        detalleDespacho.observaciones = [];
        detalleDespacho.xComprar = [];
        detalleDespacho.xComprarServ = [];
        detalleDespacho.Productos = [];
        detalleDespacho.arrDetalleSS = [];
        detalleDespacho.arrDetalleCS = [];
        if ($NumDespacho.val() == "0") {
            CargarDatosDetalle();
        };
        CargarCombos();
        //CargarTipoDocumento(8); //Despacho ventas 
        $dateFechaMax.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFechaContrato.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFechaOrdenCompra.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFactura.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateIngresoAlmacenSE.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateEntregaPedido.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateEntregaPedidoCE.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $cmbTipoDespacho.on('change', function () {
            if ($(this).val() == "DESP01") {
                $divNumOrden.css('display', 'block');
                $divFecOrden.css('display', 'block');
                $divFecContrato.css('display', 'none');
                $divContrato.css('display', 'none');
                $txtNumOrden.val("");
                $txtNumContrato.val("");
                $dateFechaOrdenCompra.val("");
                $dateFechaContrato.val("");

            }
            else if ($(this).val() == "DESP02") {
                $divNumOrden.css('display', 'none');
                $divContrato.css('display', 'block');
                $divFecOrden.css('display', 'none');
                $divFecContrato.css('display', 'block');
                $txtNumOrden.val("");
                $txtNumContrato.val("");
                $dateFechaOrdenCompra.val("");
                $dateFechaContrato.val("");
            };
        });
        $btnRegresar.click(Regresar);
        $LimpiardateFechaMax.click(LimpiarFechaMax);
        $LimpiardateFechaContrato.click(LimpiarFechaContrato);
        $LimpiardateOrdenCompra.click(LimpiarOrdenCompra);
        $openRegdateOrdenCompra.click($openRegdateOrdenCompraClick);
        $openRegdateContrato.click($openRegdateContratoClick);
        $openRegdateMax.click($openRegdateMaxClick);
        $radFianza.click($radFianza_click);
        $radFianza2.click($radFianza2_click);
        $btnGuiaBOTotal.click($btnGuiaBOTotal_click);
        $btnEnviarGuiaBOTotal.click($btnEnviarGuiaBOTotal_click);
        $btnAdjuntarDocumentoGuia.click($adjuntarDocumentoGuia_click);
        $DS_btnCerrar.click($DS_btnCerrar_click);
        $btnGuardarCabecera.click(GuardarCabecera);
        $fileCargaDocumentoSustentoGuia.on("change", $fileCargaDocumentoSustentoGuia_change);
        $btnCargarDocumentoGuia.click($btnCargarDocumentoGuia_click);
        $btnAprobarGestionSS.click($btnAprobarGestion_click);
        $btnRegistrar.click(RegistrarNuevo);
        $btnEditarFacturaLogistica.click($btnEditarFacturaLogistica_click);
        $btnGuardarFacturaLogistica.click($btnGuardarFacturaLogistica_click);
        $btnRegistrarFechaProg.click($btnRegistrarFechaProg_click);
        $btnAgregarObservacion.click($modalObservacionClick);
        $CI_btnCerrar.click(cerrarModalCostosItem);
        $btnGuardarProg.click($btnGuardarProg_click);
        $btnGuardarImportacion.click($btnGuardarImportacion_click);
        $btnBuscarTecnicos.click(BuscarTecnicosClick);
        $btnAdjuntarDocumentoDespacho.click($AdjuntarDocumentoDespacho_click);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $btnRegistrarSerie.click($btnRegistrarSerie_click);
        $btnGuardarUbigeoDespachoSel.click(seleccionarUbiDespacho);
        $searchZonaDespacho.click(BuscarCostos)//logicUbigeoDespacho);
        $btnEnviarGestionDespacho.click($btnEnviarGestionDespacho_click);
        $btnGuardarGestionLogistica.click($btnGuardarGestionLogistica_click);
        $btnRegistrarDespacho.click($btnRegistrarDespacho_click);
        $btnGuardarGestionLogisticaSE.click($btnGuardarGestionLogisticaSE_click);
        $btnGuardarUbigeoSel.click(seleccionarUbi);
        $fileCargaDocumentoSustentoDespacho.on("change", $fileCargaDocumentoSustentoDespacho_change);
        $fileCargaDocumentoSustentoDespacho.click($fileCargaDocumentoSustentoDespacho_change);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnEnviarGestionDespachoSE.click($btnEnviarGestionDespachoSE_click);
        $chkPrestacionPrincipal.click($chkPrestacionPrincipal_click);
        $chkPrestacionAccesoria.click($chkPrestacionAccesoria_click);
        $btnObservarGestionSS.click($btnObservarGestion_click);
        $btnEnviarGuiaTotal.click($btnEnviarGuiaTotal_click);
        $btnGuiaManuscritaTotal.click($btnGuiaManuscritaTotal_click);
        $btnGuiaPedidoTotal.click($btnGuiaPedidoTotal_click);
        $btnRegistrarDespachoSE.click($btnRegistrarDespachoSE_click);
        $btnRegistrarTecnicoExterno.click(CrearTecnico3ro_a_Producto);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        $searchZona.click(logicUbigeoTecnico);
        $btnBuscarTecnico.click(BuscarTecnicos);
        $btnEnviarServicio.click(btnEnviarServicioClick);
        $btnGuardarFactura.click($btnGuardarFactura_click);
        $btnGuardarDespacho.click(GuardarDespacho);

        $dateFechaOrdenCompra.on('change', function () {
            if ($(this).val() != "") {
                
                var fechaFin = calcularFechaMax($(this).val());

                $dateFechaMax.val(fechaFin);
            }
            else {
                $dateFechaMax.val("");
            }
            
        });

        $dateFechaContrato.on('change', function () {
            if ($(this).val() != "") {

                var fechaFin = calcularFechaMax($(this).val());

                $dateFechaMax.val(fechaFin)
            }
            else {
                $dateFechaMax.val("");
            }
        });

        IniciarBotonSeleccionarTecnico();
    };

    function seleccionarUbiDespacho() {

        var codDistrito = sessionStorage.getItem('codDistritoServ');

        var nomDepartamentoDespacho = sessionStorage.getItem('nomDepartamentoServ')
        var nomProvinciaDespacho = sessionStorage.getItem('nomProvinciaServ');
        var nomDistritoDespacho = sessionStorage.getItem('nombreDistritoServ');

        if ($cmbDepartamentoServ.val().trim() === "" || $cmbDepartamentoServ.val().trim() === null || $cmbDepartamentoServ.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un departamento");
            return;
        }

        if ($cmbProvinciaServ.val().trim() === "" || $cmbProvinciaServ.val().trim() === null || $cmbProvinciaServ.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar una provincia");
            return;
        }

        if ($cmbDistritoServ.val().trim() === "" || $cmbDistritoServ.val().trim() === null || $cmbDistritoServ.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un distrito");
            return;
        }

        $txtZonaDepacho.val(nomDepartamentoDespacho + ' / ' + nomProvinciaDespacho + ' / ' + nomDistritoDespacho);
        $hdnIdZonaDespacho.val(codDistrito);
        $modalZonaTecSol.modal('toggle');
    };

    function $btnGuardarGestionLogistica_click() {
        if ($dateEntregaPedido.val() === "" || $dateEntregaPedido.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido.");
            return false;
        };

        var fnSi = function () {
            var m = "POST";
            var url = "BandejaSolicitudesVentas/GestionLogistica";
            var obj = {
                CodigoSolicitud: $numeroSolicitud.val(),
                Stock: "S",
                EstadoAprobacion: $TipoSolicitud.val(),
                IdDespacho: $NumDespacho.val(),
                CodigoWorkFlow: $codigoWorkflow.val(),
                NumeroGuiaRemision: $txtNumeroGuiaRemisionCE.val(),
                NumeroFactura: $txtNumeroFactura.val(),
                FechaEntrega: $dateEntregaPedido.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.RegistrarGestionVenta);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de despacho?", "Si", "No", fnSi, null);
    }



    function $modalCargaDocumentoGuiaClick() {
        $hdnDocumentoCargadoIdGuia.val("GP");
        //$cmbTipoDocumentoCarga.empty();
        $cmbDocumentoCargaGuia.empty();
        $txtDescripcionDocumentoCargaGuia.val("");
        if ($("#idFlujo").val() == "1") {
            $cmbTipoDocumentoCargaGuia.val("DVT07").trigger("change.select2");
        }
        else {
            $cmbTipoDocumentoCargaGuia.val("DVT05").trigger("change.select2");
        }

        $cmbTipoDocumentoCargaGuia.prop('disabled', true);
        $lblNombreArchivoGuia.text("");
        $modalCargaDocumentoGuia.modal("show");
    };

    function $btnEnviarGuiaTotal_click() {

        if ($TipoSolicitud.val() === "TSOL03") //Validaciones para tipos de ventas servicio y repuestos:
        {
            if ($dateProgramacionServ.val() === null || $dateProgramacionServ.val() === "") {
                app.message.error("Validación", "Debe seleccionar una fecha de programación del técnico.");
                return;
            }

            if (tecnicosAsig.length == 0) {
                app.message.error("Validación", "Debe seleccionar un técnico para realizar el servicio.");
                return;
            };
        }


        var mensaje = "";
        if ($("#idFlujo").val() == "1") {
            mensaje = "¿Está seguro que desea enviar la Guia de Pedido?";
        }
        else {
            mensaje = "¿Está seguro que desea enviar la Guia Manuscrita?";
        }
        var fnSi = function () {
            $FlagStock.val("X");
            $modalCargaDocumentoGuiaClick();
        }
        return app.message.confirm("Ventas", mensaje, "S&iacute;", "No", fnSi, null);
    }
    function $btnGuiaPedidoTotal_click() {
        var tipo_despacho = "T";

        var num_solicitud = $numeroSolicitud.val();
        var tipo = "GP"
        if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03") //para repuestos y servicio y repuestos:
        {
            tipo = "MI";
        }
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud + "&stock=X" + "&tipoDespacho=" + tipo_despacho + "&idDespacho=" + $NumDespacho.val();

        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaPedido?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de pedidos correctamente.");
            $btnEnviarGuiaTotal.show();
        }
        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarGuiaPedidos);
    }


    function calcularFechaMax(valor) {
        const partes = valor.split('/');  // Separar la fecha por '/'

        var fecha = `${partes[2]}/${partes[1]}/${partes[0]}`;

        var nuevaFecha = new Date(fecha);
        var dias = parseInt($vigencia.val());
        nuevaFecha.setDate(nuevaFecha.getDate() + dias);

        var dia = nuevaFecha.getDate() < 10 ? '0' + nuevaFecha.getDate() : nuevaFecha.getDate();
        var mesActual = (nuevaFecha.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = nuevaFecha.getFullYear();

        var fechaFin = dia + '/' + mes + '/' + year;

        return fechaFin;
    }

    function LimpiarFechaMax() {
        $dateFechaMax.val("")
    };

    function LimpiarFechaContrato() {
        if ($estadoDesp.val() == "DREG" && $nombreRol == "SGI_VENTA_ASESOR") {
            $dateFechaContrato.val("")
            LimpiarFechaMax();
        };
    };

    function LimpiarOrdenCompra() {
        if ($estadoDesp.val() == "DREG" && $nombreRol == "SGI_VENTA_ASESOR") {
            $dateFechaOrdenCompra.val("")
            LimpiarFechaMax()
        };
    };

    function $openRegdateOrdenCompraClick() {
        $dateFechaOrdenCompra.focus();
    };

    function $openRegdateContratoClick() {
        $dateFechaContrato.focus();
    };

    function $openRegdateMaxClick() {
        $dateFechaMax.focus();
    };

    function $btnGuiaBOTotal_click() {

        var tipo_despacho = "T";

        //var tblSeriesSS = $('#tblSeriesSS tbody tr');
        //var tblSerieCS = $('#tblSeriesCS tbody tr');

        var validador = 0;

        if (detalleDespacho.arrDetalleSS.length > 0) {
            detalleDespacho.arrDetalleSS.forEach(function (currentValue, index, array) {
                var arrSS = []
                arrSS = $('#tblSeriesSS').find('#fila' + currentValue).children().toArray();
                arrSS.forEach(function (currentValue, index, array) {
                    if (index == 4) {
                        if (arrSS[index].textContent == "" || arrSS[index].textContent == null) {
                            validador = 1; //Se valida si algún elemento de la tblSerieSS está vacío para la sección de "DESTINO";
                        };
                    };
                });
            });
        };
        

        if (detalleDespacho.arrDetalleCS.length > 0) {
            detalleDespacho.arrDetalleCS.forEach(function (currentValue, index, array) {
                var arrCS = []
                arrCS = $('#tblSeriesCS').find('#fila' + currentValue).children().toArray();
                arrCS.forEach(function (currentValue, index, array) {
                    if (index == 4) {
                        if (arrCS[index].textContent == "" || arrCS[index].textContent == null) {
                            validador = 1; //Se valida si algún elemento de la tblSerieCS está vacío para la sección de "DESTINO";
                        };
                    };
                });
            });
        };
        

        
        if (validador == 1) {
            app.message.error("Validación", "Debe de ingresar el destino a todos los detalles de despacho");
            return;
        }

        var num_solicitud = $numeroSolicitud.val();
        var tipo = "BO";
        var method = 'POST';
        var url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud + "&stock=N" + "&tipoDespacho=" + tipo_despacho + "&idDespacho=" + $NumDespacho.val();
        var objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaBO?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de BO correctamente.");
            $btnEnviarGuiaBOTotal.show();
        };
        var fnFailCallBack = function () {

        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarBO);
    }

    function GuardarCabecera() {
        var fnSi = function () {

            var fianza = false;
            var indFianzaApp = false;
            var indFianzaApa = false;

            if ($radFianza.is(':checked')) {
                fianza = true;
            };

            if ($radFianza2.is(':checked')) {
                fianza = false;
            };
            if ($chkPrestacionPrincipal.is(':checked')) {
                indFianzaApp = true;
            };
            if ($chkPrestacionAccesoria.is(':checked')) {
                indFianzaApa = true;
            };


            var method = "POST";
            var url = "BandejaSolicitudesVentas/ActualizarCabeceraDespacho";
            var obj = {
                NumOrden: $txtNumOrden.val()
                , Id: $NumDespacho.val()
                , FechaOrden: $dateFechaOrdenCompra.val()
                , FechaMax: $dateFechaMax.val()
                , TipoDesp: $cmbTipoDespacho.val()
                , Estado: $txtEstado.val()
                , NumContrato: $txtNumContrato.val()
                , FecContrato: $dateFechaContrato.val()
                , Fianza: fianza
                , PrestPrin: indFianzaApp
                , NumFianzaApp: $txtNroFianzaPP.val()
                , PrestAcc: indFianzaApa
                , NumFianzaApa: $txtNroFianzaPA.val()
                , PorDscto: $PorcentajeDscto.val()
            };
            var objParam = JSON.stringify(obj);

            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Se actualizó el registro con éxito");
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se presentó un error al realizar la actualización de la información");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);

        };
        return app.message.confirm("Confirmación", "¿Desea guardar los cambios realizados en la cabecera de despacho?", "Sí", "No", fnSi);
    };
    function CargarCombos() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/FiltrosDespacho?idDespacho=" + $NumDespacho.val() + "&rolUsuario=" + $nombreRol.val();

        var fnDoneCallBack = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbTipoDespacho, data.Result.TipDespacho, null, "", "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipoDocumentoCarga, data.Result.TipoDocumento, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipoCredencial, data.Result.TipoDocumentoTecnico, "", 0, "", false);
            app.llenarComboMultiResult($cmbTipoDocumentoCargaGuia, data.Result.TipoDocumento, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipDocTecnico, data.Result.TipoDocumentoTecnico, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipoEmpleado, data.Result.TipoEmpleado, null, 0, "-- Seleccione --", filters);
            
            if ($NumDespacho.val() == "0") {
                $cmbTipoDespacho.val("DESP01").trigger('change.select2'); //se inicializa en orden de compra por defecto
            };

            if (data.Result.DespachoCabecera != null) {
                $codigoWorkflow.val(data.Result.DespachoCabecera.Id_WorkFlow);
                $estadoDesp.val(data.Result.DespachoCabecera.Estado);

                var tipo_despacho = data.Result.DespachoCabecera.TipoDesp;
                $cmbTipoDespacho.val(tipo_despacho).trigger('change.select2');
                if (tipo_despacho === "DESP01") {
                    $txtNumOrden.val(data.Result.DespachoCabecera.NumOrden);
                    $dateFechaOrdenCompra.val(data.Result.DespachoCabecera.FechaOrdenFormat);
                    $divNumOrden.css('display', 'block');
                    $divContrato.css('display', 'none');
                    $divFecOrden.css('display', 'block');
                    $divFecContrato.css('display', 'none');
                }
                else {
                    $txtNumContrato.val(data.Result.DespachoCabecera.NumContrato);
                    $dateFechaContrato.val(data.Result.DespachoCabecera.FechaContratoFormat);
                    $divNumOrden.css('display', 'none');
                    $divContrato.css('display', 'block');
                    $divFecOrden.css('display', 'none');
                    $divFecContrato.css('display', 'block');
                }
                $dateFechaMax.val(data.Result.DespachoCabecera.FechaMaximaFormat);

                var fianza = data.Result.DespachoCabecera.FianzaFormat;
                if (fianza === "S") {
                    $radFianza.prop("checked", true);
                    $radFianza2.prop("checked", false);
                }
                else {
                    $radFianza.prop("checked", false);
                    $radFianza2.prop("checked", true);
                    $chkPrestacionPrincipal.prop("disabled", true);
                    $chkPrestacionAccesoria.prop("disabled", true);
                    $txtNroFianzaPP.prop("disabled", true);
                    $txtNroFianzaPA.prop("disabled", true);
                }

                if (data.Result.DespachoCabecera.PrestPrinFormat === "S") {
                    $chkPrestacionPrincipal.prop("checked", true);
                }

                if (data.Result.DespachoCabecera.PrestAccFormat === "S") {
                    $chkPrestacionAccesoria.prop("checked", true);
                }

                detalleDespacho.Productos = data.Result.ListaDespachoDetalle.filter(x => x.TipoItem != "SER");
                detalleDespacho.Servicios = data.Result.ListaDespachoDetalle.filter(x => x.TipoItem == "SER");

                var productos = detalleDespacho.Productos;

                
                var servicios = detalleDespacho.Servicios;

                if (productos.length > 0) {
                    $boxDetalleCotizacion.css('display', '');
                    CargarTablaDespacho(productos);
                };

                if (servicios.length > 0) {
                    $boxDetalleServicios.css('display', '');
                    CargarTablaDespachoServ(servicios);
                };
                $txtNroFianzaPP.val(data.Result.DespachoCabecera.NumFianzaApp);
                $txtNroFianzaPA.val(data.Result.DespachoCabecera.NumFianzaApa);

                if (data.Result.ContadorCabecera.FechaFactura != "") {
                    $dateFactura.val(data.Result.ContadorCabecera.FechaFactura);
                }
                else {
                    $dateFactura.val("");
                }
                $txtNumeroFacturaServ.val(data.Result.ContadorCabecera.NumeroFactura);
                $dateProgramacionServ.val(data.Result.ContadorCabecera.FechaProgramacionTecnico);

                $txtNumeroFactura.val(data.Result.DespachoCabecera.NumFactura);
                $dateEntregaPedido.val(data.Result.DespachoCabecera.FechaFacturaFormat);

                $txtEstado.val(data.Result.DespachoCabecera.Estado);
                var seguimiento = data.Result.Seguimiento.length;
                if (seguimiento > 0) {
                    for (i = 0; i < data.Result.Seguimiento.length; i++) {

                        var nuevoTr = "<tr>" +
                            "<th style='text-align: center;'>" + data.Result.Seguimiento[i].DescripcionEstado + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Seguimiento[i].Cargo + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Seguimiento[i].NombreUsuarioRegistro + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Seguimiento[i].FechaRegistro + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Seguimiento[i].HoraRegistro + "</th>" +
                            "</tr>";
                        $tblSeguimiento.append(nuevoTr);
                    }
                    $NoExisteRegSeg.hide();
                }

                detalleDespacho.contadorObservaciones = data.Result.Observaciones.length;
                detalleDespacho.observaciones = data.Result.Observaciones;
                if (detalleDespacho.contadorObservaciones > 0) {
                    for (var i = 0; i < data.Result.Observaciones.length; i++) {
                        var nuevoTr = "<tr id='row" + data.Result.Observaciones[i].Id + "'>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Nombre_Usuario + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Perfil_Usuario + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Fecha_Registro + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Observacion + "</th>" +
                            "<th style='text-align: center;'>" + " " + "</th>" + //Controlar la modificación de observaciones por el usuario que haya registrado dicha detalleDespacho. 
                            "</tr>";
                        $tblObservaciones.append(nuevoTr);
                    }
                    $NoExisteRegObs.hide();
                }

                ContSerieSS = data.Result.ContadorCabecera.ContadorSeriesSinStock;
                ContSerieCS = data.Result.ContadorCabecera.ContadorSeriesConStock;
                NumeroSinStock = data.Result.ContadorCabecera.NumeroSinStock;
                NumeroConStock = data.Result.ContadorCabecera.NumeroConStock;

                var docs = data.Result.Adjuntos.length;
                adjuntos = data.Result.Adjuntos;

                $contadordoc.val(docs);
                if (docs > 0) {
                    for (i = 0; i < data.Result.Adjuntos.length; i++) {
                        var html = '<div class="text-center">';
                        //var d = "'" + data.Result.Adjuntos[i].CodigoDocumento + "','" + data.Result.Adjuntos[i].RutaDocumento + "'";
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:detalleDespacho.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        if (($estadoDesp.val() == "DREG") && $nombreRol.val() != "SGI_VENTA_FACTURA") {
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detalleDespacho.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
                        }
                        html += '</div>';

                        var nuevoTr = "<tr id='row" + data.Result.Adjuntos[i].CodigoDocumento + "'>" +
                            "<th>" + data.Result.Adjuntos[i].NombreTipoDocumento + "</th>" +
                            "<th>" + data.Result.Adjuntos[i].NombreDocumento + "</th>" +
                            "<th>" + data.Result.Adjuntos[i].NombreUsuario + "</th>" +
                            "<th>" + data.Result.Adjuntos[i].NombrePerfil + "</th>" +
                            "<th>" + data.Result.Adjuntos[i].FechaRegistroFormat + "</th>" +
                            "<th>" + html + "</th>" +
                            "</tr>";
                        $tblDocumentosCargados.append(nuevoTr);
                    }
                    $NoExisteRegDoc.hide();
                }

                if (data.Result.ContadorCabecera.ContadorConStock > 0) {

                    if ($TipoSolicitud.val() == "TSOL03" && data.Result.ContadorCabecera.NumeroFactura == "") {
                        $btnGuiaPedidoTotal.css('display', 'none');
                    }

                    if (data.Result.DespachoCabeceraConStock.EstadoAprobacion == "APR") {
                        $txtCodigoPedidoCE.val("");
                    } else {
                        $txtCodigoPedidoCE.val(data.Result.DespachoCabeceraConStock.NumeroPedido);
                        var fechaIngresoAlmacen = data.Result.DespachoCabeceraConStock.FechaIngreso;
                        if (fechaIngresoAlmacen != null && fechaIngresoAlmacen != "") {
                            $dateIngresoAlmacenCE.val(data.Result.DespachoCabeceraConStock.FechaIngreso);
                        }

                        $txtCodigoPedidoCE.prop('disabled', true);
                        $opendateIngresoAlmacenCE.prop('disabled', true);
                        $dateIngresoAlmacenCE.prop('disabled', true);
                    }

                    for (var i = 0; data.Result.DespachoDetalleConStock.length > i; i++) {
                        detalleDespacho.arrDetalleCS.push(data.Result.DespachoDetalleConStock[i].Id);

                        var html = '<div class="text-center">';
                        var sel_html = ''
                        if (($estadoDesp.val() == "DREG") && $nombreRol.val() == "SGI_VENTA_ASESOR") {
                            html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleConStock[i].Id + '" href="javascript:detalleDespacho.editarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ',' + data.Result.DespachoDetalleConStock[i].Id_CotDetalle +')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                        }
                        else if (($estadoDesp.val() == "DLOG" || $estadoDesp.val() == "DFIN" || $estadoDesp.val() == "DFAC")&& $nombreRol.val() == "SGI_VENTA_LOGISTICA") {

                            html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleConStock[i].Id + '" href="javascript:detalleDespacho.editarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ',' + data.Result.DespachoDetalleConStock[i].Id_CotDetalle +')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                            /* html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleConStock[i].Id + '" data-toggle="modal" data-target="#modalSeries"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';*/
                            html += ' <a class="btn btn-default btn-xs" title="Guardar" id="Boton' + data.Result.DespachoDetalleConStock[i].Id + '" style="display:none"  href="javascript:detalleDespacho.guardarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ',\'S\')"><i class="fa fa-save" aria-hidden="true"></i></a>&nbsp;';
                            sel_html = '<th><div class="text-center">';
                            if (data.Result.DespachoDetalleConStock[i].NumeroSerie.length == 0) {
                                sel_html += '<input type="checkbox" id="chk"' + data.Result.DespachoDetalleConStock[i].Id + ' class="chkCS" value="' + data.Result.DespachoDetalleConStock[i].Id + '">'
                            }
                            sel_html += '</div></th>';
                        }
                        html += ' <a class="btn btn-default btn-xs" title="Ver" id="Ver' + data.Result.DespachoDetalleConStock[i].Id + '" href="javascript:detalleDespacho.verSeries(' + data.Result.DespachoDetalleConStock[i].Id + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;';
                        html += '</div>';

                        var nuevoTr = "<tr bgcolor='d0f2f7' id='fila" + data.Result.DespachoDetalleConStock[i].Id + "'>" + sel_html +
                            "<th>" + data.Result.DespachoDetalleConStock[i].RowNumber + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].CodigoEquipo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].DescripcionEquipo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].Marca + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].NombreUbigeo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].NumeroGuia + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].NumeroSerie + "</th>" +
                            "<th>" + html + "</th>" +
                            "</tr>";

                        $NoRegSeries.hide();
                        $tblSeriesCS.append(nuevoTr);
                    }
                }





                if (data.Result.ContadorCabecera.ContadorSinStock > 0) {

                    if (data.Result.DespachoCabeceraSinStock.EstadoAprobacion == "APR") {
                        $txtCodigoPedidoSE.val("");
                    }
                    else {
                        $txtCodigoPedidoSE.val(data.Result.DespachoCabeceraSinStock.NumeroPedido);
                        var fechaIngresoAlmacen = data.Result.DespachoCabeceraSinStock.FechaIngreso;
                        if (fechaIngresoAlmacen != null && fechaIngresoAlmacen != "") {
                            $dateIngresoAlmacenSE.val(data.Result.DespachoCabeceraSinStock.FechaIngreso);
                        }

                        $txtCodigoPedidoSE.prop('disabled', true);
                        $opendateIngresoAlmacenSE.prop('disabled', true);
                        $dateIngresoAlmacenSE.prop('disabled', true);
                    }


                    for (i = 0; i < data.Result.DespachoDetalleSinStock.length; i++) {

                        detalleDespacho.arrDetalleSS.push(data.Result.DespachoDetalleSinStock[i].Id);

                        var html = '<div class="text-center">';
                        var sel_html = ''

                        if (($estadoDesp.val() == "DREG") && $nombreRol.val() == "SGI_VENTA_ASESOR") {
                            html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleSinStock[i].Id + '" href="javascript:detalleDespacho.editarSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ',' + data.Result.DespachoDetalleSinStock[i].Id_CotDetalle +')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                        };

                        if ($nombreRol.val() == "SGI_VENTA_LOGISTICA" && data.Result.DespachoCabeceraSinStock.EstadoAprobacion == "IMP") {

                            html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleSinStock[i].Id + '" href="javascript:detalleDespacho.editarSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ',' + data.Result.DespachoDetalleSinStock[i].Id_CotDetalle +')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                            /* html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleSinStock[i].Id + '" data-toggle="modal" data-target="#modalSeries"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';*/
                            html += ' <a class="btn btn-default btn-xs" title="Guardar" id="Boton' + data.Result.DespachoDetalleSinStock[i].Id + '" style="display:none"  href="javascript:detalleDespacho.guardarSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ',\'N\')"><i class="fa fa-save" aria-hidden="true"></i></a>&nbsp;';
                            sel_html = '<th><div class="text-center">';
                            if (data.Result.DespachoDetalleSinStock[i].NumeroSerie.length == 0) {
                                sel_html += '<input type="checkbox" id="chk"' + data.Result.DespachoDetalleSinStock[i].Id + ' class="chkSS" value="' + data.Result.DespachoDetalleSinStock[i].Id + '">'
                            }
                            sel_html += '</div></th>';
                        }
                        html += ' <a class="btn btn-default btn-xs" title="Ver" id="Ver' + data.Result.DespachoDetalleSinStock[i].Id + '" href="javascript:detalleDespacho.verSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;';

                        html += '</div>';
                        var nuevoTr = "<tr bgcolor='d0f2f7' id='fila" + data.Result.DespachoDetalleSinStock[i].Id + "'>" + sel_html +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].RowNumber + "</th>" +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].CodigoEquipo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].DescripcionEquipo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].Marca + "</th>" +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].NombreUbigeo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].NumeroGuia + "</th>" +
                            "<th>" + data.Result.DespachoDetalleSinStock[i].NumeroSerie + "</th>" +
                            "<th>" + html + "</th>" +
                            "</tr>";

                        $NoRegSeriesSS.hide();
                        $tblSeriesSS.append(nuevoTr);
                    }

                    var fecha_entregapedidoSE = data.Result.DespachoCabeceraSinStock.FechaEntrega;
                    if (fecha_entregapedidoSE != null && fecha_entregapedidoSE != "") {
                        $dateEntregaPedido.val(data.Result.DespachoCabeceraSinStock.FechaEntrega);
                    }



                    //$txtNumeroFactura.val(data.Result.ContadorCabecera.NumeroFacturaDespacho);
                    //$txtNumeroFactura.val(data.Result.DespachoCabeceraSinStock.NumeroFactura);
                    $txtNumeroGuiaRemisionSE.val(data.Result.DespachoCabeceraSinStock.NumeroGuiaRemision);



                    if (data.Result.ContadorCabecera.GestionLogSinStock > 0 && ($estadoSol.val() == "SFIN" || $estadoSol.val() == "NOVT")) {
                        $dateEntregaPedido.prop('disabled', true);
                        //  $txtNumeroFacturaSE.prop('disabled', true);
                        $txtNumeroGuiaRemisionSE.prop('disabled', true);
                        $opendateEntregaPedidoSE.prop('disabled', true);
                    }

                }

                if (data.Result.ContadorCabecera.ContadorConStock > 0) {
                    var fecha_entrega = data.Result.DespachoCabeceraConStock.FechaEntrega;
                    if (fecha_entrega != null && fecha_entrega != "") {
                        $dateEntregaPedido.val(data.Result.DespachoCabeceraConStock.FechaEntrega);
                    }

                    //$txtNumeroFacturaCE.val(data.Result.DespachoCabeceraConStock.NumeroFactura);
                    $txtNumeroGuiaRemisionCE.val(data.Result.DespachoCabeceraConStock.NumeroGuiaRemision);


                    if (data.Result.ContadorCabecera.GestionLogConStock > 0 && ($estadoDesp.val() == "DFIN")) {
                        $dateEntregaPedido.prop('disabled', true);
                        //$txtNumeroFacturaCE.prop('disabled', true);
                        $txtNumeroGuiaRemisionCE.prop('disabled', true);
                        $opendateEntregaPedidoCE.prop('disabled', true);
                    }
                }
            }

            if (data.Result.TecnicosDespacho.length > 0) {

                for (i = 0; i < data.Result.TecnicosDespacho.length; i++) {
                    tecnicosAsig.push({
                        Cod_Tecnico: data.Result.TecnicosDespacho[i].Cod_Tecnico,
                        TipoDoc: data.Result.TecnicosDespacho[i].Nom_TipDocumento,
                        Documento: data.Result.TecnicosDespacho[i].Documento,
                        Tipo_Documento: "",
                        Nombres: data.Result.TecnicosDespacho[i].NombreTecnico,
                        ApePaterno: data.Result.TecnicosDespacho[i].ApellidoPaterno,
                        ApeMaterno: data.Result.TecnicosDespacho[i].ApellidoMaterno,
                        NombreCompleto: data.Result.TecnicosDespacho[i].NombreTecnico + " " + data.Result.TecnicosDespacho[i].ApellidoPaterno + " " + data.Result.TecnicosDespacho[i].ApellidoMaterno,
                        TipoTecnico: data.Result.TecnicosDespacho[i].TipoTecnico,
                        Telefono: data.Result.TecnicosDespacho[i].Telefono,
                        Correo: data.Result.TecnicosDespacho[i].Correo,
                        Empresa: data.Result.TecnicosDespacho[i].Empresa,
                        Zona: data.Result.TecnicosDespacho[i].Zona,
                        DescZona: "",
                        Estado: data.Result.TecnicosDespacho[i].Estado
                    });
                }

                cargarTablaMainTecnicos(tecnicosAsig);
            }
            else {
                if (($nombreRol.val() === "SGI_VENTA_COORDINASERV" || $nombreRol.val() === "SGI_VENTA_COORDINAATC")) {
                    $btnBuscarTecnicos.show();
                    $btnAñadirTecnico.show();
                }

            };

            if (($nombreRol.val() === "SGI_VENTA_COORDINASERV" || $nombreRol.val() === "SGI_VENTA_COORDINAATC") && $estadoDesp.val() === "DREG") {
                if (data.Result.ContadorCabecera.EnvioServicio < 1) {
                    $btnGuardarProg.show();
                }

            };


        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se presentó un error al cargar combos");
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null);
    };


    function cargarTablaMainTecnicos(tecnicos) {

        var data = {}
        data.Result = [];
        data.Result = tecnicos;

        if (tecnicos.length > 0) {
            $NoExisteTec.hide();
        }

        if ($nombreRol.val() === "SGI_VENTA_COORDINASERV" ||
            $nombreRol.val() === "SGI_VENTA_COORDINAATC") {
            if (tecnicos.length > 0) {
                $btnBuscarTecnicos.hide();
                $btnAñadirTecnico.hide();
            }
            else {
                $btnBuscarTecnicos.show();
                $btnAñadirTecnico.show();
            }
        }



        var columns = [
            {
                data: "Cod_Tecnico",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "TipoDoc",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "Documento",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "NombreCompleto",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "Telefono",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "Correo",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "Empresa",
                render: function (data, type, row) {
                    if (row.TipoTecnico == "I") {
                        if (data == "" || data == null) {
                            return '<center>No definido</center>';
                        } else {
                            return '<center>' + data + '</center>';
                        }
                    }
                    else if (row.TipoTecnico == "E") {
                        if (data == "" || data == null) {
                            var html = '';
                            html += '<div class="form-group">' + '<div class="input-group input-group-sm date">'
                                + '<input placeholder="--Empresa--" type="text" class="form-control input-sm" id="txtNomEmpresa' + row.Cod_Tecnico + '">';
                            html += '<a class="input-group-addon input-sm" id="saveEmpresaTecnico' + row.Cod_Tecnico + '" href="javascript:garantias.saveEmpresaTecnico(' + row.Cod_Tecnico + ')"" >' +
                                '<i class="fa fa-save" aria-hidden="true"></i>' +
                                '</a>';
                            return '<center>' + html + '</center>';

                        } else {
                            return '<center>' + data + '</center>';
                        }
                    }
                }
            },
            {
                data: "Cod_Tecnico",
                render: function (data, type, row) {
                    var retirar = "";
                    if ($EnvioServicio.val() == 0 && ($nombreRol.val() === "SGI_VENTA_ASESOR" ||
                        $nombreRol.val() === "SGI_VENTA_COORDINASERV" ||
                        $nombreRol.val() === "SGI_VENTA_COORDINAATC")) {
                        retirar = '<a id="btnDesasignarTecnico" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:detalleDespacho.DesasignarTecnico(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>';
                    }
                    return '<center>' + retirar + '</center>';


                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];

        app.llenarTabla($tblMainTecnicos, data, columns, columnDefs, "#tblMainTecnicos");
    };

    function CargarDatosDetalle() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCotizacionVentaDetalle_Despacho"
        var obj = {
            IdCotizacion: $IdCotizacion.val()
        };

        var objParam = JSON.stringify(obj);


        var fnDoneCallBack = function (data) {
            detalleDespacho.Productos = data.Result.filter(x => x.TipoItem != "SER");
            detalleDespacho.Servicios = data.Result.filter(x => x.TipoItem == "SER");

            var productos = {};
            productos.Result = detalleDespacho.Productos;

            var servicios = {};
            servicios.Result = detalleDespacho.Servicios;

            if (productos.Result.length > 0) {
                $boxDetalleCotizacion.css('display', '');
                CargarTablaDetalleCot(productos);
            };

            if (servicios.Result.length > 0) {
                $boxDetalleServicios.css('display', '');
                CargarTablaDetalleServ(servicios);
            };
            btnCheck();
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al realizar la consulta del detalle de cotización.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null);
    };

    function CargarTablaDespachoServ(list) {
        var data = {}
        data.Result = []
        data.Result = list;

        var columns = [
            {
                data: "CodigoItem",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescripcionItem",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input disabled type='number' id='cantidad_" + row.Id + "' min='0' max='" + data + "' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "ValorUnitario",
                render: function (data, type, row) {
                    if (data == null) {
                        return '<center></center>';
                    }
                    else {
                        data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                        return '<center>' + data + '</center>'; MontoDscto
                    }
                }
            },
            {
                data: "ValorTotal",
                render: function (data, type, row) {
                    if (row.VvTotalSigVDscto == null || row.VvTotalSigVDscto == 0) {
                        if (data == null) {
                            return '<center></center>';
                        }
                        else {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                    }
                    else {
                        data = app.formatearEnteroComa(parseFloat(row.VvTotalSigVDscto).toFixed(2));
                        return '<center>' + data + '</center>';
                    };
                }
            },
            {
                data: "IdCotDetalle",
                render: function (data, type, row) {
                    var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: detalleDespacho.editarItemServ(' + data + ')"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + ver + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        };

        app.llenarTabla($tblDetalleServicios, data, columns, columnDefs, "#tblDetalleServicios", null, null, null);
    };

    function CargarTablaDespacho(list) {
        var data = {}
        data.Result = []
        data.Result = list;

        var columns = [
            {
                data: "CodigoItem",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescripcionItem",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "IndStock",
                render: function (data, type, row) {
                    var rpta = "";
                    if (data) {
                        rpta = "Sí";
                    }
                    else {
                        rpta = "No";
                    }
                    return '<center>' + rpta + '</center>'; 
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input disabled type='number' id='cantidad_"+row.Id+"' min='0' max='"+data+"' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "ValorUnitario",
                render: function (data, type, row) {
                    if (data == null)
                    {
                        return '<center></center>';
                    }
                    else
                    {
                        data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                        return '<center>' + data + '</center>';MontoDscto
                    }
                }
            },
            {
                data: "MontoDscto",
                render: function (data, type, row) {
                    if (data == null)
                    {
                        return '<center></center>';
                    }
                    else
                    {
                        data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "ValorTotal",
                render: function (data, type, row) {
                    if (row.VvTotalSigVDscto == null || row.VvTotalSigVDscto == 0 ) {
                        if (data == null) {
                            return '<center></center>';
                        }
                        else {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                    }
                    else {
                        data = app.formatearEnteroComa(parseFloat(row.VvTotalSigVDscto).toFixed(2));
                        return '<center>' + data + '</center>';
                    };
                }
            },
            {
                data: "MargenAdicional",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VvTotalSigVcgan",
                render: function (data, type, row) {
                    if (data == null)
                    {
                        return '<center></center>';
                    }
                    else
                    {
                        data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                        return '<center>' + data + '</center>';
                    }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "IdCotDetalle",
                render: function (data, type, row) {
                    var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.EditarCotDetItem(' + data + ')"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + ver + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        };

        app.llenarTabla($tblDetalleCotizacion, data, columns, columnDefs, "#tblDetalleCotizacion", null, null, null);
    };


    function CargarTablaDetalleServ(data) {
        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    var seleccionar = "";
                    if (row.Cantidad > 0) {
                        seleccionar = '<input class="form-check-input cheks" name="checkSeleccionarServ" type="checkbox" value="' + data + '" id="checkSeleccionarServ">';
                    }
                    else {
                        seleccionar = ""
                    }
                    return '<center>' + seleccionar + '</center>';
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
                data: "IndStock",
                render: function (data, type, row) {
                    var rpta = "";
                    if (data) {
                        rpta = "Sí";
                    }
                    else {
                        rpta = "No";
                    }
                    return '<center>' + rpta + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input disabled type='number' onblur='if(parseInt(this.value) > " + data + " || parseInt(this.value) < 0) { this.value = " + data + "}'  oninput='if(parseFloat(this.value) > " + data + ") { this.value = " + data + "}'   id='cantidad_" + row.Id + "' min='0' max='" + data + "' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "VentaUnitaria",
                render: function (data, type, row) {
                    if (data == null) {
                        return '<center></center>';
                    }
                    else {
                        if ($NumDespacho.val() != "0") {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center id="ventaUnitaria_' + row.Id + '">' + data + '</center>';
                        }
                    }
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: detalleDespacho.editarItemServ(' + data + ')"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + ver + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        };

        app.llenarTabla($tblDetalleServicios, data, columns, columnDefs, "#tblDetalleServicios", null, null, null);
    };


    function CargarTablaDetalleCot(data) {
        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    var seleccionar = "";
                    if (row.Cantidad > 0) {
                        seleccionar = '<input class="form-check-input cheks" name="checkSeleccionar" type="checkbox" value="' + data + '" id="checkSeleccionar">';
                    }
                    else {
                        seleccionar = ""
                    }
                    return '<center>' + seleccionar + '</center>';
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
                data: "IndStock",
                render: function (data, type, row) {
                    var rpta = "";
                    if (data) {
                        rpta = "Sí";
                    }
                    else {
                        rpta = "No";
                    }
                    return '<center>' + rpta + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input disabled type='number' onblur='if(parseFloat(this.value) > " + data + ") { this.value = " + data +"}'  oninput='if(parseFloat(this.value) > " + data + ") { this.value = "+ data +"}'   id='cantidad_" + row.Id + "' min='0' max='" + data + "' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "VentaUnitaria",
                render: function (data, type, row) {
                    if (data == null) {
                        return '<center></center>';
                    }
                    else {
                        if ($NumDespacho.val() != "0") {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center id="ventaUnitaria_' + row.Id + '">' + data + '</center>';
                        }
                    }
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    var d = "'" + row.CodItem + "','" + 2 + "'"; 
                    var ver = '';
                    ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.EditarCotDetItem(' + data + ')"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + ver + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        };

        app.llenarTabla($tblDetalleCotizacion, data, columns, columnDefs, "#tblDetalleCotizacion", null, null, null);
    };



    function Regresar() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/InicializarDespacho";
        var obj = {
            Solicitud:$NumSol.val(),
            IdCotizacion:$IdCotizacion.val(),
            TipoSol: $TipoSolicitud.val()
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

    function RemoverDetalle() {

    };

    function GuardarDetalle() {

    };


    function btnCheck() {
        $(document).on('change', '#checkSeleccionar', function (e) {
            if (this.checked) {
                detalleDespacho.xComprar.push(this.value);
                $('#cantidad_' + this.value).prop('disabled', false);
            }
            else {
                detalleDespacho.xComprar = detalleDespacho.xComprar.filter(valor => valor != this.value);
                $('#cantidad_' + this.value).prop('disabled', true);
            }
        });


        $(document).on('change', '#checkSeleccionarServ', function (e) {
            if (this.checked) {
                detalleDespacho.xComprarServ.push(this.value);
                $('#cantidad_' + this.value).prop('disabled', false);
            }
            else {
                detalleDespacho.xComprarServ = detalleDespacho.xComprarServ.filter(valor => valor != this.value);
                $('#cantidad_' + this.value).prop('disabled', true);
            }
        });

        $(document).on('change', '#checkSeleccionarTodosServ', function (e) {
            if (this.checked) {
                $checkSeleccionar.prop('checked', true);
                $('input').filter('#checkSeleccionarServ').prop('checked', true);
                var ids = document.querySelectorAll("input[name='checkSeleccionarServ']:checked");
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprarServ.push(ids[i].value);
                    $('#cantidad_' + ids[i].value).prop('disabled', false);
                }
            }
            else {
                detalleDespacho.xComprarServ = []
                var ids = document.querySelectorAll("input[name='checkSeleccionarServ']:checked");
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprarServ.push(ids[i].value);
                    $('#cantidad_' + ids[i].value).prop('disabled', true);
                };
                $('input').filter('#checkSeleccionarServ').prop('checked', false);
            }
        });


        


        $(document).on('change', '#checkSeleccionarTodos', function (e) {
            if (this.checked) {
                $checkSeleccionar.prop('checked', true);
                $('input').filter('#checkSeleccionar').prop('checked', true);
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprar.push(ids[i].value);
                    $('#cantidad_' + ids[i].value).prop('disabled', false);
                }
            }
            else {
                detalleDespacho.xComprar = []
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprar.push(ids[i].value);
                    $('#cantidad_' + ids[i].value).prop('disabled', true);
                };
                $('input').filter('#checkSeleccionar').prop('checked', false);
            }
        });
    }

    function $modalObservacionClick() {
        $tituloModalObservacion.html("Nueva observación");
        $grpAuditoriaObservacion.hide();
        $modalObservacion.modal("show");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
    };

    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
    };

    function $modalCargaDocumentoClick() {
        $hdnDocumentoCargadoId.val("");
        //$cmbTipoDocumentoCarga.empty();
        $cmbDocumentoCarga.empty();
        $txtDescripcionDocumentoCarga.val("");
        $cmbTipoDocumentoCarga.val("0").trigger("change.select2");
        $lblNombreArchivo.text("");
        $modalCargaDocumento.modal("show");
    };

    //function CargarTipoDocumento(codFlujo) {
    //    var method = "POST";
    //    var url = "Utiles/ListarTipoDocumentos?codFlujo=" + codFlujo;
    //    var objParam = '';
    //    var fnDoneCallback = function (data) {
    //
    //        var filters = {};
    //        filters.placeholder = "-- Seleccione --";
    //        filters.allowClear = false;
    //        app.llenarCombo($cmbTipoDocumentoCarga, data, null, 0, "--Seleccione--", filters);
    //
    //    };
    //    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    //}

    function $fileCargaDocumentoSustento_change() {


        var fileInput = document.getElementById("fileCargaDocumentoSustento");

        if (myfile.length > 0) {
            myfile = "";
        }

        myfile = $(this).val();
        var ext = myfile.split('.').pop();
        if (ext == "pdf" || ext == "PDF" ||
            ext == "xls" || ext == "XLS" ||
            ext == "xlsx" || ext == "XLSX" ||
            ext == "doc" || ext == "DOC" ||
            ext == "docx" || ext == "DOCX" ||
            ext == "zip" || ext == "ZIP" ||
            ext == "rar" || ext == "RAR" ||
            ext == "ppt" || ext == "PPT" ||
            ext == "pptx" || ext == "PPTX"
        ) {
            //beforeSendCargaDoc();
            var formdata = new FormData(); //FormData object
            //Appending each file to FormData object
            formdata.append(fileInput.files[0].name, fileInput.files[0]);
            formdata.append('name', name);

            $lblNombreArchivo.text(fileInput.files[0].name);

        }
        else if (myfile !== "") {

            app.message.error('Validación', 'El formato no es el permitido', 'Aceptar', null)
            this.value = "";
            $lblNombreArchivo.text("");

        } else {
            this.value = "";
            $lblNombreArchivo.text("");

        }

    }

    function $adjuntarDocumento_click() {
        //$fileCargaDocumentoSustento.click();
        $fileCargaDocumentoSustento.val("");
        $lblNombreArchivo.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustento').click();

    }


    function $fileCargaDocumentoSustentoGuia_change() {

        $lblNombreArchivoGuia.text("");
        var fileInput = document.getElementById("fileCargaDocumentoSustentoGuia");

        if (myfile.length > 0) {
            myfile = "";
        }

        myfile = $(this).val();
        var ext = myfile.split('.').pop();
        if (ext == "pdf" || ext == "PDF" ||
            ext == "xls" || ext == "XLS" ||
            ext == "xlsx" || ext == "XLSX" ||
            ext == "doc" || ext == "DOC" ||
            ext == "docx" || ext == "DOCX" ||
            ext == "zip" || ext == "ZIP" ||
            ext == "rar" || ext == "RAR" ||
            ext == "ppt" || ext == "PPT" ||
            ext == "pptx" || ext == "PPTX") {
            //beforeSendCargaDoc();
            var formdata = new FormData(); //FormData object
            //Appending each file to FormData object
            formdata.append(fileInput.files[0].name, fileInput.files[0]);
            formdata.append('name', name);

            $lblNombreArchivoGuia.text(fileInput.files[0].name);

        }
        else if (myfile !== "") {

            app.message.error('Validación', 'El formato no es el permitido', 'Aceptar', null)
            this.value = "";
            $lblNombreArchivoGuia.text("");

        } else {
            this.value = "";
            $lblNombreArchivoGuia.text("");

        }
    }

    function $btnCargarDocumentoGuia_click() {
        if ($cmbTipoDocumentoCargaGuia.val() == 0 || $cmbTipoDocumentoCargaGuia.val() == "" || $cmbTipoDocumentoCargaGuia.val() == null) {
            app.message.error('Validación', 'Debe seleccionar el tipo de documento', 'Aceptar', null);
            return false;
        }
        if ($lblNombreArchivoGuia.text() === "") {
            app.message.error('Validación', 'Debe cargar un archivo', 'Aceptar', null);
            return false;
        }
        var fileInput = document.getElementById("fileCargaDocumentoSustentoGuia");

        var formdata = new FormData(); //FormData object
        //Appending each file to FormData object
        formdata.append(fileInput.files[0].name, fileInput.files[0]);
        formdata.append('name', name);

        var fileInput = document.getElementById("fileCargaDocumentoSustentoGuia");
        var file = fileInput.files[0];
        var req = new XMLHttpRequest();
        var ext = fileInput.files[0].name.split('.').pop();
        req.open("POST", "UploadFiles?extension=" + ext, true);
        req.setRequestHeader("File-Name", file.name);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send(formdata);

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                if (req.responseText == "error" || req.responseText == "false") {
                    app.message.error('Validación', 'Hubo un error al cargar el archivo', 'Aceptar', null);
                    return false;
                }

                var ruta_guardada = req.responseText;

                ruta_guardada = ruta_guardada.replace("\\", "");
                ruta_guardada = ruta_guardada.replace('"', '');
                ruta_guardada = ruta_guardada.replace('"', '');
                //console.log("ruta_guardada:" + ruta_guardada);


                if ($numeroSolicitud.val() != "") {

                    var method = "POST";
                    var url = "BandejaSolicitudesVentas/GuardarAdjunto";
                    var obj = {
                        Accion: "I",
                        CodigoDocumento: 0,
                        CodigoWorkFlow: $codigoWorkflow.val(),
                        CodigoTipoDocumento: $cmbTipoDocumentoCargaGuia.val(),
                        NombreDocumento: $lblNombreArchivoGuia.text(),
                        VerDocumento: true,
                        RutaDocumento: ruta_guardada,
                        Eliminado: 0
                    }
                    var objParam = JSON.stringify(obj);
                    var fnDoneCallback = function (data) {

                        if (data.Result.Codigo > 0) {

                            if ($hdnDocumentoCargadoIdGuia.val() === "GP") {
                                //Se realiza el envio a logistica:
                                var m = "POST";
                                var url = "BandejaSolicitudesVentas/EnviarGuiaPedidos?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val() + "&stock=" + $FlagStock.val() + "&idDespacho=" + $NumDespacho.val();
                                var objParam = '';
                                var fnDoneCallback = function (data) {
                                    var fnCallback = function () {
                                        location.reload();
                                    };
                                    if (data.Result.Codigo > 0) {
                                        app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                                    }
                                    else {
                                        app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                                    }

                                };
                                return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGuiaPedido);

                            }
                            else if ($hdnDocumentoCargadoIdGuia.val() === "BO") {
                                var m = "POST";
                                var url = "BandejaSolicitudesVentas/EnviarGuiaBO?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val() + "&idDespacho="+ $NumDespacho.val();
                                var objParam = '';
                                var fnDoneCallback = function (data) {
                                    var fnCallback = function () {
                                        location.reload();
                                    };
                                    if (data.Result.Codigo > 0) {
                                        app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                                    }
                                    else {
                                        app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                                    }

                                };
                                return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGuiaPedidoBO);
                            }

                        }
                        else {
                            app.message.error("Error en la Actualización", data.Result.Mensaje);

                        }

                    };
                    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardandoObservacion);

                }

            };
        };
        $modalCargaDocumentoGuia.modal("hide");
    }

    function $btnCargarDocumento_click() {
        if ($cmbTipoDocumentoCarga.val() == 0 || $cmbTipoDocumentoCarga.val() == "" || $cmbTipoDocumentoCarga.val() == null) {
            app.message.error('Validación', 'Debe seleccionar el tipo de documento', 'Aceptar', null);
            return false;
        }
        if ($lblNombreArchivo.text() === "") {
            app.message.error('Validación', 'Debe cargar un archivo', 'Aceptar', null);
            return false;
        }
        var fileInput = document.getElementById("fileCargaDocumentoSustento");

        var formdata = new FormData(); //FormData object
        //Appending each file to FormData object
        formdata.append(fileInput.files[0].name, fileInput.files[0]);
        formdata.append('name', name);

        var fileInput = document.getElementById("fileCargaDocumentoSustento");
        var file = fileInput.files[0];
        var req = new XMLHttpRequest();
        var ext = fileInput.files[0].name.split('.').pop();

        if (file.size > 4000000) {
            app.message.error("Validación", "El documento cargado no debe de superar los 4mb, por favor revisar");
            return;
        };

        req.open("POST", "UploadFiles?extension=" + ext, true);
        req.setRequestHeader("File-Name", file.name);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send(formdata);

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                if (req.responseText == "error" || req.responseText == "false") {
                    app.message.error('Validación', 'Hubo un error al cargar el archivo', 'Aceptar', null);
                    return false;
                }



                var cont = parseInt($contadordoc.val());
                cont = cont + 1;

                var ruta_guardada = req.responseText;

                ruta_guardada = ruta_guardada.replace("\\", "");
                ruta_guardada = ruta_guardada.replace('"', '');
                ruta_guardada = ruta_guardada.replace('"', '');

                $contadordoc.val(cont);

                if ($NumDespacho.val() != "") {

                    var method = "POST";
                    var url = "BandejaSolicitudesVentas/GuardarAdjunto";
                    var obj = {
                        Accion: "I",
                        CodigoDocumento: 0,
                        CodigoWorkFlow: $codigoWorkflow.val(),
                        CodigoTipoDocumento: $cmbTipoDocumentoCarga.val(),
                        NombreDocumento: $lblNombreArchivo.text(),
                        VerDocumento: true,
                        RutaDocumento: ruta_guardada,
                        Eliminado: 0
                    }
                    var objParam = JSON.stringify(obj);
                    var fnDoneCallback = function (data) {

                        if (data.Result.Codigo > 0) {
                            adjuntos.push(
                                {
                                    Accion: "I",
                                    CodigoDocumento: data.Result.Codigo,
                                    CodigoWorkFlow: $codigoWorkflow.val(),
                                    CodigoTipoDocumento: $cmbTipoDocumentoCarga.val(),
                                    NombreDocumento: $lblNombreArchivo.text(),
                                    VerDocumento: true,
                                    RutaDocumento: ruta_guardada,
                                    Eliminado: 0
                                }
                            );
                            var html = '<div class="text-center">';
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:detalleDespacho.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detalleDespacho.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                            html += '</div>';


                            var nuevoTr = "<tr bgcolor='FFFDC1' id='row" + data.Result.Codigo + "'>" +
                                "<th>" + $("#cmbTipoDocumentoCarga option:selected").text() + "</th>" +
                                "<th>" + $lblNombreArchivo.text() + "</th>" +
                                "<th>" + $nombreusuario.val() + "</th>" +
                                "<th>" + $perfilnombre.val() + "</th>" +
                                "<th>" + hoy() + "</th>" +
                                "<th>" + html + "</th>" +
                                "</tr>";


                            $NoExisteRegDoc.hide();
                            $tblDocumentosCargados.append(nuevoTr);
                            //location.reload();

                        }
                        else {
                            app.message.error("Error en la Actualización", data.Result.Mensaje);

                        }

                    };
                    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);

                }
                else {

                    adjuntos.push({
                        "Id": cont,
                        "CodigoDocumento": 0,
                        "CodigoTipoDocumento": $cmbTipoDocumentoCarga.val(),
                        "NombreDocumento": $lblNombreArchivo.text(),
                        "VerDocumento": true,
                        "RutaDocumento": ruta_guardada,
                        "Eliminado": 0
                    });

                    var html = '<div class="text-center">';
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detalleDespacho.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                    html += '</div>';


                    var nuevoTr = "<tr bgcolor='FFFDC1' id='filadoc" + cont + "'>" +
                        "<th>" + $("#cmbTipoDocumentoCarga option:selected").text() + "</th>" +
                        "<th>" + $lblNombreArchivo.text() + "</th>" +
                        "<th>" + $nombreusuario.val() + "</th>" +
                        "<th>" + $perfilnombre.val() + "</th>" +
                        "<th>" + hoy() + "</th>" +
                        "<th>" + html + "</th>" +
                        "</tr>";


                    $NoExisteRegDoc.hide();
                    $tblDocumentosCargados.append(nuevoTr);
                }
            };
        };
        $modalCargaDocumento.modal("hide");
    }

    function eliminarDocTemp(cont) {

        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].Id == cont) {
                adjuntos.splice(index, 1);
            }
        });
        $("#filadoc" + cont).remove();

        if (adjuntos.length == 0) {
            $NoExisteRegDoc.show();
        }
    }

    function $radFianza2_click() {
        if ($radFianza2.is(':checked')) {
            $chkPrestacionPrincipal.attr("disabled", "disabled");
            $chkPrestacionAccesoria.attr("disabled", "disabled");
            $chkPrestacionPrincipal.prop('checked', false);
            $chkPrestacionAccesoria.prop('checked', false);
            $txtNroFianzaPA.attr("disabled", "disabled");
            $txtNroFianzaPP.attr("disabled", "disabled");
            $txtNroFianzaPA.val('');
            $txtNroFianzaPP.val('');
        }
    }

    function $radFianza_click() {
        if ($radFianza.is(':checked')) {
            $chkPrestacionPrincipal.removeAttr("disabled");
            $chkPrestacionAccesoria.removeAttr("disabled");
            $txtNroFianzaPA.attr("disabled", "disabled");
            $txtNroFianzaPP.attr("disabled", "disabled");
            $txtNroFianzaPA.val('');
            $txtNroFianzaPP.val('');
        }
    }

    function $chkPrestacionAccesoria_click() {
        if ($chkPrestacionAccesoria.is(':checked')) {
            $txtNroFianzaPA.removeAttr("disabled");
            $txtNroFianzaPA.val('');
        }
        else {
            $txtNroFianzaPA.attr("disabled", "disabled");
            $txtNroFianzaPA.val('');
        }
    }

    function $chkPrestacionPrincipal_click() {
        if ($chkPrestacionPrincipal.is(':checked')) {
            $txtNroFianzaPP.removeAttr("disabled");
            $txtNroFianzaPP.val('');
        }
        else {
            $txtNroFianzaPP.attr("disabled", "disabled");
            $txtNroFianzaPP.val('');
        }
    }

    function RegistrarNuevo() {
        if ($cmbTipoDespacho.val() == "" || $cmbTipoDespacho.val() == null) {
            app.message.error("Validación", "Es necesario seleccionar el tipo de despacho");
            return;
        };

        if ($cmbTipoDespacho.val() == "DESP01" && ($txtNumOrden.val() == "" || $txtNumOrden.val() == null || $txtNumOrden.val().trim().length == 0)) {
            app.message.error("Validación", "Es necesario que ingrese ingrese el número de Orden");
            return;
        };

        if ($cmbTipoDespacho.val() == "DESP02" && ($txtNumContrato.val() == "" || $txtNumContrato.val() == null || $txtNumContrato.val().trim().length == 0))
        {
            app.message.error("Validación", "Es necesario que ingrese ingrese el número de Contrato");
            return;
        }

        var validador = 0;
        if ($cmbTipoDespacho.val() == "DESP01") {
            if ($dateFechaOrdenCompra.val() == "" || $dateFechaOrdenCompra.val() == undefined|| $dateFechaOrdenCompra.val().trim().length == 0) {
                validador = 1; 
            };
        };

        if ($cmbTipoDespacho.val() == "DESP02") {
            if ($dateFechaContrato.val() == "" || $dateFechaContrato.val() == undefined || $dateFechaContrato.val().trim().length == 0) {
                validador = 2;
            };
        };

        if (validador == 1) {
            app.message.error("Validación", "Debe de ingresar la fecha de orden de compra");
            return;
        };

        if (validador == 2) {
            app.message.error("Validación", "Debe de ingresar la fecha de contrato");
            return;
        };

        if ($dateFechaMax.val() == "" || $dateFechaMax.val() == undefined) {
            app.message.error("Validación", "La fecha máxima está vacia, por favor revisar");
            return; 
        };

        var method = "POST";
        var url = "BandejaSolicitudesVentas/InsertDespacho";

        var ProductosxVender = [];

        if (detalleDespacho.Productos.length > 0) {
            for (var i = 0; detalleDespacho.Productos.length > i; i++) // Obtenemos solo los seleccionados con la cantidad modificada.
            {
                if (detalleDespacho.xComprar.includes(detalleDespacho.Productos[i].Id.toString())) {
                    detalleDespacho.Productos[i].Cantidad = $("#cantidad_" + detalleDespacho.Productos[i].Id.toString()).val() //referenciamos al input cantidad dinamico de cada ROW para obtener su valor y utilizarlo.
                    ProductosxVender.push({
                        IdCotDetalle: detalleDespacho.Productos[i].Id
                        , Cantidad: detalleDespacho.Productos[i].Cantidad
                        , ValorUnitario: detalleDespacho.Productos[i].VentaUnitaria
                        , PorcentajeDscto: $PorcentajeDscto.val()
                        , MargenAdicional: detalleDespacho.Productos[i].PorcentajeGanancia
                        , IndStock: detalleDespacho.Productos[i].IndStock
                    });
                };
            };
        }
        
        if (detalleDespacho.Servicios.length > 0) {
            for (var i = 0; detalleDespacho.Servicios.length > i; i++) // Obtenemos solo los seleccionados con la cantidad modificada.
            {
                if (detalleDespacho.xComprarServ.includes(detalleDespacho.Servicios[i].Id.toString())) {
                    detalleDespacho.Servicios[i].Cantidad = $("#cantidad_" + detalleDespacho.Servicios[i].Id.toString()).val() //referenciamos al input cantidad dinamico de cada ROW para obtener su valor y utilizarlo.
                    ProductosxVender.push({
                        IdCotDetalle: detalleDespacho.Servicios[i].Id
                        , Cantidad: detalleDespacho.Servicios[i].Cantidad
                        , ValorUnitario: detalleDespacho.Servicios[i].VentaUnitaria
                        , PorcentajeDscto: $PorcentajeDscto.val()
                        , MargenAdicional: detalleDespacho.Servicios[i].PorcentajeGanancia
                        , IndStock: detalleDespacho.Servicios[i].IndStock
                    });
                };
            };
        }

        

        if (ProductosxVender.length == 0) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un producto");
            return;
        };

        var fianza = false;
        var indFianzaApp = false; 
        var indFianzaApa = false;

        if ($radFianza.is(':checked'))
        {
            fianza = true;
        };

        if ($radFianza2.is(':checked'))
        {
            fianza = false;
        };
        if ($chkPrestacionPrincipal.is(':checked'))
        {
            indFianzaApp = true;
        };
        if ($chkPrestacionAccesoria.is(':checked'))
        {
            indFianzaApa = true;
        };

        var obj = {
            Cabecera: {
                Id_Solicitud: $NumSol.val()
                , Id_Cotizacion: $IdCotizacion.val()
                , NumOrden: $txtNumOrden.val()
                , FechaOrden: $dateFechaOrdenCompra.val()
                , FechaMax: $dateFechaMax.val()
                , NumContrato: $txtNumContrato.val()
                , FecContrato: $dateFechaContrato.val()
                , TipoDesp: $cmbTipoDespacho.val()
                , Fianza: fianza
                , PrestPrin: indFianzaApp
                , NumFianzaApp: $txtNroFianzaPP.val()
                , PrestAcc: indFianzaApa
                , NumFianzaApa: $txtNroFianzaPA.val()
            },
            ListDespachoDetalle: ProductosxVender,
            Documentos: adjuntos,
            Observaciones: observaciones            
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            var fnAceptar = function () {
                Regresar()
            };
            app.message.success("Éxito", "Se realizó la inserción correctamente","Aceptar",fnAceptar);
        };


        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    };

    function GuardarObservacionReqClick() {
        if ($txtObservacion.val().trim() == "" || $txtObservacion.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese la observación.");
            return;
        }

        var valida_obs = parseInt($ValidaBtnObservacion.val());

        if (valida_obs > 0) {

            var method = "POST";
            var url = "BandejaSolicitudesVentas/ObservacionGerencia";
            var objObservacion = {
                Tipo: "O",
                IdDespacho: $NumDespacho.val(),
                CodigoSolicitud: $numeroSolicitud.val(),
                Observacion: $txtObservacion.val(),
                CodigoWorkFlow: $codigoWorkflow.val()
            }

            var objParamObs = JSON.stringify(objObservacion);

            var fnDoneCallBack = function () {
                app.message.success("Ventas", "Se realizó el registro de la observación correctamente.");
                location.reload();
            };

            var fnFailCallBack = function () {
                app.message.error("Validación");
                location.reload();
            };
            app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoObservacion);


        }
        else {
            if ($NumDespacho.val() != "0") {
                var method = "POST";
                var url = "BandejaSolicitudesVentas/GuardarObservacion"
                var objObservacion = {
                    TipoProceso: "I",
                    Observacion: $txtObservacion.val(),
                    Id_WorkFlow: $codigoWorkflow.val(),
                    Nombre_Usuario: $nombreusuario.val(),
                    Estado_Instancia: $estadoDesp.val()
                };

                var objParamObs = JSON.stringify(objObservacion);

                var fnDoneCallBack = function () {
                    app.message.success("Ventas", "Se realizó el registro de la observación correctamente.");

                    detalleDespacho.contadorObservaciones += 1;

                    detalleDespacho.observaciones.push(
                        {
                            TipoProceso: "I",
                            Observacion: $txtObservacion.val(),
                            Nombre_Usuario: $nombreusuario.val(),
                            Id_WorkFlow: $codigoWorkflow.val(),
                            Estado_Instancia: $estadoSol.val
                        }
                    );
                    var nuevoTr = "<tr id=row" + detalleDespacho.contadorObservaciones + ">" +
                        "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                        "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                        "<th style='text-align: center;'>" + hoy() + "</th>" +
                        "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                        "<th style='text-align: center;'>" +
                        "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: detalleDespacho.eliminarObsTmp(" + detalleDespacho.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
                        "</th> " +
                        "</tr>";
                    $tblObservaciones.append(nuevoTr);
                    $NoExisteRegObs.hide();
                    $modalObservacion.modal('toggle');
                };

                var fnFailCallBack = function () {
                    app.message.error("Validación");
                };
                app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoObservacion);
            }
            else {
                detalleDespacho.contadorObservaciones += 1;

                detalleDespacho.observaciones.push({
                    //Id_WorkFlow: $codigoWorkflow.val(),
                    TipoProceso: "I",
                    Estado_Instancia: "REG",
                    Observacion: $txtObservacion.val(),
                    Nombre_Usuario: $nombreusuario.val(),
                    Perfil_Usuario: $perfilnombre.val()
                })
                var nuevoTr = "<tr id=row" + detalleDespacho.contadorObservaciones + ">" +
                    "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                    "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                    "<th style='text-align: center;'>" + hoy() + "</th>" +
                    "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                    "<th style='text-align: center;'>" +
                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: detalleDespacho.eliminarObsTmp(" + detalleDespacho.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                    "</th> " +
                    "</tr>";
                $tblObservaciones.append(nuevoTr);
                $NoExisteRegObs.hide();
                $modalObservacion.modal('toggle');
            };

        }


        $txtObservacion.val("");
    };
    function download(IdDocumento) {

        var documento = adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.abrirVentana("BandejaSolicitudesVentas/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);
    }

    function eliminarDocumento(idDocumento) {
        if ($NumDespacho.val() != "0") {
            var fnSi = function () {
                var method = "POST";
                var url = "BandejaSolicitudesVentas/EliminarAdjunto";
                var obj = {
                    Accion: "D",
                    CodigoDocumento: idDocumento,
                    CodigoWorkFlow: 0,
                    CodigoTipoDocumento: "",
                    NombreDocumento: "",
                    VerDocumento: true,
                    RutaDocumento: "",
                    Eliminado: 1
                }
                var objParam = JSON.stringify(obj);
                var fnDoneCallback = function (data) {

                    if (data.Result.Codigo > 0) {

                        const child = document.getElementById("row" + idDocumento);
                        document.getElementById("tbodyDocAdjuntos").removeChild(child);
                        adjuntos = adjuntos.filter(documento => documento.CodigoDocumento != idDocumento);
                        if (adjuntos.length == 0) {
                            $NoExisteRegDoc.show();
                        }
                        //location.reload();
                    }
                    else {
                        app.message.error("Error en la Actualización", data.Result.Mensaje);

                    }

                };
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
            };
            return app.message.confirm("Solicitud de Venta", "¿Está seguro(a) que desea eliminar el documento adjunto?", "Sí", "No", fnSi, null);
        };
    };

    function eliminarDocTemp(cont) {

        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].Id == cont) {
                adjuntos.splice(index, 1);
            }
        });
        $("#filadoc" + cont).remove();

        if (adjuntos.length == 0) {
            $NoExisteRegDoc.show();
        }
    };

    function $btnEnviarGuiaBOTotal_click() {
        var fnSi = function () {

            $modalCargaDocumentoGuiaBOClick();

        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar la Guia de BO?", "S&iacute;", "No", fnSi, null);
    }

    function $adjuntarDocumentoGuia_click() {
        //$fileCargaDocumentoSustento.click();
        $lblNombreArchivoGuia.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustentoGuia').click();

    }

    function $modalCargaDocumentoGuiaBOClick() {
        $hdnDocumentoCargadoIdGuia.val("BO");
        //$cmbTipoDocumentoCarga.empty();
        $cmbDocumentoCargaGuia.empty();
        $txtDescripcionDocumentoCargaGuia.val("");
        $cmbTipoDocumentoCargaGuia.val("DVT06").trigger("change.select2");
        $cmbTipoDocumentoCargaGuia.prop('disabled', true);
        $lblNombreArchivoGuia.text("");
        $modalCargaDocumentoGuia.modal("show");
    };

    function eliminarObsTmp(idObs) {
        var fnSi = function () {
            observaciones = observaciones.filter(observacion => observacion.Id !== Number(idObs));
            $("#row" + idObs).remove();
            detalleDespacho.contadorObservaciones -= 1
            if (detalleDespacho.contadorObservaciones == 0) {
                $NoExisteRegObs.show();
            };
        };

        return app.message.confirm("Confirmación", "Está seguro(a) que desea eliminar esta observación?", "Si", "No", fnSi, null);

    };


    function $btnAprobarGestion_click() {

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarAprobacionImportacion?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val() + "&idDespacho=" + $NumDespacho.val();
            var objParam = '';
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
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.AprobarImportacion);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea aprobar la importación?", "S&iacute;", "No", fnSi, null);
    }

    function $btnObservarGestion_click() {
        $tituloModalObservacion.html("Nueva observación");
        $grpAuditoriaObservacion.hide();
        $ValidaBtnObservacion.val("1");
        $hdnObservacionId.val("");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
        $modalObservacion.modal("show");

    }


    function $btnRegistrarDespachoSE_click() {

        let ubigeos = [];

        // Recorrer cada checkbox marcado
        $("#tblSeriesSS tbody tr").each(function () {
            // Verificar si el checkbox de esta fila está marcado
            if ($(this).find(".chkSS").is(":checked")) {
                // Obtener el texto de la segunda celda (Nombre de Ubigeos)
                let nombre = $(this).find("th:eq(5)").text();
                ubigeos.push(nombre.trim());
            }
        });

        // Usando .filter() para eliminar duplicados
        let ubigeosOri = ubigeos.filter((valor, indice, self) => {
            return self.indexOf(valor) === indice;
        });

        const itemCheckboxes = document.querySelectorAll(".chkSS");
        // Crear un array con los valores de los checkboxes seleccionados
        const selectedCodes = Array.from(itemCheckboxes)
            .filter(checkbox => checkbox.checked) // Filtrar solo los seleccionados
            .map(checkbox => checkbox.value);    // Obtener los valores

        // Concatenar los códigos en una cadena, separados por comas
        const concatenatedCodes = selectedCodes.join(", ");

        if (concatenatedCodes === "") {
            app.message.error("Validacion", "Debe seleccionar por lo menos un producto.");
            return;
        }

        if (ubigeosOri.length > 1) {
            app.message.error("Validacion", "Debe seleccionar productos de un único destino para ejecutar esta opción.");
            return;
        }


        const arrayResult = concatenatedCodes.split(",").map(item => item.trim());

        $rowSerieGuia.hide();
        $rowTablaSeriesGuias.show();
        $modalSeries.modal("show");
        var m = "POST";
        var url = "BandejaSolicitudesVentas/VerDetalleItemDespacho?codDetalleDespacho=" + arrayResult[0];
        var objParam = "";
        var fnDoneCallback = function (data) {
            $codDetalleDespacho.val(data.Result.Id);
            $txtCodigoProductoSerie.val(data.Result.CodigoEquipo);
            $txtMarcaSerie.val(data.Result.Marca);
            $txtDescripcion.val(data.Result.DescripcionEquipo);
            $txtSerie.val('');
            $ArchivoBase64.val('');
            var codUbigeo = data.Result.CodigoUbigeo;
            $hdnIdZonaDespacho.val(codUbigeo);
            $searchZonaDespacho.css("visibility", "visible");

            if (codUbigeo != "" && codUbigeo != null && codUbigeo.length > 0) {
                $searchZonaDespacho.css("visibility", "hidden");
                $btnGuardarDespacho.css('display', 'none');
            }
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);

            $txtDireccion.prop("disabled", false);
            if (direccion != "" && direccion != null && direccion.length > 0) {
                $txtDireccion.prop("disabled", true);

            }

            var nroPiso = data.Result.NroPiso;
            if (nroPiso != "" && nroPiso != null ) {
                $txtNroPiso.prop("disabled", true);
            };
            $txtNroPiso.val(nroPiso);

            $txtGuia.val('');
            $lblNombreArchivoDespacho.text('');
            $codigosIds.val(concatenatedCodes);
            $TipoReg.val("T");
            $RegStock.val("N");
            $FlagCargaDocumentoDespacho.val("1");
            $CodigoDocumentoDespacho.val("0");
            $("#rowTablaSeriesCargar").show();
            $("#rowTablaSeriesDescarga").hide();

            $("#tblSeriesGuia tbody tr").remove();

            //Se construye tabla de series y guias por registros seleccionados
            for (i = 0; i < arrayResult.length; i++) {
                var contador = 0;
                contador = 1 + i;
                var nuevoTr = "<tr id='rowSerieGuia" + i + "'>" +
                    "<th style='text-align:center'>" + contador + "</th>" +
                    "<th>" + "<input type='text' value='' id='SerieSS" + i + "' style='width:100%' class='SerieSS'>" + "</th>" +
                    "<th>" + "<input type='text' value='' id='Guia" + i + "' style='width:100%' class='GuiaSS'>" + "</th>" +
                    "</tr>";
                $tblSeriesGuia.append(nuevoTr);
            }

        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.consultaDetalleDespacho);
    }

    function verSeries(codDetalleDespacho) {
        $modalSeries.modal("show");
        var m = "POST";
        var url = "BandejaSolicitudesVentas/VerDetalleItemDespacho?codDetalleDespacho=" + codDetalleDespacho;
        var objParam = "";
        var fnDoneCallback = function (data) {
            $codDetalleDespacho.val(data.Result.Id);
            $btnGuardarDespacho.css('display', 'none');
            $txtCodigoProductoSerie.val(data.Result.CodigoEquipo);
            $txtMarcaSerie.val(data.Result.Marca);
            $txtDescripcion.val(data.Result.DescripcionEquipo);
            $txtSerie.val(data.Result.NumeroSerie);
            $txtSerie.prop("disabled", true);
            var codUbigeo = data.Result.CodigoUbigeo;
            $hdnIdZonaDespacho.val(codUbigeo);
            $searchZonaDespacho.css("visibility", "hidden");
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);
            $txtDireccion.prop("disabled", true);

            $txtGuia.val(data.Result.NumeroGuia);
            $txtGuia.prop("disabled", true);
            var rutaDocumento = data.Result.RutaDocumento
            $lblNombreArchivoDespacho.text(rutaDocumento);
            $("#rowTablaSeriesCargar").hide();

            var nroPiso = data.Result.NroPiso;
            if (nroPiso != "" && nroPiso != null ) {
                $txtNroPiso.prop("disabled", true);
            };
            $txtNroPiso.val(nroPiso);

            if (data.Result.RutaDocumento.length > 0) {
                $("#rowTablaSeriesDescarga").show();
            }
            else {
                $("#rowTablaSeriesDescarga").hide();
            }

            $CodigoDocumentoDespacho.val(data.Result.CodigoDocumento);

            $rowTablaSeriesGuias.hide();
            $rowSerieGuia.show();
            $TipoReg.val("U");
            $FlagCargaDocumentoDespacho.val("0");
            $btnCargarOtroDocumento.hide();
            $btnRegistrarSerie.hide();
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.consultaDetalleDespacho);
    }

    function $btnGuardarImportacion_click() {
        if ($txtCodigoPedidoSE.val() === "" || $txtCodigoPedidoSE.val() == null) {
            app.message.error("Validación", "Debe ingresar el código de pedido de los productos sin stock");
            return false;
        }
        //if ($dateIngresoAlmacenSE.val() === "" || $dateIngresoAlmacenSE.val() == null) {
        //    app.message.error("Validación", "Debe seleccionar la fecha de ingreso de almacen de los productos sin stock");
        //    return false;
        //}

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/GestionImportacion";
            var obj = {
                Tipo: "Y",
                CodigoSolicitud: $numeroSolicitud.val(),
                NumeroPedido: $txtCodigoPedidoSE.val(),
                FechaIngreso: $dateIngresoAlmacenSE.val(),
                IdDespacho: $NumDespacho.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.ActualizarImportacion);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de importación?", "S&iacute;", "No", fnSi, null);

    }

    function editarSeries(codDetalleDespacho, CodDetalle) {

        //$('#Serie' + codDetalleDespacho).removeAttr('readonly');
        //$('#Serie' + codDetalleDespacho).css('border', '1px solid ');
        //$('#Serie' + codDetalleDespacho).css('background-color', 'white');
        //$('#Boton' + codDetalleDespacho).css('display', 'inline-block');
        //$('#Edi'   + codDetalleDespacho).css('display', 'none');
        //$('#Boton' + codDetalleDespacho).css('width', '30px');
        //return;
        $hdnCodDetalle.val(CodDetalle);
        $modalSeries.modal("show");
        var m = "POST";
        var url = "BandejaSolicitudesVentas/VerDetalleItemDespacho?codDetalleDespacho=" + codDetalleDespacho;
        var objParam = "";
        var fnDoneCallback = function (data) {

            $codDetalleDespacho.val(data.Result.Id);
            $txtCodigoProductoSerie.val(data.Result.CodigoEquipo);
            $txtMarcaSerie.val(data.Result.Marca);
            $txtDescripcion.val(data.Result.DescripcionEquipo);
            $txtSerie.val(data.Result.NumeroSerie);
            var codUbigeo = data.Result.CodigoUbigeo;
            $hdnIdZonaDespacho.val(codUbigeo);
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);
            $txtGuia.val(data.Result.NumeroGuia);
            $CodigoDocumentoDespacho.val(data.Result.CodigoDocumento);
            $TipoReg.val("U");
            $FlagCargaDocumentoDespacho.val("0");
           // $btnGuardarDespacho.css('display', 'none');

            if ($nombreRol.val() == "SGI_VENTA_ASESOR") {
                $txtDireccion.prop("disabled", false);
                $searchZonaDespacho.css("visibility", "visible");
                $txtNroPiso.prop('disabled', false);
                $btnRegistrarSerie.css('display', 'none');
                $("#rowTablaSeriesCargar").hide();
                $("#rowTablaSeriesDescarga").hide();
                $("#rowTablaSeriesCargar").hide();
                $("#rowTablaSeriesGuias").hide();
                $("#rowTablaSeriesDescarga").hide();
                $txtSerie.prop('disabled', true);
                $txtGuia.prop('disabled', true);
            }
            else if ($nombreRol.val() == "SGI_VENTA_LOGISTICA") {
                $txtNroPiso.prop('disabled', true);
                $txtDireccion.prop('disabled', true);
                $searchZonaDespacho.css("visibility", "visible");
                var rutaDocumento = data.Result.RutaDocumento
                $lblNombreArchivoDespacho.text(rutaDocumento);
                if (rutaDocumento.length > 0) {
                    $("#rowTablaSeriesCargar").hide();
                    $("#rowTablaSeriesDescarga").show();
                }
                else {
                    $("#rowTablaSeriesCargar").show();
                    $("#rowTablaSeriesDescarga").hide();
                }

                $rowTablaSeriesGuias.hide();
                $rowSerieGuia.show();


                $txtSerie.prop("disabled", false);
                $txtGuia.prop("disabled", false);
                $btnCargarOtroDocumento.show();
                $btnRegistrarSerie.show();

                if (data.Result.CodigoDocumento === "" || data.Result.CodigoDocumento == null || data.Result.CodigoDocumento == "0") {
                    $FlagCargaDocumentoDespacho.val("1");
                }
            };

            if (codUbigeo != "" && codUbigeo != null && codUbigeo.length > 0) {
                $searchZonaDespacho.css("visibility", "hidden");
                $btnGuardarDespacho.css('display', 'none');
            };

            if (direccion != "" && direccion != null && direccion.length > 0) {
                $txtDireccion.prop("disabled", true);
            };

            var nroPiso = data.Result.NroPiso;
            if (nroPiso != "" && nroPiso != null ) {
                $txtNroPiso.prop("disabled", true);
            };
            $txtNroPiso.val(nroPiso);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.consultaDetalleDespacho);
    }

    function $btnRegistrarSerie_click() {
        if ($hdnIdZonaDespacho.val() === "" || $hdnIdZonaDespacho.val() == null) {
            app.message.error("Validación", "Debe ingresar un ubigeo del despacho.");
            return false;
        }
        if ($txtDireccion.val() === "" || $txtDireccion.val() == null) {
            app.message.error("Validación", "Debe ingresar una dirección del despacho.");
            return false;
        }

        if ($TipoReg.val() === "U") {
            if ($txtSerie.val() === "" || $txtSerie.val() == null) {
                app.message.error("Validación", "Debe ingresar el número de serie o lote.");
                return false;
            }
            if ($txtGuia.val() === "" || $txtGuia.val() == null) {
                app.message.error("Validación", "Debe ingresar el número de la guia de remisión");
                return false;
            }
        }
        else {
            let flagSeries = false;
            let flagGuias = false;
            if ($RegStock.val() === "S") {
                $(".SerieCS").each(function () {
                    if ($(this).val().trim() === "") { // Verificar si está vacío (ignora espacios en blanco)
                        flagSeries = true;
                        return false; // Salir del bucle si se encuentra un campo vacío
                    }
                });

                if (flagSeries) {
                    app.message.error("Validación", "Debe ingresar todas las series y/o lotes.");
                    return false;
                }

                $(".GuiaCS").each(function () {
                    if ($(this).val().trim() === "") { // Verificar si está vacío (ignora espacios en blanco)
                        flagGuias = true;
                        return false; // Salir del bucle si se encuentra un campo vacío
                    }
                });

                if (flagGuias) {
                    app.message.error("Validación", "Debe ingresar todos los números de las Guias de Remision.");
                    return false;
                }



            }
            else {

                $(".SerieSS").each(function () {
                    if ($(this).val().trim() === "") { // Verificar si está vacío (ignora espacios en blanco)
                        flagSeries = true;
                        return false; // Salir del bucle si se encuentra un campo vacío
                    }
                });

                if (flagSeries) {
                    app.message.error("Validación", "Debe ingresar todas las series y/o lotes");
                    return false;
                }
                $(".GuiaSS").each(function () {
                    if ($(this).val().trim() === "") { // Verificar si está vacío (ignora espacios en blanco)
                        flagGuias = true;
                        return false; // Salir del bucle si se encuentra un campo vacío
                    }
                });

                if (flagGuias) {
                    app.message.error("Validación", "Debe ingresar todos los números de las Guias de Remision.");
                    return false;
                }


            }
        }

        if ($lblNombreArchivoDespacho.text() === "" || $lblNombreArchivoDespacho.text() == null) {
            app.message.error("Validación", "Debe adjuntar el documento Guia de Remision al despacho.");
            return false;
        }



        let lista_series = "";
        let lista_guias = "";
        if ($TipoReg.val() === "T" && $RegStock.val() === "S") {
            let series = $(".SerieCS").map(function () {
                return $(this).val().trim(); // Obtener el valor del input y eliminar espacios en blanco
            }).get(); // Convertir a un array estándar

            const duplicates = findDuplicates(series);

            if (duplicates.length > 0) {
                app.message.error("Validación", "Las series ingresadas se encuentran repetidas.");
                return false;
            }


            // Unir los valores con comas
            lista_series = series.join(", ");

            let guias = $(".GuiaCS").map(function () {
                return $(this).val().trim(); // Obtener el valor del input y eliminar espacios en blanco
            }).get(); // Convertir a un array estándar

            // Unir los valores con comas
            lista_guias = guias.join(", ");


        }
        else if ($TipoReg.val() === "T" && $RegStock.val() === "N") {
            let series = $(".SerieSS").map(function () {
                return $(this).val().trim(); // Obtener el valor del input y eliminar espacios en blanco
            }).get(); // Convertir a un array estándar


            const duplicates = findDuplicates(series);

            if (duplicates.length > 0) {
                app.message.error("Validación", "Las series ingresadas se encuentran repetidas.");
                return false;
            }

            // Unir los valores con comas
            lista_series = series.join(", ");

            let guias = $(".GuiaSS").map(function () {
                return $(this).val().trim(); // Obtener el valor del input y eliminar espacios en blanco
            }).get(); // Convertir a un array estándar

            // Unir los valores con comas
            lista_guias = guias.join(", ");
        }



        var archivo_name = "";
        var ext = "";

        if ($FlagCargaDocumentoDespacho.val() === "1") {
            var fileInput = document.getElementById("fileCargaDocumentoSustentoDespacho");
            const archivo = fileInput.files[0];
            ext = fileInput.files[0].name.split('.').pop();
            archivo_name = archivo.name;
            convertirABase64(archivo);
        }


        function findDuplicates(arr) {
            const counts = {};
            const duplicates = [];

            // Contar ocurrencias
            arr.forEach(item => {
                counts[item] = (counts[item] || 0) + 1;
            });

            // Filtrar duplicados
            for (const key in counts) {
                if (counts[key] > 1) {
                    duplicates.push(key);
                }
            }

            return duplicates;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/ActualizarNumeroSerie";
            var obj = {
                codDetalleDespacho: $codDetalleDespacho.val(),
                NumeroSerie: $txtSerie.val(),
                CodigoUbigeo: $hdnIdZonaDespacho.val(),
                Direccion: $txtDireccion.val(),
                NumeroGuiaRemision: $txtGuia.val(),
                RutaDocumento: $lblNombreArchivoDespacho.text(),
                Tipo: $TipoReg.val(),
                Ids: $codigosIds.val(),
                Series: lista_series,
                Guias: lista_guias,
                Archivo: $ArchivoBase64.val(),
                NombreArchivo: archivo_name,
                Extension: ext,
                CodigoWorkFlow: $codigoWorkflow.val(),
                FlagCarga: $FlagCargaDocumentoDespacho.val(),
                CodigoDocumento: $CodigoDocumentoDespacho.val()
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    location.reload();
                };
                if (data.Result.Codigo == 1) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.actualizarSerie);
        }
        return app.message.confirm("Ventas", "¿Está seguro que registrar el detalle del despacho?", "S&iacute;", "No", fnSi, null);

    };

    function $AdjuntarDocumentoDespacho_click() {
        $lblNombreArchivoDespacho.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustentoDespacho').click();
    };

    function convertirABase64(archivo) {
        const reader = new FileReader();

        // Leer el archivo como un ArrayBuffer
        reader.readAsArrayBuffer(archivo);

        // Convertir el ArrayBuffer a Base64 una vez cargado
        reader.onloadend = () => {
            const arrayBuffer = reader.result; // El contenido en ArrayBuffer
            const bytes = new Uint8Array(arrayBuffer); // Convertir a Uint8Array
            let base64 = '';
            for (let i = 0; i < bytes.length; i++) {
                base64 += String.fromCharCode(bytes[i]);
            }
            const base64String = btoa(base64); // Convertir a Base64
            // console.log(base64String); // Imprimir Base64 en consola
            $ArchivoBase64.val(base64String);
        };
    }


    function seleccionarUbi() {

        var codDistrito = sessionStorage.getItem('codDistritoServ');

        var nomDepartamentoServ = sessionStorage.getItem('nomDepartamentoServ')
        var nomProvinciaServ = sessionStorage.getItem('nomProvinciaServ');
        var nomDistritoServ = sessionStorage.getItem('nombreDistritoServ');

        if ($cmbDepartamentoServ.val().trim() === "" || $cmbDepartamentoServ.val().trim() === null || $cmbDepartamentoServ.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un departamento");
            return;
        }

        if ($cmbProvinciaServ.val().trim() === "" || $cmbProvinciaServ.val().trim() === null || $cmbProvinciaServ.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar una provincia");
            return;
        }

        if ($cmbDistritoServ.val().trim() === "" || $cmbDistritoServ.val().trim() === null || $cmbDistritoServ.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un distrito");
            return;
        }

        $txtZona.val(nomDepartamentoServ + ' / ' + nomProvinciaServ + ' / ' + nomDistritoServ);
        $modalZonaTecSol.modal('toggle');
    };

    function logicUbigeoDespacho() {
        $btnGuardarUbigeoDespachoSel.show();
        $btnGuardarUbigeoSel.hide();
        getDepartamentosServ();
        $cmbProvinciaServ.val('').trigger("change");
        $cmbDistritoServ.val('').trigger("change");
        $cmbProvinciaServ.prop("disabled", true);
        $cmbDistritoServ.prop("disabled", true);
    };

    function logicUbigeoTecnico() {
        $btnGuardarUbigeoDespachoSel.hide();
        $btnGuardarUbigeoSel.show();
        getDepartamentosServ();
        $cmbProvinciaServ.val('').trigger("change");
        $cmbDistritoServ.val('').trigger("change");
        $cmbProvinciaServ.prop("disabled", true);
        $cmbDistritoServ.prop("disabled", true);

    }

    function getDepartamentosServ() {
        var method = "POST";
        var url = "Ubigeo/ObtenerUbigeo";
        var ubigeoObj = {}

        var objParam = JSON.stringify(ubigeoObj);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            var distritos = { Result: [] };
            for (let i = 0; i < data.Result.length; i++) {
                var departamento = {
                    Id: data.Result[i].CodDepartamento,
                    Text: data.Result[i].NombreDepartamento,
                }
                resultado.Result.push(departamento);
            }

            resultado.Result = resultado.Result.reduce((acumulador, itemActual) => {
                // Verificar si el Id ya está en el acumulador
                if (!acumulador.some(item => item.Id === itemActual.Id)) {
                    acumulador.push(itemActual);
                }
                return acumulador;
            }, []);
            $cmbDepartamentoServ.on('change', function () {
                const codDepartamento = $(this).val();
                const nomDepartamento = $('select[id="cmbDepartamentoServ"] option:selected').text();
                sessionStorage.setItem('nomDepartamentoServ', `${nomDepartamento}`);
                if (!codDepartamento === null || !codDepartamento === '') {
                    $(this).prop('disabled', false);

                } else {
                    $cmbProvinciaServ.prop('disabled', false);
                    obtenerProvincia(codDepartamento, data);
                    $cmbDistritoServ.prop("disabled", true);
                }
                $cmbDistritoServ.val("").trigger("change");
            });
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbDepartamentoServ, resultado, $modalZonaTecSol, "", "<--Seleccione-->", filters);
        }
        var fnFailCallback = function () {
            app.mensajes.error("Error", "No se ejecutó correctamente la carga de departamentos");
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoUbigeo)

    }

    function obtenerProvincia(codDepartamento, data) {
        var provincias = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var provincia = {
                Id: data.Result[i].CodProvincia,
                Text: data.Result[i].NombreProvincia,
            }
            provincias.Result.push(provincia);

        }
        provincias.Result = provincias.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodDepartamento = itemActual.Id.startsWith(codDepartamento);
            if (!isDuplicate && startsWithCodDepartamento) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);
        $cmbProvinciaServ.on('change', function () {
            const codProvincia = $(this).val();
            const nomProvincia = $('select[id="cmbProvinciaServ"] option:selected').text();
            sessionStorage.setItem('nomProvinciaServ', `${nomProvincia}`);

            if (!codProvincia === null || !codProvincia === '') {
                $(this).prop('disabled', false);

            } else {
                $cmbProvinciaServ.prop('disabled', false);
                $cmbDistritoServ.prop('disabled', false)
                obtenerDistrito(codProvincia, data);
            }
        });

        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbProvinciaServ, provincias, $modalZonaTecSol, "", "<--Seleccione-->", filters)
    }

    function obtenerDistrito(codProvincia, data) {
        var distritos = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var distrito = {
                Id: data.Result[i].UbigeoId,
                Text: data.Result[i].NombreDistrito,
            }
            distritos.Result.push(distrito);

        }
        distritos.Result = distritos.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodProvincia = itemActual.Id.startsWith(codProvincia);
            if (!isDuplicate && startsWithCodProvincia) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);

        $cmbDistritoServ.on('change', function () {
            const codDistrito = $(this).val();
            const nombreDistrito = $('select[id="cmbDistritoServ"] option:selected').text();
            sessionStorage.setItem('codDistritoServ', `${codDistrito}`);
            sessionStorage.setItem('nombreDistritoServ', `${nombreDistrito}`);
            $txtCodUbicacionServ.val(codDistrito);
        });


        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbDistritoServ, distritos, $modalZonaTecSol, "", "<--Seleccione-->", filters)
    };

    function $fileCargaDocumentoSustentoDespacho_change() {
        $lblNombreArchivoDespacho.text("");
        var fileInput = document.getElementById("fileCargaDocumentoSustentoDespacho");

        if (myfile.length > 0) {
            myfile = "";
        }

        myfile = $(this).val();
        var ext = myfile.split('.').pop();
        if (ext == "pdf" || ext == "PDF" ||
            ext == "xls" || ext == "XLS" ||
            ext == "xlsx" || ext == "XLSX" ||
            ext == "doc" || ext == "DOC" ||
            ext == "docx" || ext == "DOCX" ||
            ext == "zip" || ext == "ZIP" ||
            ext == "rar" || ext == "RAR" ||
            ext == "ppt" || ext == "PPT" ||
            ext == "pptx" || ext == "PPTX") {
            //beforeSendCargaDoc();
            var formdata = new FormData(); //FormData object
            //Appending each file to FormData object
            formdata.append(fileInput.files[0].name, fileInput.files[0]);
            formdata.append('name', name);

            $lblNombreArchivoDespacho.text(fileInput.files[0].name);

        }
        else if (myfile !== "") {

            app.message.error('Validación', 'El formato no es el permitido', 'Aceptar', null)
            this.value = "";
            $lblNombreArchivoDespacho.text("");

        } else {
            this.value = "";
            $lblNombreArchivoDespacho.text("");

        }
    }

    function $btnGuardarGestionLogisticaSE_click() {
        if ($dateEntregaPedido.val() === "" || $dateEntregaPedido.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido.");
            return false;
        }
        //if ($txtNumeroFacturaSE.val() === "" || $txtNumeroFacturaSE.val() == null) {
        //    app.message.error("Validación", "Debe ingresar el N° de Factura de los productos sin stock");
        //    return false;
        //}


        //Validación de numero de series agregadas:
        //if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03" || $TipoSolicitud.val() === "TSOL05") {

        //    if ($TotalSeriesSS.val() != $ContadorSeriesSS.val()) {
        //        app.message.error("Validación", "Debe ingresar la series y/o lotes completas.");
        //        return false;
        //    }

        //}
        //else {

        //    if ($txtNumeroGuiaRemisionSE.val() === "" || $txtNumeroGuiaRemisionSE.val() == null) {
        //        app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos sin stock");
        //        return false;
        //    }
        //}

        //if ($TipoSolicitud.val() === "TSOL04") //Para ventas de materiales y venta de equipos:
        //{
        //    var documento_guiaRemision = 0;
        //    //var documento_factura = 0;
        //    //adjuntos.forEach(function (currentValue, index, arr) {
        //    //    if (adjuntos[index].CodigoTipoDocumento == "DVT03") { //Factura
        //    //        documento_factura = 1;
        //    //    }
        //    //});

        //    //if (documento_factura === 0) {
        //    //    app.message.error("Validación", "Debe adjuntar un documento de Factura.");
        //    //    return false;
        //    //}
        //    adjuntos.forEach(function (currentValue, index, arr) {
        //        if (adjuntos[index].CodigoTipoDocumento == "DVT08") { //Guia de Remision
        //            documento_guiaRemision = 1;
        //        }
        //    });

        //    if (documento_guiaRemision === 0) {
        //        app.message.error("Validación", "Debe adjuntar un documento de Guía de Remisión.");
        //        return false;
        //    }
        //}


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/GestionLogistica";
            var obj = {
                CodigoSolicitud: $numeroSolicitud.val(),
                Stock: "N",
                EstadoAprobacion: $TipoSolicitud.val(),
                NumeroGuiaRemision: $txtNumeroGuiaRemisionSE.val(),
                NumeroFactura: $txtNumeroFactura.val(),
                FechaEntrega: $dateEntregaPedido.val(),
                IdDespacho: $NumDespacho.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.RegistrarGestionVenta);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de despacho?", "Si", "No", fnSi, null);

    }

    function $btnEnviarGestionDespachoSE_click() {
        if ($dateEntregaPedido.val() === "" || $dateEntregaPedido.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido");
            return false;
        }
        //if ($txtNumeroFacturaSE.val() === "" || $txtNumeroFacturaSE.val() == null) {
        //    app.message.error("Validación", "Debe ingresar el N° de Factura de los productos sin stock");
        //    return false;
        //}

        if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03" || $TipoSolicitud.val() === "TSOL05") {
            if (parseInt(ContSerieSS) != parseInt(NumeroSinStock)) {
                app.message.error("Validación", "Debe ingresar todas las series y/o lotes de los productos sin stock antes de enviar a gestión.");
                return false;
            }
        }
        //else {
        //    if ($txtNumeroGuiaRemisionSE.val() === "" || $txtNumeroGuiaRemisionSE.val() == null) {
        //        app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos sin stock");
        //        return false;
        //    }
        //}


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGestionVentaSinStock";
            var obj = {
                IdDespacho: $NumDespacho.val(),
                CodigoSolicitud: $numeroSolicitud.val(),
                CodigoWorkFlow: $codigoWorkflow.val(),
                TipoVenta: $TipoSolicitud.val(),
                NumeroGuiaRemision: $txtNumeroGuiaRemisionSE.val(),
                NumeroFactura: $txtNumeroFactura.val(),
                FechaEntrega: $dateEntregaPedido.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGestionLogistica);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar a gestión?", "S&iacute;", "No", fnSi, null);
    }

    function editarItemServ(CodDetalle) {
        //$DS_hdnOpcGrillaItems.val(opc);
        var method = "POST";
        var url = "BandejaSolicitudesVentas/VerServicios";
        var objFiltros = {
            CodDetalle: CodDetalle,
            IdCotizacion: $IdCotizacion.val()
        };
        var objParam = JSON.stringify(objFiltros);
        var fnDoneCallBack = function (data) {
            $('#modalDetalleItemServicio').modal('show');
            $DS_txtDescripcion.prop('disabled', true);
            $DS_hdnIdCotDetServ.val(data.Result.Id);
            var codigo = "000000" + data.Result.CodItem
            $DS_txtCodigo.val(codigo.substring(codigo.length - 6));
            $DS_txtDescripcion.val(data.Result.Descripcion);
            $DS_txtCantidad.val(data.Result.Cantidad);
            if (data.Result.VentaUnitaria != null) { $DS_txtPrecio.val(app.formatearEnteroComa(data.Result.VentaUnitaria.toFixed(2))); }
            else { $DS_txtPrecio.val(""); }
            if (data.Result.VentaTotalSinIGV != null) { $DS_txtTotalVenta.val(app.formatearEnteroComa(data.Result.VentaTotalSinIGV.toFixed(2))); }
            else { $DS_txtTotalVenta.val(""); }
            //detalleServicios = data.Result.DetallesServicio;
            if (data.Result.DetallesServicio != null) { contadorDetalle = data.Result.DetallesServicio.length; }
            contadorDetalle = 0;
            cargarTablaDetalleServicios(data.Result.CotizacionActividades);
            if ($PermitirEditarCotDetItem.val() != "S") {
                $btnAgregarDetServ.css("display", "none");
                $DS_btnGuardar.css("display", "none");
            }
        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaDetalleServicios(detalle) {
        $('#DS_tblServiciosDetalle tbody').empty();
        var swDetalle = false;
        if (detalle != null) {
            for (i = 0; i < detalle.length; i++) {
                var indice = i + 1;
                var html = '<div class="text-center">';
                html += '<a class="btn btn-primary btn-xs" title="Editar"><i class="fa fa-pencil-square-o"></i></a>&nbsp;';
                html += '<a class="btn btn-primary btn-xs" title="Eliminar"><i class="fa fa-trash"></i></a>&nbsp;';
                html += '</div>';
                var nuevoTr = '<tr id="rowDetalle" name="rowDetalle">' +
                    '<td><center>' + indice + '</center></td>' +
                    '<td><center>' + detalle[i].DescripcionActividad + '</center></td>';
                if ($PermitirEditarCotDetItem.val() == "S") {
                    nuevoTr += '<td><center>' + html + '</center></td>';
                }
                nuevoTr += '</tr>';
                $DS_tblServiciosDetalle.append(nuevoTr);
                swDetalle = true;
            }
        }
        if (!swDetalle) {
            var nuevoTr = '<tr id="rowDetalle" name="rowDetalle"><td colspan=3><center>No existen registros</center></td></tr>';
            $DS_tblServiciosDetalle.append(nuevoTr);
        };
    }

    function $btnRegistrarFechaProg_click() {
        if ($dateProg.val() === "" || $dateProg.val() === null) {
            app.message.error("Validación", "Debe ingresar una Fecha de Programación.");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "T",
                CodigoSolicitud: $numeroSolicitud.val(),
                IdDespacho: $NumDespacho.val(),
                FechaEntrega: $dateProg.val()
            }
            console.log(obj);
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    location.reload();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.RegistrarGestionVenta);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea guardar la fecha de programación?", "S&iacute;", "No", fnSi, null);

    }

    function $btnGuardarProg_click() {
        $dateProg.val(hoy());
    }

    function BuscarTecnicosClick() {
        $cmbTipDocTecnico.val("").trigger("change");
        $txtNumDocTec.val('');
        $cmbTipoEmpleado.val(0).trigger("change");
        $txtNombres.val('');
        $txtApePat.val('');
        $txtApeMat.val('');
        BuscarTecnicos();
    }
    function BuscarTecnicos() {
        var method = "POST";
        var url = "BandejaGarantia/ObtenerTecnico"
        var objTecnico = {
            CodigoEmpleado: 0,
            NombreEmpleado: $txtNombres.val() == null ? "" : $txtNombres.val().trim(),
            ApellidoPaternoEmpleado: $txtApePat.val() == null ? "" : $txtApePat.val().trim(),
            ApellidoMaternoEmpleado: $txtApeMat.val() == null ? "" : $txtApeMat.val().trim(),
            CodigoCargo: 8,//-->8 es Técnico
            TipoDocumento: $cmbTipDocTecnico.val(),
            TipoEmpleado: $cmbTipoEmpleado.val() == 0 ? "" : $cmbTipoEmpleado.val(),
            NumeroDocumento: $txtNumDocTec.val() == null ? "" : $txtNumDocTec.val(),
            Estado: 1,
            FechaInicio: "",
            FechaFinal: ""
        };

        var objParam = JSON.stringify(objTecnico);

        var fnDoneCallBack = function (data) {
            //limpiarAsignacionTecnicos();
            cargarBandejaTecnicos(data);
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Error al cargar la bandeja de técnicos.");
            cargarBandejaTecnicos()
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }


    function cargarBandejaTecnicos(data) {
        var columns = [
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "NumeroDocumento",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "Documento.Descripcion",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "TelefonoEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "EmailEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "LugarLaboral.UbigeoId",
                render: function (data, type, row) {
                    var zona = row.LugarLaboral.NombreDepartamento + '/' + row.LugarLaboral.NombreProvincia + '/' + row.LugarLaboral.NombreDistrito;
                    return '<center>' + zona + '</center>'
                }
            },
            {
                data: "TipoEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    var d = "'" + row.CodigoEmpleado + "','" + row.NombresCompletosEmpleado + "','" + row.Empresa.Valor1 + "'";
                    var seleccionar = '<a id="btnSeleccionarTecnico" class="btn btn-default btn-xs" title="Seleccionar"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
                    return '<center>' + seleccionar + '</center>';
                }
            }
        ]
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ]

        var filters = {};
        filters.dataTablePageLength = 5;
        filters.dataTableInfo = true;

        app.llenarTabla($tblTecnicos, data, columns, columnDefs, "#tblTecnicos", null, null, filters);
    }


    function $btnGuiaManuscritaTotal_click() {
        var tipo_despacho = "T";

        var num_solicitud = $numeroSolicitud.val();
        var tipo = "MA"
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud + "&stock=X" + "&tipoDespacho=" + tipo_despacho + "&idDespacho=" + $NumDespacho.val();

        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaPedido?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía manuscrita correctamente.");
            $btnEnviarServicio.show();
        }
        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarGuiaManuscrita);
    }

    function IniciarBotonSeleccionarTecnico() {
        $('#tblTecnicos tbody').on('click', 'td #btnSeleccionarTecnico', function () {


            //limpiarDetalleInfoAdcional()
            var tr = $(this).closest('tr');
            var row = $('#tblTecnicos').dataTable().api().row(tr);
            var info = row.data();
            asignarTecnico(info)
        });
    };

    function DesasignarTecnico(CodAsignacion) {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/MantTecnicosDespacho";

        var objTecnico = {
            TipoProceso: "D",
            Id_Reclamo: $numeroSolicitud.val(),
            Cod_Tecnico: CodAsignacion,
            Estado: false
        };

        var objParam = JSON.stringify(objTecnico);


        var fnSi = function () {
            var fnDoneCallback = function () {
                app.message.success("Éxito", "Se realizó la desasignación del técnico.");
                tecnicosAsig = tecnicosAsig.filter(tecnico => tecnico.Cod_Tecnico != CodAsignacion);
                cargarTablaMainTecnicos(tecnicosAsig);
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al modificar al técnico, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallBack, null, null);
        };

        return app.message.confirm("Confirmación", "¿Desea desasignar al técnico del despacho?", "S&iacute;", "No", fnSi, null);
    }


    function asignarTecnico(data) {

        var method = "POST";
        var url = "BandejaSolicitudesVentas/MantTecnicosDespacho";

        var objReclamo = {
            TipoProceso: "I",
            Id_Asig: 0,
            Id_Reclamo: $numeroSolicitud.val(),
            Cod_Tecnico: data.CodigoEmpleado,
            Nombres: data.NombresEmpleado,
            ApePaterno: data.ApellidoPaternoEmpleado,
            ApeMaterno: data.ApellidoMaternoEmpleado,
            Documento: data.NumeroDocumento,
            Tipo_Documento: data.Documento.Parametro,
            Correo: data.EmailEmpleado,
            Telefono: data.TelefonoEmpleado,
            Zona: data.LugarLaboral.UbigeoId,
            Empresa: data.Empresa.Valor1,
            TipoTecnico: data.CodigoTipoEmpleado,
            Estado: true,
        };

        var objParam = JSON.stringify(objReclamo);

        var fnSi = function () {
            var fnDoneCallBack = function (data2) {

                if (data2.Result.Codigo > 0) {
                    app.message.success("Éxito", "Se realizó la asignación de manera correcta");

                    tecnicosAsig.push({
                        Cod_Tecnico: data.CodigoEmpleado,
                        TipoDoc: data.Documento.Descripcion,
                        Documento: data.NumeroDocumento,
                        Tipo_Documento: data.Documento.Parametro,
                        Nombres: data.NombresEmpleado,
                        ApePaterno: data.ApellidoPaternoEmpleado,
                        ApeMaterno: data.ApellidoMaternoEmpleado,
                        NombreCompleto: data.NombresCompletosEmpleado,
                        TipoTecnico: data.CodigoTipoEmpleado,
                        Telefono: data.TelefonoEmpleado,
                        Correo: data.EmailEmpleado,
                        Empresa: data.Empresa.Valor1,
                        Zona: data.LugarLaboral.UbigeoId,
                        DescZona: data.LugarLaboral.NombreDepartamento + data.LugarLaboral.NombreProvincia + data.LugarLaboral.NombreDistrito,
                        Estado: true
                    });

                    cargarTablaMainTecnicos(tecnicosAsig);

                    $modalBusquedaTecnico.modal('toggle');
                }
                else {
                    app.message.error("Validación", data2.Result.Mensaje);
                }
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al realizar la inserción.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Desea asignar el técnico seleccionado al despacho de ventas?", "S&iacute;", "No", fnSi, null);
    };

    function CrearTecnico3ro_a_Producto() {
        //var idProducto = $hdnIdProduct.val();
        if ($txtNombreTecnico.val() == "" || $txtNombreTecnico.val() == null || $txtNombreTecnico.val().trim().length == 0) {
            app.message.error("Validación", "Debe ingresar el nombre del técnico.");
            return;
        };

        if ($txtApellidoPaternoTec.val() == "" || $txtApellidoPaternoTec.val() == null || $txtApellidoPaternoTec.val().trim().length == 0) {
            app.message.error("Validación", "Debe ingresar el apellido paterno del técnico.");
            return;
        };

        if ($txtApellidoMaternoTec.val() == "" || $txtApellidoMaternoTec.val() == null || $txtApellidoMaternoTec.val().trim().length == 0) {
            app.message.error("Validación", "Debe ingresar el apellido materno del técnico.");
            return;
        };

        if ($txtTipoTecnico.val() == "") {
            app.message.error("Validación", "Debe de seleccionar un técnico o realizar el ingreso de uno nuevo.");
            return;
        };

        if ($cmbTipoCredencial.val() == "" || $cmbTipoCredencial.val() == "0" || $cmbTipoCredencial.val() == null) {
            app.message.error("Validación", "Debe de seleccionar un tipo de documento.");
            return;
        };

        if ($txtNumDocumento.val() == "" || $txtNumDocumento.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar el número de documento.");
            return;
        };


        if (isNaN($txtNumDocumento.val())) {
            app.message.error("Validación", "El número de documento debe de ser un número");
            return;
        };


        if ($cmbTipoCredencial.val() == "GETD0001" && $txtNumDocumento.val().trim().length != 8) {
            app.message.error("Validación", "El número de documento no es un DNI");
            return;
        };

        if ($cmbTipoCredencial.val() == "GETD0002" && $txtNumDocumento.val().trim().length != 12) {
            app.message.error("Validación", "El número de documento no es un Carnet de Extranjería");
            return;
        };

        if ($txtTelefonoServ.val() == "" && $txtCorreoServ.val() == "") {
            app.message.error("Validación", "Debe de tener por lo menos un medio de contacto, ingresar teléfono o email.");
            return;
        };

        if (!app.validarEmail($txtCorreoServ.val().trim()) && $txtCorreoServ.val() != "") {
            app.message.error("Validación", "El formato del correo es inválido");
            return;
        };

        if ($txtZona.val() == "") {
            app.message.error("Validación", "Debe de ingresar la zona");
            return;
        };


        var method = "POST";
        var url = "BandejaEmpleados/MantenimientoEmpleados";

        var objParam = {
            TipoMantenimiento: '1',
            CodigoEmpleado: 0,
            NombresEmpleado: $txtNombreTecnico.val().trim(), //agregar campo para nombres
            ApellidoPaternoEmpleado: $txtApellidoPaternoTec.val().trim(), //agregar campo para apellido paterno
            ApellidoMaternoEmpleado: $txtApellidoMaternoTec.val().trim(), //agregar campo para apellido materno
            Cargo: {
                CodigoCargo: 8,//Técnico
                Area: {
                    CodigoArea: ""
                }
            },
            FechaNacimiento: null,
            LugarLaboral: {
                UbigeoId: $txtCodUbicacionServ.val(),
            },
            TelefonoEmpleado: $txtTelefonoServ.val(),
            EmailEmpleado: $txtCorreoServ.val(),
            DireccionEmpleado: "",
            SexoEmpleado: "",
            Documento: {
                Parametro: $cmbTipoCredencial.val(),
            },
            NumeroDocumento: $txtNumDocumento.val(),
            Empresa: {
                CodValor1: null,
            },
            CodigoJefe: "",
            FechaIngreso: "",
            TipoEmpleado: "E",
            Estado: 1,
            FechaRegistroFormat: null,
            UsuarioRegistro: null
        }
        var objEmpleado = JSON.stringify(objParam);

        var fnDoneCallback = function (data) {
            if (data.Codigo > 0) {
                app.message.success("Éxito", "Se realizó la creación del técnico satisfactoriamente.");
                $añadirTecnico.modal('toggle');
            }
            else {
                app.message.error("Validación", data.Mensaje);
            }

        };
        var fnFailCallback = function (data) {
            app.message.error("Error", data.Result.Mensaje);
        };

        app.llamarAjax(method, url, objEmpleado, fnDoneCallback, fnFailCallback, null, null);
    };

    function AgregarTecnicoExterno() {
        limpiarAsignacionTecnicos();
        $txtTipoTecnico.val("Externo");
        $hdnTipoEmpleado.val("E");
    };

    function limpiarAsignacionTecnicos() {
        $txtNombreTecnico.val("");
        $txtApellidoPaternoTec.val("");
        $txtApellidoMaternoTec.val("");
        $txtNumDocumento.val("");
        $txtTelefonoServ.val("");
        $txtCorreoServ.val("");
        $txtZona.val("");
        $hdnIdTecnico.val("");
        $cmbTipoCredencial.val('0').trigger("change.select2");

        //getDepartamentos();
        // $cmbDepartamento.val("").trigger('change.select2');
        // $cmbProvincia.val("").trigger('change.select2');
        // $cmbDistrito.val("").trigger('change.select2');
    };

    function btnEnviarServicioClick() {
        var documento_actaConformidad = 0;
        var documento_constanciaServicio = 0;
        var documento_guiaManuscrita = 0;

        if ($dateProgramacionServ.val() === null || $dateProgramacionServ.val() === "") {
            app.message.error("Validación", "Debe seleccionar una fecha de programación del técnico.");
            return;
        }

        if (tecnicosAsig.length == 0) {
            app.message.error("Validación", "Debe seleccionar un técnico para realizar el servicio.");
            return;
        };
        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].CodigoTipoDocumento == "DVT01") {
                documento_actaConformidad = 1;
            }
        });

        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].CodigoTipoDocumento == "DVT02") {
                documento_constanciaServicio = 1;
            }
        });

        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].CodigoTipoDocumento == "DVT05") { //Se cambia por guia manuscrita
                documento_guiaManuscrita = 1;
            }
        });

        if (documento_guiaManuscrita === 0 && documento_constanciaServicio === 0 &&
            documento_actaConformidad === 0) {
            app.message.error("Validación", "Debe adjuntar por lo menos uno de estos documentos para enviar a Facturación: (Acta de Conformidad o Constancia de Servicio Técnico o Guía Manuscrita de Servicios).");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarServicios?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val() + "&idDespacho="+$NumDespacho.val();
            var objParam = '';
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    location.reload();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGuiaPedido);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar el servicio a Facturaci&oacute;n?", "S&iacute;", "No", fnSi, null);
    }

    function $btnGuardarFactura_click() {
        if ($dateFactura.val() === "" || $dateFactura.val() === null) {
            app.message.error("Validación", "Debe ingresar la Fecha de la Factura.");
            return false;
        }
        if ($txtNumeroFacturaServ.val() === "" || $txtNumeroFacturaServ.val() === null) {
            app.message.error("Validación", "Debe ingresar el N° de la Factura.");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGestionFacturacion";
            var obj = {
                Tipo: "F",
                CodigoSolicitud: $numeroSolicitud.val(),
                CodigoWorkFlow: $codigoWorkflow.val(),
                IdDespacho: $NumDespacho.val(),
                FechaEntrega: $dateFactura.val(),
                NumeroFactura: $txtNumeroFacturaServ.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.RegistrarGestionVenta);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea guardar los datos de la facturación?", "S&iacute;", "No", fnSi, null);
    }

    function $btnRegistrarDespacho_click() {

        let ubigeos = [];

        // Recorrer cada checkbox marcado
        $("#tblSeriesCS tbody tr").each(function () {
            // Verificar si el checkbox de esta fila está marcado
            if ($(this).find(".chkCS").is(":checked")) {
                // Obtener el texto de la segunda celda (Nombre de Ubigeos)
                let nombre = $(this).find("th:eq(5)").text();
                ubigeos.push(nombre.trim());
            }
        });

        // Usando .filter() para eliminar duplicados
        let ubigeosOri = ubigeos.filter((valor, indice, self) => {
            return self.indexOf(valor) === indice;
        });

        const itemCheckboxes = document.querySelectorAll(".chkCS");
        // Crear un array con los valores de los checkboxes seleccionados
        const selectedCodes = Array.from(itemCheckboxes)
            .filter(checkbox => checkbox.checked) // Filtrar solo los seleccionados
            .map(checkbox => checkbox.value);    // Obtener los valores

        // Concatenar los códigos en una cadena, separados por comas
        const concatenatedCodes = selectedCodes.join(", ");

        if (concatenatedCodes === "") {
            app.message.error("Validacion", "Debe seleccionar por lo menos un producto.");
            return;
        }

        if (ubigeosOri.length > 1) {
            app.message.error("Validacion", "Debe seleccionar productos de un único destino para ejecutar esta opción.");
            return;
        }


        const arrayResult = concatenatedCodes.split(",").map(item => item.trim());

        $rowSerieGuia.hide();
        $rowTablaSeriesGuias.show();
        $modalSeries.modal("show");
        var m = "POST";
        var url = "BandejaSolicitudesVentas/VerDetalleItemDespacho?codDetalleDespacho=" + arrayResult[0];
        var objParam = "";
        var fnDoneCallback = function (data) {
            $codDetalleDespacho.val(data.Result.Id);
            $txtCodigoProductoSerie.val(data.Result.CodigoEquipo);
            $txtMarcaSerie.val(data.Result.Marca);
            $txtDescripcion.val(data.Result.DescripcionEquipo);
            $txtSerie.val('');
            $ArchivoBase64.val('');
            var codUbigeo = data.Result.CodigoUbigeo;
            $hdnIdZonaDespacho.val(codUbigeo);

            $searchZonaDespacho.css("visibility", "visible");

            if (codUbigeo != "" && codUbigeo != null && codUbigeo.length > 0) {
                $searchZonaDespacho.css("visibility", "hidden");
                $btnGuardarDespacho.css('display', 'none');
            }
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);


            $txtDireccion.prop("disabled", false);
            if (direccion != "" && direccion != null && direccion.length > 0) {
                $txtDireccion.prop("disabled", true);
            };

            var nroPiso = data.Result.NroPiso;
            if (nroPiso != "" && nroPiso != null ) {
                $txtNroPiso.prop("disabled", true);
            };
            $txtNroPiso.val(nroPiso);
            $txtGuia.val('');
            $lblNombreArchivoDespacho.text('');
            $codigosIds.val(concatenatedCodes);
            $TipoReg.val("T");
            $RegStock.val("S");
            $FlagCargaDocumentoDespacho.val("1");
            $CodigoDocumentoDespacho.val("0");
            $("#rowTablaSeriesCargar").show();
            $("#rowTablaSeriesDescarga").hide();

            $("#tblSeriesGuia tbody tr").remove();

            //Se construye tabla de series y guias por registros seleccionados
            for (i = 0; i < arrayResult.length; i++) {
                var contador = 0;
                contador = 1 + i;
                var nuevoTr = "<tr id='rowSerieGuia" + i + "'>" +
                    "<th style='text-align:center'>" + contador + "</th>" +
                    "<th>" + "<input type='text' value='' id='SerieCS" + i + "' style='width:100%' class='SerieCS'>" + "</th>" +
                    "<th>" + "<input type='text' value='' id='Guia" + i + "' style='width:100%' class='GuiaCS'>" + "</th>" +
                    "</tr>";
                $tblSeriesGuia.append(nuevoTr);
            }

        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.consultaDetalleDespacho);
    }

    function $btnEnviarGestionDespacho_click() {
        if ($dateEntregaPedido.val() === "" || $dateEntregaPedido.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido");
            return false;
        }
        //if ($txtNumeroFacturaCE.val() === "" || $txtNumeroFacturaCE.val() == null) {
        //    app.message.error("Validación", "Debe ingresar el N° de Factura de los productos con stock");
        //    return false;
        //}

        if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03" || $TipoSolicitud.val() === "TSOL05") {
            if (parseInt($ContadorSeriesCS.val()) != parseInt($TotalSeriesCS.val())) {
                app.message.error("Validación", "Debe ingresar todas las series y/o lotes de los productos con stock antes de enviar a gestión.");
                return false;
            }

        }
        //else {
        //    if ($txtNumeroGuiaRemisionCE.val() === "" || $txtNumeroGuiaRemisionCE.val() == null) {
        //        app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos con stock");
        //        return false;
        //    }
        //}


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGestionVentaConStock";
            var obj = {
                CodigoSolicitud: $numeroSolicitud.val(),
                CodigoWorkFlow: $codigoWorkflow.val(),
                IdDespacho: $NumDespacho.val(),
                TipoVenta: $TipoSolicitud.val(),
                NumeroGuiaRemision: $txtNumeroGuiaRemisionCE.val(),
                NumeroFactura: $txtNumeroFactura.val(),
                FechaEntrega: $dateEntregaPedido.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGestionLogistica);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar a gestión?", "S&iacute;", "No", fnSi, null);

    }
    function $DS_btnCerrar_click() {
        $('#modalDetalleItemServicio').modal('hide');
    }

    function $btnEditarFacturaLogistica_click() {
        // $dateEntregaPedido.prop("disabled", false);
        // $opendateEntregaPedido.prop("disabled", false);
        $txtNumeroFactura.prop("disabled", false);
        $btnGuardarFacturaLogistica.show();
        $btnEditarFacturaLogistica.hide();
    }

    function $btnGuardarFacturaLogistica_click() {

        if ($txtNumeroFactura.val() === "" || $txtNumeroFactura.val() == null) {
            app.message.error("Validacion", "Debe ingresar un N° de Factura.");
            return;
        }

        var documento_factura = 0;
        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].CodigoTipoDocumento == "DVT03") { //Factura
                documento_factura = 1;
            }
        });

        if (documento_factura === 0) {
            app.message.error("Validación", "Debe adjuntar un documento de Factura.");
            return false;
        }


        var fnSi = function () {
            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "C",
                CodigoSolicitud: $numeroSolicitud.val(),
                NumeroFactura: $txtNumeroFactura.val()
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
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.consultaDetalleDespacho);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea guardar los datos de Facturacion?", "Si;", "No", fnSi, null);

    }

    function BuscarCostos() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCotDetCostos";
        var obj = {
            IdCotizacionDetalle: $hdnCodDetalle.val(),
            CodCosto: 'CXCD0002'
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function (data) {
            cargarTablaCostosUbi(data);
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se presenta errores al traer el listado de costos de instalación");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack);
    };

    function cargarTablaCostosUbi(data) {
        $NoRegCostosUbi.remove();

        var columns = [
            {
                data: "DescCosto",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescUbigeoDestino",
                render: function (data) {
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
                render: function (data) {
                    var seleccionar = "<a id='btnSeleccionarDestino' class='btn btn-info btn-xs' title='Seleccionar'><i class='fa fa-eye' aria-hidden='true'></i> Seleccionar</a>";
                    return '<center>' + seleccionar + '</center>'
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

        InicializarBotonSeleccionarDestino();

        app.llenarTabla($tblCostosUbi, data, columns, columnDefs, "#tblCostosUbi", rowCallback, null, filters);
    };
    function cerrarModalCostosItem() {
        $('#modalCostoItem').modal('hide');
    };

    function GuardarDespacho() {
        
        if ($txtZonaDepacho.val() == "" || $txtZonaDepacho.val().trim().length == 0 || $txtZonaDepacho.val() == null ) {
            app.message.error("Validación","Debe de seleccionar el lugar de despacho");
            return;
        };

        if ($txtDireccion.val() == "" || $txtDireccion.val().trim().length == 0 || $txtDireccion.val() == null) {
            app.message.error("Validación","Debe de seleccionar el lugar de despacho");
            return;
        };

        if ($txtNroPiso.val() == "" || $txtNroPiso.val().trim().length == 0 || $txtNroPiso.val() == null) {
            app.message.error("Validación", "Debe de ingresar el N° Piso");
            return;
        };

        var m = "POST";
        var url = "BandejaSolicitudesVentas/ActualizarNumeroSerie";
        var obj = {
            codDetalleDespacho: $codDetalleDespacho.val(),
            CodigoUbigeo: $hdnIdZonaDespacho.val(),
            Direccion: $txtDireccion.val(),
            NroPiso: $txtNroPiso.val(),
            Tipo: 'U'
        }
        var objParam = JSON.stringify(obj);

        var fnSi = function () {
            var fnDoneCallback = function () {

                var fnAceptar = function () {
                    var lista = $('#fila' + $codDetalleDespacho.val()).children().toArray();
                    lista.forEach(function (currentValue, index, arr) {
                        if (index == 4) {
                            lista[index].textContent = $txtZonaDepacho.val();
                        };
                    });

                    $modalSeries.modal('toggle');
                };

                app.message.success("Éxito", "Se grabó correctamente","Aceptar", fnAceptar);
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se presentó un error al guardar, por favor revisar");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallBack, null, null);
        }
        return app.message.confirm("Confirmación", "¿Desea guardar los datos ingresados?", "Si", "No", fnSi);
        

    };

    function InicializarBotonSeleccionarDestino() {
        $('#tblCostosUbi tbody').off('click', 'td #btnSeleccionarDestino');
        $('#tblCostosUbi tbody').on('click', 'td #btnSeleccionarDestino', function () {

            var tr = $(this).closest('tr');

            var row = $('#tblCostosUbi').dataTable().api().row(tr);

            var childTableHtml = '';

            var data = row.data();

            $txtZonaDepacho.val(data.DescUbigeoDestino);
            $txtDireccion.val(data.Direccion);
            $txtNroPiso.val(data.NroPiso);
            $hdnIdZonaDespacho.val(data.CodUbigeoDestino);

            CerrarModalSelCostos();
        });
    };

    function CerrarModalSelCostos() {
        $modalCostosUbi.modal('toggle');
    };

    return {
        download: download,
        eliminarDocumento: eliminarDocumento,
        eliminarDocTemp: eliminarDocTemp,
        eliminarObsTmp: eliminarObsTmp,
        verSeries: verSeries,
        editarSeries: editarSeries,
        editarItemServ: editarItemServ,
        DesasignarTecnico: DesasignarTecnico,
        CerrarModalSelCostos: CerrarModalSelCostos
    };
})(window.jQuery, window, document);