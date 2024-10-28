using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class SolicitudVentaGrupoDTO
    {
        public SolicitudDTO Solicitud { get; set; }
        public CotizacionDTO CabeceraCotizacion { get; set; }
        public List<CotizacionDetalleDTO> DetalleCotizacion { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
        public List<WorkflowLogDTO> Seguimiento { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
    }
}
