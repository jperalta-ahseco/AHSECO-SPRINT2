using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DatosActualizarSerieSTO
    {
        public long codDetalleDespacho { get; set; }
        public string NumeroSerie   { get; set; }
        public string CodigoUbigeo { get; set; }
        public string Direccion { get; set; }
        public string NumeroGuiaRemision { get; set; }
        public string RutaDocumento { get; set; }
    }
}
