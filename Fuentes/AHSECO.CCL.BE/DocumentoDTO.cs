using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class DocumentoDTO : CamposAuditoriaDTO
    {
        public long CodigoDocumento { get; set; }
        public long CodigoWorkFlow { get; set; }
        public string CodigoTipoDocumento { get; set; }

        public string NombreDocumento { get; set; }
        public bool VerDocumento { get; set; }
        public string RutaDocumento { get; set; }
        public string NombreUsuario { get; set; }
        public string NombrePerfil { get; set; }
        public int Eliminado { get; set; }
        //Filtros:

        public string Accion { get; set; }
        public string NombreTipoDocumento { get; set; }
        public string FechaRegistroFormat { get; set; }
    }
}
