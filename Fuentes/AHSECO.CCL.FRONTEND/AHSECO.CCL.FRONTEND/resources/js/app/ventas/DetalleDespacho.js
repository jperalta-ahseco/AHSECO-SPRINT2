var detalleDespacho = (function ($, win, doc) {
    /***/
    var $nombreusuario = $('#nombreusuario');


    var $chkPrestacionPrincipal = $('#chkPrestacionPrincipal');
    var $chkPrestacionAccesoria = $('#chkPrestacionAccesoria');
    var $txtNroFianzaPA = $('#txtNroFianzaPA');
    var $txtNroFianzaPP = $('#txtNroFianzaPP');
    var $vigencia = $('#vigencia');
    var $estadoDespacho = $('#estadoDespacho');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $perfilnombre = $('#perfilnombre');

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
    var $NumDespacho = $('#NumDespacho'); 
    var $PorcentajeDscto = $('#PorcentajeDscto');

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
        detalleDespacho.contadorObservaciones = 0;
        detalleDespacho.xComprar = [];
        detalleDespacho.Productos = [];
        if ($NumDespacho.val() != "") {
            CargarDatosDespacho();
        }
        else {
            CargarDatosDetalle()
        };
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
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $chkPrestacionPrincipal.click($chkPrestacionPrincipal_click);
        $chkPrestacionAccesoria.click($chkPrestacionAccesoria_click);
        $dateFechaOrdenCompra.on('change', function () {
            if ($(this).val() != "") {
                
                var fechaFin = calcularFechaMax($(this).val());

                $dateFechaMax.val(fechaFin);
            }
            else {
                $dateFechaMax.val("");
            }
            
        });

        $dateFechaContrato.on('change', function () {
            if ($(this).val() != "") {

                var fechaFin = calcularFechaMax($(this).val());

                $dateFechaMax.val(fechaFin)
            }
            else {
                $dateFechaMax.val("");
            }
        });


    };

    function calcularFechaMax(valor) {
        const partes = valor.split('/');  // Separar la fecha por '/'

        var fecha = `${partes[2]}/${partes[1]}/${partes[0]}`;

        var nuevaFecha = new Date(fecha);
        var dias = parseInt($vigencia.val());
        nuevaFecha.setDate(nuevaFecha.getDate() + dias);

        var dia = nuevaFecha.getDate() < 10 ? '0' + nuevaFecha.getDate() : nuevaFecha.getDate();
        var mesActual = (nuevaFecha.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = nuevaFecha.getFullYear();

        var fechaFin = dia + '/' + mes + '/' + year;

        return fechaFin;
    }

    function LimpiarFechaMax() {
        $dateFechaMax.val("")
    };

    function LimpiarFechaContrato() {
        $dateFechaContrato.val("")
        LimpiarFechaMax()
    };

    function LimpiarOrdenCompra() {
        $dateFechaOrdenCompra.val("")
        LimpiarFechaMax()
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
        var url = "BandejaSolicitudesVentas/ObtenerCotizacionVentaDetalle_Despacho"
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

    function CargarTablaDespacho(data) {
        var columns = [
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
                data: "IndStock",
                render: function (data, type, row) {
                    var rpta = "";
                    if (data) {
                        rpta = "Sí";
                    }
                    else {
                        rpta = "No";
                    }
                    return '<center>' + rpta + '</center>'; 
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input disabled type='number' id='cantidad_"+row.Id+"' min='0' max='"+data+"' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "VentaUnitaria",
                render: function (data, type, row) {
                    if (data == null)
                    {
                        return '<center></center>';
                    }
                    else
                    {
                        if ($NumDespacho.val() != "") {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center id="ventaUnitaria_'+row.Id+'">'+ data +'</center>';
                        }
                    }
                }
            },
            {
                data: "MontoDescuento",
                render: function (data, type, row) {
                    if (data == null)
                    {
                        return '<center></center>';
                    }
                    else
                    {
                        if ($NumDespacho.val() != "") {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            return '<center id="montoDscto_' + row.Id + '"></center>';
                        }
                    }
                }
            },
            {
                data: "VentaTotalSinIGV",
                render: function (data, type, row) {
                    if (row.VentaTotalSinIGVDscto == null) {
                        if (data == null) {
                            return '<center></center>';
                        }
                        else {
                            if ($NumDespacho.val() != "") {
                                data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                                return '<center>' + data + '</center>';
                            }
                            else {
                                return '<center id="ventaTotalSinIGV_' + row.Id + '"></center>';
                            };
                        }
                    }
                    else {
                        if ($NumDespacho.val() != "") {
                            data = app.formatearEnteroComa(parseFloat(row.VentaTotalSinIGVDscto).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            return '<center id="ventaTotalSinIGV_' + row.Id + '"></center>';
                        };
                    };
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
                    if (data == null)
                    {
                        return '<center></center>';
                    }
                    else
                    {
                        if ($NumDespacho.val() != "") {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            return '<center id="ventaTotalSinIGVCGanan_' + row.Id + '"></center>';
                        }
                    }
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
                data: "IndStock",
                render: function (data, type, row) {
                    var rpta = "";
                    if (data) {
                        rpta = "Sí";
                    }
                    else {
                        rpta = "No";
                    }
                    return '<center>' + rpta + '</center>';
                }
            },
            {
                data: "Cantidad",
                render: function (data, type, row) {
                    var casilla = "<input disabled type='number' onblur='if(parseFloat(this.value) > " + data + ") { this.value = " + data +"}'  oninput='if(parseFloat(this.value) > " + data + ") { this.value = "+ data +"}'   id='cantidad_" + row.Id + "' min='0' max='" + data + "' style='width:100%' placeholder='Cantidad' value='" + data + "' />"
                    return '<center>' + casilla + '</center>';
                }
            },
            {
                data: "VentaUnitaria",
                render: function (data, type, row) {
                    if (data == null) {
                        return '<center></center>';
                    }
                    else {
                        if ($NumDespacho.val() != "") {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center>' + data + '</center>';
                        }
                        else {
                            data = app.formatearEnteroComa(parseFloat(data).toFixed(2));
                            return '<center id="ventaUnitaria_' + row.Id + '">' + data + '</center>';
                        }
                    }
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
                $('#cantidad_' + this.value).prop('disabled', false);
            }
            else {
                detalleDespacho.xComprar = detalleDespacho.xComprar.filter(valor => valor != this.value);
                $('#cantidad_' + this.value).prop('disabled', true);
            }
        });

        $(document).on('change', '#checkSeleccionarTodos', function (e) {
            if (this.checked) {
                $checkSeleccionar.prop('checked', true);
                $('input').filter('#checkSeleccionar').prop('checked', true);
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprar.push(ids[i].value);
                    $('#cantidad_' + ids[i].value).prop('disabled', false);
                }
            }
            else {
                detalleDespacho.xComprar = []
                var ids = document.querySelectorAll("input[name='checkSeleccionar']:checked");
                for (var i = 0; i < ids.length; i++) {
                    detalleDespacho.xComprar.push(ids[i].value);
                    $('#cantidad_' + ids[i].value).prop('disabled', true);
                };
                $('input').filter('#checkSeleccionar').prop('checked', false);
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
                    var url = "BandejaSolicitudesVentas/GuardarAdjunto";
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
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:detalleDespacho.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detalleDespacho.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detalleDespacho.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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

        var validador = 0;
        if ($cmbTipoDespacho.val() == "DESP01") {
            if ($dateFechaOrdenCompra.val() == "" || $dateFechaOrdenCompra.val() == undefined|| $dateFechaOrdenCompra.val().trim().length == 0) {
                validador = 1; 
            };
        };

        if ($cmbTipoDespacho.val() == "DESP02") {
            if ($dateFechaContrato.val() == "" || $dateFechaContrato.val() == undefined || $dateFechaContrato.val().trim().length == 0) {
                validador = 2;
            };
        };

        if (validador == 1) {
            app.message.error("Validación", "Debe de ingresar la fecha de orden de compra");
            return;
        };

        if (validador == 2) {
            app.message.error("Validación", "Debe de ingresar la fecha de contrato");
            return;
        };

        if (detalleDespacho.xComprar.length == 0) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un producto");
            return;
        };

        if ($dateFechaMax.val() == "" || $dateFechaMax.val() == undefined) {
            app.message.error("Validación", "La fecha máxima está vacia, por favor revisar");
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
                    , PorcentajeDscto: $PorcentajeDscto.val()
                    , MargenAdicional: detalleDespacho.Productos[i].PorcentajeGanancia
                    , IndStock: detalleDespacho.Productos[i].IndStock
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

    function GuardarObservacionReqClick() {
        if ($txtObservacion.val().trim() == "" || $txtObservacion.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese la observación.");
            return;
        }

        if ($NumDespacho.val() != "") {
            var method = "POST";
            var url = "BandejaSolicitudesVentas/GuardarObservacion"
            var objObservacion = {
                TipoProceso: "I",
                Observacion: $txtObservacion.val(),
                Id_WorkFlow: $codigoWorkflow.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Estado_Instancia: $estadoDespacho.val()
            };

            var objParamObs = JSON.stringify(objObservacion);

            var fnSi = function () {
                var fnDoneCallBack = function (data) {

                    detalleDespacho.contadorObservaciones += 1;

                    observaciones.push(
                        {
                            TipoProceso: "I",
                            Observacion: $txtObservacion.val(),
                            Nombre_Usuario: $nombreusuario.val(),
                            Id_WorkFlow: $codigoWorkflow.val(),
                            Estado_Instancia: $estadoReq.val
                        }
                    );
                    var nuevoTr = "<tr id=row" + detalleDespacho.contadorObservaciones + ">" +
                        "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                        "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                        "<th style='text-align: center;'>" + hoy() + "</th>" +
                        "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                        "<th style='text-align: center;'>" +
                        //                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: detalleDespacho.eliminarObsTmp(" + detalleDespacho.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
                        "</th> " +
                        "</tr>";
                    $tblObservaciones.append(nuevoTr);
                    $NoExisteRegObs.hide();
                    $modalObservacion.modal('toggle');

                    var redirectTo = function () {
                        if (rptaFinal == 1) {
                            establecerVariablesSession();
                        };
                    };

                    app.message.success("Éxito", "Se registró la observación satisfactoriamente", "Aceptar", redirectTo);
                };

                var fnFailCallBack = function () {
                    app.message.error("Validación", "Ocurrió un error al registrar la observación.");
                };
                app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoObservacion);
            };
            return app.message.confirm("Confirmación", "¿Desea registrar la observación?", "Sí", "No", fnSi, null);
        }
        else {
            detalleDespacho.contadorObservaciones += 1;

            observaciones.push({
                Id: detalleDespacho.contadorObservaciones,
                TipoProceso: "I",
                Estado_Instancia: "REG",
                Observacion: $txtObservacion.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Perfil_Usuario: $perfilnombre.val()
            })
            var nuevoTr = "<tr id=row" + detalleDespacho.contadorObservaciones + ">" +
                "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                "<th style='text-align: center;'>" + hoy() + "</th>" +
                "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                "<th style='text-align: center;'>" +
                "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: detalleDespacho.eliminarObsTmp(" + detalleDespacho.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                "</th> " +
                "</tr>";
            $tblObservaciones.append(nuevoTr);
            $NoExisteRegObs.hide();
            $modalObservacion.modal('toggle');
        };
        $txtObservacion.val("");
    }

    function CargarDatosDespacho()
    {
        var method = "POST";
        var url = ""; 
        var obj = {

        };
        var objParam = JSON.string(obj);

        var fnDoneCallBack = function (data) {
            CargarTablaDespacho(data);
        };

        var fnFailCallBack = function () {

        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };


    function download(IdDocumento) {

        var documento = adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.abrirVentana("BandejaSolicitudesVentas/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);
    }

    function eliminarDocumento(idDocumento) {
        if ($NumDespacho.val() != "") {
            var fnSi = function () {
                var method = "POST";
                var url = "BandejaSolicitudesVentas/EliminarAdjunto";
                var obj = {
                    Accion: "D",
                    CodigoDocumento: idDocumento,
                    CodigoWorkFlow: 0,
                    CodigoTipoDocumento: "",
                    NombreDocumento: "",
                    VerDocumento: true,
                    RutaDocumento: "",
                    Eliminado: 1
                }
                var objParam = JSON.stringify(obj);
                var fnDoneCallback = function (data) {

                    if (data.Result.Codigo > 0) {

                        const child = document.getElementById("row" + idDocumento);
                        document.getElementById("tbodyDocAdjuntos").removeChild(child);
                        adjuntos = adjuntos.filter(documento => documento.CodigoDocumento != idDocumento);
                        if (adjuntos.length == 0) {
                            $NoExisteRegDoc.show();
                        }
                        //location.reload();
                    }
                    else {
                        app.message.error("Error en la Actualización", data.Result.Mensaje);

                    }

                };
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, null);
            };
            return app.message.confirm("Solicitud de Venta", "¿Está seguro(a) que desea eliminar el documento adjunto?", "Sí", "No", fnSi, null);
        };
    };

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
    };

    function eliminarObsTmp(idObs) {
        var fnSi = function () {
            observaciones = observaciones.filter(observacion => observacion.Id !== Number(idObs));
            $("#row" + idObs).remove();
            detalleDespacho.contadorObservaciones -= 1
            if (detalleDespacho.contadorObservaciones == 0) {
                $NoExisteRegObs.show();
            };
        };

        return app.message.confirm("Confirmación", "Está seguro(a) que desea eliminar esta observación?", "Si", "No", fnSi, null);

    };


    return {
        download: download,
        eliminarDocumento: eliminarDocumento,
        eliminarDocTemp: eliminarDocTemp,
        eliminarObsTmp: eliminarObsTmp,

    };
})(window.jQuery, window, document);