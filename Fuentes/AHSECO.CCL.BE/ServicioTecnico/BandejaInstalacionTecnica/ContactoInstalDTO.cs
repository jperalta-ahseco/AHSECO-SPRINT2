using AHSECO.CCL.BE.Mantenimiento;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class ContactoInstalDTO : ContactoDTO
    {
        public long Id_Asig { get; set; }
        public long NumReq { get; set; }
        public string TipIngreso { get; set; }
    }
}
