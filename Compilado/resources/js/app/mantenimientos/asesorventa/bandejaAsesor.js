var bandejaAsesor = (function ($, win, doc) {

    var $txtNombreAsesorVenta = $("#txtNombreAsesorVenta");
    var $txtApePat = $("#txtApePat");
    var $txtApeMat = $("#txtApeMat");


    var $txtCorreo = $("#txtCorreo");
    var $dateFecIni = $("#dateFecIni");
    var $dateFecFin = $("#dateFecFin");
    var $cmbestado = $("#cmbestado");
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    /**Buttons */
    var $btnGuardar = $("#btnGuardar");

    var $btnBuscar = $("#btnBuscar");
    var $btnNuevo = $("#btnNuevo")
    var $btnExportar = $("#btnExportar");
   
    /**Tablas */
    var $tblAsesorVenta = $("#tblAsesorVenta");
    /**Form */
    var $formAsesorVenta = $("#formAsesorVenta");
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
    var mensajes = {
        obteniendoAsesorVenta: "Obteniendo Asesor Venta, por favor espere...",
        obteniendoEstados: "Obteniendo Estado, por favor espere...",
        consultandoAsesorVenta: "Obteniendo Asesor Venta, por favor espere...",
        procesandoAsesorVenta: "Procesando Asesor Venta, por favor espere...",
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del Asesor Venta, por favor espere...",
        obteniendoAsesorVenta: "Obteniendo datos del Asesor de Ventas, por favor espere...",
        guardarUbigeo: "Guardando datos del ubigeo , por favor espere...",
        guardarUsuario: "Los datos del usuario se guardaron satisfactoriamente."
    };
 
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
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        const primerDiaDelMes = new Date(year, mes + 1, 1);
        return `${primerDia}/${mes}/${year}`;
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
    function CargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";

        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbestado, data, null,"--Todos--" ,"--Todos--" , filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }

    function btnBuscarClick() {
        var method = "POST";
        var url = "BandejaAsesorVenta/ObtenerAsesorVenta";
      
        var aseVentaObj = {
            CodigoEmpleado: 0,
            NombreEmpleado: $txtNombreAsesorVenta.val(),
            ApellidoPaternoEmpleado: $txtApePat.val(),
            ApellidoMaternoEmpleado: $txtApeMat.val(),
            CodigoCargo: 5,//-->1 es Asesor Venta
            TipoDocumento: '',
            TipoEmpleado:'',
            NumeroDocumento: '',
            Estado: $cmbestado.val() == null || $cmbestado.val() == "" || $cmbestado.val() == "--Todos--" ? 2 : $cmbestado.val(),
            FechaInicio: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()),//$dateFecIni.val(),
            FechaFinal: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()),//$dateFecFin.val()
        }
        var objParam = JSON.stringify(aseVentaObj);
        
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        }
        var fnFailCallback = function (data) {
            cargarTabla();
            app.message.error("AsesorVenta", "La busqueda no ha encontrado resultados", "Aceptar");
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

      return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoAsesorVenta)
    }
  
    function btnNuevoClick() {
        const tipoRegAsesor = "N";
        sessionStorage.setItem('tipoRegAsesor', `${tipoRegAsesor}`);
        app.redirectTo("BandejaAsesorVenta/RegistrarAsesorVenta");
    }

    
    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblAsesorVenta.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Asesores de Ventas", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoEmpleado", value: 0 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NombreEmpleado", value: $txtNombreAsesorVenta.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "ApellidoPaternoEmpleado", value: $txtApePat.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "ApellidoMaternoEmpleado", value: $txtApeMat.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoCargo", value: 5 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoDocumento", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "TipoEmpleado", value: '' }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "NumeroDocumento", value: "" }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Estado", value: $cmbestado.val() == "-1" || $cmbestado.val() == "" || $cmbestado.val()=="--Todos--" ? 2 : $cmbestado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaInicio", value: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaFinal", value: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()) }).appendTo("#hidden_fields");

        $formAsesorVenta.attr('action', href);
        $formAsesorVenta.submit();
    }

    function cargarTabla(data) {
        
        var columns = [
            { data: "CodigoEmpleado" },
            {
                data: "NombresCompletosEmpleado",
            },
            {
                data: "TelefonoEmpleado", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "EmailEmpleado", render: function (data) {
                    return '<center>' + data + '</center>';
                },
            },
            {
                data: "NombreEstado", render: function (data) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    var editarRow = "'" + row.LugarLaboral.UbigeoId + "'"
                    var editar = '<a id="btnEditar" class="btn btn-default btn-xs" title="Editar" href="javascript: bandejaAsesor.editar(' + data + "," + editarRow + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    var ver = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: bandejaAsesor.ver(' + data +","+editarRow +')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    return '<center>' + editar +' '+ ver + '</center>';
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
        app.llenarTabla($tblAsesorVenta, data, columns, columnDefs, "#tblAsesorVenta", null, null, filters);
    }
    function editar(idEmpleado,ubigeoId) {
        const idAsesor = idEmpleado;
        sessionStorage.setItem('idAsesor', `${idAsesor}`)
        const tipoRegAsesor = "U";
        sessionStorage.setItem('tipoRegAsesor', `${tipoRegAsesor}`);
        sessionStorage.setItem("tituloEditar", "Editar Asesor de Ventas")
        sessionStorage.setItem("ubigeoId", ubigeoId);
        app.redirectTo("BandejaAsesorVenta/RegistrarAsesorVenta");
    }
    function ver(idEmpleado,ubigeoId) {
        const idAsesor = idEmpleado;
        sessionStorage.setItem('idAsesor', `${idAsesor}`)
        const tipoRegAsesor = "V";
        sessionStorage.setItem('tipoRegAsesor', `${tipoRegAsesor}`);
        sessionStorage.setItem("tituloVer", "Ver Asesor de Ventas")
        sessionStorage.setItem("ubigeoId", ubigeoId);
        app.redirectTo("BandejaAsesorVenta/RegistrarAsesorVenta");
    }

   
    return {
        editar: editar,
        ver: ver
    }

})(window.jQuery, window, document);