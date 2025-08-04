var bandejaCargo = (function ($, win, doc) {
    /**Variables */
    var $txtDescripcion = $("#txtDescripcion");
    var $cmbAreas = $("#cmbAreas");
    var $cmbEstado = $("#cmbEstado");
    /**Campos Modal Nuevo*/
    var $txtDescripcionModal = $("#txtDescripcionModal");
    var $cmbAreasModal = $("#cmbAreasModal");
    var $cmbEstadoModal = $("#cmbEstadoModal");
    /**Campos Modal Editar*/
    var $txtDescripcionModalEditar = $("#txtDescripcionModalEditar");
    var $cmbAreasModalEditar = $("#cmbAreasModalEditar")
    var $cmbEstadoModalEditar = $("#cmbEstadoModalEditar");
    var $idCargoModalEditar = $("#idCargoModalEditar");
    /**Tablas */
    var $tblCargo = $("#tblCargo");
    /**Botones */
    var $btnExportar = $("#btnExportar");
    var $btnNuevo = $("#btnNuevo");
    var $btnBuscar = $("#btnBuscar");
    var $btnCerrarCargo = $("#btnCerrarCargo");
    var $btnRegistrarCargo = $("#btnRegistrarCargo");
    var $btnCerrarCargoModal = $("#btnCerrarCargoModal");
    var $btnEditarCargoModal = $("#btnEditarCargoModal");

    /**Modal */
    var $modalCargo = $("#modalCargo");
    var $modalCargoEditar = $("#modalCargoEditar");
    /**Formulario */
    var $formCargo = $("#formCargo");
    
    $(Initialize)
    function Initialize() {
        CargarEstados();
        CargarAreas();
        CargarAreasNuevo();
        CargarAreasEditar();
        $btnBuscar.click(btnBuscarClick);
        $btnNuevo.click(btnNuevoClick);
        $btnExportar.click(btnExportarClick);
        $btnRegistrarCargo.click(btnRegistrarCargoClick);
        $btnEditarCargoModal.click(btnActualizarClick);
        btnBuscarClick();
    }
    var mensajes = {
        obteniendoEstados: "Obteniendo Estado, por favor espere...",
        obteniendoAreas: "Obteniendo Áreas, por favor espere...",
        buscandoCargos: "Buscando Cargos, por favor espere...",
        buscargoareas: "Buscando Áreas, por favor espere...",
        registrandoAreas:"Registrando Áreas, por favor espere..."
    }
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblCargo.DataTable().rows().data().length;
        if (cant === 0) {
            app.message.error("Reporte de Cargos", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "TipoProceso", value: null }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoCargo", value: 0 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreCargo", value: $txtDescripcion.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoArea", value: Number($cmbAreas.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbEstado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaRegistroFormat", value: null }).appendTo("#hidden_fields");
        $formCargo.attr('action', href);
        $formCargo.submit();
      
    }
    function btnNuevoClick() {
        $modalCargo.modal();
        var resultado = { Result: [{ Id: "0", Text: "Inactivo" }, { Id: "1", Text: "Activo" }] }
        app.llenarCombo($cmbEstadoModal, resultado, null, null, null, null)

        $cmbEstadoModal.val("1").trigger("change.select2");
        $cmbEstadoModal.prop("disabled", true);
    }
    function CargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";
        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbEstado, data, null, 2, "--Todos--", filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }
    function CargarAreas() {
        var method = "POST";
        var url = "Utiles/ListarAreas";
        var objParam = "";
        var fnDoneCallback = function (data) {
            var resultado = { Result: [] };
          
            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].Id,
                    Text: data.Result[i].Text
                }
                resultado.Result.push(item);
              
            } 
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbAreas, resultado, null, 0, "--Todos--", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoAreas);
    }


    function CargarAreasNuevo() {
        var method = "POST";
        var url = "Utiles/ListarAreas";
        var objParam = "";
        var fnDoneCallback = function (data) {
            var resultado = { Result: [] };

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].Id,
                    Text: data.Result[i].Text
                }
                resultado.Result.push(item);

            }
            var filters = {};
            filters.placeholder = "-- Seleccionar --";
            filters.allowClear = false;
            app.llenarCombo($cmbAreasModal, resultado, null, 0, "-- Seleccionar --", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoAreas);
    }

    function CargarAreasEditar() {
        var method = "POST";
        var url = "Utiles/ListarAreas";
        var objParam = "";
        var fnDoneCallback = function (data) {
            var resultado = { Result: [] };

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].Id,
                    Text: data.Result[i].Text
                }
                resultado.Result.push(item);

            }
            var filters = {};
            filters.placeholder = "-- Seleccionar --";
            filters.allowClear = false;
            app.llenarCombo($cmbAreasModalEditar, resultado, null, 0, "-- Seleccionar --", filters);
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoAreas);
    }

    function btnBuscarClick() {
        var method = "POST";
        var url = "BandejaCargos/ObtenerCargos";
        var objCargo = {
            CodigoCargo: null,
            NombreCargo: $txtDescripcion.val(),
            CodigoArea: $cmbAreas.val() === null || $cmbAreas.val() === "" || $cmbAreas.val().trim() === "--Todos--" ? 0 : $cmbAreas.val(),
            Estado: $cmbEstado.val() == null || $cmbEstado.val() == "" || $cmbEstado.val().trim()==="--Todos--" ? 2 : $cmbEstado.val(),
        }
  
        var values = Object.values(objCargo);
        var obj = JSON.stringify(objCargo);

      
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function () {
            values.forEach(e => {
                if (typeof e === "string" || "number") {
                    if (e.trim() || e) {
                        app.message.error("La búsqueda de campos está incompleta");
                    }
                } else if (typeof e === "object") {
                    var values = Object.values(e);
                    values.forEach(d => {
                        if ((typeof d === "number" && d === 0)||(d === null && d === undefined)  ) {
                            app.message.error("La búsqueda tuvo un incoveniente con las Áreas solicitadas");
                        }
                    });
                }
            });
            cargarTabla();
        }
        return app.llamarAjax(method, url, obj, fnDoneCallback, fnFailCallback, null, mensajes.buscandoCargos);

    }
    function cargarTabla(data) {
        var columns = [
            { data: "CodigoCargo" },
            { data: "NombreCargo" },
            {
                data: "Estado", render: function (data, type, row) {
                    if (data === 1) {
                        return "Activo"
                    } else if (data === 0) {
                        return "Inactivo"
                    } else {
                        return ""
                    }

                }
            },
            {
                data: "CodigoCargo",
                render: function (data, type, row) {
                    var d = "'" + row.CodigoCargo + "'" + "," + "'" + row.Area.CodigoArea + "'" + "," + "'" + row.NombreCargo + "'" + "," + "'" + row.Estado + "'";
                    var editar = '<a data-toggle="tooltip" data-placement="left" title="Editar Cargo" id="btnEditar" class="btn btn-default btn-xs" title="Editar" href="javascript: bandejaCargo.editar(' + d + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    return '<center>' + editar + '</center>';
                }
            }
        ]
        var columnsDefs = [
            {
                targets: [0],
                visible: false
            }
        ]
        var filters = {
            dataTableSearching: false,
            dataTablePageLength: 10
        };
        app.llenarTabla($tblCargo, data, columns, columnsDefs, "#tblCargo", null, null, filters);
    }
    function btnRegistrarCargoClick(e) {
     
        if ($txtDescripcionModal.val().trim() === "" || $txtDescripcionModal.val().trim() === undefined || $txtDescripcionModal.val().trim() === null) {
            app.message.error("Validación", "Debe ingresar una descripción.");
            return;
        }
        if ($cmbAreasModal.val() === 0 || $cmbAreasModal.val() === "0") {
            app.message.error("Validación", "Debe seleccionar un área.");
            return;
        }
        if ($cmbEstadoModal.val() === "" || $cmbEstadoModal.val() === null) {
            app.message.error("Validación", "Debe seleccionar un estado.");
            return;
        }

        e.preventDefault();
        var fnSi = function () {
            var method = "POST";
            var url = "BandejaCargos/MantenimientoCargos";
            var objCargo = {
                TipoProceso: 1,
                CodigoCargo: null,
                Area: {
                    CodigoArea: Number($cmbAreasModal.val()),
                },
                NombreCargo: $txtDescripcionModal.val(),
                Estado: Number($cmbEstadoModal.val()),
                UsuarioRegistra: null,
                FechaRegistro: "",
            }
            var objParam = JSON.stringify(objCargo);
            var fnDoneCallback = function () {
                app.message.success("Cargos", "Los datos del cargo se guardaron satisfactoriamente.");
                $txtDescripcionModal.val("");
                $cmbAreasModal.val("0");
                $cmbEstadoModal.val("");
                $btnCerrarCargo.click();
            }
            var fnFailCallback = function (data) {
                app.message.error("Error en la inserción", "Los campos deben rellenarse");
                $btnCerrarCargo.click();
            }
            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.registrandoAreas);
        }
        return app.message.confirm("Cargos", "¿Está seguro de guardar el Nuevo Cargo?", "Sí", "No", fnSi, null);
    }
    function editar(codigoCargo, codigoArea, nombreCargo, codigoEstado) {
        var resultado = { Result: [{ Id: "0", Text: "Inactivo" }, { Id: "1", Text: "Activo" }] }

        app.llenarCombo($cmbEstadoModalEditar, resultado, null, null, null, null)
        $cmbEstadoModalEditar.val(codigoEstado).trigger("change.select2");
      
        $cmbAreasModalEditar.val(codigoArea).trigger("change.select2");
        $txtDescripcionModalEditar.val(nombreCargo);
        $idCargoModalEditar.val(codigoCargo);
        $modalCargoEditar.modal();

    }

    function btnActualizarClick() {

        if ($txtDescripcionModalEditar.val().trim() === "" || $txtDescripcionModal.val().trim() === undefined || $txtDescripcionModal.val().trim() === null) {
            app.message.error("Validación", "Debe ingresar una descripción.");
            return;
        }

        if ($cmbAreasModalEditar.val() === "0") {
            app.message.error("Validación", "Debe seleccionar un Área.");
            return;
        }
        if ($cmbEstadoModalEditar.val() === null) {
            app.message.error("Validación", "Debe seleccionar un Estado.");
            return;
        }
        var fnac = function () {
            var method = "POST";
            var url = "BandejaCargos/MantenimientoCargos";
            var objCargo = {
                TipoProceso: 2,
                CodigoCargo: $idCargoModalEditar.val(),
                Area: {
                    CodigoArea: $cmbAreasModalEditar.val(),
                },
                NombreCargo: $txtDescripcionModalEditar.val(),
                Estado: $cmbEstadoModalEditar.val(),
                UsuarioRegistra: null,
                FechaRegistro: null,
            }
            var objParam = JSON.stringify(objCargo);
            var fnDoneCallback = function () {
                app.message.success("Actualizacion Existosa", "Se realizo la actualización existosamente");
                $txtDescripcionModalEditar.val("");
                $cmbAreasModalEditar.val("0");
                $cmbEstadoModalEditar.val("");
                $btnCerrarCargoModal.click();
                btnBuscarClick();
            }
            var fnFailCallback = function (data) {
                app.message.error("Error en la inserción", "Los campos deben rellenarse");
            }
           return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.registrandoAreas);
        }
        return app.message.confirm("Cargos", "¿Estás seguro que deseas actualizar el cargo?", "Sí", "No", fnac,null)
    }
    return {
        editar: editar,
    }

})(window.jQuery, window, document);