var cotvtadet = (function ($, win, doc) {

    var $estadoSol = $('#estadoSol');
    var $idCotizacion = $("#idCotizacion");
    var $idRolUsuario = $("#idRolUsuario");
    var $idWorkFlow = $("#idWorkFlow");

    var $cmbTipo = $('#cmbTipo');

    var $TipoSol_Servicio = $("#TipoSol_Servicio");
    var $TipoSol_RepOComes = $("#TipoSol_RepOComes");
    var $TipoSol_ServYRep = $("#TipoSol_ServYRep");
    var $TipoSol_VentaMat = $("#TipoSol_VentaMat");
    var $TipoSol_VentaEqu = $("#TipoSol_VentaEqu");

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

    var $DI_pnlInfoGeneral_Dimensiones = $("#DI_pnlInfoGeneral_Dimensiones");
    var $DI_pnlInfoGeneral_DescripcionAdic = $("#DI_pnlInfoGeneral_DescripcionAdic");
    var $DI_pnlCostos_PrecioVenta = $("#DI_pnlCostos_PrecioVenta");
    var $DI_pnlCostos_CostoFOB = $("#DI_pnlCostos_CostoFOB");
    var $DI_pnlCostos_ValorUnitario = $("#DI_pnlCostos_ValorUnitario");
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
    var $DI_pnlCostos_ReqCliente = $("#DI_pnlCostos_ReqCliente");
    var $DI_pnlCostos_ObsInsta = $("#DI_pnlCostos_ObsInsta");
    var $DI_pnlDestinos = $("#DI_pnlDestinos");
    
    var $BI_cmbFamilia = $('#BI_cmbFamilia');
    var $BI_txtCodProducto = $('#BI_txtCodProducto');
    var $BI_txtNomProducto = $('#BI_txtNomProducto');
    var $BI_cmbTipoMedida = $('#BI_cmbTipoMedida');
    var $BI_cmbMarca = $('#BI_cmbMarca');
    var $BI_cmbAlmacen = $("#BI_cmbAlmacen");
    
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
    
    var $tblDetCotCostos = $('#tblDetCotCostos');

    var mensajes = {
        BuscandoPrecios: "Buscando Precios, porfavor espere...",
        obteniendoFiltros: "Obteniendo filtros de lista de precios..."
    }

    var opcGrillaItems = 0;
    
    $(Initialize);

    function Initialize() {

        $btnBuscarItems.click(buscarItems);
        $DI_btnGuardar.click(grabarDatosCotDetItem);
        $DC_btnGuardar.click(grabarDatosCotDet);
        $DI_btnCerrar.click(cerrarModalDetItem);
        $DC_btnCerrar.click(cerrarModalDetCot);
        $btnEnviarCotizacion.click(enviarCotizacion);
        $btnGuardarCotizacion.click(guardarCotizacion)
        $btnRecotizacion.click(recotizarSolicitud);
        $btnGuardarValorizacion.click(guardarValorizacion);
        $DI_radGarantAdic_Si.click(configurarGarantias);
        $DI_radGarantAdic_No.click(configurarGarantias);
        $DI_radTieneStock_Si.click(configurarTieneStock);
        $DI_radTieneStock_No.click(configurarTieneStock);
        
        listarCotDetItems();
        cargarGarantias();

    }

    function ObtenerFiltrosPrecios() {
        var method = "POST";
        var url = "CatalogoPrecios/FiltrosPrecios";
        var oValores = {
            CodTipoSol: $cmbTipo.val()
        };
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {

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
                data: "DescRealModelo",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
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
                data: "CodItem",
                render: function (data) {
                    var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',1)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',1)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
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

        app.llenarTabla($tblCotDet, data, columns, columnDefs, "#tblCotDet", rowCallback, null, filters);
    }
    
    function quitarItem(CodigoItem, opc) {

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
            app.llenarComboMultiResult($DI_cmbGarantias, data.Result, null, " ", "-- Seleccione --", filters);
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
            $DI_txtCostoFOB.removeAttr("disabled");
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
        if (data.Result.CodItem_IsUpdatable == true) {
            $DI_txtCodigo.removeAttr("disabled");
            $DI_txtCodigo.val(data.Result.CodItemTemp);
        }
        else {
            $DI_txtCodigo.attr("disabled", "");
            $DI_txtCodigo.val(data.Result.CodItem);
        }
        $DI_txtDescripcion.val(data.Result.Descripcion);
        //Cargando Datos
        if (data.Result.Id != 0) {
            $DI_hdnIdCotDet.val(data.Result.Id);
            $DI_txtDescripcionAdic.val(data.Result.DescripcionAdicional);
            $DI_txtCantidad.val(data.Result.Cantidad);
            $DI_txtCostoFOB.val(data.Result.CostoFOB);
            $DI_txtValorUnitario.val(data.Result.VentaUnitaria);
            $DI_txtGanancia.val(data.Result.PorcentajeGanancia);

            $DI_radTieneStock_Si.prop("checked", false);
            $DI_radTieneStock_No.prop("checked", false);
            if (data.Result.IndStock != null) {
                if (data.Result.IndStock == true) {
                    $DI_radTieneStock_Si.prop("checked", true);
                }
                else {
                    $DI_radTieneStock_No.prop("checked", true);
                }
            }
            else {
                if (data.Result.Cantidad > data.Result.Stock || data.Result.Stock == 0) {
                    $DI_radTieneStock_No.prop("checked", true);
                }
                else {
                    $DI_radTieneStock_Si.prop("checked", true);
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
                    if (data.Result.CotizacionDespacho.IndCompraLocal == true) { $DI_radCompraLocal_Si.prop("checked", true); }
                    else { $DI_radCompraLocal_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndFlete != null) {
                    if (data.Result.CotizacionDespacho.IndFlete == true) { $DI_radFlete_Si.prop("checked", true); }
                    else { $DI_radFlete_No.prop("checked", true); }
                }
                $DI_txtReqCliente.val(data.Result.CotizacionDespacho.ObsCliente);
                $DI_txtObsInsta.val(data.Result.CotizacionDespacho.ObsDespacho);
            }
        }
    }

    function editarItem(CodigoItem, opc) {
        $DI_hdnCodigoPadre.val("");

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetItem";
        var objFiltros = {
            CotizacionDetalle: { CodItem: CodigoItem },
            opcGrillaItems: opc
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            opcGrillaItems = opc;
            LimpiarModalDetItem();
            MostrarDatosItem(data);

            if (data.Result != null) {
                if (data.Result.CotizacionCostos != null) {
                    var resCostos = { Status: 1, Result: data.Result.CotizacionCostos };
                    cotvtacostos.cargarGrillaCostosCotDet(resCostos);
                }
            }

            $DI_pnlInfoGeneral_DescripcionAdic.css("display", "");

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
            else if($cmbTipo.val() == $TipoSol_RepOComes.val()) {
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

            $('#modalDetalleItem').modal('show');
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
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
        method = "POST";
        url = "BandejaSolicitudesVentas/QuitarSubItemCotDet";
        var objFiltros = {
            CotizacionDetallePadre: { CodItem: CodigoItemPadre },
            CotizacionDetalle: { CodItem: CodigoItem }
        };
        var objParam = JSON.stringify(objFiltros);
        var CodItemPadre = CodigoItemPadre;

        var fnDoneCallBack = function (data) {
            cargarTablaSubItems(CodItemPadre, data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function editarSubItem(CodigoItemPadre, CodigoItem) {

        $DI_hdnCodigoPadre.val(CodigoItemPadre);

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetSubItem";
        var objFiltros = {
            CotizacionDetallePadre: { CodItem: CodigoItemPadre },
            CotizacionDetalle: { CodItem: CodigoItem }
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            opcGrillaItems = 1;
            LimpiarModalDetItem();
            MostrarDatosItem(data);
            $DI_pnlInfoGeneral_Dimensiones.css("display", "none");
            $DI_pnlInfoGeneral_DescripcionAdic.css("display", "none");
            $DI_pnlCostos_PrecioVenta.css("display", "");
            $DI_pnlCostos_CostoFOB.css("display", "none");
            $DI_pnlCostos_ValorUnitario.css("display", "");
            $DI_txtValorUnitario.removeAttr("disabled");
            $DI_pnlCostos_TieneStock.css("display", "none");
            $DI_pnlCostos_Calibracion.css("display", "none");
            $DI_pnlCostos_Ganancia.css("display", "none");
            $DI_pnlCostos_CompraLocal.css("display", "");
            $DI_pnlCostos_ReqPlaca.css("display", "none");
            $DI_pnlCostos_MantPrevent.css("display", "none");
            $DI_pnlCostos_Manuales.css("display", "none");
            $DI_pnlCostos_Videos.css("display", "none");
            $DI_pnlCostos_Instalacion.css("display", "none");
            $DI_pnlCostos_Capacitacion.css("display", "none");
            $DI_pnlCostos_GarantAdic.css("display", "none");
            $DI_pnlCostos_GarantAdic_Combo.css("display", "none");
            $DI_pnlCostos_Flete.css("display", "none");
            $DI_pnlCostos_ReqCliente.css("display", "none");
            $DI_pnlCostos_ObsInsta.css("display", "none");
            $DI_pnlDestinos.css("display", "none");
            $('#modalDetalleItem').modal('show');
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function grabarDatosCotDetItem() {

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
            if ($DI_pnlCostos_CostoFOB.css("display") != "none") {
                if ($DI_txtCostoFOB.attr("readonly") != "readonly" && $DI_txtCostoFOB.attr("disabled") != "disabled") {
                    if (!app.validaNumeroDecimal($DI_txtCostoFOB.val())) {
                        app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Costo FOB");
                        return false;
                    }
                    else {
                        if (parseFloat($DI_txtCostoFOB.val()) <= 0) {
                            app.message.error("Validaci&oacute;n", "el costo FOB debe ser mayor a 0.");
                            return false;
                        }
                    }
                }
            }
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

        if ($DI_pnlCostos_GarantAdic.css("display") != "none") {
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

        if ($DI_pnlCostos_ReqPlaca.css("display") != "none") {
            if ($DI_radReqPlaca_Si.attr("readonly") != "readonly" && $DI_radReqPlaca_Si.attr("disabled") != "disabled" &&
                $DI_radReqPlaca_No.attr("readonly") != "readonly" && $DI_radReqPlaca_No.attr("disabled") != "disabled") {
                if (!$DI_radReqPlaca_Si.is(':checked') && !$DI_radReqPlaca_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo de Requiere placa");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_Manuales.css("display") != "none") {
            if ($DI_radManuales_Si.attr("readonly") != "readonly" && $DI_radManuales_Si.attr("disabled") != "disabled" &&
                $DI_radManuales_No.attr("readonly") != "readonly" && $DI_radManuales_No.attr("disabled") != "disabled") {
                if (!$DI_radManuales_Si.is(':checked') && !$DI_radManuales_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Manuales");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_Videos.css("display") != "none") {
            if ($DI_radVideos_Si.attr("readonly") != "readonly" && $DI_radVideos_Si.attr("disabled") != "disabled" &&
                $DI_radVideos_No.attr("readonly") != "readonly" && $DI_radVideos_No.attr("disabled") != "disabled") {
                if (!$DI_radVideos_Si.is(':checked') && !$DI_radVideos_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Videos");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_Instalacion.css("display") != "none") {
            if ($DI_radInstalacion_Si.attr("readonly") != "readonly" && $DI_radInstalacion_Si.attr("disabled") != "disabled" &&
                $DI_radInstalacion_No.attr("readonly") != "readonly" && $DI_radInstalacion_No.attr("disabled") != "disabled") {
                if (!$DI_radInstalacion_Si.is(':checked') && !$DI_radInstalacion_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Instalaci&oacute;n");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_Capacitacion.css("display") != "none") {
            if ($DI_radCapacitacion_Si.attr("readonly") != "readonly" && $DI_radCapacitacion_Si.attr("disabled") != "disabled" &&
                $DI_radCapacitacion_No.attr("readonly") != "readonly" && $DI_radCapacitacion_No.attr("disabled") != "disabled") {
                if (!$DI_radCapacitacion_Si.is(':checked') && !$DI_radCapacitacion_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Capacitaci&oacute;n");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_GarantAdic.css("display") != "none") {
            if ($DI_radGarantAdic_Si.attr("readonly") != "readonly" && $DI_radGarantAdic_Si.attr("disabled") != "disabled" &&
                $DI_radGarantAdic_No.attr("readonly") != "readonly" && $DI_radGarantAdic_No.attr("disabled") != "disabled") {
                if (!$DI_radGarantAdic_Si.is(':checked') && !$DI_radGarantAdic_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Garant&iacute;a adicional");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_MantPrevent.css("display") != "none") {
            if ($DI_radMantPrevent_Si.attr("readonly") != "readonly" && $DI_radMantPrevent_Si.attr("disabled") != "disabled" &&
                $DI_radMantPrevent_No.attr("readonly") != "readonly" && $DI_radMantPrevent_No.attr("disabled") != "disabled") {
                if (!$DI_radMantPrevent_Si.is(':checked') && !$DI_radMantPrevent_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Mantenimiento Preventivo");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_Calibracion.css("display") != "none") {
            if ($DI_radCalibracion_Si.attr("readonly") != "readonly" && $DI_radCalibracion_Si.attr("disabled") != "disabled" &&
                $DI_radCalibracion_No.attr("readonly") != "readonly" && $DI_radCalibracion_No.attr("disabled") != "disabled") {
                if (!$DI_radCalibracion_Si.is(':checked') && !$DI_radCalibracion_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Calibraci&oacute;n");
                    return false;
                }
            }
        }

        if ($DI_pnlCostos_Flete.css("display") != "none") {
            if ($DI_radFlete_Si.attr("readonly") != "readonly" && $DI_radFlete_Si.attr("disabled") != "disabled" &&
                $DI_radFlete_No.attr("readonly") != "readonly" && $DI_radFlete_No.attr("disabled") != "disabled") {
                if (!$DI_radFlete_Si.is(':checked') && !$DI_radFlete_No.is(':checked')) {
                    app.message.error("Validaci&oacute;n", "Elija Si o No en campo Flete");
                    return false;
                }
            }
        }

        if ($DI_radReqPlaca_Si.is(':checked')) { bReqPlaca = true; }
        if ($DI_radReqPlaca_No.is(':checked')) { bReqPlaca = false; }

        if ($DI_radCompraLocal_Si.is(':checked')) { bCompraLocal = true; }
        if ($DI_radCompraLocal_No.is(':checked')) { bCompraLocal = false; }

        if ($DI_radManuales_Si.is(':checked')) { bManuales = true; }
        if ($DI_radManuales_No.is(':checked')) { bManuales = false; }

        if ($DI_radVideos_Si.is(':checked')) { bVideos = true; }
        if ($DI_radVideos_No.is(':checked')) { bVideos = false; }

        if ($DI_radInstalacion_Si.is(':checked')) { bInstalacion = true; }
        if ($DI_radInstalacion_No.is(':checked')) { bInstalacion = false; }

        if ($DI_radCapacitacion_Si.is(':checked')) { bCapacitacion = true; }
        if ($DI_radCapacitacion_No.is(':checked')) { bCapacitacion = false; }

        if ($DI_radMantPrevent_Si.is(':checked')) { bMantPrevent = true; }
        if ($DI_radMantPrevent_No.is(':checked')) { bMantPrevent = false; }

        if ($DI_radGarantAdic_Si.is(':checked')) { bGarantiaAdic = true; }
        if ($DI_radGarantAdic_No.is(':checked')) { bGarantiaAdic = false; }

        if ($DI_radCalibracion_Si.is(':checked')) { bCalib = true; }
        if ($DI_radCalibracion_No.is(':checked')) { bCalib = false; }

        if ($DI_radTieneStock_Si.is(':checked')) { bTieneStock = true; }
        if ($DI_radTieneStock_No.is(':checked')) { bTieneStock = false; }

        if ($DI_radFlete_Si.is(':checked')) { bFlete = true; }
        if ($DI_radFlete_No.is(':checked')) { bFlete = false; }

        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCotDetItem";
        var objDatos = {
            CotizacionDetallePadre: { CodItem: $DI_hdnCodigoPadre.val() },
            CotizacionDetalle: {
                CodItem: $DI_hdnCodigo.val(),
                CodItemTemp: $DI_txtCodigo.val(),
                DescripcionAdicional: $DI_txtDescripcionAdic.val(),
                Cantidad: app.convertirNumero($DI_txtCantidad.val()),
                CostoFOB: app.convertirNumero($DI_txtCostoFOB.val()),
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
            opcGrillaItems: opcGrillaItems
        };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            cerrarModalDetItem();
            cargarTablaCotDet(data);
            if (opcGrillaItems == "2") {
                cargarTablaDetCotCostos(data);
            }
        };

        var fnFailCallback = function () {

        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cerrarModalDetItem() {
        $('#modalDetalleItem').modal('hide');
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
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
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
                    data: "Stock",
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
                    data: "Cantidad",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "CostoFOB",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
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
                    data: "PorcentajeGanancia",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "VentaTotalSinIGVConGanacia",
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
                        var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                        if ($estadoSol.val() == "CVAL") {
                            var swVer = false;
                            //Se valida que el tipo REPUESTOS no modifique FOB
                            if ($idRolUsuario.val() == $RolVenta_Gerente.val()) {
                                if ($cmbTipo.val() == $TipoSol_RepOComes.val() || $cmbTipo.val() == $TipoSol_ServYRep.val()) {
                                    swVer = true;
                                }
                            }
                            if (swVer) { editar = ver; }
                        }
                        return '<center>' + hidden + editar + '</center>';
                    }
                }
            ];

        }
        else {

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
                    data: "Stock",
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
                    data: "PorcentajeGanancia",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "VentaTotalSinIGVConGanacia",
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
                        var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                        var quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                        if ($estadoSol.val() != "SCOT") { quitar = ""; }
                        if ($estadoSol.val() == "CVAL") {
                            var swVer = true;
                            //Se valida si la cotizacion va a ser valorizada
                            if ($DI_pnlCostos_PrecioVenta.css("display") != "none") {
                                if ($PermitirEditarValorizacion.val() == "S") {
                                    swVer = false;
                                }
                            }
                            //Se valida la GANANCIA
                            if ($DI_pnlCostos_Ganancia.css("display") != "none") {
                                if ($PermitirEditarGanancia.val() == "S") { swVer = false; }
                            }
                            if (swVer) { editar = ver; }
                        }
                        else {
                            if ($estadoSol.val() != "SCOT") { editar = ver; }
                        }
                        return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                    }
                }
            ];

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

    function enviarCotizacion() {

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
            app.message.success("Cotizacion", "Se envi&oacute; la cotizaci&oacute;n correctamente.", "Aceptar", redirect);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function recotizarSolicitud() {

        method = "POST";
        url = "BandejaSolicitudesVentas/RecotizarSolicitud";
        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IdWorkFlow: $idWorkFlow.val()
        };
        var objParam = JSON.stringify(objDatos);

        function redirect() {
            app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
        };

        var fnDoneCallBack = function (data) {
            app.message.success("Cotizacion", "Se gener&oacute; una nueva cotizaci&oacute;n correctamente.", "Aceptar", redirect);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function guardarCotizacion() {

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
            app.message.success("Cotizacion", "Se envi&oacute; la cotizaci&oacute;n correctamente.", "Aceptar", redirect);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function listarCotDetItems() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ListarCotDetItems";
        var objFiltros = {
            opcGrillaItems: "2"
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaCotDet(data);
            cargarTablaDetCotCostos(data);
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

        function redirect() {
            app.redirectTo("BandejaSolicitudesVentas/SolicitudVenta");
        };

        var fnDoneCallBack = function (data) {
            app.message.success("Cotizacion", "Se guard&oacute; la cotizaci&oacute;n correctamente.", "Aceptar", redirect);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    return {
        buscarItems: buscarItems,
        ObtenerFiltrosPrecios: ObtenerFiltrosPrecios,
        RecargarFiltroFamilia: RecargarFiltroFamilia,
        agregarItem: agregarItem,
        quitarItem: quitarItem,
        editarItem: editarItem,
        quitarSubItem: quitarSubItem,
        editarSubItem: editarSubItem,
        SeleccionarRowCotDet: SeleccionarRowCotDet,
        VerSubItems: VerSubItems,
        grabarDatosCotDetItem: grabarDatosCotDetItem,
        cerrarModalDetItem: cerrarModalDetItem,
        grabarDatosCotDet: grabarDatosCotDet,
        cargarTablaDetCotCostos: cargarTablaDetCotCostos,
        cerrarModalDetCot: cerrarModalDetCot,
        enviarCotizacion: enviarCotizacion,
        listarCotDetItems: listarCotDetItems,
        //listarCotDetItemsTemp: listarCotDetItemsTemp,
        //listarCotDetItemsCostos: listarCotDetItemsCostos,
        recotizarSolicitud: recotizarSolicitud
    }
})(window.jQuery, window, document);