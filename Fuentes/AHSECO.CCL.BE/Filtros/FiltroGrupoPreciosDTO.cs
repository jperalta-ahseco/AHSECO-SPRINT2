using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Filtros
{
    public class FiltroGrupoPreciosDTO
    {
        public List<ComboDTO> Marcas { get; set; }
        public List<ComboDTO> Familias { get; set; }
        public string TodasFamilias { get; set; }
        public List<ComboDTO> Medidas { get; set; }
        public List<ComboDTO> Almacenes { get; set; }

    }
}
