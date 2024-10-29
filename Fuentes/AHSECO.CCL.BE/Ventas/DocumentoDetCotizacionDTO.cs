using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DocumentoDetCotizacionDTO
    {
        public string NumeroItem { get; set; }
        public string Catalogo   { get; set; }
        public string Descripcion   { get; set; }
        public string Unidad   { get; set; }
        public string Cantidad  { get; set; }
        public string PrecioUnitario { get; set; }
        public string Total { get; set; }
      
    }
}
