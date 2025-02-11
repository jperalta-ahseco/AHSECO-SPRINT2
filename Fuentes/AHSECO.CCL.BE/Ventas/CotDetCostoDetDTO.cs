using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotDetCostoDetDTO
    {
        public long IdCosto { get; set; }
        public string CodigoCosto   { get; set; }
        public string DescripcionCosto { get; set; }
        public int CantidadCosto   { get; set; }
        public string MontoUnitarioCosto   { get; set; }
        public string MontoTotalCosto  { get; set; }
        public string CodigoUbigeo { get; set; }
        public string DescripcionUbigeo { get; set; }
       
    }
}
