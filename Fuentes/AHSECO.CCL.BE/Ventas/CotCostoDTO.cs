using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotCostoDTO
    {
        public string Tipo   { get; set; }
        public long CodigoCotizacionDetalle { get; set; }
        public string CodigoCosto   { get; set; }
        public int CantidadCosto   { get; set; }
        public int CantidadPreventivo  { get; set; }
        public string CodigoCicloPreventivo { get; set; }
        public string CodigoUbigeo { get; set; }
        public string Direccion { get; set; }
        public string AmbienteDestino { get; set; }
        public int NumeroPiso { get; set; }
        public long IdCosto { get; set; }
        public decimal MontoUnitario { get; set; }
        public string UsuarioRegistro { get; set; }

    }
}
