using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas.Despacho;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class GrupoFiltroDespacho
    {
        public List<ComboDTO> TipDespacho { get; set; }
        public List<ComboDTO> Tipo { get; set; }
        public List<ComboDTO> Estados { get; set; }
        public List<ComboDTO> TipoDocumento { get; set; }
        public ReqDespachoCabecera DespachoCabecera { get; set; }
        public List<ReqDespachoDetalle> ListaDespachoDetalle { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
        public List<WorkflowLogDTO> Seguimiento { get; set; }
        public ContadorCabeceraDespacho ContadorCabecera { get; set; }
        public CabeceraDespachoDTO DespachoCabeceraConStock { get; set; }
        public List<DetalleDespachoDTO> DespachoDetalleConStock { get; set; }
        public CabeceraDespachoDTO DespachoCabeceraSinStock { get; set; }
        public List<DetalleDespachoDTO> DespachoDetalleSinStock { get; set; }
        public List<TecnicoInstalacionDTO> TecnicosDespacho { get; set; }
    }
}
