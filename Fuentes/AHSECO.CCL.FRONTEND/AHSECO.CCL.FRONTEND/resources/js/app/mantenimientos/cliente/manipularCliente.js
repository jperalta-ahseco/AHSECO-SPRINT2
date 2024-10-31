var manipularCliente = (function ($, win, doc) {
    $(Initialize);
    /*************CONTACTOS************* */
    var $cmbTipDocContacto = $('#cmbTipDocContacto');
    var $btnAbreEditaContacto = $('#btnAbreEditaContacto')
    var $txtNumContacto = $('#txtNumContacto');
    var $txtNomContacto = $('#txtNomContacto');
    var $txtContactoTelefono = $('#txtContactoTelefono');
    var $txtContactoTelefono2 = $('#txtContactoTelefono2');
    var $txtContactoCorreo = $('#txtContactoCorreo');
    var $txtCargoContacto = $('#txtCargoContacto');
    var $cmbEstadoContacto = $('#cmbEstadoContacto');
    var $contenidoTabla = $('#contenidoTabla');
    var $btnCerrar = $('#btnCerrar');
    var $btnAgregarNuevoContacto = $('#btnAgregarNuevoContacto');
    var $btnLimpiar = $('#btnLimpiar');
    var $btnLimpiarTodo = $('#btnLimpiarTodo');
    var $btnAñadir = $('#btnAñadir');
    var $tituloContacto = $('#tituloContactoBandeja');
    var $btnActualizarContacto = $('#btnActualizarContacto');
    var $btnAbreRegistroContacto = $('#btnAbreRegistroContacto');
    var $containerRegister = $('#containerRegister');
    var $contenedorModal = $('.contenedorModal');
    var $btnAgregarContacto = $('#btnAgregarContacto');
    var $txtidContacto = $('#txtidContacto');
    var $btnCerrar = $('#btnCerrar');
    var $modalModificarContacto = $('#modalModificarContacto');
    var $txtContacto = $('#txtContacto');
    var $txtConsultaEstablecimiento = $('#txtConsultaEstablecimiento');
    var $txtEstablecimiento = $('#txtEstablecimiento');
    var $btnEditar = $('#btnEditar');
    var $txtAreaContacto = $('#txtAreaContacto');

    /*********Txt***************** */
    var $txtSector = $('#txtSector');
    var $txtUbicacion = $("#txtUbicacion");
    var $txtRuc = $("#txtRuc");/** */
    var $txtDireccion = $("#txtDireccion");
    var $txtNomEmpresa = $("#txtNomEmpresa");
    var $txtNomContacto = $('#txtNomContacto');
    var $txtTelefono = $('#txtTelefono');
    var $txtCorreo = $('#txtCorreo');
    var $txtCodUbicacion = $('#txtCodUbicacion');
    /***********combos*************** */
    var $cmbCategoria = $("#cmbCategoria");
    var $cmbEstado = $('#cmbEstado');
    var $cmbDepartamento = $("#cmbDepartamento");
    var $cmbProvincia = $("#cmbProvincia");
    var $cmbDistrito = $("#cmbDistrito");
    /***********botones*************** */
    var $btnRetroceder = $('#btnRetroceder');
    var $btnGrabar = $('#btnGrabar');
    var $btnActualizar = $('#btnActualizar');
    var $btnSeleccionar = $('#btnGuardarUbigeo');
    var $btnBuscarContactos = $('#btnBuscarContactos');
    var $btnVolver = $('#btnVolver');
    var $btnRegresarEditar = $('#btnRegresarEditar');
    var $btnConsultContacto = $('#btnConsultContacto')

    /********************************* */
    var $tblContactos = $('#tblContactos');
    var ingreso = sessionStorage.getItem("estado");
    var idCliente = sessionStorage.getItem("idCliente");
    var consulta = sessionStorage.getItem("consulta");
    var $modalUbigeo = $("#modalUbigeo");
    var $modalContacto = $('#modalContacto');
    var $modalContent = $('#modalContent');
    /************************** */

    var mensajes = {
        obteniendoClientes: "Obteniendo Clientes, por favor espere...",
        consultandoCategorias: "Obteniendo Categorias, por favor espere...",
        procesandoClientes: "Procesando Clientes, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del usuario, por favor espere...",
        obteniendoHistoricos: "Obteniendo datos del historico, por favor espere...",
        guardarUbigeo: "Guardando datos del ubigeo , por favor espere...",
        guardarCliente: "Guardando datos del cliente, por favor espere...",
        consultandoTipDoc: "Generando tipos de documentos, por favor espere...",
        guardandoContactos: "Guardando contactos, por favor espere...",
        consultaContactos: "Consultando contactos, por favor espere...",
        llenarEmpleados: "Buscando Asesores, por favor espere..."
    };

    function Initialize() {
        manipularCliente.contactos = [];
        manipularCliente.actualizarContacto = false;
        cargarCategorias();
        cargarTipoDoc();
        logicUbigeo();
        cargarContactos(ingreso, consulta);
        //cargarDatos(idCliente);
        $btnCerrar.click(btnCerrarClick);
        $btnBuscarContactos.click(btnBuscarContactosClick);
        $btnActualizar.click(btnActualizarClick);
        $btnVolver.click(btnVolverClick)
        $btnRegresarEditar.click(btnRegresarEditarClick);
        $btnRetroceder.click(btnRetrocederClick);
        $btnSeleccionar.click(seleccionar);
        $btnGrabar.click(btnGrabarClick);
        $btnAgregarContacto.click(btnAgregarContactoClick);
        $btnAgregarNuevoContacto.click(btnAgregarNuevoContactoClick);
        $btnLimpiar.click(btnLimpiarClick);
        $btnCerrar.click(btnLimpiarClick);
        $btnLimpiarTodo.click(btnLimpiarTodoClick);
        $btnAñadir.click(btnAñadirClick);
        $btnActualizarContacto.click(btnActualizarContactoClick);
        $btnAbreRegistroContacto.click(AbreRegistroContactoClick);
        $btnAbreEditaContacto.click(AbreEditaContactoClick);
        $btnConsultContacto.click(btnConsultContactoClick);
        cargarDatos(ingreso, idCliente);
    }
/***Cargar Combos***/

/*Lógica Ubigeo*/
    
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
                const nomDepartamento = $('select[id="cmbDepartamento"] option:selected').text();
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
            const nomProvincia = $('select[id="cmbProvincia"] option:selected').text();
            sessionStorage.setItem('nomProvincia', `${nomProvincia}`);

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
            $txtCodUbicacion.val(codDistrito);
        });


        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbDistrito, distritos, $modalUbigeo, "", "<--Seleccione-->", filters)
    }
    
    function cargarCategorias(datos) {

        var method = "POST";
        var url = "BandejaParametros/ObtenerDetalles";
        var objGenerales = {
            DatosGenerales: {
                Dominio: "CLASICLIE"}
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

            app.llenarCombo($cmbCategoria, resultado, null, "", "No definido", null);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.consultandoCategorias);
    }
    /*Lógica Ubigeo*/
    
    function cargarTipoDoc() {
        var method = "POST";
        var url = "Utiles/ListarDocumentos";
        var objParams = ""

        var fnDoneCallback = function (data) {


            var filters = {};
            filters.allowClear = false;

            app.llenarCombo($cmbTipDocContacto, data, null, ' ', "Sin definir", filters);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.consultandoTipDoc);
    }

