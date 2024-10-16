using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class PasswordDTO
    {
        public int IdUsuario { get; set; }
        public string PasswordActual { get; set; }
        public string PasswordNuevo { get; set; }
        public string PasswordConfirmado { get; set; }
        public string Usuario { get; set; }
        public string IpMaquina { get; set; }
    }
}
