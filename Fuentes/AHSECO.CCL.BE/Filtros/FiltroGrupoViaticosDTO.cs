using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Filtros
{
    public class FiltroGrupoViaticosDTO
    {
        public List<ComboDTO> Empresas { get; set; }
        public List<ComboDTO> Areas { get; set; }
        public List<ComboDTO> Estados { get; set; }
        public List<ComboDTO> Cargos { get; set; }
        public List<ComboDTO> Encargados { get; set; }

    }
}
