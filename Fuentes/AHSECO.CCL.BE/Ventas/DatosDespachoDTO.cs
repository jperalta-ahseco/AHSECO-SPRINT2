using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DatosDespachoDTO 
    {
        public string Tipo { get; set; }
        public long CodigoSolicitud { get; set; }
        public long CodigoCotizacion { get; set; }
        public long CodigoWorkFlow { get; set; }
        public string NombrePerfil { get; set; }
        public string NumeroOrden { get; set; }
        public DateTime? FechaOrden { get; set; }
        public DateTime? FechaMaxima { get; set; }
        public string Stock { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public string NumeroGuiaRemision { get; set; }
        public string NumeroFactura { get; set; }
        public string NumeroPedido { get; set; }
        public DateTime? FechaIngreso { get; set; }
        public string EstadoAprobacion { get; set; }
        public string Observacion { get; set; }
        public string UsuarioRegistro { get; set; }

    }
}
