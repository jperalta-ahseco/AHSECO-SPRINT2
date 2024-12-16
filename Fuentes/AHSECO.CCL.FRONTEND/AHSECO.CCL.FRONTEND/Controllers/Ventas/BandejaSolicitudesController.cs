using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AHSECO.CCL.FRONTEND.Identity;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BL.Ventas;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Core;
using System.Web;
using System.Configuration;
using AHSECO.CCL.FRONTEND.Security;
using Newtonsoft.Json;
using System.IO;
using AHSECO.CCL.BL.Mantenimientos;
using NPOI.OpenXmlFormats.Spreadsheet;
using System.Web.UI.WebControls;
using AHSECO.CCL.BL.Util;
using Microsoft.IdentityModel.Tokens;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.Util;
using System.IdentityModel.Claims;
using AHSECO.CCL.BL.ServicioTecnico.BandejaInstalacionTecnica;
using Microsoft.Ajax.Utilities;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using static AHSECO.CCL.COMUN.ConstantesDTO.Mensajes;
using static AHSECO.CCL.COMUN.ConstantesDTO.CotizacionVentaDetalle;

namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaSolicitudesVentasController : Controller
    {

        const string TAG_ConceptosVenta = "ConceptosVenta";
        const string TAG_CDI = "CDItems";
        const string TAG_CDCI_CotDetItem = "CostoItemsCDI";
        const string TAG_CDCI_Tabs = "CostoItemsTab";

        const string opcTablaTemporal = "1";
        const string opcTablaFinal = "2";

        // GET BandejaSolicitudesVentas
        [Permissions(Permissions = "BANDEJAVENTAS")]
        public ActionResult Index()
        {
            VariableSesion.setCadena("numSol", null);
            VariableSesion.setCadena("idWorkFlow", null);
            VariableSesion.setCadena("estadoSol", null);
            VariableSesion.setCadena("tipoSol", null);
            VariableSesion.setCadena("idFlujo", null);
            VariableSesion.setCadena("idCotizacion", null);
            VariableSesion.setCadena("estadoAbrev", null);

            return View();
        }

        private bool EsFlujoValorizacion()
        {
            var sw = false;
            var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");
            if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente || NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
            {
                sw = true;
            }
            return sw;
        }

        public ActionResult SolicitudVenta()
        {
            var ventasBL = new VentasBL();
            var clienteBL = new ClienteBL();
            var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");
            var numSol = VariableSesion.getCadena("numSol");

            //Para los botones de despacho:
            ViewBag.Btn_FinalizarVenta = "none";
            ViewBag.Btn_GuardarDespacho = "none";
            ViewBag.Btn_GuardarGestionLogistica = "none";
            ViewBag.Btn_EnviarGuia = "none";
            ViewBag.Btn_EnviarGuiaBO = "none";
            ViewBag.Btn_EnviarServicio = "none";
            ViewBag.Btn_GuiaPedido = "none";
            ViewBag.Btn_GuiaBO = "none";
            ViewBag.Btn_Aprobar = "none";
            ViewBag.Btn_Observar = "none";
            ViewBag.Btn_EnviarGestionDespacho = "none";
            ViewBag.Btn_EditarGestionLogistica = "none";
            ViewBag.Btn_EditarGestionLogisticaSE = "none";
            ViewBag.Btn_GuardarGestionLogisticaSE = "none";
            ViewBag.Btn_EnviarGestionDespachoSE = "none";
            ViewBag.Btn_EditarDespacho = "none";
            ViewBag.TxtOrdenCompra = "disabled";
            ViewBag.TxtFecOrdenCompra = "disabled";
            ViewBag.TxtCodigoPedido = "disabled";
            ViewBag.IngresoAlmacen = "disabled";
            ViewBag.FechaEntregaPedidoSE = "disabled";
            ViewBag.TxtNumeroFacturaSE = "disabled";
            ViewBag.TxtNumeroGuiaRemisionSE = "disabled";
            ViewBag.TxtNumeroSerieSE = "disabled";
            ViewBag.FechaEntregaPedidoCE = "disabled";
            ViewBag.TxtNumeroFacturaCE = "disabled";
            ViewBag.TxtNumeroGuiaRemisionCE = "disabled";
            ViewBag.TxtNumeroSerieCE = "disabled";
            ViewBag.VerObservacionGerencia = false;
            ViewBag.Btn_GuardarImportacion = "none";
            ViewBag.CodStock = "";
            ViewBag.FechaFactura = "disabled";
            ViewBag.TxtNumeroFacturaServ = "disabled";
            ViewBag.Btn_GuardarFactura = "none";

            string[] dtHeadProducto =
            {
                "Nro. Item",
                "Codigo Producto",
                "Descripción",
                "Stock Disponible",
                "Unidad Medida",
                "Cantidad",
                "Valor. Venta Total Sin IGV (Sin Ganancia)",
                "Ganancia(%)",
                "Valor. Venta Total Sin IGV Con Ganancia)",
                "Acción"
            };
            ViewBag.Cabecera = dtHeadProducto;

            ViewBag.NombreRol = NombreRol;
            ViewBag.TipoSolicitud = "";
            ViewBag.EstadoSolicitud = "";
            ViewBag.IdCotizacion = 0;
            ViewBag.IdContacto = 0;
            ViewBag.Observacion = "";

            VariableSesion.setObject(TAG_CDI, new List<CotizacionDetalleDTO>());

            ViewBag.MostrarCotizacionDetalle = false;
            ViewBag.PermitirCancelarCot = false;
            ViewBag.PermitirEditarCotizacion_Pri = false; //Se bloquea los campos principales de la cabecera de cotización
            ViewBag.PermitirEditarCotizacion_Sec = false;
            ViewBag.PermitirExportarLiquidacion = false;
            ViewBag.PermitirAgregarProductos = false;
            ViewBag.PermitirEnvioCotizacion = false;
            ViewBag.PermitirGuardarCotizacion = false;
            ViewBag.PermitirReCotizacion = false;
            ViewBag.PermitirGuardarValorizacion = false;
            ViewBag.PermitirAgregarServicios = false;
            ViewBag.PermitirImprimirCotizacion = false;
            ViewBag.PermitirEditarCotDetItem = false;
            ViewBag.PermitirEditarValorizacion = false;
            ViewBag.EsCotizacionValorizada = false;
            ViewBag.EsCotizacionCosteada = false;
            ViewBag.PermitirEditarGanancia = false;
            ViewBag.PermitirActualizarCotizacion = false;
            ViewBag.PermitirEditarPorcentDscto = false;
            ViewBag.PermitirAprobarCotizacion = false;
            ViewBag.DsctoRequiereAprobacion = false;
            ViewBag.DsctoAprobado = false;
            ViewBag.DsctoRespondido = false;

            ViewBag.PermitirTabDetCot = true;
            ViewBag.PermitirTabInsta = false;
            ViewBag.PermitirTabCapa = false;
            ViewBag.PermitirTabMantPrevent = false;
            ViewBag.PermitirTabLLaveMano = false;
            ViewBag.PermitirTabManuales = false;
            ViewBag.PermitirTabVideos = false;
            ViewBag.PermitirTabCalib = false;
            ViewBag.PermitirTabFlete = false;
            ViewBag.ObservacionGerencia = "";

            ViewBag.AcordionCollapsedLiq = "collapsed";
            ViewBag.TabAcordionCollapsedLiq = "collapse";
            ViewBag.AcordionCollapsedGest = "collapsed";
            ViewBag.TabAcordionCollapsedGest = "collapse";
            ViewBag.VerGestionVenta = false;
            ViewBag.VerGestionLogistica = false;
            ViewBag.VerNavConStock = false;
            ViewBag.VerNavSinStock = false;
            ViewBag.ContadorSeriesConStock = 0;
            ViewBag.ContadorSeriesSinStock = 0;
            ViewBag.TotalSeriesConStock = 0;
            ViewBag.TotalSeriesSinStock = 0;
            ViewBag.InActiveSinStock = "";
            ViewBag.InActiveServicio = "";
            ViewBag.VerNavServicio = false;
            ViewBag.InActiveTecnico = "";
            ViewBag.EnvioServicio = 0;

            ViewBag.VerBandejaServiciosCotizacion = false;
            ViewBag.VerBandejaCotizacion = false;

            if (EsFlujoValorizacion())
            {
                ViewBag.PermitirEditarValorizacion = true;
            }

            if (ViewBag.PermitirEditarValorizacion == true)
            {
                string[] CD_Columns =
                {
                    "Nro. Item",
                    "Codigo Producto",
                    "Descripción",
                    "Stock Disponible",
                    "Unidad Medida",
                    "Cantidad",
                    "Costo FOB",
                    "Valor Venta Unitario",
                    "Valor. Venta Total Sin IGV (Sin Ganancia)",
                    "Ganancia(%)",
                    "Valor. Venta Total Sin IGV Con Ganancia)",
                    "Acción"
                };
                ViewBag.CabeceraCotDet = CD_Columns;
            }
            else
            {
                string[] CD_Columns =
                {
                    "Nro. Item",
                    "Codigo Producto",
                    "Descripción",
                    "Stock Disponible",
                    "Unidad Medida",
                    "Cantidad",
                    "Valor Venta Unitario",
                    "Valor. Venta Total Sin IGV (Sin Ganancia)",
                    "Ganancia(%)",
                    "Valor. Venta Total Sin IGV Con Ganancia)",
                    "Acción"
                };
                ViewBag.CabeceraCotDet = CD_Columns;
            }

            if (numSol != null)
            {
                var rptaSoli = ventasBL.ObtenerSolicitudes(new SolicitudDTO() { Id_Solicitud = int.Parse(numSol) });
                var soli = rptaSoli.Result.First();
                ViewBag.TipoSolicitud = soli.Tipo_Sol;
                ViewBag.EstadoSolicitud = soli.Estado;
                VariableSesion.setCadena("estadoSol", soli.Estado);

                //Para Gestion:
                var validarDespacho = ventasBL.ValidarDespacho(int.Parse(numSol));
                var validarSinStock = ventasBL.ValidarAprobacionSinStock(int.Parse(numSol));
                if (validarDespacho.Result != null)
                {
                    ViewBag.ContadorSeriesConStock = validarDespacho.Result.ContadorSeriesConStock;
                    ViewBag.ContadorSeriesSinStock = validarDespacho.Result.ContadorSeriesSinStock;
                    ViewBag.TotalSeriesConStock = validarDespacho.Result.NumeroConStock;
                    ViewBag.TotalSeriesSinStock = validarDespacho.Result.NumeroSinStock;
                    ViewBag.EnvioServicio = validarDespacho.Result.EnvioServicio;
                    
                    if (validarDespacho.Result.ContadorSinStock > 0)
                    {
                        ViewBag.CodStock = "N";
                    }
                    if (validarDespacho.Result.ContadorConStock > 0)
                    {
                        ViewBag.CodStock = "S";
                    }
                    if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                    {
                        ViewBag.CodStock = "X";
                    }

                }

                var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
                { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = soli.Estado });

                if (rptaEst.Result.Any()) { VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado); }

                //Validando CAMPOS y BOTONES según ROL
                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ
                    || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc)
                {

                    if(soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado)
                    {
                        ViewBag.PermitirCancelarCot = true;
                        ViewBag.PermitirEditarCotizacion_Pri = true;
                        ViewBag.PermitirEditarCotizacion_Sec = true;
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                    {
                        ViewBag.PermitirCancelarCot = true;
                        ViewBag.PermitirEditarCotizacion_Sec = true;
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            ViewBag.PermitirImprimirCotizacion = true;
                        }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                    {
                        if(NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                        {
                            ViewBag.PermitirImprimirCotizacion = true;
                        }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob)
                    {
                        ViewBag.Btn_GuardarDespacho = "inline-block";
                        ViewBag.TxtOrdenCompra = "";
                        ViewBag.TxtFecOrdenCompra = "";
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {

                        ViewBag.Btn_EditarDespacho = "inline-block";
                        ViewBag.VerGestionLogistica = true;
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0)
                            {
                                if (validarSinStock.Result.EstadoAprobacion == "" ||
                                    validarSinStock.Result.EstadoAprobacion == "OBS")
                                {
                                    ViewBag.Btn_EnviarGuiaBO = "inline-block";
                                    ViewBag.Btn_GuiaBO = "inline-block";
                                }

                                if (validarSinStock.Result.EstadoAprobacion == "IMP")
                                {
                                    ViewBag.Btn_EnviarGuia = "inline-block";
                                    ViewBag.Btn_GuiaPedido = "inline-block";
                                }

                                if (validarDespacho.Result.EnvioBOSinStock > 0)
                                {
                                    ViewBag.VerNavSinStock = true;
                                    ViewBag.InActiveSinStock = "in active";
                                }

                            }

                            if(validarDespacho.Result.ContadorConStock > 0)
                            {
                                ViewBag.Btn_EnviarGuia = "inline-block";
                                ViewBag.Btn_GuiaPedido = "inline-block";
                            }

                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.Btn_EnviarGuia = "inline-block";
                                ViewBag.Btn_GuiaPedido = "inline-block";
                                ViewBag.VerNavConStock = true;
                            }

                            if(soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                                soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if (validarDespacho.Result.EnvioServicio == 0)
                                {
                                    ViewBag.Btn_EnviarServicio = "inline-block";
                                    ViewBag.InActiveTecnico = "in active";
                                }
                                else
                                {
                                    ViewBag.VerNavServicio = true;
                                    ViewBag.InActiveServicio = "in active";
                                    ViewBag.InActiveTecnico = "";
                                }
                            }
                         
                        }

                        if (validarSinStock.Result != null)
                        {
                            if (validarSinStock.Result.EstadoAprobacion == "OBS")
                            {
                                ViewBag.VerObservacionGerencia = true;
                                ViewBag.ObservacionGerencia = validarSinStock.Result.Observacion;
                            }
                        }

                        if(soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                        {
                            ViewBag.Btn_EnviarGuiaBO = "none";
                            ViewBag.Btn_GuiaBO = "none";
                        }

                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg)
                    {

                        ViewBag.Btn_FinalizarVenta = "inline-block";
                        ViewBag.VerGestionLogistica = true;

                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;
                                ViewBag.InActiveSinStock = "in active";
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                               soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                ViewBag.VerNavServicio = true;
                                ViewBag.InActiveServicio = "in active";
                                ViewBag.InActiveTecnico = "";
                            }

                        }

                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        ViewBag.VerGestionLogistica = true;
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;
                                ViewBag.InActiveSinStock = "in active";
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                               soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                ViewBag.VerNavServicio = true;
                                ViewBag.InActiveServicio = "in active";
                                ViewBag.InActiveTecnico = "";
                            }
                               
                        }
                    }

                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente)
                {
                    if (validarSinStock.Result != null)
                    {
                        if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas &&
                            validarSinStock.Result.EstadoAprobacion == "")
                        {
                            ViewBag.Btn_Aprobar = "inline-block";
                            ViewBag.Btn_Observar = "inline-block";
                        }
                    }
                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Logistica)
                {
                    ViewBag.Btn_GuardarDespacho = "none";
                    ViewBag.FechaEntregaPedidoSE = "";
                    ViewBag.TxtNumeroFacturaSE = "";
                    ViewBag.TxtNumeroGuiaRemisionSE = "";
                    ViewBag.TxtNumeroSerieSE = "";
                    ViewBag.FechaEntregaPedidoCE = "";
                    ViewBag.TxtNumeroFacturaCE = "";
                    ViewBag.TxtNumeroGuiaRemisionCE = "";
                    ViewBag.TxtNumeroSerieCE = "";

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas
                   || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                   || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        ViewBag.VerGestionLogistica = true;
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {

                                ViewBag.VerNavSinStock = true;
                                ViewBag.InActiveSinStock = "in active";

                                if (validarDespacho.Result.GestionLogSinStock > 0)
                                {
                                    ViewBag.Btn_EnviarGestionDespachoSE = "inline-block";
                                    ViewBag.Btn_EditarGestionLogisticaSE = "inline-block";
                                }
                                else
                                {
                                    ViewBag.Btn_GuardarGestionLogisticaSE = "inline-block";

                                }
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;

                                if (validarDespacho.Result.GestionLogConStock > 0)
                                {
                                    ViewBag.Btn_EnviarGestionDespacho = "inline-block";
                                    ViewBag.Btn_EditarGestionLogistica = "inline-block";
                                }
                                else
                                {
                                    ViewBag.Btn_GuardarGestionLogistica = "inline-block";
                                }
                            }
                        }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                   || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;
                                ViewBag.InActiveSinStock = "in active";
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                            }
                        }
                    }
                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Importacion)
                {
                    ViewBag.TxtCodigoPedido = "";

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {
                        ViewBag.VerGestionLogistica = true;
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.IngresoAlmacen = "";
                                if (validarSinStock.Result.EstadoAprobacion == "APR")
                                {
                                    ViewBag.Btn_GuardarImportacion = "inline-block";
                                }
                                ViewBag.VerNavSinStock = true;
                                ViewBag.InActiveSinStock = "in active";
                            }
                        }
                    }

                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Facturador)
                {
                   
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {
                        ViewBag.VerGestionLogistica = true;
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                            || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                        {
                            ViewBag.VerNavServicio = true;
                            ViewBag.InActiveServicio = "in active";
                            ViewBag.FechaFactura = "";
                            ViewBag.TxtNumeroFacturaServ = "";
                           
                            if (validarDespacho.Result != null)
                            {
                                if (validarDespacho.Result.EnvioServicio > 0)
                                {
                                    ViewBag.Btn_GuardarFactura = "inline-block";
                                }
                            }
                        }
                    }
                    if(soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg ||
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        ViewBag.VerGestionLogistica = true;
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                           || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                        {
                            ViewBag.VerNavServicio = true;
                            ViewBag.InActiveServicio = "in active";
                        }
                    }
                }

                //Validando CAMPOS y BOTONES según TIPO DE SOLICITUD
                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                {
                    ViewBag.VerBandejaServiciosCotizacion = true;
                    ViewBag.VerNavConStock = false;
                    ViewBag.VerNavSinStock = false;
                }

                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                {
                    ViewBag.VerBandejaCotizacion = true;
                }

                //Validando CAMPOS y BOTONES según ESTADO DE SOLICITUD
                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                {

                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                    {

                        ViewBag.PermitirEditarCotDetItem = true;

                        //Solo se habilita el Detalle de Cotizacion SERVICIOS para los COORDINADORES
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                        {
                            ViewBag.PermitirAgregarServicios = true;
                        }

                        //Solo se habilita el Detalle de Cotizacion PRODUCTOS para los ASESORES de VENTA
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles
                            || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales
                            || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                        {
                            ViewBag.PermitirAgregarProductos = true;
                            ViewBag.PermitirEnvioCotizacion = true;
                        }

                        //Para los combinados de PRODUCTOS y SERVICIOS se habilitarán ambos botones
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                        {
                            ViewBag.PermitirAgregarServicios = true;
                            ViewBag.PermitirAgregarProductos = true;
                            ViewBag.PermitirEnvioCotizacion = true;
                        }

                    }

                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {

                    if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                        || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            ViewBag.PermitirAgregarServicios = true;
                        }
                    }

                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.ServTecnico)
                    {
                        ViewBag.PermitirTabInsta = true;
                        ViewBag.PermitirTabCapa = true;
                        ViewBag.PermitirTabMantPrevent = true;
                        ViewBag.PermitirTabLLaveMano = true;
                        ViewBag.PermitirTabManuales = true;
                        ViewBag.PermitirTabVideos = true;
                    }

                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Logistica)
                    {
                        ViewBag.PermitirTabFlete = true;
                    }

                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                {
                    ViewBag.VerGestionVenta = true;
                    //Se elimina el campo de acciones del detalle de la cotización porque ya fue aprobado
                    string[] arrCotDetCols = ViewBag.CabeceraCotDet;
                    int indexToRemove = arrCotDetCols.Length - 1;
                    ViewBag.CabeceraCotDet = arrCotDetCols.Where((source, index) => index != indexToRemove).ToArray();
                }

                var rptaCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO()
                {
                    IdSolicitud = int.Parse(numSol),
                    Estado = ConstantesDTO.CotizacionVenta.Estados.Activo
                });

                if (rptaCotizacion.Result.Any())
                {

                    ViewBag.MostrarCotizacionDetalle = true;

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                    {
                        ViewBag.AcordionCollapsedLiq = "";
                        ViewBag.TabAcordionCollapsedLiq = "";
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        ViewBag.AcordionCollapsedGest = "";
                        ViewBag.TabAcordionCollapsedGest = "";
                    }

                    var oCotizacion = rptaCotizacion.Result.First();
                    ViewBag.IdCotizacion = oCotizacion.IdCotizacion;
                    ViewBag.NombreContacto = oCotizacion.NombreContacto;
                    if (oCotizacion.FecCotizacion.HasValue) { ViewBag.FechaCotizacion = oCotizacion.FecCotizacion.Value.ToString("dd/MM/yyyy"); }
                    ViewBag.PlazoEntrega = oCotizacion.PlazoEntrega;
                    ViewBag.FormaPago = oCotizacion.FormaPago;
                    ViewBag.Moneda = oCotizacion.Moneda;
                    ViewBag.Vigencia = oCotizacion.Vigencia;
                    ViewBag.Garantia = oCotizacion.Garantia;
                    ViewBag.Observacion = oCotizacion.Observacion;
                    ViewBag.PorcentajeDscto = Utilidades.parseDecimalToString(oCotizacion.PorcentajeDescuento);

                    if (oCotizacion.IndDsctoRequiereAprob.HasValue)
                    { ViewBag.DsctoRequiereAprobacion = oCotizacion.IndDsctoRequiereAprob.Value; }

                    if (oCotizacion.IndDsctoAprob.HasValue)
                    {
                        ViewBag.DsctoAprobado = oCotizacion.IndDsctoAprob.Value;
                        ViewBag.DsctoRespondido = true;
                    }

                    if (oCotizacion.IdContacto.HasValue)
                    {
                        ViewBag.IdContacto = oCotizacion.IdContacto.Value;
                        var contactos = clienteBL.ObtenerContactos(new ContactoDTO() { IdContacto = oCotizacion.IdContacto.Value });
                        if (contactos != null)
                        {
                            var ocontacto = contactos.Result.FirstOrDefault(x => x.IdContacto == oCotizacion.IdContacto.Value);
                            if (ocontacto != null)
                            {
                                ViewBag.AreaContacto = ocontacto.AreaContacto;
                                ViewBag.TelefonoContacto = ocontacto.Telefono;
                                ViewBag.CorreoContacto = ocontacto.Correo;
                            }
                        }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                    {

                        //Si es Asesor de Costos o Gerente General podrá modificar los PRECIOS DE VENTAS
                        //pero el Asesor de Ventas solo modificará el porcentaje de GANANCIA
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || EsFlujoValorizacion())
                        {
                            ViewBag.PermitirGuardarValorizacion = true;
                        }

                        var swEsCotizacionValorizada = false;
                        var swEsCotizacionCosteada = false;

                        if (oCotizacion.IndValorizado.HasValue)
                        { if (oCotizacion.IndValorizado.Value) { swEsCotizacionValorizada = true; } }

                        if (oCotizacion.IndCosteado.HasValue)
                        { if (oCotizacion.IndCosteado.Value) { swEsCotizacionCosteada = true; } }

                        ViewBag.EsCotizacionValorizada = swEsCotizacionValorizada;
                        ViewBag.EsCotizacionCosteada = swEsCotizacionCosteada;

                        //Solo se puede recotizar la venta si se ingresó los PRECIOS y COSTOS de venta de cada item seleccionado para la cotización
                        if (swEsCotizacionValorizada && swEsCotizacionCosteada)
                        {
                            if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                            {
                                ViewBag.PermitirReCotizacion = true;
                                ViewBag.PermitirEditarGanancia = true;
                                ViewBag.PermitirImprimirCotizacion = true;
                            }
                            ViewBag.PermitirCancelarCot = true;
                            ViewBag.PermitirExportarLiquidacion = true;
                        }

                        //Solo se validará COSTEO para venta de equipos
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                        {
                            if (swEsCotizacionValorizada && swEsCotizacionCosteada && NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                            {
                                ViewBag.PermitirAprobarCotizacion = true;
                                ViewBag.PermitirEditarPorcentDscto = true;
                            }
                        }
                        else if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales ||
                            soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles)
                        {

                            if (swEsCotizacionValorizada && 
                                (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor
                                || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc
                                || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ))
                            {
                                ViewBag.PermitirAprobarCotizacion = true;
                            }
                            //Solo se podrá editar el porcentaje de descuento si se termino el costeo
                            if (swEsCotizacionValorizada && swEsCotizacionCosteada && NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                            {
                                ViewBag.PermitirEditarPorcentDscto = true;
                            }
                        }

                    }

                    var resCotDet = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                    if (resCotDet.Result != null)
                    {
                        if (resCotDet.Result.Any())
                        {

                            //Para las solicitudes de SERVICIOS y REPUESTOS se habilita la aprobación de solicitud por no tener COSTEO
                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                                || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion &&
                                    (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                                     NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ))
                                {
                                    ViewBag.PermitirAprobarCotizacion = true;
                                }
                            }

                            //Se carga el detalle de la cotizacion
                            var lstItems = resCotDet.Result.ToList();
                            var resArticulos = ventasBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO() { CodsArticulo = string.Join(";", lstItems.Select(o => o.CodItem).ToArray()) });
                            lstItems.ForEach(x =>
                            {
                                if (x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                                {
                                    x.EsItemPadre = true;
                                }
                                if (x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto ||
                                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                                {
                                    var oArticulo = resArticulos.Result.FirstOrDefault(o => o.CodArticulo.Trim() == x.CodItem.Trim());
                                    if (oArticulo != null)
                                    {
                                        x.DescUnidad = oArticulo.DescUnidad;
                                    }
                                }
                                x.IsUpdated = false;
                            });

                            lstItems = CompletarInfoCotDet(lstItems);

                            //Se separa los detalles para la tabla final y para el buscador de productos
                            //mediante el campo "IsTempRecord"
                            var lstItems_Tmp = new List<CotizacionDetalleDTO>();
                            lstItems.ForEach(x =>
                            {
                                var oItem = new CotizacionDetalleDTO();
                                x.CopyProperties(ref oItem);
                                oItem.IsTempRecord = true;
                                lstItems_Tmp.Add(oItem);
                            });
                            lstItems.AddRange(lstItems_Tmp);
                            VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                        }
                    }
                }
            }

            return View();
        }

        private void AddModifyCDI(CotizacionDetalleDTO CotDet)
        {
            List<CotizacionDetalleDTO> lstItems = new List<CotizacionDetalleDTO>();
            if (VariableSesion.getObject(TAG_CDI) != null) { lstItems = (List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI); }

            if (lstItems.Any(x => x.NroItem == CotDet.NroItem && x.CodItem.Trim() == CotDet.CodItem.Trim()))
            {
                lstItems.ForEach(x =>
                {
                    var swEdit = false;

                    //Verifica si se modifica desde el buscador
                    if (x.NroItem == CotDet.NroItem && x.CodItem.Trim() == CotDet.CodItem.Trim() && CotDet.IsTempRecord && x.IsTempRecord)
                    { swEdit = true; }

                    //Verifica si se busca desde la grilla principal
                    if (x.NroItem == CotDet.NroItem && x.CodItem.Trim() == CotDet.CodItem.Trim() && !CotDet.IsTempRecord)
                    { swEdit = true; }

                    if (swEdit)
                    {
                        if (CotDet.Id != 0) { x.Id = CotDet.Id; }
                        x.IdCotizacion = CotDet.IdCotizacion;
                        x.NroItem = CotDet.NroItem;
                        x.TipoItem = CotDet.TipoItem;
                        x.CodItem = CotDet.CodItem;
                        x.Descripcion = CotDet.Descripcion;
                        x.DescripcionAdicional = CotDet.DescripcionAdicional;
                        x.Stock = CotDet.Stock;
                        x.IndStock = CotDet.IndStock;
                        x.CodUnidad = CotDet.CodUnidad;
                        x.DescUnidad = CotDet.DescUnidad;
                        x.Cantidad = CotDet.Cantidad;
                        x.CostoFOB = CotDet.CostoFOB;
                        x.VentaUnitaria = CotDet.VentaUnitaria;
                        x.VentaTotalSinIGV = CotDet.VentaTotalSinIGV;
                        x.PorcentajeGanancia = CotDet.PorcentajeGanancia;
                        x.VentaTotalSinIGVConGanacia = CotDet.VentaTotalSinIGVConGanacia;
                        x.MontoDescuento = CotDet.MontoDescuento;
                        x.VentaTotalSinIGVDscto = CotDet.VentaTotalSinIGVDscto;
                        x.EsItemPadre = CotDet.EsItemPadre;
                        x.CantSubItem = CotDet.CantSubItem;
                        if (CotDet.CotizacionDespacho != null)
                        {
                            if (x.CotizacionDespacho == null) { x.CotizacionDespacho = new CotDetDespachoDTO(); }
                            var oCotDetDespAux = x.CotizacionDespacho;
                            CotDet.CotizacionDespacho.CopyProperties(ref oCotDetDespAux);
                            x.CotizacionDespacho = oCotDetDespAux;
                        }
                        if (CotDet.CotizacionCostos != null)
                        {
                            x.CotizacionCostos = CotDet.CotizacionCostos;
                        }
                        x.DetallesServicio = CotDet.DetallesServicio;
                        //x.IsTempRecord = CotDet.IsTempRecord; // No se actualiza su indicador de registro temporal
                        x.IsUpdated = CotDet.IsUpdated;
                        x.CodItem_IsUpdatable = CotDet.CodItem_IsUpdatable;
                        x.CodItemTemp = CotDet.CodItemTemp;
                    }
                }
                );
            }
            else
            {
                var CotDet_Aux = new CotizacionDetalleDTO();
                CotDet.CopyProperties(ref CotDet_Aux);
                CotDet_Aux.IsUpdated = true;
                lstItems.Add(CotDet_Aux);
            }

            VariableSesion.setObject(TAG_CDI, lstItems);
        }

        private List<CotizacionDetalleDTO> GetCDIList(string opcGrillaItems)
        {
            List<CotizacionDetalleDTO> lstItems = new List<CotizacionDetalleDTO>();

            if (VariableSesion.getObject(TAG_CDI) != null)
            { lstItems = ((List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI)).ToList(); }

            var lstCDI = new List<CotizacionDetalleDTO>();

            if (!string.IsNullOrEmpty(opcGrillaItems))
            {
                if (opcGrillaItems == opcTablaTemporal)
                { lstCDI = lstItems.Where(x => x.IsTempRecord == true).ToList(); }
                if (opcGrillaItems == opcTablaFinal)
                { lstCDI = lstItems.Where(x => x.IsTempRecord == false).ToList(); }
            }
            else
            {
                lstCDI = (List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI);
            }

            return lstCDI;
        }

        private ArticuloDTO findSaleItemRecord(string CodItem)
        {

            var ventaBL = new VentasBL();
            ArticuloDTO oArticulo = null;

            if (VariableSesion.getObject(TAG_ConceptosVenta) != null)
            {
                if (((List<ArticuloDTO>)VariableSesion.getObject(TAG_ConceptosVenta)).Any())
                {
                    var lstArticulos = (List<ArticuloDTO>)VariableSesion.getObject(TAG_ConceptosVenta);
                    //Articulo Seleccionado
                    if (lstArticulos.Any(x => x.CodArticulo.Trim() == CodItem.Trim()))
                    { oArticulo = lstArticulos.First(x => x.CodArticulo.Trim() == CodItem.Trim()); }
                }
            }

            if (oArticulo == null)
            {
                var respArt = ventaBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO { CodsArticulo = CodItem });
                //Articulo Seleccionado
                if (respArt.Result.Any(x => x.CodArticulo == CodItem))
                { oArticulo = respArt.Result.First(x => x.CodArticulo.Trim() == CodItem.Trim()); }
            }

            return oArticulo;
        }

        private CotizacionDetalleDTO findCotDetRecord(string CodItem, string opcGrillaItems)
        {

            var ventaBL = new VentasBL();
            CotizacionDetalleDTO itemCotDet = new CotizacionDetalleDTO();

            List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);

            if (lstItems.Any(x => x.CodItem.Trim() == CodItem.Trim()))
            {
                itemCotDet = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItem.Trim());
            }
            else
            {
                var respArt = ventaBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO { CodsArticulo = CodItem });
                var oArticulo = respArt.Result.First();
                itemCotDet.CodItem = oArticulo.CodArticulo;
                itemCotDet.Descripcion = oArticulo.DescRealArticulo;
            }

            return itemCotDet;
        }

        private CotizacionDetalleDTO findSubCotDetRecord(string CodItemPadre, string CodItem)
        {

            var ventaBL = new VentasBL();
            CotizacionDetalleDTO itemPadreCotDet = null;
            CotizacionDetalleDTO itemCotDet = null;

            List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

            if (lstItems.Any(x => x.CodItem.Trim() == CodItemPadre.Trim()))
            {
                itemPadreCotDet = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItemPadre.Trim());
            }

            if (itemPadreCotDet != null)
            {
                if (lstItems.Any(x => x.NroItem == itemPadreCotDet.NroItem && x.CodItem.Trim() == CodItem.Trim()))
                {
                    itemCotDet = lstItems.FirstOrDefault(x => x.NroItem == itemPadreCotDet.NroItem && x.CodItem.Trim() == CodItem.Trim());
                }
            }

            if (itemCotDet == null)
            {
                var respArt = ventaBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO { CodsArticulo = CodItem });
                var oArticulo = respArt.Result.First();
                itemCotDet.CodItem = oArticulo.CodArticulo;
                itemCotDet.Descripcion = oArticulo.DescRealArticulo;
            }

            return itemCotDet;
        }

        public JsonResult ObtenerDetallexSolicitud(SolicitudDTO solicitud)
        {
            try
            {
                VariableSesion.setCadena("idWorkFlow", solicitud.Id_WorkFlow.ToString());
                VariableSesion.setCadena("numSol", solicitud.Id_Solicitud.ToString());
                VariableSesion.setCadena("idCliente", solicitud.IdCliente.ToString());
                VariableSesion.setCadena("estadoSol", solicitud.Estado);
                VariableSesion.setCadena("tipoSol", solicitud.Tipo_Sol);
                VariableSesion.setCadena("idFlujo", solicitud.Id_Flujo.ToString());
                VariableSesion.setCadena("estadoAbrev", solicitud.abrevEstado);

                return Json(new
                {
                    Status = 1
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message
                });
            };
        }

        public JsonResult ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            var ventasBL = new VentasBL();
            solicitudDTO.CodigoPerfil = User.ObtenerIdPerfil();
            var result = ventasBL.ObtenerSolicitudes(solicitudDTO);
            return Json(result);
        }

        public JsonResult VerDetalleSolicitud(SolicitudDTO solicitudDTO)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.VerDetalleSolicitud(solicitudDTO);
            return Json(result);
        }

        public JsonResult RegistraSolicitudes(SolicitudVentaGrupoDTO solicitudVentaGrupoDTO)
        {
            try
            {
                var procesoBL = new ProcesosBL();
                var ventasBL = new VentasBL();
                var documentosBL = new DocumentosBL();

                var workflow = new FiltroWorkflowDTO();
                workflow.CodigoProceso = 1; //Código de proceso de VENTAS
                workflow.UsuarioRegistro = User.ObtenerUsuario();
                workflow.SubTipo = "";

                var rpta = procesoBL.InsertarWorkflow(workflow);
                solicitudVentaGrupoDTO.Solicitud.Id_WorkFlow = rpta.Result;
                solicitudVentaGrupoDTO.Solicitud.UsuarioRegistra = User.ObtenerUsuario();
                solicitudVentaGrupoDTO.Solicitud.IpMaquinaRegistro = User.ObtenerIP();
                solicitudVentaGrupoDTO.Solicitud.Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado;

                //Registra Main Solicitudes
                var mainSolicitudes = ventasBL.MantenimientoSolicitudes(solicitudVentaGrupoDTO.Solicitud);

                //Registra documentos
                if (solicitudVentaGrupoDTO.Adjuntos != null)
                {
                    foreach (var documento in solicitudVentaGrupoDTO.Adjuntos)
                    {
                        documento.Accion = "I";
                        documento.CodigoWorkFlow = rpta.Result;
                        documento.NombreUsuario = User.ObtenerNombresCompletos();
                        documento.NombrePerfil = User.ObtenerPerfil();
                        documento.UsuarioRegistra = User.ObtenerUsuario();
                        documentosBL.MantenimientoDocumentos(documento);
                    };    
                };

                if (solicitudVentaGrupoDTO.Observaciones != null)
                {
                    foreach (var observacion in solicitudVentaGrupoDTO.Observaciones)
                    {
                        observacion.Id_WorkFlow = rpta.Result;
                        observacion.Nombre_Usuario = User.ObtenerUsuario();
                        observacion.UsuarioRegistra = User.ObtenerUsuario();
                        observacion.Perfil_Usuario = User.ObtenerPerfil();

                        var resultObservacion = ventasBL.MantenimientoObservaciones(observacion);
                    };
                };

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = rpta.Result;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado;
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesoBL.InsertarWorkflowLog(log);

                ViewBag.EstadoSolicitud = ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado;

                return Json(new
                {
                    Status = 1,
                    Solicitud = new SolicitudDTO()
                    {
                        Id_Solicitud = mainSolicitudes.Result.Codigo,
                        Estado = solicitudVentaGrupoDTO.Solicitud.Estado,
                        Tipo_Sol = solicitudVentaGrupoDTO.Solicitud.Tipo_Sol,
                        Id_Flujo = solicitudVentaGrupoDTO.Solicitud.Id_Flujo,
                        Id_WorkFlow = rpta.Result
                    }
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message,
                });
            }
            
        }

        public JsonResult DetalleSolicitud(SolicitudVentaGrupoDTO solicitudVentaGrupoDTO)
        {
            var procesoBL = new ProcesosBL();
            var ventasBL = new VentasBL();
            var documentosBL = new DocumentosBL();

            var workflow = new FiltroWorkflowDTO();
            workflow.CodigoProceso = 1; //Código de proceso de VENTAS
            workflow.UsuarioRegistro = User.ObtenerUsuario();
            workflow.SubTipo = "";

            var rpta = procesoBL.InsertarWorkflow(workflow);
            solicitudVentaGrupoDTO.Solicitud.Id_WorkFlow = rpta.Result;
            solicitudVentaGrupoDTO.Solicitud.UsuarioRegistra = User.ObtenerUsuario();

            //RegistraCabecera de cotizacion
            solicitudVentaGrupoDTO.CabeceraCotizacion.UsuarioRegistra = User.ObtenerUsuario();
            var cabeceraCotizacion = ventasBL.MantenimientoCotizacion(solicitudVentaGrupoDTO.CabeceraCotizacion);

            //Registra detalles de cotizacion
            foreach (var detalle in solicitudVentaGrupoDTO.DetalleCotizacion)
            {
                detalle.IdCotizacion = cabeceraCotizacion.Result.Codigo;
                detalle.UsuarioRegistra = User.ObtenerUsuario();

                var resultDetalle = ventasBL.MantenimientoCotizacionDetalle(detalle);
            };

            //Registra documentos
            foreach (var documento in solicitudVentaGrupoDTO.Adjuntos)
            {
                documento.Accion = "I";
                documento.CodigoWorkFlow = rpta.Result;
                documento.NombreUsuario = User.ObtenerNombresCompletos();
                documento.NombrePerfil = User.ObtenerPerfil();
                documento.UsuarioRegistra = User.ObtenerUsuario();
                documentosBL.MantenimientoDocumentos(documento);
            }

            //RegistraObservaciones
            foreach (var observacion in solicitudVentaGrupoDTO.Observaciones)
            {
                observacion.Id_WorkFlow = rpta.Result;
                observacion.UsuarioRegistra = User.ObtenerUsuario();
                observacion.Nombre_Usuario = User.ObtenerNombresCompletos();
                observacion.Perfil_Usuario = User.ObtenerPerfil();
                observacion.UsuarioRegistra = User.ObtenerUsuario();

                var resultObservacion = ventasBL.MantenimientoObservaciones(observacion);
            }

            return Json( new { casa = "hola"});
        }

        public JsonResult MantenimientoSolicitudes(SolicitudDTO solicitudDTO)
        {
            var ventasBL = new VentasBL();
            solicitudDTO.UsuarioRegistra = User.ObtenerUsuario();
            var result = ventasBL.MantenimientoSolicitudes(solicitudDTO);
            return Json(result);
        }

        [HttpPost]
        public virtual JsonResult UploadFiles(string extension)
        {

            CCLog log = new CCLog();
            try
            {
                log.TraceInfo(Utilidades.GetCaller());
                var correlativo = DateTime.Now.ToString("yyyyMMddHHmmss");
                string nombre = "VENT" + correlativo;
                string rutaArchivo = "";
                string fileName = "";

                string ruta_temporal = ConfigurationManager.AppSettings.Get("tempFiles");
                string UploadSize = ConfigurationManager.AppSettings.Get("UploadSize");
                string folder = DateTime.Now.ToString("yyyyMM");
                string rutafinal = ruta_temporal + folder;

                bool exists = System.IO.Directory.Exists(rutafinal);

                if (!exists)
                    System.IO.Directory.CreateDirectory(rutafinal);

                for (int i = 0; i < Request.Files.Count; i++)
                {

                    rutaArchivo = rutafinal + "\\" + nombre;

                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file

                    long fileSize = file.ContentLength;
                    var sizereal = (fileSize / 1024L);

                    if (sizereal > Convert.ToInt32(UploadSize))
                    {
                        return Json("false");
                    }

                    fileName = nombre;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;

                    string rutaFin = rutaArchivo + "." + extension;

                    file.SaveAs(rutaFin); //File will be saved in application root

                }
                log.TraceError("Llego imprimir----------::" + folder + fileName);
                return Json(folder + "\\" + nombre + "." + extension);
            }
            catch (Exception ex)
            {
                log.TraceError(Utilidades.GetCaller() + "::LLegooo------------Error::" + ex.Message);
                return Json("error");
            }
        }

        [HttpPost]
        public JsonResult GuardarAdjunto(DocumentoDTO documentoDTO)
        {

            var result = new RespuestaDTO();
            try
            {
                var documentosBL = new DocumentosBL();
                documentoDTO.Accion = "I";
                documentoDTO.NombreUsuario = User.ObtenerNombresCompletos();
                documentoDTO.NombrePerfil = User.ObtenerPerfil();
                documentoDTO.UsuarioRegistra = User.ObtenerUsuario();
                var response = documentosBL.MantenimientoDocumentos(documentoDTO);

                result.Codigo = response.Result.Codigo;
                result.Mensaje = "Se realizó la inserción del adjunto de viaticos";
            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));

        }

        [HttpPost]
        public JsonResult EliminarAdjunto(DocumentoDTO documentoDTO)
        {
            var result = new RespuestaDTO();
            try
            {
                var documentosBL = new DocumentosBL();

                documentoDTO.Accion = "D";
                documentoDTO.UsuarioRegistra = User.ObtenerUsuario();
                var response = documentosBL.MantenimientoDocumentos(documentoDTO);
                result.Codigo = 1;
                result.Mensaje = "Se realizó la eliminación del adjunto de viaticos";
            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult GuardarObservacion(ObservacionDTO observacionDTO)
        {
            try
            {
                observacionDTO.UsuarioRegistra = User.ObtenerUsuario();
                var ventasBL = new VentasBL();
                observacionDTO.Nombre_Usuario = User.ObtenerNombresCompletos();
                observacionDTO.Perfil_Usuario = User.ObtenerPerfil();
                observacionDTO.UsuarioRegistra = User.ObtenerUsuario();

                var resultObservacion = ventasBL.MantenimientoObservaciones(observacionDTO);

                return Json(new
                {
                    Status = 1
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message.ToString()
                });
            }
        }

        public JsonResult GrupoSolicitudVentaFiltro(int codFlujo, long codSolicitud)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.GrupoSolicitudVentaFiltro(codFlujo, codSolicitud);
            return Json(result);
        }

        public FileResult DescargarFile(string url, string nombreDoc)
        {
            string pao_files = ConfigurationManager.AppSettings.Get("tempFiles");
            string ruta = pao_files + url;

            var fileName = Path.GetFileName(url);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }

        [HttpPost]
        public JsonResult RegistraCotizacionVenta(CotizacionDTO cotizacionDTO)
        {

            try
            {

                if (cotizacionDTO.IdSolicitud <= 0) { throw new Exception("Solicitud no ingresada"); }

                var procesoBL = new ProcesosBL();
                var ventasBL = new VentasBL();
                var clienteBL = new ClienteBL();

                if (cotizacionDTO.IdWorkFlow <= 0)
                {
                    var resSolicitud = ventasBL.ObtenerSolicitudes(new SolicitudDTO()
                    { Id_Solicitud = cotizacionDTO.IdSolicitud });
                    cotizacionDTO.IdWorkFlow = resSolicitud.Result.First().Id_WorkFlow;
                }

                var swContacto = true;
                if (!cotizacionDTO.IdContacto.HasValue)
                { swContacto = false; }
                else { if (cotizacionDTO.IdContacto.Value <= 0) { swContacto = false; } }

                if (!swContacto)
                {
                    var respContacto = clienteBL.InsertarContacto(new ContactoDTO()
                    {
                        TipDoc = string.Empty,
                        NomCont = cotizacionDTO.NombreContacto,
                        AreaContacto = cotizacionDTO.AreaContacto,
                        Telefono = cotizacionDTO.TelefonoContacto,
                        Correo = cotizacionDTO.EmailContacto,
                        IdCliente = cotizacionDTO.IdCliente,
                        Estado = true.ToString()
                    });
                    cotizacionDTO.IdContacto = respContacto.Result.Codigo;
                }

                cotizacionDTO.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Insertar;
                cotizacionDTO.Estado = ConstantesDTO.CotizacionVenta.Estados.Activo;
                cotizacionDTO.UsuarioRegistra = User.ObtenerUsuario();
                cotizacionDTO.FechaRegistro = DateTime.Now;
                var resultCV = ventasBL.MantenimientoCotizacion(cotizacionDTO);

                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = cotizacionDTO.IdWorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion;
                log.UsuarioRegistro = User.ObtenerUsuario();
                var resultWF = procesoBL.InsertarWorkflowLog(log);

                ventasBL.ActualizarSolicitudEstado(new SolicitudDTO()
                {
                    Id_Solicitud = cotizacionDTO.IdSolicitud,
                    Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion
                });

                var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
                { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion });

                if (rptaEst.Result.Any())
                {
                    VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado);
                    VariableSesion.setCadena("estadoSol", rptaEst.Result.First().CodigoEstado);
                }

                ViewBag.EstadoSolicitud = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion;
                ViewBag.IdCotizacion = resultCV.Result.Codigo;

                return Json(new { Status = 1, Cotizacion = new CotizacionDTO() { IdCotizacion = resultCV.Result.Codigo } });

            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }

        }

        [HttpPost]
        public JsonResult ObtenerEmpresas()
        {
            try
            {
                var dgBL = new DatosGeneralesBL();
                var rpta = dgBL.Obtener(new DatosGeneralesDetalleDTO() { Dominio = ConstantesDTO.DatosGenerales.Dominios.RazonSocial });
                var lstEmpresas = new List<ComboDTO>();

                if (rpta.Result.Any())
                {
                    foreach(DatosGeneralesDetalleDTO item in rpta.Result)
                    {
                        lstEmpresas.Add(new ComboDTO() { Id = item.CodValor1, Text = item.Valor1 });
                    }
                }

                return Json(new { Status = 1, Empresas = lstEmpresas });
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerEstadosSolicitud()
        {
            try
            {
                var ventaBL = new VentasBL();
                var rpta = ventaBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO() { IdProceso = ConstantesDTO.Procesos.Ventas.ID });
                var lstEstados = new List<ComboDTO>();
                var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");
                var strEstadoPorDefecto = string.Empty;

                if (rpta.Result.Any())
                {
                    foreach (ProcesoEstadoDTO item in rpta.Result)
                    {
                        if (item.Habilitado)
                        { lstEstados.Add(new ComboDTO() { Id = item.CodigoEstado, Text = item.NombreEstado }); }
                    }
                }

                //if(NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente ||
                //    NombreRol == ConstantesDTO.WorkflowRol.Venta.Logistica)
                //{
                //    strEstadoPorDefecto = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion + "," +
                //                          ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas;
                //}

                //if(NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos ||
                //    NombreRol == ConstantesDTO.WorkflowRol.Venta.ServTecnico)
                //{
                //    strEstadoPorDefecto = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
                //}

                //if(NombreRol == ConstantesDTO.WorkflowRol.Venta.Facturador || 
                //    NombreRol == ConstantesDTO.WorkflowRol.Venta.Importacion)
                //{
                //    strEstadoPorDefecto = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas;
                //}

                return Json(new { Status = 1, EstadosSolicitud = lstEstados, EstadoPorDefecto = strEstadoPorDefecto });
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerArticulos(FiltroArticuloDTO filtro)
        {
            var ventaBL = new VentasBL();
            ResponseDTO<IEnumerable<ArticuloDTO>> resArticulos = ventaBL.ObtenerArticulosxFiltro(filtro);
            if (filtro.AddDescriptionAsNewRecord)
            {
                if (resArticulos.Result == null)
                { resArticulos.Result = new List<ArticuloDTO>(); }

                //Los articulos no registrados en Almacen se deberán de agregar su CODIGO de lista de precios
                var lstBuscados = resArticulos.Result.ToList();
                lstBuscados.ForEach(x => {
                    x.CodArticuloTemp = x.CodArticulo;
                });

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                ArticuloDTO newRecord = null;
                var FORMAT_IdNewTempRecord = ConstantesDTO.CotizacionVentaDetalle.CodigoItem.FORMAT_IdNewTempRecord;
                var TAG = string.Format(FORMAT_IdNewTempRecord, 1).Replace("1", "");
                int numCantNewRecord = 0;
                if (!string.IsNullOrEmpty(filtro.DescArticulo))
                {
                    if (filtro.DescArticulo.Trim() != string.Empty)
                    {
                        if (!lstItems.Where(x => x.Descripcion != null).Any(y => y.Descripcion.ToUpper().Trim() == filtro.DescArticulo.ToUpper().Trim()))
                        {

                            //Se valida en la cotizacion detalle
                            if (lstItems.Any(x => x.CodItem == string.Format(FORMAT_IdNewTempRecord, 1)))
                            {
                                numCantNewRecord += lstItems.Where(x => x.CodItem.Contains(TAG)).Count();
                            }

                            newRecord = new ArticuloDTO()
                            {
                                CodArticulo = string.Format(FORMAT_IdNewTempRecord, numCantNewRecord + 1),
                                DescArticulo = filtro.DescArticulo,
                                CodFamilia = ConstantesDTO.Articulos.Familia.SinRegistrar,
                                DescFamilia = ConstantesDTO.Articulos.Text.Text_1,
                                IsTempRecord = true
                            };

                            resArticulos.Result = new List<ArticuloDTO>();
                            ((List<ArticuloDTO>)resArticulos.Result).Add(newRecord);
                            ((List<ArticuloDTO>)resArticulos.Result).AddRange(lstBuscados);

                        }
                    }
                }
            }
            VariableSesion.setObject(TAG_ConceptosVenta, resArticulos.Result.ToList());
            var ojson = Json(resArticulos);
            return ojson;
        }

        [HttpPost]
        public JsonResult CancelarSolicitud(int ID_Solicitud, long codigoWorkFlow)
        {
            try
            {
                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();
                var solicitudDTO = new SolicitudDTO();
                solicitudDTO.Id_Solicitud = ID_Solicitud;
                solicitudDTO.UsuarioModifica = User.ObtenerUsuario();
                solicitudDTO.IpMaquinaModifica = User.ObtenerIP();
                solicitudDTO.Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta;
                var result = ventasBL.ActualizarSolicitudEstado(solicitudDTO);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = codigoWorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta;
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesoBL.InsertarWorkflowLog(log);

                return Json(result);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerCiclosPreventivos()
        {
            var dgBL = new DatosGeneralesBL();
            var lstDG = dgBL.Obtener(new DatosGeneralesDetalleDTO() { DatosGenerales = new DatosGeneralesDTO { Dominio = ConstantesDTO.DatosGenerales.Dominios.CicloPreventivo } });
            var lstCP = new List<ComboDTO>();
            foreach (DatosGeneralesDetalleDTO item in lstDG.Result)
            {
                if (item.Parametro == ConstantesDTO.DatosGenerales.CicloPreventivo.Mensual ||
                    item.Parametro == ConstantesDTO.DatosGenerales.CicloPreventivo.Bimestral ||
                    item.Parametro == ConstantesDTO.DatosGenerales.CicloPreventivo.Semestral ||
                    item.Parametro == ConstantesDTO.DatosGenerales.CicloPreventivo.Anual)
                {
                    var param = new ComboDTO();
                    param.Id = item.Parametro;
                    param.Text = item.Descripcion;
                    lstCP.Add(param);
                }
            }
            var ojson = Json(new ResponseDTO<IEnumerable<ComboDTO>>(lstCP));
            return ojson;
        }

        [HttpPost]
        public JsonResult ObtenerTipoCostos(CotizacionDetalleDTO cotdet)
        {
            var dgBL = new DatosGeneralesBL();
            var resDG = dgBL.Obtener(new DatosGeneralesDetalleDTO() { DatosGenerales = new DatosGeneralesDTO { Dominio = ConstantesDTO.DatosGenerales.Dominios.CostoEnvio } });
            var lstDG = resDG.Result;
            if(cotdet.CotizacionDespacho != null)
            {
                var oCDesp = cotdet.CotizacionDespacho;
                if (oCDesp.IndInstalacion.HasValue)
                {
                    if (!oCDesp.IndInstalacion.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Instalacion); }
                }
                if (oCDesp.IndCapacitacion.HasValue)
                {
                    if (!oCDesp.IndCapacitacion.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Capacitacion); }
                }
                if (oCDesp.IndInfoManual.HasValue)
                {
                    if (!oCDesp.IndInfoManual.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Manuales); }
                }
                if (oCDesp.IndInfoVideo.HasValue)
                {
                    if (!oCDesp.IndInfoVideo.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Videos); }
                }
                if (oCDesp.IndMantPreventivo.HasValue)
                {
                    if (!oCDesp.IndMantPreventivo.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.MantPrevent); }
                }
                if (oCDesp.IndCalibracion.HasValue)
                {
                    if (!oCDesp.IndCalibracion.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Calibracion); }
                }
                if (oCDesp.IndFlete.HasValue)
                {
                    if (!oCDesp.IndFlete.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Flete); }
                }
            }
            var lst = new List<ComboDTO>();
            foreach (DatosGeneralesDetalleDTO item in lstDG)
            {
                var param = new ComboDTO();
                param.Id = item.Parametro;
                param.Text = item.Descripcion;
                lst.Add(param);
            }
            var ojson = Json(new ResponseDTO<IEnumerable<ComboDTO>>(lst));
            return ojson;
        }

        [HttpPost]
        public JsonResult ObtenerGarantias()
        {
            var dgBL = new DatosGeneralesBL();
            var lstDG = dgBL.Obtener(new DatosGeneralesDetalleDTO() { DatosGenerales = new DatosGeneralesDTO { Dominio = ConstantesDTO.DatosGenerales.Dominios.Garantias } });
            var lst = new List<ComboDTO>();
            foreach (DatosGeneralesDetalleDTO item in lstDG.Result)
            {
                var param = new ComboDTO();
                param.Id = item.Parametro;
                param.Text = item.Valor1;
                lst.Add(param);
            }
            var ojson = Json(new ResponseDTO<IEnumerable<ComboDTO>>(lst));
            return ojson;
        }

        [HttpPost]
        public JsonResult ListarCotDetItems(string opcGrillaItems)
        {
            try
            {
                var ventaBL = new VentasBL();

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);

                lstItems.ForEach(x =>
                {
                    if(x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                    { x.EsItemPadre = true; }
                    else
                    { x.EsItemPadre = false; }
                });

                lstItems = CompletarInfoCotDet(lstItems);

                lstItems.ForEach(x =>
                {
                    AddModifyCDI(x);
                });

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarCotDetServicios(string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio));
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult AgregarItemCotDetServ(string CodItem)
        {
            try
            {
                var ventaBL = new VentasBL();
                var servicioBL = new ServiciosBL();
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                var servicio = servicioBL.GetFullService(CodItem).Result;

                //Registro Detalle
                var select = new CotizacionDetalleDTO();
                select.CodItem = CodItem;
                select.CodItemTemp = "";
                select.Descripcion = "Servicio:"+servicio.CabeceraServicio.TipoServicio.Trim()+", Equipo: "+servicio.CabeceraServicio.Equipo.Trim()+", Modelo:  "+servicio.CabeceraServicio.Modelo.Trim();
                select.Stock = 0;
                select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio;
                select.EsItemPadre = true;
                select.IsTempRecord = true;
                select.CodItem_IsUpdatable = true;
                select.Cantidad = 0;
                select.VentaUnitaria = servicio.CabeceraServicio.Precio;
                select.VentaTotalSinIGV = 0;
                select.IsUpdated = true;

                //Detalle del servicio:
                select.DetallesServicio = servicio.servicios;

                if (lstItems.Any()) { select.NroItem = lstItems.Max(x => x.NroItem) + 1; }
                else { select.NroItem = 1; }

                if (lstItems.Any(x => x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                { throw new Exception("Producto y/o Servicio ya fue selecionado"); }
                if (select.Id <= 0) { select.Id = select.NroItem * -1; }

                AddModifyCDI(select);

                lstItems = GetCDIList(opcTablaTemporal);

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.IsTempRecord
                && x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio).ToList());

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ActualizarServ(CotizacionDetalleDTO datos, string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);
                var item = lstItems.FirstOrDefault(x => x.CodItem == datos.CodItem);

                if (item != null)
                {
                    item.Cantidad = datos.Cantidad;
                    item.VentaUnitaria = datos.VentaUnitaria;
                    item.VentaTotalSinIGV = datos.VentaTotalSinIGV;
                    if (opcGrillaItems == opcTablaTemporal) { item.IsTempRecord = true; }
                    else { item.IsTempRecord = false; }
                    item.IsUpdated = true;
                }

                AddModifyCDI(item);

                lstItems = GetCDIList(opcGrillaItems);

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio).ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ActualizarDetServ(string CodItem, long CodServDet, string Descripcion)
        {
            try
            {
                var servicioBL = new ServiciosBL();
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);
                var oCotDet = lstItems.FirstOrDefault(p => p.CodItem == CodItem);
                var detalle = oCotDet.DetallesServicio.FirstOrDefault(p => p.Id == CodServDet);

                if (detalle != null)
                {
                    detalle.DesMantenimiento = Descripcion;
                    detalle.IsUpdated = true;
                }

                VariableSesion.setObject(TAG_CDI, lstItems);
                var response = new ResponseDTO<IEnumerable<DetalleServicioDTO>>(oCotDet.DetallesServicio.ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EliminarDetServicio(long CodItem, string Codigo)
        {
            try
            {
                var servicioBL = new ServiciosBL();
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);
                var serv = lstItems.FirstOrDefault(p => p.CodItem == CodItem.ToString());
                var detalle = new DetalleServicioDTO();
                if (CodItem == 0)
                {
                    detalle = serv.DetallesServicio.FirstOrDefault(p => p.Codigo == Codigo);
                }
                else
                {
                    detalle = serv.DetallesServicio.FirstOrDefault(p => p.Id == CodItem);
                }

                if (detalle != null)
                {
                    serv.DetallesServicio.Remove(detalle);
                }

                VariableSesion.setObject(TAG_CDI, lstItems);
                var response = new ResponseDTO<IEnumerable<DetalleServicioDTO>>(serv.DetallesServicio.ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult RegistrarDetServ(string CodItem, string Descripcion)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);
                var oCotDet = lstItems.FirstOrDefault(p => p.CodItem == CodItem);

                if (oCotDet.DetallesServicio == null)
                { oCotDet.DetallesServicio = new List<DetalleServicioDTO>(); }

                var item = new DetalleServicioDTO()
                {
                    Id_Servicio = Convert.ToInt32(CodItem),
                    DesMantenimiento = Descripcion,
                    Eliminar = 0,
                    Codigo = "TMP_" + DateTime.Now.ToString("ddMMyyyyhhmmss")
                };

                if (oCotDet.DetallesServicio.Any(o => o.Id < 0))
                { item.Id = oCotDet.DetallesServicio.Where(o => o.Id < 0).Select(x => x.Id).Min() - 1; }
                else
                { item.Id = -1; }

                oCotDet.DetallesServicio.Add(item);

                AddModifyCDI(oCotDet);

                var response = new ResponseDTO<IEnumerable<DetalleServicioDTO>>(oCotDet.DetallesServicio.ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult AgregarItemCotDet(CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                var ventaBL = new VentasBL();
                var oArticulo = findSaleItemRecord(CotizacionDetalle.CodItem);

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                //Registro Detalle
                var select = new CotizacionDetalleDTO();
                select.Id = (lstItems.Count() + 1) * -1;
                select.CodItem = oArticulo.CodArticulo;
                select.CodItemTemp = oArticulo.CodArticuloTemp;
                select.Descripcion = oArticulo.DescRealArticulo;
                select.Stock = oArticulo.StockDisponible;
                if (oArticulo.StockDisponible > 0) { select.IndStock = true; }
                else { select.IndStock = false; }
                select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto;
                select.EsItemPadre = true;
                select.IsTempRecord = true;
                if (oArticulo.IsTempRecord)
                {
                    select.CodItem_IsUpdatable = true;
                }

                if (oArticulo.CodFamilia != null)
                {
                    if (oArticulo.CodFamilia.Trim() == ConstantesDTO.Articulos.Familia.Accesorios.Trim())
                    {
                        select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio;
                        select.EsItemPadre = false;
                    }
                }

                var lstCostos = new List<CotDetCostoDTO>();

                //Se agregan los costos de la cotizacion detalle
                select.CotizacionCostos = lstCostos.ToArray();

                if (select.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    var lstItemsPadre = lstItems.Where(x => x.Select).ToList();
                    if (!lstItemsPadre.Any()) { throw new Exception("Para agregar un accesorio a la cotización deberá previamente seleccionar un producto para asociarlo. Favor de seleccionar un producto."); }
                    foreach (CotizacionDetalleDTO itemPadre in lstItemsPadre)
                    {
                        if (lstItems.Any(x => x.NroItem == itemPadre.NroItem && x.CodItem.TrimEnd() == CotizacionDetalle.CodItem.TrimEnd()))
                        { throw new Exception("Accesorio ya fue selecionado"); }
                        CotizacionDetalleDTO item = select;
                        item.NroItem = itemPadre.NroItem;
                        item.IsUpdated = true;
                        AddModifyCDI(item);
                    }
                }
                else
                {
                    if (lstItems.Any(x => x.CodItem.TrimEnd() == CotizacionDetalle.CodItem.TrimEnd()))
                    { throw new Exception("Producto y/o Servicio ya fue selecionado"); }
                    select.IsUpdated = true;
                    AddModifyCDI(select);
                }

                lstItems = GetCDIList(opcTablaTemporal);
                lstItems = CompletarInfoCotDet(lstItems);
                lstItems = TotalizarCotDet(lstItems);

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult SeleccionarRowCotDet(CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                foreach (CotizacionDetalleDTO item in lstItems)
                {
                    if (item.CodItem.TrimEnd() == CotizacionDetalle.CodItem.TrimEnd()) {
                        if (item.Select) { item.Select = false; }
                        else { item.Select = true; }
                        AddModifyCDI(item);
                    }
                }

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems);

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult QuitarItemCotDet(CotizacionDetalleDTO CotizacionDetalle, string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = new List<CotizacionDetalleDTO>();

                if (opcGrillaItems == opcTablaTemporal)
                {
                    lstItems = GetCDIList(opcTablaTemporal);
                    var lstItems_2 = GetCDIList(opcTablaFinal);

                    var itemArticulo = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetalle.CodItem.Trim());
                    if (itemArticulo.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != itemArticulo.NroItem).ToList(); }
                    else
                    { lstItems = lstItems.Where(x => x.CodItem.Trim() != CotizacionDetalle.CodItem.Trim()).ToList(); }

                    lstItems = TotalizarCotDet(lstItems);

                    lstItems.AddRange(lstItems_2);
                    VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                    lstItems = GetCDIList(opcTablaTemporal);
                }

                if (opcGrillaItems == opcTablaFinal)
                {
                    lstItems = GetCDIList(opcTablaFinal);

                    var itemArticulo = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetalle.CodItem.Trim());
                    if (itemArticulo.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != itemArticulo.NroItem).ToList(); }
                    else
                    { lstItems = lstItems.Where(x => x.CodItem.Trim() != CotizacionDetalle.CodItem.Trim()).ToList(); }

                    var lstItems_2 = new List<CotizacionDetalleDTO>();
                    lstItems.ForEach(x =>
                    {
                        var oItem = new CotizacionDetalleDTO();
                        x.CopyProperties(ref oItem);
                        oItem.IsTempRecord = true;
                        lstItems_2.Add(oItem);
                    });

                    lstItems = TotalizarCotDet(lstItems);

                    lstItems.AddRange(lstItems_2);
                    VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                    lstItems = GetCDIList(opcTablaFinal);
                }

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarCotDetItem(CotizacionDetalleDTO CotizacionDetalle, string opcGrillaItems)
        {
            try
            {
                var ventasBL = new VentasBL();

                CotizacionDetalleDTO itemCotDet = findCotDetRecord(CotizacionDetalle.CodItem, opcGrillaItems);

                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                if (itemCotDet.Id > 0)
                {
                    //Se carga todos los costos
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacionDetalle = itemCotDet.Id });
                    lstCostos = resCostos.Result.ToList();
                    itemCotDet.CotizacionCostos = lstCostos.ToArray();
                }
                else
                {
                    if (itemCotDet.CotizacionCostos != null) { lstCostos = itemCotDet.CotizacionCostos.ToList(); }
                }

                VariableSesion.setObject(TAG_CDCI_CotDetItem, lstCostos);

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerSubItems(CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                List<CotizacionDetalleDTO> lstSubItems = new List<CotizacionDetalleDTO>();

                if (lstItems.Any())
                {
                    var oItemPadre = lstItems.FirstOrDefault(x => x.CodItem.TrimEnd() == CotizacionDetalle.CodItem.TrimEnd());
                    if (oItemPadre != null)
                    {
                        lstSubItems = lstItems.Where(x => x.NroItem.Equals(oItemPadre.NroItem) &&
                        x.TipoItem.Equals(ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)).ToList();
                    }
                }

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstSubItems);

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult QuitarSubItemCotDet(CotizacionDetalleDTO CotizacionDetallePadre, CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);
                List<CotizacionDetalleDTO> lstItems_2 = GetCDIList(opcTablaFinal);

                var itemPadre = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetallePadre.CodItem.Trim());
                if (itemPadre != null)
                {
                    lstItems = lstItems.Where(x => x.NroItem == itemPadre.NroItem && x.CodItem.Trim() != CotizacionDetalle.CodItem.Trim()).ToList();
                    lstItems.AddRange(lstItems_2);
                    lstItems = TotalizarCotDet(lstItems);
                    VariableSesion.setObject(TAG_CDI, lstItems);
                }
                lstItems = GetCDIList(opcTablaTemporal);
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                x.CodItem.Trim() != CotizacionDetallePadre.CodItem.Trim() && x.NroItem == itemPadre.NroItem));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarCotDetSubItem(CotizacionDetalleDTO CotizacionDetallePadre, CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                var ventaBL = new VentasBL();

                CotizacionDetalleDTO itemCotDet = findSubCotDetRecord(CotizacionDetallePadre.CodItem, CotizacionDetalle.CodItem);

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult GrabarDatosCotDetItem(CotizacionDetalleDTO CotizacionDetallePadre, CotizacionDetalleDTO CotizacionDetalle, string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);

                if (lstItems.Any(x => x.CodItem.Trim() == CotizacionDetalle.CodItemTemp.Trim() && CotizacionDetalle.CodItem_IsUpdatable))
                { throw new Exception("El código '" + CotizacionDetalle.CodItemTemp.Trim() + "' ya está siendo usado en la cotización"); }

                CotizacionDetalleDTO oCotDetItem = null;
                if (string.IsNullOrEmpty(CotizacionDetallePadre.CodItem))
                { oCotDetItem = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetalle.CodItem.Trim() && x.EsItemPadre == true); }
                else
                {
                    var oCotDetItemPadre = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetallePadre.CodItem.Trim() && x.EsItemPadre == true);
                    oCotDetItem = lstItems.FirstOrDefault(x => x.NroItem == oCotDetItemPadre.NroItem && x.CodItem == CotizacionDetalle.CodItem);
                }

                var oCotDesp = CotizacionDetalle.CotizacionDespacho;
                var indInstalacion = false;
                var indCapacitacion = false;
                var indManuales = false;
                var indVideos = false;
                var indMantPrevent = false;
                var indCalibracion = false;
                var indFlete = false;

                if (oCotDesp != null)
                {
                    if (oCotDesp.IndInstalacion.HasValue)
                    { if (oCotDesp.IndInstalacion.Value) { indInstalacion = true; } }
                    if (oCotDesp.IndCapacitacion.HasValue)
                    { if (oCotDesp.IndCapacitacion.Value) { indCapacitacion = true; } }
                    if (oCotDesp.IndInfoManual.HasValue)
                    { if (oCotDesp.IndInfoManual.Value) { indManuales = true; } }
                    if (oCotDesp.IndInfoVideo.HasValue)
                    { if (oCotDesp.IndInfoVideo.Value) { indVideos = true; } }
                    if (oCotDesp.IndMantPreventivo.HasValue)
                    { if (oCotDesp.IndMantPreventivo.Value) { indMantPrevent = true; } }
                    if (oCotDesp.IndCalibracion.HasValue)
                    { if (oCotDesp.IndCalibracion.Value) { indCalibracion = true; } }
                    if (oCotDesp.IndFlete.HasValue)
                    { if (oCotDesp.IndFlete.Value) { indFlete = true; } }
                }

                var swCompleto = true;
                if (oCotDetItem.CotizacionCostos != null)
                {
                    if (indInstalacion && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.Instalacion))
                    { swCompleto = false; }
                    if (indCapacitacion && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.Capacitacion))
                    { swCompleto = false; }
                    if (indManuales && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.Manuales))
                    { swCompleto = false; }
                    if (indVideos && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.Videos))
                    { swCompleto = false; }
                    if (indMantPrevent && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.MantPrevent))
                    { swCompleto = false; }
                    if (indCalibracion && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.Calibracion))
                    { swCompleto = false; }
                }
                else
                {
                    if (indInstalacion || indCapacitacion || indManuales || indVideos || indMantPrevent || indCalibracion || indFlete)
                    { swCompleto = false; }
                }

                if (!swCompleto)
                { throw new Exception("Se debe completar los costos indicados en pantalla"); }

                var oCotDetItemAux = new CotizacionDetalleDTO();
                oCotDetItem.CopyProperties(ref oCotDetItemAux);

                oCotDetItemAux.CodItem = CotizacionDetalle.CodItemTemp;
                oCotDetItemAux.CodItemTemp = CotizacionDetalle.CodItemTemp;
                oCotDetItemAux.CodItem_IsUpdatable = false;
                oCotDetItemAux.DescripcionAdicional = CotizacionDetalle.DescripcionAdicional;
                oCotDetItemAux.Cantidad = CotizacionDetalle.Cantidad;
                oCotDetItemAux.CostoFOB = CotizacionDetalle.CostoFOB;
                oCotDetItemAux.VentaUnitaria = CotizacionDetalle.VentaUnitaria;
                oCotDetItemAux.PorcentajeGanancia = CotizacionDetalle.PorcentajeGanancia;
                oCotDetItemAux.IndStock = CotizacionDetalle.IndStock;

                var oCotDetDespItemAux = new CotDetDespachoDTO();
                if (CotizacionDetalle.CotizacionDespacho != null)
                {
                    CotizacionDetalle.CotizacionDespacho.CopyProperties(ref oCotDetDespItemAux);
                    if (oCotDetItem.CotizacionDespacho != null)
                    {
                        oCotDetDespItemAux.Id = oCotDetItem.CotizacionDespacho.Id;
                    }
                }

                oCotDetItemAux.CotizacionDespacho = oCotDetDespItemAux;
                oCotDetItemAux.CotizacionDespacho.IdCotizacionDetalle = oCotDetItemAux.Id;
                oCotDetItemAux.IsUpdated = true;
                AddModifyCDI(oCotDetItemAux);

                lstItems = TotalizarCotDet(lstItems);
                lstItems = CompletarInfoCotDet(lstItems);

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        private List<CotizacionDetalleDTO> CompletarInfoCotDet(List<CotizacionDetalleDTO> lstItems)
        {
            if (lstItems != null)
            {
                foreach (CotizacionDetalleDTO item in lstItems)
                {
                    if (item.EsItemPadre)
                    {
                        item.CantSubItem = lstItems.Where(x => x.CodItem.Trim() != item.CodItem.Trim() && x.NroItem == item.NroItem).Count();
                        if (string.IsNullOrEmpty(item.DescUnidad))
                        {
                            var oArticulo = findSaleItemRecord(item.CodItem);
                            if (oArticulo != null)
                            {
                                item.CodUnidad = oArticulo.CodUnidad;
                                item.DescUnidad = oArticulo.DescUnidad;
                            }
                        }
                    }
                }
            }
            return lstItems;
        }

        private List<CotizacionDetalleDTO> TotalizarCotDet(List<CotizacionDetalleDTO> lstItems)
        {
            if (lstItems != null)
            {
                var numItemPadre = 1;
                foreach (CotizacionDetalleDTO item in lstItems)
                {
                    if (item.EsItemPadre)
                    {
                        item.CantSubItem = lstItems.Where(x => x.CodItem.Trim() != item.CodItem.Trim() && x.NroItem == item.NroItem).Count();
                        if (lstItems.Any(x => x.NroItem == item.NroItem && x.VentaUnitaria.HasValue))
                        {
                            item.VentaTotalSinIGV = lstItems.Where(x => x.NroItem == item.NroItem && x.VentaUnitaria.HasValue).Select(y => y.VentaUnitaria.Value * y.Cantidad).Sum();
                            if (item.VentaTotalSinIGV.HasValue)
                            {
                                if (item.PorcentajeGanancia.HasValue)
                                {
                                    if (item.PorcentajeGanancia.Value > 0)
                                    {
                                        item.VentaTotalSinIGVConGanacia = item.VentaTotalSinIGV.Value + (item.VentaTotalSinIGV.Value * (item.PorcentajeGanancia.Value / 100));
                                    }
                                    else
                                    {
                                        item.VentaTotalSinIGVConGanacia = 0;
                                    }
                                }
                            }
                        }
                        //Actualizar el NRO ITEM al actualizar la lista del DETALLE DE LA COTIZACION
                        var numItemPadreActual = item.NroItem;
                        if (numItemPadre != numItemPadreActual)
                        {
                            foreach (CotizacionDetalleDTO itemHijo in lstItems)
                            {
                                if (itemHijo.NroItem == numItemPadreActual) { itemHijo.NroItem = numItemPadre; }
                            }
                            item.NroItem = numItemPadre;
                        }
                        numItemPadre += 1;
                    }
                }
            }
            return lstItems;
        }

        [HttpPost]
        public JsonResult GrabarDatosCotDet(CotizacionDetalleDTO cotizacionDetalle)
        {
            try
            {
                var ventaBL = new VentasBL();

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                var swCDItems = true;
                if (lstItems == null) { swCDItems = false; }
                else
                {
                    if (!lstItems.Any()) { swCDItems = false; }
                    else
                    {
                        if (lstItems.Any(x => x.Cantidad == 0)) { swCDItems = false; }
                    }
                }

                if (!swCDItems) { throw new Exception("No se ha agregado ning&uacute;n producto o servicio"); }

                //Se realiza lo siguiente:
                //1. Se totaliza el precio por cada registro de cotizacion detalle (Monto del Producto o Servicio más sus accesorios)
                //2. La ganancia por registro de Cotizacion Detalle
                //3. El descuento total de la venta pero se le divide entre cada uno de los registros de cotizacion detalle

                lstItems = TotalizarCotDet(lstItems);

                var lstItems_1 = lstItems;
                var lstItems_2 = new List<CotizacionDetalleDTO>();
                lstItems_1.ForEach(x =>
                {
                    var oItem = new CotizacionDetalleDTO();
                    x.CopyProperties(ref oItem);
                    oItem.IsTempRecord = false;
                    lstItems_2.Add(oItem);
                });
                lstItems_1.AddRange(lstItems_2);

                VariableSesion.setObject(TAG_CDI, lstItems_1.ToList());

                if (cotizacionDetalle != null)
                {
                    lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord && x.TipoItem == cotizacionDetalle.TipoItem).ToList();
                }
                else
                {
                    lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord && x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio).ToList();
                }

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems_1);

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        private void ActualizarCotizacion(CotizacionDTO cotizacionDTO)
        {

            if (cotizacionDTO.IdSolicitud <= 0) { throw new Exception("Solicitud no ingresada"); }

            var procesoBL = new ProcesosBL();
            var ventasBL = new VentasBL();
            var clienteBL = new ClienteBL();

            var resCot = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = cotizacionDTO.IdCotizacion });
            var itemCotActual = resCot.Result.ToList().First();

            var swContacto = true;
            if (!cotizacionDTO.IdContacto.HasValue)
            { swContacto = false; }
            else { if (cotizacionDTO.IdContacto.Value <= 0) { swContacto = false; } }

            if (!swContacto)
            {
                var respContacto = clienteBL.InsertarContacto(new ContactoDTO()
                {
                    TipDoc = string.Empty,
                    NomCont = cotizacionDTO.NombreContacto,
                    AreaContacto = cotizacionDTO.AreaContacto,
                    Telefono = cotizacionDTO.TelefonoContacto,
                    Correo = cotizacionDTO.EmailContacto,
                    IdCliente = cotizacionDTO.IdCliente,
                    Estado = true.ToString()
                });
                cotizacionDTO.IdContacto = respContacto.Result.Codigo;
            }

            itemCotActual.IdContacto = cotizacionDTO.IdContacto;
            itemCotActual.FecCotizacion = cotizacionDTO.FecCotizacion;
            itemCotActual.Vigencia = cotizacionDTO.Vigencia;
            itemCotActual.PlazoEntrega = cotizacionDTO.PlazoEntrega;
            itemCotActual.FormaPago = cotizacionDTO.FormaPago;
            itemCotActual.Observacion = cotizacionDTO.Observacion;
            itemCotActual.PorcentajeDescuento = cotizacionDTO.PorcentajeDescuento;

            itemCotActual.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Modificar;
            itemCotActual.Estado = ConstantesDTO.CotizacionVenta.Estados.Activo;
            itemCotActual.UsuarioRegistra = User.ObtenerUsuario();
            itemCotActual.FechaRegistro = DateTime.Now;
            var resultCV = ventasBL.MantenimientoCotizacion(itemCotActual);

        }

        [HttpPost]
        public JsonResult EnviarCotizacion(CotizacionDTO oCotizacion)
        {
            try
            {
                if (oCotizacion.IdCotizacion == 0) { throw new Exception("Cotización no registrada"); }

                ActualizarCotizacion(oCotizacion);

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaFinal);

                var swCDItems = true;
                if (lstItems == null) { swCDItems = false; }
                else
                {
                    if (!lstItems.Any()) { swCDItems = false; }
                    else
                    {
                        if(lstItems.Any(x=>x.Cantidad == 0)) { swCDItems = false; }
                    }
                }

                if (!swCDItems) { throw new Exception("La cotización no contiene servicios o productos para la venta."); }

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();
                var log = new FiltroWorkflowLogDTO();

                //Se registra el workflow para Valorización
                log.CodigoWorkflow = oCotizacion.IdWorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesoBL.InsertarWorkflowLog(log);

                //Se cambia el estado a En Valorización
                ventasBL.ActualizarSolicitudEstado(new SolicitudDTO()
                {
                    Id_Solicitud = oCotizacion.IdSolicitud,
                    Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion
                });

                var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
                { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion });

                if (rptaEst.Result.Any())
                {
                    VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado);
                    VariableSesion.setCadena("estadoSol", rptaEst.Result.First().CodigoEstado);
                }

                ViewBag.EstadoSolicitud = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
                ViewBag.IdCotizacion = oCotizacion.IdCotizacion;

                //Se elimina los datos actuales para solo grabar lo que está en pantalla
                var resCotDetAux = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                if (resCotDetAux.Result != null)
                {
                    if (resCotDetAux.Result.Any())
                    {
                        var lstCotDetAux = resCotDetAux.Result.ToList();
                        foreach(CotizacionDetalleDTO itemCD in lstCotDetAux)
                        {
                            if (itemCD.CotizacionDespacho != null)
                            {
                                var itemCDD = itemCD.CotizacionDespacho;
                                itemCDD.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Eliminar;
                                ventasBL.MantenimientoCotDetDespacho(itemCDD);
                            }
                            var resCotDetCos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacionDetalle = itemCD.Id });
                            if (resCotDetCos.Result != null)
                            {
                                var itemCDC = new CotDetCostoDTO();
                                itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Eliminar;
                                itemCDC.IdCotizacionDetalle = itemCD.Id;
                                ventasBL.MantenimientoCotDetCosto(itemCDC);
                            }
                            itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Eliminar;
                            ventasBL.MantenimientoCotizacionDetalle(itemCD);
                        }
                    }
                }

                //Se graba el Detalle de la Cotización
                foreach (CotizacionDetalleDTO itemCD in lstItems)
                {
                    itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Insertar;
                    itemCD.IdCotizacion = oCotizacion.IdCotizacion;
                    itemCD.UsuarioRegistra = User.ObtenerUsuario();
                    itemCD.FechaRegistro = DateTime.Now;
                    var resCD = ventasBL.MantenimientoCotizacionDetalle(itemCD);
                    if(itemCD.Id <= 0) { itemCD.Id = resCD.Result.Codigo; }
                    if (itemCD.CotizacionDespacho != null)
                    {
                        var itemCDD = itemCD.CotizacionDespacho;
                        itemCDD.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                        itemCDD.IdCotizacionDetalle = itemCD.Id;
                        itemCDD.UsuarioRegistra = User.ObtenerUsuario();
                        itemCDD.FechaRegistro = DateTime.Now;
                        var resCDD = ventasBL.MantenimientoCotDetDespacho(itemCDD);
                    }
                    if(itemCD.CotizacionCostos != null)
                    {
                        for (int a = 0; a < itemCD.CotizacionCostos.Length; a++) { 
                            var itemCDC = itemCD.CotizacionCostos[a];
                            itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                            itemCDC.IdCotizacionDetalle = itemCD.Id;
                            itemCDC.UsuarioRegistra = User.ObtenerUsuario();
                            itemCDC.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetCosto(itemCDC);
                        }
                    }
                }

                if (lstItems.Where(x => x.IndStock.HasValue).Any(y => !y.IndStock.Value))
                { NotificarValorizacion_CostoFOB(oCotizacion.IdSolicitud); }

                if (lstItems.Where(x => x.IndStock.HasValue).Any(y => y.IndStock.Value))
                { NotificarValorizacion_ValorUnitario(oCotizacion.IdSolicitud); }

                var numSol = VariableSesion.getCadena("numSol");
                var resSol = ventasBL.ObtenerSolicitudes(new SolicitudDTO { Id_Solicitud = int.Parse(numSol) });
                var oSolicitud = resSol.Result.First();

                if(oSolicitud.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                {
                    NotificarCosteoPendiente_ServicioTecnico(oCotizacion.IdSolicitud);
                }

                NotificarCosteoPendiente_Logistica(oCotizacion.IdSolicitud);

                return Json(new { Status = 1, Mensaje = "Cotización Enviada correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult GuardarValorizacion(CotizacionDTO oCotizacion)
        {
            try
            {
                if (oCotizacion.IdCotizacion == 0) { throw new Exception("Cotización no registrada"); }

                ActualizarCotizacion(oCotizacion);

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaFinal);

                var swCDItems = true;
                if (lstItems == null) { swCDItems = false; }
                else
                {
                    if (!lstItems.Any()) { swCDItems = false; }
                    else
                    {
                        if (lstItems.Any(x => x.Cantidad == 0)) { swCDItems = false; }
                    }
                }

                if (!swCDItems) { throw new Exception("La cotización no contiene servicios o productos para la venta."); }

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();

                lstItems = TotalizarCotDet(lstItems);

                if (lstItems.Any(x => x.IsUpdated))
                {

                    //Se obtiene el detalle actual de la cotizacion
                    var resCotDetActual = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO { IdCotizacion = oCotizacion.IdCotizacion });
                    var lstCotDet = resCotDetActual.Result.ToList();

                    if (EsFlujoValorizacion())
                    {
                        //Se graba los datos de VALORIZACION del Detalle de la Cotización de los JEFES Y GERENTES
                        foreach (CotizacionDetalleDTO itemCD in lstItems)
                        {
                            var itemCDActual = lstCotDet.FirstOrDefault(x => x.Id == itemCD.Id);
                            itemCDActual.CostoFOB = itemCD.CostoFOB;
                            itemCDActual.VentaUnitaria = itemCD.VentaUnitaria;
                            itemCDActual.IndStock = itemCD.IndStock;
                            itemCDActual.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Modificar;
                            itemCDActual.IdCotizacion = oCotizacion.IdCotizacion;
                            itemCDActual.UsuarioRegistra = User.ObtenerUsuario();
                            itemCDActual.FechaRegistro = DateTime.Now;
                            var resCD = ventasBL.MantenimientoCotizacionDetalle(itemCDActual);
                            if (itemCD.CotizacionDespacho != null)
                            {
                                itemCD.CotizacionDespacho.IdCotizacionDetalle = itemCDActual.Id;
                                itemCD.CotizacionDespacho.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                                if (itemCD.CotizacionDespacho.Id > 0)
                                {
                                    itemCD.CotizacionDespacho.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Modificar;
                                }
                                itemCD.CotizacionDespacho.UsuarioRegistra = User.ObtenerUsuario();
                                var resCDD = ventasBL.MantenimientoCotDetDespacho(itemCD.CotizacionDespacho);
                            }
                        }
                    }
                    else
                    {
                        //Se graba el Detalle de la Cotización
                        foreach (CotizacionDetalleDTO itemCD in lstItems)
                        {
                            var itemCDActual = lstCotDet.FirstOrDefault(x => x.Id == itemCD.Id);
                            itemCD.CostoFOB = itemCDActual.CostoFOB;
                            itemCD.VentaUnitaria = itemCDActual.VentaUnitaria;
                            itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Modificar;
                            itemCD.IdCotizacion = oCotizacion.IdCotizacion;
                            itemCD.UsuarioRegistra = User.ObtenerUsuario();
                            itemCD.FechaRegistro = DateTime.Now;
                            var resCD = ventasBL.MantenimientoCotizacionDetalle(itemCD);
                            if (itemCD.CotizacionDespacho != null)
                            {
                                itemCD.CotizacionDespacho.IdCotizacionDetalle = itemCDActual.Id;
                                itemCD.CotizacionDespacho.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                                if (itemCD.CotizacionDespacho.Id > 0)
                                {
                                    itemCD.CotizacionDespacho.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Modificar;
                                }
                                itemCD.CotizacionDespacho.UsuarioRegistra = User.ObtenerUsuario();
                                var resCDD = ventasBL.MantenimientoCotDetDespacho(itemCD.CotizacionDespacho);
                            }
                        }
                    }

                    //Se consulta para saber el estado actual del proceso de venta
                    var resCotizacionActual = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                    CotizacionDTO cotActualDTO = resCotizacionActual.Result.ToList().First();

                    var swValorizado = false;
                    if (cotActualDTO.IndValorizado.HasValue)
                    { if (cotActualDTO.IndValorizado.Value) { swValorizado = true; } }

                    var swCosteado = false;
                    if (cotActualDTO.IndCosteado.HasValue)
                    { if (cotActualDTO.IndCosteado.Value) { swCosteado = true; } }

                    if (swValorizado && swCosteado)
                    {
                        NotificarCotizacionValorizada(cotActualDTO.IdSolicitud);
                    }

                }

                return Json(new { Status = 1, Mensaje = "Cotización guardada correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult RecotizarSolicitud(int IdCotizacion, int IdWorkFlow)
        {
            try
            {
                if (IdCotizacion <= 0) { throw new Exception("Cotización no registrada"); }

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaFinal);

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();

                CotizacionDTO cotizacionDTO = new CotizacionDTO();
                CotizacionDTO cotdetDTO = new CotizacionDTO();
                ResponseDTO<RespuestaDTO> resultCV = null;

                var resCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = IdCotizacion });
                cotizacionDTO = resCotizacion.Result.ToList().First();

                var resSolicitud = ventasBL.ObtenerSolicitudes(new SolicitudDTO()
                { Id_Solicitud = cotizacionDTO.IdSolicitud });

                var resCotDetalle = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = IdCotizacion });
                var lstCotDetalle = resCotDetalle.Result.ToList();

                //Deshabilitar la cotización actual
                cotizacionDTO.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Modificar;
                cotizacionDTO.Estado = ConstantesDTO.CotizacionVenta.Estados.Inactivo;
                cotizacionDTO.UsuarioRegistra = User.ObtenerUsuario();
                cotizacionDTO.FechaRegistro = DateTime.Now;
                resultCV = ventasBL.MantenimientoCotizacion(cotizacionDTO);

                //Se crea nueva cotizacion
                cotizacionDTO.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Insertar;
                cotizacionDTO.FecCotizacion = DateTime.Now;
                cotizacionDTO.Estado = ConstantesDTO.CotizacionVenta.Estados.Activo;
                cotizacionDTO.UsuarioRegistra = User.ObtenerUsuario();
                cotizacionDTO.FechaRegistro = DateTime.Now;
                resultCV = ventasBL.MantenimientoCotizacion(cotizacionDTO);
                cotizacionDTO.IdCotizacion = resultCV.Result.Codigo;

                var log = new FiltroWorkflowLogDTO();

                //Se registra el workflow para Cotización
                log.CodigoWorkflow = IdWorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion;
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesoBL.InsertarWorkflowLog(log);

                //Se cambia el estado a En Cotización
                ventasBL.ActualizarSolicitudEstado(new SolicitudDTO()
                {
                    Id_Solicitud = cotizacionDTO.IdSolicitud,
                    Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion
                });

                var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
                { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion });

                if (rptaEst.Result.Any()) { 
                    VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado);
                    VariableSesion.setCadena("estadoSol", rptaEst.Result.First().CodigoEstado);
                }

                ViewBag.EstadoSolicitud = ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion;
                ViewBag.IdCotizacion = cotizacionDTO.IdCotizacion;

                //Se graba el Detalle de la Cotización
                foreach (CotizacionDetalleDTO itemCD in lstCotDetalle)
                {
                    itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Insertar;
                    itemCD.IdCotizacion = cotizacionDTO.IdCotizacion;
                    itemCD.UsuarioRegistra = User.ObtenerUsuario();
                    itemCD.FechaRegistro = DateTime.Now;
                    itemCD.VentaUnitaria = null;
                    itemCD.CostoFOB = null;
                    var resCD = ventasBL.MantenimientoCotizacionDetalle(itemCD);
                    if (itemCD.CotizacionDespacho != null)
                    {
                        var itemCDD = itemCD.CotizacionDespacho;
                        itemCDD.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                        itemCDD.IdCotizacionDetalle = resCD.Result.Codigo;
                        itemCDD.UsuarioRegistra = User.ObtenerUsuario();
                        itemCDD.FechaRegistro = DateTime.Now;
                        var resCDD = ventasBL.MantenimientoCotDetDespacho(itemCDD);
                    }
                }

                return Json(new { Status = 1, Mensaje = "Cotización se volvió a generar correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult GuardarCotizacion(CotizacionDTO oCotizacion)
        {
            try
            {
                if (oCotizacion.IdCotizacion == 0) { throw new Exception("Cotización no registrada"); }

                ActualizarCotizacion(oCotizacion);

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaFinal);

                var swCDItems = true;
                if (lstItems == null) { swCDItems = false; }
                else
                {
                    if (!lstItems.Any()) { swCDItems = false; }
                    else
                    {
                        if (lstItems.Any(x => x.Cantidad == 0)) { swCDItems = false; }
                    }
                }

                if (!swCDItems) { throw new Exception("La cotización no contiene servicios o productos para la venta."); }

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();

                //var resCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                //CotizacionDTO cotizacionDTO = resCotizacion.Result.ToList().First();

                //Se elimina los datos actuales para solo grabar lo que está en pantalla
                var resCotDetAux = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                if (resCotDetAux.Result != null)
                {
                    if (resCotDetAux.Result.Any())
                    {
                        var lstCotDetAux = resCotDetAux.Result.ToList();
                        foreach (CotizacionDetalleDTO itemCD in lstCotDetAux)
                        {
                            if (itemCD.CotizacionDespacho != null)
                            {
                                var itemCDD = itemCD.CotizacionDespacho;
                                itemCDD.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Eliminar;
                                ventasBL.MantenimientoCotDetDespacho(itemCDD);
                            }
                            var resCotDetCos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacionDetalle = itemCD.Id });
                            if (resCotDetCos.Result != null)
                            {
                                var itemCDC = new CotDetCostoDTO();
                                itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Eliminar;
                                itemCDC.UsuarioRegistra = User.ObtenerUsuario();
                                itemCDC.FechaRegistro = DateTime.Now;
                                itemCDC.IdCotizacionDetalle = itemCD.Id;
                                ventasBL.MantenimientoCotDetCosto(itemCDC);
                            }
                            itemCD.UsuarioRegistra = User.ObtenerUsuario();
                            itemCD.FechaRegistro = DateTime.Now;
                            itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Eliminar;
                            ventasBL.MantenimientoCotizacionDetalle(itemCD);
                        }
                    }
                }

                //Se graba el Detalle de la Cotización
                foreach (CotizacionDetalleDTO itemCD in lstItems)
                {
                    itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Insertar;
                    itemCD.IdCotizacion = oCotizacion.IdCotizacion;
                    itemCD.UsuarioRegistra = User.ObtenerUsuario();
                    itemCD.FechaRegistro = DateTime.Now;
                    var resCD = ventasBL.MantenimientoCotizacionDetalle(itemCD);
                    itemCD.Id = resCD.Result.Codigo;
                    if (itemCD.CotizacionDespacho != null)
                    {
                        var itemCDD = itemCD.CotizacionDespacho;
                        itemCDD.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                        itemCDD.IdCotizacionDetalle = itemCD.Id;
                        itemCDD.UsuarioRegistra = User.ObtenerUsuario();
                        itemCDD.FechaRegistro = DateTime.Now;
                        var resCDD = ventasBL.MantenimientoCotDetDespacho(itemCDD);
                    }
                    if (itemCD.CotizacionCostos != null)
                    {
                        for (int a = 0; a < itemCD.CotizacionCostos.Length; a++)
                        {
                            var itemCDC = itemCD.CotizacionCostos[a];
                            itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                            itemCDC.IdCotizacionDetalle = itemCD.Id;
                            itemCDC.UsuarioRegistra = User.ObtenerUsuario();
                            itemCDC.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetCosto(itemCDC);
                        }
                    }
                }

                return Json(new { Status = 1, Mensaje = "Cotización Guardada correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarComboCotDetItems()
        {
            //Se utiliza los detalles de cotizaciones temporales porque tiene los ultimos agregados
            var lstItems = GetCDIList(opcTablaTemporal);

            List<ComboDTO> lst = new List<ComboDTO>();
            if (lstItems != null)
            {
                lstItems.ForEach(x =>
                {
                    lst.Add(new ComboDTO() { Id = x.Id.ToString(), Text = x.Descripcion });
                });
            }
            ResponseDTO<List<ComboDTO>> res = new ResponseDTO<List<ComboDTO>>(lst);
            return Json(res);
        }

        [HttpPost]
        public JsonResult CargarCotDetSeleccionada(CotizacionDetalleDTO oCD)
        {
            var ventasBL = new VentasBL();
            //Se utiliza los detalles de cotizaciones temporales porque tiene los ultimos agregados
            var lstItems = GetCDIList(opcTablaTemporal);
            var item = lstItems.FirstOrDefault(x => x.Id == oCD.Id);
            var itemAux = new CotizacionDetalleDTO();
            if (item != null)
            {
                item.CopyProperties(ref itemAux);
                itemAux.Cantidad = oCD.Cantidad; //Se carga la cantidad cotizada en pantalla
                if (string.IsNullOrEmpty(itemAux.DescUnidad))
                {
                    var resArticulos = ventasBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO() { CodsArticulo = item.CodItem });
                    var oArticulo = resArticulos.Result.FirstOrDefault();
                    if (oArticulo != null) { itemAux.DescUnidad = oArticulo.DescUnidad; }
                }
            }
            ResponseDTO<CotizacionDetalleDTO> res = new ResponseDTO<CotizacionDetalleDTO>(itemAux);
            return Json(res);
        }

        [HttpPost]
        public JsonResult ListarCDCostosItems(CotDetCostoDTO oCosto)
        {
            var ventasBL = new VentasBL();

            var lstItems = GetCDIList(opcTablaFinal);

            List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

            //Se carga todos los costos de la cotizacion
            var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacion = oCosto.IdCotizacion });
            lstCostos = resCostos.Result.ToList();

            //Se completa los datos de cotizacion detalle para costos
            lstCostos.ForEach(x =>
            {
                var cditem = lstItems.FirstOrDefault(y => y.Id == x.IdCotizacionDetalle);
                if (cditem != null)
                {
                    x.IdCotizacion = cditem.IdCotizacion;
                    x.CodItemCotizado = cditem.CodItem;
                    x.DescripcionCotizado = cditem.Descripcion;
                    x.DescUnidadCotizada = cditem.DescUnidad;
                }
                x.IsUpdated = false;
            });

            //Se carga en sessión los COSTOS de los TABS
            VariableSesion.setObject(TAG_CDCI_Tabs, lstCostos);

            //Solo se devuelve los costos de la grilla respectiva
            var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => string.IsNullOrEmpty(oCosto.CodCosto) || x.CodCosto == oCosto.CodCosto));

            return Json(response);
        }

        [HttpPost]
        public JsonResult GrabarDatosCostoItem(CotDetCostoDTO CostoItem, string opcGrilla)
        {
            try
            {
                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                var lstItems = GetCDIList(opcTablaFinal);
                CotizacionDetalleDTO itemCotDet = new CotizacionDetalleDTO();

                //Si la grilla es de tabla final trabaja con el listado de SESSION de los TABS
                if (opcGrilla == opcTablaFinal)
                {
                    if (VariableSesion.getObject(TAG_CDCI_Tabs) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_Tabs); }
                    itemCotDet = lstItems.FirstOrDefault(x => x.Id == CostoItem.IdCotizacionDetalle);
                }
                else
                {
                    if (VariableSesion.getObject(TAG_CDCI_CotDetItem) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_CotDetItem); }
                    lstItems = GetCDIList(opcTablaTemporal);
                    itemCotDet = lstItems.FirstOrDefault(x => x.Id == CostoItem.IdCotizacionDetalle);
                    itemCotDet.Cantidad = CostoItem.CantidadCotizada;
                }

                var cantAgregada = lstCostos.Where(o => o.CantidadCosto.HasValue && o.Id != CostoItem.Id && o.CodCosto == CostoItem.CodCosto).
                    Select(x => x.CantidadCosto.Value).Sum();

                if (cantAgregada + CostoItem.CantidadCosto.Value > itemCotDet.Cantidad)
                { throw new Exception("La cantidad total que se está costeando no puede ser mayor a la cotizada"); }

                var ventasBL = new VentasBL();
                if (CostoItem.Id == 0) { CostoItem.Id = (lstCostos.Count() + 1) * -1; }

                CostoItem.UsuarioRegistra = User.ObtenerUsuario();
                if (CostoItem.Id > 0)
                { CostoItem.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Modificar; }
                else
                {
                    if(lstCostos.Where(x => x.CodCosto == CostoItem.CodCosto).Any())
                    { CostoItem.NumSecuencia = lstCostos.Where(x => x.CodCosto == CostoItem.CodCosto).Select(y => y.NumSecuencia).Max() + 1; }
                    else
                    { CostoItem.NumSecuencia = 1; }
                    CostoItem.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Insertar;
                }

                if (opcGrilla == opcTablaFinal)
                {

                    var resMant = ventasBL.MantenimientoCotDetCosto(CostoItem);
                    if (resMant.Result.Codigo > 0) { CostoItem.Id = resMant.Result.Codigo; }

                    //Se carga todos los costos
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacion = CostoItem.IdCotizacion });
                    lstCostos = resCostos.Result.ToList();

                    //Se completa los datos de cotizacion detalle para costos
                    lstCostos.ForEach(x =>
                    {
                        var cditem = lstItems.FirstOrDefault(y => y.Id == x.IdCotizacionDetalle);
                        if (cditem != null)
                        {
                            x.IdCotizacion = cditem.IdCotizacion;
                            x.CodItemCotizado = cditem.CodItem;
                            x.DescripcionCotizado = cditem.Descripcion;
                            x.DescUnidadCotizada = cditem.DescUnidad;
                        }
                        x.IsUpdated = false;
                    });

                    VariableSesion.setObject(TAG_CDCI_Tabs, lstCostos);

                    //Se consulta para saber el estado actual del proceso de venta
                    var resCotizacionActual = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = itemCotDet.IdCotizacion });
                    CotizacionDTO cotActualDTO = resCotizacionActual.Result.ToList().First();

                    var swValorizado = false;
                    if (cotActualDTO.IndValorizado.HasValue)
                    { if (cotActualDTO.IndValorizado.Value) { swValorizado = true; } }

                    var swCosteado = false;
                    if (cotActualDTO.IndCosteado.HasValue)
                    { if (cotActualDTO.IndCosteado.Value) { swCosteado = true; } }

                    if (swValorizado && swCosteado)
                    { NotificarCotizacionValorizada(cotActualDTO.IdSolicitud); }

                }
                else
                {
                    if (lstCostos.Any(x => x.Id == CostoItem.Id))
                    {
                        lstCostos.ForEach(x =>
                        {
                            if (x.Id == CostoItem.Id)
                            { CostoItem.CopyProperties(ref x); x.IsUpdated = true; }
                        });
                    }
                    else
                    {
                        CostoItem.IsUpdated = true;
                        lstCostos.Add(CostoItem);
                    }

                    //Se completa los datos de cotizacion detalle para costos
                    lstCostos.ForEach(x =>
                    {
                        if (!x.MontoTotalCosto.HasValue && x.CantidadCosto.HasValue && x.MontoUnitarioCosto.HasValue)
                        { x.MontoTotalCosto = x.CantidadCosto.Value * x.MontoUnitarioCosto.Value; }
                        else if (!x.MontoUnitarioCosto.HasValue && x.CantidadCosto.HasValue && x.MontoTotalCosto.HasValue)
                        { x.MontoUnitarioCosto = x.MontoTotalCosto.Value / x.CantidadCosto.Value; }
                    });

                    itemCotDet.CotizacionCostos = lstCostos.ToArray();

                    AddModifyCDI(itemCotDet);

                    VariableSesion.setObject(TAG_CDCI_CotDetItem, lstCostos);

                }

                //Solo se devuelve los costos de la grilla respectiva
                var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.CodCosto == CostoItem.CodCosto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EliminarCostoItem(CotDetCostoDTO cotdetCosto, string opcGrilla)
        {
            try
            {
                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                var oCosto = new CotDetCostoDTO();

                if (opcGrilla == opcTablaFinal)
                {
                    if (VariableSesion.getObject(TAG_CDCI_Tabs) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_Tabs); }
                    oCosto = lstCostos.FirstOrDefault(x => x.Id == cotdetCosto.Id);

                    var ventasBL = new VentasBL();
                    oCosto.Id = cotdetCosto.Id;
                    oCosto.UsuarioRegistra = User.ObtenerUsuario();
                    oCosto.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Eliminar;
                    var resMant = ventasBL.MantenimientoCotDetCosto(oCosto);

                    //Se carga todos los costos
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacion = cotdetCosto.IdCotizacion });
                    lstCostos = resCostos.Result.ToList();

                    VariableSesion.setObject(TAG_CDCI_Tabs, lstCostos);
                }
                else
                {
                    if (VariableSesion.getObject(TAG_CDCI_CotDetItem) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_CotDetItem); }

                    oCosto = lstCostos.FirstOrDefault(x => x.Id == cotdetCosto.Id);
                    var lstItems = GetCDIList(opcTablaTemporal);
                    var itemCD = lstItems.FirstOrDefault(x => x.Id == oCosto.IdCotizacionDetalle);

                    lstCostos = lstCostos.Where(x => x.Id != cotdetCosto.Id).ToList();
                    itemCD.CotizacionCostos = lstCostos.ToArray();
                    itemCD.IsUpdated = true;
                    AddModifyCDI(itemCD);

                    VariableSesion.setObject(TAG_CDCI_CotDetItem, lstCostos);

                }

                //Solo se devuelve los costos de la grilla respectiva
                var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.CodCosto == oCosto.CodCosto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarDatosCostoItem(CotDetCostoDTO cotdetCosto, string opcGrilla)
        {
            List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();
            if (opcGrilla == opcTablaFinal)
            {
                if (VariableSesion.getObject(TAG_CDCI_Tabs) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_Tabs); }
            }
            else
            {
                if (VariableSesion.getObject(TAG_CDCI_CotDetItem) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_CotDetItem); }
            }

            var cdcItem = lstCostos.FirstOrDefault(x => x.Id == cotdetCosto.Id);

            var ubigeoBL = new UbigeoBL();
            var ventasBL = new VentasBL();

            if (cdcItem.CodUbigeoDestino != null)
            {
                var resUbigeo = ubigeoBL.Obtener(new UbigeoDTO() { UbigeoId = cdcItem.CodUbigeoDestino });
                var oUbigeo = resUbigeo.Result.First();
                cdcItem.DescUbigeoDestino = oUbigeo.NombreDepartamento + " / " + oUbigeo.NombreProvincia + " / " + oUbigeo.NombreDistrito;
            }

            if(cdcItem.IdCotizacionDetalle != 0)
            {
                var lstItems = GetCDIList(opcTablaTemporal);
                var cdItem = lstItems.FirstOrDefault(x => x.Id == cdcItem.IdCotizacionDetalle);
                cdcItem.DescUnidadCotizada = cdItem.DescUnidad;
                cdcItem.CantidadCotizada = cdItem.Cantidad;
            }

            var response = new ResponseDTO<CotDetCostoDTO>(cdcItem);

            return Json(response);
        }

        [HttpPost]
        public JsonResult DeshacerCambiosPROTemporales()
        {

            var lstItemsActuales = GetCDIList(opcTablaFinal);
            lstItemsActuales = TotalizarCotDet(lstItemsActuales);

            var lstItems = new List<CotizacionDetalleDTO>();

            lstItemsActuales.ForEach(x =>
            {
                var item1 = new CotizacionDetalleDTO();
                x.CopyProperties(ref item1);
                item1.IsTempRecord = false;
                lstItems.Add(item1);
            });

            lstItemsActuales.ForEach(x =>
            {
                var item1 = new CotizacionDetalleDTO();
                x.CopyProperties(ref item1);
                item1.IsTempRecord = true;
                lstItems.Add(item1);
            });

            VariableSesion.setObject(TAG_CDI, lstItems.ToList());

            //Solo cargar los productos en pantalla
            var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.IsTempRecord &&
            x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

            return Json(response);
        }

        [HttpPost]
        public JsonResult DeshacerCambiosSERTemporales()
        {

            var lstItemsActuales = GetCDIList(opcTablaFinal);
            lstItemsActuales = TotalizarCotDet(lstItemsActuales);

            var lstItems = new List<CotizacionDetalleDTO>();

            lstItemsActuales.ForEach(x =>
            {
                var item1 = new CotizacionDetalleDTO();
                x.CopyProperties(ref item1);
                item1.IsTempRecord = false;
                lstItems.Add(item1);
            });

            lstItemsActuales.ForEach(x =>
            {
                var item1 = new CotizacionDetalleDTO();
                x.CopyProperties(ref item1);
                item1.IsTempRecord = true;
                lstItems.Add(item1);
            });

            VariableSesion.setObject(TAG_CDI, lstItems.ToList());

            //Solo cargar los productos en pantalla
            var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.IsTempRecord &&
            x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio));

            return Json(response);
        }

        [HttpPost]
        public JsonResult GrabarAprobDscto(CotizacionDTO cot)
        {
            var instaTecnicaBL = new InstalacionTecnicaBL();
            var ventasBL = new VentasBL();

            var oObs = cot.AprobDsctoComentario;
            oObs.TipoProceso = ConstantesDTO.Observacion.TipoProceso.Insertar;
            oObs.Estado_Instancia = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
            oObs.Nombre_Usuario = User.ObtenerUsuario();
            oObs.UsuarioRegistra = User.ObtenerUsuario();
            oObs.Perfil_Usuario = User.ObtenerPerfil();
            oObs.CodigoReferencia = cot.IdCotizacion.ToString();

            instaTecnicaBL.MantenimientoObservaciones(oObs);

            var resCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO { IdCotizacion = cot.IdCotizacion });
            var oCotizacion = resCotizacion.Result.First();

            oCotizacion.IndDsctoAprob = cot.IndDsctoAprob;
            if (cot.IndDsctoAprob.HasValue)
            {
                if (!cot.IndDsctoAprob.Value) { oCotizacion.PorcentajeDescuento = null; }
            }
            oCotizacion.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Modificar;
            oCotizacion.UsuarioRegistra = User.ObtenerUsuario();
            oCotizacion.FechaRegistro = DateTime.Now;

            ventasBL.MantenimientoCotizacion(oCotizacion);

            var response = new ResponseDTO<CotizacionDTO>(cot);
            return Json(response);
        }

        [HttpPost]
        public JsonResult AprobarCotizacion(CotizacionDTO cot)
        {
            var ventasBL = new VentasBL();
            var procesoBL = new ProcesosBL();

            var log = new FiltroWorkflowLogDTO();

            //Se registra el workflow para Valorización
            log.CodigoWorkflow = cot.IdWorkFlow;
            log.Usuario = User.ObtenerUsuario();
            log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob;
            log.UsuarioRegistro = User.ObtenerUsuario();
            procesoBL.InsertarWorkflowLog(log);

            //Se cambia el estado a En Valorización
            ventasBL.ActualizarSolicitudEstado(new SolicitudDTO()
            {
                Id_Solicitud = cot.IdSolicitud,
                Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob
            });

            var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
            { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob });

            if (rptaEst.Result.Any())
            {
                VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado);
                VariableSesion.setCadena("estadoSol", rptaEst.Result.First().CodigoEstado);
            }

            ViewBag.EstadoSolicitud = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob;
            ViewBag.IdCotizacion = cot.IdCotizacion;

            var response = new ResponseDTO<CotizacionDTO>(cot);
            return Json(response);
        }

        [HttpPost]
        public JsonResult MantenimientoDespacho(DatosDespachoDTO datosDespachoDTO)
        {
            var ventasBL = new VentasBL();
            datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
            datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
            var response = ventasBL.MantenimientoDespacho(datosDespachoDTO);
            return Json(response);
        }

        public JsonResult GestionImportacion(DatosDespachoDTO datosDespachoDTO)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANATEIMP";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de la gestion de importación de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString());
                    datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                    datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                    var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);
                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de la gestión de importación de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult VerDetalleItemDespacho(long codDetalleDespacho)
        {
            var ventasBL = new VentasBL();
            var response = ventasBL.VerDetalleItemDespacho(codDetalleDespacho);
            return Json(response);
        }

        [HttpPost]
        public JsonResult ActualizarNumeroSerie(DatosActualizarSerieSTO datos)
        {
            var ventasBL = new VentasBL();
            var response = ventasBL.ActualizarNumeroSerie(datos);
            return Json(response);
        }

        [HttpPost]
        public JsonResult FinalizarVenta(DatosDespachoDTO datosDespachoDTO)
        {
            var ventasBL = new VentasBL();
            datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
            datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
            var response = ventasBL.FinalizarVenta(datosDespachoDTO);
            return Json(response);
        }

        [HttpPost]
        public JsonResult EnviarGuiaPedidos(long codigoSolicitud, long codigoWorkFlow, string stock)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANGUIAPE";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(codigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                //Se verifica los adjuntos:
                var adjuntos = new List<string>();
                var documentosBL = new DocumentosBL();
                var documentos = documentosBL.ConsultaDocumentos(codigoWorkFlow);
                var docs = documentos.Result.OrderByDescending(e => e.CodigoDocumento);
                foreach (var doc in docs)
                {
                    if (doc.CodigoTipoDocumento == "DVT04" && doc.Eliminado == 0) //Solo documentos de tipo Guia de pedidos:
                    {
                        string pao_files = ConfigurationManager.AppSettings.Get("tempFiles");
                        string ruta = pao_files + doc.RutaDocumento;
                        adjuntos.Add(ruta);
                        break;
                    }
                }

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, adjuntos, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de la guia de pedidos de la solicitud N° " + codigoSolicitud.ToString());

                    if (stock == "X")
                    {
                        stock = "";
                    }
                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, stock, 1, 2,2, User.ObtenerUsuario());
                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de guia de pedidos de la solicitud N° " + codigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult EnviarServicios(long codigoSolicitud, long codigoWorkFlow)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANFACTUR";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(codigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                //Se verifica los adjuntos:
                var adjuntos = new List<string>();
                var documentosBL = new DocumentosBL();
                var documentos = documentosBL.ConsultaDocumentos(codigoWorkFlow);

                var docs_actConformidad = documentos.Result.Where(t => t.CodigoTipoDocumento == "DVT01" && t.Eliminado == 0).
                                        OrderByDescending(e => e.CodigoDocumento);

                var docs_constancia= documentos.Result.Where(t => t.CodigoTipoDocumento == "DVT02" && t.Eliminado == 0).
                                        OrderByDescending(e => e.CodigoDocumento);

                var docs_guiaManuscrita = documentos.Result.Where(t => t.CodigoTipoDocumento == "DVT05" && t.Eliminado == 0).
                                        OrderByDescending(e => e.CodigoDocumento);

                string pao_files = ConfigurationManager.AppSettings.Get("tempFiles");

                foreach (var doc in docs_actConformidad)
                {
                   string ruta = pao_files + doc.RutaDocumento;
                   adjuntos.Add(ruta);
                   break;
                }

                foreach (var doc in docs_constancia)
                {
                    string ruta = pao_files + doc.RutaDocumento;
                    adjuntos.Add(ruta);
                    break;
                }

                foreach (var doc in docs_guiaManuscrita)
                {
                    string ruta = pao_files + doc.RutaDocumento;
                    adjuntos.Add(ruta);
                    break;
                }

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, adjuntos, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso del servicio de la solicitud N° " + codigoSolicitud.ToString());

                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, "", 1, 2, 1, User.ObtenerUsuario());
                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio del servicio de la solicitud N° " + codigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult EnviarGuiaBO(long codigoSolicitud, long codigoWorkFlow)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANGUIABO";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(codigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                //Se verifica los adjuntos:
                var adjuntos = new List<string>();
                var documentosBL = new DocumentosBL();
                var documentos = documentosBL.ConsultaDocumentos(codigoWorkFlow);
                var docs = documentos.Result.OrderByDescending(e => e.CodigoDocumento);
                foreach (var doc in docs)
                {
                    if (doc.CodigoTipoDocumento == "DVT03" && doc.Eliminado == 0) //Solo documentos de tipo Guia de BO:
                    {
                        string pao_files = ConfigurationManager.AppSettings.Get("tempFiles");
                        string ruta = pao_files + doc.RutaDocumento;
                        adjuntos.Add(ruta);
                        break;
                    }
                }

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, adjuntos, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de la guia de BO de la solicitud N° " + codigoSolicitud.ToString());

                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, "N", 2, 1, 2, User.ObtenerUsuario());
                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de guia de BO de la solicitud N° " + codigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult EnviarGestionVentaConStock(long codigoSolicitud, long codigoWorkFlow)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANATLOCS";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(codigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de la guia de pedidos de la solicitud N° " + codigoSolicitud.ToString());

                    var datosDespachoDTO = new DatosDespachoDTO();
                    datosDespachoDTO.Tipo = "X";
                    datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                    datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                    datosDespachoDTO.Stock = "S";
                    datosDespachoDTO.CodigoSolicitud = codigoSolicitud;
                    datosDespachoDTO.CodigoWorkFlow = codigoWorkFlow;
                    var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);

                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de la gestión de la solicitud N° " + codigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult EnviarGestionServicioTecnico(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANSTECV";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(codigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso para servicio tecnico de la solicitud N° " + codigoSolicitud.ToString());

                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, "", 1, 2,2, User.ObtenerUsuario());
                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó correo al servicio tecnico de la solicitud N° " + codigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult EnviarAprobacionImportacion(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANAPRIMP";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(codigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso para Importacion de la solicitud N° " + codigoSolicitud.ToString());
                    result.Codigo = 1;
                    result.Mensaje = "Se realizó el envio de importación de la solicitud N° " + codigoSolicitud.ToString();

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        private void NotificarValorizacion_CostoFOB(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            //Envio de correo:
            var filtros = new FiltroPlantillaDTO();
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.CotGerencia;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);

            var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }
        }

        private void NotificarValorizacion_ValorUnitario(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo de costo
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.CotCostos;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);
            datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo de costos de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }

        }

        private void NotificarCotizacionValorizada(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            //Envio de correo:
            var filtros = new FiltroPlantillaDTO();
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.CotVendedor;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);

            var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }
        }

        private void NotificarCosteoPendiente_Logistica(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo a logistica
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.CotLogistica;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);
            datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo para logistica de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }

        }

        private void NotificarCosteoPendiente_ServicioTecnico(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo a Servicio Tecnico
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.CotServTecnio;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);
            datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo para logistica de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }

        }

        [HttpPost]
        public JsonResult GenerarHojaLiquidacion(CotizacionDTO cotizacionDTO)
        {
            var ventasBL = new VentasBL();
            var datosCabeceraCotizacion = ventasBL.ObtenerCotizacionVenta(cotizacionDTO).Result.First();

            var detalle_datos = new CotizacionDetalleDTO();
            detalle_datos.IdCotizacion = cotizacionDTO.IdCotizacion;
            var datosDetalleCotizacion = ventasBL.ObtenerCotizacionVentaDetalle(detalle_datos).Result;

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Hoja_Liquidacion");

            //Se define ancho de columnas:
            sh.SetColumnWidth(0, 15 * 256);
            sh.SetColumnWidth(1, 12 * 256);
            sh.SetColumnWidth(2, 72 * 256);
            sh.SetColumnWidth(3, 30 * 256);
            sh.SetColumnWidth(4, 30 * 256);
            sh.SetColumnWidth(5, 9 * 256);
            sh.SetColumnWidth(6, 20 * 256);
            sh.SetColumnWidth(7, 12 * 256);
            sh.SetColumnWidth(8, 12 * 256);

            // Creacion del estilo
            var fontbold = hssfworkbook.CreateFont();
            fontbold.Boldweight = (short)FontBoldWeight.Bold;
            fontbold.Color = HSSFColor.White.Index;
            fontbold.FontHeightInPoints = 8;
            fontbold.FontName = "Arial";

            var style = hssfworkbook.CreateCellStyle();
            style.SetFont(fontbold);
            style.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style.BorderTop = NPOI.SS.UserModel.BorderStyle.None;
            style.BorderRight = NPOI.SS.UserModel.BorderStyle.None;
            style.BorderLeft = NPOI.SS.UserModel.BorderStyle.None;
            style.FillForegroundColor = HSSFColor.Red.Index;
            style.FillPattern = FillPattern.SolidForeground;

            var fontBoldII = hssfworkbook.CreateFont();
            fontBoldII.Boldweight = (short)FontBoldWeight.Bold;
            fontBoldII.Color = HSSFColor.DarkBlue.Index;
            fontBoldII.FontHeightInPoints = 8;
            fontBoldII.FontName = "Arial";

            var styleII = hssfworkbook.CreateCellStyle();
            styleII.SetFont(fontBoldII);
            styleII.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            styleII.BorderTop = NPOI.SS.UserModel.BorderStyle.None;
            styleII.BorderRight = NPOI.SS.UserModel.BorderStyle.None;
            styleII.BorderLeft = NPOI.SS.UserModel.BorderStyle.None;
            styleII.FillForegroundColor = HSSFColor.Yellow.Index;
            styleII.FillPattern = FillPattern.SolidForeground;

            IDataFormat dataFormatCustom = hssfworkbook.CreateDataFormat();
            var styleDate = hssfworkbook.CreateCellStyle();
            styleDate.DataFormat = dataFormatCustom.GetFormat("dd/MM/yyyy");

            var styleIII = hssfworkbook.CreateCellStyle();
            styleIII.SetFont(fontbold);
            styleIII.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            styleIII.BorderTop = NPOI.SS.UserModel.BorderStyle.None;
            styleIII.BorderRight = NPOI.SS.UserModel.BorderStyle.None;
            styleIII.BorderLeft = NPOI.SS.UserModel.BorderStyle.None;
            styleIII.FillForegroundColor = HSSFColor.Red.Index;
            styleIII.FillPattern = FillPattern.SolidForeground;
            styleIII.DataFormat = dataFormatCustom.GetFormat("dd/MM/yyyy");

            //Impresion de cabecera:

            int rownum1 = 0;
            int cellnum1 = 0;
            IRow row1 = sh.CreateRow(rownum1++);
            NPOI.SS.UserModel.ICell cell1;

            cell1 = row1.CreateCell(cellnum1++);
            //cell.CellStyle = style;
            cell1.SetCellValue("N° Cotización:");

            cell1 = row1.CreateCell(cellnum1++);
            var num_cotizacion = "000000" + datosCabeceraCotizacion.IdCotizacion.ToString();
            var num = num_cotizacion.Substring(num_cotizacion.Length - 6);
            cell1.SetCellValue("PC-"+num);

            cell1 = row1.CreateCell(3);
            cell1.SetCellValue("Nombre Contacto:");

            cell1 = row1.CreateCell(4);
            cell1.SetCellValue(datosCabeceraCotizacion.NombreContacto);

            cell1 = row1.CreateCell(6);
            cell1.SetCellValue("Área:");

            cell1 = row1.CreateCell(7);
            cell1.SetCellValue(datosCabeceraCotizacion.AreaContacto);



            int rownum2 = 1;
            int cellnum2 = 0;
            IRow row2 = sh.CreateRow(rownum2++);
            NPOI.SS.UserModel.ICell cell2;

            cell2 = row2.CreateCell(cellnum2++);
            //cell.CellStyle = style;
            cell2.SetCellValue("Teléfono:");

            cell2 = row2.CreateCell(cellnum2++);
            cell2.SetCellValue(datosCabeceraCotizacion.TelefonoContacto);

            cell2 = row2.CreateCell(3);
            cell2.SetCellValue("Correo:");

            cell2 = row2.CreateCell(4);
            cell2.SetCellValue(datosCabeceraCotizacion.EmailContacto);

            cell2 = row2.CreateCell(6);
            cell2.SetCellValue("Observación:");

            cell2 = row2.CreateCell(7);
            cell2.SetCellValue(datosCabeceraCotizacion.Observacion);

            int rownum3 = 2;
            int cellnum3 = 0;
            IRow row3 = sh.CreateRow(rownum3++);
            NPOI.SS.UserModel.ICell cell3;


            cell3 = row3.CreateCell(cellnum3++);
            //cell.CellStyle = style;
            cell3.SetCellValue("Fecha Cotización:");

            cell3 = row3.CreateCell(cellnum3++);

            var fecha_cot = "";
            if (datosCabeceraCotizacion.FecCotizacion.HasValue)
            {
                fecha_cot = datosCabeceraCotizacion.FecCotizacion.Value.ToString("dd/MM/yyyy");
            }
            cell3.SetCellValue(fecha_cot);

            cell3 = row3.CreateCell(3);
            cell3.SetCellValue("Vigencia Cotización (días):");

            cell3 = row3.CreateCell(4);
            cell3.SetCellValue(datosCabeceraCotizacion.Vigencia);

            cell3 = row3.CreateCell(6);
            cell3.SetCellValue("Plazo Entrega (días):");

            cell3 = row3.CreateCell(7);
            cell3.SetCellValue(datosCabeceraCotizacion.PlazoEntrega);

            int rownum4 = 3;
            int cellnum4 = 0;
            IRow row4 = sh.CreateRow(rownum4++);
            NPOI.SS.UserModel.ICell cell4;

            cell4 = row4.CreateCell(cellnum4++);
            //cell.CellStyle = style;
            cell4.SetCellValue("Garantía:");

            cell4 = row4.CreateCell(cellnum4++);
            cell4.SetCellValue(datosCabeceraCotizacion.Garantia);

            cell4 = row4.CreateCell(3);
            cell4.SetCellValue("Forma de Pago:");

            cell4 = row4.CreateCell(4);
            cell4.SetCellValue(datosCabeceraCotizacion.FormaPago);

            cell4 = row4.CreateCell(6);
            cell4.SetCellValue("Moneda:");

            cell4 = row4.CreateCell(7);
            cell4.SetCellValue(datosCabeceraCotizacion.Moneda);


            // Impresion de cabeceras de detalle:
            int rownum = 5;
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            NPOI.SS.UserModel.ICell cell;


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Item");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Producto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Descripción");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Stock Disponible");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Unidad de Medida");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Cantidad");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Valor Venta Total Sin IGV");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ganancia(%)");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Valor Venta Total Sin IGV (Con Ganancia)");

          

            //// Impresión de la data

            foreach (var item in datosDetalleCotizacion)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NroItem.ToString());


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodItem.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Stock.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodUnidad.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cantidad.ToString());

                var ventaTotalSinIgv = "";
                if (item.VentaTotalSinIGV.HasValue)
                {
                    ventaTotalSinIgv = item.VentaTotalSinIGV.Value.ToString("0.00");
                }

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(ventaTotalSinIgv);

                var porcentajeGanancia = "";
                if (item.PorcentajeGanancia.HasValue)
                {
                    porcentajeGanancia = item.PorcentajeGanancia.Value.ToString("0.00");
                }

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(porcentajeGanancia);

                var ventaTotalSinIgvConGanancia = "";
                if (item.VentaTotalSinIGVConGanacia.HasValue)
                {
                    ventaTotalSinIgvConGanancia = item.VentaTotalSinIGVConGanacia.Value.ToString("0.00");
                }
                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(ventaTotalSinIgvConGanancia);


            }

            int rownum5 = 6 + datosDetalleCotizacion.Count();
            int cellnum5 = 0;
            IRow row5 = sh.CreateRow(rownum5++);
            NPOI.SS.UserModel.ICell cell5;


            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue("");

            cell5 = row5.CreateCell(cellnum5++);
            cell5.CellStyle = style;
            cell5.SetCellValue("Sub Total");

            var subTotal = "";
            if (datosCabeceraCotizacion.SubtotalVenta.HasValue)
            {
                subTotal = datosCabeceraCotizacion.SubtotalVenta.Value.ToString("0.00");
            }
            cell5 = row5.CreateCell(cellnum5++);
            cell5.SetCellValue(subTotal);


            int rownum6 = 7 + datosDetalleCotizacion.Count();
            int cellnum6 = 0;
            IRow row6 = sh.CreateRow(rownum6++);
            NPOI.SS.UserModel.ICell cell6;


            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue("");

            cell6 = row6.CreateCell(cellnum6++);
            cell6.CellStyle = style;
            cell6.SetCellValue("IGV (18%):");

            var IGV = "";
            if (datosCabeceraCotizacion.MontoIGV.HasValue)
            {
                IGV = datosCabeceraCotizacion.MontoIGV.Value.ToString("0.00");
            }
            cell6 = row6.CreateCell(cellnum6++);
            cell6.SetCellValue(IGV);

            int rownum7 = 8 + datosDetalleCotizacion.Count();
            int cellnum7 = 0;
            IRow row7 = sh.CreateRow(rownum7++);
            NPOI.SS.UserModel.ICell cell7;


            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue("");

            cell7 = row7.CreateCell(cellnum7++);
            cell7.CellStyle = style;
            cell7.SetCellValue("Total Venta:");

            var TotalVenta = "";
            if (datosCabeceraCotizacion.TotalVenta.HasValue)
            {
                TotalVenta = datosCabeceraCotizacion.TotalVenta.Value.ToString("0.00");
            }
            cell7 = row7.CreateCell(cellnum7++);
            cell7.SetCellValue(TotalVenta);



            string rutaInicial = ConfigurationManager.AppSettings.Get("RutaCotizacionVenta");
            string nombre = "LIQUIDACION_COSTOS_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            var ruta_file = rutaInicial + nombre;

            // Guardar el archivo en una ubicación específica
            using (FileStream fs = new FileStream(ruta_file, FileMode.Create, FileAccess.Write))
            {
                hssfworkbook.Write(fs); // Escribir el libro en el archivo
            }

            return Json(new
            {
                Status = 1,
                Archivo = nombre
            });

         
        }

        public JsonResult EditarItemCotDetServicio(string CodItem, string opcGrillaItems)
        {
            try
            {
                CotizacionDetalleDTO itemCotDet = findCotDetRecord(CodItem, opcGrillaItems);
                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult MantTecnicosDespacho(TecnicoGarantiaDTO tecnico)
        {
            var ventasBL = new VentasBL();
            tecnico.UsuarioRegistra = User.ObtenerUsuario();
            var response = ventasBL.MantTecnicosDespacho(tecnico);
            return Json(response);
        }

        [HttpPost]
        public JsonResult EnviarGestionFacturacion(DatosDespachoDTO datosDespachoDTO)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANATFACT";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta);

                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de la guia de pedidos de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString());


                    datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                    datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                    var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);

                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de la gestión de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                    }
                    else
                    {
                        Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                    }

                }

            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

    }
}