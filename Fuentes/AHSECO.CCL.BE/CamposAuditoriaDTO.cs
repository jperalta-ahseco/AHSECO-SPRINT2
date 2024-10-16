using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class CamposAuditoriaDTO
    {
        public string UsuarioRegistra { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string IpMaquinaRegistro { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public string IpMaquinaModifica { get; set; }
    }
}
