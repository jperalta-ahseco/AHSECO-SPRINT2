using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class AreaDTO:CamposAuditoriaDTO
    {
        public int CodigoArea { get; set; }
        public string NombreArea { get; set; }
        public int? IdPadre { get; set; }
        public int Estado { get; set; }

        public string FechaRegistroFormat { get; set; }

    }
}
