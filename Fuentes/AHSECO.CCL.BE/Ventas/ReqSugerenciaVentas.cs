
namespace AHSECO.CCL.BE.Ventas
{
    public class ReqSugerenciaVentas
    {
        public string CodProd { get; set; }

        public string CodFamilia { get; set; }
        public string CodAlmacen { get; set; }
        public string DescEquipo { get; set; }
        public string DescMarca { get; set; }
        public string DescModelo { get; set; }
        public string CodUndMed { get; set; }
        public int CantidadRegistros { get; set; }
    }
}
