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
                public struct Boton
                {
                    public static string Guardar = "CD_BTNGUARDAR";
                }
                public struct Campo
                {
                    public static string ID = "CD01";
                    public static string Codigo = "CD02";
                    public static string Descrip = "CD03";
                    public static string DescripAdic = "CD04";
                    public static string DescripAdic_Textarea = "CD04_TXT";
                    public static string IndStock = "CD05";
                    public static string Cantidad = "CD06";
                    public static string CostoFOB = "CD07";
                    public static string ValUni = "CD08";
                    public static string PorcGanan = "CD09";
                }
            }
            public struct CotDetDespacho
            {
                public struct Campo
                {
                    public static string Dimensiones = "IND01";
                    public static string CompraLocal = "IND02";
                    public static string ReqPlaca = "IND03";
                    public static string GarantAdic = "IND04";
                    public static string GarantAdic_Combo = "IND05";
                    public static string ReqCliente = "IND06";
                    public static string ObsInsta = "IND07";
                }
                public struct IndCosto
                {
                    public static string LLaveMano = "INDC01";
                    public static string Insta = "INDC02";
                    public static string Capa = "INDC03";
                    public static string Manual = "INDC04";
                    public static string Video = "INDC05";
                    public static string MantPrevent = "INDC06";
                    public static string Calibra = "INDC07";
                    public static string Flete = "INDC08";
                }
            }
            public struct CotDetCosto
            {
                public struct Boton
                {
                    public static string Agregar = "BTNAGREGARCOSTO";
                    public static string Editar = "BTNEDITARCOSTO";
                    public static string EditarTAB = "BTNEDITARCOSTOTAB";
                }
                public struct Grilla
                {
                    public static string GrillaCostos = "GRILLACOSTOS";
                    public static string GrillaCostosTAB = "GRILLACOSTOSTAB";
                }
                public struct Panel
                {
                    public static string Destinos = "PNLDESTINOS";
                }
            }
        }

        public PropertyControl ObtenerPropiedadesControl(string strTag)
        {
            var oPropCtrl = new PropertyControl();
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

    //public class PropertyControl
    //{

    //    public PropertyControl()
    //    {
    //        this.IsEnabled = false;
    //        this.IsVisible = false;
    //    }

    //    public string Tag { get; set; }
    //    public bool IsEnabled { get; set; }
    //    public bool IsVisible { get; set; }
    //    public string IdControl { get; set; }
    //    public string Nombre { get; set; }
    //    public string Valor { get; set; }
    //    public PropertyControl[] SubPropiedades { get; set; }
    //}

}