var bandejaDespacho = (function ($, win, doc) {
    /***/
    var $btnBuscar = $('#btnBuscar');
    var $btnNuevo = $('#btnNuevo');
    var $btnRegresar = $('#btnRegresar');
    var $txtOrdenCompra = $('#txtOrdenCompra');
    var $txtNumContrato = $('#txtNumContrato');


    /*Tabla*/
    var $tblDespacho = $('#tblDespacho');


    /*Mensajes*/
    var mensajes = {

    };


    $(Initialize);

    function Initialize() {
        $btnBuscar.click(Buscar);
        $btnRegresar.click(Regresar);
        $btnNuevo.click(Nuevo);
    };

    function Buscar() {

    };


    function Regresar() {
        app.redirectTo("BandejaVentas")
    };

    function Nuevo() {
        app.redirectTo("BandejaSolicitudesVentas/DetalleDespacho")  
    };

    return {


    };
})(window.jQuery, window, document);