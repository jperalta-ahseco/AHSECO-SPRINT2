using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class ResultPreventivoDTO
    {
        public long Id_Mant            {get; set;}
        public string Serie              {get; set;}
        public DateTime FechaInstalacion   {get; set;}
        public string ProxFechaMant { get; set; }
        public DateTime FechaMantenimiento {get; set;}
        public string Empresa            {get; set;}
        public string Direccion          {get; set;}
        public string UbigeoDest         {get; set;}
        public string CodItem            {get; set;}
        public string Descripcion        {get; set;}
        public string NumProceso         {get; set;}
        public string TipoProceso        {get; set;}
        public string OrdenCompra        {get; set;}
        public string NumFianza          {get; set;}
        public string DesMarca           {get; set;}
        public string Garantia           { get; set; }
        public string CodEstado { get; set; }
        public string Estado { get; set; }
        public string RazonSocial { get; set; }
        public string Ciclo { get; set; }
        public int TotalPrevent { get; set; }
        public int PreventPend { get; set; }
        public int PreventReal { get; set; }
    }
}
