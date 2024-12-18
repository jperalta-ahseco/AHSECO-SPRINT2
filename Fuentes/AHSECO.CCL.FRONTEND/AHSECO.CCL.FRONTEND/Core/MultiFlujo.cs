using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Core
{

    public class MultiFlujo
    {

        public struct Ventas
        {
            public struct TipoSolicitud
            {
                public static string VentaMateriales = "TSOL0004";
                public static string VentaEquipos = "TSOL0005";
            }
        }

        public struct PostVenta
        {
            public struct TipoSolicitud
            {
                public static string Servicio = "TSOL0001";
                public static string RepuestosOComestibles = "TSOL0002";
                public static string ServiciosYRepuestos = "TSOL0003";
            }
        }

        public struct Tag
        {
            public struct Boton
            {
                public static string RegistrarSolicitud = "btnRegistrar";
                public static string CancelarSolicitud = "btnEliminarSol";
                public static string HistorialCotizacion = "btnHistorial";
                public static string ExportarLiquidacion = "btnExportarLiquidacion";
                public static string ImprimirCotizacion = "btnImprimirCotizacion";
                public static string AprobarDescuento = "btnAprobarDscto";
                public static string VerComentarioDescuento = "btnVerComentarioDscto";
                public static string RegistrarCotizacion = "btnRegistrarCotizacion";
                public static string AgregarModificarCotDet_Producto = "btnAgregarDetalle";
                public static string AgregarModificarCotDet_Servicio = "btnAgregarServicios";
            }
        }

        public EstadoControl ObtenerEstadoControl(string strTag)
        {
            var oEstCtrl = new EstadoControl();
            return oEstCtrl;
        }

    }

    public class EstadoControl
    {
        public string Tag { get; set; }
        public bool IsReadonly { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsVisible { get; set; }
    }

}