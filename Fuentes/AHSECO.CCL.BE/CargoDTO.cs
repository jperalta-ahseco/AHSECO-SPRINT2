using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class CargoDTO:CamposAuditoriaDTO
    {
        public int TipoProceso { get; set; }
        public int CodigoCargo { get; set; }
        public string NombreCargo { get; set; }
        public AreaDTO Area { get; set; }
        public int Estado { get; set; }

        public string FechaRegistroFormat { get; set; }
        public string CodigoArea { get; set; }

    }
}
