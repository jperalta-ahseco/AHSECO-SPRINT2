using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class FiltroReclamosDTO
    {
        public string FecIni { get; set; }
        public string FecFin { get; set; }
        public long NumReclamo { get; set; }
        public string RucEmpresa { get; set; }
        public string OrdenCompra { get; set; }
        public string NroProceso { get; set; }
        public string Contrato { get; set; }
        public string Vendedor { get; set; }
        public string CodEmpresa { get; set; }
        public string TipoVenta { get; set; }
        public string NumFianza { get; set; }
        public string CodUbigeoDest { get; set; }
        public string Estado { get; set; }
        public string NumeroSerie { get; set; }
    }
}
