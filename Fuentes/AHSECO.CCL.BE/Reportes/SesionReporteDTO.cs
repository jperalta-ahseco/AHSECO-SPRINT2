using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Reportes
{
    public class SesionReporteDTO
    {
        public long Id { get; set; }
        public int CodigoUsuario { get; set; }
        public string Usuario { get; set; }
        public string NombreUsuario { get; set; }
        public string FechaSesion { get; set; }
        public string UsuarioRegistro { get; set; }
        public string FechaRegistro { get; set; }
        public string IpMaquinaRegistro { get; set; }

    }
}
