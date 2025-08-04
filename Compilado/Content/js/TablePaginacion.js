(function ($, window, document) {
    function codeBehind() {
        $('table#tblLista').DataTable({

            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": { "sFirst": "Primero", "sLast": "Último", "sNext": "Siguiente", "sPrevious": "Anterior" },
                "oAria": { "sSortAscending": ": Activar para ordenar la columna de manera ascendente", "sSortDescending": ": Activar para ordenar la columna de manera descendente" }
            },
            dom: 'Bfrtip',
            buttons: [
                'excelHtml5',
                 {
                    extend: 'print',
                    customize: function (win) {
                        $(win.document.body)
                            .css('font-size', '10pt')
                            .prepend(
                            '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                            );

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]
            //buttons: [
            //    'excelHtml5',
            //    'pdfHtml5'
            //]

        });

        //$(document).ready(function () {
        //    $('#tblLista').DataTable({
        //        {
        //            paging: false,
        //            columnDefs: [{
        //                targets: 'no-sort',
        //                orderable: false
        //            }],
        //            dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
        //                '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
        //                '<"row"<"col-sm-5"i><"col-sm-7"p>>',
        //            fixedHeader: {
        //                header: true
        //            },
        //            buttons: {
        //                buttons: [{
        //                    extend: 'print',
        //                    text: '<i class="fa fa-print"></i> Print',
        //                    title: $('h1').text(),
        //                    exportOptions: {
        //                        columns: ':not(.no-print)'
        //                    },
        //                    footer: true,
        //                    autoPrint: false
        //                }, {
        //                    extend: 'pdf',
        //                    text: '<i class="fa fa-file-pdf-o"></i> PDF',
        //                    title: $('h1').text(),
        //                    exportOptions: {
        //                        columns: ':not(.no-print)'
        //                    },
        //                    footer: true
        //                }],
        //                dom: {
        //                    container: {
        //                        className: 'dt-buttons'
        //                    },
        //                    button: {
        //                        className: 'btn btn-default'
        //                    }
        //                }
        //            }
        //        });
        //});
    }
    $(function () {
        codeBehind();

    });


}(window.jQuery, window, document));