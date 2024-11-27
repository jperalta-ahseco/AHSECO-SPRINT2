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

    /*Combos*/
    var $cmbempresa = $('#cmbempresa');
    var $cmbEstado = $('#cmbEstado');

    /*Buttons*/
    var $btnBuscar = $('#btnBuscar');
    var $btnExportar = $('#btnExportar');



    function Initializer(){
        ObtenerFiltrosPreventivos();
        $btnBuscar.click(BuscarPreventivos);
        $openPeriodoIni.click($openRegFecIni_click);
        $openPeriodoFin.click($openRegFecFin_click);
        $periodoIni.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'MM/yyyy'
        });
        $periodoFin.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'MM/yyyy'
        });
    };

    function ObtenerFiltrosPreventivos() {
        method = "POST";
        url = "BandejaPreventivo/ObtenerFiltrosPreventivos"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, 0, "--Todos--", filters);
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
        $openPeriodoFin.val('');
        $openPeriodoFin.datepicker('destroy');
        $openPeriodoFin.datepicker({
            viewMode: "years",
            minViewMode: "years",
            format: 'mm/yyyy',
            //startDate: $openPeriodoFin.datepicker('getDate')
        });
    }

    function BuscarPreventivos() {
        var method = "POST";
        var url = "BandejaPreventivo/ObtenerPreventivos";

        var objConsulta = {
            NumSerie: $txtSerie.val(),
            NumProc: $txtNumProc.val(),
            NumOrdCompra: $txtNumOrdCompra.val(),
            NumFianza: $txtNumFianza.val(),
            Empresa: $cmbempresa.val(),
            PeriodoInicio: $periodoIni.val(),
            PeriodoFinal: $periodoFin.val(),
            Estado: $cmbEstado.val(),
        };

        var objParam = JSON.stringify(objConsulta);

        var fnDoneCallBack = function (data) {
            cargarTablaPreventivos(data);
        };

        var fnFailCallBack = function () {
            cargarTablaPreventivos();
        },
    }

    function cargarTablaPreventivos(data) {
        var columns = [

        ];

        var columnDefs = [

        ];

        app.llenarTabla();
    };


})(window.jQuery, window, document);