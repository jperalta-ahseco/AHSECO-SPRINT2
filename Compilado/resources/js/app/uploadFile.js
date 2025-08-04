var cargaFile = (function ($, win, doc) {
    var objUpload;
    var fnValidacion;

    function initialize($modalSelector, $objCarga, $btnCargar, fnValidacionCallback, fnObtenerDatosAdicionales, urlCarga, fnCallback, ) {
        fnValidacion = fnValidacionCallback;
        $btnCargar.click($btnCargar_click);
        console.log("entra");
        objUpload = $objCarga.uploadFile({
            url: app.baseUrl + urlCarga,
            multiple: false,
            maxFileCount: 1,
            doneStr: "Archivo correcto",
            dragDrop: false,
            sequential: true,
            uploadStr: "Seleccionar archivo",
            maxFileCountErrorStr: "Cantidad de archivos: ",
            enctype: "multipart/form-data",
            autoSubmit: false,
            showCancel: true,
            showDone: false,
            showDelete: false,
            showError: false,
            showAbort: false,
            showStatusAfterSuccess: true,
            showStatusAfterError: false,
            showFileCounter: false,
            cancelStr: '<i class="fa fa-times" aria-hidden="true"></i>',
            uploadButtonClass: "btn btn-danger btn-sm",
            extErrorStr: "No es una extensión valida, los tipos de extensión son: ",
            allowedTypes: "*",
            acceptFiles: "*",
            dynamicFormData: function () {
                var data = {};
                if (fnObtenerDatosAdicionales != null) {
                    data = fnObtenerDatosAdicionales();
                }
                return data;
            },
            customProgressBar: function (obj, s) {
                this.statusbar = $("<div class='ajax-file-upload-statusbar'></div>");
                this.progressDiv = $("<div class='ajax-file-upload-progress'>").appendTo(this.statusbar).hide();
                this.preview = $("<img class='ajax-file-upload-preview' />").width(s.previewWidth).height(s.previewHeight).appendTo(this.statusbar).hide();
                this.progressbar = $("<div class='ajax-file-upload-bar'></div>").appendTo(this.progressDiv);
                this.filename = $("<div class='ajax-file-upload-filename'></div>").appendTo(this.statusbar);
                this.abort = $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
                this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
                this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
                this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
                this.del = $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();
                //this.cancel.addClass("btn btn-default btn-xs");
                this.abort.addClass("btn btn-success btn-sm");
                this.done.addClass("ajax-file-upload-green");
                this.download.addClass("ajax-file-upload-green");
                this.cancel.addClass("ajax-file-upload-red");
                this.del.addClass("ajax-file-upload-red");

                return this;
            },
            onError: function (files, status, message, pd) {
                app.message.error("Cargar archivo", message, "Aceptar");
                objUpload.reset();
                objUpload = null;
                initialize($modalSelector, $objCarga, $btnCargar, fnValidacionCallback, fnObtenerDatosAdicionales, urlCarga, fnCallback);
                $btnCargar.prop("disabled", false);
            },
            onSuccess: function (files, data, xhr, pd) {
                if (data.Status == true) {
                    var fn = function () {
                        $modalSelector.modal('hide');

                        if (fnCallback != null) {
                            fnCallback(false);
                        }
                    };
                    app.message.success("Cargar archivo", "Archivo cargado correctamente", "Aceptar", fn);

                } else {
                    app.message.error("Cargar archivo", data.CurrentException, "Aceptar");
                }
                objUpload.reset();
                objUpload = null;
                initialize($modalSelector, $objCarga, $btnCargar, fnValidacionCallback, fnObtenerDatosAdicionales, urlCarga, fnCallback);
                $btnCargar.prop("disabled", false);
            },
            onSubmit: function (files) {
                if (app.isNull(files) || files.length === 0) {
                    app.message.info("Validación", "Debe agregar un archivo para iniciar la carga.");
                    return false;
                } else {
                    $btnCargar.prop("disabled", true);
                    return true;
                }
            }
        });
    }

    function $btnCargar_click() {
        if (!validarCarga()) {
            return false;
        }
        startUpload();
    }

    function validarCarga() {
        if (filesCount() <= 0) {
            app.message.info("Upload", "Debe agregar un archivo para iniciar la carga.");
            return false;
        }
        if (fnValidacion != null && !fnValidacion()) {
            return false;
        }
        return true;
    }
    function filesCount() {
        if (app.isNull(objUpload)) {
            return 0;
        }
        return objUpload.getFileCount();
    }

    function startUpload() {
        objUpload.startUpload();
    }

    return {
        initialize: initialize
    }
})(window.jQuery, window, document);