using AHSECO.CCL.BE.Mantenimiento;


namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class ContactoPrevDTO : ContactoDTO
    {
        public long Id_Asig { get; set; }
        public string TipoProceso { get; set; }
        public long Id_Mant { get; set; }
    }
}
