var manipularServicio = (function ($, win, doc) {
    var $cmbTipoServicio = $("#cmbTipoServicio");
    var $cmbEquipo = $("#cmbEquipo");
    var $cmbMarca = $("#cmbMarca");
    var $cmbModelo = $("#cmbModelo");
    var $cmbEstado = $("#cmbEstado");
    var $txtPrecioPreventivo = $("#txtPrecioPreventivo");
    var $txtPrecioCapacitacion = $("#txtPrecioCapacitacion");
    var $txtPrecioAct = $("#txtPrecioAct");
    var $txtInstrumentos = $("#txtInstrumentos")
    var $txtHerramientas = $("#txtHerramientas");
    var $txtHerramientasEspeciales = $("#txtHerramientasEspeciales");
    var $btnGuardarDetalleServicio = $("#btnGuardarDetalleServicio");
    var $btnGuardar = $("#btnGuardar");
    var $btnCancelar = $("#btnCancelar");
    var $txtDetalleServicio = $("#txtDetalleServicio");

    var $btnAbrirModalServicio = $("#btnAbrirModalServicio");
    var mensajes = {
        registrandoServicio: "Registrando Servicio por favor espere...",
        registrandoActividad:"Registrando Actividad, porfavor espere..."
    }
    $(Initializer)
    function Initializer() {
        $btnGuardar.click(btnGuardarClick);
        $btnCancelar.click(btnCancelarClick);
        $btnAbrirModalServicio.click(btnAbrirModalDetalle);
        $btnGuardarDetalleServicio.click(btnGuardarDetalleServicio)
    }
    function btnGuardarDetalleServicio() {
        if ($txtDetalleServicio.val().trim()) {
            app.message.error("Validación", "Debe ingresar una descripción del detalle de una actividad ", "Aceptar", null);
            return;
        }
        var fnreg = function () {
            var method = "POST";
            var url = "BandejaServicios/InsertarDetalleServicio";
            var objDetalle = {

            }
            var fnDoneCallback = function () {
                app.redirectTo("BandejaServicios")
            }

            var fnFailCallback = function () {

            }
            var data = JSON.stringify(objDetalle);
            return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, mensajes.registrandoServicio)

        }
        return app.message.confirm("Guardar", "¿Está seguro/a de guardar el detalle del servicio?", "Sí", "No", fnreg, null);
    }
    function btnAbrirModalDetalle() {

    }
    function btnGuardarClick() {
        var fnsc = function () {
            var method = "POST";
            var url = "BandejaServicios/MantenientoServicio";
            var objServicio = {
                Equipo:$cmbEquipo.val()
            }
            var data = JSON.stringify(objServicio);
            var fnDoneCallback = function () {
                app.message.success("Guardar", "Se realizo el Servicio exitosamente.");
            }
            return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.registrandoActividad)
        }
        return app.message.confirm("Guardar", "¿Está seguro/a de guardar los cambios?", "Sí", "No",fnsc, null);
    }
    function btnCancelarClick() {
        var fncn = function () {
            app.redirectTo("BandejaServicios")
        }
        return app.message.confirm("Guardar", "¿Está seguro/a de regresar a la bandeja, se perderán los cambios?", "Sí", "No", fncn, null);
    }
})(window.jQuery, window, document);