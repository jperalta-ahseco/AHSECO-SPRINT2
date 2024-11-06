﻿var registroInstalacionTec = (function ($, win, doc) {
    //Ids Hidden - Importante
    var $nombreusuario = $('#nombreusuario');
    var $numeroReq = $('#numeroReq');
    var $perfilnombre = $('#perfilnombre');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $estadoReq = $('#estadoReq');
    var $tipoproceso = $('#tipoproceso');
    //Btns
    var $btnAgregarObservacion = $('#btnAgregarObservacion');
    var $btnRegresar = $('#btnRegresar');
    var $btnRegistrarReq = $('#btnRegistrarReq');
    var $btnEditarReq = $('#btnEditarReq');
    var $btnFinalizarReq = $('#btnFinalizarReq');
    var $btnActualizar = $('#btnActualizar');
    var $btnProcesoInst = $('#btnProcesoInst');
    //TxT
    var $txtEmpresa = $('#txtEmpresa');
    var $txtSolVenta = $('#txtSolVenta');
    var $txtRuc = $('#txtRuc');
    var $txtTipVenta = $('#txtTipVenta');
    var $txtNomEmpresa = $('#txtNomEmpresa');
    var $txtUbigeo = $('#txtUbigeo');
    var $txtAsesor = $('#txtAsesor');
    var $txtOrdCompra = $('#txtOrdCompra');
    var $txtProceso = $('#txtProceso');
    var $txtContrato = $('#txtContrato');
    var $txtFianza = $('#txtFianza');

    var $NoExisteProductos = $('#NoExisteProductos');
    var $colProceso = $('#colProceso');
    var $colContrato = $('#colContrato');
    var $colOrdenCompra = $('#colOrdenCompra');
    //Labels
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');

    //HiddenIds
    var $hdnIdProduct = $('#hdnIdProduct');
    var $hdnCodEmpresa = $('#hdnCodEmpresa');
    var $hdnCodTipVenta = $('#hdnCodTipVenta');
    var $hdnIdTecnico = $('#hdnIdTecnico');

    //Combos
    var $cmbDestino = $('#cmbDestino');
    var $dateSolicitud = $('#dateSolicitud');
    var $openRegdateSolicitud = $('#openRegdateSolicitud');
    var $tblMainProducts = $('#tblMainProducts');

    var $dateFechaProgramacion = $('#dateFechaProgramacion');
    var $dateFechaReal = $('#dateFechaReal');

    var $searchSolVenta = $('#searchSolVenta');
    var mensajes = {
        procesandoUbigeo: "Cargando Ubigeo, por favor espere....",
        RegistrarRequerimiento: "Registrando requerimiento, por favor espere...."
    };

    /*Modales*/
    var $modalObservacion = $('#modalObservacion');
    var $modalCargaDocumento = $('#modalCargaDocumento');
    var $modalSolicitud = $('#modalSolicitud');
    var $modalAsignacion = $('#modalAsignacion');
    var $modalBusquedaTecnico = $('#modalBusquedaTecnico');
    $(Initializer);

    /*Modales Observacion*/
    var $NoExisteRegObs = $('#NoExisteRegObs');
    var $tblObservaciones = $('#tblObservaciones');
    var $formObservacion = $('#formObservacion');
    var $hdnObservacionId = $('#hdnObservacionId');
    var $txtObservacion = $('#txtObservacion');
    var $grpAuditoriaObservacion = $('#grpAuditoriaObservacion');
    var $btnGuardarObservacionReq = $('#btnGuardarObservacionReq');


    /*Modal Adjuntos*/
    var $btnAgregarDocumento = $('#btnAgregarDocumento');
    var $hdnDocumentoCargadoId = $('#hdnDocumentoCargadoId');
    var $cmbDocumentoCarga = $('#cmbDocumentoCarga');
    var $txtDescripcionDocumentoCarga = $('#txtDescripcionDocumentoCarga');
    var $cmbTipoDocumentoCarga = $('#cmbTipoDocumentoCarga');
    var $lblNombreArchivo = $('#lblNombreArchivo');
    var $btnAdjuntarDocumento = $('#btnAdjuntarDocumento');
    var $btnCargarDocumento = $('#btnCargarDocumento');
    var $contadordoc = $("#contadordoc");
    var $fileCargaDocumentoSustento = $('#fileCargaDocumentoSustento');
    var $NoExisteRegDoc = $('#NoExisteRegDoc');
    var $tblDocumentosCargados = $('#tblDocumentosCargados');

    /*Modal Solicitud*/
    var $btnBuscarSolicitud = $('#btnBuscarSolicitud');
    var $btnRegresarSolicitud = $('#btnRegresarSolicitud');
    var $tblSolicitudes = $('#tblSolicitudes');
    var $formSolicitudes = $('#formSolicitudes');
    var $txtSolicitud = $('#txtSolicitud');
    var $cmbClienteSol = $('#cmbClienteSol');


    /*Modal Tecnicos*/
    var $agregarTecnico = $('#agregarTecnico');
    var $btnRegistrarTecnico = $('#btnRegistrarTecnico');
    var $btnEditarTecnico = $('#btnEditarTecnico');
    var $searchTecnico = $('#searchTecnico');
    var $txtNombreTecnico = $('#txtNombreTecnico');
    var $txtCodTecnico = $('#txtCodTecnico');
    var $txtNumDocumento = $('#txtNumDocumento');
    var $txtTelefono = $('#txtTelefono');
    var $txtCorreo = $('#txtCorreo');
    var $txtZona = $('#txtZona');
    var $txtTipoTecnico = $('#txtTipoTecnico');
    var $hdnTipoEmpleado = $('#hdnTipoEmpleado');
    var $cmbTipoCredencial = $('#cmbTipoCredencial');
    var $txtApellidoPaternoTec = $('#txtApellidoPaternoTec');
    var $txtApellidoMaternoTec = $('#txtApellidoMaternoTec');

    /*Modal Buscar Tecnicos*/
    var $cmbTipDocTecnico = $('#cmbTipDocTecnico');
    var $txtNumDocTec = $('#txtNumDocTec');
    var $cmbTipoEmpleado = $('#cmbTipoEmpleado');
    var $txtNombres = $('#txtNombres');
    var $txtApePat = $('#txtApePat');
    var $txtApeMat = $('#txtApeMat');
    var $btnBuscarTecnico = $('#btnBuscarTecnico');
    var $btnRegresarTecnico = $('#btnRegresarTecnico');
    var $tblTecnicos = $('#tblTecnicos');

    var $spanEstadoSol = $('#spanEstadoSol');

    let productos = [];
    let destinos_select = [];
    let observaciones = [];
    let adjuntos = [];
    function Initializer() {
        registroInstalacionTec.requerimiento = [];
        registroInstalacionTec.contadorObservaciones = 0;
        cargarTipoDoc();
        ObtenerFiltrosInstalacion();
        ObtenerDepartamentos();
        $btnRegresar.click(btnRegresarClick);
        $openRegdateSolicitud.click($openRegdateSolicitud_click);
        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        $btnProcesoInst.click(cambiarEstadoProceso);
        $btnFinalizarReq.click(CerrarRequerimiento);
        $btnEditarReq.click(EditarRequerimiento);
        $btnRegistrarTecnico.click(AsignarTecnico_a_Producto);
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $btnRegistrarReq.click(RegistrarRequerimiento);
        $btnAdjuntarDocumento.click($adjuntarDocumento_click);
        $btnBuscarSolicitud.click(BuscarSolicitudes);
        $searchSolVenta.click(BuscarSolicitudes);
        $searchTecnico.click(abrirModalTecnicos);
        $agregarTecnico.click(AgregarTecnicoExterno);
        $btnBuscarTecnico.click(BuscarTecnicos);
        $dateSolicitud.val(hoy());
        $fileCargaDocumentoSustento.on("change", $fileCargaDocumentoSustento_change);
        CargarTipoDocumento(4); //Cambiar a tipo de proceso Instalación Técnica.
        cargarDatos();
        $('#tblMainProducts tbody').on('click', 'td #btnAñadirChild', function () {
            var tr = $(this).closest('tr');
            var row = $('#tblMainProducts').dataTable().api().row(tr);

            if (row.child.isShown()) {
                // Si la fila hija está visible, ocultarla
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Si no, mostrar la fila hija
                if (row.data().Tecnicos.length == 0) {
                    if ($tipoproceso.val() == "U") {
                        row.child('<a class="btn btn-green btn-xs" title="Añadir" href="javascript:registroInstalacionTec.añadirTecnico(' + row.data().Id + ')"><i class="fa fa-plus" aria-hidden="true"></i> Asignar Técnico</a>&nbsp;').show();
                    }
                }
                else if (row.data().Tecnicos.length > 0) {
                    var producto = row.data();
                    var childTableHtml = '<table class="table table-hover table-condensed table-striped table-bordered dataTable no-footer"><tbody>';
                    childTableHtml += '<tr>' +
                        '<th style="background-color:black;color:white;"><center></center>' +
                        '<th hidden></th>' +
                        '<th style="background-color:black;color:white;"><center>Tip.Documento</center></th>' +
                        '<th style="background-color:black;color:white;"><center>N°Documento</center></th>' +
                        '<th style="background-color:black;color:white;"><center>Nombre de Técnico</center></th>' +
                        '<th style="background-color:black;color:white;"><center>Correo</center></th>' +
                        '<th style="background-color:black;color:white;"><center>Teléfono</center></th>' +
                        '<th style="background-color:black;color:white;"><center>Zona</center></th>' +
                        '<th style="background-color:black;color:white;"><center>Tip.Empleado</center></th>' +
                        '<th style="background-color:black;color:white;"><center><i class="fa fa-dot-circle-o" aria-hidden="true"></i></center></th>' +
                        '</tr>';

                    for (var i = 0; i < producto.Tecnicos.length; i++) {
                        childTableHtml += "<tr>" +
                            "<td style='width:3.4%;'><center><i class='fa fa-user-circle-o' aria-hidden='true'></i></center></td>";
                        childTableHtml += "<td hidden ><center>" + producto.Tecnicos[i].Cod_Tecnico + "</center></td>";
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].Nom_TipDocumento + "</center></td>";
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].Documento + "</center></td>"
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].NombreTecnico.trim() + ' ' + producto.Tecnicos[i].ApellidoPaterno.trim() + ' ' + producto.Tecnicos[i].ApellidoMaterno.trim() + "</center></td>"
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].Correo + "</center></td>"
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].Telefono + "</center></td>"
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].Zona + "</center></td>"
                        childTableHtml += "<td style='text-align:center;width:10%;'><center>" + producto.Tecnicos[i].TipoTecnico + "</center></td>"
                        // Agregar la fila para el botón
                        if ($tipoproceso.val() == "V") {
                            childTableHtml += "";
                        }
                        else if ($tipoproceso.val() == "U") {
                            childTableHtml += "<td style='text-align:center;width:10%;'><center><a style='color:red;' id='btnDesasignarTemp' class='btn btn-green btn-xs' title='Des-Asignar' href='javascript: registroInstalacionTec.DesasignarTécnicoTmp(" + producto.Tecnicos[i].Id + ")'><i class='fa fa-trash' aria-hidden='true'></i> Des-Asignar</a></center></td></tr>";
                        }
                    }
                    if ($tipoproceso.val() == "U") {
                        childTableHtml += '<tr><td colspan="10"><a class="btn btn-green btn-xs" title="Añadir" href="javascript:registroInstalacionTec.añadirTecnico(' + producto.Id + ')"><i class="fa fa-plus" aria-hidden="true"></i> Asignar Técnico</a></td></tr>';
                    }
                    childTableHtml += '</tbody></table>';

                    // Aquí se usa row.child() para mostrar la tabla
                    row.child(childTableHtml).show();
                    // Esto asegurará que el padre se expanda para mostrar la tabla correctamente
                    row.child().show();
                }
                tr.addClass('shown');
            }
        });
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

    function AsignarTecnico_a_Producto() {
        var idProducto = $hdnIdProduct.val();
        var idEmpleado = $hdnIdTecnico.val();

        if ($txtNombreTecnico.val() == "" || $txtNombreTecnico.val() == null || $txtNombreTecnico.val().trim().length == 0) {
            app.message.error("Validación", "Debe de seleccionar un técnico o ingresar el nombre de uno nuevo.");
            return;
        };

        if ($txtNombreTecnico.val() == "" && $txtApellidoPaternoTec.val() == "" && $txtApellidoMaternoTec.val() == "")
        {
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

        if (idEmpleado == "") {
            var fnSi = function () {
                AsignarTecnico3ro_a_Producto();
            };
            return app.message.confirm("Confirmación", "¿Está seguro(a) de asignar un técnico externo a la instalación de este equipo?", "Sí", "No", fnSi, null);
        }
        else {
            var fnSi = function () {
                var method = "POST";
                var url = "BandejaInstalacionTecnica/MantTecnicoxDetalle";
                var objAsignacion = {
                    TipoProceso: "I"
                    , Id: 0
                    , Id_Detalle: idProducto
                    , Cod_Tecnico: idEmpleado
                    , NombreTecnico: $txtNombreTecnico.val()
                    , ApellidoPaterno: $txtApellidoPaternoTec.val()
                    , ApellidoMaterno: $txtApellidoMaternoTec.val()
                    , Documento: $txtNumDocumento.val()
                    , TipDocumento: $cmbTipoCredencial.val()
                    , Correo: $txtCorreo.val()
                    , Telefono: $txtTelefono.val()
                    , Zona: $txtZona.val()
                    , TipoTecnico: $hdnTipoEmpleado.val()
                    , Estado: 1
                }
                var objParam = JSON.stringify(objAsignacion);

                var fnDoneCallBack = function () {
                    app.message.success("Éxito", "Se realizó la asignación satisfactoriamente.");
                    obtenerDetalleInstalacion();
                    $modalAsignacion.modal('toggle');
                };

                var fnFailCallBack = function () {
                    app.message.error("Validación", "Error en la asignación de técnico a equipo, por favor resvisar.");
                };
                app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
            }
            return app.message.confirm("Confirmación", "¿Está seguro(a) que desea asignar al técnico a la instalación de este equipo", "Sí", "No", fnSi, null);
        }
    };

    function obtenerDetalleInstalacion() {
        productos = [];

        var method = "POST";
        var url = "BandejaInstalacionTecnica/ObtenerDetalleInstalacion";
        var objDetalle = {
            NumReq: $numeroReq.val()
        }
        var objParam = JSON.stringify(objDetalle);

        var fnDoneCallBack = function (data) {
            for (var i = 0; i < data.Result.length; i++) {
                productos.push({
                    Id: data.Result[i].Id,
                    Cantidad: data.Result[i].Cantidad,
                    CodProducto: data.Result[i].CodProducto,
                    DescProducto: data.Result[i].DescProducto,
                    Marca: data.Result[i].Marca,
                    Modelo: data.Result[i].Modelo,
                    Serie: data.Result[i].Serie,
                    NumFianza: data.Result[i].NumFianza,
                    CantidadMP: data.Result[i].CantidadPreventivo,
                    Periodicidad: data.Result[i].PeriodoPreventivo,
                    Garantia: data.Result[i].GarantiaAdic,
                    FechaProgramacion: data.Result[i].FechaProgramacion,
                    FechaReal: data.Result[i].FechaReal,
                    Tecnicos: data.Result[i].Tecnicos
                })
            };
            cargarBandejaProductos(productos);
        };

        var fnFailCallBack = function () {
            app.message.error("Error", "Hubo un error al traer el detalle de instalación, por favor revisar.");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    }


    function AsignarTecnico3ro_a_Producto() {
        var idProducto = $hdnIdProduct.val();

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
                UbigeoId: "",
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
                CodValor1: "",
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
            var method = "POST";
            var url = "BandejaInstalacionTecnica/MantTecnicoxDetalle";
            var objAsignacion = {
                TipoProceso: "I"
                , Id: 0
                , Id_Detalle: idProducto
                , Cod_Tecnico: null
                , NombreTecnico: $txtNombreTecnico.val()
                , ApellidoPaterno: $txtApellidoPaternoTec.val()
                , ApellidoMaterno: $txtApellidoMaternoTec.val()
                , Documento: $txtNumDocumento.val()
                , TipDocumento: $cmbTipoCredencial.val()
                , Correo: $txtCorreo.val()
                , Telefono: $txtTelefono.val()
                , Zona: $txtZona.val()
                , TipoTecnico: $hdnTipoEmpleado.val()
                , Estado: 1
            };

            var objParam = JSON.stringify(objAsignacion);

            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Se realizó la asignación satisfactoriamente.");
                obtenerDetalleInstalacion();
                $modalAsignacion.modal('toggle');
            };

            var fnFailCallBack = function () {
                app.message.error("Validación", "Error en la asignación de técnico a equipo, por favor resvisar.");
            };
            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        var fnFailCallback = function () {
            app.message.error("Error", "Error en la inserción del nuevo técnico externo.");
        };

        app.llamarAjax(method, url, objEmpleado, fnDoneCallback, fnFailCallback, null, null);
    };

    function EliminarTecnico_a_Producto(CodigoProducto) {
        var method = "POST";
        var url = "";
        var objTecnico = {
            TipoProceso: "D"
            , Id: CodigoProducto
        }
        var objParam = JSON.stringify(objTecnico);

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Se realizó la des-asignación del técnico al equipo seleccionado");
            };

            var fnFailCallBack = function () {
                app.message.error("Validación", "Error en la des-asignación del técnico al equipo")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback, null, null);
        }
        return app.message.confirm("Confirmación", "¿Está seguro(a) de des-asignar el técnico del equipo seleccionado?", "Sí", "No", fnSi, null);
    };

    function $openRegdateSolicitud_click() {
        $dateSolicitud.focus();
    };


    function RegistrarRequerimiento() {
        if ($txtSolVenta.val() == "" || $txtSolVenta.val() == null || isNaN($txtSolVenta.val()) || $txtSolVenta.val().trim().length == 0) {
            app.message.error("Validación", "Debe de seleccionar la solicitud de venta.")
            return;
        };
        if ($txtEmpresa.val() == "" || $txtEmpresa.val() == null || $txtEmpresa.val().trim().length == 0) {
            app.message.error("Validación", "El nombre de empresa está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtTipVenta.val() == "" || $txtTipVenta.val() == null || $txtTipVenta.val().trim().length == 0) {
            app.message.error("Validación", "El campo tipo de venta está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtRuc.val() == "" || $txtRuc.val() == null || isNaN($txtRuc.val()) || $txtRuc.val().trim().length == 0) {
            app.message.error("Validación", "El campo RUC está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtNomEmpresa.val() == "" || $txtNomEmpresa.val() == null || $txtNomEmpresa.val().trim().length == 0) {
            app.message.error("Validación", "El campo Empresa está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtUbigeo.val() == "" || $txtUbigeo.val() == null || $txtUbigeo.val().trim().length == 0) {
            app.message.error("Validación", "El campo del Ubigeo está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if (destinos_select == null) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un destino.")
            return;
        };
        if (destinos_select.length == 0 || destinos_select == null) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un destino.")
            return;
        };
        if ($dateSolicitud.val() == "" || $dateSolicitud.val() == null || $dateSolicitud.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar la fecha máxima de la solicitud.")
            return;
        };

        var method = "POST";
        var url = "BandejaInstalacionTecnica/RegistroRequerimientoMain"
        var objGrupo = {
            CabeceraInstalacion: {
                TipoProceso: "I"
                , NumReq: 0
                , Id_Solicitud: $txtSolVenta.val()
                , RucEmpresa: $txtRuc.val()
                , NomEmpresa: $txtNomEmpresa.val()
                , Ubicacion: $txtUbigeo.val()
                , NombreContacto: 'pendiente'
                , TelefonoContacto: 'pendiente'
                , CargoContacto: 'pendiente'
                , Establecimiento: 'pendiente'
                , TipoVenta: $hdnCodTipVenta.val()
                , CodEmpresa: $hdnCodEmpresa.val()
                , OrdenCompra: $txtOrdCompra.val()
                , NumProceso: $txtProceso.val()
                , Contrato: $txtContrato.val()
                , Fianza: $txtFianza.val()
                , NumFianza: $txtFianza.val()
                , Vendedor: $txtAsesor.val()
                , FechaMax: $dateSolicitud.val()
                , Destino: destinos_select.toString()
                , Estado: 'STREG'
            },
            DetalleInstalacion: productos,
            Observaciones: observaciones,
            Adjuntos: adjuntos

        }
        var objParam = JSON.stringify(objGrupo);


        

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                function redirect() {
                    app.redirectTo("BandejaInstalacionTecnica");
                }

                app.message.success("Registro Realizado", "Se realizó el registro satisfactoriamente.", "Aceptar", redirect);
            };

            var fnFailCallBack = function () {
                app.message.error("Validación", "Error al realizar el registro del requerimiento");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.RegistrarRequerimiento);
        }
        return app.message.confirm("Instalación Técnica", "¿Esta seguro(a) que desea registrar el requerimiento?", "Si", "No", fnSi, null);
    };

    function BuscarSolicitudes() {
        if (isNaN($txtSolicitud.val())) {
            app.message.error("Validación", "El número de solicitud no puede contener letras")
            return;
        };

        method = "POST";
        url = "BandejaInstalacionTecnica/ObtenerSolicitudes"
        objBuscar = {
            IdCliente: $cmbClienteSol.val() == "" || $cmbClienteSol.val() == 0 ? 0 : $cmbClienteSol.val(),
            Id_Solicitud: $txtSolicitud.val() == "" || $txtSolicitud.val() == 0 ? 0 : $txtSolicitud.val(),
            Estado: 'REG', //Cambiar estado según lo requieran
            Tipo_Sol: "TSOL05"
        };

        objParam = JSON.stringify(objBuscar);

        var fnDoneCallBack = function (data) {
            cargarTablaSolicitudes(data);
        };

        var fnFailCallBack = function () {
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null)
    };

    function seleccionarSolicitud(id) {
        productos = [];

        method = "POST";
        url = "BandejaInstalacionTecnica/ObtenerDetalleSolicitud"
        objBuscar = {
            id: id
        };

        objParam = JSON.stringify(objBuscar);

        var fnDoneCallBack = function (data) {
            cargarCabecera(data.Result.Solicitud)

            for (var i = 0; i < data.Result.DetalleCotizacion.length; i++) {
                    productos.push({
                    Id: data.Result.DetalleCotizacion[i].Id,
                    Cantidad: data.Result.DetalleCotizacion[i].Cantidad,
                    CodProducto: data.Result.DetalleCotizacion[i].CodItem,
                    DescProducto: data.Result.DetalleCotizacion[i].Descripcion,
                    Marca: data.Result.DetalleCotizacion[i].Marca,
                    Modelo: data.Result.DetalleCotizacion[i].Modelo,
                    Serie: data.Result.DetalleCotizacion[i].Serie,
                    NumFianza: data.Result.DetalleCotizacion[i].NumFianza,
                    CantidadMP: data.Result.DetalleCotizacion[i].CantidadPreventivo,
                    Periodicidad: data.Result.DetalleCotizacion[i].PeriodoPreventivo,
                    Garantia: data.Result.DetalleCotizacion[i].GarantiaAdic
                })
            };
            //cargarBandejaProductos(data.Result.DetalleCotizacion);
            cargarBandejaProductos(productos);
            $modalSolicitud.modal('toggle');
            $cmbDestino.prop('disabled', false);
            $dateSolicitud.prop('disabled', false);
        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Error al obtener el detalle de la solicitud");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null)
    };

    function cargarCabecera(requerimiento) {
        if (requerimiento.NumProceso != "" && requerimiento.NumProceso != null) {
            $colProceso.css('display', 'block');
        };

        if (requerimiento.Contrato != "" && requerimiento.Contrato != null) {
            $colContrato.css('display', 'block');
        };

        if (requerimiento.OrdenCompra != "" && requerimiento.OrdenCompra != null) {
            $colOrdenCompra.css('display', 'block');
        };

        if ($tipoproceso.val() == "") {
            var numSolFormateado = ("000000" + requerimiento.Id_Solicitud.toString());

            numSolFormateado = numSolFormateado.substring((numSolFormateado.length) - 6, numSolFormateado.length);
            $hdnCodEmpresa.val(requerimiento.Cod_Empresa);
            $txtSolVenta.val(numSolFormateado.toString()); 
            $txtEmpresa.val(requerimiento.Nom_Empresa);
            $txtTipVenta.val(requerimiento.nomFlujo);
            $hdnCodTipVenta.val(requerimiento.Id_Flujo);
            $txtRuc.val(requerimiento.RUC);
            $txtNomEmpresa.val(requerimiento.RazonSocial);
            $txtUbigeo.val(requerimiento.Ubigeo);
            $txtAsesor.val(requerimiento.AsesorVenta);
        }
        else if ($tipoproceso.val() == "U") {
            var numSolFormateado = ("000000" + requerimiento.Id_Solicitud.toString());

            numSolFormateado = numSolFormateado.substring((numSolFormateado.length) - 6, numSolFormateado.length);

            $hdnCodEmpresa.val(requerimiento.Cod_Empresa);
            $txtSolVenta.val(numSolFormateado);
            $txtEmpresa.val(requerimiento.CodEmpresa);
            $txtTipVenta.val(requerimiento.TipoVenta);
            $hdnCodTipVenta.val(requerimiento.TipoVenta);
            $txtRuc.val(requerimiento.RucEmpresa);
            $txtNomEmpresa.val(requerimiento.NomEmpresa);
            $txtUbigeo.val(requerimiento.Ubicacion);
            $txtAsesor.val(requerimiento.Vendedor);
            $dateSolicitud.val(requerimiento.FechaMax);
            destinos_select = requerimiento.Destino.split(',');
            $cmbDestino.val(destinos_select).trigger("change.select2");
            $spanEstadoSol.text(requerimiento.Estado);
            $searchSolVenta.css('pointer-events', 'none');
        };
    };

    function ObtenerDepartamentos() {
        var method = "POST";
        var url = "Ubigeo/ObtenerUbigeo";
        var ubigeoObj = {}

        var objParam = JSON.stringify(ubigeoObj);
        var fnDoneCallback = function (data) {

            var resultado = { Result: [] };

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

            var filters = {};
            filters.placeholder = "-- Seleccione --";
            filters.allowClear = true;
            llenarComboMultiCheck($cmbDestino, resultado, null, "00", "<--Todos-->", filters);
        }
        var fnFailCallback = function () {
            app.mensajes.error("Error", "No se ejecutó correctamente la carga de departamentos")
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoUbigeo)

    }

    function llenarComboMultiCheck(selector, data) {
        selector.select2({
            placeholder: " Seleccionar Destinos",
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

    function cargarBandejaProductos(listProductos) {
        $NoExisteProductos.remove();
        var data = {}
        data.Result = [];
        data.Result = listProductos;

        if ($tipoproceso.val() == "") {
            var columns = [
                {
                    data: "Id",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "DescProducto",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Marca",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Modelo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Serie",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Cantidad",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "CantidadMP",
                    render: function (data, type, row) {
                        return '<center>' + "CantidadPrev" + '</center>'
                    }
                },
                {
                    data: "Periodicidad",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Garantia",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "NumFianza",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                }
            ];
        }
        else {
            var columns = [
                {
                    data: "Id",
                    render: function (data, type, row) {
                        return '<a id="btnAñadirChild" title="Asignar Técnicos" class="btn btn-green btn-xs" href="javascript: registroInstalacionTec.detalleHijo(' + data + ')"><i class="fa fa-sitemap" aria-hidden="true" hre style="color:red;"></i></a>';
                    }
                },
                {
                    data: "Id",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "DescProducto",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Marca",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Modelo",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Serie",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Cantidad",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "CantidadPrev",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Periodicidad",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "Garantia",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "NumFianza",
                    render: function (data, type, row) {
                        return '<center>' + data + '</center>'
                    }
                },
                {
                    data: "FechaProgramacion",
                    render: function (data, type, row) {
                        if (data == "" || data == null || data == undefined) {
                            return '<center>' +
                                '<div class="input-group date">'+
                                    '<input type="date" class="form-control input-sm" id="dateFechaProgramacion" aria-describedby="sizing-addon3" placeholder="dd/mm/aaaa" maxlength="10">' +
                                '</div>'
                                + '</center>'
                        } else {
                            return '<center>' + data + '</center>';
                        }
                    }
                },
                {
                    data: "FechaReal",
                    render: function (data, type, row) {
                        if (data == "" || data == null || data == undefined) {
                            return '<center>' +
                                '<div class="input-group date">' +
                                '<input type="date" class="form-control input-sm" id="dateFechaReal" aria-describedby="sizing-addon3" placeholder="dd/mm/aaaa" maxlength="10">' +
                                '</div>'
                                + '</center>'
                        } else {
                            return '<center>' + data + '</center>';
                        }
                    }
                }
            ];
        }

        var columnDefs = [
            {
                targets: [0],
                visible: true
            }
        ];
        app.llenarTabla($tblMainProducts, data, columns, columnDefs, "#tblMainProducts");
    };

    function AgregarTecnicoExterno() {
        $txtNombreTecnico.prop('disabled', false);
        $txtApellidoPaternoTec.prop('disabled', false);
        $txtApellidoMaternoTec.prop('disabled', false);
        $txtNumDocumento.prop('disabled', false);
        $txtTelefono.prop('disabled', false);
        $txtCorreo.prop('disabled', false);
        $txtZona.prop('disabled', false);
        $cmbTipoCredencial.prop('disabled', false);
        limpiarAsignacionTecnicos();
        $txtTipoTecnico.val("Externo");
        $hdnTipoEmpleado.val("E");
    };

    function abrirModalTecnicos() {
        limpiarAsignacionTecnicos();
        $txtNombreTecnico.prop('disabled', true);
        $txtApellidoPaternoTec.prop('disabled', true);
        $txtApellidoMaternoTec.prop('disabled', true);
        $txtNumDocumento.prop('disabled', true);
        $txtTelefono.prop('disabled', true);
        $txtCorreo.prop('disabled', true);
        $txtZona.prop('disabled', true);
        $cmbTipoCredencial.prop('disabled', true);
    }

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

    function ObtenerFiltrosInstalacion() {
        method = "POST";
        url = "BandejaInstalacionTecnica/ObtenerFiltrosInstalacion"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbClienteSol, data.Result.Clientes, null, 0, "--Todos--", filters);
            app.llenarComboMultiResult($cmbTipoEmpleado, data.Result.TipoEmpleado, null, 0, "--Todos--", filters);
        };

        var fnFailCallBack = function () {
            app.message.error("Validacion", "Ocurrió un problema al cargar los filtros de la bandeja. ")
        };

        app.llamarAjax(method, url, null, fnDoneCallBack, fnFailCallBack, null, null)
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
        var btnRegresar = document.getElementById("btnRegresar");
        if (btnRegresar != null) {
            app.redirectTo("BandejaInstalacionTecnica");
        }
        else {
            var fnSi = function () {
                cancelarEditReq();
            };
            return app.message.confirm("Confirmación", "¿Está seguro que desea cancelar? Se perderán los cambios no guardados.", "Si", "No", fnSi, null);
        };
    };

    function cancelarEditReq() {
        destinos_select = registroInstalacionTec.requerimiento.Destino.split(',')
        var btnActualizar = document.getElementById("btnActualizar");
        var btnCancelar = document.getElementById("btnCancelarReq");

        $cmbDestino.val(destinos_select).trigger("change.select2");
        $dateSolicitud.val(registroInstalacionTec.requerimiento.FechaMax);

        $cmbDestino.prop("disabled", true);
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
                //console.log("ruta_guardada:" + ruta_guardada);

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
                            html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroInstalacionTec.eliminarDocumento(' + data.Result.Codigo + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
                            html += ' <a class="btn btn-default btn-xs" title="Descargar"  href="javascript:registroInstalacionTec.download(' + data.Result.Codigo + ')"><i class="fa fa-download" aria-hidden="true"></i></a>&nbsp;';
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
                    return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);

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
                    html += ' <a class="btn btn-default btn-xs" title="Eliminar"  href="javascript:registroInstalacionTec.eliminarDocTemp(' + cont + ')"><i class="fa fa-ban" aria-hidden="true"></i></a>';
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
        if ($txtObservacion.val().trim() == "" || $txtObservacion.val().trim().length == 0) {
            app.message.error("Validación", "Es necesario que ingrese la observación.");
            return;
        }

        if ($numeroReq.val() != "") {
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

                registroInstalacionTec.contadorObservaciones += 1;

                observaciones.push(
                    {
                        TipoProceso: "I",
                        Observacion: $txtObservacion.val(),
                        Nombre_Usuario: $nombreusuario.val(),
                        Id_WorkFlow: $codigoWorkflow.val(),
                        Estado_Instancia: $estadoReq.val
                    }
                );
                var nuevoTr = "<tr id=row" + registroInstalacionTec.contadorObservaciones + ">" +
                    "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                    "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                    "<th style='text-align: center;'>" + hoy() + "</th>" +
                    "<th style='text-align: center;'>" + objObservacion.Observacion + "</th>" +
                    "<th style='text-align: center;'>" +
                    "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: registroInstalacionTec.eliminarObsTmp(" + registroInstalacionTec.contadorObservaciones + ")' > <i class='fa fa-trash' aria-hidden='true'></i></a>" +
                    "</th> " +
                    "</tr>";
                $tblObservaciones.append(nuevoTr);
                $NoExisteRegObs.hide();
                $modalObservacion.modal('toggle');
            };

            var fnFailCallBack = function () {
                app.message.error("Validación");
            };
            app.llamarAjax(method, url, objParamObs, fnDoneCallBack, fnFailCallBack, null, mensajes.guardandoObservacion);
        }
        else {
            registroInstalacionTec.contadorObservaciones += 1;

            observaciones.push({
                Id: registroInstalacionTec.contadorObservaciones,
                TipoProceso: "I",
                Estado_Instancia: "REG",
                Observacion: $txtObservacion.val(),
                Nombre_Usuario: $nombreusuario.val(),
                Perfil_Usuario: $perfilnombre.val()
            })
            var nuevoTr = "<tr id=row" + registroInstalacionTec.contadorObservaciones + ">" +
                "<th style='text-align: center;'>" + $nombreusuario.val() + "</th>" +
                "<th style='text-align: center;'>" + $perfilnombre.val() + "</th>" +
                "<th style='text-align: center;'>" + hoy() + "</th>" +
                "<th style='text-align: center;'>" + $txtObservacion.val() + "</th>" +
                "<th style='text-align: center;'>" +
                "<a id='btnEliminarObs' class='btn btn-default btn-xs' title='Eliminar' href='javascript: registroInstalacionTec.eliminarObsTmp(" + registroInstalacionTec.contadorObservaciones + ")' ><i class='fa fa-trash' aria-hidden='true'></i></a>" +
                "</th> " +
                "</tr>";
            $tblObservaciones.append(nuevoTr);
            $NoExisteRegObs.hide();
            $modalObservacion.modal('toggle');
        };
        $txtObservacion.val("");
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
    function eliminarObsTmp(idObs) {
        var fnSi = function () {


            observaciones = observaciones.filter(observacion => observacion.Id !== Number(idObs));

            $("#row" + idObs).remove();

            registroInstalacionTec.contadorObservaciones -= 1
            if (registroInstalacionTec.contadorObservaciones == 0) {
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
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);
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

    function cargarTablaSolicitudes(data) {
        var columns = [
            {
                data: "Id_WorkFlow",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id_Solicitud",
                render: function (data, type, row) {
                    var numSolFormateado = ("000000" + data.toString());
                    numSolFormateado = numSolFormateado.substring((numSolFormateado.length) - 6, numSolFormateado.length);
                    return '<center>' + numSolFormateado + '</center>';
                }
            },
            {
                data: "RazonSocial",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "nomFlujo",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Fecha_Sol",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "NomTipoSol",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "nomEstado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "AsesorVenta",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>';
                }
            },
            {
                data: "Id_Solicitud",
                render: function (data, type, row) {
                    var seleccionar = '<a id="btnSeleccionar" class="btn btn-primary btn-xs" title="Seleccionar" href="javascript: registroInstalacionTec.seleccionarSolicitud(' + row.Id_Solicitud + ')"><i class="fa fa-plus" aria-hidden="true"></i> Seleccionar</a>';
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

        app.llenarTabla($tblSolicitudes, data, columns, columnDefs, "#tblSolicitudes", null);
    };

    function cargarDatos() {
        if ($numeroReq.val() != "") {
            observaciones = [];
            registroInstalacionTec.contadorObservaciones = 0;
            productos = [];
            registroInstalacionTec.requerimiento = [];
            adjuntos = [];
            $contadordoc.val("");

            var method = "POST";
            var url = "BandejaInstalacionTecnica/ObtenerMainInstalacion"
            objRq = {
                NumReq: $numeroReq.val(),
                IdWorkFlow: $codigoWorkflow.val()
            };
            var objParam = JSON.stringify(objRq);

            var fnDoneCallBack = function (data) {
                registroInstalacionTec.requerimiento = data.Result.CabeceraInstalacion;
                cargarCabecera(data.Result.CabeceraInstalacion);

                for (var i = 0; i < data.Result.DetalleInstalacion.length; i++) {
                    productos.push({
                        Id: data.Result.DetalleInstalacion[i].Id,
                        Cantidad: data.Result.DetalleInstalacion[i].Cantidad,
                        CodProducto: data.Result.DetalleInstalacion[i].CodProducto,
                        DescProducto: data.Result.DetalleInstalacion[i].DescProducto,
                        Marca: data.Result.DetalleInstalacion[i].Marca,
                        Modelo: data.Result.DetalleInstalacion[i].Modelo,
                        Serie: data.Result.DetalleInstalacion[i].Serie,
                        NumFianza: data.Result.DetalleInstalacion[i].NumFianza,
                        CantidadMP: data.Result.DetalleInstalacion[i].CantidadPreventivo,
                        Periodicidad: data.Result.DetalleInstalacion[i].PeriodoPreventivo,
                        Garantia: data.Result.DetalleInstalacion[i].GarantiaAdic,
                        FechaProgramacion: data.Result.DetalleInstalacion[i].FechaProgramacion,
                        FechaReal: data.Result.DetalleInstalacion[i].FechaReal,
                        Tecnicos: data.Result.DetalleInstalacion[i].Tecnicos
                    })
                };


                cargarBandejaProductos(productos);
                $tblObservaciones.empty();
                registroInstalacionTec.contadorObservaciones = data.Result.Observaciones.length;
                observaciones = data.Result.Observaciones;
                if (registroInstalacionTec.contadorObservaciones > 0) {
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

                $tblDocumentosCargados.empty()
                var docs = data.Result.Adjuntos.length;
                adjuntos = data.Result.Adjuntos;
                $contadordoc.val(docs);
                if (docs > 0) {
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

        var fechasProgramacion = document.querySelectorAll("#dateFechaProgramacion");
        console.log(fechasProgramacion);
    };

    function detalleHijo(id) {
        var Codigo = id;
        var tr = $(this).closest('tr');
        var row = $('#tblMainProducts').dataTable().api().row(tr);



        if (row.child.isShown()) {
            // Si la fila hija está visible, ocultarla
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Si no, mostrar la fila hija
            row.child(format(Codigo)).show();
            //row.child(format(2)).show();
            tr.addClass('shown');
        }
        function format(data) {
            return '<a class="btn btn-default btn-xs" title="Añadir" href="javascript:registroInstalacionTec.añadirTecnico(' + data + ')"><i class="fa fa-plus" aria-hidden="true"></i> Asignar Técnico</a>&nbsp;';
        };
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
    function añadirTecnico(codigo) {
        BuscarTecnicos();
        limpiarAsignacionTecnicos();
        $txtNombreTecnico.prop('disabled', true);
        $txtApellidoPaternoTec.prop('disabled', true);
        $txtApellidoMaternoTec.prop('disabled', true);
        $txtNumDocumento.prop('disabled', true);
        $txtTelefono.prop('disabled', true);
        $txtCorreo.prop('disabled', true);
        $txtZona.prop('disabled', true);
        $cmbTipoCredencial.prop('disabled', true);
        $modalAsignacion.modal('toggle');
        $hdnIdProduct.val(codigo);
    };

    function BuscarTecnicos() {
        var method = "POST";
        var url = "BandejaInstalacionTecnica/ObtenerTecnico"
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
            limpiarAsignacionTecnicos();
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
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Documento.Descripcion",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "NombresCompletosEmpleado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "TelefonoEmpleado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "EmailEmpleado",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
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
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "CodigoEmpleado",
                render: function (data, type, row) {
                    var seleccionar = '<a id="btnSeleccionarTecnico" class="btn btn-default btn-xs" title="Seleccionar" href="javascript: registroInstalacionTec.seleccionarTecnico(' + data + ')"><i class="fa fa-level-down" aria-hidden="true"></i> Seleccionar</a>';
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

        app.llenarTabla($tblTecnicos, data, columns, columnDefs, "#tblTecnicos");
    }
    function seleccionarTecnico(codigo) {
        var method = "POST";
        var url = "BandejaInstalacionTecnica/ObtenerTecnico"

        var objTecnico = {
            CodigoEmpleado: codigo,
            NombreEmpleado: "",
            ApellidoPaternoEmpleado: "",
            ApellidoMaternoEmpleado: "",
            CodigoCargo: 8,//-->8 es Técnico
            TipoDocumento: "",
            TipoEmpleado: "",
            NumeroDocumento: "",
            Estado: 1,
            FechaInicio: "",
            FechaFinal: ""
        };

        var objParam = JSON.stringify(objTecnico);

        var fnDoneCallBack = function (data) {
            $hdnIdTecnico.val(data.Result[0].CodigoEmpleado);
            $txtNombreTecnico.val(data.Result[0].NombresEmpleado);
            $txtApellidoPaternoTec.val(data.Result[0].ApellidoPaternoEmpleado);
            $txtApellidoMaternoTec.val(data.Result[0].ApellidoMaternoEmpleado);
            $txtNumDocumento.val(data.Result[0].NumeroDocumento);
            $txtTelefono.val(data.Result[0].TelefonoEmpleado);
            $txtCorreo.val(data.Result[0].EmailEmpleado);
            $txtZona.val(data.Result[0].LugarLaboral.NombreDepartamento + ' / ' + data.Result[0].LugarLaboral.NombreProvincia + ' / ' + data.Result[0].LugarLaboral.NombreDistrito);
            $hdnTipoEmpleado.val(data.Result[0].CodigoTipoEmpleado);
            $txtTipoTecnico.val(data.Result[0].TipoEmpleado);
            $cmbTipoCredencial.val(data.Result[0].Documento.Parametro).trigger("change.select2");

        };

        var fnFailCallBack = function () {
            app.message.error("Validación","Error en la búsqueda de técnicos. ")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);

        $modalBusquedaTecnico.modal('toggle');
    };
    function DesasignarTécnicoTmp(id) {

        var id = id.toString();

        var method = "POST";
        var url = "BandejaInstalacionTecnica/MantTecnicoxDetalle";
        var objTecnico = {
            TipoProceso: "D"
            , Id: id
            , Id_Detalle: ""
            , Cod_Tecnico: ""
            , NombreTecnico: ""
            , Documento: ""
            , TipDocumento: ""
            , Correo: ""
            , Telefono: ""
            , Zona: ""
            , TipoTecnico: ""
            , Estado: 0
        }

        var objParam = JSON.stringify(objTecnico);

        var fnSi = function () {

            var fnDoneCallBack = function () {
                app.message.success("Éxito", "Se realizó la des-asignación con éxito.");
                obtenerDetalleInstalacion();
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Se produjo un error al realizar la des-asignación del técnico a la instalación, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Instalación Técnica", "¿Está seguro(a) que desea des-asignar al técnico de la instalación de este producto?", "Si", "No", fnSi, null);
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

    function EditarRequerimiento() {
        var btnEditr = document.getElementById("btnEditarReq");
        var btnRegresar = document.getElementById("btnRegresar");
        if (btnEditr != null) {
            $cmbDestino.prop("disabled", false);
            $dateSolicitud.prop("disabled", false);
            btnEditr.innerHTML = '<i class="fa fa-wrench" aria-hidden="true"></i> Actualizar';
            btnRegresar.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancelar'
            btnEditr.id = 'btnActualizar';
            btnRegresar.id = 'btnCancelarReq';
        }
        else {
            actualizarRequerimiento()
        }
    };

    function actualizarRequerimiento() {

        if ($txtSolVenta.val() == "" || $txtSolVenta.val() == null || isNaN($txtSolVenta.val()) || $txtSolVenta.val().trim().length == 0) {
            app.message.error("Validación", "Debe de seleccionar la solicitud de venta.")
            return;
        };
        if ($txtEmpresa.val() == "" || $txtEmpresa.val() == null || $txtEmpresa.val().trim().length == 0) {
            app.message.error("Validación", "El nombre de empresa está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtTipVenta.val() == "" || $txtTipVenta.val() == null || $txtTipVenta.val().trim().length == 0) {
            app.message.error("Validación", "El campo tipo de venta está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtRuc.val() == "" || $txtRuc.val() == null || isNaN($txtRuc.val()) || $txtRuc.val().trim().length == 0) {
            app.message.error("Validación", "El campo RUC está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtNomEmpresa.val() == "" || $txtNomEmpresa.val() == null || $txtNomEmpresa.val().trim().length == 0) {
            app.message.error("Validación", "El campo Empresa está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtUbigeo.val() == "" || $txtUbigeo.val() == null || $txtUbigeo.val().trim().length == 0) {
            app.message.error("Validación", "El campo del Ubigeo está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if (destinos_select == null) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un destino.")
            return;
        };
        if (destinos_select.length == 0 || destinos_select == null) {
            app.message.error("Validación", "Debe de seleccionar por lo menos un destino.")
            return;
        };
        if ($dateSolicitud.val() == "" || $dateSolicitud.val() == null || $dateSolicitud.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar la fecha máxima de la solicitud.")
            return;
        };

        var requerimiento = $numeroReq.val()
        var method = "POST";
        var url = "BandejaInstalacionTecnica/MantInstalacion";

        var objReq = {
            TipoProceso: "U",
            NumReq: $numeroReq.val(),
            FechaMax: $dateSolicitud.val(),
            Destino: destinos_select.toString(),
            Estado: $estadoReq.val(),
            OrdenCompra:$txtOrdCompra.val(),
            NumProceso: $txtProceso.val(),
            Contrato: $txtContrato.val()
        };

        var objParam = JSON.stringify(objReq);

        var fnSi = function () {
            var fnDoneCallBack = function (data) {

                $cmbDestino.prop('disabled', true);
                $dateSolicitud.prop('disabled', true);

                var fnSiComent = function () {
                    $modalObservacionClick()
                    $numeroReq.val(data.Result.Codigo);
                    cargarDatos();
                };

                var fnNo = function () {
                    $numeroReq.val(data.Result.Codigo);
                    cargarDatos();
                };
                app.message.confirm("Éxito", "Se realizó la actualización satisfactoriamente, ¿Desea agregar un comentario?.", "Sí", "No", fnSiComent, fnNo);
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Ocurrió un error al realizar la actualización del requerimiento, por favor revisar.");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        };
        return app.message.confirm("Confirmación", "¿Desea grabar los cambios realizados en el requerimiento?", "Sí", "No", fnSi, null);
    }

    function cambiarEstadoProceso() {
        var validador = 0;

        for (var i = 0; i < productos.length; i++) {
            if (productos[i].Tecnicos.length > 0) {
                validador = 1;
            };
        };

        var fechasProgramacion = document.querySelectorAll(".dateFechaProgramacion");

        console.log(fechasProgramacion);


        if (validador == 0) {
            app.message.error("Validación", "Debe de asignar por lo menos un técnico a un producto.");
            return;
        };

        if ($estadoReq.val() == "STREG") {
            var method = "POST";
            var url = "BandejaInstalacionTecnica/MantInstalacion";

            var objReq = {
                TipoProceso: "U",
                NumReq: $numeroReq.val(),
                FechaMax: $dateSolicitud.val(),
                Destino: destinos_select.toString(),
                Estado: "STEPI",
                OrdenCompra: $txtOrdCompra.val(),
                NumProceso: $txtProceso.val(),
                Contrato: $txtContrato.val()
            };

            var objParam = JSON.stringify(objReq);

            var fnSi = function () {
                var fnDoneCallBack = function () {
                    function redirect() {
                        app.redirectTo("BandejaInstalacionTecnica");
                    }
                    app.message.success("Éxito", "Se realizó el cambio de estado a: En Proceso de Instalación.", "Aceptar", redirect);
                };
                var fnFailCallBack = function () {
                    app.message.error("Validación", "Se presentó un problema al realizar el cambio de estado, por favor revisar.");
                };
                app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
            }
            return app.message.confirm("Confirmación", "¿Desea realizar el cambio de estado a: En proceso de Instalación. ?", "Si", "No", fnSi, null);
        };
    };
    function CerrarRequerimiento() {
        var requerimiento = $numeroReq.val()
        var method = "POST";
        var url = "";

        var objReq = {

        };
    }

    return {
        //visualizar: visualizar,
        eliminarObsTmp: eliminarObsTmp,
        eliminarDocTemp: eliminarDocTemp,
        eliminarDocumento: eliminarDocumento,
        download: download,
        seleccionarSolicitud: seleccionarSolicitud,
        seleccionarTecnico: seleccionarTecnico,
        //asignarTecnico: asignarTecnico,
        detalleHijo: detalleHijo,
        añadirTecnico: añadirTecnico,
        DesasignarTécnicoTmp: DesasignarTécnicoTmp

    }
})(window.jQuery, window, document);