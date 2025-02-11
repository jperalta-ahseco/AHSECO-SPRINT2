using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CosteoCotizacionDTO
    {
        public string Tipo   { get; set; }
        public long CodigoCotizacionDetalle { get; set; }
        public int Cantidad   { get; set; }
        public string IndicadorStock { get; set; }
        public string Dimensiones { get; set; }
        public string ObservacionCliente { get; set; }
        public string ObservacionDespacho { get; set; }
        public string DescripcionAdicional { get; set; }
        public decimal MontoUnitario { get; set; }
        public string IndicadorCompraLocal { get; set; }
        public string IndicadorRequierePlaca { get; set; }
        public string CodigoGarantiaAdicional { get; set; }
        public decimal PorcentajeGanancia { get; set; }
        public string UsuarioRegistro { get; set; }

    }
}
