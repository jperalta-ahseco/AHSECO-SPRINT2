using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class GrupoMantPreventivoDTO
    {
        public  MantPreventivoDTO MantPreventivo{ get; set; }
        public List<TecnicoMantPreventivoDTO> Tecnicos { get; set; }
        public List<WorkflowLogDTO> Seguimiento { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
    }
}
