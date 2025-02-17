using System;


namespace AHSECO.CCL.BE.Mantenimiento
{
    public class SedeDTO : CamposAuditoriaDTO
    {
        public string Tipo { get; set; }
        public long IdSede { get; set; }
        public long IdCliente { get; set; }
        public string NomSede { get; set; }
        public string Estado { get; set; }
        public string NomEmpresa { get; set; }

    }
}
