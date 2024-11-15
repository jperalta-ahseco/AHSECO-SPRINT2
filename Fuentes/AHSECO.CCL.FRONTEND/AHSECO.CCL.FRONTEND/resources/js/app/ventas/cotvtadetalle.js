var cotvtadet = (function ($, win, doc) {

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

    var $cmbTipo = $('#cmbTipo');

    var $BI_cmbFamilia = $('#BI_cmbFamilia');
    var $BI_txtCodProducto = $('#BI_txtCodProducto');
    var $BI_txtNomProducto = $('#BI_txtNomProducto');
    var $BI_cmbTipoMedida = $('#BI_cmbTipoMedida');
    var $BI_cmbMarca = $('#BI_cmbMarca');

    var $btnAgregarDetalle = $("#btnAgregarDetalle");
    var $btnBuscarItems = $('#btnBuscarItems');
    var $tblItems = $('#tblItems');
    var $tblCotDet = $('#tblCotDet');

    var $DI_hdnCodigoPadre = $("#DI_hdnCodigoPadre");
    var $DI_hdnCodigo = $("#DI_hdnCodigo");
    var $DI_txtCodigo = $("#DI_txtCodigo");
    var $DI_txtDescripcion = $("#DI_txtDescripcion");
    var $DI_txtDescripcionAdic = $("#DI_txtDescripcionAdic");
    var $DI_txtCantidad = $("#DI_txtCantidad");
    var $DI_txtCostoFOB = $("#DI_txtCostoFOB");
    var $DI_txtValorUnitario = $("#DI_txtValorUnitario");
    var $DI_txtGanancia = $("#DI_txtGanancia");
    var $DI_radLLaveEnMano_Si = $("#DI_radLLaveEnMano_Si");
    var $DI_radLLaveEnMano_No = $("#DI_radLLaveEnMano_No");
    var $DI_radCompraLocal_Si = $("#DI_radCompraLocal_Si");
    var $DI_radCompraLocal_No = $("#DI_radCompraLocal_No");
    //var $txtUbicacion = $("#txtUbicacion"); //Ubigeo
    //var $DI_txtDireccion = $("#DI_txtDireccion");
    //var $DI_txtNroPiso = $("#DI_txtNroPiso");
    var $DI_txtDimensiones = $("#DI_txtDimensiones");
    var $DI_radMantPrevent_Si = $("#DI_radMantPrevent_Si");
    var $DI_radMantPrevent_No = $("#DI_radMantPrevent_No");
    var $DI_txtFechaLimite = $("#DI_txtFechaLimite");
    var $DI_radGarantAdic_Si = $("#DI_radGarantAdic_Si");
    var $DI_radGarantAdic_No = $("#DI_radGarantAdic_No");
    //var $DI_txtCantPreventivo = $("#DI_txtCantPreventivo");
    //var $DI_cmbCicloPreventivo = $("#DI_cmbCicloPreventivo");
    var $DI_radManuales_Si = $("#DI_radManuales_Si");
    var $DI_radManuales_No = $("#DI_radManuales_No");
    var $DI_radVideos_Si = $("#DI_radVideos_Si");
    var $DI_radVideos_No = $("#DI_radVideos_No");
    var $DI_radInstaCapa_Si = $("#DI_radInstaCapa_Si");
    var $DI_radInstaCapa_No = $("#DI_radInstaCapa_No");
    var $DI_txtGarantiaAdic = $("#DI_txtGarantiaAdic");
    var $DI_txtReqCliente = $("#DI_txtReqCliente");
    var $DI_txtObsInsta = $("#DI_txtObsInsta");
    
    var $DI_btnGuardar = $("#DI_btnGuardar");
    var $DI_btnCerrar = $("#DI_btnCerrar");

    var $DC_btnGuardar = $("#DC_btnGuardar");
    var $DC_btnCerrar = $("#DC_btnCerrar");

    var $btnEnviarCotizacion = $("#btnEnviarCotizacion");

    var $tabDetCot = $("#tabDetCot");
    var $tabCalib = $("#tabCalib");
    var $tabInsta = $("#tabInsta");
    var $tabMantPrevent = $("#tabMantPrevent");
    var $tabFlete = $("#tabFlete");

    var $tblDetCotCostos = $('#tblDetCotCostos');
    var $tblCalibCostos = $("#tblCalibCostos");
    var $tblInstaCostos = $("#tblInstaCostos");
    var $tblMantPreventCostos = $("#tblMantPreventCostos");
    var $tblFleteCostos = $("#tblFleteCostos");

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

        $DI_txtFechaLimite.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        listarCotDetItems();
        //cargarCiclosPreventivos();

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
            var filters2 = {};
            filters2.placeholder = "-- Todos --";
            filters2.allowClear = false;
            app.llenarComboMultiResult($BI_cmbMarca, data.Result.Marcas, null, " ", "-- Todos --", filters2);
            
            //Cargar combo de medidas:
            var filters4 = {};
            filters4.placeholder = "-- Todos --";
            filters4.allowClear = false;
            app.llenarComboMultiResult($BI_cmbTipoMedida, data.Result.Medidas, null, " ", "-- Todos --", filters4);

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
            if (opcTodos == "" || opcTodos == null) { opcTodos = ""; }
            app.llenarComboMultiResult($BI_cmbFamilia, data.Result.Familias, null, opcTodos, "-- Todos --", filters3);

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
            //{
            //    data: "CotizacionDespacho.DescUbigeoDestino",
            //    render: function (data) {
            //        if (data == null) { data = ""; }
            //        return '<center>' + data + '</center>';
            //    }
            //},
            //{
            //    data: "CotizacionDespacho.Direccion",
            //    render: function (data) {
            //        if (data == null) { data = ""; }
            //        return '<center>' + data + '</center>';
            //    }
            //},
            //{
            //    data: "CotizacionDespacho.NroPiso",
            //    render: function (data) {
            //        if (data == null) { data = ""; }
            //        return '<center>' + data + '</center>';
            //    }
            //},
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
        method = "POST";
        url = "BandejaSolicitudesVentas/QuitarItemCotDet";
        var objFiltros = {
            CodItem: CodigoItem,
            opcGrillaItems: opc
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaCotDet(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    /*
    function cargarCiclosPreventivos() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCiclosPreventivos";
        var oValores = {};
        var objParam = JSON.stringify(oValores);
        var fnDoneCallback = function (data) {            
            var filters = {};
            filters.placeholder = "-- Ninguno --";
            filters.allowClear = false;
            app.llenarComboMultiResult($DI_cmbCicloPreventivo, data.Result, null, " ", "-- Ninguno --", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }
    */

    function LimpiarModalDetItem() {
        $DI_txtCantidad.val("");
        $DI_txtCostoFOB.val("");
        $DI_txtValorUnitario.val("");
        $DI_radLLaveEnMano_Si.removeAttr("checked");
        $DI_radLLaveEnMano_No.removeAttr("checked");
        sessionStorage.setItem('codDistrito', "");
        //$txtUbicacion.val("");
        //$DI_txtDireccion.val("");
        //$DI_txtNroPiso.val("");
        $DI_txtDimensiones.val("");
        //$DI_txtCantPreventivo.val("");
        //$DI_cmbCicloPreventivo.val(" ").trigger("change.select2"); // Opcion Ninguno es ESPACIO
        $DI_radManuales_Si.removeAttr("checked");
        $DI_radManuales_No.removeAttr("checked");
        $DI_radVideos_Si.removeAttr("checked");
        $DI_radVideos_No.removeAttr("checked");
        $DI_radInstaCapa_Si.removeAttr("checked");
        $DI_radInstaCapa_No.removeAttr("checked");
    }

    function MostrarDatosItem(data) {
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
            $DI_txtCantidad.val(data.Result.Cantidad);
            $DI_txtCostoFOB.val(data.Result.CostoFOB);
            $DI_txtValorUnitario.val(data.Result.VentaUnitaria);
            $DI_txtGanancia.val(data.Result.PorcentajeGanancia);
            $DI_radLLaveEnMano_Si.prop("checked", false);
            $DI_radLLaveEnMano_No.prop("checked", false);
            $DI_radManuales_Si.prop("checked", false);
            $DI_radManuales_No.prop("checked", false);
            $DI_radVideos_Si.prop("checked", false);
            $DI_radVideos_No.prop("checked", false);
            $DI_radInstaCapa_Si.prop("checked", false);
            $DI_radInstaCapa_No.prop("checked", false);
            $DI_radCompraLocal_Si.prop("checked", false);
            $DI_radCompraLocal_No.prop("checked", false);
            if (data.Result.CotizacionDespacho != null) {
                if (data.Result.CotizacionDespacho.IndLLaveMano != null) {
                    if (data.Result.CotizacionDespacho.IndLLaveMano == true) { $DI_radLLaveEnMano_Si.prop("checked", true); }
                    else { $DI_radLLaveEnMano_No.prop("checked", true); }
                }
                //sessionStorage.setItem('codDistrito', data.Result.CotizacionDespacho.CodUbigeoDestino);
                //if (data.Result.CotizacionDespacho.DescUbigeoDestino != null) { $txtUbicacion.val(data.Result.CotizacionDespacho.DescUbigeoDestino); }
                //$DI_txtDireccion.val(data.Result.CotizacionDespacho.Direccion);
                //$DI_txtNroPiso.val(data.Result.CotizacionDespacho.NroPiso);
                $DI_txtDimensiones.val(data.Result.CotizacionDespacho.Dimensiones);
                //$DI_txtCantPreventivo.val(data.Result.CotizacionDespacho.CantPreventivo);
                //$DI_cmbCicloPreventivo.val(data.Result.CotizacionDespacho.CodCicloPreventivo).trigger("change.select2");
                if (data.Result.CotizacionDespacho.IndInfoManual != null) {
                    if (data.Result.CotizacionDespacho.IndInfoManual == true) { $DI_radManuales_Si.prop("checked", true); }
                    else { $DI_radManuales_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndInfoVideo != null) {
                    if (data.Result.CotizacionDespacho.IndInfoVideo == true) { $DI_radVideos_Si.prop("checked", true); }
                    else { $DI_radVideos_No.prop("checked", true); }
                }
                if (data.Result.CotizacionDespacho.IndInstaCapa != null) {
                    if (data.Result.CotizacionDespacho.IndInstaCapa == true) { $DI_radInstaCapa_Si.prop("checked", true); }
                    else { $DI_radInstaCapa_No.prop("checked", true); }
                }
                $DI_txtGarantiaAdic.val(data.Result.CotizacionDespacho.GarantiaAdicional);
                if (data.Result.CotizacionDespacho.IndCompraLocal != null) {
                    if (data.Result.CotizacionDespacho.IndCompraLocal == true) { $DI_radCompraLocal_Si.prop("checked", true); }
                    else { $DI_radCompraLocal_No.prop("checked", true); }
                }
            }
        }
    }

    function editarItem(CodigoItem, opc) {
        $DI_hdnCodigoPadre.val("");

        method = "POST";
        url = "BandejaSolicitudesVentas/EditarItemCotDet";
        var objFiltros = {
            CodItem: CodigoItem,
            opcGrillaItems: opc
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            opcGrillaItems = opc;
            LimpiarModalDetItem();
            MostrarDatosItem(data);
            $('#modalDetalleItem').modal('show');
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function SeleccionarRowCotDet(chk) {
        var ID = ObtenerCodItemxFila(chk);

        method = "POST";
        url = "BandejaSolicitudesVentas/SeleccionarRowCotDet";
        var objFiltros = {
            CodigoItem: ID
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
            CodItemPadre: CodigoItem
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
                    var editar = '<a id="btnEditarSubItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarSubItem(' + String.fromCharCode(39) + CodItemPadre + String.fromCharCode(39) + ',' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarSubItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarSubItem(' + String.fromCharCode(39) + CodItemPadre + String.fromCharCode(39) + ',' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
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
            CodItemPadre: CodigoItemPadre,
            CodItem: CodigoItem
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
        url = "BandejaSolicitudesVentas/EditarSubItemCotDet";
        var objFiltros = {
            CodItemPadre: CodigoItemPadre,
            CodItem: CodigoItem
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            opcGrillaItems = 1;
            LimpiarModalDetItem();
            MostrarDatosItem(data);
            $('#modalDetalleItem').modal('show');
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function grabarDatosCotDetItem() {

        var bLLaveMano = false;
        var bCompraLocal = false;
        var bManuales = false;
        var bVideos = false;
        var bInstaCapa = false;
        var bGarantiaAdic = false;
        var bMantPrevent = false;

        if ($idRolUsuario.val() == $RolVenta_Gerente.val() || $idRolUsuario.val() == $RolVenta_Costos.val()) {

            if ($DI_txtCostoFOB.val() == "" && $DI_txtValorUnitario.val() == "") {
                app.message.error("Validaci&oacute;n", "Se debe llenar m&iacute;nimo 1 campo de COSTOS");
                return false;
            }

            if ($DI_txtCostoFOB.val() != "") {
                if (!app.validaNumeroDecimal($DI_txtCostoFOB.val())) {
                    app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Costo FOB");
                    return false;
                }
            }
            if ($DI_txtValorUnitario.val() != "") {
                if (!app.validaNumeroDecimal($DI_txtValorUnitario.val())) {
                    app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Valor Unitario");
                    return false;
                }
            }

        }
        else {

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

            if ($DI_txtGanancia.val() != "") {
                if (!app.validaNumeroDecimal($DI_txtGanancia.val())) {
                    app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Ganancia");
                    return false;
                }
                else {
                    if (parseInt($DI_txtGanancia.val()) <= 0) {
                        app.message.error("Validaci&oacute;n", "La ganancia no debe ser menor a 0.");
                        return false;
                    }
                }
            }

            if (!$DI_radLLaveEnMano_Si.is(':checked') && !$DI_radLLaveEnMano_No.is(':checked')) {
                app.message.error("Validaci&oacute;n", "Elija Si o No en campo LLave en Mano");
                return false;
            }

            if ($DI_txtFechaLimite.val() != "") {
                if ($DI_txtFechaLimite.val().trim().length <= 0 || $DI_txtFechaLimite.val().trim() == null) {
                    app.message.error("Validación", "Fecha l&iacute;mite de instalaci&oacute;n inv&aacute;lida.");
                    return;
                };
            }

            if (!$DI_radManuales_Si.is(':checked') && !$DI_radManuales_No.is(':checked')) {
                app.message.error("Validaci&oacute;n", "Elija Si o No en campo Manuales");
                return false;
            }

            if (!$DI_radVideos_Si.is(':checked') && !$DI_radVideos_No.is(':checked')) {
                app.message.error("Validaci&oacute;n", "Elija Si o No en campo Videos");
                return false;
            }

            if (!$DI_radInstaCapa_Si.is(':checked') && !$DI_radInstaCapa_No.is(':checked')) {
                app.message.error("Validaci&oacute;n", "Elija Si o No en campo Instalaci&oacute;n y Capacitaci&oacute;n");
                return false;
            }

            if (!$DI_radGarantAdic_Si.is(':checked') && !$DI_radGarantAdic_No.is(':checked')) {
                app.message.error("Validaci&oacute;n", "Elija Si o No en campo Garant&iacute;a adicional");
                return false;
            }

            if (!$DI_radMantPrevent_Si.is(':checked') && !$DI_radMantPrevent_No.is(':checked')) {
                app.message.error("Validaci&oacute;n", "Elija Si o No en campo Mantenimiento Preventivo");
                return false;
            }

            if ($DI_radLLaveEnMano_Si.is(':checked')) { bLLaveMano = true; }

            if ($DI_radCompraLocal_Si.is(':checked')) { bCompraLocal = true; }

            if ($DI_radManuales_Si.is(':checked')) { bManuales = true; }

            if ($DI_radVideos_Si.is(':checked')) { bVideos = true; }

            if ($DI_radInstaCapa_Si.is(':checked')) { bInstaCapa = true; }

            if ($DI_radMantPrevent_Si.is(':checked')) { bMantPrevent = true; }

            if ($DI_radGarantAdic_Si.is(':checked')) { bGarantiaAdic = true; }

        }

        //if (sessionStorage.getItem('codDistrito') == null) {
        //    app.message.error("Validaci&oacute;n", "Seleccione la ubicaci&oacute;n destino");
        //    return false;
        //}

        //if ($DI_txtDireccion.val() == "") {
        //    app.message.error("Validaci&oacute;n", "Ingresa la direcci&oacute;n de destino");
        //    return false;
        //}

        //if ($DI_txtNroPiso.val() != "") {
        //    if (!app.validaNumeroEntero($DI_txtNroPiso.val())) {
        //        app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Piso");
        //        return false;
        //    }
        //}

        //if ($DI_txtCantPreventivo.val() != "") {
        //    if (!app.validaNumeroEntero($DI_txtCantPreventivo.val())) {
        //        app.message.error("Validaci&oacute;n", "N&uacute;mero inv&aacute;lido en campo Cantidad Preventivo");
        //        return false;
        //    }
        //    else {
        //        if (parseInt($DI_txtCantPreventivo.val()) > 0) {
        //            if ($.trim($DI_cmbCicloPreventivo.val()) == "") {
        //                app.message.error("Validaci&oacute;n", "Selecciona un ciclo de prevenci&oacute;n");
        //                return false;
        //            }
        //        }
        //    }
        //}

        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCotDetItem";
        var objDatos = {
            CodItemPadre: $DI_hdnCodigoPadre.val(),
            CotDet: {
                CodItem: $DI_hdnCodigo.val(),
                CodItemTemp: $DI_txtCodigo.val(),
                DescripcionAdicional: $DI_txtDescripcionAdic.val(),
                Cantidad: $DI_txtCantidad.val(),
                CostoFOB: $DI_txtCostoFOB.val(),
                VentaUnitaria: $DI_txtValorUnitario.val(),
                PorcentajeGanancia: $DI_txtGanancia.val(),
                //LLaveEnMano: bLLaveMano,
                //CodUbigeoDestino: sessionStorage.getItem('codDistrito'),
                //DescUbigeoDestino: $txtUbicacion.val(),
                //Direccion: $DI_txtDireccion.val(),
                //NroPiso: $DI_txtNroPiso.val(),
                //Dimension: $DI_txtDimensiones.val(),
                //CantidadPreventivo: $DI_txtCantPreventivo.val(),
                //CodCicloPreventivo: $DI_cmbCicloPreventivo.val(),
                //Manuales: bManuales,
                //Videos: bVideos,
                //InstCapa: bInstaCapa,
                //GarantiaAdic: $DI_txtGarantiaAdic.val(),
                CotizacionDespacho: {
                    IndLLaveMano: bLLaveMano,
                    //CodUbigeoDestino: sessionStorage.getItem('codDistrito'),
                    //DescUbigeoDestino: $txtUbicacion.val(),
                    //Direccion: $DI_txtDireccion.val(),
                    //NroPiso: $DI_txtNroPiso.val(),
                    Dimensiones: $DI_txtDimensiones.val(),
                    //CantPreventivo: $DI_txtCantPreventivo.val(),
                    //CodCicloPreventivo: $DI_cmbCicloPreventivo.val(),
                    IndCompraLocal: bCompraLocal,
                    IndInfoManual: bManuales,
                    IndInfoVideo: bVideos,
                    IndInstaCapa: bInstaCapa,
                    //GarantiaAdicional: $DI_txtGarantiaAdic.val(),
                    IndGarantiaAdicional: bGarantiaAdic,
                    IndMantPreventivo: bMantPrevent,
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
            if (opcGrillaItems == 2) {
                cargarTablaDetCotCostos(data);
            }
        };

        var fnFailCallback = function () {
            app.message.error("Validaci&oacute;n", "Error al grabar la cotizaci&oacute;n");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cerrarModalDetItem() {
        $('#modalDetalleItem').modal('hide');
    }

    function grabarDatosCotDet() {
        method = "POST";
        url = "BandejaSolicitudesVentas/GrabarDatosCotDet";
        var objDatos = { };
        var objParam = JSON.stringify(objDatos);

        var fnDoneCallBack = function (data) {
            cerrarModalDetCot();
            cargarTablaDetCotCostos(data);
            $btnEnviarCotizacion.css("display", "");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaDetCotCostos(data) {

        var columns = [];

        if ($idRolUsuario.val() == $RolVenta_Gerente.val() || $idRolUsuario.val() == $RolVenta_Costos.val()) {

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
                    data: "Unidad",
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
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "VentaUnitaria",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "VentaTotalSinIGV",
                    render: function (data) {
                        if (data == null) { data = ""; }
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
                    data: "VentaTotalConGanacia",
                    render: function (data) {
                        if (data == null) { data = ""; }
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "CodItem",
                    render: function (data) {
                        var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                        var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        var quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                        return '<center>' + hidden + editar + ' ' + quitar + '</center>';
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
                    data: "VentaTotalSinIGV",
                    render: function (data) {
                        if (data == null) { data = ""; }
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
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "CodItem",
                    render: function (data) {
                        var hidden = '<input type="hidden" id="hdnCodItem_' + $.trim(data) + '" value=' + String.fromCharCode(39) + data + String.fromCharCode(39) + '>';
                        var editar = '<a id="btnEditarItem" class="botonDetCot btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.editarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                        var quitar = '<a id="btnQuitarItem" class="botonDetCot btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quitarItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ',2)"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                        return '<center>' + hidden + editar + ' ' + quitar + '</center>';
                    }
                }
            ];

        }

        //Se quita los campos para edición de registros
        if ($estadoSol.val() == "CVAL") {
            if ($idRolUsuario.val() != $RolVenta_Gerente.val() && $idRolUsuario.val() != $RolVenta_Costos.val()) {
                columns.pop();
            }
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
        filters.dataTableInfo = false;
        filters.dataTablePaging = true;

        app.llenarTabla($tblDetCotCostos, data, columns, columnDefs, "#tblDetCotCostos", rowCallback, null, filters);
    }
    
    function cerrarModalDetCot() {
        $('#modalDetalleCotizacion').modal('hide');
    }

    function enviarCotizacion() {

        method = "POST";
        url = "BandejaSolicitudesVentas/EnviarCotizacion";
        var objDatos = {
            IdCotizacion: $idCotizacion.val(),
            IdWorkFlow: $idWorkFlow.val()
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
            app.message.success("Cotizaci&oacute;n", "Se gener&oacute; una nueva cotizaci&oacute;n correctamente.", "Aceptar", redirect);
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

    function listarCotDetItemsTemp() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ListarCotDetItems";
        var objFiltros = {
            opcGrillaItems: "1"
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaDetCotCostos(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function listarCotDetItemsCostos() {
        method = "POST";
        url = "BandejaSolicitudesVentas/ListarCotDetItems";
        var objFiltros = {
            opcGrillaItems: "2"
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaDetCotCostos(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    return {
        buscarItems: buscarItems,
        ObtenerFiltrosPrecios: ObtenerFiltrosPrecios,
        RecargarFiltroFamilia: RecargarFiltroFamilia,
        agregarItem: agregarItem,
        quitarItem: quitarItem,
        //cargarCiclosPreventivos: cargarCiclosPreventivos,
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
        listarCotDetItemsTemp: listarCotDetItemsTemp,
        listarCotDetItemsCostos: listarCotDetItemsCostos,
        recotizarSolicitud: recotizarSolicitud
    }
})(window.jQuery, window, document);