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
    var $modalDetalleProductos = $('#modalDetalleProductos');
    var $modalConsultaProductos = $('#modalConsultaProductos');

    /*variables de los modales*/
    var $NoExisteRegObs = $('#NoExisteRegObs');
    var $tblObservaciones = $('#tblObservaciones');
    var $tblSeguimiento = $('#tblSeguimiento');
    var $NoExisteRegDoc = $('#NoExisteRegDoc');
    var $NoExisteRegSeg = $('#NoExisteRegSeg');
    var $tblDocumentosCargados = $('#tblDocumentosCargados');
    var $btnCargarDocumento = $('#btnCargarDocumento');
    var $formDocumento = $('#formDocumento');
    var $hdnDocumentoCargadoId = $('#hdnDocumentoCargadoId');
    var $cmbTipoDocumentoCarga = $('#cmbTipoDocumentoCarga');
    var $cmbDocumentoCarga = $('#cmbDocumentoCarga');
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');
    var $lblNombreArchivo = $('#lblNombreArchivo');
    var $fileCargaDocumentoSustento = $('#fileCargaDocumentoSustento');
    var $formObservacion = $('#formObservacion');
    var $hdnObservacionId = $('#hdnObservacionId');
    var $txtObservacion = $('#txtObservacion');
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');
    var $btnGuardarObservacionReq = $('#btnGuardarObservacionReq');
    var $btnGuardarObservacion = $('#btnGuardarObservacion');
    var $btnAdjuntarDocumento = $("#btnAdjuntarDocumento");
    var $tblHistorial = $("#tablaHistorial");
    var $txtCodCotizacion = $("#txtCodCotizacion");
    var $btnImprimirCotizacion = $("#btnImprimirCotizacion");
    var $btnGuiaBO = $("#btnGuiaBO");
    var $btnGuiaPedido = $("#btnGuiaPedido");
    var $formGestionVenta = $("#formGestionVenta");


    /*Sección Solicitud*/
    var $cmbServicios = $('#cmbServicios');
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
    var $btnRegresar = $("#btnRegresar");
    var $btnActualizar = $('#btnActualizar');
    var $servicios = $('#servicios');
    var $cmbempresa = $("#cmbempresa");
    /*Sección Cotización*/
    var $tblDetalleCotizacion = $('#tblDetalleCotizacion');
    var $cmbTipMoneda = $('#cmbTipMoneda');
    var $dateCotizacion = $('#dateCotizacion');
    var $txtVigencia = $('#txtVigencia');
    var $txtPlazoEntrega = $('#txtPlazoEntrega');
    var $cmbTipoPago = $('#cmbTipoPago');
    var $cmbGarantia = $('#cmbGarantia');
    var $txtObs = $('#txtObs');
    var $NoRegMainProd = $('#NoRegMainProd');
    //var $txtCostoEnvio = $('#txtCostoEnvio');
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
    var $txtSelectNomProducto = $('#txtSelectNomProducto');
    var $txtSelectCodProducto = $('#txtSelectCodProducto');
    var $cmbFamilia = $('#cmbFamilia');
    var $cmbTipoMedida = $('#cmbTipoMedida');
    var $cmbMarca = $('#cmbMarca');
    var $tblConsultaProductos = $('#tblConsultaProductos');
    var $tblProductos = $('#tblProductos');
    var $NumRegProductos = $('#NumRegProductos');
    var $tblMainProducts = $('#tblMainProducts');
    var $tableCalibracion = $('#tableCalibracion');
    var $tableInstalacion = $('#tableInstalacion');
    var $tablemantenimiento = $('#tablemantenimiento');
    var $tableTransporte = $('#tableTransporte');
    var $btnAgregarDetalle = $('#btnAgregarDetalle');
    var $btnAñadirProductos = $('#btnAñadirProductos');
    var $btnBuscar = $('#btnBuscar');
    var $btnCerrarRegistraProd = $('#btnCerrarRegistraProd');
    var $btnBuscarProductos = $('#btnBuscarProductos');
    var $txtCodProducto = $('#txtCodProducto');
    var $txtNomProducto = $('#txtNomProducto');
    var $bodyProductosSelect = $('#bodyProductosSelect');
    var $btnHistorial = $("#btnHistorial");
    var $btnBuscarHistorial = $("#btnBuscarHistorial");

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
        GenerarBO: "Generando BO, por favor espere..."
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
        CargarTipoDocumento(4); //Tipo de Proceso "Ventas"
        cargarDatosSolicitud();
        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        //$dateSolicitud.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);

        $dateCotizacion.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format:'dd/mm/yyyy'
        });

        $dateSolicitud.val(hoy());
        $dateCotizacion.val(hoy());
        $cmbTipo.on("change", VerServicios);
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $btnBuscar.click(BuscarProductosSeleccionados);
        $btnCerrarRegistraProd.click($btnCerrarRegistraProdClick);
        $btnEliminarSol.click(btnEliminarSolClick);
        $btnEditarSol.click(btnEditarSolClick);
        $btnBuscarProductos.click(ConsultaProductosClick);
        $btnGrabarDetalle.click($GrabarDetalle);
        //$btnAgregarDetalle.click(ConsultaProductosClick);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnRegistrarCotizacion.click(registrarCotizacion);
        $btnAñadirProductos.click(añadirProductos);
        //$btnActualizar.click($btnActualizarClick);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnAgregarObservacion.click($modalObservacionClick);
        $openRegdateSolicitud.click($openRegdateSolicitudClick);
        $openRegdateCotizacion.click($openRegdateCotizacionClick);
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
        inicializarBotonesCantidad();
        //crearTablaProductos();
        $('#tblConsultaProductos tbody').on('click', 'td #btnAñadirChild', function () {
            var tr = $(this).closest('tr');
            var row = $('#tblConsultaProductos').dataTable().api().row(tr);

            if (row.child.isShown()) {
                // Si la fila hija está visible, ocultarla
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Si no, mostrar la fila hija
                if (row.data().hijos.length == 0) {
                    row.child('<a class="btn btn-green btn-xs" title="Añadir" href="javascript:solicitud.añadirAccesorio(' + row.data().id + ')"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Accesorio</a>&nbsp;').show();
                }
                else if (row.data().hijos.length > 0) {
                    var producto = row.data();
                    var childTableHtml = '<table class="table table-hover table-condensed table-striped table-bordered dataTable no-footer"><tbody><tr><td colspan="10" style="background-color:black;color:white;"><center><strong>ACCESORIOS</strong></center></td></tr>';

                    for (var i = 0; i < producto.hijos.length; i++) {
                        var valorStk = 'Si'
                        if (producto.hijos[i].stk < 1) {
                            valorStk = 'No'
                        };

                        var contador = i+1;

                        childTableHtml += "<tr>" +
                            "<td style='width:3.4%;'><i class='fa fa-circle-o' aria-hidden='true'></i></td>" +
                            "<td style='text-align:center;width:5.5%'><center>" + producto.id + "." + contador+"</center></td>" +
                            "<td style='text-align:center;width:13%'><center>" + producto.hijos[i].codProduct + "</center></td>" +
                            "<td style='text-align:center;width:12.3%'><center>" + producto.hijos[i].tipoProd + "</center></td>" +
                            "<td style='text-align:center;width:20.9%'><center>" + producto.hijos[i].descProd + "</center></td>" +
                            "<td style='text-align:center;width:11.8%'><center>" + valorStk + "</center></td>" +
                            "<td style='text-align:center;width:10.9%'><center>" + producto.hijos[i].price + "</center></td>" +
                            "<td style='text-align:center;width:8.5%'><center>" + producto.hijos[i].undMed + "</center></td>" +
                            "<td style='text-align:center;width:9.6%'>";
                            if (producto.hijos[i].cantidad > 0) {
                                if (producto.hijos[i].cantidad == producto.hijos[i].stk) {
                                    if (producto.hijos[i].cantidad == 1) {
                                        childTableHtml += '<center><a id="aumento" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + producto.hijos[i].cantidad + '<a id="reducir" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                                    }
                                    else {
                                        childTableHtml += '<center><a id="aumento" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + producto.hijos[i].cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                                    };
                                }
                                else {
                                    if (producto.hijos[i].cantidad == 1) {
                                        childTableHtml += '<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + producto.hijos[i].cantidad + '<a id="reducir" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                                    }
                                    else {
                                        childTableHtml += '<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + producto.hijos[i].cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + producto.hijos[i].id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                                    };
                                };
                            }
                            else {
                                childTableHtml += '<center>' + '0' + '</center>';
                            };

                            childTableHtml += "</td>"

                        childTableHtml += "<td style='text-align:center;width:10%;'><center><a style='color:red;' id='btnEliminarProduct' class='btn btn-green btn-xs' title='Seleccionar' href='javascript: solicitud.eliminarProducttemp(" + producto.hijos[i].id + ")'><i class='fa fa-trash' aria-hidden='true'></i> Eliminar</a></center></td></tr>";
                    }

                    childTableHtml += '<tr><td colspan="10"><a class="btn btn-green btn-xs" title="Añadir" href="javascript:solicitud.añadirAccesorio(' + producto.id + ')"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Accesorio</a></td></tr>';
                    // Agregar la fila para el botón
                    childTableHtml += '</tbody></table>';

                    // Aquí se usa row.child() para mostrar la tabla
                    row.child(childTableHtml).show();

                    // Esto asegurará que el padre se expanda para mostrar la tabla correctamente
                    row.child().show();
                }

                tr.addClass('shown');
            }
        });
        // Función para dar formato a la fila hija
    };

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

    function detalleHijo(id) {
        var tr = $(this).closest('tr');
        var row = $('#tblConsultaProductos').dataTable().api().row(tr);



        if (row.child.isShown()) {
            // Si la fila hija está visible, ocultarla
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Si no, mostrar la fila hija
            row.child(format(id)).show();
            //row.child(format(2)).show();
            tr.addClass('shown');
        }
        function format(data) {
            return '<a class="btn btn-default btn-xs" title="Añadir" href="javascript:solicitud.añadirAccesorio(' + data+ ')"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Accesorio</a>&nbsp;';
        };
    }

    /*Carga combos*/
    function ObtenerFiltrosPrecios() {
        var method = "POST";
        var url = "CatalogoPrecios/FiltrosPrecios";
        var oValores = {
            CodTipoSol: $cmbTipo.val()
        };
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {

            //Cargar combo de marcas:
            var filters2 = {};
            filters2.placeholder = "-- Todos --";
            filters2.allowClear = false;
            app.llenarComboMultiResult($cmbMarca, data.Result.Marcas, null, 0, "--Todos--", filters2);

            //Cargar combo de familias:
            var filters3 = {};
            filters3.placeholder = "-- Todos --";
            filters3.allowClear = false;
            app.llenarComboMultiResult($cmbFamilia, data.Result.Familias, null, 0, "--Todos--", filters3);

            //Cargar combo de medidas:
            var filters4 = {};
            filters4.placeholder = "-- Todos --";
            filters4.allowClear = false;
            app.llenarComboMultiResult($cmbTipoMedida, data.Result.Medidas, null, 0, "--Todos--", filters4);

        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
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

    function crearTablaProductos() {

        var table;
        table = $('#tblConsultaProductos').dataTable({
            paging: true,
            searching: false,
            ordering: false,
            lengthChange: false,
            info: false
        }).api();
        // Añadir la funcionalidad de filas hijo
        $('#tblConsultaProductos tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);

            if (row.child.isShown()) {
                // Si la fila hija está visible, ocultarla
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Si no, mostrar la fila hija
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });
        // Función para dar formato a la fila hija
        function format(data) {
            return '<div>Información adicional para </div>'; // Aquí puedes agregar más información
        };
    }

    function cargaCombos() {
        method = "POST";
        url = "BandejaSolicitudesVentas/GrupoSolicitudVentaFiltro"
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
    function cargarTablaProductos(data, codigo) {
        codigoInit = codigo;
        var columns = [
            {
                data: "CodigoProducto",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NombreFamilia",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NombreProducto",
                render: function (data) {
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
                data: "PrecioReferencial",
                render: function (data) {
                    var precio = data.toFixed(2)
                    return '<center>' + precio + '</center>';
                }
            },
            {
                data: "UnidadMedida",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodigoProducto",
                render: function (data) {
                    if (codigoInit == 0) {
                        var seleccionar = '<a id="btnSeleccionarProducto" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: solicitud.seleccionarProduct(' + 0 + ')"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
                    }
                    else {
                        var seleccionar = '<a id="btnSeleccionarProducto" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: solicitud.seleccionarProduct(' + codigoInit + ')"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
                    }
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

        var filters =
        {
            dataTableSearching: false,
            dataTablePageLength: 10
        }

        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 10;
        app.llenarTabla($tblProductos, data, columns, columnDefs, "#tblProductos", rowCallback, null, filters);
    }

    /*Funciones auxiliares*/
    function buscarProductos(nomProducto, codProducto) {
        var productos = solicitud.itemProducto;

            return productos.filter(producto => {
            return (nomProducto === '' || producto.descProd.toLowerCase().includes(nomProducto.toLowerCase())) &&
                (codProducto === '' || producto.codProduct.toLowerCase().includes(codProducto.toLowerCase()));
        });
    };

    /*Botones Click*/
    function añadirAccesorio(codigo) {
        $cmbFamilia.val("08  ").trigger("change.select2");
        $modalRegistraProductos.modal('toggle');
        $cmbFamilia.prop('disabled', true);
        ConsultaProductosClick(codigo);
    };
    function añadirProductos() {
        $cmbFamilia.val("0").trigger("change.select2");
        $cmbFamilia.prop('disabled', false);
        ConsultaProductosClick(0);
    };
    function ConsultaProductosClick(codigo) {
        var codigoInit = codigo;
        method = "POST";
        url = "CatalogoPrecios/ObtenerPrecios";
        var objPrecio = {
            CodigoProducto: $txtCodProducto.val(),
            NombreProducto: $txtNomProducto.val(),
            UnidadMedida: $cmbTipoMedida.val(),
            CodigoFamilia: $cmbFamilia.val(),
            CodigoMarca: $cmbMarca.val(),
            NumeroPaginas: 500,
            Pagina: 1
        };
        var objParam = JSON.stringify(objPrecio);

        var fnDoneCallBack = function (data) {
            cargarTablaProductos(data, codigoInit);
        };

        var fnFailCallBack = function () {
            cargarTablaProductos();
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack);
    };
    function BuscarProductosSeleccionados() {
        var nomProducto = $txtSelectNomProducto.val();
        var codProducto = $txtSelectCodProducto.val();

        const result = buscarProductos(nomProducto, codProducto);

        $loadTable_Products_Select(result);
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

    function $GrabarDetalle() {
        if (solicitud.itemProducto.length == 0) {
            app.message.error("Validación", "Debe de registrar por lo menos un producto");
            return;
        };
        var fnSi = function () {

            //solicitud.itemCalibra = solicitud.itemProducto;
            //solicitud.mainProducto = solicitud.itemProducto;
            //solicitud.itemCalibra = solicitud.itemProducto;
            //solicitud.itemInstall = solicitud.itemProducto;
            //solicitud.itemMant = solicitud.itemProducto;
            //solicitud.itemTransporte = solicitud.itemProducto;

            for (var i = 0; i < solicitud.itemProducto.length; i++) {
                solicitud.mainProducto.push(solicitud.itemProducto[i]); //inserta padre
                for (var j = 0; j < solicitud.itemProducto[i].hijos.length; j++) {
                    solicitud.mainProducto.push(solicitud.itemProducto[i].hijos[j]); //Inserta hijos.
                };
            };

            $NoRegMainProd.remove();
            cargarTablaMainProducto();
            $modalDetalleProductos.modal('toggle');

        };
        return app.message.confirm("Confirmación", "Está seguro que desea realizar el registro del detalle de cotización?", "Si", "No", fnSi, null);
    };

    function cargarTablaMainProducto() {
        var data = Result = [];
        data.Result = solicitud.mainProducto;
        var columns = [
            {
                data: "id",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "codProduct",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "descProd",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "stk",
                render: function (data, type, row) {
                    if (data > 0) {
                        return '<center>' + 'Si' + '</center>';
                    }
                    else {
                        return '<center>' + 'No' + '</center>';
                    }
                }
            },
            {
                data: "undMed",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "cantidad",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "id",
                render: function (data, row, type) {
                    return '<center>' + 'Hola' + '</center>';
                }
            },
            {
                data: "id",
                render: function (data, row, type) {
                    return '<center><input placeholder="Ganancia" style="width:80px" type="text" class="form-control input-sm" id="txtGanancia"></center>';
                }
            },
            {
                data: "id",
                render: function (data, row, type) {
                    return '<center>' + 'Hola' + '</center>';
                }
            }
        ];

        var columnDefs = [

        ];

        app.llenarTabla($tblMainProducts, data, columns, columnDefs, "#tblMainProducts", null, null, null);
        app.llenarTabla($tableCalibracion, data, columns, columnDefs, "#tableCalibracion", null, null, null);
        app.llenarTabla($tableInstalacion, data, columns, columnDefs, "#tableInstalacion", null, null, null);
        app.llenarTabla($tablemantenimiento, data, columns, columnDefs, "#tablemantenimiento", null, null, null);
        app.llenarTabla($tableTransporte, data, columns, columnDefs, "#tableTransporte", null, null, null);
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

        if ($txtPlazoEntrega.val().trim() === "" || $txtPlazoEntrega.val().trim().length <= 0 || $txtPlazoEntrega.val().trim() == null) {
            app.message.error("Validación", "Debe de ingresar el plazo de entrega de la cotización.");
            return;
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
    function btnEditarSolClick() {
        var btnEditr = document.getElementById("btnEditarSol");
        var btnRegresar = document.getElementById("btnRegresar");
        if (btnEditr != null) {
            $dateSolicitud.prop("disabled", false);
            $btnEliminarSol.prop("disabled", true);
            btnEditr.innerHTML = '<i class="fa fa-wrench" aria-hidden="true"></i> Actualizar';
            btnRegresar.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancelar'
            btnEditr.id = 'btnActualizar';
            btnRegresar.id = 'btnCancelarSol';
        }
        else {
            $btnActualizarClick()
        }
    };
    function $btnActualizarClick() {
        console.log("Hola");
    }
    function $btnCerrarRegistraProdClick() {
        if ($numeroSolicitud.val() != "") {
            $modalRegistraProductos.modal('toggle');
        }
        else {
            $modalRegistraProductos.modal('toggle');
        };
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
            app.message.error("Validación", "Debe de escoger el flujo de la solicitud.");
            return;
        };

        if ($cmbTipo.val() === "") {
            app.message.error("Validación", "Debe de escoger el tipo de solicitud.");
            return;
        };

        if ($cmbMedioContacto.val() === "") {
            app.message.error("Validación", "Debe de escoger el medio de contacto.");
            return;
        };

        if ($dateSolicitud.val() === "") {
            app.message.error("Validación", "Debe de ingresar la fecha de solicitud.");
            return
        };

        if ($cmbempresa.val() === "") {
            app.message.error("Validación", "Debe de escoger la empresa que emite la solicitud.");
            return;
        };
        
        method = "POST";
        url = "BandejaSolicitudesVentas/RegistraSolicitudes"
        objSolicitud = {
            Solicitud: {
                IsTipoProceso: "I",
                Id_Solicitud: "",
                Id_Flujo: $cmbFlujo.val(),
                Fecha_Sol: $dateSolicitud.val(),
                Tipo_Sol: $cmbTipo.val(),
                Cod_MedioCont: $cmbMedioContacto.val(),
                IdCliente: $idCliente.val(),
                RUC: $hdnRUC.val(),
                RazonSocial: $nomEmpresa.val(),
                AsesorVenta: $Asesor.val(),
                Cod_Empresa: $cmbempresa.val(),
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
    function $loadTable_Products_Select(productos) {

        var data = Result = [];
        data.Result = productos;

        var columns = [
            {
                data: "id",
                render: function (data, type, row) {
                    return '<a id="btnAñadirChild" class="btn btn-green btn-xs" href="javascript: solicitud.detalleHijo(' + data + ')"><i class="fa fa-arrow-down" aria-hidden="true" hre></i></a>';
                }
            },
            {
                data: "id",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "codProduct",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "tipoProd",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "descProd",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "stk",
                render: function (data, type, row) {
                    if (data > 0) {
                        return '<center>' + 'Si' + '</center>';
                    }
                    else {
                        return '<center>' + 'No' + '</center>';
                    }
                }
            },
            {
                data: "price",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "undMed",
                render: function (data, row, type) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: {
                    cantidad: "cantidad",
                    id: "id"
                },
                render: function (data, row, type) {
                    if (data.cantidad > 0) {
                        if (data.cantidad == data.stk) {
                            if (data.cantidad == 1) {
                                return '<center><a id="aumento" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + data.id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + data.cantidad + '<a id="reducir" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + data.id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                            }
                            else {
                                return '<center><a id="aumento" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + data.id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + data.cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + data.id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                            };
                        }
                        else {
                            if (data.cantidad == 1) {
                                return '<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + data.id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + data.cantidad + '<a id="reducir" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + data.id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                            }
                            else {
                                return '<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + data.id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + data.cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + data.id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>';
                            };
                        };
                    }
                    else {
                        return '<center>' + '0' + '</center>';
                    };
                }
            },
            {
                data: "id",
                render: function (data, type, row) {
                    var seleccionar = '<a style="color:red" id="btnEliminarProduct" class="btn btn-green btn-xs" title="Seleccionar" href="javascript: solicitud.eliminarProducttemp(' + data + ')"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</a>';
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
            $(row).attr('id', 'row' + (index + 1));

        };

        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 5;
        app.llenarTabla($tblConsultaProductos, data, columns, columnDefs, "#tblConsultaProductos", rowCallback, null, filters);
    };

    function inicializarBotonesCantidad() {
        $('#tblConsultaProductos').off('click', "#aumento");

        $('#tblConsultaProductos').on('click', "#aumento", function () {
            var fila = $(this).closest('tr');  // Obtiene el tr más cercano al botón clickeado

            // Obtén los valores de la fila a la que pertenece el botón clickeado
            var cantidad = fila.find('td').eq(8).text();  // Columna 1
            var id = fila.find('td').eq(1).text();
            var cantidadMax = solicitud.itemProducto.find(producto => producto.id == (id.indexOf('.') == -1 ? id : id.substring(0, id.indexOf('.'))));

            if (id.indexOf('.') != -1) {
                cantidadMax = cantidadMax.hijos.find(productoChild => productoChild.id == id);
            };

            if (cantidadMax.stk == cantidad) {
                fila.find('td').eq(8).html('<center><a id="aumento" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>');
            } else {
                cantidad = parseInt(cantidad) + 1;  
                fila.find('td').eq(8).html('<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>');
            }
        });

        $('#tblConsultaProductos').off('click', "#reducir");

        $('#tblConsultaProductos').on('click', "#reducir", function () {
            var fila = $(this).closest('tr');  // Obtiene el tr más cercano al botón clickeado

            // Obtén los valores de la fila a la que pertenece el botón clickeado
            var cantidad = fila.find('td').eq(8).text();  // Columna 1
            var id = fila.find('td').eq(1).text();
            cantidad = parseInt(cantidad) - 1;
            if (cantidad == 1) {
                fila.find('td').eq(8).html('<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + cantidad + '<a id="reducir" disabled class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>');
            }
            else {
                fila.find('td').eq(8).html('<center><a id="aumento" class="btn btn-blue btn-xs" href="javascript: solicitud.adicionarCantidad(' + id + ')"><i class="fa fa-plus" aria-hidden="true"></i></a>' + cantidad + '<a id="reducir" class="btn btn-blue btn-xs" href="javascript: solicitud.reducirCantidad(' + id + ')"><i class="fa fa-minus" aria-hidden="true"></i></center></a>');
            }
        });
    };

    function eliminarProducttemp(id) {

        var id = id.toString();

        if (id.indexOf('.') == -1) {
            var fnSi = function () {
                solicitud.itemProducto = solicitud.itemProducto.filter(producto => producto.id !== id);
                $loadTable_Products_Select(solicitud.itemProducto);
            };
            return app.message.confirm("Ventas", "¿Está seguro que desea eliminar el producto seleccionado?", "Si", "No", fnSi, null);
        }
        else { 
            var fnSi = function () {
                for (var i = 0; i < solicitud.itemProducto.length; i++) {
                    if (solicitud.itemProducto[i].id == id.substring(0, id.indexOf('.'))) {
                        solicitud.itemProducto[i].hijos = solicitud.itemProducto[i].hijos.filter(subProducto => subProducto.id !== id)
                    };
                };
                $loadTable_Products_Select(solicitud.itemProducto);
            };
            return app.message.confirm("Ventas", "¿Está seguro que desea eliminar el accesorio seleccionado?", "Si", "No", fnSi, null);
        };
        

    };
    function adicionarCantidad(id) {
        var id = id.toString();
        if (id.indexOf('.') == -1) {
            for (var i = 0; i < solicitud.itemProducto.length; i++) {
                if (solicitud.itemProducto[i].id == id) {
                    if (solicitud.itemProducto[i].stk == solicitud.itemProducto[i].cantidad) {
                    } else {
                        solicitud.itemProducto[i].cantidad += 1;
                    };
                };
            };
        }
        else {
            var idxId = id.split('.');
            var producto = solicitud.itemProducto.find(producto => producto.id == idxId[0]);
            for (var i = 0; i < producto.hijos.length; i++) {
                if (producto.hijos[i].id == id) {
                    if (producto.hijos[i].stk == producto.hijos[i].cantidad) {
                    } else {
                        producto.hijos[i].cantidad += 1;
                    };
                };
            };
        };
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
                Id_WorkFlow :$codigoWorkflow.val()
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
                        var nuevoTr = "<tr id='row" + data.Result.Observaciones[i].Id +"'>" +
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
                app.message.error("Validación","Hubo un error en obtener el detalle de la solicitud.")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.consultandoDetalleSolicitud)
        };
    };

    return {
        seleccionar: seleccionar,
        eliminarObsTmp: eliminarObsTmp,
        eliminarDocTemp: eliminarDocTemp,
        eliminarDocumento: eliminarDocumento,
        download: download,
        seleccionarProduct: seleccionarProduct,
        añadirAccesorio: añadirAccesorio,
        adicionarCantidad: adicionarCantidad,
        reducirCantidad: reducirCantidad,
        eliminarProducttemp: eliminarProducttemp,
        detalleHijo: detalleHijo,
        verHistorial: verHistorial
    }
})(window.jQuery, window, document);