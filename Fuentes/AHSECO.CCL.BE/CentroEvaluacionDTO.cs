using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class CentroEvaluacionDTO
    {        
        public int Id { get; set; }
        public bool? IndicadorCentroEvaluacion { get; set; }
        public bool? IndicadorEPS { get; set; }
        public bool? IndicadorEje { get; set; }
        public bool? IndicadorCentroTemporal { get; set; }
        public string Sector { get; set; }
        public string Ruc { get; set; }
        public string RazonSocial { get; set; }
        public string CodigoUbigeoDepartamento { get; set; }
        public string UbigeoDepartamento { get; set; }
        public string CodigoUbigeoProvincia { get; set; }
        public string UbigeoProvincia { get; set; }
        public string CodigoUbigeoDistrito { get; set; }
        public string UbigeoDistrito { get; set; }
        public string Direccion { get; set; }
        public string UsuAuditoria { get; set; }
        public DateTime? FecAuditoria { get; set; }
        public DatosGeneralesDetalleDTO Estado { get; set; }
        public string Email { get; set; }
    }
}
