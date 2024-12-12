using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotDetCostoDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long IdCotizacionDetalle { get; set; }
        public int NumSecuencia { get; set; }
        public string CodCosto { get; set; }
        public string DescCosto { get; set; }
        public int? CantidadCosto { get; set; }
        public int? CantPreventivo { get; set; }
        public string CodCicloPreventivo { get; set; }
        public string CodUbigeoDestino { get; set; }
        public string DescUbigeoDestino { get; set; }
        public string Direccion { get; set; }
        public string AmbienteDestino { get; set; }
        public int? NroPiso { get; set; }
        public decimal? MontoUnitarioCosto { get; set; }
        public decimal? MontoTotalCosto { get; set; }
        public CotizacionDetalleDTO CotizacionDetalle { get; set; }

        #region "Cotizacion Detalle"
        public long IdCotizacion { get; set; }
        public int CantidadCotizada { get; set; }
        public string CodUnidadCotizada { get; set; }
        public string DescUnidadCotizada { get; set; }
        #endregion

    }
}
