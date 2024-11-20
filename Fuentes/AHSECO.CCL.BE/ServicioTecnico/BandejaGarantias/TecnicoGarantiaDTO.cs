using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class TecnicoGarantiaDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public int Id_Asig          { get; set; }
        public int Id_Reclamo       { get; set; }
        public int Cod_Tecnico      {get; set;}
        public int Nombres          {get; set;}
        public int ApePaterno       {get; set;}
        public int ApeMaterno       {get; set;}
        public int Documento        {get; set;}
        public int Tipo_Documento   {get; set;}
        public int Correo           {get; set;}
        public int Telefono         {get; set;}
        public int Zona             {get; set;}
        public int Empresa          {get; set;}
        public int TipoTecnico      {get; set;}
        public int Estado           {get; set;}
    }
}
