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
        public bool IndInfoVideo { get; set; }
        public bool IndInfoManual { get; set; }
        public bool IndInstaCapa { get; set; }
        public string GarantiaAdicional { get; set; }
        public bool IndLLaveMano { get; set; }
        public string CodUbigeoDestino { get; set; }
        public string DescUbigeoDestino { get; set; }
        public string Direccion { get; set; }
        public int? NroPiso { get; set; }
        public string Dimensiones { get; set; }
        public bool IndCompraLocal { get; set; }
        public bool IndCalibracion { get; set; }
        public bool IndFianza { get; set; }
        public decimal? MontoPrestPrin { get; set; }
        public decimal? MontoPrestAcc { get; set; }
        public string NumFianza { get; set; }
    }
}
