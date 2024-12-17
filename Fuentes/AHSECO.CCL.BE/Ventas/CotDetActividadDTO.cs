using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotDetActividadDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long IdCotizacionDetalle { get; set; }
        public string CodigoActividad { get; set; }
        public string DescripcionActividad { get; set; }
    }
}
