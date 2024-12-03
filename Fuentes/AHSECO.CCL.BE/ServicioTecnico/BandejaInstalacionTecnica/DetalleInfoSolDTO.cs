using System;
using System.Collections.Generic;


namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class DetalleInfoSolDTO
    {
        public long IdCodigoDetalle { get; set; }
        public string IndicadorInfoManual { get; set; }
        public string IndicadorCalibracion { get; set; }
        public string IndicadorInfoVideo { get; set; }
        public string IndicadorMantPreventivo { get; set; }
        public string IndicadorInstalacion { get; set; }
        public string IndicadorCapacitacion { get; set; }
        public string IndicadorRequierePlaca { get; set; }
        public string IndicadorGarantiaAdi { get; set; }
        public string CodGarantia { get; set; }
        public string NomGarantia { get; set; }
        public string ObservacionCliente { get; set; }
        public string ObservacionDespacho { get; set; }
        public string Dimensiones { get; set; }
    }
}
