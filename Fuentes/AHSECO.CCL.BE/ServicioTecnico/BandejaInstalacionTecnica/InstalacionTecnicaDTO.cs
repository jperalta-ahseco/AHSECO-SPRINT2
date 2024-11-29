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
        public string NombreContacto { get; set; }
        public string TelefonoContacto { get; set; }
        public string CargoContacto { get; set; }
        public string Establecimiento { get; set; }
        public string TipoVenta { get; set; }
        public string OrdenCompra { get; set; }
        public string NroProceso { get; set; }
        public string TipoProcesoVenta { get; set; }
        public string Contrato { get; set; }
        public string Vendedor { get; set; }
        public string CodEmpresa { get; set; }
        public int Id_Flujo { get; set; }
        public string NumFianza { get; set; }
        public DateTime FechaMax { get; set; }
        public string Destino { get; set; } 
        public string Estado { get; set; }
        public string CodEstado { get; set; }

        public string CodGarantia { get; set; }
    }
}
