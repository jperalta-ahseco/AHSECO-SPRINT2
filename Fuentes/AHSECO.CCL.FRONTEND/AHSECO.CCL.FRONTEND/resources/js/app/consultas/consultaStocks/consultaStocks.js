var consultaStock = (function ($, win, doc) {

    var $txtProducto = $("#txtProducto");
    var $txtDescripcion = $("#txtDescripcion");
    var $txtFabrica = $("#txtFabrica");
    var $cmbAlmacen = $("#cmbAlmacen");
    var $cmbMarca = $("#cmbMarca");
    var $cmbFamilia = $("#cmbFamilia");
    var $cmbUnidadMedida = $("#cmbUnidadMedida");
    var $btnBuscar = $("#btnBuscar");
    var $btnExportar = $("#btnExportar");
    var $formStocks = $("#formStocks");
    var $tblStocks = $("#tblStocks");
    var mensajes = {
        consultandoStocks: "Consultando Stocks, por favor espere...",
        obteniendoFiltros: "Obteniendo filtros de lista de precios..."
    }
    $(Initialize);
    function Initialize() {
        
        $btnExportar.click(btnExportarClick);
        $btnBuscar.click(btnBuscarClick);
        ObtenerFiltrosStocks();
        setTimeout(function () {
            btnBuscarClick();
        }, 1000);
    }

    function ObtenerFiltrosStocks() {
        var method = "POST";
        var url = "CatalogoStocks/FiltrosStocks";   
        var objParam = '';
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
            app.llenarComboMultiResult($cmbUnidadMedida, data.Result.Medidas, null, 0, "--Todos--", filters4);

            //Cargar combo de almacenes:
            var filters5 = {};
            filters5.placeholder = "-- Todos --";
            filters5.allowClear = false;
            app.llenarComboMultiResult($cmbAlmacen, data.Result.Almacenes, null, 0, "--Todos--", filters5);

        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
    }


    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr("href");
        e.preventDefault();

        var cant = $tblStocks.DataTable().rows().data().length;

            if (cant === 0) {
                app.message.error("Reporte de Stocks", "La búsqueda no produjo resultados", "Aceptar");
                return false;
            }
            $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoProducto", value: $txtProducto.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "DescripcionProducto", value: $txtDescripcion.val().trim() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoFabrica", value: $txtFabrica.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoAlmacen", value: $cmbAlmacen.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoMarca", value: $cmbMarca.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoFamilia", value: $cmbFamilia.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "UnidadMedida", value: $cmbUnidadMedida.val() }).appendTo("#hidden_fields");
        $formStocks.attr("action", href);
        $formStocks.submit();
    }
    function btnBuscarClick() {

        var method = "POST";
        var url = "CatalogoStocks/ObtenerStocks";
        var objStock = {
            CodigoProducto: $txtProducto.val(),
            DescripcionProducto: $txtDescripcion.val(),
            CodigoFabrica: $txtFabrica.val(),
            UnidadMedida: $cmbUnidadMedida.val(),
            CodigoAlmacen: $cmbAlmacen.val(),
            CodigoMarca: $cmbMarca.val(),
            CodigoFamilia: $cmbFamilia.val(),
            NumeroPaginas: 500,
            Pagina: 1
        }
        var objParam = JSON.stringify(objStock);
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function () {
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.consultandoStocks);
    }
    function cargarTabla(data) {
      
        var columns = [
            {
                data: "CodigoProducto",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescripcionProducto",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "UnidadMedida",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodigoFabrica",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "DescripcionAlmacen",
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
                data: "NombreMarca",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Control",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Lote",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "FechaVencimiento",
                render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "StockLote",
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
                    return '<center>' + data.toFixed(2) + '</center>';
                }
            }
        ]
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
        app.llenarTabla($tblStocks, data, columns, columnDefs, "#tblStocks", null,null, filters);
    }    


})(window.jQuery,window,document)