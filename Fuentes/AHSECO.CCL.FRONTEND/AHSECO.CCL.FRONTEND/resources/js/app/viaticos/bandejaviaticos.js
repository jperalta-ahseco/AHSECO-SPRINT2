var bandejaviaticos = (function ($, win, doc) {
    var $codProceso = $("#codProceso");
    var $usuario = $("#usuario");
    var $modalAnular = $("#modalAnular");
    var $txtObservacion = $("#txtObservacion");
    var $codViaticoAnulado = $("#codViaticoAnulado");
    var $btnAnular = $("#btnAnular");
    var $Editar = $("#Editar");
    var $Ver = $("#Ver");
    var $Anular = $("#Anular");
    var $checkAll = $("#checkAll");
    var $tblViaticos = $("#tablaViaticos");
    var $cmbestado = $("#cmbestado");
    var $cmbempresa = $("#cmbempresa");
    var $cmbarea = $("#cmbarea");
    var $cmbcargo = $("#cmbcargo");
    var $cmbencardado = $("#cmbencardado");
    var $txtCodUbigeo = $("#txtCodUbigeo");
    var $txtCodigo = $("#txtCodigo");
    var $dateFecIni = $("#dateFecIni");
    var $dateFecFin = $("#dateFecFin");
    var $openRegFecIni = $("#openRegFecIni");
    var $openRegFecFin = $("#openRegFecFin");
    var $btnEnvApr = $("#btnEnvApr");
    var $NombreRol = $("#NombreRol");
    var $CodigoAreaUsuario = $("#CodigoAreaUsuario");
    var $btnAprobar = $("#btnAprobar");
    var $btnImprimir = $("#btnImprimir");
    var $btnImprimirPDF = $('#btnImprimirPdF');
    var $modalImprimir = $("#modalImprimir");
    var $reporteViatico = $("#reporteViatico");

    var $btnBuscar = $("#btnBuscar");
    var $btnNuevo = $("#btnNuevo");
    var $btnExportar = $("#btnExportar");
    var $formBandejaViaticos = $("#formBandejaViaticos");
    var mensajes = {
        obteniendoViaticos: "Obteniendo viaticos, por favor espere...",
        obteniendoEstados: "Obteniendo estados de viáticos, por favor espere...",
        obteniendoEmpresas: "Obteniendo empresas, por favor espere...",
        obteniendoAreas: "Obteniendo areas, por favor espere...",
        obteniendoCargos: "Obteniendo cargos, por favor espere...",
        obteniendoEncargados: "Obteniendo encargados, por favor espere...",
        obteniendoRolFlujo: "Obteniendo roles del flujo, por favor espere...",
        enviarAprobacion: "Enviando viaticos para aprobación, por favor espere...",
        imprimiendoPDF: "Imprimiendo documentos a PDF, por favor espere..."
    };

    $(Initialize);

    function Initialize() {
        $openRegFecIni.click($openRegFecIni_click);
        $openRegFecFin.click($openRegFecFin_click);
        $btnBuscar.click($btnBuscar_click);
        $btnNuevo.click(btnNuevoClick);
        $btnEnvApr.click(btnEnvAprClick);
        $btnAprobar.click(btnAprClick);
        $btnExportar.click(btnExportarClick);
        $btnAnular.click(btnAnularClick);
        $btnImprimir.click(btnImprimirClick);
        $btnImprimirPDF.click(btnImprimirPDFClick)
        $cmbencardado.prop("disabled", true);
        $cmbcargo.prop("disabled", true);
        $cmbarea.on("change", changeArea);
        $cmbcargo.on("change", changeCargo);
        //CargarCargos(-1);
        //obtenerEncargados(1);
        ObtenerFiltrosViaticos();
        $dateFecIni.val(firstDayMonth());

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
        $dateFecFin.val(hoy());






        setTimeout(function () {
            $btnBuscar_click();
        }, 3000);
        
    }

    function btnImprimirPDFClick() {
        var contador = 0;
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    contador = contador + 1;
                }
            }
        });

        if (contador < 1) {
            app.message.error("Validación", "Debe seleccionar mínimo un registro para realizar esta acción.", "Aceptar", null);
            return false;
        }

        ids = "";
        var separador = "";
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    const array = this.value.split("|");
                    ids = ids + separador + array[0];
                    separador = ",";
                }
            }
        });

        ImprimirPDF(ids);
    }
    function btnImprimirClick() {
        $modalImprimir.modal("show");
        $reporteViatico.attr("src","BandejaViatico/VerReporte").load();
    }
    function btnAnularClick() {

        if ($txtObservacion.val() === "") {
            app.message.error("Validación", "Debe ingresar un motivo para la anulación.");
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "BandejaViatico/AnularViatico";
            var obj = {
                CodigoViatico: $codViaticoAnulado.val(),
                Observacion: $txtObservacion.val()
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    $modalAnular.modal('hide');
                    $btnBuscar_click();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.enviarAprobacion);
        }
        return app.message.confirm("Viáticos", "¿Está seguro que desea anular el viático seleccionado?", "Sí", "No", fnSi, null);

    }

    function btnAprClick() {

        var contador = 0;
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    contador = contador + 1;
                }
            }
        });

        if (contador < 1) {
            app.message.error("Validación", "Debe seleccionar mínimo un registro para realizar esta acción.", "Aceptar", null);
            return false;
        }

        ids = "";
        var separador = "";
        var validador = true;
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    const array = this.value.split("|");
                    if (array[1] != "PAP") {
                        validador = false;
                    }
                    ids = ids + separador + array[0];
                    separador = ",";
                }
            }
        });

        if (validador == false) {
            app.message.error("Validación", "Debe seleccionar solo registros que se encuentren en estado 'Por Aprobar'.", "Aceptar", null);
            return;
        }

        var fnSi = function () {

            var m = "POST";
            var url = "BandejaViatico/Aprobacion?viaticos=" + ids;
            var objParam = '';
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    $btnBuscar_click();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.enviarAprobacion);
        }
        return app.message.confirm("Viáticos", "¿Está seguro que desea aprobar los registros seleccionados?", "Sí", "No", fnSi, null);
    }
    function btnEnvAprClick() {

        var contador = 0;
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    contador = contador + 1;
                }
            }
        });



        if (contador < 1) {
            app.message.error("Validación", "Debe seleccionar mínimo un registro para realizar esta acción.", "Aceptar", null);
            return false;
        }

        ids = "";
        var separador = ""; 
        var validador = true;
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    const array = this.value.split("|");
                    if (array[1] != "REG") {
                        validador = false;
                    }
                    ids = ids + separador + array[0];
                    separador = ",";
                }
            }

        });

        if (validador == false) {
            app.message.error("Validación", "Debe seleccionar solo registros que se encuentren en estado 'Registrado'.", "Aceptar", null);
            return;
        }


        var fnSi = function () {

            var m = "POST";
            var url = "BandejaViatico/EnviarAprobacion?viaticos=" + ids;
            var objParam = '';
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    $btnBuscar_click();
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Validación", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.enviarAprobacion);
        }
        return app.message.confirm("Viáticos", "¿Está seguro que desea enviar los registros seleccionados para su aprobación?", "Sí", "No", fnSi, null);
    }

    function ImprimirPDF(obj){
        method = 'POST';
        url = 'BandejaViatico/ImprimirViaticosPDF';

        objIds = {ids : obj}
        objParam = JSON.stringify(objIds);

        var fnDoneCallBack = function (data) {
            app.abrirVentana("BandejaViatico/ExportarFile?url=" + data.Archivo);
            app.message.success("Viáticos", "Se generó el documento correctamente.")
        }
        var fnFailCallBack = function () {

        }

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.ImprimirPDF);
    }

    function ObtenerFiltrosViaticos() {
        var method = "POST";
        var url = "BandejaViatico/GrupoFiltrosViaticos?nombreRol=" + $NombreRol.val() + "&codArea=" + $CodigoAreaUsuario.val();
        var objParam = '';


        var fnDoneCallback = function (data) {
            
            //Cargar combo de estados:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarComboMultiResult($cmbestado, data.Result.Estados, null, 0, "-- Todos --", filters);

            if ($NombreRol.val() === "SGI_VIAT_GERENTE") {
                $cmbestado.val("PAP").trigger("change.select2");
            }
            else if ($NombreRol.val() === "SGI_VIAT_ADMINISTRADOR") {
                $cmbestado.val("APR").trigger("change.select2");
            }
            else if ($NombreRol.val() === "SGI_VIAT_CONTADOR") {
                $cmbestado.val("EAC").trigger("change.select2");
            }


            //Cargar combo de empresas:
            var filters2 = {};
            filters2.placeholder = "-- Todos --";
            filters2.allowClear = false;
            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, 0, "--Todos--", filters2);
            //Cargar combo de areas:
            var filters3 = {};
            filters3.placeholder = "-- Todos --";
            filters3.allowClear = false;
            app.llenarComboMultiResult($cmbarea, data.Result.Areas, null, 0, "--Todos--", filters3);

            //Cargar combo de cargos:
            var filters4 = {};
            filters4.placeholder = "-- Todos --";
            filters4.allowClear = false;
            app.llenarComboMultiResult($cmbcargo, data.Result.Cargos, null, 0, "--Todos--", filters4);


            //Cargar combo de encargados:
            var filters5 = {};
            filters5.placeholder = "-- Todos --";
            filters5.allowClear = false;
            app.llenarComboMultiResult($cmbencardado, data.Result.Encargados, null, 0, "--Todos--", filters5);




            if ($NombreRol.val() === "SGI_VIAT_SOLICITANTE") {
                $cmbarea.val($CodigoAreaUsuario.val()).trigger("change.select2");
                $cmbarea.prop("disabled", true);
                //CargarCargos($CodigoAreaUsuario.val());
                $cmbcargo.prop("disabled", false);
             }

        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    }

    function obtenerEncargados(codCargo) {
        var method = "POST";
        var url = "BandejaViatico/ObtenerEncargados";
        var obj = {
            CodigoEmpleado: 0,
            NombreEmpleado: "",
            ApellidoPaternoEmpleado: "",
            ApellidoMaternoEmpleado: "",
            CodigoCargo: codCargo == null ? -1 : codCargo,
            TipoDocumento: '',
            NumeroDocumento: '',
            Estado: 1,
            FechaInicio: "",
            FechaFinal: ""
        }
        var objParam = JSON.stringify(obj);

        var fnDoneCallback = function (data) {
            var resultado = { Result: [] };

            for (let i = 0; i < data.Result.length; i++) {

                var x = data.Result[i].Id.split("|");
                if (x[1] == $cmbcargo.val()) {
                    var encargados = {
                        Id: x[0],
                        Text: data.Result[i].Text,
                    }
                    resultado.Result.push(encargados);
                }
            }

            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbencardado, resultado, null, 0, "--Todos--", filters);


        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEncargados);
    }

    function changeArea() {

        const codArea = $(this).val();
        if (codArea != "0") {
            $cmbcargo.prop("disabled", false);
            CargarCargos(codArea);
        }
        else {
            $cmbcargo.val("0").trigger("change.select2");
            $cmbcargo.prop("disabled", true);
          
        }
        $cmbencardado.val("0").trigger("change.select2");
        $cmbencardado.prop("disabled", true);

    }

    function changeCargo() {
        const codCargo = $(this).val();
        if (codCargo != "0") {
            $cmbencardado.prop("disabled", false);
            obtenerEncargados(codCargo);
        }
        else {
            $cmbencardado.val("0").trigger("change.select2");
            $cmbencardado.prop("disabled", true);
        }
    }




    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblViaticos.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Viaticos", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "CodigoViatico", value: $txtCodigo.val() == "" || $txtCodigo.val() == null ? 0 : $txtCodigo.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoEmpresa", value: $cmbempresa.val() == "0" || $cmbempresa.val() == null ? "" : $cmbempresa.val()  }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaViaticoInicio", value: app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "FechaViaticoFinal", value: app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val()) }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoCargo", value: $cmbcargo.val() == "" || $cmbcargo.val() == null ? 0 : $cmbcargo.val()  }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoTecnico", value: $cmbencardado.val() == "" || $cmbencardado.val() == null ? 0 : $cmbencardado.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoArea", value: $cmbarea.val() == "" || $cmbarea.val() == null ? 0 : $cmbarea.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoUbigeo", value: $txtCodUbigeo.val() == null ? "" : $txtCodUbigeo.val() }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "CodigoEstado", value: $cmbestado.val() == "0" || $cmbestado.val() == null ? "" : $cmbestado.val() }).appendTo("#hidden_fields");


        $formBandejaViaticos.attr('action', href);
        $formBandejaViaticos.submit();
    }

    function $btnBuscar_click() {
        

        if ($dateFecIni.val() != "" && $dateFecFin.val() === "") {
            app.message.error("Validación", "Debe ingresar una fecha final en los filtros.");
            return
        };

        var filtrosDTO = buildDTO();
        cargarTablaViaticos(filtrosDTO);

    }

    function btnNuevoClick() {
        const tipoRegViatico = "N";
        sessionStorage.setItem('tipoRegViatico', `${tipoRegViatico}`);
        app.redirectTo("RegistrarViatico/Registro");
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

    function buildDTO() {
        var filtrosDTO = {};
        filtrosDTO.CodigoViatico = $txtCodigo.val() == "" || $txtCodigo.val() == null ? "0" : $txtCodigo.val();
        filtrosDTO.CodigoEmpresa = $cmbempresa.val() == "0" || $cmbempresa.val() == null ? "" : $cmbempresa.val();
        filtrosDTO.FechaViaticoInicio = app.isNull($dateFecIni.val()) || $dateFecIni.val() == "" ? "" : app.parseDate($dateFecIni.val());
        filtrosDTO.FechaViaticoFinal = app.isNull($dateFecFin.val()) || $dateFecFin.val() == "" ? "" : app.parseDate($dateFecFin.val());
        filtrosDTO.CodigoCargo = $cmbcargo.val() == "" || $cmbcargo.val() == null ? "0" : $cmbcargo.val();
        filtrosDTO.CodigoEncargado = $cmbencardado.val() == "" || $cmbencardado.val() == null ? "0" : $cmbencardado.val();
        filtrosDTO.CodigoArea = $cmbarea.val() == "" || $cmbarea.val() == null ? "0" : $cmbarea.val();
        filtrosDTO.CodigoUbigeo = $txtCodUbigeo.val() == null ? "" : $txtCodUbigeo.val();
        filtrosDTO.CodigoEstado = $cmbestado.val() == "0" || $cmbestado.val() == null ? "" : $cmbestado.val();

        if ($NombreRol.val() === "SGI_VIAT_SOLICITANTE") {
            filtrosDTO.UsuarioRegistro = "";
            filtrosDTO.CodigoAreaUsuario = $CodigoAreaUsuario.val();
        }
        else {
            filtrosDTO.UsuarioRegistro = ""; 
            filtrosDTO.CodigoAreaUsuario = 0;
        }


        return filtrosDTO;
    }

    function $openRegFecIni_click() {
        $dateFecIni.focus();
    }

    function $openRegFecFin_click() {
        $dateFecFin.focus();
    }

    function changeDateFechaInicialRegFecIni() {
        $dateFecFin.val('');
        $dateFecFin.datepicker('destroy');
        $dateFecFin.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: $dateFecIni.datepicker('getDate')
        });
    }
  

    function CargarCargos(codArea) {
        var method = "POST";
        var url = "BandejaViatico/ObtenerCargosxAreaViaticos?codigoArea=" + codArea;
        var objParam = "";

        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;
            app.llenarCombo($cmbcargo, data, null, 0, "--Todos--", filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoCargos);
    }

    function cargarTablaViaticos(obj) {
        var method = "POST";
        var url = "BandejaViatico/ListarViaticos";

        var objParam = JSON.stringify(obj);
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoUsuario);
    }

    function cargarTabla(data) {
        var columns = [
            {
                data: "CodigoViatico",
                render: function (data, type, row, meta) {
                    return '<center>  <input type="checkbox" id="chkSel' + data + '" CssClass="chksel" value="' + row.CodigoViatico + "|" + row.Estado.CodigoEstado + '" onclick="bandejaviaticos.validarCheckPadre(' + data + ');" /></center>';
                }
            },
            {
                data: "CodigoViatico",
                render: function (data, type, row, meta) {
                    return ("000000" + data).substring(("000000" + data).length -6, ("000000" + data).length);
                }
            },
            {
                data: "FechaViatico",
                render: function (data, type, row) {
                    return app.obtenerFecha(data);
                }
            },
            { data: "Empresa.Valor1" },
            { data: "Area.NombreArea" },
            { data: "Cargo.NombreCargo" },
            { data: "Encargado.NombresCompletosEmpleado" },
            { data: "Ubigeo" },
            { data: "Estado.AbreviaturaEstado" },
            {
                data: "CodigoViatico",
                render: function (data, type, row, meta) {

                    if ($NombreRol.val() === "SGI_VIAT_SOLICITANTE") {

                        if (row.Estado.CodigoEstado == "APR" || row.Estado.CodigoEstado == "EAC") {
                            $Editar.val("N");
                        }
                        else {
                            $Editar.val("S");
                        };
                    };

                    if ($NombreRol.val() === "SGI_VIAT_ADMINISTRADOR") {

                        if (row.Estado.CodigoEstado == "EAC" || row.Estado.CodigoEstado == "REG") {
                            $Editar.val("N");
                        }
                        else {
                            $Editar.val("S");
                        };
                    };

                    if ($NombreRol.val() === "SGI_VIAT_CONTADOR") {

                        if (row.Estado.CodigoEstado != "EAC") {
                            $Editar.val("N");
                        }
                        else {
                            $Editar.val("S");
                        };
                    };

                    var html = '<div class="text-center">';
                    if ($Editar.val() == "S" && row.Anulado === "N" && (row.Estado.CodigoEstado == "REG" || row.Estado.CodigoEstado == "APR" || row.Estado.CodigoEstado == "EAC")) {
                        html += '<a class="btn btn-default btn-xs" title="Editar"  href="javascript:bandejaviaticos.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    };

                    if ($Ver.val() == "S") {
                        html += ' <a class="btn btn-default btn-xs" title="Ver" href="javascript:bandejaviaticos.ver(' + data  + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    };

                    if ($NombreRol.val() === "SGI_VIAT_SOLICITANTE") {

                        if (row.Estado.CodigoEstado == "REG") {
                            $Anular.val("S");
                        }
                        else {
                            $Anular.val("N");
                        };
                    };

                    if ($Anular.val() == "S" && row.Anulado === "N" && (row.Estado.CodigoEstado == "APR")) {
                        html += ' <a class="btn btn-default btn-xs" title="Anular" href="javascript:bandejaviaticos.anular(' + data + ')"><i class="fa fa-times-circle" aria-hidden="true"></i></a>';
                    };
                    html += '</div>';

                    return html;

                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];
        app.llenarTabla($tblViaticos, data, columns, columnDefs, "#tablaViaticos");
    }

    function editar(idcodviatico) {
        sessionStorage.setItem('CodViatico', `${idcodviatico}`)
        const tipoRegViatico = "U";
        sessionStorage.setItem('tipoRegViatico', `${tipoRegViatico}`);
        app.redirectTo("RegistrarViatico/Registro");
    }

    function ver(idcodviatico) {
        sessionStorage.setItem('CodViatico', `${idcodviatico}`)
        const tipoRegViatico = "V";
        sessionStorage.setItem('tipoRegViatico', `${tipoRegViatico}`);
        app.redirectTo("RegistrarViatico/Registro");
    }

    function anular(idcodviatico) {
        $modalAnular.modal('show');
        $txtObservacion.val('');
        $codViaticoAnulado.val(idcodviatico);
        console.log(idcodviatico);
    }

    function validarCheckPadre(codViatico) {
        var len = $(':checkbox').length -1;
        var contador = 0;
        $(':checkbox').each(function () {
            if (this.value != "x") {
                if (this.checked) {
                    contador = contador + 1;
                }
            }

        });
        if (len === contador) {
            $checkAll.prop('checked', true);
        }
        else {
            $checkAll.prop('checked', false);
        }
    }


    return {
        editar: editar,
        ver: ver,
        anular: anular,
        validarCheckPadre: validarCheckPadre
    };
})(window.jQuery, window, document);