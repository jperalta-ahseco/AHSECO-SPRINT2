var usuarios = (function ($, win, doc) {
    var $tblUsuarios = $("#tblUsuarios");
    var $modalUsuario = $("#modalUsuario");
    var $btnGuardar = $("#btnGuardar");
    var $btnCerrar = $("#btnCerrar");
    var $btnExportar = $("#btnExportar");
    var $hdnIdUsuario = $("#hdnIdUsuario");
    var $cmbTipoDocumento = $("#cmbTipoDocumento");
    var $txtNumeroDocumento = $("#txtNumeroDocumento");
    var $txtNombres = $("#txtNombres");
    var $txtApellidos = $("#txtApellidos");
    var $txtEmail = $("#txEmail");
    var $chkHabilitado = $("#chkHabilitado");
    var $txtUsuario = $("#txtUsuario");
    var $txtPassword = $("#txtPassword");
    var $txtUsuarioRed = $("#txtUsuarioRed");
    var $chkValidarAd = $("#chkValidarAd");
    var $frmUsuario = $("#frmUsuario");
    var $frmUsu = $("#frmUsu");
    var $tituloModal = $("#tituloModal");
    var $btnNuevo = $("#btnNuevo");
    var $cmbEjecutora = $("#cmbEjecutora");
    var $cmbEmpleado = $("#cmbEmpleado");


    var mensajes = {
        obteniendoTipoDocs: "Obteniendo tipos de documentos, por favor espere...",
        obteniendoOrganizaciones: "Obteniendo Organizaciones, por favor espere...",
        obteniendoUsuarios: "Obteniendo usuarios, por favor espere...",
        obteniendoUsuario: "Obteniendo datos del usuario, por favor espere...",
        guardandoUsuario: "Guardando datos del usuario, por favor espere...",
        guardarUsuario: "Los datos del usuario se guardaron satisfactoriamente.",
        obteniendoTipoEjecutora: "Obteniendo tipo de usuarios ejecutor, por favor espere...",
        obtenerEmpleados: "Obteniendo los datos del empleados, por favor espere...",
        obtenerReporteSesion: "Generando reporte de sesiones, por favor espere..."
    };

    $(Initialize);

    function Initialize() {
        $btnGuardar.click(btnGuardarClick);
        $btnNuevo.click(btnNuevoClick);
        $chkValidarAd.change(chkValidarAdChange);
        $txtUsuario.change(txtUsuarioChange);
        $btnExportar.click(btnExportarClick);
        cargarTablaUsuarios();
        obtenerTiposDocumentos();
        obtenerEjecutoras();
        //obtenerEmpleados();
    }


    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblUsuarios.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Usuarios", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "Id", value: 0 }).appendTo("#hidden_fields");


        $frmUsu.attr('action', href);
        $frmUsu.submit();
    }

    function obtenerEjecutoras() {
        var m = "POST";
        var url = "SeguridadUsuario/ObtenerEjecutora";
        var objParam = "";
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbEjecutora, data, $modalUsuario, "", "<<Seleccione>>");

        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoTipoEjecutora);
    }

    function obtenerEmpleados() {
        var m = "POST";
        var url = "SeguridadUsuario/ObtenerEmpleados";
        var objParam = "";
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbEmpleado, data, $modalUsuario, "", "<<Seleccione>>");

        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obtenerEmpleados);
    }


    function cargarTablaUsuarios() {
        var method = "POST";
        var url = "SeguridadUsuario/Obtener";
        var data = "";
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        };
        var fnFailCallback = function () {
            cargarTabla();
        };
        app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoUsuarios);
    }

    function obtenerTiposDocumentos() {
        var m = "POST";
        var url = "Utiles/ListarDocumentos";
        var objParam = ""
        var fnDoneCallback = function (data) {
            var filters = {
                allowClear: false
            };
            app.llenarCombo($cmbTipoDocumento, data, null, "", "<<Seleccione>>", filters);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoTipoDocs);
    }

    function btnNuevoClick() {
        $frmUsuario[0].reset();
        $("input[type=hidden]").val("");
        $chkHabilitado.prop("checked", true);
        $chkValidarAd.prop("checked", false);
        $tituloModal.html("Nuevo Usuario");
        $cmbEmpleado.val("-1").trigger("change");
        $cmbEjecutora.val("-1").trigger("change");
    }

    function btnGuardarClick() {

        if (!validarUsuario()) {
            return false;
        }
        var fnSi = function () {
            var objUsuario = {
                Id: $hdnIdUsuario.val().trim(),
                TipoDocumento: {
                    Parametro: $cmbTipoDocumento.val()
                },
                NumeroDocumento: $txtNumeroDocumento.val().trim(),
                Nombres: $txtNombres.val().trim(),
                Apellidos: $txtApellidos.val().trim(),
                Email: $txtEmail.val().trim(),
                Usuario: $txtUsuario.val().trim(),
                Password: $txtPassword.val(),
                UsuarioRed: $txtUsuarioRed.val().trim(),
                IdEjecutor: $cmbEjecutora.val(),
                IdEPS: 0 //$cmbEmpleado.val()
            };

            if ($chkValidarAd.is(":checked")) {
                objUsuario.ValidarAD = "1";
            } else {
                objUsuario.ValidarAD = "0";
            }

            if ($chkHabilitado.is(":checked")) {
                objUsuario.Habilitado = "1";
            } else {
                objUsuario.Habilitado = "0";
            }

            var m = "POST";
            var url = "SeguridadUsuario/Guardar";
            var objParam = JSON.stringify(objUsuario);
            var fnDoneCallback = function (data) {

                if (data.Result.Codigo > 0) {
                    var fnCallback = function () {
                        $btnCerrar.click();
                        cargarTablaUsuarios();
                    };
                    app.message.success("Guardar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Guardar", data.Result.Mensaje, "Aceptar", null);
                    return false;
                }
               
            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoUsuario);
        };
        return app.message.confirm("Usuarios", "¿Está seguro que desea guardar los cambios?", "Sí", "No", fnSi, null);
      
    }

    function cargarTabla(data) {
        var columns = [
            { data: "Id" },
            { data: "Usuario" },
            { data: "Nombres" },
            { data: "Apellidos" },
            { data: "Email" },
            {
                data: "ValidarAD",
                render: function (data, type, row) {
                    if (data === "1") {
                        return "Sí";
                    } else if (data === "0"){
                        return "No";
                    } else {
                        return "No Definido";
                    }
                }
            },
            {
                data: "Habilitado",
                render: function (data, type, row) {
                    if (data === "1") {
                        return "Sí";
                    } else if (data === "0") {
                        return "No";
                    } else {
                        return "No Definido";
                    }
                }
            },
            { data: "FechaUltimaSesion" },
            {
                data: "Id",
                render: function (data, type, row, meta) {
                    var html = "<center>";
                    html += '<a class="btn btn-default btn-xs" title="Editar" href="javascript:usuarios.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                    html += '<a class="btn btn-default btn-xs" title="Generar Sesiones" href="SeguridadUsuario/ReporteSesionUsuario?Id=' + data +'"><i class="fa fa-shield" aria-hidden="true"></i></a>&nbsp;';
                    html += '<a class="btn btn-default btn-xs" title="Auditoria Usuarios" href="SeguridadUsuario/ReporteAuditoriaUsuario?Id=' + data + '"><i class="fa fa-table" aria-hidden="true"></i></a>';
                    html += '</center>'
                    return html;
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        app.llenarTabla($tblUsuarios, data, columns, columnDefs, "#tblUsuarios");
    }

    function editar(idUsuario) {
        var objUsuario = {
            Id: idUsuario
        };
            var m = "POST";
            var url = "SeguridadUsuario/Obtener";
            var objParam = JSON.stringify(objUsuario);
            var fnDoneCallback = function (data) {
                $tituloModal.html("Editar Usuario");
                $hdnIdUsuario.val(data.Result[0].Id);
                $cmbTipoDocumento.val(data.Result[0].TipoDocumento.Parametro).trigger("change.select2");
                $txtNumeroDocumento.val(data.Result[0].NumeroDocumento);
                $txtNombres.val(data.Result[0].Nombres);
                $txtApellidos.val(data.Result[0].Apellidos);
                $txtEmail.val(data.Result[0].Email);
                $txtUsuario.val(data.Result[0].Usuario);
                $txtUsuarioRed.val(data.Result[0].UsuarioRed);
                $txtPassword.val(data.Result[0].Password);
                if (data.Result[0].ValidarAD === "1") {
                    $chkValidarAd.prop("checked", true);
                } else {
                    $chkValidarAd.prop("checked", false);
                }
                if (data.Result[0].Habilitado === "1") {
                    $chkHabilitado.prop("checked", true);
                } else {
                    $chkHabilitado.prop("checked", false);
                }
                $cmbEjecutora.val(data.Result[0].IdEjecutor).trigger("change.select2");
                $cmbEmpleado.val(data.Result[0].IdEPS).trigger("change.select2");
                $modalUsuario.modal();
            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoUsuario);
     }

    function validarUsuario() {
        if ($cmbTipoDocumento.val() === "" || $cmbTipoDocumento.val() === null || $cmbTipoDocumento.val() === "-1") {
            app.message.error("Guardar", "Seleccione un Tipo de Documento.", "Aceptar", null);
            return false;
        }
        if ($txtNumeroDocumento.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese el Número de Documento.", "Aceptar", null);
            return false;
        }

        if ($txtNumeroDocumento.val().trim().length != 8 && $cmbTipoDocumento.val() == "GETD0001") {
            app.message.error("Guardar", "El número de DNI debe tener 8 dígitos.", "Aceptar", null);
            return false;
        }

        if (isNaN($txtNumeroDocumento.val()) ==true && $cmbTipoDocumento.val() == "GETD0001") {
            app.message.error("Guardar", "El número de DNI debe ser numérico.", "Aceptar", null);
            return false;
        }

        if ($txtNumeroDocumento.val().trim().length != 12 && $cmbTipoDocumento.val() == "GETD0002") {
            app.message.error("Guardar", "El número de Carnet de extranjería debe tener 12 carácteres.", "Aceptar", null);
            return false;
        }

        if ($txtNombres.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese el Nombre.", "Aceptar", null);
            return false;
        }
        if ($txtApellidos.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese los Apellidos", "Aceptar", null);
            return false;
        }
        if ($txtEmail.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese el correo electrónico", "Aceptar", null);
            return false;
        }
        if (app.validarEmail($txtEmail.val().trim()) == false) {
            app.message.error("Guardar", "El correo electrónico no tiene el formato correcto", "Aceptar", null);
            return false;
        }
        if ($txtUsuario.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese el Usuario", "Aceptar", null);
            return false;
        }
        if ($txtPassword.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese el Password", "Aceptar", null);
            return false;
        }
        if ($chkValidarAd.is(":checked") && $txtUsuarioRed.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese el Usuario de Red", "Aceptar", null);
            return false;
        }
        return true;
    }

    function chkValidarAdChange() {
        var val = $(this).is(":checked");
        if (val === true) {
            $txtUsuarioRed.prop("disabled", false);
        } else {
            //$txtUsuarioRed.val("");
            $txtUsuarioRed.prop("disabled", true);
        }
    }

    function txtUsuarioChange() {
        $txtUsuarioRed.val($(this).val());
    }

    return {
        editar: editar
    };
})(window.jQuery, window, document);