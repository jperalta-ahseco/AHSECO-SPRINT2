using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotizacionDetalleDTO : CamposAuditoriaDTO
    {
        public bool Select { get; set; }
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long IdCotizacion { get; set; }
        public int NroItem { get; set; }
        public string TipoItem { get; set; }
        public string CodItem { get; set; }
        public string Descripcion { get; set; }
        public string DescripcionAdicional { get; set; }
        public int Stock { get; set; }
        public string CodUnidad { get; set; }
        public string DescUnidad { get; set; }
        public int Cantidad { get; set; }
        public decimal? CostoFOB { get; set; }
        public decimal? VentaUnitaria { get; set; }
        public decimal? VentaTotalSinIGV { get; set; }
        public decimal? PorcentajeGanancia { get; set; }
        public decimal? VentaTotalSinIGVConGanacia { get; set; }
        public decimal? MontoDescuento { get; set; }
        public decimal? VentaTotalSinIGVDscto { get; set; }
        public bool EsItemPadre { get; set; }
        public int CantSubItem { get; set; }
        public CotDetDespachoDTO CotizacionDespacho { get; set; }
        public CotizacionCostoDTO CotizacionCosto { get; set; }

        #region BandejaInstalacionTecnica
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string NumFianza { get; set; }
        #endregion
    }
}
