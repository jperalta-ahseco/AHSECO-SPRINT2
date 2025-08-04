var MantenimientosOrgFinanciadora = (function ($, win, doc) {
    var $btnBuscar = $("#btnBuscar");
    var $txtFiltro = $("#txtFiltro");
    var $hdnIdOrganizacion = $("#hdnIdOrganizacion");
    var $txtRuc = $("#txtRuc");
    var $txtRazonSocial = $("#txtRazonSocial");
    var $lblEstado = $("#lblEstado");
    var $cmbDepartamento = $("#cmbDepartamento");
    var $cmbProvincia = $("#cmbProvincia");
    var $cmbDistrito = $("#cmbDistrito");
    var $txtDireccion = $("#txtDireccion");
    var $chkIndicadorEje = $("#chkIndicadorEje");
    var $chkIndicadorEPS = $("#chkIndicadorEPS");
    var $btnCerrar = $("#btnCerrar");
    var $btnGuardar = $("#btnGuardar");
    var $btnNuevo = $("#btnNuevo");
    var $modalOrganizacion = $("#modalOrganizacion");
    var $tituloModal = $("#tituloModal");
    var $tblOrganizaciones = $("#tblOrganizaciones");
    var $formRegistro = $("#formRegistro");
    var $modalCambiarEstado = $("#modalCambiarEstado");
    var $hdnIdOrganizacion2 = $("#hdnIdOrganizacion2");
    var $cmbEstado = $("#cmbEstado");
    var $btnCerrarCambiarEstado = $("#btnCerrarCambiarEstado");
    var $btnGuardarCambiarEstado = $("#btnGuardarCambiarEstado");
    var $txtEmail = $("#txtEmail");
    

    var mensajes = {
        obteniendoOrganizaciones: "Obteniendo organizaciones, por favor espere...",
        validacionEditar: "Debe seleccionar un registro de la lista.",
        obteniendoOrganizacion: "Obteniendo los datos de la organización, por favor espere...",
        obteniendoUbigeos: "Obteniendo ubigeos, por favor espere...",
        obteniendoDepartamentos: "Obteniendo departamentos, por favor espere...",
        obteniendoProvincias: "Obteniendo provincias, por favor espere...",
        obteniendoDistritos: "Obteniendo distritos, por favor espere...",
        guardandoOrganizacion: "Guardando organizacion, por favor espere...",
        guardarOrganizacion: "Los datos de la organización se guardaron satisfactoriamente.",
        guardandoCambioEstado: "Guardando cambio de estado, por favor espere...",
        guardarCambioEstado: "El cambio de estado se realizó correctamente.",
        obteniendoEstados: "Obteniendo estados, por favor espere..."
    };

    $(initialize);

    function initialize() {
        $btnBuscar.click(btnBuscarClick);
        $btnGuardar.click(btnGuardarClick);
        $cmbDepartamento.change(cmbDepartamentoChange);
        $cmbProvincia.change(cmbProvinciaChange);
        $btnNuevo.click(btnNuevoClick);
        $btnGuardarCambiarEstado.click(btnGuardarCambiarEstadoClick);

        btnBuscarClick();
    }

    function btnBuscarClick() {
        var objOrganizacion = {
            Ruc: $txtFiltro.val().trim(),
            RazonSocial: $txtFiltro.val().trim()
        };
        var m = "POST";
        var url = "Organizaciones/ObtenerOrganizacion";
        var objParam = JSON.stringify(objOrganizacion);
        var fnDoneCallback = function (data) {
            llenarTabla(data);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoOrganizaciones);
    }

    function llenarTabla(data) {
        var columns = [
            { data: "Id" },
            { data: "Ruc" },
            { data: "RazonSocial" },
            { data: "UbigeoDepartamento" },
            { data: "UbigeoProvincia" },
            { data: "UbigeoDistrito" },
            { data: "Estado.Descripcion" },
            {
                data: "Id",
                render: function (data, type, row) {
                    var editar = ' <a class="btn btn-default btn-xs" title="Editar" href="javascript:MantenimientosOrgFinanciadora.editar(' + data + ')"><i class="fa fa-edit" aria-hidden="true"></i></a>';
                    var habilitar = ' <a class="btn btn-default btn-xs" title="Cambiar estado" href="javascript:MantenimientosOrgFinanciadora.cambiarEstado(' + data + ',\'' + row.Estado.Parametro + '\')"><i class="glyphicon glyphicon-cog" aria-hidden="true"></i></a>';
                    return '<div style="text-align:center">' + editar + habilitar + '</div>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        var filters = {
            dataTableSearching: false,
            dataTablePageLength: 10
        };
        app.llenarTabla($tblOrganizaciones, data, columns, columnDefs, "#tblOrganizaciones", null, null, filters);
    }

    function editar(id) {
        if (id === null || id === "" || id <= 0) {
            return app.message.error("Mantenimientos", mensajes.validacionEditar, "Aceptar", null);
        }

        var objOrganizacion = {
            Id: id
        };

        var m = "POST";
        var url = "Organizaciones/ObtenerOrganizacion";
        var objParam = JSON.stringify(objOrganizacion);
        var fnDoneCallback = function (data) {
            mostrarOrganizacion(data.Result[0]);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoOrganizacion);
    }

    function mostrarOrganizacion(data) {
        $tituloModal.html("Editar Organización");
        $hdnIdOrganizacion.val(data.Id);
        $txtRuc.val(data.Ruc);
        $txtRazonSocial.val(data.RazonSocial);
        $txtDireccion.val(data.Direccion);
        $lblEstado.html(data.Estado.Descripcion);
        obtenerUbigeos(data.CodigoUbigeoDepartamento, data.CodigoUbigeoProvincia, data.CodigoUbigeoDistrito);
        $chkIndicadorEje.prop("checked", data.IndicadorEje);
        $chkIndicadorEPS.prop("checked", data.IndicadorEPS);
        $txtEmail.val(data.Email);
        $modalOrganizacion.modal();
    }

    function obtenerUbigeos(DepartamentoId, ProvinciaId, DistritoId) {
        var data = {
            departamento: {
                UbigeoId: DepartamentoId
            },
            provincia: {
                UbigeoId: ProvinciaId
            },
            Distrito: {
                UbigeoId: DistritoId
            }
        };
        var m = "POST";
        var url = "Utiles/obtenerUbigeos";
        var objParam = JSON.stringify(data);
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbDepartamento, data.Result.Departamentos, $modalOrganizacion, "", "<<--Seleccione-->>");
            $cmbDepartamento.val(DepartamentoId).trigger("change.select2"); //EL combo de departamentos ya se lleno

            app.llenarCombo($cmbProvincia, data.Result.Provincias, $modalOrganizacion, "", "<<--Seleccione-->>");
            $cmbProvincia.val(ProvinciaId).trigger("change.select2");

            app.llenarCombo($cmbDistrito, data.Result.Distritos, $modalOrganizacion, "", "<<--Seleccione-->>");
            $cmbDistrito.val(DistritoId).trigger("change.select2");
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoUbigeos);
    }

    function cmbDepartamentoChange() {
        var departamentoId = $(this).val();
        if (!departamentoId) {
            var data = {
                Result: []
            };
            app.llenarCombo($cmbProvincia, data, $modalOrganizacion, "", "<<--Seleccione-->>");
            app.llenarCombo($cmbDistrito, data, $modalOrganizacion, "", "<<--Seleccione-->>");
            return false;
        }
        obtenerProvincias(departamentoId);
    }

    function cmbProvinciaChange() {
        var departamentoId = $cmbDepartamento.val();
        var data = {
            Result: []
        };
        if (!departamentoId) {
            app.llenarCombo($cmbProvincia, data, $modalOrganizacion, "", "<<--Seleccione-->>");
            app.llenarCombo($cmbDistrito, data, $modalOrganizacion, "", "<<--Seleccione-->>");
            return false;
        }
        var provinciaId = $(this).val();
        if (!provinciaId) {
            app.llenarCombo($cmbDistrito, data, $modalOrganizacion, "", "<<--Seleccione-->>");
            return false;
        }
        obtenerDistritos(departamentoId, provinciaId);
    }

    function obtenerProvincias(departamentoId) {
        var data = {
            departamento: {
                UbigeoId: departamentoId
            },
            provincia: {}
        };

        var m = "POST";
        var url = "Utiles/obtenerProvincias";
        var objParam = JSON.stringify(data);
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbProvincia, data, $modalOrganizacion, "", "<<--Seleccione-->>");
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoProvincias);
    }

    function obtenerDistritos(departamentoId, provinciaId) {
        var data = {
            departamento: {
                UbigeoId: departamentoId
            },
            provincia: {
                UbigeoId: provinciaId
            },
            distrito: {}
        };
        var m = "POST";
        var url = "Utiles/obtenerDistritos";
        var objParam = JSON.stringify(data);
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbDistrito, data, $modalOrganizacion, "", "<<--Seleccione-->>");
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoDistritos);
    }

    function btnGuardarClick() {

        if ($txtRuc.val().trim().length != 11) {
            app.message.info("Guardar", "Debe escribir un RUC válido.");
            return false;
        }
        if (!app.validarEmail($txtEmail.val())) {
            app.message.info("Guardar", "Debe escribir un email válido.");
            return false;
        }

        var objOrganizacion = {
            Id: $hdnIdOrganizacion.val(),
            Ruc: $txtRuc.val(),
            RazonSocial: $txtRazonSocial.val(),
            CodigoUbigeoDepartamento: $cmbDepartamento.val(),
            UbigeoDepartamento: $cmbDepartamento.select2('data')[0].text,
            CodigoUbigeoProvincia: $cmbProvincia.val(),
            UbigeoProvincia: $cmbProvincia.select2('data')[0].text,
            CodigoUbigeoDistrito: $cmbDistrito.val(),
            UbigeoDistrito: $cmbDistrito.select2('data')[0].text,
            Direccion: $txtDireccion.val(),
            IndicadorEje: $chkIndicadorEje.prop("checked"),
            IndicadorEPS: $chkIndicadorEPS.prop("checked"),
            Email: $txtEmail.val()
        };
        var m = "POST";
        var url = "Organizaciones/Guardar";
        var objParam = JSON.stringify(objOrganizacion);
        var fnDoneCallback = function () {
            var fnSuccess = function () {
                $btnCerrar.click();
                btnBuscarClick();
            };
            app.message.error("Guardar", mensajes.guardarOrganizacion, "Aceptar", fnSuccess);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoOrganizacion);
    }

    function btnNuevoClick() {
        $formRegistro[0].reset();
        
        $("input[type=hidden]").val("");
        $tituloModal.html("Nueva Organización");
        obtenerUbigeos("-1", "-1", "-1");
    }

    function cambiarEstado(idOrganizacion, parametro) {
        $hdnIdOrganizacion2.val(idOrganizacion);
        obtenerEstado(parametro);
        $modalCambiarEstado.modal();
    }

    function obtenerEstado(parametro) {
        var m = "POST";
        var url = "Organizaciones/ObtenerEstados";
        var objParam = "";
        var fnDoneCallback = function (data) {
            var filters = {
                allowClear: false
            };
            app.llenarCombo($cmbEstado, data, null, "", "",filters);
            $cmbEstado.val(parametro).trigger("change.select2");
            $cmbEstado.find("option[value="+parametro+"]").remove();
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }

    function btnGuardarCambiarEstadoClick() {
        var objOrganizacion = {
            Id: $hdnIdOrganizacion2.val(),
            Estado: {
                Parametro: $cmbEstado.val()
            }
        };
        var m = "POST";
        var url = "Organizaciones/CambiarEstado";
        var objParam = JSON.stringify(objOrganizacion);
        var fnDoneCallback = function () {
            var fnSuccess = function () {
                $btnCerrarCambiarEstado.click();
                btnBuscarClick();
            };
            app.message.error("Guardar", mensajes.guardarCambioEstado, "Aceptar", fnSuccess);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoCambioEstado);
    }

    return {
        editar: editar,
        cambiarEstado: cambiarEstado
    };
})(window.jQuery, window, document);