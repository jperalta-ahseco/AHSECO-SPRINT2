using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class GrupoReclamoDTO
    {
        public ReclamosDTO Reclamo{ get; set; }
        public List<TecnicoGarantiaDTO> Tecnicos { get; set; }
        public List<WorkflowLogDTO> Seguimiento { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
    }
}

