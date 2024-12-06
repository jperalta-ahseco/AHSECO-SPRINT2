using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class ResultPreventivoDTO
    {
        public long Id_Mant {get; set;}
        public string Serie {get; set;}
        public DateTime FechaInstalacion   {get; set;}
        public string ProxFechaMant { get; set; }
        public DateTime FechaMantenimiento {get; set;}
        public string UbigeoDest         {get; set;}
        public string Descripcion        {get; set;}
        public string CodEstado { get; set; }
        public string Estado { get; set; }
        public int TotalPrevent { get; set; }
        public int PreventPend { get; set; }
        public int PreventReal { get; set; }
    }
}
