var bandejaPreventivos = (function ($, win, doc) {
    $(Initializer);

    /*Text*/
    var $txtSerie = $('#txtSerie');
    var $txtNumProc = $('#txtNumProc');
    var $txtNumOrdCompra = $('#txtNumOrdCompra');
    var $txtNumFianza = $('#txtNumFianza');
    var $periodoIni = $('#periodoIni');
    var $periodoFin = $('#periodoFin');
    var $openPeriodoIni = $('#openPeriodoIni');
    var $openPeriodoFin = $('#openPeriodoFin');
    var $txtIdMant = $('#txtIdMant');
    var $formPreventivo = $('#formPreventivo');


    /*Combos*/
    var $cmbempresa = $('#cmbempresa');
    //var $cmbEstado = $('#cmbEstado');

    /*Buttons*/
    var $btnBuscar = $('#btnBuscar');
    var $btnExportar = $('#btnExportar');

    var $tblMantenimientos = $('#tblMantenimientos');

    function Initializer() {
        ObtenerFiltrosPreventivos();
        $btnBuscar.click(BuscarPreventivos);
        $openPeriodoIni.click($openRegFecIni_click);
        $openPeriodoFin.click($openRegFecFin_click);

        $periodoIni.val(mesActual());
        $periodoFin.val(mesPosterior());

        $periodoIni.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'yyyy.mm'
        });

        $periodoFin.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'yyyy.mm',
            startDate: $periodoIni.val()
        });
        $btnExportar.click(btnExportarClick);
        $periodoIni.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);


        BuscarPreventivos();
    };

    function ObtenerFiltrosPreventivos() {
        method = "POST";
        url = "BandejaPreventivo/ObtenerFiltrosPreventivos"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, "0", "--Todos--", filters);
            //app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, 0, "--Todos--", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion", "Ocurrió un problema al cargar los filtros de la bandeja. ")
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null)
    };

    function $openRegFecIni_click() {
        $periodoIni.focus();
    }

    function $openRegFecFin_click() {
        $periodoFin.focus();
    }

    function changeDateFechaInicialRegFecIni() {
        $periodoFin.val('');
        $periodoFin.datepicker('destroy');
        $periodoFin.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'yyyy.mm',
            startDate: $periodoIni.datepicker('getDate')
        });
    }
    function BuscarPreventivos() {
        var method = "POST";
        var url = "BandejaPreventivo/ObtenerPreventivos";

        var objConsulta = {
            Id_Mant : $txtIdMant.val() == "" ? "0" : $txtIdMant.val(),
            NumSerie: $txtSerie.val() == "" ? "0" : $txtSerie.val(),
            NumProc: $txtNumProc.val() == "" ? "0" : $txtNumProc.val(),
            NumOrdCompra: $txtNumOrdCompra.val() == "" ? "0" : $txtNumOrdCompra.val(),
            NumFianza: $txtNumFianza.val() == "" ? "0" : $txtNumFianza.val(),
            Empresa: $cmbempresa.val() == "" ? "0" : $cmbempresa.val(),
            PeriodoInicio: $periodoIni.val().replace("/","."),
            PeriodoFinal: $periodoFin.val().replace("/", "."),
            //Estado: $cmbEstado.val() == "" || $cmbEstado.val() == 0 ? "" : $cmbEstado.val(),
        };

        var objParam = JSON.stringify(objConsulta);

        var fnDoneCallBack = function (data) {
            cargarTablaPreventivos(data);
        };

        var fnFailCallBack = function () {
            cargarTablaPreventivos();
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);

    }
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblMantenimientos.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Mantenimientos", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "Id_Mant", value: $txtIdMant.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumSerie", value: $txtSerie.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumProc", value: $txtNumProc.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumOrdCompra", value: $txtNumOrdCompra.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumFianza", value: $txtNumFianza.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Empresa", value: $cmbempresa.val() == "0" || $cmbempresa.val() == null ? "" : $cmbempresa.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "PeriodoInicio", value: $periodoIni.val().toString().replace("/",".")}).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "PeriodoFinal", value: $periodoFin.val().toString().replace("/", ".")}).appendTo("#hidden_fields");

        $formPreventivo.attr('action', href);
        $formPreventivo.submit();
    }
    function cargarTablaPreventivos(data) {
        var columns = [
            {
                data: "Id_Mant",
                render: function (data, type, row) {
                    var numReqFormateado = ("000000" + data.toString());
                    numReqFormateado = numReqFormateado.substring((numReqFormateado.length) - 6, numReqFormateado.length);

                    return '<center>' + numReqFormateado + '</center>'
                }
            },
            {
                data: "Serie",
                render: function (data, type, row) {
                    return '<center>'+data+'</center>'
                }
            },
            {
                data: "Descripcion",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "FechaInstalacion",
                render: function (data, type, row) {
                    return '<center>' + app.obtenerFecha(data) + '</center>'
                }
            },
            {
                data: "ProxFechaMant",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "TotalPrevent",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "PreventReal",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "PreventPend",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "UbigeoDest",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Id_Mant",
                render: function (data, type, row) {
                    var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: bandejaPreventivos.ver(' + data + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    var accion = '<a id="btnEditar" class="btn btn-default btn-xs" title="Editar" href="javascript: bandejaPreventivos.editar(' + data + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a>';
                    return '<center>' + ver + ' ' + accion +'</center>'
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];

        var filters = {};
        filters.dataTableInfo= true;
        filters.dataTablePageLength = 10;
        filters.dataTablePaging = true;

        app.llenarTabla($tblMantenimientos, data, columns, columnDefs, "#tblMantenimientos", null, null,filters);
    };

    function mesActual() {
        var date = new Date();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${year}.${mes}`;
    }

    function mesPosterior() {
        var date = new Date();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var intMes = parseInt(mes)+1;
        var year = date.getFullYear();
        if (intMes > 12) {
            year += 1;
            mes = '01'
        };
        return `${year}.${mes}`;
    }

    function ver(idMant) {
        var method = "POST";
        var url = "BandejaPreventivo/SetVariablesGenerales";
        var objVer = {
            Id_Mant: idMant,
            TipoTarea: "V"
        };

        var objParam = JSON.stringify(objVer);
        var fnDoneCallBack = function () {
            app.redirectTo("BandejaPreventivo/RegistroPreventivo");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function editar(idMant) {
        var method = "POST";
        var url = "BandejaPreventivo/SetVariablesGenerales";
        var objEditar = {
            Id_Mant: idMant,
            TipoTarea: "U",
        };

        var objParam = JSON.stringify(objEditar);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaPreventivo/RegistroPreventivo");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };


    return {
        ver: ver,
        editar: editar
    }

})(window.jQuery, window, document);