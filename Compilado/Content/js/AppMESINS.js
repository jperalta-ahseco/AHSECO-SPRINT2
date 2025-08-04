

(function ($, window, document) {
  
    function loadData() {
        getData().done(setData);
    }
    function getData() {
    

        return $.ajax({
            type: "POST",
            url: $("#url_base").val() + "MesasInstaladas/ListarMesas",
            data: {IdProceso:84
            },
            dataType: "Json",
            async: false,
            error: function (ex) {
                //$.ConnectionErrorMessage();
            }
            //success: OnAjaxSuccessLoadDataResolusion
        });
    }
    function setData(data) {
        debugger;
        
            $("#tblLista > tbody").empty();
            loadTabla(data, false);
         
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


        $('table#tblLista').dataTable().fnAddData([
            
            '<label>' + data.TXREGION + '</label>',
            '<label>' + data.NUMESAS + '</label>',
            '<label>' + data.NUMESASINSTALADAS + '</label>',
            
            '<label>' + data.NUPORCMESASINSTALADAS + '</label>']);

        $("#MESASINSTALADAS").text(data.MESASINSTALADA);
        $("#HORA").text(data.PORCINSTALADA);

    }
    function codeBehind() {
        loadData();
    }
    $(function () {
        codeBehind();
    });
}(window.jQuery, window, document));


