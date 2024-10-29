using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class GrupoServicioDTO
    {
        public ServicioDTO CabeceraServicio {  get; set; }   
        public List<DetalleServicioDTO> servicios { get; set; }
    }
}
