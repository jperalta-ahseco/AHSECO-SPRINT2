using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class DetalleServicioDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id {  get; set; }
        public int Id_Servicio {  get; set; }	
        public string DesMantenimiento {  get; set; }
        public int Eliminar {  get; set; }
        public string UsrEjecuta {  get; set; }
        public string Codigo { get; set; }
    }
}
