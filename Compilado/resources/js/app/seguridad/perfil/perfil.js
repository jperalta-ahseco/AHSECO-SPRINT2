var perfiles = (function ($, win, doc) {
    var $btnNuevo = $("#btnNuevo");
    var $tblPerfiles = $("#tblPerfiles");
    var $modalPerfiles = $("#modalPerfiles");
    var $tituloModal = $("#tituloModal");
    var $frmPerfil = $("#frmPerfil");
    var $frmPerfilMain = $("#frmPerfilMain");
    var $hdnIdPerfil = $("#hdnIdPerfil");
    var $txtDescripcion = $("#txtDescripcion");
    var $chkHabilitado = $("#chkHabilitado");
    var $btnGuardar = $("#btnGuardar");
    var $btnCerrar = $("#btnCerrar");
    var $btnExportar = $("#btnExportar");

    var $modalPermisos = $("#modalPermisos");
    var $hdnIdPerfilPermisos = $("#hdnIdPerfilPermisos");
    var $treeMenu = $("#treeMenu");
    var $btnGuardarPermisos = $("#btnGuardarPermisos");
    var $btnCerrarPermisos = $("#btnCerrarPermisos");
    
    var mensajes = {
        obteniendoPerfiles: "Obteniendo perfiles, por favor espere...",
        obteniendoPerfil: "Obteniendo los datos del perfiles, por favor espere...",
        guardandoPerfil: "Guardando datos del perfil, por favor espere...",
        guardarPerfil: "Los datos del perfil se guardaron satisfactoriamente.",
        guardandoPermisos: "Guardando los permisos del perfil, por favor espere...",
        guardarPermisos: "Los permisos del perfil se guardaron satisfactoriamente."
    };

    $(Initialize);

    function Initialize() {
        $btnGuardar.click(btnGuardarClick);
        $btnNuevo.click(btnNuevoClick);
        $btnGuardarPermisos.click(btnGuardarPermisosClick);
        $btnExportar.click(btnExportarClick);
        cargarTablaPerfiles();
    }

    function cargarTablaPerfiles() {
        var method = "POST";
        var url = "SeguridadPerfil/Obtener";
        var data = "";
        var fnDoneCallback = function (data) {
            cargarTabla(data);
        };
        var fnFailCallback = function () {
            cargarTabla();
        };
        app.llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, null, mensajes.obteniendoUsuarios);
    }

    function btnNuevoClick() {
        $frmPerfil[0].reset();
        $("input[type=hidden]").val("");
        $chkHabilitado.prop("checked", true);
        $tituloModal.html("Nuevo Perfil");
    }

    function btnExportarClick(e) {
        var self = jQuery(this);
        var href = self.attr('href');
        e.preventDefault();
        var cant = $tblPerfiles.DataTable().rows().data().length;

        if (cant === 0) {
            app.message.error("Reporte de Perfiles", "La búsqueda no produjo resultados", "Aceptar");
            return false;
        }
        $("#hidden_fields").empty();
        $("<input>", { type: "hidden", name: "Id", value: 0 }).appendTo("#hidden_fields");
        $("<input>", { type: "hidden", name: "Descripcion", value: "" }).appendTo("#hidden_fields");


        $frmPerfilMain.attr('action', href);
        $frmPerfilMain.submit();
    }


    function btnGuardarClick() {

        if ($txtDescripcion.val() == "" || $txtDescripcion.val() == null || $txtDescripcion.val() == undefined) {
            app.message.error("Validación", "Debe ingresar una descripción", "Aceptar", null);
            return false;
        }
        var fnSi = function () {
            GuardarRegistro();
        };
        return app.message.confirm("Perfiles", "¿Está seguro que desea guardar los cambios?", "Sí", "No", fnSi, null);

    }

    function GuardarRegistro() {
        if (!validarPerfil()) {
            return false;
        }
        var objPerfil = {
            Id: $hdnIdPerfil.val().trim(),
            Descripcion: $txtDescripcion.val().trim()
        };

        if ($chkHabilitado.is(":checked")) {
            objPerfil.Habilitado = "1";
        } else {
            objPerfil.Habilitado = "0";
        }

        var m = "POST";
        var url = "SeguridadPerfil/Guardar";
        var objParam = JSON.stringify(objPerfil);
        var fnDoneCallback = function (data) {
            var fnCallback = function () {
                $btnCerrar.click();
                cargarTablaPerfiles();
            };
            app.message.success("Grabar", mensajes.guardarPerfil, "Aceptar", fnCallback);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoPerfil);
    }

    function cargarTabla(data) {
        var columns = [
            { data: "Id" },
            { data: "Descripcion" },
            {
                data: "Habilitado",
                render: function (data, type, row) {
                    if (data === "1") {
                        return "Sí";
                    } else if (data === "0") {
                        return "No";
                    } else {
                        return "No Definido";
                    }
                }
            },
            {
                data: "Id",
                render: function (data, type, row, meta) {
                    var editar = '<a class="btn btn-default btn-xs" title="Editar" href="javascript: perfiles.editar(' + data + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
                    var permisos = '';
                    if (row.Habilitado == "1") {
                        permisos = ' <a class="btn btn-default btn-xs" title="Permisos" href="javascript: perfiles.permisos(' + data + ')"><i class="fa fa-server" aria-hidden="true"></i></a>';
                    }                 
                    return '<center>' + editar + permisos + '</center>';
                }
            }
        ];
        var columnDefs = [
            {
                targets: [0],
                visible: false
            }
        ];
        app.llenarTabla($tblPerfiles, data, columns, columnDefs, "#tblPerfiles");
    }

    function editar(idPerfil) {
        var objPerfil = {
            Id: idPerfil
        };
        var m = "POST";
        var url = "SeguridadPerfil/Obtener";
        var objParam = JSON.stringify(objPerfil);
        var fnDoneCallback = function (data) {
            $tituloModal.html("Editar Perfil");
            $hdnIdPerfil.val(data.Result[0].Id);
            $txtDescripcion.val(data.Result[0].Descripcion);
            if (data.Result[0].Habilitado === "1") {
                $chkHabilitado.prop("checked", true);
            } else {
                $chkHabilitado.prop("checked", false);
            }
            $modalPerfiles.modal();
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.obteniendoPerfil);
    }

    function validarPerfil() {
        if ($txtDescripcion.val().trim().length === 0) {
            app.message.error("Guardar", "Ingrese la Descripción.", "Aceptar", null);
            return false;
        }
        return true;
    }

    function permisos(idPerfil) {
        $hdnIdPerfilPermisos.val(idPerfil);
        $modalPermisos.modal();
        llenarTreeMenu(idPerfil);
    }

    function llenarTreeMenu(idPerfil) {
        $treeMenu.jstree("destroy");
        $treeMenu.jstree({
            'core': {
                'strings': {
                    'Loading ...': mensajes.ObteniendoOpciones
                },
                'data': {
                    'url': 'SeguridadPerfil/ObtenerPermisos',
                    'data': function (node) {
                        return {
                            'idPerfil': idPerfil,
                            node
                        };
                    }
                },
                'multiple': true,
                'themes': {
                    'name': 'default',
                    'stripes': true
                },
                'check_callback': false
            },
            'plugins': [
                'types',
                'checkbox',
            ],
            'types': {
                'default': {
                    'icon': 'fa fa-list-alt text-info'
                },
                'objeto': {
                    'icon': 'fa fa-cube text-default'
                }
            },
            'checkbox': {
                'visible': true,
                'three_state': false,
                'cascade': 'undetermined'
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

                        if (data.instance._model.data[list].original.selected === true) {
                            $treeMenu.jstree("select_node", list, true);
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

    function btnGuardarPermisosClick() {
        var datos = $treeMenu.jstree(true).get_checked();
        if (datos.length > 0) {
            var fnSi = function () {
                guardarPermisos();
            };
            return app.message.confirm("Guardar", "¿Está seguro que desea guardar los cambios realizados?", "Sí", "No", fnSi, null);
        } else {
            app.message.error("Guardar", "No hay registros por guardar", "Aceptar", null);
        }
    }

    function guardarPermisos() {
        var datos = $treeMenu.jstree(true).get_checked();
        var nodosSeleccionados = [];

        for (i in datos) {
            var nodo = {
                id: datos[i]
            };
            nodosSeleccionados.push(nodo);
        }

        var objPerfil = {
            Id: $hdnIdPerfilPermisos.val()
        };

        var obj = {
            nodos: nodosSeleccionados,
            perfil: objPerfil
        };

        var m = "POST";
        var url = "SeguridadPerfil/GuardarPermisos";
        var objParam = JSON.stringify(obj);
        var fnDoneCallback = function (data) {
            var fnCallback = function () {
                $btnCerrarPermisos.click();
            };
            app.message.success("Grabar", mensajes.guardarPermisos, "Aceptar", fnCallback);
        };
        return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, mensajes.guardandoPermisos);
    }

    return {
        editar: editar,
        permisos: permisos
    };
})(window.jQuery, window, document);