using System;
using System.Net.Sockets;

namespace AHSECO.CCL.BE.Ventas
{
    public class BandejaSolicitudesDTO
    {
        public string NumeroSolicitud { get; set; }
        public int CodigoFlujo { get; set; }
        public string NombreFlujo { get; set; }
        public string FechaSolicitud { get; set; }
        public string TipoVenta { get; set; }
        public string TipoSolicitud { get; set; }
        public string MedioContacto { get; set; }
        public string TipoProceso { get; set; }
        public string NumeroProceso { get; set; }
        public string RucEmpresa { get; set; }
        public string NombreCliente { get; set; }
        public string NombreVendedor { get; set; }
        public string NombreEmpresa { get; set; }
        public string NombreEstado { get; set; }
        public string UsuarioRegistro { get; set; }
        public string FechaRegistro { get; set; }
        public string NumeroCotizacion { get; set; }
        public string FechaCotizacion { get; set; }
        public string NombreContacto { get; set; }
        public string AreaContacto { get; set; }
        public string TelefonoContacto { get; set; }
        public string EmailContacto { get; set; }
        public string PlazoEntrega { get; set; }
        public string FormaPago { get; set;}
        public string Moneda { get; set; }
        public string Vigencia { get; set; }
        public string Garantia { get; set; }
        public string Observacion { get; set; }
        public string PorcentajeDescuento { get; set; }
        public string Subtotal { get; set; }
        public string MontoIGV { get; set; }
        public string TotalVenta { get; set; }
        public string NumOrden { get; set; }
        public string FechaOrden { get; set; }
        public string FechaMaxima { get; set; }
        public string NumContrato { get; set; }
        public string FechaContrato { get; set; }
        public string PrestacionPrincipal { get; set; }
        public string PrestacionAccesoria { get; set; }
        public string NroFianzaPP { get; set; }
        public string NroFianzaPA { get; set; }
        public string Fianza { get; set; }
        public long IdSolicitud { get; set; }
        public long IdWorkFlow { get; set; }
        public string IdEstado { get; set; }
        public string EstadoAbreviado { get; set; }
        public string CodigoTipoSolicitud { get; set; }
        public int IdCliente { get; set; }
        public string NombreEquipo { get; set; }

        public int IdSede { get; set; }
        public string NomSede { get; set; }

    }
}
