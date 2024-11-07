using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class GrupoSolicitudVentaTecDTO
    {
        public SolicitudVentaTecDTO Solicitud { get; set; }
        public List<CotizacionDetalleDTO> DetalleCotizacion { get; set; }
    }
}
