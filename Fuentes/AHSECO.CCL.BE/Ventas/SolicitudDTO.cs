using System;

namespace AHSECO.CCL.BE.Ventas
{
    public class SolicitudDTO : CamposAuditoriaDTO
    {

        public string IsTipoProceso { get; set; }
        public long Id_Solicitud { get; set; }
        public long Id_WorkFlow { get; set; }
        public int Id_Flujo { get; set; }
        public string nomFlujo { get; set; }
        public string Fecha_Sol { get; set; }
        public string Tipo_Sol { get; set; }
        public string NomTipoSol { get; set; }
        public string Cod_MedioCont { get; set; }
        public int IdCliente { get; set; }
        public string Ubigeo { get; set; }
        public string Cod_Ubigeo{ get; set; }
        public string RUC { get; set; }
        public string RazonSocial { get; set; }
        public string AsesorVenta { get; set; }
        public int Stock { get; set; }
        public string Estado { get; set; }
        public string nomEstado { get; set; }
        public string abrevEstado { get; set; }
        public string Cod_Empresa { get; set; }
        public  string Nom_Empresa { get; set; }
        public string TipoVenta { get; set; }
        public string TipoProceso { get; set; }
        public string NroProceso { get; set; }
        public string NombreTipoVenta { get; set;}
        public int NroCotizacionEliminado { get; set; }

        //#region BandejaInstalacionTecnica
        //public string OrdenCompra { get; set; }
        //public string NumProceso { get; set; }
        //public string Contrato { get; set; }
        //#endregion
    }
}
