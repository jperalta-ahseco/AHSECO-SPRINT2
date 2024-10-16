var asignacionTerritorial = (function ($, win, doc){
    /*Inputs textos*/
    var $txtCliente = $('#txtCliente');
    var $txtNomEmpresa = $('#txtNomEmpresa');
    var $txtRuc = $('#txtRuc');
    var $deleteCliente = $("#deleteCliente");
    var $txtCodCliente = $('#txtCodCliente');
    /*Combos*/
    var $cmbAsesorVenta = $('#cmbAsesorVenta');
    var $cmbAsigAsesorVenta = $('#cmbAsigAsesorVenta');
    /*Botones*/
    var $btnAsignar = $('#btnAsignar');
    var $btnBuscar = $('#btnBuscar');
    var $btnExportar = $('#btnExportar');
    var $btnBuscarClientes = $('#btnBuscarClientes');
    var $checkSeleccionar = $('#checkSeleccionar');
    var $checkSeleccionarTodos = $('#checkSeleccionarTodos');
    var $btnCerrar = $('#btnCerrar');
    var $btnEjecutarAsignacion = $('#btnEjecutarAsignacion');
    /*Tabla*/
    var $tblAsignacion = $('#tblAsignacion');
    var $tblClientes = $('#tblClientes');
    var $formMantAsignacion = $('#formMantAsignacion');
    /*Modal*/
    var $modalBusquedaClientes = $('#modalBusquedaClientes');
    var $modalAsignacion = $('#modalAsignacion');

    var mensajes = {
        llenarEmpleados: "Buscando Empleados, por favor espere....",
        llenarAsignaciones: "Buscando Clientes, por favor espere...."
    }

    $(Initialize);

    function Initialize() {
        asignacionTerritorial.xasignar = [];
        asignacionTerritorial.datos = [];
        btnCheck();
        cargarAsesoresVenta();
        ObtenerListClientevsAsesor();
        generarClientes();
        $btnExportar.click(btnExportarClick)
        $deleteCliente.click(deleteClienteClick);
        $btnAsignar.click(btnAsignarClick);
        $btnBuscar.click(btnBuscarClick);
        $btnCerrar.click(btnCerrarClick);
        $btnBuscarClientes.click(btnBuscarClientesClick);

        asignacionTerritorial.asesorSelect = "";
        $cmbAsigAsesorVenta.on('change', function () {
            asignacionTerritorial.asesorSelect = $('select[id="cmbAsigAsesorVenta"] option:selected').text();
        });

        $btnEjecutarAsignacion.click(btnEjecutarAsignacionClick);
    }
    function cargarAsesoresVenta() {
        var method = "POST";
        var url = "BandejaAsesorVenta/ObtenerAsesorVenta";
        var objGenerales = {
            CodigoCargo: "5", //Cargo: 5 = Asesor de ventas.
            Estado : "2"
        }
        var objParams = JSON.stringify(objGenerales);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };
            var contenedorAsesores = { Result: [] };

            var no_asignados = {
                Id: 0,
                Text: "Sin Asignar"
            };
            resultado.Result.push(no_asignados);

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].CodigoEmpleado,
                    Text: data.Result[i].NombresCompletosEmpleado
                }
                if (data.Result[i].Estado == true) {
                    var item2 = {
                        Id: data.Result[i].CodigoEmpleado,
                        Text: data.Result[i].NombresCompletosEmpleado
                    }
                    contenedorAsesores.Result.push(item2);
                }
                resultado.Result.push(item);
            };
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbAsesorVenta, resultado, null, "todos", "-- Todos --", filters);

            var filters2 = {};
            filters.placeholder = "--Seleccione--";
            filters.allowClear = false;
            app.llenarCombo($cmbAsigAsesorVenta, contenedorAsesores, $modalAsignacion, 0, "--Seleccione--", filters2);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.llenarEmpleados);
    }
    /*Funciones Click*/
    function btnCerrarClick() {
            $modalAsignacion.modal('toggle');
    }

    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblClientes.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Asignacion de Clientes", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "Id_Cliente", value: $txtCliente.val() }).appendTo("#hidden_fields");

        $formMantAsignacion.attr('action', href);
        $formMantAsignacion.submit();
    }
    function deleteClienteClick() {
        $txtCliente.val("");
        $txtCodCliente.val("");
    }

    function btnEjecutarAsignacionClick() {

        var validador = asesor = [];
        validador.asesor = [];
        validador.clientes = [];

        if ($cmbAsigAsesorVenta.val() == " " || $cmbAsigAsesorVenta.val() == 0 || $cmbAsigAsesorVenta.val() == undefined) {
            app.message.error("Asignacion Manual", "Debe de seleccionar por lo menos un asesor.")
            return;
        };

        for (var i = 0; asignacionTerritorial.xasignar.length > i; i++) {
            idcliente = asignacionTerritorial.xasignar[i];
            asignacionTerritorial.datos.find((value, index) => {
                if (parseInt(value.Cliente.ID) == idcliente) {
                    validador.clientes.push(value);
                };
            });
        };

        for (var i = 0; validador.clientes.length > i; i++) {
            if (validador.clientes[i].Empleado.NombresCompletosEmpleado == asignacionTerritorial.asesorSelect) {
                app.message.error("Asignacion Manual", "El(Los) cliente(s) no se puede(n) asignar al mismo asesor que ya tiene(n) asignado.")
                return
            };
        };

        validador.clientes.find((value, index) => {
            if (value.Empleado.NombresCompletosEmpleado != "") {
                validador.asesor.push(value.Cliente.ID);
            };
        });


        if (validador.asesor.length >= 1) {

            var fnSi = function () {
                ejecutaEliminar(validador.asesor);
                asignar(asignacionTerritorial.xasignar)
                asignacionTerritorial.xasignar = [];
                app.message.success("Asignacion Manual", "Se realizo la re-asignacion correctamente.");
                $cmbAsigAsesorVenta.val("0").trigger("change.select2");
                $checkSeleccionarTodos.prop("checked", false);
                $modalAsignacion.modal('toggle');
            };
            return app.message.confirm("Asignacion Manual", "Existe(n) cliente(s) que se encuentra(n) asignado(s),"+'\n'+ "Desea reasignarlo(s)?", "Si", "No", fnSi, null);
        }

        var fnSi = function () {
            asignar(asignacionTerritorial.xasignar);
            app.message.success("Asignacion Manual", "Se realizo la asignacion correctamente.");
            asignacionTerritorial.xasignar = [];
            $checkSeleccionarTodos.prop("checked", false);
            $modalAsignacion.modal('toggle');
        };
        return app.message.confirm("Asignacion Manual", "Esta seguro que desea asignar el(los) cliente(s) al asesor de ventas?", "Si", "No", fnSi, null);
    }

    function btnAsignarClick() {

        if (asignacionTerritorial.xasignar.length === 0) {
            app.message.error("Asignacion Manual", "Debe de seleccionar por lo menos un cliente.")
            return
        };

        $modalAsignacion.modal('show');
        $('select[id="cmbAsigAsesorVenta"] option[value=""]').text("CASA");
    }

    function btnBuscarClick() {
        var method = "POST";
        var url = "AsignacionManual/ObtenerListClientevsAsesor";
        var objConsulta = {
            Id_Cliente: $txtCodCliente.val(),
            Id_Empleado: $cmbAsesorVenta.val() == "todos"?null : $cmbAsesorVenta.val()
        }
        var objParams = JSON.stringify(objConsulta);
        var fnDoneCallback = function (data) {
            cargarTabla(data)
            asignacionTerritorial.xasignar = []
            $checkSeleccionarTodos.prop('checked', false);
        }
        var fnFailCallback = function (data) {
            app.mensajes.error("Asignacion Manual", "Se produjo un error con la búsqueda")
            return
        }

        app.llamarAjax(method, url, objParams, fnDoneCallback, fnFailCallback, null, mensajes.llenarAsignaciones);
    }
    function btnBuscarClientesClick() {
        var method = "POST";
        var url = "BandejaCliente/ObtenerClientes";
        var cliObj = {
            RUC: $txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val()
        }
        var objParam = JSON.stringify(cliObj);

        if (isNaN($txtRuc.val())) {
            app.message.error("Asignacion Manual", "El RUC debe ser un numero de 11 digitos");
            return
        }
        var fnDoneCallback = function (data) {
            cargarTablaClientes(data);
        }

        var fnFailCallback = function (data) {
            cargarTabla()
        }

        app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.llenarAsignaciones);
    }
    function btnCheck() {
        $(document).on('change', '#checkSeleccionar', function (e) {
            if (this.checked) {
                asignacionTerritorial.xasignar.push(this.value);
            }
            else {
                asignacionTerritorial.xasignar=asignacionTerritorial.xasignar.filter(valor => valor != this.value);
            }
        });

        $(document).on('change', '#checkSeleccionarTodos', function (e) {
            if (this.checked) {
                $checkSeleccionar.prop('checked', true);
                $('input').filter('#checkSeleccionar').prop('checked', true);
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                var a = [];
                for (var i = 0; i < ids.length; i++) {
                    asignacionTerritorial.xasignar.push(ids[i].value); 
                }
            }
            else {
                $('input').filter('#checkSeleccionar').prop('checked', false);
                asignacionTerritorial.xasignar = []
            }
        });
    }
    function asignar(clientes) {
        var method = "POST";
        var url = "AsignacionManual/Mantenimiento";

        var objAsignacion = {
            Id_ClienteList: clientes,
            Id_Empleado: $cmbAsigAsesorVenta.val(),
            Eliminar: 0
        }
        var objParams = JSON.stringify(objAsignacion);
        var fnDoneCallback = function () {
            ObtenerListClientevsAsesor();
        }
        var fnFailCallBack = function () {
            app.message.error("Asignacion Manual", "Se produjo un error en la asignación.");
            return
        }
        
        app.llamarAjax(method, url, objParams, fnDoneCallback, fnFailCallBack, null, mensajes.llenarAsignaciones);
    }

    function seleccionar(id, NomEmpresa) {
        $txtCodCliente.val(id);
        $txtCliente.val(NomEmpresa);
        $modalBusquedaClientes.modal('toggle')
    }
    /*Fin Funciones Click*/
    function generarClientes() {
        var method = "POST";
        var url = "BandejaCliente/ObtenerClientes";
        var cliObj = {
            RUC: $txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val()
        }
        var objParam = JSON.stringify(cliObj);
        var fnDoneCallback = function (data) {
            cargarTablaClientes(data);
        }

        var fnFailCallback = function (data) {
            cargarTabla()
        }

        app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.llenarAsignaciones);
    }
    function ObtenerListClientevsAsesor() {
        var method = "POST";
        var url = "AsignacionManual/ObtenerListClientevsAsesor";
        var objConsulta = {
            Id_Cliente: 0, 
            Id_Empleado: null
        }
        var objParams = JSON.stringify(objConsulta);
        var fnDoneCallback = function (data) {
            cargarTabla(data)
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.llenarAsignaciones);
    }
    function cargarTabla(data) {
        asignacionTerritorial.datos = []
        asignacionTerritorial.datos = data.Result;
        var columns = [
            {
                data: "Cliente.ID",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: {
                    cliente: "Cliente.ID",
                    estado: "Cliente.Estado"
                },
                render: function (data, type, row) {
                    if (data.Cliente.Estado == true) {
                        var seleccionar = '<input class="form-check-input cheks" name="checkSeleccionar" type="checkbox" value="' + data.Cliente.ID + '" id="checkSeleccionar">';
                    }
                    else {
                        var seleccionar = '<input disabled class="form-check-input cheks" name="" type="checkbox" title="inactivo">';
                    }
                    return '<center>' + seleccionar + '</center>';

                }
            },
            {
                data: "Cliente.RUC",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cliente.NomEmpresa",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Empleado.NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (data != "") {
                        return '<center>' + data + '</center>';
                    }
                    else {
                        return '<center>' + "Sin asignar" + '</center>';
                    }
                }
            }
        ];
        var columnsDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        app.llenarTabla($tblAsignacion, data, columns, columnsDefs, "#tblAsignacion")
    }

    function ejecutaEliminar(clientes) {
        
        var method = "POST";
        var url = "AsignacionManual/Mantenimiento";
        var objAsignacion = {
            Id_ClienteList: clientes,
            Id_Empleado: 0,
            Eliminar: true
        }
        var objParams = JSON.stringify(objAsignacion);
        var fnDoneCallback = function () {
        }
        var fnFailCallback = function () {
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, fnFailCallback, null, mensajes.llenarAsignaciones);
    }
    function cargarTablaClientes(data) {
        var columns = [
            { data: "ID" },
            { data: "RUC" },
            { data: "NomEmpresa" },
            { data: "Categoria" },
            { data: "UbigeoDepartamento.Descripcion" },
            { data: "UbigeoProvincia.Descripcion" },
            { data: "UbigeoDistrito.Descripcion" },
            { data: "SectorCliente" },
            {
                data: "ID",
                render: function (data, type, row) {
                    var d = "'" + row.ID + "','" + row.NomEmpresa + "'"; 
                    var seleccionar = '<a id="btnSeleccionar" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: asignacionTerritorial.seleccionar(' + d +')"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
                    return '<center>' + seleccionar + '</center>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        var filters = {}
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 10;
        app.llenarTabla($tblClientes, data, columns, columnDefs, "#tblClientes", null, null, filters);
    }

    return {
        seleccionar: seleccionar,
    }

})(window.jQuery, window, document);