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
    var $DI_pnlCostos_ReqCliente = $("#DI_pnlCostos_ReqCliente");
    var $DI_pnlCostos_ObsInsta = $("#DI_pnlCostos_ObsInsta");
    var $DI_pnlDestinos = $("#DI_pnlDestinos");

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
    
    var $tblDetCotCostos = $('#tblDetCotCostos');

    var mensajes = {
        BuscandoPrecios: "Buscando Precios, porfavor espere...",
        obteniendoFiltros: "Obteniendo filtros de lista de precios..."
    }

    var $DI_opcGrilla = $("#DI_opcGrilla");
    var $CI_opcGrilla = $("#CI_opcGrilla");

    var $hdnCostosAgregados = $("#hdnCostosAgregados");
    var $DI_hdnHabilitado = $("#DI_hdnHabilitado");

    $(Initialize);

    var baseUrl = baseSiteUrl;
    let arrayFamilias = [];
    let arrayTipMedida = [];
    let arrayAlmacen = [];
    let cantidadProductos = [];
    var arrayDatos = ['Casa', 'Calle', 'Casero', 'Cascada', 'Cascabel'];
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

        $DI_radInstalacion_No.click(validarIndicadorCosteo);
        $DI_radCapacitacion_No.click(validarIndicadorCosteo);
        $DI_radManuales_No.click(validarIndicadorCosteo);
        $DI_radVideos_No.click(validarIndicadorCosteo);
        $DI_radMantPrevent_No.click(validarIndicadorCosteo);
        $DI_radCalibracion_No.click(validarIndicadorCosteo);
        $DI_radFlete_No.click(validarIndicadorCosteo);

        $DI_radGarantAdic_Si.click(configurarGarantias);
        $DI_radGarantAdic_No.click(configurarGarantias);
        //$DI_radTieneStock_Si.click(configurarTieneStock);
        //$DI_radTieneStock_No.click(configurarTieneStock);
        
        listarCotDetItems();
        cargarGarantias();
        //CargarTablaProductos();
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
            filters1.placeholder = "--Seleccionar--";
            filters1.allowClear = true;

            //Cargar combo de medidas:
            var filters2 = {};
            filters2.placeholder = "--Seleccionar--";
            filters2.allowClear = true;

            //Cargar combo de almacenes:
            var filters3 = {};
            filters3.placeholder = "--Seleccionar--";
            filters3.allowClear = false;
            //var opcTodos = data.Result.TodosAlmacenes;
            //if (opcTodos == "" || opcTodos == null) { opcTodos = " "; }

            arrayTipMedida = data.Result.Medidas;
            arrayAlmacen = data.Result.Almacenes;

            for (var i = 0; cantidadProductos > i; i++) {
                app.llenarComboMultiResult($('#BI_cmbMarca' + i), data.Result.Marcas, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters1);
                app.llenarComboMultiResult($('#BI_cmbTipoMedida' + i), data.Result.Medidas, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters2);
                app.llenarComboMultiResult($('#BI_cmbAlmacen' + i), data.Result.Almacenes, $("#modalDetalleCotizacion"), " ", "No definido", filters3);
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
            filters3.placeholder = "--Seleccionar--";
            filters3.allowClear = false;
            var opcTodos = data.Result.TodasFamilias;
            if (opcTodos == "" || opcTodos == null) { opcTodos = " "; }

            arrayFamilias = data.Result.Familias;

            for (var i = 0; cantidadProductos > i; i++) {
                //emparejamos con el ID;
                app.llenarComboMultiResult($('#BI_cmbFamilia' + i), data.Result.Familias, $("#modalDetalleCotizacion"), '', "--Seleccionar--", filters3);
            };
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
                    var oFeatures = data;
                    var strID = "";
                    var strCodItem = "";
                    var arrProp = oFeatures.SubPropiedades;
                    for (a = 0; a < arrProp.length; a++) {
                        if (arrProp[a].Nombre == "ID") { strID = arrProp[a].Valor; }
                        if (arrProp[a].Nombre == "CodItem") { strCodItem = arrProp[a].Valor; }
                    }
                    var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',1)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarCotDetItem(' + String.fromCharCode(39) + row.CodItem + String.fromCharCode(39) + ',1)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    return '<center>' + hidden + editar + ' ' + quitar + '</center>';
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
            $DI_txtValorUnitario.val(app.formatearEnteroComa(parseFloat(data.Result.VentaUnitaria).toFixed(2)));
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

    function EditarCotDet() {

    };

    function EditarCotDetHijo() {

    }


    function editarCotDetItem(ID, opc) {
        $DI_hdnCodigoPadre.val("");
        $DI_opcGrilla.val(opc);
        $CI_opcGrilla.val(opc);

        method = "POST";
        url = "BandejaSolicitudesVentas/CargarCotDetItem";
        var objFiltros = {
            CotizacionDetalle: { Id: ID },
            opcGrillaItems: opc
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {

            configurarModalPorTipoItem(data.Result.TipoItem);

            LimpiarModalDetItem();
            MostrarDatosItem(data);

            $hdnCostosAgregados.val("");

            if (data.Result != null) {
                if (data.Result.CotizacionCostos != null) {
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

            //configurarModalCotDet();

            //Se habilita el MODAL según la configuración del PRODUCTO (Equipo, Material, Repuesto)
            var oFeatures = data.Result.Features;
            cargarPropiedadesPorCotDetItem(oFeatures);

            //Se carga la configuración de la lógica de STOCK para ACCESORIOS
            if (data.Result.TipoItem == $DI_hdnTipoItem_ACC.val()) {
                cargarLogicaAccesorios_Stock();
                cargarLogicaAccesorios_CompraLocal();
            }

            cotvtacostos.cargarComboCotDetItems();

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

            $DI_opcGrilla.val("1");
            LimpiarModalDetItem();
            MostrarDatosItem(data);

            //$DI_pnlInfoGeneral_Dimensiones.css("display", "none");
            //$DI_pnlInfoGeneral_DescripcionAdic.css("display", "none");
            //$DI_pnlCostos_PrecioVenta.css("display", "");
            //$DI_pnlCostos_CostoFOB.css("display", "none");
            //$DI_pnlCostos_ValorUnitario.css("display", "");
            //$DI_txtValorUnitario.removeAttr("disabled");
            //$DI_pnlCostos_TieneStock.css("display", "");
            //$DI_pnlCostos_Calibracion.css("display", "none");
            //$DI_pnlCostos_Ganancia.css("display", "none");
            //$DI_pnlCostos_CompraLocal.css("display", "");
            //$DI_pnlCostos_ReqPlaca.css("display", "none");
            //$DI_pnlCostos_MantPrevent.css("display", "none");
            //$DI_pnlCostos_Manuales.css("display", "none");
            //$DI_pnlCostos_Videos.css("display", "none");
            //$DI_pnlCostos_Instalacion.css("display", "none");
            //$DI_pnlCostos_Capacitacion.css("display", "none");
            //$DI_pnlCostos_GarantAdic.css("display", "none");
            //$DI_pnlCostos_GarantAdic_Combo.css("display", "none");
            //$DI_pnlCostos_Flete.css("display", "none");
            //$DI_pnlCostos_ReqCliente.css("display", "none");
            //$DI_pnlCostos_ObsInsta.css("display", "none");
            //$DI_pnlDestinos.css("display", "none");

            //Se habilita el MODAL según la configuración del PRODUCTO (Equipo, Material, Repuesto)
            var oFeatures = data.Result.Features;
            cargarPropiedadesPorCotDetItem(oFeatures);

            //Se configura la lógica de STOCK para ACCESORIOS
            configurarModalPorTipoItem(data.Result.TipoItem);
            $DI_txtValorUnitario.prop('disabled', true);
            cargarLogicaAccesorios_Stock();
            cargarLogicaAccesorios_CompraLocal();

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
                        var casilla = "<input type='text'  id='ExWork" + row.NroItem + row.Id+ "' value='" + data + "' style='border: none;background-color: transparent; outline: none;' readonly  maxlength='50'/>";
                        return '<center>' + casilla + '</center>';
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
                        var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                        var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                        var editar_FOB = '<a id="btnEditarFOBItem' + strID + '" value="' + strID+'" name="BtnExWord" class="botonDetCot btn btn-info btn-xs" title="Editar Ex-Work" href="javascript: cotvtadet.editarExWork(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.NroItem + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Ex-Work</a>'; 
                        var guardar_FOB = '<a id="btnGuardarFOBItem' + strID + '" class="botonDetCot btn btn-info btn-xs" title="Guardar Ex-Work" href="javascript: cotvtadet.guardarExWork(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',' + String.fromCharCode(39) + row.NroItem + String.fromCharCode(39) + ')" style=' + String.fromCharCode(39) + 'display:none' + String.fromCharCode(39) +'><i class="fa fa-pencil-save" aria-hidden="true"></i>Guardar</a>'; 

                        if ($estadoSol.val() == "CAPR" || $estadoSol.val() == "PRVT" || $estadoSol.val() == "VTPG") {
                            return '<center>' + ver + '</center>';
                        }
                        else {
                            
                            var fob = "";
                            var guardar_fob = "";
                            if (oFeatures.IsEnabled && $idRolUsuario.val() === "SGI_VENTA_GERENTE") {
                                fob = String.fromCharCode(32) +"<br><br>"+ editar_FOB;
                                guardar_fob = guardar_FOB;
                                editar = ver;
                            }

                            if (!oFeatures.IsEnabled) { editar = ver; }
                            return '<center>' + hidden + editar + fob + guardar_fob+ '</center>';
                        }
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
                        var oFeatures = data;
                        var strID = "";
                        var strCodItem = "";
                        var arrProp = oFeatures.SubPropiedades;
                        for (a = 0; a < arrProp.length; a++) {
                            if (arrProp[a].Nombre == "ID") { strID = arrProp[a].Valor; }
                            if (arrProp[a].Nombre == "CodItem") { strCodItem = arrProp[a].Valor; }
                        }
                        var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(strCodItem) + '" value=' + String.fromCharCode(39) + strCodItem + String.fromCharCode(39) + '>';
                        var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.editarCotDetItem(' + String.fromCharCode(39) + strID + String.fromCharCode(39) + ',2)"><i class="fa fa-eye" aria-hidden="true"></i> Ver</a>';
                        var quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarCotDetItem(' + String.fromCharCode(39) + row.CodItem + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';

                        if ($estadoSol.val() == "CAPR" || $estadoSol.val() == "PRVT" || $estadoSol.val() == "VTPG" ) {
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
            if ($TipoSolicitud.val() == "TSOL05") {
                CargarTablaProductos(data);
            }
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

    function editarExWork(id, NroItem) {
        $('#btnEditarFOBItem' + id).hide();
        $('#btnGuardarFOBItem' + id).show();


        $('#ExWork' + NroItem +id).removeAttr('readonly');
        $('#ExWork' + NroItem+id).css('border', '1px solid ');
        $('#ExWork' + NroItem+id).css('background-color', 'white');
        $('#ExWork' + NroItem+id).css('display', 'block');
        $("#btnGuardarValorizacion").prop("disabled", true);
       // $(".BtnExWord").prop("disabled", true);

        $("a[name='BtnExWord']").css({
            "pointer-events": "none",
            "cursor": "not-allowed",
            "color": "gray"
        });
    }

    function guardarExWork(id, NroItem) {

        var text_exwork = $('#ExWork' + NroItem + id).val();
        if (text_exwork === "" || text_exwork === null) {
            $('#ExWork' + NroItem + id).focus();
            app.message.error("Validacion", "Debe ingresar el valor del Ex-Work.");
            return false;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaSolicitudesVentas/MantenimientoDespacho";
            var obj = {
                Tipo: "W",
                CodigoSolicitud: id,
                NumeroOrden: text_exwork
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    //location.reload();
                    $('#ExWork' + NroItem + id).css('border', 'none');
                    $('#ExWork' + NroItem + id).css('background-color', 'transparent');
                    $('#ExWork' + NroItem + id).css('outline', 'none');
                    $('#ExWork' + NroItem + id).prop('readonly', true);
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
        return app.message.confirm("Ventas", "Esta seguro que desea guardar el Ex-Work?", "Si", "No", fnSi, null);
    };


    function InicializarLogicaHijos() {
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
                    row.child(childTableHtml).show();
                    row.child().show();
                    tr.addClass('shown');
                    cargarTablaHijosProductos(data, '#tblAccesorios'+data.NroItem );
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
                pageLength: 20,// filters != null ? (filters.dataTablePageLength || defaults.dataTablePageLength) : defaults.dataTablePageLength,
                lengthChange: false//filters != null ? (filters.dataTableLengthChange || defaults.dataTableLengthChange) : defaults.dataTableLengthChange
            }).api();
        }
        table.clear();
        if (data != null) {
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
            CodItem:    null,
            DescFamilia:     null,
            Descripcion:null,
            DescAlmacen:     null,
            Stock: null,
            PrecioRef:       null,
            DescMonCompra :  null,
            DescUnidad :     null,
            Cantidad :       null,
            Marca :      null,
            Modelo :     null,
        });
        return table;
    };

    function GeneraTabla(NroItem) {
        var table = "<table  class='table table-hover table-condensed table-striped table-bordered dataTable no-footer' id=tblAccesorios"+NroItem+" >contenido</table>";
        var thead = "<thead>" +
                "<tr>" +
            "<th>Cod.Producto</th>" +
            "<th>Familia</th>" +
            "<th>Almac&eacute;n</th>" +
            "<th>Descripci&oacute;n</th>" +
            "<th>Marca</th>" +
            "<th>Modelo</th>" +
            "<th>Und. Med.</th>" +
            "<th>Moneda</th>" +
            "<th>Cantidad</th>" +
            "<th>Stock</th>" +
            "<th>Precio Ref.</th>" +
            "<th>Acciones</th>" +
                "</tr>" +
            "</thead>";
        var tbody = "<tbody></tbody>";

        table = table.replace("contenido", thead + tbody);
        return table;
    };


    function cargarTablaHijosProductos(data, selector) {
        var columns = [
            {
                data: "CodItem",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='text' placeholder='Cod.Producto' onblur='javascript: cotvtadet.IniciarLogicaInputs(event,this, this.value)' />";
                        //casilla = "<input type='text' placeholder='Cod.Producto'/>";

                    }
                    else {
                        casilla = "<input disabled type='text' placeholder='Cod.Producto' value='" + data + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "DescFamilia",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;' data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;' data-selected=''></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "DescAlmacen",
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
                    if (data == null) {
                        casilla = "<input placeholder='Modelo' type='text' />";
                    }
                    else {
                        casilla = "<input disabled placeholder='Modelo' type='text' value='" + data + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodUnidad",
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
                data: "DescMonCompra",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='text' disabled placeholder='Moneda' /> <input hidden type='text'/>"
                    }
                    else {
                        casilla = "<input disabled type='text' disabled placeholder='Moneda' value='" + data + "' /> <input hidden type='text'/>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='number' placeholder='Cantidad' />"
                    }
                    else {
                        casilla = "<input disabled type='number' placeholder='Cantidad' value='" + data + "' />"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "StockDisponible",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input disabled type='text' placeholder='Stock' />"
                    }
                    else {
                        casilla = "<input disabled  disabled type='text' placeholder='Stock' value='" + data + "' />"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "PrecioRef",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input disabled type='text' placeholder='Precio Ref' />"
                    }
                    else {
                        casilla = "<input disabled disabled type='text' placeholder='Precio Ref' value='" + data.toFixed(2) + "' />"
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
                            seleccionar = '<a id="btnCostearItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.EditarCotDet(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Costear</a>';
                            eliminar = ' <a class="btn btn-default btn-xs" title="Eliminar" id=btnEliminarItem  href = "javascript: cotvtadet.eliminarItemProducto(' + data + ')" ><i class="fa fa-level-down" aria-hidden="true"></i> Eliminar</a>';
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
            cantidadProductos = index + 1;
            $(row).attr('id', 'row' + index);

            var input = $(row.cells[0])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_CodProd_Child' + index);

            var select = $(row.cells[1])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbFamilia_Child' + index);

            var select = $(row.cells[2])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbAlmacen_Child' + index);

            var input = $(row.cells[3])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_DescEquipo_Child' + index);


            var select = $(row.cells[4])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbMarca_Child' + index);


            var input = $(row.cells[5])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Modelo_Child' + index);


            var select = $(row.cells[6])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbTipoMedida_Child' + index);

            var input = $(row.cells[7])
            input = input[0];
            var inputPadre = input.children[0];
            input = inputPadre.children[0];
            $(input).attr('id', 'BI_Moneda_Child' + index);
            input = inputPadre.children[1];
            $(input).attr('id', 'BI_CodMoneda_Child' + index);

            var input = $(row.cells[8])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Cantidad_Child' + index);

            var input = $(row.cells[9])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Stock_Child' + index);

            var input = $(row.cells[10])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Precio_Child' + index);


            if (data.Id == null || data.Id == "") {
                var btn = $(row.cells[11])
                btn = btn[0];
                btn = btn.children[0];
                btn = btn.children[0];
                $(btn).attr('href', "javascript: cotvtadet.agregarItemHijo('" + index + "')");
            }


            $('#BI_CodProd_Child' + index, row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            CodProd: request.term,
                            CodFamilia: $('#BI_cmbFamilia_Child' + index).val() == "" ? "08" : $('#BI_cmbFamilia_Child' + index).val(),
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

            $('#BI_DescEquipo_Child' + index, row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescEquipo: request.term,
                            CodFamilia: $('#BI_cmbFamilia_Child' + index).val() == "" ? "08" : $('#BI_cmbFamilia_Child' + index).val(),
                            DescMarca: $('#BI_cmbMarca_Child' + index).val(),
                            CodUndMed: $('#BI_cmbTipoMedida_Child' + index).val(),
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

            $('#BI_Modelo_Child' + index, row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescModelo: request.term,
                            CodFamilia: $('#BI_cmbFamilia_Child' + index).val() == "" ? "08" : $('#BI_cmbFamilia_Child' + index).val(),
                            DescMarca: $('#BI_cmbMarca_Child' + index).val(),
                            CodUndMed: $('#BI_cmbTipoMedida_Child' + index).val(),
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

        implementarTabla($(selector), data, columns, columnDefs, selector, rowCallback, null, filters);
    };


    function agregarItemHijo() {

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
                        return '<center><a id="btnAñadirChild" class="btn btn-green btn-xs" ><i class="fa fa-arrow-down" aria-hidden="true"></i></a></center>';
                    };
                }
            },
            {
                data: "CodItem",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='text' placeholder='Cod.Producto' onblur='javascript: cotvtadet.IniciarLogicaInputs(event,this, this.value)' />";
                        //casilla = "<input type='text' placeholder='Cod.Producto'/>";
                        
                    }
                    else {
                        casilla = "<input disabled type='text' placeholder='Cod.Producto' value='" + data + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "DescFamilia",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<select class='form-control select2 input-sm' style='width: 100 %;' data-selected=''></select>"
                    }
                    else {
                        casilla = "<select disabled class='form-control select2 input-sm' style='width: 100 %;' data-selected=''></select>"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "DescAlmacen",
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
                    if (data == null) {
                        casilla = "<input placeholder='Modelo' type='text' />";
                    }
                    else {
                        casilla = "<input disabled placeholder='Modelo' type='text' value='" + data + "' />";
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "CodUnidad",
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
                data: "DescMonCompra",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input type='text' disabled placeholder='Moneda' /> <input hidden type='text'/>"
                    }
                    else {
                        casilla = "<input disabled type='text' disabled placeholder='Moneda' value='" + data + "' /> <input hidden type='text'/>"
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
                        casilla = "<input type='number' placeholder='Cantidad' />"
                    }
                    else{
                        casilla = "<input disabled type='number' placeholder='Cantidad' value='" + data + "' />"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "StockDisponible",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input disabled type='text' placeholder='Stock' />"
                    }
                    else {
                        casilla = "<input disabled  disabled type='text' placeholder='Stock' value='" + data + "' />"
                    }
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "PrecioRef",
                render: function (data, type, row) {
                    var casilla = "";
                    if (data == null) {
                        casilla = "<input disabled type='text' placeholder='Precio Ref' />"
                    }
                    else {
                        casilla = "<input disabled disabled type='text' placeholder='Precio Ref' value='" + data.toFixed(2) + "' />"
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
                            seleccionar = '<a id="btnCostearItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.EditarCotDet(' + data +')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Costear</a>';
                            eliminar = ' <a class="btn btn-default btn-xs" title="Eliminar" id=btnEliminarItem  href = "javascript: cotvtadet.eliminarItemProducto('+ data +')" ><i class="fa fa-level-down" aria-hidden="true"></i> Eliminar</a>';
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
            cantidadProductos = index + 1 ;
            $(row).attr('id', 'row' + index);

            var input = $(row.cells[1])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_CodProd' + index);

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
            $(input).attr('id', 'BI_DescEquipo' + index);


            var select = $(row.cells[5])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbMarca' + index);


            var input = $(row.cells[6])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Modelo' + index);


            var select = $(row.cells[7])
            select = select[0];
            select = select.children[0];
            select = select.children[0];
            $(select).attr('id', 'BI_cmbTipoMedida' + index);

            var input = $(row.cells[8])
            input = input[0];
            var inputPadre = input.children[0];
            input = inputPadre.children[0];
            $(input).attr('id', 'BI_Moneda' + index);
            input = inputPadre.children[1];
            $(input).attr('id', 'BI_CodMoneda' + index);

            var input = $(row.cells[9])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Cantidad' + index);

            var input = $(row.cells[10])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Stock' + index);

            var input = $(row.cells[11])
            input = input[0];
            input = input.children[0];
            input = input.children[0];
            $(input).attr('id', 'BI_Precio' + index);


            if (data.Id == null || data.Id == "") {
                var btn = $(row.cells[12])
                btn = btn[0];
                btn = btn.children[0];
                btn = btn.children[0];
                $(btn).attr('href', "javascript: cotvtadet.agregarItemProducto('" + index + "')");
            }
            

            $('#BI_CodProd'+index, row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            CodProd: request.term,
                            CodFamilia: $('#BI_cmbFamilia' + index).val() == "" ? "08;01;04" : $('#BI_cmbFamilia' + index).val(),
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

            $('#BI_DescEquipo' + index, row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescEquipo: request.term,
                            CodFamilia: $('#BI_cmbFamilia' + index).val() == "" ? "08;01;04" : $('#BI_cmbFamilia' + index).val(),
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

            $('#BI_Modelo' + index, row).each(function () {
                $(this).autocomplete({
                    source: function (request, response) {
                        var objFiltros = {
                            DescModelo: request.term,
                            CodFamilia: $('#BI_cmbFamilia' + index).val() == "" ? "08;01;04" : $('#BI_cmbFamilia' + index).val(),
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
        filters.dataTablePageLength = 20;
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

        implementarTabla($tblProductos, data, columns, columnDefs, "#tblProductos", rowCallback, null, filters);

        InicializarLogicaHijos();
        RecargarFiltroFamilia();
        ObtenerFiltrosPrecios();
        //cargarBtnAgregarItem();
        //IniciarLogicaInputs(e, selector, valueInput);
    };


    function IniciarLogicaInputs(event, selector, valueInput) {

        //var id = selector[0].getAttribute("id");
        var id = selector.getAttribute("id");
        var index = id.slice(-1);
        var newid = id.substring(0, (id.length - 1));

        if (valueInput != "" && valueInput != null && valueInput != undefined) {
            method = "POST";
            url = "BandejaSolicitudesVentas/ObtenerArticulos";

            if (newid == "BI_CodProd") {
                var objFiltros = {
                    CodsArticulo: $('#' + newid + index.toString()).val(),
                    CantidadRegistros: 1
                };
            } else if (newid == "BI_DescEquipo") {
                var objFiltros = {
                    DescArticulo: $('#' + newid + index.toString()).val(),
                    CodsUnidad: $('#BI_cmbTipoMedida' + index).val() == "" ? "" : $('#BI_cmbTipoMedida' + index).val(),
                    CodsFamilia: $('#BI_cmbFamilia' + index).val() == "" ? "08;01;04" : $('#BI_cmbFamilia' + index).val(),
                    CodsAlma: $('#BI_cmbAlmacen' + index).val() == "" ? "0015;0001;0017" : $('#BI_cmbAlmacen' + index).val(),
                    CantidadRegistros: 1
                };
            }
            var objParam = JSON.stringify(objFiltros);

            var fnDoneCallBack = function (data) {
                if (data.Result.length == 0) {
                    $('#BI_cmbFamilia' + index.toString()).prop('disabled', false);
                    $('#BI_cmbAlmacen' + index.toString()).prop('disabled', false);
                    $('#BI_DescEquipo' + index.toString()).prop('disabled', false);
                    $('#BI_cmbMarca' + index.toString()).prop('disabled', false);
                    $('#BI_Modelo' + index.toString()).prop('disabled', false);
                    $('#BI_CodProd' + index.toString()).prop('disabled', false);
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
            $('#BI_DescEquipo' + index.toString()).prop('disabled', false);
            $('#BI_CodProd' + index.toString()).prop('disabled', false);
            $('#BI_cmbMarca' + index.toString()).prop('disabled', false);
            $('#BI_Modelo' + index.toString()).prop('disabled', false);
            $('#BI_cmbTipoMedida' + index.toString()).prop('disabled', false);
            $('#BI_cmbAlmacen' + index.toString()).val(" ").trigger('change.select2');
            $('#BI_Moneda' + index.toString()).val("");
            $('#BI_Cantidad' + index.toString()).val("");
            $('#BI_Stock' + index.toString()).val("");
            $('#BI_Precio' + index.toString()).val("");
            $('#BI_CodMoneda' + index.toString()).val("");
        };
    };

    function rellenarInputsTabla(data, index,codAcceso) { //Se ajustan los valores de la tabla según la selección.
        $('#BI_cmbFamilia' + index.toString()).val(data[0].CodFamilia).trigger('change.select2');
        $('#BI_cmbAlmacen' + index.toString()).val(data[0].CodAlmacen == "" || data[0].CodAlmacen == null ? " " : data[0].CodAlmacen).trigger('change.select2');
        if (codAcceso == 1) {
            $('#BI_DescEquipo' + index.toString()).val(data[0].DescArticulo);
        }
        else if (codAcceso == 2) {
            $('#BI_CodProd' + index.toString()).val(data[0].CodArticulo);
        };
        $('#BI_cmbMarca' + index.toString()).val(data[0].CodMarca).trigger('change.select2');
        $('#BI_Modelo' + index.toString()).val(data[0].DescModelo);
        $('#BI_cmbTipoMedida' + index.toString()).val(data[0].CodUnidad).trigger('change.select2');



        $('#BI_Moneda' + index.toString()).val(data[0].DescMonCompra); 
        $('#BI_CodMoneda' + index.toString()).val(data[0].CodMonCompra); 

        

        $('#BI_Cantidad' + index.toString()).val(0);
        $('#BI_Stock' + index.toString()).val(data[0].StockDisponible); 
        $('#BI_Precio' + index.toString()).val(data[0].PrecioRef.toFixed(2));    
        

        //Inhabilitar para que no puedan realizar modificaciones
        if (codAcceso == 1) {
            $('#BI_DescEquipo' + index.toString()).prop('disabled', true);
        } else if (codAcceso == 2){
            $('#BI_CodProd' + index.toString()).prop('disabled', true);
        }
        $('#BI_cmbFamilia' + index.toString()).prop('disabled', true);
        $('#BI_cmbAlmacen' + index.toString()).prop('disabled', true);
        $('#BI_cmbMarca' + index.toString()).prop('disabled', true);
        $('#BI_Modelo' + index.toString()).prop('disabled', true);
        $('#BI_cmbTipoMedida' + index.toString()).prop('disabled', true);
    };
    function cargarBtnAgregarItem() {
    
        $('#tblProductos tbody').off('click', 'td #btnAgregarItem');
    
        $('#tblProductos tbody').on('click', 'td #btnAgregarItem', function () {
            var tr = $(this).closest('tr');

            var row = tr[0].getAttribute("id");
            var index = row.slice(-1);
            var newid = row.substring(0, (row.length - 1));

            var descripcion = $('#BI_DescEquipo' + index.toString()).val();
            var codItem = $('#BI_CodProd' + index.toString()).val();
            var stock = $('#BI_CodProd' + index.toString()).val();
            var codMoneda = $('#BI_CodMoneda' + index.toString()).val();
            var unidad = $('#BI_cmbTipoMedida' + index.toString()).val();      
            var cantidad = $('#BI_Cantidad' + index.toString()).val(); 
            var marca = $('#BI_cmbMarca' + index.toString()).val(); 
            var modelo = $('#BI_Modelo' + index.toString()).val(); 


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
                NroItem: index + 1,
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

    function eliminarItemProducto(Id) {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/EliminarCotDet";
        var obj = {
            Id: Id
        }
        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            app.message.success("&Eacute;nxito", "Se eliminó correctamente el registro");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    };

    function agregarItemProducto(index) {

        var descripcion = $('#BI_DescEquipo' + index.toString()).val();
        var codItem = $('#BI_CodProd' + index.toString()).val();
        var stock = $('#BI_Stock' + index.toString()).val();
        var codMoneda = $('#BI_CodMoneda' + index.toString()).val();
        var unidad = $('#BI_cmbTipoMedida' + index.toString()).val();
        var cantidad = $('#BI_Cantidad' + index.toString()).val();
        var marca = $('#BI_cmbMarca' + index.toString()).val();
        var modelo = $('#BI_Modelo' + index.toString()).val();
        var familia = $('#BI_cmbFamilia' + index.toString()).val();

        if (codItem == "" || codItem == null || codItem == undefined || codItem.trim().length == 0) {
            app.message.error("Validaci&oacute;n", "El campo Cod.Producto de la fila, debe estar completo");
            return;
        };

        if (descripcion == "" || descripcion == null || descripcion == undefined || descripcion.trim().length == 0) {
            app.message.error("Validaci&oacute;n", "El campo Descripci&oacute;n de la fila, debe estar completo");
            return;
        };

        if (familia == "" || familia == null) {
            app.message.error("Validaci&oacute;n","Debe de seleccionar la familia del producto, no puede estar vac&iacute;no")
            return;
        };

        info = {
            IdCotizacion: $idCotizacion.val(),
            NroItem: index + 1,
            CodItem: codItem,
            Descripcion: descripcion,
            Stock: stock,
            Cantidad: cantidad,
            CodUnidad: unidad,
            Marca: marca,
            Modelo: modelo,
            EsItemPadre: true,
            Eliminado: false,
        };

        var method = "POST";
        var url = "BandejaSolicitudesVentas/InsertCotDet";
        var objParam = JSON.stringify(info);

        var fnDoneCallBack = function () {
            app.message.success("&Eacute;nxito", "Se agreg&oacute;n correctamente");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    };
    return {
        buscarItems: buscarItems,
        //ObtenerFiltrosPrecios: ObtenerFiltrosPrecios,
        //RecargarFiltroFamilia: RecargarFiltroFamilia,
        agregarItem: agregarItem,
        agregarItemProducto: agregarItemProducto,
        agregarItemHijo: agregarItemHijo,
        quitarCotDetItem: quitarCotDetItem,
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
        IniciarLogicaInputs: IniciarLogicaInputs
    }
})(window.jQuery, window, document);