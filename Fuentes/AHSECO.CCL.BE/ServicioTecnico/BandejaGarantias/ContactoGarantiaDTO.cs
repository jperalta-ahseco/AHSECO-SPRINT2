using AHSECO.CCL.BE.Mantenimiento;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class ContactoGarantiaDTO : ContactoDTO
    {
        public long Id_Asig { get; set; }
        public string TipoProceso { get; set; }
        public long Id_Reclamo { get; set; }

    }
}
