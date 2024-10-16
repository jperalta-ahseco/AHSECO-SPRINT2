using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class WorkFlowRolDTO: CamposAuditoriaDTO
    {
        public int CodigoRol { get; set; }
        public int CodigoProceso { get; set; }
        public string NombreRol { get; set; }
        public int CodigoPerfil { get; set; }
        public string Usuario { get; set; }
        public bool Habilitado { get; set; }
        public int CodigoArea { get; set; }

    }
}
