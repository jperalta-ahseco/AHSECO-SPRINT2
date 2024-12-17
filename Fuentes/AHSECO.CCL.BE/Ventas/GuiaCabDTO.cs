using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class GuiaCabDTO
    {
        public string RutaImagen { get; set; }
        public string Titulo   { get; set; }
        public string FechaOrdenCompra   { get; set; }
        public string PlazoEntrega   { get; set; }
        public string NombreVendedor  { get; set; }
        public string VendidoA { get; set; }
        public string EnviadoA { get; set; }
        public string Ruc         { get; set; }
        public string Direccion     { get; set; }
        public string Ciudad        { get; set; }
        public string NumeroOrdenCompra         { get; set; } 
        public string Moneda { get; set; }
        public string Subtotal { get; set; }
        public string Igv { get; set; }
        public string Total { get; set; }
        public int NumeroItems { get; set; }
    }
}
