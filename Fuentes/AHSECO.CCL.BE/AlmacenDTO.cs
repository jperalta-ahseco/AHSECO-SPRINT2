using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class AlmacenDTO : CamposAuditoriaDTO
    {
        public string CodAlmacen { get; set; }
        public string DescAlmacen { get; set; }
        public string CodArticulo { get; set; }
        public string DescArticulo { get; set; }
        public int StockDisponible { get; set; }
    }
}
