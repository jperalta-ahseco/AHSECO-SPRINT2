var registroInstalacionTec = (function ($, win, doc) {
    var $btnAgregarObservacion = $('#btnAgregarObservacion');
    var $nombreusuario = $('#nombreusuario');
    var $numeroReq = $('#numeroReq');
    var $perfilnombre = $('#perfilnombre');
    var $codigoWorkflow = $('#codigoWorkflow');
    var $estadoReq = $('#estadoReq');
    var $btnRegresar = $('#btnRegresar');
    var $lblUsuarioCreacionObservacion = $('#lblUsuarioCreacionObservacion');
    var $lblFechaCreacionObservacion = $('#lblFechaCreacionObservacion');
    var $btnRegistrarReq = $('#btnRegistrarReq');
    var $txtSolVenta = $('#txtSolVenta');
    var $txtEmpresa = $('#txtEmpresa');
    var $txtTipVenta = $('#txtTipVenta');
    var $txtRuc = $('#txtRuc');
    var $txtNomEmpresa = $('#txtNomEmpresa');
    var $txtUbigeo = $('#txtUbigeo');
    var $txtAsesor = $('#txtAsesor');
    var $cmbDestino = $('#cmbDestino');
    var $dateSolicitud = $('#dateSolicitud');
    var $openRegdateSolicitud = $('#openRegdateSolicitud');
    var $tblMainProducts = $('#tblMainProducts');   
    var $hdnIdProduct = $('#hdnIdProduct');
    var $txtOrdCompra = $('#txtOrdCompra');
    var $txtProceso = $('#txtProceso');
    var $txtContrato = $('#txtContrato');
    var $txtFianza = $('#txtFianza');
    var $hdnCodEmpresa = $('#hdnCodEmpresa');
    var $hdnCodTipVenta = $('#hdnCodTipVenta');


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
    var $txtDNI = $('#txtDNI');
    var $txtTelefono = $('#txtTelefono');
    var $txtCorreo = $('#txtCorreo');
    var $txtZona = $('#txtZona');

    let productos = [];
    let destinos_select = [];
    let observaciones = [];
    let adjuntos = [];
    function Initializer() {
        ObtenerFiltrosInstalacion();
        Promise.all([ObtenerDepartamentos()]).then(() => {
            if ($estadoReq.val() != "") {
                $cmbDestino.val(destinos_select).trigger("change.select2");
            };
        }).catch((error) => {
            app.message.error("Error", "No se cargaron los datos de listados de la bandeja.");
        });

        //ObtenerDepartamentos();
        $btnRegresar.click(btnRegresarClick);
        $openRegdateSolicitud.click($openRegdateSolicitud_click);
        $dateSolicitud.datepicker({
            viewMode: 0,
            minViewMode: 0,
            format: 'dd/mm/yyyy'
        });
        //$dateSolicitud.datepicker().on("changeDate", changeDateFechaInicialRegFecIni);
        registroInstalacionTec.contadorObservaciones = 0;
        registroInstalacionTec.observaciones = [];
        $btnAgregarObservacion.click($modalObservacionClick);
        $btnGuardarObservacionReq.click(GuardarObservacionReqClick);
        $btnAgregarDocumento.click($modalCargaDocumentoClick);
        $btnCargarDocumento.click($btnCargarDocumento_click);
        $btnRegistrarReq.click(RegistrarRequerimiento);
        $btnBuscarSolicitud.click(BuscarSolicitudes);
        $searchSolVenta.click(BuscarSolicitudes);
        $agregarTecnico.click(AgregarTecnicoExterno);
        $dateSolicitud.val(hoy());
        CargarTipoDocumento(4); //Cambiar a tipo de proceso Instalación Técnica.
    };

    function $openRegdateSolicitud_click() {
        $dateSolicitud.focus();
    };

    function RegistrarRequerimiento() {
        if ($txtSolVenta.val() == "" || $txtSolVenta.val() == null || isNaN($txtSolVenta.val()) || $txtSolVenta.val().trim().length == 0) {
            app.message.error("Validación", "Debe de seleccionar la solicitud de venta.")
            return;
        };
        if ($txtEmpresa.val() == "" || $txtEmpresa.val() == null  || $txtEmpresa.val().trim().length == 0) {
            app.message.error("Validación", "El nombre de empresa está vacío, seleccione nuevamente la solicitud de venta.")
            return;
        };
        if ($txtTipVenta.val() == "" || $txtTipVenta.val() == null  || $txtTipVenta.val().trim().length == 0) {
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
        /*
        if ($txtRuc.val() == "" || $txtRuc.val() == null || isNaN($txtRuc.val()) || $txtRuc.val().trim().length == 0) {

        };
        if ($txtRuc.val() == "" || $txtRuc.val() == null || isNaN($txtRuc.val()) || $txtRuc.val().trim().length == 0) {

        };*/
        var method = "POST";
        var url = "BandejaInstalacionTecnica/RegistroRequerimientoMain"
        var objGrupo = {
            CabeceraInstalacion: {
                TipoProceso: "I"
                , NumReq : 0
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


        function redirect() {
            app.redirectTo("BandejaInstalacionTecnica");
        }

        var fnSi = function () {
            var fnDoneCallBack = function (data) {
                app.message.success("Registro Realizado", "Se realizó el registro satisfactoriamente.", "Aceptar", redirect);
            };

            var fnFailCallBack = function () {
                app.message.error("Validación", "Error al realizar el registro del requerimiento");
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, mensajes.RegistrarRequerimiento);
        }
        return app.message.confirm("Instalación Técnica", "¿Esta seguro que desea registrar el requerimiento?", "Si", "No", fnSi, null);
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
            cargarBandejaProductos(data.Result.DetalleCotizacion);
            $modalSolicitud.modal('toggle');
            $cmbDestino.prop('disabled', false);
            $dateSolicitud.prop('disabled', false);



        };

        var fnFailCallBack = function () {
            app.message.error("Validación", "Error al obtener el detalle de la solicitud");
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null)
    };

    function cargarCabecera(solicitud) {
        $hdnCodEmpresa.val(solicitud.Cod_Empresa);
        $txtSolVenta.val(solicitud.Id_Solicitud);
        $txtEmpresa.val(solicitud.Nom_Empresa);
        $txtTipVenta.val(solicitud.nomFlujo);
        $hdnCodTipVenta.val(solicitud.Id_Flujo);
        $txtRuc.val(solicitud.RUC);
        $txtNomEmpresa.val(solicitud.RazonSocial);
        $txtUbigeo.val(solicitud.Ubigeo);
        $txtAsesor.val(solicitud.AsesorVenta);
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

    function cargarBandejaProductos(detalleProductos) {
        var data = {}
        data.Result = [];
        data.Result = detalleProductos;
        var columns = [
            {
                data: "Id",
                render: function (data, type, row) {
                    return '<center>' + data + '</center>'
                }
            },
            {
                data: "Descripcion",
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
                    return '<center>' + "Modelo" + '</center>'
                }
            },
            {
                data: "Serie",
                render: function (data, type, row) {
                    return '<center>' + "Serie" + '</center>'
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
                    return '<center>' + "CantidadPrev" + '</center>'
                }
            },
            {
                data: "Periodicidad",
                render: function (data, type, row) {
                    return '<center>' + "Periodicidad" + '</center>'
                }
            },
            {
                data: "Garantia",
                render: function (data, type, row) {
                    return '<center>' + "Garantia" + '</center>'
                }
            },
            {
                data: "NumFianza",
                render: function (data, type, row) {
                    return '<center>' + "NumFianza" + '</center>'
                }
            }
        ];

        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];


        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            //function visualizar() {
            //    console.log("hola");
            //};

            $(row).attr('id', 'row' + index);
            //$(row).attr('onclick', 'visualizar()');
        };

        app.llenarTabla($tblMainProducts, data, columns, columnDefs, "#tblMainProducts", rowCallback);
    };

    function AgregarTecnicoExterno() {
        $txtNombreTecnico.prop('disabled',false)
        $txtDNI.prop('disabled',false)
        $txtTelefono.prop('disabled',false)
        $txtCorreo.prop('disabled',false)
        $txtZona.prop('disabled',false)
    };
    function asignarTecnico(id) {
        $modalAsignacion.modal('toggle');
        $hdnIdProduct.val(id);
    };
    function ObtenerFiltrosInstalacion() {
        method = "POST";
        url = "BandejaInstalacionTecnica/ObtenerFiltrosInstalacion"

        var fnDoneCallBack = function (data) {
            //Cargar combo de empresas:
            var filters = {};
            filters.placeholder = "-- Todos --";
            filters.allowClear = false;

            app.llenarComboMultiResult($cmbClienteSol, data.Result.Clientes, null, 0, "--Todos--", filters);
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

                if ($numeroSolicitud.val() != "") {

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
                Estado_Instancia: $estadoSol.val()
            };

            var objParamObs = JSON.stringify(objObservacion);

            var fnDoneCallBack = function () {
                app.message.success("Ventas", "Se realizó el registro de la observación correctamente.");

                registroInstalacionTec.contadorObservaciones += 1;

                registroInstalacionTec.observaciones.push(
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

            registroInstalacionTec.observaciones.push({
                //Id_WorkFlow: $codigoWorkflow.val(),
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

            registroInstalacionTec.contadorObservaciones -= 1

            registroInstalacionTec.observaciones = registroInstalacionTec.observaciones.filter(observacion => observacion.Id !== Number(idObs));

            $("#row" + idObs).remove();

            if (registroInstalacionTec.contadorObservaciones == 0) {
                $NoExisteRegObs.show();
            };

        }
        return app.message.confirm("Confirmación", "Está seguro que desea eliminar esta observación?", "Si", "No", fnSi, null);

    };

    function eliminarDocumento(idDocumento) {
        if ($numeroSolicitud.val() != "") {
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
                return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.guardarNuevoViatico);
            };
            return app.message.confirm("Solicitud de Venta", "¿Está seguro que desea eliminar el documento adjunto?", "Sí", "No", fnSi, null);
        };
    };

    function download(IdDocumento) {

        var documento = adjuntos.find(documento => documento.CodigoDocumento == IdDocumento);

        var ruta = documento.RutaDocumento;

        var nombre = documento.NombreDocumento;

        app.abrirVentana("BandejaSolicitudesVentas/DescargarFile?url=" + ruta + "&nombreDoc=" + nombre);
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
                    return '<center>' + data + '</center>';
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
        /*
        var rowCallback = function (row, data, index) {
            // Asignar un ID único basado en el índice de datos o algún identificador único
            $(row).attr('id', 'row' + data.IdContacto);
        };*/

        app.llenarTabla($tblSolicitudes, data, columns, columnDefs, "#tblSolicitudes", null);
    };


    return {
        //visualizar: visualizar,
        eliminarObsTmp: eliminarObsTmp,
        eliminarDocumento: eliminarDocumento,
        download: download,
        seleccionarSolicitud: seleccionarSolicitud,
        asignarTecnico: asignarTecnico

    }
})(window.jQuery, window, document);