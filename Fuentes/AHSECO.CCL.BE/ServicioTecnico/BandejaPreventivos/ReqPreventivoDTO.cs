using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class ReqPreventivoDTO
    {
        public string NumSerie { get; set; }
        public string NumProc        {get;set;}
        public string NumOrdCompra   {get;set;}
        public string NumFianza      {get;set;}
        public string Empresa        {get;set;}
        public DateTime PeriodoInicio  {get;set;}
        public DateTime PeriodoFinal   {get;set;}
        public string Estado         {get;set;}
    }
}
