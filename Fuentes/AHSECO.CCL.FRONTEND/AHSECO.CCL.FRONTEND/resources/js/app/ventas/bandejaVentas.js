var bandejaVentas = (function ($, win, doc) {
    /***/
    var $CodUsuario = $("#CodUsuario");
    var $txtRuc = $("#txtRuc");
    var $txtNomEmpresa = $("#txtNomEmpresa");
    var $tblClientes = $("#tblClientes");
    var $CodEmpleado = $("#CodEmpleado");
    var $RolUsuario = $("#RolUsuario");
    var $btnBuscar = $("#btnBuscar");
    var $cmbAsesor = $("#cmbAsesor");
    /*Mensajes*/
    var mensajes = {
        cargandoClientes: "Cargando los clientes del asesor, por favor espere..."
    };


    $(Initialize);

    function Initialize(){
        cargarAsesores();
        Buscar();
        $btnBuscar.click(Buscar);

        setInterval(function () {
            refrescar();
        },60000);
    }

     //setInterval(Buscar(), 3000);
    function refrescar() {
        var baseUrl = baseSiteUrl;
        method = "POST";
        url = "BandejaCliente/ObtenerClientes"

        objBuscar = {
            RUC: $txtRuc.val() == "" || $txtRuc.val() == null || $txtRuc.val() == undefined ? "" : $txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val() == "" || $txtNomEmpresa.val() == null || $txtNomEmpresa.val() == undefined ? "" : $txtNomEmpresa.val(),
            Id_Empleado: $CodEmpleado.val() == "0" || $CodEmpleado.val() == "" || $CodEmpleado.val() == null || $CodEmpleado.val() == undefined ? $cmbAsesor.val() : -1,
            Estado: 1
        };

        if (objBuscar.Id_Empleado == null) {
            objBuscar.Id_Empleado = -1
        };

         if ($RolUsuario.val() == "SGI_VENTA_ASESOR") {
            objBuscar.Id_Empleado = $CodEmpleado.val();
        }
        else if ($RolUsuario.val() == "SGI_VENTA_COORDINASERV" || $RolUsuario.val() == "SGI_VENTA_COORDINAATC") {
            objBuscar.Id_Empleado = null;
        }
        else {
            objBuscar.Id_Empleado = -2;
        }

        objParam = JSON.stringify(objBuscar);


        var m = method;
        var u = baseUrl + url;
        var d = objParam;



        return $.ajax({
            method: m,
            url: u,
            data: d,
            contentType: 'application/json',
            dataType: "json"
        }).done(function (data, textStatus, jqXhr) {
            if (data.Status === 1) {
                cargarTabla(data);
            } else if (data.Status === 0) {
                message.error("Error", data.CurrentException, "Aceptar", null);
            }
        }).fail(function (jqXhr, textStatus, errorThrow) {
            message.error("Error inesperado", errorThrow, "Aceptar", null);
        }).always(function () {

            if (typeof (fnAlwaysCallback) !== "undefined" && fnAlwaysCallback != null) {
                fnAlwaysCallback();
            }
        });
    }
    function cargarAsesores() {
        var method = "POST";
        var url = "BandejaAsesorVenta/ObtenerAsesorVenta";
        var objGenerales = {
            CodigoCargo: "5", //Cargo: 5 = Asesor de ventas.
            Estado: "1"
        }
        var objParams = JSON.stringify(objGenerales);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            for (var i = 0; i < data.Result.length; i++) {
                var item = {
                    Id: data.Result[i].CodigoEmpleado,
                    Text: data.Result[i].NombresCompletosEmpleado
                }
                resultado.Result.push(item);
            };

            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbAsesor, resultado, null, -1, "-- Todos --", filters);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, mensajes.llenarEmpleados);
    };
    function Buscar() {
        console.log("$cmbAsesor:" + $cmbAsesor.val());
        method = "POST";
        url = "BandejaCliente/ObtenerClientes"

        if (isNaN($txtRuc.val())) {
            app.message.error("Validación", "El número de RUC no puede contener letras")
            return;
        };

        objBuscar = {
            RUC: $txtRuc.val() == "" || $txtRuc.val() == null || $txtRuc.val() == undefined ? "" : $txtRuc.val(),
            NomEmpresa: $txtNomEmpresa.val() == "" || $txtNomEmpresa.val() == null || $txtNomEmpresa.val() == undefined ? "" : $txtNomEmpresa.val(),
            Id_Empleado: $CodEmpleado.val() == "0" || $CodEmpleado.val() == "" || $CodEmpleado.val() == null || $CodEmpleado.val() == undefined ? $cmbAsesor.val() : -1,
            Estado: 1
        };

        if (objBuscar.Id_Empleado == null){
            objBuscar.Id_Empleado = -1
        };

        if ($RolUsuario.val() == "SGI_VENTA_ASESOR") {
            objBuscar.Id_Empleado = $CodEmpleado.val();
        }
        else if ($RolUsuario.val() == "SGI_VENTA_COORDINASERV" || $RolUsuario.val() == "SGI_VENTA_COORDINAATC") {
            objBuscar.Id_Empleado = null;
        }
        else {
            if ($cmbAsesor.val() != null && $cmbAsesor.val() != "-1") {
                objBuscar.Id_Empleado = $cmbAsesor.val();
            }
            else {
                objBuscar.Id_Empleado = -2;
            }
            
        }

        objParam = JSON.stringify(objBuscar);
        var fnDoneCallBack = function (data) {
            cargarTabla(data);
        }

        var fnFailCallBack = function () {
            app.message.error("Validación", "Ocurrió un error al cargar la bandeja de clientes.")
        }
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.cargandoClientes);
    }

    function solicitud(id, nomEmpresa, numRUC) {

        method = "POST";
        url = "BandejaVentas/InicializaDetalle";

        objCliente = {
            nomEmpresa: nomEmpresa,
            ID: id,
            RUC: numRUC
        }

        objParam = JSON.stringify(objCliente)

        var fnDoneCallBack = function (data) {
            app.redirectTo("BandejaSolicitudesVentas");
        };

        var fnFailCallBack = function () {
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }

    function cargarTabla(data) {
        if ($RolUsuario.val() == "SGI_VENTA_ASESOR" || $RolUsuario.val() == "SGI_VENTA_JEFE" ||
            $RolUsuario.val() == "SGI_VENTA_COORDINAVENTA" || $RolUsuario.val() == "SGI_VENTA_GERENTE") {
            var columns = [
                { data: "ID" },
                {
                    data: "RUC",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                { data: "NomEmpresa" },
                { data: "SectorCliente" },
                { data: "Categoria" },
                { data: "Direccion" },
                {
                    data: "UbigeoDepartamento.Descripcion",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "UbigeoProvincia.Descripcion",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "UbigeoDistrito.Descripcion",
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
                },
                {
                    data: "ID",
                    render: function (data, type, row) {
                        var params = "'" + row.ID + "','" + row.NomEmpresa + "','" + row.RUC + "'"
                        var solicitud = '<a id="btnSolicitud" class="btn btn-default btn-xs" title="Solicitudes" href="javascript: bandejaVentas.solicitud(' + params + ')"><i class="fa fa-book" aria-hidden="true"></i> Solicitudes </a>';
                        return '<center>' + solicitud + '</center>';
                    }
                }
            ];
        }
        else {
            var columns = [
                { data: "ID" },
                {
                    data: "RUC",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                { data: "NomEmpresa" },
                { data: "SectorCliente" },
                { data: "Categoria" },
                { data: "Direccion" },
                {
                    data: "UbigeoDepartamento.Descripcion",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "UbigeoProvincia.Descripcion",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "UbigeoDistrito.Descripcion",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>';
                    }
                },
                {
                    data: "ID",
                    render: function (data, type, row) {
                        var params = "'" + row.ID + "','" + row.NomEmpresa + "','" + row.RUC + "'"
                        var solicitud = '<a id="btnSolicitud" class="btn btn-default btn-xs" title="Solicitudes" href="javascript: bandejaVentas.solicitud(' + params + ')"><i class="fa fa-book" aria-hidden="true"></i> Solicitudes </a>';
                        return '<center>' + solicitud + '</center>';
                    }
                }
            ];
        }

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
        solicitud: solicitud
    };
})(window.jQuery, window, document);