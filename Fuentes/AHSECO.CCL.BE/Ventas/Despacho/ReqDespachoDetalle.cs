using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas.Despacho
{
    public class ReqDespachoDetalle : CamposAuditoriaDTO
    {
        public string TipoProceso {  get; set; }	
        public long Id {  get; set; }				
        public long Id_SolDepacho {  get; set; }
        public long Id_Cotizacion { get; set; }
        public long IdCotDetalle {  get; set; }
        public bool? IndStock { get; set; }
        public int Cantidad {  get; set; }
        public decimal? ValorUnitario {  get; set; }
        public decimal? ValorTotal {  get; set; }
        public decimal? MargenAdicional {  get; set; }
        public decimal? VvTotalSigVcgan {  get; set; }
        public decimal? MontoDscto {  get; set; }
        public decimal? VvTotalSigVDscto {  get; set; }
        public decimal? PorcentajeDscto { get; set; }
 		public string CodigoItem {  get; set; }
        public string TipoItem { get; set; } 
        public string DescripcionItem { get; set; }
    }
}
