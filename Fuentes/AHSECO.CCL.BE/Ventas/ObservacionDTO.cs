using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class ObservacionDTO : CamposAuditoriaDTO
    {
        public long Id { get; set; }
        public string TipoProceso { get; set; }
        public long Id_WorkFlow { get; set; }
        public string Estado_Instancia { get; set; }
        public string Observacion{ get; set; }
        public string Nombre_Usuario{ get; set; }
        public string Perfil_Usuario { get; set; }
        public string Fecha_Registro { get; set; }  
    }
}
