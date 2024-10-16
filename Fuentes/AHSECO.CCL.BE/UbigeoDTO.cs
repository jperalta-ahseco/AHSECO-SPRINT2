using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class UbigeoDTO:CamposAuditoriaDTO
    {
        public string UbigeoId { get; set; }
        public string Descripcion { get; set; }
        public string NombreDepartamento { get; set; }
        public string NombreProvincia{ get; set; }
        public string NombreDistrito { get; set; }
        public string NombreCapitalLegal { get; set; }
        public int CodigoRegion { get; set; }
        public string NombreRegion { get; set; }
        public string CodDepartamento { get; set; }
        public string CodProvincia { get; set; }

    }
}
