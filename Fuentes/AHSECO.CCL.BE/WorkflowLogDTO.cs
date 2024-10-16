using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class WorkflowLogDTO 
    {
        public long CodigoWorkflowLog { get; set; }
        public long CodigoWorkflow { get; set; }
        public string CodigoEstado { get; set; }
        public string DescripcionEstado { get; set; }
        public string Cargo { get; set; }
        public string Area { get; set; }
        public string UsuarioRegistro { get; set; }
        public string NombreUsuarioRegistro { get; set; }
        public string FechaRegistro { get; set; }

        public string HoraRegistro { get; set; }



    }
}
