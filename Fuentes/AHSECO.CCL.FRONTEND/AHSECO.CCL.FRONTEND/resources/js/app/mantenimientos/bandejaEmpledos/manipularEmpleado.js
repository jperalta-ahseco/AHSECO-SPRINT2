var manipularEmpleado = (function ($, win, doc) {

    /**Variables Globales*/
    var $txtNombre = $("#txtNombre");
    var $txtApePat = $("#txtApePat");
    var $txtApeMat = $("#txtApeMat");
    var $dateFecNac = $("#dateFecNac");
    var $txtTelefono = $("#txtTelefono");
    var $txtCorreo = $("#txtCorreo");
    var $txtNumDoc = $("#txtNumDoc");
    var $txtDireccion = $("#txtDireccion");

    var $dateFecIng = $("#dateFecIng");
    var $txtCodigoJefe = $("#txtCodigoJefe");
    var $txtJefe = $("#txtJefe");
    var $txtCodUbigeo = $("#txtCodUbigeo");
    var $txtLugarLaboral = $("#txtLugarLaboral");
    /**Combos Select*/
    var $cmbArea = $("#cmbArea");
    var $cmbCargo = $("#cmbCargo");
    var $cmbTipo = $("#cmbTipo");
    var $cmbEstado = $("#cmbEstado");
    var $cmbTipDoc = $("#cmbTipDoc");
    var $cmbSexo = $("#cmbSexo");
    var $cmbDepartamento = $("#cmbDepartamento");
    var $cmbProvincia = $("#cmbProvincia");
    var $cmbDistrito = $("#cmbDistrito");
    var $cmbEmpresa = $("#cmbEmpresa");
    /*Botones*/
    var $deleteUbigeo = $("#deleteUbigeo");
    var $btnRegistrar = $("#btnRegistrar");
    var $btnCancelar = $("#btnCancelar");
    var $deleteJefe = $("#deleteJefe");
    var $btnGuardarUbigeo = $("#btnGuardarUbigeo");
    /**Modales */
    var $modalUbigeo = $("#modalUbigeo");
    var $modalJefe = $("#modalJefe");
    /**ModalJefe */
    var $tblJefe = $("#tblJefe");
    var $txtNumDocJefe = $("#txtNumDocJefe");
    var $txtNombreJefe = $("#txtNombreJefe");
    var $btnBuscarJefe = $("#btnBuscarJefe");
    var $txtTitleEmpleados = $("#txtTitleEmpleados");
    /**Tablas */
    var $formEmpleado = $("#formEmpleado");
    var $formBusquedaEmpleados = $("#formBusquedaEmpleados");
    /**Searchs*/
    var $searchUbigeo = $("#searchUbigeo");
    var $searchJefe = $("#searchJefe");
    var objJefe = {
        NombreJefe: "",
        CodigoJefe: 0,
        CodigoEmpleado:0,
    }
    /**Titúlo por cambiar*/
    var mensajes = {
        cargandoEstado: "Cargando Estados, porfavor espere...",
        cargandoTipo: "Cargando Tipos de Empleados, porfavor espere...",
        cargandoSexo: "Cargando Sexo de Empleado, porfavor espere...",
        cargandoTipoDocumento: "Cargando Tipo Documento, porfavor espere...",
        obteniendoCargos: "Cargando Cargos, porfavor espere...",
        registrandoCargos: "Registrando Empleados, porfavor espere...",
        obteniendoAreas: "Obteniendo Áreas, porfavor espere...",
        obteniendoJefes: "Cargando los datos de Empleados, porfavor espere...",
        cargandoEmpresa: "Cargando Empresas, porfavor espere...",
        cargandoEmpleados:"Cargando Empleados, porfavor espere..."
    }
    $(Initialize)
    function Initialize() {
        $cmbArea.on('change', changeArea);
        $cmbCargo.prop("disabled", true);
        $cmbCargo.on('change', changeCargo);
        $searchJefe.click(searchJefe_Click);
        $searchUbigeo.click(searchUbigeo_Click);
        $btnRegistrar.click(btnRegistrarClick);
        $btnCancelar.click(btnCancelarClick);
        $dateFecIng.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        $dateFecNac.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        logicUbigeo();
        $deleteUbigeo.click(deleteUbigeo);
        $deleteJefe.click(deleteJefe);
        $btnGuardarUbigeo.click(seleccionar);
        $btnBuscarJefe.click(btnBuscarJefeClick);
        $formEmpleado.on("submit", (e) => { e.preventDefault(); });
        $formBusquedaEmpleados.on("submit", (e) => { e.preventDefault(); })
        //Inicializar Jefes --
        //$modalJefe.on('shown.bs.modal', function (e) {
        //    btnBuscarJefeClick(e);
        //});
        $cmbTipDoc.on('change', function (e) {
            if (e.target.value === "GETD0001") {
                $txtNumDoc.attr("maxlength", '8');
                $txtNumDoc.prop("pattern", "/^\d{8}$/");
            } else if (e.target.value === "GETD0002") {
                $txtNumDoc.attr("maxlength", '12');
                $txtNumDoc.prop("pattern", "");
            } else  {
                app.message.error("Validación", "Debe ingresar un Tipo de Documento para Registrar.");
            }
        })
        $cmbArea.on('change', function (e) {
            var values = e.target.value;
            if (values == "--Todos--") {
                app.message.error("Validación", "Debe Seleccionar una Área para Registrar.");
            }
        });
        ObtenerFiltrosEmpleados();
        if (sessionStorage.getItem('tipoRegEmp') === 'N') {
            $cmbEstado.prop("disabled", true);
        } else if (sessionStorage.getItem('tipoRegEmp') === 'U') {
            $txtNombre.prop("disabled", false);
            $txtApePat.prop("disabled", false);
            $txtApeMat.prop("disabled", false);
            $cmbCargo.prop("disabled", false);
            $cmbArea.prop("disabled", false);
            $txtLugarLaboral.prop("disabled", true);
            $dateFecNac.prop("disabled", false);
            $txtTelefono.prop("disabled", false);
            $txtCorreo.prop("disabled", false);
            $cmbTipDoc.prop("disabled", false);
            $txtNumDoc.prop("disabled", false);
            $cmbSexo.prop("disabled", false);
            $txtDireccion.prop("disabled", false);
            $cmbEmpresa.prop("disabled", false);
            $dateFecIng.prop("disabled", false);
            $cmbTipo.prop("disabled", false);
            $txtJefe.prop("disabled", false);
            $cmbEstado.prop("disabled", false);
            $btnRegistrar.html('<i class="fa fa-pencil-square-o"></i> Editar Empleado');
            $txtCodUbigeo.val(sessionStorage.getItem('ubigeoIdEditar'));
            $txtJefe.prop("disabled", true);
            var title = sessionStorage.getItem('tituloEditarEmpleado');
            $txtTitleEmpleados.html(title);
            $txtCodUbigeo.val(sessionStorage.getItem('ubigeoIdEditar'));
            $txtCodigoJefe.val(objJefe.CodigoJefe);
            
            setTimeout(() => {
                VerEmpleados();
            }, 100);
           
        } else {
            var title = sessionStorage.getItem('tituloVerEmpleado');
            $txtNombre.prop("disabled", true);
            $txtApePat.prop("disabled", true);
            $txtApeMat.prop("disabled", true);
            $cmbCargo.prop("disabled", true);
            $cmbArea.prop("disabled", true);
            $txtLugarLaboral.prop("disabled", true);
            $dateFecNac.prop("disabled", true);
            $txtTelefono.prop("disabled", true);
            $txtCorreo.prop("disabled", true);
            $cmbTipDoc.prop("disabled", true);
            $txtNumDoc.prop("disabled", true);
            $cmbSexo.prop("disabled", true);
            $txtDireccion.prop("disabled", true);
            $cmbEmpresa.prop("disabled", true);
            $dateFecIng.prop("disabled", true);
            $cmbTipo.prop("disabled", true);
            $txtJefe.prop("disabled", true);
            $cmbEstado.prop("disabled", true);
            $btnRegistrar.hide();
            $txtCodUbigeo.val(sessionStorage.getItem('ubigeoIdVer'))
            $btnCancelar.html('<i class="fa fa-arrow-left" aria-hidden="true"></i> Volver a Bandeja');
            $txtTitleEmpleados.html(title);
            $deleteJefe.hide();
            $deleteUbigeo.hide();
            $searchJefe.prop("disabled", true);
            $searchUbigeo.prop("disabled", true);
            setTimeout(() => {
                VerEmpleados();
            }, 100);
        }
    }

    function searchUbigeo_Click() {
        $cmbDepartamento.val("").trigger('change.select2');
        $cmbProvincia.val("").trigger('change.select2');
        $cmbDistrito.val("").trigger('change.select2');
        $cmbProvincia.prop("disabled", true);
        $cmbDistrito.prop("disabled", true);
    }

    function searchJefe_Click() {
        $txtNumDocJefe.val("");
        $txtNombreJefe.val("");
        btnBuscarJefeClick();
    }
    function VerEmpleados() {
        var method = "POST";
        var url = "BandejaEmpleados/ObtenerEmpleados";
        var objFiltro = {
            CodigoEmpleado: sessionStorage.getItem('idEmpleado'),
            Estado:2,
        };
        var objEmp = JSON.stringify(objFiltro);
        var fnDoneCallback = function (data) {
         
            var nombreDistrito = data.Result[0].LugarLaboral.NombreDistrito;
            var nombreDepartamento = data.Result[0].LugarLaboral.NombreDepartamento;
            var nombreProvincia = data.Result[0].LugarLaboral.NombreProvincia;
            $txtNombre.val(data.Result[0].NombresEmpleado);
            $txtApePat.val(data.Result[0].ApellidoPaternoEmpleado);
            $txtApeMat.val(data.Result[0].ApellidoMaternoEmpleado);
            $cmbArea.val(data.Result[0].Cargo.Area.CodigoArea).trigger('change.select2');
            CargarCargos(data.Result[0].Cargo.Area.CodigoArea, data.Result[0].Cargo.CodigoCargo);
            $txtLugarLaboral.val(`${nombreDepartamento === "" ? "" : nombreDepartamento}  ${nombreProvincia === "" ? "" : "/ ".concat(nombreProvincia)}  ${nombreDistrito === "" ? "" : "/ ".concat(nombreDistrito)}`);
            $dateFecNac.val(data.Result[0].FechaNacimientoFormat);
            $txtTelefono.val(data.Result[0].TelefonoEmpleado);
            $txtCorreo.val(data.Result[0].EmailEmpleado);
            $cmbTipDoc.val(data.Result[0].Documento.Parametro).trigger('change.select2');
            $txtNumDoc.val(data.Result[0].NumeroDocumento === "" ? " " : data.Result[0].NumeroDocumento);
            $cmbSexo.val(data.Result[0].SexoEmpleado).trigger('change.select2');
            $txtDireccion.val(data.Result[0].DireccionEmpleado === "" ? "" : data.Result[0].DireccionEmpleado);
            $cmbEmpresa.val(data.Result[0].Empresa.CodValor1).trigger('change.select2');
            $dateFecIng.val(data.Result[0].FechaIngresoFormat);
            $cmbTipo.val(data.Result[0].CodigoTipoEmpleado).trigger('change.select2');
            $cmbEstado.val(data.Result[0].Estado).trigger('change.select2');
            $txtCodigoJefe.val(data.Result[0].CodigoJefe);
            if (data.Result[0].CodigoJefe === 0) {
                $txtJefe.val("");
                return;
            }
            $.when(btnBuscarJefeClick(data.Result[0].CodigoJefe )).done((response) => {
                const { Result } = response;
             
                if (Result[0].CodigoJefe !== 0) {
                    $txtJefe.val("");
                } else {
                    $txtJefe.val(Result[0].NombresCompletosEmpleado);
                }
                
            });
         
        }
        return app.llamarAjax(method, url, objEmp, fnDoneCallback, null, null, null, mensajes.cargandoEmpleados)
    }
    function ObtenerFiltrosEmpleados() {
        var method = "POST";
        var url = "BandejaEmpleados/GrupoFiltrosEmpleados";
        var objEmp = "";
        var fnDoneCallback = function (data) {
            //Carga combo de Empresa:
            var filters1 = {};
            filters1.placeholder = "-- Seleccione --";
            filters1.allowClear = false;
            app.llenarComboMultiResult($cmbEmpresa, data.Result.Empresas, null, "", "", filters1);
            //Carga combo Sexo
            var filters2 = {};
            filters2.placeholder = "-- Seleccione --";
            filters2.allowClear = false;
            app.llenarComboMultiResult($cmbSexo, data.Result.Sexo, null, 0, "", filters2);
            //Carga combo de TipoEmpleado
            var filters3 = {};
            filters3.placeholder = "-- Seleccione --";
            filters3.allowClear = false;
            app.llenarComboMultiResult($cmbTipo, data.Result.TipoEmpleado, null, 0, "", filters3);
            //Cargar combo de Estados:
            if (sessionStorage.getItem('tipoRegEmp') === "N") {
                var filters = {};
                filters.placeholder = "--Seleccione--"
                var estados = { Result: [{ Id: '1', Text: 'Activo' }] };
                app.llenarCombo($cmbEstado, estados, null, null, null, filters);
            } else {
                var filters4 = {};
                filters4.placeholder = "-- Seleccione --";
                filters4.allowClear = false;
                app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, "", "", filters4);
            }
            //Cargar combo de Tipo Documento:
            var filters5 = {};
            filters5.placeholder = "-- Seleccione --";
            filters5.allowClear = false;
            app.llenarComboMultiResult($cmbTipDoc, data.Result.TipoDocumento, null, 0, "", filters5);
            //Cargar combo de Areas
            var filters6 = {};
            filters6.placeholder = "-- Seleccione --";
            filters6.allowClear = false;
            app.llenarComboMultiResult($cmbArea, data.Result.Areas, null,0, "", filters6);
        }
        var fnFailCallback = function () {

        }
        return app.llamarAjax(method, url, objEmp, fnDoneCallback, null, null, null, "")
    }
    function changeArea() {

        const codArea = $(this).val();
            if (codArea != "0") {
                $cmbCargo.prop("disabled", false);
                $btnRegistrar.prop("disabled", false);
                CargarCargos(codArea);
            }
            else {
                $cmbCargo.val("0").trigger("change.select2");
                $cmbCargo.prop("disabled", true);
            }
    }
    function changeCargo() {
        const codCargo = $(this).val();
        if (codCargo == '0') {
            app.message.error("Validación", "Debe Seleccionar un Cargo para continuar");
            $btnRegistrar.prop("disabled", true);
            return;
        } else {
            $btnRegistrar.prop("disabled", false);
        }
    }
    function CargarCargos(codArea, valor) {
        var method = "POST";
        var url = "Utiles/ListarCargosxArea?codArea=" + codArea;
        var objParam = "";
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            for (let i = 0; i < data.Result.length; i++) {

                var x = data.Result[i].Id.split("|");
                if (x[1] == $cmbArea.val()) {
                    var cargos = {
                        Id: x[0],
                        Text: data.Result[i].Text,
                    }
                    resultado.Result.push(cargos);
                }
            }
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbCargo, resultado, null, 0, "--Seleccione--", filters);

            if (valor > 0) {
                $cmbCargo.val(valor).trigger("change.select2");
            }
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoCargos);
    }
    function btnRegistrarClick() {

        if ($txtNombre.val().trim() == null || $txtNombre.val().trim() == "" || $txtNombre.val().trim() == undefined) {
            app.message.error("Validación", "Debe ingresar un nombre al registro.");
            return;
        }
        if ($txtApePat.val().trim() == null || $txtApePat.val().trim() == "" || $txtApePat.val().trim() == undefined) {
            app.message.error("Validación", "Debe ingresar el apellido paterno al registro.");
            return;
        }
        if ($txtApeMat.val().trim() == null || $txtApeMat.val().trim() === "" || $txtApeMat.val().trim() == undefined) {
            app.message.error("Validación", "Debe ingresar el apellido materno al registro.");
            return;
        }
        if ($cmbArea.val() === null || $cmbArea.val() === "0" || $cmbArea.val() == undefined) {
            app.message.error("Validación", "Debe seleccionar un área.");
            return;
        }
        if ($cmbCargo.val() === null || $cmbCargo.val() === "0" || $cmbCargo.val() == undefined) {
            app.message.error("Validación", "Debe seleccionar un cargo.");
            return;
        }
        if ($txtLugarLaboral.val().trim() == null || $txtLugarLaboral.val().trim() == "" || $txtLugarLaboral.val().trim() == undefined) {
            app.message.error("Validación", "Debe seleccionar el lugar laboral del empleado.");
            return;
        }
        if (isNaN($txtTelefono.val().trim()) || $txtTelefono.val() === "") {
            app.message.error("Validación", "Debe ingresar un teléfono.");
            return;
        };

        if ($txtTelefono.val().length != 9 && $txtTelefono.val().length != 7 && $txtTelefono.val().length != 11) {
            app.message.error("Validación", "El número de teléfono ingresado no tiene los dígitos completos.");
            return;
        };
        if ($txtCorreo.val().trim() === "" || $txtCorreo.val().trim() === undefined || $txtCorreo.val().trim() === null) {
            app.message.error("Validacion", "Debe ingresar un correo.");
            return;
        }
        if (!app.validarEmail($txtCorreo.val().trim())) {
            app.message.error("Validacion", "El formato de correo ingresado es incorrecto.");
            return;
        }
        if ($cmbTipDoc.val() === "0" || $cmbTipDoc.val() == undefined || $cmbTipDoc.val() == "--Todos--") {
            app.message.error("Validación", "Debe seleccionar el tipo de documento.");
            return;
        }
        if ($txtNumDoc.val().trim() === "" || $txtNumDoc.val().trim() === null || $txtNumDoc.val().trim() === undefined) {
            app.message.error('Validación', "Debe ingresar un número de documento");
            return;
        }

        if ($cmbTipDoc.val() === "GETD0001" && $txtNumDoc.val().length != 8) {
            app.message.error('Validación', "El número de DNI ingresado es incorrecto");
            return;
        }

        if ($cmbTipDoc.val() === "GETD0001" && isNaN($txtNumDoc.val().trim()) === true) {
            app.message.error('Validación', "El número de DNI ingresado debe ser numérico.");
            return;
        }

        if ($cmbTipDoc.val() === "GETD0002" && $txtNumDoc.val().length != 12) {
            app.message.error('Validación', "El número de Carnet de Extranjeria ingresado es incorrecto");
            return;
        }

        if ($cmbSexo.val() === "0" || $cmbSexo.val() == undefined || $cmbSexo.val() == null) {
            app.message.error("Validación", "Debe seleccionar un sexo.");
            return;
        }
        if ($txtDireccion.val().trim() === "" || $txtDireccion.val().trim() === null || $txtDireccion.val().trim() === undefined) {
            app.message.error("Validación", "Debe ingresar una dirección.");
            return;
        }
        if ($cmbEmpresa.val() === "--Todos--" || $cmbEmpresa.val() === "" || $cmbEmpresa.val() === null || $cmbEmpresa.val() === undefined) {
            app.message.error("Validación", "Debe seleccionar una empresa.");
            return;
        }
        if ($dateFecIng.val().length <8) {
            app.message.error("Validación", "Debe registrar una fecha de ingreso.");
            return;
        }
        if ($cmbTipo.val() === "0" || $cmbTipo.val() === null || $cmbTipo.val() === undefined) {
            app.message.error("Validación", "Debe seleccionar el tipo de empleado.");
            return;
        }
        if ($cmbEstado.val() === "--Todos--" || $cmbEstado.val() === "" || $cmbEstado.val() === null) {
            app.message.error("Validación", "El campo 'Estado' debe Registrarse");
            return;
        }

        var tipo = "";
        var codigo = 0;
        if (sessionStorage.getItem('tipoRegEmp') == "N") {
            tipo = "1";
        }
        else {
            tipo = "2";
            codigo = sessionStorage.getItem('idEmpleado');
        }
        function redirect() {
            app.redirectTo("BandejaEmpleados");
      
        }
        function fnAceptarCallback() {
          
        }
        var reg = function () {

            var method = "POST";
            var url = "BandejaEmpleados/MantenimientoEmpleados";
            var objParam = {
                TipoMantenimiento: tipo,
                CodigoEmpleado: codigo,
                NombresEmpleado: $txtNombre.val(),
                ApellidoPaternoEmpleado: $txtApePat.val(),
                ApellidoMaternoEmpleado: $txtApeMat.val(),
                Cargo: {
                    CodigoCargo: $cmbCargo.val(),
                    Area: {
                        CodigoArea: $cmbArea.val()
                    }
                },
                FechaNacimiento: $dateFecNac.val(),
                LugarLaboral: {
                    UbigeoId: $txtCodUbigeo.val(),
                },
                TelefonoEmpleado: $txtTelefono.val(),
                EmailEmpleado: $txtCorreo.val(),
                DireccionEmpleado: $txtDireccion.val(),
                SexoEmpleado: $cmbSexo.val(),
                Documento: {
                    Parametro: $cmbTipDoc.val(),
                },
                NumeroDocumento: $txtNumDoc.val(),
                Empresa: {
                    CodValor1: $cmbEmpresa.val(),
                },
                CodigoJefe: $txtCodigoJefe.val(),
                FechaIngreso: $dateFecIng.val(),
                TipoEmpleado: $cmbTipo.val(),
                Estado: $cmbEstado.val(),
                FechaRegistroFormat: null,
                UsuarioRegistro: null,
            }
            var objEmpleado = JSON.stringify(objParam);

            var fnDoneCallback = function (data) {

                if (tipo === "1") {
                    app.message.success("Guardar", "Registro Exitoso", "Aceptar", redirect);
                } else {
                    app.message.success("Guardar", "Actualización Exitosa", "Aceptar", redirect);
                }
            }
            var fnFailCallback = function () {
                app.message.error("No se inserto correctamente", "No olvidar que todos los campos se deben rellenar.");
            }

            return app.llamarAjax(method, url, objEmpleado, fnDoneCallback, fnFailCallback, null, mensajes.registrandoCargos);
        }

        return app.message.confirm("Guardar","¿Estás seguro(a) de Guardar los cambios?","Sí","No",reg,null)
    }
    function redirectTo() {
        app.redirectTo("BandejaEmpleados");
    }
    function btnCancelarClick() {
        if (sessionStorage.getItem('tipoRegEmp') == "N") {
            app.message.confirm("Empleados", "¿Estás seguro(a) de cancelar? se borráran los cambios.", "Sí", "No", redirectTo)
        } else if (sessionStorage.getItem('tipoRegEmp') == "U") {
            app.message.confirm("Empleados", "¿Estás seguro(a) de cancelar? se borráran los cambios.", "Sí", "No",redirectTo)
        } else {
            app.redirectTo("BandejaEmpleados")
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
        var codDepartamento = sessionStorage.getItem('codDepartamento');
        var codProvincia = sessionStorage.getItem('codProvincia');
        var codDistrito = sessionStorage.getItem('codDistrito');
        var lugarDestino = "";
        var codigoDestino = "";
        if (codDepartamento != "" && codProvincia == "" && codDistrito == "") {
            codigoDestino = codDepartamento;
            lugarDestino = sessionStorage.getItem('nombreDepartamento');
        }
        else if (codDepartamento != "" && codProvincia != "" && codDistrito == "") {
            codigoDestino = codProvincia;
            lugarDestino = sessionStorage.getItem('nombreDepartamento') + "/" + sessionStorage.getItem('nombreProvincia');
        }
        else {
            codigoDestino = codDistrito;
            lugarDestino = sessionStorage.getItem('nombreDepartamento') + "/" + sessionStorage.getItem('nombreProvincia') + "/" + sessionStorage.getItem('nombreDistrito');
        }

        $txtCodUbigeo.val(codigoDestino);
        $txtLugarLaboral.val(lugarDestino);
        $modalUbigeo.modal('hide');
    }
    function logicUbigeo() {
        $cmbProvincia.prop("disabled", true);
        $cmbDistrito.prop("disabled", true);
        sessionStorage.setItem('codDepartamento', '');
        sessionStorage.setItem('nombreDepartamento', '');
        sessionStorage.setItem('codProvincia', '');
        sessionStorage.setItem('nombreProvincia', '');
        sessionStorage.setItem('codDistrito', '');
        sessionStorage.setItem('nombreDistrito', '');
        obtenerDepartamento();
    }
    function obtenerDepartamento() {
        var method = "POST";
        var url = "Ubigeo/ObtenerUbigeo";
        var ubigeoObj = {}

        var objParam = JSON.stringify(ubigeoObj);
        var fnDoneCallback = function (data) {

            //console.log(data);
            var resultado = { Result: [] };
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
                const nombreDepartamento = $('select[id="cmbDepartamento"] option:selected').text();
                sessionStorage.setItem('codDepartamento', codDepartamento);
                sessionStorage.setItem('nombreDepartamento', nombreDepartamento);
                sessionStorage.setItem('codProvincia', '');
                sessionStorage.setItem('nombreProvincia', '');
                sessionStorage.setItem('codDistrito', '');
                sessionStorage.setItem('nombreDistrito', '');
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
            app.mensajes.error("Error", "No se ejecutó correctamente la carga de departamentos");
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

            sessionStorage.setItem('codProvincia', codProvincia);
            sessionStorage.setItem('nombreProvincia', nombreProvincia);
            sessionStorage.setItem('codDistrito', '');
            sessionStorage.setItem('nombreDistrito', '');
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
            sessionStorage.setItem('codDistrito', codDistrito);
            sessionStorage.setItem('nombreDistrito', nombreDistrito);
        });

        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbDistrito, distritos, $modalUbigeo, "", "<--Seleccione-->", filters)
    }
    function deleteUbigeo() {
        $txtLugarLaboral.val("");
    }
    function deleteJefe() {
        $txtJefe.val("");
    }
    function btnBuscarJefeClick() {
        var method = "POST";
        var url = "BandejaEmpleados/ObtenerEmpleados";
        var objEmpleadoJefe = {
            CodigoEmpleado: 0 ,
            NombreEmpleado: $txtNombreJefe.val(),
            ApellidoPaternoEmpleado: null,
            ApellidoMaternoEmpleado: null,
            CodigoCargo: null,
            TipoDocumento: null,
            NumeroDocumento: $txtNumDocJefe.val(),
            Estado: 1, 
            FechaInicio: null,
            FechaFinal: null
        }
        var objParam = JSON.stringify(objEmpleadoJefe);
        var fnDoneCallback = function (data) {
            cargarTablaJefe(data);
        }
        var fnFailCallback = function (data) {
            cargarTabla();
            app.message.error("AsesorVenta", "La búsqueda no ha encontrado resultados", "Aceptar");
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoJefes)
    }
    function cargarTablaJefe(data) {
        var columns = [
            {
                data: "NumeroDocumento",
                render: function (data, type, row) {
                    if (!data == "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }

                }
            },
            {
                data: "NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (!data == "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                  
                }
            },
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    var rowData = "'" + row.CodigoEmpleado + "'" + "," + "'" + row.NombresCompletosEmpleado + "'" + "," + "'" + row.CodigoJefe + "'";
                    var seleccionar = '<a class="btn btn-default btn-xs" title="Seleccionar" href="javascript:manipularEmpleado.seleccionarJefe(' + rowData + ')">Seleccionar <i class="fa fa-arrow-right" aria-hidden="true"></i></a>'
                    return '<center>' + seleccionar + '</center>'
                }
            }
        ];
        var columnDefs =
        {
            targets: [0],
            visible: false
        }

        var filters =
        {
            dataTableSearching: false,
            dataTablePageLength: 10
        }


        app.llenarTabla($tblJefe, data, columns, columnDefs, "#tblJefe", null, null, filters);
    }
    function seleccionarJefe(CodigoEmpleado, NombreJefe, CodigoJefe) {
        $txtCodigoJefe.val(CodigoEmpleado);
        $txtJefe.val(NombreJefe);
        if (sessionStorage.getItem("tipoRegEmp") === "U") {
            objJefe.CodigoJefe = CodigoJefe;
            objJefe.CodigoEmpleado = CodigoEmpleado;
            objJefe.NombreJefe = NombreJefe;  
        }
        $modalJefe.modal('hide');
        app.message.info("Jefe Seleccionado", ` El Jefe ${NombreJefe} fue seleccionado correctamente.`);
    }
    return {
        seleccionarJefe: seleccionarJefe
    }
})(window.jQuery, window, document)