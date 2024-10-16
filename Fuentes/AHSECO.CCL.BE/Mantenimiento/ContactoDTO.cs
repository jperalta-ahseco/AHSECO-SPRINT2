using System;


namespace AHSECO.CCL.BE.Mantenimiento
{
    public class ContactoDTO : CamposAuditoriaDTO
    {
        public int IdContacto { get; set; }
        public string CodTipDocContacto { get; set; }
        public long IdCliente { get; set; }
        public string RucCliente { get; set; }
        public string TipDoc { get; set; }
        public string NumDoc { get; set; }
        public string Establecimiento { get; set; }
        public string AreaContacto { get; set; }
        public string NomCont { get; set; }
        public string Telefono { get; set; }
        public string Telefono2 { get; set; }
        public string Correo { get; set; }
        public string Cargo { get; set; }
        public bool CodEstado { get; set; }
        public string Estado { get; set; }
        public string Audit_Reg_Usr { get; set; }
        public DateTime Audit_Reg_Fec { get; set; }
        public string Audit_Mod_Usr { get; set; }
        public DateTime Audit_Mod_Fec { get; set; }
    }
}
