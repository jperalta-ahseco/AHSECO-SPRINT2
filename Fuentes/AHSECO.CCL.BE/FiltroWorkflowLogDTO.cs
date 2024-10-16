using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroWorkflowLogDTO
    {
        public long CodigoWorkflow { get; set; }
        public string CodigoEstado { get; set; }
        public string Usuario { get; set; }
        public string UsuarioRegistro { get; set; }

    }
}
