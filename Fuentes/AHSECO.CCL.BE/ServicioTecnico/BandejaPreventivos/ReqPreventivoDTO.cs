using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class ReqPreventivoDTO : CamposAuditoriaDTO
    {
        public string NumSerie { get; set; }
        public long Id_Mant { get; set; }
        public long NumReq { get; set; }
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
        public string NomEquipo { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Ruc { get; set; }
        public string NumContrato { get; set; }
        public string CodUbigeoDest { get; set; }
        public string valOTM { get; set; }
        public string valGuia { get; set; }
        public string NumFianzaPP { get; set; }
        public string NumFianzaPA { get; set; }
        public DateTime? FecGuia { get; set; }
        public DateTime FechaMantenimiento { get; set; }
        public string NumFactura { get; set; }
        public DateTime? FecFactura { get; set; }
    }
}
