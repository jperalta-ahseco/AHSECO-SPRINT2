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
        public int CantPreventivo { get; set; }
        public string CodCicloPreventivo { get; set; }
        public string Garantia { get; set; }
        public string GarantiaAdicional { get; set; }
        public bool IndLLaveMano { get; set; }
        public string CodUbigeoDestino { get; set; }
        public string DescUbigeoDestino { get; set; }
        public string Direccion { get; set; }
        public int? NroPiso { get; set; }
        public string Dimensiones { get; set; }
        public bool IndCalibracion { get; set; }
        public bool IndRequierePlaca { get; set; }
        public DateTime? FecLimInsta { get; set; }
        public bool IndFianza { get; set; }
        public decimal? MontoPrestPrin { get; set; }
        public decimal? MontoPrestAcc { get; set; }
        public string FechaProgramacion { get; set; }
        public string FechaInstalacion { get; set; }
        public List<TecnicoInstalacionDTO> Tecnicos { get; set; }
    }
}
