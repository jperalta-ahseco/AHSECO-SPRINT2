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

    }
}
