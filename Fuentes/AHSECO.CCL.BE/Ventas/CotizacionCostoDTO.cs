using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotizacionCostoDTO : CamposAuditoriaDTO
    {
        public long Id { get; set; }
        public long IdCotizacionDetalle { get; set; }
        public string CodCosto { get; set; }
        public int? Cantidad { get; set; }
        public decimal? MontoCosto { get; set; }
    }
}
