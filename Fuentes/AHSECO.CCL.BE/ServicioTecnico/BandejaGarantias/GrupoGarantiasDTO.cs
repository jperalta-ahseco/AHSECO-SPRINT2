using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class GrupoGarantiasDTO
    {
        public ContactoDTO Contacto { get; set; }
        public SolicitudVentaGarantiaDTO CabeceraSolicitud { get; set; }
        public DetalleSolicitudGarantiaDTO Detalle {  get; set; }
        public int CodRpta { get; set; }
    }
}
