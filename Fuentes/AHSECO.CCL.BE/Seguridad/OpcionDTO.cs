using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class OpcionDTO: CamposAuditoriaDTO
    {
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Url { get; set; }
        public int Nivel { get; set; }
        public int Orden { get; set; }
        public string Icono { get; set; }
        public OpcionDTO Padre { get; set; }
        public string Habilitado { get; set; }
        public bool Seleccionado { get; set; }
    }
}
