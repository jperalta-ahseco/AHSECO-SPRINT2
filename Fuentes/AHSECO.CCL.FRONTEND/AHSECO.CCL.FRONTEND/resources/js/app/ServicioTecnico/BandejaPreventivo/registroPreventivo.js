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

    /*Txt*/
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
    let observaciones = [];
    let adjuntos = [];
    let rptaFinal = 0;
    function Initializer() {
        cargarTipoDoc();
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnBuscarTecnicos.click(BuscarTecnicos);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        CargarTipoDocumento(6);
        registroPreventivos.contadorObservaciones = 0;
        registroPreventivos.tecnicosAsig = [];
        cargarDatos();
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

    function $modalObservacionClick() {
        $tituloModalObservacion.html("Nueva observación");
        $grpAuditoriaObservacion.hide();
        $modalObservacion.modal("show");
        $lblUsuarioCreacionObservacion.text($nombreusuario.val());
        $lblFechaCreacionObservacion.text(hoy());
    };
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
    }

    function cargarCuerpoEquipo(detalle) {
        $txtCodEquipo.val(detalle.CodItem);
        $txtDescEquipo.val(detalle.Descripcion);
        $txtMarcaEquipo.val(detalle.DesMarca);
        $txtModeloEquipo.val(detalle.Modelo);
        $txtMantPrevEquipo.val(detalle.TotalPrevent);
        $txtPrevRealiEquipo.val(detalle.PreventReal);
        $txtPrevFaltEquipo.val(detalle.PreventPend);
        $txtNumSerie.val(detalle.Serie);
        $txtFechaInstall.val(app.obtenerFecha(detalle.FechaInstalacion));
        //$txtFinGarantia.val(app.obtenerFecha(detalle.FechaVencimiento));
        $txtFinGarantia.val(detalle.FechaVencimiento);
        $txtEstadoGarantia.val(detalle.EstadoGarant);
        $txtDirecInstall.val(detalle.Direccion);
        $hdnCodUbigeo.val(detalle.CodUbicacionDestino);
        $txtUbiDestino.val(detalle.UbigeoDest);
        $txtNumFianza.val(detalle.NumFianza);
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo: ' + detalle.Descripcion +'</p>');
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
    function cargarDatos() {
        if ($numMant.val() != "") {
            $contadordoc.val("");

            var method = "POST";
            var url = "BandejaPreventivo/ObtenerMainMant"
            objRq = {
                NumMant: $numMant.val(),
                IdWorkFlow: $codigoWorkflow.val()
            };
            var objParam = JSON.stringify(objRq);

            var fnDoneCallBack = function (data) {

                var equipo = {
                    Serie: data.Result.MantPreventivo.Serie,
                    CodItem: data.Result.MantPreventivo.CodItem,
                    Descripcion: data.Result.MantPreventivo.Descripcion,
                    DesMarca: data.Result.MantPreventivo.DesMarca,
                    Modelo: data.Result.MantPreventivo.Modelo,
                    TotalPrevent: data.Result.MantPreventivo.TotalPrevent,
                    PreventReal: data.Result.MantPreventivo.PreventReal,
                    PreventPend: data.Result.MantPreventivo.PreventPend,
                    FechaInstalacion: data.Result.MantPreventivo.FechaInstalacion,
                    FechaVencimiento: data.Result.MantPreventivo.FechaVencimiento,
                    EstadoGarant: data.Result.MantPreventivo.EstadoGarantia,
                    Direccion: data.Result.MantPreventivo.Direccion,
                    CodUbicacionDestino: data.Result.MantPreventivo.CodUbigeo,
                    UbigeoDest: data.Result.MantPreventivo.UbigeoDest,
                    NumFianza: data.Result.MantPreventivo.NumFianza
                };

                //cargarCabecera(requerimiento);
                cargarCuerpoEquipo(equipo);

                for (var i = 0; i < data.Result.Tecnicos.length; i++) {
                    registroPreventivos.tecnicosAsig.push({
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

                cargarTablaMainTecnicos(registroPreventivos.tecnicosAsig);

                registroPreventivos.contadorObservaciones = data.Result.Observaciones.length;
                observaciones = data.Result.Observaciones;
                if (registroPreventivos.contadorObservaciones > 0) {
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
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:registroPreventivos.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        if ($tipoproceso.val() == "U") {
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroPreventivos.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';
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
        }

    };

    return {

    };
})(window.jQuery, window, document);