using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotDetDespachoDTO : CamposAuditoriaDTO
    {
        public long Id { get; set; }
        public long IdCotizacionDetalle { get; set; }
        public int? CantPreventivo { get; set; }
        public string CodCicloPreventivo { get; set; }
        public string IndInfoVideo { get; set; }
        public string IndInfoManual { get; set; }
        public string IndInstaCapa { get; set; }
        public string GarantiaAdicional { get; set; }
        public string IndLLaveMano { get; set; }
        public string CodUbigeo { get; set; }
        public string Direccion { get; set; }
        public int? NroPiso { get; set; }
        public string Dimensiones { get; set; }
    }
}
