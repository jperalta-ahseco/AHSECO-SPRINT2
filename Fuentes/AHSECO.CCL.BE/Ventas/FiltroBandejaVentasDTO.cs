using System;

namespace AHSECO.CCL.BE.Ventas
{
    public class FiltroBandejaVentasDTO
    {

        public long CodigoSolicitud { get; set; }
        public int CodigoFlujo { get; set; }
        public string FechaInicioSol { get; set; }
        public string FechaFinSol { get; set; }
        public string CodigoTipoVenta { get; set; }
        public string CodigoTipoSol { get; set; }
        public string RucCliente { get; set; }
        public string NombreCliente { get; set; }
        public string NombreVendedor { get; set; }
        public string CodigoEmpresa { get; set; }
        public string CodigoEstado { get; set; }
        public string NombreEquipo { get; set; }
        public string CodigoFormaPago { get; set; }
        public string CodigoMoneda { get; set; }
        public string CodigoGarantia { get; set; }
        public string NroOrden { get; set; }
        public string NroProceso { get; set; }
        public string NumeroContrato { get; set; }
        public string NumFianzaPP { get; set; }
        public string NumFianzaPA { get; set; }
        public string FlagGerencia { get; set; }
        public string FlagLogistica { get; set; }
        public string FlagCosteo { get; set; }
        public string FlagServTec { get; set; }
        public string FlagImportacion { get; set;}
        public string FlagFacturacion { get; set; }
        public string RolUsuario { get; set; }
        public string UsuarioRegistro { get; set; }

    }
}
