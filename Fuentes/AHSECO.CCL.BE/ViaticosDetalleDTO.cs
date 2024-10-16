using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ViaticosDetalleDTO : CamposAuditoriaDTO
    {
        public long CodigoDetalleViatico { get; set; }
        public int CodigoViatico { get; set; }
        public string CodigoTipo { get; set; }
        public string Tipo { get; set; }
        public string Concepto { get; set; }
        public string Detalle { get; set; }
        public int Cantidad { get; set; }
        public decimal ValorUnitario { get; set; }
        public decimal Monto { get; set; }
        public bool Estado { get; set; }
        public string Accion { get; set; }
        public string DescripcionTipo { get; set; }
    }
}
