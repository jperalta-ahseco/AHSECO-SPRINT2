using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DetalleDespachoDTO 
    {
        public long RowNumber { get; set; }
        public string CodigoEquipo { get; set; }
        public string DescripcionEquipo { get; set; }
        public string Marca { get; set; }
        public string NumeroSerie { get; set; }
       
    }
}
