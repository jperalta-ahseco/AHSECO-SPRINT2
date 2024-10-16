var perfiles = (function ($, win, doc) {
    var $cmbPerfil = $("#cmbPerfil");
    var $btnBuscarUsuarios = $("#btnBuscarUsuarios");
    var $undo_redo = $("#undo_redo");
    var $undo_redo_to = $("#undo_redo_to");
    var $btnGuardar = $("#btnGuardar");

    
    var mensajes = {
        obteniendoPerfiles: "Obteniendo perfiles, por favor espere...",
        guardandoUsuariosPerfil: "Guardando cambios, por favor espere...",
        guardarUsuariosPerfil: "Los cambios se guardaron satisfactoriamente.",
        validacionPerfil: "Debe seleccionar un perfil."
    };

    $(Initialize);

    function Initialize() {
        $btnGuardar.click(btnGuardarClick);
        $btnBuscarUsuarios.click(btnBuscarUsuariosClick);
        $cmbPerfil.change(perfilesChange);
        $undo_redo.multiselect();
        $btnGuardar.prop("disabled", true);
        cargarPerfiles();
    }

    function perfilesChange() {
        $undo_redo.empty();
        $undo_redo_to.empty();
        $btnGuardar.prop("disabled", true);
    }

    function cargarPerfiles() {
        var m = "POST";
        var url = "SeguridadUsuarioPerfil/ObtenerPerfiles";
        var objParam = "";
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbPerfil, data, null, "", "<<--Seleccione-->>", null);
        };
        app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoPerfiles);
    }

    function btnBuscarUsuariosClick() {
        $undo_redo.empty();
        $undo_redo_to.empty();

        if (Validar()) {
            $btnGuardar.prop("disabled", false);
            obtenerUsuariosNoAsignados();
        }
    }

    function Validar() {
        if ($cmbPerfil.val() === null || $cmbPerfil.val() === 0 || $cmbPerfil.val() === -1 || $cmbPerfil.val() === "") {
            app.message.error("Guardar", mensajes.validacionPerfil, "Aceptar", null);
            return false;
        } else {
            return true;
        }
    }

    function obtenerUsuariosNoAsignados() {
        var objPerfil = {
            Id: $cmbPerfil.val()
        };
        var m = "POST";
        var url = "SeguridadUsuarioPerfil/ObtenerUsuariosNoAsignados";
        var objParam = JSON.stringify(objPerfil);
        var fnDoneCallback = function (data) {
            app.llenarComboMultiSelect($undo_redo, data);
            obtenerUsuariosAsignados();
        };
        app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoPerfiles);
    }

    function obtenerUsuariosAsignados() {
        var objPerfil = {
            Id: $cmbPerfil.val()
        };
        var m = "POST";
        var url = "SeguridadUsuarioPerfil/ObtenerUsuariosAsignados";
        var objParam = JSON.stringify(objPerfil);
        var fnDoneCallback = function (data) {
            app.llenarComboMultiSelect($undo_redo_to, data);
        };
        app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoPerfiles);
    }

    function btnGuardarClick() {

        var fnSi = function () {
            var arrAsignados = $("#undo_redo_to option").map(function () {
                if (this.value !== "") {
                    var usuario = {
                        Id: this.value
                    };
                    return usuario;
                }
            }).get();

            var obj = {
                usuarios: arrAsignados,
                perfilDTO: {
                    Id: $cmbPerfil.val()
                }
            };

            var m = "POST";
            var url = "SeguridadUsuarioPerfil/Guardar";
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                app.message.success("Grabar", mensajes.guardarUsuariosPerfil, "Aceptar", null);
            };
            app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoUsuariosPerfil);

        };
        return app.message.confirm("Usuarios", "¿Está seguro que desea guardar asignar los cambios?", "Sí", "No", fnSi, null);

    }

    return {
    };
})(window.jQuery, window, document);