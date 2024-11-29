var bandejaGarantia = (function ($, win, doc) {

    var $cmbEstado = $('#cmbEstado');
    var $cmbProvincia = $('#cmbProvincia');
    var $cmbDistrito = $('#cmbDistrito');
    var $cmbDepartamento = $('#cmbDepartamento');
    var $dateFecRecIni = $('#dateFecRecIni');
    var $dateFecRecFin = $('#dateFecRecFin');
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    var $modalUbigeo = $('#modalUbigeo');
    var $btnNuevo = $('#btnNuevo');
    var $btnExportar = $('#btnExportar');
    var $formReclamos = $('#formReclamos');
    var $tblReclamos = $('#tblReclamos');
    var $cmbVendedor = $('#cmbVendedor');
    var $cmbCliente = $('#cmbCliente');
    var $btnSeleccionar = $('#btnGuardarUbigeo');
    var $txtNumRec = $('#txtNumRec');
    var $txtNumSerie = $('#txtNumSerie');


    var $btnGuardarUbigeo = $('#btnGuardarUbigeo');
    var $txtUbicacion = $('#txtUbicacion');
    var $btnBuscar = $('#btnBuscar');
    var mensajes = {
        procesandoUbigeo: "Cargando Ubigeo, por favor espere....",
        buscandoRequerimientos: "Buscando requerimientos, por favor espere....."
    }

    $(Initializer);

    function Initializer() {
        logicUbigeo();
        ObtenerFiltrosGarantias();
        cargarAsesoresVenta();
        $btnSeleccionar.click(seleccionar);
        $openRegFecIni.click($openRegFecIni_click);
        $openRegFecFin.click($openRegFecFin_click);
        $btnGuardarUbigeo.click(seleccionar);
        $btnNuevo.click(NuevoReclamo);
        $btnBuscar.click(BuscarClick);
        $btnExportar.click(btnExportarClick);
        $dateFecRecIni.val(firstDayMonth());

        $dateFecRecIni.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFecRecFin.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: $dateFecRecIni.val()
        });

        $dateFecRecIni.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);

        $dateFecRecFin.val(hoy());
        BuscarClick();
    };

    function cargarAsesoresVenta() {
        var method = "POST";
        var url = "BandejaAsesorVenta/ObtenerAsesorVenta";
        var objGenerales = {
            CodigoCargo: "5", //Cargo: 5 = Asesor de ventas.
            Estado: "2"
        }
        var objParams = JSON.stringify(objGenerales);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };
            var contenedorAsesores = { Result: [] };

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].CodigoEmpleado,
                    Text: data.Result[i].NombresCompletosEmpleado
                }
                if (data.Result[i].Estado == true) {
                    var item2 = {
                        Id: data.Result[i].CodigoEmpleado,
                        Text: data.Result[i].NombresCompletosEmpleado
                    }
                    contenedorAsesores.Result.push(item2);
                }
                resultado.Result.push(item);
            };
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            //app.llenarCombo($cmbVendedor, resultado, null, 0, "-- Todos --", filters);
            //app.llenarComboMultiResult($cmbVendedor, resultado)
            app.llenarCombo($cmbVendedor, resultado, null, 0, "-- Todos --", filters);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, null);
    }

    function BuscarClick() {
        var codDepartamento = sessionStorage.getItem('codDepartamento');
        var codProvincia = sessionStorage.getItem('codProvincia');
        var codDistrito = sessionStorage.getItem('codDistrito');

        var method = "POST";
        var url = "BandejaGarantia/ObtenerReclamos";
        var objBuscar = {
            FecIni: $dateFecRecIni.val(),
            FecFin: $dateFecRecFin.val(),
            NumReclamo: $txtNumRec.val() == "" ? "0" : $txtNumRec.val(),
            Estado: $cmbEstado.val() == 0 ? "" : $cmbEstado.val(),
            CodUbigeoDest: codDepartamento + codProvincia.slice(2, 4) + codDistrito.slice(4, 6),
            Vendedor: "",
            RucEmpresa: $cmbCliente.val() == 0 ? "" : $cmbCliente.val(),
            CodEmpresa: "",
            TipoVenta: "0",
            NroProceso: "",
            Contrato: "",
            OrdenCompra: "",
            NumFianza: "",
            NumeroSerie: $txtNumSerie.val() == null ? "" : $txtNumSerie.val()
        };

        var objParam = JSON.stringify(objBuscar);

        var fnDoneCallBack = function (data) {
            cargarTablaReclamos(data);
        };

        var fnFailCallBack = function (data) {
            app.message.error("Validación", "No se encontraron resultados, por favor revisar.");
            cargarTablaReclamos();
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function NuevoReclamo() {
        app.redirectTo("BandejaGarantia/RegistroGarantia");
    };
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblReclamos.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Clientes", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "FecIni", value: $dateFecRecIni.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FecFin", value: $dateFecRecFin.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumReclamo", value: $txtNumRec.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "RucEmpresa", value: $cmbCliente.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodUbigeoDest", value: $txtUbicacion.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Vendedor", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbEstado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodEmpresa", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoVenta", value: "0" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NroProceso", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Contrato", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "OrdenCompra", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumFianza", value: "" }).appendTo("#hidden_fields");
        $formReclamos.attr('action', href);
        $formReclamos.submit();
    }
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

    function ObtenerFiltrosGarantias() {
        method = "POST";
        url = "BandejaGarantia/ObtenerFiltrosGarantias"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbCliente, data.Result.Clientes, null, 0, "--Todos--", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion", "Ocurrió un problema al cargar los filtros de la bandeja. ")
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null)
    }; //OKA
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
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoUbigeo)

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

    /**Funciones Click */









    /*Funciones para Fecha*/
    function $openRegFecIni_click() {
        $dateFecRecIni.focus();
    }

    function $openRegFecFin_click() {
        $dateFecRecFin.focus();
    }

    function changeDateFechaInicialRegFecIni() {
        $dateFecRecFin.val('');
        $dateFecRecFin.datepicker('destroy');
        $dateFecRecFin.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: $dateFecRecIni.datepicker('getDate')
        });
    }
    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
    }
    function firstDayMonth() {
        var date = new Date();
        var primerDia = "01"
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        const primerDiaDelMes = new Date(year, mes + 1, 1);
        return `${primerDia}/${mes}/${year}`;

    }
    /*Fin Funciones para Fecha*/


    function editar(numRec, codEstado, idWorkFlow) {
        var method = "POST";
        var url = "BandejaGarantia/SetVariablesGenerales";
        var objEditar = {
            Id_Reclamo: numRec,
            CodEstado: codEstado,
            TipoProceso: "U",
            Id_Workflow: idWorkFlow
        };

        var objParam = JSON.stringify(objEditar);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaGarantia/RegistroGarantia");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function ver(numRec, codEstado, idWorkFlow) {
        var method = "POST";
        var url = "BandejaGarantia/SetVariablesGenerales";
        var objVer = {
            Id_Reclamo: numRec,
            CodEstado: codEstado,
            Id_Workflow: idWorkFlow,
            TipoProceso: "V"
        };

        var objParam = JSON.stringify(objVer);
        var fnDoneCallBack = function () {
            app.redirectTo("BandejaGarantia/RegistroGarantia");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function cargarTablaReclamos(data) {
        var columns = [
            {
                data: "Id_Reclamo",
                render: function (data, type, row) {
                    var numReqFormateado = ("000000" + data.toString());
                    numReqFormateado = numReqFormateado.substring((numReqFormateado.length) - 6, numReqFormateado.length);

                    return '<center>' + numReqFormateado + '</center>'
                }
            },
            {
                data: "RazonSocial",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "FechaReclamo",
                render: function (data, type, row) {
                    return '<center>' + app.obtenerFecha(data) + '</center>'
                }
            },
            {
                data: "Urgencia",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "FechaProgramacion",
                render: function (data, type, row) {
                    return '<center>' + app.obtenerFecha(data) + '</center>'
                }
            },
            {
                data: "Estado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Id_Reclamo",
                render: function (data, type, row) {
                    var d = "'" + row.Id_Reclamo + "','" + row.CodEstado + "','" + row.Id_Workflow + "'";
                    if (row.CodEstado == "REG") {
                        var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: bandejaGarantia.ver(' + d + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                        var accion = '<a id="btnEditar" class="btn btn-default btn-xs" title="Editar" href="javascript: bandejaGarantia.editar(' + d + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a>';
                        return '<center>' + accion + ' ' + ver + '</center>'
                    }
                    else if (row.CodEstado == "FIN") {
                        var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: bandejaGarantia.ver(' + d + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                        return '<center>' + ver + '</center>'
                    };
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];


        var rowCallback = function (row, data, index) {
            $(row).attr('id', 'row' + index);
        };

        app.llenarTabla($tblReclamos, data, columns, columnDefs, "#tblReclamos", rowCallback);
    };

    return {
        editar: editar,
        ver: ver
    }

})(window.jQuery, window, document);