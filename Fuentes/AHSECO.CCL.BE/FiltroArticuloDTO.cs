using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class FiltroArticuloDTO
    {
        public string CodsArticulo { get; set; }
        public string DescArticulo { get; set; }
        public string CodsUnidad { get; set; }
        public string CodsFamilia { get; set; }
        public string CodsLinea { get; set; }
        public string CodsMarca { get; set; }
        public string CodsAlma { get; set; }
        public int? CantidadRegistros { get; set; }
    }
}
