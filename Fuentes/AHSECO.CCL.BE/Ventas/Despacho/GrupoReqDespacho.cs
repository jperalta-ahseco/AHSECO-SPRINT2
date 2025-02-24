using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas.Despacho
{
    public class GrupoReqDespacho
    {
        public ReqDespachoCabecera Cabecera { get; set; }
        public List<ReqDespachoDetalle> ListDespachoDetalle { get; set; }
        public List<DocumentoDTO> Documentos { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
    }
}
