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
            app.llenarComboMultiResult($BI_cmbMarca, data.Result.Marcas, null, "", "--Todos--", filters2);
            
            //Cargar combo de medidas:
            var filters4 = {};
            filters4.placeholder = "-- Todos --";
            filters4.allowClear = false;
            app.llenarComboMultiResult($BI_cmbTipoMedida, data.Result.Medidas, null, "", "--Todos--", filters4);

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
        url = "BandejaSolicitudesVentas/ObtenerArticulos";
        var objFiltros = {
            CodsArticulo: $BI_txtCodProducto.val(),
            DescArticulo: $BI_txtNomProducto.val(),
            CodsUnidad: $BI_cmbTipoMedida.val(),
            CodsFamilia: $BI_cmbFamilia.val(),
            CodsMarca: $BI_cmbMarca.val(),
            CantidadRegistros: 500
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaItems(data);
        };

        var fnFailCallback = function () {
            app.message.error("Validación", "No hay productos.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback);
    }

    function cargarTablaItems(data) {

        var columns = [
            {
                data: "CodArticulo",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescFamilia",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescArticulo",
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
                data: "PrecioRef",
                render: function (data) {
                    var precio = data.toFixed(2)
                    return '<center>' + precio + '</center>';
                }
            },
            {
                data: "DescUnidad",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodArticulo",
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
        
        //var columns = [
        //    {
        //        data: "CodItem",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "Descripcion",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "Cantidad",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "LLaveEnMano",
        //        render: function (data) {
        //            var checked = "";
        //            if (data == true) { checked = "checked='true'"; }
        //            var input = "<input type='checkbox' " + checked + " disabled='disabled'";
        //            return '<center>' + input + '</center>';
        //        }
        //    },
        //    {
        //        data: "Ubigeo",
        //        render: function (data) {
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "Direccion",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "Piso",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "CantidadPreventivo",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "PeriodoPreventivo",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "Manuales",
        //        render: function (data) {
        //            var checked = "";
        //            if (data == true) { checked = "checked='true'"; }
        //            var input = "<input type='checkbox' " + checked + " disabled='disabled'";
        //            return '<center>' + input + '</center>';
        //        }
        //    },
        //    {
        //        data: "Videos",
        //        render: function (data) {
        //            var checked = "";
        //            if (data == true) { checked = "checked='true'"; }
        //            var input = "<input type='checkbox' " + checked + " disabled='disabled'";
        //            return '<center>' + input + '</center>';
        //        }
        //    },
        //    {
        //        data: "InstCapa",
        //        render: function (data) {
        //            var checked = "";
        //            if (data == true) { checked = "checked='true'"; }
        //            var input = "<input type='checkbox' " + checked + " disabled='disabled'";
        //            return '<center>' + input + '</center>';
        //        }
        //    },
        //    {
        //        data: "GarantiaAdic",
        //        render: function (data) {
        //            if (data == null) { data = ""; }
        //            return '<center>' + data + '</center>';
        //        }
        //    },
        //    {
        //        data: "CodItem",
        //        render: function (data) {
        //            var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.ediItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
        //            var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.eliItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
        //            return '<center>' + editar + ' ' + quitar + '</center>';
        //        }
        //    }
        //];

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
                data: "Ubigeo",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Direccion",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Piso",
                render: function (data) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodItem",
                render: function (data) {
                    var editar = '<a id="btnEditarItem" class="btn btn-info btn-xs" title="Editar" href="javascript: cotvtadet.ediItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                    var quitar = '<a id="btnQuitarItem" class="btn btn-danger btn-xs" title="Quitar" href="javascript: cotvtadet.quiItem(' + String.fromCharCode(39) + data + String.fromCharCode(39) + ')"><i class="fa fa-trash-o" aria-hidden="true"></i> Quitar</a>';
                    return '<center>' + editar + ' ' + quitar + '</center>';
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

    function quiItem(CodigoItem) {
        method = "POST";
        url = "BandejaSolicitudesVentas/QuitarItemCotDet";
        var objFiltros = {
            CodItem: CodigoItem
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            cargarTablaCotDet(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function ediItem(CodigoItem) {
        method = "POST";
        url = "BandejaSolicitudesVentas/EditarItemCotDet";
        var objFiltros = {
            CodArticulo: CodigoItem
        };
        var objParam = JSON.stringify(objFiltros);

        var fnDoneCallBack = function (data) {
            $("#DI_txtCodProducto").val(data.Result.CodItem);
            $("#DI_txtNomProducto").val(data.Result.Descripcion);
            $('#modalDetalleItem').modal('show');
        };
        
        app.llamarAjax(method, url, objParam, fnDoneCallBack, null);
    }

    function cerrarModalDetItem() {
        $('#modalDetalleItem').modal('hide');
    }

    return {
        buscarItems: buscarItems,
        ObtenerFiltrosPrecios: ObtenerFiltrosPrecios,
        RecargarFiltroFamilia: RecargarFiltroFamilia,
        selItem: selItem,
        quiItem: quiItem,
        ediItem: ediItem,
        cerrarModalDetItem: cerrarModalDetItem
    }
})(window.jQuery, window, document);