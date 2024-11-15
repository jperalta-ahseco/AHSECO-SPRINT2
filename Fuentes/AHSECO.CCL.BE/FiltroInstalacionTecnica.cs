using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroInstalacionTecnica
    {
        public List<ComboDTO> Empresas { get; set; }

        public List<ComboDTO> Estados { get; set; }

        public List<ComboDTO> Clientes { get; set; }

        public List<ComboDTO> TipVenta { get; set; }
        public List<ComboDTO> TipoEmpleado { get; set; }
        public List<ComboDTO> Periodos { get; set; }
    }
}
