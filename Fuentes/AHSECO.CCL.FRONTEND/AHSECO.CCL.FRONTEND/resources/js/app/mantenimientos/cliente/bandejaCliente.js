var bandejaCliente = (function ($, win, doc) {
    var $formMantCliente = $("#formMantCliente");
    var $tblClientes = $("#tblClientes");

    /************************** */
    var $txtSector = $('#txtSector');
    var $txtRuc = $("#txtRuc");/** */
    var $dateFecIni = $("#dateFecIni");/** */
    var $dateFecFin = $("#dateFecFin");/** */
    var $cmbCategoria = $("#cmbCategoria");/** */
    var $cmbEstado = $('#cmbEstado');
    var $txtUbicacion = $("#txtUbicacion");
    var $btnSeleccionar = $('#btnGuardarUbigeo')
    var $cmbDepartamento = $("#cmbDepartamento");
    var $cmbProvincia = $("#cmbProvincia");
    var $cmbDistrito = $("#cmbDistrito");
    var $modalUbigeo = $("#modalUbigeo");
    var $searchUbigeo = $("#searchUbigeo");
    var $txtNomEmpresa = $("#txtNomEmpresa");
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    /*************************Botones tabla* */
    var $btnBuscar = $("#btnBuscar");
    var $btnNuevo = $("#btnNuevo");
    var $btnExportar = $("#btnExportar");
    var $btnHistorico = $('#btnHistorico');
    var $cmbAsesor = $('#cmbAsesor');
    
    var mensajes = {
        obteniendoClientes: "Obteniendo Clientes, por favor espere...",
        consultandoCategorias: "Obteniendo Categorias, por favor espere...",
        procesandoClientes: "Procesando Clientes, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del usuario, por favor espere...",
        obteniendoHistoricos: "Obteniendo datos del historico, por favor espere...",
        guardarUsuario: "Los datos del usuario se guardaron satisfactoriamente."
    };
    $(Initialize);

    
    function Initialize() {
        $openRegFecIni.click($openRegFecIni_click);
        $openRegFecFin.click($openRegFecFin_click);
        logicUbigeo();
        cargarCategorias();
        cargarAsesoresVenta();

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

        cargarTablaClientes();
        $btnSeleccionar.click(seleccionar);
        $btnNuevo.click(btnNuevoClick);
        $btnBuscar.click(btnBuscarClick);
        $btnExportar.click(btnExportarClick);
        //$btnHistorico.click(btnHistoricoClick);
    }

    /**Cargar combos*/
    function cargarCategorias() {

        var method = "POST";
        var url = "BandejaParametros/ObtenerDetalles";
        var objGenerales = {
            DatosGenerales: {
                Dominio: "CLASICLIE"
            }
        }
        var objParams = JSON.stringify(objGenerales);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].Parametro,
                    Text: data.Result[i].Descripcion
                }
                resultado.Result.push(item);
            };

            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbCategoria, resultado, null, 0, "--Todos--", filters);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.consultandoCategorias);
    }
    function cargarAsesoresVenta() {
        var method = "POST";
        var url = "BandejaAsesorVenta/ObtenerAsesorVenta";
        var objGenerales = {
            CodigoCargo: "5", //Cargo: 5 = Asesor de ventas.
            Estado: "1"
        }
        var objParams = JSON.stringify(objGenerales);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].CodigoEmpleado,
                    Text: data.Result[i].NombresCompletosEmpleado
                }
                resultado.Result.push(item);
            };

            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbAsesor, resultado, null, "todos", "-- Todos --", filters);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.llenarEmpleados);
    }

    /**Fin Cargar combos*/

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

    /**Botones Click****/
    function btnNuevoClick() {
        app.redirectTo("BandejaCliente/RegistrarCliente");
    }
    function btnBuscarClick(){
        var method = "POST";
        var url = "BandejaCliente/ObtenerClientes";

        var codDepartamento = sessionStorage.getItem('codDepartamento');
        var codProvincia = sessionStorage.getItem('codProvincia');
        var codDistrito = sessionStorage.getItem('codDistrito');

        var estado = "";

        if ($dateFecFin.val() === "") {
            if ($dateFecIni.val() !== "") {
                app.message.error("Validación", "Debe de ingresar el rango de fechas correctamente.");
                return
            }
        };

        if ($dateFecIni.val() === "") {
            if ($dateFecFin.val() !== "") {
                app.message.error("Validación", "Debe de ingresar el rango de fechas correctamente.");
                return
            }
        };


        if (isNaN($txtRuc.val())) {
            app.message.error("Validación", "El RUC debe ser un número de 11 dígitos");
            return
        }
        

        if ($cmbEstado.val() === "1") {
            estado = true;
        }
        else if ($cmbEstado.val() === "0") {
            estado = false;
        }
        else {
            estado = null;
        }

        var cliObj = {
            RUC:$txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val(),
            Id_Empleado: $cmbAsesor.val() == "todos" ? null : $cmbAsesor.val(),
            Estado: estado,
            FechaInicio: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()),
            FechaFinal: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()),
            Categoria: $cmbCategoria.val() == 0 || $cmbCategoria.val() == null ? "" : $cmbCategoria.val(),
            CodUbigeo: codDepartamento + codProvincia.slice(2, 4) + codDistrito.slice(4, 6),
            SectorCliente: $txtSector.val()
        }
        var objParam = JSON.stringify(cliObj);

        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }

        var fnFailCallback = function (data) {
            cargarTabla()
        }
        
        app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoUbigeo);
    }
    function btnExportarClick(e) {
            var self = jQuery(this);
            var href = self.attr('href');
            e.preventDefault();
            var cant = $tblClientes.DataTable().rows().data().length;
        
            if (cant === 0) {
                app.message.error("Reporte de Clientes", "La búsqueda no produjo resultados", "Aceptar");
                return false;
            }
            $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "RUC", value: $txtRuc.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NomEmpresa", value: $txtNomEmpresa.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodUbigeo", value: $txtUbicacion.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Categoria", value: $cmbCategoria.val() == 0 || $cmbCategoria.val() == null ? "" : $cmbCategoria.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaInicio", value: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaFinal", value: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()) }).appendTo("#hidden_fields");

        $formMantCliente.attr('action', href);
        $formMantCliente.submit();
    }

    /**Fin Botones Click****/
    function seleccionar() {

        var codDistrito = sessionStorage.getItem('codDistrito');
        var codDepartamento = sessionStorage.getItem('codDepartamento');
        var codProvincia = sessionStorage.getItem('codProvincia');
        var nomDepartamento = sessionStorage.getItem('nomDepartamento')
        var nomProvincia = sessionStorage.getItem('nombreProvincia');
        var nomDistrito = sessionStorage.getItem('nombreDistrito');

        
        if ($cmbDepartamento.val() === "" || $cmbDepartamento.val() === null || $cmbDepartamento.val() === undefined || $cmbDepartamento.val() ==="00") {
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
    function editar(idCliente) {
        var consulta = 2;
        var estado = true;

        sessionStorage.setItem("idCliente", `${idCliente}`);
        sessionStorage.setItem("estado", `${estado}`);
        sessionStorage.setItem("consulta", `${consulta}`);
        app.redirectTo("BandejaCliente/EditarCliente");
    }

    function ver(idCliente) {
        var consulta = 3;
        var estado = true;

        sessionStorage.setItem("idCliente", `${idCliente}`);
        sessionStorage.setItem("estado", `${estado}`);
        sessionStorage.setItem("consulta", `${consulta}`);
        app.redirectTo("BandejaCliente/ConsultaCliente");
    }
    function cargarTablaClientes() {
        var method = "POST";
        var url = "BandejaCliente/ObtenerClientes";
        var cliObj = {
            CodUbigeo: "",
            FechaInicio : app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()),
            FechaFinal : app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val())
        }
        var objParam = JSON.stringify(cliObj)
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function () {
            cargarTabla();
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoClientes)
    }
    function cargarTabla(data) {
        var columns = [
            { data: "ID" },
            { data: "RUC" },
            { data: "NomEmpresa" },
            { data: "SectorCliente"},
            { data: "Categoria" },
            { data: "Direccion" },
            { data: "Telefono" },
            { data: "Correo"},
            { data: "NumContacto"},
            { data: "UbigeoDepartamento.Descripcion" },
            { data: "UbigeoProvincia.Descripcion" },
            { data: "UbigeoDistrito.Descripcion" },
            {
                data: "Estado",
                render: function (data, type, row) {
                    if (data === true) {
                        return "Activo";
                    } else if (data === false) {
                        return "Inactivo";
                    } else {
                        return "No Definido";
                    }
                }
            },
            {
                data: "Empleado.NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (data != "") {
                        return '<center>' + data + '</center>';
                    }
                    else {
                        return '<center>' + "Sin asignar" + '</center>';
                    }
                }
            },
            {
                data: "FechaRegistro",
                render: function (data,tyoe,row) {
                    return '<center>' + app.obtenerFecha(data) + '</center>';
                }
            },
            {
                data: "ID",
                render: function (data, type, row) {
                    var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: bandejaCliente.ver(' + data + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    var editar = '<a id="btnEditar" class="btn btn-default btn-xs" title="Editar" href="javascript: bandejaCliente.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    var historico = '<a style="margin-top:3px" id="btnHistorico" type="button" class="btn btn-warning btn-xs" title="Histórico" href="BandejaCliente/GenerarHistoricoCliente?Id_Ant='+ data +'"><i class="fa fa-book" aria-hidden="true"></i></a>';
                    return '<center>' + ver + ' ' + editar + ' ' + historico + '</center>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];

        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 10;
        app.llenarTabla($tblClientes, data, columns, columnDefs, "#tblClientes", null, null, filters);
    }

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

    function formatearFecha(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }

    return {
        editar: editar,
        ver: ver,
    };
})(window.jQuery, window, document);
