using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class EmpleadoDTO : CamposAuditoriaDTO
    {
        public string TipoMantenimiento { get; set; }
        public int CodigoEmpleado { get; set; }
        public string NombresEmpleado { get; set; }
        public string ApellidoPaternoEmpleado { get; set; }
        public string ApellidoMaternoEmpleado { get; set; }
        public string NombresCompletosEmpleado { get; set; }
        public CargoDTO Cargo { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public UbigeoDTO LugarLaboral { get; set; }
        public string TelefonoEmpleado { get; set; }
        public string EmailEmpleado { get; set; }
        public string DireccionEmpleado { get; set; }
        public string SexoEmpleado { get; set; }
        public DatosGeneralesDetalleDTO Documento { get; set; }
        public string NumeroDocumento { get; set; }
        public DatosGeneralesDetalleDTO Empresa { get; set; }
        public int? CodigoJefe { get; set; }
        public DateTime? FechaIngreso { get; set; }
        public string TipoEmpleado { get; set; } //Interno o Externo
        public string CodigoTipoEmpleado { get; set; } //Interno o Externo
        public int Estado { get; set; }
      
        public string NombreEstado { get; set; }
        public string FechaRegistroFormat { get; set; }
        public string FechaModificaFormat { get; set; }

        public string FechaNacimientoFormat { get; set; }
        public string FechaIngresoFormat { get; set; }

        public string NombreJefe { get; set; }

    }
}
