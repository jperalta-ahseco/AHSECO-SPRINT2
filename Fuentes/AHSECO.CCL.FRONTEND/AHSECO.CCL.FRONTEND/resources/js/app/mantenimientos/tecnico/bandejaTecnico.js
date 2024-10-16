var bandejaTecnico = (function ($, win, doc) {

    var $txtNombres = $("#txtNombres");
    var $txtApePat = $("#txtApePat");
    var $txtApeMat = $("#txtApeMat");


    var $txtCorreo = $("#txtCorreo");
    var $dateFecIni = $("#dateFecIni");
    var $dateFecFin = $("#dateFecFin");
    var $cmbestado = $("#cmbestado");

    /**Buttons */
    var $btnGuardar = $("#btnGuardar");

    var $btnBuscar = $("#btnBuscar");
    var $btnNuevo = $("#btnNuevo")
    var $btnExportar = $("#btnExportar");
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    /**Tablas */
    var $tblTecnico = $("#tblTecnico");
    /**Form */
    var $formTecnico = $("#formTecnico");
    $(Initialize);
    function Initialize() {
        $openRegFecIni.click(openRegFecIni_click);
        $openRegFecFin.click(openRegFecFin_click);

        $dateFecIni.val(firstDayMonth());
        $dateFecFin.val(hoy());
        $dateFecIni.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFecFin.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: $dateFecIni.val()
        });

        $dateFecIni.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);

        CargarEstados();
        $btnBuscar.click(btnBuscarClick);
        $btnNuevo.click(btnNuevoClick);
        $btnExportar.click(btnExportarClick);
        
        btnBuscarClick();
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
    var mensajes = {
        obteniendoTecnico: "Obteniendo Técnicos, por favor espere...",
        obteniendoEstados: "Obteniendo Estado, por favor espere...",
        consultandoTecnico: "Obteniendo Técnicos, por favor espere...",
        procesandoTecnico: "Procesando Técnicos, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del Técnicos, por favor espere...",
        obteniendoTecnico: "Obteniendo datos del Tecnico, por favor espere...",
        guardarUbigeo: "Guardando datos del ubigeo , por favor espere...",
        guardarUsuario: "Los datos del usuario se guardaron satisfactoriamente."
    };
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
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        const primerDiaDelMes = new Date(year, mes + 1, 1);
        return `${primerDia}/${mes}/${year}`;

    }
    function CargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";

        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbestado, data, null,"--Todos--" ,"--Todos--", filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }

    function btnBuscarClick() {
        var method = "POST";
        var url = "BandejaTecnico/ObtenerTecnico";
        var objTecnico = {
            CodigoEmpleado: 0,
            NombreEmpleado: $txtNombres.val(),
            ApellidoPaternoEmpleado: $txtApePat.val(),
            ApellidoMaternoEmpleado: $txtApeMat.val(),
            CodigoCargo: 8,//-->8 es Técnico
            TipoDocumento: "",
            TipoEmpleado: "",
            NumeroDocumento: "",
            Estado: $cmbestado.val() == null || $cmbestado.val() == "" ||  $cmbestado.val() == "--Todos--" ? 2 : $cmbestado.val(),
            FechaInicio: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()),//$dateFecIni.val(),
            FechaFinal: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()),//$dateFecFin.val()
        }
     
        var objParam = JSON.stringify(objTecnico);

        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function (data) {
            cargarTabla();
            app.message.error("Técnico", "La busqueda no ha encontrado resultados", "Aceptar");
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
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoTecnico);
    }

    function btnNuevoClick() {
        const tipoRegTecnico = "N";
        sessionStorage.setItem('tipoRegTecnico', `${tipoRegTecnico}`);
        app.redirectTo("BandejaTecnico/RegistrarTecnico");
    }


    function btnExportarClick(e) {
        e.preventDefault();
        var self = jQuery(this);
        var href = self.attr('href');
       
        var cant = $tblTecnico.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Técnicos", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoEmpleado", value: 0 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreEmpleado", value: $txtNombres.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "ApellidoPaternoEmpleado", value: $txtApePat.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "ApellidoMaternoEmpleado", value: $txtApeMat.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoCargo", value: 8 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoDocumento", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoEmpleado", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumeroDocumento", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbestado.val() == "-1" || $cmbestado.val() == "" || $cmbestado.val()=="--Todos--" ? 2 : $cmbestado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaInicio", value: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaFinal", value: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()) }).appendTo("#hidden_fields");

        $formTecnico.attr('action', href);
        $formTecnico.submit();
    }

    function cargarTabla(data) {

        var columns = [
            {
                data: "CodigoEmpleado"
                , render: function (data, type, row) {
                    if (data !== "") {
                        return data;
                    } else {
                        return "";
                    }
                }
            },
            {
                data: "NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return data;
                    } else {
                        return "";
                    }
                }
            },
            {
                data: "TelefonoEmpleado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>';
                    }
                }
            },
            {
                data: "EmailEmpleado",
                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>';
                    }
                }
            },
            {
                data: "NombreEstado",

                render: function (data, type, row) {
                    if (data !== "") {
                        return '<center>' + data + '</center>';
                    } else {
                        return '<center>' + "" + '</center>';
                    }
                }
            },


            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    var rowData = "'" + data + "'" + "," + "'" + row.LugarLaboral.UbigeoId + "'";
                    var editar = '<a id="btnEditar" class="btn btn-default btn-xs" title="Editar" href="javascript:bandejaTecnico.editar(' + rowData + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript:bandejaTecnico.ver(' + rowData + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    return '<center>' + editar + ' ' + ver + '</center>';
                },

            },


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
        app.llenarTabla($tblTecnico, data, columns, columnDefs, "#tblTecnico", null, null, filters);
    }
    function editar(idEmpleado, ubigeoId) {
        const idTecnico = idEmpleado;
        sessionStorage.setItem('idTecnico', `${idTecnico}`)
        const tipoRegTecnico = "U";
        sessionStorage.setItem('tipoRegTecnico', `${tipoRegTecnico}`);
        sessionStorage.setItem("ubigeoIdTecnico", ubigeoId);
        sessionStorage.setItem('tituloEditar', 'Editar Técnicos');
        app.redirectTo("BandejaTecnico/RegistrarTecnico");
    }
    function ver(idEmpleado, ubigeoId) {
        const idTecnico = idEmpleado;
        sessionStorage.setItem('idTecnico', `${idTecnico}`)
        const tipoRegTecnico = "V";
        sessionStorage.setItem('tipoRegTecnico', `${tipoRegTecnico}`);
       
        sessionStorage.setItem("ubigeoIdTecnico", ubigeoId);
        sessionStorage.setItem('tituloVer', 'Ver Técnicos');
        app.redirectTo("BandejaTecnico/RegistrarTecnico");
    }
    return {
        editar: editar,
        ver: ver
    }

})(window.jQuery, window, document);