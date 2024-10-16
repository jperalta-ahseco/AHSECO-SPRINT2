(function ($) {
    $.fn.ScopeExport = function (parametros) {
        var defaults = {
            tipo: 'excel',
            nombreArchivo: 'tableExport'
        }

        $.extend(true, defaults, parametros);
        var thatoptions = this.bootstrapTable('getOptions');
        var thatel = this;
        var thattogglePagination = this.bootstrapTable('togglePagination'); ;

        var type = defaults.tipo,
                doExport = function () {
                    thatel.tableExport($.extend({}, thatoptions.exportOptions, {
                        type: type,
                        escape: false,
                        fileName: defaults.nombreArchivo
                    }));
                };

        if (thatoptions.exportDataType === 'all' && thatoptions.pagination) {
            thatel.one('load-success.bs.table page-change.bs.table', function () {
                doExport();
                thattogglePagination();
            });
            thattogglePagination();
        } else if (thatoptions.exportDataType === 'selected') {
            var data = that.getData(),
                    selectedData = that.getAllSelections();

            that.load(selectedData);
            doExport();
            that.load(data);
        } else {
            doExport();
        }
    };
    //Cargando
    $.fn.Loading = function (parametros) {
        if (parametros == "mostrar") {
            return this.append('<div id="divCargando" style="position:absolute;top:35%;left:45%;"><img src="../Images/ajax-loader.gif" alt="Cargando..." /></div>');
        }
        else if (parametros == "ocultar") {
            return $(this).find('#divCargando').remove();
        }
    };

    $.fn.validacionDefaults = { validationAdd: [], callback: null };
    $.fn.validacion = function (settings) {
        "use strict";
        var form = this;
        if ($(form).is('form')) {
            $(form).submit(function (event) {
                if ($(form).validar()) {
                    if (settings.callback != null) { settings.callback(); }
                    return true;
                } else {
                    event.preventDefault();
                }
            });
        }
        //si agregamos validaciones manuales ===
        settings = $.extend({}, $.fn.validacionDefaults, settings || {});
        for (var i = 0; i < settings.validationAdd.length; i++) {
            if (settings.validationAdd[i].tipo == 'requiredOneOf') {
                $(settings.validationAdd[i].controls).attr('data-val', 'true').attr('data-val-requiredoneof', settings.validationAdd[i].groupName);
            }
            else if (settings.validationAdd[i].tipo == 'requiredOneOfIf') {
                $(settings.validationAdd[i].controls).attr({
                    'data-val': 'true',
                    'data-val-requiredoneofif': settings.validationAdd[i].groupName,
                    'data-val-requiredoneofif-compare': settings.validationAdd[i].compare,
                    'data-val-requiredoneofif-conditional': settings.validationAdd[i].conditional,
                    'data-val-requiredoneofif-value': settings.validationAdd[i].value
                });
            }
            else if (settings.validationAdd[i].tipo == 'requiredIf') {
                $('#' + settings.validationAdd[i].control).attr({ 'data-val': 'true', 'data-val-requiredif': settings.validationAdd[i].compare, 'data-val-requiredif-conditional': settings.validationAdd[i].conditional, 'data-val-requiredif-value': settings.validationAdd[i].value });
            } else if (settings.validationAdd[i].tipo == 'gridRequiereDetalle') {
                $(form).append('<input type="hidden" id="req' + settings.validationAdd[i].control + '" name="req' + settings.validationAdd[i].control + '" value="" />');
                $('#req' + settings.validationAdd[i].control).attr({ 'data-val': 'true', 'data-val-gridrequired': settings.validationAdd[i].control, 'data-val-gridrequired-min': settings.validationAdd[i].minRows });
            }
        }
    };

    /*
    * validar: realiza una validacion de los campos obligatorios del contenedor donde se aplique este metodo
    * @param {object} settings, objecto del tipo $.fn.validarDefaults = { errorClass: "input-validation-error", validClass: "valid" };
    * @returns {elements} Returns el, los elementos encontrados 
    */
    $.fn.validarDefaults = { errorClass: "input-validation-error", validClass: "valid" };
    $.fn.validar = function (settings) {
        "use strict";
        // constructor ----------------------------------------------------------------------------
        var formulario = $(this);
        settings = $.extend({}, $.fn.validarDefaults, settings || {});
        if (!formulario) { return this; }
        var retval = true;
        var campos = $('input[data-val="true"], select[data-val="true"], textarea[data-val="true"]', formulario);
        $.each(campos, function (indice, elemento) {
            console.dir($(elemento));
            if ($(elemento).hasClass("select2-offscreen")) {
                $(elemento).siblings('div').unbind("focusout");
                $(elemento).siblings('div').on("focusout", function () {
                    if ($.trim($(elemento).val()) != '' && $.trim($(elemento).val()) != '-1') {
                        $(elemento).validateErrorRemove();
                    }
                    else {
                        $(elemento).validateErrorAdd();
                    }
                });
            }
            else {
                $(elemento).unbind("focusout");
                $(elemento).on("focusout", function () {
                    if ($.trim($(elemento).val()) != '' && $.trim($(elemento).val()) != '-1') {
                        $(elemento).validateErrorRemove();
                    }
                    else {
                        $(elemento).validateErrorAdd();
                    }
                });
            }

            //'1: valido tipos de datos ===
            //var attr = $(this).attr('data-val-number');
            // For some browsers, `attr` is undefined; for others,
            // `attr` is false.  Check for both.
            if (typeof $(elemento).attr('data-val-number') !== typeof undefined && $(elemento).attr('data-val-number') !== false) {
                if (!$.isNumeric($(elemento).val())) {
                    // si no es numero
                    $(elemento).removeClass(settings.validClass).addClass(settings.errorClass); retval = false;
                    //console.log($(elemento).attr('name'), '1: valido tipos de datos = false');
                } else {
                    $(elemento).removeClass(settings.errorClass).addClass(settings.validClass);
                }
            }
            //'2: valido los requeridos ==
            if (typeof $(elemento).attr('data-val-required') !== typeof undefined && $(elemento).attr('data-val-required') !== false) {
                if ($.trim($(elemento).val()) == '' || $.trim($(elemento).val()) == '-1') {
                    // si no es numero
                    /*$(elemento).removeClass(settings.validClass).addClass(settings.errorClass); */retval = false;
                    $(elemento).validateErrorAdd();
                    //console.log($(elemento).attr('name'), '2: valido los requeridos = false');
                } else {
                    //$(elemento).removeClass(settings.errorClass).addClass(settings.validClass);
                    $(elemento).validateErrorRemove();
                }
            }
            //'3: valido las longitudes del contenido ===
            if (typeof $(elemento).attr('data-val-length') !== typeof undefined && $(elemento).attr('data-val-length') !== false) {
                if ($.trim($(elemento).val()).length > parseInt($(elemento).attr('data-val-length-max'))) {
                    $(elemento).removeClass(settings.validClass).addClass(settings.errorClass); retval = false;
                    //console.log($(elemento).attr('name'), '3: valido las longitudes del contenido = false');
                } else {
                    $(elemento).removeClass(settings.errorClass).addClass(settings.validClass);
                }
            }
        });
        //console.log('4: valido loc campos grupales ===');
        var requeridoUnoDe = $(campos).filter(function (i, campo) {
            var g = typeof $(campo).attr('data-val-requiredoneof') !== typeof undefined && $(campo).attr('data-val-requiredoneof') !== false;
            if (g) { $(campo).removeClass(settings.validClass + ' ' + settings.errorClass); }
            return g;
        });
        $.each(requeridoUnoDe, function (indice, elemento) {
            if (!$(elemento).hasClass(settings.validClass) || !$(elemento).hasClass(settings.errorClass)) {
                var mismogrupo = $(campos).filter(function (i2, elemento2) { return $(elemento2).attr('data-val-requiredoneof') == $(elemento).attr('data-val-requiredoneof'); });
                var cantidad = $(mismogrupo).filter(function (i2, elemento2) {

                    return ($(elemento2).is(':checkbox') || $(elemento2).is(':radio') ? $(elemento2).is(':checked') : ($.trim($(elemento2).val()) != ''));
                    //return $.trim($(elemento2).val()) != ''; 

                }).length;
                if (cantidad == 0) {
                    retval = false;
                    $.each(mismogrupo, function (indice, elemento3) {
                        //if ($(elemento3).is(':checkbox') || $(elemento3).is(':radio')) {
                        //$(elemento3).parent().removeClass(settings.errorClass).addClass(settings.errorClass);
                        $(elemento3).validateErrorAdd();
                        //} else {
                        //$(elemento3).removeClass(settings.validClass).addClass(settings.errorClass);
                        //$(elemento).validateErrorRemove();
                        //}
                        //$(elemento3).removeClass(settings.validClass).addClass(settings.errorClass); 
                    });
                } else {
                    $.each(mismogrupo, function (indice, elemento3) {
                        //if ($(elemento3).is(':checkbox') || $(elemento3).is(':radio')) {
                        //$(elemento3).parent().removeClass(settings.errorClass).addClass(settings.validClass);
                        //$(elemento).validateErrorAdd();
                        //} else {
                        //$(elemento3).removeClass(settings.errorClass).addClass(settings.validClass);
                        $(elemento).validateErrorRemove();
                        //}
                        //$(elemento3).removeClass(settings.errorClass).addClass(settings.validClass); 
                    });
                }
            }
            //console.log($(elemento).attr('name'), retval);
        });
        //console.log('5: valido los campos requeridos ===');
        var requeridoSi = $(campos).filter(function (i, campo) {
            return typeof $(campo).attr('data-val-requiredif') !== typeof undefined && $(campo).attr('data-val-requiredif') !== false;
        });
        $.each(requeridoSi, function (indice, elemento) {

            var compare = $(elemento).attr("data-val-requiredif");              // "#Id1,#Id2,#Id3"
            var condition = $(elemento).attr("data-val-requiredif-conditional"); // "=,!=,="
            var value = $(elemento).attr("data-val-requiredif-value");          // '21,"datos",457'
            var blnValida = true;
            $.each(compare.split(','), function (i, campo) {
                var valor = '' + ($('#' + campo).is(':checkbox') || $('#' + campo).is(':radio') ? $('#' + campo).is(':checked') : $('#' + campo).val());
                if (condition.split(',')[i] == "=") {
                    if (value.split(',')[i] != valor) {
                        blnValida = false;
                    }
                }
                else if (condition.split(',')[i] == "!=") {
                    if (value.split(',')[i] == valor) {
                        blnValida = false;
                    }
                }
            });
            if (blnValida) {
                if ($.trim($(elemento).val()) != '' && $.trim($(elemento).val()) != '-1') {
                    $(elemento).validateErrorRemove();
                }
                else {
                    $(elemento).validateErrorAdd();
                    retval = false;
                }
            }


            /*//console.log($(elemento).attr('name'), retval);
            var compare = $(elemento).attr('data-val-requiredif');
            var condition = $(elemento).attr('data-val-requiredif-conditional');
            var value = $(elemento).attr('data-val-requiredif-value');
            if (condition == '=') { //si es igual
                //Para soportar varios elementos a comparar
                if (compare.indexOf(',') == -1) {
                    compare = '' + ($('#' + compare).is(':checkbox') || $('#' + compare).is(':radio') ? $('#' + compare).is(':checked') : $('#' + compare).val());
                    if (value == compare) {
                        console.log($.trim($(elemento).val()));
                        if ($.trim($(elemento).val()) != '' && $.trim($(elemento).val()) != '-1') {
                            $(elemento).validateErrorRemove();
                        }
                        else {
                            $(elemento).validateErrorAdd();
                        }
                        //if ($(elemento).is(':checkbox') || $(elemento).is(':radio')) {
                        //    if ($(elemento).is(':checked')) { $(elemento).parent().removeClass(settings.errorClass).addClass(settings.validClass); }
                        //    else { retval = false; $(elemento).parent().removeClass(settings.validClass).addClass(settings.errorClass); }
                        //} else {
                        //    if ($(elemento).val() != '') { $(elemento).removeClass(settings.errorClass).addClass(settings.validClass); }
                        //    else { retval = false; $(elemento).removeClass(settings.validClass).addClass(settings.errorClass); }
                        //}
                    } else {
                        if ($(elemento).is(':checkbox') || $(elemento).is(':radio')) {
                            $(elemento).parent().removeClass(settings.errorClass).addClass(settings.validClass);
                        } else {
                            $(elemento).removeClass(settings.errorClass).addClass(settings.validClass);
                        }
                    }
                } else {
                    $.each(compare.split(','), function (indice4, elemento4) {
                        var d = '' + ($('#' + elemento4).is(':checkbox') || $('#' + elemento4).is(':radio') ? $('#' + elemento4).is(':checked') : $('#' + elemento4).val());
                        if (value == d) {
                            if ($(elemento).is(':checkbox') || $(elemento).is(':radio')) {
                                if ($(elemento).is(':checked')) { $(elemento).parent().removeClass(settings.errorClass).addClass(settings.validClass); }
                                else { retval = false; $(elemento).parent().removeClass(settings.validClass).addClass(settings.errorClass); }
                            } else {
                                if ($(elemento).val() != '') { $(elemento).removeClass(settings.errorClass).addClass(settings.validClass); }
                                else { retval = false; $(elemento).removeClass(settings.validClass).addClass(settings.errorClass); }
                            }
                        }
                    });
                }
            } else if (condition == '!=') { //si es diferente
                compare = ($('#' + compare).is(':checkbox') || $('#' + compare).is(':radio') ? $('#' + compare).is(':checked') : $('#' + compare).val());
                if (value != compare) {
                    if ($(elemento).is(':checkbox')) {
                        if ($(elemento).is(':checked')) { $(elemento).parent().removeClass(settings.errorClass).addClass(settings.validClass); }
                        else { retval = false; $(elemento).parent().removeClass(settings.validClass).addClass(settings.errorClass); }
                    } else {
                        if ($(elemento).val() != '') { $(elemento).removeClass(settings.errorClass).addClass(settings.validClass); }
                        else { retval = false; $(elemento).removeClass(settings.validClass).addClass(settings.errorClass); }
                    }
                } else { $(elemento).parent().removeClass(settings.errorClass).addClass(settings.validClass); }
            }*/
        });
        //console.log('6: valido loc campos grupales ===');
        var requeridoUnoDeSi = $(campos).filter(function (i, campo) {
            var g = typeof $(campo).attr('data-val-requiredoneofif') !== typeof undefined && $(campo).attr('data-val-requiredoneofif') !== false;
            if (g) { $(campo).removeClass(settings.validClass + ' ' + settings.errorClass); }
            return g;
        });
        $.each(requeridoUnoDeSi, function (indice, elemento) {
            //console.log($(elemento).attr('name'), retval);
            if (!$(elemento).hasClass(settings.validClass) || !$(elemento).hasClass(settings.errorClass)) {
                var compare = $(elemento).attr('data-val-requiredoneofif-compare');
                var condition = $(elemento).attr('data-val-requiredoneofif-conditional');
                var value = $(elemento).attr('data-val-requiredoneofif-value');
                if (condition == '=') { //si es igual
                    //Para soportar varios elementos a comparar
                    if (compare.indexOf(',') == -1) {
                        compare = '' + ($('#' + compare).is(':checkbox') || $('#' + compare).is(':radio') ? $('#' + compare).is(':checked') : $('#' + compare).val());
                        if (value == compare) {
                            var mismogrupo = $(campos).filter(function (i2, elemento2) { return $(elemento2).attr('data-val-requiredoneofif') == $(elemento).attr('data-val-requiredoneofif'); });
                            var cantidad = $(mismogrupo).filter(function (i2, elemento2) { return $.trim($(elemento2).val()) != ''; }).length;
                            if (cantidad == 0) {
                                retval = false;
                                $.each(mismogrupo, function (indice, elemento3) { $(elemento3).removeClass(settings.validClass).addClass(settings.errorClass); });
                            } else {
                                $.each(mismogrupo, function (indice, elemento3) { $(elemento3).removeClass(settings.errorClass).addClass(settings.validClass); });
                            }
                        }
                    } else {
                        $.each(compare.split(','), function (indice4, elemento4) {
                            var d = '' + ($('#' + elemento4).is(':checkbox') || $('#' + elemento4).is(':radio') ? $('#' + elemento4).is(':checked') : $('#' + elemento4).val());
                            if (value == d) {
                                var mismogrupo = $(campos).filter(function (i2, elemento2) { return $(elemento2).attr('data-val-requiredoneofif') == $(elemento).attr('data-val-requiredoneofif'); });
                                var cantidad = $(mismogrupo).filter(function (i2, elemento2) {
                                    return ($(elemento2).is(':checkbox') || $(elemento2).is(':radio') ? $(elemento2).is(':checked') : ($.trim($(elemento2).val()) != ''));
                                }).length;
                                if (cantidad == 0) {
                                    retval = false;
                                    $.each(mismogrupo, function (indice, elemento3) {
                                        if ($(elemento3).parent().is('td')) { $(elemento3).parent().addClass('danger'); }
                                        else {
                                            if ($(elemento).is(':checkbox') || $(elemento).is(':radio')) { $(elemento3).parent().removeClass(settings.validClass).addClass(settings.errorClass); }
                                            else { $(elemento3).removeClass(settings.validClass).addClass(settings.errorClass); }
                                        }
                                    });
                                } else {
                                    $.each(mismogrupo, function (indice, elemento3) {
                                        if ($(elemento3).parent().is('td')) { $(elemento3).parent().removeClass('danger'); }
                                        else {
                                            if ($(elemento3).is(':checkbox') || $(elemento3).is(':radio')) { $(elemento3).parent().removeClass(settings.errorClass).addClass(settings.validClass); }
                                            else { $(elemento3).removeClass(settings.errorClass).addClass(settings.validClass); }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }

            }
        });
        //console.log('8: valido las grillas obligatorias');
        var gridRequerido = $(campos).filter(function (i, campo) {
            var g = typeof $(campo).attr('data-val-gridrequired') !== typeof undefined && $(campo).attr('data-val-gridrequired') !== false;
            if (g) { $(campo).removeClass(settings.validClass + ' ' + settings.errorClass); }
            return g;
        });
        $.each(gridRequerido, function (indice, elemento) {
            //console.log($(elemento).attr('name'), retval);
            if (!$(elemento).hasClass(settings.validClass) || !$(elemento).hasClass(settings.errorClass)) {
                var cantidad = $('#' + $(elemento).attr('data-val-gridrequired')).bootstrapTable('getData').length;
                if (cantidad < parseInt($(elemento).attr('data-val-gridrequired-min'))) {
                    retval = false;
                    $('#' + $(elemento).attr('data-val-gridrequired') + ' tr.no-records-found').addClass('danger').find('td').html('Debe ingresar al menos ' + $(elemento).attr('data-val-gridrequired-min') + ' detalle');
                } /*else {
                $.each(mismogrupo, function (indice, elemento3) {
                    if ($(elemento3).is(':checkbox') || $(elemento3).is(':radio')) {
                        $(elemento3).parent().removeClass(settings.errorClass).addClass(settings.validClass);
                    } else {
                        $(elemento3).removeClass(settings.errorClass).addClass(settings.validClass);
                    }
                });
            }*/
            }
            //console.log($(elemento).attr('name'), retval);
        });
        return retval;
    };

    $.fn.validateErrorAdd = function () {
        "use strict";
        var element = this[0];
        $(element).validateErrorRemove();
        console.dir($(element));

        $(element).removeClass("valid").addClass("input-validation-error");

        if (element.type == "text" || element.type == "select-one" || element.type == "file") {
            if ($(element).parent().hasClass("date-and-time"))
                $(element).siblings('input').after("<span id='error' class='val-error'>El campo es requerido.</span>");
            else if ($(element).hasClass("select2-offscreen")) {
                $(element).siblings('div').after("<span id='error' class='val-error'>El campo es requerido.</span>");
                $(element).siblings('div').attr("style", "border-color: #cc3f44 !important");
            }
            else
                $(element).after("<span id='error' class='val-error'>El campo es requerido.</span>");
            $(element).css("border-color", "#cc3f44");
        } else if (element.type == "radio") {
            //$(element).siblings('label').after("<span id='error' class='val-error'>El campo es requerido.</span>");
            $(element).siblings('label').css("color", "#cc3f44");
            $(element).siblings('label').find('span:first').css("border-color", "#CC3F44");
        } else if (element.type == "hidden") {
            var opts = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            if(element.value == "-1")
                toastr.error("Debe ingresar y validar el dni del nuevo usuario.", "Cambio de Usuario", opts);
            else
                toastr.error("Debe ingresar un email válido.", "Cambio de Usuario", opts);
            /*$(element).after("<span id='error' class='val-error'>Debe ingresar y validar el dni del nuevo usuario.</span>");
            $(element).siblings('input[type="text"]').css("border-color", "#cc3f44");*/
        }
    }
    $.fn.validateErrorRemove = function () {
        "use strict";
        var element = this[0];

        $(element).removeClass("input-validation-error").addClass("valid");

        if (element.type == "text" || element.type == "select-one" || element.type == "file") {
            $(element).siblings("#error").remove();
            if ($(element).hasClass("select2-offscreen"))
                $(element).siblings('div').css("border-color", "#e4e4e4");
            else
                $(element).css("border-color", "#e4e4e4");
        } else if (element.type == "radio") {
            $(element).siblings("#error").remove();
            $(element).siblings('label').css("color", "");
            console.log($(element).siblings('label').find('span:first').css("border-color"));
            $(element).siblings('label').find('span:first').css("border-color", "#C0C0C0");
        } else if (element.type == "hidden") {
            $(element).parent().find("#error").remove();
            $(element).css("border-color", "#e4e4e4");
        }
    }

    $.fn.validate = function (settings) {
        var validar = true;
        this.find("[dataRequired]").each(function (index, element) {

        });
        return validar;
    };

    $.fn.vacio = function (parametros) {
        var defaults = {
            NumeroItems: 3,
            Mensaje: 'No existe información registrada'
        }
        $.extend(true, defaults, parametros);
        this[0].addInitHandler(function (chart) {
            // check if data is empty
            if (chart.dataProvider === undefined || chart.dataProvider.length === 0) {
                // add some bogus data

                for (var i = 0; i < defaults.NumeroItems; i++) {
                    var dp = {};
                    dp[chart.titleField] = "";
                    dp[chart.valueField] = 1;
                    chart.dataProvider.push(dp)
                }

                chart.legend = null;

                // disable slice labels
                chart.labelsEnabled = false;

                // add label to let users know the chart is empty
                chart.addLabel("50%", "50%", defaults.Mensaje, "middle", 15);

                // dim the whole chart
                chart.alpha = 0.6;
            }

        }, ["pie"]);
    }

})(jQuery);

function chartVacio(parametros) {
    var defaults = {
        NumeroItems: 3,
        Mensaje: 'No existe información registrada'
    }
    $.extend(true, defaults, parametros);
    
    AmCharts.addInitHandler(function (chart) {
        // check if data is empty
        if (chart.dataProvider === undefined || chart.dataProvider.length === 0) {
            // add some bogus data
            for (var i = 0; i < defaults.NumeroItems; i++) {
                var dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = 1;
                chart.dataProvider.push(dp)
            }

            chart.legend = null;

            // disable slice labels
            chart.labelsEnabled = false;

            // add label to let users know the chart is empty
            chart.addLabel("50%", "50%", defaults.Mensaje, "middle", 15);

            // dim the whole chart
            chart.alpha = 0.6;
        }

    }, ["pie"]);
}

function recuperarInformacion(parametros) {
    parametros = $.extend({}, { type: 'POST', data: null, url: "", dataType: 'json', beforeSend: function () { }, success: function () { }, error: null, complete: null, async: true }, parametros || {});
    $.ajax({
        type: parametros.type,
        url: parametros.url,
        data: JSON.stringify(parametros.data),
        contentType: "application/json",
        dataType: parametros.dataType,
        async: parametros.async,
        beforeSend: parametros.beforeSend,
        success: function (response) {
            console.table($(response));
            parametros.success(response);
            //if (response.Estado == "success") {
            //    if (response.HacerPostback) { window.location.reload(); }
            //    else {
            //        if (response.Mensaje) { alerta(response.Mensaje, response.Estado); }
            //        parametros.success(response.Data);
            //    }
            //} else { alerta(response.Mensaje, response.Estado); }
        },
        error: function (request, status, error) {
            console.log(error);
            console.log(status);
            console.log(request);
            if (request.status == 420) { var response = $.parseJSON(request.responseText); window.location = response.LogOutUrl; } else { if (parametros.error) { parametros.error(); } }
        },
        complete: parametros.complete
    });
};

function SendPost(path, params, method) {
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    form.setAttribute("target", "_blank");

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}