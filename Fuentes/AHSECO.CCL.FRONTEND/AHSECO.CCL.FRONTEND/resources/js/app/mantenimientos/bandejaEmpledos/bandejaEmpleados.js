var bandejaEmpleados = (function ($, doc, win) {
    var $dateFecIni = $("#dateFecIni");
    var $dateFecFin = $("#dateFecFin");
    var $txtNombre = $("#txtNombre");
    var $txtApePat = $("#txtApePat");
    var $txtApeMat = $("#txtApeMat");
    var $txtNumDoc = $("#txtNumDoc");

    var $cmbTipo = $("#cmbTipo");
    var $cmbCargo = $("#cmbCargo");
    var $cmbEstado = $("#cmbEstado");
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    /**Botones */
    var $btnNuevo = $("#btnNuevo");
    var $btnExportar = $("#btnExportar");
    var $btnBuscar = $("#btnBuscar");
    /**Tablas */
    var $tblEmpleado = $("#tblEmpleado");
    /**Validaciones */
    /**Formualarios */
    var $formEmpleado = $("#formEmpleado");
    var mensajes = {
        obteniendoEstados: "Obteniendo Estados, por favor espere...",
        obteniendoTipos: "Obteniendo Tipos,por favor espere...",
        obteniendoEmpleados: "Obteniendo Empleados, porfavor espere..."
    }
    $(Initialize)
    function Initialize() {
     
        $btnBuscar.click(btnBuscarClick);
        $btnNuevo.click(btnNuevoClick);
        $btnExportar.click(btnExportarClick);
        $dateFecFin.datepicker({ dateFormat: "dd-MM-yyyy", changeMonth: true, changeYear: true, showButtonPanel: true, showAnim: "slideDown" });
        $dateFecIni.datepicker({ dateFormat: "dd-MM-yyyy", changeMonth: true, changeYear: true, showButtonPanel: true, showAnim: "slideDown" });
        btnBuscarClick();
        $openRegFecIni.click(openRegFecIni_click);
        $openRegFecFin.click(openRegFecFin_click);
        Promise.all([cargarCargos(), cargarEstados(), cargarTipo()]).then((results) => {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            var [cargos, estados, tipos] = results;

            app.llenarCombo($cmbCargo, cargos, null,0, "--Todos--", filters);
            app.llenarCombo($cmbEstado, estados, null, 2, "--Todos--", filters);
            app.llenarCombo($cmbTipo, tipos, null, 0, "--Todos--", filters);
       
        }).catch((error) => {
            app.message.error("Error", "No se cargaron los datos de listados de la bandeja.");
        });
      
         $dateFecIni.datepicker({
             viewMode: 0,
             minViewMode: 0,
             format: 'dd/mm/yyyy',
             changeMonth: true,
             
         });
         $dateFecIni.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);

         $dateFecFin.datepicker({
             viewMode: 0,
             minViewMode: 0,
             format: 'dd/mm/yyyy',
             startDate: $dateFecIni.val('')
         });

       // $dateFecFin.val(hoy());
       // $dateFecIni.val(firstDayMonth());
    }
    function changeDateFechaInicialRegFecIni() {
        var fechaIni = $dateFecIni.datepicker('getDate');
        if (fechaIni) {
            var mesIni = fechaIni.getMonth();
            var añoIni = fechaIni.getFullYear();
            var diaIni = fechaIni.getDate();


            $dateFecFin.datepicker('destroy');
            $dateFecFin.datepicker({
                viewMode: 0,
                minViewMode: 0,
                format: 'dd/mm/yyyy',
                startDate: new Date(añoIni, mesIni, diaIni),
               
            });

            var fechaFin = $dateFecFin.datepicker('getDate');
            if (fechaFin) {

                if (fechaFin.getMonth() !== mesIni || fechaFin.getFullYear() !== añoIni || fechaFin.getDate() < diaIni) {
                    $dateFecFin.datepicker('setDate', new Date(añoIni, mesIni, Math.min(diaIni, new Date(añoIni, mesIni + 1, 0).getDate())));
                }
               
            }
          
        }
    }
    function openRegFecIni_click() {
        $dateFecIni.focus();
    }
    function openRegFecFin_click() {
        $dateFecFin.focus();
    }
    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
    }
    function firstDayMonth() {
        var date = new Date();
        var primerDia = "01"
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual
        var year = date.getFullYear();
        const primerDiaDelMes = new Date(year, mes + 1, 1);
        return `${primerDia}/${mes}/${year}`;
    }
    function cargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";

        var fnDoneCallback = function (data) {
           
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }
    function cargarCargos() {
        var method = "POST";
        var url = "Utiles/ListarCargos";
        var objParam = "";

        var fnDoneCallback = function (data) {
      
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }
    function cargarTipo() {
        var method = "POST";
        var url = "Utiles/ListarTipos";
        var objParam = "";
        var fnDoneCallback = function (data) {
         
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }
    function btnBuscarClick() {
        if ($dateFecIni.val() != "" && $dateFecFin.val() === "") {
            app.message.error("Validación", "Debe ingresar una fecha inicial en los filtros.");
            return
        } else if ($dateFecFin.val() != "" && $dateFecFin.val() === "") {
            app.message.error("Validación", "Debe ingresar una fecha final en los filtros.");
            return;
        };
        var method = "POST";
        var url = "BandejaEmpleados/ObtenerEmpleados";
        var objEmpleado = {
            CodigoEmpleado: 0,
            NombreEmpleado: $txtNombre.val().trim(),
            ApellidoPaternoEmpleado: $txtApePat.val().trim(),
            ApellidoMaternoEmpleado: $txtApeMat.val(),
            CodigoCargo: $cmbCargo.val() == null || $cmbCargo.val() == "" || $cmbCargo.val() == "" ? 0 : Number($cmbCargo.val()),
            TipoDocumento: "",
            TipoEmpleado: $cmbTipo.val() == null || $cmbTipo.val() == "" || $cmbTipo.val().trim() == 0 ? '' : $cmbTipo.val(),
            NumeroDocumento: $txtNumDoc.val(),
            Estado: $cmbEstado.val() == null || $cmbEstado.val() == "" || $cmbEstado.val().trim() === 0 ? Number(2) : Number($cmbEstado.val()),
            FechaInicio: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()),//$dateFecIni.val(),
            FechaFinal: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()),//$dateFecFin.val()
        }
        var objParam = JSON.stringify(objEmpleado);
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function (data) {
            cargarTabla();
            app.message.error("Empleado", "La busqueda no ha encontrado resultados", "Aceptar");
        }
        if ($dateFecFin.val() === "") {
            if ($dateFecIni.val() !== "") {
                app.message.error("Validación", "Debe de ingresar el rango de fechas correctamente.");
                return
            }
        } else if ($dateFecIni.val() === "") {
            if ($dateFecFin.val() !== "" || $dateFecFin.val() !== null || $dateFecFin.val() !== undefined) {
                app.message.error("Validación", "Debe de ingresar el rango de fechas correctamente.");
            }
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoEmpleados);
    }
    function btnNuevoClick() {
        sessionStorage.setItem('tipoRegEmp', 'N');
        app.redirectTo("BandejaEmpleados/RegistrarEmpleados");
    }
    function cargarTabla(data) {
        var columns = [
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
            },
            {
                data: "NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
            },
            {
                data: "NumeroDocumento",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
            },
            {
                data: "Cargo.NombreCargo",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
             },
            {
                data: "Empresa.Valor1",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
            },
            {
                data: "TipoEmpleado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
            },
            {
                data: "NombreEstado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>'
                    }
                }
            },
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
               
                    //var dataRow = "'" + row.CodigoEmpleado + "'" + "," + "'" + row.NombresEmpleado + "'" + "," + "'" + row.ApellidoPaternoEmpleado + "'" + "," + "'" + row.ApellidoMaternoEmpleado + "'" + "," + "'" +
                    //    row.Cargo.CodigoCargo + "'" + "," + "'" + row.LugarLaboral.UbigeoId + "'" + "," + "'" + row.LugarLaboral.NombreDepartamento + "'" + "," + "'" + row.LugarLaboral.NombreProvincia + "'" + "," + "'" + row.LugarLaboral.NombreDistrito + "'" + "," + "'" + row.FechaNacimiento +
                    //    "'" + "," + "'" + row.TelefonoEmpleado + "'" + "," + "'" + row.EmailEmpleado + "'" + "," + "'" + row.Documento.CodValor1
                    //    + "'" + "," + "'" + row.NumeroDocumento + "'" + "," + "'" + row.SexoEmpleado + "'" + "," + "'" + row.DireccionEmpleado +
                    //    "'" + "," + "'" + row.Empresa.CodValor1 + "'" + "," + "'" + row.FechaIngreso + "'" + "," + "'" + row.CodigoTipoEmpleado + "'" +
                    //    "," + "'" + row.CodigoJefe + "'" + "," + "'" + row.Estado + "'";
                    var dataRow = "'" + row.LugarLaboral.UbigeoId + "'" + "," + "'" + row.CodigoJefe + "'";
                    var editar = '<a class="btn btn-default btn-xs" title="Editar" href="javascript:bandejaEmpleados.editar(' + data + "," + dataRow + ')"><i class="fa fa-pencil-square-o" aria-hidden=true></i></a>'
                    var ver = '<a class="btn btn-info btn-xs" title="Ver" href="javascript:bandejaEmpleados.ver(' + data + "," + dataRow + ')"><i class="fa fa-eye"><i/></a>'
                    return '<center>' + editar + ' '+ ver + '</center>'
                }
            }
        ]
        var columnDefs =
        {
            targets: [0],
            visible: false
        }

        var filters =
        {
            dataTableSearching: false,
            dataTablePageLength: 10
        }
       

        app.llenarTabla($tblEmpleado, data, columns, columnDefs, "#tblEmpleado", null, null, filters);
    }
    function btnExportarClick(e) {
        e.preventDefault();
        var self = $(this);
        var href = self.attr('href');
        var cant = $tblEmpleado.DataTable().rows().length;

        if (cant === 0) {
            app.message.error("Reporte de Empleados", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }

        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoEmpleado", value: 0 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreEmpleado", value: $txtNombre.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "ApellidoPaternoEmpleado", value: $txtApePat.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "ApellidoMaternoEmpleado", value: $txtApeMat.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoCargo", value: $cmbCargo.val() == null || $cmbCargo.val() == "" || $cmbCargo.val() == "--Todos--" ? 0 : $cmbCargo.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoDocumento", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoEmpleado", value: $cmbTipo.val() == null || $cmbTipo.val() == "" || $cmbTipo.val() == 0 ? '' : $cmbTipo.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumeroDocumento", value: $txtNumDoc.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbEstado.val() == "-1" || $cmbEstado.val() == "" || $cmbEstado.val()=="--Todos--" ? 2 : $cmbEstado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaInicio", value: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaFinal", value: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()) }).appendTo("#hidden_fields");

        $formEmpleado.attr('action', href);
        $formEmpleado.submit();
    }
    function ver(codigoEmpleado,UbigeoId,CodigoJefe) {
        var objEmpleado = {
            codigoEmpleado,
            UbigeoId,
            CodigoJefe
        }
        sessionStorage.setItem('objParam', `${JSON.stringify(objEmpleado)}`);
        sessionStorage.setItem('idEmpleado', codigoEmpleado);
        sessionStorage.setItem('tipoRegEmp', 'V');
        sessionStorage.setItem('tituloVerEmpleado', 'Ver Empleados');
        sessionStorage.setItem('ubigeoIdVer', UbigeoId);
        app.redirectTo("BandejaEmpleados/RegistrarEmpleados");
    }
    function editar(codigoEmpleado, UbigeoId, CodigoJefe) {
        var objEmpleado = {
            codigoEmpleado,
            UbigeoId,
            CodigoJefe
        }
        
        sessionStorage.setItem('objParam', `${JSON.stringify(objEmpleado)}`);
        sessionStorage.setItem('tipoRegEmp', 'U');
        sessionStorage.setItem('idEmpleado',codigoEmpleado);
        sessionStorage.setItem('tituloEditarEmpleado', 'Editar Empleados');
        sessionStorage.setItem("ubigeoIdEditar", UbigeoId);
        app.redirectTo("BandejaEmpleados/RegistrarEmpleados");
    }
    return {
        editar: editar,
        ver: ver,
    }
})(window.jQuery, document, window);
