var bandejaInstalacionTecnica = (function ($, win, doc) {

    var $cmbempresa = $('#cmbempresa');
    var $cmbEstado = $('#cmbEstado');
    var $cmbProvincia = $('#cmbProvincia');
    var $cmbDistrito = $('#cmbDistrito');
    var $cmbDepartamento = $('#cmbDepartamento');
    var $dateFecIni = $('#dateFecRecIni');
    var $dateFecFin = $('#dateFecRecFin');
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    var $modalUbigeo = $('#modalUbigeo');
    var $btnNuevo = $('#btnNuevo');
    var $btnExportar = $('#btnExportar');
    var formInstallTec = $('#formInstallTec');
    var $tblInstallTec = $('#tblInstallTec');
    var $cmbVendedor = $('#cmbVendedor');
    var $cmbCliente = $('#cmbCliente');
    var $cmbTipVenta = $('#cmbTipVenta');
    var $btnSeleccionar = $('#btnGuardarUbigeo');
    var $txtNumReq = $('#txtNumReq');
    var $txtNumProc = $('#txtNumProc');
    var $txtNumContrato = $('#txtNumContrato');
    var $txtNumOrdCompra = $('#txtNumOrdCompra');
    var $txtNumFianza = $('#txtNumFianza');
    var $formInstallTec = $('#formInstallTec');
    
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
        $dateFecIni.val(firstDayMonth());

        $dateFecIni.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFecFin.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: $dateFecIni.val()
        });

        $dateFecIni.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);

        $dateFecFin.val(hoy());
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
        var method = "POST";
        var url = "BandejaGarantia/ObtenerReclamos";
        var objBuscar = {
            FecIni: $dateFecIni.val(),
            FecFin: $dateFecFin.val(),
            NumReq: $txtNumReq.val() == "" ? "0" : $txtNumReq.val(),
            Estado: $cmbEstado.val() == 0 ? "" : $cmbEstado.val(),
            Destino: $txtUbicacion.val(),
            Vendedor: $cmbVendedor.val() == 0 ? "" : $cmbVendedor.val(),
            RucEmpresa: $cmbCliente.val() == 0 ? "" : $cmbCliente.val(),
            CodEmpresa: $cmbempresa.val() == 0 ? "" : $cmbempresa.val(),
            Id_Flujo: $cmbTipVenta.val() == 0 ? "0" : $cmbTipVenta.val(),
            NumProceso: $txtNumProc.val(),
            Contrato: $txtNumContrato.val(),
            OrdenCompra: $txtNumOrdCompra.val(),
            NumFianza: $txtNumFianza.val(),
        };

        var objParam = JSON.stringify(objBuscar);

        var fnDoneCallBack = function (data) {
            cargarTablaInstalacion(data);
        };

        var fnFailCallBack = function (data) {
            app.message.error("Validación", "No se encontraron resultados, por favor revisar.");
            cargarTablaInstalacion();
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.buscandoRequerimientos);
    };

    function NuevoReclamo() {
        app.redirectTo("BandejaGarantia/RegistroGarantia");
    };
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblInstallTec.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Clientes", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "FecIni", value: $dateFecIni.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FecFin", value: $dateFecFin.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumReq", value: $txtNumReq.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbEstado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Destino", value: $txtUbicacion.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Vendedor", value: $cmbVendedor.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "RucEmpresa", value: $cmbCliente.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodEmpresa", value: $cmbempresa.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Id_Flujo", value: $cmbTipVenta.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumProceso", value: $txtNumProc.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Contrato", value: $txtNumContrato.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "OrdenCompra", value: $txtNumOrdCompra.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumFianza", value: $txtNumFianza.val() }).appendTo("#hidden_fields");
        $formInstallTec.attr('action', href);
        $formInstallTec.submit();
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

            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbCliente, data.Result.Clientes, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbTipVenta, data.Result.TipVenta, null, 0, "--Todos--", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion","Ocurrió un problema al cargar los filtros de la bandeja. ")
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
        $dateFecIni.focus();
    }

    function $openRegFecFin_click() {
        $dateFecFin.focus();
    }

    function changeDateFechaInicialRegFecIni() {
        $dateFecFin.val('');
        $dateFecFin.datepicker('destroy');
        $dateFecFin.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: $dateFecIni.datepicker('getDate')
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


    function editar(numReq, codEstado, idWorkFlow) {
        var method = "POST";
        var url = "BandejaGarantia/SetVariablesGenerales";
        var objEditar = {
            NumReq: numReq,
            CodEstado: codEstado,
            TipoProceso: "U",
            Id_WorkFlow: idWorkFlow
        };

        var objParam = JSON.stringify(objEditar);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaInstalacionTecnica/RegistroInstallTec");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function ver(numReq, codEstado, idWorkFlow) {
        var method = "POST";
        var url = "BandejaInstalacionTecnica/SetVariablesGenerales";
        var objVer = {
            NumReq: numReq,
            CodEstado: codEstado,
            Id_WorkFlow: idWorkFlow,
            TipoProceso: "V"
        };

        var objParam = JSON.stringify(objVer);
        var fnDoneCallBack = function () {
            app.redirectTo("BandejaInstalacionTecnica/RegistroInstallTec");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function cargarTablaInstalacion(data) {
        var columns = [
            {
                data: "NumReq",
                render: function (data, type, row) {
                    var numReqFormateado = ("000000" + data.toString());
                    numReqFormateado = numReqFormateado.substring((numReqFormateado.length) - 6, numReqFormateado.length);

                    return '<center>' + numReqFormateado + '</center>'
                }
            },
            {
                data: "Id_Solicitud",
                render: function (data, type, row) {
                    var numSolFormateado = ("000000" + data.toString());
                    numSolFormateado = numSolFormateado.substring((numSolFormateado.length) - 6, numSolFormateado.length);
                    return '<center>' + numSolFormateado + '</center>'
                }
            },
            {
                data: "RucEmpresa",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "NomEmpresa",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Ubicacion",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "TipoVenta",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Vendedor",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "CodEmpresa",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "FechaMax",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Destino",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Estado",
                render : function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "NumReq",
                render : function (data, type, row) {
                    var d = "'" + row.NumReq + "','" + row.CodEstado + "','" + row.Id_WorkFlow +"'"; 
                    var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: bandejaInstalacionTecnica.ver(' + d + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    if (row.CodEstado == "STREG") {
                        var accion = '<a id="btnEditar" class="btn btn-default btn-xs" title="Asignar Técnicos" href="javascript: bandejaInstalacionTecnica.editar(' + d + ')"><i class="fa fa-handshake-o" aria-hidden="true"></i></a>';
                    }
                    else if (row.CodEstado == "STEPI") {
                        var accion = '<a id="btnEditar" class="btn btn-primary btn-xs" title="Cerrar Requerimiento" href="javascript: bandejaInstalacionTecnica.editar(' + d + ')"><i class="fa fa-check" aria-hidden="true"></i></a>';
                    }
                    else if (row.CodEstado == "STINS") {
                        var accion = '';
                    };
                    return '<center>' + accion + ' ' + ver +'</center>'
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

        app.llenarTabla($tblInstallTec, data, columns, columnDefs, "#tblInstallTec", rowCallback);
    };

    return {
        editar: editar,
        ver: ver
    }

})(window.jQuery, window, document);