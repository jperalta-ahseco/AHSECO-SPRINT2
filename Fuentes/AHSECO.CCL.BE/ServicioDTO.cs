
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ServicioDTO : CamposAuditoriaDTO
    {
        public string TipoProceso {  get; set; }       
        public int CodigoServicio { get; set; } 
        public string CodigoEquipo { get; set; }    
        public string Equipo { get; set; }
        public string CodigoModelo { get; set; }
        public string Modelo { get; set; }
        public string CodigoMarca { get; set; } 
        public string Marca { get; set; }
        public string Estado { get; set; }
        public string TipoServicio { get; set; }
        public string PrecioPreventivo { get; set; }
        public string PrecioCapacitacion { get; set; }
        public string PrecioActualizacion { get; set; }
        public string Herramientas { get; set; }
        public string HerramientasEspeciales { get; set; }
        public string Instrumentos { get; set; }
        public string MantenimientoPreventivo {get; set;}
        public string DescripcionPreventivo {get; set;}
        
    }
}
