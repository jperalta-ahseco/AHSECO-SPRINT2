

var mensajes = {
    obteniendoPerfiles: "Obteniendo perfiles, por favor espere...",
    obteniendoUnidades: "Obteniendo unidades, por favor espere...",
}


function obtenerEstadosConvenios($cmbEstado) {
    var m = "POST";
    var url = "Utiles/obtenerEstadosConvenios";
    var data = "";
    var fnDoneCallback = function (data) {
        app.llenarCombo($cmbEstado, data, null, "", "Todos", null);        
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, "");
}

function obtenerEstadosPerfiles($cmbEstado) {
    var m = "POST";
    var url = "Utiles/obtenerEstadosPerfiles";
    var data = "";
    var fnDoneCallback = function (data) {
        app.llenarCombo($cmbEstado, data, null, "", "Todos", null);
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, "");
}

function obtenerSectores($cmbSectores) {
    var m = "POST";
    var url = "Utiles/obtenerSectores";

    var data = "";
    var fnDoneCallback = function (data) {
        app.llenarCombo($cmbSectores, data, null, "", "Todos", null);
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, "");
}

function obtenerAcuerdos($cmbAcuerdo) {
    var m = "POST";
    var url = "Utiles/obtenerAcuerdos";
    var data = "";
    var fnDoneCallback = function (data) {
        app.llenarCombo($cmbAcuerdo, data, null, "", "Seleccionar", null);
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, null);
}

function obtenerFinanciadores($cmbFinanciador) {
    var m = "POST";
    var url = "Utiles/obtenerFinanciadores";
    var data = "";
    var fnDoneCallback = function (data) {
        app.llenarCombo($cmbFinanciador, data, null, "", "Seleccionar", null);
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, null);
}


function obtenerMeses($cmbMeses) {
    var m = "POST";
    var url = "Utiles/ObtenerMeses";
    var data = "";
    var fnDoneCallback = function (data) {
        var filters = {};
        filters.placeholder = "Seleccionar";
        app.llenarCombo($cmbMeses, data, null, "", null, filters);
    }
    var fnAlwaysCallback = function () {
    }
    app.llamarAjax(m, url, data, fnDoneCallback, null, fnAlwaysCallback, null);
}


function listarRegiones($cmbRegion) {
    var m = "POST";
    var url = "Utiles/BuscarRegiones";
    var data = "";
    var fnDoneCallback = function (data) {
        var filters = {};
        filters.placeholder = "Seleccionar";
        app.llenarCombo($cmbRegion, data, null, "", null, filters);
    }
    var fnAlwaysCallback = function () {
    }
    app.llamarAjax(m, url, data, fnDoneCallback, null, fnAlwaysCallback, "Obteniendo regiones, por favor espere...");
}

function setUbigeo($cmbDepartamento, $cmbProvincia, $cmbDistrito, DepartamentoId, ProvinciaId, DistritoId) {

    var m = "POST";
    var url = "Utiles/obtenerUbigeos";

    var data = {
        departamento: { UbigeoId: DepartamentoId }, provincia: { UbigeoId: ProvinciaId }, Distrito: { UbigeoId: DistritoId }
    };
    var objParam = JSON.stringify(data);
    var fnDoneCallback = function (data) {

        app.llenarCombo($cmbDepartamento, data.Result.Departamentos, null, "", "<<--Seleccione-->>", null);
        $cmbDepartamento.val(DepartamentoId).trigger("change.select2"); //EL combo de departamentos ya se lleno

        app.llenarCombo($cmbProvincia, data.Result.Provincias, null, "", "<<--Seleccione-->>", null);
        $cmbProvincia.val(ProvinciaId).trigger("change.select2");

        app.llenarCombo($cmbDistrito, data.Result.Distritos, null, "", "<<--Seleccione-->>", null);
        $cmbDistrito.val(DistritoId).trigger("change.select2");
    }
    return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, null);
}

function obtenerDepartamentos($cmbDepartamento) {

    var m = "POST";
    var url = "Utiles/obtenerDepartamentos";
    var data = {};
    var fnDoneCallback = function (data) {
        app.llenarCombo($cmbDepartamento, data, null, "", "<<--Seleccione-->>", null);
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, null);
}

function obtenerProvincias($cmbDepartamento, $cmbProvincia) {

    var m = "POST";
    var url = "Utiles/obtenerProvincias";
    var ubigeoId = $cmbDepartamento.val();
    if (!ubigeoId) ubigeoId = "-1";
    var data = { departamento: { ubigeoId }, provincia: {} };
    var objParam = JSON.stringify(data);
    var fnDoneCallback = function (data) {

        app.llenarCombo($cmbProvincia, data, null, "", "<<--Seleccione-->>", null);
        $cmbProvincia.val("").trigger("change");
    }
    return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, null);
}

