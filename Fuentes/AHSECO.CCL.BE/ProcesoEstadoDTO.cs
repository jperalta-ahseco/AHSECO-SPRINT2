using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ProcesoEstadoDTO:CamposAuditoriaDTO
    {
        public int Id { get; set; }
        public int IdProceso { get; set; }
        public ProcesoDTO Proceso { get; set; }
        public string CodigoEstado { get; set; }
        public string NombreEstado { get; set; }
        public string AbreviaturaEstado { get; set; }
        public bool Habilitado { get; set; }

    }
}
