using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BE.Ventas
{
    public class FiltroBandejaSolicitudesDTO
    {

        public List<ComboDTO> TipoVentas { get; set; }
        public List<ComboDTO> TipoSolicitudes { get; set; }
        public List<ComboDTO> Empresas { get; set; }
        public List<ComboDTO> FormaPagos { get; set; }
        public List<ComboDTO> Monedas { get; set; }
        public List<ComboDTO> Estados { get; set; }
        public List<ComboDTO> Garantias { get; set; }
        public List<ComboDTO> Flujos { get; set; }

    }
}
