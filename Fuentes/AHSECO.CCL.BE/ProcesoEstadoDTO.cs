using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ProcesoEstadoDTO:CamposAuditoriaDTO
    {
        public int CodigoProcesoEstado { get; set; }
        public ProcesoDTO Proceso { get; set; }
        public string CodigoEstado { get; set; }
        public string NombreEstado { get; set; }
        public string AbreviaturaEstado { get; set; }
        public bool Estado { get; set; }

    }
}
