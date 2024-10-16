var manipularTecnico = (function ($, win, doc) {
    var $txtNombreTecnico = $("#txtNombreTecnico");
    var $txtApePat = $("#txtApePat");
    var $txtApeMat = $("#txtApeMat");
    var $txtUbigeo = $("#txtUbigeo");
    var $txtTelefono = $("#txtTelefono");
    var $txtCorreo = $("#txtCorreo");
    var $cmbEstReg = $("#cmbEstReg");
    var $txtCentroLabores = $("#txtCentroLabores");
    var $btnSeleccionar = $('#btnGuardarUbigeo');
    var $cmbDepartamento = $("#cmbDepartamento");
    var $cmbProvincia = $("#cmbProvincia");
    var $cmbDistrito = $("#cmbDistrito");
    var $modalUbigeo = $("#modalUbigeo");
    var $searchUbigeo = $("#searchUbigeo");
    /*****Buttons */
    var $btnRegistrar = $("#btnRegistrar");
    var $btnCancelar = $("#btnCancelar");
    var $txtTitleTecnico = $("#txtTitleTecnico");
    var $deleteUbigeo = $("#deleteUbigeo");
    var $txtCodigoUbigeo = $("#txtCodigoUbigeo");
    /**Forms */
    var $formTecnico = $("#formTecnico");


    var mensajes = {
        obteniendoTécnicos: "Obteniendo Técnicos, por favor espere...",
        obteniendoEstados: "Obteniendo Estados, por favor espere...",
        consultandoTécnicos: "Obteniendo Técnicos, por favor espere...",
        procesandoTécnicos: "Procesando Técnicos, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del Técnicos, por favor espere...",
        guardarUbigeo: "Guardando datos del ubigeo , por favor espere...",
        guardarUsuario: "Los datos del usuario se guardaron satisfactoriamente.",
        listandoEstados: "Los daots se están listando...",
    };
    $(Initialize)
    function Initialize() {
        logicUbigeo();

        $btnRegistrar.click(btnRegistrarClick);
        $btnCancelar.click(btnCancelarClick);
        $btnSeleccionar.click(seleccionar);
        $deleteUbigeo.click(btnDeleteUbigeo);

        if (sessionStorage.getItem('tipoRegTecnico') == "N") {
            //Nuevo:
            $txtNombreTecnico.prop("disabled", false);
            $txtApePat.prop("disabled", false);
            $txtApeMat.prop("disabled", false);
            $searchUbigeo.prop("disabled", false);
            $txtTelefono.prop("disabled", false);
            $txtCorreo.prop("disabled", false);
            $cmbEstReg.prop("disabled", true);
            $btnRegistrar.prop("disabled", false);

        }
        else if (sessionStorage.getItem('tipoRegTecnico') == "U") {
            /**Update */
            $txtNombreTecnico.prop("disabled", false);
            $txtApePat.prop("disabled", false);
            $txtApeMat.prop("disabled", false);
            $searchUbigeo.prop("disabled", false);
            $txtTelefono.prop("disabled", false);
            $txtCorreo.prop("disabled", false);
            $cmbEstReg.prop("disabled", false);
            $btnRegistrar.prop("disabled", false);
            $btnRegistrar.html('<i class="fa fa-pencil-square-o"></i> Editar Técnicos');
            var idTecnico = sessionStorage.getItem('idTecnico');
            var tituloTecnico = sessionStorage.getItem('tituloEditar');
            $txtCodigoUbigeo.val(sessionStorage.getItem("codDistrito"));
            $txtTitleTecnico.html(tituloTecnico);
            VerTecnicos();
           

        }
        else {
            /*Ver*/
            var idTecnico = sessionStorage.getItem('idTecnico');

            $txtNombreTecnico.prop("disabled", true);
            $txtApePat.prop("disabled", true);
            $txtApeMat.prop("disabled", true);
            $searchUbigeo.prop("disabled", true);
            $txtTelefono.prop("disabled", true);
            $txtCorreo.prop("disabled", true);
            $cmbEstReg.prop("disabled", true);
            $deleteUbigeo.hide();
            $btnRegistrar.hide();
            var tituloVerTecnico = sessionStorage.getItem('tituloVer');
            $txtTitleTecnico.html(tituloVerTecnico);
            $txtCodigoUbigeo.val(sessionStorage.getItem("codDistrito"));
            $btnCancelar.html('<i class="fa fa-arrow-left" aria-hidden="true"></i> Volver a la Bandeja')
            VerTecnicos();
        }
    }
    function seleccionar() {
        if ($cmbDepartamento.val().trim() === "" || $cmbDepartamento.val().trim() === null || $cmbDepartamento.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un departamento");
            return;
        }

        if ($cmbProvincia.val().trim() === "" || $cmbProvincia.val().trim() === null || $cmbProvincia.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar una provincia");
            return;
        }

        if ($cmbDistrito.val().trim() === "" || $cmbDistrito.val().trim() === null || $cmbDistrito.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un distrito");
            return;
        }

        var codDistrito = sessionStorage.getItem('codDistrito')
        $txtCodigoUbigeo.val(codDistrito);

        var nomDepartamento = sessionStorage.getItem('nomDepartamento');
        var nomProvincia = sessionStorage.getItem('nomProvincia');
        var nomDistrito = sessionStorage.getItem('nombreDistrito');

        $txtCentroLabores.val(`${nomDepartamento} / ${nomProvincia} / ${nomDistrito}`);
        $modalUbigeo.modal('hide');
    }

    function btnDeleteUbigeo() {
        $cmbDepartamento.val("").trigger('change.select2');
        $cmbProvincia.val("").trigger('change.select2');
        $cmbDistrito.val("").trigger('change.select2');
        $txtCentroLabores.val("");

    }
    function VerTecnicos() {
        var method = "POST";
        var url = "BandejaTecnico/ObtenerTecnico";
        var objFiltro = {
            CodigoEmpleado: sessionStorage.getItem('idTecnico'),
            Estado: 2
        };

        var objParam = JSON.stringify(objFiltro);

        var fnDoneCallback = function (data) {
            var estados = { Result: [{ Id: data.Result[0].Estado, Text: data.Result[0].NombreEstado }, { Id: data.Result[0].Estado === 0 ? 1 : 0, Text: data.Result[0].NombreEstado === 'Inactivo' ? 'Activo' : 'Inactivo' }] }
            app.llenarCombo($cmbEstReg, estados, $formTecnico, "--Todos--", null, null);
            var nombreDistrito = data.Result[0].LugarLaboral.NombreDistrito;
            var nombreDepartamento = data.Result[0].LugarLaboral.NombreDepartamento;
            var nombreProvincia = data.Result[0].LugarLaboral.NombreProvincia;
            $txtNombreTecnico.val(data.Result[0].NombresEmpleado);
            $txtApePat.val(data.Result[0].ApellidoPaternoEmpleado);
            $txtApeMat.val(data.Result[0].ApellidoMaternoEmpleado);
            $txtCentroLabores.val(`${nombreDepartamento === "" ? "" : nombreDepartamento}  ${nombreProvincia === "" ? "" : "/ ".concat(nombreProvincia)}  ${nombreDistrito === "" ? "" : "/ ".concat(nombreDistrito)}`);
            $txtCodigoUbigeo.val(data.Result[0].LugarLaboral.UbigeoId);
            $txtTelefono.val(data.Result[0].TelefonoEmpleado);
            $txtCorreo.val(data.Result[0].EmailEmpleado);
            $cmbEstReg.val(data.Result[0].Estado).trigger("change.select2");
            
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoTécnicos);
    }
 
    function logicUbigeo() {
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
                if (!codDepartamento === null || !codDepartamento === '') {
                    $(this).prop('disabled', false);

                } else {
                    $cmbProvincia.prop('disabled', false);
                    obtenerProvincia(codDepartamento, data);
                    $cmbDistrito.prop("disabled", true);
                }
                $cmbDistrito.val("").trigger("change");

                const nomDepartamento = $('select[id="cmbDepartamento"] option:selected').text();
                sessionStorage.setItem('codDepartamento', `${$(this).val()}`);
                sessionStorage.setItem('nomDepartamento', `${nomDepartamento}`)
            });
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbDepartamento, resultado, $modalUbigeo, "", "<--Seleccione-->", filters);
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
            if (!codProvincia === null || !codProvincia === '') {
                $(this).prop('disabled', false);

            } else {
                $cmbProvincia.prop('disabled', false);
                $cmbDistrito.prop('disabled', false)
                obtenerDistrito(codProvincia, data);
            }
            const nomProvincia = $('select[id="cmbProvincia"] option:selected').text();
            sessionStorage.setItem('codProvincia', `${$(this).val()}`);
            sessionStorage.setItem('nomProvincia', `${nomProvincia}`);
        });

        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbProvincia, provincias, $modalUbigeo, "", "<--Seleccione-->", filters)
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
        filters.allowClear = false;
        app.llenarCombo($cmbDistrito, distritos, $modalUbigeo, "", "<--Seleccione-->", filters)
    }
    function redirect() {
        app.redirectTo("BandejaTecnico")
        sessionStorage.clear();
    }
    function btnCancelarClick() {
        var proceso = sessionStorage.getItem("tipoRegTecnico");
        if (proceso == "N") {
            app.message.confirm("Cancelar Técnicos", "¿Estás seguro que deseas cancelar?, Todos los datos borarran", "Aceptar", "Cancelar", redirect);
        } else if (proceso == "U") {
            app.message.confirm("Cancelar Técnicos", "¿Estás seguro que deseas cancelar?, Todos los datos borarran", "Aceptar", "Cancelar", redirect);
            sessionStorage.clear();
        } else {
            app.redirectTo("BandejaTecnico")
        }
     
    }

    function btnRegistrarClick(e) {
        e.preventDefault();
        var tipo = "";
        var codigo = 0;
        if (sessionStorage.getItem('tipoRegTecnico') == "N") {
            tipo = "1";
        }
        else {
            tipo = "2";
            codigo = sessionStorage.getItem('idTecnico');
        }

        var method = "POST";
        var url = "BandejaTecnico/InsertarTecnico";
        if (sessionStorage.getItem("tipoRegTecnico") == "N") {
            var objTecnico = {
                CodigoEmpleado: codigo,
                NombreEmpleado: $txtNombreTecnico.val().trim(),
                ApellidoPaternoEmpleado: $txtApePat.val().trim(),
                ApellidoMaternoEmpleado: $txtApeMat.val().trim(),
                LugarLaboral: {
                    UbigeoId: $txtCodigoUbigeo.val(),
                },
                CodigoCargo:8,//CODIGO DE TECNICO
                Estado: $cmbEstReg.val(),
                Telefono: $txtTelefono.val().trim(),
                Email: $txtCorreo.val().trim(),
                TipoMantenimiento: tipo
            }
        } else if (sessionStorage.getItem("tipoRegTecnico") == "U") {
            var objTecnico = {
                CodigoEmpleado: codigo,
                NombreEmpleado: $txtNombreTecnico.val().trim(),
                ApellidoPaternoEmpleado: $txtApePat.val().trim(),
                ApellidoMaternoEmpleado: $txtApeMat.val().trim(),
                LugarLaboral: {
                    UbigeoId: $txtCodigoUbigeo.val(),
                } ,
                CodigoCargo: 8,//CODIGO DE TECNICO
                Estado: $cmbEstReg.val(),
                Telefono: $txtTelefono.val().trim(),
                Email: $txtCorreo.val().trim(),
                TipoMantenimiento: tipo
            }
        }
        

        var objParam = JSON.stringify(objTecnico);
        function redirect() {
            app.redirectTo("BandejaTecnico");
        }

        function fnAceptarCallback() {
            if (tipo == "1") {
                app.message.success("Técnicos", "Registro Exitoso", "Aceptar", redirect);
            } else if (tipo == "2") {
                app.message.success("Técnicos", "Actualización Exitosa", "Aceptar", redirect);
            }
        }
        var fnDoneCallback = function (data) {
            if (tipo == "1") {
                app.message.confirm("Técnicos", "¿Estás seguro que deseas guardar los cambios?", "Sí", "No", fnAceptarCallback, null);
            } else if (tipo == "2") {
                app.message.confirm("Técnicos", "¿Estás seguro que deseas guardar los cambios?", "Sí", "No", fnAceptarCallback, null);
            }
        }
        var fnFailCallback = function (data) {
            app.message.error("Error en la Inserción", "Los campos deben rellenarse");
        }

        if ($txtNombreTecnico.val().trim() === "" || $txtNombreTecnico.val().trim() === null || $txtNombreTecnico.val().trim() === undefined) {
            app.message.error("Validacion", "El campo 'Nombre' debe Registrarse.");
            return;
        }
        if ($txtApePat.val().trim() === "" || $txtApePat.val() === null || $txtApePat.val().trim() === undefined) {
            app.message.error("Validacion", "El campo 'Apellido Paterno' debe Registrarse.");
            return;
        }
        if ($txtApeMat.val().trim() === "" || $txtApeMat.val().trim() === null || $txtApeMat.val().trim() === undefined) {
            app.message.error("Validacion", "El campo 'Apellido Materno' debe Registrarse.");
            return;
        }
        if ($txtCentroLabores.val().trim() === "" || $txtCentroLabores.val().trim() === null || $txtCentroLabores.val().trim() === undefined) {
            app.message.error("Validacion", "El campo 'Centro de Labores' debe Registrarse.");
            return;
        }
        if (isNaN($txtTelefono.val().trim()) ) {
            app.message.error("Validación", "El número de teléfono no puede contener letras.");
            return
        };
        if ($cmbEstReg.val().trim() === null || $cmbEstReg.val().trim() === undefined || $cmbEstReg.val().trim() === "") {
            app.message.error("Validacion", "El campo 'Estado' debe Registrarse.");
            return;
        }
        if ($txtCorreo.val().trim() === "" || $txtCorreo.val().trim() === undefined) {
            app.message.error("Validacion", "El campo 'Correo' debe Registrarse.");
            return;
        }
        if (!app.validarEmail($txtCorreo.val().trim())) {
            app.message.error("Validación", "El campo 'Correo' debe tener el formato de correo.");
            return;
        }
        app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoTécnicos);
    }
   
    
})(window.jQuery, window, document);