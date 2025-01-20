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
    var $txtIdRegIns = $('#txtIdRegIns');
    var $formPreventivo = $('#formPreventivo');
    var $cmbCliente = $('#cmbCliente');
    var $txtNomEquipo = $('#txtNomEquipo');
    var $txtMarca = $('#txtMarca');
    var $txtModelo = $('#txtModelo');
    var $txtUbicacion = $('#txtUbicacion');
    var $searchUbigeo = $('#searchUbigeo');
    var $cmbProvincia = $('#cmbProvincia ');
    var $cmbDepartamento = $('#cmbDepartamento');
    var $cmbDistrito = $('#cmbDistrito');
    var $modalUbigeo = $('#modalUbigeo');
    var $btnGuardarUbigeo = $('#btnGuardarUbigeo');

    var $spanSi = $('#spanSi');
    var $spanNo = $('#spanNo');



    /*Combos*/
    var $cmbempresa = $('#cmbempresa');
    //var $cmbEstado = $('#cmbEstado');

    /*Buttons*/
    var $btnBuscar = $('#btnBuscar');
    var $btnExportar = $('#btnExportar');

    var $tblMantenimientos = $('#tblMantenimientos');

    function Initializer() {
        logicUbigeo();
        ObtenerFiltrosPreventivos();
        $btnBuscar.click(BuscarPreventivos);
        $openPeriodoIni.click($openRegFecIni_click);
        $openPeriodoFin.click($openRegFecFin_click);
        $btnGuardarUbigeo.click(seleccionar);

        //$periodoIni.val(mesActual());
        //$periodoFin.val(mesPosterior());

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

        $spanSi.on('click', function () {
            botonSi();
        });

        $spanNo.on('click', function () {
            botonNo();
        });

        BuscarPreventivos();
    };

    function botonSi() {
        $spanNo.css('background-color', 'gray');
        $spanSi.css('background-color', 'green');
        limpiarFiltrosBusqueda();
        cambiarTipBusqueda(2);
    }

    function botonNo() {
        $spanSi.css('background-color', 'gray');
        $spanNo.css('background-color', 'red');
        limpiarFiltrosBusqueda();
        cambiarTipBusqueda(1);
    }

    function cambiarTipBusqueda(tip) {
        $.ajax({
                url: app.baseUrl + "BandejaPreventivo/SetIdMigra",
                data: {
                    tip: tip
                }
            }
        );
    }

    function limpiarFiltrosBusqueda() {
        $txtIdRegIns.val("");
        $txtSerie.val("");
        $txtNumProc.val("");
        $txtNumOrdCompra.val("");
        $txtNumFianza.val("");
        $cmbempresa.val("");
        $periodoIni.val("");
        $periodoFin.val("");
        $cmbCliente.val("");
        $txtMarca.val("");
        $txtModelo.val("");
        $txtNomEquipo.val("");
        $txtUbicacion.val("");
    };

    function seleccionar() {

        var codDistrito = sessionStorage.getItem('codDistrito');
        var codDepartamento = sessionStorage.getItem('codDepartamento');
        var codProvincia = sessionStorage.getItem('codProvincia');
        var nomDepartamento = sessionStorage.getItem('nomDepartamento')
        var nomProvincia = sessionStorage.getItem('nombreProvincia');
        var nomDistrito = sessionStorage.getItem('nombreDistrito');


        if ($cmbDepartamento.val() === "" || $cmbDepartamento.val() === null || $cmbDepartamento.val() === undefined || $cmbDepartamento.val() === "00") {
            var codDepartamento = "00"
            sessionStorage.setItem('codDepartamento', `${codDepartamento}`);
            var codProvincia = "0000"
            sessionStorage.setItem('codProvincia', `${codProvincia}`);
            var codDistrito = "000000"
            sessionStorage.setItem('codDistrito', `${codDistrito}`);
            codDepartamento = "";
            nomDepartamento = "";
            codProvincia = "";
            nomProvincia = "";
            codDistrito = "";
            nomDistrito = "";
            $txtUbicacion.val("");
        }

        else if ($cmbProvincia.val() === "" || $cmbProvincia.val() === null || $cmbProvincia.val() === undefined || $cmbProvincia.val() === "0000") {
            var codProvincia = "0000"
            sessionStorage.setItem('codProvincia', `${codProvincia}`);
            var codDistrito = "000000"
            sessionStorage.setItem('codDistrito', `${codDistrito}`);
            codProvincia = "";
            nomProvincia = "";
            codDistrito = "";
            nomDistrito = "";
            $txtUbicacion.val("");
            $txtUbicacion.val(nomDepartamento);

        }

        else if ($cmbDistrito.val() === "" || $cmbDistrito.val() === null || $cmbDistrito.val() === undefined || $cmbDistrito.val() === "000000") {
            var codDistrito = "000000"
            sessionStorage.setItem('codDistrito', `${codDistrito}`);

            codDistrito = "";
            nomDistrito = "";
            $txtUbicacion.val("");
            $txtUbicacion.val(nomDepartamento + ' / ' + nomProvincia);

        }
        else {
            $txtUbicacion.val("");
            $txtUbicacion.val(nomDepartamento + ' / ' + nomProvincia + ' / ' + nomDistrito);
        }

        $modalUbigeo.modal('hide');
    }


    function ObtenerFiltrosPreventivos() {
        method = "POST";
        url = "BandejaPreventivo/ObtenerFiltrosPreventivos"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, "0", "--Todos--", filters);
            app.llenarComboMultiResult($cmbCliente, data.Result.Clientes, null, "0", "--Todos--", filters);

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

        var codDepartamento = sessionStorage.getItem('codDepartamento');
        var codProvincia = sessionStorage.getItem('codProvincia');
        var codDistrito = sessionStorage.getItem('codDistrito');

        var objConsulta = {
            NumReq : $txtIdRegIns.val() == "" ? "0" : $txtIdRegIns.val(),
            NumSerie: $txtSerie.val() == "" ? "0" : $txtSerie.val(),
            NumProc: $txtNumProc.val() == "" ? "0" : $txtNumProc.val(),
            NumOrdCompra: $txtNumOrdCompra.val() == "" ? "0" : $txtNumOrdCompra.val(),
            NumFianza: $txtNumFianza.val() == "" ? "0" : $txtNumFianza.val(),
            Empresa: $cmbempresa.val() == "" ? "0" : $cmbempresa.val(),
            PeriodoInicio: $periodoIni.val().replace("/","."),
            PeriodoFinal: $periodoFin.val().replace("/", "."),
            Ruc: $cmbCliente.val() == null ? "0" : $cmbCliente.val(),
            NomEquipo: $txtNomEquipo.val(),
            Marca:$txtMarca.val(),
            CodUbigeoDest: codDepartamento + codProvincia.slice(2, 4) + codDistrito.slice(4, 6),
            Modelo: $txtModelo.val()
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
        $("<input>", { type: "hidden", name: "NumReq", value: $txtIdRegIns.val() }).appendTo("#hidden_fields");
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
                data: "NumInst",
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
                data: "Marca",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Modelo",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Cliente",
                render: function (data,type, row) {
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


    /**ModalUbigeo****/
    function logicUbigeo() {
        var codDepartamento = "00"
        sessionStorage.setItem('codDepartamento', `${codDepartamento}`);
        var codProvincia = "0000"
        sessionStorage.setItem('codProvincia', `${codProvincia}`);
        var codDistrito = "000000"
        sessionStorage.setItem('codDistrito', `${codDistrito}`);
        $cmbProvincia.prop("disabled", true);
        $cmbDistrito.prop("disabled", true);
        obtenerDepartamento();
    }
    function obtenerDepartamento() {
        var method = "POST";
        var url = "Ubigeo/ObtenerUbigeo";
        var ubigeoObj = {}

        var objParam = JSON.stringify(ubigeoObj);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            var distritos = { Result: [] };
            for (let i = 0; i < data.Result.length; i++) {
                var departamento = {
                    Id: data.Result[i].CodDepartamento,
                    Text: data.Result[i].NombreDepartamento,
                }
                resultado.Result.push(departamento);
            }

            resultado.Result = resultado.Result.reduce((acumulador, itemActual) => {
                // Verificar si el Id ya está en el acumulador
                if (!acumulador.some(item => item.Id === itemActual.Id)) {
                    acumulador.push(itemActual);
                }
                return acumulador;
            }, []);
            $cmbDepartamento.on('change', function () {
                const codDepartamento = $(this).val();
                const nomDepartamento = $('select[id="cmbDepartamento"] option:selected').text();
                sessionStorage.setItem('codDepartamento', `${codDepartamento}`);
                sessionStorage.setItem('nomDepartamento', `${nomDepartamento}`);

                if (!codDepartamento === null || !codDepartamento === '') {
                    $(this).prop('disabled', false);

                } else {
                    $cmbProvincia.prop('disabled', false);
                    obtenerProvincia(codDepartamento, data);
                    $cmbDistrito.prop("disabled", true);
                }
                $cmbDistrito.val("").trigger("change");
            });
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = true;
            app.llenarCombo($cmbDepartamento, resultado, $modalUbigeo, "00", "<--Todos-->", filters);
        }
        var fnFailCallback = function () {
            app.mensajes.error("Error", "No se ejecutó correctamente la carga de departamentos")
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);

    }
    function obtenerProvincia(codDepartamento, data) {
        var provincias = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var provincia = {
                Id: data.Result[i].CodProvincia,
                Text: data.Result[i].NombreProvincia,
            }
            provincias.Result.push(provincia);

        }
        provincias.Result = provincias.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodDepartamento = itemActual.Id.startsWith(codDepartamento);
            if (!isDuplicate && startsWithCodDepartamento) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);
        $cmbProvincia.on('change', function () {
            const codProvincia = $(this).val();
            const nombreProvincia = $('select[id="cmbProvincia"] option:selected').text();
            sessionStorage.setItem('codProvincia', `${codProvincia}`);
            sessionStorage.setItem('nombreProvincia', `${nombreProvincia}`);

            if (!codProvincia === null || !codProvincia === '') {
                $(this).prop('disabled', false);

            } else {
                $cmbProvincia.prop('disabled', false);
                $cmbDistrito.prop('disabled', false)
                obtenerDistrito(codProvincia, data);
            }
        });

        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = true;
        app.llenarCombo($cmbProvincia, provincias, $modalUbigeo, "0000", "<--Todos-->", filters)
    }
    function obtenerDistrito(codProvincia, data) {
        var distritos = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var distrito = {
                Id: data.Result[i].UbigeoId,
                Text: data.Result[i].NombreDistrito,
            }
            distritos.Result.push(distrito);

        }
        distritos.Result = distritos.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodProvincia = itemActual.Id.startsWith(codProvincia);
            if (!isDuplicate && startsWithCodProvincia) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);

        $cmbDistrito.on('change', function () {
            const codDistrito = $(this).val();
            const nombreDistrito = $('select[id="cmbDistrito"] option:selected').text();
            sessionStorage.setItem('codDistrito', `${codDistrito}`);
            sessionStorage.setItem('nombreDistrito', `${nombreDistrito}`);
        });

        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = true;
        app.llenarCombo($cmbDistrito, distritos, $modalUbigeo, "000000", "<--Todos-->", filters)
    }
    /**Fin ModalUbigeo****/





    return {
        ver: ver,
        editar: editar
    }

})(window.jQuery, window, document);