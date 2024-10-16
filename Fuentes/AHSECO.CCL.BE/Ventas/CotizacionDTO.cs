using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotizacionDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long IdCotizacion         { get; set; }
        public long IdSolicitud          { get; set; }
        public DateTime FecCotizacion        { get; set; }
        public string NombreContacto       { get; set; }
        public string AreaContacto         { get; set; }
        public string TelefonoContacto     { get; set; }
        public string EmailContacto        { get; set; }
        public string PlazoEntrega         { get; set; }
        public string FormaPago            { get; set; }
        public string Moneda               { get; set; }
        public string Vigencia             { get; set; }
        public string Garantia             { get; set; }
        public string Observacion          { get; set; }
        public string Estado { get; set; }
    }
}
