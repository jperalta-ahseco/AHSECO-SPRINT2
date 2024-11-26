var bandejaPreventivos = (function ($, win, doc) {
    $(Initializer);

    /*Text*/
    var $txtSerie = $('#txtSerie');
    var $txtNumProc = $('#txtNumProc');
    var $txtNumContrato = $('#txtNumContrato');
    var $txtNumOrdCompra = $('#txtNumOrdCompra');
    var $txtNumFianza = $('#txtNumFianza');
    var $periodoIni = $('#periodoIni');
    var $periodoFin = $('#periodoFin');
    var $openPeriodoIni = $('#openPeriodoIni');
    var $openPeriodoFin = $('#openPeriodoFin');

    var $firstDate = $('#firstDate');
    var $lastDate = $('#lastDate');

    /*Combos*/
    var $cmbempresa = $('#cmbempresa');
    var $cmbEstado = $('#cmbEstado');

    /*Buttons*/
    var $btnBuscar = $('#btnBuscar');
    var $btnExportar = $('#btnExportar');



    function Initializer(){
        ObtenerFiltrosPreventivos();
        $openPeriodoIni.click($openRegFecIni_click);
        $openPeriodoFin.click($openRegFecFin_click);
        $periodoIni.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'MM/yyyy'
        });

        $firstDate.datepicker({
            viewMode: "months",
            minViewMode: "months",
            format: 'MM/yyyy'
        });

        $lastDate.datepicker({
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


})(window.jQuery, window, document);