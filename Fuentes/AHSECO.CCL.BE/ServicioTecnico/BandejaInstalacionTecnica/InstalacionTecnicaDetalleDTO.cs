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
        public string NumFianza { get; set; }
        //public bool IndLLaveMano { get; set; }
        public string Dimensiones { get; set; }
        //public DateTime? FecLimInsta { get; set; }
        public bool IndFianza { get; set; }
        public decimal? MontoPrestPrin { get; set; }
        public decimal? MontoPrestAcc { get; set; }
        public List<ElementosxProductoDTO> Elementos { get; set; }
    }
}
