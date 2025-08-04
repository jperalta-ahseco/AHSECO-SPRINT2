var manipularServicio = (function ($, win, doc) {
    var $txttiposervicio = $('#txttiposervicio');
    var $txtcodestado = $('#txtcodestado');
    var $cmbTipoServicio = $("#cmbTipoServicio");
    var $txtEquipo = $("#txtEquipo");
    var $txtMarca = $("#txtMarca");
    var $txtModelo = $("#txtModelo");
    var $cmbEstado = $("#cmbEstado");
    var $txtPrecio = $("#txtPrecio");

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
    var $btnCerrarDetalleServicio = $('#btnCerrarDetalleServicio');

    var $navDetalle = $("#navDetalle");
    var $tabsDetalle = $("#tabsDetalle");
   
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
        //CargarCombos();
        CargarCombos();
        $btnGuardar.click(btnGuardarClick);
        $btnCancelar.click(btnCancelarClick);
        $btnAbrirModalServicio.click(btnAbrirModalDetalle);
        $btnGuardarDetalleServicio.click(GuardarDetalleServicio);
        $btnActualizar.click(ActualizarServicio);
        $btnActualizarDetalleServicio.click(ActualizarDetalleServicio);
        $btnCerrarDetalleServicio.click(CerrarModalDetalleServicio);
        $cmbTipoServicio.on("change", changeTipoServicio);
        cargarDatos();
    };

    function changeTipoServicio() {
        var tipo = $cmbTipoServicio.val();
        if (tipo == "SERV06" || tipo == "SERV07") {
            $navDetalle.show();
            $tabsDetalle.show();
        }
        else {
            $navDetalle.hide();
            $tabsDetalle.hide();

            $txtInstrumentos.val("");
            $txtHerramientas.val("");
            $txtHerramientasEspeciales.val("");
            detalleServicios = [];
            contadorDetalle = 0;

            
            $("tr[name='rowDetalle']").each(function (index, element) {
                $("tr[name='rowDetalle']").remove();
            });

            if (detalleServicios.length == 0) {
                var nuevoTr = '<tr id="rowDetalle" name="rowDetalle">' +
                    '<td colspan=8><center>No existen registros</center></td>'
                '</tr>';

                $tblDetalleServicio.append(nuevoTr);
            };
            
        }
    }
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
            if ($txtTipoIngreso.val() != "") {
                app.llenarComboMultiResult($cmbEstado, data.Result.Estados, null, "", "--Seleccionar--", filters);
            }
        };
        var fnFailCallBack = function () {
            app.message.error("Sistema", "Ocurrió un error al realizar la carga de los filtros");
        };

        app.llamarAjax(method, url, opjParam, fnDoneCallBack, fnFailCallBack, null, mensajes.ObteniendoFiltros);
    };

    function CerrarModalDetalleServicio() {
        $modalDetalleServicio.modal('toggle');
        $('.modal-backdrop2').remove();
        $txtDetalleServicio.val("");
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
                    $modalDetalleServicio.hide();
                    $('.modal-backdrop2').remove();
                    var fnSiSer = function () {
                        $modalDetalleServicio.show();
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
                $modalDetalleServicio.hide();
                $('.modal-backdrop2').remove();

                var fnSiSer = function () {
                    $modalDetalleServicio.show();
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

        var fnSi = function () {
            var fnDoneCallback = function (data) {
                var rpta = function () {
                    $modalDetalleServicio.hide();
                    $('.modal-backdrop2').remove();
                };

                for (var i = 0; i < detalleServicios.length; i++) {
                    if (detalleServicios[i].Id == data.Result.Codigo) {
                        detalleServicios[i].DesMantenimiento = $txtDetalleServicio.val();
                    };
                };
                $modalDetalleServicio.modal('toggle');
                app.message.success("Actualización", "Se realizó la actualización con éxito", "Aceptar",rpta);
                cargarTablaDetalle(detalleServicios);
            };
            var fnFailCallback = function () {

            };

            app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, null);
        }
        return app.message.confirm("Confimación", "¿Está seguro de actualizar el detalle?", "Si", "No", fnSi, null);
    };
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
            app.message.error("Validación", "Debe de registrar un equipo")
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

        if ($txtPrecio.val().trim().length == 0 || $txtPrecio.val() === null || $txtPrecio.val() == "") {
            app.message.error("Validación", "Debe ingresar un precio.")
            return;
        }

        if ($txtPrecio.val() == "0" || $txtPrecio.val() == "0.00") {
            app.message.error("Validación", "Debe ingresar un precio mayor a cero.")
            return;
        }

        if ($cmbEstado.val() == null || $cmbEstado.val() == "") {
            app.message.error("Validación", "Estado incorrecto.");
            return;
        };



        if (detalleServicios.length == 0 && ($cmbTipoServicio.val() == "SERV06" || $cmbTipoServicio.val() == "SERV07")) {
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
                    Precio: ($txtPrecio.val()).replaceAll(",", ""),
                    Herramientas: $txtHerramientas.val(),
                    HerramientasEspeciales: $txtHerramientasEspeciales.val(),
                    Instrumentos: $txtInstrumentos.val()
                },
                servicios : detalleServicios
            };

            var objParam = JSON.stringify(objServicio);
            

            var fnDoneCallback = function (data) {
                function fnDoneCallBack2() {
                    var fnSiComent = function () {
                        location.reload();
                    };
                    var fnNo = function () {
  
                        app.redirectTo("BandejaServicios");   
                    };

                    app.message.confirm("Guardar", "¿Desea registrar otro nuevo servicio?", "Sí", "No", fnSiComent, fnNo);
                    
                };

                app.message.success("Confirmación", "Se realizó el registro del servicio exitosamente", "Aceptar", fnDoneCallBack2);
            };
            var fnFailCallback = function (data) {
                app.message.error("Validación", data.Mensaje);
            };
            return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.registrandoActividad)
        }
        return app.message.confirm("Guardar", "¿Está seguro/a de guardar los cambios?", "Sí", "No", fnSi, null);
    }

    function btnCancelarClick() {
        if ($txtTipoIngreso.val() == 'U' || $txtTipoIngreso.val() == '') {
            var fncn = function () {
                app.redirectTo("BandejaServicios");
            }
            return app.message.confirm("Guardar", "¿Está seguro/a de regresar a la bandeja, se perderán los cambios no guardados?", "Sí", "No", fncn, null);
        }
        else {
            app.redirectTo("BandejaServicios");
        }
    }

    function eliminarDetalleServicioTemp(Id) {
        var fnSi = function () {
            detalleServicios = detalleServicios.filter(detalle => detalle.Id != Id);
            cargarTablaDetalle(detalleServicios);
        }
        return app.message.confirm("Eliminación", "¿Está seguro de eliminar el detalle?", "Si", "No", fnSi, null);
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

        var fnSi = function () {
            var fnDoneCallBack = function () {
                app.message.success("Registro de Servicio", "Se eliminó correctamente el servicio");
                detalleServicios = detalleServicios.filter(detalle => detalle.Id != id);
                cargarTablaDetalle(detalleServicios);
            };

            var fnFailCallBack = function () {
                app.message.error("Error", "Error al realizar la eliminación del detalle")
            };

            app.llamarAjax(method, url, objParam, fnDoneCallBack, fnFailCallBack, null, null);
        }
        return app.message.confirm("Eliminación", "¿Está seguro de eliminar el detalle?", "Si", "No", fnSi, null);
    };
    function cargarTablaDetalle(detalle) {
        $('#tblDetalleServicio tbody').empty();

        for (var i = 0; i < detalle.length; i++) {
            var indice = i + 1 
            var nuevoTr = '<tr id="rowDetalle" name="rowDetalle">' +
                '<td><center>' + indice + '</center></td>' +
                '<td><center>' + detalle[i].DesMantenimiento + '</center></td>';
            if ($txtTipoIngreso.val() == "") {
                nuevoTr += '<td><center><a class="btn btn-primary btn-xs" title="Eliminar" href="javascript: manipularServicio.eliminarDetalleServicioTemp(' + detalle[i].Id + ')"><i class="fa fa-trash"></i></a></center></td>';
            } else if ($txtTipoIngreso.val() == "U") {
                var editar = '<a class="btn btn-default btn-xs" title="Editar" href="javascript: manipularServicio.editarDetalleServicio(' + detalle[i].Id + ')" btn-xs"><i class="fa fa-pencil"></i></a>';
                nuevoTr += '<td><center>' + editar + ' ' + '<a class="btn btn-primary btn-xs" title="Eliminar" href="javascript: manipularServicio.eliminarDetalleServicio(' + detalle[i].Id + ')" btn-xs"><i class="fa fa-trash"></i></a></center></td>';
            } else if ($txtTipoIngreso.val() == "V") {
                nuevoTr += '<td><center></center></td>';
            }
            nuevoTr += '</tr>';
            $tblDetalleServicio.append(nuevoTr);
        };

        if (detalleServicios.length == 0) {
            var nuevoTr = '<tr id="rowDetalle" name="rowDetalle">' +
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


            if ($cmbEstado.val() == null || $cmbEstado.val() == "") {
                app.message.error("Validación", "Estado incorrecto.");
                return;
            };

            if ($txtPrecio.val().trim().length == 0 || $txtPrecio.val() === null || $txtPrecio.val() == "") {
                app.message.error("Validación", "Debe ingresar un precio")
                return;
            }

            if ($txtPrecio.val() == "0" || $txtPrecio.val() == "0.00") {
                app.message.error("Validación", "Debe ingresar un precio mayor a cero")
                return;
            }

            if (detalleServicios.length == 0 && ($cmbTipoServicio.val() == "SERV06" || $cmbTipoServicio.val() == "SERV07")) {
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
                        Precio: ($txtPrecio.val()).replaceAll(",", ""),
                        Instrumentos: $txtInstrumentos.val(),
                        Herramientas: $txtHerramientas.val(),
                        HerramientasEspeciales: $txtHerramientasEspeciales.val()
                };

                var objParam = JSON.stringify(objServicio);
                var fnDoneCallback = function (data) {
                    function redirectTo() {
                        app.redirectTo("BandejaServicios");
                    };

                    app.message.success("Confirmación", "Se realizó la actualización del servicio exitosamente", "Aceptar", redirectTo);
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
                $txtEquipo.val(data.Result.CabeceraServicio.Equipo);
                $txtModelo.val(data.Result.CabeceraServicio.Modelo);
                $txtMarca.val(data.Result.CabeceraServicio.Marca);

                $txtPrecio.val(formatoMiles(data.Result.CabeceraServicio.Precio.toFixed(2)));


                if ($txttiposervicio.val() == "SERV06" || $txttiposervicio.val() == "SERV07") {
                    $navDetalle.show();
                    $tabsDetalle.show();
                }


                $txtInstrumentos.val(data.Result.CabeceraServicio.Instrumentos).trigger("change.select2");
                $txtHerramientas.val(data.Result.CabeceraServicio.Herramientas).trigger("change.select2");
                $txtHerramientasEspeciales.val(data.Result.CabeceraServicio.HerramientasEspeciales).trigger("change.select2");

                detalleServicios = data.Result.servicios;
                contadorDetalle = data.Result.servicios.length;

                $cmbEstado.val($txtcodestado.val()).trigger("change.select2");
                $cmbTipoServicio.val($txttiposervicio.val()).trigger("change.select2");
                $cmbEstado.val(data.Result.CabeceraServicio.Estado).trigger("change.select2");
                $cmbTipoServicio.val(data.Result.CabeceraServicio.CodTipoServicio).trigger("change.select2");
                cargarTablaDetalle(detalleServicios);
            };

            var fnFailCallBack = function (data) {
                app.message.error("Validación","Error al cargar los datos. ")
            };

            app.llamarAjax(method,url, null, fnDoneCallBack, fnFailCallBack, null, mensajes.obtenerDetalleServicio)
        };

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

    return {
        eliminarDetalleServicioTemp: eliminarDetalleServicioTemp,
        eliminarDetalleServicio: eliminarDetalleServicio,
        editarDetalleServicio: editarDetalleServicio
    };
})(window.jQuery, window, document);