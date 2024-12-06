using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class ReqPreventivoDTO : CamposAuditoriaDTO
    {
        public string NumSerie { get; set; }
        public long Id_Mant { get; set; }
        public long Id_Detalle{ get; set; }
        public long Id_WorkFlow { get; set; }
        public string TipoTarea { get; set; }
        public string TipoProceso { get; set; }
        public string NumProc        {get;set;}
        public string NumOrdCompra   {get;set;}
        public string NumFianza      {get;set;}
        public string Empresa        {get;set;}
        public string PeriodoInicio  {get;set;}
        public string PeriodoFinal   {get;set;}
        public string Estado         {get;set;}
        public bool IndPrestAcce { get; set; }
        public bool IndRepuesto{ get; set; }
        public decimal MontoPrestAcce { get; set; }
        public DateTime FechaMantenimiento { get; set; }
        public string NumFactura { get; set; }
        public DateTime? FecFactura { get; set; }
    }
}
