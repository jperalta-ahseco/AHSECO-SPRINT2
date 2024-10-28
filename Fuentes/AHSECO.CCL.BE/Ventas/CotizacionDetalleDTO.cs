using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotizacionDetalleDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long IdCotizacion { get; set; }
        public int NroItem { get; set; }
        public string TipoItem { get; set; }
        public string CodItem { get; set; }
        public string Descripcion { get; set; }
        public int Stock { get; set; }
        public string Unidad { get; set; }
        public int Cantidad { get; set; }
        public decimal CostoFOB { get; set; }
        public decimal VentaUnitaria { get; set; }
        public decimal VentaTotalSinIGV { get; set; }
        public decimal PorcentajeGanancia { get; set; }
        public decimal VentaTotalConGanacia { get; set; }
        public bool LLaveEnMano { get; set; }
        public int Piso { get; set; }
        public string Ubigeo { get; set; }
        public string Direccion { get; set; }
        public string Dimension { get; set; }
        public int CantidadPreventivo { get; set; }
        public string PeriodoPreventivo { get; set; }
        public bool Manuales { get; set; }
        public bool Videos { get; set; }
        public bool InstCapa { get; set; }
        public string GarantiaAdic { get; set; }
    }
}
