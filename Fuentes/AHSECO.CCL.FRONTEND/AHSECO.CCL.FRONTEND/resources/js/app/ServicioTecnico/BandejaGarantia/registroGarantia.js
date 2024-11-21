﻿var garantias = (function ($, win, doc) {
    $(Initializer);
    //+Ids Hidden - Importante
    var $nombreusuario = $('#nombreusuario');
    var $numReclamo = $('#numReclamo');
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
    let destinos_select = [];
    let observaciones = [];
    let adjuntos = [];
    function Initializer() {
        garantias.tecnicosAsig = [];
        cargarTipoDoc();
        ObtenerFiltrosGarantias();
        $searchSolVenta.click(BuscarDetalleSolicitud);
        $limpiarReclamo.click(LimpiarTodo);
        $btnRegresar.click(btnRegresarClick);
        $openRegdateSolicitud.click($openRegdateSolicitud_click);
        $openRegdateProgramacion.click($openRegdateProgramacion_click);
        $btnRegistrarRec.click(RegistrarReclamo);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnBuscarTecnicos.click(BuscarTecnicos);
        $btnBuscarTecnico.click(BuscarTecnicos);
        $btnAñadirTecnico.click(AgregarTecnicoExterno);
        $btnRegistrarTecnicoExterno.click(CrearTecnico3ro_a_Producto);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        $dateProgramacion.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $dateSolicitud.val(hoy());
        $dateProgramacion.val(hoy());
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        CargarTipoDocumento(7); //Cambiar a tipo de proceso Instalación Técnica.
        IniciarBotonSeleccionarTecnico();
        cargarDatos();
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
            } else {
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
        $txtTipoTecnico.val("");
        $hdnIdTecnico.val("");
        $cmbTipoCredencial.val("").trigger('change.select2');
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
        filters.pageLength = 5;

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

            cargarTablaMainTecnicos(garantias.tecnicosAsig);
            $modalBusquedaTecnico.modal('toggle');
        });


    };
    function LimpiarTodo() {
        var fnSi = function () {
            $txtSerieVenta.val("");
            $txtSerieVenta.prop('disabled', false);
            limpiarCabecera();
            limpiarCuerpoEquipo();
            limpiarReclamo();
            limpiarAsignacionTecnicos();
            $btnBuscarTecnicos.prop('disabled', true);
            $btnAñadirTecnico.prop('disabled', true);
            $dateProgramacion.prop('disabled', true);
            $tbodyTecnicos.empty();
            $NoExisteTec.show();
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
    function cargarCabecera(requerimiento) {
        $txtSerieVenta.prop('disabled', true);
        //$cmbDestino.prop('disabled', false);
        $dateSolicitud.prop('disabled', false);
        $dateProgramacion.prop('disabled', false);
        limpiarCabecera();

        if (requerimiento.NroProceso != "" && requerimiento.NroProceso != null) {
            $colProceso.css('display', 'block');
        };

        if (requerimiento.TipoProceso != "" && requerimiento.TipoProceso != null) {
            $coltipProceso.css('display', 'block');
        }

        if (requerimiento.Contrato != "" && requerimiento.Contrato != null) {
            $colContrato.css('display', 'block');
        };

        if (requerimiento.OrdenCompra != "" && requerimiento.OrdenCompra != null) {
            $colOrdenCompra.css('display', 'block');
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
    };

    function limpiarCabecera() {
        $txtEmpresa.val("");
        $cmbTipVenta.val("");
        $txtRuc.val("");
        $txtNomEmpresa.val("");
        $txtUbigeo.val("");
        $txtAsesor.val("");
        $txtUbiDestino.val("");
        $dateSolicitud.val("");
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
        $txtFinGarantia.val(detalle.FechaVencimiento);
        $txtEstadoGarantia.val(detalle.EstadoGarant);
        $txtDirecInstall.val(detalle.Direccion);
        $hdnCodUbigeo.val(detalle.CodUbicacionDestino);
        $txtUbiDestino.val(detalle.UbicacionDestino);
        $txtNumFianza.val(detalle.NumFianza);
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo: ' + detalle.Descripcion + '</p>');
    }

    function limpiarCuerpoEquipo() {
        $txtDescEquipo.val("");
        $txtMatcaEquipo.val("");
        $txtModeloEquipo.val("");
        $txtMantPrevEquipo.val("");
        $txtPrevRealiEquipo.val("");
        $txtPrevFaltEquipo.val("");
        $txtFechaInstall.val("");
        $txtFinGarantia.val("");
        $txtEstadoGarantia.val("");
        $titleNomProducto.html('<p id="titleNomProducto"><i class="fa fa-cube" aria-hidden="true" style="color:brown"></i> Equipo</p>');
    }

    function limpiarReclamo() {
        $txtReclamo.val("");
        $cmbMotivo.val("").trigger('change.select2');
        $cmbUrgencia.val("").trigger('change.select2');
        $dateSolicitud.prop('disabled', true);
        $cmbMotivo.prop('disabled', true);

    };
   

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
        var btnRegresar = document.getElementById("btnRegresar");
        if (btnRegresar != null) {
            var fnSi = function () {
                app.redirectTo("BandejaGarantia");
            };
            return app.message.confirm("Confirmación", "¿Está seguro que desea retroceder? Se perderán los cambios no guardados.", "Si", "No", fnSi, null);
        }
        else {
            var fnSi = function () {
                cancelarEditReq();
            };
            return app.message.confirm("Confirmación", "¿Está seguro que desea cancelar? Se perderán los cambios no guardados.", "Si", "No", fnSi, null);
        };
    };

    function cancelarEditReq() {
        destinos_select = garantias.requerimiento.Destino.split(',')
        var btnActualizar = document.getElementById("btnActualizar");
        var btnCancelar = document.getElementById("btnCancelarReq");

        //$cmbDestino.val(destinos_select).trigger("change.select2");
        $dateSolicitud.val(garantias.requerimiento.FechaMax);

        //$cmbDestino.prop("disabled", true);
        $dateSolicitud.prop("disabled", true);

        btnActualizar.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar';
        btnCancelar.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i> Regresar'
        btnActualizar.id = 'btnEditarReq';
        btnCancelar.id = 'btnRegresar';
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

                if ($numeroReq.val() != "") {

                    var method = "POST";
                    var url = "BandejaInstalacionTecnica/GuardarAdjunto";
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
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:garantias.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:garantias.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
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
            var url = "BandejaInstalacionTecnica/GuardarObservacion"
            var objObservacion = {
                TipoProceso: "I",
                Observacion: $txtObservacion.val(),
                Id_WorkFlow: $codigoWorkflow.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Estado_Instancia: $estadoReq.val()
            };

            var objParamObs = JSON.stringify(objObservacion);

            var fnDoneCallBack = function () {
                app.message.success("Ventas", "Se realizó el registro de la observación correctamente.");

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
                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: garantias.eliminarObsTmp(" + garantias.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
                    "</th> " +
                    "</tr>";
                $tblObservaciones.append(nuevoTr);
                $NoExisteRegObs.hide();
                $modalObservacion.modal('toggle');
            };

            var fnFailCallBack = function () {
                app.message.error("Validación","Ocurrió un error al registrar la observación.");
            };
            app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoObservacion);
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
                            var empresa = '<input placeholder="--Empresa--" type="text" class="form-control input-sm" id="txtNomEmpresa'+row.Id+'">'
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
                    var retirar = '<a id="btnDesasignarTecnico" class="btn btn-danger btn-xs" tittle="Desasignar Tecnico" href="javascript:garantias.DesasignarTecnico(' + data + ')"><i class="fa fa-minus-square-o" aria-hidden="true"></i></a>'
                    return '<center>' + retirar + '</center>';
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

        }
        return app.message.confirm("Confirmación", "Está seguro(a) que desea eliminar esta observación?", "Si", "No", fnSi, null);

    };

    function eliminarDocumento(idDocumento) {
        if ($numeroReq.val() != "") {
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

        app.abrirVentana("BandejaInstalacionTecnica/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);
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
            ext == "docx" || ext == "DOCX") {
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

        if ($dateProgramacion.val() < fechaHoy) {
            app.message.error("Validación", "La fecha de programación no puede ser menor a la fecha de hoy");
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
            Observaciones : garantias.Observaciones,
            Adjuntos :  adjuntos
        };

        var objParam = JSON.stringify(objReclamo);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                function redirect() {
                    app.redirectTo("BandejaGarantía");
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
            $txtTecnico.val($txtNombreTecnico.val().trim() + ' ' + $txtApellidoPaternoTec.val().trim() + ' ' + $txtApellidoMaternoTec.val().trim());
            $txtEmpresaTecnico.val("");
            $txtEmpresaTecnico.prop('disabled', false);
            app.message.confirm("Éxito", "Se realizó la creación del técnico satisfactoriamente.");
            $hdnIdTecnico.val(data.Codigo);
            $modalAsignacion.modal('toggle');
        };
        var fnFailCallback = function () {
            app.message.error("Error", "Error en la inserción o documento de identidad ya ha sido ingresado con anterioridad, por favor revisar.");
        };

        app.llamarAjax(method, url, objEmpleado, fnDoneCallback, fnFailCallback, null, null);
    };

    function DesasignarTecnico(codTecnico) {
        garantias.tecnicosAsig = garantias.tecnicosAsig.filter(tecnico => tecnico.Id != codTecnico);
        cargarTablaMainTecnicos(garantias.tecnicosAsig);
    };

    function AgregarTecnicoExterno() {
        $txtTipoTecnico.val("Externo");
        $hdnTipoEmpleado.val("E");
    };

    function cargarDatos() {
        if ($numReclamo.val() != "") {
            observaciones = [];
            garantias.contadorObservaciones = 0;
            productos = [];
            garantias.requerimiento = [];
            adjuntos = [];
            $contadordoc.val("");

            var method = "POST";
            var url = "BandejaGarantia/ObtenerMainReclamo"
            objRq = {
                NumReclamo: $numReclamo.val(),
                IdWorkFlow: $codigoWorkflow.val()
            };
            var objParam = JSON.stringify(objRq);

            var fnDoneCallBack = function (data) {
                registroInstalacionTec.requerimiento = data.Result.CabeceraInstalacion;
                cargarCabecera(data.Result.CabeceraInstalacion);

                for (var i = 0; i < data.Result.DetalleInstalacion.length; i++) {
                    var elementos = data.Result.Elementos.filter(elemento => elemento.Id_Detalle == data.Result.DetalleInstalacion[i].Id);
                    productos.push({
                        Id: data.Result.DetalleInstalacion[i].Id,
                        CodProducto: data.Result.DetalleInstalacion[i].CodItem,
                        DescProducto: data.Result.DetalleInstalacion[i].DescProducto,
                        Marca: data.Result.DetalleInstalacion[i].Marca,
                        Cantidad: data.Result.DetalleInstalacion[i].Cantidad,
                        IndFianza: data.Result.DetalleInstalacion[i].IndFianza,
                        NumFianza: data.Result.DetalleInstalacion[i].NumFianza,
                        IndLLaveMano: data.Result.DetalleInstalacion[i].IndLLaveMano,
                        Dimensiones: data.Result.DetalleInstalacion[i].Dimensiones,
                        MontoPrestAcc: data.Result.DetalleInstalacion[i].MontoPrestAcc,
                        MontoPrestPrin: data.Result.DetalleInstalacion[i].MontoPrestPrin,
                        FecLimInsta: app.obtenerFecha(data.Result.DetalleInstalacion[i].FecLimInsta),
                        Elementos: elementos
                    });
                };
                registroInstalacionTec.childProductos = data.Result.Elementos;
                cargarBandejaProductos(productos);

                registroInstalacionTec.contadorObservaciones = data.Result.Observaciones.length;
                observaciones = data.Result.Observaciones;
                if (registroInstalacionTec.contadorObservaciones > 0) {
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
                cargarBtnInfoAdicional();
                var docs = data.Result.Adjuntos.length;
                adjuntos = data.Result.Adjuntos;
                $contadordoc.val(docs);
                if (docs > 0) {
                    $tbodyDocAdjuntos.empty()
                    for (i = 0; i < data.Result.Adjuntos.length; i++) {
                        var html = '<div class="text-center">';
                        //var d = "'" + data.Result.Adjuntos[i].CodigoDocumento + "','" + data.Result.Adjuntos[i].RutaDocumento + "'";
                        html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:registroInstalacionTec.download(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
                        html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroInstalacionTec.eliminarDocumento(' + data.Result.Adjuntos[i].CodigoDocumento + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>&nbsp;';

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
            };
            var fnFailCallBack = function () {
                app.message.error("Validación", "Hubo un error en obtener el detalle de la instalación técnica.")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
    };


    return {
        DesasignarTecnico: DesasignarTecnico
        //visualizar: visualizar,
        //eliminarObsTmp: eliminarObsTmp,
        //eliminarDocTemp: eliminarDocTemp,
        //eliminarDocumento: eliminarDocumento,
        //download: download,
        //seleccionarSolicitud: seleccionarSolicitud,
        //seleccionarTecnico: seleccionarTecnico
        ////asignarTecnico: asignarTecnico,
        //activarFechaProgramacion: activarFechaProgramacion,
        //desactivarFechaProgramacion: desactivarFechaProgramacion,
        //activarFechaInstalacion: activarFechaInstalacion,
        //desactivarFechaInstalacion: desactivarFechaInstalacion,
        //detalleHijo: detalleHijo,
        //añadirTecnico: añadirTecnico,
        //DesasignarTécnicoTmp: DesasignarTécnicoTmp
    }
})(window.jQuery, window, document);