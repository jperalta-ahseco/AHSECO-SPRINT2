using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class FiltroBandejaDespachoDTO
    {
        public long IdCotizacion { get; set; }
        public long IdSolicitud { get; set; }
        public string TipoDespacho { get; set; }
        public string NumeroOrden { get; set; }
        public string NumeroContrato { get; set; }
        public string Estado { get; set; }   
        
        public long IdDespacho { get; set; }
        public string NombreTipoDespacho { get; set; }
        public string Numero {  get; set; }
        public string Fecha { get; set; }
        public string FechaMaxima { get; set; }
        public string NombreEstado { get; set; }
        public string AbreviaturaEstado { get; set; }
    }
}
