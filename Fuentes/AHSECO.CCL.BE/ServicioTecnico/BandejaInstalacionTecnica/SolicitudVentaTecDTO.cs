using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class SolicitudVentaTecDTO: CamposAuditoriaDTO
    {
        public long Id_Solicitud { get; set; }
        public long Id_WorkFlow { get; set; }
        public string Cod_Empresa { get; set; }
        public  string Nom_Empresa { get; set; }
        public int IdCliente { get; set; }
        public string RUC { get; set; }
        public string RazonSocial { get; set; }
        public string Ubigeo { get; set; }
        public string AsesorVenta { get; set; }
        public string TipoVenta { get; set; }
        public string Garantia { get; set; }
        public string Fecha_Sol { get; set; }
        public string nomEstado { get; set; }
        public string NombreContacto { get; set; }
        public string TelefonoContacto { get; set; }
        public string Establecimiento { get; set; }
        public string CargoContacto { get; set; }
        public string OrdenCompra { get; set; }
        public string TipoProceso { get; set; }
        public string NroProceso { get; set; }
        public string Contrato { get; set; }
        public string FechaMaxima { get; set; }

    }
}
