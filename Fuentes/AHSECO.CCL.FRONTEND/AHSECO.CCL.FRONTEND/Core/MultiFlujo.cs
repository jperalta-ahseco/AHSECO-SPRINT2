using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using NPOI.XSSF.Streaming.Values;
using System;
using System.Collections.Generic;
using System.IdentityModel;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Core
{

    public class MultiFlujo
    {

        public SolicitudDTO Solicitud;
        public CotizacionDTO Cotizacion;
        public String NombreRol;

        public MultiFlujo()
        {
            Solicitud = new SolicitudDTO();
            Cotizacion = new CotizacionDTO();
        }

        public MultiFlujo(long IdSolicitud)
        { Solicitud = new SolicitudDTO() { Id_Solicitud = IdSolicitud }; }

        public MultiFlujo(long IdSolicitud, long IdCotizacion)
        {
            Solicitud = new SolicitudDTO() { Id_Solicitud = IdSolicitud };
            Cotizacion = new CotizacionDTO() { IdCotizacion = IdCotizacion, IdSolicitud = IdSolicitud };
        }

        public long IdSolicitud
        {
            get { return Solicitud.Id_Solicitud; }
            set
            {
                if (Solicitud == null) { Solicitud = new SolicitudDTO() { Id_Solicitud = value }; }
                else { Solicitud.Id_Solicitud = value; }
            }
        }

        public long IdCotizacion
        {
            get { return Cotizacion.IdCotizacion; }
            set
            {
                long IdSolicitud = 0;
                if (Solicitud != null) { IdSolicitud = Solicitud.Id_Solicitud; }
                if (Cotizacion == null) { Cotizacion = new CotizacionDTO() { IdCotizacion = value, IdSolicitud = IdSolicitud }; }
                else { Cotizacion.IdCotizacion = value; Cotizacion.IdSolicitud = IdSolicitud; }
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
                public struct PrecioVenta
                {
                    public static string MostrarCostoFOB = "OP01";
                    public static string MostrarValorUnitario = "OP02";
                }
                public struct Indicadores
                {
                    public static string MostrarTodos = "OP01";
                    public static string MostrarTieneStock = "OP02";
                }
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

        public PropiedadControl ObtenerPropiedadesControl(string strTag)
        {
            var oPropCtrl = new PropiedadControl();
            oPropCtrl.Tag = strTag;

            if (strTag == Tag.Solicitud.RegistrarSolicitud)
            {
                if (this.Solicitud == null) { oPropCtrl.IsVisible = true; oPropCtrl.IsEnabled = true; }
                else if (this.Solicitud.Id_Solicitud <= 0) { oPropCtrl.IsVisible = true; oPropCtrl.IsEnabled = true; }
            }

            if (strTag == Tag.Solicitud.CancelarSolicitud)
            {
                if (this.Solicitud != null)
                {
                    if (this.Solicitud.Id_Solicitud >= 0)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor &&
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc &&
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        { oPropCtrl.IsVisible = true; oPropCtrl.IsEnabled = true; }
                    }
                }
            }

            if (strTag == Tag.Cotizacion.Campos_Primarios)
            {
                if (this.Solicitud != null)
                {
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                    {
                        if (this.Solicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado ||
                            this.Solicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                        { oPropCtrl.IsVisible = true; oPropCtrl.IsEnabled = true; }
                    }
                }
            }

            if (strTag == Tag.Cotizacion.Campos_Secundarios)
            {
                if (this.Solicitud != null)
                {
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                    {
                        if (this.Solicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado ||
                            this.Solicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion ||
                            this.Solicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                        { oPropCtrl.IsVisible = true; oPropCtrl.IsEnabled = true; }
                    }
                }
            }

            if (strTag == Tag.Cotizacion.HistorialCotizacion) {
                oPropCtrl.IsVisible = true; oPropCtrl.IsEnabled = true;
            }

            return oPropCtrl;
        }

    }

    public class PropiedadControl
    {

        public PropiedadControl()
        {
            this.IsEnabled = false;
            this.IsVisible = false;
        }

        public PropiedadControl(bool swVisible)
        {
            this.IsEnabled = false;
            this.IsVisible = swVisible;
        }

        public string Tag { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsVisible { get; set; }
        public object Value { get; set; }
    }

}