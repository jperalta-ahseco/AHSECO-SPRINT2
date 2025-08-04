var opciones = (function ($, win, doc) {
    var $treeMenu = $("#treeMenu");
    var $modalOpcion = $("#modalOpcion");
    var $tituloModal = $("#tituloModal");
    var $frmOpcion = $("#frmOpcion");
    var $hdnId = $("#hdnId");
    var $hdnPadre = $("#hdnPadre");
    var $cmbTipoOpcion = $("#cmbTipoOpcion");
    var $txtCodigo = $("#txtCodigo");
    var $txtNombre = $("#txtNombre");
    var $txtDescripcion = $("#txtDescripcion");
    var $txtUrl = $("#txtUrl");
    var $txtIcono = $("#txtIcono");
    var $chkHabilitado = $("#chkHabilitado");
    var $btnGuardar = $("#btnGuardar");
    var $btnCerrar = $("#btnCerrar");

    var mensajes = {
        ObteniendoOpciones: "Obteniendo opciones de menu, por favor espere...",
        obteniendoOpcion: "Obteniendo los datos de la opción de menu, por favor espere...",
        guardandoOpcion: "Guardando datos de la opción de menu, por favor espere...",
        guardarOpcion: "Los datos de la opción de menu se guardaron satisfactoriamente.",
        eliminandoOpcion: "Eliminando la opción de menú, por favor espere...",
        eliminarOpcion: "La opción de menú se eliminó satisfactoriamente."
    };

    $(Initialize);

    function Initialize() {
        $btnGuardar.click(btnGuardarClick);
        llenarTreeMenu();
        $cmbTipoOpcion.select2({
            dropdownParent: $modalOpcion,
            language: app.defaults.language,
            allowClear: false
        });
    }

    function llenarTreeMenu() {
        $treeMenu.jstree("destroy");
        $treeMenu.jstree({
            'core': {
                'strings': {
                    'Loading ...': mensajes.ObteniendoOpciones
                },
                'data': {
                    'url': 'SeguridadOpcion/Obtener',
                    'data': function (node) {
                        return node;
                    }
                },
                'multiple': false,
                'themes': {
                    'name': 'default',
                    'stripes': true
                },
                'check_callback': false
            },
            'plugins': [
                'types',
                'contextmenu'
            ],
            'types': {
                'default': {
                    'icon': 'fa fa-list-alt text-info'
                },
                'objeto': {
                    'icon': 'fa fa-cube text-default'
                }
            },
            'contextmenu': {
                'items': menuContextualTreeMenu
            }
        });

        $treeMenu.bind('ready.jstree', function (e, data) {
            var aDatos = data.instance._model.data;
            if (Object.keys(aDatos).length > 0) {
                for (list in aDatos) {
                    if (list !== "#") {
                        if (data.instance._model.data[list].original.opcion.Tipo !== 'M') {
                            data.instance.set_type(data.instance._model.data[list], 'objeto');
                        }
                    }

                }
            }
        });

        $treeMenu.on('refresh.jstree', function (e, data) {
            var aDatos = data.instance._model.data;
            if (Object.keys(aDatos).length > 0) {
                for (list in aDatos) {
                    if (list !== "#") {
                        if (data.instance._model.data[list].original.opcion.Tipo !== 'M') {
                            data.instance.set_type(data.instance._model.data[list], "objeto");
                        }
                    }
                }
            }
        });

        $treeMenu.on('ready.jstree', function (e, data) {
            $treeMenu.jstree("open_all");

        });

        $treeMenu.on('changed.jstree', function (e, data) {
            var i, j, r = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push(data.instance.get_node(data.selected[i]).text);
            }
            console.log(data.selected);
        }).jstree();
    }

    function menuContextualTreeMenu(node) {
        var items = {
            "Create": {
                "separator_before": false,
                "separator_after": false,
                "label": "Agregar nueva opción",
                "action": function (obj) {
                    nuevaOpcion(node);
                }
            },
            "Rename": {
                "separator_before": false,
                "separator_after": false,
                "label": "Editar opción",
                "action": function (obj) {
                    editarOpcion(node);
                }
            },
            "Remove": {
                "separator_before": false,
                "separator_after": false,
                "label": "Eliminar Opción",
                "action": function (obj) {
                    eliminarOpcion(node);
                }
            }
        };

        if (node.id.indexOf('Obj') !== -1) {
            delete items.Create;
        }
        if (node.original.id === "0") {
            delete items.Rename;
            delete items.Remove;
        }

        return items;
    }

    function nuevaOpcion(node) {
        limpiarFormulario();
        $tituloModal.html("Nueva Opción");
        if (node.original.opcion.Id !== null && node.original.opcion.Id !== 0) {
            $hdnPadre.val(node.original.opcion.Id);
        }
        $modalOpcion.modal();
    }

    function editarOpcion(node) {
        limpiarFormulario();
        $tituloModal.html("Editar Opción");
        $hdnId.val(node.original.opcion.Id);
        if (node.original.opcion.Padre !== null && node.original.opcion.Padre.Id !== 0) {
            $hdnPadre.val(node.original.opcion.Padre.Id);
        }
        $cmbTipoOpcion.val(node.original.opcion.Tipo);
        $txtCodigo.val(node.original.opcion.Codigo);
        $txtNombre.val(node.original.opcion.Nombre);
        $txtDescripcion.val(node.original.opcion.Descripcion);
        $txtUrl.val(node.original.opcion.Url);
        $txtIcono.val(node.original.opcion.Icono);
        if (node.original.opcion.Habilitado === "1") {
            $chkHabilitado.prop("checked", true);
        } else {
            $chkHabilitado.prop("checked", false);
        }
        $modalOpcion.modal();
    }

    function eliminarOpcion(node) {
        var fnSi = function () {
            eliminar(node.original.opcion.Id);
        };
        return app.message.confirm("Opciones", "¿Está seguro que desea eliminar la opción de menu?", "Sí", "No", fnSi, null);
    }

    function eliminar(id) {
        var objOpcion = {
            Id: id
        };

        var m = "POST";
        var url = "SeguridadOpcion/Eliminar";
        var objParam = JSON.stringify(objOpcion);
        var fnDoneCallback = function (data) {
            var fnCallback = function () {
                $btnCerrar.click();
                $treeMenu.jstree(true).refresh();
            };
            app.message.success("Eliminar", mensajes.eliminarOpcion, "Aceptar", fnCallback);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.eliminandoOpcion);
    }

    function btnGuardarClick() {
        var objOpcion = {
            Id: $hdnId.val(),
            Tipo: $cmbTipoOpcion.val(),
            Codigo: $txtCodigo.val().trim(),
            Nombre: $txtNombre.val().trim(),
            Descripcion: $txtDescripcion.val().trim(),
            Url: $txtUrl.val().trim(),
            Icono: $txtIcono.val().trim(),
            Padre: {
                Id: $hdnPadre.val()
            }
        };

        if ($chkHabilitado.is(":checked")) {
            objOpcion.Habilitado = "1";
        } else {
            objOpcion.Habilitado = "0";
        }

        var m = "POST";
        var url = "SeguridadOpcion/Guardar";
        var objParam = JSON.stringify(objOpcion);
        var fnDoneCallback = function (data) {
            var fnCallback = function () {
                $btnCerrar.click();
                $treeMenu.jstree(true).refresh();
            };
            app.message.success("Grabar", mensajes.guardarOpcion, "Aceptar", fnCallback);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoOpcion);
    }

    function limpiarFormulario() {
        $frmOpcion[0].reset();
        $("input[type=hidden]").val("");
        $chkHabilitado.prop("checked", true);
    }

    return {
        //editar: editar
    };
})(window.jQuery, window, document);