using AHSECO.CCL.BE.Mantenimiento;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BE.AsignacionManual
{
    public class ClientevsAsesorDTO: CamposAuditoriaDTO
    {
        public int Id_Cliente { get; set; }
        public List<string> Id_ClienteList { get; set; }
        public string Id_Empleado { get; set; }
        public ClienteDTO Cliente { get; set; }
        public EmpleadoDTO Empleado { get; set; }
        public bool Eliminar { get; set; }
        public string Eliminado { get; set; }
        public string FecRegistro { get; set; }
        public string FechaModificacion{ get; set; }

    }
}