/***Fin Cargar Combos***/

    /*Botones Click*/
    function btnCerrarClick() {
        $modalModificarContacto.modal('toggle');
    }
    function AbreRegistroContactoClick(){
        $btnActualizarContacto.css("display", "none");
        $txtNumContacto.prop('disabled', true);
    }

    function btnConsultContactoClick() {
        $btnAñadir.css("display", "none");
        $btnLimpiarTodo.css("display", "none");
        cargarContactos(ingreso, 3);
    }


    function btnAñadirClick() {
        btnLimpiarClick();
        $btnAgregarContacto.css("display", "none");
        $cmbEstadoContacto.val("1");
        $cmbEstadoContacto.prop("disabled", true);
        $tituloContacto.text("Registrar Contacto");

        if (manipularCliente.actualizarContacto == true) {
            $btnAgregarContacto.css("display", "inline-block");
        }

        $cmbTipDocContacto.on('change', function () {
            if ($cmbTipDocContacto.val() == ' ') {
                $txtNumContacto.prop("disabled", true);
            }
            else {
                $txtNumContacto.prop("disabled", false);
            }
        });
        $btnLimpiar.css("display", "inline-block");
        $btnActualizarContacto.css("display", "none");
    }
    
    function AbreEditaContactoClick() {
        manipularCliente.actualizarContacto = true;
        $btnAgregarNuevoContacto.css("display","none")
        $btnLimpiarTodo.css("display", "none");
        $btnAgregarContacto.css("display", "none");
        $btnLimpiar.css("display", "none");
        $btnActualizarContacto.css("display", "inline-block");
        cargarContactos(ingreso,2);
    }   
    
    function btnActualizarContactoClick() {
        var validador = contactos = [];
        var rpta = validarTipoDoc();


        if ($txtNumContacto.val() != undefined && $txtNumContacto.val() != "" && $txtNumContacto.val() != " ") {
            if (manipularCliente.contactos.length >= 1) {
                contactos = manipularCliente.contactos.filter(contacto => contacto.numero !== Number($txtidContacto.val()));
                validador.contactos = [contactos.find((contacto) => contacto.numDoc === $txtNumContacto.val())]
                if (validador.contactos.length >= 1 && !(validador.contactos.includes(undefined))) {
                    app.message.error("Validación", "El número de documento debe de ser único.");
                    return
                }
            }
        }

        if (!rpta && rpta != undefined) {
            return;
        };

        if (($txtNomContacto.val().trim() === "") || !(isNaN($txtNomContacto.val().trim()))) {
            app.message.error("Validación", "Debe de agregar nombres.");
            return
        };

        if ($txtEstablecimiento.val().trim() == "") {
            app.message.error("Validación","Debe de agregar el establecimiento.")
            return
        }

        if ($txtAreaContacto.val().trim() == "")
        {
            app.message.error("Validación", "Debe de agregar el area del contacto.")
            return
        }

        if (isNaN($txtContactoTelefono.val().trim()) || isNaN($txtContactoTelefono2.val().trim())) {
            app.message.error("Validación", "El número de teléfono no puede contener letras.");
            return
        };

        if ($txtContactoTelefono.val().trim() == "" && $txtContactoTelefono2.val().trim() == "") {
            app.message.error("Validación", "Debe de ingresar por lo menos un número.");
            return
        }

        if ($txtContactoCorreo.val().trim() === "" || !app.validarEmail($txtContactoCorreo.val().trim())) {
            app.message.error("Validación", "El correo no ha sido ingresado o el formato es inválido");
            return
        };

        if ($txtCargoContacto.val().trim() === "") {
            app.message.error("Validación", "No ha ingresado un cargo");
            return
        };

        if ($cmbEstadoContacto.val().trim() === "") {
            app.message.error("Validación", "Debe de escoger un estado.");
            return
        };


        method = "POST";
        url = "BandejaCliente/ActualizarContacto";

        var estado;
        if ($cmbEstadoContacto.val() == "1") {
            estado = true;
        }
        else {
            estado = false;
        }
        ObjContactos = {
            IdContacto: $txtidContacto.val(),
            tipDoc: $cmbTipDocContacto.val(),
            NumDoc: $txtNumContacto.val(),
            NomCont: $txtNomContacto.val(),
            Establecimiento: $txtEstablecimiento.val(),
            AreaContacto: $txtAreaContacto.val(),
            Telefono: $txtContactoTelefono.val(),
            Telefono2: $txtContactoTelefono2.val(),
            Cargo: $txtCargoContacto.val(),
            Correo: $txtContactoCorreo.val(),
            Estado: estado
        }
        objParam = JSON.stringify(ObjContactos);

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.info("Actualización Realizada", "Se realizó la actualización. ")
                cargarContactos(ingreso,2);
                btnLimpiarClick();
                $modalModificarContacto.modal('toggle');
            }
            var fnFailCallBack = function () {
                app.message.error("Validación", "No se realizó el registro, revisar")
            }

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoContactos);
        };
        return app.message.confirm("Contactos", "¿Esta seguro que desea actualizar los datos del contacto?", "Si", "No", fnSi, null);
        if (isNaN($txtRuc.val().trim()) || $txtRuc.val().trim() === "" || $txtRuc.val().trim().length <= 10) {
            app.message.error("Validación", "El RUC debe de ser un número de 11 dígitos.");
            return
        };

        if ($txtNomEmpresa.val() === "" || $txtNomEmpresa.val().trim().length === 0) {
            app.message.error("Validación", "Debe de ingresar el nombre de la empresa.");
            return
        };

        var telefono = $txtTelefono.val().trim();

        telefono = telefono.replace(/\s+/g, ' ');

        if (isNaN($txtTelefono.val().trim()) || (telefono.length === 0 && telefono != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if (!app.validarEmail($txtCorreo.val().trim()) && $txtCorreo.val().trim() != "") {
            app.message.error("Validación", "Debe de colocar un correo con el formato correcto.");
            return
        }

        if ($txtSector.val() == "" || $txtSector.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el sector de cliente.");
            return
        }
        
        if ($txtUbicacion.val() === "") {
            app.message.error("Validación", "Debe de seleccionar la ubicación.");
            return
        };

        if ($txtDireccion.val() === "" || $txtDireccion.val().trim().length === 0) {
            app.message.error("Validación", "El campo dirección no ha sido completado");
            return
        };

        if (manipularCliente.contactos < 1) {
            app.message.error("Validación","Debe de registrar por lo menos un contacto.")
            return
        }

    }
    
    function btnGrabarClick() {
        method = "POST";
        url = "BandejaCliente/Insertar"

        var codUbigeo = sessionStorage.getItem('codDistrito');

        if (isNaN($txtRuc.val().trim()) || $txtRuc.val().trim() === "" || $txtRuc.val().trim().length <= 10) {
            app.message.error("Validación", "El RUC debe de ser un número de 11 dígitos.");
            return
        };

        if ($txtNomEmpresa.val() === "" || $txtNomEmpresa.val().trim().length === 0) {
            app.message.error("Validación", "Debe de ingresar el nombre de la empresa.");
            return
        };

        var telefono = $txtTelefono.val().trim();

        telefono = telefono.replace(/\s+/g, ' ');

        if (isNaN($txtTelefono.val().trim()) || (telefono.length === 0 && telefono != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if (!app.validarEmail($txtCorreo.val().trim()) && $txtCorreo.val().trim() != "") {
            app.message.error("Validación", "Debe de colocar un correo con el formato correcto.");
            return
        }

        if ($txtSector.val() == "" || $txtSector.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el sector de cliente.");
            return
        }
        
        if ($txtUbicacion.val() === "") {
            app.message.error("Validación", "Debe de seleccionar la ubicación.");
            return
        };

        if ($txtDireccion.val() === "" || $txtDireccion.val().trim().length === 0) {
            app.message.error("Validación", "El campo dirección no ha sido completado");
            return
        };

        if (manipularCliente.contactos < 1) {
            app.message.error("Validación","Debe de registrar por lo menos un contacto.")
            return
        }


        objCliente = {
            RUC: $txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val(),
            Direccion: $txtDireccion.val(),
            Telefono: $txtTelefono.val(),
            Correo: $txtCorreo.val(),
            SectorCliente: $txtSector.val(),
            CodUbigeo: codUbigeo,
            Categoria: $cmbCategoria.val(),
            Estado: true
        }

        objParam = JSON.stringify(objCliente);


        function redirect() {
            sessionStorage.clear();
            app.redirectTo("BandejaCliente");
        }
        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                if (data.Result[0].ID == 0) {
                    app.message.error("Error en la inserción", "El RUC ya ha sido ingresado");
                    return
                }
                else {
                    registrarContactos(data.Result[0].ID);
                    app.message.success("Registro Realizado", "Se realizó el registro satisfactoriamente.", "Aceptar", redirect);
                }

            }
            var fnFailCallBack = function (data) {
                app.message.error("Error en la inserción", "Validar datos ingresados.")
            }

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.guardarCliente);
        };
        return app.message.confirm("Validación", "¿Está seguro que desea registrar los datos ingresados?.", "Si", "No", fnSi, null);
    }

    function btnVolverClick() {
        var fnSi = function () {
            Salir();
        };
        return app.message.confirm("Salir", "¿Esta seguro que desea regresar a la ventana anterior?.", "Si", "No", fnSi, null);
    }


    function btnRegresarEditarClick() {
        var fnSi = function () {
            Salir();
        };
        return app.message.confirm("Salir", "¿Esta seguro que desea abandonar esta ventana? Al regresar, perderá todos los datos que no haya guardado.", "Si", "No", fnSi, null);
    }

    function btnRetrocederClick() {
        var fnSi = function () {
            Salir();
        };
        return app.message.confirm("Salir", "¿Esta seguro que desea abandonar esta ventana? Al salir del registro del cliente perderá los datos registrados.", "Si", "No", fnSi, null);
    }

    function Salir() {
        $txtRuc.val("");
        $txtNomEmpresa.val("");
        $txtDireccion.val("");
        $txtUbicacion.val("");
        $txtSector.val("");
        $cmbCategoria.val("0");
        $txtTelefono.val("");
        $txtCorreo.val("");
        sessionStorage.clear();
        app.redirectTo("BandejaCliente/Index");
        sessionStorage.clear();
    }
    
    function btnActualizarClick() {
        method = "POST";
        url = "BandejaCliente/Actualizar"

        var estado;

        var codUbigeo = sessionStorage.getItem('codDistrito');

        if ($cmbEstado.val().trim() === "1") {
            estado = true;
        }
        else {
            estado = false
        }
        objCliente = {
            ID: idCliente,
           //RUC: $txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val(),
            SectorCliente: $txtSector.val(),
            Direccion: $txtDireccion.val(),
            CodUbigeo: $txtCodUbicacion.val(),
            Categoria: $cmbCategoria.val(),
            Estado: estado,
            Telefono: $txtTelefono.val(),
            Correo: $txtCorreo.val(),
        }

        objParamCliente = JSON.stringify(objCliente);


        if (isNaN($txtRuc.val().trim()) || $txtRuc.val().trim() === "" || $txtRuc.val().trim().length <= 10) {
            app.message.error("Validación", "El RUC debe de ser un número de 11 dígitos.");
            return
        };

        if ($txtNomEmpresa.val() === "" || $txtNomEmpresa.val().trim().length === 0) {
            app.message.error("Validación", "Debe de ingresar el nombre de la empresa.");
            return
        };

        var telefono = $txtTelefono.val().trim();

        telefono = telefono.replace(/\s+/g, ' ');

        if (isNaN($txtTelefono.val().trim()) || telefono.length === 0 && telefono != "") {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };



        if (!app.validarEmail($txtCorreo.val().trim()) && $txtCorreo.val().trim() != "") {
            app.message.error("Validación", "Debe de colocar un correo con el formato correcto.");
            return
        }

        if ($txtSector.val() == "" || $txtSector.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el sector de cliente.");
            return
        }

        if ($txtUbicacion.val() === "") {
            app.message.error("Validación", "Debe de seleccionar la ubicación.");
            return
        };

        if ($txtDireccion.val() === "" || $txtDireccion.val().trim().length === 0) {
            app.message.error("Validación", "El campo dirección no ha sido completado");
            return
        };

        if (manipularCliente.contactos < 1) {
            app.message.error("Validación", "Debe de registrar por lo menos un contacto.")
            return
        }

        function redirect() {
            sessionStorage.clear();
            app.redirectTo("BandejaCliente");
        }

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                app.message.success("Actualización Exitosa", "Se realizó la actualización exitosamente", "Aceptar", redirect);
            }
            var fnFailCallBack = function () {
                app.message.error("Error en la Actualización", "Validar datos ingresados.")
            }


            app.llamarAjax(method, url, objParamCliente, fnDoneCallBack, fnFailCallBack, null, mensajes.guardarCliente);
        };
        return app.message.confirm("Cliente", "¿Esta seguro que desea actualizar los datos del cliente?", "Si", "No", fnSi, null);

    }
    
    function btnLimpiarClick() {
        $cmbTipDocContacto.val(""); 
        $txtNumContacto.val("");
        $txtNomContacto.val("");
        $txtContactoTelefono.val("");
        $txtContactoTelefono2.val("");
        $txtContactoCorreo.val("");
        $txtCargoContacto.val("");
        $txtEstablecimiento.val("");
        $txtAreaContacto.val("");
    }
    
    function btnAgregarNuevoContactoClick() {
        var _tipDocText = $("#cmbTipDocContacto option:selected").text() == "" ? "Sin definir" : $("#cmbTipDocContacto option:selected").text();
        var _tipDoc = $cmbTipDocContacto.val();
        var _numDoc = $txtNumContacto.val();
        var _nombre = $txtNomContacto.val();
        var _establecimiento = $txtEstablecimiento.val();
        var _areacontacto = $txtAreaContacto.val();
        var _telef = $txtContactoTelefono.val();
        var _telef2 = $txtContactoTelefono2.val();
        var _correo = $txtContactoCorreo.val();
        var _cargo = $txtCargoContacto.val();
        var _estado = $cmbEstadoContacto.val();
        var _estadoText = $("#cmbEstadoContacto option:selected").text();
        
        var validador = contactos = [];
        var rpta = validarTipoDoc();

        if (_numDoc != undefined && _numDoc != "" && _numDoc != " ") {
            if (manipularCliente.contactos.length >= 1){
                validador.contactos = [manipularCliente.contactos.find((contacto) => contacto.numDoc === _numDoc)]
                if (validador.contactos.length >= 1 && !(validador.contactos.includes(undefined))){
                    app.message.error("Validación", "El número de documento debe de ser único.");
                    return
                }
            }
        }


        if (!rpta && rpta != undefined){
            return; 
        };



        if ((_nombre == "") || !(isNaN(_nombre)) || (_nombre.trim().length === 0)) {
            app.message.error("Validación", "Debe de agregar nombres.");
            return
        };

        if (_establecimiento.trim() === "" || _establecimiento.trim() === 0) {
            app.message.error("Validación", "Debe de agregar el establecimiento.");
            return
        }

        if (_areacontacto.trim() === "" || _areacontacto.trim() === 0) {
            app.message.error("Validación", "Debe de agregar el area del contacto.");
            return
        }


        var telefonoContacto = _telef.trim();

        telefonoContacto = telefonoContacto.replace(/\s+/g, ' ');

        if (isNaN(_telef) || (telefonoContacto.length === 0 && telefonoContacto != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        var telefonoContacto2 = _telef2.trim();

        telefonoContacto2 = telefonoContacto2.replace(/\s+/g, ' ');

        if (isNaN(_telef2) || (telefonoContacto2.length === 0 && telefonoContacto2 != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if (_telef == "" && _telef2 == "") {
            app.message.error("Validación", "Debe de ingresar por lo menos un número de teléfono.");
            return
        }

        if (_correo === "" || !app.validarEmail(_correo)) {
            app.message.error("Validación", "El correo no ha sido ingresado o el formato no es válido.");
            return
        };

        if (_cargo.trim() === "" || _cargo.trim().length === 0) {
            app.message.error("Validación", "No ha ingresado un cargo");
            return
        };

        if (_estado.trim() === "") {
            app.message.error("Validación", "Debe de escoger un estado.");
            return
        };

        var fnSi = function () {

            var numero = manipularCliente.contactos.length + 1;

            manipularCliente.contactos.push({
                numero: numero,
                tipDocText: _tipDocText,
                tipDoc: _tipDoc,
                numDoc: _numDoc,
                nombre: _nombre,
                establecimiento: _establecimiento,
                areacontacto: _areacontacto,
                telef: _telef,
                telef2: _telef2,
                cargo: _cargo,
                correo: _correo,
                estadoContacto: _estado,
                estadoText: _estadoText
            });

            cargarTablaContactos(manipularCliente.contactos, 1);
            $modalModificarContacto.modal('toggle');
            btnLimpiarClick();
            app.message.success("Registro de Contacto", "Se añadió el contacto correctamente.");
        };
        return app.message.confirm("Contactos", "¿Esta seguro que desea realizar el registro del contacto?", "Si", "No", fnSi, null);
    }
    
    function btnLimpiarTodoClick() {

       var fnSi = function () {
           $contenidoTabla.empty();
            manipularCliente.contactos = [];
            cargarTablaContactos(manipularCliente.contactos,1);
            app.message.success("Eliminación Satisfactoria", "Se limpió la bandeja");
        };
        return app.message.confirm("Contactos", "¿Esta seguro que desea eliminar todos los contactos ingresados?", "Si", "No", fnSi, null);

        
    }
    
    function btnAgregarContactoClick() {

        var validador = contactos = [];
        var rpta = validarTipoDoc();


        if ($txtNumContacto.val() != undefined && $txtNumContacto.val() != "" && $txtNumContacto.val() != " ") {
            if (manipularCliente.contactos.length >= 1) {
                validador.contactos = [manipularCliente.contactos.find((contacto) => contacto.numDoc === $txtNumContacto.val())]
                if (validador.contactos.length >= 1 && !(validador.contactos.includes(undefined))) {
                    app.message.error("Validación", "El número de documento debe de ser único.");
                    return
                }
            }
        }
        
        if (!rpta && rpta != undefined) {
            return;
        };

        if (($txtNomContacto.val() === "") || !(isNaN($txtNomContacto.val())) || ($txtNomContacto.val().trim().length === 0)) {
            app.message.error("Validación", "Debe de agregar nombres.");
            return
        };

        if ($txtEstablecimiento.val().trim() === "" || $txtEstablecimiento.val().trim().length === 0){
            app.message.error("Validación", "Debe de agregar el establecimiento.");
            return
        }

        if ($txtAreaContacto.val().trim() === "" || $txtAreaContacto.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el area de contacto.");
            return
        }

        var telefonoContacto = $txtContactoTelefono.val().trim();

        telefonoContacto = telefonoContacto.replace(/\s+/g, ' ');

        if (isNaN(telefonoContacto.trim()) || (telefonoContacto.length === 0 && telefonoContacto != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        var telefonoContacto2 = $txtContactoTelefono2.val().trim();

        telefonoContacto2 = telefonoContacto2.replace(/\s+/g, ' ');

        if (isNaN(telefonoContacto2.trim()) || (telefonoContacto2.length === 0 && telefonoContacto2 != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if ($txtContactoTelefono.val() == "" && $txtContactoTelefono2.val() == "") {
            app.message.error("Validación", "Debe de ingresar por lo menos un número de teléfono.");
            return
        }

        if ($txtContactoCorreo.val() === "" || !app.validarEmail($txtContactoCorreo.val())) {
            app.message.error("Validación", "El correo no ha sido ingresado o el formato no es válido.");
            return
        };

        if ($txtCargoContacto.val().trim() === "" || $txtCargoContacto.val().trim().length === 0) {
            app.message.error("Validación", "No ha ingresado un cargo");
            return
        };

        if ($cmbEstadoContacto.val().trim() === "") {
            app.message.error("Validación", "Debe de escoger un estado.");
            return
        };


        method = "POST";
        url = "BandejaCliente/InsertarContacto";

        var estado;
        if ($cmbEstadoContacto.val() == "1") {
            estado = true;
        }
        else {
            estado = false;
        }

        ObjContactos = {
            IdCliente: idCliente,
            RucCliente: $txtRuc.val(),
            tipDoc: $cmbTipDocContacto.val() === null ? " " : $cmbTipDocContacto.val(),
            NumDoc: $txtNumContacto.val(),
            NomCont: $txtNomContacto.val(),
            Establecimiento: $txtEstablecimiento.val(),
            AreaContacto : $txtAreaContacto.val(),
            Telefono: $txtContactoTelefono.val(),
            Telefono2: $txtContactoTelefono2.val(),
            Cargo: $txtCargoContacto.val(),
            Correo: $txtContactoCorreo.val(),
            Estado: estado
        }
        objParam = JSON.stringify(ObjContactos);


        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.info("Registro Realizado", "Se realizó el registro")
                cargarContactos(ingreso,2);
                btnLimpiarClick();
                $modalModificarContacto.modal('toggle');
            }
            var fnFailCallBack = function () {
                app.message.error("Validación", "No se realizó el registro, revisar")
            }

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoContactos);

        };
        return app.message.confirm("Contactos", "¿Esta seguro que registrar el contacto ingresado?", "Si", "No", fnSi, null);

    }   
    function registrarContactos(ID) {



        for (var i = 0; i < manipularCliente.contactos.length; i++) {
            if (manipularCliente.contactos[i].estadoContacto === "1") {
                estado = true;
            }
            else {
                estado = false
            }

            method = "POST";
            url = "BandejaCliente/InsertarContacto";
            var estado;
            ObjContactos = {
                IdCliente: ID,
                RucCliente: $txtRuc.val(),
                tipDoc: manipularCliente.contactos[i].tipDoc === null ? " " : manipularCliente.contactos[i].tipDoc,
                NumDoc: manipularCliente.contactos[i].numDoc,
                NomCont: manipularCliente.contactos[i].nombre,
                Establecimiento: manipularCliente.contactos[i].establecimiento,
                AreaContacto: manipularCliente.contactos[i].areacontacto,
                Telefono: manipularCliente.contactos[i].telef,
                Telefono2: manipularCliente.contactos[i].telef2,
                Cargo: manipularCliente.contactos[i].cargo,
                Correo: manipularCliente.contactos[i].correo,
                Estado: estado
            }

            objParam = JSON.stringify(ObjContactos);

            var fnDoneCallBack = function () {
            }
            var fnFailCallBack = function () {
                app.message.error("Validación", "No se realizó el registro, revisar")
            }

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoContactos);
        }
    }

    function eliminar(id) {
        var fnSi = function () {
            manipularCliente.contactos = manipularCliente.contactos.filter(contacto => contacto.numero !== id);
            const child = document.getElementById("row"+id);
            document.getElementById("contenidoTabla").removeChild(child);
            cargarTablaContactos(manipularCliente.contactos,1);
        };
        return app.message.confirm("Contactos", "¿Esta seguro que desea eliminar el contacto seleccionado?", "Si", "No", fnSi, null);        
    }
    
    function seleccionar() {

        var nomDepartamento = sessionStorage.getItem('nomDepartamento')
        var nomProvincia = sessionStorage.getItem('nomProvincia');
        var nomDistrito = sessionStorage.getItem('nombreDistrito');

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
        
        $txtUbicacion.val(nomDepartamento + ' / ' + nomProvincia + ' / ' + nomDistrito);
        $modalUbigeo.modal('hide');
    }
    
    function inactivar(id) {

        var fnSi = function () {
            method = "POST";
            url = "BandejaCliente/ActualizarContacto";

            var contacto = (manipularCliente.contactos.find((contacto) => contacto.numero === id));

            objContactos = {
                IdContacto: id,
                TipDoc: contacto.tipDoc,
                NumDoc: contacto.numDoc,
                NomCont: contacto.nombre,
                Establecimiento: contacto.establecimiento,
                AreaContacto: contacto.areacontacto,
                Telefono: contacto.telef,
                Telefono2: contacto.telef2,
                Cargo: contacto.cargo,
                Correo: contacto.correo,
                Estado: false
            }

            objParam = JSON.stringify(objContactos);

            var fnDoneCallBack = function () {
                $contenidoTabla.empty();
                manipularCliente.contactos = [];
                app.message.success("REGISTRO INACTIVIDAD", "Se realizó la inactivación del contacto.");
                cargarContactos(ingreso,2);
            }

            var fnFailCallBack = function () {
                app.message.error("ERRRO", "No se realizó la inactivación.");
            }

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.consultaContactos); 
        };
        return app.message.confirm("Contactos", "¿Esta seguro que desea inactivar este contacto?", "Si", "No", fnSi, null);
    }
    
    function editar(id) {

        if ($txtNumContacto.val() == ' ') {
            $txtNumContacto.prop("disabled", true);
            $txtNumContacto.val(" ");
        }
        $cmbTipDocContacto.on('change', function () {
            if ($cmbTipDocContacto.val() == ' ') {
                $txtNumContacto.prop("disabled", true);
                $txtNumContacto.val("");
            }
            else {
                $txtNumContacto.prop("disabled", false);
                $txtNumContacto.val("");
            }
        });

        $btnAgregarContacto.css("display", "none");
        $btnLimpiar.css("display", "none");
        $btnActualizarContacto.css("display", "inline-block")
        $tituloContacto.text("Editar Contacto");

        $modalModificarContacto.modal("show");

        var contacto = (manipularCliente.contactos.find((contacto) => contacto.numero === id));


        $txtidContacto.val(contacto.numero);
        $cmbTipDocContacto.val(contacto.tipDoc).trigger("change.select2"); 
        $txtNumContacto.val(contacto.numDoc);
        $txtNomContacto.val(contacto.nombre);
        $txtEstablecimiento.val(contacto.establecimiento);
        $txtAreaContacto.val(contacto.areacontacto);
        $txtContactoTelefono.val(contacto.telef);
        $txtContactoTelefono2.val(contacto.telef2);
        $txtContactoCorreo.val(contacto.correo);
        $txtCargoContacto.val(contacto.cargo);
        $cmbEstadoContacto.val(contacto.estadoContacto).trigger("change.select2");
    }
    
    function buscarContactos(nombre, establecimiento) {
        var contactos = manipularCliente.contactos;

                return contactos.filter(contacto => {
                return (nombre === '' || contacto.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
                (establecimiento === '' || contacto.establecimiento.toLowerCase().includes(establecimiento.toLowerCase()));
        });
    }

    function btnBuscarContactosClick(ingreso) {
        var nomContacto = $txtContacto.val();
        var Establecimiento = $txtConsultaEstablecimiento.val();

        var inicio = false

        inicio = ingreso;

        const result = buscarContactos(nomContacto, Establecimiento);

        if (inicio) {
            cargarTablaContactos(result,2);
        }
        else {
            cargarTablaContactos(result,1);
        }

    } 
    /*FIN Botones Click*/

    function validarTipoDoc(){
        const tipoDocContacto = $('select[id="cmbTipDocContacto"] option:selected').text();

        var rpta;

        if (tipoDocContacto == "DNI"){
            if ($txtNumContacto.val().length != 8 || isNaN($txtNumContacto.val()))
            {
                app.message.error("Validación","El DNI debe ser un número de 8 dígitos.")
                rpta = false;
            }
            else{
                rpta = true;
            }
        }
        else if (tipoDocContacto == "Carnet Extranjería"){
            if ($txtNumContacto.val().length != 12){
                app.message.error("Validación","El Carnet de Extranjeria debe ser un número de 12 dígitos.")
                rpta = false;
            }
            else{
                rpta = true;
            }
        }
        return rpta; 
    }

    function cargarTablaContactos(contactos,proceso) {

        if (proceso == 1) {
            var data = Result = [];
            data.Result = contactos;
            var columns = [
                {
                    data: "numero",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "tipDocText",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "numDoc",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "nombre",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "establecimiento",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "areacontacto",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "telef",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "telef2",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "cargo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "correo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "estadoText",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "numero",
                    render: function (data, type, row) {
                        var eliminar = '<a id="btnEliminar" class="btn btn-primary btn-xs" title="Eliminar" href="javascript: manipularCliente.eliminar(' + data + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>';
                        return '<center>' + eliminar + '</center>';
                    }
                }
            ];
        }

        else if (proceso == 2) {
            var data = Result = [];
            data.Result = contactos;

            var columns = [
                {
                    data: "numero",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "tipDocText",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "numDoc",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "nombre",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "establecimiento",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "areacontacto",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "telef",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "telef2",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "cargo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "correo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "estadoText",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "numero",
                    render: function (data, type, row) {
                        var editar = '<a id="btnEditar" class="btn btn-default btn-xs" title="editar" href="javascript: manipularCliente.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>'
                        var inactivar = '<a id="btnInactivar" class="btn btn-primary btn-xs" title="Inactivar" href="javascript: manipularCliente.inactivar(' + data + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>';
                        return '<center>' + inactivar +' '+ editar + '</center>';
                    }
                }
            ];
        }

        else if (proceso == 3) {
            var data = Result = [];
            data.Result = contactos;
            var columns = [
                {
                    data: "numero",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "tipDocText",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "numDoc",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "nombre",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "establecimiento",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "areacontacto",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "telef",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "telef2",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "cargo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "correo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "estadoText",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "numero",
                    render: function (data, type, row) {
                        return '<center>' + 'No disponible' + '</center>';
                    }
                }
            ];
        }


        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
            
        var rowCallback = function(row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + data.numero);
        };

        app.llenarTabla($tblContactos, data, columns, columnDefs, "#tblContactos", rowCallback);
    }
    function cargarContactos(ingreso, idproceso) {
        manipularCliente.contactos = [];
        $contenidoTabla.empty();
        var estado = false;

        estado = ingreso;

        if (!estado) {
            return;
        }
        method = "POST";
        url = "BandejaCliente/ObtenerContactos"
        ObjContactos = {
            IdCliente: idCliente,
            IdContacto: 0
        }

        objParam = JSON.stringify(ObjContactos);

        var fnDoneCallBack = function (data) {
            for (var i = 0; i < data.Result.length; i++) {

                if (data.Result[i].CodEstado == true) {
                    data.Result[i].CodEstado = "1";
                }
                else {
                    data.Result[i].CodEstado = "0";
                }
                manipularCliente.contactos.push({
                    numero: data.Result[i].IdContacto,
                    tipDocText: data.Result[i].TipDoc == "" ? "Sin definir" : data.Result[i].TipDoc,
                    tipDoc: data.Result[i].CodTipDocContacto,
                    numDoc: data.Result[i].NumDoc == ""? "-":data.Result[i].NumDoc,
                    nombre: data.Result[i].NomCont,
                    establecimiento: data.Result[i].Establecimiento,
                    areacontacto: data.Result[i].AreaContacto,
                    telef: data.Result[i].Telefono,
                    telef2: data.Result[i].Telefono2,
                    cargo: data.Result[i].Cargo,
                    correo: data.Result[i].Correo,
                    estadoContacto: data.Result[i].CodEstado,
                    estadoText: data.Result[i].Estado
                });
            };
            cargarTablaContactos(manipularCliente.contactos, idproceso)

        }

        var fnFailCallBack = function () {

        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.consultaContactos); 
    }

    function cargarDatos(ingreso, idCliente) {
        
        var estado = false;
        
        estado = ingreso;

        if (estado) {
            method = "POST";
            url = "BandejaCliente/ObtenerClientes"
            objCliente = {
                ID: idCliente
            };
            objParam = JSON.stringify(objCliente);

            var fnDoneCallBack = function (data) {

                if (data.Result[0].UbigeoDistrito.Descripcion == "") {
                    ubicacion = "";
                }
                else {
                    ubicacion = data.Result[0].UbigeoDepartamento.Descripcion + " / " + data.Result[0].UbigeoProvincia.Descripcion + " / " + data.Result[0].UbigeoDistrito.Descripcion;
                }

                $txtRuc.val(data.Result[0].RUC);
                $txtNomEmpresa.val(data.Result[0].NomEmpresa);
                $txtDireccion.val(data.Result[0].Direccion);
                $txtTelefono.val(data.Result[0].Telefono);
                $txtCorreo.val(data.Result[0].Correo);
                $txtSector.val(data.Result[0].SectorCliente);
                $txtUbicacion.val(ubicacion);
                $txtCodUbicacion.val(data.Result[0].CodUbigeo);
                $cmbCategoria.val(data.Result[0].CodCategoria).trigger("change.select2");
                if (data.Result[0].Estado === true) {
                    $cmbEstado.val('1')
                }
                else {
                    $cmbEstado.val('0');
                };
            };
            var fnFailCallBack = function () {
                app.message.error("Error en la aplicación", "No se pudieron mostrar los datos")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.guardarCliente);
        }
    }

    return {
        editar: editar,
        inactivar: inactivar,
        eliminar: eliminar
    };
})(window.jQuery, window, document);
