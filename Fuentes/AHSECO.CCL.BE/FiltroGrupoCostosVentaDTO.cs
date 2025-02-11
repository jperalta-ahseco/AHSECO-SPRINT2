using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroGrupoCostosVentaDTO
    {
        public List<ComboDTO> Garantias { get; set; }
        public List<ComboDTO> Costos { get; set; }
        public List<ComboDTO> CicloPreventivo { get; set; }
      
        public CotDetCostoCabDTO CabCosteoDetalle { get; set; }
        public List<CotDetCostoDetDTO> ListaCostos { get; set; }

    }
}
