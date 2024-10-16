using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroGrupoEmpledosDTO
    {
        public List<ComboDTO> Empresas { get; set; }
        public List<ComboDTO> Areas { get; set; }
        public List<ComboDTO> Estados { get; set; }
        public List<ComboDTO> TipoDocumento { get; set; }
        public List<ComboDTO> TipoEmpleado { get; set; }
        public List<ComboDTO> Sexo { get; set; }
    }
}
