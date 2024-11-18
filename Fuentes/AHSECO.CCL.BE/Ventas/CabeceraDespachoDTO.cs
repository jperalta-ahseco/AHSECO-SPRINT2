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

    public class ContadorCabeceraDespacho
    {
        public long CodigoSolicitud { get; set; }
        public int ContadorConStock { get; set; }
        public int ContadorSinStock { get; set;}

        public string NumeroOrden { get; set; }
        public string FechaOrden { get; set; }
        public string FechaMaxima { get; set; }

        public int NumeroConStock { get; set; }
        public int NumeroSinStock { get; set; }

        public int EnvioGPConStock { get;set; }
        public int EnvioGPSinStock { get; set; }
        public int EnvioBOSinStock {  get; set; }

        public int GestionLogConStock { get; set; }
        public int GestionLogSinStock { get; set; }
        public int ContadorSeriesConStock { get; set; }
        public int ContadorSeriesSinStock { get; set; }
    }
}
