var consultaPrecios = (function ($, win, doc) {
    /**Filtros Consulta Precios */
    var $txtCodProducto = $("#txtCodProducto");
    var $txtNombreProducto = $("#txtNombreProducto");
    var $cmbTipoMedida = $("#cmbTipoMedida");
    var $cmbMarca = $("#cmbMarca");   
    var $cmbFamilia = $("#cmbFamilia");

    /**Formulario */
    var $formPrecios = $('#formPrecios');
    /**Tablas */
    var $tblPrecios = $("#tblPrecios");
    /**Botones */
    var $btnBuscar = $("#btnBuscar");
    var $btnExportar = $("#btnExportar");

    var mensajes = {
        BuscandoPrecios: "Buscando Precios, porfavor espere...",
        obteniendoFiltros: "Obteniendo filtros de lista de precios..."
    }

    $(Initializer)
    function Initializer() {

        $btnBuscar.click(btnBuscarClick);
        $btnExportar.click(btnExportarClick);
        ObtenerFiltrosPrecios();
      
        setTimeout(function () {
            btnBuscarClick();
        }, 1000);
    }


    function ObtenerFiltrosPrecios() {
        var method = "POST";
        var url = "CatalogoPrecios/FiltrosPrecios";
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
            app.llenarComboMultiResult($cmbTipoMedida, data.Result.Medidas, null, 0, "--Todos--", filters4);

        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
    }

    function btnBuscarClick() {
        var method = "POST";
        var url = "CatalogoPrecios/ObtenerPrecios";
        var objPrecio = {
            CodigoProducto: $txtCodProducto.val().trim(),
            NombreProducto: $txtNombreProducto.val().trim(),
            UnidadMedida: $cmbTipoMedida.val(),
            CodigoFamilia: $cmbFamilia.val(),
            CodigoMarca: $cmbMarca.val(),
            NumeroPaginas: 500,
            Pagina:1
        };
        var objParam = JSON.stringify(objPrecio);
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.BuscandoPrecios);
    }
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();

        var cant = $tblPrecios.DataTable().rows().data().length;
            
            if (cant === 0) {
                app.message.error("Reporte de Precios", "La búsqueda no produjo resultados", "Aceptar");
                return false;
            }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoProducto", value: $txtCodProducto.val().trim() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreProducto", value: $txtNombreProducto.val().trim() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "UnidadMedida", value: $cmbTipoMedida.val() == null ? '0' : $cmbTipoMedida.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoFamilia", value: $cmbFamilia.val() == null ? '0' : $cmbFamilia.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoMarca", value: $cmbMarca.val() == null ? '0' : $cmbMarca.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumeroPaginas", value: 0 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Pagina", value: 1 }).appendTo("#hidden_fields");
        $formPrecios.attr("action", href);
        $formPrecios.submit();

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
                data: "NombreProducto",
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
                data: "PrecioReferencial",
                render: function (data) {
                    var precio = data.toFixed(2);
                    return '<center>' + precio + '</center>';
                }
            }
        ];
        var columnDefs =
        {
            targets: [0],
            visible: false
        }

        var filters =
        {
            dataTableSearching: false,
            dataTablePageLength: 10
        }


        app.llenarTabla($tblPrecios, data, columns, columnDefs, "#tblPrecios", null, null, filters);
    }

})(window.jQuery, window, document);