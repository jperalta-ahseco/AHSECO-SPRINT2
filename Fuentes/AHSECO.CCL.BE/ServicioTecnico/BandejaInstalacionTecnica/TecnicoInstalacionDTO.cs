using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class TecnicoInstalacionDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long Id_Detalle { get; set; }
        public int Cod_Tecnico { get; set; }
        public string NombreTecnico { get; set; }
        public string Documento { get; set; }
        public string TipDocumento { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public string Zona { get; set; }
        public string TipoTecnico { get; set; }
        public bool Estado { get; set; }
    }
}
