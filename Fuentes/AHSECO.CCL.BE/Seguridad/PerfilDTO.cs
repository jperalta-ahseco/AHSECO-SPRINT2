using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class PerfilDTO: CamposAuditoriaDTO
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Habilitado { get; set; }

        public string DescripcionHabilitado { get; set; }

        public string FechaRegistroFormat { get; set; }

        public string FechaModificacionFormat { get; set; }
    }
}
