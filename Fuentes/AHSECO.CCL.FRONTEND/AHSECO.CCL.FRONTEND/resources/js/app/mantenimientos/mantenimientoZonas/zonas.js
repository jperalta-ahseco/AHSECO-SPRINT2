var zonas = (function ($, win, doc) {

    var $tblZonas = $('#tblZonas');
    var $btnNuevo = $('#btnNuevo');
    var $descripcionMantenimientoZona = $('#descripcionMantenimientoZona');
    var $nombreZona = $('#nombreZona');
    var $btnBuscar = $('#btnBuscar');
    var $chkHabilitado = $('#chkHabilitado');
    var $hdnIdZona = $('#hdnIdZona');
    var $txtDescripcion = $('#txtDescripcion');
    var $modalZonas = $('#modalZonas');
    var $lblHabilitado = $('#lblHabilitado');
    var $btnGrabarZonas = $('#btnGrabarZonas');
    var $btnActualizarZonas = $('#btnActualizarZonas')
    var $cmbestado = $('#cmbestado');
    var $btnCerrar = $('#btnCerrar');
    var $btnExportar = $('#btnExportar');
    var $formMantenimientoZonas = $('#formMantenimientoZonas');

    var mensajes = {
        obteniendoZonas: "Obteniendo Zonas, por favor espere...",
        guardandoZonas: "Guardando Zonas, por favor espere...",
        editarZonas: "Editando Zonas, por favor espere...",
    };

    $(Initialize);
    function Initialize() {
        CargarEstados()
        cargarZonas();
        $btnExportar.click(btnExportarClick);
        $btnCerrar.click(btnCerrarClick);
        $btnNuevo.click(btnNuevoClick);
        $btnBuscar.click(buscarZonasClick);
        $btnGrabarZonas.click(Insertar);
        $btnActualizarZonas.click(Actualizar);
    }

    function buscarZonasClick() {
        var objZona = {
            DesZona: $nombreZona.val(),
            Estado: $cmbestado.val() == -1 || $cmbestado.val() == null || $cmbestado.val() == "" ? "" : $cmbestado.val()
        };

        if (objZona.Estado == "1") {
            objZona.Estado = true;
        }
        else if (objZona.Estado == "0") {
            objZona.Estado = false;
        };

        var method = "POST";
        var url = "BandejaZona/Obtener";
        var objParam = JSON.stringify(objZona);

        var fnDoneCallBack = function(data){
            cargarTabla(data); 
        }

        var fnFailCallBack = function () {
            cargarTabla();
        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.obteniendoZonas);
    }

    function editar(idZona) {
        $lblHabilitado.show();
        $chkHabilitado.show();
        $btnActualizarZonas.show();
        $btnGrabarZonas.hide();
        $txtDescripcion.disabled = true;

        var objZona = { Id: idZona };
        var method = "POST";
        var url = "BandejaZona/Obtener";
        var objParam = JSON.stringify(objZona);

        var fnDoneCallBack = function (data) {
            $hdnIdZona.val(data.Result[0].Id);
            $txtDescripcion.val(data.Result[0].DesZona);
            if (data.Result[0].Estado === true) {
                $chkHabilitado.prop("checked", true);
            } else {
                $chkHabilitado.prop("checked", false);
            }
            $modalZonas.modal();
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, mensajes.obteniendoZonas);
    }
    function btnNuevoClick() {
        $lblHabilitado.hide();
        $chkHabilitado.hide();
        $btnActualizarZonas.hide();
        $btnGrabarZonas.show();
        $txtDescripcion.disabled = false;
    }

    function Actualizar() {
        var estado = true;

        if ($chkHabilitado.is(':checked')) {
            estado = true;
        }
        else {
            estado = false;
        }
        
        var objZona = {
            DesZona:$txtDescripcion.val(),
            Id: $hdnIdZona.val(),
            Estado: estado
        };
        var method = "POST";
        var url = "BandejaZona/Actualizar";
        var objParam = JSON.stringify(objZona);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo == 0) {
                    app.message.success("Validacion", data.Result.Mensaje);
                    cargarZonas();
                    $txtDescripcion.val("");
                    $modalZonas.modal('toggle');
                }
                else {
                    app.message.error("Validacion", data.Result.Mensaje);
                };
            };

            var fnFailCallBack = function () {
                cargarTabla();
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.obteniendoZonas);
        };
        return app.message.confirm("Confirmacion", "Esta seguro que desea realizar la actualizacion del registro?", "Si", "No", fnSi, null);
        
        $lblHabilitado.show();
        $chkHabilitado.show();
    }

    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblZonas.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Zonas", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        };

        var Estado = $cmbestado.val() == -1 || $cmbestado.val() == null || $cmbestado.val() == "" ? "" : $cmbestado.val()

        if (Estado == "1") {
            Estado = true;
        }
        else if (Estado == "0") {
            Estado = false;
        };

        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "DesZona", value: $nombreZona.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: Estado}).appendTo("#hidden_fields");

        $formMantenimientoZonas.attr('action', href);
        $formMantenimientoZonas.submit();
    };
    function CargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";

        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbestado, data, null, -1, "--Todos--", filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }

    function btnCerrarClick() {
        $txtDescripcion.val("");
    };
    function Insertar() {
        if ($txtDescripcion.val() == "" || $txtDescripcion.val() == null) {
            app.message.error("Validacion", "Debe de ingresar una descripcion");
            return;
        };

        var objZona = {
            DesZona: $txtDescripcion.val(),
            Estado: true
        };

        var method = "POST";
        var url = "BandejaZona/Insertar";
        var objParam = JSON.stringify(objZona);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo == 0) {
                    app.message.success("Validacion", data.Result.Mensaje);
                    cargarZonas();
                    $txtDescripcion.val("");
                    $modalZonas.modal('toggle');
                }
                else {
                    app.message.error("Validacion", data.Result.Mensaje);
                };
            };

            var fnFailCallBack = function (data) {
                cargarTabla();
            }

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.obteniendoZonas);
        }
        return app.message.confirm("Confirmacion", "Esta seguro que desea realizar el registro?", "Si", "No", fnSi, null);

        $lblHabilitado.show();
        $chkHabilitado.show();
    }

    function cargarZonas() {
        var objZona = {
            DesZona: "",
            Estado: $cmbestado.val() == -1 || $cmbestado.val() == null || $cmbestado.val() == "0" ? "" : $cmbestado.val()
        };

        if(objZona.Estado == "1"){
            objZona.Estado = true;
        }
        else if (objZona.Estado == "0") {
            objZona.Estado = false;
        };

        var method = "POST";
        var url = "BandejaZona/Obtener";
        var objParam = JSON.stringify(objZona);
        var fnDoneCallback = function (data) {
            cargarTabla(data)
        }
        var fnFailCallback = function () {
            cargarTabla();
        };
        app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoZonas);
    }
    function cargarTabla(data) {
        var columns = [
            {data: "Id"},
            {
                data: "DesZona",
                render: function (data, type, row, meta) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Estado",
                render: function (data, type, row, meta) {
                    if (data == true) {
                        return '<center>'+'ACTIVO'+'</center>';
                    }
                    else {
                        return '<center>' + 'DESACTIVADO'+'</center>';
                    }
                }
            },
            {
                data: "UsuarioRegistra",
                render: function (data, type, row, meta) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "FechaRegistro",
                render: function (data, type, row, meta) {
                    return '<center>' + app.obtenerFecha(data) + '</center>';
                }
            },
            {
                data: "FechaModifica",
                render: function (data, type, row, meta) {
                    var fechaModificada = app.obtenerFecha(data);
                    if (fechaModificada === "") {
                        return '<center>' + 'No asignado' + '</center>';
                    }
                    else {
                        return '<center>' + fechaModificada + '</center>';
                    }
                }
            },
            {
                data: "Id",
                render: function (data, type, row, meta) {
                    var editar = '<a class="btn btn-default btn-xs" title="Editar" width="10px" href="javascript: zonas.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    return '<center>' + editar + '</center>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        app.llenarTabla($tblZonas, data, columns, columnDefs, "#tblZonas");
    }
    
    return {
        editar: editar
        //eliminar: eliminar
    };

})(window.jQuery, window, document);