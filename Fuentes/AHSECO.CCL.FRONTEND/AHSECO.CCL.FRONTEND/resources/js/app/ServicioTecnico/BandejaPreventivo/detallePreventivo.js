var detallePreventivo = (function ($, win, doc) {
    $(Initializer);
    var $ruc = $('#ruc');
    var $spanEstadoSol = $('#spanEstadoSol');
    var $numPreventivo = $('#numPreventivo');
    var $estadoMant = $('#estadoMant');
    var $perfilnombre = $('#perfilnombre');
    var $nombreusuario = $('#nombreusuario');
    var $tipoAccion = $('#tipoAccion');
    var $tipoAccionPadre = $('#tipoAccionPadre');
    var $contadordoc = $('#contadordoc');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $tblMainTecnicos = $('#tblMainTecnicos');
    var $cmbTipoCredencial = $('#cmbTipoCredencial');
    var $NoExisteTec = $('#NoExisteTec');
    var $tbodyObservaciones = $('#tbodyObservaciones');
    var $tblObservaciones = $('#tblObservaciones');
    var $NoExisteRegObs = $('#NoExisteRegObs');
    var $tbodyDocAdjuntos = $('#tbodyDocAdjuntos');
    var $tblDocumentosCargados = $('#tblDocumentosCargados');
    var $NoExisteRegDoc =   $('#NoExisteRegDoc');
    var $NoExisteRegSeg =   $('#NoExisteRegSeg');
    var $tblSeguimiento =   $('#tblSeguimiento');
    var $tblTecnicos = $('#tblTecnicos');
    var $btnBusquedaTecnico = $('#btnBusquedaTecnico');
    var $btnBuscarTecnico = $('#btnBuscarTecnico');
    var $btnAñadirTecnico = $('#btnAñadirTecnico');
    var $btnGuardarUbigeo = $('#btnGuardarUbigeo');
    var $dateFechaMant = $('#dateFechaMant');
    var $btnEditarMant = $('#btnEditarMant');
    var $spanSi = $('#spanSi');
    var $spanNo = $('#spanNo');
    var $spanCon = $('#spanCon');
    var $spanCon = $('#spanCon');
    var $spanSin = $('#spanSin');
    var $openRegdateMant = $('#openRegdateMant');
    var $idMantPadre = $('#idMantPadre')
    var $txtNumFactura = $('#txtNumFactura ');
    var $dateFechaFact = $('#dateFechaFact');
    var $openRegdateFact = $('#openRegdateFact');
    var $btnCompletar = $('#btnCompletar');
    var $rowFactura = $('#rowFactura');
    var $txtNumOTM = $('#txtNumOTM');
    var $txtNumGuia = $('#txtNumGuia');
    var $dateFechaGuia = $('#dateFechaGuia');
    var $openRegdateGuia = $('#openRegdateGuia');
    var $colNumGuia = $('#colNumGuia');
    var $colFechaGuia = $('#colFechaGuia');
    var $colNumFact = $('#colNumFact');
    var $colFechaFact = $('#colFechaFact');

    var $txtidContacto = $('#txtidContacto');
    var $btnCerrar = $('#btnCerrar');
    var $btnActualizarContacto = $('#btnActualizarContacto');
    var $btnAgregarNuevoContacto = $('#btnAgregarNuevoContacto');
    var $btnAgregarContacto = $('#btnAgregarContacto');
    var $btnLimpiar = $('#btnLimpiar');
    var $cmbTipDocContacto = $('#cmbTipDocContacto');
    var $txtNumContacto = $('#txtNumContacto');
    var $btnSelectContacto = $('#btnSelectContacto');
    var $btnLimpiarTodo = $('#btnLimpiarTodo');
    var $btnAñadir = $('#btnAñadir');
    var $txtEstablecimiento = $('#txtEstablecimiento');
    var $txtAreaContacto = $('#txtAreaContacto');
    var $txtContactoTelefono = $('#txtContactoTelefono');
    var $txtContactoTelefono2 = $('#txtContactoTelefono2');
    var $txtContactoCorreo = $('#txtContactoCorreo');
    var $txtCargoContacto = $('#txtCargoContacto');
    var $txtContacto = $('#txtContacto');
    var $txtConsultaEstablecimiento = $('#txtConsultaEstablecimiento');
    var $txtConsultaCargo = $('#txtConsultaCargo');
    var $btnBuscarContactos = $('#btnBuscarContactos');
    var $btnNuevoContacto = $('#btnNuevoContacto');
    var $modalModificarContacto = $('#modalModificarContacto');
    var $tblContactosMain = $('#tblContactosMain');
    var $tbodyContactos = $('#tbodyContactos');
    var $NoExisteRegContact = $('#NoExisteRegContact');
    var $NoExisteContact = $('#NoExisteContact');
    var $rowTelefono2 = $('#rowTelefono2');
    var $tituloContacto = $('#tituloContacto');
    var $cmbEstadoContacto = $('#cmbEstadoContacto');
    var $modalBuscarContactos = $('#modalBuscarContactos');
    var $modalContactos = $('#modalContactos');
    var $tblContactos = $('#tblContactos');

    /*Sección Contactos*/
    var $txtNomContacto = $('#txtNomContacto');
    var $txtTelefContacto = $('#txtTelefContacto');
    var $txtEstablecimientoCont = $('#txtEstablecimientoCont');
    var $txtCargoContacto = $('#txtCargoContacto');
    var $txtEmailContacto = $('#txtEmailContacto');

    /*Modales*/
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalObservacion = $('#modalObservacion');
    var $modalBusquedaTecnico = $('#modalBusquedaTecnico');
    var $añadirTecnico = $('#añadirTecnico');

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
    var $btnRegresar = $('#btnRegresar');
    var $btnFinalizarMant = $('#btnFinalizarMant ');

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
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');
    var $cmbTipoDocumentoCarga = $('#cmbTipoDocumentoCarga');
    var $lblNombreArchivo = $('#lblNombreArchivo');


    /*Modal Ubigeo*/
    var $cmbProvincia = $('#cmbProvincia');
    var $cmbDistrito = $('#cmbDistrito');
    var $cmbDepartamento = $('#cmbDepartamento');
    var $txtCodUbicacion = $('#txtCodUbicacion');
    var $txtZona = $('#txtZona');
    var $modalZona = $('#modalZona');
    ; var $searchZona = $('#searchZona')
    /*Modal Seguimiento*/
    var $tblSeguimiento = $('#tblSeguimiento');
    var $NoExisteRegSeg = $('#NoExisteRegSeg');

    /*Modal Tecnicos*/
    var $hdnTipoEmpleado = $('#hdnTipoEmpleado');
    var $txtNombreTecnico = $('#txtNombreTecnico');
    var $txtApellidoPaternoTec = $('#txtApellidoPaternoTec');
    var $txtApellidoMaternoTec = $('#txtApellidoMaternoTec');
    var $txtNumDocumento = $('#txtNumDocumento');
    var $txtTelefono = $('#txtTelefono');
    var $txtCorreo = $('#txtCorreo');
    var $txtZona = $('#txtZona');
    var $txtTipoTecnico = $('#txtTipoTecnico');
    var $hdnIdTecnico = $('#hdnIdTecnico');
    var $cmbTipoCredencial = $('#cmbTipoCredencial');
    var $txtNombres = $('#txtNombres ');
    var $txtApePat = $('#txtApePat');
    var $txtApeMat = $('#txtApeMat');
    var $cmbTipDocTecnico = $('#cmbTipDocTecnico');
    var $cmbTipoEmpleado = $('#cmbTipoEmpleado');
    var $txtNumDocTec = $('#txtNumDocTec');
    var $tblTecnicos = $('#tblTecnicos');
    var $btnRegistrarTecnicoExterno = $('#btnRegistrarTecnicoExterno');
    var $NoExisteTec = $('#NoExisteTec');
    var $tbodyTecnicos = $('#tbodyTecnicos');
    var $txtMontoAcce = $('#txtMontoAcce');

    var indRepuesto = null;
    var indPrest = null;
    var observaciones = [];
    let contactos = [];
    var adjuntos = [];
    function Initializer() {
        $cmbEstadoContacto.val("1");
        $btnActualizarContacto.css('display', 'none');
        $btnAgregarContacto.css('display', 'none');
        $btnLimpiar.css('display', 'none');
        $rowTelefono2.css('display', 'none');
        $btnAñadir.css('display', 'none');
        $btnLimpiarTodo.css('display', 'none');

        $btnNuevoContacto.click(btnAñadirClick)
        $btnCerrar.click(Cerrar);
        $btnAgregarNuevoContacto.click(RegistrarNuevoContacto);
        $btnSelectContacto.click(BuscarContactosxCliente);
        $btnBuscarContactos.click(BuscarContactosxCliente);
        $btnActualizarContacto.click(ActualizarContacto);



        $tipoDocAdjuntos.text("Archivos permitidos: .xls,.xlsx,.pdf,.doc,.docx,.zip,.rar,.ppt,.pptx");
        cargarTipoDoc();
        cargarDatos();
        CargarTipoDocumento(6);
        ObtenerFiltrosPreventivos();
        $openRegdateMant.click($openRegdateMantClick);

        $openRegdateFact.click($openRegdateFactClick);

        $openRegdateGuia.click($openRegdateGuiaClick);

        $dateFechaFact.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateFechaGuia.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });

        $dateFechaMant.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });
        detallePreventivo.MantPreventivo = []
        detallePreventivo.contadorObservaciones = 0;
        detallePreventivo.tecnicosAsig = [];
        $btnGuardarUbigeo.click(seleccionar);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $btnFinalizarMant.click(FinalizarMant);
        $btnCompletar.click(CompletarMant);
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnBusquedaTecnico.click(BuscarTecnicos);
        $btnBuscarTecnico.click(BuscarTecnicos);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        $btnEditarMant.click(EditarMantenimiento);
        $searchZona.click(logicUbigeo);
        $btnRegistrarTecnicoExterno.click(CrearTecnico3ro_a_Producto);
        $btnRegresar.click(btnRegresarClick);
        BuscarContactos();
        $spanSi.on('click', function () {
            botonSi();
            $txtMontoAcce.val(detallePreventivo.MantPreventivo.MontoPrestAcce);
        });

        $spanNo.on('click', function () {
            botonNo(); 
            $txtMontoAcce.val("0.00");
        });

        $spanCon.on('click', function () {
            botonCon();
            indRepuesto = 1;
        });

        $spanSin.on('click', function () {
            botonSin();
            indRepuesto = 0;
        });



        IniciarBotonSeleccionarTecnico();
        $cmbTipoCredencial.on('change', function (e) {
            if (e.target.value === "GETD0001") {
                $txtNumDocumento.attr("maxlength", '8');
                $txtNumDocumento.prop("pattern", "/^\d{8}$/");
            } else if (e.target.value === "GETD0002") {
                $txtNumDocumento.attr("maxlength", '12');
                $txtNumDocumento.prop("pattern", "");
            } else {
                app.message.error("Validación", "Debe ingresar un Tipo de Documento para Registrar.");
            }
        })
    };

    

    function botonSi() {
        indPrest = 1;
        $spanNo.css('background-color', 'gray')
        $spanSi.css('background-color', 'green')
    }

    function $modalObservacionClick() {
        $tituloModalObservacion.html("Nueva observación");
        $grpAuditoriaObservacion.hide();
        $modalObservacion.modal("show");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
    };

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

        if (file.size > 5000000) {
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

                if ($numPreventivo.val() != "") {

                    var method = "POST";
                    var url = "BandejaPreventivo/GuardarAdjunto";
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
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:detallePreventivo.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detallePreventivo.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detallePreventivo.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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
        )
        {
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
    function ObtenerFiltrosPreventivos() {
        method = "POST";
        url = "BandejaPreventivo/ObtenerFiltrosPreventivos"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbTipoEmpleado, data.Result.TipoEmpleado, null, "0", "--Todos--", filters);

            app.llenarComboMultiResult($cmbTipDocContacto, data.Result.TipoDoc, null, " ", "--Sin Definir--", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion", "Ocurrió un problema al cargar los filtros de la bandeja. ")
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null)
    };


    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
    };

    function $openRegdateMantClick() {
        $dateFechaMant.focus();
    }
    function $openRegdateFactClick() {
        $dateFechaFact.focus();
    }

    function $openRegdateGuiaClick() {
        $dateFechaGuia.focus();
    }

    function botonNo() {
        indPrest = 0;
        $spanSi.css('background-color', 'gray')
        $spanNo.css('background-color', 'red')
    }


    function botonCon() {
        indRepuesto = 1;
        $spanSin.css('background-color', 'gray')
        $spanCon.css('background-color', 'green')
    }

    function botonSin() {
        indRepuesto = 0;
        $spanCon.css('background-color', 'gray')
        $spanSin.css('background-color', 'red')
    }

    function CrearTecnico3ro_a_Producto() {
        //var idProducto = $hdnIdProduct.val();
        if ($txtNombreTecnico.val() == "" || $txtNombreTecnico.val() == null || $txtNombreTecnico.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar el nombre de un técnico.");
            return;
        };

        if ($txtApellidoPaternoTec.val() == "" || $txtApellidoPaternoTec.val() == null || $txtApellidoPaternoTec.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar el appelido paterno del técnico.");
            return;
        };

        if ($txtApellidoMaternoTec.val() == "" || $txtApellidoMaternoTec.val() == null || $txtApellidoMaternoTec.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar el appelido materno del técnico.");
            return;
        };

        if ($txtTipoTecnico.val() == "") {
            app.message.error("Validación", "Debe de seleccionar un técnico o realizar el ingreso de uno nuevo.");
            return;
        };

        if ($cmbTipoCredencial.val() == "") {
            app.message.error("Validación", "Debe de seleccionar un tipo de documento.");
            return;
        };

        if ($txtNumDocumento.val() == "" || $txtNumDocumento.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar el número de documento.");
            return;
        };

        if (isNaN($txtNumDocumento.val())) {
            app.message.error("Validación", "El número de documento debe de ser un número");
            return;
        };

        if ($txtTelefono.val() == "" && $txtCorreo.val() == "") {
            app.message.error("Validación", "Debe de tener por lo menos un medio de contacto, ingresar teléfono o email.");
            return;
        };

        if (!app.validarEmail($txtCorreo.val().trim()) && $txtCorreo.val() != "") {
            app.message.error("Validación", "El formato del correo es inválido");
            return;
        };

        if ($txtZona.val() == "") {
            app.message.error("Validación", "Debe de ingresar la zona");
            return;
        };


        var method = "POST";
        var url = "BandejaEmpleados/MantenimientoEmpleados";

        var objParam = {
            TipoMantenimiento: '1',
            CodigoEmpleado: 0,
            NombresEmpleado: $txtNombreTecnico.val().trim(), //agregar campo para nombres
            ApellidoPaternoEmpleado: $txtApellidoPaternoTec.val().trim(), //agregar campo para apellido paterno
            ApellidoMaternoEmpleado: $txtApellidoMaternoTec.val().trim(), //agregar campo para apellido materno
            Cargo: {
                CodigoCargo: 8,//Técnico
                Area: {
                    CodigoArea: ""
                }
            },
            FechaNacimiento: null,
            LugarLaboral: {
                UbigeoId: $txtCodUbicacion.val(),
            },
            TelefonoEmpleado: $txtTelefono.val(),
            EmailEmpleado: $txtCorreo.val(),
            DireccionEmpleado: "",
            SexoEmpleado: "",
            Documento: {
                Parametro: $cmbTipoCredencial.val(),
            },
            NumeroDocumento: $txtNumDocumento.val(),
            Empresa: {
                CodValor1: null,
            },
            CodigoJefe: "",
            FechaIngreso: "",
            TipoEmpleado: "E",
            Estado: 1,
            FechaRegistroFormat: null,
            UsuarioRegistro: null
        }
        var objEmpleado = JSON.stringify(objParam);

        var fnDoneCallback = function (data) {
            app.message.success("Éxito", "Se realizó la creación del técnico satisfactoriamente.");
            $añadirTecnico.modal('toggle');
        };
        var fnFailCallback = function () {
            //app.message.error("Error", "Error en la inserción o documento de identidad ya ha sido ingresado con anterioridad, por favor revisar.");
        };

        app.llamarAjax(method, url, objEmpleado, fnDoneCallback, fnFailCallback, null, null);
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
    function btnRegresarClick() {
        if ($tipoAccion.val() == "V") {
            setDatos();
            app.redirectTo("BandejaPreventivo/RegistroPreventivo");
        }
        else {
            var btnRegresar = document.getElementById("btnRegresar");
            if (btnRegresar != null) {
                if ($estadoMant.val() == "PROG" && detallePreventivo.tecnicosAsig.length == 0)
                {
                    app.message.error("Validación", "Debe de existir por lo menos un técnico registrado en estado 'Programado'");
                    $("#tabTecnicos").addClass("active");
                    $("#navTecnicos").addClass("active in");
                    $("#tabReclamo").removeClass("active");
                    $("#tabSeguimiento").removeClass("active");
                    $("#tabObservaciones").removeClass("active");
                    $("#tabAdjuntos").removeClass("active in");
                    $("#navObservaciones").removeClass("active in");
                    $("#navReclamo").removeClass("active in");
                    $("#navDocumentos").removeClass("active in");
                    $("#navSeguimiento").removeClass("active in");
                    return;
                };
                var fnSi = function () {
                    setDatos();
                    app.redirectTo("BandejaPreventivo/RegistroPreventivo");
                };
                return app.message.confirm("Confirmación", "¿Está seguro que desea retroceder? Se perderán los cambios no guardados.", "Si", "No", fnSi, null);
            }
            else {
                var fnSi = function () {
                    cancelarEditMant();
                };
                return app.message.confirm("Confirmación", "¿Está seguro que desea cancelar? Se perderán los cambios no guardados.", "Si", "No", fnSi, null);
            };
        };
    };

    function cancelarEditMant() {
        var btnActualizar = document.getElementById("btnActualizar");
        var btnCancelar = document.getElementById("btnCancelarMant");

        // rellenar detalles.
        //$dateFechaMant.val(app.obtenerFecha(detallePreventivo.MantPreventivo.FechaMantenimiento));
        $dateFechaMant.val(detallePreventivo.MantPreventivo.FechaMantenimiento);
        //var monto = formatoMiles(detallePreventivo.MantPreventivo.MontoPrestAcce.toFixed(2));
        //$txtMontoAcce.val(detallePreventivo.MantPreventivo.MontoPrestAcce);
        //$txtNumOTM.val(detallePreventivo.MantPreventivo.Val_OTM);
        if (detallePreventivo.MantPreventivo.IndPrestacion == true) {
            botonSi();
        }
        else if (detallePreventivo.MantPreventivo.IndPrestacion == false) {
            botonNo();
        };

        if (detallePreventivo.MantPreventivo.IndRepuesto == true) {
            botonCon();
        }
        else if (detallePreventivo.MantPreventivo.IndRepuesto == false) {
            botonSin();
        }

        $dateFechaMant.prop("disabled", true);
        //$txtNumOTM.prop('disabled', true);
        $btnFinalizarMant.css('display', 'inline-block');
        $spanSi.css('pointer-events', 'none');
        $spanNo.css('pointer-events', 'none');

        $spanCon.css('pointer-events', 'none');
        $spanSin.css('pointer-events', 'none');
        
        btnActualizar.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar Mantenimiento';
        btnCancelar.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i> Regresar'
        btnActualizar.id = 'btnEditarMant';
        btnCancelar.id = 'btnRegresar';
    }

    function AgregarTecnicoExterno() {
        $txtTipoTecnico.val("Externo");
        $hdnTipoEmpleado.val("E");
    };

    function GuardarObservacionReqClick() {
        if ($txtObservacion.val().trim() == "" || $txtObservacion.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese la observación.");
            return;
        }

        if ($numPreventivo.val() != "") {
            var method = "POST";
            var url = "BandejaPreventivo/GuardarObservacion"
            var objObservacion = {
                TipoProceso: "I",
                Observacion: $txtObservacion.val(),
                Id_WorkFlow: $codigoWorkflow.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Estado_Instancia: $estadoMant.val()
            };

            var objParamObs = JSON.stringify(objObservacion);

            var fnSi = function () {
                var fnDoneCallBack = function (data) {
                    app.message.success("Garantías", "Se realizó el registro de la observación correctamente.");

                    detallePreventivo.contadorObservaciones += 1;

                    observaciones.push(
                        {
                            TipoProceso: "I",
                            Observacion: $txtObservacion.val(),
                            Nombre_Usuario: $nombreusuario.val(),
                            Id_WorkFlow: $codigoWorkflow.val(),
                            Estado_Instancia: $estadoMant.val
                        }
                    );
                    var nuevoTr = "<tr id=row" + detallePreventivo.contadorObservaciones + ">" +
                        "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                        "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                        "<th style='text-align: center;'>" + hoy() + "</th>" +
                        "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                        "<th style='text-align: center;'>" +
                        //                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: detallePreventivo.eliminarObsTmp(" + detallePreventivo.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
                        "</th> " +
                        "</tr>";
                    $tblObservaciones.append(nuevoTr);
                    $NoExisteRegObs.hide();
                    $modalObservacion.modal('toggle');
                    app.message.success("Éxito", "Se registró la observación satisfactoriamente", "Aceptar");
                };

                var fnFailCallBack = function () {
                    app.message.error("Validación", "Ocurrió un error al registrar la observación.");
                };
                app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, null);
            };
            return app.message.confirm("Confirmación", "¿Desea registrar la observación?", "Sí", "No", fnSi, null);
        }
        else {
            detallePreventivo.contadorObservaciones += 1;

            observaciones.push({
                Id: detallePreventivo.contadorObservaciones,
                TipoProceso: "I",
                Estado_Instancia: "REG",
                Observacion: $txtObservacion.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Perfil_Usuario: $perfilnombre.val()
            })
            var nuevoTr = "<tr id=row" + detallePreventivo.contadorObservaciones + ">" +
                "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                "<th style='text-align: center;'>" + hoy() + "</th>" +
                "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                "<th style='text-align: center;'>" +
                "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: detallePreventivo.eliminarObsTmp(" + detallePreventivo.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                "</th> " +
                "</tr>";
            $tblObservaciones.append(nuevoTr);
            $NoExisteRegObs.hide();
            $modalObservacion.modal('toggle');
        };
        $txtObservacion.val("");
    }

    function setDatosCompletar() {
        var method = "POST";
        var url = "BandejaPreventivo/SetMantPrev";

        var obj = {
            Id: $numPreventivo.val(),
            CodEstado: "COM",
            Id_WorkFlow: $codigoWorkflow.val(),
            Id_Mant: $idMantPadre.val(),
            TipoTarea: "V",
            Ruc: $ruc.val()
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            location.reload();
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al modificar las variables internas. ")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null, null);
    }


    function setDatosFin() {
        var method = "POST";
        var url = "BandejaPreventivo/SetMantPrev";

        var obj = {
            Id: $numPreventivo.val(),
            CodEstado: "FIN",
            Id_WorkFlow: $codigoWorkflow.val(),
            Id_Mant: $idMantPadre.val(),
            TipoTarea: "U",
            Ruc: $ruc.val()
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            location.reload();
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al modificar las variables internas. ")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null, null);
    }

    function setDatos()
    {
        var method = "POST";
        var url = "BandejaPreventivo/SetVariablesGenerales";
        var objEditar = {
            Id_Mant: $idMantPadre.val(),
            TipoTarea: $tipoAccionPadre.val(),
        };

        var objParam = JSON.stringify(objEditar);

        var fnDoneCallBack = function () {
            //app.redirectTo("BandejaPreventivo/RegistroPreventivo");
        };

        var fnFailCallBack = function (Message) {
            ap.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }

    function EditarMantenimiento() {
        var btnEditr = document.getElementById("btnEditarMant");
        var btnRegresar = document.getElementById("btnRegresar");
        if (btnEditr != null) {
            $btnFinalizarMant.css('display', 'none');
            $dateFechaMant.prop('disabled', false);
            //$txtNumOTM.prop('disabled', false);
            $spanSi.css('pointer-events', 'auto')
            $spanNo.css('pointer-events', 'auto')
            $spanCon.css('pointer-events', 'auto')
            $spanSin.css('pointer-events', 'auto')
            btnEditr.innerHTML = '<i class="fa fa-wrench" aria-hidden="true"></i> Actualizar';
            btnRegresar.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancelar'
            btnEditr.id = 'btnActualizar';
            btnRegresar.id = 'btnCancelarMant';
        }
        else {
            actualizarMant()
        }
    };

    function actualizarMant() {
        if (indRepuesto == null) {
            app.message.error("Validación", "Debe de elegir c/s repuesto");
            return;
        };

        if (indPrest == null) {
            app.message.error("Validación", "Debe de elegir c/s prestación accesoria");
            return;
        };

        if ($dateFechaMant.val() == "" || $dateFechaMant.val() == null ) {
            app.message.error("Validación", "Debe de ingresar una Fecha de Mantenimiento");
            return;
        };

        //if ($txtNumOTM.val().trim() == "" || $txtNumOTM.val().trim().length == 0 || $txtNumOTM.val() == null) {
        //    app.message.error("Validación", "Debe de ingresar el OTM");
        //    return;
        //};

        //var fecHoy = hoy()

        //if ($dateFechaMant.val() < fecHoy) {
        //    app.message.error("Validación", "La Fecha de Mantenimiento no puede ser menor a la fecha actual.");
        //    return;
        //};
        
        if (indPrest == 1 && ($txtMontoAcce.val() == "" || $txtMontoAcce.val().trim().length == 0 || $txtMontoAcce.val() == "0" || $txtMontoAcce.val() == "0.00")) {
            app.message.error("Validación", "Debe de ingresar un Monto de Prestación Accesoria");
            return;
        };

        var method = "POST";
        var url = "BandejaPreventivo/MantPreventivos";

        var objReclamo = {
            TipoProceso: "U",
            Id_Detalle: $numPreventivo.val(),
            Id_Mant: $idMantPadre.val(),
            Id_WorkFlow: 0,
            FechaMantenimiento: $dateFechaMant.val(),
            //MontoPrestAcce: ($txtMontoAcce.val()).replaceAll(",", ""),
            IndPrestAcce: indPrest,
            IndRepuesto: indRepuesto,
            //valOTM: $txtNumOTM.val(),
            Estado: $estadoMant.val()
        };

        var objParam = JSON.stringify(objReclamo);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo == -1) {
                    app.message.error("Validación", "La Fecha del Mantenimiento Actual no puede ser mayor a la Fecha del Mantenimiento Posterior.");
                } else if (data.Result.Codigo == 0) {
                    app.message.error("Validación", "Ocurrió un problema al realizar la inserción, por favor revisar");
                } else {
                    app.message.success("Éxito", "Se actualizaron los datos correctamente.");
                    detallePreventivo.MantPreventivo.IndPrestacion = indPrest;
                    detallePreventivo.MantPreventivo.IndRepuesto = indRepuesto;
                    detallePreventivo.MantPreventivo.FechaMantenimiento = $dateFechaMant.val();
                    detallePreventivo.MantPreventivo.MontoPrestAcce = $txtMontoAcce.val();
                    //detallePreventivo.MantPreventivo.Val_OTM = $txtNumOTM.val();
                    cancelarEditMant();
                }

                if ($estadoMant.val() == "PROG" && indPrest == 0 && indRepuesto == 0) {
                    $btnFinalizarMant.html('<i class="fa fa-check" aria-hidden="true"></i>&nbsp;Completar');
                } else {
                    $btnFinalizarMant.html('<i class="fa fa-check" aria-hidden="true"></i>&nbsp;Finalizar');
                }
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al realizar la inserción.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Desea realizar la actualización de los datos del mantenimiento preventivo?", "Sí", "No", fnSi, null);
    };
    function cargarTipoDoc() {
        var method = "POST";
        var url = "Utiles/ListarDocumentos";
        var objParams = ""

        var fnDoneCallback = function (data) {


            var filters = {};
            filters.placeholder = "--Todos--"
            filters.allowClear = false;

            app.llenarCombo($cmbTipDocTecnico, data, null, " ", "--Todos--", filters);

            var filters1 = {};
            filters1.placeholder = "--Seleccionar--"
            filters1.allowClear = false;

            app.llenarCombo($cmbTipoCredencial, data, null, "", "--Seleccionar--", filters1);
        }
        app.llamarAjax(method, url, objParams, fnDoneCallback, null, null, null);
    }

    function DesasignarTecnico(CodAsignacion) {
        var method = "POST";
        var url = "BandejaPreventivo/MantTecnicosPrev";

        //if (detallePreventivo.tecnicosAsig.length == 1) {
        //    app.message.error("Validación", "Debe de contar por lo menos con un técnico");
        //    return;
        //};

        var objTecnico = {
            TipoProceso: "U",
            Id_Asig: CodAsignacion,
            Id_Detalle: $numPreventivo.val(),
            Estado: false
        };

        var objParam = JSON.stringify(objTecnico);


        var fnSi = function () {
            var fnDoneCallback = function () {
                app.message.success("Éxito", "Se realizó la desasignación del técnico.");
                ObtenerTecnicosPreventivos();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al modificar al técnico, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallBack, null, null);
        };

        return app.message.confirm("Confirmación", "¿Desea desasignar al técnico de la atención?", "Sí", "No", fnSi, null);
    }

    /*Lógica Ubigeo*/
    function logicUbigeo() {
        $cmbProvincia.prop("disabled", true);
        $cmbDistrito.prop("disabled", true);
        getDepartamentos();
    }
    function getDepartamentos() {
        var method = "POST";
        var url = "Ubigeo/ObtenerUbigeo";
        var ubigeoObj = {}

        var objParam = JSON.stringify(ubigeoObj);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

            var distritos = { Result: [] };
            for (let i = 0; i < data.Result.length; i++) {
                var departamento = {
                    Id: data.Result[i].CodDepartamento,
                    Text: data.Result[i].NombreDepartamento,
                }
                resultado.Result.push(departamento);
            }

            resultado.Result = resultado.Result.reduce((acumulador, itemActual) => {
                // Verificar si el Id ya está en el acumulador
                if (!acumulador.some(item => item.Id === itemActual.Id)) {
                    acumulador.push(itemActual);
                }
                return acumulador;
            }, []);
            $cmbDepartamento.on('change', function () {
                const codDepartamento = $(this).val();
                const nomDepartamento = $('select[id="cmbDepartamento"] option:selected').text();
                sessionStorage.setItem('nomDepartamento', `${nomDepartamento}`);
                if (!codDepartamento === null || !codDepartamento === '') {
                    $(this).prop('disabled', false);

                } else {
                    $cmbProvincia.prop('disabled', false);
                    obtenerProvincia(codDepartamento, data);
                    $cmbDistrito.prop("disabled", true);
                }
                $cmbDistrito.val("").trigger("change");
            });
            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = false;
            app.llenarCombo($cmbDepartamento, resultado, $modalZona, "", "<--Seleccione-->", filters);
        }
        var fnFailCallback = function () {
            app.mensajes.error("Error", "No se ejecutó correctamente la carga de departamentos")
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null)

    }
    function obtenerProvincia(codDepartamento, data) {
        var provincias = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var provincia = {
                Id: data.Result[i].CodProvincia,
                Text: data.Result[i].NombreProvincia,
            }
            provincias.Result.push(provincia);

        }
        provincias.Result = provincias.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodDepartamento = itemActual.Id.startsWith(codDepartamento);
            if (!isDuplicate && startsWithCodDepartamento) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);
        $cmbProvincia.on('change', function () {
            const codProvincia = $(this).val();
            const nomProvincia = $('select[id="cmbProvincia"] option:selected').text();
            sessionStorage.setItem('nomProvincia', `${nomProvincia}`);

            if (!codProvincia === null || !codProvincia === '') {
                $(this).prop('disabled', false);

            } else {
                $cmbProvincia.prop('disabled', false);
                $cmbDistrito.prop('disabled', false)
                obtenerDistrito(codProvincia, data);
            }
        });

        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbProvincia, provincias, $modalZona, "", "<--Seleccione-->", filters)
    }

    function obtenerDistrito(codProvincia, data) {
        var distritos = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var distrito = {
                Id: data.Result[i].UbigeoId,
                Text: data.Result[i].NombreDistrito,
            }
            distritos.Result.push(distrito);

        }
        distritos.Result = distritos.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodProvincia = itemActual.Id.startsWith(codProvincia);
            if (!isDuplicate && startsWithCodProvincia) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);

        $cmbDistrito.on('change', function () {
            const codDistrito = $(this).val();
            const nombreDistrito = $('select[id="cmbDistrito"] option:selected').text();
            sessionStorage.setItem('codDistrito', `${codDistrito}`);
            sessionStorage.setItem('nombreDistrito', `${nombreDistrito}`);
            $txtCodUbicacion.val(codDistrito);
        });


        var filters = {};
        filters.placeholder = "-- Seleccione --";
        filters.allowClear = false;
        app.llenarCombo($cmbDistrito, distritos, $modalZona, "", "<--Seleccione-->", filters)
    }


    function seleccionar() {

        var codDistrito = sessionStorage.getItem('codDistrito');

        var nomDepartamento = sessionStorage.getItem('nomDepartamento')
        var nomProvincia = sessionStorage.getItem('nomProvincia');
        var nomDistrito = sessionStorage.getItem('nombreDistrito');

        if ($cmbDepartamento.val().trim() === "" || $cmbDepartamento.val().trim() === null || $cmbDepartamento.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un departamento");
            return;
        }

        if ($cmbProvincia.val().trim() === "" || $cmbProvincia.val().trim() === null || $cmbProvincia.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar una provincia");
            return;
        }

        if ($cmbDistrito.val().trim() === "" || $cmbDistrito.val().trim() === null || $cmbDistrito.val().trim() === undefined) {
            app.message.error("Validacion", "Debe seleccionar un distrito");
            return;
        }

        $txtZona.val(nomDepartamento + ' / ' + nomProvincia + ' / ' + nomDistrito);
        $modalZona.modal('toggle');
    };

    function ObtenerTecnicosPreventivos() {
        var method = "POST";
        var url = "BandejaPreventivo/ObtenerTecnicosPreventivos";

        var objReq = {
            NumPreventivo: $numPreventivo.val()
        };

        var objParam = JSON.stringify(objReq);


        var fnDoneCallBack = function (data) {

            detallePreventivo.tecnicosAsig = [];

            for (var i = 0; i < data.Result.length; i++) {
                detallePreventivo.tecnicosAsig.push({
                    Id: data.Result[i].Id_Asig,
                    TipoDoc: data.Result[i].NomTipoDoc,
                    Documento: data.Result[i].Documento,
                    Tipo_Documento: data.Result[i].Tipo_Documento,
                    Nombres: data.Result[i].Nombres,
                    ApePaterno: data.Result[i].ApePaterno,
                    ApeMaterno: data.Result[i].ApeMaterno,
                    NombreCompleto: data.Result[i].Nombres + ' ' + data.Result[i].ApePaterno + ' ' + data.Result[i].ApeMaterno,
                    TipoTecnico: data.Result[i].TipoTecnico,
                    Telefono: data.Result[i].Telefono,
                    Correo: data.Result[i].Correo,
                    Empresa: data.Result[i].Empresa,
                    Zona: data.Result[i].Zona,
                    DescZona: data.Result[i].DescZona,
                    Estado: data.Result[i].Estado
                });
            };
            cargarTablaMainTecnicos(detallePreventivo.tecnicosAsig);
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Ocurrió un error al traer el listado de técnicos, por favor revisar.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function DesasignarTecnicoTmp(codTecnico) {
        var fnSi = function () {
            detallePreventivo.tecnicosAsig = detallePreventivo.tecnicosAsig.filter(tecnico => tecnico.Cod_Tecnico != codTecnico);
            cargarTablaMainTecnicos(detallePreventivo.tecnicosAsig);
        };
        return app.message.confirm("Confirmación", "¿Desea desasignar al técnico de la atención", "Sí", "No", fnSi, null);
    };
    function IniciarBotonSeleccionarTecnico() {
        $('#tblTecnicos tbody').on('click', 'td #btnSeleccionarTecnico', function () {

            //limpiarDetalleInfoAdcional()
            var tr = $(this).closest('tr');
            var row = $('#tblTecnicos').dataTable().api().row(tr);
            var info = row.data();

            var tecnico = detallePreventivo.tecnicosAsig.filter(tecnico => tecnico.Id == info.CodigoEmpleado);
            if (tecnico.length > 0) {
                app.message.error("Validación", "El técnico ya se encuentra asignado.");
                return;
            };

           
            if ($numPreventivo.val() != "") {
                crearTecnicos(info);
            };
        });
    };

    function crearTecnicos(info) {
        var validador = 0;

        for (var i = 0; i < detallePreventivo.tecnicosAsig.length; i++) {
            if (detallePreventivo.tecnicosAsig[i].Documento == info.NumeroDocumento) {
                validador = 1;
            };
        };

        if (validador == 1) {
            app.message.error("Validación", "El técnico ya se encuentra asignado a este mantenimiento.");
            return;
        };

        var method = "POST";
        var url = "BandejaPreventivo/MantTecnicosPrev";

        var objTecnico = {
            TipoProceso: "I",
            Id_Asig: 0,
            Id_Detalle: $numPreventivo.val(),
            Cod_Tecnico: info.CodigoEmpleado,
            Nombres: info.NombresEmpleado,
            ApePaterno: info.ApellidoPaternoEmpleado,
            ApeMaterno: info.ApellidoMaternoEmpleado,
            Documento: info.NumeroDocumento,
            Tipo_Documento: info.Documento.Parametro,
            Correo: info.EmailEmpleado,
            Telefono: info.TelefonoEmpleado,
            Zona: info.LugarLaboral.UbigeoId,
            Empresa: info.Empresa.Valor1,
            TipoTecnico: info.CodigoTipoEmpleado,
            Estado: true
        };

        var objParam = JSON.stringify(objTecnico);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                detallePreventivo.tecnicosAsig.push({
                    Id: data.Result.Codigo,
                    TipoDoc: info.Documento.Descripcion,
                    Documento: info.NumeroDocumento,
                    Tipo_Documento: info.Documento.Parametro,
                    Nombres: info.NombresEmpleado,
                    ApePaterno: info.ApellidoPaternoEmpleado,
                    ApeMaterno: info.ApellidoMaternoEmpleado,
                    NombreCompleto: info.NombresCompletosEmpleado,
                    TipoTecnico: info.CodigoTipoEmpleado,
                    Telefono: info.TelefonoEmpleado,
                    Correo: info.EmailEmpleado,
                    Empresa: info.Empresa.Valor1,
                    Zona: info.LugarLaboral.UbigeoId,
                    DescZona: info.LugarLaboral.NombreDepartamento + info.LugarLaboral.NombreProvincia + info.LugarLaboral.NombreDistrito,
                    Estado: true
                });

                cargarTablaMainTecnicos(detallePreventivo.tecnicosAsig);
                $modalBusquedaTecnico.modal('toggle');

                var aceptar = function () {
                    if (detallePreventivo.tecnicosAsig.length == 1 && $estadoMant.val() == "PEND") {
                        CambiarEstado();
                    };
                }
                app.message.success("Éxito", "Se realizó la inserción correctamente.", "Aceptar", aceptar);
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un error al realizar la inserción del técnico, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
        return app.message.confirm("Confirmación", "Desea asignar el técnico seleccionado al mantenimiento preventivo actual?","Sí","No",fnSi, null);
    };

    function BuscarTecnicos() {
        var method = "POST";
        var url = "BandejaPreventivo/ObtenerTecnico"
        var objTecnico = {
            CodigoEmpleado: 0,
            NombreEmpleado: $txtNombres.val() == null ? "" : $txtNombres.val().trim(),
            ApellidoPaternoEmpleado: $txtApePat.val() == null ? "" : $txtApePat.val().trim(),
            ApellidoMaternoEmpleado: $txtApeMat.val() == null ? "" : $txtApeMat.val().trim(),
            CodigoCargo: 8,//-->8 es Técnico
            TipoDocumento: $cmbTipDocTecnico.val(),
            TipoEmpleado: $cmbTipoEmpleado.val() == 0 ? "" : $cmbTipoEmpleado.val(),
            NumeroDocumento: $txtNumDocTec.val() == null ? "" : $txtNumDocTec.val(),
            Estado: 1,
            FechaInicio: "",
            FechaFinal: ""
        };

        var objParam = JSON.stringify(objTecnico);

        var fnDoneCallBack = function (data) {
            //limpiarAsignacionTecnicos();
            cargarBandejaTecnicos(data);
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Error al cargar la bandeja de técnicos.");
            cargarBandejaTecnicos()
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }

    function cargarBandejaTecnicos(data) {
        var columns = [
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "NumeroDocumento",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "Documento.Descripcion",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "NombresCompletosEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "TelefonoEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "EmailEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "LugarLaboral.UbigeoId",
                render: function (data, type, row) {
                    var zona = row.LugarLaboral.NombreDepartamento + '/' + row.LugarLaboral.NombreProvincia + '/' + row.LugarLaboral.NombreDistrito;
                    return '<center>' + zona + '</center>'
                }
            },
            {
                data: "TipoEmpleado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }
            },
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    var d = "'" + row.CodigoEmpleado + "','" + row.NombresCompletosEmpleado + "','" + row.Empresa.Valor1 + "'";
                    var seleccionar = '<a id="btnSeleccionarTecnico" class="btn btn-default btn-xs" title="Seleccionar"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
                    return '<center>' + seleccionar + '</center>';
                }
            }
        ]
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ]

        var filters = {};
        filters.dataTablePageLength = 5;
        filters.dataTableInfo = true;

        app.llenarTabla($tblTecnicos, data, columns, columnDefs, "#tblTecnicos", null, null, filters);
    }

    function CambiarEstado() {
        var method = "POST";
        var url = "BandejaPreventivo/ProgramarMant";

        var obj = {
            TipoProceso: "E",
            Estado: "PROG",
            Id_Detalle: $numPreventivo.val(),
            Id_Mant: $idMantPadre.val(),
            FechaMantenimiento: $dateFechaMant.val(),
            Id_WorkFlow: $codigoWorkflow.val()
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function (data) {
            //$estadoMant.val("PROG");
            //$spanEstadoSol.text("Programado");
            //$btnFinalizarMant.prop('disabled', false);
            ModificarVarInternas();
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Ocurrió un error al realizar el cambio de estado a Programado");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };


    function ModificarVarInternas() {
        var method = "POST";
        var url = "BandejaPreventivo/SetMantPrev";

        var obj = {
            Id: $numPreventivo.val(),
            CodEstado: "PROG",
            Id_WorkFlow: $codigoWorkflow.val(),
            Id_Mant: $idMantPadre.val(),
            TipoTarea: "U",
            Ruc: $ruc.val()
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            location.reload();
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al modificar las variables internas. ")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null, null);
    }


    function FinalizarMant() {

        if (contactos.length == 0) {
            app.message.error("Validación", "Es necesario que vincule por lo menos un contacto");
            return;
        };

        if ($estadoMant.val() == "PROG" && detallePreventivo.tecnicosAsig.length == 0) {
            app.message.error("Validación", "Debe de existir por lo menos un técnico registrado en estado 'Programado'");
            $("#tabTecnicos").addClass("active");
            $("#navTecnicos").addClass("active in");
            $("#tabReclamo").removeClass("active");
            $("#tabSeguimiento").removeClass("active");
            $("#tabObservaciones").removeClass("active");
            $("#tabAdjuntos").removeClass("active in");
            $("#navObservaciones").removeClass("active in");
            $("#navReclamo").removeClass("active in");
            $("#navDocumentos").removeClass("active in");
            $("#navSeguimiento").removeClass("active in");
            return;
        };

        if (indPrest == 0 && indRepuesto == 0) {
            if ($txtNumOTM.val().trim() == "" || $txtNumOTM.val().trim().length == 0 || $txtNumOTM.val() == null) {
                app.message.error("Validación", "Debe de ingresar el OTM");
                return;
            };

            var validador = 1;
            for (var i = 0; i < adjuntos.length; i++) {
                if (adjuntos[i].CodigoTipoDocumento == "DP01" || adjuntos[i].CodigoTipoDocumento == "DP02" || adjuntos[i].CodigoTipoDocumento == "DP03") {
                    validador = 0;
                };
            };
            if (validador == 1) {
                app.message.error("Validación", 'Debe de adjuntar por lo menos alguno de estos documentos: "Constancia","OTM","INFORME" para continuar.');
                return;
            };

            

            var method = "POST";
            var url = "BandejaPreventivo/CerrarMantenimiento";

            var obj = {
                TipoProceso: "E",
                Estado: "COM",
                Id_Detalle: $numPreventivo.val(),
                Id_Mant: $idMantPadre.val(),
                FechaMantenimiento: $dateFechaMant.val(),
                Id_WorkFlow: $codigoWorkflow.val(),
                valOTM: $txtNumOTM.val()
            };

            var objParam = JSON.stringify(obj);

            var fnSi = function () {
                var fnDoneCallBack = function (data) {
                    var redirect = function () {
                        setDatosCompletar()
                    };
                    return app.message.success("Éxito", "Se realizó el cambio de estado", "Aceptar", redirect);
                };

                var fnFailCallBack = function () {
                    app.message.error("Validación", "Ocurrió un error al realizar el cambio de estado a Completado");
                };

                app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
            };
            return app.message.confirm("Confirmación", "Está seguro que desea completar el mantenimiento", "Sí", "No", fnSi, null);
        }
        else if (indPrest == 1) {
            ProcesoGuiaManuscrita();
        }
        else if (indPrest == 0 && indRepuesto == 1) {
            ProcesoGuiaManuscrita();
        };
    };

    function ProcesoGuiaManuscrita() {
        var validador = 1;
        for (var i = 0; i < adjuntos.length; i++) {
            if (adjuntos[i].CodigoTipoDocumento == "DP04") {
                validador = 0;
            };
        };
        if (validador == 1) {
            app.message.error("Validación", 'Debe de adjuntar por lo menos alguno de estos documentos: "Guía Manuscrita" para continuar.');
            return;
        };
        CambiaraFinalizado();
    };

    function CambiaraFinalizado() {
        var method = "POST";
        var url = "BandejaPreventivo/FinalizarMant";

        var obj = {
            TipoProceso: "E",
            Estado: "FIN",
            Id_Detalle: $numPreventivo.val(),
            Id_Mant: $idMantPadre.val(),
            valOTM: $txtNumOTM.val(),
            FechaMantenimiento: $dateFechaMant.val(),
            Id_WorkFlow: $codigoWorkflow.val()
        };

        var objParam = JSON.stringify(obj);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                var redirect = function () {
                    setDatosFin();
                };
                return app.message.success("Éxito", "Se realizó el cambio de estado a 'Finalizado' ", "Aceptar", redirect);
            };

            var fnFailCallBack = function () {
                app.message.error("Validación", "Ocurrió un error al realizar el cambio de estado a Finalizado");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
        return app.message.confirm("Confirmación", "¿Desea finalizar el mantenimiento actual?", "Sí", "No", fnSi);
    };
    function CompletarMant() {

        var validador = 1;

        if (indPrest == true) {
            if ($txtNumFactura.val() == "" || $txtNumFactura.val().trim().length == 0 || $txtNumFactura.val() == null) {
                validador = 0
            };
        }

        if (validador == 0) {
            app.message.error("Validación", "Debe de ingresar el número de factura");
            return;
        };

        if (indPrest == true) {
            if ($dateFechaFact.val() == "" || $dateFechaFact.val().trim().length == 0 || $dateFechaFact.val() == null) {
                validador = 0;
            };
        }

        if (validador == 0) {
            app.message.error("Validación", "Debe de ingresar la fecha de factura");
            return;
        };

        if (indRepuesto == true) {
            if ($txtNumGuia.val() == "" || $txtNumGuia.val().trim().length == 0 || $txtNumGuia.val() == null) {
                validador = 0;
            };
        };

        if (validador == 0) {
            app.message.error("Validación", "Debe de ingresar el Número de Guía.");
            return;
        };

        if (indRepuesto == true) {
            if ($dateFechaGuia.val() == "" || $dateFechaGuia.val().trim().length == 0 || $dateFechaGuia.val() == null) {
                validador = 0;
            };
        };


        if (validador == 0) {
            app.message.error("Validación", "Debe de ingresar la Fecha de Guía.");
            return;
        };

        if ($txtNumOTM.val().trim() == "" || $txtNumOTM.val().trim().length == 0 || $txtNumOTM.val() == null) {
            app.message.error("Validación", "Debe de ingresar el OTM");
            return;
        };

        for (var i = 0; i < adjuntos.length; i++) {
            if (adjuntos[i].CodigoTipoDocumento == "DP01" || adjuntos[i].CodigoTipoDocumento == "DP02" || adjuntos[i].CodigoTipoDocumento == "DP03") {
                validador = 0;
            };
        };

        if (validador == 1) {
            app.message.error("Validación", 'Debe de adjuntar por lo menos alguno de estos documentos: "Constancia","OTM","INFORME" para continuar.');
            return;
        };

        


        var method = "POST";
        var url = "BandejaPreventivo/CerrarMantenimiento";

        var obj = {
            TipoProceso: "C",
            Estado: "COM",
            Id_Detalle: $numPreventivo.val(),
            Id_Mant: $idMantPadre.val(),
            FechaMantenimiento: $dateFechaMant.val(),
            NumFactura: $txtNumFactura.val(),
            FecFactura: $dateFechaFact.val(),
            valGuia: $txtNumGuia.val(),
            FecGuia: $dateFechaGuia.val(),
            valOTM: $txtNumOTM.val(),
            Id_WorkFlow: $codigoWorkflow.val()
        };

        var objParam = JSON.stringify(obj);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                var redirect = function () {
                    setDatosCompletar();
                };
                return app.message.success("Éxito", "Se realizó el cambio de estado a 'Completado' ", "Aceptar", redirect);
            };

            var fnFailCallBack = function () {
                app.message.error("Validación", "Ocurrió un error al realizar el cambio de estado a Completado");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
        return app.message.confirm("Confirmación", "¿Desea completar el mantenimiento actual?", "Sí", "No", fnSi);
    };
    function cargarTablaMainTecnicos(tecnicos) {

        $NoExisteTec.hide();
        var data = {}
        data.Result = [];
        data.Result = tecnicos;

        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "TipoDoc",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }

            },
            {
                data: "Documento",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }

            },
            {
                data: "NombreCompleto",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }

            },
            {
                data: "Telefono",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }

            },
            {
                data: "Correo",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }
                }

            },
            {
                data: "Empresa",
                render: function (data, type, row) {
                    if (row.TipoTecnico == "I") {
                        if (data == "" || data == null) {
                            return '<center>No definido</center>';
                        } else {
                            return '<center>' + data + '</center>';
                        }
                    }
                    else if (row.TipoTecnico == "E") {
                        if (data == "" || data == null) {
                            if ($tipoAccion.val() == "U") {
                                var html = '';
                                html += '<div class="form-group">' + '<div class="input-group input-group-sm date">'
                                    + '<input placeholder="--Empresa--" type="text" class="form-control input-sm" id="txtNomEmpresa' + row.Id + '">';
                                html += '<a class="input-group-addon input-sm" id="saveEmpresaTecnico' + row.Id + '" href="javascript:detallePreventivo.saveEmpresaTecnico(' + row.Id + ')"" >' +
                                    '<i class="fa fa-save" aria-hidden="true"></i>' +
                                    '</a>';
                                return '<center>' + html + '</center>';
                            }
                            else {
                                return '<center>' + 'No definido' + '</center>';
                            }
                        } else {
                            return '<center>' + data + '</center>';
                        }
                    }
                }

            },
            {
                data: "Id",
                render: function (data, type, row) {
                    if ($tipoAccion.val() == "") {
                        var retirar = '<a id="btnDesasignarTecnicoTmp" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:detallePreventivo.DesasignarTecnicoTmp(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
                        return '<center>' + retirar + '</center>';
                    }
                    else if ($tipoAccion.val() == "U") {
                        if ($estadoMant.val() != "FIN") {
                            var retirar = '<a id="btnDesasignarTecnico" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:detallePreventivo.DesasignarTecnico(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
                            return '<center>' + retirar + '</center>';
                        }
                        else {
                            return '<center>' + 'No Disponible' + '</center>';
                        }
                    }
                    else if ($tipoAccion.val() == "V") {
                        return '<center>' + 'No Disponible' + '</center>';
                    }
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];

        app.llenarTabla($tblMainTecnicos, data, columns, columnDefs, "#tblMainTecnicos");
    };

    function cargarCabecera(mantenimiento) {
        $spanEstadoSol.text(mantenimiento.Estado);
        if (mantenimiento.CodEstado == "PROG") {
            $btnFinalizarMant.prop('disabled', false);
        };
        $dateFechaMant.val(mantenimiento.FechaMantenimiento);
        //$txtMontoAcce.val(mantenimiento.MontoPrestAcce);
        $txtNumFactura.val(mantenimiento.NumFactura);
        $txtNumOTM.val(mantenimiento.Val_OTM);
        $dateFechaFact.val(mantenimiento.FecFactura);
        $dateFechaGuia.val(mantenimiento.FecGuia);
        $txtNumGuia.val(mantenimiento.Val_GUIA);


        if ($txtNumFactura.val() != "" && $dateFechaFact.val() != "") {
            $rowFactura.css('display', 'block');
            $colNumFact.css('display', 'block');
            $colFechaFact.css('display', 'block');
        };

        if ($txtNumGuia.val() != "" && $dateFechaGuia.val() != "") {
            $rowFactura.css('display', 'block');
            $colNumGuia.css('display', 'block');
            $colFechaGuia.css('display', 'block');
        };

        if (mantenimiento.CodEstado == "FIN")
        {
            $rowFactura.css('display', 'block');
            if (mantenimiento.IndPrestacion == true && mantenimiento.IndRepuesto == false) {
                $colNumFact.css('display', 'block');
                $colFechaFact.css('display', 'block');
                $txtNumFactura.prop('disabled', false);
                $dateFechaFact.prop('disabled', false);
            }
            else if (mantenimiento.IndRepuesto == true && mantenimiento.IndPrestacion == false) {
                $colNumGuia.css('display', 'block');
                $colFechaGuia.css('display', 'block');
                $txtNumGuia.prop('disabled', false);
                $dateFechaGuia.prop('disabled', false);
            }
            else if (mantenimiento.IndRepuesto == true && mantenimiento.IndPrestacion == true)
            {
                $colNumGuia.css('display', 'block');
                $colFechaGuia.css('display', 'block');
                $txtNumGuia.prop('disabled', false);
                $dateFechaGuia.prop('disabled', false);
                $colNumFact.css('display', 'block');
                $colFechaFact.css('display', 'block');
                $txtNumFactura.prop('disabled', false);
                $dateFechaFact.prop('disabled', false);
            }
        }

        if (mantenimiento.IndPrestacion == true) {
            botonSi();
            $txtMontoAcce.val(mantenimiento.MontoPrestAcce);
        }
        else if (mantenimiento.IndPrestacion == false) {
            botonNo();
        };

        if (mantenimiento.IndRepuesto == true) {
            botonCon();
        }
        else if (mantenimiento.IndRepuesto == false) {
            botonSin();
        };
    };

    function saveEmpresaTecnico(Id) {
        var empresa = $('#txtNomEmpresa' + Id).val();

        if (empresa == "" || empresa.trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un nombre de empresa");
            return;
        };

        var method = "POST";
        var url = "BandejaPreventivo/MantTecnicosPrev";

        var objTecnico = {
            TipoProceso: "A",
            Id_Asig: Id,
            Empresa: empresa,
            Estado: true
        };

        var objParam = JSON.stringify(objTecnico);


        var fnSi = function () {
            var fnDoneCallback = function () {
                app.message.success("Éxito", "Se grabó correctamente.");
                ObtenerTecnicosPreventivos();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al modificar al técnico, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallBack, null, null);
        };

        return app.message.confirm("Confirmación", "¿Desea grabar?", "Sí", "No", fnSi, null);
    }

    function cargarDatos() {
        if ($numPreventivo.val() != "") {
            $contadordoc.val("");

            var method = "POST";
            var url = "BandejaPreventivo/ObtenerMainPreventivo"
            objRq = {
                NumPreventivo: $numPreventivo.val(),
                IdWorkFlow: $codigoWorkflow.val()
            };
            var objParam = JSON.stringify(objRq);
            var fnDoneCallBack = function (data) {

                //detallePreventivo.MantPreventivo = data.Result.MantPreventivo;
                var mantenimiento = {
                    Id: data.Result.MantPreventivo.Id,
                    FechaMantenimiento: app.obtenerFecha(data.Result.MantPreventivo.FechaMantenimiento),
                    FecFactura: data.Result.MantPreventivo.FecFactura,
                    NumFactura: data.Result.MantPreventivo.NumFactura,
                    FecGuia: data.Result.MantPreventivo.FecGuia,
                    Val_OTM: data.Result.MantPreventivo.Val_OTM,
                    Val_GUIA: data.Result.MantPreventivo.Val_GUIA,
                    MontoPrestAcce: formatoMiles(data.Result.MantPreventivo.MontoPrestAcce.toFixed(2)),
                    IndPrestacion: data.Result.MantPreventivo.IndPrestacion,
                    IndRepuesto: data.Result.MantPreventivo.IndRepuesto,
                    Estado: data.Result.MantPreventivo.Estado ,
                    CodEstado: data.Result.MantPreventivo.CodEstado
                };

                detallePreventivo.MantPreventivo = mantenimiento;

                cargarCabecera(mantenimiento);

                for (var i = 0; i < data.Result.Tecnicos.length; i++) {
                    detallePreventivo.tecnicosAsig.push({
                        Id: data.Result.Tecnicos[i].Id_Asig,
                        TipoDoc: data.Result.Tecnicos[i].NomTipoDoc,
                        Documento: data.Result.Tecnicos[i].Documento,
                        Tipo_Documento: data.Result.Tecnicos[i].Tipo_Documento,
                        Nombres: data.Result.Tecnicos[i].Nombres,
                        ApePaterno: data.Result.Tecnicos[i].ApePaterno,
                        ApeMaterno: data.Result.Tecnicos[i].ApeMaterno,
                        NombreCompleto: data.Result.Tecnicos[i].Nombres + ' ' + data.Result.Tecnicos[i].ApePaterno + ' ' + data.Result.Tecnicos[i].ApeMaterno,
                        TipoTecnico: data.Result.Tecnicos[i].TipoTecnico,
                        Telefono: data.Result.Tecnicos[i].Telefono,
                        Correo: data.Result.Tecnicos[i].Correo,
                        Empresa: data.Result.Tecnicos[i].Empresa,
                        Zona: data.Result.Tecnicos[i].Zona,
                        DescZona: data.Result.Tecnicos[i].DescZona,
                        Estado: data.Result.Tecnicos[i].Estado
                    });
                };

                cargarTablaMainTecnicos(detallePreventivo.tecnicosAsig);

                detallePreventivo.contadorObservaciones = data.Result.Observaciones.length;
                observaciones = data.Result.Observaciones;
                if (detallePreventivo.contadorObservaciones > 0) {
                    $tbodyObservaciones.empty();
                    for (var i = 0; i < data.Result.Observaciones.length; i++) {
                        var nuevoTr = "<tr id='row" + data.Result.Observaciones[i].Id + "'>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Nombre_Usuario + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Perfil_Usuario + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Fecha_Registro + "</th>" +
                            "<th style='text-align: center;'>" + data.Result.Observaciones[i].Observacion + "</th>" +
                            "<th style='text-align: center;'>" + " " + "</th>" + //Controlar la modificación de observaciones por el usuario que haya registrado dicha solicitud. 
                            "</tr>";
                        $tblObservaciones.append(nuevoTr);
                    }
                    $NoExisteRegObs.hide();
                }

                var docs = data.Result.Adjuntos.length;
                adjuntos = data.Result.Adjuntos;
                $contadordoc.val(docs);
                if (docs > 0) {
                    $tbodyDocAdjuntos.empty()
                    for (i = 0; i < data.Result.Adjuntos.length; i++) {
                        var html = '<div class="text-center">';
                        //var d = "'" + data.Result.Adjuntos[i].CodigoDocumento + "','" + data.Result.Adjuntos[i].RutaDocumento + "'";
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:detallePreventivo.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        if ($tipoAccion.val() == "U") {
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:detallePreventivo.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
                        };

                        html += '</div>';

                        var nuevoTr = "<tr id='row" + data.Result.Adjuntos[i].CodigoDocumento + "'>" +
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

                if ($estadoMant.val() == "PROG" && indPrest == 0 && indRepuesto == 0) {
                    $btnFinalizarMant.html('<i class="fa fa-check" aria-hidden="true"></i>&nbsp;Completar');
                };

            };
            var fnFailCallBack = function () {
                app.message.error("Validación", "Hubo un error en obtener el detalle del mant. preventivo.")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }

        

        if ($tipoAccion.val() == "V") {
            $btnAgregarObservacion.css('display', 'none');
            $btnAgregarDocumento.css('display', 'none');
            $txtNumOTM.prop('disabled', true);
        }

    };

    function formatoMiles(value) {
        let valor = value;
        // Contar cuántos puntos hay
        // Si hay un punto, limitar a dos decimales
        const partes = valor.split('.');

        // Formatear la parte entera con separadores de miles
        let partesEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let valorFormateado = partesEntera;

        // Agregar la parte decimal (con ceros si es necesario)
        if (partes[1]) {
            valorFormateado += '.' + partes[1];
        } else {
            valorFormateado += '.00'; // Si no hay parte decimal, agregar .00
        }

        // Asignar el valor formateado al input
        return valorFormateado;
    }

    function download(IdDocumento) {

        var documento = adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.redirectTo("BandejaPreventivo/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);
    }

    function eliminarDocumento(idDocumento) {
        if ($numPreventivo.val() != "") {
            var fnSi = function () {
                var method = "POST";
                var url = "BandejaPreventivo/EliminarAdjunto";
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
            return app.message.confirm("Mantenimiento Preventivo", "¿Está seguro(a) que desea eliminar el documento adjunto?", "Sí", "No", fnSi, null);
        };
    };



    function Cerrar() {
        $modalModificarContacto.modal('hide');
    };

    function BuscarContactosxCliente() {
        var method = "POST";
        var url = "BandejaPreventivo/ObtenerContactosxRuc";
        var objCliente = {
            RucCliente: $ruc.val(),
            NomCont: $txtContacto.val(),
            Establecimiento: $txtConsultaEstablecimiento.val()
        };

        var objParam = JSON.stringify(objCliente);

        var fnDoneCallBack = function (data) {
            cargarTablaContactosAux(data);
        };

        var fnFailCallBack = function () {
            cargarTablaContactosAux();
            app.message.error("Error", "Error al listar los contactos, por favor revisar");
        };


        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null)
    };


    function btnLimpiarClick() {
        $cmbTipDocContacto.val("");
        $txtNumContacto.val("");
        $txtNomContacto.val("");
        $txtContactoTelefono.val("");
        $txtContactoTelefono2.val("");
        $txtContactoCorreo.val("");
        $txtCargoContacto.val("");
        $txtEstablecimiento.val("");
        $txtAreaContacto.val("");
    }

    function ActualizarContacto() {
        var id = $txtidContacto.val();

        if (($txtNomContacto.val() === "") || !(isNaN($txtNomContacto.val())) || ($txtNomContacto.val().trim().length === 0)) {
            app.message.error("Validación", "Debe de agregar nombres.");
            return
        };

        if ($txtEstablecimiento.val().trim() === "" || $txtEstablecimiento.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el establecimiento.");
            return
        }

        if ($txtAreaContacto.val().trim() === "" || $txtAreaContacto.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el area de contacto.");
            return
        }

        var telefonoContacto = $txtContactoTelefono.val().trim();

        telefonoContacto = telefonoContacto.replace(/\s+/g, ' ');

        if (isNaN(telefonoContacto.trim()) || (telefonoContacto.length === 0 && telefonoContacto != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        var telefonoContacto2 = $txtContactoTelefono2.val().trim();

        telefonoContacto2 = telefonoContacto2.replace(/\s+/g, ' ');

        if (isNaN(telefonoContacto2.trim()) || (telefonoContacto2.length === 0 && telefonoContacto2 != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if ($txtContactoTelefono.val() == "" && $txtContactoTelefono2.val() == "") {
            app.message.error("Validación", "Debe de ingresar por lo menos un número de teléfono.");
            return
        }

        if ($txtContactoCorreo.val() === "" || !app.validarEmail($txtContactoCorreo.val())) {
            app.message.error("Validación", "El correo no ha sido ingresado o el formato no es válido.");
            return
        };

        if ($txtCargoContacto.val().trim() === "" || $txtCargoContacto.val().trim().length === 0) {
            app.message.error("Validación", "No ha ingresado un cargo");
            return
        };

        if ($cmbEstadoContacto.val().trim() === "") {
            app.message.error("Validación", "Debe de escoger un estado.");
            return
        };

        var fnSi = function () {


            var estado;
            if ($cmbEstadoContacto.val() == "1") {
                estado = true;
            }
            else {
                estado = false;
            }

            var method = "POST";
            var url = "BandejaPreventivo/ActualizarContacto";
            var objContacto = {
                Id_Asig: id,
                Id_Mant: $idMantPadre.val(),
                TipDoc: $cmbTipDocContacto.val(),
                NumDoc: $txtNumContacto.val(),
                NomCont: $txtNomContacto.val(),
                Establecimiento: $txtEstablecimiento.val(),
                AreaContacto: $txtAreaContacto.val(),
                Telefono: $txtContactoTelefono.val(),
                RucCliente: $ruc.val(),
                Cargo: $txtCargoContacto.val(),
                Correo: $txtContactoCorreo.val(),
                CodEstado: estado
            };

            var objParam = JSON.stringify(objContacto);

            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo == 0) {
                    app.message.error("Error", "Error al actualizar el contacto, por favor revisar");
                }
                else if (data.Result.Codigo == -1) {
                    app.message.error("Error", "El numero de documento ya ha sido registrado");
                }
                else {
                    app.message.success("Éxito", "Se realizó la actualización correctamente");
                    BuscarContactos();
                    $modalModificarContacto.modal('toggle');
                }
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se presentó un error al actualizar el contacto, por favor revisar");
                return;
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
        return app.message.confirm("Confirmación", "Desea actualizar los datos del contacto", "Sí", "No", fnSi);
    };

    function btnAñadirClick() {
        btnLimpiarClick();
        $btnAgregarContacto.css("display", "none");
        $btnAgregarNuevoContacto.css('display', 'in-line block');
        $cmbTipDocContacto.val(" ").trigger("change.select2");
        $cmbEstadoContacto.val("1").trigger("change.select2");
        $cmbEstadoContacto.prop("disabled", true);
        $tituloContacto.text("Registrar Contacto");
        $cmbTipDocContacto.on('change', function () {
            if ($cmbTipDocContacto.val() == ' ') {
                $txtNumContacto.prop("disabled", true);
                $txtNumContacto.val("");
            }
            else {
                $txtNumContacto.prop("disabled", false);
            }
        });
        $btnActualizarContacto.css("display", "none");
    }



    function validarTipoDoc() {
        const tipoDocContacto = $('select[id="cmbTipDocContacto"] option:selected').text();

        var rpta;

        if (tipoDocContacto == "DNI") {
            if ($txtNumContacto.val().length != 8 || isNaN($txtNumContacto.val())) {
                app.message.error("Validación", "El DNI debe ser un número de 8 dígitos.")
                rpta = false;
            }
            else {
                rpta = true;
            }
        }
        else if (tipoDocContacto == "Carnet Extranjería") {
            if ($txtNumContacto.val().length != 12) {
                app.message.error("Validación", "El Carnet de Extranjeria debe ser un número de 12 dígitos.")
                rpta = false;
            }
            else {
                rpta = true;
            }
        }
        else if (tipoDocContacto == "Pasaporte") {
            if ($txtNumContacto.val().length != 12) {
                app.message.error("Validación", "El Pasaporte debe ser un valor alfanumérico de 12 dígitos.")
                rpta = false;
            }
            else {
                rpta = true;
            }
        } else if (tipoDocContacto == "RUC") {
            if ($txtNumContacto.val().length != 11) {
                app.message.error("Validación", "El RUC debe ser un número de 11 dígitos.")
                rpta = false;
            }
            else {
                rpta = true;
            }
        }
        return rpta;
    }

    function RegistrarNuevoContacto() {
        var rpta = validarTipoDoc();

        if (!rpta && rpta != undefined) {
            return;
        };

        if (($txtNomContacto.val() === "") || !(isNaN($txtNomContacto.val())) || ($txtNomContacto.val().trim().length === 0)) {
            app.message.error("Validación", "Debe de agregar nombres.");
            return
        };

        if ($txtEstablecimiento.val().trim() === "" || $txtEstablecimiento.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el establecimiento.");
            return
        }

        if ($txtAreaContacto.val().trim() === "" || $txtAreaContacto.val().trim().length === 0) {
            app.message.error("Validación", "Debe de agregar el area de contacto.");
            return
        }

        var telefonoContacto = $txtContactoTelefono.val().trim();

        telefonoContacto = telefonoContacto.replace(/\s+/g, ' ');

        if (isNaN(telefonoContacto.trim()) || (telefonoContacto.length === 0 && telefonoContacto != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        var telefonoContacto2 = $txtContactoTelefono2.val().trim();

        telefonoContacto2 = telefonoContacto2.replace(/\s+/g, ' ');

        if (isNaN(telefonoContacto2.trim()) || (telefonoContacto2.length === 0 && telefonoContacto2 != "")) {
            app.message.error("Validación", "El teléfono no está en el formato correcto.");
            return
        };

        if ($txtContactoTelefono.val() == "" && $txtContactoTelefono2.val() == "") {
            app.message.error("Validación", "Debe de ingresar por lo menos un número de teléfono.");
            return
        }

        if ($txtContactoCorreo.val() === "" || !app.validarEmail($txtContactoCorreo.val())) {
            app.message.error("Validación", "El correo no ha sido ingresado o el formato no es válido.");
            return
        };

        if ($txtCargoContacto.val().trim() === "" || $txtCargoContacto.val().trim().length === 0) {
            app.message.error("Validación", "No ha ingresado un cargo");
            return
        };

        if ($cmbEstadoContacto.val().trim() === "") {
            app.message.error("Validación", "Debe de escoger un estado.");
            return
        };


        var fnSi = function () {
            var estado;
            if ($cmbEstadoContacto.val() == "1") {
                estado = true;
            }
            else {
                estado = false;
            }

            var method = "POST"
            var url = "BandejaPreventivo/InsertarContacto"
            var objContact = {
                Id_Asig: 0,
                Id_Mant: $idMantPadre.val(),
                TipDoc: $cmbTipDocContacto.val(),
                NumDoc: $txtNumContacto.val(),
                NomCont: $txtNomContacto.val(),
                Establecimiento: $txtEstablecimiento.val(),
                AreaContacto: $txtAreaContacto.val(),
                Telefono: $txtContactoTelefono.val(),
                RucCliente: $ruc.val(),
                Cargo: $txtCargoContacto.val(),
                Correo: $txtContactoCorreo.val(),
                CodEstado: estado
            };

            var objParam = JSON.stringify(objContact);

            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo == -1) {
                    app.message.error("Error", "El número de documento ingresado es duplicado, por favor revisar");
                }
                else if (data.Result.Codigo == 0) {
                    app.message.error("Error", "Error al registrar el contacto, por favor revisar");
                }
                else if (data.Result.Codigo == -2) {
                    app.message.error("Error", "Contacto ya ha sido asignado");
                }
                else {
                    app.message.success("Éxito", "Se realizó la inserción correctamente");
                    BuscarContactos();
                    $modalModificarContacto.modal('toggle');
                }
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se presentó un error al registrar el contacto, por favor revisar");
                return;
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Está seguro que desea guardar los datos del contacto?", "Sí", "No", fnSi);

    }

    function BuscarContactos() {
        var method = "POST";
        var url = "BandejaPreventivo/ObtenerContactos";
        var obj = {
            IdMant: $idMantPadre.val() == null ? "" : $idMantPadre.val()
        };
        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function (data) {
            cargarTablaContactos(data);
            contactos = data.Result;
        };

        var fnFailCallBack = function () {
            cargarTablaContactos()
            app.message.error("Validación", "Error al cargar los resultados");
            return;
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }


    function cargarTablaContactosAux(data) {
        $NoExisteContact.remove();
        var columns = [
            {
                data: "IdContacto",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "TipDoc",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'Sin definir' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "NumDoc",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "NomCont",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Establecimiento",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "AreaContacto",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Telefono",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Telefono2",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Cargo",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Correo",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Estado",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "IdContacto",
                render: function (data, type, row) {
                    var seleccionar = '<a id="btnSelectContact" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: detallePreventivo.seleccionarContacto(' + data + ')"><i class="fa fa-plus" aria-hidden="true"></i> Seleccionar</a>';
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

        app.llenarTabla($tblContactos, data, columns, columnDefs, "#tblContactos", null);
    }

    function cargarTablaContactos(data) {
        $NoExisteRegContact.remove();

        var columns = [
            {
                data: "Id_Asig",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "TipDoc",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }

            },
            {
                data: "NumDoc",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "NomCont",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Establecimiento",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "AreaContacto",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Telefono",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Cargo",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Correo",
                render: function (data, type, row) {
                    if (data == "") {
                        return '<center>' + 'No definido' + '</center>'
                    } else {
                        return '<center>' + data + '</center>'
                    }
                }
            },
            {
                data: "Id_Asig",
                render: function (data, type, row) {
                    if ($tipoAccion.val() == "V") {
                        return '<center> No disponible </center>';
                    }
                    else {
                        var editar = '<a id="btnEditarContacto" class="btn btn-default btn-xs" title="Editar" href="javascript:detallePreventivo.editarContacto(' + data + ')"><i class="fa fa-pencil"></i></a>'
                        var eliminar = '<a id="btnEliminarContacto" class="btn btn-default btn-xs" title="Eliminar" href="javascript:detallePreventivo.eliminarContacto(' + data + ')"><i class="fa fa-trash"></i></a>'
                        return '<center>' + eliminar + ' ' + editar + '</center>';
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

        app.llenarTabla($tblContactosMain, data, columns, columnsDefs, "#tblContactosMain", null);
    }

    function editarContacto(id) {

        var contactosFilter = contactos.filter(x => x.Id_Asig == id);
        var estado;


        if (contactosFilter[0].CodEstado == true) {
            estado = 1;
        }
        else {
            estado = 0;
        };

        if (contactosFilter[0].CodTipDocContacto == "" && contactosFilter[0].NumDoc == "") {
            $txtNumContacto.prop("disabled", true);
        } else {
            $txtNumContacto.prop("disabled", false);
        }

        $txtidContacto.val(id);
        $cmbTipDocContacto.val(contactosFilter[0].CodTipDocContacto == "" ? " " : contactosFilter[0].CodTipDocContacto).trigger("change.select2");
        $txtNumContacto.val(contactosFilter[0].NumDoc);
        $txtNomContacto.val(contactosFilter[0].NomCont);
        $txtEstablecimiento.val(contactosFilter[0].Establecimiento);
        $txtAreaContacto.val(contactosFilter[0].AreaContacto);
        $txtContactoTelefono.val(contactosFilter[0].Telefono);
        $txtContactoCorreo.val(contactosFilter[0].Correo);
        $txtCargoContacto.val(contactosFilter[0].Cargo);
        $cmbEstadoContacto.val(estado).trigger("change.select2");

        $btnActualizarContacto.css('display', 'in-line block');
        $btnAgregarNuevoContacto.css('display', 'none');

        $modalModificarContacto.modal('toggle');


        if (contactosFilter[0].CodTipDocContacto == " ") {
            $txtNumContacto.prop("disabled", true);
            $txtNumContacto.val("");
        };
        $cmbTipDocContacto.on('change', function () {
            if ($cmbTipDocContacto.val() == ' ') {
                $txtNumContacto.prop("disabled", true);
                $txtNumContacto.val("");
            }
            else {
                $txtNumContacto.prop("disabled", false);
            }
        });
    };
    function eliminarContacto(id) {
        var fnSi = function () {
            var method = "POST";
            var url = "BandejaPreventivo/EliminarContacto";
            var obj = {
                Id_Asig: id
            };

            var objParam = JSON.stringify(obj);

            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Se realízó la desvinculación con éxito");
                BuscarContactos();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se produjo un error al realizar la desvinculación");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
        return app.message.confirm("Confirmación", "¿Desea desvincular el contacto al requerimiento actual?", "Sí", "No", fnSi);
    };


    function seleccionarContacto(id) {
        var id_contacto = id;

        var fnSi = function () {
            var method = "POST";
            var url = "BandejaPreventivo/InsertarContacto";
            var obj = {
                IdContacto: id_contacto,
                Id_Mant: $idMantPadre.val(),
                CodEstado: true
            };
            var objParam = JSON.stringify(obj);

            var fnDoneCallBack = function (data) {
                if (data.Result.Codigo == -2) {
                    app.message.error("Error", "El contacto ya se encuentra seleccionado");
                    return;
                }
                else if (data.Result.Codigo == 0) {
                    app.message.error("Error", "Se produjo un error al asignar el contacto, por favor revisar");
                    return;
                }
                else {
                    app.message.success("Éxito", "Se realizó la asignación con éxito");
                    $modalContactos.modal('toggle');
                    BuscarContactos();
                }
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Error al realizar la asignación, por favor revisar");
            };
            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Está seguro que desea vincular el contacto a la instalación?", "Sí", "No", fnSi);

    }

    return {
        DesasignarTecnico: DesasignarTecnico,
        saveEmpresaTecnico: saveEmpresaTecnico,
        download: download,
        eliminarDocumento: eliminarDocumento,
        eliminarContacto: eliminarContacto,
        seleccionarContacto: seleccionarContacto,
        editarContacto: editarContacto
    };

})(window.jQuery, window, document);