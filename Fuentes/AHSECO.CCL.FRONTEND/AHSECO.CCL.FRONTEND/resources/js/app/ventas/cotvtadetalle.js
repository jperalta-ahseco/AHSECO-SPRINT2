var cotvtadet = (function ($, win, doc) {
    var $numeroSolicitud = $("#numeroSolicitud");
    var $nombreusuario = $('#nombreusuario');
    var $perfilnombre = $('#perfilnombre');
    var $idCotizacion = $("#idCotizacion");

    var $cmbTipo = $('#cmbTipo');

    var $BI_cmbFamilia = $('#BI_cmbFamilia');
    var $BI_txtCodProducto = $('#BI_txtCodProducto');
    var $BI_txtNomProducto = $('#BI_txtNomProducto');
    var $BI_cmbTipoMedida = $('#BI_cmbTipoMedida');
    var $BI_cmbMarca = $('#BI_cmbMarca');

    var $btnBuscarItems = $('#btnBuscarItems');
    var $tblItems = $('#tblItems');
    var $tblCotDet = $('#tblCotDet');

    var mensajes = {
        BuscandoPrecios: "Buscando Precios, porfavor espere...",
        obteniendoFiltros: "Obteniendo filtros de lista de precios..."
    }

    $(Initialize);
    function Initialize() {

        $btnBuscarItems.click(buscarItems);

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
            app.llenarComboMultiResult($BI_cmbMarca, data.Result.Marcas, null, 0, "--Todos--", filters2);
            
            //Cargar combo de medidas:
            var filters4 = {};
            filters4.placeholder = "-- Todos --";
            filters4.allowClear = false;
            app.llenarComboMultiResult($BI_cmbTipoMedida, data.Result.Medidas, null, 0, "--Todos--", filters4);

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
            app.llenarComboMultiResult($BI_cmbFamilia, data.Result.Familias, null, opcTodos, "--Todos--", filters3);

        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
    }

    function buscarItems() {
        method = "POST";
        url = "CatalogoPrecios/ObtenerPrecios";
        var objFiltros = {
            CodigoProducto: $BI_txtCodProducto.val(),
            NombreProducto: $BI_txtNomProducto.val(),
            UnidadMedida: $BI_cmbTipoMedida.val(),
            CodigoFamilia: $BI_cmbFamilia.val(),
            CodigoMarca: $BI_cmbMarca.val(),
            NumeroPaginas: 500,
            Pagina: 1
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaItems(data);
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cargarTablaItems(data) {

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
                    var seleccionar = '<a id="btnSeleccionarItem" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: cotvtadet.selItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) +')"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
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

    function selItem(CodigoItem) {
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
                data: "CodItem",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "LLaveEnMano",
                render: function (data) {
                    if (data == false) { return "<center><input type='checkbox'></center>"; }
                    else { return "<center><input type='checkbox' checked='checked'></center>"; }
                }
            },
            {
                data: "Ubigeo",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Direccion",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Piso",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CantidadPreventivo",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "PeriodoPreventivo",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Manuales",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Videos",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "InstCapa",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "GarantiaAdic",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodItem",
                render: function (data) {
                    var eliminar = '<a id="btnSeleccionarItem" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: cotvtadet.eliItem(' + data + ')"><i class="fa fa-level-down" aria-hidden="true"></i> Quitar</a>';
                    return '<center>' + eliminar + '</center>';
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

    return {
        buscarItems: buscarItems,
        ObtenerFiltrosPrecios: ObtenerFiltrosPrecios,
        RecargarFiltroFamilia: RecargarFiltroFamilia,
        selItem: selItem
    }
})(window.jQuery, window, document);