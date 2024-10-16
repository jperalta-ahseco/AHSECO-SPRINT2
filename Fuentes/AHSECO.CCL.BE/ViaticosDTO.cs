using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ViaticosDTO : CamposAuditoriaDTO
    {
        public int CodigoViatico { get; set; }
        public long CodigoWorkflow { get; set; }
        public DatosGeneralesDetalleDTO Empresa { get; set; }
        public DateTime FechaViatico { get; set; }
        public EmpleadoDTO Encargado { get; set; }
        public string NombreEncargado { get; set; }
        public CargoDTO Cargo { get; set; }
        public string Motivo { get; set; }
        public AreaDTO Area { get; set; }
        public string Ubigeo { get; set; }
        public string Cliente { get; set; }
        public string DiasViaje { get; set; }
        public string Autorizado { get; set; }
        public string Anulado { get; set; }
        public string Abonado { get; set; }
        public string Observacion { get; set; }
        public ProcesoEstadoDTO Estado { get; set; }
        public string FechaAbonado { get; set; }
        public string Accion { get; set; }
        public string CodigoEmpresa { get; set; }
        public int CodigoEncargado { get; set; }
        public int CodigoCargo { get; set; }
        public int CodigoArea { get; set; }
        public string CodigoUbigeo { get; set; }
        public string CodigoEstado { get; set; }
        public string NombreEstado { get; set; }
        public string NombreUbigeo { get; set; }
        public string NombreEmpresa { get; set; }
        public string FechaViaticoFormat { get; set; }
        public string NombreArea { get; set; }
        public string NombreCargo { get; set; }
        public string CodigoTipoDocumento { get; set; }
        public string TipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }

    }
}
