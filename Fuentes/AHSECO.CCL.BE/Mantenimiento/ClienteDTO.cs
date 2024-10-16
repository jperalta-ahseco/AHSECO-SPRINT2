using System;


namespace AHSECO.CCL.BE.Mantenimiento
{
    public class ClienteDTO : CamposAuditoriaDTO
    {
        public long? ID { get; set; }
        public string RUC { get; set; }
        public string NomEmpresa { get; set; }
		public string SectorCliente { get; set;}
        public string Id_Empleado { get; set; }
        public EmpleadoDTO Empleado { get; set; }
        public int NumContacto { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFinal { get; set; }
        public string Direccion { get; set; }
        public string CodUbigeo { get; set; }
        public string Categoria { get; set; }
        public string CodCategoria { get; set; }
        public bool? Estado { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public UbigeoDTO UbigeoDepartamento { get; set; }
        public UbigeoDTO UbigeoProvincia { get; set; }
        public UbigeoDTO UbigeoDistrito { get; set; }
        public DateTime Fecha_Accion { get; set; }
        public string Tipo_Audit { get; set; }
        public int Id_Ant { get; set; }
        public string RUC_Ant { get; set; }
        public string NomEmpresa_Ant { get; set; }
        public string Direccion_Ant { get; set; }
        public string Telefono_Ant { get; set; }
        public string Correo_Ant { get; set; }
        public string CodUbigeo_Ant { get; set; }
        public string Categoria_Ant { get; set; }
        public string TipoCliente_Ant { get; set; }
        public string SectorCliente_Ant { get; set; }
        public bool Estado_Ant { get; set; }
        public string Usuario_Registra_Audit { get; set; }
        public string Audit_Reg_Fec_Ant { get; set; }
        public string Usuario_Modifica_Audit { get; set; }
        public string Audit_Mod_Fec_Ant { get; set; }
    }
}
