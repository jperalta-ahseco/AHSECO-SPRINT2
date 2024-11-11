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
        public bool IsTempRecord { get; set; }

        #region BandejaInstalacionTecnica
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string NumFianza { get; set; }
        #endregion

        public void CopyTo(ref CotizacionDetalleDTO obj)
        {
            obj.Cantidad = Cantidad;
            obj.CantSubItem = CantSubItem;
            obj.CodItem = CodItem;
            obj.CostoFOB = CostoFOB;
            obj.CotizacionCosto = CotizacionCosto;
            obj.CotizacionDespacho = CotizacionDespacho;
            obj.Descripcion = Descripcion;
            obj.DescripcionAdicional = DescripcionAdicional;
            obj.DescUnidad = DescUnidad;
            obj.EsItemPadre = EsItemPadre;
            obj.FechaModifica = FechaModifica;
            obj.FechaRegistro = FechaRegistro;
            obj.Id = Id;
            obj.IdCotizacion = IdCotizacion;
            obj.IpMaquinaModifica = IpMaquinaModifica;
            obj.IsTempRecord = IsTempRecord;
            obj.Marca = Marca;
            obj.Modelo = Modelo;
            obj.MontoDescuento = MontoDescuento;
            obj.NroItem= NroItem;
            obj.NumFianza = NumFianza;
            obj.PorcentajeGanancia = PorcentajeGanancia;
            obj.Select = Select;
            obj.Serie = Serie;
            obj.Stock = Stock;
            obj.TipoItem = TipoItem;
            obj.TipoProceso = TipoProceso;
            obj.UsuarioModifica = UsuarioModifica;
            obj.UsuarioRegistra = UsuarioRegistra;
            obj.VentaTotalSinIGV = VentaTotalSinIGV;
            obj.VentaTotalSinIGVConGanacia = VentaTotalSinIGVConGanacia;
            obj.VentaTotalSinIGVDscto = VentaTotalSinIGVDscto;
            obj.VentaUnitaria = VentaUnitaria;
        }
    }
}
