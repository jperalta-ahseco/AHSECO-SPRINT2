using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CabeceraDespachoDTO :CamposAuditoriaDTO
    {
        public long Id { get; set; }
        public long CodigoSolicitud { get; set; }
        public string Stock { get; set; }
        public string NumeroOrden { get; set; }
        public string FechaOrden { get; set; }
        public string FechaMaxima { get; set; }
        public string FechaEntrega { get; set; }
        public string NumeroGuiaRemision { get; set; }
        public string NumeroFactura { get; set; }
        public string NumeroPedido { get; set; }
        public string FechaIngreso { get; set; }
        public string EstadoAprobacion { get; set; }

        public string FechaAprobacion { get; set; }
        public string Observacion { get; set; }

    }
}
