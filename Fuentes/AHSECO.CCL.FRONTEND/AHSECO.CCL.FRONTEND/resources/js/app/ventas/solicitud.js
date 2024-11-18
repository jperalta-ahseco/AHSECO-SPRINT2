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
    /*Modales*/
    var $modalObservacion = $('#modalObservacion'); 
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalRegistraProductos = $('#modalRegistraProductos');
    var $modalContactos = $('#modalContactos');

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
    var $txtObservacion = $('#txtObservacion');
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');
    var $btnGuardarObservacionReq = $('#btnGuardarObservacionReq');
    var $btnAdjuntarDocumento = $("#btnAdjuntarDocumento");
    var $tblHistorial = $("#tablaHistorial");
    var $txtCodCotizacion = $("#txtCodCotizacion");
    var $btnImprimirCotizacion = $("#btnImprimirCotizacion");
    var $btnGuiaBO = $("#btnGuiaBO");
    var $btnGuiaPedido = $("#btnGuiaPedido");
    var $divDatosLicitacion = $("#divDatosLicitacion");
    var $txtNroProceso = $("#txtNroProceso");
    var $txtTipoProceso = $("#txtTipoProceso");
    var $idRolUsuario = $("#idRolUsuario");

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
    var $servicios = $('#servicios');
    var $cmbempresa = $("#cmbempresa");

    /*Sección Cotización*/
    var $cmbTipMoneda = $('#cmbTipMoneda');
    var $dateCotizacion = $('#dateCotizacion');
    var $txtVigencia = $('#txtVigencia');
    var $txtPlazoEntrega = $('#txtPlazoEntrega');
    var $cmbTipoPago = $('#cmbTipoPago');
    var $cmbGarantia = $('#cmbGarantia');
    var $txtObs = $('#txtObs');
    var $NoRegMainProd = $('#NoRegMainProd');
    var $openRegdateCotizacion = $('#openRegdateCotizacion');
    var $btnRegistrarCotizacion = $('#btnRegistrarCotizacion');

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

    /** Seccion de Despacho*/
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
    var $btnEnviarGuia = $("#btnEnviarGuia");
    var $btnGuardarGestionLogistica = $("#btnGuardarGestionLogistica");
    var $btnEnviarGestionDespacho = $("#btnEnviarGestionDespacho");
    var $btnEditarGestionLogistica = $("#btnEditarGestionLogistica");
    var $ContadorSeriesCS = $("#ContadorSeriesCS");
    var $ContadorSeriesSS = $("#ContadorSeriesSS");
    var $TotalSeriesCS = $("#TotalSeriesCS");
    var $TotalSeriesSS = $("#TotalSeriesSS");
    var $btnFinalizarVenta = $("#btnFinalizarVenta");

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
        FinalizandoVenta: "Finalizando la venta, por favor espere..."
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
        cargaCombos();
        cotvtadet.ObtenerFiltrosPrecios();
        CargarTipoDocumento(1); //Tipo de Proceso "Ventas"
        

        setTimeout(function () {
            cargarDatosSolicitud();
        }, 2000);


        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        
        $dateCotizacion.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format:'dd/mm/yyyy'
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

        $dateSolicitud.val(hoy());
        $dateCotizacion.val(hoy());
        $dateOrdenCompra.val(hoy());
        $dateEntregaPedidoCE.val(hoy());
        $cmbTipo.on("change", VerServicios);
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $btnEliminarSol.click(btnEliminarSolClick);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnRegistrarCotizacion.click(registrarCotizacion);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnAgregarObservacion.click($modalObservacionClick);
        $openRegdateSolicitud.click($openRegdateSolicitudClick);
        $openRegdateCotizacion.click($openRegdateCotizacionClick);
        $openRegdateOrdenCompra.click($openRegdateOrdenCompraClick)
        $btnBuscarContactos.click($btnBuscarContactosClick);
        $btnRegresar.click(btnRegresarClick);
        $searchContacto.click($btnSearchContactoClick);
        $agregarContacto.click($agregarContactoClick);
        $btnRegistrar.click($btnRegistrarClick);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnHistorial.click($btnHistorial_click);
        $btnBuscarHistorial.click($btnHistorial_click);
        $btnImprimirCotizacion.click($btnImprimirCotizacion_click);
        $btnGuiaBO.click($btnGuiaBO_click);
        $btnGuiaPedido.click($btnGuiaPedido_click);
        $btnGuardarGestion.click($btnGuardarGestion_click);
        $cmbTipoVenta.on("change", changeTipoVenta);
        $dateOrdenCompra.on("change", $dateOrdenCompra_change);
        $btnRegistrarSerie.click($btnRegistrarSerie_click);
        $btnEditarGestion.click($btnEditarGestion_click);
        $btnActualizarGestion.click($btnActualizarGestion_click);
        $btnEnviarGuia.click($btnEnviarGuia_click);
        $btnGuardarGestionLogistica.click($btnGuardarGestionLogistica_click);
        $btnEnviarGestionDespacho.click($btnEnviarGestionDespacho_click);
        $btnEditarGestionLogistica.click($btnEditarGestionLogistica_click);
        $btnFinalizarVenta.click($btnFinalizarVenta_click);
        CalcularFechaEntregaMaxima();
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
        return app.message.confirm("Ventas", "¿Está seguro que desea finalizar la venta?", "Sí", "No", fnSi, null);

    }

    function $btnEnviarGestionDespacho_click() {
        if ($dateEntregaPedidoCE.val() === "" || $dateEntregaPedidoCE.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido de los productos con stock");
            return false;
        }
        if ($txtNumeroFacturaCE.val() === "" || $txtNumeroFacturaCE.val() == null) {
            app.message.error("Validación", "Debe ingresar el N° de Factura de los productos con stock");
            return false;
        }
        if ($txtNumeroGuiaRemisionCE.val() === "" || $txtNumeroGuiaRemisionCE.val() == null) {
            app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos con stock");
            return false;
        }
        if (parseInt($ContadorSeriesCS.val()) != parseInt($TotalSeriesCS.val())) {
            app.message.error("Validación", "Debe ingresar todas las series de los productos con stock antes de enviar a gestión.");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGestionVentaConStock?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val();
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
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar a gestión?", "Sí", "No", fnSi, null);

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
        if ($dateEntregaPedidoCE.val() === "" || $dateEntregaPedidoCE.val() == null) {
            app.message.error("Validación", "Debe seleccionar la fecha de entrega de pedido de los productos con stock");
            return false;
        }
        if ($txtNumeroFacturaCE.val() === "" || $txtNumeroFacturaCE.val() == null) {
            app.message.error("Validación", "Debe ingresar el N° de Factura de los productos con stock");
            return false;
        }
        if ($txtNumeroGuiaRemisionCE.val() === "" || $txtNumeroGuiaRemisionCE.val() == null) {
            app.message.error("Validación", "Debe ingresar el N° de Guia de Remision de los productos con stock");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "P",
                CodigoSolicitud: $numeroSolicitud.val(),
                Stock: "S",
                NumeroGuiaRemision: $txtNumeroGuiaRemisionCE.val(),
                NumeroFactura: $txtNumeroFacturaCE.val(),
                FechaEntrega: $dateEntregaPedidoCE.val()
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
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de despacho?", "Sí", "No", fnSi, null);

    }
    function $btnEnviarGuia_click() {
        var documento_guiaPedido = 0;
        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].CodigoTipoDocumento == "DVT04") {
                documento_guiaPedido = 1;
            }
        });

        if (documento_guiaPedido === 0) {
            app.message.error("Validación", "Debe adjuntar un documento de guía de pedido.");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/EnviarGuiaPedidos?codigoSolicitud=" + $numeroSolicitud.val() + "&codigoWorkFlow=" + $codigoWorkflow.val();
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
        return app.message.confirm("Ventas", "¿Está seguro que desea enviar la Guia de Pedido?", "Sí", "No", fnSi, null);
    }

    function $btnEditarGestion_click() {
        $txtNroOrdenCompra.prop('disabled', false);
        $dateOrdenCompra.prop('disabled', false);
        $openRegdateOrdenCompra.prop('disabled', false);
        $btnEditarGestion.hide();
        $btnActualizarGestion.show();
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
        return app.message.confirm("Ventas", "¿Está seguro que desea actualizar los datos de despacho?", "Sí", "No", fnSi, null);
    }

    function $btnGuardarGestion_click() {
        
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
                    if ($cmbTipo.val() == "TSOL05") {
                        var m2 = "POST";
                        var url2 = "BandejaSolicitudesVentas/EnviarGestionServicioTecnico?codigoSolicitud=" + $numeroSolicitud.val();
                        var objParam2 = '';
                        var fnDoneCallback2 = function (data2) {
                            var fnCallback2 = function () {
                                location.reload();
                            }
                            if (data2.Result.Codigo > 0) {
                                app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback2);
                            }
                            else {
                                app.message.error("Grabar", data.Result.Mensaje, "Aceptar", null);
                            }
                        };

                        return app.llamarAjax(m2, url2, objParam2, fnDoneCallback2, null, null, mensajes.RegistrarGestionVenta);
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
        return app.message.confirm("Ventas", "¿Está seguro que desea iniciar el proceso de ventas?", "Sí", "No", fnSi, null);
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
        url = 'BandejaHistorialCotizacion/GenerarCotizacion?codCotizacion=' + codigo;

        objParam ='';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFile?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la cotización correctamente.")
        }
        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarCotizacion);
    }

    function $btnGuiaPedido_click() {
        var num_solicitud = $numeroSolicitud.val();
        var tipo = "GP"
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud;

        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaPedido?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de pedidos correctamente.")
        }
        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.GenerarGuiaPedidos);
    }

    function $btnGuiaBO_click() {
        var num_solicitud = $numeroSolicitud.val();
        var tipo = "BO"
        method = 'POST';
        url = 'BandejaHistorialCotizacion/ExportarDocumentosVentas?tipo=' + tipo + "&codSolicitud=" + num_solicitud;
        objParam = '';

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaHistorialCotizacion/ExportarFileGuiaBO?nombreDoc=" + data.Archivo);
            app.message.success("Ventas", "Se generó la guía de BO correctamente.")    
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

    function verHistorial(codCotizacion) {
        console.log(codCotizacion);
    }
    
    function VerServicios() {
        var tipo = $('select[id="cmbTipo"] option:selected').text()
       // por el momento utilizaremos el nombre, cuando se cambie, utilizaremos el ID.......
        if (tipo == "Servicio") {
            $servicios.show();
        }
        else {
            $servicios.hide ();
        }
    };
    
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
        method = "POST";
        url = "BandejaSolicitudesVentas/GrupoSolicitudVentaFiltro?codFlujo=" + codFlujo;
        var objComb = "";
        objComb = JSON.stringify(objComb);

        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Seleccionar --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbGarantia, data.Result.Garantias, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipMoneda, data.Result.TipoMoneda, null, "", "", filters);
            app.llenarComboMultiResult($cmbFlujo, data.Result.Flujos, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipo, data.Result.TipoSol, null, "", "", filters);
            app.llenarComboMultiResult($cmbMedioContacto, data.Result.MedioContacto, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipoPago, data.Result.FormPago, null, "", "", filters);
            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, "", "", filters);
            app.llenarComboMultiResult($cmbTipoVenta, data.Result.TipoVenta, null, "", "", filters);
        };

        var fnFailCallback = function () {
            app.message.error("Validación", "Error al cargar los combos.");
        };

        app.llamarAjax(method, url, objComb, fnDoneCallback, fnFailCallback, null, null);
    };

    function CargarTipoDocumento(codFlujo) {
        var method = "POST";
        var url = "Utiles/ListarTipoDocumentos?codFlujo=" + codFlujo;
        var objParam = '';
        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbTipoDocumentoCarga, data, null, 0, "--Seleccione--", filters);

        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoTipoDocumento);
    }

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
            return app.message.confirm("Solicitud de Venta", "¿Está seguro que desea eliminar el documento adjunto?", "Sí", "No", fnSi, null);
        };
    };

    function $adjuntarDocumento_click() {
        //$fileCargaDocumentoSustento.click();
        $lblNombreArchivo.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustento').click();

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
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:solicitud.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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

        if ($numeroSolicitud.val() != "") {
            var method = "POST";
            var url = "BandejaSolicitudesVentas/GuardarObservacion"
            var objObservacion ={
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
                var nuevoTr = "<tr id=row" + solicitud.contadorObservaciones +">" +
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
            var nuevoTr = "<tr id=row" + solicitud.contadorObservaciones +">" +
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
        $txtObservacion.val("");
    }

    function btnEliminarSolClick() {

        var method = "POST";
        var url = "BandejaSolicitudesVentas/CancelarSolicitud"
        var objSolicitud = {
            Id_Solicitud: $numeroSolicitud.val()
        };
        objParam = JSON.stringify(objSolicitud);

        function redirect() {
            app.redirectTo("BandejaSolicitudesVentas");
        };

        var fnDoneCallBack = function () {
            app.message.success("Ventas", "Se canceló la solicitud correctamente.", "Aceptar", redirect);
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Error al cancelar la solicitud.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);

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

        if ($cmbTipoPago.val() === "" || $cmbTipoPago.val() == undefined || $cmbTipoPago.val() == null) {
            app.message.error("Validación", "Debe de seleccionar la forma de pago.");
            return;
        };

        if ($cmbTipMoneda.val() === "" || $cmbTipMoneda.val() == undefined || $cmbTipMoneda.val() == null) {
            app.message.error("Validación", "Debe de seleccionar el tipo de moneda.");
            return;
        };

        if ($txtVigencia.val().trim() === "" || $txtVigencia.val().trim().length <= 0 || $txtVigencia.val().trim() == null) {
            app.message.error("Validación", "Debe de ingresar el plazo de vigencia de la cotización.");
            return;
        };

        if ($cmbGarantia.val() === "" || $cmbGarantia.val() == undefined || $cmbGarantia.val() == null) {
            app.message.error("Validación", "Debe de ingresar el periodo de garantía.");
            return;
        };

        //if ($txtCostoEnvio.val().trim() === "" || $txtCostoEnvio.val().trim().length <= 0 || $txtCostoEnvio.val().trim() == null) {
        //    app.message.error("Validación", "Debe de ingresar los costos de envío.");
        //    return;
        //};
        
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

        return;

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

    function $modalObservacionClick() {
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

        if ($cmbTipoVenta.val() === "2") { //Si es de licitación:
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
                NumProceso: $txtNroProceso.val(),
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
            ext == "docx" || ext == "DOCX") {
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

    function cargarDatosSolicitud() {//Para todos excepto Registro de Solicitud. 
        if ($numeroSolicitud.val() != "") {
            method = "POST";
            url = "BandejaSolicitudesVentas/VerDetalleSolicitud"
            objBuscar = {
                IdCliente: $idCliente.val(),
                Id_Solicitud: $numeroSolicitud.val(),
                Id_WorkFlow: $codigoWorkflow.val()
            };

            objParam = JSON.stringify(objBuscar);

            var fnDoneCallBack = function (data) {
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

                //para despacho:
                $txtNroOrdenCompra.val(data.Result.ContadorCabecera.NumeroOrden);
                $dateOrdenCompra.val(data.Result.ContadorCabecera.FechaOrden);
                $txtFechaEntregaMax.val(data.Result.ContadorCabecera.FechaMaxima);


                $txtNroOrdenCompra.prop('disabled', true);
                $dateOrdenCompra.prop('disabled', true);
                $openRegdateOrdenCompra.prop('disabled', true);

                if ($estadoSol.val() == "SFIN" || $estadoSol.val() == "NOVT") {
                    $btnCargarDocumento.hide();
                    $btnAgregarObservacion.hide();
                    $btnAgregarDocumento.hide();
                }

                if (data.Result.ContadorCabecera.NumeroConStock > 0) {

                    for (i = 0; i < data.Result.ContadorCabecera.NumeroConStock; i++) {
                        var html = '<div class="text-center">';
                        if ($estadoSol.val() == "PRVT" && $idRolUsuario.val() == "SGI_VENTA_LOGISTICA") {

                        html += ' <a class="btn btn-default btn-xs" title="Editar" id="Edi' + data.Result.DespachoDetalleConStock[i].Id +'" href="javascript:solicitud.editarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                        html += ' <a class="btn btn-default btn-xs" title="Guardar" id="Boton' + data.Result.DespachoDetalleConStock[i].Id +'" style="display:none"  href="javascript:solicitud.guardarSeries(' + data.Result.DespachoDetalleConStock[i].Id + ')"><i class="fa fa-save" aria-hidden="true"></i></a>&nbsp;';
                        }
                        html += '</div>';
                        var nuevoTr = "<tr bgcolor='d0f2f7' id='fila" + data.Result.DespachoDetalleConStock[i].Id + "'>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].RowNumber + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].CodigoEquipo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].DescripcionEquipo + "</th>" +
                            "<th>" + data.Result.DespachoDetalleConStock[i].Marca + "</th>" +
                            "<th><input type='text' style='border: none;background-color: transparent; outline: none;' readonly id='Serie" + data.Result.DespachoDetalleConStock[i].Id+"' value='" + data.Result.DespachoDetalleConStock[i].NumeroSerie + "'></th>" +
                            "<th>" + html + "</th>" +
                            "</tr>";

                        $NoRegSeries.hide();
                        $tblSeriesCS.append(nuevoTr);
                    }

                    $dateEntregaPedidoCE.val(data.Result.DespachoCabeceraConStock.FechaEntrega);
                    $txtNumeroFacturaCE.val(data.Result.DespachoCabeceraConStock.NumeroFactura);
                    $txtNumeroGuiaRemisionCE.val(data.Result.DespachoCabeceraConStock.NumeroGuiaRemision);
                   

                    if (data.Result.ContadorCabecera.GestionLogConStock > 0) {
                        $dateEntregaPedidoCE.prop('disabled', true);
                        $txtNumeroFacturaCE.prop('disabled', true);
                        $txtNumeroGuiaRemisionCE.prop('disabled', true);
                        $opendateEntregaPedidoCE.prop('disabled', true);
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
                        html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:solicitud.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';

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
            };
            var fnFailCallBack = function () {
                app.message.error("Validación", "Hubo un error en obtener el detalle de la solicitud.")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.consultandoDetalleSolicitud)
        }
        else {
            $cmbFlujo.prop("disabled", true);
            var rol = $idRolUsuario.val();
            if (rol == "SGI_VENTA_ASESOR" || rol == "SGI_VENTA_COORDINAVENTA") {
                $cmbFlujo.val("1").trigger("change.select2");
            }
            else if (rol == "SGI_VENTA_COORDINASERV" || rol == "SGI_VENTA_COORDINAATC") {
                $cmbFlujo.val("2").trigger("change.select2");
            }
        };
    };

    function editarSeries(codDetalleDespacho) {

        $('#Serie' + codDetalleDespacho).removeAttr('readonly');
        $('#Serie' + codDetalleDespacho).css('border', '1px solid ');
        $('#Serie' + codDetalleDespacho).css('background-color', 'white');
        $('#Boton' + codDetalleDespacho).css('display', 'inline-block');
        $('#Edi' + codDetalleDespacho).css('display', 'none');
       // $('#Boton' + codDetalleDespacho).css('width', '30px');
        return;
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
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.consultaDetalleDespacho);
    }

    function $btnRegistrarSerie_click() {
        if ($txtSerie.val() === "" || $txtSerie.val() == null) {
            app.message.error("Validación", "Debe ingresar el número de serie.");
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/ActualizarNumeroSerie";
            var obj = {
                codDetalleDespacho: $codDetalleDespacho.val(),
                NumeroSerie: $txtSerie.val()
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
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.actualizarSerie);
        }
        return app.message.confirm("Ventas", "¿Está seguro que registrar el número de serie?", "Sí", "No", fnSi, null);

    }

    function guardarSeries(codDetalleDespacho) {
        var serie = $('#Serie' + codDetalleDespacho).val();
        if (serie === "" || serie == null) {
            app.message.error("Validación", "Debe ingresar el número de serie.");
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
                    var contador = $ContadorSeriesCS.val();
                    contador = parseInt(contador) + 1;
                    $ContadorSeriesCS.val(contador);
                    //style='border: none;background-color: transparent; outline: none;'
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.actualizarSerie);
        }
        return app.message.confirm("Ventas", "¿Está seguro que desea registrar el número de serie?", "Sí", "No", fnSi, null);

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
        guardarSeries: guardarSeries
    }
})(window.jQuery, window, document);