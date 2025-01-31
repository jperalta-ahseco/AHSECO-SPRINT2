using System;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class InstalacionTecnicaDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long NumReq { get; set; }
        public long Id_WorkFlow { get; set; }
        public long Id_Solicitud { get; set; }
        public string RucEmpresa { get; set; }
        public string NomEmpresa { get; set; }
        public string Ubicacion { get; set; }
        public string TipoVenta { get; set; }
        public string OrdenCompra { get; set; }
        public string NroProceso { get; set; }
        public string TipoProcesoVenta { get; set; }
        public string Contrato { get; set; }
        public string Vendedor { get; set; }
        public string CodEmpresa { get; set; }
        public DateTime FechaMax { get; set; }
        public string Destino { get; set; } 
        public string Estado { get; set; }
        public string CodEstado { get; set; }

        public string Garantia { get; set; }
        public string FecRegFormat { get; set; }

        public string NumFianzaPP { get; set; }
        public string NumFianzaPA {get; set;}
    }
}
