var garantias = (function ($, win, doc) {
    $(Initializer);
    //+Ids Hidden - Importante
    var $nombreusuario = $('#nombreusuario');
    var $numReclamo = $('#numReclamo');
    var $estadoReq = $('#estadoReq');
    var $perfilnombre = $('#perfilnombre');
    var $hdnDocumentoCargadoId = $('#hdnDocumentoCargadoId');
    var $contadordoc = $('#contadordoc');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $openRegdateSolicitud = $('#openRegdateSolicitud');
    var $boxReclamo = $('#boxReclamo');
    var $hdnTipoEmpleado = $('#hdnTipoEmpleado'); 
    var $hdnCodUbigeo = $('#hdnCodUbigeo');
    var $navReclamo = $('#navReclamo');
    var $hdnCodEmpresa = $('#hdnCodEmpresa');
    var $spanEstadoSol = $('#spanEstadoSol');
    var $tipoproceso = $('#tipoproceso');
    var $txtCodUbicacion = $('#txtCodUbicacion');
    //Btns
    var $btnGuardarUbigeo = $('#btnGuardarUbigeo');
    var $searchSolVenta = $('#searchSolVenta');
    var $btnRegresar = $('#btnRegresar');
    var $btnRegistrarRec = $('#btnRegistrarRec');
    var $btnEditarRec = $('#btnEditarRec');
    var $limpiarReclamo = $('#limpiarReclamo');
    var $btnBuscarTecnicos = $('#btnBuscarTecnicos');
    var $btnBuscarTecnico = $('#btnBuscarTecnico');
    var $btnAñadirTecnico = $('#btnAñadirTecnico');
    var $btnFinalizarRec = $('#btnFinalizarRec');
   // var $btnDesasignarTecnico = $('#btnDesasignarTecnico');
    //TxT
    var $txtSolicitud = $('#txtSolicitud');
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');
    var $txtSerieVenta = $('#txtSerieVenta');
    var $dateSolicitud = $('#dateSolicitud');
    var $txtEmpresa = $('#txtEmpresa');
    var $cmbTipVenta = $('#cmbTipVenta');
    var $txtRuc = $('#txtRuc');
    var $txtNomEmpresa = $('#txtNomEmpresa');
    var $txtUbigeo = $('#txtUbigeo');
    var $txtAsesor = $('#txtAsesor');
    var $txtProceso = $('#txtProceso');
    var $txtTipProceso = $('#txtTipProceso');
    var $txtContrato = $('#txtContrato');
    var $txtOrdCompra = $('#txtOrdCompra');
    var $txtDescEquipo = $('#txtDescEquipo');
    var $txtMatcaEquipo = $('#txtMatcaEquipo');
    var $txtModeloEquipo = $('#txtModeloEquipo');
    var $txtMantPrevEquipo = $('#txtMantPrevEquipo');
    var $txtPrevRealiEquipo = $('#txtPrevRealiEquipo');
    var $txtPrevFaltEquipo = $('#txtPrevFaltEquipo');
    var $txtFechaInstall = $('#txtFechaInstall');
    var $txtFinGarantia = $('#txtFinGarantia');
    var $txtEstadoGarantia = $('#txtEstadoGarantia');
    var $titleNomProducto = $('#titleNomProducto');
    var $dateProgramacion = $('#dateProgramacion');
    var $openRegdateProgramacion = $('#openRegdateProgramacion');
    var $txtCodEquipo = $('#txtCodEquipo');
    var $txtDirecInstall = $('#txtDirecInstall');
    var $txtNumFianza = $('#txtNumFianza');
    var $colProceso = $('#colProceso');
    var $coltipProceso = $('#coltipProceso');
    var $colContrato = $('#colContrato');
    var $colOrdenCompra = $('#colOrdenCompra');
    var $rowDocsProc = $('#rowDocsProc');
    //Labels
    var $lblNombreArchivo = $('#lblNombreArchivo');

    //HiddenIds

    //var $hdnCodTipVenta = $('#hdnCodTipVenta');

    //Combos
    var $cmbTipDocTecnico = $('#cmbTipDocTecnico');
    var $cmbTipoCredencial = $('#cmbTipoCredencial');
    var $txtUbiDestino = $('#txtUbiDestino');
    var $cmbDocumentoCarga = $('#cmbDocumentoCarga');
    var $cmbDepartamento = $('#cmbDepartamento');
    var $cmbProvincia = $('#cmbProvincia');
    var $cmbDistrito = $('#cmbDistrito');

    /*Modales*/
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalObservacion = $('#modalObservacion');
    var $modalBusquedaTecnico = $('#modalBusquedaTecnico');
    var $modalZona = $('#modalZona');
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

    /*Modal Solicitud*/


    /*Modal Seguimiento*/
    var $tblSeguimiento = $('#tblSeguimiento');
    var $NoExisteRegSeg = $('#NoExisteRegSeg');


    /*Modal Tecnicos*/
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
    var $tblMainTecnicos = $('#tblMainTecnicos');
    var $btnRegistrarTecnicoExterno = $('#btnRegistrarTecnicoExterno');
    var $NoExisteTec = $('#NoExisteTec');
    var $tbodyTecnicos = $('#tbodyTecnicos');
    var $searchZona = $('#searchZona');
    /*Sección Reclamo*/
    var $hdnIdReclamo = $('#hdnIdReclamo');
    var $cmbUrgencia = $('#cmbUrgencia');
    var $cmbMotivo = $('#cmbMotivo');
    var $txtReclamo = $('#txtReclamo');

    /*Sección Contactos*/
    var $txtNomContacto = $('#txtNomContacto');
    var $txtTelefContacto = $('#txtTelefContacto');
    var $txtEstablecimientoCont = $('#txtEstablecimientoCont');
    var $txtCargoContacto = $('#txtCargoContacto');

    /*Modal Buscar Tecnicos*/

    var mensajes = {
        guardandoObservacion: "Guardando la observación, por favor espere....",
        procesandoUbigeo: "Buscando ubigeo, por favor espere...."
    }


    let productos = [];
    let destinos_select = [];
    let observaciones = [];
    let adjuntos = [];
    let rptaFinal = 0;
    function Initializer() {
        $tipoDocAdjuntos.text("Archivos permitidos: .xls,.xlsx,.pdf,.doc,.docx,.zip,.rar");
        cargarTipoDoc();
        ObtenerFiltrosGarantias();
        garantias.contadorObservaciones = 0;    
        garantias.reclamo = [];
        garantias.tecnicosAsig = [];
        $searchSolVenta.click(BuscarDetalleSolicitud);
        $limpiarReclamo.click(LimpiarTodo);
        $btnRegresar.click(btnRegresarClick);
        $openRegdateSolicitud.click($openRegdateSolicitud_click);
        $openRegdateProgramacion.click($openRegdateProgramacion_click);
        $btnRegistrarRec.click(RegistrarReclamo);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnBuscarTecnicos.click(BuscarTecnicosClick);
        $btnBuscarTecnico.click(BuscarTecnicos);
        $searchZona.click(logicUbigeo);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        $btnRegistrarTecnicoExterno.click(CrearTecnico3ro_a_Producto);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnEditarRec.click(actualizarReclamo);
        $btnGuardarUbigeo.click(seleccionar);
        $btnFinalizarRec.click(FinalizarReclamo);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            endDate: '+1d',
            datesDisabled: '+1d',
        });

        $dateProgramacion.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy',
            startDate: hoy()
        });
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $dateSolicitud.val(hoy());
        $dateProgramacion.val(hoy());
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        CargarTipoDocumento(7); //Cambiar a tipo de proceso Instalación Técnica.
        IniciarBotonSeleccionarTecnico();

        setTimeout(function () {
            cargarDatos();
        }, 2000);
        
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

    function BuscarTecnicosClick() {
        $cmbTipDocTecnico.val("").trigger("change");
        $txtNumDocTec.val('');
        $cmbTipoEmpleado.val(0).trigger("change");
        $txtNombres.val('');
        $txtApePat.val('');
        $txtApeMat.val('');
        BuscarTecnicos();
    }

    /*Lógica Ubigeo*/
    function logicUbigeo() {
        $cmbProvincia.val('').trigger("change");
        $cmbDistrito.val('').trigger("change");
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
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoUbigeo)

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

    function actualizarReclamo() {

        if ($dateSolicitud.val() == "" || $dateSolicitud.val() == null || $dateSolicitud.val().trim().length == 0) {
            app.message.error("Validación", "Se debe de ingresar la fecha de reclamo.");
            return;
        };

        var fec1 = app.stringToDate($dateSolicitud.val());
        var fec2 = app.stringToDate($txtFechaInstall.val());

        if (fec1.getTime() <= fec2.getTime()) {
            app.message.error("Validación", "La fecha de reclamo no puede ser menor o igual a la fecha de instalación.");
            return;
        };

        if ($cmbUrgencia.val() == "" || $cmbUrgencia.val() == 0) {
            app.message.error("Validación", "Se debe de escoger un nivel de urgencia");
            return;
        };

        if ($cmbMotivo.val() == "" || $cmbMotivo.val() == 0) {
            app.message.error("Validación", "Se debe de escoger un motivo");
            return;
        };

        if ($txtReclamo.val() == "" || $txtReclamo.val() == null || $txtReclamo.val().trim().length == 0) {
            app.message.error("Validación", "El campo Reclamo, no puede estar vacío.")
            return;
        };

        if (garantias.tecnicosAsig.length == 0) {
            app.message.error("Validación", "Debe de asignar por lo menos un técnico al reclamo.");
            return;
        };

        var fechaHoy = hoy();

        if ($dateProgramacion.val() < fechaHoy) {
            app.message.error("Validación", "La fecha de programación no puede ser menor a la fecha de hoy");
            return;
        };

        if ($dateProgramacion.val() == "" || $dateProgramacion.val() == null || $dateProgramacion.val().trim().length == 0) {
            app.message.error("Validación", "Se debe de ingresar la fecha de programación.");
            return;
        };

        var method = "POST";
        var url = "BandejaGarantia/MantReclamo";

        var objReclamo = {
            TipoProceso: "U",
            Id_Reclamo: $numReclamo.val(),
            Id_WorkFlow: 0,
            Id_Solicitud: $txtSolicitud.val(),
            RucEmpresa: "",
            RazonSocial: "",
            Ubicacion: "",
            Motivo: $txtReclamo.val(),
            TipoMotivo: $cmbMotivo.val(),
            CodUrgencia: $cmbUrgencia.val(),
            FechaReclamo: $dateSolicitud.val(),
            FechaProgramacion: $dateProgramacion.val(),
            CodEstado: $estadoReq.val(),
        };

        var objParam = JSON.stringify(objReclamo);

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Se actualizaron los datos correctamente.");
                location.reload();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al realizar la inserción.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Desea realizar la actualización de los datos del reclamo?", "Sí", "No", fnSi, null);
    };


    function $openRegdateSolicitud_click() {
        $dateSolicitud.focus();
    };

    function $openRegdateProgramacion_click() {
        $dateProgramacion.focus();
    }

    function BuscarDetalleSolicitud() {

        var numSerie = $txtSerieVenta.val();

        if (numSerie == "" || numSerie == null || numSerie.trim().length == 0) {
            app.message.error("Validación", "El campo N° de Serie no puede estar vacío.");
            return;
        }


        var method = "POST";
        var url = "BandejaGarantia/ObtenerDatosEquipo";

        var objReclamo = {
            NumSerie: numSerie
        };

        var objParam = JSON.stringify(objReclamo);

        var fnDoneCallBack = function (data) {

            if (data.Result.CodRpta == 3) {
                cargarCabecera(data.Result.CabeceraSolicitud);
                cargarCuerpoEquipo(data.Result.Detalle);
                cargarInfoContactos(data.Result.Contacto);
            } else if (data.Result.CodRpta == 0) {
                app.message.error("Validación", "El número de serie no ha sido registrado en el sistema, por favor revisar.");
                return;
            } else if (data.Result.CodRpta == 2) {
                app.message.error("Validación", "El número de serie aún no cuenta con fecha de instalación, por favor revisar.");
                return;
            }
            else {
                app.message.error("Error", "Se obtuvo información incompleta.");
                return;
            }

            window.location.href = '#boxReclamo';
            $("#navReclamo").addClass("active in");
            $("#tabReclamo").addClass("active");
            $("#tabTecnicos").removeClass("active");
            $("#tabAdjuntos").removeClass("active");
            $("#tabContacto").removeClass("active");
            $("#navTecnicos").removeClass("active in");
            $("#navDocumentos").removeClass("active in");
            $("#navContactoDetalle").removeClass("active in");
            $cmbUrgencia.prop('disabled', false);
            $dateSolicitud.prop('disabled', false);
            $txtReclamo.prop('disabled', false);    
            $cmbMotivo.prop('disabled', false);
            $btnBuscarTecnicos.prop('disabled', false);
            $btnAñadirTecnico.prop('disabled', false);  
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Error al consultar el número de serie, por favor validar.");
            return;
        };
        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
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


    function BuscarTecnicos() {
        var method = "POST";
        var url = "BandejaGarantia/ObtenerTecnico"
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

    function limpiarAsignacionTecnicos() {
        $txtNombreTecnico.val("");
        $txtApellidoPaternoTec.val("");
        $txtApellidoMaternoTec.val("");
        $txtNumDocumento.val("");
        $txtTelefono.val("");
        $txtCorreo.val("");
        $txtZona.val("");
        $hdnIdTecnico.val("");
        $cmbProvincia.val("").trigger('change.select2');
        $cmbProvincia.val("").trigger('change.select2');
        $cmbDistrito.val("").trigger('change.select2');
    };

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

    function IniciarBotonSeleccionarTecnico() {
        $('#tblTecnicos tbody').on('click', 'td #btnSeleccionarTecnico', function () {

            //limpiarDetalleInfoAdcional()
            var tr = $(this).closest('tr');
            var row = $('#tblTecnicos').dataTable().api().row(tr);
            var info = row.data();

            var tecnico = garantias.tecnicosAsig.filter(tecnico => tecnico.Id == info.CodigoEmpleado);
            if (tecnico.length > 0) {
                app.message.error("Validación", "El técnico ya se encuentra asignado.");
                return;
            };
            
            garantias.tecnicosAsig.push({
                Cod_Tecnico: info.CodigoEmpleado,
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

            if ($numReclamo.val() != "") {
                crearTecnicos(info);
            };

            cargarTablaMainTecnicos(garantias.tecnicosAsig);
            $modalBusquedaTecnico.modal('toggle');
        });


    };

    function crearTecnicos(info) {
        var method = "POST";
        var url = "BandejaGarantia/MantTecnicosReclamo";

        var objTecnico = {
            TipoProceso: "I",
            Id_Asig: 0,
            Id_Reclamo: $numReclamo.val(),
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

        var fnDoneCallBack = function () {
            app.message.success("Éxito", "Se realizó la inserción correctamente.");
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Ocurrió un error al realizar la inserción del técnico, por favor revisar.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function LimpiarTodo() {
        var fnSi = function () {
            garantias.tecnicosAsig = [];
            observaciones = [];
            $txtSerieVenta.val("");
            $txtSerieVenta.prop('disabled', false);
            limpiarCabecera();
            limpiarCuerpoEquipo();
            limpiarReclamo();
            limpiarAsignacionTecnicos();
            limpiarInfoContacto();
            $btnBuscarTecnicos.prop('disabled', true);
            $btnAñadirTecnico.prop('disabled', true);
            $dateProgramacion.prop('disabled', true);
            $tbodyObservaciones.empty();
            $tbodyTecnicos.empty();
            $NoExisteTec.show();
            $NoExisteRegObs.show();
        }
        return app.message.confirm("Confirmación", "¿Desea limpiar los campos del formulario? Se eliminará la información registrada.", "Sí", "No", fnSi, null);
    };

    function ObtenerFiltrosGarantias() {
        method = "POST";
        url = "BandejaGarantia/ObtenerFiltrosGarantias"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Seleccionar --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbTipVenta, data.Result.TipVenta, null, 0, "--Seleccionar--", filters);
            app.llenarComboMultiResult($cmbMotivo, data.Result.Motivos, null, 0, "--Seleccionar--", filters);
            app.llenarComboMultiResult($cmbUrgencia, data.Result.Urgencia, null, 0, "--Seleccionar--", filters);
            app.llenarComboMultiResult($cmbTipoEmpleado, data.Result.TipoEmpleado, null, 0, "--Seleccionar--", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion", "Ocurrió un problema al cargar los filtros de la bandeja. ")
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null)
    }; //OKA

    function llenarInfoReclamo(reclamo) {
        //$dateSolicitud.prop('disabled', true);
        //$txtReclamo.prop('disabled', true);


        $dateSolicitud.val(app.obtenerFecha(reclamo.FechaReclamo));
        $txtReclamo.val(reclamo.Motivo);
        $cmbMotivo.val(reclamo.TipoMotivo).trigger('change.select2');
        $cmbUrgencia.val(reclamo.Urgencia).trigger('change.select2');
    };

    function cargarCabecera(requerimiento) {

        $txtSerieVenta.prop('disabled', true);
        //$cmbDestino.prop('disabled', false);
        if ($estadoReq.val() != "FIN") {
            $dateSolicitud.prop('disabled', false);
            $dateProgramacion.prop('disabled', false);
        }
        
        limpiarCabecera();

        if (requerimiento.NroProceso != "" && requerimiento.NroProceso != null) {
            $rowDocsProc.css('display', 'block');
            $colProceso.css('display', 'block');
            $txtProceso.val(requerimiento.NroProceso);
        };

        if (requerimiento.TipoProceso != "" && requerimiento.TipoProceso != null) {
            $rowDocsProc.css('display', 'block');
            $coltipProceso.css('display', 'block');
            $txtTipProceso.val(requerimiento.TipoProceso);
        }

        if (requerimiento.Contrato != "" && requerimiento.Contrato != null) {
            $rowDocsProc.css('display', 'block');
            $colContrato.css('display', 'block');
            $txtContrato.val(requerimiento.Contrato);
        };

        if (requerimiento.OrdenCompra != "" && requerimiento.OrdenCompra != null) {
            $rowDocsProc.css('display', 'block');
            $colOrdenCompra.css('display', 'block');
            $txtOrdCompra.val(requerimiento.OrdenCompra);
        };

        $txtEmpresa.val(requerimiento.Nom_Empresa);

        var numSolFormateado = ("000000" + requerimiento.Id_Solicitud.toString());

        numSolFormateado = numSolFormateado.substring((numSolFormateado.length) - 6, numSolFormateado.length);

        $txtSolicitud.val(numSolFormateado);
        $hdnCodEmpresa.val(requerimiento.Cod_Empresa);
        $cmbTipVenta.val(requerimiento.TipoVenta).trigger('change.select2');
        $txtRuc.val(requerimiento.RUC);
        $txtNomEmpresa.val(requerimiento.RazonSocial);
        //$hdnCodUbigeo.val(requerimiento.Cod_Ubigeo);
        $txtUbigeo.val(requerimiento.Ubigeo);
        $txtAsesor.val(requerimiento.AsesorVenta);

        if ($numReclamo.val() != "") {
            $txtSerieVenta.val(requerimiento.Serie);
            $spanEstadoSol.text(requerimiento.Estado);
        };
    };

    function limpiarCabecera() {
        $txtSolicitud.val("");
        $txtEmpresa.val("");
        $cmbTipVenta.val("").trigger('change.select2');
        $txtRuc.val("");
        $txtNomEmpresa.val("");
        $txtUbigeo.val("");
        $txtAsesor.val("");
        $txtUbiDestino.val("");
        $dateSolicitud.val(hoy());
        $txtProceso.val("");
        $txtTipProceso.val("");
        $txtOrdCompra.val("");
    };

    function cargarInfoContactos(contacto) {
        $txtNomContacto.val(contacto.NomCont);
        $txtTelefContacto.val(contacto.Telefono);
        $txtEstablecimientoCont.val(contacto.Establecimiento);
        $txtCargoContacto.val(contacto.Cargo);
    }

    function cargarCuerpoEquipo(detalle) {
        $txtCodEquipo.val(detalle.CodigoProducto);
        $txtDescEquipo.val(detalle.Descripcion);
        $txtMatcaEquipo.val(detalle.Desmarca);
        $txtModeloEquipo.val(detalle.Modelo);
        $txtMantPrevEquipo.val(detalle.MantPreventivo);
        $txtPrevRealiEquipo.val(detalle.preventReal);
        $txtPrevFaltEquipo.val(detalle.PreventPendiente);
        $txtFechaInstall.val(app.obtenerFecha(detalle.FechaInstalacion));
        //$txtFinGarantia.val(app.obtenerFecha(detalle.FechaVencimiento));
        $txtFinGarantia.val(detalle.FechaVencimiento);
        $txtEstadoGarantia.val(detalle.EstadoGarant);
        $txtDirecInstall.val(detalle.Direccion);
        $hdnCodUbigeo.val(detalle.CodUbicacionDestino);
        $txtUbiDestino.val(detalle.UbicacionDestino);
        $txtNumFianza.val(detalle.NumFianza);
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo: ' + detalle.Descripcion + '</p>');
    }

    function limpiarCuerpoEquipo() {
        $txtCodEquipo.val("");
        $txtDescEquipo.val("");
        $txtMatcaEquipo.val("");
        $txtModeloEquipo.val("");
        $txtMantPrevEquipo.val("");
        $txtPrevRealiEquipo.val("");
        $txtPrevFaltEquipo.val("");
        $txtFechaInstall.val("");
        $txtFinGarantia.val("");
        $txtEstadoGarantia.val("");
        $txtNumFianza.val("");
        $txtDirecInstall.val("");
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo</p>');
    }

    function limpiarReclamo() {
        $txtReclamo.val("");
        $cmbMotivo.val("").trigger('change.select2');
        $cmbUrgencia.val("").trigger('change.select2');
        $dateProgramacion.val(hoy());
        $cmbUrgencia.prop('disabled', true);
        $txtReclamo.prop('disabled', true);
        $dateSolicitud.prop('disabled', true);
        $cmbMotivo.prop('disabled', true);
    };
   
    function limpiarInfoContacto() {
        $txtNomContacto.val("");
        $txtTelefContacto.val("");
        $txtEstablecimientoCont.val("");
        $txtCargoContacto.val("");
    }

    function llenarComboMultiCheck(selector, data) {
        selector.select2({
            placeholder: "--Seleccionar Destinos--",
            allowClear: true,
            data: $.map(data.Result, function (obj, i) {
                if (obj.Id != null && obj.Text != null) {
                    return {
                        id: obj.Id,
                        text: obj.Text
                    };
                } else {
                    return null;
                }
            })
        });
        selector.on('change', function () {
            destinos_select = $(this).val();
        });
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
      app.redirectTo("BandejaGarantia");
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

    function GuardarObservacionReqClick() {
        if($txtObservacion.val().trim() == "" || $txtObservacion.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese la observación.");
            return;
        }

        if ($numReclamo.val() != "") {
            var method = "POST";
            var url = "BandejaGarantia/GuardarObservacion"
            var objObservacion = {
                TipoProceso: "I",
                Observacion: $txtObservacion.val(),
                Id_WorkFlow: $codigoWorkflow.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Estado_Instancia: $estadoReq.val()
            };

            var objParamObs = JSON.stringify(objObservacion);

            var fnSi = function () {
                var fnDoneCallBack = function (data) {

                    garantias.contadorObservaciones += 1;

                    observaciones.push(
                        {
                            TipoProceso: "I",
                            Observacion: $txtObservacion.val(),
                            Nombre_Usuario: $nombreusuario.val(),
                            Id_WorkFlow: $codigoWorkflow.val(),
                            Estado_Instancia: $estadoReq.val
                        }
                    );
                    var nuevoTr = "<tr id=row" + garantias.contadorObservaciones + ">" +
                        "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                        "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                        "<th style='text-align: center;'>" + hoy() + "</th>" +
                        "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                        "<th style='text-align: center;'>" +
                        //                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: garantias.eliminarObsTmp(" + garantias.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
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
            garantias.contadorObservaciones += 1;

            observaciones.push({
                Id: garantias.contadorObservaciones,
                TipoProceso: "I",
                Estado_Instancia: "REG",
                Observacion: $txtObservacion.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Perfil_Usuario: $perfilnombre.val()
            })
            var nuevoTr = "<tr id=row" + garantias.contadorObservaciones + ">" +
                "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                "<th style='text-align: center;'>" + hoy() + "</th>" +
                "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                "<th style='text-align: center;'>" +
                "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: garantias.eliminarObsTmp(" + garantias.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                "</th> " +
                "</tr>";
            $tblObservaciones.append(nuevoTr);
            $NoExisteRegObs.hide();
            $modalObservacion.modal('toggle');
        };
        $txtObservacion.val("");
    }

    function establecerVariablesSession() {
        var method = "POST";
        var url = "BandejaGarantia/SetVariablesGenerales";
        var objEditar = {
            Id_Reclamo: $numReclamo.val(),
            CodEstado: "FIN",
            TipoProceso: "V",
            Id_Workflow: $codigoWorkflow.val()
        };

        var objParam = JSON.stringify(objEditar);

        var fnDoneCallBack = function () {
            location.reload();
        };

        var fnFailCallBack = function (Message) {
            app.message.error("Validación", Message);
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };


    function saveEmpresaTecnico(CodTecnico) {
        var empresa = $('#txtNomEmpresa' + CodTecnico).val();

        if (empresa == "" || empresa.trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un nombre de empresa");
            return;
        };

        var method = "POST";
        var url = "BandejaGarantia/MantTecnicosReclamo";

        var objTecnico = {
            TipoProceso: "A",
            Id_Asig: CodTecnico,
            Id_Reclamo: $numReclamo.val(),
            Empresa: empresa,
            Estado: true
        };

        var objParam = JSON.stringify(objTecnico);


        var fnSi = function () {
            var fnDoneCallback = function () {
                app.message.success("Éxito", "Se grabó correctamente.");
                ObtenerTecnicosReclamo();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al modificar al técnico, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallBack, null, null);
        };

        return app.message.confirm("Confirmación", "¿Desea grabar?", "Sí", "No", fnSi, null);
    }
    function cargarTablaMainTecnicos(tecnicos) {
        
        var cant_tecnicos = tecnicos.length;
        if (cant_tecnicos == 0) {
            $btnBuscarTecnicos.show();
            $btnAñadirTecnico.show();
        }
        else {
            $btnBuscarTecnicos.hide();
            $btnAñadirTecnico.hide();
        }
        $NoExisteTec.hide();
        var data = {}
        data.Result = [];
        data.Result = tecnicos;

        var columns = [
            {
                data: "Cod_Tecnico",
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
                    }                }

            },
            {
                data: "Documento",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }                }

            },
            {
                data: "NombreCompleto",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }                }

            },
            {
                data: "Telefono",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }                }

            },
            {
                data: "Correo",
                render: function (data, type, row) {
                    if (data == "" || data == null) {
                        return '<center>No definido</center>';
                    } else {
                        return '<center>' + data + '</center>';
                    }                }

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
                            if ($tipoproceso.val() == "U") {
                                var html = '';
                                html += '<div class="form-group">' + '<div class="input-group input-group-sm date">'
                                    + '<input placeholder="--Empresa--" type="text" class="form-control input-sm" id="txtNomEmpresa' + row.Cod_Tecnico + '">';
                                html += '<a class="input-group-addon input-sm" id="saveEmpresaTecnico' + row.Cod_Tecnico + '" href="javascript:garantias.saveEmpresaTecnico(' + row.Cod_Tecnico + ')"" >' +
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
                data: "Cod_Tecnico",
                render: function (data, type, row) {
                    if ($tipoproceso.val() == "") {
                        var retirar = '<a id="btnDesasignarTecnicoTmp" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:garantias.DesasignarTecnicoTmp(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
                        return '<center>' + retirar + '</center>';
                    }
                    else if ($tipoproceso.val() == "U") {
                        var retirar = '<a id="btnDesasignarTecnico" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:garantias.DesasignarTecnico(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
                        return '<center>' + retirar + '</center>';
                    }
                    else if ($tipoproceso.val() == "V") {
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
    function eliminarObsTmp(idObs) {
        var fnSi = function () {
            observaciones = observaciones.filter(observacion => observacion.Id !== Number(idObs));
            $("#row" + idObs).remove();
            garantias.contadorObservaciones -= 1
            if (garantias.contadorObservaciones == 0) {
                $NoExisteRegObs.show();
            };
        };

        return app.message.confirm("Confirmación", "Está seguro(a) que desea eliminar esta observación?", "Si", "No", fnSi, null);

    };

    function eliminarDocumento(idDocumento) {
        if ($numReclamo.val() != "") {
            var fnSi = function () {
                var method = "POST";
                var url = "BandejaInstalacionTecnica/EliminarAdjunto";
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

    function download(IdDocumento) {

        var documento = adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.abrirVentana("BandejaGarantia/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);
    }
    function $adjuntarDocumento_click() {
        //$fileCargaDocumentoSustento.click();
        $fileCargaDocumentoSustento.val("");
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
        if (ext == "pdf"    || ext == "PDF"     ||
            ext == "xls"    || ext == "XLS"     ||
            ext == "xlsx"   || ext == "XLSX"    ||
            ext == "doc"    || ext == "DOC"     ||
            ext == "docx"   || ext == "DOCX"    ||
            ext == "zip"    || ext == "ZIP"     ||
            ext == "rar"    || ext == "RAR"
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

    function RegistrarReclamo() {

        if ($txtSerieVenta.val() == "" || $txtSerieVenta.val() == null || $txtSerieVenta.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un número de serie");
            return;
        };

        if ($txtDescEquipo.val() == "" || $txtDescEquipo.val() == null || $txtDescEquipo.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un número de serie, datos incompletos");
            return;
        };

        if ($txtMatcaEquipo.val() == "" || $txtMatcaEquipo.val() == null || $txtMatcaEquipo.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un número de serie, datos incompletos");
            return;
        };

        if ($dateSolicitud.val() == "" || $dateSolicitud.val() == null || $dateSolicitud.val().trim().length == 0) {
            app.message.error("Validación", "Se debe de ingresar la fecha de reclamo.");
            return;
        };

        var fec1 = app.stringToDate($dateSolicitud.val());
        var fec2 = app.stringToDate($txtFechaInstall.val());

        if (fec1.getTime() <= fec2.getTime())
        {
            app.message.error("Validación", "La fecha de reclamo no puede ser menor o igual a la fecha de instalación.");
            return;
        };


        if ($cmbUrgencia.val() == "" || $cmbUrgencia.val() == 0) {
            app.message.error("Validación", "Se debe de escoger un nivel de urgencia");
            return;
        };

        if ($cmbMotivo.val() == "" || $cmbMotivo.val() == 0) {
            app.message.error("Validación", "Se debe de escoger un motivo");
            return;
        };

        if ($txtReclamo.val() == "" || $txtReclamo.val() == null || $txtReclamo.val().trim().length == 0) {
            app.message.error("Validación","El campo Reclamo, no puede estar vacío.")
            return;
        };

        if (garantias.tecnicosAsig.length == 0) {
            app.message.error("Validación", "Debe de asignar por lo menos un técnico al reclamo.");
            return;
        };

        var fechaHoy = hoy();

        var fec1 = app.stringToDate($dateProgramacion.val());
        var fec2 = app.stringToDate($txtFechaInstall.val());

        if (fec1.getTime() <= fec2.getTime()) {
            app.message.error("Validación", "La fecha de programación no puede ser menor o igual a la fecha de instalación.");
            return;
        };



        if ($dateProgramacion.val() == "" || $dateProgramacion.val() == null || $dateProgramacion.val().trim().length == 0) {
            app.message.error("Validación", "Se debe de ingresar la fecha de programación.");
            return;
        };

        var method = "POST";
        var url = "BandejaGarantia/RegistroGarantiaMain";

        var objReclamo = {
            Reclamo : {
                TipoProceso: "I"
                , Id_Solicitud: $txtSolicitud.val()
                , RazonSocial: $txtNomEmpresa.val()
                , RucEmpresa: $txtRuc.val()
                , NombreContacto: $txtNomContacto.val()
                , TelefonoContacto: $txtTelefContacto.val()
                , CargoContacto: $txtCargoContacto.val()
                , Establecimiento: $txtEstablecimientoCont.val()
                , TipoVenta: $cmbTipVenta.val()
                , OrdenCompra: $txtOrdCompra.val()
                , NumProceso: $txtProceso.val()
                , TipoProcesoSol: $txtTipProceso.val()
                , Contrato: $txtContrato.val()
                , CodEmpresa: $hdnCodEmpresa.val()
                , Vendedor: $txtAsesor.val()
                , CodigoProducto: $txtCodEquipo.val()
                , Descripcion: $txtDescEquipo.val()
                , Marca: $txtMatcaEquipo.val()
                , Ubicacion: $txtUbigeo.val()
                , Modelo: $txtModeloEquipo.val()
                , Serie: $txtSerieVenta.val()
                , NumFianza: $txtNumFianza.val()
                , FechaInstalacion: $txtFechaInstall.val()
                , FechaProgramacion: $dateProgramacion.val()
                , FechaReclamo: $dateSolicitud.val()
                , CodUbigeo: $hdnCodUbigeo.val()
                , Direccion: $txtDirecInstall.val()
                ,CodUrgencia: $cmbUrgencia.val()
                ,TipoMotivo: $cmbMotivo.val()
                ,Motivo: $txtReclamo.val()
                ,CodEstado: "REG"
            },
            Tecnicos : garantias.tecnicosAsig,
            Observaciones: observaciones,
            Adjuntos :  adjuntos
        };

        var objParam = JSON.stringify(objReclamo);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                function redirect() {
                    app.redirectTo('BandejaGarantia');
                };

                app.message.success("Registro Reaizado", "Se realizó el registro correctamente.", "Aceptar", redirect);
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un error al realizar la inserción, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);

        };
        return app.message.confirm("Confirmación", "Está seguro que desea registrar el reclamo.", "Sí", "No", fnSi);
    };


    function CrearTecnico3ro_a_Producto() {
        //var idProducto = $hdnIdProduct.val();
        if ($txtNombreTecnico.val() == "" || $txtNombreTecnico.val() == null || $txtNombreTecnico.val().trim().length == 0) {
            app.message.error("Validación", "Debe de seleccionar un técnico o ingresar el nombre de uno nuevo.");
            return;
        };

        if ($txtNombreTecnico.val() == "" && $txtApellidoPaternoTec.val() == "" && $txtApellidoMaternoTec.val() == "") {
            app.message.error("Validación", "Debe de registrar por lo menos el nombre del técnico.");
            return;
        }

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
            if (data.Codigo > 0) {
                app.message.success("Éxito", "Se realizó la creación del técnico satisfactoriamente.");
                $añadirTecnico.modal('toggle');
            };
        };
        var fnFailCallback = function (data) {
            //app.message.error("Error", data.Result.Mensaje);
        };

        app.llamarAjax(method, url, objEmpleado, fnDoneCallback, fnFailCallback, null, null);
    };

    function DesasignarTecnicoTmp(codTecnico) {
        var fnSi = function () {
            garantias.tecnicosAsig = garantias.tecnicosAsig.filter(tecnico => tecnico.Cod_Tecnico != codTecnico);
            cargarTablaMainTecnicos(garantias.tecnicosAsig);
        };
        return app.message.confirm("Confirmación", "¿Desea desasignar al técnico de la atención", "Sí", "No", fnSi, null);
    };

    function ObtenerTecnicosReclamo() {
        var method = "POST";
        var url = "BandejaGarantia/ObtenerTecnicosReclamo";

        var objReq = {
            numReclamo: $numReclamo.val()
        };

        var objParam = JSON.stringify(objReq);


        var fnDoneCallBack = function (data) {

            garantias.tecnicosAsig = [];

            for (var i = 0; i < data.Result.length; i++) {
                garantias.tecnicosAsig.push({
                    Cod_Tecnico: data.Result[i].Id_Asig,
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
            cargarTablaMainTecnicos(garantias.tecnicosAsig);
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Ocurrió un error al traer el listado de técnicos, por favor revisar.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };

    function DesasignarTecnico(CodAsignacion) {
        var method = "POST";
        var url = "BandejaGarantia/MantTecnicosReclamo";

        var objTecnico = {
            TipoProceso: "U",
            Id_Asig: CodAsignacion,
            Id_Reclamo: $numReclamo.val(),
            Estado: false
        };

        var objParam = JSON.stringify(objTecnico);


        var fnSi = function () {
            var fnDoneCallback = function () {
                app.message.success("Éxito", "Se realizó la desasignación del técnico.");
                ObtenerTecnicosReclamo();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un problema al modificar al técnico, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallBack, null, null);
        };

        return app.message.confirm("Confirmación", "¿Desea desasignar al técnico de la atención?", "Sí", "No", fnSi, null);
    }

    function AgregarTecnicoExterno() {
        limpiarAsignacionTecnicos();
        $txtTipoTecnico.val("Externo");
        $hdnTipoEmpleado.val("E");
    };

    function HabilitarCampos() {
        if ($estadoReq.val() != "FIN") {
            $txtReclamo.prop('disabled', false);
            $cmbUrgencia.prop('disabled', false);
            $cmbMotivo.prop('disabled', false);

            $dateProgramacion.prop('disabled', false);
            $btnBuscarTecnicos.prop('disabled', false);
            $btnAñadirTecnico.prop('disabled', false);
            $dateSolicitud.prop('disabled', false);
        };
        //$btnDesasignarTecnico.prop('disabled', false);
    }

    function cargarDatos() {
        if ($numReclamo.val() != "") {
            $contadordoc.val("");

            var method = "POST";
            var url = "BandejaGarantia/ObtenerMainReclamo"
            objRq = {
                NumReclamo: $numReclamo.val(),
                IdWorkFlow: $codigoWorkflow.val()
            };
            var objParam = JSON.stringify(objRq);

            var fnDoneCallBack = function (data) {
                garantias.reclamo = data.Result.Reclamo;
                $searchSolVenta.css('display', 'none');

                var requerimiento = {
                    NroProceso: data.Result.Reclamo.NumProceso,
                    TipoProceso: data.Result.Reclamo.TipoProceso,
                    Contrato: data.Result.Reclamo.Contrato,
                    OrdenCompra: data.Result.Reclamo.OrdenCompra,
                    Nom_Empresa: data.Result.Reclamo.NomEmpresa,
                    Id_Solicitud: data.Result.Reclamo.Id_Solicitud,
                    Cod_Empresa: data.Result.Reclamo.CodEmpresa,
                    TipoVenta: data.Result.Reclamo.CodTipoVenta,
                    RUC: data.Result.Reclamo.RucEmpresa,
                    RazonSocial: data.Result.Reclamo.RazonSocial,
                    Serie: data.Result.Reclamo.Serie,
                    Ubigeo: data.Result.Reclamo.Ubicacion,
                    AsesorVenta: data.Result.Reclamo.Vendedor,
                    Estado: data.Result.Reclamo.Estado
                };

                var equipo = {
                    CodigoProducto: data.Result.Reclamo.CodigoProducto,
                    Descripcion: data.Result.Reclamo.Descripcion,
                    Desmarca: data.Result.Reclamo.Marca,
                    Modelo: data.Result.Reclamo.Modelo,
                    MantPreventivo: data.Result.Reclamo.CantPreventivo,
                    preventReal: data.Result.Reclamo.PreventRealizados,
                    PreventPendiente: data.Result.Reclamo.PreventPendientes,
                    FechaInstalacion: data.Result.Reclamo.FechaInstalacion,
                    FechaVencimiento: data.Result.Reclamo.FechaVencimiento,
                    EstadoGarant: data.Result.Reclamo.EstadoGarantia,
                    Direccion: data.Result.Reclamo.Direccion,
                    CodUbicacionDestino: data.Result.Reclamo.CodUbigeo,
                    UbicacionDestino: data.Result.Reclamo.Ubigeo,
                    NumFianza: data.Result.Reclamo.NumFianza
                };

                var contacto = {
                    NomCont: data.Result.Reclamo.NombreContacto,
                    Telefono: data.Result.Reclamo.TelefonoContacto,
                    Establecimiento: data.Result.Reclamo.Establecimiento,
                    Cargo: data.Result.Reclamo.CargoContacto
                };

                var reclamo = {
                    FechaReclamo: data.Result.Reclamo.FechaReclamo,
                    Motivo: data.Result.Reclamo.Motivo,
                    Urgencia: data.Result.Reclamo.Urgencia,
                    TipoMotivo: data.Result.Reclamo.TipoMotivo
                };

                HabilitarCampos();

                cargarCabecera(requerimiento);
                cargarCuerpoEquipo(equipo);
                cargarInfoContactos(contacto)
                llenarInfoReclamo(reclamo);
                $dateProgramacion.val(app.obtenerFecha(data.Result.Reclamo.FechaProgramacion));
                //$dateProgramacion.prop('disabled', true);

                for (var i = 0; i < data.Result.Tecnicos.length; i++) {
                    garantias.tecnicosAsig.push({
                        Cod_Tecnico: data.Result.Tecnicos[i].Id_Asig,
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

                cargarTablaMainTecnicos(garantias.tecnicosAsig);

                garantias.contadorObservaciones = data.Result.Observaciones.length;
                observaciones = data.Result.Observaciones;
                if (garantias.contadorObservaciones > 0) {
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
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:garantias.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        if ($tipoproceso.val() == "U") {
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:garantias.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
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
            };
            var fnFailCallBack = function () {
                app.message.error("Validación", "Hubo un error en obtener el detalle del reclamo.")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);

            if ($tipoproceso.val() == "V") {
                $btnAgregarDocumento.css('display', 'none');
                $btnAgregarObservacion.css('display', 'none');
            };
            if ($estadoReq.val() == "FIN") {
                $dateSolicitud.prop('disabled', true);
                $cmbUrgencia.prop('disabled', true);
                $cmbMotivo.prop('disabled', true);
                $txtReclamo.prop('disabled', true);
                $dateProgramacion.prop('disabled', true);
            };
        }
        else {
            $btnBuscarTecnicos.show();
            $btnAñadirTecnico.show();
        }

    };

    function FinalizarReclamo() {

        if ($txtSerieVenta.val() == "" || $txtSerieVenta.val() == null || $txtSerieVenta.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un número de serie");
            return;
        };

        if ($txtDescEquipo.val() == "" || $txtDescEquipo.val() == null || $txtDescEquipo.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un número de serie, datos incompletos");
            return;
        };

        if ($txtMatcaEquipo.val() == "" || $txtMatcaEquipo.val() == null || $txtMatcaEquipo.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un número de serie, datos incompletos");
            return;
        };

        if ($dateSolicitud.val() == "" || $dateSolicitud.val() == null || $dateSolicitud.val().trim().length == 0) {
            app.message.error("Validación", "Se debe de ingresar la fecha de reclamo.");
            return;
        };

        if (($dateSolicitud.val() <= $txtFechaInstall.val())) {
            app.message.error("Validación", "La fecha de reclamo no puede ser menor o igual a la fecha de instalación.");
            return;
        };


        if ($cmbUrgencia.val() == "" || $cmbUrgencia.val() == 0) {
            app.message.error("Validación", "Se debe de escoger un nivel de urgencia");
            return;
        };

        if ($cmbMotivo.val() == "" || $cmbMotivo.val() == 0) {
            app.message.error("Validación", "Se debe de escoger un motivo");
            return;
        };

        if ($txtReclamo.val() == "" || $txtReclamo.val() == null || $txtReclamo.val().trim().length == 0) {
            app.message.error("Validación", "El campo Reclamo, no puede estar vacío.")
            return;
        };

        if (garantias.tecnicosAsig.length == 0) {
            app.message.error("Validación", "Debe de asignar por lo menos un técnico al reclamo.");
            return;
        };


        if ($dateProgramacion.val() == "" || $dateProgramacion.val() == null || $dateProgramacion.val().trim().length == 0) {
            app.message.error("Validación", "Se debe de ingresar la fecha de programación.");
            return;
        };

        var validador = 1;

        for (var i = 0; i < adjuntos.length; i++) {
            if (adjuntos[i].CodigoTipoDocumento == "DG01") {
                validador = 0;
            };
        };

        if (validador == 1) {
            app.message.error("Validación", 'Debe de adjuntar el tipo de documento: "Constancia de Servicio Técnico", para continuar.');
            return;
        };

        var method = "POST";
        var url = "BandejaGarantia/FinalizarGarantia"

        var objReclamo = {
            TipoProceso: "F",
            Id_Reclamo: $numReclamo.val(),
            Id_Workflow: $codigoWorkflow.val(),
            CodEstado: "FIN",
            FechaReclamo: $dateSolicitud.val(),
            FechaProgramacion: $dateProgramacion.val(),
        };

        var objParam = JSON.stringify(objReclamo);

        var fnSi = function () {
            var fnDoneCallBack = function () {

                
                var fnSiExito = function () {

                    $tituloModalObservacion.html("Finalizar Reclamo.");
                    $grpAuditoriaObservacion.hide();
                    $modalObservacion.modal("show");
                    $lblUsuarioCreacionObservacion.text($nombreusuario.val());
                    $lblFechaCreacionObservacion.text(hoy());
                    rptaFinal = 1;
                };

                var fnNo = function () {
                    app.redirectTo('BandejaGarantia');
                };
                return app.message.confirm("Éxito", "Se finalizó el requerimiento satisfactoriamente \n ¿Desea agregar un comentario adicional?", "Sí", "No", fnSiExito, fnNo);

            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se presentó un error al cambiar de estado, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Está seguro(a) que desea finalizar el reclamo actual?", "Sí", "No", fnSi);

    };


    return {
        DesasignarTecnicoTmp: DesasignarTecnicoTmp,
        DesasignarTecnico: DesasignarTecnico,
        download: download,
        eliminarDocumento: eliminarDocumento,
        eliminarDocTemp: eliminarDocTemp,
        eliminarObsTmp: eliminarObsTmp,
        saveEmpresaTecnico: saveEmpresaTecnico
    }
})(window.jQuery, window, document);