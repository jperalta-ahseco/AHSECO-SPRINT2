using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class CotDetDespachoDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long IdCotizacionDetalle { get; set; }
        public bool? IndInfoVideo { get; set; }
        public bool? IndInfoManual { get; set; }
        public bool? IndInstalacion { get; set; }
        public bool? IndCapacitacion { get; set; }
        public bool? IndGarantiaAdicional { get; set; }
        public string CodGarantiaAdicional { get; set; }
        public bool? IndMantPreventivo { get; set; }
        public bool? IndCalibracion { get; set; }
        public string Dimensiones { get; set; }
        public bool? IndCompraLocal { get; set; }
        public bool? IndRequierePlaca { get; set; }
        public bool? IndFlete { get; set; }
        public string ObsCliente { get; set; }
        public string ObsDespacho { get; set; }
        public decimal? MontoTotalCosto { get; set; }
        public bool? IndFianza { get; set; }
        public string NumFianza { get; set; }
        public decimal? MontoPrestPrin { get; set; }
        public decimal? MontoPrestAcc { get; set; }

    }

}