function obtenerDistritos($cmbDepartamento, $cmbProvincia, $cmbDistrito) {
    var m = "POST";
    var url = "Utiles/obtenerDistritos";
    var ubigeoId = $cmbProvincia.val();
    if (!ubigeoId) ubigeoId = "-1";
    var data = { departamento: { UbigeoId: $cmbDepartamento.val() }, provincia: { UbigeoId: ubigeoId }, distrito: {} };
    var objParam = JSON.stringify(data);
    var fnDoneCallback = function (data) {

        app.llenarCombo($cmbDistrito, data, null, "", "<<--Seleccione-->>", null);

    }
    return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, null);
}


function obtenerTiposDocumentos($cmbTipoDocumento) {
    var m = "POST";
    var url = "Utiles/ObtenerTiposDocumentos";
    var data = "";
    var fnDoneCallback = function (data) {
        var filters = null;//{};
        //filters.placeholder = "Seleccionar";
        app.llenarCombo($cmbTipoDocumento, data, null, "", "Todos", filters);
    }
    return app.llamarAjax(m, url, data, fnDoneCallback, null, null, "Obteniendo tipos de documentos, por favor espere...");
}

function cmbDepartamento_click(event) {
    obtenerProvincias(event.data.cmbDepartamento, event.data.cmbProvincia);
}

function cmbProvincia_click(event) {
    obtenerDistritos(event.data.cmbDepartamento, event.data.cmbProvincia, event.data.cmbDistrito);
}


function setPerfilUnidad($cmbPerfilOcupacional, $cmbUnidadCompetencia, PerfilId, UnidadId) {

    var m = "POST";
    var url = "Utiles/obtenerPerfilesUnidades";

    var data = {
        unidad: { IdPerfilOcupacional: PerfilId, Id: UnidadId }
    };
    var objParam = JSON.stringify(data);
    var fnDoneCallback = function (data) {

        app.llenarCombo($cmbPerfilOcupacional, data.Result.Perfiles, null, "", "--Seleccione--", null);
        $cmbPerfilOcupacional.val(PerfilId).trigger("change.select2"); //EL combo de departamentos ya se lleno

        app.llenarCombo($cmbUnidadCompetencia, data.Result.Unidades, null, "", "--Seleccione--", null);
        $cmbUnidadCompetencia.val(UnidadId).trigger("change.select2");
    }
    return app.llamarAjax(m, url, objParam, fnDoneCallback, null, null, null);
}

function cmbPefilOcupacional_click(event) {
    obtenerUnidadesCompetencia(event.data.cmbPerfilOcupacional, event.data.cmbUnidadCompetencia);
}

function obtenerUnidadesCompetencia($cmbPerfilOcupacional, $cmbUnidadCompetencia) {
    var m = "POST";
    var url = "Utiles/BuscarUnidades";
    var idPerfil = $cmbPerfilOcupacional.val();
    if (!idPerfil) idPerfil = "-1";
    var data = { IdPerfilOcupacional: idPerfil };
    var objParam = JSON.stringify(data);
    var fnDoneCallback = function (data) {
        var filters = {};
        filters.placeholder = "Seleccionar";
        app.llenarCombo($cmbUnidadCompetencia, data, null, "", null, filters);
    }
    var fnAlwaysCallback = function () {
        //listarLugarEvaluacion();
    }
    app.llamarAjax(m, url, objParam, fnDoneCallback, null, fnAlwaysCallback, "");
}


function listarPerfiles($cmbPerfilOcupacional) {
    var m = "POST";
    var url = "Utiles/BuscarPerfiles";
    var data = "";
    var fnDoneCallback = function (data) {
        var filters = {};
        filters.placeholder = "Seleccionar";
        app.llenarCombo($cmbPerfilOcupacional, data, null, "", "", filters);
        /*if (idPerfil) 
        {
            $cmbPerfilOcupacional.val(idPerfil).trigger("change.select2");
            //listarUnidades(idUnidad);
        }*/
    }
    var fnAlwaysCallback = function () {
        //  listarUnidades();
    }
    app.llamarAjax(m, url, data, fnDoneCallback, null, fnAlwaysCallback, mensajes.obteniendoPerfiles);
}


function cmbPerfilOcupacional_click(event) {
    listarUnidades(event.data.cmbPerfilOcupacional, event.data.cmbUnidadCompetencia);
}

// Listar unidades de competencia
function listarUnidades($cmbPerfilOcupacional, $cmbUnidadCompetencia) {
    var m = "POST";
    var url = "Utiles/BuscarUnidades";
    var idPerfil = $cmbPerfilOcupacional.val();
    if (!idPerfil) idPerfil = "-1";
    var data = { IdPerfilOcupacional: idPerfil };
    var objParam = JSON.stringify(data);
    var fnDoneCallback = function (data) {
        var filters = {};
        filters.placeholder = "Seleccionar";
        app.llenarCombo($cmbUnidadCompetencia, data, null, "", "", filters);
    }
    var fnAlwaysCallback = function () {
        //listarLugarEvaluacion();
    }
    app.llamarAjax(m, url, objParam, fnDoneCallback, null, fnAlwaysCallback, mensajes.obteniendoUnidades);
}