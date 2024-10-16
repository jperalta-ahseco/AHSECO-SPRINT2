using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ProcesoDTO:CamposAuditoriaDTO
    {
        public int CodigoProceso { get; set; }
        public string NombreProceso { get; set; }
        public bool Estado { get; set; }

    }
}
