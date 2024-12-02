using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class TecnicoMantPreventivoDTO
    {
        public string TipoProceso { get; set; }
        public long Id_Asig { get; set; }
        public long Id_Mant { get; set; }
        public int Cod_Tecnico { get; set; }
        public string Nombres { get; set; }
        public string ApePaterno { get; set; }
        public string ApeMaterno { get; set; }
        public string NombreCompleto { get; set; }
        public string Documento { get; set; }
        public string Tipo_Documento { get; set; }
        public string NomTipoDoc { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public string Zona { get; set; }
        public string DescZona { get; set; }
        public string Empresa { get; set; }
        public string TipoTecnico { get; set; }
        public string NomTipoTecnico { get; set; }
        public bool Estado { get; set; }
    }
}
