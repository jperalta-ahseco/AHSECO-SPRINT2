var detalleDespacho = (function ($, win, doc) {
    /***/
    var $nombreusuario = $('#nombreusuario');


    var $chkPrestacionPrincipal = $('#chkPrestacionPrincipal');
    var $chkPrestacionAccesoria = $('#chkPrestacionAccesoria');
    var $txtNroFianzaPA = $('#txtNroFianzaPA');
    var $txtNroFianzaPP = $('#txtNroFianzaPP');
    
    var $btnRegistrar = $('#btnRegistrar');
    var $cmbTipoDespacho = $('#cmbTipoDespacho');
    var $txtNumOrden = $('#txtNumOrden');
    var $txtNumContrato = $('#txtNumContrato');
    var $divNumOrden = $('#divNumOrden');
    var $divContrato = $('#divContrato');
    var $divFecOrden = $('#divFecOrden');
    var $divFecContrato = $('#divFecContrato');
    var $dateFechaOrdenCompra = $('#dateFechaOrdenCompra');
    var $dateFechaContrato = $('#dateFechaContrato');
    var $dateFechaMax = $('#dateFechaMax');
    var $openRegdateMax = $('#openRegdateMax');
    var $openRegdateContrato = $('#openRegdateContrato');
    var $openRegdateOrdenCompra = $('#openRegdateOrdenCompra');
    var $LimpiardateFechaMax = $('#LimpiardateFechaMax');
    var $LimpiardateOrdenCompra = $('#LimpiardateOrdenCompra');
    var $LimpiardateFechaContrato = $('#LimpiardateFechaContrato');
    var $radFianza = $("#radFianza");
    var $radFianza2 = $('#radFianza2');

    /*Modales*/
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalObservacion = $('#modalObservacion');


    /*Modales Observacion*/
    var $NoExisteRegObs = $('#NoExisteRegObs');
    var $btnAgregarObservacion = $('#btnAgregarObservacion');
    var $tblObservaciones = $('#tblObservaciones');
    var $tituloModalObservacion = $('#tituloModalObservacion');
    var $grpAuditoriaObservacion = $('#grpAuditoriaObservacion');
    var $txtObservacion = $('#txtObservacion');
    var $btnGuardarObservacionReq = $('#btnGuardarObservacionReq');
    var $tbodyObservaciones = $('#tbodyObservaciones');
    var $tabObservaciones = $('#tabObservaciones');
    var $navObservaciones = $('#navObservaciones');
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');

    /*Modal Adjuntos*/
    var $tipoDocAdjuntos = $('#tipoDocAdjuntos');
    var $fileCargaDocumentoSustento = $('#fileCargaDocumentoSustento');
    var $btnAgregarDocumento = $('#btnAgregarDocumento');
    var $NoExisteRegDoc = $('#NoExisteRegDoc');
    var $tbodyDocAdjuntos = $('#tbodyDocAdjuntos');
    var $tblDocumentosCargados = $('#tblDocumentosCargados');
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');
    var $cmbTipoDocumentoCarga = $('#cmbTipoDocumentoCarga');
    var $btnAdjuntarDocumento = $('#btnAdjuntarDocumento');
    var $btnCargarDocumento = $('#btnCargarDocumento');
    var $hdnDocumentoCargadoId = $('#hdnDocumentoCargadoId');
    var $cmbDocumentoCarga = $('#cmbDocumentoCarga');
    var $lblNombreArchivo = $('#lblNombreArchivo');

    /*Modal Seguimiento*/
    var $tblSeguimiento = $('#tblSeguimiento');
    var $NoExisteRegSeg = $('#NoExisteRegSeg');

    var $tblDetalleCotizacion = $('#tblDetalleCotizacion');
    var $IdCotizacion = $('#IdCotizacion');
    var $checkSeleccionar = $('#checkSeleccionar');
    var $checkSeleccionarTodos = $('#checkSeleccionarTodos');
    var $btnRegresar = $('#btnRegresar');
    var $NumSol = $('#NumSol');
    var $IdCotizacion = $('#IdCotizacion');
    /*Mensajes*/
    var mensajes = {

    };

    let observaciones = [];
    let adjuntos = [];

    $(Initialize);

    function Initialize() {
        detalleDespacho.xComprar = [];
        detalleDespacho.Productos = [];
        CargarDatosDetalle()
        CargarCombos();
        CargarTipoDocumento(8); //Despacho ventas 
        $dateFechaMax.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFechaContrato.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $dateFechaOrdenCompra.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        $cmbTipoDespacho.on('change', function () {
            if ($(this).val() == "DESP01") {
                $divNumOrden.css('display', 'block');
                $divFecOrden.css('display', 'block');
                $divFecContrato.css('display', 'none');
                $divContrato.css('display', 'none');
                $txtNumOrden.val("");
                $txtNumContrato.val("");
                $dateFechaOrdenCompra.val("");
                $dateFechaContrato.val("");

            }
            else if ($(this).val() == "DESP02") {
                $divNumOrden.css('display', 'none');
                $divContrato.css('display', 'block');
                $divFecOrden.css('display', 'none');
                $divFecContrato.css('display', 'block');
                $txtNumOrden.val("");
                $txtNumContrato.val("");
                $dateFechaOrdenCompra.val("");
                $dateFechaContrato.val("");
            };
        });
        $btnRegresar.click(Regresar);
        $LimpiardateFechaMax.click(LimpiarFechaMax);
        $LimpiardateFechaContrato.click(LimpiarFechaContrato);
        $LimpiardateOrdenCompra.click(LimpiarOrdenCompra);
        $openRegdateOrdenCompra.click($openRegdateOrdenCompraClick);
        $openRegdateContrato.click($openRegdateContratoClick);
        $openRegdateMax.click($openRegdateMaxClick);
        $radFianza.click($radFianza_click);
        $radFianza2.click($radFianza2_click);
        $btnRegistrar.click(RegistrarNuevo);
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $chkPrestacionPrincipal.click($chkPrestacionPrincipal_click);
        $chkPrestacionAccesoria.click($chkPrestacionAccesoria_click);

    };

    function LimpiarFechaMax() {
        $dateFechaMax.val("")
    };

    function LimpiarFechaContrato() {
        $dateFechaContrato.val("")
    };

    function LimpiarOrdenCompra() {
        $dateFechaOrdenCompra.val("")
    };

    function $openRegdateOrdenCompraClick() {
        $dateFechaOrdenCompra.focus();
    };

    function $openRegdateContratoClick() {
        $dateFechaContrato.focus();
    };

    function $openRegdateMaxClick() {
        $dateFechaMax.focus();
    };

    function CargarCombos() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/FiltrosDespacho";

        var fnDoneCallBack = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbTipoDespacho, data.Result.TipDespacho, null, "", "-- Seleccione --", filters);

            $cmbTipoDespacho.val("DESP01").trigger('change.select2');
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se presentó un error al cargar combos");
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null);
    };


    function Registrar() {

    };

    function CargarDatosDetalle() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/ObtenerCotizacionVentaDetalle"
        var obj = {
            IdCotizacion: $IdCotizacion.val()
        };

        var objParam = JSON.stringify(obj);


        var fnDoneCallBack = function (data) {
            detalleDespacho.Productos = data.Result;
            CargarTablaDetalleCot(data);
            btnCheck();
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al realizar la consulta del detalle de cotización.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null);
    };

    function CargarTablaDetalleCot(data) {
        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    var seleccionar = '<input class="form-check-input cheks" name="checkSeleccionar" type="checkbox" value="' + data + '" id="checkSeleccionar">';
                    return '<center>' + seleccionar + '</center>';
                }

            },
            {
                data: "CodItem",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Descripcion",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input type='number' id='cantidad_"+row.Id+"' min='0' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "VentaUnitaria",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VentaTotalSinIGV",
                render: function (data, type, row) {
                    var valor;
                    if (row.VentaTotalSinIGVDscto == null) {
                        if (data == null) {
                            valor = "";
                        }
                        else {
                            valor = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                        }
                    }
                    else {
                        valor = app.formatearEnteroComa(parseFloat(row.VentaTotalSinIGVDscto).toFixed(2));
                    };
                    return '<center>' + valor + '</center>';
                }
            },
            {
                data: "PorcentajeGanancia",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "VentaTotalSinIGVConGanacia",
                render: function (data, type, row) {
                    if (data == null) { data = ""; }
                    else { data = app.formatearEnteroComa(parseFloat(data).toFixed(2)); }
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    var ver = '<a id="btnVerItem" class="botonDetCot btn btn-info btn-xs" title="Ver" href="javascript: cotvtadet.EditarCotDetItem(' + data + ')"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver</a>';
                    return '<center>' + ver + '</center>';
                }
            }
        ];

        var columnDefs =
        {
            targets: [0],
            visible: false
        };

        app.llenarTabla($tblDetalleCotizacion, data, columns, columnDefs, "#tblDetalleCotizacion", null, null, null);
    };

    function Regresar() {
        var method = "POST";
        var url = "BandejaSolicitudesVentas/InicializarDespacho";
        var obj = {
            Solicitud: $NumSol.val(),
            IdCotizacion: $IdCotizacion.val()
        };
        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaSolicitudesVentas/BandejaDespacho");
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Se presentó un error al tratar de acceder a la bandeja de despacho.");
            return;
        };

        app.llamarAjaxNoLoading(method, url, objParam, fnDoneCallBack, fnFailCallBack);
    };

    function RemoverDetalle() {

    };

    function GuardarDetalle() {

    };


    function btnCheck() {
        $(document).on('change', '#checkSeleccionar', function (e) {
            if (this.checked) {
                detalleDespacho.xComprar.push(this.value);
            }
            else {
                detalleDespacho.xComprar = detalleDespacho.xComprar.filter(valor => valor != this.value);
            }
        });

        $(document).on('change', '#checkSeleccionarTodos', function (e) {
            if (this.checked) {
                $checkSeleccionar.prop('checked', true);
                $('input').filter('#checkSeleccionar').prop('checked', true);
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                var a = [];
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprar.push(ids[i].value);
                }
            }
            else {
                $('input').filter('#checkSeleccionar').prop('checked', false);
                detalleDespacho.xComprar = []
            }
        });
    }

    function $modalObservacionClick() {
        $tituloModalObservacion.html("Nueva observación");
        $grpAuditoriaObservacion.hide();
        $modalObservacion.modal("show");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
    };

    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
    };

    function $modalCargaDocumentoClick() {
        $hdnDocumentoCargadoId.val("");
        //$cmbTipoDocumentoCarga.empty();
        $cmbDocumentoCarga.empty();
        $txtDescripcionDocumentoCarga.val("");
        $cmbTipoDocumentoCarga.val("0").trigger("change.select2");
        $lblNombreArchivo.text("");
        $modalCargaDocumento.modal("show");
    };

    function CargarTipoDocumento(codFlujo) {
        var method = "POST";
        var url = "Utiles/ListarTipoDocumentos?codFlujo=" + codFlujo;
        var objParam = '';
        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbTipoDocumentoCarga, data, null, 0, "--Seleccione--", filters);

        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
    }

    function $fileCargaDocumentoSustento_change() {


        var fileInput = document.getElementById("fileCargaDocumentoSustento");

        if (myfile.length > 0) {
            myfile = "";
        }

        myfile = $(this).val();
        var ext = myfile.split('.').pop();
        if (ext == "pdf" || ext == "PDF" ||
            ext == "xls" || ext == "XLS" ||
            ext == "xlsx" || ext == "XLSX" ||
            ext == "doc" || ext == "DOC" ||
            ext == "docx" || ext == "DOCX" ||
            ext == "zip" || ext == "ZIP" ||
            ext == "rar" || ext == "RAR" ||
            ext == "ppt" || ext == "PPT" ||
            ext == "pptx" || ext == "PPTX"
        ) {
            //beforeSendCargaDoc();
            var formdata = new FormData(); //FormData object
            //Appending each file to FormData object
            formdata.append(fileInput.files[0].name, fileInput.files[0]);
            formdata.append('name', name);

            $lblNombreArchivo.text(fileInput.files[0].name);

        }
        else if (myfile !== "") {

            app.message.error('Validación', 'El formato no es el permitido', 'Aceptar', null)
            this.value = "";
            $lblNombreArchivo.text("");

        } else {
            this.value = "";
            $lblNombreArchivo.text("");

        }

    }

    function $adjuntarDocumento_click() {
        //$fileCargaDocumentoSustento.click();
        $fileCargaDocumentoSustento.val("");
        $lblNombreArchivo.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustento').click();

    }


    function $btnCargarDocumento_click() {
        if ($cmbTipoDocumentoCarga.val() == 0 || $cmbTipoDocumentoCarga.val() == "" || $cmbTipoDocumentoCarga.val() == null) {
            app.message.error('Validación', 'Debe seleccionar el tipo de documento', 'Aceptar', null);
            return false;
        }
        if ($lblNombreArchivo.text() === "") {
            app.message.error('Validación', 'Debe cargar un archivo', 'Aceptar', null);
            return false;
        }
        var fileInput = document.getElementById("fileCargaDocumentoSustento");

        var formdata = new FormData(); //FormData object
        //Appending each file to FormData object
        formdata.append(fileInput.files[0].name, fileInput.files[0]);
        formdata.append('name', name);

        var fileInput = document.getElementById("fileCargaDocumentoSustento");
        var file = fileInput.files[0];
        var req = new XMLHttpRequest();
        var ext = fileInput.files[0].name.split('.').pop();

        if (file.size > 4000000) {
            app.message.error("Validación", "El documento cargado no debe de superar los 4mb, por favor revisar");
            return;
        };

        req.open("POST", "UploadFiles?extension=" + ext, true);
        req.setRequestHeader("File-Name", file.name);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send(formdata);

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                if (req.responseText == "error" || req.responseText == "false") {
                    app.message.error('Validación', 'Hubo un error al cargar el archivo', 'Aceptar', null);
                    return false;
                }



                var cont = parseInt($contadordoc.val());
                cont = cont + 1;

                var ruta_guardada = req.responseText;

                ruta_guardada = ruta_guardada.replace("\\", "");
                ruta_guardada = ruta_guardada.replace('"', '');
                ruta_guardada = ruta_guardada.replace('"', '');

                $contadordoc.val(cont);

                if ($numReclamo.val() != "") {

                    var method = "POST";
                    var url = "BandejaGarantia/GuardarAdjunto";
                    var obj = {
                        Accion: "I",
                        CodigoDocumento: 0,
                        CodigoWorkFlow: $codigoWorkflow.val(),
                        CodigoTipoDocumento: $cmbTipoDocumentoCarga.val(),
                        NombreDocumento: $lblNombreArchivo.text(),
                        VerDocumento: true,
                        RutaDocumento: ruta_guardada,
                        Eliminado: 0
                    }
                    var objParam = JSON.stringify(obj);
                    var fnDoneCallback = function (data) {

                        if (data.Result.Codigo > 0) {
                            adjuntos.push(
                                {
                                    Accion: "I",
                                    CodigoDocumento: data.Result.Codigo,
                                    CodigoWorkFlow: $codigoWorkflow.val(),
                                    CodigoTipoDocumento: $cmbTipoDocumentoCarga.val(),
                                    NombreDocumento: $lblNombreArchivo.text(),
                                    VerDocumento: true,
                                    RutaDocumento: ruta_guardada,
                                    Eliminado: 0
                                }
                            );
                            var html = '<div class="text-center">';
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:garantias.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:garantias.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                            html += '</div>';


                            var nuevoTr = "<tr bgcolor='FFFDC1' id='row" + data.Result.Codigo + "'>" +
                                "<th>" + $("#cmbTipoDocumentoCarga option:selected").text() + "</th>" +
                                "<th>" + $lblNombreArchivo.text() + "</th>" +
                                "<th>" + $nombreusuario.val() + "</th>" +
                                "<th>" + $perfilnombre.val() + "</th>" +
                                "<th>" + hoy() + "</th>" +
                                "<th>" + html + "</th>" +
                                "</tr>";


                            $NoExisteRegDoc.hide();
                            $tblDocumentosCargados.append(nuevoTr);
                            //location.reload();

                        }
                        else {
                            app.message.error("Error en la Actualización", data.Result.Mensaje);

                        }

                    };
                    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);

                }
                else {

                    adjuntos.push({
                        "Id": cont,
                        "CodigoDocumento": 0,
                        "CodigoTipoDocumento": $cmbTipoDocumentoCarga.val(),
                        "NombreDocumento": $lblNombreArchivo.text(),
                        "VerDocumento": true,
                        "RutaDocumento": ruta_guardada,
                        "Eliminado": 0
                    });

                    var html = '<div class="text-center">';
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:garantias.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                    html += '</div>';


                    var nuevoTr = "<tr bgcolor='FFFDC1' id='filadoc" + cont + "'>" +
                        "<th>" + $("#cmbTipoDocumentoCarga option:selected").text() + "</th>" +
                        "<th>" + $lblNombreArchivo.text() + "</th>" +
                        "<th>" + $nombreusuario.val() + "</th>" +
                        "<th>" + $perfilnombre.val() + "</th>" +
                        "<th>" + hoy() + "</th>" +
                        "<th>" + html + "</th>" +
                        "</tr>";


                    $NoExisteRegDoc.hide();
                    $tblDocumentosCargados.append(nuevoTr);
                }
            };
        };
        $modalCargaDocumento.modal("hide");
    }

    function eliminarDocTemp(cont) {

        adjuntos.forEach(function (currentValue, index, arr) {
            if (adjuntos[index].Id == cont) {
                adjuntos.splice(index, 1);
            }
        });
        $("#filadoc" + cont).remove();

        if (adjuntos.length == 0) {
            $NoExisteRegDoc.show();
        }
    }

    function $radFianza2_click() {
        if ($radFianza2.is(':checked')) {
            $chkPrestacionPrincipal.attr("disabled", "disabled");
            $chkPrestacionAccesoria.attr("disabled", "disabled");
            $chkPrestacionPrincipal.prop('checked', false);
            $chkPrestacionAccesoria.prop('checked', false);
            $txtNroFianzaPA.attr("disabled", "disabled");
            $txtNroFianzaPP.attr("disabled", "disabled");
            $txtNroFianzaPA.val('');
            $txtNroFianzaPP.val('');
        }
    }

    function $radFianza_click() {
        if ($radFianza.is(':checked')) {
            $chkPrestacionPrincipal.removeAttr("disabled");
            $chkPrestacionAccesoria.removeAttr("disabled");
            $txtNroFianzaPA.attr("disabled", "disabled");
            $txtNroFianzaPP.attr("disabled", "disabled");
            $txtNroFianzaPA.val('');
            $txtNroFianzaPP.val('');
        }
    }

    function $chkPrestacionAccesoria_click() {
        if ($chkPrestacionAccesoria.is(':checked')) {
            $txtNroFianzaPA.removeAttr("disabled");
            $txtNroFianzaPA.val('');
        }
        else {
            $txtNroFianzaPA.attr("disabled", "disabled");
            $txtNroFianzaPA.val('');
        }
    }

    function $chkPrestacionPrincipal_click() {
        if ($chkPrestacionPrincipal.is(':checked')) {
            $txtNroFianzaPP.removeAttr("disabled");
            $txtNroFianzaPP.val('');
        }
        else {
            $txtNroFianzaPP.attr("disabled", "disabled");
            $txtNroFianzaPP.val('');
        }
    }

    function RegistrarNuevo() {
        if ($cmbTipoDespacho.val() == "" || $cmbTipoDespacho.val() == null) {
            app.message.error("Validación", "Es necesario seleccionar el tipo de despacho");
            return;
        };

        if ($txtNumOrden.val() == "" || $txtNumOrden.val() == null || $txtNumOrden.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese ingrese el número de Orden");
            return;
        };

        if (detalleDespacho.xComprar.length == 0) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un producto");
            return;
        };

        var method = "POST";
        var url = "BandejaSolicitudesVentas/InsertDespacho";

        var ProductosxVender = [];
        for (var i = 0; detalleDespacho.Productos.length > i; i++) // Obtenemos solo los seleccionados con la cantidad modificada.
        {
            if (detalleDespacho.xComprar.includes(detalleDespacho.Productos[i].Id.toString())) {
                detalleDespacho.Productos[i].Cantidad = $("#cantidad_" + detalleDespacho.Productos[i].Id.toString()).val() //referenciamos al input cantidad dinamico de cada ROW para obtener su valor y utilizarlo.
                ProductosxVender.push({
                    IdCotDetalle: detalleDespacho.Productos[i].Id
                    , Cantidad: detalleDespacho.Productos[i].Cantidad
                    , ValorUnitario: detalleDespacho.Productos[i].VentaUnitaria
                    , ValorTotal: detalleDespacho.Productos[i].VentaTotalSinIGV
                    , MargenAdicional: detalleDespacho.Productos[i].PorcentajeGanancia
                    , VvTotalSigVcgan: detalleDespacho.Productos[i].VentaTotalSinIGVConGanacia
                    , MontoDscto: detalleDespacho.Productos[i].MontoDescuento
                    , VvTotalSigVDscto: detalleDespacho.Productos[i].VentaTotalSinIGVDscto
                });
            };
        };

        var fianza = false;
        var indFianzaApp = false; 
        var indFianzaApa = false;

        if ($radFianza.is(':checked'))
        {
            fianza = true;
        };

        if ($radFianza2.is(':checked'))
        {
            fianza = false;
        };
        if ($chkPrestacionPrincipal.is(':checked'))
        {
            indFianzaApp = true;
        };
        if ($chkPrestacionAccesoria.is(':checked'))
        {
            indFianzaApa = true;
        };

        var obj = {
            Cabecera: {
                Id_Solicitud: $NumSol.val()
                , Id_Cotizacion: $IdCotizacion.val()
                , NumOrden: $txtNumOrden.val()
                , FechaOrden: $dateFechaOrdenCompra.val()
                , FechaMax: $dateFechaMax.val()
                , NumContrato: $txtNumContrato.val()
                , FecContrato: $dateFechaContrato.val()
                , TipoDesp: $cmbTipoDespacho.val()
                , Fianza: fianza
                , PrestPrin: indFianzaApp
                , NumFianzaApp: $txtNroFianzaPP.val()
                , PrestAcc: indFianzaApa
                , NumFianzaApa: $txtNroFianzaPA.val()
            },
            ListDespachoDetalle: ProductosxVender,
            Documentos: adjuntos,
            Observaciones: observaciones            
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            var fnAceptar = function () {
                Regresar()
            };
            app.message.success("Éxito", "Se realizó la inserción correctamente","Aceptar",fnAceptar);
        };


        app.llamarAjax(method, url, objParam, fnDoneCallBack, null, null, null);
    };


    return {
    };
})(window.jQuery, window, document);