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
        public string Id {  get; set; }				
        public string Id_SolDepacho {  get; set; }
        public string IdCotDetalle {  get; set; }
        public string Cantidad {  get; set; }
        public string ValorUnitario {  get; set; }
        public string ValorTotal {  get; set; }
        public string MargenAdicional {  get; set; }
        public string VvTotalSigVcgan {  get; set; }
        public string MontoDscto {  get; set; }
        public string VvTotalSigVDscto {  get; set; }
        public string UsrEjecuta { get; set; }
    }
}
