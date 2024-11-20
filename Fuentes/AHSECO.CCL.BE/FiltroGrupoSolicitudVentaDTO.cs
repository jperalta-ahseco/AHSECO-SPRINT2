using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroGrupoSolicitudVentaDTO
    {
        public List<ComboDTO> Flujos { get; set; }
        public List<ComboDTO> TipoSol { get; set; }
        public List<ComboDTO> MedioContacto { get; set; }
        public List<ComboDTO> TipoMoneda { get; set; }
        public List<ComboDTO> Garantias { get; set; }
        public List<ComboDTO> FormPago { get; set; }
        public List<ComboDTO> Empresas { get; set; }
        public List<ComboDTO> TipoVenta { get; set; }
        public List<ComboDTO> TipoDocumento { get; set; }
        //Para traer la informacion a pintar de la solicitud de ventas:
        public SolicitudDTO Solicitud { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
        public List<WorkflowLogDTO> Seguimiento { get; set; }

        public ContadorCabeceraDespacho ContadorCabecera { get; set; }
        public CabeceraDespachoDTO DespachoCabeceraConStock { get; set; }
        public List<DetalleDespachoDTO> DespachoDetalleConStock { get; set; }
        public CabeceraDespachoDTO DespachoCabeceraSinStock { get; set; }
        public List<DetalleDespachoDTO> DespachoDetalleSinStock { get; set; }

    }
}
