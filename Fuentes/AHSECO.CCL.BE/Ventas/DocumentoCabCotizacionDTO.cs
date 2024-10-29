using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class DocumentoCabCotizacionDTO 
    {
        public string RutaImagen { get; set; }
        public string NumeroCotizacion   { get; set; }
        public string Encabezado   { get; set; }
        public string Ruc   { get; set; }
        public string Fecha  { get; set; }
        public string RazonSocial { get; set; }
        public string NombreContacto { get; set; }
        public string AreaContacto         { get; set; }
        public string TelefonoContacto     { get; set; }
        public string EmailContacto        { get; set; }
        public string PlazoEntrega         { get; set; }
        public string FormaPago            { get; set; }
        public string Moneda               { get; set; }
        public string Vigencia             { get; set; }
        public string Garantia             { get; set; }
        public string Observacion          { get; set; }
        public string Contrato { get; set; }
        public string NombreVendedor { get; set; }
        public string TelefonoVendedor { get; set; }
        public string EmailVendedor { get; set; }
        public string Pie { get; set; }
        public string Subtotal { get; set; }
        public string Igv { get; set; }
        public string Total { get; set; }
        public int NumeroItems { get; set; }
    }
}
