using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class MantPreventivoDTO
    {
        public long Id { get; set; }
        public long Id_Mant { get; set; }
        public string TipoTarea { get; set; }
        public long Id_WorkFlow { get; set; }
        public string Serie { get; set; }
        public DateTime FechaInstalacion { get; set; }
        public string ProxFechaMant { get; set; }
        public DateTime FechaMantenimiento { get; set; }
        public string UbigeoDest { get; set; }
        public string Descripcion { get; set; }
        public string CodEstado { get; set; }
        public string Estado { get; set; }
        public decimal MontoPrestAcce { get; set; }
        public bool IndPrestacion { get; set; }
        public bool IndRepuesto { get; set; }
        public string NumFactura { get; set; }
        public string FecFactura { get; set; }
    }
}
