using System;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class InstalacionTecnicaDetalleDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long NumReq { get; set; }
        public int Cantidad { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public int CantidadMP { get; set; }
        public string Periodicidad { get; set; }
        public string Garantia { get; set; }
        public DateTime FechaProgramacion { get; set; }
        public DateTime FechaReal { get; set; }
    }
}
