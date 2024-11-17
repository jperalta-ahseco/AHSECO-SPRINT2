var ubigeo = (function ($, win, doc) {
    var $modalUbigeo = $("#modalUbigeo");
    var $cmbDepartamento = $("#cmbDepartamento");
    var $cmbProvincia = $("#cmbProvincia");
    var $cmbDistrito = $("#cmbDistrito");
    var $txtUbigeo = $("#txtUbigeo");
    var $btnSeleccionar = $('#btnGuardarUbigeo')
    var $tituloModal = $("#tituloModal")
    var $UbigeoId = null;
    var $UbigeoText = null;

    var mensajes = {
        procesandoUbigeo: "Procesando Ubigeo, por favor espere...",
        obteniendoDatos: "Obteniendo datos del usuario, por favor espere...",
        guardarUbigeo: "Guardando datos del ubigeo , por favor espere...",
        guardarUsuario: "Los datos del usuario se guardaron satisfactoriamente."
    };

    $(Initialize);

    function Initialize() {
        logicUbigeo();
        $btnSeleccionar.click(seleccionar);
    }
    
    function setTxtUbigeo_Id(inputId) {
        $UbigeoId = $("#" + inputId);
    }

    function setTxtUbigeo_Text(inputId) {
        $UbigeoText = $("#" + inputId);
    }

    function logicUbigeo() {
        $cmbProvincia.prop("disabled", true);
        $cmbDistrito.prop("disabled", true);
        obtenerDepartamento();
    }

    function obtenerDepartamento() {
        var method = "POST";
        var url = "Ubigeo/ObtenerUbigeo";
        var ubigeoObj = {}

        var objParam = JSON.stringify(ubigeoObj);
        var fnDoneCallback = function (data) {
            var resultado = { Result: [] };

            var distritos = { Result: [] };
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
            $cmbDepartamento.on('change', function () {
                const codDepartamento = $(this).val();
                if (!codDepartamento === null || !codDepartamento === '') {
                    $(this).prop('disabled', false);
                } else {
                    $cmbProvincia.prop('disabled', false);
                    obtenerProvincia(codDepartamento, data);
                }
            });
            app.llenarCombo($cmbDepartamento, resultado, $modalUbigeo, " ", "<--Todos-->", null);
        }
        var fnFailCallback = function () {
            app.mensajes.error("Error", "No se ejecutó correctamente la carga de departamentos")
        }
        return app.llamarAjax(method, url, objParam, fnDoneCallback, fnFailCallback, null, mensajes.procesandoUbigeo)

    }

    function obtenerProvincia(codDepartamento, data) {
        var provincias = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var provincia = {
                Id: data.Result[i].CodProvincia,
                Text: data.Result[i].NombreProvincia,
            }
            provincias.Result.push(provincia);

        }
        provincias.Result = provincias.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodDepartamento = itemActual.Id.startsWith(codDepartamento);
            if (!isDuplicate && startsWithCodDepartamento) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);
        $cmbProvincia.on('change', function () {
            const codProvincia = $(this).val();
            if (!codProvincia === null || !codProvincia === '') {
                $(this).prop('disabled', false);
            } else {
                $cmbProvincia.prop('disabled', false);
                $cmbDistrito.prop('disabled', false)
                obtenerDistrito(codProvincia, data);
            }
        });


        app.llenarCombo($cmbProvincia, provincias, $modalUbigeo, " ", "<--Todos-->", null)
    }

    function obtenerDistrito(codProvincia, data) {
        var distritos = { Result: [] };
        for (let i = 0; i < data.Result.length; i++) {
            var distrito = {
                Id: data.Result[i].UbigeoId,
                Text: data.Result[i].NombreDistrito,
            }
            distritos.Result.push(distrito);

        }
        distritos.Result = distritos.Result.reduce((acumulador, itemActual) => {
            const isDuplicate = acumulador.some(item => item.Id === itemActual.Id);
            const startsWithCodProvincia = itemActual.Id.startsWith(codProvincia);
            if (!isDuplicate && startsWithCodProvincia) {
                acumulador.push(itemActual);
            }
            return acumulador;
        }, []);

        $cmbDistrito.on('change', function () {
            const codDistrito = $(this).val();
            sessionStorage.setItem('codDistrito', `${codDistrito}`)
        });

        app.llenarCombo($cmbDistrito, distritos, $modalUbigeo, " ", "<--Todos-->", null)
    }

    function seleccionar() {
        var codDistrito = sessionStorage.getItem('codDistrito')
        if ($UbigeoId != null && $UbigeoId != undefined) {
            $UbigeoId.val(codDistrito);
            $UbigeoText.val($("#select2-cmbDepartamento-container").attr("title") + ' / ' +
                $("#select2-cmbProvincia-container").attr("title") + ' / ' + $("#select2-cmbDistrito-container").attr("title"));
        }
        else {
            $txtUbigeo.val(codDistrito);
        }
        $modalUbigeo.modal('hide');
    }

    return {
        setTxtUbigeo_Id: setTxtUbigeo_Id,
        setTxtUbigeo_Text: setTxtUbigeo_Text
    }

})(window.jQuery, window, document);
