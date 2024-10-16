using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotizacionDetalleDTO : CamposAuditoriaDTO
    {
        public long IdDetalle           { get; set; }
        public long IdCotizacion        { get; set; }
        public string CodCatalogo       { get; set; }
        public string Descripcion       { get; set; }
        public string Unidad            { get; set; }
        public int Cantidad             { get; set; }
        public decimal Utilidad         { get; set; }
        public decimal PrecioFabrica    { get; set; }
        public bool Eliminado           { get; set; }
    }
}
