using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class GarantiaResultDTO
    {
        public long Id_Solicitud { get; set; }
        public string Descripcion{ get; set; }
        public string Marca{ get; set; }
        public string Modelo { get; set; }
        public string CodProducto { get; set; }
        public string NumSerie { get; set; }
        public DateTime FechaInstalacion { get; set; }
        public string ValorGarantia{ get; set; }
        public DateTime FechaVencimiento { get; set; }
      
    }
}
