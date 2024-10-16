using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DetalleCotizacionDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long IdDetalleCot{ get; set; }
        public long Id_Cotizacion { get; set; }
        public string Tipo { get; set; }
        public string TipoProducto { get; set; }
        public string CodProducto{ get; set; }
        public string Descripcion{ get; set; }
        public string Unidad{ get; set; }
        public int Cantidad{ get; set; }
        public decimal CostoFob{ get; set; }
        public decimal VventaUni{ get; set; }
        public decimal VvTotalSigv { get; set; }
        public bool Eliminado{ get; set; }
    }
}
