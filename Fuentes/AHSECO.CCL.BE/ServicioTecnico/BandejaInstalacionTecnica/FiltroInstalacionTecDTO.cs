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
        public string NumProceso { get; set; }
        public string Contrato { get; set; }
        public string Vendedor { get; set; }
        public string CodEmpresa { get; set; }
        public int Id_Flujo { get; set; }
        public string NumFianza { get; set; }
        public string Destino { get; set; }
        public string Estado { get; set; }
    }
}
