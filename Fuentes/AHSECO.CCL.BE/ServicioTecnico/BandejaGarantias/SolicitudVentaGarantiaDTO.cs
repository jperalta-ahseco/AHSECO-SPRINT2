using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class SolicitudVentaGarantiaDTO
    {
        public long Id_Solicitud { get; set; }
        public long Id_WorkFlow { get; set; }
        public string Nom_Empresa { get; set; }
        public string Cod_Empresa { get; set; }
        public int IdCliente { get; set; }
        public string RUC { get; set; }
        public string RazonSocial { get; set; }
        public string Ubigeo { get; set; }
        public string Cod_Ubigeo { get; set; }
        public string AsesorVenta { get; set; }
        public string TipoVenta { get; set; }
        public string TipoProceso { get; set; }
        public string NroProceso { get; set; }
        public string NombreTipoVenta { get; set; }
        public string Fecha_Sol { get; set; }
        public string Tipo_Sol { get; set; }
        public string Estado { get; set; }
        public string nomEstado { get; set; }
        public string OrdenCompra { get; set; }


    }
}
