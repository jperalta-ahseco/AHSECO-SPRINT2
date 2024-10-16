var changePassword = (function ($, win, doc) {
    var $txtPasswordActual = $("#txtPasswordActual");
    var $txtPasswordNuevo = $("#txtPasswordNuevo");
    var $txtPasswordConfirmar = $("#txtPasswordConfirmar");
    var $btnGuardar = $("#btnGuardar");
    var $usrsegid = $("#usr_seg_id");
    var $username = $("#usr_seg_usuario");
    var $frmCambiarPassword = $("#frmCambiarPassword");

    var mensajes = {
        guardandoPassword: "Guardando el nuevo password, por favor espere...",
        guardarPassword: "El password se guardó satisfactoriamente."
    };

    $(Initialize);

    function Initialize() {
        $btnGuardar.click(btnGuardarClick);
    }

    function LimpiarFormulario() {
        $frmUsuario[0].reset();
        $("input[type=hidden]").val("");
        $chkHabilitado.prop("checked", true);
        $chkValidarAd.prop("checked", true);
        $tituloModal.html("Nuevo Usuario");
    }

    function btnGuardarClick() {

        if (!validar()) {
            return false;
        }
        var fnSi = function () {
            var objPassword = {
                IdUsuario: $usrsegid.val(),
                PasswordActual: $txtPasswordActual.val(),//7toa($txtPasswordActual.val()),
                PasswordNuevo: $txtPasswordNuevo.val(),// btoa($txtPasswordNuevo.val()),
                PasswordConfirmado: $txtPasswordConfirmar.val(),
                Usuario: $username.val()
            };

            var m = "POST";
            var url = "SeguridadUsuario/ActualizarPassword";
            var objParam = JSON.stringify(objPassword);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    $txtPasswordActual.val('');
                    $txtPasswordNuevo.val('');
                    $txtPasswordConfirmar.val('');
                    document.getElementById('logoutForm').submit();
                };
                app.message.success("Grabar", mensajes.guardarPassword, "Aceptar", fnCallback);

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoPassword);
        }
        return app.message.confirm("Usuarios", "¿Está seguro que desea cambiar la contraseña?", "Sí", "No", fnSi, null);


     }

    function validar() {
        var passActual = $txtPasswordActual.val().trim();
        var passNuevo = $txtPasswordNuevo.val().trim();
        var passConfirmar = $txtPasswordConfirmar.val().trim();

        if (passActual === "" || passActual === null || passActual.length === 0) {
            app.message.error("Guardar", "Ingrese el password actual.", "Aceptar", null);
            return false;
        }
        if (passNuevo === "" || passNuevo === null || passNuevo.length === 0) {
            app.message.error("Guardar", "Ingrese el password nuevo.", "Aceptar", null);
            return false;
        }
        if (passConfirmar === "" || passConfirmar === null || passConfirmar.length === 0) {
            app.message.error("Guardar", "Ingrese el password confirmado.", "Aceptar", null);
            return false;
        }
        if (passNuevo !== passConfirmar) {
            app.message.error("Guardar", "El password nuevo y el confirmado no coinciden.", "Aceptar", null);
            return false;
        }
        
        return true;
    }

})(window.jQuery, window, document);