
namespace AHSECO.CCL.BE.Ventas.Despacho
{
    public class ResultDespachoDetalle
    {
      public long Id { get; set; }
      public long ID_SolDespacho { get; set; }
      public long Id_CotDetalle { get; set; }
      public int Cantidad {  get; set; }
      public decimal? ValorUnitario {  get; set; }
      public decimal? ValorTotal {  get; set; }
      public decimal? MargenAdicional {  get; set; }
      public decimal? VvTotalSIGVCGAN {  get; set; }
      public decimal? MontoDscto {  get; set; }
      public decimal? VVTotalSIGVDscto {  get; set; }
    }
}
