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
        public long Id { get; set; }
        public long Id_CotDetalle { get; set; }
        public long CodigoDespacho { get; set; }

        public string CodigoUbigeo { get; set; }
        public string NombreUbigeo { get; set; }
        public string RutaDocumento { get; set; }
        public string NumeroGuia { get; set; }
        public string Direccion { get; set; }
        public long CodigoDocumento { get; set; }
    }
}
