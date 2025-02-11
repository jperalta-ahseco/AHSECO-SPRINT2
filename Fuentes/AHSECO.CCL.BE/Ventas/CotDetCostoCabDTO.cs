using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotDetCostoCabDTO
    {
        public long CodigoCotizacion { get; set; }
        public string TipoItem   { get; set; }
        public string CodigoItem { get; set; }
        public string Descripcion   { get; set; }
        public string Unidad   { get; set; }
        public int Cantidad  { get; set; }
        public string IndicadorStock { get; set; }
        public string IndicadorCompraLocal { get; set; }
        public string Dimensiones { get; set; }
        public string DescripcionAdicional { get; set; }
        public string ObservacionCliente { get; set; }
        public string ObservacionDespacho { get; set; }
        public string IndicadorRequierePlaca { get; set; }
        public string ExWork { get; set; }
        public decimal MargenAdicional { get; set; }
        public decimal VentaUnitaria { get; set; }
        public string CodigoGarantiaAdicional { get; set; }
        public string DescripcionMoneda { get; set; }
    }
}
