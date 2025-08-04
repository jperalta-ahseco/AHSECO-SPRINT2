var manipularAsesorVenta = (function ($, win, doc) {
    var $txtNombreAsesorVenta = $("#txtNombreAsesorVenta");
    var $txtApePat = $("#txtApePat");
    var $txtApeMat = $("#txtApeMat");

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
    var $btnGuardar = $("#btnGuardar");
    var $btnExportar = $("#btnExportar");
    var $btnRegistrar = $("#btnRegistrar");
    var $btnCancelar = $("#btnCancelar");
    var $txtTitleAsesorVenta = $("#txtTitleAsesorVenta");
    var $deleteUbigeo = $("#deleteUbigeo");
    var $txtCodigoUbigeo = $("#txtCodigoUbigeo");
    /**Forms */
    var $formRegisterAsesor = $("#formRegisterAsesor");


    var mensajes = {
        obteniendoAsesorVenta: "Obteniendo Asesor Venta, por favor espere...",
        obteniendoEstados: "Obteniendo Estados, por favor espere...",
        consultandoAsesorVenta: "Obteniendo Asesor Venta, por favor espere...",
        procesandoAsesorVenta: "Procesando Asesor Venta, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del Asesor de Ventas, por favor espere...",
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

        if (sessionStorage.getItem('tipoRegAsesor') == "N") {
            //Nuevo:
            var estados = { Result: [{ Id: '1', Text: 'Activo' }] }
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbEstReg, estados, null, null, null, filters);
            $txtApePat.prop("disabled", false);
            $txtApeMat.prop("disabled", false);
            $searchUbigeo.prop("disabled", false);
            $txtTelefono.prop("disabled", false);
            $txtCorreo.prop("disabled", false);
            $cmbEstReg.prop("disabled", true);
            $btnRegistrar.prop("disabled", false);
        }
        else if (sessionStorage.getItem('tipoRegAsesor') == "U") {
            /**Update */
            $txtNombreAsesorVenta.prop("disabled", false);
            $txtApePat.prop("disabled", false);
            $txtApeMat.prop("disabled", false);
            $searchUbigeo.prop("disabled", false);
            $txtTelefono.prop("disabled", false);
            $txtCorreo.prop("disabled", false);
            $cmbEstReg.prop("disabled", false);
            $btnRegistrar.prop("disabled", false); 
            $btnRegistrar.html('<i class="fa fa-pencil-square-o"></i> Editar Asesor de Ventas');
            $txtCodigoUbigeo.val(sessionStorage.getItem('ubigeoId'));
            var idAsesor = sessionStorage.getItem('idAsesor');
            var tituloAsesorVenta = sessionStorage.getItem('tituloEditar');
            $txtTitleAsesorVenta.html(tituloAsesorVenta);
            
            VerAsesorVenta();
        }
        else {
            /*Ver*/
            var idAsesor = sessionStorage.getItem('idAsesor');
            $txtNombreAsesorVenta.prop("disabled", true);
            $txtApePat.prop("disabled", true);
            $txtApeMat.prop("disabled", true);
            $searchUbigeo.prop("disabled", true);
            $txtTelefono.prop("disabled", true);
            $txtCorreo.prop("disabled", true);
            $cmbEstReg.prop("disabled", true);
            $btnRegistrar.hide();
            $deleteUbigeo.hide();
            $txtCodigoUbigeo.val(sessionStorage.getItem('ubigeoId'));
            var tituloVerAsesor = sessionStorage.getItem('tituloVer');
            $txtTitleAsesorVenta.html(tituloVerAsesor)
            $btnCancelar.html('<i class="fa fa-arrow-left" aria-hidden="true"></i> Volver a la Bandeja')
            VerAsesorVenta();

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
        $cmbDepartamento.val("").trigger("change.select2");
        $cmbProvincia.val("").trigger("change.select2");
        $cmbDistrito.val("").trigger("change.select2");
        $txtCentroLabores.val("");

    }
        function VerAsesorVenta() {
        var method = "POST";
        var url = "BandejaAsesorVenta/ObtenerAsesorVenta";
        var objFiltro = {
            CodigoEmpleado: sessionStorage.getItem('idAsesor'),
            Estado: 2
        };
        var objParam = JSON.stringify(objFiltro);
            var fnDoneCallback = function (data) {
               
            var estados = { Result: [{ Id: data.Result[0].Estado, Text: data.Result[0].NombreEstado }, { Id: data.Result[0].Estado === 0 ? 1 : 0, Text: data.Result[0].NombreEstado === 'Inactivo' ? 'Activo' : 'Inactivo' }] }
            app.llenarCombo($cmbEstReg, estados, $formRegisterAsesor, "--Todos--", null, null);
            var nombreDistrito = data.Result[0].LugarLaboral.NombreDistrito;
            var nombreDepartamento = data.Result[0].LugarLaboral.NombreDepartamento;
            var nombreProvincia = data.Result[0].LugarLaboral.NombreProvincia;
            $txtNombreAsesorVenta.val(data.Result[0].NombresEmpleado);
            $txtApePat.val(data.Result[0].ApellidoPaternoEmpleado);
            $txtApeMat.val(data.Result[0].ApellidoMaternoEmpleado);
            $txtCentroLabores.val(`${nombreDepartamento === '' ? '' : nombreDepartamento}  ${nombreProvincia === '' ? '': "/ ".concat(nombreProvincia)}  ${nombreDistrito === '' ? '' : "/ ".concat(nombreDistrito)}`);
            $txtCodigoUbigeo.val(data.Result[0].LugarLaboral.UbigeoId);
            $txtTelefono.val(data.Result[0].TelefonoEmpleado);
            $txtCorreo.val(data.Result[0].EmailEmpleado);
           
            };
          
          
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoAsesorVenta);
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
    function fnAceptarCancelarCallback() {
            sessionStorage.clear();
            app.redirectTo("BandejaAsesorVenta");
        }
    function btnCancelarClick() {
        var proceso = sessionStorage.getItem("tipoRegAsesor");
        if (proceso == "N") {
            app.message.confirm("Asesor Ventas", "Los datos se perderán si cancelas.", "Sí", "No", fnAceptarCancelarCallback, null);
        } else if (proceso == "U") {
            app.message.confirm("Asesor Ventas", "Los datos se perderán si cancelas.", "Sí", "No", fnAceptarCancelarCallback, null);
            sessionStorage.clear();
        } else {
            app.redirectTo("BandejaAsesorVenta");
        }
    }
        function btnRegistrarClick(e) {
            e.preventDefault();
            var tipo = "";
            var codigo = 0;
            if (sessionStorage.getItem('tipoRegAsesor') == "N") {
                tipo = "1";
            }
            else {
                tipo = "2";
                codigo = sessionStorage.getItem('idAsesor');
            }

            var method = "POST";
            var url = "BandejaAsesorVenta/InsertarAsesorVenta";
            if (sessionStorage.getItem("tipoRegAsesor") == "N") {
                var objAsesorVenta = {
                    TipoMantenimiento: tipo,
                    CodigoEmpleado: codigo,
                    CodigoCargo:5,//CODIGO DE ASESOR DE VENTA
                    NombreEmpleado: $txtNombreAsesorVenta.val().trim(),
                    ApellidoPaternoEmpleado: $txtApePat.val().trim(),
                    ApellidoMaternoEmpleado: $txtApeMat.val().trim(),
                    LugarLaboral: {
                        UbigeoId: $txtCodigoUbigeo.val(),
                    },
                    Telefono: $txtTelefono.val().trim(),
                    Email: $txtCorreo.val().trim(),
                    Estado: $cmbEstReg.val(),
                   
                }
            }
            else if (sessionStorage.getItem("tipoRegAsesor") == "U") {
                var objAsesorVenta = {
                    TipoMantenimiento: tipo,
                    CodigoEmpleado: codigo,
                    CodigoCargo: 5,//CODIGO DE ASESOR DE VENTA
                    NombreEmpleado: $txtNombreAsesorVenta.val().trim(),
                    ApellidoPaternoEmpleado: $txtApePat.val().trim(),
                    ApellidoMaternoEmpleado: $txtApeMat.val().trim(),
                    LugarLaboral: {
                        UbigeoId: $txtCodigoUbigeo.val(),
                    },
                    Estado: $cmbEstReg.val(),
                    Telefono: $txtTelefono.val().trim(),
                    Email: $txtCorreo.val().trim(),
                    
                }
            }

            var objParam = JSON.stringify(objAsesorVenta);
            function redirect() {
                app.redirectTo("BandejaAsesorVenta");
            
            }
            function fnAceptarCallback() {
                if (tipo == 1) {
                    app.message.success("Guardar", "Registro Exitoso", "Aceptar", redirect);
                } else if (tipo == 2) {
                    app.message.success("Guardar", "Actualización Exitosa", "Aceptar", redirect);
                }
            }

            var fnDoneCallback = function (data) {
                if (tipo == 1) {
                    app.message.confirm("Asesor  Ventas", "¿Estás seguro que deseas registrar?", "Sí", "No", fnAceptarCallback, null);
                } else if (tipo == 2) {
                    app.message.confirm("Asesor  Ventas", "¿Esttás seguro que deseas actualizar los datos?", "Sí", "No", fnAceptarCallback, null);
                }
            }
            var fnFailCallback = function (data) {
                app.error("Error en la Inserción", "Los campos deben rellenarse");
            }

            if ($txtNombreAsesorVenta.val().trim() === "" || $txtNombreAsesorVenta.val().trim() === null || $txtNombreAsesorVenta.val().trim() === undefined) {
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
            if (isNaN($txtTelefono.val().trim())) {
                app.message.error("Validación", "El número de teléfono no puede contener letras.");
                return
            };
            if ($cmbEstReg.val()=== null || $cmbEstReg.val() === undefined || $cmbEstReg.val()=== "") {
                app.message.error("Validacion", "El campo 'Estado' debe Registrarse.");
                return;
            }
            if ($txtCorreo.val().trim() === "" || $txtCorreo.val().trim() === undefined || $txtCorreo.val().trim() === null) {
                app.message.error("Validacion", "El campo 'Correo' debe Registrarse.");
                return;
            }
            if (!app.validarEmail($txtCorreo.val().trim())) {
                app.message.error("Validación", "El campo 'Correo' debe tener el formato correo");
                return;
            }
         
            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoAsesorVenta);
    }
   
   })(window.jQuery, window, document);