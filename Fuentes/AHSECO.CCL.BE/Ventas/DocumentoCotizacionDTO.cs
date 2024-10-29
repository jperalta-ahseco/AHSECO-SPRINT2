using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DocumentoCotizacionDTO
    {
        public DocumentoCabCotizacionDTO DocumentoCabecera { get; set; }
        public List<DocumentoDetCotizacionDTO> DocumentoDetalle   { get; set; }
        public int NroItems { get; set; }
    }
}
