﻿
namespace AHSECO.CCL.BE
{
    public class ServicioDTO : CamposAuditoriaDTO
    {
        public string TipoProceso {  get; set; }       
        public int CodigoServicio { get; set; }
        public long CodEquipo { get; set; }
        public string Equipo { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public string Estado { get; set; }
        public string TipoServicio { get; set; }
        public string CodTipoServicio { get; set; }
        public decimal Precio { get; set; }
        public string Herramientas { get; set; }
        public string HerramientasEspeciales { get; set; }
        public string Instrumentos { get; set; }
        public string MantenimientoPreventivo { get; set;}
        public string DescripcionPreventivo { get; set;}
        public string TipoConsulta { get; set; }
        
    }
}
