using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class ItemCostoDTO
    {
        public string CodigoItem   { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad  { get; set; }
        public string UnidadMedida  { get; set; }
        public string DescripcionAdicional { get; set; }
        public decimal MontoUnitario { get; set; }
        public decimal MontoTotal { get; set; }
        public string Dimensiones { get; set; }
        public string CodigoUbigeo { get; set; }
        public string DescripcionUbigeo { get; set; }
        public string Direccion { get; set; }
        public string AmbienteDestino { get; set; }
        public int NroPiso { get; set; }
        public int CantidadCosto { get; set; }
        public int CantidadPreventivos { get; set; }
        public string CodigoCicloPreventivo { get; set; }
        public string DescripcionCicloPreventivo { get; set; }
        public string CodigoCosto { get; set; }
        public string DescripcionCosto { get; set; }
        public string CodigoMoneda { get; set; }
        public string DescripcionMoneda { get; set; }
        public string SimboloMoneda { get; set; }

    }
}
