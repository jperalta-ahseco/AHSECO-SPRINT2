using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroEmpleadosDTO:CamposAuditoriaDTO
    {
        public int CodigoEmpleado{ get; set; }
        public string NombreEmpleado { get; set; }
        public string ApellidoPaternoEmpleado { get; set; }
        public string ApellidoMaternoEmpleado { get; set; }
        public int? CodigoCargo { get; set; }
        public string TipoDocumento { get; set; }
		public string TipoEmpleado {get;set;}
        public string NumeroDocumento { get; set; }
        public int Estado { get; set; }
        public string TipoMantenimiento { get; set; } //1: Insertar, 2: Modificar
        public UbigeoDTO LugarLaboral { get; set;}
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFinal { get; set;   }
      

    }
}
