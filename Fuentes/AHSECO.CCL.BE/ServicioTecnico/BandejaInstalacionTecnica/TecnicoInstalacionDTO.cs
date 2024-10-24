using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class TecnicoInstalacionDTO : CamposAuditoriaDTO
    {
        public long ID { get; set; }
        public long ID_DETALLE { get; set; }
        public int COD_TECNICO { get; set; }
        public string NOMBRETECNICO { get; set; }
        public string DOCUMENTO { get; set; }
        public string CORREO { get; set; }
        public string TELEFONO { get; set; }
        public string ZONA { get; set; }
        public string TIPOTECNICO { get; set; }
        public bool ESTADO { get; set; }
    }
}
