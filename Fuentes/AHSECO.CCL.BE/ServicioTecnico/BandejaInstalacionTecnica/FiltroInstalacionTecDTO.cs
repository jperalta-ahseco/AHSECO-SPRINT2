using System;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class FiltroInstalacionTecDTO : CamposAuditoriaDTO
    {

        public string FecIni { get; set; }
        public string FecFin { get; set; }
        public long NumReq { get; set; }
        public string RucEmpresa { get; set; }
        public string OrdenCompra { get; set; }
        public string NroProceso { get; set; }
        public string TipoProceso { get; set; }
        public string Contrato { get; set; }
        public string Vendedor { get; set; }
        public string CodEmpresa { get; set; }
        public string TipoVenta { get; set; }
        public string NumFianza { get; set; }
        public string Destino { get; set; }
        public string Estado { get; set; }
    }
}
