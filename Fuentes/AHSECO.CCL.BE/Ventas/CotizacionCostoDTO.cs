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
        public int NumSecuencia { get; set; }
        public string CodCosto { get; set; }
        public int? CantidadDespacho { get; set; }
        public int? CantPreventivo { get; set; }
        public string CodCicloPreventivo { get; set; }
        public string CodUbigeoDestino { get; set; }
        public string DescUbigeoDestino { get; set; }
        public string Direccion { get; set; }
        public string AmbienteInsta { get; set; }
        public int? NroPiso { get; set; }
        public decimal? MontoCosto { get; set; }
    }
}
