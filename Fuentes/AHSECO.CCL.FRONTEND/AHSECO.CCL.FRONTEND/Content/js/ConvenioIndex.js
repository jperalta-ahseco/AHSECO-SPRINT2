(function ($, window, document) {
    //#region CARGAR DATA
	var RegistroId = 0;
    var RegistroId_Padre = 0;
    localStorage.setItem("RegistroId", JSON.stringify(0));
	function loadCombo() {
        //debugger;
        //$.CargarCombo("/Gestion/Parametros/TiposEmpresa/ConsultaPaginado", "#IdTipoEmpresa", "IdTipoEmpresa", "Descripcion");
        //$.CargarCombo("/Gestion/Maestros/TiposInformacion/ConsultaPaginado", "#IdTipoInformacion", "IdTipoInformacion", "Descripcion");
    }
	
    function loadData() {
        debugger
     
          getData(estado).done(setData);
    }
    function getData(estado) {
        return $.ajax({
            type: "POST",
            //url: @Url.Action("ConsultaPaginado", "Onvenio"),
            data: { Estado : estado  },
            dataType: "Json",
            async: false,
            error: function (ex) {
                $.ConnectionErrorMessage();
            }
            //success: OnAjaxSuccessLoadDataResolusion
        });
    }
    function setData(data) {
        if (data.Status === "OK") {
            var table = $('#tblLista').DataTable();
            table.clear().draw();
            table.destroy();
            loadTabla(data.Data.Listado, false);
            $.DataBind();
              
        }
    }
    function loadTabla(data, nuevo) {
        //var conceptos = data.Conceptos;
        $.each(data, function (i) {
            var cs = data[i];
            addRowTabla(cs, i, nuevo);
        });
        //pendiente
        $(".btn-remove-modal-row").click(onClickEliminarRow);
        $(".btn-edit-modal-row").click(onClickEditRow);
    }
    function addRowTabla(data, i) {
	
	var tr ='';
		tr+="<tr id='"+data.CconvId+"'>";;
		tr+="<td style='text-align: center;'>"+ (i + 1)+"</td>";

		tr+="<td style='text-align: middle;'>"+data.CconvId+"</td>";
		tr+="<td style='text-align: middle;'>"+data.SconvSector+"</td>";
		tr+="<td style='text-align: middle;'>"+data.SconvTipoCentroEvaluacion+"</td>";
 
		tr+="<td style='text-align: middle;text-align: center;'>";
		tr+="<button class='btn btn-sm btn-default btn-edit-modal-row' data-id='"+data.CconvId+"'><i class='fa fa-pencil'></i></button>";
		tr+="<button class='btn btn-sm btn-default btn-remove-modal-row' data-id='"+data.CconvId+"'><i class='fa fa-trash'></i></button>";

		tr += "</td>";
		tr += "</tr>";
		tr += "</tr>";
		$("#tblLista > tbody").append(tr);

}

//#endregion
    //#region EDITAR POPUP
    function onClickEditRow() {
        var RegistroId = $(this).data("id");
        debugger;
        localStorage.setItem("RegistroId", JSON.stringify(RegistroId));
        $("#Modal_Popup").modal("show");
    }
    //#endregion  
    //#region GRABAR 
    function onClickGrabar() {
        
        debugger;
        var registro = getRegistro();
		
		if (registro.CconvId==0)
		Grabar(registro).done(GrabarAjaxDone);
		else
		Actualizar(registro).done(GrabarAjaxDone);

    }
    function getRegistro() {
          if ($("#FlagActivo").is(':checked')) {
            FlagActivo = 1;
           
        } else {
            FlagActivo = 0;
           
        }
        var oregistro = {}
        oregistro = {	
			CconvId: $("#CconvId").val(),
			SconvSector: $("#SconvSector").val(),
			SconvTipoCentroEvaluacion: $("#SconvTipoCentroEvaluacion").val(),
			CcevaId: $("#CcevaId").val(),
	 
			RegistroId_Padre: parseInt(localStorage.RegistroId_Padre),
			RegistroId: parseInt(localStorage.RegistroId),
		};
		return oregistro;
		}

function Grabar(registro) {
        return $.ajax({
            type: "POST",
            async: false,
            //url: @Url.Action("Grabar", "Onvenio"),
            contentType: "application/json",
            dataType: "Json",
            data: JSON.stringify(registro),
            error: function (ex) {
                console.log(JSON.stringify(ex));
                $.ConnectionErrorMessage();
            }
        });
    }
function Actualizar(registro) {
        return $.ajax({
            type: "POST",
            async: false,
            //url: @Url.Action("Actualizar", "Onvenio"),
            contentType: "application/json",
            dataType: "Json",
            data: JSON.stringify(registro),
            error: function (ex) {
                console.log(JSON.stringify(ex));
                $.ConnectionErrorMessage();
            }
        });
    }
function GrabarAjaxDone(data) {
        if (data.Status === "OK") {
            
            loadData();
            
            $("#Modal_Popup").modal("hide");
            $(".btn-remove-modal-row").click(onClickEliminarRow);
            $.SuccessNotification("Se registro correctamente");

            

        } else if (data.Status === "NOVALID") {
            $.validarCampos(data.Errores);
        }
        else {
            if (data.StatusCode === -1)
                $.ErrorMessage(data.Mensaje);
            else
                $.ErrorMessage("Ocurrio un error interno. Comuniquese con el administrador del sistema.");
        }
    }
    
    //#endregion
    //#region ELIMINAR
    function onClickEliminarRow() {
         
        debugger;
        var documentoId = $(this).data("id");
        Lobibox.confirm({
            msg: "Se eliminará el registro seleccionado y los registros solidarios relacionados a él.",
            callback: function ($this, type, ev) {
                if (type === "yes") {
                    eliminarRegistro(documentoId);
                }
            }
        });
    }
    function eliminarRegistro(id) {

        deleteRegistro(id).done(function (data) {
            if (data.Status === "ERROR") {
                $.ErrorMessage(data.Mensaje);
            } else if (data.Status === "OK") {
                $("#Modal_ConfirmarEliminar").modal("hide");
                loadData();
            }
        });
    }
    function deleteRegistro(id) {
        debugger;
        return $.ajax({
            type: "POST",
            async: false,
            //url: @Url.Action("Eliminar", "Onvenio"),
            data: { RegistroId: id },
            dataType: "Json",
            error: function (ex) {
                $.ConnectionErrorMessage();
                console.log(JSON.stringify(ex));
            }
        });
    }
    //#endregion
    //#region EDITAR
    function onShowModal() {
      debugger;
         var RegistroId = parseInt(localStorage.RegistroId);
        if  (RegistroId !=0)
            loadDataModal(RegistroId, RegistroId_Padre);
        else
			$("#CconvId").val(0);
	}

    function loadDataModal(RegistroId, RegistroId_Padre) {
        var data = {};
        
		data.CconvId=RegistroId;


        getDatos(RegistroId).done(function (data) {
            if (data.Status === "ERROR") {
                $.ErrorMessage(data.Mensaje);
            } else if (data.Status === "OK") {
                
                setModal(data.Data.Listado);
            }
        });
    }
    function getDatos(registroId) {
        return $.ajax({
            type: "POST",
            async: false,
            //url: "/Gestion/Maestros/Onvenio/Consulta",
            data: { RegistroId: registroId },
            dataType: "Json",
            error: function (ex) {
                $.ConnectionErrorMessage();
                console.log(JSON.stringify(ex));
            }
        });
    }
    function setModal(data) {
		debugger;
        for (var i = 0; i < data.length; i++) {
		$("#CconvId").val(data[i].CconvId);
		$("#SconvSector").val(data[i].SconvSector);
		 
		
		}
	}
	
	function onHiddenModal() {
		$("#CconvId").val("");
		$("#SconvSector").val("");
		$("#SconvTipoCentroEvaluacion").val("");
	 
	}
	//#endregion EDITAR
    function onClickLnkPopup() {
        localStorage.setItem("RegistroId", JSON.stringify(0));
        $("#Modal_Popup").modal("show");
    }
	function onClickEstado() {
        loadData();
    }
    function codeBehind() {
		$("#Estado").change(onClickEstado);
        $("#btnPopup").click(onClickPopup);
        $("#btnGrabar").click(onClickGrabar);
        $("#FlagActivo").attr('checked', true);
        $("#Modal_Popup").on("show.bs.modal", onShowModal);
        $("#Modal_Popup").on("hidden.bs.modal", onHiddenModal);
		  $("#Estado").attr('checked', true);
        loadData();
		loadCombo();
    }
 
$(function () {
    codeBehind();
});
}(window.jQuery, window, document));

