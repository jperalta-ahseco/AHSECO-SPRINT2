var registroPreventivos = (function ($, win, doc) {
    $(Initializer);
    //+Ids Hidden - Importante
    var $nombreusuario = $('#nombreusuario');
    var $numMant = $('#numMant');
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
    var $titleCoti = $('#titleCoti');
    var $barraCompletado = $('#barraCompletado');
    var $barraPendientes = $('#barraPendientes');
    var $barraGarantia = $('#barraGarantia');
    var $indMigracion = $('#indMigracion');
    /*Txt*/
    var $diasTransc = $('#diasTransc');
    var $diasVig = $('#diasVig');
    var $fechaVencGar = $('#fechaVencGar');
    var $txtPeriodicidad = $('#txtPeriodicidad');
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
    var $txtMarcaEquipo = $('#txtMarcaEquipo');
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
    var $txtNumSerie = $('#txtNumSerie');
    var $detalleCliente = $('#detalleCliente');
    var $txtNumProceso = $('#txtNumProceso');
    var $txtTipoProceso = $('#txtTipoProceso');
    var $txtOrden = $('#txtOrden');
    var $txtNumFianzaPP = $('#txtNumFianzaPP');
    var $txtNumFianzaPA = $('#txtNumFianzaPA');
    var $openRegdateMant = $('#openRegdateMant');
    var $dateVencGarantia = $('#dateVencGarantia');
    var $openRegdateVencGarantia = $('#openRegdateVencGarantia');
    var $numGarantiaAnual = $('#numGarantiaAnual');
    var $numGarantiaMensual = $('#numGarantiaMensual');
    var $cmbGarantia = $('#cmbGarantia');
    var $txtObservacion = $('#txtObservacion');
    var $row_txtArea = $('#row_txtArea');

    //Btns
    var $searchSolVenta = $('#searchSolVenta');
    var $btnRegresar = $('#btnRegresar');
    var $btnRegistrarRec = $('#btnRegistrarRec');
    var $btnEditarRec = $('#btnEditarRec');
    var $limpiarReclamo = $('#limpiarReclamo');
    var $btnBuscarTecnicos = $('#btnBuscarTecnicos');
    var $btnBuscarTecnico = $('#btnBuscarTecnico');
    var $btnAñadirTecnico = $('#btnAñadirTecnico');
    var $btnFinalizarRec = $('#btnFinalizarRec');
    var $btnGuardarPrev = $('#btnGuardarPrev');
    var $btnGenCronograma = $('#btnGenCronograma');
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
    var $cmbPeriodo = $('#cmbPeriodo');


    /*Modales*/
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalObservacion = $('#modalObservacion');
    var $modalBusquedaTecnico = $('#modalBusquedaTecnico');

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

    /*Sección Reclamo*/
    var $hdnIdReclamo = $('#hdnIdReclamo');
    var $cmbUrgencia = $('#cmbUrgencia');
    var $cmbMotivo = $('#cmbMotivo');
    var $txtReclamo = $('#txtReclamo');

    /*Sección tabla de mantenimientos*/
    var $NoExisteMant = $('#NoExisteMant');
    var $tbodyMantenimientos = $('#tbodyMantenimientos');
    var $tblMantenimientos = $('#tblMantenimientos');
    var $MantTotales = $('#MantTotales');
    var $MantCompletados = $('#MantCompletados');
    var $MantPendientes = $('#MantPendientes');


    /*Modal Buscar Tecnicos*/

    var mensajes = {
        guardandoObservacion: "Guardando la observación, por favor espere....",
        procesandoUbigeo: "Buscando ubigeo, por favor espere...."
    }

    let productos = [];
    let observaciones = [];
    let adjuntos = [];
    let rptaFinal = 0;
    function Initializer() {
        cargarTipoDoc();
        CargarTipoDocumento(6);
        if ($indMigracion.val() == "2") {
            ObtenerFiltrosPreventivos();
        };
        $btnRegresar.click(btnRegresarClick);
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnBuscarTecnicos.click(BuscarTecnicos);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        //$openRegdateMant.click($openRegdateMantClick);
        $openRegdateVencGarantia.click($openRegdateVencGarantiaClick);
        $btnGuardarPrev.click(GuardarMantPreventivo);
        $btnGenCronograma.click(GenerarCronograma);

        registroPreventivos.contadorObservaciones = 0;
        registroPreventivos.mantenimientos = [];
        registroPreventivos.tecnicosAsig = [];

        $dateVencGarantia.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        if ($indMigracion.val() == "1") {
            cargarDatos();
        };

        
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


    //function $openRegdateMantClick() {
    //    $txtFechaInstall.focus();
    //}
    function btnRegresarClick() {
        if ($indMigracion.val() == "1") {
            app.redirectTo("BandejaPreventivo");
        }
        else if ($indMigracion.val() == "2") {
            var fnSi = function () {
                app.redirectTo("BandejaPreventivo");
            };
            return app.message.confirm("Confirmación", "Al regresar perderá todos los cambios que no hayan sido guardados, ¿Desea retroceder?", "Sí", "No", fnSi);
        }
    }

    function $modalObservacionClick() {
        $tituloModalObservacion.html("Nueva observación");
        $grpAuditoriaObservacion.hide();
        $modalObservacion.modal("show");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
    };

    function GuardarMantPreventivo() {

        if ($txtRuc.val().length > 12) {
            app.message.error("Validación", "El número RUC debe ser igual a 12 dígitos");
            return;
        };

        if (isNaN($txtRuc.val()) && $txtRuc.val().length > 0) {
            app.message.error("Validación", "El número RUC debe de ser un número");
            return;
        };

        if ($txtRuc.val().trim().length > 0 && $txtRuc.val().length < 12) {
            app.message.error("Validación", "El número RUC debe ser igual a 12 dígitos");
            return; 
        };

        if (registroPreventivos.mantenimientos.length > 0 && $txtFechaInstall.val() == ""); {
            app.message.error("Validación", "La fecha de instalación, no debe quedar vacía");
            return;
        };

        var method = "POST";
        var url = "BandejaPreventivo/MantPrevMigrados";
        var obj = {
            TipoProceso: "U",
            CabeceraEquipo: {
                  Id_Mant: $numMant.val()
                , Serie: $txtNumSerie.val()
                , CodItem: $txtCodEquipo.val()
                , Descripcion: $txtDescEquipo.val()
                , DesMarca: $txtMarcaEquipo.val()
                , Modelo: $txtModeloEquipo.val()
                , FechaVencimientoGar: $dateVencGarantia.val()
                , Periodo: $cmbPeriodo.val()
                , TotalPrev: $MantTotales.val()
                , PrevCompletados: $MantCompletados.val()
                , PrevPendientes: $MantPendientes.val()
                , FechaInstalacion: $txtFechaInstall.val()
                , UbigeoDest: $txtUbiDestino.val()
                , Garantia: $cmbGarantia.val()
            },
            CabeceraCot: {
                Ruc: $txtRuc.val()
                , RazonSocial: $txtNomEmpresa.val()
                , NumProceso: $txtNumProceso.val()
            }
            
        };

        var objParam = JSON.stringify(obj);

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Datos guardados correctamente");
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se presentó un error al registrar los datos, por favor revisar");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Desea guardar los datos ingresados?", "Sí", "No", fnSi, null);
    };

    function GenerarCronograma() {
        if ($txtFechaInstall.val() == "" || $txtFechaInstall.val() == undefined) {
            app.message.error("Validación", "Es necesario registrar la fecha de instalación para poder generar el cronograma");
            return;
        };

        if ($txtNumSerie.val() == "" || $txtNumSerie.val() == undefined || $txtNumSerie.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario registrar el número de serie para generar el cronograma");
            return;
        };

        if ($cmbPeriodo.val() == "" || $cmbPeriodo.val() == "0" || $cmbPeriodo.val() == undefined) {
            app.message.error("Validación", "Es necesario registrar el campo 'Periodo' para poder generar el cronograma");
            return;
        };

        if ($MantTotales.val() == 0 || $MantTotales.val() == undefined || $MantTotales.val() < 0) {
            app.message.error("Validación", "El número de mantenimientos totales debe de ser mayor a 0");
            return;
        };

        if ($MantCompletados.val() > $MantTotales.val()) {
            app.message.error("Validación", "El número de mantenimientos completados debe ser menor que el número de preventivos totales")
            return;
        };

        var method = "POST";
        var url = "BandejaPreventivo/GenerarCronograma";
        var objMant = {
            Id_Mant: $numMant.val()
            , FechaInstalacion: $txtFechaInstall.val()
            , Serie: $txtNumSerie.val()
            , TotalPrev: $MantTotales.val()
            , PrevCompletados: $MantCompletados.val()
            , Periodo: $cmbPeriodo.val()
        };

        var objParam = JSON.stringify(objMant);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                var redirect = function () {
                    location.reload();
                };

                if (data.Result.Codigo == -1) {
                    app.message.error("Validación", "El número de serie ya ha sido registrado");
                    return;
                } else if (data.Result.Codigo == 0) {
                    app.message.error("Validación", "Ocurrió un error al generar el cronograma");
                }
                else {
                    app.message.success("Éxito", "Se realizó la generación del cronograma", "Aceptar", redirect);
                };
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se produción un error al generar el cronograma, por favor revisar");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null);
        };
        return app.message.confirm("Confirmación", "¿Desea generar el cronograma de mantenimientos preventivos?", "Sí", "No", fnSi, null);
    };

    function $openRegdateVencGarantiaClick() {
        $dateVencGarantia.focus();
    }
    function AgregarTecnicoExterno() {
        $txtTipoTecnico.val("Externo");
        $hdnTipoEmpleado.val("E");
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


    function ObtenerFiltrosPreventivos() {
        method = "POST";
        url = "BandejaPreventivo/ObtenerFiltrosPreventivos"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "--Seleccionar--";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbPeriodo, data.Result.Periodos, null, "0", "--Seleccionar--", filters);
            app.llenarComboMultiResult($cmbGarantia, data.Result.Garantias, null, "", "--Seleccionar--", filters);

            cargarDatos();
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion", "Ocurrió un problema al cargar los filtros de la bandeja. ")
        };

        return app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null)
    };



    function GuardarObservacionReqClick() {
        if ($txtObservacion.val().trim() == "" || $txtObservacion.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese la observación.");
            return;
        }

        if ($numReclamo.val() != "") {
            var method = "POST";
            var url = "BandejaPreventivo/GuardarObservacion"
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
                    app.message.success("Garantías", "Se realizó el registro de la observación correctamente.");

                    registroPreventivos.contadorObservaciones += 1;

                    observaciones.push(
                        {
                            TipoProceso: "I",
                            Observacion: $txtObservacion.val(),
                            Nombre_Usuario: $nombreusuario.val(),
                            Id_WorkFlow: $codigoWorkflow.val(),
                            Estado_Instancia: $estadoReq.val
                        }
                    );
                    var nuevoTr = "<tr id=row" + registroPreventivos.contadorObservaciones + ">" +
                        "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                        "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                        "<th style='text-align: center;'>" + hoy() + "</th>" +
                        "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                        "<th style='text-align: center;'>" +
                        //                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: registroPreventivos.eliminarObsTmp(" + registroPreventivos.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
                        "</th> " +
                        "</tr>";
                    $tblObservaciones.append(nuevoTr);
                    $NoExisteRegObs.hide();
                    $modalObservacion.modal('toggle');

                    var redirect = function () {
                        app.redirectTo('BandejaPreventivo');
                    };

                    return app.message.success("Éxito", "Se registró la observación satisfactoriamente", "Aceptar", redirect);
                };

                var fnFailCallBack = function () {
                    app.message.error("Validación", "Ocurrió un error al registrar la observación.");
                };
                app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoObservacion);
            };
            return app.message.confirm("Confirmación", "¿Desea registrar la observación?", "Sí", "No", fnSi, null);
        }
        else {
            registroPreventivos.contadorObservaciones += 1;

            observaciones.push({
                Id: registroPreventivos.contadorObservaciones,
                TipoProceso: "I",
                Estado_Instancia: "REG",
                Observacion: $txtObservacion.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Perfil_Usuario: $perfilnombre.val()
            })
            var nuevoTr = "<tr id=row" + registroPreventivos.contadorObservaciones + ">" +
                "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                "<th style='text-align: center;'>" + hoy() + "</th>" +
                "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                "<th style='text-align: center;'>" +
                "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: registroPreventivos.eliminarObsTmp(" + registroPreventivos.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                "</th> " +
                "</tr>";
            $tblObservaciones.append(nuevoTr);
            $NoExisteRegObs.hide();
            $modalObservacion.modal('toggle');
        };
        $txtObservacion.val("");
    }

    function hoy() {
        var date = new Date();
        var dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mesActual = (date.getMonth() + 1);
        var mes = mesActual < 10 ? '0' + mesActual : mesActual;
        var year = date.getFullYear();
        return `${dia}/${mes}/${year}`;
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
        filters.dataTableInfo = true;
        filters.dataTablePageLength = 5;
        filters.dataTablePaging = true;

        app.llenarTabla($tblTecnicos, data, columns, columnDefs, "#tblTecnicos", null, null, filters);
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
    };
    function cargarCuerpoEquipo(detalle) {
        $txtCodEquipo.val(detalle.CodItem);
        $txtDescEquipo.val(detalle.Descripcion);
        $txtMarcaEquipo.val(detalle.DesMarca);
        $txtModeloEquipo.val(detalle.Modelo);
        $txtMantPrevEquipo.val(detalle.TotalPrev);
        $txtPrevRealiEquipo.val(detalle.PrevCompletados);
        $txtPrevFaltEquipo.val(detalle.PrevPendientes);
        $txtNumSerie.val(detalle.Serie);
        if ($indMigracion.val() == 2) {
            $txtFechaInstall.val(detalle.FechaInstalacionMig);
        }
        else {
            $txtFechaInstall.val(app.obtenerFecha(detalle.FechaInstalacion));
        }

        $txtFechaInstall.datepicker('destroy');

        $txtFechaInstall.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });

        if (detalle.FechaInstalacionMig != "") {
            $txtFechaInstall.on('focusout', function () {
                var defaultvalue = "";
                if ($indMigracion.val() == 2) {
                    defaultvalue = $txtFechaInstall.val(detalle.FechaInstalacionMig);
                }
                else {
                    defaultvalue = $txtFechaInstall.val(app.obtenerFecha(detalle.FechaInstalacion));
                }

                if ($txtFechaInstall.val() == null || $txtFechaInstall.val() == "") {
                    $txtFechaInstall.val(defaultvalue);
                };
            });

        };
        
        //$txtFinGarantia.val(app.obtenerFecha(detalle.FechaVencimiento));
        $txtFinGarantia.val(detalle.FechaVencimiento);
        $txtEstadoGarantia.val(detalle.EstadoGarant);
        $txtDirecInstall.val(detalle.Direccion);
        $hdnCodUbigeo.val(detalle.CodUbicacionDestino);
        $txtUbiDestino.val(detalle.UbigeoDest);
        $txtNumFianza.val(detalle.NumFianza);
        $txtNumFianzaPP.val(detalle.FianzaPP);
        $txtNumFianzaPA.val(detalle.FianzaPA);
        $txtPeriodicidad.text('Periodicidad: ' + detalle.Periodo)
        if ($indMigracion.val() == "2") {
            $cmbPeriodo.val(detalle.Periodo).trigger("change.select2");

            if (detalle.Periodo != "") {
                $cmbPeriodo.prop('disabled', true);
            };

            $dateVencGarantia.val(detalle.FechaVencimientoGarMig);

            $cmbGarantia.val(detalle.Garantia).trigger("change.select2");

            $txtFechaInstall.on('change', ajustarFechaVencGaran);
            $cmbGarantia.on('change', ajustarFechaVencGaran);
        };

        $fechaVencGar.text(detalle.FechaVencimientoGar);
        $diasTransc.text(detalle.DiasTranscurridos);
        $diasVig.text(detalle.DiasDiff);
        if (detalle.Observacion != "") {
            $txtObservacion.val(detalle.Observacion);
            $row_txtArea.css("display", "block");
        };
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo: ' + detalle.Descripcion +'</p>');
    };

    function ajustarFechaVencGaran() {
        var periodo = $("#cmbGarantia option:selected").text();
        var numMeses = periodo.substring(0, periodo.indexOf(" ", 0));

        const partes = $txtFechaInstall.val().split('/');  // Separar la fecha por '/'
        // Cambiar el formato a yyyy-mm-dd
        var fecha = `${partes[2]}/${partes[1]}/${partes[0]}`;

        var fechaParseada = new Date(fecha);

        var meses = fechaParseada.getMonth() + 1;
        var años = fechaParseada.getFullYear();
        var dias = partes[0];

        var fechaVenGar;

        if (numMeses > 12) {
            if (numMeses % 12 == 0) {
                años += Math.floor(numMeses / 12)
            } else {
                años += Math.floor(numMeses / 12)
                meses += (numMeses % 12)
            }
        } else {
            meses += numMeses;
        };

        if (meses > 12) {
            años += Math.floor(meses / 12);
            meses = meses % 12;
        };

        fechaVenGar = dias + '/' + (meses < 10 ? "0" + meses : meses) + '/' + años

        $dateVencGarantia.val(fechaVenGar);
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
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo</p>');
    }
    function cargarCabecera(requerimiento) {
        limpiarCabecera();
        $txtNumProceso.val(requerimiento.NumProceso);
        $txtTipoProceso.val(requerimiento.TipoProceso);
        $txtOrden.val(requerimiento.OrdenCompra);
        $txtRuc.val(requerimiento.Ruc);
        $txtNomEmpresa.val(requerimiento.RazonSocial);
        $txtAsesor.val(requerimiento.AsesorV);
        $titleCoti.html("<i class='fa fa-user' aria-hidden='true' style='color:yellow'></i> Cliente: " + requerimiento.RazonSocial);
    };
    function limpiarCabecera() {
        $txtNumProceso.val("");
        $txtTipoProceso.val("");
        $txtOrden.val("");
    };
    function cargarTablaMainTecnicos(tecnicos) {

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
                            var empresa = '<input placeholder="--Empresa--" type="text" class="form-control input-sm" id="txtNomEmpresa' + row.Id + '">'
                            return '<center>' + empresa + '</center>';
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
                        var retirar = '<a id="btnDesasignarTecnicoTmp" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:registroPreventivos.DesasignarTecnicoTmp(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
                        return '<center>' + retirar + '</center>';
                    }
                    else if ($tipoproceso.val() == "U") {
                        var retirar = '<a id="btnDesasignarTecnico" class="btn btn-danger btn-xs" title="Desasignar Tecnico" href="javascript:registroPreventivos.DesasignarTecnico(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
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
    function cargarTablaMantenimientos(mantenimientos) {
        $NoExisteMant.remove();
        var data = {}
        data.Result = [];
        data.Result = mantenimientos;

        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    var numReqFormateado = ("000000" + data.toString());
                    numReqFormateado = numReqFormateado.substring((numReqFormateado.length) - 6, numReqFormateado.length);

                    return '<center>' + numReqFormateado + '</center>';
                }
            },
            {
                data: "FechaMantenimiento",
                render: function (data, type, row) {
                    return '<center>' + app.obtenerFecha(data) + '</center>';
                }
            },
            {
                data: "Estado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {
                    var d = "'" + row.Id + "','" + row.CodEstado + "','" + row.Id_WorkFlow + "'";
                    var detalle = "";
                    if (row.CodEstado == "COM" || $tipoproceso.val() == "V") {
                        detalle = '<a id="btnVer" class="btn btn-info btn-xs" title="Ver" href="javascript: registroPreventivos.ver(' + d + ')"><i class="fa fa-eye" aria-hidden="true"></i></a>';
                    }
                    else
                    {
                        detalle = '<a id="btnDetalleMant" class="btn btn-default btn-xs" href="javascript: registroPreventivos.editar(' + d + ')" title="Detalle"><i class="fa fa-pencil" aria-hidden="true"></i></a>';
                    }
                    return '<center>' + detalle + '</center>';
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];
        app.llenarTabla($tblMantenimientos, data, columns, columnDefs, "#tblMantenimientos");
    }
    function logicaBarraGarantia(diasDif, diasTrans) {
        var total = diasTrans + diasDif;
        $barraGarantia.text(diasDif + ' Días');

        var porcentaje = (diasDif / total) * 100;

        if (diasDif < 100) {
            $barraGarantia.css('background-color', 'yellow');
        };

        if (diasDif < 10) {
            $barraGarantia.css('background-color', 'red');
        };

        $barraGarantia.css('width', porcentaje.toFixed(2) + '%');

    };
    function logicaBarras(total, realizados, pendientes) {


        var completado = (realizados / total) * 100
        var pendiente = (pendientes / total) * 100

        $barraCompletado.css('width', completado.toFixed(2) +'%');
        $barraPendientes.css('width', pendiente.toFixed(2) + '%');
        $barraCompletado.text(completado.toFixed(0) + '%');

        if ($indMigracion.val() == "1") {
            $MantTotales.text(total.toString());
            $MantCompletados.text(realizados.toString());
            $MantPendientes.text(pendientes.toString());
        }
        else {
            $MantTotales.val(total.toString());
            $MantCompletados.val(realizados.toString());
            $MantPendientes.val(pendientes.toString());
            if (realizados > 0) {
                $MantTotales.prop('disabled', true);
            };

            if (total > 0) {
                $MantCompletados.prop('disabled', true);
            };
        }
    };
    function cargarDatos() {
        if ($numMant.val() != "") {

            var method = "POST";
            var url = "BandejaPreventivo/ObtenerMainMant"
            objRq = {
                NumMant: $numMant.val()
            };
            var objParam = JSON.stringify(objRq);

            var fnDoneCallBack = function (data) {
                var cabecera = {
                    RazonSocial: data.Result.CabeceraCot.RazonSocial,
                    NumProceso: data.Result.CabeceraCot.NumProceso,
                    TipoProceso: data.Result.CabeceraCot.TipoProceso,
                    OrdenCompra: data.Result.CabeceraCot.OrdenCompra,
                    Ruc: data.Result.CabeceraCot.Ruc,
                    AsesorV: data.Result.CabeceraCot.AsesorV
                };

                var equipo = {
                    Serie: data.Result.CabeceraEquipo.Serie,
                    CodItem: data.Result.CabeceraEquipo.CodItem,
                    Descripcion: data.Result.CabeceraEquipo.Descripcion,
                    DesMarca: data.Result.CabeceraEquipo.DesMarca,
                    Modelo: data.Result.CabeceraEquipo.Modelo,
                    TotalPrev: data.Result.CabeceraEquipo.TotalPrev,
                    PrevCompletados: data.Result.CabeceraEquipo.PrevCompletados,
                    PrevPendientes: data.Result.CabeceraEquipo.PrevPendientes,
                    FechaInstalacion: data.Result.CabeceraEquipo.FechaInstalacion,
                    FechaInstalacionMig: data.Result.CabeceraEquipo.FechaInstalacionMig,
                    FechaVencimiento: data.Result.CabeceraEquipo.ProxFechaMant,
                    //EstadoGarant: data.Result.CabeceraEquipo.EstadoGarantia,
                    Direccion: data.Result.CabeceraEquipo.Direccion,
                    CodUbicacionDestino: data.Result.CabeceraEquipo.CodUbigeo,
                    UbigeoDest: data.Result.CabeceraEquipo.UbigeoDest,
                    NumFianza: data.Result.CabeceraEquipo.NumFianza,
                    FianzaPP : data.Result.CabeceraEquipo.FianzaPP,
                    FianzaPA : data.Result.CabeceraEquipo.FianzaPA,
                    FechaVencimientoGarMig: data.Result.CabeceraEquipo.FechaVencimientoGarMig,
                    FechaVencimientoGar: data.Result.CabeceraEquipo.FechaVencimientoGar == null ? "" : app.obtenerFecha(data.Result.CabeceraEquipo.FechaVencimientoGar),
                    Periodo: data.Result.CabeceraEquipo.Periodo,
                    GarantiaAdic: data.Result.CabeceraEquipo.GarantiaAdic,
                    Garantia: data.Result.CabeceraEquipo.Garantia,
                    DiasDiff: data.Result.CabeceraEquipo.DiasDiff,
                    DiasTranscurridos: data.Result.CabeceraEquipo.DiasTranscurridos,
                    Observacion: data.Result.CabeceraEquipo.Observacion
                };

                if ($indMigracion.val() == "2") {
                    equipo.Garantia_Anual = data.Result.CabeceraEquipo.Garantia_Anual;
                    equipo.Garantia_Mensual = data.Result.CabeceraEquipo.Garantia_Mensual;
                };


                cargarCabecera(cabecera);
                cargarCuerpoEquipo(equipo);
                logicaBarraGarantia(equipo.DiasDiff, equipo.DiasTranscurridos);
                logicaBarras(equipo.TotalPrev, equipo.PrevCompletados, equipo.PrevPendientes)
                for (var i = 0; i < data.Result.MantenimientosPreventivos.length; i++) {
                    registroPreventivos.mantenimientos.push({
                        Id: data.Result.MantenimientosPreventivos[i].Id,
                        FechaMantenimiento: data.Result.MantenimientosPreventivos[i].FechaMantenimiento, 
                        Estado: data.Result.MantenimientosPreventivos[i].Estado,
                        CodEstado: data.Result.MantenimientosPreventivos[i].CodEstado,
                        Id_WorkFlow: data.Result.MantenimientosPreventivos[i].Id_WorkFlow 
                    });
                };

                cargarTablaMantenimientos(registroPreventivos.mantenimientos);

                if (registroPreventivos.mantenimientos.length > 0) {
                    $btnGenCronograma.css('display', 'none');
                }
            };
            var fnFailCallBack = function () {
                app.message.error("Validación", "Hubo un error en obtener el detalle del reclamo.")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }

    };
    function editar(id, codestado, idworkflow) {
        var method = "POST";
        var url = "BandejaPreventivo/SetMantPrev";

        var obj = {
            Id: id,
            CodEstado: codestado,
            Id_WorkFlow: idworkflow,
            Id_Mant: $numMant.val(),
            TipoTarea: "U",
            TipoTareaPadre: $tipoproceso.val(),
            Ruc: $txtRuc.val()
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaPreventivo/DetallePreventivo");
        };

        var fnFailCallBack = function () {
            app.message.error("Error","Se produjo un error al acceder al detalle del mantenimiento preventivo. ")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null, null);

    };
    function ver(id, codestado, idworkflow) {
        var method = "POST";
        var url = "BandejaPreventivo/SetMantPrev";

        var obj = {
            Id: id,
            CodEstado: codestado,
            Id_WorkFlow: idworkflow,
            Id_Mant: $numMant.val(),
            TipoTarea: "V",
            TipoTareaPadre: $tipoproceso.val()  
        };

        var objParam = JSON.stringify(obj);

        var fnDoneCallBack = function () {
            app.redirectTo("BandejaPreventivo/DetallePreventivo");
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Se produjo un error al acceder al detalle del mantenimiento preventivo. ")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null, null);

    };
    return {
        editar: editar,
        ver: ver
    };
})(window.jQuery, window, document);