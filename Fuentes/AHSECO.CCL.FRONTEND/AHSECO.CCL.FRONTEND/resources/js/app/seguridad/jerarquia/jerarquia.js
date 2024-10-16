var jerarquia = (function ($, win, doc) {
    var $btnNuevo = $("#btnNuevo");
    var $tblJerarquia = $("#tblJerarquia");
    var $modalJerarquia = $("#modalJerarquia");
    var $tituloModal = $("#tituloModal");
    var $frmJerarquia = $("#frmJerarquia");
    var $hdnIdJerarquia = $("#hdnIdJerarquia");
    var $cmbOrganoEjecutor = $("#cmbOrganoEjecutor");
    var $cmbEps = $("#cmbEps");
    var $btnGuardar = $("#btnGuardar"); 
    var $btnCerrar = $("#btnCerrar"); 

    var mensajes = {
        obteniendoOrganizaciones: "Obteniendo organizaciones, por favor espere...",
        obteniendoAsociaciones: "Obteniendo asociaciones, por favor espera...",
        obteniendoAsociacion: "Obteniendo asociación, por favor espera...",
        guardandoAsociacion: "Guardando asociación, por favor espere...",
        guardarAsociacion: "La asociación se guardó satisfactoriamente.",
        eliminandoAsociacion: "Eliminando asociación, por favor espere...",
        eliminarAsociacion: "La asociación se eliminó satisfactoriamente."
    };

    $(Initialize);

    function Initialize() {
        $btnNuevo.click(btnNuevoClick);
        $btnGuardar.click(btnGuardarClick);
        obtenerJerarquias();
        obtenerOrgEjecutor();
        obtenerEPSs();
    }

    function obtenerJerarquias() {
        var method = "POST";
        var url = "SeguridadJerarquia/ObtenerJerarquias";
        var data = "";
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        };
        var fnFailCallback = function () {
            cargarTabla();
        };
        app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoAsociaciones);
    }

    function obtenerOrgEjecutor() {
        var m = "POST";
        var url = "SeguridadJerarquia/ObtenerOrganizaciones";
        var data = { indicadorEje: true, indicadorEPS:false };
        var param = JSON.stringify(data);
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbOrganoEjecutor, data, $modalJerarquia, "", "<<Seleccione>>");
        };
        return app.llamarAjax(m, url, param, fnDoneCallback, null, null, mensajes.obteniendoOrganizaciones);
    }


    function obtenerEPSs() {
        var m = "POST";
        var url = "SeguridadJerarquia/ObtenerOrganizaciones";
        var data = { indicadorEje: false, indicadorEPS: true };
        var param = JSON.stringify(data);
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbEps, data, $modalJerarquia, "", "<<Seleccione>>");
        };
        return app.llamarAjax(m, url, param, fnDoneCallback, null, null, mensajes.obteniendoOrganizaciones);
    }

    function btnNuevoClick() {
        $frmJerarquia[0].reset();
        $('select').trigger("change.select2");
        $("input[type=hidden]").val("");
        $cmbOrganoEjecutor.val("-1").trigger("update");
        $tituloModal.html("Nueva Jerarquía");
    }

    function btnGuardarClick() {
        if (!validar()) {
            return false;
        }
        var obj = {
            Id: $hdnIdJerarquia.val(),
            Ejecutor: {
                Id: $cmbOrganoEjecutor.val()
            },
            Eps: {
                Id: $cmbEps.val()
            }
        };
        var m = "POST";
        var url = "SeguridadJerarquia/Guardar";
        var objParam = JSON.stringify(obj);
        var fnDoneCallback = function (data) {
            var fnCallback = function () {
                $btnCerrar.click();
                obtenerJerarquias();
            };
            app.message.success("Grabar", mensajes.guardarAsociacion, "Aceptar", fnCallback);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoAsociacion);
    }

    function cargarTabla(data) {
        var columns = [
            { data: "Id" },
            { data: "Ejecutor.RazonSocial" },
            { data: "Eps.RazonSocial" },
            {
                data: "Id",
                render: function (data, type, row, meta) {
                    var editar = '<a class="btn btn-default btn-xs" title="Editar" href="javascript:jerarquia.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    var eliminar = ' <a class="btn btn-default btn-xs" title="Eliminar" href="javascript:jerarquia.eliminar(' + data + ')"><i class="fa fa-trash" aria-hidden="true"></i></a>';
                    return '<center>' + editar + eliminar + '</center>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        app.llenarTabla($tblJerarquia, data, columns, columnDefs, "#tblJerarquia");
    }

    function editar(idJerarquia) {
        var obj = {
            Id: idJerarquia
        };
        var m = "POST";
        var url = "SeguridadJerarquia/ObtenerJerarquias";
        var objParam = JSON.stringify(obj);
        var fnDoneCallback = function (data) {
            $tituloModal.html("Editar Jerarquía");
            $hdnIdJerarquia.val(data.Result[0].Id);
            $cmbOrganoEjecutor.val(data.Result[0].Ejecutor.Id).trigger("change.select2");
            $cmbEps.val(data.Result[0].Eps.Id).trigger("change.select2");
            $modalJerarquia.modal();
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoAsociacion);
    }

    function validar() {
        if ($cmbOrganoEjecutor.val() === "" || $cmbOrganoEjecutor.val() === null || $cmbOrganoEjecutor.val() === "-1") {
            app.message.error("Guardar", "Seleccione una Organización Ejecutora", "Aceptar", null);
            return false;
        }
        if ($cmbEps.val() === "" || $cmbEps.val() === null || $cmbEps.val() === "-1") {
            app.message.error("Guardar", "Seleccione una Organización EPS", "Aceptar", null);
            return false;
        }

        var data = $tblJerarquia.DataTable().rows().data();
        // var count = data.filter((x => x.Ejecutor.Id == $cmbEps.val() && $cmbEps.val() != $cmbOrganoEjecutor.val()) || x.Eps.Id == $cmbEps.val()).length;
        var count = data.filter(x => x.Eps.Id == $cmbEps.val() || x.Eps.Id == $cmbOrganoEjecutor.val()).length;
        if (count > 0 && !$hdnIdJerarquia.val()) {
            app.message.error("Guardar", "Ya existe la relación.", "Aceptar", null);
            return false;
        }

        return true;
    }

    function eliminar(idJerarquia) {
        var fnSi = function () {
            ejecutaEliminar(idJerarquia);
        };
        return app.message.confirm("Asociaciones", "¿Está seguro que desea eliminar la asociación Ejecutor - EPS?", "Sí", "No", fnSi, null);
        
    }

    function ejecutaEliminar(idJerarquia) {
        var obj = {
            Id: idJerarquia
        };
        var m = "POST";
        var url = "SeguridadJerarquia/Eliminar";
        var objParam = JSON.stringify(obj);
        var fnDoneCallback = function (data) {
            var fnCallback = function () {
                obtenerJerarquias();
            };
            app.message.success("Eliminar", mensajes.eliminarAsociacion, "Aceptar", fnCallback);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.eliminandoAsociacion);
    }

    return {
        editar: editar,
        eliminar: eliminar
    };
})(window.jQuery, window, document);