var manipularServicio = (function ($, win, doc) {
    var $cmbTipoServicio = $("#cmbTipoServicio");
    var $txtEquipo = $("#txtEquipo");
    var $txtMarca = $("#txtMarca");
    var $txtModelo = $("#txtModelo");
    var $cmbEstado = $("#cmbEstado");
    var $txtPrecioPreventivo = $("#txtPrecioPreventivo");
    var $txtPrecioCapacitacion = $("#txtPrecioCapacitacion");
    var $txtPrecioAct = $("#txtPrecioAct");
    var $txtInstrumentos = $("#txtInstrumentos")
    var $txtHerramientas = $("#txtHerramientas");
    var $txtHerramientasEspeciales = $("#txtHerramientasEspeciales");
    var $btnGuardarDetalleServicio = $("#btnGuardarDetalleServicio");
    var $btnGuardar = $("#btnGuardar");
    var $btnCancelar = $("#btnCancelar");
    var $txtDetalleServicio = $("#txtDetalleServicio");
    var $tblDetalleServicio = $('#tblDetalleServicio');
    var $NoExisteReg = $('#NoExisteReg');
    var $modalDetalleServicio = $('#modalDetalleServicio');
    var $txtTipoIngreso = $('#txtTipoIngreso');
    var $txtCodigoServicio = $('#txtCodigoServicio');
    var $btnActualizar = $('#btnActualizar');
    var $btnActualizarDetalleServicio = $('#btnActualizarDetalleServicio');
    var $hdnIdDetalleServicio = $('#hdnIdDetalleServicio');

    var $btnAbrirModalServicio = $("#btnAbrirModalServicio");
    var mensajes = {
        registrandoServicio: "Registrando Servicio por favor espere...",
        registrandoActividad: "Registrando Actividad, porfavor espere...",
        obtenerDetalleServicio: "Obteniendo Detalle,por favor espere..."
    }

    var detalleServicios = [];
    var contadorDetalle = 0;
    $(Initializer)
    function Initializer() {
        CargarCombos();
        Promise.all([cargarEstados()]).then(() => {
            if ($txtTipoIngreso.val() == "") {
                $cmbEstado.val("1").trigger("change.select2");
            }
        }).catch((error) => {
            app.message.error("Error", "No se cargaron los datos de listados de la bandeja.");
        });

        $btnGuardar.click(btnGuardarClick);
        $btnCancelar.click(btnCancelarClick);
        $txtPrecioAct.on('change', function () {
            if (isNaN(this.value) || this.value.trim().length == 0) {
                app.message.error("Validación", "El Precio Actualización debe ser un número de 2 decimales.")
                $txtPrecioAct.val(0);
            };
        });
        $txtPrecioPreventivo.on('change', function () {
            if (isNaN(this.value) || this.value.trim().length == 0) {
                app.message.error("Validación", "El Precio Preventivo debe ser un número de 2 decimales.")
                $txtPrecioPreventivo.val(0);
            };
        });
        $txtPrecioCapacitacion.on('change', function () {
            if (isNaN(this.value) || this.value.trim().length == 0) {
                app.message.error("Validación", "El Precio Capacitación debe ser un número de 2 decimales.")
                $txtPrecioCapacitacion.val(0);
            };
        });
        $btnAbrirModalServicio.click(btnAbrirModalDetalle);
        $btnGuardarDetalleServicio.click(GuardarDetalleServicio);
        $btnActualizar.click(ActualizarServicio);
        $btnActualizarDetalleServicio.click(ActualizarDetalleServicio);
        cargarDatos();
    };

    function cargarEstados() {
        var method = "POST";
        var url = "Utiles/ListarEstados";
        var objParam = "";

        var fnDoneCallback = function (data) {
            var filters = {};
            filters.placeholder = "-- Seleccionar --";
            filters.allowClear = false;
            app.llenarComboMultiResult($cmbEstado, data.Result, null, "", "--Seleccionar--", filters);
        };
        return app.llamarAjax(method, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoEstados);
    };

    function CargarCombos() {
        method = "POST";
        url = "BandejaServicios/FiltroServicios"
        obj = []
        opjParam = JSON.stringify(obj);

        var fnDoneCallBack = function (data) {
            var filters = {};
            filters.placeholder = "--Seleccionar--";
            filters.allowClear = false;
            //app.llenarComboMultiResult($cmbEquipo, data.Result.Equipos, null, 0, "--Seleccionar--", filters);
            app.llenarComboMultiResult($cmbTipoServicio, data.Result.TipServicio, null, 0, "--Seleccionar--", filters);

        };
        var fnFailCallBack = function () {
            app.message.error("Sistema", "Ocurrió un error al realizar la carga de los filtros");
        };

        app.llamarAjax(method, url, opjParam, fnDoneCallBack, fnFailCallBack, null, mensajes.ObteniendoFiltros);
    };
    function GuardarDetalleServicio() {
        if ($txtDetalleServicio.val().trim() === "" || $txtDetalleServicio.val().trim().length == 0) {
            app.message.error("Validación", "Debe ingresar una descripción del detalle de una actividad ");
            return;
        };

        var detalleServicio = $txtDetalleServicio.val().trim();

        var fnSi = function () {
            if ($txtTipoIngreso.val() == 'U') {
                method = "POST";
                url = "BandejaServicios/MantenimientoDetalleServicio";
                objDetalle = {
                    TipoProceso: "I",
                    Id_Servicio : $txtCodigoServicio.val(),
                    DesMantenimiento: detalleServicio,
                    Eliminar : 0
                };

                var fnDoneCallBack = function (data) {
                    var detalleServicio = $txtDetalleServicio.val().trim();
                    objDetalle = {
                        Id: data.Result.Codigo,
                        DesMantenimiento: $txtDetalleServicio.val().trim(),
                        Eliminar: 0
                    };
                    detalleServicios.push(objDetalle);
                    cargarTablaDetalle(detalleServicios);
                    $txtDetalleServicio.val("");
                    $modalDetalleServicio.modal('toggle');

                    var fnSiSer = function () {
                        $modalDetalleServicio.modal('toggle');
                    }
                    return app.message.confirm("Se registró con éxito", "Desea agregar una actividad adicional?", "Si", "No", fnSiSer, null);
                };

                var fnFailCallback = function () {
                    app.message.error("Validación","Error en la inserción del detalle. ")
                };

                objParam = JSON.stringify(objDetalle);

                app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallback,null,null);
            }
            else {
                contadorDetalle += 1;
                objDetalle = {
                    Id: contadorDetalle,
                    DesMantenimiento: detalleServicio,
                    Eliminar: 0
                };
                detalleServicios.push(objDetalle); //insertamos el detalle ingresado.
                cargarTablaDetalle(detalleServicios);
                $txtDetalleServicio.val("");
                $modalDetalleServicio.modal('toggle');

                var fnSiSer = function () {
                    $modalDetalleServicio.modal('toggle');
                }
                return app.message.confirm("Se registró con éxito", "Desea agregar una actividad adicional?", "Si", "No", fnSiSer, null);
            }
            $NoExisteReg.hide();
            
        }
        return app.message.confirm("Confirmación", "¿Está seguro/a  que desea registrar la actividad?", "Sí", "No", fnSi, null);
    };

    function ActualizarDetalleServicio() {
        method = "POST";
        url = "BandejaServicios/MantenimientoDetalleServicio";
        objDetalle = {
            TipoProceso: "U",
            Id: $hdnIdDetalleServicio.val(),
            Id_Servicio: $txtCodigoServicio.val(),
            DesMantenimiento: $txtDetalleServicio.val(),
            Eliminar: 0 
        }
        objParam = JSON.stringify(objDetalle);

        var fnDoneCallback = function (data) {
            for (var i = 0; i < detalleServicios.length; i++) {
                if (detalleServicios[i].Id == data.Result.Codigo) {
                    detalleServicios[i].DesMantenimiento = $txtDetalleServicio.val();
                };
            };
            $modalDetalleServicio.modal('toggle');
            cargarTablaDetalle(detalleServicios);

        };

        var fnFailCallback = function () {

        };

        app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);
    };
    //function agregarNuevoDetalleServicio() {
    //    var fnreg = function () {
    //        var method = "POST";
    //        var url = "BandejaServicios/MantenimientoDetalleServicio";
    //        var objDetalle = {

    //        }
    //        var fnDoneCallback = function () {
    //            app.redirectTo("BandejaServicios")
    //        }

    //        var fnFailCallback = function () {

    //        }
    //        var data = JSON.stringify(objDetalle);
    //        return app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, mensajes.registrandoServicio);
    //    }
    //    return app.message.confirm("Guardar", "¿Está seguro/a de guardar el detalle del servicio?", "Sí", "No", fnreg, null);
    //}
    function btnAbrirModalDetalle() {
        $txtDetalleServicio.val("");
        $hdnIdDetalleServicio.val("");
        $btnGuardarDetalleServicio.css('display', 'inline-block');
        $btnActualizarDetalleServicio.css('display', 'none');
    }
    function btnGuardarClick() {

        if ($cmbTipoServicio.val() == 0 || $cmbTipoServicio.val() === null || $cmbTipoServicio.val() == "") {
            app.message.error("Validación", "Debe de seleccionar un tipo de servicio");
            return; 
        }

        if ($txtEquipo.val() == 0 || $txtEquipo.val() === null || $txtEquipo.val() == "" || $txtEquipo.val().trim().length == 0) {
            app.message.error("Validación", "Debe de ingresar un equipo")
            return;
        };

        if ($txtModelo.val().trim().length == 0 || $txtModelo.val() === null || $txtModelo.val() == "") {
            app.message.error("Validación", "Debe de completar el campo Modelo")
            return;
        };

        if ($txtMarca.val().trim().length == 0 || $txtMarca.val() === null || $txtMarca.val() == "") {
            app.message.error("Validación", "Debe de registrar el campo Marca")
            return;
        };

        if (($txtPrecioAct.val() == 0 || $txtPrecioAct.val() == "") && ($txtPrecioPreventivo.val() == 0 || $txtPrecioPreventivo.val() == "") && ($txtPrecioCapacitacion.val() == 0 || $txtPrecioCapacitacion.val() == "")) {
            app.message.error("Validación", "Debe de registrar por lo menos un precio.");
            return;
        }

        if ($cmbEstado.val() == null || $cmbEstado.val() == "") {
            app.message.error("Validación", "Estado incorrecto.");
            return;
        };

        if (detalleServicios.length == 0) {
            app.message.error("Validación", "Debe de registrar el detalle de servicio");
            return;
        };

        if ($txtInstrumentos.val().trim().length == 0 && $txtInstrumentos.val() != "") {
            app.message.error("Validación", "No puede ingresar datos en blanco en el campo de instrumentos.")
            return;
        };

        if ($txtHerramientas.val().trim().length == 0 && $txtHerramientas.val() != "") {
            app.message.error("Validación","No puede ingresar datos en blanco en el campo herramientas.")
            return;
        };

        if ($txtHerramientasEspeciales.val().trim().length == 0 && $txtHerramientasEspeciales.val() != "") {
            app.message.error("Validación","No puede ingresar datos en blanco en el campo herramientas especiales.")
            return;
        };

        var fnSi = function () {
            var method = "POST";
            var url = "BandejaServicios/RegistraServiciosMain";

            var objServicio = {
                CabeceraServicio : {
                    TipoProceso: 'I',
                    CodigoServicio: 0,
                    Equipo: $txtEquipo.val(),
                   //CodEquipo: $cmbEquipo.val(),
                    Modelo: $txtModelo.val(),
                    Marca: $txtMarca.val(),
                    Estado: $cmbEstado.val(),
                    TipoServicio: $cmbTipoServicio.val(),
                    PrecioPreventivo: $txtPrecioPreventivo.val(),
                    PrecioCapacitacion: $txtPrecioCapacitacion.val(),
                    PrecioActualizacion: $txtPrecioAct.val(),
                    Herramientas: $txtHerramientas.val(),
                    HerramientasEspeciales: $txtHerramientasEspeciales.val(),
                    Instrumentos: $txtInstrumentos.val()
                },
                servicios : detalleServicios
            };

            var objParam = JSON.stringify(objServicio);
            function redirectTo() {
                app.redirectTo("BandejaServicios");
            };

            var fnDoneCallback = function (data) {
                app.message.confirm("Confirmación", "Se realizó el registro del servicio exitosamente", "Aceptar", redirectTo);
            };
            var fnFailCallback = function (data) {
                app.message.error("Validación", data.Mensaje);
            };
            return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.registrandoActividad)
        }
        return app.message.confirm("Guardar", "¿Está seguro/a de guardar los cambios?", "Sí", "No", fnSi, null);
    }

    function btnCancelarClick() {
        var fncn = function () {
            app.redirectTo("BandejaServicios")
        }
        return app.message.confirm("Guardar", "¿Está seguro/a de regresar a la bandeja, se perderán los cambios no guardados?", "Sí", "No", fncn, null);
    }

    function eliminarDetalleServicioTemp(Id) {
        detalleServicios = detalleServicios.filter(detalle => detalle.Id != Id);
        cargarTablaDetalle(detalleServicios);
        
    };

    function eliminarDetalleServicio(id) {
        method = "POST";
        url = "BandejaServicios/MantenimientoDetalleServicio";

        objEliminar = {
            TipoProceso: "D",
            Id: id,
            Id_Servicio: $txtCodigoServicio.val(),
            DesMantenimiento: ''
        };

        objParam = JSON.stringify(objEliminar);
        
        var fnDoneCallBack = function () {
            app.message.success("Registro de Servicio", "Se eliminó correctamente el servicio");
            eliminarDetalleServicioTemp(id)
        };

        var fnFailCallBack = function () {
            app.message.error("Error","Error al realizar la eliminación del detalle")
        };

        app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
    };
    function cargarTablaDetalle(detalle) {
        $('#tblDetalleServicio tbody').empty();

        for (var i = 0; i < detalle.length; i++) {
            var indice = i + 1 
            var nuevoTr = '<tr id="rowDetalle">' +
                '<td><center>' + indice + '</center></td>' +
                '<td><center>' + detalle[i].DesMantenimiento + '</center></td>';
            if ($txtTipoIngreso.val() == "") {
                nuevoTr += '<td><center><a class="btn btn-primary btn-xs" href="javascript: manipularServicio.eliminarDetalleServicioTemp(' + detalle[i].Id + ')"><i class="fa fa-trash"></i></a></center></td>';
            } else if ($txtTipoIngreso.val() == "U") {
                var editar ='<a class="btn btn-default btn-xs" href="javascript: manipularServicio.editarDetalleServicio(' + detalle[i].Id + ')" btn-xs"><i class="fa fa-pencil"></i></a>';
                nuevoTr += '<td><center>' + editar +' '+'<a class="btn btn-primary btn-xs" href="javascript: manipularServicio.eliminarDetalleServicio(' + detalle[i].Id + ')" btn-xs"><i class="fa fa-trash"></i></a></center></td>';
            }
            nuevoTr += '</tr>';
            $tblDetalleServicio.append(nuevoTr);
        };

        if (detalleServicios.length == 0) {
            var nuevoTr = '<tr id="rowDetalle">' +
            '<td colspan=8><center>No existen registros</center></td>'
                '</tr>';

                $tblDetalleServicio.append(nuevoTr);
        };
    };

    function editarDetalleServicio(Id) {
        $modalDetalleServicio.modal('toggle');
        $btnGuardarDetalleServicio.css('display', 'none');
        $btnActualizarDetalleServicio.css('display', 'inline-block');

        var detalle = detalleServicios.find(detail => detail.Id == Id);
        $hdnIdDetalleServicio.val(Id);
        $txtDetalleServicio.val(detalle.DesMantenimiento);
    };

    function ActualizarServicio() {
        if ($txtTipoIngreso.val() == 'U') {
            if ($cmbTipoServicio.val() == 0 || $cmbTipoServicio.val() === null || $cmbTipoServicio.val() == "") {
                app.message.error("Validación", "Debe de seleccionar un tipo de servicio");
                return;
            }

            if ($txtEquipo.val() == 0 || $txtEquipo.val() === null || $txtEquipo.val() == "" || $txtEquipo.val().trim().length == 0) {
                app.message.error("Validación", "Debe de ingresar un equipo")
                return;
            };

            if ($txtModelo.val().trim().length == 0 || $txtModelo.val() === null || $txtModelo.val() == "") {
                app.message.error("Validación", "Debe de completar el campo Modelo")
                return;
            };

            if ($txtMarca.val().trim().length == 0 || $txtMarca.val() === null || $txtMarca.val() == "") {
                app.message.error("Validación", "Debe de registrar el campo Marca")
                return;
            };

            if (($txtPrecioAct.val() == 0 || $txtPrecioAct.val() == "") && ($txtPrecioPreventivo.val() == 0 || $txtPrecioPreventivo.val() == "") && ($txtPrecioCapacitacion.val() == 0 || $txtPrecioCapacitacion.val() == "")) {
                app.message.error("Validación", "Debe de registrar por lo menos un precio.");
                return;
            }

            if ($cmbEstado.val() == null || $cmbEstado.val() == "") {
                app.message.error("Validación", "Estado incorrecto.");
                return;
            };

            if (detalleServicios.length == 0) {
                app.message.error("Validación", "Debe de registrar el detalle de servicio");
                return;
            };

            if ($txtInstrumentos.val().trim().length == 0 && $txtInstrumentos.val() != "") {
                app.message.error("Validación", "No puede ingresar datos en blanco en el campo de instrumentos.")
                return;
            };

            if ($txtHerramientas.val().trim().length == 0 && $txtHerramientas.val() != "") {
                app.message.error("Validación", "No puede ingresar datos en blanco en el campo herramientas.")
                return;
            };

            if ($txtHerramientasEspeciales.val().trim().length == 0 && $txtHerramientasEspeciales.val() != "") {
                app.message.error("Validación", "No puede ingresar datos en blanco en el campo herramientas especiales.")
                return;
            };

            var fnSi = function () {
                var method = "POST";
                var url = "BandejaServicios/MantenimientoServicios";

                var objServicio = {
                        TipoProceso: 'U',
                        CodigoServicio: $txtCodigoServicio.val(),
                        Equipo:$txtEquipo.val(),
                        //CodEquipo: $cmbEquipo.val(),
                        Modelo: $txtModelo.val(),
                        Marca: $txtMarca.val(),
                        Estado: $cmbEstado.val(),
                        TipoServicio: $cmbTipoServicio.val(),
                        PrecioPreventivo: $txtPrecioPreventivo.val(),
                        PrecioCapacitacion: $txtPrecioCapacitacion.val(),
                        PrecioActualizacion: $txtPrecioAct.val(),
                        Instrumentos: $txtInstrumentos.val(),
                        Herramientas: $txtHerramientas.val(),
                        HerramientasEspeciales: $txtHerramientasEspeciales.val()
                };

                var objParam = JSON.stringify(objServicio);
                function redirectTo() {
                    app.redirectTo("BandejaServicios");
                };

                var fnDoneCallback = function (data) {
                    app.message.confirm("Confirmación", "Se realizó la actualización del servicio exitosamente", "Aceptar", redirectTo);
                };
                var fnFailCallback = function (data) {
                    app.message.error("Validación", data.Mensaje);
                };
                return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.registrandoActividad)
            }
            return app.message.confirm("Guardar", "¿Está seguro/a de guardar los cambios?", "Sí", "No", fnSi, null);
        };
    };

    function cargarDatos() {

        if ($txtTipoIngreso.val() != "") {
            method = "POST";
            url = "BandejaServicios/GetFullService?CodServicio="+$txtCodigoServicio.val();

            var fnDoneCallBack = function (data) {
                $cmbTipoServicio.val(data.Result.CabeceraServicio.CodTipoServicio).trigger("change.select2");
                $txtEquipo.val(data.Result.CabeceraServicio.Equipo);
                $txtModelo.val(data.Result.CabeceraServicio.Modelo);
                $txtMarca.val(data.Result.CabeceraServicio.Marca);
                $txtPrecioAct.val(data.Result.CabeceraServicio.PrecioActualizacion);
                $txtPrecioPreventivo.val(data.Result.CabeceraServicio.PrecioPreventivo);
                $txtPrecioCapacitacion.val(data.Result.CabeceraServicio.PrecioCapacitacion);
                $cmbEstado.val(data.Result.CabeceraServicio.Estado).trigger("change.select2");
                $txtInstrumentos.val(data.Result.CabeceraServicio.Instrumentos).trigger("change.select2");
                $txtHerramientas.val(data.Result.CabeceraServicio.Herramientas).trigger("change.select2");
                $txtHerramientasEspeciales.val(data.Result.CabeceraServicio.HerramientasEspeciales).trigger("change.select2");

                detalleServicios = data.Result.servicios;
                contadorDetalle = data.Result.servicios.length;
                cargarTablaDetalle(detalleServicios)
            };

            var fnFailCallBack = function (data) {
                app.message.error("Validación","Error al cargar los datos. ")
            };

            app.llamarAjax(method,url, null, fnDoneCallBack, fnFailCallBack, null, mensajes.obtenerDetalleServicio)
        };

    };
    return {
        eliminarDetalleServicioTemp: eliminarDetalleServicioTemp,
        eliminarDetalleServicio: eliminarDetalleServicio,
        editarDetalleServicio: editarDetalleServicio
    };
})(window.jQuery, window, document);