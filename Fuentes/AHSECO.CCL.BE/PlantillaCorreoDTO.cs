using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class PlantillaCorreoDTO: CamposAuditoriaDTO
    {
        public string CodigoPlantilla { get; set; }
        public int CodigoProceso { get; set; }
        public string DescripcionPlantilla { get; set; }

        public string To { get; set; }

        public string CC { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

    }
}
