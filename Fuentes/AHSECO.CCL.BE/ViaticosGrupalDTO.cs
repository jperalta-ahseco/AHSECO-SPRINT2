using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ViaticosGrupalDTO : CamposAuditoriaDTO
    {
        public ViaticosDTO CabeceraViatico { get; set; }
        public List<ViaticosDetalleDTO> DetallesViatico { get; set; }
        public List<WorkflowLogDTO> Seguimiento { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
    }
}
