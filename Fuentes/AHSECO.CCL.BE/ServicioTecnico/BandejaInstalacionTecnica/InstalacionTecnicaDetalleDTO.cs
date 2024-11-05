using System;
using System.Collections.Generic;


namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class InstalacionTecnicaDetalleDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long NumReq { get; set; }
        public string CodProducto { get; set; }
        public string DescProducto { get; set; }
        public int Cantidad { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string NumFianza { get; set; }
        public int CantidadMP { get; set; }
        public string Periodicidad { get; set; }
        public string Garantia { get; set; }
        public string FechaProgramacion { get; set; }
        public string FechaReal { get; set; }
        public List<TecnicoInstalacionDTO> Tecnicos { get; set; }
    }
}
