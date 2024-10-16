using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class UsuarioDTO: CamposAuditoriaDTO
    {
        public int Id { get; set; }
        public DatosGeneralesDetalleDTO TipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string ValidarAD { get; set; }
        public string UsuarioRed { get; set; }
        public string Habilitado { get; set; }
        public int? IdEjecutor { get; set; }
        public int? IdEPS { get; set; }
        public PerfilDTO Perfil { get; set; }
        public string FechaUltimaSesion { get; set; }

        public string DescripcionValidarAD { get; set; }
        public string DescripcionHabilitado { get; set; }

        public string NombreEmpleado { get; set; }

        public string DescripcionBloqueado { get; set; }

        public string FechaRegistroFormat { get; set; }
        public string FechaModificaFormat { get; set; }
    }
}
