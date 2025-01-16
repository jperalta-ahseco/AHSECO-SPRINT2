var solicitud = (function ($, win, doc) {

    var $numeroSolicitud = $("#numeroSolicitud");
    var $nombreusuario = $('#nombreusuario');
    var $perfilnombre = $('#perfilnombre');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $estadoSol = $('#estadoSol');
    var $nomEmpresa = $("#nomEmpresa");
    var $idCliente = $("#idCliente");   
    var $hdnRUC = $('#hdnRUC');
    var $Asesor = $('#Asesor');
    var $btnAgregarDocumento = $('#btnAgregarDocumento');
    var $btnAgregarObservacion = $('#btnAgregarObservacion');
    var $contadordoc = $("#contadordoc");
    var $idWorkFlow = $("#idWorkFlow");
    var $idCotizacion = $("#idCotizacion");
    var $TipoSolicitud = $("#TipoSolicitud");

    var $RolVenta_Asesor = $("#RolVenta_Asesor");
    var $RolVenta_Gerente = $("#RolVenta_Gerente");
    var $RolVenta_Jefe = $("#RolVenta_Jefe");
    var $RolVenta_CoordVta = $("#RolVenta_CoordVta");
    var $RolVenta_ServTecnio = $("#RolVenta_ServTecnio");
    var $RolVenta_Gerente = $("#RolVenta_Gerente");
    var $RolVenta_Importacion = $("#RolVenta_Importacion");
    var $RolVenta_Costos = $("#RolVenta_Costos");
    var $RolVenta_Logistica = $("#RolVenta_Logistica");

    /*Modales*/
    var $modalObservacion = $('#modalObservacion'); 
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalRegistraProductos = $('#modalRegistraProductos');
    var $modalContactos = $('#modalContactos');
    var $tituloModalObservacion = $('#tituloModalObservacion');
    var $btnExportarLiquidacion = $("#btnExportarLiquidacion");
    var $modalDetalleCotizacionServicio = $('#modalDetalleCotizacionServicio');

    /*variables de los modales*/
    var $NoExisteRegObs = $('#NoExisteRegObs');
    var $tblObservaciones = $('#tblObservaciones');
    var $tblSeguimiento = $('#tblSeguimiento');
    var $NoExisteRegDoc = $('#NoExisteRegDoc');
    var $NoExisteRegSeg = $('#NoExisteRegSeg');
    var $tblDocumentosCargados = $('#tblDocumentosCargados');
    var $btnCargarDocumento = $('#btnCargarDocumento');
    var $hdnDocumentoCargadoId = $('#hdnDocumentoCargadoId');
    var $cmbTipoDocumentoCarga = $('#cmbTipoDocumentoCarga');
    var $cmbDocumentoCarga = $('#cmbDocumentoCarga');
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');
    var $lblNombreArchivo = $('#lblNombreArchivo');
    var $fileCargaDocumentoSustento = $('#fileCargaDocumentoSustento');
    var $fileCargaDocumentoSustentoGuia = $('#fileCargaDocumentoSustentoGuia');
    var $txtObservacion = $('#txtObservacion');
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');
    var $btnGuardarObservacionReq = $('#btnGuardarObservacionReq');
    var $btnAdjuntarDocumento = $("#btnAdjuntarDocumento");
    var $btnAdjuntarDocumentoGuia = $("#btnAdjuntarDocumentoGuia");
    var $tblHistorial = $("#tablaHistorial");
    var $txtCodCotizacion = $("#txtCodCotizacion");
    var $btnImprimirCotizacion = $("#btnImprimirCotizacion");
    var $btnGuiaBOSS = $("#btnGuiaBOSS");
    var $btnGuiaPedidoCS = $("#btnGuiaPedidoCS");
    var $btnGuiaPedidoSS = $("#btnGuiaPedidoSS");
    var $divDatosLicitacion = $("#divDatosLicitacion");
    var $txtNroProceso = $("#txtNroProceso");
    var $txtTipoProceso = $("#txtTipoProceso");
    var $idRolUsuario = $("#idRolUsuario");
    var $grpAuditoriaObservacion = $("#grpAuditoriaObservacion");
    var $btnAgregarServicios = $("#btnAgregarServicios");
    var $hdnDocumentoCargadoIdGuia = $("#hdnDocumentoCargadoIdGuia");
    var $cmbDocumentoCargaGuia = $("#cmbDocumentoCargaGuia");
    var $txtDescripcionDocumentoCargaGuia = $("#txtDescripcionDocumentoCargaGuia");
    var $cmbTipoDocumentoCargaGuia = $("#cmbTipoDocumentoCargaGuia");
    var $lblNombreArchivoGuia = $("#lblNombreArchivoGuia");
    var $modalCargaDocumentoGuia = $("#modalCargaDocumentoGuia");
    var $btnCargarDocumentoGuia = $("#btnCargarDocumentoGuia");
    var $ContadorDetalleHistorial = $("ContadorDetalleHistorial");

    /*Sección Solicitud*/
    var $btnEliminarSol = $('#btnEliminarSol');
    var $txtRuc = $('#txtRuc');
    var $btnEditarSol = $('#btnEditarSol');
    var $txtNomEmpresa = $('#txtNomEmpresa');
    var $txtAsesor = $('#txtAsesor');
    var $numeroSolicitud = $('#numeroSolicitud');
    var $openRegdateSolicitud = $('#openRegdateSolicitud');
    var $dateSolicitud = $('#dateSolicitud');
    var $cmbMedioContacto = $('#cmbMedioContacto');
    var $btnRegistrar = $('#btnRegistrar');
    var $cmbTipo = $('#cmbTipo');
    var $cmbFlujo = $('#cmbFlujo');
    var $cmbTipoVenta = $('#cmbTipoVenta');
    var $btnRegresar = $("#btnRegresar");
    var $cmbempresa = $("#cmbempresa");

    /*Sección Cotización*/
    var $cmbTipMoneda = $('#cmbTipMoneda');
    var $dateCotizacion = $('#dateCotizacion');
    var $txtVigencia = $('#txtVigencia');
    var $txtPlazoEntrega = $('#txtPlazoEntrega');
    var $cmbTipoPago = $('#cmbTipoPago');
    var $cmbGarantia = $('#cmbGarantia');
    var $txtObs = $('#txtObs');
    var $btnAprobarDscto = $("#btnAprobarDscto");
    var $NoRegMainProd = $('#NoRegMainProd');
    var $openRegdateCotizacion = $('#openRegdateCotizacion');
    var $btnRegistrarCotizacion = $('#btnRegistrarCotizacion');
    var $btnAgregarDetalle = $('#btnAgregarDetalle');
    var $BI_cmbFamilia = $('#BI_cmbFamilia');
    var $BI_txtCodProducto = $('#BI_txtCodProducto');
    var $BI_txtNomProducto = $('#BI_txtNomProducto');
    var $BI_cmbTipoMedida = $('#BI_cmbTipoMedida');
    var $BI_cmbMarca = $('#BI_cmbMarca');
    var $BI_cmbAlmacen = $("#BI_cmbAlmacen");
    var $hdnPorcentajeDscto = $("#hdnPorcentajeDscto");
    var $txtPorcentajeDscto = $("#txtPorcentajeDscto");
    var $DsctoRequiereAprobacion = $("#DsctoRequiereAprobacion");
    var $DsctoAprobado = $("#DsctoAprobado");
    var $DsctoRespondido = $("#DsctoRespondido");
    var $PermitirAprobarDscto = $("#PermitirAprobarDscto");
    var $modalAprobDscto = $("#modalAprobDscto");
    var $AD_btnGuardarAprobDscto = $("#AD_btnGuardarAprobDscto");
    var $AD_radRpta_Si = $("#AD_radRpta_Si");
    var $AD_radRpta_No = $("#AD_radRpta_No");
    var $AD_txtComentarios = $("#AD_txtComentarios");
    var $btnVerComentarioDscto = $("#btnVerComentarioDscto");
    var $btnAprobarCotizacion = $("#btnAprobarCotizacion");
    var $PermitirEditarCotDetItem = $("#PermitirEditarCotDetItem");
    
    /*Ver Historial de Cotizacion */
    var $modalVerHistorialCotizacion = $("#modalVerHistorialCotizacion");
    var $txtHistNomContacto = $("#txtHistNomContacto");
    var $txtHistFechaCot = $("#txtHistFechaCot");
    var $txtHistVigenciaCot = $("#txtHistVigenciaCot");
    var $txtHistAreaContacto = $("#txtHistAreaContacto");
    var $txtHistPlazoEntrega = $("#txtHistPlazoEntrega");
    var $txtHistGarantia = $("#txtHistGarantia");
    var $txtHistTelContacto = $("#txtHistTelContacto");
    var $txtHistFormaPago = $("#txtHistFormaPago");
    var $txtHistObservacion = $("#txtHistObservacion");
    var $txtHistCorreoContacto = $("#txtHistCorreoContacto");
    var $txtHistMoneda = $("#txtHistMoneda");
    var $tablaHistorialDetalle = $("#tablaHistorialDetalle");
    var $NoRegHistDetalle = $("#NoRegHistDetalle");
    var $txtHistTotal = $("#txtHistTotal");
    var $txtHistIGV = $("#txtHistIGV");
    var $txtHistSubtotal = $("#txtHistSubtotal");
    var $txtHistVendedor = $("#txtHistVendedor");
    var $txtHistRUC = $("#txtHistRUC");
    var $txtHistRazonSocial = $("#txtHistRazonSocial");
    var $tituloModalHistorial = $("#tituloModalHistorial");
    var $btnCerrarHistorial = $("#btnCerrarHistorial");
    var $FlagStock = $("#FlagStock");

    /*Servicios*/
    var $DS_hdnOpcGrillaItems = $("#DS_hdnOpcGrillaItems");
    var $cmbTipoServicio = $("#cmbTipoServicio");
    var $txtBusqEquipo = $("#txtBusqEquipo");
    var $txtBusqModelo = $("#txtBusqModelo");
    var $txtBusqMarca = $("#txtBusqMarca");
    var $tblItemsServicios = $("#tblItemsServicios");
    var $tblCotDetServiciosAgregados = $("#tblCotDetServiciosAgregados");
    var $DC_btnCerrarServ = $("#DC_btnCerrarServ");
    var $DC_btnGuardarServ = $("#DC_btnGuardarServ");
    var $DS_txtCodigo = $("#DS_txtCodigo");
    var $DS_txtDescripcion = $("#DS_txtDescripcion");
    var $DS_txtCantidad = $("#DS_txtCantidad");
    var $DS_txtPrecio = $("#DS_txtPrecio");
    var $DS_txtTotalVenta = $("#DS_txtTotalVenta");
    var $DS_btnCerrar = $("#DS_btnCerrar");
    var $DS_tblServiciosDetalle = $("#DS_tblServiciosDetalle");
    var $dateProgramacionServ = $("#dateProgramacionServ");
    var $dateProg = $("#dateProg");
    var $btnGuardarProg = $("#btnGuardarProg");
    var $btnRegistrarFechaProg = $("#btnRegistrarFechaProg");
    var $hdnIdZonaDespacho = $("#hdnIdZonaDespacho");
    var $txtZonaDepacho = $("#txtZonaDepacho");
    var $searchZonaDespacho = $("#searchZonaDespacho");
    var $txtDireccion = $("#txtDireccion");
    var $txtGuia = $("#txtGuia");
    var $lblNombreArchivoDespacho = $("#lblNombreArchivoDespacho");

    //var detalleServicios = [];
    var contadorDetalle = 0;
    var $modalDetalleServicio = $("#modalDetalleServicio");
    var $btnGuardarDetalleServicio = $("#btnGuardarDetalleServicio");
    var $btnActualizarDetalleServicio = $("#btnActualizarDetalleServicio");
    var $hdnIdDetalleServicio = $("#hdnIdDetalleServicio");
    var $txtDetalleServicio = $("#txtDetalleServicio");
    var $btnCerrarDetalleServicio = $("#btnCerrarDetalleServicio");
    var $DS_hdnIdCotDetServ = $("#DS_hdnIdCotDetServ");
    var $btnAgregarDetServ = $("#btnAgregarDetServ");
    var $DS_btnGuardar = $("#DS_btnGuardar");

    /*Seccion Contacto*/
    var $btnAñadir = $('#btnAñadir');
    var $agregarContacto = $('#agregarContacto');
    var $tblContactos = $('#tblContactos');
    var $modalContactos = $('#modalContactos');
    var $txtTelefono = $('#txtTelefono');
    var $txtCorreo = $('#txtCorreo');
    var $txtAreaContacto = $('#txtAreaContacto');
    var $searchContacto = $('#searchContacto');
    var $nombreContacto = $('#nombreContacto');
    var $txtCodContacto = $('#txtCodContacto');
    var $btnLimpiarTodo = $('#btnLimpiarTodo');
    var $contenidoTabla = $('#contenidoTabla');
    var $btnBuscarContactos = $('#btnBuscarContactos');
    var $txtContacto = $('#txtContacto');
    var $txtConsultaEstablecimiento = $('#txtConsultaEstablecimiento');
    var $btnBuscarItemsServicio = $("#btnBuscarItemsServicio");

    /**Modal de Productos*/
    var $NoRegSelectProduct = $('#NoRegSelectProduct');
    var $btnGrabarDetalle = $('#btnGrabarDetalle');
    var $cmbFamilia = $('#cmbFamilia');
    var $cmbTipoMedida = $('#cmbTipoMedida');
    var $cmbMarca = $('#cmbMarca');
    var $tblConsultaProductos = $('#tblConsultaProductos');
    var $btnAñadirProductos = $('#btnAñadirProductos');
    var $btnBuscar = $('#btnBuscar');
    var $btnCerrarRegistraProd = $('#btnCerrarRegistraProd');
    var $btnHistorial = $("#btnHistorial");
    var $btnBuscarHistorial = $("#btnBuscarHistorial");

    var $ValidaBtnObservacion = $("#ValidaBtnObservacion");

    /** Seccion de Despacho*/
    var $dateEntregaPedido = $("#dateEntregaPedido");
    var $dateOrdenCompra = $("#dateOrdenCompra");
    var $openRegdateOrdenCompra = $("#openRegdateOrdenCompra");
    var $txtFechaEntregaMax = $("#txtFechaEntregaMax");
    var $txtNroOrdenCompra = $("#txtNroOrdenCompra");
    var $btnGuardarGestion = $("#btnGuardarGestion");
    var $NoRegSeries = $("#NoRegSeries");
    var $tblSeriesCS = $("#tblSeriesCS");
    var $opendateEntregaPedidoCE = $("#opendateEntregaPedidoCE");
    var $modalSeries = $("#modalSeries");
    var $txtCodigoProductoSerie = $("#txtCodigoProductoSerie");
    var $txtMarcaSerie = $("#txtMarcaSerie");
    var $txtDescripcion = $("#txtDescripcion");
    var $txtSerie = $("#txtSerie");
    var $codDetalleDespacho = $("#codDetalleDespacho");
    var $dateEntregaPedidoCE = $("#dateEntregaPedidoCE");
    var $txtNumeroFacturaCE = $("#txtNumeroFacturaCE");
    var $txtNumeroGuiaRemisionCE = $("#txtNumeroGuiaRemisionCE");
    var $btnRegistrarSerie = $("#btnRegistrarSerie");
    var $btnActualizarGestion = $("#btnActualizarGestion");
    var $btnEditarGestion = $("#btnEditarGestion");
    var $btnEnviarGuiaCS = $("#btnEnviarGuiaCS");
    var $btnEnviarGuiaSS = $("#btnEnviarGuiaSS");
    var $btnGuardarGestionLogistica = $("#btnGuardarGestionLogistica");
    var $btnEnviarGestionDespacho = $("#btnEnviarGestionDespacho");
    var $btnEditarGestionLogistica = $("#btnEditarGestionLogistica");
    var $ContadorSeriesCS = $("#ContadorSeriesCS");
    var $ContadorSeriesSS = $("#ContadorSeriesSS");
    var $TotalSeriesCS = $("#TotalSeriesCS");
    var $TotalSeriesSS = $("#TotalSeriesSS");
    var $btnFinalizarVenta = $("#btnFinalizarVenta");
    var $btnEnviarGuiaBOSS = $("#btnEnviarGuiaBOSS");
    var $btnObservarGestion = $("#btnObservarGestionSS");
    var $btnAprobarGestion = $("#btnAprobarGestionSS");
    var $dateIngresoAlmacenSE = $("#dateIngresoAlmacenSE");
    var $btnGuardarImportacion = $("#btnGuardarImportacion");
    var $txtCodigoPedidoSE = $("#txtCodigoPedidoSE");
    var $opendateIngresoAlmacenSE = $("#opendateIngresoAlmacenSE");
    var $CodStock = $("#CodStock");
    var $btnGuardarGestionLogisticaSE = $("#btnGuardarGestionLogisticaSE");
    var $dateEntregaPedidoSE = $("#dateEntregaPedidoSE");
    var $opendateEntregaPedidoSE = $("#opendateEntregaPedidoSE");
    var $txtNumeroFactura = $("#txtNumeroFactura");
    var $txtNumeroGuiaRemisionSE = $("#txtNumeroGuiaRemisionSE");
    var $btnEditarGestionLogisticaSE = $("#btnEditarGestionLogisticaSE");
    var $tblSeriesSS = $("#tblSeriesSS");
    var $NoRegSeriesSS = $("#NoRegSeriesSS");
    var $btnEnviarServicio = $("#btnEnviarServicio");
    var $dateFactura = $("#dateFactura");
    var $opendateFactura = $("#opendateFactura");
    var $txtNumeroFacturaServ = $("#txtNumeroFacturaServ");
    var $EnvioServicio = $("#EnvioServicio");
    var $btnGuardarFactura = $("#btnGuardarFactura");
    var $btnEnviarGestionDespachoSE = $("#btnEnviarGestionDespachoSE");
    var $hdnObservacionId = $("#hdnObservacionId");
    var $btnCloseCargar = $("#btnCloseCargar");
    var $btnModalClose = $("#btnModalClose");
    var $txtCodUbicacionServ = $("#txtCodUbicacionServ");
    var $btnGuardarUbigeoSel = $("#btnGuardarUbigeoSel");
    var $txtTelefonoServ = $("#txtTelefonoServ");
    var $txtCorreoServ = $("#txtCorreoServ");


    /*Tecnicos:*/
    var $btnBuscarTecnicos = $('#btnBuscarTecnicos');
    var $btnAñadirTecnico = $('#btnAñadirTecnico');
    var $tblTecnicos = $('#tblTecnicos');
    var $cmbTipDocTecnico = $('#cmbTipDocTecnico');
    var $txtNumDocTec = $('#txtNumDocTec');
    var $cmbTipoEmpleado = $('#cmbTipoEmpleado');
    var $txtNombres = $('#txtNombres');
    var $txtApePat = $('#txtApePat');
    var $txtApeMat = $('#txtApeMat');
    var $btnBuscarTecnico = $('#btnBuscarTecnico');
    var $cmbTipoCredencial = $("#cmbTipoCredencial");
    var $txtTipoTecnico = $("#txtTipoTecnico");
    var $txtNombreTecnico = $("#txtNombreTecnico");
    var $txtApellidoPaternoTec = $("#txtApellidoPaternoTec");
    var $txtApellidoMaternoTec = $("#txtApellidoMaternoTec");
    var $hdnTipoEmpleado = $("#hdnTipoEmpleado");
    var $hdnTipoDoc = $("#hdnTipoDoc");
    var $txtNumDocumento = $("#txtNumDocumento");
    var $txtZona = $("#txtZona");
    var $hdnIdZona = $("#hdnIdZona");
    var $searchZona = $("#searchZona");
    var $hdnIdTecnico = $("#hdnIdTecnico");
    var $cmbDepartamentoServ = $('#cmbDepartamentoServ');
    var $cmbProvinciaServ = $('#cmbProvinciaServ');
    var $cmbDistritoServ = $('#cmbDistritoServ');
    var $modalZonaTecSol = $('#modalZonaTecSol');
    var $btnRegistrarTecnicoExterno = $('#btnRegistrarTecnicoExterno');
    var $tblMainTecnicos = $("#tblMainTecnicos");
    var $modalBusquedaTecnico = $("#modalBusquedaTecnico");
    var $NoExisteTec = $("#NoExisteTec");
    var $añadirTecnico = $("#añadirTecnico");
    var $btnGuardarUbigeoDespachoSel = $("#btnGuardarUbigeoDespachoSel");
    var $btnRegistrarDespacho = $("#btnRegistrarDespacho");
    var $btnRegistrarDespachoSE = $("#btnRegistrarDespachoSE");
    var $rowSerieGuia = $("#rowSerieGuia");
    var $rowTablaSeriesGuias = $("#rowTablaSeriesGuias");
    var $tblSeriesGuia = $("#tblSeriesGuia");
    var $codigosIds = $("#codigosIds");
    var $ListaSeries = $("#ListaSeries");
    var $ListaGuias = $("#ListaGuias");
    var $TipoReg = $("#TipoReg");
    var $RegStock = $("#RegStock");
    var $btnAdjuntarDocumentoDespacho = $("#btnAdjuntarDocumentoDespacho");
    var $fileCargaDocumentoSustentoDespacho = $('#fileCargaDocumentoSustentoDespacho');
    var $ArchivoBase64 = $("#ArchivoBase64");
    var $btnDescargarGuiaRemision = $("#btnDescargarGuiaRemision");
    var $CodigoDocumentoDespacho = $("#CodigoDocumentoDespacho");
    var $btnCargarOtroDocumento = $("#btnCargarOtroDocumento");
    var $FlagCargaDocumentoDespacho = $("#FlagCargaDocumentoDespacho");
    var $btnEditarFacturaLogistica = $("#btnEditarFacturaLogistica");
    var $btnGuardarFacturaLogistica = $("#btnGuardarFacturaLogistica");
    var $opendateEntregaPedido = $("#opendateEntregaPedido");
    var $txtNroContrato = $("#txtNroContrato");
    var $dateFechaContrato = $("#dateFechaContrato");
    var $openRegdateFechaContrato = $("#openRegdateFechaContrato");

    var tecnicosAsig = [];

    var mensajes = {
        consultaContactos: "Consultando contactos, por favor espere....",
        consultandoFlujos: "Consultando tipos de flujos, por favor espere....",
        consultandoTiposdeSol: "Consultando tipos de solicitud, por favor espere....",
        consultandoMetodosContacto: "Consultando métodos de contacto, por favor espere....",
        consultandoMonedas: "Consultando tipos de moneda, por favor espere....",
        consultandoGarantias: "Consultando garantias, por favor espere....",
        registraSolicitud: "Realizando el registro de la solicitud, por favor espere...",
        consultandoDetalleSolicitud: "Consultano el detalle de la solicitud, por favor espere....",
        guardandoObservacion: "Realizando el registro la observación, por favor espere....",
        BuscandoPrecios: "Buscando Precios, por favor espere....",
        BuscandoHistorial: "Buscando Historial de cotizaciones, por favor espere....",
        GenerarCotizacion: "Realizando la generación de la cotización, por favor espere...",
        GenerarGuiaPedidos: "Generando la guía de pedidos, por favor espere...",
        GenerarBO: "Generando BO, por favor espere...",
        RegistrarGestionVenta: "Realizando registro de orden de compra, por favor espere...",
        consultaDetalleDespacho: "Consultando detalle de despacho, por favor espere...",
        actualizarSerie: "Actualizando el número de serie, por favor espere...",
        EnvioGuiaPedido: "Enviando Guia de Pedido, por favor espere...",
        EnvioGestionLogistica: "Enviando la gestión, por favor espere...",
        FinalizandoVenta: "Finalizando la venta, por favor espere...",
        EnvioGuiaPedidoBO: "Enviando Guia de BO, por favor espere...",
        AprobarImportacion: "Aprobando Importación, por favor espere...",
        ActualizarImportacion: "Actualizando Importación, por favor espere...",
        ObteniendoTipoServicio: "Obteniendo tipo de servicios, por favor espere...",
        obteniendoServicio: "Obteniendo resultados de la busqueda, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere..."
    };

    $(Initialize);
    
    let detalleCotizacion = [];
    let adjuntos = [];
    let codigoInit = "";
    function Initialize() {
       
        solicitud.contadorObservaciones = 0;
        solicitud.contactos = [];
        solicitud.observaciones = [];
        solicitud.detalleSolicitud = [];
        solicitud.itemProducto = [];
        solicitud.mainProducto = [];
        solicitud.itemCalibra = [];
        solicitud.itemInstall = [];
        solicitud.itemMant = [];
        solicitud.itemTransporte = [];
        solicitud.nuevoContacto = false;
        $openRegdateCotizacion.click($openRegdateCotizacionClick);

        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });


        $dateCotizacion.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateOrdenCompra.datepicker({
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

        $dateIngresoAlmacenSE.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateEntregaPedidoSE.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateFactura.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateProg.datepicker({
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

        $dateFechaContrato.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateSolicitud.val(hoy());
        if ($dateCotizacion.val() == "" || $dateCotizacion.val() == null) {
            $dateCotizacion.val(hoy());
        };

        //$dateOrdenCompra.val(hoy());

        $dateEntregaPedidoCE.val(hoy());
        $dateIngresoAlmacenSE.val(hoy());
        $dateEntregaPedidoSE.val(hoy());
        $dateEntregaPedido.val(hoy());
        //$dateFechaContrato.val(hoy());
        
        $dateFactura.val(hoy());
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $fileCargaDocumentoSustento.click($fileCargaDocumentoSustento_change);
        $fileCargaDocumentoSustentoGuia.on("change", $fileCargaDocumentoSustentoGuia_change);
        $fileCargaDocumentoSustentoGuia.click($fileCargaDocumentoSustentoGuia_change);
        $btnEliminarSol.click(btnEliminarSolClick);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnRegistrarCotizacion.click(registrarCotizacion);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnAgregarObservacion.click($modalObservacionClick);
        $openRegdateSolicitud.click($openRegdateSolicitudClick);
        $openRegdateOrdenCompra.click($openRegdateOrdenCompraClick)
        $btnBuscarContactos.click($btnBuscarContactosClick);
        $btnRegresar.click(btnRegresarClick);
        $searchContacto.click($btnSearchContactoClick);
        $agregarContacto.click($agregarContactoClick);
        $btnRegistrar.click($btnRegistrarClick);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $btnCargarDocumentoGuia.click($btnCargarDocumentoGuia_click);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnAdjuntarDocumentoGuia.click($adjuntarDocumentoGuia_click)
        $btnHistorial.click($btnHistorial_click);
        $btnBuscarHistorial.click($btnHistorial_click);
        $btnImprimirCotizacion.click($btnImprimirCotizacion_click);
        $btnAgregarDetalle.click($btnAgregarDetalle_click);
        $btnGuiaBOSS.click($btnGuiaBO_click);
        $btnGuiaPedidoCS.click($btnGuiaPedidoCS_click);
        $btnGuiaPedidoSS.click($btnGuiaPedidoSS_click);
        $btnGuardarGestion.click($btnGuardarGestion_click);
        $cmbTipoVenta.on("change", changeTipoVenta);
        $dateOrdenCompra.on("change", $dateOrdenCompra_change);
        $btnRegistrarSerie.click($btnRegistrarSerie_click);
        $btnEditarGestion.click($btnEditarGestion_click);
        $btnActualizarGestion.click($btnActualizarGestion_click);
        $btnEnviarGuiaCS.click($btnEnviarGuiaCS_click);
        $btnEnviarGuiaSS.click($btnEnviarGuiaSS_click)
        $btnGuardarGestionLogistica.click($btnGuardarGestionLogistica_click);
        $btnEnviarGestionDespacho.click($btnEnviarGestionDespacho_click);
        $btnEditarGestionLogistica.click($btnEditarGestionLogistica_click);
        $btnFinalizarVenta.click($btnFinalizarVenta_click);
        $btnEnviarGuiaBOSS.click($btnEnviarGuiaBO_click);
        $btnObservarGestion.click($btnObservarGestion_click);
        $btnAprobarGestion.click($btnAprobarGestion_click);
        $btnGuardarImportacion.click($btnGuardarImportacion_click);
        $btnGuardarGestionLogisticaSE.click($btnGuardarGestionLogisticaSE_click);
        $btnEditarGestionLogisticaSE.click($btnEditarGestionLogisticaSE_click);
        $btnAgregarServicios.click($btnAgregarServicios_click);
        $btnBuscarItemsServicio.click($btnBuscarItemsServicio_click);
        $DC_btnCerrarServ.click(cerrarModalDetCotServ);
        $DC_btnGuardarServ.click(grabarDatosCotDetServ);
        $btnCerrarHistorial.click($btnCerrarHistorial_click);
        $btnExportarLiquidacion.click($btnExportarLiquidacion_click);
        $DS_btnCerrar.click($DS_btnCerrar_click);
        $btnCerrarDetalleServicio.click($btnCerrarDetalleServicio_click);
        $btnActualizarDetalleServicio.click($btnActualizarDetalleServicio_click);
        $btnAgregarDetServ.click($btnAgregarDetServ_click);
        $btnGuardarDetalleServicio.click($btnGuardarDetalleServicio_click);
        $DS_btnGuardar.click($DS_btnGuardar_click);
        $btnCloseCargar.click($btnCloseCargar_click);
        $btnModalClose.click($btnModalClose_click);
        cargarGrillaCotDetServicios("2");
        IniciarBotonSeleccionarTecnico();
        cargaCombos();
        if ($DsctoRequiereAprobacion.val() == "S" && $DsctoRespondido.val() == "N" && $PermitirAprobarDscto.val() == "S") {
            $modalAprobDscto.modal('show');
        }
        $AD_btnGuardarAprobDscto.click(guardarAprobDscto);
        $btnVerComentarioDscto.click(verComentarioDscto);
        $btnAprobarCotizacion.click(aprobarCotizacion);
        $btnGuardarUbigeoSel.click(seleccionarUbi);
        $btnGuardarUbigeoDespachoSel.click(seleccionarUbiDespacho);
        $btnBuscarTecnicos.click(BuscarTecnicosClick);
        $btnBuscarTecnico.click(BuscarTecnicos);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        $searchZona.click(logicUbigeoTecnico);
        $searchZonaDespacho.click(logicUbigeoDespacho);
        $btnRegistrarTecnicoExterno.click(CrearTecnico3ro_a_Producto);
        $btnEnviarServicio.click(btnEnviarServicioClick);
        $btnGuardarFactura.click($btnGuardarFactura_click);
        $btnGuardarProg.click($btnGuardarProg_click);
        $btnRegistrarFechaProg.click($btnRegistrarFechaProg_click);
        $btnEnviarGestionDespachoSE.click($btnEnviarGestionDespachoSE_click);
        $btnRegistrarDespacho.click($btnRegistrarDespacho_click);
        $btnRegistrarDespachoSE.click($btnRegistrarDespachoSE_click);
        $btnAdjuntarDocumentoDespacho.click($AdjuntarDocumentoDespacho_click)
        $fileCargaDocumentoSustentoDespacho.on("change", $fileCargaDocumentoSustentoDespacho_change);
        $fileCargaDocumentoSustentoDespacho.click($fileCargaDocumentoSustentoDespacho_change);
        $btnDescargarGuiaRemision.click($btnDescargarGuiaRemision_click);
        $btnCargarOtroDocumento.click($btnCargarOtroDocumento_click);
        $btnEditarFacturaLogistica.click($btnEditarFacturaLogistica_click);
        $btnGuardarFacturaLogistica.click($btnGuardarFacturaLogistica_click);
    };

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

    function $btnEditarFacturaLogistica_click() {
       // $dateEntregaPedido.prop("disabled", false);
       // $opendateEntregaPedido.prop("disabled", false);
        $txtNumeroFactura.prop("disabled", false);
        $btnGuardarFacturaLogistica.show();
        $btnEditarFacturaLogistica.hide();
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
            if (codUbigeo != "" || codUbigeo != null) {
                $searchZonaDespacho.css("visibility", "hidden");
            }
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            searchZonaDespacho
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);
            $txtDireccion.prop("disabled", false);
            if (direccion != "" || direccion != null) {
                $txtDireccion.prop("disabled", true);
            }

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


    function $btnCargarOtroDocumento_click() {
        $("#rowTablaSeriesDescarga").hide();
        $("#rowTablaSeriesCargar").show();
        $lblNombreArchivoDespacho.text("");
        $FlagCargaDocumentoDespacho.val("1");
    }

    function $btnDescargarGuiaRemision_click() {
        download($CodigoDocumentoDespacho.val());
    }

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

    function $AdjuntarDocumentoDespacho_click() {
        $lblNombreArchivoDespacho.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustentoDespacho').click();
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
            if (codUbigeo != "" || codUbigeo != null) {
                $searchZonaDespacho.css("visibility", "hidden");
            }
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            searchZonaDespacho
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);
            $txtDireccion.prop("disabled", false);
            if (direccion != "" || direccion != null) {
                $txtDireccion.prop("disabled", true);
            }

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


    function logicUbigeoDespacho() {
        $btnGuardarUbigeoDespachoSel.show();
        $btnGuardarUbigeoSel.hide();
        getDepartamentosServ();
        $cmbProvinciaServ.val('').trigger("change");
        $cmbDistritoServ.val('').trigger("change");
        $cmbProvinciaServ.prop("disabled", true);
        $cmbDistritoServ.prop("disabled", true);
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
    function $btnCloseCargar_click() {
        
    }

    function $btnModalClose_click() {
        
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
                FechaEntrega: $dateProg.val()
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
        return app.message.confirm("Ventas", "¿Está seguro que desea guardar la fecha de programación?", "S&iacute;", "No", fnSi, null);

    }

    function $btnGuardarProg_click() {
        $dateProg.val(hoy());
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
                CodigoWorkFlow: $idWorkFlow.val(),
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
            if (adjuntos[index].CodigoTipoDocumento == "DVT05") {
                documento_guiaManuscrita = 1;
            }
        });

        if (documento_guiaManuscrita === 0 && documento_constanciaServicio === 0 && 
            documento_actaConformidad === 0) {
            app.message.error("Validación", "Debe adjuntar por lo menos uno de estos documentos para enviar a Facturación: (Acta de Conformidad o Constancia de Servicio Técnico o Guía Manuscrita).");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarServicios?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val();
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

    function cargarTablaMainTecnicos(tecnicos) {

        var data = {}
        data.Result = [];
        data.Result = tecnicos;

        if (tecnicos.length > 0) {
            $NoExisteTec.hide();
        }

        if ($idRolUsuario.val() === "SGI_VENTA_COORDINASERV" || 
            $idRolUsuario.val() === "SGI_VENTA_COORDINAATC") {
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
                    if ($EnvioServicio.val() == 0 && ($idRolUsuario.val() === "SGI_VENTA_ASESOR" || 
                        $idRolUsuario.val() === "SGI_VENTA_COORDINASERV" ||
                        $idRolUsuario.val() === "SGI_VENTA_COORDINAATC")) {
                        retirar = '<a id="btnDesasignarTecnico" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:solicitud.DesasignarTecnico(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>';
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

    function IniciarBotonSeleccionarTecnico() {
        $('#tblTecnicos tbody').on('click', 'td #btnSeleccionarTecnico', function () {

            
            //limpiarDetalleInfoAdcional()
            var tr = $(this).closest('tr');
            var row = $('#tblTecnicos').dataTable().api().row(tr);
            var info = row.data();
            asignarTecnico(info)
        });
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
    }

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

    function cargarGrillaCotDetServicios(opc) {
        
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetServicios";

        var objFiltros = {
            opcGrillaItems: opc//DS_hdnOpcGrillaItems.val()
        };

        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            if (opc == "1") {
                cargarTablaServiciosAgregados(data);
            }
            else {
                cargarTablaDetCotServicios(data);
                cargarTablaServiciosAgregados(data);
            }
            $('#modalDetalleItemServicio').modal('hide');
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    }

    //ACTUALIZA los datos del SERVICIO agregado a la COTIZACION DETALLE
    function $DS_btnGuardar_click() {

        if ($DS_txtCantidad.val() === "0") {
            app.message.error("Validación", "Debe ingresar un número mayor a cero en cantidad del servicio.");
            return false;
        };

        if ($DS_txtPrecio.val() === "0.00" || $DS_txtPrecio.val() === "") {
            app.message.error("Validación", "Debe ingresar un número mayor a cero en el precio del servicio.");
            return false;
        };

        if ($DS_txtTotalVenta.val() === "0.00" || $DS_txtTotalVenta.val() === "") {
            app.message.error("Validación", "Debe ingresar un número mayor a cero en el precio de venta total.");
            return false;
        };

        method = "POST";
        url = "BandejaSolicitudesVentas/ActualizarServ";

        var objFiltros = {
            datos: {
            Id: $DS_hdnIdCotDetServ.val(),
            Cantidad: $DS_txtCantidad.val(),
            VentaUnitaria: parseFloat(($DS_txtPrecio.val()).replaceAll(",", "")),
            VentaTotalSinIGV:parseFloat(($DS_txtTotalVenta.val()).replaceAll(",", "")),
            },
            opcGrillaItems: $DS_hdnOpcGrillaItems.val()
        };

        var objParam = JSON.stringify(objFiltros);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                if ($DS_hdnOpcGrillaItems.val() == "1") {
                    cargarTablaServiciosAgregados(data);
                }
                else {
                    cargarTablaDetCotServicios(data);
                    cargarTablaServiciosAgregados(data);
                }
                $('#modalDetalleItemServicio').modal('hide');
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }

        return app.message.confirm("Actualización", "¿Está seguro de actualizar los datos?", "Si", "No", fnSi, null);
    }

    //REGISTRA la actividad (detalle de servicio) de la COTIZACION DETALLE (Servicio)
    function $btnGuardarDetalleServicio_click() {

        if ($txtDetalleServicio.val() === "") {
            app.message.error("Validación", "Debe ingresar una descripción del servicio.");
            return false;
        }

        method = "POST";
        url = "BandejaSolicitudesVentas/RegistrarDetServ";
        objDetalle = {
            IdCotDetalle: $DS_hdnIdCotDetServ.val(),
            Descripcion: $txtDetalleServicio.val(),
            opcGrillaItems: $DS_hdnOpcGrillaItems.val()
        }
        objParam = JSON.stringify(objDetalle);
        var fnSi = function () {
            var fnDoneCallback = function (data) {
                cargarTablaDetalleServicios(data.Result);
                $modalDetalleServicio.modal('hide');
            }
            var fnFailCallback = function () {

            };
            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);
        }
        return app.message.confirm("Confimación", "¿Está seguro de agregar el detalle?", "Si", "No", fnSi, null);
    }

    function $btnAgregarDetServ_click() {
        $btnGuardarDetalleServicio.css('display', '');
        $btnActualizarDetalleServicio.css('display', 'none');
        $txtDetalleServicio.val("");
        $modalDetalleServicio.modal('show');
    }

    //ACTUALIZAR la actividad (detalle de servicio) de la COTIZACION DETALLE (Servicio)
    function $btnActualizarDetalleServicio_click() {

        if ($txtDetalleServicio.val() === "") {
            app.message.error("Validación", "Debe ingresar una descripción del servicio.");
            return false;
        }

        method = "POST";
        url = "BandejaSolicitudesVentas/ActualizarDetServ";
        objDetalle = {
            IdCotDetalle: $DS_hdnIdCotDetServ.val(),
            CodServDet: $hdnIdDetalleServicio.val(),
            Descripcion: $txtDetalleServicio.val(),
            opcGrillaItems: $DS_hdnOpcGrillaItems.val()
        }
        objParam = JSON.stringify(objDetalle);
        var fnSi = function () {
            var fnDoneCallback = function (data) {
                cargarTablaDetalleServicios(data.Result);
                $modalDetalleServicio.modal('hide');
            }
            var fnFailCallback = function () {

            };
            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);
        }
        return app.message.confirm("Confimación", "¿Está seguro de actualizar el detalle?", "Si", "No", fnSi, null);
    }

    function $btnCerrarDetalleServicio_click() {
        $modalDetalleServicio.modal('hide');
    }

    function $DS_btnCerrar_click() {
        $('#modalDetalleItemServicio').modal('hide');
    }

    function $btnExportarLiquidacion_click(e) {

        method = 'POST';
        url = 'BandejaSolicitudesVentas/GenerarHojaLiquidacion';
        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IdSolicitud: $numeroSolicitud.val(),
            DescGarantia: $("#select2-" + $cmbGarantia.attr("id") + "-container").attr("title"),
            DescFormaPago: $("#select2-" + $cmbTipoPago.attr("id") + "-container").attr("title"),
            DescMoneda: $("#select2-" + $cmbTipMoneda.attr("id") + "-container").attr("title")
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFile?nombreDoc=" + data.Archivo);            
        }
        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarCotizacion);
    }

    function $btnCerrarHistorial_click() {
        $modalVerHistorialCotizacion.modal("hide");
    }

    function verHistorial(codCotizacion) {

        method = 'POST';
        url = 'BandejaHistorialCotizacion/ConsultaCotizacionCliente?codCotizacion=' + codCotizacion;
        objParam = '';
        var fnDoneCallBack = function (data) {
            $modalVerHistorialCotizacion.modal("show");
            
            //Se pinta el detalle del historial:
            $tituloModalHistorial.html("N° Cotización: " + data.Result.DocumentoCabecera.NumeroCotizacion);
            $txtHistNomContacto.val(data.Result.DocumentoCabecera.NombreContacto);
            $txtHistFechaCot.val(data.Result.DocumentoCabecera.Fecha);
            $txtHistVigenciaCot.val(data.Result.DocumentoCabecera.Vigencia);
            $txtHistAreaContacto.val(data.Result.DocumentoCabecera.AreaContacto);
            $txtHistPlazoEntrega.val(data.Result.DocumentoCabecera.PlazoEntrega + " días");
            $txtHistGarantia.val(data.Result.DocumentoCabecera.Garantia);
            $txtHistTelContacto.val(data.Result.DocumentoCabecera.TelefonoContacto);
            $txtHistFormaPago.val(data.Result.DocumentoCabecera.FormaPago);
            $txtHistObservacion.val(data.Result.DocumentoCabecera.Observacion);
            $txtHistCorreoContacto.val(data.Result.DocumentoCabecera.EmailContacto);
            $txtHistMoneda.val(data.Result.DocumentoCabecera.Moneda);
            $txtHistVendedor.val(data.Result.DocumentoCabecera.NombreVendedor);
            $txtHistRUC.val(data.Result.DocumentoCabecera.Ruc);
            $txtHistRazonSocial.val(data.Result.DocumentoCabecera.RazonSocial);
            $ContadorDetalleHistorial.val(data.Result.DocumentoDetalle.length);

            //Si tiene registros se elimina la primera fila
            if (data.Result.DocumentoDetalle.length > 0) {
                $NoRegHistDetalle.hide();
            } else {
                $NoRegHistDetalle.show();
            }

            //Eliminamos los registros del detalle:
            $("#tablaHistorialDetalle .trHist").remove();


            for (i = 0; i < data.Result.DocumentoDetalle.length; i++) {

                var descripcion = data.Result.DocumentoDetalle[i].Descripcion.replace("\\r\\n", "<br>");

                var nuevoTr = "<tr bgcolor='d0f2f7' class='trHist'>" +
                    "<th>" + data.Result.DocumentoDetalle[i].NumeroItem + "</th>" +
                    "<th>" + data.Result.DocumentoDetalle[i].Catalogo + "</th>" +
                    "<th>" + descripcion + "</th>" +
                    "<th>" + data.Result.DocumentoDetalle[i].Unidad + "</th>" +
                    "<th>" + data.Result.DocumentoDetalle[i].Cantidad + "</th>" +
                    "<th>" + data.Result.DocumentoDetalle[i].PrecioUnitario + "</th>" +
                    "<th>" + data.Result.DocumentoDetalle[i].Total + "</th>" +
                    "</tr>";
                $tablaHistorialDetalle.append(nuevoTr);
            }

            $txtHistTotal.val(data.Result.DocumentoCabecera.Total);
            $txtHistIGV.val(data.Result.DocumentoCabecera.Igv);
            $txtHistSubtotal.val(data.Result.DocumentoCabecera.Subtotal);
            
        }

        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarCotizacion);
    }

    function grabarDatosCotDetServV2() {
        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCotDet";
        var objDatos = { TipoItem: "SER" };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            cargarTablaDetCotServicios(data);
            cargarTablaServiciosAgregados(data);
        };

        var fnFailCallBack = function () {
            cargarTablaDetCotServicios();
            cargarTablaServiciosAgregados();
        };


        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack);
    }
    function grabarDatosCotDetServ() {

        var fnSi = function () {
            method = "POST";
            url = "BandejaSolicitudesVentas/GrabarDatosCotDet";
            var objDatos = { TipoItem: "SER" };
            var objParam = JSON.stringify(objDatos);

            var fnDoneCallBack = function (data) {
                $('#modalDetalleCotizacionServicio').modal('hide');
                cargarTablaDetCotServicios(data);
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Confirmacion","¿Desea guardar el detalle de cotizacion?","Si","No",fnSi);
    }

    function cargarTablaDetCotServicios(data) {

        var columns = [];

        columns = [
            {
                data: "NroItem",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodItem",
                render: function (data) {
                    if (data == null) { data = ""; }
                    var newData = ("000000" + data).substring(("000000" + data).length - 6, ("000000" + data).length);
                    return '<center>' + newData + '</center>';
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
                data: "VentaUnitaria",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VentaTotalSinIGV",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodItem",
                render: function (data) {
                    var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                    var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: solicitud.editarItemServ(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var ver = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: solicitud.editarItemServ(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                    var quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: solicitud.quitarItemServ(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    if ($estadoSol.val() != "SCOT") { quitar = ""; editar = ver; }
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
        filters.dataTablePaging = true;

        app.llenarTabla($('#tblDetCotServicios'), data, columns, columnDefs, "#tblDetCotServicios", rowCallback, null, filters);
    }
    
    function $btnBuscarItemsServicio_click() {
        var method = "POST";
        var url = "BandejaServicios/ObtenerServicios";
        var objServicio = {
            CodigoServicio: 0,
            Equipo: $txtBusqEquipo.val(),
            Marca: $txtBusqMarca.val(),
            Modelo: $txtBusqModelo.val(),
            Estado: "1",
            TipoServicio: $cmbTipoServicio.val() == "0" ? '' : $cmbTipoServicio.val(),
            TipoConsulta: "C"
        }
        var data = JSON.stringify(objServicio);
        var fnDoneCallback = function (data) {
            cargarTablaItemsServicios(data);
        };
        var fnFailCallback = function () {
            app.message.error("Búsqueda", "La búsqueda no encontró resultados.")
        };
        return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoServicio);
    }
    
    function cargarTablaItemsServicios(data) {

        var columns = [
            {
                data: "TipoServicio",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Equipo",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Modelo",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Marca",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Precio",
                render: function (data) {
                    var precio = data.toFixed(2)
                    return '<center>' + precio + '</center>';
                }
            },
            {
                data: "CodigoServicio",
                render: function (data) {
                    var seleccionar = '<a class="btn btn-default btn-xs" title="Agregar" href="javascript: solicitud.agregarItemServicio(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-level-down" aria-hidden="true"></i> Agregar</a>';
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

        app.llenarTabla($tblItemsServicios, data, columns, columnDefs, "#tblItemsServicios", rowCallback, null, filters);
    }

    function $btnAgregarDetalle_click() {
        $('#BI_cmbFamilia').get(0).selectedIndex = 0;
        $('#BI_cmbFamilia').trigger("change.select2");
        $BI_txtNomProducto.val("");
        $BI_txtCodProducto.val("");
        $('#BI_cmbTipoMedida').get(0).selectedIndex = 0;
        $('#BI_cmbTipoMedida').trigger("change.select2");
        $('#BI_cmbMarca').get(0).selectedIndex = 0;
        $('#BI_cmbMarca').trigger("change.select2");
        $('#BI_cmbAlmacen').get(0).selectedIndex = 0;
        $('#BI_cmbAlmacen').trigger("change.select2");
        cotvtadet.buscarItems();
    }

    function $btnAgregarServicios_click() {
        $DS_hdnOpcGrillaItems.val("1");
        $cmbTipoServicio.get(0).selectedIndex = 0;
        $cmbTipoServicio.trigger("change.select2");
        $txtBusqEquipo.val("");
        $txtBusqModelo.val("");
        $txtBusqMarca.val("");
        CargarTipoServicio();
        cargarGrillaCotDetServicios("1");
    }

    function CargarTipoServicio() {
        method = "POST";
        url = "BandejaServicios/FiltroServicios"
        obj = []
        opjParam = JSON.stringify(obj);

        var fnDoneCallBack = function (data) {
            var filters = {};
            filters.placeholder = "--Seleccionar--";
            filters.allowClear = false;
            app.llenarComboMultiResult($cmbTipoServicio, data.Result.TipServicio, $modalDetalleCotizacionServicio, 0, "--Seleccionar--", filters);
            $btnBuscarItemsServicio_click();
        };
        var fnFailCallBack = function () {
            app.message.error("Sistema", "Ocurrió un error al realizar la carga de los filtros");
        };

        app.llamarAjax(method, url, opjParam, fnDoneCallBack, fnFailCallBack, null, mensajes.ObteniendoTipoServicio);
    };
    
    function $btnEditarGestionLogisticaSE_click() {
        $dateEntregaPedidoSE.prop('disabled', false);
        $opendateEntregaPedidoSE.prop('disabled', false);
        $txtNumeroFacturaSE.prop('disabled', false);
        $txtNumeroGuiaRemisionSE.prop('disabled', false);
        $btnEditarGestionLogisticaSE.hide();
        $btnGuardarGestionLogisticaSE.show();
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
        if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03" || $TipoSolicitud.val() === "TSOL05") {

            if ($TotalSeriesSS.val() != $ContadorSeriesSS.val()) {
                app.message.error("Validación", "Debe ingresar la series y/o lotes completas.");
                return false;
            }

        }
        else {

            if ($txtNumeroGuiaRemisionSE.val() === "" || $txtNumeroGuiaRemisionSE.val() == null) {
                app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos sin stock");
                return false;
            }
        }

        if ($TipoSolicitud.val() === "TSOL04") //Para ventas de materiales y venta de equipos:
        {
            var documento_guiaRemision = 0;
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
            adjuntos.forEach(function (currentValue, index, arr) {
                if (adjuntos[index].CodigoTipoDocumento == "DVT08") { //Guia de Remision
                    documento_guiaRemision = 1;
                }
            });

            if (documento_guiaRemision === 0) {
                app.message.error("Validación", "Debe adjuntar un documento de Guía de Remisión.");
                return false;
            }
        }


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/GestionLogistica";
            var obj = {
                CodigoSolicitud: $numeroSolicitud.val(),
                Stock: "N",
                EstadoAprobacion: $TipoSolicitud.val() ,
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
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.RegistrarGestionVenta);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de despacho?", "Si", "No", fnSi, null);

    }

    function $btnGuardarImportacion_click() {
        if ($txtCodigoPedidoSE.val() === "" || $txtCodigoPedidoSE.val() == null) {
            app.message.error("Validación", "Debe ingresar el código de pedido de los productos sin stock");
            return false;
        }
        if ($dateIngresoAlmacenSE.val() === "" || $dateIngresoAlmacenSE.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de ingreso de almacen de los productos sin stock");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/GestionImportacion";
            var obj = {
                Tipo: "Y",
                CodigoSolicitud: $numeroSolicitud.val(),
                NumeroPedido: $txtCodigoPedidoSE.val(),
                FechaIngreso: $dateIngresoAlmacenSE.val()
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

    function $btnAprobarGestion_click() {

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarAprobacionImportacion?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val();
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

    function $btnEnviarGuiaBO_click() {
        //var documento_guiaBO = 0;
        //adjuntos.forEach(function (currentValue, index, arr) {
        //    if (adjuntos[index].CodigoTipoDocumento == "DVT06") { //Guia de BO
        //        documento_guiaBO = 1;
        //    }
        //});

        //if (documento_guiaBO === 0) {
        //    app.message.error("Validación", "Debe adjuntar un documento de guía de BO.");
        //    return false;
        //}

        var fnSi = function () {

            $modalCargaDocumentoGuiaBOClick();
           
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar la Guia de BO?", "S&iacute;", "No", fnSi, null);

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

    function $btnFinalizarVenta_click() {
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/FinalizarVenta";
            var obj = {
                CodigoSolicitud: $numeroSolicitud.val()
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
        else {
            if ($txtNumeroGuiaRemisionCE.val() === "" || $txtNumeroGuiaRemisionCE.val() == null) {
                app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos con stock");
                return false;
            }
        }


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGestionVentaConStock?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val() + "&tipoVenta=" + $TipoSolicitud.val();
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
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGestionLogistica);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar a gestión?", "S&iacute;", "No", fnSi, null);

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
            if (parseInt($ContadorSeriesSS.val()) != parseInt($TotalSeriesSS.val())) {
                app.message.error("Validación", "Debe ingresar todas las series y/o lotes de los productos sin stock antes de enviar a gestión.");
                return false;
            }
        }
        else {
            if ($txtNumeroGuiaRemisionSE.val() === "" || $txtNumeroGuiaRemisionSE.val() == null) {
                app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos sin stock");
                return false;
            }
        }


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGestionVentaSinStock?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val()+"&tipoVenta="+$TipoSolicitud.val();
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
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.EnvioGestionLogistica);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar a gestión?", "S&iacute;", "No", fnSi, null);
    }

    function $btnEditarGestionLogistica_click() {
        $dateEntregaPedidoCE.prop('disabled', false);
        $opendateEntregaPedidoCE.prop('disabled', false);
        $txtNumeroFacturaCE.prop('disabled', false);
        $txtNumeroGuiaRemisionCE.prop('disabled', false);
        $btnEditarGestionLogistica.hide();
        $btnGuardarGestionLogistica.show();
    }

    function $btnGuardarGestionLogistica_click() {
        if ($dateEntregaPedido.val() === "" || $dateEntregaPedido.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido.");
            return false;
        }
        //if ($txtNumeroFacturaCE.val() === "" || $txtNumeroFacturaCE.val() == null) {
        //    app.message.error("Validación", "Debe ingresar el N° de Factura de los productos con stock");
        //    return false;
        //}
       

        //Validación de numero de series agregadas:
        if ($TipoSolicitud.val() === "TSOL02" || $TipoSolicitud.val() === "TSOL03" || $TipoSolicitud.val() === "TSOL05") {

            if ($TotalSeriesCS.val() != $ContadorSeriesCS.val()) {
                app.message.error("Validación", "Debe ingresar la series y/o lotes completas.");
                return false;
            }

        } else {
            if ($txtNumeroGuiaRemisionCE.val() === "" || $txtNumeroGuiaRemisionCE.val() == null) {
                app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos con stock");
                return false;
            }
        }

        //Validación de documentación adjunta:
        if ($TipoSolicitud.val() === "TSOL04") //Para ventas de materiales y venta de equipos:
        {
            var documento_guiaRemision = 0;
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
            adjuntos.forEach(function (currentValue, index, arr) {
                if (adjuntos[index].CodigoTipoDocumento == "DVT08") { //Guia de Remision
                    documento_guiaRemision = 1;
                }
            });

            if (documento_guiaRemision === 0) {
                app.message.error("Validación", "Debe adjuntar un documento de Guía de Remisión.");
                return false;
            }
        }
        var fnSi = function () {
            var m = "POST";
            var url = "BandejaSolicitudesVentas/GestionLogistica";
            var obj = {
                CodigoSolicitud: $numeroSolicitud.val(),
                Stock: "S",
                EstadoAprobacion: $TipoSolicitud.val(),
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

    function $btnEnviarGuiaCS_click() {
       // var documento_guiaPedido = 0;
        //adjuntos.forEach(function (currentValue, index, arr) {
        //    if (adjuntos[index].CodigoTipoDocumento == "DVT07") {
        //        documento_guiaPedido = 1;
        //    }
        //});

        //if (documento_guiaPedido === 0) {
        //    app.message.error("Validación", "Debe adjuntar un documento de guía de pedido.");
        //    return false;
        //}

        var fnSi = function () {
            $FlagStock.val("S");
            $modalCargaDocumentoGuiaClick();
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar la Guia de Pedido?", "S&iacute;", "No", fnSi, null);
    }

    function $btnEnviarGuiaSS_click() {
        //var documento_guiaPedido = 0;
        //adjuntos.forEach(function (currentValue, index, arr) {
        //    if (adjuntos[index].CodigoTipoDocumento == "DVT07") {
        //        documento_guiaPedido = 1;
        //    }
        //});

        //if (documento_guiaPedido === 0) {
        //    app.message.error("Validación", "Debe adjuntar un documento de guía de pedido.");
        //    return false;
        //}
        var fnSi = function () {
            $FlagStock.val("N");
            $modalCargaDocumentoGuiaClick();
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar la Guia de Pedido?", "S&iacute;", "No", fnSi, null);
    }


    function $btnEditarGestion_click() {
        $txtNroOrdenCompra.prop('disabled', false);
        $dateOrdenCompra.prop('disabled', false);
        $openRegdateOrdenCompra.prop('disabled', false);
        $btnEditarGestion.hide();
        $btnActualizarGestion.show();

        if ($TipoSolicitud.val() === "TSOL01") {
            $btnEnviarServicio.hide();
        }
    }

    function $btnActualizarGestion_click() {
        if ($txtNroOrdenCompra.val() === "" || $txtNroOrdenCompra.val() == null) {
            app.message.error("Validación", "Debe ingresar el número de orden de compra.");
            return false;
        }
        if ($dateOrdenCompra.val() === "" || $dateOrdenCompra.val() == null) {
            app.message.error("Validación", "Debe ingresar la fecha de orden de compra.");
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "U",
                CodigoSolicitud: $numeroSolicitud.val(),
                CodigoCotizacion: $idCotizacion.val(),
                CodigoWorkFlow: $codigoWorkflow.val(),
                NumeroOrden: $txtNroOrdenCompra.val(),
                FechaOrden: $dateOrdenCompra.val(),
                FechaMaxima: $txtFechaEntregaMax.val(),
                Stock: ""
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
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de despacho?", "S&iacute;", "No", fnSi, null);
    }

    function $btnGuardarGestion_click() {

        if (($txtNroOrdenCompra.val() === "" || $txtNroOrdenCompra.val() == null) &&
            ($txtNroContrato.val() === "" || $txtNroContrato.val() == null)) {
            app.message.error("Validación", "Debe ingresar N° de Orden de Compra y/o. N° de Contrato.");
            return false;
            }



        if ($cmbTipoVenta.val() === "TVEN01" && ($txtNroOrdenCompra.val() === "" || $txtNroOrdenCompra.val() == null)) {
            app.message.error("Validación", "Debe ingresar el número de orden de compra.");
            return false;
        }
        if ($dateOrdenCompra.val() === "" || $dateOrdenCompra.val() == null) {
            app.message.error("Validación", "Debe ingresar la fecha de orden de compra.");
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "I",
                CodigoSolicitud: $numeroSolicitud.val(),
                CodigoCotizacion: $idCotizacion.val(),
                CodigoWorkFlow: $codigoWorkflow.val(),
                NumeroOrden: $txtNroOrdenCompra.val(),
                FechaOrden: $dateOrdenCompra.val(),
                FechaMaxima: $txtFechaEntregaMax.val(),
                Stock: ""
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    //location.reload();
                    //Envio correo a servicio tecnico:
                    if ($cmbTipo.val() == "TSOL05" && data.Result.Codigo == 2) {
                        var m2 = "POST";
                        var url2 = "BandejaSolicitudesVentas/EnviarGestionServicioTecnico?codigoSolicitud=" + $numeroSolicitud.val();
                        var objParam2 = '';
                        var fnDoneCallback2 = function (data2) {
                            var fnCallback2 = function () {
                                location.reload();
                            }
                            if (data2.Result.Codigo > 0) {
                                app.message.success("Grabar", data2.Result.Mensaje, "Aceptar", fnCallback2);
                            }
                            else {
                                app.message.error("Grabar", data2.Result.Mensaje, "Aceptar", null);
                            }
                        };

                        return app.llamarAjax(m2, url2, objParam2, fnDoneCallback2, null, null, mensajes.RegistrarGestionVenta);
                    }
                    else {
                        location.reload();
                    }
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
        return app.message.confirm("Ventas", "¿Está seguro que desea iniciar el proceso de ventas?", "S&iacute;", "No", fnSi, null);
    }

    function CalcularFechaEntregaMaxima() {
        var dias = Number($txtPlazoEntrega.val());
        var fecha = $dateOrdenCompra.val();
        const partes = fecha.split('/');
        let nuevaFecha = new Date(partes[2], partes[1] - 1, partes[0]);
        nuevaFecha.setDate(nuevaFecha.getDate() + dias);
        var dia = String(nuevaFecha.getDate()).padStart(2, '0');
        var mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
        var year = nuevaFecha.getFullYear();
        $txtFechaEntregaMax.val(`${dia}/${mes}/${year}`);
    }

    function $dateOrdenCompra_change() {
        CalcularFechaEntregaMaxima();
    }
    
    function changeTipoVenta() {
        var tipo_venta = $cmbTipoVenta.val();
        $txtNroProceso.val('');
        $txtTipoProceso.val('');
        if (tipo_venta == "TVEN02") { //Para licitaciones:
            $divDatosLicitacion.show();
        }
        else {
            $divDatosLicitacion.hide();
        }
    }

    function $btnImprimirCotizacion_click() {

        var codigo = $idCotizacion.val();
        method = 'POST';
        //url = 'BandejaHistorialCotizacion/GenerarCotizacion?codCotizacion=' + codigo;
        url = 'BandejaHistorialCotizacion/GenerarCotizacion';

        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IdSolicitud: $numeroSolicitud.val(),
            DescGarantia: $("#select2-" + $cmbGarantia.attr("id") + "-container").attr("title"),
            DescFormaPago: $("#select2-" + $cmbTipoPago.attr("id") + "-container").attr("title"),
            DescMoneda: $("#select2-" + $cmbTipMoneda.attr("id") + "-container").attr("title")
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (response) {

            if (response.Status > 0) {

                // Convertir el contenido base64 en un archivo y descargarlo
                var byteCharacters = atob(response.Archivo); // Decodificar el base64
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset++) {
                    var byteArray = byteCharacters.charCodeAt(offset);
                    byteArrays.push(byteArray);
                }

                // Crear un Blob a partir del array de bytes
                var blob = new Blob([new Uint8Array(byteArrays)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

                // Crear un enlace para descargar el archivo
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = response.Nombre;
                link.click();
            } else {
                alert("Hubo un problema al generar el documento.");
            }
            //app.abrirVentana("BandejaHistorialCotizacion/ExportarFile?nombreDoc=" + data.Archivo);
           // app.message.success("Ventas", "Se generó la cotización correctamente.")
        }
        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarCotizacion);
    }

    function $btnGuiaPedidoCS_click() {
        var num_solicitud = $numeroSolicitud.val();
        var tipo = "GP"
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud + "&stock=S";

        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaPedido?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de pedidos correctamente.");
            $btnEnviarGuiaCS.show();
        }
        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarGuiaPedidos);
    }

    function $btnGuiaPedidoSS_click() {
        var num_solicitud = $numeroSolicitud.val();
        var tipo = "GP"
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud + "&stock=N";

        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaPedido?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de pedidos correctamente.");
            $btnEnviarGuiaSS.show();
        }
        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarGuiaPedidos);
    }

    function $btnGuiaBO_click() {
        var num_solicitud = $numeroSolicitud.val();
        var tipo = "BO";
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud +"&stock=N";
        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaBO?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de BO correctamente.");
            $btnEnviarGuiaBOSS.show();
        }
        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarBO);
    }
    
    function $btnHistorial_click() {
        var filtrosDTO = {};
        filtrosDTO.IdCotizacion = $txtCodCotizacion.val() == ""  ? 0 : $txtCodCotizacion.val()
        filtrosDTO.IdSolicitud = $numeroSolicitud.val();
        var method = "POST";
        var url = "BandejaHistorialCotizacion/ListarBandejaHistorialCotizacion";

        var objParam = JSON.stringify(filtrosDTO);
        var fnDoneCallback = function (data) {
            cargarTablaHist(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.BuscandoHistorial);
    }

    function cargarTablaHist(data) {
        var columns = [
            {
                data: "IdCotizacion",
                render: function (data, type, row) {
                    return ("000000" + data).substring(("000000" + data).length - 6, ("000000" + data).length);
                }
            },
            {
                data: "FecCotizacion", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NombreContacto", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "PlazoEntrega", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "FormaPago", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Moneda", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "UsuarioRegistro", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "FechaRegistroFormat", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "IdCotizacion",
                render: function (data, type, row) {
                    var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript:solicitud.verHistorial(' + data + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    return '<center>' + ver + '</center>';
                },
            }

        ];
        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];
        var filters = {
            dataTableSearching: false,
            dataTablePageLength: 10
        };
        app.llenarTabla($tblHistorial, data, columns, columnDefs, "#tablaHistorial", null, null, filters);
    }
    
    function cargaCombos() {

        var rol = $idRolUsuario.val();
        var codFlujo = "0";

        if ($numeroSolicitud.val() == "") {
            if (rol == "SGI_VENTA_ASESOR" || rol == "SGI_VENTA_COORDINAVENTA") {
                codFlujo = "1";
            }
            else if (rol == "SGI_VENTA_COORDINASERV" || rol == "SGI_VENTA_COORDINAATC") {
                codFlujo = "2";
            }
        }


        var numsol = $numeroSolicitud.val();
        if (numsol == "") {
            numsol = 0;
        }

        method = "POST";
        url = "BandejaSolicitudesVentas/GrupoSolicitudVentaFiltro?codFlujo=" + codFlujo + "&codSolicitud=" + numsol + "&rolUsuario=" + rol;
        var objComb = "";
        objComb = JSON.stringify(objComb);

        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbGarantia, data.Result.Garantias, null, " ", "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipMoneda, data.Result.TipoMoneda, null, " ", "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbFlujo, data.Result.Flujos, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipo, data.Result.TipoSol, null, "", "", filters);
            app.llenarComboMultiResult($cmbMedioContacto, data.Result.MedioContacto, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipoPago, data.Result.FormPago, null, " ", "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipoVenta, data.Result.TipoVenta, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipoDocumentoCarga, data.Result.TipoDocumento, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipoDocumentoCargaGuia, data.Result.TipoDocumento, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipDocTecnico, data.Result.TipoDocumentoTecnico, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipoEmpleado, data.Result.TipoEmpleado, null, 0, "-- Seleccione --", filters);
            app.llenarComboMultiResult($cmbTipoCredencial, data.Result.TipoDocumentoTecnico, "", 0, "", false);

            if (rol == "SGI_VENTA_COORDINASERV" || rol == "SGI_VENTA_COORDINAATC" || rol == "SGI_VENTA_ASESOR") {
                $cmbFlujo.val(codFlujo).trigger("change.select2");
            }

            if (rol == "SGI_VENTA_COORDINASERV" || rol == "SGI_VENTA_COORDINAATC") {
                if ($TipoSolicitud.val() === "TSOL01") {
                    $('#cmbTipoDocumentoCarga option[value="DVT03"]').remove(); //Factura
                    $('#cmbTipoDocumentoCarga option[value="DVT04"]').remove(); //Ficha Instalacion
                    $('#cmbTipoDocumentoCarga option[value="DVT06"]').remove(); //Guia de BO
                    $('#cmbTipoDocumentoCarga option[value="DVT07"]').remove(); //Guia de Pedidos
                    $('#cmbTipoDocumentoCarga option[value="DVT08"]').remove(); //Guia de Remision
                }         
            }
            
            if ($numeroSolicitud.val() != "") {

                cotvtadet.ObtenerFiltrosPrecios();

                //Carga de datos de la solicitud:
                $txtRuc.val(data.Result.Solicitud.RUC);
                $txtNomEmpresa.val(data.Result.Solicitud.RazonSocial);
                $txtAsesor.val(data.Result.Solicitud.AsesorVenta);
                $cmbFlujo.val(data.Result.Solicitud.Id_Flujo).trigger("change.select2");
                $cmbTipo.val(data.Result.Solicitud.Tipo_Sol).trigger("change.select2");
                $cmbMedioContacto.val(data.Result.Solicitud.Cod_MedioCont).trigger("change.select2");
                $cmbempresa.val(data.Result.Solicitud.Cod_Empresa).trigger("change.select2");
                $dateSolicitud.val(data.Result.Solicitud.Fecha_Sol);
                $cmbTipoVenta.val(data.Result.Solicitud.TipoVenta).trigger("change.select2");
                if (data.Result.Solicitud.TipoVenta === "TVEN02") //Si es licitacion:
                {
                    $divDatosLicitacion.show();
                }
                $txtNroProceso.val(data.Result.Solicitud.NroProceso);
                $txtTipoProceso.val(data.Result.Solicitud.TipoProceso);
                //para habilitar el boton de historial de cotizaciones:
                if (data.Result.Solicitud.NroCotizacionEliminado > 0) {
                    $btnHistorial.show();
                }

                if ($estadoSol.val() == "PRVT" || $estadoSol.val() == "CAPR") {
                    CalcularFechaEntregaMaxima();
                }
                
                if ($estadoSol.val() == "PRVT" || $estadoSol.val() == "VTPG" || $estadoSol.val() == "SFIN" || $estadoSol.val() == "NOVT") {
                    //para despacho:
                    $txtNroOrdenCompra.val(data.Result.ContadorCabecera.NumeroOrden);
                    $dateOrdenCompra.val(data.Result.ContadorCabecera.FechaOrden);
                    $txtFechaEntregaMax.val(data.Result.ContadorCabecera.FechaMaxima);
                    $txtNroOrdenCompra.prop('disabled', true);
                    $dateOrdenCompra.prop('disabled', true);
                    $openRegdateOrdenCompra.prop('disabled', true);
                }

                if ($idRolUsuario.val() === "SGI_VENTA_FACTURA") {
                    $btnAgregarDocumento.hide();
                }

                if (($estadoSol.val() == "SFIN" || $estadoSol.val() == "NOVT" || $estadoSol.val() =="VTPG")) {
                    $btnCargarDocumento.hide();
                    $btnAgregarObservacion.hide();
                    $btnAgregarDocumento.hide();
                }

                if ($idRolUsuario.val() === "SGI_VENTA_LOGISTICA" && $estadoSol.val() == "VTPG") {
                    $btnAgregarDocumento.show();
                }

                if (data.Result.ContadorCabecera.FechaFactura != "") {
                    $dateFactura.val(data.Result.ContadorCabecera.FechaFactura);
                }
                else {
                    $dateFactura.val(hoy());
                }
                $txtNumeroFacturaServ.val(data.Result.ContadorCabecera.NumeroFactura);
                $dateProgramacionServ.val(data.Result.ContadorCabecera.FechaProgramacionTecnico);

                $txtNumeroFactura.val(data.Result.ContadorCabecera.NumeroFacturaDespacho);
                $dateEntregaPedido.val(data.Result.ContadorCabecera.FechaEntregaPedido);

                if (data.Result.ContadorCabecera.ContadorSinStock > 0) {




                    if ($estadoSol.val() == "PRVT" && data.Result.DespachoCabeceraSinStock.EstadoAprobacion == "APR") {
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
                        var html = '<div class="text-center">';
                        var sel_html = ''
                        if ($estadoSol.val() == "PRVT" && $idRolUsuario.val() == "SGI_VENTA_LOGISTICA" && data.Result.DespachoCabeceraSinStock.EstadoAprobacion == "IMP") {

                            html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleSinStock[i].Id + '" href="javascript:solicitud.editarSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                           /* html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleSinStock[i].Id + '" data-toggle="modal" data-target="#modalSeries"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';*/
                            html += ' <a class="btn btn-default btn-xs" title="Guardar" id="Boton' + data.Result.DespachoDetalleSinStock[i].Id + '" style="display:none"  href="javascript:solicitud.guardarSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ',\'N\')"><i class="fa fa-save" aria-hidden="true"></i></a>&nbsp;';
                            sel_html = '<th><div class="text-center">';
                            if (data.Result.DespachoDetalleSinStock[i].NumeroSerie.length == 0) {
                                sel_html += '<input type="checkbox" id="chk"' + data.Result.DespachoDetalleSinStock[i].Id + ' class="chkSS" value="' + data.Result.DespachoDetalleSinStock[i].Id + '">'
                            }
                            sel_html += '</div></th>';
                        }
                        html += ' <a class="btn btn-default btn-xs" title="Ver" id="Ver' + data.Result.DespachoDetalleSinStock[i].Id + '" href="javascript:solicitud.verSeries(' + data.Result.DespachoDetalleSinStock[i].Id + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;';

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
                        $dateEntregaPedidoSE.val(data.Result.DespachoCabeceraSinStock.FechaEntrega);
                    }

                   


                    //$txtNumeroFacturaSE.val(data.Result.DespachoCabeceraSinStock.NumeroFactura);
                    $txtNumeroGuiaRemisionSE.val(data.Result.DespachoCabeceraSinStock.NumeroGuiaRemision);



                    if (data.Result.ContadorCabecera.GestionLogSinStock > 0) {
                        $dateEntregaPedidoSE.prop('disabled', true);
                      //  $txtNumeroFacturaSE.prop('disabled', true);
                        $txtNumeroGuiaRemisionSE.prop('disabled', true);
                        $opendateEntregaPedidoSE.prop('disabled', true);
                    }

                }

                if (data.Result.ContadorCabecera.ContadorConStock > 0) {
                    var fecha_entrega = data.Result.DespachoCabeceraConStock.FechaEntrega;
                    if (fecha_entrega != null && fecha_entrega != "") {
                        $dateEntregaPedidoCE.val(data.Result.DespachoCabeceraConStock.FechaEntrega);
                    }

                    //$txtNumeroFacturaCE.val(data.Result.DespachoCabeceraConStock.NumeroFactura);
                    $txtNumeroGuiaRemisionCE.val(data.Result.DespachoCabeceraConStock.NumeroGuiaRemision);


                    if (data.Result.ContadorCabecera.GestionLogConStock > 0) {
                        $dateEntregaPedidoCE.prop('disabled', true);
                        //$txtNumeroFacturaCE.prop('disabled', true);
                        $txtNumeroGuiaRemisionCE.prop('disabled', true);
                        $opendateEntregaPedidoCE.prop('disabled', true);
                    }
                }

                if (data.Result.DespachoDetalleConStock.length > 0) {

                    for (i = 0; i < data.Result.DespachoDetalleConStock.length; i++) {
                        var html = '<div class="text-center">';
                        var sel_html = ''
                        if ($estadoSol.val() == "PRVT" && $idRolUsuario.val() == "SGI_VENTA_LOGISTICA") {

                            html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleConStock[i].Id + '" href="javascript:solicitud.editarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                           /* html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleConStock[i].Id + '" data-toggle="modal" data-target="#modalSeries"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';*/
                            html += ' <a class="btn btn-default btn-xs" title="Guardar" id="Boton' + data.Result.DespachoDetalleConStock[i].Id + '" style="display:none"  href="javascript:solicitud.guardarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ',\'S\')"><i class="fa fa-save" aria-hidden="true"></i></a>&nbsp;';
                            sel_html = '<th><div class="text-center">';
                            if (data.Result.DespachoDetalleConStock[i].NumeroSerie.length == 0) {
                                sel_html += '<input type="checkbox" id="chk"' + data.Result.DespachoDetalleConStock[i].Id + ' class="chkCS" value="' + data.Result.DespachoDetalleConStock[i].Id + '">'
                            }
                            sel_html += '</div></th>';
                        }
                        html += ' <a class="btn btn-default btn-xs" title="Ver" id="Ver' + data.Result.DespachoDetalleConStock[i].Id + '" href="javascript:solicitud.verSeries(' + data.Result.DespachoDetalleConStock[i].Id + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>&nbsp;';
                        html += '</div>';
                       
                        var nuevoTr = "<tr bgcolor='d0f2f7' id='fila" + data.Result.DespachoDetalleConStock[i].Id + "'>" + sel_html+
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
                    if (($idRolUsuario.val() === "SGI_VENTA_COORDINASERV" || $idRolUsuario.val() === "SGI_VENTA_COORDINAATC")) {
                        $btnBuscarTecnicos.show();
                        $btnAñadirTecnico.show();
                    }
                   
                }

                if (($idRolUsuario.val() === "SGI_VENTA_COORDINASERV" || $idRolUsuario.val() === "SGI_VENTA_COORDINAATC") && $estadoSol.val() === "PRVT") {
                    if (data.Result.ContadorCabecera.EnvioServicio < 1) {
                        $btnGuardarProg.show();
                    }
                   
                }


                cotvtadet.RecargarFiltroFamilia();

                solicitud.detalleSolicitud.push({
                    flujo: data.Result.Solicitud.Id_Flujo,
                    TipoSol: data.Result.Solicitud.Tipo_Sol,
                    MedioContacto: data.Result.Solicitud.Cod_MedioCont,
                    codProd: data.Result.Solicitud.CodProducto,
                    nomProd: data.Result.Solicitud.NomProducto,
                    Marca: data.Result.Solicitud.Marca,
                    fecSolicitud: data.Result.Solicitud.Fecha_Sol
                });

                solicitud.contadorObservaciones = data.Result.Observaciones.length;
                solicitud.observaciones = data.Result.Observaciones;
                if (solicitud.contadorObservaciones > 0) {
                    for (var i = 0; i < data.Result.Observaciones.length; i++) {
                        var nuevoTr = "<tr id='row" + data.Result.Observaciones[i].Id + "'>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Nombre_Usuario + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Perfil_Usuario + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Fecha_Registro + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Observacion + "</th>" +
                            "<th style='text-align: center;'>" + " " + "</th>" + //Controlar la modificación de observaciones por el usuario que haya registrado dicha solicitud. 
                            "</tr>";
                        $tblObservaciones.append(nuevoTr);
                    }
                    $NoExisteRegObs.hide();
                }

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

                var docs = data.Result.Adjuntos.length;
                adjuntos = data.Result.Adjuntos;

                $contadordoc.val(docs);
                if (docs > 0) {
                    for (i = 0; i < data.Result.Adjuntos.length; i++) {
                        var html = '<div class="text-center">';
                        //var d = "'" + data.Result.Adjuntos[i].CodigoDocumento + "','" + data.Result.Adjuntos[i].RutaDocumento + "'";
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:solicitud.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        if (($estadoSol.val() != "SFIN" && $estadoSol.val() != "NOVT" && $estadoSol.val() != "VTPG") && $idRolUsuario.val() != "SGI_VENTA_FACTURA" ) {
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:solicitud.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
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
            }
            
        };

        var fnFailCallback = function () {
            app.message.error("Validación", "Error al cargar los combos.");
        };

        app.llamarAjax(method, url, objComb, fnDoneCallback, fnFailCallback, null, null);
    };
    
    function cargarTablaContactos(contactos) {
        var data = Result = [];
        data.Result = contactos;
        var columns = [
            {
                data: "numero",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "tipDocText",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "numDoc",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "nombre",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "establecimiento",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "areacontacto",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "telef",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "telef2",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "cargo",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "correo",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "estadoText",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "numero",
                render: function (data, type, row) {
                    var params = "'" + row.numero + "','" + row.nombre + "','" + row.areacontacto + "','" + row.telef + "','" + row.telef2 + "','" + row.correo + "'"
                    var seleccionar = '<a id="btnSeleccionar" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: solicitud.seleccionar(' + params + ')"><i class="fa fa-plus" aria-hidden="true"></i> Seleccionar</a>';
                    return '<center>' + seleccionar + '</center>';
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];

        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + data.IdContacto);
        };

        app.llenarTabla($tblContactos, data, columns, columnDefs, "#tblContactos", rowCallback);
    };
    
    function download(IdDocumento) {

        var documento = adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.abrirVentana("BandejaSolicitudesVentas/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);

        // app.redirectToWindow("RegistrarViatico/DownloadDocumento?codWorkflow=" + $codigoWorkflow.val() + "&codDocumento=" + IdDocumento);
    }

    function eliminarDocumento(idDocumento) {
        if ( $numeroSolicitud.val() != "" ) {
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
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);
            };
            return app.message.confirm("Solicitud de Venta", "¿Está seguro que desea eliminar el documento adjunto?", "S&iacute;", "No", fnSi, null);
        };
    };

    function $adjuntarDocumento_click() {
        //$fileCargaDocumentoSustento.click();
        $lblNombreArchivo.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustento').click();

    }

    function $adjuntarDocumentoGuia_click() {
        //$fileCargaDocumentoSustento.click();
        $lblNombreArchivoGuia.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustentoGuia').click();

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
                //console.log("ruta_guardada:" + ruta_guardada);

                $contadordoc.val(cont);

                if ($numeroSolicitud.val() != "") {

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
                            if (($estadoSol.val() != "SFIN" && $estadoSol.val() != "NOVT" && $estadoSol.val() != "VTPG") && $idRolUsuario.val() != "SGI_VENTA_FACTURA") {
                                html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:solicitud.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                            }
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:solicitud.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
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
                    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);

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
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:solicitud.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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
            if ($numeroSolicitud.val() != "") {
                var method = "POST";
                var url = "BandejaSolicitudesVentas/GuardarObservacion"
                var objObservacion = {
                    TipoProceso: "I",
                    Observacion: $txtObservacion.val(),
                    Id_WorkFlow: $codigoWorkflow.val(),
                    Nombre_Usuario: $nombreusuario.val(),
                    Estado_Instancia: $estadoSol.val()
                };

                var objParamObs = JSON.stringify(objObservacion);

                var fnDoneCallBack = function () {
                    app.message.success("Ventas", "Se realizó el registro de la observación correctamente.");

                    solicitud.contadorObservaciones += 1;

                    solicitud.observaciones.push(
                        {
                            TipoProceso: "I",
                            Observacion: $txtObservacion.val(),
                            Nombre_Usuario: $nombreusuario.val(),
                            Id_WorkFlow: $codigoWorkflow.val(),
                            Estado_Instancia: $estadoSol.val
                        }
                    );
                    var nuevoTr = "<tr id=row" + solicitud.contadorObservaciones + ">" +
                        "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                        "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                        "<th style='text-align: center;'>" + hoy() + "</th>" +
                        "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                        "<th style='text-align: center;'>" +
                        "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: solicitud.eliminarObsTmp(" + solicitud.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
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
                solicitud.contadorObservaciones += 1;

                solicitud.observaciones.push({
                    //Id_WorkFlow: $codigoWorkflow.val(),
                    TipoProceso: "I",
                    Estado_Instancia: "REG",
                    Observacion: $txtObservacion.val(),
                    Nombre_Usuario: $nombreusuario.val(),
                    Perfil_Usuario: $perfilnombre.val()
                })
                var nuevoTr = "<tr id=row" + solicitud.contadorObservaciones + ">" +
                    "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                    "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                    "<th style='text-align: center;'>" + hoy() + "</th>" +
                    "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                    "<th style='text-align: center;'>" +
                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: solicitud.eliminarObsTmp(" + solicitud.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                    "</th> " +
                    "</tr>";
                $tblObservaciones.append(nuevoTr);
                $NoExisteRegObs.hide();
                $modalObservacion.modal('toggle');
            };

        }


        $txtObservacion.val("");
    }

    function btnEliminarSolClick() {

        var method = "POST";
        var url = "BandejaSolicitudesVentas/CancelarSolicitud"
        var objSolicitud = {
            ID_Solicitud: $numeroSolicitud.val(),
            codigoWorkFlow: $codigoWorkflow.val()
        };
        objParam = JSON.stringify(objSolicitud);
        
        var fnSi = function () {
            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas");
            };
            var fnDoneCallback = function (data) {
                app.message.success("Ventas", "Se canceló la solicitud correctamente.", "Aceptar", redirect);
            };
            var fnFailCallback = function () {
                app.message.error("Validación", "Error al cancelar la solicitud.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);
        }
        return app.message.confirm("Confimación", "¿Está seguro de cancelar la solicitud?", "Si", "No", fnSi, null);
    };
    
    function registrarCotizacion() {


        if ($nombreContacto.val().trim() === "" || $nombreContacto.val().trim().length <= 0 || $nombreContacto.val().trim() == null) {
            app.message.error("Validación","Debe de seleccionar un contacto registrado o ingresar el nombre de un nuevo contacto.");
            return;
        };

        if (!isNaN($nombreContacto.val())) {
            app.message.error("Validación","El nombre del contacto no puede contener números.")
            return;
        };

        if ($txtAreaContacto.val().trim() === "" || $txtAreaContacto.val().trim().length <= 0 || $txtAreaContacto.val().trim() == null) {
            app.message.error("Validación", "Debe de seleccionar un contacto registrado o ingresar el área de un nuevo contacto.");
            return;
        };

        if (!isNaN($txtAreaContacto.val())) {
            app.message.error("Validación", "El área del contacto no puede contener números.")
            return;
        };

        if ($txtTelefono.val().trim() === "" || $txtTelefono.val().trim().length <= 0 || $txtTelefono.val().trim() == null) {
            app.message.error("Validación", "Debe de seleccionar un contacto registrado o ingresar el teléfono de un nuevo contacto.");
            return;
        };

        var telefono = $txtTelefono.val().trim();

        telefono = telefono.replace(/\s+/g, ' ');

        if (isNaN($txtTelefono.val().trim()) || (telefono.length === 0 && telefono != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if ($txtCorreo.val().trim() === "" || $txtCorreo.val().trim().length <= 0 || $txtCorreo.val().trim() == null) {
            app.message.error("Validación", "Debe de seleccionar un contacto registrado o ingresar el correo de un nuevo contacto.");
            return;
        };

        if (!app.validarEmail($txtCorreo.val().trim()) && $txtCorreo.val().trim() != "") {
            app.message.error("Validación", "Debe de colocar un correo con el formato correcto.");
            return
        };

        if ($dateCotizacion.val().trim() === "" || $dateCotizacion.val().trim().length <= 0 || $dateCotizacion.val().trim() == null) {
            app.message.error("Validación", "Debe ingresar la fecha de cotización.");
            return;
        };

        var fnsol = app.stringToDate($dateSolicitud.val());
        var fnCot = app.stringToDate($dateCotizacion.val());

        if (fnsol > fnCot) {
            app.message.error("Validación", "La Fecha de Cotización no puede ser menor a la Fecha de Solicitud");
            return;
        };

        if ($txtVigencia.val().trim() === "" || $txtVigencia.val().trim().length <= 0 || $txtVigencia.val().trim() == null) {
            app.message.error("Validación", "Debe de ingresar el plazo de vigencia de la cotización.");
            return;
        };

        if ($.trim($txtPlazoEntrega.val()) == "") {
            app.message.error("Validación", "Debe de ingresar el plazo de entrega de la cotización.");
            return;
        }
        else {
            if (!app.validaNumeroEntero($txtPlazoEntrega.val())) {
                app.message.error("Validación", "Número inválido para el Plazo de Entrega.");
                return;
            }
        };

        if ($.trim($cmbGarantia.val()) === "" || $cmbGarantia.val() == undefined || $cmbGarantia.val() == null) {
            app.message.error("Validación", "Debe de ingresar el periodo de garantía.");
            return;
        };

        if ($.trim($cmbTipoPago.val()) === "" || $cmbTipoPago.val() == undefined || $cmbTipoPago.val() == null) {
            app.message.error("Validación", "Debe de seleccionar la forma de pago.");
            return;
        };
        
        if ($.trim($cmbTipMoneda.val()) === "" || $cmbTipMoneda.val() == undefined || $cmbTipMoneda.val() == null) {
            app.message.error("Validación", "Debe de seleccionar el tipo de moneda.");
            return;
        };

        var vFecCotizacion = null;
        if ($dateCotizacion.val() != "") {
            vFecCotizacion = app.stringToDate($dateCotizacion.val());
        }

        var fnSi = function () {

            method = "POST";
            url = "BandejaSolicitudesVentas/RegistraCotizacionVenta"
            objCotizacion = {
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
                Estado: "A"
            };

            objParam = JSON.stringify(objCotizacion);

            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
            };

            var fnDoneCallBackSol = function (data) {
                $idCotizacion.val(data.Cotizacion.IdCotizacion);
                $btnRegistrarCotizacion.attr("style", "display:none");
                app.message.success("Registro Realizado", "Se grabó satisfactoriamente el registro.", "Aceptar", redirect);
            };

            var fnFailCallBackSol = function (Mensaje) {
                app.message.error("Validación", Mensaje);
                return;
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBackSol, fnFailCallBackSol, null, null);
        }

        return app.message.confirm("Confirmación", "Está seguro de registrar los datos de Liquidaci&oacute;n de Costos?", "Si", "No", fnSi, null);
        
    };
    
    function eliminarObsTmp(idObs) {
        var fnSi = function () {

            solicitud.contadorObservaciones -= 1

            solicitud.observaciones = solicitud.observaciones.filter(observacion => observacion.Id !== Number(idObs));

            $("#row" + idObs).remove();

            if (solicitud.contadorObservaciones == 0) {
                $NoExisteRegObs.show();
            };
            
        }
        return app.message.confirm("Confirmación", "Está seguro que desea eliminar esta observación?", "Si", "No", fnSi, null);
        
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

    function $modalCargaDocumentoGuiaClick() {
        $hdnDocumentoCargadoIdGuia.val("GP");
        //$cmbTipoDocumentoCarga.empty();
        $cmbDocumentoCargaGuia.empty();
        $txtDescripcionDocumentoCargaGuia.val("");
        $cmbTipoDocumentoCargaGuia.val("DVT07").trigger("change.select2");
        $cmbTipoDocumentoCargaGuia.prop('disabled', true);
        $lblNombreArchivoGuia.text("");
        $modalCargaDocumentoGuia.modal("show");
    };

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
                                var url = "BandejaSolicitudesVentas/EnviarGuiaPedidos?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val() + "&stock=" + $FlagStock.val();
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
                                var url = "BandejaSolicitudesVentas/EnviarGuiaBO?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val();
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

    function $modalObservacionClick() {
        $tituloModalObservacion.html("Nueva observación"); 
        $grpAuditoriaObservacion.hide();
        $modalObservacion.modal("show");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
    }

    function $btnRegistrarClick() {

        if ($cmbFlujo.val() === "") {
            app.message.error("Validación", "Debe seleccionar el flujo de la solicitud.");
            return;
        };

        if ($cmbTipoVenta.val() === "") {
            app.message.error("Validación", "Debe seleccionar el tipo de venta.");
            return;
        };
        
        if ($cmbTipo.val() === "") {
            app.message.error("Validación", "Debe seleccionar el tipo de solicitud.");
            return;
        };

        if ($dateSolicitud.val() === "") {
            app.message.error("Validación", "Debe ingresar la fecha de solicitud.");
            return
        };

        if ($cmbempresa.val() === "") {
            app.message.error("Validación", "Debe seleccionar la empresa que emite la solicitud.");
            return;
        };

        if ($cmbMedioContacto.val() === "") {
            app.message.error("Validación", "Debe seleccionar el medio de contacto.");
            return;
        };

        

        if ($cmbTipoVenta.val() === "TVEN02") { //Si es de licitación:
            if ($txtNroProceso.val() === "" || $txtNroProceso.val() == null) {
                app.message.error("Validación", "Debe ingresar el número de proceso.");
                return;
            };

            if ($txtTipoProceso.val() === "" || $txtTipoProceso.val() == null) {
                app.message.error("Validación", "Debe ingresar el tipo de proceso o adjudicación.");
                return;
            };
        }
        
        method = "POST";
        url = "BandejaSolicitudesVentas/RegistraSolicitudes"
        objSolicitud = {
            Solicitud: {
                IsTipoProceso: "I",
                Id_Solicitud: "",
                Id_Flujo: $cmbFlujo.val(),
                TipoVenta: $cmbTipoVenta.val(),
                Fecha_Sol: $dateSolicitud.val(),
                Tipo_Sol: $cmbTipo.val(),
                Cod_MedioCont: $cmbMedioContacto.val(),
                IdCliente: $idCliente.val(),
                RUC: $hdnRUC.val(),
                RazonSocial: $nomEmpresa.val(),
                AsesorVenta: $Asesor.val(),
                Cod_Empresa: $cmbempresa.val(),
                TipoProceso: $txtTipoProceso.val(),
                NroProceso: $txtNroProceso.val(),
                Estado: "SREG"
            },
            Observaciones: solicitud.observaciones,
            Adjuntos: adjuntos
        };

        objParam = JSON.stringify(objSolicitud);
        
        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                $idWorkFlow.val(data.Solicitud.Id_WorkFlow);

                function redirect() {
                    location.reload();
                };

                method = "POST"
                url = "BandejaSolicitudesVentas/ObtenerDetallexSolicitud";
                var objResponse = {
                    Id_WorkFlow: data.Solicitud.Id_WorkFlow,
                    Id_Solicitud: data.Solicitud.Id_Solicitud,
                    Estado: data.Solicitud.Estado,
                    nomEstado: data.Solicitud.nomEstado,
                    abrevEstado: data.Solicitud.abrevEstado,
                    Tipo_Sol: data.Solicitud.Tipo_Sol,
                    Id_Flujo: data.Solicitud.Id_Flujo
                };

                var objParam = JSON.stringify(objResponse);

                var fnDoneCallBackSol = function () {
                    app.message.success("Registro Realizado", "Se realizó el registro satisfactoriamente.", "Aceptar", redirect);
                };

                var fnFailCallBackSol = function (Mensaje) {
                    app.message.error("Validación", Mensaje);
                    return;
                };

                app.llamarAjax(method, url, objParam, fnDoneCallBackSol, fnFailCallBackSol, null, null);
            };
            var fnFailCallBack = function (Mensaje) {
                app.message.error("Validación", Mensaje);
                return
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.registraSolicitud);
        }
        return app.message.confirm("Ventas", "Está seguro que desea registrar una nueva solicitud.","Si","No",fnSi, null);
    };

    function $agregarContactoClick() {

        $nombreContacto.prop('disabled', false);
        $nombreContacto.removeAttr('readonly');
        $txtAreaContacto.prop('disabled', false);
        $txtTelefono.prop('disabled', false);
        $txtCorreo.prop('disabled', false);

        $txtCodContacto.val("");
        $nombreContacto.val("");
        $txtAreaContacto.val("");
        $txtTelefono.val("");
        $txtCorreo.val("");
        solicitud.nuevoContacto = true;
    };

    function $btnSearchContactoClick() {
        $btnAñadir.css('display', 'none');
        $btnLimpiarTodo.css('display', 'none');
        cargarContactos()
    };

    function seleccionar(id, nombreCont, areacontacto, telefono, telefono2, correo) {
        $nombreContacto.prop('disabled', true);
        $txtAreaContacto.prop('disabled', true);
        $txtTelefono.prop('disabled', true);
        $txtCorreo.prop('disabled', true);

        $txtCodContacto.val("");
        $nombreContacto.val("");
        $txtAreaContacto.val("");
        $txtTelefono.val("");
        $txtCorreo.val("");

        idContacto = id;
        NombreContacto = nombreCont;
        AreaContacto = areacontacto;
        Telefono = telefono == "" ? telefono2 : telefono;
        Correo = correo;

        $txtCodContacto.val(idContacto);
        $nombreContacto.val(NombreContacto);
        $txtAreaContacto.val(AreaContacto);
        $txtTelefono.val(Telefono);
        $txtCorreo.val(Correo);

        $modalContactos.modal('toggle');
        solicitud.nuevoContacto = false;
    }

    function cargarContactos() {
        solicitud.contactos = [];
        $contenidoTabla.empty();
        
        method = "POST";
        url = "BandejaCliente/ObtenerContactos"
        ObjContactos = {
            IdCliente: $idCliente.val()
        }

        objParam = JSON.stringify(ObjContactos);

        var fnDoneCallBack = function (data) {
            for (var i = 0; i < data.Result.length; i++) {

                if (data.Result[i].CodEstado == true) {
                    data.Result[i].CodEstado = "1";
                }
                else {
                    data.Result[i].CodEstado = "0";
                }

                solicitud.contactos.push({
                    numero: data.Result[i].IdContacto,
                    tipDocText: data.Result[i].TipDoc == "" ? "Sin definir" : data.Result[i].TipDoc,
                    tipDoc: data.Result[i].CodTipDocContacto,
                    numDoc: data.Result[i].NumDoc == "" ? "-" : data.Result[i].NumDoc,
                    nombre: data.Result[i].NomCont,
                    establecimiento: data.Result[i].Establecimiento,
                    areacontacto: data.Result[i].AreaContacto,
                    telef: data.Result[i].Telefono,
                    telef2: data.Result[i].Telefono2,
                    cargo: data.Result[i].Cargo,
                    correo: data.Result[i].Correo,
                    estadoContacto: data.Result[i].CodEstado,
                    estadoText: data.Result[i].Estado
                });
                
            };
            cargarTablaContactos(solicitud.contactos);

        }

        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.consultaContactos);
    }

    function $btnBuscarContactosClick() {
        var nomContacto = $txtContacto.val();
        var Establecimiento = $txtConsultaEstablecimiento.val();

        const result = buscarContactos(nomContacto, Establecimiento);
        cargarTablaContactos(result);
    }

    function buscarContactos(nombre, establecimiento) {
        var contactos = solicitud.contactos;

        return contactos.filter(contacto => {
            return (nombre === '' || contacto.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
                (establecimiento === '' || contacto.establecimiento.toLowerCase().includes(establecimiento.toLowerCase()));
        });
    }

    function btnRegresarClick() {
        var btnRegresar = document.getElementById("btnRegresar");
        if (btnRegresar != null) {
            app.redirectTo("BandejaSolicitudesVentas");
        }
        else {
            var fnSi = function () {
                cancelarEditSol();
            };
            return app.message.confirm("Confirmación", "¿Está seguro que desea cancelar? Se perderán los cambios no guardados.", "Si", "No", fnSi, null);
        };
    };

    function cancelarEditSol() {
        var btnActualizar = document.getElementById("btnActualizar");
        var btnCancelar = document.getElementById("btnCancelarSol");

        $cmbFlujo.val(solicitud.detalleSolicitud[0].flujo).trigger("change.select2");
        $cmbTipo.val(solicitud.detalleSolicitud[0].TipoSol).trigger("change.select2");
        $cmbMedioContacto.val(solicitud.detalleSolicitud[0].MedioContacto).trigger("change.select2");
        $dateSolicitud.val(solicitud.detalleSolicitud[0].fecSolicitud);

        $cmbFlujo.prop("disabled", true);
        $btnEliminarSol.prop("disabled", false);
        $cmbTipo.prop("disabled", true);
        $cmbMedioContacto.prop("disabled", true);
        $dateSolicitud.prop("disabled", true);

        btnActualizar.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar';
        btnCancelar.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i> Regresar'
        btnActualizar.id = 'btnEditarSol';
        btnCancelar.id = 'btnRegresar';
    };

    function $openRegdateSolicitudClick() {
        $dateSolicitud.focus();
    }

    function $openRegdateCotizacionClick() {
        $dateCotizacion.focus();
    }

    function $openRegdateOrdenCompraClick() {
        $dateOrdenCompra.focus();
    }

    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
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

    function $fileCargaDocumentoSustento_change() {
        $lblNombreArchivo.text("");
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
            ext == "pptx" || ext == "PPTX") {
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

    function seleccionarProduct(codigo) {
        $('#tblProductos').off('click', '#btnSeleccionarProducto');
        // Primero elimina cualquier manejador previo en '.btnAccion'
        $('#tblProductos').on('click', '#btnSeleccionarProducto', function () {
        var fila = $(this).closest('tr');  // Obtiene el tr más cercano al botón clickeado

            // Obtén los valores de la fila a la que pertenece el botón clickeado
            var codProduct = fila.find('td').eq(0).text();  // Columna 1
            var tipoProd = fila.find('td').eq(1).text();    // Columna 2
            var descProd = fila.find('td').eq(2).text();    // Columna 3
            var stk = fila.find('td').eq(3).text();         // Columna 4
            var price = fila.find('td').eq(4).text();       // Columna 5
            var undMed = fila.find('td').eq(5).text();      // Columna 6

            var cantidad = 0
            if (stk == 0) {
                cantidad = 0
            }
            else {
                cantidad = 1;
            }

            if (codigoInit == 0) {
                var contador = solicitud.itemProducto.length + 1
                itemProducto = {
                    id: contador,
                    codProduct: codProduct.trim(),
                    tipoProd: tipoProd.trim(),
                    descProd: descProd.trim(),
                    stk: stk,
                    price: price,
                    undMed: undMed.trim(),
                    cantidad: cantidad,
                    hijos: [],
                    padre: 0
                };
                var validacion = [];
                validacion = solicitud.itemProducto.find(producto => producto.codProduct == itemProducto.codProduct)

                if (validacion != undefined) {
                    app.message.error("Validación", "No se puede seleccionar el mismo producto dos veces");
                    return;
                };


                solicitud.itemProducto.push(itemProducto);
                $modalRegistraProductos.modal('toggle');
                $NoRegSelectProduct.remove();
                $loadTable_Products_Select(solicitud.itemProducto);
            }
            else if (codigoInit > 0) {
                var padre = [];
                padre = solicitud.itemProducto.find(producto => producto.id == codigoInit);
                var contador = padre.hijos.length + 1;

                itemProducto = {
                    id: codigoInit.toString()+"."+contador.toString(),
                    codProduct: codProduct.trim(),
                    tipoProd: tipoProd.trim(),
                    descProd: descProd.trim(),
                    stk: stk,
                    price: price,
                    undMed: undMed.trim(),
                    cantidad: cantidad,
                    padre: codigoInit
                };

                for (var i = 0; i < solicitud.itemProducto.length; i++) {
                    if (solicitud.itemProducto[i].id == codigoInit) {
                        solicitud.itemProducto[i].hijos.push(itemProducto);
                    };
                };

                padre = solicitud.itemProducto.find(producto => producto.id == codigoInit);

                $modalRegistraProductos.modal('toggle');
                $loadTable_Products_Select(solicitud.itemProducto);
            };
        });
    };
    
    function reducirCantidad(id) {
        var id = id.toString();
        if (id.indexOf('.') == -1) {
            for (var i = 0; i < solicitud.itemProducto.length; i++) {
                if (solicitud.itemProducto[i].id == id) {
                    solicitud.itemProducto[i].cantidad -= 1;
                };
            };
        }
        else {
            var idxId = id.split('.');
            var producto = solicitud.itemProducto.find(producto => producto.id == idxId[0]);
            for (var i = 0; i < producto.hijos.length; i++) {
                if (producto.hijos[i].id == id) {
                    producto.hijos[i].cantidad -= 1;
                };
            };
        };
    };


    function verSeries(codDetalleDespacho) {
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
            $txtSerie.prop("disabled", true);
            var codUbigeo = data.Result.CodigoUbigeo;
            $hdnIdZonaDespacho.val(codUbigeo);
            $searchZonaDespacho.css("visibility", "visible");
            if (codUbigeo != "" || codUbigeo != null) {
                $searchZonaDespacho.css("visibility", "hidden");
            }
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);
            $txtDireccion.prop("disabled", true);

            $txtGuia.val(data.Result.NumeroGuia);
            $txtGuia.prop("disabled", true);
            var rutaDocumento = data.Result.RutaDocumento
            $lblNombreArchivoDespacho.text(rutaDocumento);
            $("#rowTablaSeriesCargar").hide();

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


    function editarSeries(codDetalleDespacho) {

        //$('#Serie' + codDetalleDespacho).removeAttr('readonly');
        //$('#Serie' + codDetalleDespacho).css('border', '1px solid ');
        //$('#Serie' + codDetalleDespacho).css('background-color', 'white');
        //$('#Boton' + codDetalleDespacho).css('display', 'inline-block');
        //$('#Edi' + codDetalleDespacho).css('display', 'none');
       // $('#Boton' + codDetalleDespacho).css('width', '30px');
        //return;
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
            $searchZonaDespacho.css("visibility", "visible");
            if (codUbigeo != "" || codUbigeo != null) {
                $searchZonaDespacho.css("visibility", "hidden");
            }
            $txtZonaDepacho.val(data.Result.NombreUbigeo);
            var direccion = data.Result.Direccion;
            $txtDireccion.val(direccion);
            $txtDireccion.prop("disabled", false);
            if (direccion != "" || direccion != null) {
                $txtDireccion.prop("disabled", true);
            }
            $txtGuia.val(data.Result.NumeroGuia);
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

            $CodigoDocumentoDespacho.val(data.Result.CodigoDocumento);
                
            $rowTablaSeriesGuias.hide();
            $rowSerieGuia.show();
            $TipoReg.val("U");
            $FlagCargaDocumentoDespacho.val("0");

            if (data.Result.CodigoDocumento === "" || data.Result.CodigoDocumento == null || data.Result.CodigoDocumento == "0") {
                $FlagCargaDocumentoDespacho.val("1");
            }
            $txtSerie.prop("disabled", false);
            $txtGuia.prop("disabled", false);
            $btnCargarOtroDocumento.show();
            $btnRegistrarSerie.show();
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

             
            }
            else {
               

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

    }

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

    function guardarSeries(codDetalleDespacho,stock) {
        var serie = $('#Serie' + codDetalleDespacho).val();
        if (serie === "" || serie == null) {
            app.message.error("Validación", "Debe ingresar el número de serie o lote.");
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/ActualizarNumeroSerie";
            var obj = {
                codDetalleDespacho: codDetalleDespacho,
                NumeroSerie: serie
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    $('#Serie' + codDetalleDespacho).attr('readonly', true);
                    $('#Serie' + codDetalleDespacho).css('border', 'none ');
                    $('#Serie' + codDetalleDespacho).css('background-color', 'transparent');
                    $('#Boton' + codDetalleDespacho).css('display', 'none');
                    $('#Edi' + codDetalleDespacho).css('display', 'inline-block');

                    if (stock == 'S') {
                        var contador = $ContadorSeriesCS.val();
                        contador = parseInt(contador) + 1;
                        $ContadorSeriesCS.val(contador);
                    } else {
                        var contador = $ContadorSeriesSS.val();
                        contador = parseInt(contador) + 1;
                        $ContadorSeriesSS.val(contador);
                    }
                  
                    //style='border: none;background-color: transparent; outline: none;'
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.actualizarSerie);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea registrar el número de serie o lote?", "S&iacute;", "No", fnSi, null);

    }

    function agregarItemServicio(CodigoItem) {
        method = "POST";
        url = "BandejaSolicitudesVentas/AgregarItemCotDetServ";
        var objFiltros = {
            CodItem: CodigoItem
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaServiciosAgregados(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaServiciosAgregados(data) {

        var columns = [
            {
                data: "CodItem",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else {
                        var codigo = "000000" + data;
                        data = codigo.substr(codigo.length - 6, 6);
                    }
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
                data: "VentaUnitaria",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VentaTotalSinIGV",
                render: function (data) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodItem",
                render: function (data) {
                    var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: solicitud.editarItemServ(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',1)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarItemServ" class="btn btn-danger btn-xs" title="Quitar" href="javascript: solicitud.quitarItemServ(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',1)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
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
        filters.dataTablePageLength = 3;

        app.llenarTabla($tblCotDetServiciosAgregados, data, columns, columnDefs, "#tblCotDetServiciosAgregados", rowCallback, null, filters);
    }

    //CARGA los datos de la COTIZACION DETALLE (Servicio)
    function editarItemServ(CodigoItem, opc) {
        $DS_hdnOpcGrillaItems.val(opc);
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetItemServicio";
        var objFiltros = {
            CodItem: CodigoItem,
            opcGrillaItems: opc
        };
        var objParam = JSON.stringify(objFiltros);
        var fnDoneCallBack = function (data) {
            $('#modalDetalleItemServicio').modal('show');
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

    function eliminarDetServ(IdCotDetalle, IdActividad, opc) {
        $DS_hdnOpcGrillaItems.val(opc)
        method = "POST";
        url = "BandejaSolicitudesVentas/EliminarDetServicio";
        objDetalle = {
            IdCotDetalle: IdCotDetalle,
            IdActividad: IdActividad,
            opcGrillaItems: opc
        }
        objParam = JSON.stringify(objDetalle);
        var fnSi = function () {
            var fnDoneCallback = function (data) {
                cargarTablaDetalleServicios(data.Result);
            }
            var fnFailCallback = function () {

            };
            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);
        }
        return app.message.confirm("Eliminación", "¿Está seguro de eliminar el detalle?", "Si", "No", fnSi, null);

    }

    //CARGA los datos de la ACTIVIDAD (Detalle de Servicio) de la COTIZACION DETALLE (Servicio)
    function editarDetServ(IdCotDetalle, IdActividad, opc) {
        $modalDetalleServicio.modal('toggle');
        $btnGuardarDetalleServicio.css('display', 'none');
        $btnActualizarDetalleServicio.css('display', '');
        $DS_hdnOpcGrillaItems.val(opc);
        
        method = "POST";
        url = "BandejaSolicitudesVentas/CargarDetServ";
        var objFiltros = {
            IdCotDetalle: IdCotDetalle,
            IdActividad: IdActividad,
            opcGrillaItems: $DS_hdnOpcGrillaItems.val()
        };
        var objParam = JSON.stringify(objFiltros);
        var fnDoneCallBack = function (data) {
            $DS_hdnIdCotDetServ.val(data.Result.IdCotizacionDetalle);
            $hdnIdDetalleServicio.val(data.Result.Id);
            $txtDetalleServicio.val(data.Result.DescripcionActividad);
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
                html += '<a class="btn btn-primary btn-xs" title="Editar" href="javascript:solicitud.editarDetServ(' + detalle[i].IdCotizacionDetalle + ',\'' + detalle[i].Id + '\',\'' + $DS_hdnOpcGrillaItems.val() + '\')" btn-xs"><i class="fa fa-pencil-square-o"></i></a>&nbsp;';
                html += '<a class="btn btn-primary btn-xs" title="Eliminar" href="javascript:solicitud.eliminarDetServ(' + detalle[i].IdCotizacionDetalle + ',\'' + detalle[i].Id + '\',\'' + $DS_hdnOpcGrillaItems.val() + '\')" btn-xs"><i class="fa fa-trash"></i></a>&nbsp;';
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

    function quitarItemServ(CodigoItem, opc) {

        var fnSi = function () {

            var method = "POST";
            var url = "BandejaSolicitudesVentas/QuitarItemCotDet";
            var objFiltros = {
                CodItem: CodigoItem,
                opcGrillaItems: opc
            };
            var objParam = JSON.stringify(objFiltros);
            var fnDoneCallBack = function (data) {
                var fnCallback = function () {
                    if (opc > 1) {
                        grabarDatosCotDetServV2();
                    }
                    else {
                        cargarTablaServiciosAgregados(data);
                    }
                };
                app.message.success("Grabar", "Registro eliminado con &eacute;xito.", "Aceptar", fnCallback);
            };
            return app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
        }
        return app.message.confirm("Ventas", "&iquest;Esta seguro de quitar un producto de la cotizaci&oacute;n?", "S&iacute;", "No", fnSi, null);
    }

    function cerrarModalDetCotServ() {
        var fnSi = function () {

            method = "POST";
            url = "BandejaSolicitudesVentas/DeshacerCambiosSERTemporales";
            var objDatos = {};
            var objParam = JSON.stringify(objDatos);

            var fnDoneCallBack = function (data) {
                cargarTablaServiciosAgregados(data);
                $('#modalDetalleCotizacionServicio').modal('hide');
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, null);

        }
        return app.message.confirm("Ventas", " Al salir perder&aacute; todos los datos registrados. &iquest;Desea Salir?", "S&iacute;", "No", fnSi, null);
    }

    function guardarAprobDscto() {

        var vAprobDscto = null;

        if (!$AD_radRpta_Si.is(':checked') && !$AD_radRpta_No.is(':checked')) {
            app.message.error("Validaci&oacute;n", "Defina si aprueba o no el descuento.");
            return false;
        }

        if ($AD_radRpta_No.is(':checked') && $.trim($AD_txtComentarios.val()) == "") {
            app.message.error("Validaci&oacute;n", "Ingrese el motivo del rechazo del descuento");
            return false;
        }

        if ($AD_radRpta_Si.is(':checked')) { vAprobDscto = true; }
        if ($AD_radRpta_No.is(':checked')) { vAprobDscto = false; }

        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarAprobDscto";
        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IndDsctoAprob: vAprobDscto,
            AprobDsctoComentario: {
                Id_WorkFlow: $codigoWorkflow.val(),
                Observacion: $AD_txtComentarios.val()
            }
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            $btnAprobarDscto.css("display", "none");
            $modalAprobDscto.modal('hide');
            app.message.success("Validaci&oacute;n", "Se grab&oacute; el registro correctamente");
        };

        var fnFailCallback = function () {
            app.message.error("Validaci&oacute;n", "Error al grabar la aprobaci&oacute;n");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function verComentarioDscto() {
        if ($DsctoRespondido.val() == "S") {
            $AD_radRpta_Si.attr("disabled", "disabled");
            $AD_radRpta_No.attr("disabled", "disabled");
            $AD_txtComentarios.attr("disabled", "disabled");
            if ($DsctoAprobado.val() == "S") {
                $AD_radRpta_No.prop("checked", false);
                $AD_radRpta_Si.prop("checked", true);
            }
            else {
                $AD_radRpta_No.prop("checked", true);
                $AD_radRpta_Si.prop("checked", false);
            }
        }
        $AD_btnGuardarAprobDscto.css("display", "none");
        $modalAprobDscto.modal('show');
    }

    function aprobarCotizacion() {

        if ($.trim($hdnPorcentajeDscto.val()) != "") {
            if ($.trim($hdnPorcentajeDscto.val()) != $.trim($txtPorcentajeDscto.val())) {
                app.message.error("Validación", "Porcentaje de Descuento ha sido cambiado, Deberá ser aprobado nuevamente.");
                return;
            }
        }
        else {
            if ($.trim($hdnPorcentajeDscto.val()) != $.trim($txtPorcentajeDscto.val())) {
                app.message.error("Validación", "Porcentaje de Descuento debe estar aprobado previamente.");
                return;
            }
        }

        if ($.trim($hdnPorcentajeDscto.val()) != "") {
            if ($DsctoRequiereAprobacion.val() == "S") {
                if ($DsctoAprobado.val() != "S") {
                    app.message.error("Validación", "Porcentaje de Descuento aun no ha sido aprobado");
                    return;
                }
            }
        }

        method = "POST";
        url = "BandejaSolicitudesVentas/AprobarCotizacion";
        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IdSolicitud: $numeroSolicitud.val(),
            IdWorkFlow: $idWorkFlow.val()
        };
        var objParam = JSON.stringify(objDatos);


        var fnSi = function () {
            function redirect() {
                app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
            };

            var fnDoneCallBack = function (data) {
                app.message.success("Cotizaci&oacute;n Aprobada", "Se aprob&oacute; la cotizaci&oacute;n correctamente", "Aceptar", redirect);
            };

            var fnFailCallback = function () {
                app.message.error("Validaci&oacute;n", "Error al aprobar la cotizaci&oacute;n");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
        }
        return app.message.confirm("Confirmación", "¿Desea aprobar la cotización?", "S&iacute;", "No", fnSi);
    }

    return {
        seleccionar: seleccionar,
        eliminarObsTmp: eliminarObsTmp,
        eliminarDocTemp: eliminarDocTemp,
        eliminarDocumento: eliminarDocumento,
        download: download,
        seleccionarProduct: seleccionarProduct,
        reducirCantidad: reducirCantidad,
        verHistorial: verHistorial,
        editarSeries: editarSeries,
        verSeries: verSeries,
        guardarSeries: guardarSeries,
        cargarTablaDetCotServicios: cargarTablaDetCotServicios,
        agregarItemServicio: agregarItemServicio,
        quitarItemServ: quitarItemServ,
        editarItemServ: editarItemServ,
        eliminarDetServ: eliminarDetServ,
        editarDetServ: editarDetServ,
        DesasignarTecnico: DesasignarTecnico,
    }
})(window.jQuery, window, document);