var registroviaticos = (function ($, win, doc) {
    var $dateFecVia = $("#dateFecVia");
    var $lblDescripcionEstado = $("#lblDescripcionEstado");
    var $formObservacion = $("#formObservacion");
    var $openFecViatico = $("#openFecViatico");
    var $codigoEstado = $("#codigoEstado");
    var $txtObservacion = $("#txtObservacion");
    var $btnEnviarContabilidad = $("#btnEnviarContabilidad");
    var $dateFecAbo = $("#dateFecAbo");
    var $cmbempresa = $("#cmbempresa");
    var $cmbarea = $("#cmbarea");
    var $cmbcargo = $("#cmbcargo");
    var $cmbencargado = $("#cmbencargado");
    var $txtDestino = $("#txtDestino");
    var $txtUbigeo = $("#txtUbigeo");
    var $txtCliente = $("#txtCliente");
    var $cmbTipo = $("#cmbTipo");
    var $txtTipo = $("#txtTipo");
    var $txtConcepto = $("#txtConcepto");
    var $txtDetalle = $("#txtDetalle");
    var $txtCantidad = $("#txtCantidad");
    var $txtValorUnit = $("#txtValorUnit");
    var $txtMonto = $("#txtMonto");
    var $txtDias = $("#txtDias");
    var $txtMotivo = $("#txtMotivo");
    var $contador = $("#contador");
    var $contadordoc = $("#contadordoc");
    var $codDetalleViatico = $("#codDetalleViatico");
    var $tablaDetalleViatico = $("#tablaDetalleViatico");
    var $btnAbrirDetalleViatico = $("#btnAbrirDetalleViatico");
    var $btnAddDetalle = $("#btnAddDetalle");
    var $modalDetalleViatico = $("#modalDetalleViatico");
    var $NoExisteReg = $("#NoExisteReg");
    var $TotalMontoDetalle = $("#TotalMontoDetalle");
    var $btnGuardarViatico = $("#btnGuardarViatico");
    var $NoExisteRegSeg = $("#NoExisteRegSeg");
    var $btnRegresar = $("#btnRegresar");
    var $tabSeguimiento = $("#tabSeguimiento");
    var $codigoViatico = $("#codigoViatico");
    var $codigoWorkflow = $("#codigoWorkflow");
    var $rolUsuario = $("#rolUsuario");
    var $btnAbonar = $("#btnAbonar");
    var $tblDocumentosCargados = $("#tblDocumentosCargados");
    var $NoExisteRegDoc = $("#NoExisteRegDoc");
    var $lblDescripcionTitulo = $("#lblDescripcionTitulo");
    var $tbodyDocAdjuntos = $('#tbodyDocAdjuntos');
    var $btnAdjuntarDocumento = $("#btnAdjuntarDocumento");
    var $fileCargaDocumentoSustento = $("#fileCargaDocumentoSustento");
    var $lblNombreArchivo = $("#lblNombreArchivo");
    var $nombreusuario = $("#nombreusuario");
    var $perfilnombre = $("#perfilnombre");
    var $lblNroSolicitud = $("#lblNroSolicitud");

    var $fecViaEdit = $("#fecViaEdit");
    var $fecViaVer = $("#fecViaVer");
    var $fecViaLabel = $("#fecViaLabel");
    var $clienteEdit = $("#clienteEdit");
    var $clienteVer = $("#clienteVer");
    var $clienteLabel = $("#clienteLabel");
    var $empresaEdit = $("#empresaEdit");
    var $empresaVer = $("#empresaVer");
    var $empresaLabel = $("#empresaLabel");
    var $motivoEdit = $("#motivoEdit");
    var $motivoVer = $("#motivoVer");
    var $motivoaLabel = $("#motivoaLabel");
    var $areaEdit = $("#areaEdit");
    var $areaVer = $("#areaVer");
    var $areaLabel = $("#areaLabel");
    var $lugarEdit = $("#lugarEdit");
    var $lugarVer = $("#lugarVer");
    var $lugarLabel = $("#lugarLabel");
    var $cargoEdit = $("#cargoEdit");
    var $cargoVer = $("#cargoVer");
    var $cargoLabel = $("#cargoLabel");
    var $diasEdit = $("#diasEdit");
    var $diasVer = $("#diasVer");
    var $diasLabel = $("#diasLabel");
    var $encargadoEdit = $("#encargadoEdit");
    var $encargadoVer = $("#encargadoVer");
    var $encargadoLabel = $("#encargadoLabel");
    var $fechaAbonoEdit = $("#fechaAbonoEdit");
    var $fechaAbonoVer = $("#fechaAbonoVer");
    var $fechaAbonoLabel = $("#fechaAbonoLabel");
    var $codigoArea = $("#codigoArea");

    var $modalCargaDocumento = $("#modalCargaDocumento");
    var $btnAgregarDocumento = $("#btnAgregarDocumento");
    var $cmbTipoDocumentoCarga = $("#cmbTipoDocumentoCarga");
    var $txtDescripcionDocumentoCarga = $("#txtDescripcionDocumentoCarga");
    var $cmbDocumentoCarga = $("#cmbDocumentoCarga");
    var $hdnDocumentoCargadoId = $("#hdnDocumentoCargadoId");
    var $btnCargarDocumento = $("#btnCargarDocumento");
    var $tblSeguimiento = $("#tblSeguimiento");

    var mensajes = {
        obteniendoViaticos: "Obteniendo viaticos, por favor espere...",
        obteniendoFiltros: "Obteniendo filtros de viáticos, por favor espere...",
        obteniendoEmpresas: "Obteniendo empresas, por favor espere...",
        obteniendoAreas: "Obteniendo areas, por favor espere...",
        obteniendoCargos: "Obteniendo cargos, por favor espere...",
        obteniendoEncargados: "Obteniendo encargados, por favor espere...",
        obteniendoTipoDetalle: "Obteniendo Tipo Detalle, por favor espere...",
        guardarNuevoViatico: "Registrando nuevo viatico, por favor espere...",
        eliminandoDetalleViatico: "Eliminando detalle de viatico, por favor espere..",
        obteniendoTipoDocumento: "Obteniendo tipo de documentos, por favor espere...",
        enviarContabilidad: "Enviando viatico a contabilidad, por favor espere...",
        enviarAbonar:"Enviando viatico abonado, por favor espere..."
    };

    let detalleviatico = [];

    let documentos = [];

    $(Initialize);

    function Initialize() {
        registroviaticos.adjuntos = [];
        $txtDestino.val("");
        $openFecViatico.click($openFecViatico_click);
        $btnAbrirDetalleViatico.click($abrirModalDetalleViatico_click);
        $btnAddDetalle.click($agregar_detalle_click);
        $btnGuardarViatico.click($agregarViatico_click);
        $btnAgregarDocumento.click($abrir_modalCargaDocumento_click);
        $btnEnviarContabilidad.click($enviarContabilidad_click);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $fileCargaDocumentoSustento.click($fileCargaDocumentoSustento_change);
        $btnAbonar.click($abonar_click);
        $btnRegresar.click($regresar_click);
       // $cmbarea.on("change", changeArea);
        $cmbcargo.on("change", changeCargo);
        $dateFecVia.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        $dateFecVia.val(hoy());

        if (sessionStorage.getItem('tipoRegViatico') === "N") {
            $lblDescripcionTitulo.text("Registro de Solicitud de Viáticos");
        }
        else if (sessionStorage.getItem('tipoRegViatico') === "U") {
            $lblDescripcionTitulo.text("Edición de Solicitud de Viáticos");
        }
        else {
            $lblDescripcionTitulo.text("Consulta de Solicitud de Viáticos");
        }



        CargarTipoDetalle();
        CargarTipoDocumento(4); //codigo de flujo de viáticos.
        ObtenerFiltrosViaticos();  
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
        req.open("POST", "UploadFiles?extension="+ext, true);
        req.setRequestHeader("File-Name", file.name);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send(formdata);

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var ruta_guardada = req.responseText;

                ruta_guardada = ruta_guardada.replace("\\", "");
                ruta_guardada = ruta_guardada.replace('"', '');
                ruta_guardada = ruta_guardada.replace('"', '');

                if (ruta_guardada == "error" || ruta_guardada == "false") {
                    app.message.error('Validación', 'Hubo un error al cargar el archivo', 'Aceptar', null);
                    return false;
                }

      

                var cont = parseInt($contadordoc.val());
                cont = cont + 1;


               // console.log("ruta_guardada:" + ruta_guardada);

                documentos.push({
                    "Id": cont,
                    "CodigoDocumento": 0,
                    "CodigoTipoDocumento": $cmbTipoDocumentoCarga.val(),
                    "NombreDocumento": $lblNombreArchivo.text(),
                    "VerDocumento": true,
                    "RutaDocumento": ruta_guardada,
                    "Eliminado": 0
                });

                $contadordoc.val(cont);

                if (sessionStorage.getItem('tipoRegViatico') === "U") {

                    var method = "POST";
                    var url = "RegistrarViatico/GuardarAdjunto";
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

                            var html = '<div class="text-center">';
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroviaticos.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                            html += '</div>';


                            var nuevoTr = "<tr bgcolor='FFFDC1' id='filadoc" + data.Result.Codigo + "'>" +
                                "<th>" + $("#cmbTipoDocumentoCarga option:selected").text() + "</th>" +
                                "<th>" + $lblNombreArchivo.text() + "</th>" +
                                "<th>" + $nombreusuario.val() + "</th>" +
                                "<th>" + $perfilnombre.val() + "</th>" +
                                "<th>" + hoy() + "</th>" +
                                "<th>" + html + "</th>" +
                                "</tr>";


                            $NoExisteRegDoc.hide();
                            $tblDocumentosCargados.append(nuevoTr);
                            location.reload();

                        }
                        else {
                            app.message.error("Error en la Actualización", data.Result.Mensaje);

                        }

                    };
                    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);

                }
                else {

                    var html = '<div class="text-center">';
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroviaticos.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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
        }
        $modalCargaDocumento.modal("hide");
    }

    function eliminarDocTemp(cont) {

        documentos.forEach(function (currentValue, index, arr) {
            if (documentos[index].Id == cont) {
                documentos.splice(index, 1);
            }
        });
        $("#filadoc" + cont).remove();

        if (documentos.length == 0) {
            $NoExisteRegDoc.show();
        }
    }

    function $adjuntarDocumento_click() {
        //$fileCargaDocumentoSustento.click();
        $lblNombreArchivo.text("");
        myfile = "";
        document.getElementById('fileCargaDocumentoSustento').click();

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
            ext == "rar" || ext == "RAR") {
            //beforeSendCargaDoc();
            var formdata = new FormData(); //FormData object
            //Appending each file to FormData object
            formdata.append(fileInput.files[0].name, fileInput.files[0]);
            formdata.append('name', name);

            $lblNombreArchivo.text(fileInput.files[0].name);

        }
        else if (myfile !== "") {

            app.message.error('Validación', 'El formato no es el permitido', 'Aceptar',null)
            this.value = "";
            $lblNombreArchivo.text("");

        } else {
            this.value = "";
            $lblNombreArchivo.text("");

        }
    }

    function $regresar_click() {
        app.redirectTo("BandejaViatico");
    }

    function $abonar_click() {

        if ($dateFecAbo.val() === "") {
            app.message.error("Validación", "Debe ingresar la fecha de abono.");
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "RegistrarViatico/AbonarViatico";
            var obj = {
                CodigoViatico: $codigoViatico.val(),
                FechaViatico: $dateFecAbo.val()
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    app.redirectTo("BandejaViatico");
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.enviarAbonar);
        }
        return app.message.confirm("Viáticos", "¿Está seguro que abonar el viático?", "Sí", "No", fnSi, null);
    }

    function $enviarContabilidad_click() {

        if (!validarViatico()) {
            return false;
        }
        var fnSi = function () {

            var m = "POST";
            var url = "RegistrarViatico/EnviarContabilidadViatico";
            var obj = {
                CodigoViatico: $codigoViatico.val(),
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {
                var fnCallback = function () {
                    app.redirectTo("BandejaViatico");
                };
                if (data.Result.Codigo > 0) {
                    app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }
                else {
                    app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                }

            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.enviarContabilidad);
        }
        return app.message.confirm("Viáticos", "¿Está seguro que desea enviar el viático a contabilidad?", "Sí", "No", fnSi, null);
    }




    function $abrir_modalCargaDocumento_click() {
        $hdnDocumentoCargadoId.val("");
        //$cmbTipoDocumentoCarga.empty();
        $cmbDocumentoCarga.empty();
        $txtDescripcionDocumentoCarga.val("");
        $cmbTipoDocumentoCarga.val("0").trigger("change.select2");
        $lblNombreArchivo.text("");
        $modalCargaDocumento.modal("show");
    }

    function VisualizarViatico(codViatico,tipo) {
        var m = "POST";
        var url = "RegistrarViatico/VerViaticos?codViatico=" + codViatico;
        var objParam = '';
        var fnDoneCallback = function (data) { 
            if (tipo == "U") {

                $fecViaEdit.show();
                $fecViaVer.hide();
                $clienteEdit.show();
                $clienteVer.hide();
                $empresaEdit.show();
                $empresaVer.hide();
                $motivoEdit.show();
                $motivoVer.hide();
                $areaEdit.show();
                $areaVer.hide();
                $lugarEdit.show();
                $lugarVer.hide();
                $cargoEdit.show();
                $cargoVer.hide();
                $diasEdit.show();
                $diasVer.hide();
                $encargadoEdit.show();
                $encargadoVer.hide();
                $fechaAbonoEdit.show();
                $fechaAbonoVer.hide();              
                var texto = '00000' + data.Result.CabeceraViatico.CodigoViatico;
                var nroVia = texto.substring(texto.length - 5)
                $lblNroSolicitud.text('N° de solicitud: ' + nroVia);
                $codigoViatico.val(data.Result.CabeceraViatico.CodigoViatico);
                $codigoEstado.val(data.Result.CabeceraViatico.CodigoEstado);
                $codigoWorkflow.val(data.Result.CabeceraViatico.CodigoWorkflow);
                $dateFecVia.val(app.convertirEnFecha(data.Result.CabeceraViatico.FechaViatico, true));
                $cmbempresa.val(data.Result.CabeceraViatico.CodigoEmpresa).trigger("change.select2");
                $txtCliente.val(data.Result.CabeceraViatico.Cliente);
                $txtDias.val(data.Result.CabeceraViatico.DiasViaje);
                $txtMotivo.val(data.Result.CabeceraViatico.Motivo);
                $txtDestino.val(data.Result.CabeceraViatico.CodigoUbigeo);
                $txtUbigeo.val(data.Result.CabeceraViatico.NombreUbigeo);
                $cmbarea.val(data.Result.CabeceraViatico.CodigoArea).trigger("change.select2");
               // $txtObservacion.val(data.Result.CabeceraViatico.Observacion);
                $lblDescripcionEstado.text("Estado: " + data.Result.CabeceraViatico.NombreEstado);
                $cmbcargo.val(data.Result.CabeceraViatico.CodigoCargo).trigger("change.select2");
                $cmbencargado.val(data.Result.CabeceraViatico.CodigoEncargado).trigger("change.select2");
                //CargarCargos(data.Result.CabeceraViatico.CodigoArea, data.Result.CabeceraViatico.CodigoCargo);
                //obtenerEncargados(data.Result.CabeceraViatico.CodigoCargo, data.Result.CabeceraViatico.CodigoEncargado);
                $("#btnEnviarContabilidad").prop("disabled", false);
                if (data.Result.CabeceraViatico.CodigoEstado != "APR") {
                    $btnEnviarContabilidad.hide();
                }

                if (data.Result.CabeceraViatico.CodigoEstado != "EAC") {
                    $btnAbonar.hide();
                }


            }
            else {
                $btnEnviarContabilidad.hide();
                $btnAbonar.hide();
                $fecViaEdit.hide();
                $fecViaVer.show();
                $lblDescripcionEstado.text("Estado: " + data.Result.CabeceraViatico.NombreEstado);
                $fecViaLabel.text(data.Result.CabeceraViatico.FechaViaticoFormat);

                var texto = '00000' + data.Result.CabeceraViatico.CodigoViatico;
                var nroVia = texto.substring(texto.length - 5)
                $lblNroSolicitud.text('N° de solicitud: ' + nroVia);

                $clienteEdit.hide();
                $clienteVer.show();
                $clienteLabel.text(data.Result.CabeceraViatico.Cliente);

                $empresaEdit.hide();
                $empresaVer.show();
                $empresaLabel.text(data.Result.CabeceraViatico.NombreEmpresa);

                $motivoEdit.hide();
                $motivoVer.show();
                $motivoaLabel.text(data.Result.CabeceraViatico.Motivo);

                $areaEdit.hide();
                $areaVer.show();
                $areaLabel.text(data.Result.CabeceraViatico.NombreArea);

                $lugarEdit.hide();
                $lugarVer.show();
                $lugarLabel.text(data.Result.CabeceraViatico.CodigoUbigeo);

                $cargoEdit.hide();
                $cargoVer.show();
                $cargoLabel.text(data.Result.CabeceraViatico.NombreCargo);

                $diasEdit.hide();
                $diasVer.show();
                $diasLabel.text(data.Result.CabeceraViatico.DiasViaje);

                $encargadoEdit.hide();
                $encargadoVer.show();
                $encargadoLabel.text(data.Result.CabeceraViatico.NombreEncargado);

                $fechaAbonoEdit.hide();
                $fechaAbonoVer.show();
                $fechaAbonoLabel.text(data.Result.CabeceraViatico.FechaAbonado);


                $txtObservacion.val(data.Result.CabeceraViatico.Observacion);

            }


            detalleviatico = data.Result.DetallesViatico;

            documentos = data.Result.Adjuntos;

            if (data.Result.CabeceraViatico.Anulado === "N") {
                $formObservacion.hide();
            }


            var registros = data.Result.DetallesViatico.length;
            $contador.val(registros);
            var total = 0;
            if (registros > 0) {
                for (i = 0; i < data.Result.DetallesViatico.length; i++) {
                    var html = '<div class="text-center">';
                    if (sessionStorage.getItem('tipoRegViatico') == "U" && data.Result.CabeceraViatico.CodigoEstado != "EAC") {
                        html += ' <a class="btn btn-default btn-xs" title="Editar"  href="javascript:registroviaticos.editarEdit(' + data.Result.DetallesViatico[i].CodigoDetalleViatico + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                        html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroviaticos.eliminarEdit(' + data.Result.DetallesViatico[i].CodigoDetalleViatico + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
                    }
                    html += '</div>';

                    var nuevoTr = "<tr bgcolor='FFFDC1' id='fila" + data.Result.DetallesViatico[i].CodigoDetalleViatico + "'>" +
                        "<th>" + data.Result.DetallesViatico[i].DescripcionTipo + "</th>" +
                        "<th>" + data.Result.DetallesViatico[i].Tipo + "</th>" +
                        "<th>" + data.Result.DetallesViatico[i].Concepto + "</th>" +
                        "<th>" + data.Result.DetallesViatico[i].Detalle + "</th>" +
                        "<th>" + data.Result.DetallesViatico[i].Cantidad + "</th>" +
                        "<th>" + data.Result.DetallesViatico[i].ValorUnitario.toFixed(2) + "</th>" +
                        "<th>" + data.Result.DetallesViatico[i].Monto.toFixed(2) + "</th>" +
                        "<th>" + html + "</th>" +
                        "</tr>";

                    $NoExisteReg.hide();
                    $tablaDetalleViatico.append(nuevoTr);
                 
                    total = total + parseFloat(data.Result.DetallesViatico[i].Monto);
                }
                $TotalMontoDetalle.val(total.toFixed(2));
            }

            var seguimiento = data.Result.Seguimiento.length;
            if (seguimiento > 0) {
                for (i = 0; i < data.Result.Seguimiento.length; i++) {

                    var nuevoTr = "<tr>" +
                        "<th>" + data.Result.Seguimiento[i].DescripcionEstado + "</th>" +
                        "<th>" + data.Result.Seguimiento[i].Cargo + "</th>" +
                        "<th>" + data.Result.Seguimiento[i].NombreUsuarioRegistro + "</th>" +
                        "<th>" + data.Result.Seguimiento[i].FechaRegistro + "</th>" +
                        "<th>" + data.Result.Seguimiento[i].HoraRegistro + "</th>" +
                        "</tr>";
                    $tblSeguimiento.append(nuevoTr);
                }
                $NoExisteRegSeg.hide();
            }

            var adjuntos = data.Result.Adjuntos.length;
            registroviaticos.adjuntos = data.Result.Adjuntos;
            $contadordoc.val(adjuntos);
            if (adjuntos > 0) {
                for (i = 0; i < data.Result.Adjuntos.length; i++) {
                    var html = '<div class="text-center">';
                    if (sessionStorage.getItem('tipoRegViatico') == "U" && data.Result.CabeceraViatico.CodigoEstado != "EAC") {
                        //var d = "'" + data.Result.Adjuntos[i].CodigoDocumento + "','" + data.Result.Adjuntos[i].RutaDocumento + "'";
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:registroviaticos.download(' + data.Result.Adjuntos[i].CodigoDocumento +')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroviaticos.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
                    }
                    else if (sessionStorage.getItem('tipoRegViatico') == "V") {
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:registroviaticos.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                    }
                    html += '</div>';

                    var nuevoTr = "<tr id='row"+data.Result.Adjuntos[i].CodigoDocumento+"'>" +
                        "<th>" + data.Result.Adjuntos[i].NombreTipoDocumento + "</th>" +
                        "<th>" + data.Result.Adjuntos[i].NombreDocumento + "</th>" +
                        "<th>" + data.Result.Adjuntos[i].NombreUsuario + "</th>" +
                        "<th>" + data.Result.Adjuntos[i].NombrePerfil + "</th>" +
                        "<th>" + data.Result.Adjuntos[i].FechaRegistroFormat + "</th>" +
                        "<th>" + html + "</th>" +
                        "</tr>";
                    $tblDocumentosCargados.append(nuevoTr);
                }
                $NoExisteRegDoc.hide();
            }
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoViaticos);
    }

    function download(IdDocumento) {

        var documento = registroviaticos.adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.abrirVentana("BandejaViatico/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);

       // app.redirectToWindow("RegistrarViatico/DownloadDocumento?codWorkflow=" + $codigoWorkflow.val() + "&codDocumento=" + IdDocumento);
    }
    function eliminarDocumento(idDocumento) {
        if (sessionStorage.getItem('tipoRegViatico') === "U") {
            var fnSi = function () {
                var method = "POST";
                var url = "RegistrarViatico/EliminarAdjunto";
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
                        $NoExisteRegDoc.hide();
                        location.reload();
                    }
                    else {
                        app.message.error("Error en la Actualización", data.Result.Mensaje);

                    }

                };
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);
            }
            return app.message.confirm("Viáticos", "¿Está seguro que desea eliminar el documento adjunto?", "Sí", "No", fnSi, null);
        }
    }


    function validarViatico() {
        if ($dateFecVia.val() === null || $dateFecVia.val() === "" || $dateFecVia.val() === 'undefined') {
            app.message.error("Validación", "Debe seleccionar la fecha del viático.");
            return false;
        }
        if ($txtCliente.val() === "") {
            app.message.error("Validación", "Debe ingresar una descripción en el campo Cliente.");
            return false;
        }
        if ($cmbempresa.val() === "0" || $cmbempresa.val() === null || $cmbempresa.val() === undefined) {
            app.message.error("Validación", "Debe seleccionar una empresa");
            return false;
        }
        if ($txtMotivo.val() === "") {
            app.message.error("Validación", "Debe ingresar una descripción en el campo motivo.");
            return false;
        }
        if ($cmbarea.val() === "0" || $cmbarea.val() === null || $cmbarea.val() === undefined) {
            app.message.error("Validación", "Debe seleccionar un área.");
            return false;
        }
        if ($txtDestino.val() === "") {
            app.message.error("Validación", "Debe ingresar un lugar de destino.");
            return false;
        }
        if ($cmbcargo.val() === "0" || $cmbcargo.val() === null || $cmbcargo.val() === undefined) {
            app.message.error("Validación", "Debe seleccionar un cargo.");
            return false;
        }
        if ($txtDias.val() === "") {
            app.message.error("Validación", "Debe ingresar una descripción en el campo N° días de viaje.");
            return false;
        }
        if ($cmbencargado.val() === "0" || $cmbencargado.val() === null || $cmbencargado.val() === undefined) {
            app.message.error("Validación", "Debe seleccionar un encargado del viático.");
            return false;
        }
        if (detalleviatico.length === 0) {
            app.message.error("Validación", "Debe ingresar mínimo un detalle al viático.");
            return false;
        }
        if (documentos.length === 0) {
            app.message.error("Validación", "Debe ingresar mínimo un adjunto.");
            return false;
        }

        var documento_programacion = 0;
        documentos.forEach(function (currentValue, index, arr) {
            if (documentos[index].CodigoTipoDocumento == "DV03") {
                documento_programacion = 1;
            }
        });

        if (documento_programacion === 0) {
            app.message.error("Validación", "Debe adjuntar un documento de programación.");
            return false;
        }
        return true;
    }
    function $agregarViatico_click() {

        if (!validarViatico()) {
            return false;
        }
     

        if ($codigoViatico.val() > 0) {
            var fnSi = function () {

                var objViatico= {
                        Accion: "U",
                        CodigoViatico: $codigoViatico.val(),
                        CodigoWorkflow: $codigoWorkflow.val(),
                        CodigoEmpresa: $cmbempresa.val(),
                        FechaViatico: $dateFecVia.val(),
                        CodigoEncargado: $cmbencargado.val(),
                        CodigoCargo: $cmbcargo.val(),
                        Motivo: $txtMotivo.val(),
                        CodigoArea: $cmbarea.val(),
                        CodigoUbigeo: $txtDestino.val(),
                        Cliente: $txtCliente.val(),
                        DiasViaje: $txtDias.val(),
                        Autorizado: "",
                        Anulado: "",
                        Abonado: "",
                        Observacion: "",
                        CodigoEstado: $codigoEstado.val()
                };

                var m = "POST";
                var url = "RegistrarViatico/MantenimientoCabeceraViaticos";
                var objParam = JSON.stringify(objViatico);
                var fnDoneCallback = function (data) {
                    var fnCallback = function () {
                        app.redirectTo("BandejaViatico");
                    };
                    if (data.Result.Codigo > 0) {
                        app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                    }
                    else {
                        app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                    }

                };
                return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);
            }
            return app.message.confirm("Viáticos", "¿Está seguro que desea actualizar la solicitud de viáticos?", "Sí", "No", fnSi, null);
        }
        else {
            var fnSi = function () {

                var objViatico = {
                    CabeceraViatico: {
                        Accion: "I",
                        CodigoViatico: 0,
                        CodigoWorkflow: 0,
                        CodigoEmpresa: $cmbempresa.val(),
                        FechaViatico: $dateFecVia.val(),
                        CodigoEncargado: $cmbencargado.val(),
                        CodigoCargo: $cmbcargo.val(),
                        Motivo: $txtMotivo.val(),
                        CodigoArea: $cmbarea.val(),
                        CodigoUbigeo: $txtDestino.val(),
                        Cliente: $txtCliente.val(),
                        DiasViaje: $txtDias.val(),
                        Autorizado: "",
                        Anulado: "",
                        Abonado: "",
                        Observacion: "",
                        CodigoEstado: "REG"
                    },
                    DetallesViatico: detalleviatico,
                    Adjuntos: documentos
                };

                var m = "POST";
                var url = "RegistrarViatico/RegistrarNuevoViatico";
                var objParam = JSON.stringify(objViatico);
                var fnDoneCallback = function (data) {
                    var fnCallback = function () {
                        app.redirectTo("BandejaViatico");
                    };
                    if (data.Result.Codigo > 0) {
                        app.message.success("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                    }
                    else {
                        app.message.error("Grabar", data.Result.Mensaje, "Aceptar", fnCallback);
                    }

                };
                return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);
            }
            return app.message.confirm("Viáticos", "¿Está seguro que desea guardar la solicitud de viáticos?", "Sí", "No", fnSi, null);
        }

       
        
    }

    function $agregar_detalle_click() {

        if ($cmbTipo.val() === "0") {
            app.message.error("Validación", "Debe seleccionar una sección.");
            return false;
        }
        if ($txtTipo.val() === "") {
            app.message.error("Validación", "Ingrese un tipo.");
            return false;
        }
        if ($txtConcepto.val() === "") {
            app.message.error("Validación", "Ingrese un concepto.");
            return false;
        }
        if ($txtDetalle.val() === "") {
            app.message.error("Validación", "Ingrese un detalle.");
            return false;
        }
        if ($txtCantidad.val() === "0" || $txtCantidad.val() === "") {
            app.message.error("Validación", "La cantidad no debe ser vacio o cero.");
            return false;
        }
        if ($txtValorUnit.val() === "0.00" || $txtValorUnit.val() === "") {
            app.message.error("Validación", "El valor unitario no debe ser vacio o cero.");
            return false;
        }

        if ($codDetalleViatico.val() > 0) { //Editar

            var fnSi = function () {
                var method = "POST";
                var url = "RegistrarViatico/MantenimientoDetalleViaticos";
                var obj = {
                    Accion: "U",
                    CodigoDetalleViatico: $codDetalleViatico.val(),
                    CodigoTipo: $cmbTipo.val(),
                    Tipo: $txtTipo.val(),
                    Concepto: $txtConcepto.val(),
                    Detalle: $txtDetalle.val(),
                    Cantidad: $txtCantidad.val(),
                    ValorUnitario: $txtValorUnit.val(),
                    Monto: $txtMonto.val(),
                    Estado: true
                }
                var objParam = JSON.stringify(obj);
                var fnDoneCallback = function (data) {

                    if (data.Result.Codigo > 0) {
                        app.message.success("Actualización", data.Result.Mensaje);
                        //se debe consulta los detalles nuevamente.
                        $modalDetalleViatico.modal('hide');
                        location.reload();
                    }
                    else {
                        app.message.error("Error en la Actualización", data.Result.Mensaje);

                    }

                    return;


                };
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.eliminandoDetalleViatico);

            };
            return app.message.confirm("Viáticos", "¿Está seguro que desea actualizar el detalle de viático ?", "Sí", "No", fnSi, null);

        }
        else { //agregar
            var cont = parseInt($contador.val());
            cont = cont + 1;

            //Se agrega una nueva lista.
            detalleviatico.push({
                "Id": cont,
                "CodigoTipo": $cmbTipo.val(),
                "Tipo": $txtTipo.val(),
                "Concepto": $txtConcepto.val(),
                "Detalle": $txtDetalle.val(),
                "Cantidad": $txtCantidad.val(),
                "ValorUnitario": $txtValorUnit.val(),
                "Monto": $txtMonto.val(),
                "Estado": true
            });
            $contador.val(cont);
            sumar();
            if (sessionStorage.getItem('tipoRegViatico') === "U") { //Si agrega para un modificado


                var method = "POST";
                var url = "RegistrarViatico/MantenimientoDetalleViaticos";
                var obj = {
                    Accion: "I",
                    CodigoViatico: $codigoViatico.val(),
                    CodigoDetalleViatico: 0,
                    CodigoTipo: $cmbTipo.val(),
                    Tipo: $txtTipo.val(),
                    Concepto: $txtConcepto.val(),
                    Detalle: $txtDetalle.val(),
                    Cantidad: $txtCantidad.val(),
                    ValorUnitario: $txtValorUnit.val(),
                    Monto: $txtMonto.val(),
                    Estado: true
                }
                var objParam = JSON.stringify(obj);
                var fnDoneCallback = function (data) {

                    if (data.Result.Codigo > 0) {

                        var html = '<div class="text-center">';
                        html += ' <a class="btn btn-default btn-xs" title="Editar"  href="javascript:registroviaticos.editarEdit(' + data.Result.Codigo + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;';
                        html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroviaticos.eliminarEdit(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                        html += '</div>';

                        var nuevoTr = "<tr bgcolor='FFFDC1' id='fila" + cont + "'>" +
                            "<th>" + $("#cmbTipo option:selected").text() + "</th>" +
                            "<th>" + $txtTipo.val() + "</th>" +
                            "<th>" + $txtConcepto.val() + "</th>" +
                            "<th>" + $txtDetalle.val() + "</th>" +
                            "<th>" + $txtCantidad.val() + "</th>" +
                            "<th>" + $txtValorUnit.val() + "</th>" +
                            "<th>" + $txtMonto.val() + "</th>" +
                            "<th>" + html + "</th>" +
                            "</tr>";

                        $NoExisteReg.hide();
                        $tablaDetalleViatico.append(nuevoTr);
                        $modalDetalleViatico.modal('hide');


                        var fnSiVia = function () {
                            $abrirModalDetalleViatico_click();
                            $modalDetalleViatico.modal('show');
                        }

                        app.message.confirm("Viáticos", "Se registro con éxito, ¿Desea agregar otro detalle de viático?", "Sí", "No", fnSiVia, null);
                        //se debe consulta los detalles nuevamente.
                    }
                    else {
                        app.message.error("Error en la Actualización", data.Result.Mensaje);

                    }

                };
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);

            }
            else {
                var html = '<div class="text-center">';
                html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroviaticos.eliminar(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                html += '</div>';

                var nuevoTr = "<tr bgcolor='FFFDC1' id='fila" + cont + "'>" +
                    "<th>" + $("#cmbTipo option:selected").text() + "</th>" +
                    "<th>" + $txtTipo.val() + "</th>" +
                    "<th>" + $txtConcepto.val() + "</th>" +
                    "<th>" + $txtDetalle.val() + "</th>" +
                    "<th>" + $txtCantidad.val() + "</th>" +
                    "<th>" + $txtValorUnit.val() + "</th>" +
                    "<th>" + $txtMonto.val() + "</th>" +
                    "<th>" + html + "</th>" +
                    "</tr>";

                $NoExisteReg.hide();
                $tablaDetalleViatico.append(nuevoTr);
                $modalDetalleViatico.modal('hide');
                var fnSi = function () {
                    $abrirModalDetalleViatico_click();
                    $modalDetalleViatico.modal('show');
                }

                return app.message.confirm("Viáticos", "Se registro con éxito, ¿Desea agregar otro detalle de viático?", "Sí", "No", fnSi, null);
            }

         
        }


    }


    function sumar() {
        var total = parseFloat(0);
        detalleviatico.forEach(function (currentValue, index, arr) {
            total = total + parseFloat(detalleviatico[index].Monto);
        });

        $TotalMontoDetalle.val(total.toFixed(2))
    }
    function eliminar(cont) {
            detalleviatico.forEach(function (currentValue, index, arr) {
                if (detalleviatico[index].Id == cont) {
                    detalleviatico.splice(index, 1);
                   
                }
            });
            $("#fila" + cont).remove();
             if (detalleviatico.length == 0) {
            $NoExisteReg.show();
            }

            sumar();
        }

    function $abrirModalDetalleViatico_click() {
        $txtTipo.val("");
        $txtConcepto.val("");
        $txtDetalle.val("");
        $txtCantidad.val("0");
        $txtValorUnit.val("0.00");
        $txtMonto.val("0.00");
        $cmbTipo.val(0).trigger("change.select2");
        $codDetalleViatico.val("0");
    }

    function CargarTipoDetalle() {
        var method = "POST";
        var url = "RegistrarViatico/ListarTipoDetalleViatico";
        var objParam = '';
        var fnDoneCallback = function (data) {

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbTipo, data, null, 0, "--Seleccione--", filters);

        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoTipoDetalle);
    }

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
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoTipoDocumento);
    }





    function changeCargo() {
        const codCargo = $(this).val();
        if (codCargo != "0") {
            obtenerEncargados(codCargo);
        }
        else {
            obtenerEncargados(-1);
            $cmbencargado.val("0").trigger("change.select2");
            
        }
    }

    function obtenerEncargados(codCargo,valor) {
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
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbencargado, resultado, null, 0, "--Seleccione--", filters);

            if (valor > 0) {
                $cmbencargado.val(valor).trigger("change.select2");
            }


        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEncargados);
    }

    function changeArea() {

        const codArea = $(this).val();
        if (codArea != "0") {
            CargarCargos(codArea,0);
        }
        else {
            CargarCargos(-1,0);
            obtenerEncargados(-1,0);
            $cmbcargo.val("0").trigger("change.select2");

        }
        $cmbencargado.val("0").trigger("change.select2");
        
    }

    function ObtenerFiltrosViaticos() {
        var method = "POST"; 
        var url = "BandejaViatico/GrupoFiltrosViaticos?nombreRol=" + $rolUsuario.val() + "&codArea=" + $codigoArea.val();
        var objParam = '';
        var fnDoneCallback = function (data) {

            //Cargar combo de empresas:
            var filters2 = {};
            filters2.placeholder = "-- Seleccione --";
            filters2.allowClear = false;
            app.llenarComboMultiResult($cmbempresa, data.Result.Empresas, null, 0, "--Seleccione--", filters2);
            //Cargar combo de areas:
            var filters3 = {};
            filters3.placeholder = "-- Seleccione --";
            filters3.allowClear = false;
            app.llenarComboMultiResult($cmbarea, data.Result.Areas, null, 0, "--Seleccione--", filters3);

            //Cargar combo de cargos:
            var filters4 = {};
            filters4.placeholder = "-- Seleccione --";
            filters4.allowClear = false;
            app.llenarComboMultiResult($cmbcargo, data.Result.Cargos, null, 0, "--Seleccione--", filters4);


            //Cargar combo de encargados:
            var filters5 = {};
            filters5.placeholder = "-- Seleccione --";
            filters5.allowClear = false;
            app.llenarComboMultiResult($cmbencargado, data.Result.Encargados, null, 0, "--Seleccione--", filters5);


            if (sessionStorage.getItem('tipoRegViatico') === "U") {
                VisualizarViatico(sessionStorage.getItem('CodViatico'), sessionStorage.getItem('tipoRegViatico'));

                if ($rolUsuario.val() === "SGI_VIAT_CONTADOR") {
                    $dateFecVia.prop("disabled", true);
                    $txtCliente.prop("disabled", true);
                    $cmbempresa.prop("disabled", true);
                    $txtMotivo.prop("disabled", true);
                    $cmbarea.prop("disabled", true);
                    $txtDestino.prop("disabled", true);
                    $cmbcargo.prop("disabled", true);
                    $txtDias.prop("disabled", true);
                    $cmbencargado.prop("disabled", true);
                    $dateFecAbo.prop("disabled", false);
                    $dateFecAbo.datepicker({
                        viewMode: 0,
                        minViewMode: 0,
                        format: 'dd/mm/yyyy',
                        startDate: $dateFecVia.val()
                    });
                    $dateFecAbo.val(hoy());
                    $btnGuardarViatico.hide();
                    $btnAbrirDetalleViatico.hide();
                    $btnAgregarDocumento.hide();
                    $btnEnviarContabilidad.hide();
                }
                else if ($rolUsuario.val() === "SGI_VIAT_SOLICITANTE") {
                    $btnAbonar.hide();
                    $btnEnviarContabilidad.hide();
                }

            }
            else if (sessionStorage.getItem('tipoRegViatico') === "V") {
                VisualizarViatico(sessionStorage.getItem('CodViatico'), sessionStorage.getItem('tipoRegViatico'));
                $dateFecVia.prop("disabled", true);
                $txtCliente.prop("disabled", true);
                $cmbempresa.prop("disabled", true);
                $txtMotivo.prop("disabled", true);
                $cmbarea.prop("disabled", true);
                $txtDestino.prop("disabled", true);
                $cmbcargo.prop("disabled", true);
                $txtDias.prop("disabled", true);
                $cmbencargado.prop("disabled", true);
                $dateFecAbo.prop("disabled", true);
                $btnGuardarViatico.hide();
                $btnAbrirDetalleViatico.hide();
                $btnAgregarDocumento.hide();
                $btnAbonar.hide();
                $btnEnviarContabilidad.hide();
            }
            else {
                //CargarCargos(-1,0);
                //obtenerEncargados(1, 0);
                $tabSeguimiento.hide();
                $btnAbonar.hide();
                $btnEnviarContabilidad.hide();
                $formObservacion.hide();
            }

        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoFiltros);
    }

    function CargarCargos(codArea,valor) {
        var method = "POST";
        var url = "Utiles/ListarCargosxArea?codArea=" + codArea;
        var objParam = "";

        var fnDoneCallback = function (data) {
            var resultado = { Result: [] };

            for (let i = 0; i < data.Result.length; i++) {

                var x = data.Result[i].Id.split("|");
                if (x[1] == $cmbarea.val()) {
                    var cargos = {
                        Id: x[0],
                        Text: data.Result[i].Text,
                    }
                    resultado.Result.push(cargos);
                }
            }
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbcargo, resultado, null, 0, "--Seleccione--", filters);

            if (valor > 0) {
                $cmbcargo.val(valor).trigger("change.select2");
            }
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoCargos);
    }

    

    function $openFecViatico_click() {
        $dateFecVia.focus();
    }


    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
    }


    function editar(idUsuario) {
        var objUsuario = {
            Id: idUsuario
        };
    }

    function editarEdit(codDetalleViatico) {

        $modalDetalleViatico.modal("show");
        $abrirModalDetalleViatico_click();

        detalleviatico.forEach(function (currentValue, index, arr) {
            if (detalleviatico[index].CodigoDetalleViatico == codDetalleViatico) {
                $txtTipo.val(detalleviatico[index].Tipo);
                $txtConcepto.val(detalleviatico[index].Concepto);
                $txtDetalle.val(detalleviatico[index].Detalle);
                $txtCantidad.val(detalleviatico[index].Cantidad);
                $txtValorUnit.val(detalleviatico[index].ValorUnitario.toFixed(2));
                $txtMonto.val(detalleviatico[index].Monto.toFixed(2));
                $cmbTipo.val(detalleviatico[index].CodigoTipo).trigger("change.select2");
                $codDetalleViatico.val(detalleviatico[index].CodigoDetalleViatico);
            }
        });


    }

    function eliminarEdit(codDetalleViatico) {
        var fnSi = function () {
            var method = "POST";
            var url = "RegistrarViatico/MantenimientoDetalleViaticos";
            var obj = {
                Accion: "D",
                CodigoDetalleViatico: codDetalleViatico
            }
            var objParam = JSON.stringify(obj);
            var fnDoneCallback = function (data) {

                if (data.Result.Codigo > 0)
                {
                    app.message.success("Eliminación", data.Result.Mensaje);
                    eliminar(codDetalleViatico);
                    location.reload();
                }
                else {
                    app.message.error("Error en la Eliminación", data.Result.Mensaje);
                    
                }

                return;


            };
            return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.eliminandoDetalleViatico);

        };
        return app.message.confirm("Viáticos", "¿Está seguro que desea eliminar el detalle de viático ?", "Sí", "No", fnSi, null);

    }

    return {
        editar: editar,
        eliminar: eliminar,
        eliminarEdit: eliminarEdit,
        editarEdit: editarEdit,
        download: download,
        eliminarDocumento: eliminarDocumento,
        eliminarDocTemp: eliminarDocTemp
    };
})(window.jQuery, window, document);