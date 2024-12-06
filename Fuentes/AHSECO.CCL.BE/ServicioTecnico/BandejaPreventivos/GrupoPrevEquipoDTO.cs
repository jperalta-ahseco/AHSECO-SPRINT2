using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class GrupoPrevEquipoDTO
    {
        public CabeceraMantDTO CabeceraCot{ get; set; }
        public EquipoPrevDTO CabeceraEquipo { get; set; }
        public List<MantPreventivoDTO> MantenimientosPreventivos { get; set; }
       
    }
}
