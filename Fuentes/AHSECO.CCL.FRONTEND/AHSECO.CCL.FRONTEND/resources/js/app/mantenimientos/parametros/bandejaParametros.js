var bandejaParametros = (function ($, win, doc) {
    var $cmbCabecera = $("#cmbCabecera");
    var $btnEditarCabecera = $("#btnEditarCabecera");
    var $btnBuscarDetalles = $("#btnBuscarDetalles");
    var $modalCabecera = $("#modalCabecera");
    var $hdnIdCabecera = $("#hdnIdCabecera");
    var $lblDominio = $("#lblDominio");
    var $lblPrefijo = $("#lblPrefijo");
    var $txtDescripcionCabecera = $("#txtDescripcionCabecera");
    var $btnGuardarCabecera = $("#btnGuardarCabecera");
    var $btnCerrarCabecera = $("#btnCerrarCabecera");
    var $chkPermiteCrecerCabecera = $("#chkPermiteCrecerCabecera");
    var $btnCerrarCatalogo = $("#btnCerrarCatalogo");
    var $tblDetalleCabecera = $("#tblDetalleCabecera");
    var $modalDetalleCabecera = $("#modalDetalleCabecera");
    var $hdnIdDetalleCabecera = $("#hdnIdDetalleCabecera");
    var $hdnIdCabecera2 = $("#hdnIdCabecera2");
    var $lblParametro = $("#lblParametro");
    var $txtDescripcionDetalle = $("#txtDescripcionDetalle");
    var $txtCodigoValor1 = $("#txtCodigoValor1");
    var $txtCodigoValor2 = $("#txtCodigoValor2");
    var $txtCodigoValor3 = $("#txtCodigoValor3");
    var $txtValor1 = $("#txtValor1");
    var $txtValor2 = $("#txtValor2");
    var $txtValor3 = $("#txtValor3");
    var $chkEstado = $("#chkEstado");
    var $chkHabilitado = $("#chkHabilitado");
    var $chkEditable = $("#chkEditable");
    var $tituloModalDetalle = $("#tituloModalDetalle");
    var $formRegistroDetalle = $("#formRegistroDetalle");
    var $lblDominioModalNuevo = $("#lblDominioModalNuevo");
    var $lblDominioModalDetalle = $("#lblDominioModalDetalle");
    var $modalNuevoCatalogo = $("#modalNuevoCatalogo");
    var $txtDominio = $("#txtDominio");
    var $txtPrefijo = $("#txtPrefijo");
    var $txtDescripcion = $("#txtDescripcion");
    var $txtParametro = $("#txtParametro");
    var $chkCrecer = $("#chkCrecer");
    var $chkEstado = $("#chkEstado");
    var $chkHabilitado = $("#chkHabilitado");
    var $chkEditable = $("#chkEditable");

    var $formRegistroCatalogo = $("#formRegistroCatalogo");
    var $btnCerrarDetalles = $("#btnCerrarDetalles");
    var $btnGuardarDetalle = $("#btnGuardarDetalle");
    var $btnNuevoDetalle = $("#btnNuevoDetalle");
    var $btnNuevoCatalogo = $("#btnNuevoCatalogo");
    var $btnGuardarCatalogo = $("#btnGuardarCatalogo");


    var cant = '';

    var mensajes = {
        obteniendoCabeceras: "Obteniendo catálogos, por favor espere...",
        obteniendoCabecera: "Obteniendo datos del catálogo, por favor espere...",
        validandoPuedeCrecer: "Validando opciones, por favor espere...",
        validacionEditarCatalogo: "Debe seleccionar un catálogo.",
        validacionEditarDetalle: "Debe seleccionar un registro de la lista.",
        validacionDesCabecera: "Debe especificar un valor en el campo Descripción.",
        validacionDesDetalle: "Debe especificar un valor en el campo Descripción.",
        validacionIdCabecera: "No existe identificador del Catálogo.",
        guardandoCabecera: "Guardando los datos del catálogo, por favor espere...",
        guardarCabecera: "Los datos del catálogo se guardaron satisfactoriamente.",
        obteniendoDetalles: "Obteniendo detalles del catálogo, por favor espere...",
        obteniendoDetalle: "Obteniendo datos del detalle, por favor espere...",
        guardandoDetalle: "Guardando los datos del detalle, por favor espere...",
        guardarDetalle: "Los datos del detalle se guardaron satisfactoriamente.",
        agregandoNuevoCatalogo: "Se carga el nuevo Catálogo, se guardara satisfactoriamente"
    };
    $(initialize);
    function initialize() {
        $btnEditarCabecera.click(btnEditarCabeceraClick);
        $btnGuardarCabecera.click(btnGuardarCabeceraClick);
        $btnBuscarDetalles.click(btnBuscarDetallesClick);
        $cmbCabecera.change(cmbCabeceraChange);
     
        $btnGuardarDetalle.click(btnGuardarDetalleClick);
        $btnNuevoDetalle.click(btnNuevoDetalleClick);
        $btnNuevoCatalogo.click(btnNuevoCatalogoClick);
        $btnGuardarCatalogo.click(btnGuardarCatalogoClick);
        llenarTabla();
       
        app.loading.isGlobal = true;
        $.when(obtenerCatalogos())
            .done(function (a1, a2, a3) {
                app.loading.isGlobal = false;
                app.loading.hide();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                app.loading.isGlobal = false;
                app.loading.hide();
                console.error("Error al obtener catálogos:", errorThrown);
            });

        $txtPrefijo.on('input', function () {
            $(this).val($(this).val().toUpperCase());
        });
        $txtDominio.on('input', function () {
            $(this).val($(this).val().toUpperCase());
        });
    }
    function cargarDominios() {
        var method = "POST";
        var url = "BandejaParametros/ObtenerDominios";
        var fnDoneCallback = function () {

        }
        var fnFailCallback = function () {

        }
        return app.llamarAjax(method, url, null, fnDoneCallback, fnFailCallback, null);
    }

    function cargarPrefijos() {
        var method = "POST";
        var url = "BandejaParametros/ObtenerPrefijos";
        var fnDoneCallback = function () {

        }
        var fnFailCallback = function () {

        }
        return app.llamarAjax(method, url, null, fnDoneCallback, fnFailCallback, null);
    }

    function obtenerNuevoParametro(id) {
        var method = "POST";
        var url = "BandejaParametros/ObtenerNuevoParametro";
        var objParam = {
            Id: id
        }
        var obj = JSON.stringify(objParam);
        var fnDoneCallback = function (data) {
            console.log(data);
        }
        var fnfailCallback = function () {

        }
        return app.llamarAjax(method, url, obj, fnDoneCallback, fnfailCallback, null, null);
    }
    function btnBuscarDetallesClick() {
        if (!validarExistenciaCabecera()) {
            return false;
        }

        var objDetalles = {
            DatosGenerales: {
                Id: $cmbCabecera.val()
            }
        };

        var m = "POST";
        var url = "BandejaParametros/ObtenerDetalles";
        var objParam = JSON.stringify(objDetalles);
        var fnDoneCallback = function (data) {
            llenarTabla(data);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoDetalles);
    }
    function validarExistenciaCabecera() {
        var idCabecera = $cmbCabecera.val();

        if (idCabecera === null || idCabecera === "" || parseFloat(idCabecera) <= 0) {
            app.message.error("Mantenimientos", mensajes.validacionEditarCatalogo, "Aceptar", null);
            return false;
        }

        return true;
    }
    function llenarTabla(data) {

        var columns = [
            { data: "Id" },
            { data: "Parametro" },
            { data: "Descripcion" },
            {
                data: "Estado",
                render: function (data, type, row) {
                    if (data === 1) {
                        return '<center>' + "Activo" + '</center>';
                    } else if (data === 0) {
                        return '<center>' + "Inactivo" + '</center>';
                    } else {
                        return "";
                    }
                }
            },
            {
                data: "Habilitado",
                render: function (data, type, row) {
                    if (data === true) {
                        return '<center>'+"Sí"+'</center>';
                    } else if (data === false) {
                        return '<center>' + "No" + '</center>';
                    } else {
                        return "";
                    }
                }
            },
            {
                data: "Editable",
                render: function (data, type, row) {
                    if (data === 1) {
                        return '<center>' + "Sí" + '</center>';
                    } else if (data === 0) {
                        return '<center>' + "No" + '</center>';
                    } else {
                        return "";
                    }
                }
            },
            {
                data: "Id",
                render: function (data, type, row) {

                    var editar = ' <a class="btn btn-default btn-xs" title="Editar" href="javascript:bandejaParametros.editarDetalles(' + data + ')"><i class="fa fa-edit" aria-hidden="true"></i></a>';
                    return '<div style="text-align:center">' + editar + '</div>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        var filters = {
            dataTableSearching: false,
            dataTablePageLength: 10
        };
        app.llenarTabla($tblDetalleCabecera, data, columns, columnDefs, "#tblDetalleCabecera", null, null, filters);
    }
    function obtenerCatalogos() {
        var m = "POST";
        var url = "BandejaParametros/ObtenerCabeceras";
        var data = "";
        
        var fnDoneCallback = function (data) {
            app.llenarCombo($cmbCabecera, data, null, "", "<<--seleccione-->>", null);
        };
        return app.llamarAjax(m, url, null, fnDoneCallback, null, null, mensajes.obteniendoCabeceras);
    }
    function cmbCabeceraChange() {
        verificarPuedeCrecer();
        llenarTabla();
    }
    function btnEditarCabeceraClick() {
        if (!validarExistenciaCabecera()) {
            return false;
        }
        var objCabecera = {
            Id: $cmbCabecera.val()
        };
        var m = "POST";
        var url = "BandejaParametros/ObtenerCabecera";
        var objParam = JSON.stringify(objCabecera);
        var fnDoneCallback = function (data) {
            $hdnIdCabecera.val(data.Result[0].Id);
            $lblDominio.html(data.Result[0].Dominio);
            $lblPrefijo.html(data.Result[0].Prefijo);
            $txtDescripcionCabecera.val(data.Result[0].Descripcion);
            if (data.Result[0].PuedeCrecer == 1) {
                $chkPermiteCrecerCabecera.prop('checked',true)
            } else{
                $chkPermiteCrecerCabecera.prop('checked',false)
            }
            $modalCabecera.modal();
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoCabecera);
    }
    function btnNuevoDetalleClick() {

        var id = $cmbCabecera.val();
        if (!validarExistenciaCabecera()) {
            return false;
        }
        var objCabecera = {
            Id: $cmbCabecera.val(),
        };
        if (id === null || id === "" || id <= 0) {
            return app.message.error("Mantenimientos", mensajes.validacionEditarCatalogo, "Aceptar", null);
        }

        $formRegistroDetalle[0].reset();
        $("input[type=hidden]").val("");
        var m = "POST";
        var url = "BandejaParametros/ObtenerCabecera";
        var objParam = JSON.stringify(objCabecera);
        $.when(obtenerNuevoParametro(id)).done((response) => {
            var { Result } = response;

            $txtParametro.html(response.Result.Mensaje);
        })
        var fnDoneCallback = function (data) {
            $tituloModalDetalle.html("Nuevo Parámetro");

            $modalDetalleCabecera.modal();
            $hdnIdCabecera2.val(data.Result[0].Id);
            $lblDominioModalDetalle.html(data.Result[0].Dominio);
            $txtParametro.html(data.Result[0].Parametro);
            $modalDetalleCabecera.modal();
            $chkEstado.prop('checked', true);
            //$chkEstado.prop('disabled', true);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoCabecera);
    }
    function verificarPuedeCrecer() {
        var objCabecera = {
            Id: $cmbCabecera.val()
        };

        var m = "POST";
        var url = "BandejaParametros/ObtenerCabecera";
        var objParam = JSON.stringify(objCabecera);
        var fnDoneCallback = function (data) {
            if (data.Result[0].PuedeCrecer === 0) {
                $btnNuevoDetalle.hide();
            } else {
                $btnNuevoDetalle.show();
            }
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.validandoPuedeCrecer);
    }
    function btnGuardarCabeceraClick() {
        if (!validarExistenciaCabecera()) {
            return false;
        }
        
        var idCabecera = $cmbCabecera.val();
        var puedeCrecer = null;
        var descripcionCabecera = $txtDescripcionCabecera.val();

        if (descripcionCabecera === null || descripcionCabecera.trim() == '' || descripcionCabecera.trim() == undefined) {
            return app.message.error("Actualización", mensajes.validacionDesCabecera, "Aceptar", null);
        }
        
        if ($chkPermiteCrecerCabecera.prop('checked')) {
            puedeCrecer = 1
        } else {
            puedeCrecer=0
        }
        var objCabecera = {
            Id: idCabecera,
            Descripcion: descripcionCabecera,
            PuedeCrecer: puedeCrecer,
        };
        var fnsc = function(){
            var m = "POST";
            var url = "BandejaParametros/GuardarCabecera";
            var objParam = JSON.stringify(objCabecera);
            var fnDoneCallback = function (data) {
                var fnDone = function () {
                    $btnCerrarCabecera.click();
                    llenarTabla();
                    obtenerCatalogos();
                };
                app.message.success("Guardar", mensajes.guardarCabecera, "Aceptar", fnDone);
            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoCabecera);
        }
        var fnde = function () {
            $modalCabecera.hide();
        }
        return app.message.confirm("Actualización", "¿Estás seguro(a) de actualizar los datos?", "Sí", "No", fnsc,fnde)
    }
    function editarDetalles(id) {
        if (id === null || id === "" || id <= 0) {
            return app.message.error("Mantenimientos", mensajes.validacionEditarDetalle, "Aceptar", null);
        }
        var objDetalles = {
            Id: id
        };
        var m = "POST";
        var url = "BandejaParametros/ObtenerDetalles";
        var objParam = JSON.stringify(objDetalles);
        var fnDoneCallback = function (data) {
            obtenerDetalle(data.Result[0]);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoDetalle);
    }
    function obtenerDetalle(data) {
        $tituloModalDetalle.html("Editar Parámetro");
        $hdnIdDetalleCabecera.val(data.Id);
        $hdnIdCabecera2.val(data.DatosGenerales.Id);
        $lblDominioModalDetalle.html(data.Dominio);
        $txtParametro.html(data.Parametro);
        $txtDescripcionDetalle.val(data.Descripcion);
        $txtCodigoValor1.val(data.CodValor1);
        $txtCodigoValor2.val(data.CodValor2);
        $txtCodigoValor3.val(data.CodValor3);
        $txtValor1.val(data.Valor1);
        $txtValor2.val(data.Valor2);
        $txtValor3.val(data.Valor3);
        if (data.Editable == 1) {
            $chkEditable.prop("checked", true);
        } else {
            $chkEditable.prop("checked", false);
        }
        if (data.Estado === 1) {
            $chkEstado.prop("checked", true);
        } else {
            $chkEstado.prop("checked", false);
        }
        if (data.Habilitado == false) {
            $chkHabilitado.prop("checked", false);
        } else {
            $chkHabilitado.prop("checked", true);
        }
        $modalDetalleCabecera.modal();
    }
    function btnGuardarDetalleClick() {
        var desc = $txtDescripcionDetalle.val().trim();
        if (desc.length === 0) {
            return app.message.error("Guardar", mensajes.validacionDesDetalle, "Aceptar", null);
        }
        if (($txtCodigoValor1.val().trim() == "" || $txtCodigoValor1.val().trim() == undefined) && $txtCodigoValor2.val().trim() === "" && $txtCodigoValor3.val().trim() === "" && $txtValor1.val().trim() === "" && $txtValor2.val().trim() == "" && $txtValor3.val().trim() == "") {
            app.message.error("Validación", "Los campos de los Códigos y Valores; al menos uno, debe Registrarse.", "Aceptar", null);
            return;
        }

        var message = "";
        if ($hdnIdDetalleCabecera.val() != "") {
            message = "¿Está seguro de Actualizar el Parámetro seleccionado.?";
        }
        else {
            message = "¿Está seguro de Guardar el Nuevo Parámetro?";
        }
        var fns01 = function () {
          

            var m = "POST";
            var url = "BandejaParametros/GrabarDetalle";
            var objDetalles = {
                Id: $hdnIdDetalleCabecera.val(),
                Descripcion: desc,
                Valor1: $txtValor1.val().trim(),
                Valor2: $txtValor2.val().trim(),
                Valor3: $txtValor3.val().trim(),
                CodValor1: $txtCodigoValor1.val().trim(),
                CodValor2: $txtCodigoValor2.val().trim(),
                CodValor3: $txtCodigoValor3.val().trim(),
                Habilitado: $chkHabilitado.prop('checked') === false ? 0 : 1,
                Estado: $chkEstado.prop('checked') === false ? 0 : 1,
                Editable: $chkEditable.prop('checked') === false ? 0 : 1,
                DatosGenerales: {
                    Id: $hdnIdCabecera2.val()
                }
            };
  
         
            var objParam = JSON.stringify(objDetalles);
            var fnDoneCallback = function (data) {
                var fnDone = function () {
                    $btnCerrarDetalles.click();
                    btnBuscarDetallesClick();
                };
                app.message.success("Guardar", mensajes.guardarDetalle, "Aceptar", fnDone);
            };
            return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoDetalle);
        }
        return app.message.confirm("Parámetros", message, "Sí", "No", fns01, null);
    }



    function btnNuevoCatalogoClick() {
        $txtDominio.val("");
        $txtPrefijo.val("");
        $txtDescripcion.val("");
        $chkCrecer.prop("checked", false);
        $btnCerrarCatalogo.click();
        $modalNuevoCatalogo.modal();
    }
    async function btnGuardarCatalogoClick() {
        var idCabecera = $cmbCabecera.val();

        if ($chkCrecer.prop("checked")) {
            $chkCrecer.val(1);
        } else {
            $chkCrecer.val(0);
        }


        // const Text = arrayText.slice(1);
        if ($txtDescripcion.val().trim() == "") {
            app.message.error("Validación", "Debe registrarse una descripción");
            return;
        }

        if ($txtDominio.val().trim() == "") {
            app.message.error("Validación", "Debe registrarse un dominio.");
            return;
        }
        const { Result } = await cargarDominios();
        const arrayText = Result.map(e => e.Text);

        if (arrayText.includes($txtDominio.val().trim())) {
            app.message.error("Validación", "El Dominio ya se encuentra registrado en el sistema.");
            return;
        }
        if ($txtPrefijo.val().trim() == "") {
            app.message.error("Validación", "Debe registrarse un prefijo.");
            return;
        }

        if ($txtPrefijo.val().trim().length != 4) {
            app.message.error("Validación", "El prefijo ingresado debe ser de 4 caracteres.");
            return;
        }

        let lista_prefijos = [];
        lista_prefijos = await cargarPrefijos();
        var valida_prefijo = 0;
        lista_prefijos.Result.forEach(function (currentValue, index, arr) {
            if (lista_prefijos.Result[index].Text == $txtPrefijo.val().trim()) {
                valida_prefijo = 1;
            }
        });
        if (valida_prefijo === 1) {
                app.message.error("Validación", "El Prefijo ya se encuentra registrado en el sistema.");
                return;
        }


        var fns1 = function () {
            var method = "POST";
            var url = "BandejaParametros/InsertarCabecera";
            const objParam = {
                Dominio: $txtDominio.val().trim(),
                Prefijo: $txtPrefijo.val().trim(),
                Descripcion: $txtDescripcion.val().trim(),
                PuedeCrecer: Number($chkCrecer.val()),
            };
            const data = JSON.stringify(objParam);
            const fnDoneCallback = function () {
                obtenerCatalogos();
                $txtDominio.val("");
                $txtPrefijo.val("");
                $txtDescripcion.val("");
                app.message.success("Parámetros", "Registro Existoso", "Aceptar", null);
                $modalNuevoCatalogo.hide();
            };
            return app.llamarAjax(method, url, data, fnDoneCallback, null, null, mensajes.agregandoNuevoCatalogo);
        }
        return app.message.confirm("Parámetros", "¿Estás seguro(a) de Guardar el nuevo Catálogo?", "Sí", "No", fns1, null);
    }
    return {
        editarDetalles: editarDetalles
    };

})(window.jQuery, window, document);