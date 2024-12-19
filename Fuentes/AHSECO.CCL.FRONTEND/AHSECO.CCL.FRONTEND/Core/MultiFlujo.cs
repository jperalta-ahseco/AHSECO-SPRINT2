using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Core
{

    public class MultiFlujo
    {

        private SolicitudDTO _Solicitud;
        private CotizacionDTO _Cotizacion;

        public MultiFlujo() { }

        public MultiFlujo(long IdSolicitud)
        { _Solicitud = new SolicitudDTO() { Id_Solicitud = IdSolicitud }; }

        public MultiFlujo(long IdSolicitud, long IdCotizacion)
        {
            _Solicitud = new SolicitudDTO() { Id_Solicitud = IdSolicitud };
            _Cotizacion = new CotizacionDTO() { IdCotizacion = IdCotizacion, IdSolicitud = IdSolicitud };
        }

        public long IdSolicitud { 
            set {
                if (_Solicitud == null) { _Solicitud = new SolicitudDTO() { Id_Solicitud = value }; }
                else { _Solicitud.Id_Solicitud = value; }
            } 
        }

        public long IdCotizacion { 
            set {
                long IdSolicitud = 0;
                if (_Solicitud != null) { IdSolicitud = _Solicitud.Id_Solicitud; }
                if (_Cotizacion == null) { _Cotizacion = new CotizacionDTO() { IdCotizacion = value, IdSolicitud = IdSolicitud }; }
                else { _Cotizacion.IdCotizacion = value; _Cotizacion.IdSolicitud = IdSolicitud; }
            } 
        }

        public struct Tag
        {
            public struct Solicitud
            {
                public static string RegistrarSolicitud = "btnRegistrar";
                public static string CancelarSolicitud = "btnEliminarSol";
            }
            public struct Cotizacion
            {
                public static string Campos_Primarios = "PrimaryFields";
                public static string Campos_Secundarios = "SecondaryFields";
                public static string HistorialCotizacion = "btnHistorial";
                public static string ExportarLiquidacion = "btnExportarLiquidacion";
                public static string ImprimirCotizacion = "btnImprimirCotizacion";
                public static string AprobarDescuento = "btnAprobarDscto";
                public static string VerComentarioDescuento = "btnVerComentarioDscto";
                public static string RegistrarCotizacion = "btnRegistrarCotizacion";
                public static string AgregarModificarCotDet_PRO = "btnAgregarDetalle";
                public static string AgregarModificarCotDet_SER = "btnAgregarServicios";
            }
            public struct CotDetalle
            {
                public static string CamposGrilla_PRO = "CotDetFields_PRO";
                public static string CamposGrilla_SER = "CotDetFields_SER";
            }
            public struct CotDetDespacho
            {
                public static string CamposGrilla = "Costo_GridFields";
            }
            public struct CotDetCosto
            {
                public static string CamposGrilla = "Costo_GridFields";
                public static string Tabs = "CotDetDesp_TABS";
            }
            public struct CotDetActividad
            {
                public static string CamposGrilla = "Actividad_GridFields";
            }
        }

        public PropiedadesControl ObtenerEstadoControl(string strTag)
        {
            var oPropCtrl = new PropiedadesControl();
            return oPropCtrl;
        }

    }

    public class PropiedadesControl
    {
        public string Tag { get; set; }
        public bool IsReadonly { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsVisible { get; set; }
        public object Value { get; set; }
        public object[] Values { get; set; }
    }

}