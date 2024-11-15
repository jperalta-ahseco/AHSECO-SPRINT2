using System;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class ElementosxProductoDTO : CamposAuditoriaDTO
    {

        public long Id_Detalle { get; set; }
        public long Id_Despacho { get; set; }
        public string CodProduct { get; set; }
        public string DescProduct { get; set; }
        public string Marca { get; set; }
        public string Serie { get; set; }
        public int NumSec { get; set; }
        public int CantPreventivo { get; set; }
        public string CodCicloPreventivo { get; set; }
        public string CodUbigeoDest { get; set; }
        public string DescUbigeoDest { get; set; }
        public string Direccion { get; set; }
        public int NroPiso { get; set; }
    }
}
