/*
* ================ CREACIÓN ===================================
* Autor: Quality Gardian
* Fecha: 2018-04-19
* Requerimiento: REQ-1114 Generación de Reportes Para Auditoria (GRA)
* Descripción: Script principal de la aplicacion
* ================ MODIFICACIÓN 0001 (MOD.001) ================
* Autor:
* Fecha:
* Requerimiento:
* Descripción:
*==============================================================
*/

var app = (function ($, win, doc) {

   
    // Variables generales
    var baseUrl = baseSiteUrl;
    var urlBase = baseUrl;
    $btnSalirPortal = $("#btnSalirPortal");
    

    var defaults = (function ($, w, d) {
        // Configuracion general del datatable
        var dataTableLanguage = {
            "paginate": {
                "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                "last": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                "next": '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                "previous": '<i class="fa fa-angle-left" aria-hidden="true"></i>'
            },
            "lengthMenu": "Registros por página: _MENU_",
            "search": "Buscar:",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "emptyTable": "Sin datos",
            "zeroRecords": "No existen coindicencias",
            "info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 al 0 registros",
            "infoFiltered": "(Filtrado de _MAX_ registros en total)",
            "select": {
                "rows": {
                    "_": "", //%d registros seleccionados
                    "0": "",
                    "1": "" //1 registro seleccionado
                }
            }
        };
        var dataTablePaging = true;
        var dataTableSearching = false;
        var dataTableOrdering = false;
        var dataTableSelect = {
            single: "single",
            multiple: 'multi'
        };
        var dataTableLengthChange = false;
        var dataTablePageLength = 20;

        // Configuracion general select2
        var select2AllowClear = true;
        var select2Style = {
            single: "single",
            multiple: "multiple"
        };

        // Configuraciones comunes
        var language = "es";
        var placeholder = "Seleccionar";

        // Configuracion del detepicker
        var datePickerFormat = "dd/mm/yyyy";
        var datePickerAutoclose = true;

        // Configuracion del modal
        var modalKeyboard = false;
        var modalBackdrop = "static";
        var minimumInputLength= 1;

        return {
            dataTableLanguage: dataTableLanguage,
            dataTablePaging: dataTablePaging,
            dataTableSearching: dataTableSearching,
            dataTableOrdering: dataTableOrdering,
            dataTableSelect: dataTableSelect,
            dataTableLengthChange: dataTableLengthChange,
            dataTablePageLength: dataTablePageLength,
            select2AllowClear: select2AllowClear,
            select2Style: select2Style,
            language: language,
            placeholder: placeholder,
            datePickerFormat: datePickerFormat,
            datePickerAutoclose: datePickerAutoclose,
            modalKeyboard: modalKeyboard,
            modalBackdrop: modalBackdrop,
            minimumInputLength: minimumInputLength
        };
    })($, win, doc);

    // Configuracion de mensajes del sistema
    var message = (function ($, w, d) {
        // Asignacion de variables del modal de mensajes
        var $modal = $("#modalMessage");
        var $header = $("#headerModalMessage");
        var $title = $("#titleModalMessage");
        var $body = $("#bodyModalMessage");
        var $btnAccept = $("#btnAcceptModalMessage");
        var $btnCancel = $("#btnCancelModalMessage");
     
        // Configuracion de las opciones por defecto
        var defaultsOptions = {
            title: "Mensaje al usuario",
            message: "",
            textButtonAccept: "Aceptar",
            textButtonCancel: "Cerrar",
            fnAfterAcceptCallback: null,
            fnAfterCancelCallback: null,
            fnCallback: null,
            style: {
                defaultValue: "modal fade",
                info: "modal modal-info fade",
                success: "modal modal-success fade",
                confirm: "modal modal-warning fade",
                error: "modal modal-danger fade"
            },
            styleHeader: {
                defaultValue: "modal-header app-modal-default",
                info: "modal-header app-modal-info",
                success: "modal-header app-modal-success",
                confirm: "modal-header app-modal-warning",
                error: "modal-header app-modal-danger"
            }
        };

        // Constructor
        $(construct);

        // Implementacion del constructor
        function construct() {
            // Binding de eventos
            $btnAccept.click($btnAccept_click);
            $btnCancel.click($btnCancel_click);
            $modal.on("hidden.bs.modal", $modal_on_hidden);
        }

        // Accion al dar click en el boton Aceptar del mensage
        function $btnAccept_click(e) {
            defaultsOptions.fnCallback = defaultsOptions.fnAfterAcceptCallback;
        }

        // Accion al dar click en el boton Cerrar del mensaje
        function $btnCancel_click(e) {
            defaultsOptions.fnCallback = defaultsOptions.fnAfterCancelCallback;
        }

        // Accion cuando se cierra el modal
        function $modal_on_hidden(e) {
            if (typeof (defaultsOptions.fnCallback) !== "undefined" && defaultsOptions.fnCallback != null) {
                defaultsOptions.fnCallback();
            }
        }

        // Muestra un mensaje modal predeterminado
        function defaults(message) {
            ocultarLoading();
            $modal.attr("class", defaultsOptions.style.defaultValue);
            $header.attr("class", defaultsOptions.styleHeader.Default);
            $title.text(defaultsOptions.title);
            $body.html(message || defaultsOptions.message);
            $btnAccept.show().html(defaultsOptions.textButtonAccept);
            $btnCancel.hide();
            defaultsOptions.fnAfterAcceptCallback = null;
            defaultsOptions.fnAfterCancelCallback = null;
            defaultsOptions.fnCallback = null;
            return $modal.modal({
                keyboard: defaults.modalBackdrop,
                backdrop: defaults.modalBackdrop
            });
        }

        // Muestra un mensaje modal de informacion
        function info(title, message, textButtonAccept, fnCallback) {
            ocultarLoading();
            $modal.attr("class", defaultsOptions.style.info);
            $header.attr("class", defaultsOptions.styleHeader.error);
            $title.text(title || defaultsOptions.title);
            $body.html(message || defaultsOptions.message);
            $btnAccept.show().html(textButtonAccept || defaultsOptions.textButtonAccept);
            $btnCancel.hide();
            defaultsOptions.fnAfterAcceptCallback = fnCallback;
            defaultsOptions.fnAfterCancelCallback = null;
            defaultsOptions.fnCallback = null;
            return $modal.modal({
                keyboard: defaults.modalKeyboard,
                backdrop: defaults.modalBackdrop
            });
        }

        // Muestra un mensaje modal satisactorio
        function success(title, message, textButtonAccept, fnCallback) {
            ocultarLoading();
            $modal.attr("class", defaultsOptions.style.success);
            $header.attr("class", defaultsOptions.styleHeader.error);
            $title.text(title || defaultsOptions.title);
            $body.html(message || defaultsOptions.message);
            $btnAccept.show().html(textButtonAccept || defaultsOptions.textButtonAccept);
            $btnCancel.hide();
            defaultsOptions.fnAfterAcceptCallback = fnCallback;
            defaultsOptions.fnAfterCancelCallback = null;
            defaultsOptions.fnCallback = fnCallback;
            return $modal.modal({
                keyboard: defaults.modalKeyboard,
                backdrop: defaults.modalBackdrop
            });
        }

        // Muestra un mensaje modal de confirmacion
        function confirm(title, message, textButtonAccept, textButtonCancel, fnAceptarCallback, fnCerrarCallback) {
            ocultarLoading();
            $modal.attr("class", defaultsOptions.style.confirm);
            $header.attr("class", defaultsOptions.styleHeader.error);
            $title.text(title || defaultsOptions.title);
            $body.html(message || defaultsOptions.message);
            $btnAccept.show().html(textButtonAccept || defaultsOptions.textButtonAccept);
            $btnCancel.show().html(textButtonCancel || defaultsOptions.textButtonCancel);
            defaultsOptions.fnAfterAcceptCallback = fnAceptarCallback;
            defaultsOptions.FnAfterCancelCallback = fnCerrarCallback;
            defaultsOptions.fnCallback = fnCerrarCallback;
            return $modal.modal({
                keyboard: defaults.modalKeyboard,
                backdrop: defaults.modalBackdrop
            });
        }

        // Muestra un mensaje modal de error
        function error(title, message, textButtonAccept, fnCallback) {
            ocultarLoading();
            $modal.attr("class", defaultsOptions.style.error);
            $header.attr("class", defaultsOptions.styleHeader.error);
            $title.text(title || defaultsOptions.title);
            $body.html(message || defaultsOptions.message);
            $btnAccept.show().html(textButtonAccept || defaultsOptions.textButtonAccept);
            $btnCancel.hide();
            defaultsOptions.fnAfterAcceptCallback = fnCallback;
            defaultsOptions.fnAfterCancelCallback = null;
            defaultsOptions.fnCallback = fnCallback;
            return $modal.modal({
                keyboard: defaults.modalKeyboard,
                backdrop: defaults.modalBackdrop
            });
        }

        // Retorno de funciones para ser llamados desde otros scripts
        return {
            defaults: defaults,
            info: info,
            success: success,
            confirm: confirm,
            error: error
        };
    })($, win, doc);

    var loading = (function ($, w, d) {
        // Asignacion de variables
        var $modal = $("#modalLoading");
        var $body = $("#messageLoading");
        var defaultMessage = "Procesando, por favor espere...";
        var isOpen = false;
        var isGlobal = false;
        // Constructor
        $(construct);

        // Implementacion del constructor
        function construct() {
            // Binding de eventos
            $modal.on("show.bs.modal", $modal_on_show);
            $modal.on("hidden.bs.modal", $modal_on_hidden);
        }

        // Agrega un estilo al modal backdrop del loading
        function $modal_on_show(e) {
            setTimeout(function () {
                var zi = obtenerMayorZIndex();
                $(".modal-backdrop").css("z-index", zi + 1);
                $modal.css("z-index", zi + 2);
            });
        }

        // Quita un estilo al modal backdrop del loading
        function $modal_on_hidden(e) {
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            setTimeout(function () {
                $(".modal-backdrop").css("z-index", "");
                $modal.css("z-index", "");
                $modal.modal("hide");
            });
        }

        // Muestra u oculta mensaje de espera mientras se cargan datos
        function show(message) {
            if (this.isOpen) {
                $body.html(message || defaultMessage);
                return;
            }
            this.isOpen = true;
            $body.html(message || defaultMessage);
            return $modal.modal({
                keyboard: defaults.modalKeyboard,
                backdrop: defaults.modalBackdrop
            });
        }

        function setMessage(message) {
            $body.html(message || defaultMessage);
        }

        // Muestra u oculta mensaje de espera mientras se cargan datos
        function hide() {
            if (!this.isOpen) {
                return;
            }
            this.isOpen = false;
            return $modal.modal("hide");
        }

        // Retorno de funciones
        return {
            show: show,
            hide: hide,
            setMessage: setMessage,
            isOpen: isOpen,
            isGlobal: isGlobal
        };
    })($, win, doc);

    $(initialize);

    function initialize() {
        
        $.fn.datepicker.defaults.autoclose = true;
        $.fn.datepicker.defaults.format = "dd/mm/yyyy";
        $.fn.datepicker.defaults.language = "es";

        $btnSalirPortal.click($btnSalirPortal_click);
    }

    function $btnSalirPortal_click() {
        document.getElementById('logoutForm').submit();
        //win.close();
    }

    // Obtiene del mayor valor del atributo z-index:
    function obtenerMayorZIndex() {
        var index_highest = 0;
        $("*").each(function () {
            var index_current = parseInt($(this).css("zIndex"), 10);
            if (index_current > index_highest)
                index_highest = index_current;
        });
        return index_highest;
    }

    var swAllowLoading = true;
    var swCallingAjax = true;
    var timerCallingLoading;

    function ValidateKeepLoading() {
        if (timerCallingLoading == null || timerCallingLoading == undefined) {
            timerCallingLoading = setInterval(TerminateLoading, 1000);
        }
    }

    function TerminateLoading() {
        if (swCallingAjax == false) {
            swAllowLoading = true;
            $modalLoading.hide();
            clearInterval(timerCallingLoading);
            timerCallingLoading = null;
        }
    }

    // Ejecuta una llamada ajax con los parametros especificados
    function llamarAjax(method, url, data, fnDoneCallback, fnFailCallback, fnAlwaysCallback, messageWait) {
        var m = method || "POST";
        var u = baseUrl + url;
        var d = data || "";

        swCallingAjax = true;

        if (swAllowLoading) {
            mostrarLoading();
            swAllowLoading = false;
        }

        return $.ajax({
            method: m,
            url: u,
            data: d,
            contentType: 'application/json',
            dataType: "json"
        }).done(function (data, textStatus, jqXhr) {
            //$modalLoading.hide();
            if (data.Status === 1) {
                if (typeof (fnDoneCallback) != "undefined" || fnDoneCallback != null) {
                    ValidateKeepLoading();
                    fnDoneCallback(data);
                }
            } else if (data.Status === 0) {
                TerminateLoading();
                message.error("Error", data.CurrentException, "Aceptar", fnFailCallback);
            }
            swCallingAjax = false;
        }).fail(function (jqXhr, textStatus, errorThrow) {
            $modalLoading.hide();
            message.error("Error inesperado", errorThrow, "Aceptar", fnFailCallback);
            swCallingAjax = false;
        }).always(function () {
            if (typeof (fnAlwaysCallback) !== "undefined" && fnAlwaysCallback != null) {
                fnAlwaysCallback();
            }
            if (!loading.isGlobal) {
                //$modalLoading.hide();
                ValidateKeepLoading();
            }
            swCallingAjax = false;
        });
    }

    function llamarAjaxNoLoading(method, url, data, fnDoneCallback, fnFailCallback, fnAlwaysCallback, messageWait) {
        var m = method || "POST";
        var u = baseUrl + url;
        var d = data || "";
        
        return $.ajax({
            method: m,
            url: u,
            data: d,
            contentType: 'application/json',
            dataType: "json"
        }).done(function (data, textStatus, jqXhr) {
            if (data.Status === 1) {
                if (typeof (fnDoneCallback) != "undefined" || fnDoneCallback != null) {
                    fnDoneCallback(data);
                }
            } else if (data.Status === 0) {
                message.error("Error", data.CurrentException, "Aceptar", fnFailCallback);
            }
        }).fail(function (jqXhr, textStatus, errorThrow) {
            message.error("Error inesperado", errorThrow, "Aceptar", fnFailCallback);
        }).always(function () {
            if (typeof (fnAlwaysCallback) !== "undefined" && fnAlwaysCallback != null) {
                fnAlwaysCallback();
            }
        });
    }
    
    var $modalLoading;
    function mostrarLoading() {
        $modalLoading = $("#modalLoading");
        var $modalLoading_body = $("#messageLoading");
        var defaultMessage = "Procesando, por favor espere...";
        $modalLoading_body.html(defaultMessage);
        var zi = obtenerMayorZIndex();
        $modalLoading.addClass("in");
        $modalLoading.css("z-index", zi + 2);
        $modalLoading.css("background-color", "#000000");
        $modalLoading.css("opacity", "0.5");
        $modalLoading.css("filter", "alpha(opacity=50)");
        $modalLoading.show();
    }

    function ocultarLoading() {
        $modalLoading.hide();
    }

    // Llena un datatable con datos y especificacion de columnas
    function llenarTabla(selector, data, columns, columnsDefs, tableName, rowCallback, drawCallback, filters) {

        var table;
        if ($.fn.dataTable.isDataTable(tableName)) {
            table = selector.dataTable().api();
        } else {
            table = selector.dataTable({
                paging: filters != null ? filters.dataTablePaging : false,
                searching: filters != null ? (filters.dataTableSearching || defaults.dataTableSearching) : defaults.dataTableSearching,
                info: filters != null ? filters.dataTableInfo : true,
                ordering: defaults.dataTableOrdering,
                select: {
                    style: defaults.dataTableSelect.single
                },
                order: [],
                columns: columns,
                columnDefs: columnsDefs,
                language: defaults.dataTableLanguage,
                rowCallback: rowCallback,
                drawCallback: drawCallback,
                pageLength: filters != null ? (filters.dataTablePageLength || defaults.dataTablePageLength) : defaults.dataTablePageLength,
                lengthChange: filters != null ? (filters.dataTableLengthChange || defaults.dataTableLengthChange) : defaults.dataTableLengthChange
            }).api();
        }
        table.clear();
        if (data != null) {
            table.rows.add(data.Result);
        }
        table.draw();
    }

    // Obtiene el valor de una celda del datatable especificado
    function obtenerValorCeldaTabla(selector, nameColumn) {
        try {
            var rows = selector.dataTable().api().rows(".selected").data().count();
            if (rows > 0) {
                var command = 'selector.dataTable().api().rows(".selected").data()[0].' + nameColumn;
                var value = eval(command);
                return value;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    // Llena un combox con datos
    function llenarCombo2(selector, data, selectorParent, firstItem, filters) {
        if (data.Result.length > 0) {
            if (firstItem || (filters != null && filters.placeholder)) {
                var item = data.Result[0];
                if (item.Id != null && item.Text != null) {
                    var obj = {
                        Id: "-1",
                        Text: firstItem || (filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder)
                    };
                    data.Result.splice(0, 0, obj);
                }
            }
        }
        selector.empty();
        selector.select2({
            dropdownParent: selectorParent,
            language: defaults.language,
            allowClear: filters != null && filters.allowClear != null ? defaults.allowClear : defaults.select2AllowClear,
            placeholder: filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder,
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

        var selected = selector.attr('data-selected');
        if (selected) {
            selector.val(selected).trigger("change");
        }
    }

    function llenarCombo(selector, data, selectorParent, firstValue, firstItem, filters) {
        if (data.Result.length > 0) {
            if (firstItem || (filters != null && filters.placeholder)) {
                var item = data.Result[0];
                if (item.Id != null && item.Text != null) {
                    var obj = {
                        Id: firstValue,
                        Text: firstItem || (filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder)
                    };
                    data.Result.splice(0, 0, obj);
                }
            }
        }
        selector.empty();
        selector.select2({
            dropdownParent: selectorParent,
            language: defaults.language,
            allowClear: filters != null && filters.allowClear != null ? defaults.allowClear : defaults.select2AllowClear,
            placeholder: filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder,
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
        var selected = selector.attr('data-selected');
        if (selected) {
            selector.val(selected).trigger("change");
        }
    }

    function llenarComboAjax(selector, url, selectorParent, filters) {
        selector.select2({
            minimumInputLength: filters != null ? (filters.minimumInputLength || defaults.minimumInputLength) : defaults.minimumInputLength,
            dropdownParent: selectorParent,
            language: 'es',
            //language: { errorLoading: function () { return "Buscando..." } },
            ajax: {
                url: url,
                data: function (params) {
                    var query = {
                        filtro: params.term
                    }

                    return query;
                },
                quietMillis: 500,
                dataType: 'json'
            },
            tags: true,
        });
    }

    function llenarComboMultiSelect(selector, data) {
        $.map(data.Result, function (obj, i) {
            if (obj.Id !== null && obj.Text !== null) {
                selector.append($("<option></option>").val(obj.Id).html(obj.Text));
            }
        });
    }

    function llenarComboMultiResult(selector, data, selectorParent, firstValue, firstItem, filters) {
        if (data.length > 0) {
            if (firstItem || (filters != null && filters.placeholder)) {
                var item = data[0];
                if (item.Id != null && item.Text != null) {
                    var obj = {
                        Id: firstValue,
                        Text: firstItem || (filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder)
                    };
                    data.splice(0, 0, obj);
                }
            }
        }
        selector.empty();
        selector.select2({
            dropdownParent: selectorParent,
            language: defaults.language,
            allowClear: filters != null && filters.allowClear != null ? defaults.allowClear : defaults.select2AllowClear,
            placeholder: filters != null ? (filters.placeholder || defaults.placeholder) : defaults.placeholder,
            data: $.map(data, function (obj, i) {
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
        var selected = selector.attr('data-selected');
        if (selected) {
            selector.val(selected).trigger("change");
        }
    }

    // Redirecciona a otra pagina local
    function redirectTo(url) {
        win.location.href = baseUrl + url;
    }

    function redirectToWindow(url) {
        var urlFull = baseUrl + url;
        window.open(urlFull);
    }

	 function buildParameters(obj) {
        var str = "";
        for (var key in obj) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }
        return str;
    }							   
    function validarEmail(email) {
        var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

        if (caract.test(email) == false) {
            return false;
        } else {
            return true;
        }
    }

    function parseDate(data) {
        var parts = data.split('/');
        //var date = new Date(parts[2], parts[1] - 1, parts[0]);
        var date = parts[2]+parts[1] +parts[0];
        return date;
    }

    // Verifica si el valor es nullo, vacío o no defindo.
    function isNull(valor) {
        if (typeof valor === "undefined" || valor === null || String(valor).trim().length === 0) {
            return true;
        } else {
            return false;
        }
    }

    function obtenerFecha(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var verify = parseFloat(results[1]);
        if (verify === -62135578800000) { // Valor minimo de una fecha en .net
            return '';
        }
        var dt = new Date(parseFloat(results[1]));
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        return (day > 9 ? day : "0" + day) + "/" + (month > 9 ? month : "0" + month) + "/" + dt.getFullYear();
    }
    function validacionesGeneralesFormularios(doc, formulario, rangoInicial, rangoFinal, type) {
       
        const inputs = [...doc.querySelectorAll(`#${formulario} input[type="${type}"]`)];
        const array = inputs.slice(rangoInicial, rangoFinal !== null && rangoFinal !== undefined ? rangoFinal : undefined);

        array.forEach(input => {
            if (input.value.trim() === "" || input.value.trim() === null || input.value.trim() === undefined) {
                app.message.error("Error en el campo", `El campo ${input.name} debe rellenarse`);
                return;
            }
        });
       

    }
    function obtenerFecha2(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        if (!results || results.length < 2) {
            console.error("El formato de la fecha no es válido o la fecha no fue encontrada.");
            return ''; 
        }
        var timestamp = parseFloat(results[1]);

        // Valor mínimo de una fecha en .NET (generalmente representa una fecha nula)
        var valorMinimo = -62135578800000;

        if (timestamp === valorMinimo) {
            return '';
        }

        // Crear el objeto Date
        var dt = new Date(timestamp);

        // Asegurarse de que la fecha es válida
        if (isNaN(dt.getTime())) {
            console.error("La fecha extraída no es válida.");
            return '';
        }
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return dt.toLocaleDateString('es-ES', options); // Puedes ajustar el locale según sea necesario
    }

    function obtenerFechaHora(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var hour = dt.getHours();
        var minute = dt.getMinutes();
        return (day > 9 ? day : "0" + day) + "/" + (month > 9 ? month : "0" + month) + "/" + dt.getFullYear() + " " + (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute);
    }

    function obtenerObjetoFecha(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        if (!results) return null;
        var dt = new Date(parseFloat(results[1]));
        return dt;
    }

    // Convierte un tipo DateTime .Net a Date in javascript
    function convertirEnFecha(data, conFormato) {
        try {
            var fecha = new Date(parseInt(data.substr(6)));

            if (conFormato) {
                var dd = fecha.getDate();
                var mm = fecha.getMonth() + 1;
                var yy = fecha.getFullYear();
                var fechaFormateada = ("00" + dd).slice(-2) + "/" + ("00" + mm).slice(-2) + "/" + yy;
                return fechaFormateada;
            } else {
                return fecha;
            }
        } catch (e) {
            return null;
        }
    }

    // Redirecciona a otra pagina local
    function redirigirA(url) {
        win.location.href = urlBase + url;
    }

    function abrirVentana(url) {
        win.open(urlBase + url, "_blank");
    }

    function validaNumeroDecimal(val) {
        if (isNaN(val)) {
            return false;
        }
        return true;
    }

    function validaNumeroEntero(val) {
        if (val == null) { return false; }
        var valAux = val;
        var nIni = 1;
        var nFin = val.length;
        for (nIni = 1; nIni <= nFin; nIni++) {
            valAux = valAux.replace(".", "");
            valAux = valAux.replace(",", "");
        }
        if (isNaN(valAux)) {
            return false;
        }
        return true;
    }

    return {
        baseUrl: baseUrl,
        defaults: defaults,
        message: message,
        loading: loading,
        obtenerMayorZIndex: obtenerMayorZIndex,
        llamarAjax: llamarAjax,
        llamarAjaxNoLoading: llamarAjaxNoLoading,
        llenarTabla: llenarTabla,
        obtenerValorCeldaTabla: obtenerValorCeldaTabla,
        llenarCombo: llenarCombo,
        redirectTo: redirectTo,
        redirectToWindow: redirectToWindow,
        validarEmail: validarEmail,
        obtenerFecha: obtenerFecha,
        obtenerFecha2: obtenerFecha2,
        obtenerObjetoFecha: obtenerObjetoFecha,
        obtenerFechaHora: obtenerFechaHora,
        validacionesGeneralesFormularios: validacionesGeneralesFormularios,
        llenarComboAjax: llenarComboAjax,
        buildParameters: buildParameters,
        llenarComboMultiSelect: llenarComboMultiSelect,
        llenarComboMultiResult: llenarComboMultiResult,
        parseDate: parseDate,
        isNull: isNull,
        convertirEnFecha: convertirEnFecha,
        redirigirA: redirigirA,
        abrirVentana: abrirVentana,
        validaNumeroDecimal: validaNumeroDecimal,
        validaNumeroEntero: validaNumeroEntero,
        mostrarLoading: mostrarLoading,
        ocultarLoading: ocultarLoading
    }
})(window.jQuery, window, document);

$(document).ajaxComplete(function (event, xhr, settings) {


    if (xhr.status == 401) {
        window.location = urlBaseAbsoluta;
    }
});