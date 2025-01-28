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
using WebGrease.Css.Extensions;
using static AHSECO.CCL.FRONTEND.Core.MultiFlujo.Tag;

namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaSolicitudesVentasController : Controller
    {

        const string TAG_ConceptosVenta = "ConceptosVenta";
        const string TAG_CDI = "CDItems";
        const string TAG_CDCI_CotDetItem = "CostoItemsCDI";
        const string TAG_CDCI_CotDetItem_BKP = "CostoItemsCDI_BKP";
        const string TAG_CDCI_Tabs = "CostoItemsTab";

        const string opcTablaTemporal = "1";
        const string opcTablaFinal = "2";
        const string opcTablaTabs = "3";

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
            if ( (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente && (VariableSesion.getCadena("tipoSol") == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos || VariableSesion.getCadena("tipoSol") == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales)) 
                || NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
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
            ViewBag.Btn_GuardarFacturaLogistica = "none";
            ViewBag.Btn_EditarFacturaLogistica = "none";
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
            ViewBag.Btn_RegistrarDespacho = "none";
            ViewBag.Btn_RegistrarDespachoSinStock ="none";
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
            ViewBag.VerFacturacion = false;
            ViewBag.TxtNumFactura = "disabled";
            ViewBag.FecEntregaPedido = "disabled";
            ViewBag.VerContrato = false;
            ViewBag.FechaContrato = "disabled";
            ViewBag.TxtNroContrato = "disabled";
            ViewBag.ControlCalculoFechaMaxima = "disabled";
            ViewBag.VerTipoDespacho = false;


            ViewBag.Btn_EnviarGuiaCS = "none";
            ViewBag.Btn_GuiaPedidoCS = "none";
            ViewBag.Btn_EnviarGuiaSS = "none";
            ViewBag.Btn_GuiaPedidoSS = "none";

            ViewBag.Btn_EnviarGuiaTotal = "none";
            ViewBag.Btn_GuiaPedidoTotal = "none";
            ViewBag.Btn_EnviarGuiaBOTotal = "none";
            ViewBag.Btn_GuiaBOTotal= "none";
            ViewBag.Disabled_TipoDespacho = "";

            ViewBag.Btn_GuiaManuscritaTotal = "none";

            string[] dtHeadProducto =
            {
                "Nro. Item",
                "Codigo Producto",
                "Descripción",
                "Stock Disponible",
                "Unidad Medida",
                "Cantidad",
                "Valor. Venta Total Sin IGV (Sin Margen Adicional)",
                "Margen Adicional(%)",
                "Valor. Venta Total Sin IGV Con Margen Adicional)",
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

            ViewBag.PermitirAdjuntarDocumento = false;

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
            ViewBag.PermitirVerPorcentDscto = false;
            ViewBag.PermitirAprobarCotizacion = false;
            ViewBag.DsctoRequiereAprobacion = false;
            ViewBag.DsctoAprobado = false;
            ViewBag.DsctoRespondido = false;
            ViewBag.PermitirAprobarDscto = false;

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

            ViewBag.SeccionLogCS = false;
            ViewBag.SeccionLogSS = false;
            ViewBag.SeccionImpSS = false;

            if (EsFlujoValorizacion())
            { ViewBag.PermitirEditarValorizacion = true; }

            if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente) { ViewBag.PermitirAprobarDscto = true; /*ViewBag.PermitirVerPorcentDscto = true; */}

            if (ViewBag.PermitirEditarValorizacion == true)
            {
                string[] CD_Columns =
                {
                    "Nro. Item", "Codigo Producto", "Descripción", "Unidad Medida", "Cantidad", "Ex-Work", "Valor Venta Unitario",
                    "Valor. Venta Total Sin IGV (Sin Margen Adicional)", "Margen Adicional(%)", "Valor. Venta Total Sin IGV (Con Margen Adicional)","Acción"
                };
                ViewBag.CabeceraCotDet = CD_Columns;

                //El tipo de solicitud REPUESTOS no muestra PORCENTAJE DE Margen Adicional
                if (VariableSesion.getCadena("tipoSol") == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles ||
                    VariableSesion.getCadena("tipoSol") == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                {
                    string[] CD_ColumnsRepuestos =
                    {
                        "Nro. Item", "Codigo Producto", "Descripción", "Unidad Medida", "Cantidad", "Valor Venta Unitario", 
                        "Valor. Venta Total Sin IGV", "Acción"
                    };
                    ViewBag.CabeceraCotDet = CD_ColumnsRepuestos;
                }
            }
            else
            {
                string[] CD_Columns =
                {
                    "Nro. Item", "Codigo Producto", "Descripción", "Unidad Medida", "Cantidad", "Valor Venta Unitario",
                    "Valor. Venta Total Sin IGV (Sin Margen Adicional)", "Margen Adicional(%)", "Valor. Venta Total Sin IGV (Con Margen Adicional)", "Acción"
                };
                ViewBag.CabeceraCotDet = CD_Columns;

                //El tipo de solicitud REPUESTOS no muestra PORCENTAJE DE Margen Adicional
                if (VariableSesion.getCadena("tipoSol") == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles ||
                    VariableSesion.getCadena("tipoSol") == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                {
                    string[] CD_ColumnsRepuestos =
                    {
                        "Nro. Item", "Codigo Producto", "Descripción", "Unidad Medida", "Cantidad", "Valor Venta Unitario", 
                        "Valor. Venta Total Sin IGV", "Acción"
                    };
                    ViewBag.CabeceraCotDet = CD_ColumnsRepuestos;
                }
            }

            if (numSol != null)
            {
                var rptaSoli = ventasBL.ObtenerSolicitudes(new SolicitudDTO() { Id_Solicitud = int.Parse(numSol) });
                var soli = rptaSoli.Result.First();
                ViewBag.TipoSolicitud = soli.Tipo_Sol;
                ViewBag.EstadoSolicitud = soli.Estado;
                ViewBag.TipoVenta = soli.TipoVenta;
                VariableSesion.setObject("SOLICITUD_VENTA", soli);
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

                //Validar si se puede adjuntar documento si eres ASESOR DE VENTA
                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                {
                    ViewBag.PermitirAdjuntarDocumento = true;
                }

                //Validando CABECERA COTIZACION según ROL
                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor
                    || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ
                    || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc)
                {

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado)
                    {
                        ViewBag.PermitirCancelarCot = true;
                        ViewBag.PermitirEditarCotizacion_Pri = true;
                        ViewBag.PermitirEditarCotizacion_Sec = true;
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        { ViewBag.PermitirEditarCotizacion_Sec = true; }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        { ViewBag.PermitirEditarCotizacion_Sec = true; }
                    }
                }

                //Validando BOTONES de SOLICITUD después de la COTIZACION según ROL
                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor
                    || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ
                    || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc)
                {

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob)
                    {
                        ViewBag.Btn_GuardarDespacho = "inline-block";
                        ViewBag.TxtOrdenCompra = "";
                        ViewBag.TxtFecOrdenCompra = "";
                        if(soli.TipoVenta == "TVEN02")
                        {
                            ViewBag.VerContrato = true;
                            ViewBag.FechaContrato = "";
                            ViewBag.ControlCalculoFechaMaxima = "";
                            ViewBag.TxtNroContrato = "";
                        }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {

                        if(soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }

                        ViewBag.VerGestionLogistica = true;
                        if (soli.TipoVenta == "TVEN02")
                        {
                            ViewBag.VerContrato = true;
                        }
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerTipoDespacho = true;

                                if(validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                    validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                    validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }

                                if(validarDespacho.Result.TipoDespacho == "T")
                                {
                                    if(validarDespacho.Result.EnvioBOSinStock == 0)
                                    {
                                        ViewBag.Btn_GuiaBOTotal = "";
                                        if(validarDespacho.Result.GenerarGuiaBOSinStock > 0)
                                        {
                                            ViewBag.Btn_EnviarGuiaBOTotal = "";
                                        }                                        
                                    }

                                    if(validarDespacho.Result.EnvioBOSinStock > 0 &&
                                        validarSinStock.Result.EstadoAprobacion == "IMP" &&
                                        (validarDespacho.Result.EnvioGPConStock == 0 || validarDespacho.Result.EnvioGPSinStock == 0))
                                    {
                                        ViewBag.Btn_GuiaPedidoTotal = "";
                                        if(validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                            validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                        {
                                            ViewBag.Btn_EnviarGuiaTotal = "";
                                        }
                                    }
                                   
                                }

                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0
                                 && validarDespacho.Result.EnvioGPConStock == 0 && validarDespacho.Result.EnvioBOSinStock == 0)
                            {
                                ViewBag.Btn_EditarDespacho = "inline-block";
                            }
                            else if(validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock == 0 && validarDespacho.Result.EnvioGPConStock == 0)
                            {
                                ViewBag.Btn_EditarDespacho = "inline-block";
                            }
                            else if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.ContadorConStock==0  && validarDespacho.Result.EnvioBOSinStock == 0)
                            {
                                ViewBag.Btn_EditarDespacho = "inline-block";
                            }


                            if (validarDespacho.Result.ContadorSinStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {

                               ViewBag.VerNavSinStock = true;

                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }

                                if (validarDespacho.Result.EnvioBOSinStock == 0)
                                {
                                    if(validarDespacho.Result.TipoDespacho =="P" && validarDespacho.Result.GenerarGuiaBOSinStock > 0)
                                    {
                                        ViewBag.Btn_EnviarGuiaBO = "inline-block";
                                    }

                                    if(validarDespacho.Result.TipoDespacho == "P")
                                    {
                                        ViewBag.Btn_GuiaBO = "inline-block";
                                    }
                                    
                                    
                                }
                                else if (validarDespacho.Result.EnvioBOSinStock > 0)
                                {
                                    ViewBag.SeccionImpSS = true;
                                }
                               
                                if (validarSinStock.Result.EstadoAprobacion == "OBS")
                                {
                                    if (validarDespacho.Result.GenerarGuiaBOSinStock > 0)
                                    {
                                        ViewBag.Btn_EnviarGuiaBO = "inline-block";
                                    }
                                      
                                    if(validarDespacho.Result.TipoDespacho == "P")
                                    {
                                        ViewBag.Btn_GuiaBO = "inline-block";
                                    }
                                   
                                }
                                else if (validarSinStock.Result.EstadoAprobacion == "IMP")
                                {
                                    if(validarDespacho.Result.EnvioGPSinStock == 0)
                                    {
                                        if(validarDespacho.Result.TipoDespacho=="P" && validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                        {
                                            ViewBag.Btn_EnviarGuiaSS = "inline-block";
                                        }
                                        
                                        if(validarDespacho.Result.TipoDespacho == "P")
                                        {
                                            ViewBag.Btn_GuiaPedidoSS = "inline-block";
                                        }
                                        
                                    }
                                }


                                if (validarDespacho.Result.EnvioGPSinStock > 0)
                                {
                                    ViewBag.SeccionLogSS = true;
                                }

                            }

                            if (validarDespacho.Result.ContadorConStock > 0)
                            {
                                    ViewBag.VerNavConStock = true;

                                if (validarDespacho.Result.EnvioGPConStock == 0)
                                {
                                    
                                    if(validarDespacho.Result.TipoDespacho=="P" && validarDespacho.Result.GenerarGuiaPedidoConStock > 0)
                                    {
                                        ViewBag.Btn_EnviarGuiaCS = "inline-block";
                                    }

                                    if(validarDespacho.Result.TipoDespacho == "P")
                                    {
                                        ViewBag.Btn_GuiaPedidoCS = "inline-block";
                                    }
                                   
                                }
                                else
                                {
                                    ViewBag.SeccionLogCS = true;
                                }
                               
                                
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                                soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if (validarDespacho.Result.EnvioServicio == 0)
                                {
                                    if(soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                                    {
                                        if(validarDespacho.Result.ContadorConStock >0 && validarDespacho.Result.ContadorSinStock > 0)
                                        {
                                            if(validarDespacho.Result.GestionLogConStock >0 && validarDespacho.Result.GestionLogSinStock >0)
                                            {
                                                ViewBag.Btn_GuiaManuscritaTotal = "inline-block";
                                                ViewBag.Btn_EnviarServicio = "inline-block";
                                            }
                                        }

                                        if(validarDespacho.Result.ContadorConStock>0 && validarDespacho.Result.GestionLogConStock >0)
                                        {
                                            ViewBag.Btn_GuiaManuscritaTotal = "inline-block";
                                            ViewBag.Btn_EnviarServicio = "inline-block";
                                        }

                                        if(validarDespacho.Result.ContadorSinStock>0 && validarDespacho.Result.GestionLogSinStock >0)
                                        {
                                            ViewBag.Btn_GuiaManuscritaTotal = "inline-block";
                                            ViewBag.Btn_EnviarServicio = "inline-block";
                                        }
                                    }
                                  
                                    if(soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                                    {
                                        ViewBag.Btn_GuiaManuscritaTotal = "inline-block";
                                        ViewBag.Btn_EnviarServicio = "inline-block";
                                        ViewBag.InActiveTecnico = "in active";
                                    }         
                                }
                                else
                                {
                                    ViewBag.VerNavServicio = true;
                                    if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                                    {
                                        ViewBag.InActiveServicio = "in active";
                                    }
                                        
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


                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg)
                    {
                        if (soli.TipoVenta == "TVEN02")
                        {
                            ViewBag.VerContrato = true;
                        }
                        ViewBag.Btn_FinalizarVenta = "inline-block";
                        ViewBag.VerGestionLogistica = true;
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }


                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerTipoDespacho = true;
                                if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }

                            }
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                ViewBag.VerNavSinStock = true;

                                if(validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }
                                
                                ViewBag.SeccionImpSS = true;
                                ViewBag.SeccionLogSS = true;
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.SeccionLogCS = true;

                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                               soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                ViewBag.VerNavServicio = true;
                                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                                {
                                    ViewBag.InActiveServicio = "in active";
                                }
                                   
                                ViewBag.InActiveTecnico = "";
                            }

                        }

                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        if (soli.TipoVenta == "TVEN02")
                        {
                            ViewBag.VerContrato = true;
                        }
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }
                        ViewBag.VerGestionLogistica = true;
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerTipoDespacho = true;
                                if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }
                            }
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                ViewBag.SeccionImpSS = true;
                                ViewBag.SeccionLogSS = true;
                                ViewBag.VerNavSinStock = true;
                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.SeccionLogCS = true;
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                               soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                ViewBag.VerNavServicio = true;
                                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                                {
                                    ViewBag.InActiveServicio = "in active";
                                }
                                   
                                ViewBag.InActiveTecnico = "";
                            }

                        }
                    }

                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente)
                {
                    if (soli.TipoVenta == "TVEN02")
                    {
                        ViewBag.VerContrato = true;
                    }
                    if (validarDespacho.Result != null)
                    {
                        if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                        {
                            ViewBag.VerTipoDespacho = true;
                            if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                   validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                   validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                            {
                                ViewBag.Disabled_TipoDespacho = "disabled";
                            }
                        }
                        if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas &&
                            soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                        {
                            ViewBag.VerGestionLogistica = true;
                            if (soli.Tipo_Sol != "TSOL01")
                            {
                                ViewBag.VerFacturacion = true;
                            }
                            if (validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;
                                ViewBag.SeccionImpSS = true;
                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }

                                if (validarDespacho.Result.EnvioBOSinStock > 0)
                                {
                                    
                                    if(validarSinStock.Result != null)
                                    {
                                        if(validarSinStock.Result.EstadoAprobacion == "")
                                        {
                                            ViewBag.Btn_Aprobar = "inline-block";
                                            ViewBag.Btn_Observar = "inline-block";
                                        }
                                    }
                                }
                            }

                            if (validarDespacho.Result.ContadorConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.SeccionLogCS = true;             
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if (validarDespacho.Result.EnvioServicio > 0)
                                {
                                    ViewBag.VerNavServicio = true;
                                }
                            }

                        }
                    }
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg ||
                           soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado ||
                           soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                    {
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }
                        ViewBag.VerGestionLogistica = true;
                        ViewBag.SeccionImpSS = true;
                        ViewBag.SeccionLogSS = true;

                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                ViewBag.VerNavSinStock = true;
                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }
                            }

                            if (validarDespacho.Result.ContadorConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.SeccionLogCS = true;
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos ||
                                soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                if (validarDespacho.Result.EnvioServicio > 0)
                                {
                                    ViewBag.VerNavServicio = true;
                                }
                            }
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
                    if (soli.Tipo_Sol != "TSOL01")
                    {
                        ViewBag.VerFacturacion = true;
                    }

                    if (soli.TipoVenta == "TVEN02")
                    {
                        ViewBag.VerContrato = true;
                    }

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
                            if(validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerTipoDespacho = true;
                                if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }
                            }

                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {

                                ViewBag.VerNavSinStock = true;
                                ViewBag.TxtNumFactura = "";
                                ViewBag.FecEntregaPedido = "";
                               // ViewBag.Btn_EditarFacturaLogistica = "inline-block";
                                ViewBag.SeccionImpSS = true;
                                ViewBag.SeccionLogSS = true;

                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }

                                ViewBag.Btn_GuardarGestionLogisticaSE = "inline-block";
                                if (validarDespacho.Result.EnvioVentaSinStock == 0)
                                {
                                    ViewBag.Btn_EnviarGestionDespachoSE = "inline-block";
                                }

                                if (validarDespacho.Result.GestionLogSinStock > 0)
                                {
                                    if(validarDespacho.Result.EnvioVentaSinStock == 0)
                                    {
                                        ViewBag.Btn_EditarGestionLogisticaSE = "inline-block";
                                    }
                                    
                                }
                                else
                                {
                                    
                                    ViewBag.Btn_RegistrarDespachoSinStock = "inline-block";

                                }
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.TxtNumFactura = "";
                                ViewBag.FecEntregaPedido = "";
                               // ViewBag.Btn_EditarFacturaLogistica = "inline-block";
                                ViewBag.SeccionLogCS = true;

                                ViewBag.Btn_GuardarGestionLogistica = "inline-block";

                                if (validarDespacho.Result.EnvioVentaConStock == 0)
                                {
                                    ViewBag.Btn_EnviarGestionDespacho = "inline-block";
                                }

                                if (validarDespacho.Result.GestionLogConStock > 0)
                                {
                                    if (validarDespacho.Result.EnvioVentaConStock == 0)
                                    {
                                        ViewBag.Btn_EditarGestionLogistica = "inline-block";
                                    }

                                }
                                else
                                {
                                   
                                    ViewBag.Btn_RegistrarDespacho = "inline-block";
                                }
                            }
                            
                            if (soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio &&
                                 soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if(validarDespacho.Result.ContadorSinStock == 1 &
                                    validarDespacho.Result.ContadorConStock == 1)
                                {
                                    if (validarDespacho.Result.EnvioGPSinStock > 0 && 
                                        validarDespacho.Result.EnvioGPConStock == 0)
                                    {
                                        ViewBag.InActiveSinStock = "in active";
                                    }
                                  
                                }
                            }

                            if(soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if (validarDespacho.Result.EnvioServicio > 0)
                                {
                                    ViewBag.VerNavServicio = true;
                                }
                            }
                        }
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                   || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {



                        if(soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg)
                        {
                            ViewBag.Btn_EditarFacturaLogistica = "inline-block";
                            ViewBag.Btn_RegistrarDespacho = "inline-block";
                            ViewBag.Btn_RegistrarDespachoSinStock = "inline-block";

                            if(soli.Tipo_Sol == "TSOL04")
                            {
                                ViewBag.Btn_GuardarGestionLogistica = "inline-block";
                                ViewBag.Btn_GuardarGestionLogisticaSE = "inline-block";
                            }
                        }

                        if (validarDespacho.Result != null)
                        {

                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;
                                ViewBag.SeccionImpSS = true;
                                ViewBag.SeccionLogSS = true;
                                ViewBag.VerTipoDespacho = true;

                                if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                   validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                   validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }


                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.SeccionLogCS = true;
                            }

                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                            {
                                if (validarDespacho.Result.EnvioServicio > 0)
                                {
                                    ViewBag.VerNavServicio = true;
                                }
                            }
                        }
                    }
                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Importacion)
                {
                    ViewBag.TxtCodigoPedido = "";
                    if (soli.TipoVenta == "TVEN02")
                    {
                        ViewBag.VerContrato = true;
                    }
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {
                        ViewBag.VerGestionLogistica = true;
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }
                        if (validarDespacho.Result != null)
                        {

                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerTipoDespacho = true;
                                if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }
                            }

                            if (validarDespacho.Result.ContadorSinStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                ViewBag.IngresoAlmacen = "";
                                if (validarSinStock.Result.EstadoAprobacion == "APR")
                                {
                                    ViewBag.Btn_GuardarImportacion = "inline-block";
                                }
                                ViewBag.VerNavSinStock = true;
                                ViewBag.SeccionImpSS = true;
                                ViewBag.InActiveSinStock = "in active";
                            }
                            if (validarDespacho.Result.EnvioServicio > 0)
                            {
                                ViewBag.VerNavServicio = true;
                            }
                        }
                    }
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg ||
                       soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado ||
                       soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                    {
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }
                        ViewBag.VerGestionLogistica = true;
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                            {
                                ViewBag.VerTipoDespacho = true;
                                if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                       validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                {
                                    ViewBag.Disabled_TipoDespacho = "disabled";
                                }
                            }

                            if (validarDespacho.Result.ContadorSinStock > 0 && soli.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                if (validarDespacho.Result.ContadorConStock == 0)
                                {
                                    ViewBag.InActiveSinStock = "in active";
                                }
                                ViewBag.VerNavSinStock = true;
                                ViewBag.SeccionImpSS = true;
                                ViewBag.SeccionLogSS = true;
                            }

                            if (validarDespacho.Result.ContadorConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;
                                ViewBag.SeccionLogCS = true;
                            }
                        }

                    }

                }
                else if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Facturador)
                {
                    if (soli.TipoVenta == "TVEN02")
                    {
                        ViewBag.VerContrato = true;
                    }
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas)
                    {
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }
                        ViewBag.VerGestionLogistica = true;
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                            || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                        {

                            if (validarDespacho.Result != null)
                            {
                                if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.ContadorSinStock > 0)
                                {
                                    ViewBag.VerTipoDespacho = true;
                                    if (validarDespacho.Result.GenerarGuiaBOSinStock > 0 ||
                                           validarDespacho.Result.GenerarGuiaPedidoConStock > 0 ||
                                           validarDespacho.Result.GenerarGuiaPedidoSinStock > 0)
                                    {
                                        ViewBag.Disabled_TipoDespacho = "disabled";
                                    }
                                }
                                if (validarDespacho.Result.EnvioServicio > 0)
                                {
                                    ViewBag.VerNavServicio = true;
                                    ViewBag.InActiveServicio = "in active";
                                    if(validarDespacho.Result.GestionLogServicio == 0)
                                    {
                                        ViewBag.FechaFactura = "";
                                        ViewBag.TxtNumeroFacturaServ = "";
                                    }
                                    
                                }
                                else
                                {
                                    ViewBag.InActiveTecnico = "in active";
                                }

                            }


                            if (validarDespacho.Result != null)
                            {
                                if (validarDespacho.Result.EnvioServicio > 0 && validarDespacho.Result.GestionLogServicio == 0)
                                {
                                    ViewBag.Btn_GuardarFactura = "inline-block";
                                }
                            }
                        }
                    }
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg ||
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        if (soli.Tipo_Sol != "TSOL01")
                        {
                            ViewBag.VerFacturacion = true;
                        }



                        ViewBag.VerGestionLogistica = true;
                        if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                           || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                        {
                            ViewBag.VerNavServicio = true;
                            ViewBag.InActiveServicio = "in active";
                        }
                    }
                }

                //Validando BANDEJAS según TIPO DE SOLICITUD
                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                {
                    ViewBag.VerBandejaServiciosCotizacion = true;
                }

                //Validando BANDEJAS según TIPO DE SOLICITUD
                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales
                    || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                {
                    ViewBag.VerBandejaCotizacion = true;
                }

                //Validando BANDEJAS según ESTADO DE SOLICITUD
                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                {
                    ViewBag.VerGestionVenta = true;
                }

                //Validando ACCIONES EN DETALLE COTIZACION según ESTADO DE SOLICITUD
                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                {

                    ViewBag.PermitirEditarCotDetItem = true;

                    //Solo se habilita el Detalle de Cotizacion SERVICIOS para los COORDINADORES
                    if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            ViewBag.PermitirAgregarServicios = true;
                            ViewBag.PermitirGuardarCotizacion = true;
                        }
                    }

                    //Solo se habilita el Detalle de Cotizacion REPUESTOS para los COORDINADORES
                    if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            ViewBag.PermitirAgregarProductos = true;
                            ViewBag.PermitirEnvioCotizacion = true;
                            ViewBag.PermitirGuardarCotizacion = true;
                        }
                    }

                    //Solo se habilita el Detalle de Cotizacion PRODUCTOS para los ASESORES de VENTA
                    if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales
                        || soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                        {
                            ViewBag.PermitirAgregarProductos = true;
                            ViewBag.PermitirEnvioCotizacion = true;
                            ViewBag.PermitirGuardarCotizacion = true;
                            ViewBag.PermitirCancelarCot = true;
                        }
                    }

                    //Para los combinados de PRODUCTOS y SERVICIOS se habilitarán ambos botones
                    if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                    {

                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor ||
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            ViewBag.PermitirAgregarServicios = true;
                            ViewBag.PermitirAgregarProductos = true;
                            ViewBag.PermitirEnvioCotizacion = true;
                            ViewBag.PermitirGuardarCotizacion = true;
                        }

                    }

                }
                else if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {

                    //Si es Asesor de Costos o Gerente General podrá modificar los PRECIOS DE VENTAS
                    //pero el Asesor de Ventas solo modificará el porcentaje de Margen Adicional
                    //y los Coordinadores solo modificarán los servicios

                    if (
                        //NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor ||  Probando
                        EsFlujoValorizacion() ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                    {
                        ViewBag.PermitirGuardarValorizacion = true;
                    };


                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.ServTecnico)
                    {
                        ViewBag.PermitirTabInsta = true;
                        ViewBag.PermitirTabCapa = true;
                        ViewBag.PermitirTabMantPrevent = true;
                        ViewBag.PermitirTabLLaveMano = true;
                        ViewBag.PermitirTabManuales = true;
                        ViewBag.PermitirTabVideos = true;
                        ViewBag.PermitirTabCalib = false;
                        ViewBag.PermitirTabDetCot = false;
                        ViewBag.VerBandejaCotizacion = false;
                    }

                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Logistica)
                    {
                        ViewBag.PermitirTabFlete = true;
                        ViewBag.PermitirTabDetCot = false;
                        ViewBag.VerBandejaCotizacion = false;
                    }

                }

                //La EXPORTACION DE LIQUIDACION e IMPRESION de la COTIZACION siempre se muestra cuando ya pasó la APROBACIÓN
                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                {
                    ViewBag.PermitirImprimirCotizacion = true;
                    ViewBag.PermitirExportarLiquidacion = true;
                }

                var rptaCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO()
                { IdSolicitud = int.Parse(numSol), Estado = ConstantesDTO.CotizacionVenta.Estados.Activo });

                if (rptaCotizacion.Result.Any())
                {

                    ViewBag.MostrarCotizacionDetalle = true;

                    //Validando PANELES por ESTADO DE SOLICITUD
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion || 
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion || 
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                    {
                        ViewBag.AcordionCollapsedLiq = "";
                        ViewBag.TabAcordionCollapsedLiq = "";
                    }

                    //Validando PANELES por ESTADO DE SOLICITUD
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas || 
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg || 
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob || 
                        soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
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

                    VariableSesion.setObject("COTIZACION_VENTA", oCotizacion);

                    //Se muestra los COSTOS para la COTIZACION dependiendo si tiene REGISTROS
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                    var lstCostos = new List<CotDetCostoDTO>();

                    if (resCostos.Result != null)
                    {
                        lstCostos = resCostos.Result.ToList();
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Instalacion)) { ViewBag.PermitirTabInsta = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Capacitacion)) { ViewBag.PermitirTabCapa = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.MantPrevent)) { ViewBag.PermitirTabMantPrevent = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.LLaveMano)) { ViewBag.PermitirTabLLaveMano = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Manuales)) { ViewBag.PermitirTabManuales = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Videos)) { ViewBag.PermitirTabVideos = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Calibra)) { ViewBag.PermitirTabCalib = false; }
                        if (!lstCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Flete)) { ViewBag.PermitirTabFlete = false; }
                    }

                    //Se valida el FLUJO DE DESCUENTOS
                    if (oCotizacion.IndDsctoRequiereAprob.HasValue)
                    { ViewBag.DsctoRequiereAprobacion = oCotizacion.IndDsctoRequiereAprob.Value; }

                    if (oCotizacion.IndDsctoAprob.HasValue)
                    {
                        ViewBag.DsctoAprobado = oCotizacion.IndDsctoAprob.Value;
                        ViewBag.DsctoRespondido = true;
                    }

                    //Se valida los datos del CONTACTO
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

                    var resCotDet = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                    if (resCotDet.Result != null)
                    {
                        if (resCotDet.Result.Any())
                        {

                            //Se carga el detalle de la cotizacion
                            var lstItems = resCotDet.Result.ToList();

                            //Se inicializa el CODIGO ITEM como TEMPORAL para no afectar el FLUJO del BUSCADOR
                            lstItems.ForEach(x => { x.CodItemTemp = x.CodItem; });

                            //Se configura los DETALLES de la COTIZACION
                            lstItems = configureCotDet(lstItems);

                            //Validando BOTONES de COTIZACION por ESTADO
                            if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                            {

                                var swEsCotizacionValorizada = false;
                                var swEsCotizacionCosteada = false;

                                if (oCotizacion.IndValorizado.HasValue)
                                { if (oCotizacion.IndValorizado.Value) { swEsCotizacionValorizada = true; } }

                                if (oCotizacion.IndCosteado.HasValue)
                                { if (oCotizacion.IndCosteado.Value) { swEsCotizacionCosteada = true; } }

                                ViewBag.EsCotizacionValorizada = swEsCotizacionValorizada;
                                ViewBag.EsCotizacionCosteada = swEsCotizacionCosteada;

                                //Se valida si se necesita que este COSTEADO habiliar los BOTONES
                                var swReqCosteo = false;
                                foreach (CotizacionDetalleDTO itemCD in lstItems)
                                {
                                    if (EsCosteoRequerido(itemCD) == true && swReqCosteo == false) { swReqCosteo = true; }
                                }

                                //Se valida que tenga campos HABILITADOS para EDITAR
                                //y tambien tener en cuenta que tipo de solicitud SERVICIOS no usa VALORIZACION por lo cual no le afecta
                                var swCotDetEditable = lstItems.Where(o => o.Features != null).Any(x => x.Features.IsEnabled);
                                if (ViewBag.PermitirEditarCotizacion_Sec == true || swCotDetEditable == true)
                                { ViewBag.PermitirGuardarValorizacion = true; }
                                else
                                { ViewBag.PermitirGuardarValorizacion = false; }

                                //Para el tipo "EQUIPOS" se habilita lo siguiente
                                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                                {
                                    if (swEsCotizacionValorizada && (!swReqCosteo || (swReqCosteo && swEsCotizacionCosteada))
                                        && NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                                    {
                                        ViewBag.PermitirExportarLiquidacion = true;
                                        ViewBag.PermitirImprimirCotizacion = true;

                                        ViewBag.PermitirReCotizacion = true;
                                        ViewBag.PermitirCancelarCot = true;

                                        ViewBag.PermitirAprobarCotizacion = true;
                                        ViewBag.PermitirEditarGanancia = true;
                                        ViewBag.PermitirEditarPorcentDscto = true;
                                        //ViewBag.PermitirVerPorcentDscto = true;
                                        ViewBag.PermitirGuardarValorizacion = true;
                                    }
                                }

                                //Para el tipo "MATERIALES" se habilita lo siguiente
                                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales)
                                {
                                    if (swEsCotizacionValorizada && (!swReqCosteo || (swReqCosteo && swEsCotizacionCosteada))
                                        && NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                                    {
                                        ViewBag.PermitirExportarLiquidacion = true;
                                        ViewBag.PermitirImprimirCotizacion = true;

                                        ViewBag.PermitirReCotizacion = true;
                                        ViewBag.PermitirCancelarCot = true;

                                        ViewBag.PermitirAprobarCotizacion = true;
                                        ViewBag.PermitirEditarGanancia = true;
                                        ViewBag.PermitirEditarPorcentDscto = true;
                                        //ViewBag.PermitirVerPorcentDscto = true;
                                    }
                                }

                                //Para el tipo "REPUESTOS" se habilita lo siguiente
                                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles)
                                {
                                    if (swEsCotizacionValorizada)
                                    {
                                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                                        {
                                            ViewBag.PermitirExportarLiquidacion = true;
                                            ViewBag.PermitirImprimirCotizacion = true;

                                            ViewBag.PermitirReCotizacion = true;
                                            ViewBag.PermitirCancelarCot = true;

                                            ViewBag.PermitirAprobarCotizacion = true;
                                        }
                                    }
                                }

                                //Para el combinado de "SERVICIOS Y REPUESTOS" se habilita lo siguiente
                                if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                                {
                                    if (swEsCotizacionValorizada)
                                    {
                                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor ||
                                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                                            NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                                        {
                                            ViewBag.PermitirExportarLiquidacion = true;
                                            ViewBag.PermitirImprimirCotizacion = true;

                                            ViewBag.PermitirReCotizacion = true;
                                            ViewBag.PermitirCancelarCot = true;

                                            ViewBag.PermitirAprobarCotizacion = true;
                                        }
                                    }
                                }

                            }

                            //Para el tipo "SERVICIOS" se habilita lo siguiente
                            if (soli.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                            {
                                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                                {
                                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                                     NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                                    {
                                        ViewBag.PermitirExportarLiquidacion = true;
                                        ViewBag.PermitirImprimirCotizacion = true;

                                        ViewBag.PermitirReCotizacion = false;
                                        ViewBag.PermitirCancelarCot = true;

                                        ViewBag.PermitirAprobarCotizacion = true;
                                    }
                                }
                            }

                            //Se obtiene las actividades del DETALLE DE LA COTIZACION
                            var resCotDetAct = ventasBL.ObtenerCotDetActividades(new CotDetActividadDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                            var lstActividades = resCotDetAct.Result.ToList();

                            lstItems.ForEach(x =>
                            {

                                if (lstCostos != null)
                                { x.CotizacionCostos = lstCostos.Where(o => o.IdCotizacionDetalle == x.Id).ToArray(); }

                                if (lstActividades != null)
                                { x.CotizacionActividades = lstActividades.Where(o => o.IdCotizacionDetalle == x.Id).ToArray(); }

                                x.IsUpdated = false;

                            });

                            //Obteniendo datos faltantes de los ARTICULOS
                            lstItems = CompletarInfoCotDet(lstItems);

                            //Se vuelve a configurar la COTIZACION DETALLE por motivo del enlazado de los COSTOS y ACTIVIDADES
                            lstItems = configureCotDet(lstItems);

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

        private List<CotizacionDetalleDTO> configureCotDet(List<CotizacionDetalleDTO> lstItems)
        {
            if (lstItems == null) { return null; }

            var ventasBL = new VentasBL();
            var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");
            var oSolicitud = (SolicitudDTO)VariableSesion.getObject("SOLICITUD_VENTA");
            var resArticulos = ventasBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO() { CodsArticulo = string.Join(";", lstItems.Select(o => o.CodItem).ToArray()) });

            var lstItemsAux = new List<CotizacionDetalleDTO>();

            lstItems.ForEach(x =>
            {

                if (x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto ||
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    ArticuloDTO oArticulo = new ArticuloDTO();
                    if(resArticulos != null)
                    {
                        if (resArticulos.Result != null)
                        {
                            oArticulo = resArticulos.Result.FirstOrDefault(o => o.CodArticulo.Trim() == x.CodItem.Trim());
                            if (oArticulo != null) { x.DescUnidad = oArticulo.DescUnidad; }
                        }
                    }
                }

                var oItemAux = new CotizacionDetalleDTO();
                x.CopyProperties(ref oItemAux);
                oItemAux = configureCotDetItem(oItemAux);
                lstItemsAux.Add(oItemAux);

            });

            return lstItemsAux;
        }

        private CotizacionDetalleDTO configureCotDetItem(CotizacionDetalleDTO oItem)
        {
            if (oItem == null) { return null; }

            var ventasBL = new VentasBL();
            var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");
            var oSolicitud = (SolicitudDTO)VariableSesion.getObject("SOLICITUD_VENTA");
            var oCotizacion = (CotizacionDTO)VariableSesion.getObject("COTIZACION_VENTA");

            var swEsCotizacionValorizada = false;
            var swEsCotizacionCosteada = false;

            if (oCotizacion.IndValorizado.HasValue) { swEsCotizacionValorizada = oCotizacion.IndValorizado.Value; }
            if (oCotizacion.IndCosteado.HasValue) { swEsCotizacionCosteada = oCotizacion.IndCosteado.Value; }

            if (oItem.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio) { oItem.EsItemPadre = true; }

            var oPropCotDetItem = new PropertyControl();
            oPropCotDetItem.IsVisible = true;
            oPropCotDetItem.IsEnabled = true;

            List<PropertyControl> lstProp = new List<PropertyControl>();

            //Se configura los campos COTIZACION DETALLE
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.ID, IsVisible = true, IsEnabled = true, Nombre = "ID", Valor = oItem.Id.ToString() });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.Codigo, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlInfoGeneral_Codigo", Nombre = "CodItem", Valor = oItem.CodItem.ToString() });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.Descrip, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlInfoGeneral_Descripcion" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.DescripAdic, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlInfoGeneral_DescripcionAdic" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea, IsVisible = true, IsEnabled = true, IdControl = "DI_txtDescripcionAdic" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.IndStock, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlCostos_TieneStock" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.Cantidad, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlInfoGeneral_Cantidad" });

            //Se deshabilita PRECIOS DE VENTA en VALORIZACION
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.CostoFOB, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlCostos_CostoFOB" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.ValUni, IsVisible = true, IsEnabled = true, IdControl = "DI_pnlCostos_ValorUnitario" });

            //Se configura DESPACHO
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlInfoGeneral_Dimensiones" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetalle.Campo.PorcGanan, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Ganancia" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.CompraLocal, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_CompraLocal" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_ReqPlaca" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_GarantAdic" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_GarantAdic_Combo" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.ReqCliente, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_ReqCliente" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_ObsInsta" });

            //Se configura INDICADORES DE COSTO
            //lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.LLaveMano, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_LlaveMano" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Instalacion" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Capacitacion" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Manuales" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.Video, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Videos" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_MantPrevent" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Calibracion" });
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlCostos_Flete" });

            //Se configura BOTONES DE COSTO
            //lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Boton.Agregar, IsEnabled = true, IsVisible = true, IdControl = "DI_btnAgregarCosto" });
            //lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Boton.Editar, IsEnabled = true, IsVisible = true, IdControl = "DI_btnEditarCosto" });
            //lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Boton.EditarTAB, IsEnabled = true, IsVisible = true, IdControl = "CI_btnEditarCosto" });

            //Se configura GRILLAS DE COSTO
            lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Panel.Destinos, IsEnabled = true, IsVisible = true, IdControl = "DI_pnlDestinos" });
            //lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Grilla.GrillaCostos, IsEnabled = true, IsVisible = true, IdControl = "DI_tblCostos" });
            //lstProp.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Grilla.GrillaCostosTAB, IsEnabled = true, IsVisible = true, IdControl = "" });

            //En COTIZACION DETALLE se inicializa algunos campos por defecto
            lstProp.ForEach(pc =>
            {
                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ID) { pc.IsEnabled = false; }
                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Codigo) { pc.IsEnabled = false; }
                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; }
                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Descrip) { pc.IsEnabled = false; }
                if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsEnabled = false; }
                if (oItem.CotizacionDespacho != null)
                {
                    if (oItem.CotizacionDespacho.IndGarantiaAdicional.HasValue)
                    {
                        if (oItem.CotizacionDespacho.IndGarantiaAdicional.Value)
                        { if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsEnabled = true; } }
                    }
                }
            });

            //Deshabilitar campos por ESTADO DE SOLICITUD
            if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
            {
                lstProp.ForEach(pc =>
                {
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                    {
                        oPropCotDetItem.IsEditable = true; //Es MODIFICABLE
                        oPropCotDetItem.IsDeletable = true; //Es ELIMINABLE
                        //Solo se habilita si el código es modificable
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Codigo)
                        {
                            if (oItem.CodItem_IsUpdatable) { pc.IsEnabled = true; }
                        }

                        if(pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Descrip)
                        {
                            if (oItem.CodItem_IsUpdatable) { pc.IsEnabled = true; }    
                        }

                        //Se oculta los PRECIOS DE VENTA
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = false; pc.IsEnabled = false; }
                    }
                });
            }
            else if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
            {
                lstProp.ForEach(pc =>
                {
                    //Se configura los campos COTIZACION DETALLE
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Codigo) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Descrip) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.IndStock) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Cantidad) { pc.IsEnabled = false; }

                    //Se oculta los PRECIOS DE VENTA
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = false; pc.IsEnabled = false; }

                    //Se oculta los campos DESPACHO
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.CompraLocal) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqCliente) { pc.IsEnabled = false; }

                    //Se oculta los indicadores
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete) { pc.IsEnabled = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Panel.Destinos) { pc.IsEnabled = false; }

                });
            }
            else
            {
                lstProp.ForEach(pc =>
                {
                    //Se configura los campos COTIZACION DETALLE
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Codigo) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Descrip) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.IndStock) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.Cantidad) { pc.IsEnabled = false; }

                    //Se oculta los PRECIOS DE VENTA
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = false; pc.IsEnabled = false; }

                    //Se oculta los campos DESPACHO
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.CompraLocal) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqCliente) { pc.IsEnabled = false; }

                    //Se oculta los indicadores
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa) { pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete) { pc.IsEnabled = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Panel.Destinos) { pc.IsEnabled = false; }

                });
            }

            //Ocultar CAMPOS por TIPO DE SOLICITUD
            if (oSolicitud.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
            {
                //Se reconfigura MODAL para ACCESORIOS de equipos
                if(oItem.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    lstProp.ForEach(pc =>
                    {
                        //Se configura los campos COTIZACION DETALLE
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.IsVisible = false; pc.IsEnabled = false; }

                        //Se oculta los PRECIOS DE VENTA
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }

                        // Para ACCESORIOS está habilitado en VALOR UNITARIO solo si no es COMPRA LOCAL
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }

                        //Se oculta los campos DESPACHO
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqCliente) { pc.IsVisible = false; pc.IsEnabled = false; }

                        //Se oculta los indicadores
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa) { pc.IsVisible = false; pc.IsEnabled = false; }
                        if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete) { pc.IsVisible = false; pc.IsEnabled = false; }

                        if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Panel.Destinos) { pc.IsVisible = false; pc.IsEnabled = false; }

                    });
                }

                //VALORIZACION de EQUIPOS
                if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {
                    if (EsFlujoValorizacion())
                    {
                        lstProp.ForEach(pc =>
                        {
                            //Solo cuando se tiene INDICADOR STOCK se aplica esta lógica
                            //debido a que ACCESORIOS no tiene obligado a DEFINIR si tiene stock
                            if (oItem.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto)
                            {
                                var swTieneStock = false;
                                if (oItem.IndStock.HasValue)
                                { if (oItem.IndStock.Value) { swTieneStock = true; } }
                                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente)
                                {
                                    if (!swTieneStock)
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = true; pc.IsEnabled = true; }
                                    }
                                }
                                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
                                {
                                    if (!swTieneStock)
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = true; pc.IsEnabled = false; }
                                        if (!string.IsNullOrEmpty(oItem.CostoFOB))
                                            {
                                                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                                            }
                                        else
                                            {
                                                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = false; }
                                            }


                                    }
                                    else
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                                    }
                                }
                            }
                            else
                            {
                                var swTieneStock = false;
                                if (oItem.IndStock.HasValue)
                                {
                                    if (oItem.IndStock.Value) { swTieneStock = true; }
                                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente)
                                    {
                                        if (!swTieneStock)
                                        {
                                            if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = true; pc.IsEnabled = true; }
                                        }
                                        //Se muestra el campo VALOR UNITARIO ya que los ASESORES lo utilizan en los ACCESORIOS
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = false; }
                                    }
                                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
                                    {
                                        if (!swTieneStock)
                                        {
                                            if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = true; pc.IsEnabled = false; }
                                            if (!string.IsNullOrEmpty(oItem.CostoFOB))
                                                {
                                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                                                }
                                                else
                                                {
                                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = false; }
                                                }

                                        }
                                        else
                                        {
                                            if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                                        }
                                    }
                                }
                                else
                                {
                                    //Como no tiene INDICADOR STOCK quiere decir que es COMPRA LOCAL
                                    //Lo que el VALOR UNITARIO es ingresado por el ASESOR de VENTA
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = false; }
                                }
                            }
                        });
                    }
                    else
                    {
                        lstProp.ForEach(pc =>
                        {
                            if (oItem.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                            {
                                //Solo se muestra el VALOR UNITARIO del ACCESORIO
                                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }
                                if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = false; }
                            }
                        });
                    }
                }

                lstProp.ForEach(pc =>
                {
                    //EQUIPOS muestra DIMENSIONES, ESPECIFICACIONES, INDICADORES, OBS INSTALACION, DESTINOS
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsVisible = false; }

                    //Se devuelve a su tamaño actual
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.Nombre = "ROWS"; pc.Valor = "6"; }

                });

                //Se habilita la Margen Adicional cuando se haya VALORIZADO y/o COSTEADO por los INDICADORES
                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                {
                    //Se valida de forma temporal las configuraciones actuales de la COTIZACION DETALLE
                    var oItemTMP = new CotizacionDetalleDTO();
                    oItem.CopyProperties(ref oItemTMP);
                    oItemTMP.Features = new PropertyControl { SubPropiedades = lstProp.ToArray() };
                    if (oItem.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto)
                    {
                        if (EsCosteoRequerido(oItemTMP))
                        {
                            if (swEsCotizacionValorizada && swEsCotizacionCosteada)
                            {
                                lstProp.ForEach(pc =>
                                {
                                    if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = true; pc.IsVisible = true; }
                                    }
                                    else
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; pc.IsVisible = true; }
                                    }
                                });
                            }
                        }
                        else
                        {
                            if (swEsCotizacionValorizada)
                            {
                                lstProp.ForEach(pc =>
                                {
                                    if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = true; pc.IsVisible = true; }
                                    }
                                    else
                                    {
                                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; pc.IsVisible = true; }
                                    }
                                });
                            }
                        }
                    }
                }
            }
            else if (oSolicitud.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales)
            {
                //VALORIZACION de MATERIALES
                if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {
                    if (EsFlujoValorizacion())
                    {
                        lstProp.ForEach(pc =>
                        {
                            var swTieneStock = false;
                            if (oItem.IndStock.HasValue)
                            { if (oItem.IndStock.Value) { swTieneStock = true; } }
                            if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente)
                            {
                                if (!swTieneStock)
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = true; pc.IsEnabled = true; }
                                }
                            }
                            if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
                            {
                                if (!swTieneStock)
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = true; pc.IsEnabled = false; }
                                    if (!string.IsNullOrEmpty(oItem.CostoFOB))
                                    {
                                            if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                                     }
                                     else
                                     {
                                            if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = false; }
                                     }

                                }
                                else
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                                }
                            }
                        });
                    }
                }

                lstProp.ForEach(pc =>
                {
                    //Se disminuye su tamaño porque se oculto el campo DIMENSIONES que afecta el tamaño de la PANTALLA
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.Nombre = "ROWS"; pc.Valor = "4"; }

                    //MATERIALES oculta DIMENSIONES, ESPECIFICACIONES, INDICADORES, OBS INSTALACION, DESTINOS pero tiene FLETE
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.CompraLocal) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta) { pc.IsVisible = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa) { pc.IsVisible = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete) { pc.IsVisible = true; } //Se agrega FLETE para COSTO

                    if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Panel.Destinos) { pc.IsVisible = true; }

                });

                //Se habilita la Margen Adicional cuando se haya VALORIZADO y/o COSTEADO por los INDICADORES
                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                {
                    //Se valida de forma temporal las configuraciones actuales de la COTIZACION DETALLE
                    var oItemTMP = new CotizacionDetalleDTO();
                    oItem.CopyProperties(ref oItemTMP);
                    oItemTMP.Features = new PropertyControl { SubPropiedades = lstProp.ToArray() };
                    if (EsCosteoRequerido(oItemTMP))
                    {
                        if (swEsCotizacionValorizada && swEsCotizacionCosteada)
                        {
                            lstProp.ForEach(pc =>
                            {
                                if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = true; pc.IsVisible = true; }
                                }
                                else
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; pc.IsVisible = true; }
                                }
                            });
                        }
                    }
                    else
                    {
                        if (swEsCotizacionValorizada)
                        {
                            lstProp.ForEach(pc =>
                            {
                                if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = true; pc.IsVisible = true; }
                                }
                                else
                                {
                                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsEnabled = false; pc.IsVisible = true; }
                                }
                            });
                        }
                    }
                }
            }
            else if (oSolicitud.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles)
            {
                //REPUESTOS no tiene VALORIZACION de COSTO FOB

                lstProp.ForEach(pc =>
                {
                    //Se disminuye su tamaño porque se oculto el campo DIMENSIONES que afecta el tamaño de la PANTALLA
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.Nombre = "ROWS"; pc.Valor = "4"; }

                    //REPUESTOS oculta DIMENSIONES, ESPECIFICACIONES, INDICADORES, OBS INSTALACION, DESTINOS
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.CompraLocal) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta) { pc.IsVisible = false; pc.IsEnabled = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete) { pc.IsVisible = false; pc.IsEnabled = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Panel.Destinos) { pc.IsVisible = false; }

                    //Se oculta COSTO FOB para REPUESTOS
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }

                    //Se valida si ya no se usa el COSTO FOB debe habilitarse el VALOR UNITARIO
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
                    {
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                    }

                });

            }
            else if (oSolicitud.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
            {
                //REPUESTOS no tiene VALORIZACION de COSTO FOB

                lstProp.ForEach(pc =>
                {
                    //REPUESTOS no tiene VALORIZACION

                    //Se disminuye su tamaño porque se oculto el campo DIMENSIONES que afecta el tamaño de la PANTALLA
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.DescripAdic_Textarea) { pc.Nombre = "ROWS"; pc.Valor = "4"; }

                    //REPUESTOS oculta DIMENSIONES, ESPECIFICACIONES, INDICADORES, OBS INSTALACION, DESTINOS
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.Dimensiones) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.PorcGanan) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.CompraLocal) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ReqPlaca) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.GarantAdic_Combo) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.Campo.ObsInsta) { pc.IsVisible = false; pc.IsEnabled = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa) { pc.IsVisible = false; pc.IsEnabled = false; }
                    if (pc.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete) { pc.IsVisible = false; pc.IsEnabled = false; }

                    if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Panel.Destinos) { pc.IsVisible = false; }

                    //Se oculta COSTO FOB para REPUESTOS
                    if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB) { pc.IsVisible = false; pc.IsEnabled = false; }

                    //Se valida si ya no se usa el COSTO FOB debe habilitarse el VALOR UNITARIO
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
                    {
                        if (pc.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni) { pc.IsVisible = true; pc.IsEnabled = true; }
                    }

                });
            }

            if (oItem.CotizacionDespacho != null)
            {
                oItem.CotizacionDespacho.Features = new PropertyControl() { IsEnabled = oPropCotDetItem.IsEnabled, IsVisible = oPropCotDetItem.IsVisible };
            }

            if (oItem.CotizacionCostos != null)
            {
                oItem.CotizacionCostos.ForEach(o =>
                {
                    var oPropCostos = new PropertyControl();
                    oPropCostos.IsEnabled = oPropCotDetItem.IsEnabled;
                    oPropCostos.IsVisible = oPropCotDetItem.IsVisible;
                    o.Features = oPropCostos;
                });
            }

            if (oItem.CotizacionActividades != null)
            {
                oItem.CotizacionActividades.ForEach(o =>
                {
                    var oPropAct = new PropertyControl();
                    oPropAct.IsEnabled = oPropCotDetItem.IsEnabled;
                    oPropAct.IsVisible = oPropCotDetItem.IsVisible;
                    o.Features = oPropAct;
                });
            }

            //Se valida si hay 1 campo editable
            var lstAux = lstProp.Where(pc => pc.IsVisible && pc.IsEnabled).ToList();
            oPropCotDetItem.IsEnabled = lstAux.Any();

            //Se valida si se puede MODIFICAR o ELIMINAR el DETALLE
            if (oPropCotDetItem.IsEnabled)
            {
                if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                {
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                    {
                        oPropCotDetItem.IsEditable = true; //Es MODIFICABLE
                        oPropCotDetItem.IsDeletable = true; //Es ELIMINABLE
                    }
                }
                else if (oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                    {
                        oPropCotDetItem.IsEditable = true; //Es MODIFICABLE
                    }
                    else if (EsFlujoValorizacion())
                    {
                        oPropCotDetItem.IsEditable = true; //Es MODIFICABLE
                    }
                }
            }

            oPropCotDetItem.SubPropiedades = lstProp.ToArray();

            oItem.Features = oPropCotDetItem;

            //Se configura los registros de COSTOS del registro de COTIZACION DETALLE (No incluye los TABS)
            if (oItem.CotizacionCostos != null)
            {
                foreach (var oCosto in oItem.CotizacionCostos)
                {
                    var oPropCosto = new PropertyControl();
                    oPropCosto.IsEnabled = oItem.Features.IsEnabled;
                    oPropCosto.IsVisible = oItem.Features.IsVisible;
                    oPropCosto.IsDeletable = oItem.Features.IsDeletable;
                    oPropCosto.IsEditable = oItem.Features.IsEditable;
                    var lstPropCost = new List<PropertyControl>();
                    lstPropCost.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Campo.ID, IsEnabled = false, IsVisible = false, Nombre = "ID", Valor = oCosto.Id.ToString() });
                    lstPropCost.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetCosto.Campo.CantidadCosto, IsEnabled = true, IsVisible = true });

                    lstPropCost.ForEach(pc =>
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            if(oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                            {
                                if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Campo.CantidadCosto) { pc.IsEnabled = oItem.Features.IsEnabled; }
                            }
                            else
                            {
                                if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Campo.CantidadCosto) { pc.IsEnabled = false; }
                            }
                        }
                        else
                        {
                            if (pc.Tag == MultiFlujo.Tag.CotDetCosto.Campo.CantidadCosto) { pc.IsEnabled = false; }
                        }
                    });

                    oPropCosto.IsEnabled = lstPropCost.Any(pc => pc.IsVisible && pc.IsEnabled);
                    oPropCosto.SubPropiedades = lstPropCost.ToArray();
                    oCosto.Features = oPropCosto;
                }
            }

            //Se configura los registros de ACTIVIDADES del registro de COTIZACION DETALLE (No incluye los TABS)
            if (oItem.CotizacionActividades != null)
            {
                foreach (var oAct in oItem.CotizacionActividades)
                {
                    var oPropAct = new PropertyControl();
                    oPropAct.IsEnabled = oItem.Features.IsEnabled;
                    oPropAct.IsVisible = oItem.Features.IsVisible;
                    oPropAct.IsDeletable = oItem.Features.IsDeletable;
                    oPropAct.IsEditable = oItem.Features.IsEditable;
                    var lstPropAct = new List<PropertyControl>();
                    lstPropAct.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetActividad.Campo.ID, IsEnabled = false, IsVisible = false, Nombre = "ID", Valor = oAct.Id.ToString() });
                    lstPropAct.Add(new PropertyControl() { Tag = MultiFlujo.Tag.CotDetActividad.Campo.DescActividad, IsEnabled = true, IsVisible = true });

                    lstPropAct.ForEach(pc =>
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc ||
                        NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ)
                        {
                            if(oSolicitud.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                            {
                                if (pc.Tag == MultiFlujo.Tag.CotDetActividad.Campo.DescActividad) { pc.IsEnabled = oItem.Features.IsEnabled; }
                            }
                            else
                            {
                                if (pc.Tag == MultiFlujo.Tag.CotDetActividad.Campo.DescActividad) { pc.IsEnabled = false; }
                            }
                        }
                        else
                        {
                            if (pc.Tag == MultiFlujo.Tag.CotDetActividad.Campo.DescActividad) { pc.IsEnabled = false; }
                        }
                    });

                    oPropAct.IsEnabled = lstPropAct.Any(pc => pc.IsVisible && pc.IsEnabled);
                    oPropAct.SubPropiedades = lstPropAct.ToArray();
                    oAct.Features = oPropAct;
                }
            }

            return oItem;
        }

        private void AddModifyCDI(CotizacionDetalleDTO CotDet)
        {
            List<CotizacionDetalleDTO> lstItems = new List<CotizacionDetalleDTO>();
            if (VariableSesion.getObject(TAG_CDI) != null) { lstItems = (List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI); }

            if (lstItems.Any(x => x.NroItem == CotDet.NroItem && x.Id == CotDet.Id))
            {
                lstItems.ForEach(x =>
                {
                    var swEdit = false;

                    //Verifica si se modifica desde el buscador
                    if (x.NroItem == CotDet.NroItem && x.Id == CotDet.Id && CotDet.IsTempRecord && x.IsTempRecord)
                    { swEdit = true; }

                    //Verifica si se busca desde la grilla principal
                    if (x.NroItem == CotDet.NroItem && x.Id == CotDet.Id && !CotDet.IsTempRecord)
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
                        x.CotizacionActividades = CotDet.CotizacionActividades;
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

            var lstItemsAux = new List<CotizacionDetalleDTO>();
            foreach(CotizacionDetalleDTO oItem in lstItems)
            {
                var oItemAux = new CotizacionDetalleDTO();
                oItem.CopyProperties(ref oItemAux);
                configureCotDetItem(oItemAux);
                lstItemsAux.Add(oItemAux);
            }

            VariableSesion.setObject(TAG_CDI, lstItemsAux);
        }

        private List<CotizacionDetalleDTO> GetCotDetItems(string opcGrillaItems)
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
                if (respArt.Result != null)
                {
                    if (respArt.Result.Any(x => x.CodArticulo == CodItem))
                    { oArticulo = respArt.Result.First(x => x.CodArticulo.Trim() == CodItem.Trim()); }
                }
            }

            return oArticulo;
        }

        private CotizacionDetalleDTO findCotDetRecord(string CodItem, string opcGrillaItems)
        {

            var ventaBL = new VentasBL();
            CotizacionDetalleDTO itemCotDet = new CotizacionDetalleDTO();

            List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);

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

            List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

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
            if (lstItems == null) { return null; }

            var lstItems_Regularizados = new List<CotizacionDetalleDTO>();

            //Calular los TOTALES de la COTIZACION DETALLE y de sus COSTOS agregados
            foreach (CotizacionDetalleDTO item in lstItems)
            {
                if (item.EsItemPadre)
                {
                    item.CantSubItem = lstItems.Where(x => x.CodItem.Trim() != item.CodItem.Trim() && x.NroItem == item.NroItem).Count();
                    if (lstItems.Any(x => x.NroItem == item.NroItem && x.VentaUnitaria.HasValue))
                    {
                        item.VentaTotalSinIGV = lstItems.Where(x => x.NroItem == item.NroItem && x.VentaUnitaria.HasValue).Select(y => y.VentaUnitaria.Value * y.Cantidad).Sum();
                        if (item.CotizacionCostos != null)
                        {
                            decimal numSumaMontos = 0;
                            item.CotizacionCostos.ForEach(x =>
                            {
                                decimal numMontoTotal = 0;
                                decimal numMontoUnitario = 0;
                                if (x.MontoTotalCosto.HasValue) { numMontoTotal = x.MontoTotalCosto.Value; }
                                if (x.MontoUnitarioCosto.HasValue) { numMontoUnitario = x.MontoUnitarioCosto.Value; }
                                if (numMontoTotal > 0) { numSumaMontos += numMontoTotal; }
                                else
                                { if (x.CantidadCosto.HasValue) { numSumaMontos += (x.CantidadCosto.Value * numMontoUnitario); } }
                            });
                            item.VentaTotalSinIGV = item.VentaTotalSinIGV.Value + numSumaMontos;
                        }
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
                }
            }

            //Regularizar el NRO ITEM de la COTIZACION DETALLE
            var NroItemsActuales = lstItems.Select(x => x.NroItem).Distinct().OrderBy(y => y).ToList();
            var NroItem_Conteo = 1;

            for (int a = 0; a < NroItemsActuales.Count(); a++)
            {
                var lstItems_Actuales = lstItems.Where(x => x.NroItem == NroItemsActuales[a]).ToList();
                foreach (var oItemActual in lstItems_Actuales)
                {
                    var oItemNuevo = new CotizacionDetalleDTO();
                    oItemActual.CopyProperties(ref oItemNuevo);
                    oItemNuevo.NroItem = NroItem_Conteo;
                    lstItems_Regularizados.Add(oItemNuevo);
                }
                NroItem_Conteo++;
            }

            return lstItems_Regularizados;
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

        public JsonResult GrupoSolicitudVentaFiltro(int codFlujo, long codSolicitud, string rolUsuario)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.GrupoSolicitudVentaFiltro(codFlujo, codSolicitud, rolUsuario);
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

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

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
                                DescAlmacen = ConstantesDTO.Articulos.Text.Text_1,
                                IsTempRecord = true
                            };

                            if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.Equipos){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.Equipos; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_2; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.ReactivosLaboratorio){ newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.ReactivosLaboratorio; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_5; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.ArticulosLaboratorio){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.ArticulosLaboratorio; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_6; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.InstApaMedicina){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.InstApaMedicina; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_4; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.Medicon){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.Medicon; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_7; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.Repuestos){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.Repuestos; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_8; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.Locales){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.Locales; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_9; }
                            else if (filtro.CodsFamilia.Trim() == ConstantesDTO.Articulos.Familia.Accesorios){newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.Accesorios; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_3; }
                            else
                            {
                                if (filtro.CodsFamilia.IndexOf(ConstantesDTO.Articulos.Familia.Equipos.ToString()) != -1)
                                {
                                    newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.Equipos; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_2;
                                }
                                else if (filtro.CodsFamilia.IndexOf(ConstantesDTO.Articulos.Familia.ArticulosLaboratorio.ToString()) != -1)
                                {
                                    newRecord.CodFamilia = ConstantesDTO.Articulos.Familia.ArticulosLaboratorio; newRecord.DescFamilia = ConstantesDTO.Articulos.Text.Text_6;
                                }
                            }

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
                    item.Parametro == ConstantesDTO.DatosGenerales.CicloPreventivo.Anual ||
                    item.Parametro == ConstantesDTO.DatosGenerales.CicloPreventivo.Trimestral
                    )
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
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Instalacion); }
                if (oCDesp.IndCapacitacion.HasValue)
                {
                    if (!oCDesp.IndCapacitacion.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Capacitacion); }
                }
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Capacitacion); }
                if (oCDesp.IndInfoManual.HasValue)
                {
                    if (!oCDesp.IndInfoManual.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Manuales); }
                }
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Manuales); }
                if (oCDesp.IndInfoVideo.HasValue)
                {
                    if (!oCDesp.IndInfoVideo.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Videos); }
                }
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Videos); }
                if (oCDesp.IndMantPreventivo.HasValue)
                {
                    if (!oCDesp.IndMantPreventivo.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.MantPrevent); }
                }
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.MantPrevent); }
                if (oCDesp.IndCalibracion.HasValue)
                {
                    if (!oCDesp.IndCalibracion.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Calibracion); }
                }
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Calibracion); }
                if (oCDesp.IndFlete.HasValue)
                {
                    if (!oCDesp.IndFlete.Value)
                    { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Flete); }
                }
                else { lstDG = lstDG.Where(x => x.Parametro != ConstantesDTO.DatosGenerales.CostosEnvio.Flete); }
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

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);

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
                //var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                //x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                //Solo cargar los productos en pantalla incluyendo ACCESORIOS
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto || x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarCotDetServicios(string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);
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
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

                if (lstItems.Any(x => x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                { throw new Exception("Producto y/o Servicio ya fue selecionado"); }

                var servicio = servicioBL.GetFullService(CodItem).Result;

                //Registro Detalle
                var select = new CotizacionDetalleDTO();
                select.CodItem = CodItem;
                select.CodItemTemp = "";
                select.Descripcion = "Servicio:"+servicio.CabeceraServicio.TipoServicio.Trim()+", Equipo: "+servicio.CabeceraServicio.Equipo.Trim()+", Modelo:  "+servicio.CabeceraServicio.Modelo.Trim()+", Marca: "+servicio.CabeceraServicio.Marca.Trim();
                select.Stock = 0;
                select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio;
                select.EsItemPadre = true;
                select.IsTempRecord = true;
                select.CodItem_IsUpdatable = true;
                select.Cantidad = 0;
                select.VentaUnitaria = servicio.CabeceraServicio.Precio;
                select.VentaTotalSinIGV = 0;
                select.IsUpdated = true;

                if (lstItems.Any()) { select.NroItem = lstItems.Max(x => x.NroItem) + 1; }
                else { select.NroItem = 1; }

                if (select.Id <= 0) { 
					if (lstItems.Count() == 0) {
                        select.Id = select.NroItem * -1;
                    }
                    else
                    {
                        select.Id = lstItems.Min(x => x.Id) - 1; 
                    }
                }

                //Detalle del servicio:
                if (servicio.servicios != null)
                {
                    var lstActividades = new List<CotDetActividadDTO>();
                    var numcod = long.Parse(DateTime.Now.AddHours(-1).ToString("ddMMyyyyhhmmss"));
                    var num = -1;
                    servicio.servicios.ForEach(x =>
                    {
                        var oAct = new CotDetActividadDTO();
                        oAct.Id = num;
                        oAct.IdCotizacionDetalle = select.Id;
                        oAct.DescripcionActividad = x.DesMantenimiento;
                        oAct.CodigoActividad = "TMP_" + numcod.ToString();
                        lstActividades.Add(oAct);
                        oAct.IsUpdated = true;
                        numcod += 1;
                        num -= 1;
                    });
                    select.CotizacionActividades = lstActividades.ToArray();
                }

                AddModifyCDI(select);

                lstItems = GetCotDetItems(opcTablaTemporal);

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
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);
                var item = lstItems.FirstOrDefault(x => x.Id == datos.Id);

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

                lstItems = GetCotDetItems(opcGrillaItems);

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio).ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarDetServ(int IdCotDetalle, int IdActividad, string opcGrillaItems)
        {
            try
            {
                var servicioBL = new ServiciosBL();
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);
                var oCotDet = lstItems.FirstOrDefault(p => p.Id == IdCotDetalle);

                var oAct = oCotDet.CotizacionActividades.FirstOrDefault(p => p.Id == IdActividad);

                var response = new ResponseDTO<CotDetActividadDTO>(oAct);
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ActualizarDetServ(int IdCotDetalle, long CodServDet, string Descripcion, string opcGrillaItems)
        {
            try
            {
                var servicioBL = new ServiciosBL();
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);
                var oCotDet = lstItems.FirstOrDefault(p => p.Id == IdCotDetalle);

                var oAct = oCotDet.CotizacionActividades.FirstOrDefault(p => p.Id == CodServDet);
                oAct.DescripcionActividad = Descripcion;

                AddModifyCDI(oCotDet);

                var response = new ResponseDTO<IEnumerable<CotDetActividadDTO>>(oCotDet.CotizacionActividades.ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EliminarDetServicio(int IdCotDetalle, int IdActividad, string opcGrillaItems)
        {
            try
            {
                var servicioBL = new ServiciosBL();
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);
                var oCotDet = lstItems.FirstOrDefault(p => p.Id == IdCotDetalle);

                if (oCotDet.CotizacionActividades != null)
                {
                    oCotDet.CotizacionActividades = oCotDet.CotizacionActividades.Where(x => x.Id != IdActividad).ToArray();
                }

                AddModifyCDI(oCotDet);

                var response = new ResponseDTO<IEnumerable<CotDetActividadDTO>>(oCotDet.CotizacionActividades.ToList());
                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult RegistrarDetServ(int IdCotDetalle, string Descripcion, string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);
                var oCotDet = lstItems.FirstOrDefault(p => p.Id == IdCotDetalle);

                var lstActividades = new List<CotDetActividadDTO>();

                if (oCotDet.CotizacionActividades != null)
                { lstActividades = oCotDet.CotizacionActividades.ToList(); }

                var item = new CotDetActividadDTO()
                {
                    IdCotizacionDetalle = IdCotDetalle,
                    DescripcionActividad = Descripcion,
                    IsUpdated = true,
                    CodigoActividad = "TMP_" + DateTime.Now.ToString("ddMMyyyyhhmmss")
                };

                if (lstActividades.Any(o => o.Id < 0))
                { item.Id = lstActividades.Where(o => o.Id < 0).Select(x => x.Id).Min() - 1; }
                else
                { item.Id = -1; }

                lstActividades.Add(item);

                oCotDet.CotizacionActividades = lstActividades.ToArray();

                AddModifyCDI(oCotDet);

                var response = new ResponseDTO<IEnumerable<CotDetActividadDTO>>(oCotDet.CotizacionActividades.ToList());
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

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

                //Registro Detalle
                var select = new CotizacionDetalleDTO();
                if (lstItems.Any(x => x.Id < 0)) { select.Id = lstItems.Select(x => x.Id).Min() - 1; }
                else { select.Id = -1; }
                select.CodItem = oArticulo.CodArticulo;
                select.CodItemTemp = oArticulo.CodArticuloTemp;
                select.Descripcion = oArticulo.DescRealArticulo;
                select.Stock = oArticulo.StockDisponible;
                select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto;
                select.EsItemPadre = true;
                select.IsTempRecord = true;

                if (lstItems.Any()) { select.NroItem = lstItems.Max(x => x.NroItem) + 1; }
                else { select.NroItem = 1; }

                if (oArticulo.IsTempRecord)
                { select.CodItem_IsUpdatable = true; }

                if (oArticulo.CodFamilia != null)
                {
                    if (oArticulo.CodFamilia.Trim() == ConstantesDTO.Articulos.Familia.Accesorios.Trim())
                    {
                        select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio;
                        select.EsItemPadre = false;
                    }
                }

                //Se inicializan los COSTOS para cargar la GRILLA en pantalla
                if (select.CotizacionCostos == null)
                {
                    var lstCostos = new List<CotDetCostoDTO>();
                    select.CotizacionCostos = lstCostos.ToArray();
                }

                if (select.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    var lstItemsPadre = lstItems.Where(x => x.Select).ToList();
                    if (!lstItemsPadre.Any()) { throw new Exception("Para agregar un accesorio a la cotización deberá previamente seleccionar un producto para asociarlo. Favor de seleccionar un producto."); }
                    foreach (CotizacionDetalleDTO itemPadre in lstItemsPadre)
                    {
                        if (lstItems.Any(x => x.NroItem == itemPadre.NroItem && x.CodItem.TrimEnd() == CotizacionDetalle.CodItem.TrimEnd()))
                        { throw new Exception("Accesorio ya fue selecionado"); }
                        lstItems = GetCotDetItems(opcTablaTemporal);
                        if (lstItems.Any(x => x.Id < 0)) { select.Id = lstItems.Select(x => x.Id).Min() - 1; }
                        else { select.Id = -1; }
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

                if (select.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    if (oArticulo.StockDisponible > 0) { select.IndStock = true; }
                    else { select.IndStock = false; }
                }

                lstItems = GetCotDetItems(opcTablaTemporal);
                lstItems = CompletarInfoCotDet(lstItems);
                lstItems = TotalizarCotDet(lstItems);

                //Solo cargar los productos en pantalla
                //var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                //x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                //Solo cargar los productos en pantalla incluyendo los ACCESORIOS
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => 
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto || x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult SeleccionarRowCotDet(CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

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
                var oCotDetItem = new CotizacionDetalleDTO();

                if (opcGrillaItems == opcTablaTemporal)
                {
                    lstItems = GetCotDetItems(opcTablaTemporal);
                    var lstItems_2 = GetCotDetItems(opcTablaFinal);

                    oCotDetItem = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetalle.CodItem.Trim());
                    if (oCotDetItem.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != oCotDetItem.NroItem).ToList(); }
                    else
                    { lstItems = lstItems.Where(x => x.CodItem.Trim() != CotizacionDetalle.CodItem.Trim()).ToList(); }

                    lstItems = TotalizarCotDet(lstItems);

                    lstItems.AddRange(lstItems_2);
                    VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                    lstItems = GetCotDetItems(opcTablaTemporal);
                }

                if (opcGrillaItems == opcTablaFinal)
                {
                    lstItems = GetCotDetItems(opcTablaFinal);

                    oCotDetItem = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetalle.CodItem.Trim());
                    if (oCotDetItem.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != oCotDetItem.NroItem).ToList(); }
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
                    lstItems = GetCotDetItems(opcTablaFinal);
                }

                //var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.TipoItem == oCotDetItem.TipoItem &&
                //x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

                //Se mostrará los PRODUCTOS incluyendo los ACCESORIOS
                var lstCotDetItems = new List<CotizacionDetalleDTO>();
                if(oCotDetItem.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto ||
                    oCotDetItem.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    lstCotDetItems = lstItems.Where(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto ||
                    x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio).ToList();
                }
                else
                {
                    lstCotDetItems = lstItems.Where(x => x.TipoItem == oCotDetItem.TipoItem).ToList();
                }

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstCotDetItems);

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

                var lstItems = GetCotDetItems(opcTablaTemporal);

                //CotizacionDetalleDTO itemCotDet = findCotDetRecord(CotizacionDetalle.CodItem, opcGrillaItems);

                CotizacionDetalleDTO itemCotDet = lstItems.FirstOrDefault(x => x.Id == CotizacionDetalle.Id);

                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                if (opcGrillaItems == opcTablaTabs)
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

                itemCotDet = configureCotDetItem(itemCotDet);

                VariableSesion.setObject(TAG_CDCI_CotDetItem, lstCostos);

                List<CotDetCostoDTO> lstCostosBKP = new List<CotDetCostoDTO>();

                lstCostos.ForEach(x => {
                    var oItemBKP = new CotDetCostoDTO();
                    x.CopyProperties(ref oItemBKP);
                    lstCostosBKP.Add(oItemBKP);
                });

                VariableSesion.setObject(TAG_CDCI_CotDetItem_BKP, lstCostosBKP);

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerSubItems(CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

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
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);
                List<CotizacionDetalleDTO> lstItems_2 = GetCotDetItems(opcTablaFinal);

                var itemPadre = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetallePadre.CodItem.Trim());
                if (itemPadre != null)
                {
                    lstItems = lstItems.Where(x => x.NroItem != itemPadre.NroItem || (x.NroItem == itemPadre.NroItem && x.CodItem.Trim() != CotizacionDetalle.CodItem.Trim())).ToList();
                    lstItems.AddRange(lstItems_2);
                    lstItems = TotalizarCotDet(lstItems);
                    VariableSesion.setObject(TAG_CDI, lstItems);

                    //itemPadre.NroItem = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetallePadre.CodItem.Trim()).NroItem; // se reasigna el número de Item
                }
                lstItems = GetCotDetItems(opcTablaTemporal);
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.Id != itemPadre.Id && x.NroItem == itemPadre.NroItem));

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
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcGrillaItems);

                if (lstItems.Any(x => x.CodItem.Trim() == CotizacionDetalle.CodItemTemp.Trim() && CotizacionDetalle.CodItem_IsUpdatable))
                { throw new Exception("El código '" + CotizacionDetalle.CodItemTemp.Trim() + "' ya está siendo usado en la cotización"); }

                CotizacionDetalleDTO oCotDetItem = null;
                oCotDetItem = lstItems.FirstOrDefault(x => x.Id == CotizacionDetalle.Id);
                //if (string.IsNullOrEmpty(CotizacionDetallePadre.CodItem))
                //{
                //    //Se utiliza el código CodItemTemp porque el código del producto viene desde la caja de texto
                //    oCotDetItem = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetalle.CodItemTemp.Trim() && x.EsItemPadre == true);
                //    //Al no encontrarlo como ITEM PADRE lo buscamos como HIJO ya que este metodo lo usa los ACCESORIOS desde la grilla principal
                //    if (oCotDetItem == null)
                //    {
                //        oCotDetItem = lstItems.FirstOrDefault(x => x.Id == CotizacionDetalle.Id);
                //    }
                //}
                //else
                //{
                //    var oCotDetItemPadre = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotizacionDetallePadre.CodItem.Trim() && x.EsItemPadre == true);
                //    oCotDetItem = lstItems.FirstOrDefault(x => x.NroItem == oCotDetItemPadre.NroItem && x.CodItem.Trim() == CotizacionDetalle.CodItemTemp.Trim());
                //    if(oCotDetItem == null)
                //    {
                //        oCotDetItem = lstItems.FirstOrDefault(x => x.NroItem == oCotDetItemPadre.NroItem && x.CodItem.Trim() == CotizacionDetalle.CodItem.Trim());
                //    };
                //}

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
                    var cantCotizada = CotizacionDetalle.Cantidad; //Se obtiene la CANTIDAD COTIZADA en pantalla

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
                    if (indFlete && !oCotDetItem.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.DatosGenerales.CostosEnvio.Flete))
                    { swCompleto = false; }

                    if (oCotDetItem.CotizacionCostos.Any())
                    {
                        oCotDetItem.CotizacionCostos.Select(o => o.CodCosto).Distinct().ForEach(tipocosto =>
                        {
                            var cantTotalCosteada = oCotDetItem.CotizacionCostos.Where(x => x.CodCosto == tipocosto).Select(y => y.CantidadCosto).Sum();
                            if (tipocosto != ConstantesDTO.CotizacionDetalleCostos.Costos.LLaveMano)
                            {
                                if (cantCotizada != cantTotalCosteada)
                                { throw new Exception("No se ha completado la cantidad de costeo para el producto '" + oCotDetItem.Descripcion + "'."); }
                            }
                        });
                    }
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
                oCotDetItemAux.Descripcion = CotizacionDetalle.Descripcion;
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
                //var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                //x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto));

                //Solo cargar los productos en pantalla incluyendo los ACCESORIOS
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto || x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult GrabarDatosCotDet(CotizacionDetalleDTO cotizacionDetalle)
        {
            try
            {
                var ventaBL = new VentasBL();

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

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

                foreach (CotizacionDetalleDTO oItem in lstItems.Where(o => o.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio).ToList())
                {

                    //Se validará los campos de Costo FOB o Valor Unitario si son EDITABLES no estén vacíos
                    var swValidarCostoFOB = false;
                    var swValidarValorUni = false;
                    if (oItem.Features != null)
                    {
                        if (oItem.Features.SubPropiedades != null)
                        {
                            var oPropCostoFob = oItem.Features.SubPropiedades.FirstOrDefault(x => x.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB);
                            if (oPropCostoFob.IsVisible && oPropCostoFob.IsEnabled) { swValidarCostoFOB = true; }
                            var oPropValUni = oItem.Features.SubPropiedades.FirstOrDefault(x => x.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni);
                            if (oPropValUni.IsVisible && oPropValUni.IsEnabled) { swValidarValorUni = true; }
                        }
                    }

                    if (swValidarCostoFOB)
                    {
                        var swDatos = false;
                        if (!string.IsNullOrEmpty(oItem.CostoFOB)) { swDatos = true; } 

                        if (!swDatos) { throw new Exception("No se ha ingresado el COSTO FOB de '" + oItem.Descripcion + "'"); }
                    }

                    if(oItem.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                    {
                        //Para los PRODUCTOS se valida su VALOR UNITARIO
                        if (swValidarValorUni)
                        {
                            var swDatos = false;
                            if (oItem.VentaUnitaria.HasValue)
                            { if (oItem.VentaUnitaria.Value > 0) { swDatos = true; } }

                            if (!swDatos) { throw new Exception("No se ha ingresado el VALOR UNITARIO de '" + oItem.Descripcion + "'"); }
                        }
                    }
                    else
                    {
                        //Para los ACCESORIOS se valida su VALOR UNITARIO solo si son COMPRA LOCAL
                        if (oItem.CotizacionDespacho != null)
                        {
                            if (oItem.CotizacionDespacho.IndCompraLocal.HasValue)
                            {
                                if (oItem.CotizacionDespacho.IndCompraLocal.Value == true)
                                {
                                    if (swValidarValorUni)
                                    {
                                        var swDatos = false;
                                        if (oItem.VentaUnitaria.HasValue)
                                        { if (oItem.VentaUnitaria.Value > 0) { swDatos = true; } }

                                        if (!swDatos) { throw new Exception("No se ha ingresado el VALOR UNITARIO de '" + oItem.Descripcion + "'"); }
                                    }
                                }
                            }
                        }
                    }

                }

                //Se realiza lo siguiente:
                //1. Se totaliza el precio por cada registro de cotizacion detalle (Monto del Producto o Servicio más sus accesorios)
                //2. La Margen Adicional por registro de Cotizacion Detalle
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

                //if (cotizacionDetalle != null)
                //{ lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord && x.TipoItem == cotizacionDetalle.TipoItem).ToList(); }
                //else
                //{ lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord && x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio).ToList(); }

                //Se mostrará los PRODUCTOS incluyendo los ACCESORIOS
                if (cotizacionDetalle != null)
                {
                    if (cotizacionDetalle.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto ||
                        cotizacionDetalle.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                    {
                        lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord &&
                        (x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto || x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)).ToList();
                    }
                    else
                    {
                        lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord &&
                        (x.TipoItem == cotizacionDetalle.TipoItem)).ToList();
                    }
                }
                else
                { lstItems_1 = lstItems_1.Where(x => !x.IsTempRecord).ToList(); }

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems_1);

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CancelarCotDetItem(CotizacionDetalleDTO CotizacionDetalle)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaTemporal);

                CotizacionDetalleDTO CotDetItem = lstItems.FirstOrDefault(x => x.Id == CotizacionDetalle.Id);

                if (CotDetItem != null)
                {
                    if (VariableSesion.getObject(TAG_CDCI_CotDetItem_BKP) != null)
                    {
                        List<CotDetCostoDTO> lstCostosBKP = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_CotDetItem_BKP);
                        CotDetItem.CotizacionCostos = lstCostosBKP.ToArray();
                        AddModifyCDI(CotDetItem);
                    }
                }

                return Json(new ResponseDTO<CotizacionDetalleDTO>(CotDetItem));
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

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();
                var log = new FiltroWorkflowLogDTO();
                var numSol = VariableSesion.getCadena("numSol");

                var oResSolicitud = ventasBL.ObtenerSolicitudes(new SolicitudDTO { Id_Solicitud = int.Parse(numSol) });
                var oSolicitudActual = oResSolicitud.Result.First();

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaFinal);

                if (lstItems != null)
                {
                    var swProductos = lstItems.Any(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto && x.Cantidad > 0);
                    var swServicios = lstItems.Any(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio && x.Cantidad > 0);
                    if (oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                    {
                        if (!swServicios) { throw new Exception("La cotización no contiene servicios para la venta."); }
                    }
                    if (oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                    {
                        if (!swProductos) { throw new Exception("La cotización no contiene productos para la venta."); }
                    }
                    if(lstItems.Any(x => x.CotizacionCostos != null) && oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                    {
                        if (lstItems.Any(x => x.CotizacionCostos.Any(d => d.CodCosto == "CXCD0007") == true && !x.CotizacionCostos.Any(d => d.MontoUnitarioCosto != null)))
                        {
                            throw new Exception("Debe de ingresar el monto unitario del costo calibración de todos los productos ingresados");
                        }
                    }
                }
                else { throw new Exception("La cotización no contiene servicios o productos para la venta."); }

                ActualizarCotizacion(oCotizacion);

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
                        foreach (CotizacionDetalleDTO itemCD in lstCotDetAux)
                        {
                            if (itemCD.CotizacionDespacho != null)
                            {
                                var itemCDD = itemCD.CotizacionDespacho;
                                itemCDD.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Eliminar;
                                itemCDD.UsuarioRegistra = User.ObtenerUsuario();
                                itemCDD.FechaRegistro = DateTime.Now;
                                ventasBL.MantenimientoCotDetDespacho(itemCDD);
                            }
                            var resCotDetCos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacionDetalle = itemCD.Id });
                            if (resCotDetCos.Result != null)
                            {
                                var itemCDC = new CotDetCostoDTO();
                                itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Eliminar;
                                itemCDC.IdCotizacionDetalle = itemCD.Id;
                                itemCDC.UsuarioRegistra = User.ObtenerUsuario();
                                itemCDC.FechaRegistro = DateTime.Now;
                                ventasBL.MantenimientoCotDetCosto(itemCDC);
                            }
                            var resCotDetAct = ventasBL.ObtenerCotDetActividades(new CotDetActividadDTO() { IdCotizacionDetalle = itemCD.Id });
                            if (resCotDetAct.Result != null)
                            {
                                var itemCDA = new CotDetActividadDTO();
                                itemCDA.TipoProceso = ConstantesDTO.CotizacionDetalleActividad.TipoProceso.Eliminar;
                                itemCDA.IdCotizacionDetalle = itemCD.Id;
                                itemCDA.UsuarioRegistra = User.ObtenerUsuario();
                                itemCDA.FechaRegistro = DateTime.Now;
                                ventasBL.MantenimientoCotDetActividad(itemCDA);
                            }
                            itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Eliminar;
                            itemCD.UsuarioRegistra = User.ObtenerUsuario();
                            itemCD.FechaRegistro = DateTime.Now;
                            ventasBL.MantenimientoCotizacionDetalle(itemCD);
                        }
                    }
                }

                //Valida si tiene COSTO para LOGISTICA
                var swServicioTecnico = false;
                var swCostoLogistica = false;

                //Se graba el Detalle de la Cotización
                foreach (CotizacionDetalleDTO itemCD in lstItems)
                {
                    itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Insertar;
                    itemCD.IdCotizacion = oCotizacion.IdCotizacion;
                    itemCD.UsuarioRegistra = User.ObtenerUsuario();
                    itemCD.FechaRegistro = DateTime.Now;
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
                    if (itemCD.CotizacionCostos != null)
                    {
                        for (int a = 0; a < itemCD.CotizacionCostos.Length; a++)
                        {
                            var itemCDC = itemCD.CotizacionCostos[a];
                            itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                            itemCDC.IdCotizacionDetalle = resCD.Result.Codigo;
                            itemCDC.UsuarioRegistra = User.ObtenerUsuario();
                            itemCDC.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetCosto(itemCDC);
                        }
                        if (swServicioTecnico == false) { swServicioTecnico = itemCD.CotizacionCostos.Any(x => x.CodCosto != ConstantesDTO.CotizacionDetalleCostos.Costos.Flete && x.CodCosto != ConstantesDTO.CotizacionDetalleCostos.Costos.Calibra);}
                        if (swCostoLogistica == false) { swCostoLogistica = itemCD.CotizacionCostos.Any(x => x.CodCosto == ConstantesDTO.CotizacionDetalleCostos.Costos.Flete); }
                    }
                    if (itemCD.CotizacionActividades != null)
                    {
                        for (int a = 0; a < itemCD.CotizacionActividades.Length; a++)
                        {
                            var itemActividad = itemCD.CotizacionActividades[a];
                            itemActividad.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                            itemActividad.IdCotizacionDetalle = resCD.Result.Codigo;
                            itemActividad.UsuarioRegistra = User.ObtenerUsuario();
                            itemActividad.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetActividad(itemActividad);
                        }
                    }
                }

                var resSol = ventasBL.ObtenerSolicitudes(new SolicitudDTO { Id_Solicitud = int.Parse(numSol) });
                var oSolicitud = resSol.Result.First();

                if (oSolicitud.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles &&
                    oSolicitud.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                {
                    //Si NO TIENE STOCK se deberá solicitar su COSTO FOB
                    if (lstItems.Where(x => x.IndStock.HasValue).Any(y => !y.IndStock.Value))
                    { NotificarValorizacion_CostoFOB(oCotizacion.IdSolicitud); }

                    //Si TIENE STOCK se deberá solicitar el VALOR UNITARIO
                    if (lstItems.Where(x => x.IndStock.HasValue).Any(y => y.IndStock.Value))
                    { NotificarValorizacion_ValorUnitario(oCotizacion.IdSolicitud); }
                }
                else
                {
                    //Para los demás tipos de solicitud que no manejen COSTO FOB
                    //se deberá saltear al siguiente paso que es el VALOR UNITARIO
                    NotificarValorizacion_ValorUnitario(oCotizacion.IdSolicitud);
                }

                if (oSolicitud.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos)
                {
                    if (swServicioTecnico) { NotificarCosteoPendiente_ServicioTecnico(oCotizacion.IdSolicitud); }
                }

                if (oSolicitud.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles &&
                    oSolicitud.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos &&
                    oSolicitud.Tipo_Sol != ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio)
                {
                    if (swCostoLogistica) { NotificarCosteoPendiente_Logistica(oCotizacion.IdSolicitud); }
                }

                return Json(new { Status = 1, Mensaje = "Cotización Enviada correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        private bool EsCosteoRequerido(CotizacionDetalleDTO itemCD)
        {
            var swReqCosteo = false;
            var swCosteoHabilitado = false;
            if (itemCD.Features != null)
            {
                if (itemCD.Features.SubPropiedades != null)
                {
                    foreach (var oProp in itemCD.Features.SubPropiedades)
                    {
                        if ((oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Insta && oProp.IsVisible) ||
                            (oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Capa && oProp.IsVisible) ||
                            (oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Manual && oProp.IsVisible) ||
                            (oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Video && oProp.IsVisible) ||
                            (oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.MantPrevent && oProp.IsVisible) ||
                            (oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Calibra && oProp.IsVisible) ||
                            (oProp.Tag == MultiFlujo.Tag.CotDetDespacho.IndCosto.Flete && oProp.IsVisible))
                        {
                            swCosteoHabilitado = true;
                        }
                    }
                }
            }
            if (swCosteoHabilitado)
            {
                if (itemCD.CotizacionDespacho != null)
                {
                    if (itemCD.CotizacionDespacho.IndInstalacion.HasValue) { if (itemCD.CotizacionDespacho.IndInstalacion.Value) { swReqCosteo = true; } }
                    if (itemCD.CotizacionDespacho.IndCapacitacion.HasValue) { if (itemCD.CotizacionDespacho.IndCapacitacion.Value) { swReqCosteo = true; } }
                    if (itemCD.CotizacionDespacho.IndInfoManual.HasValue) { if (itemCD.CotizacionDespacho.IndInfoManual.Value) { swReqCosteo = true; } }
                    if (itemCD.CotizacionDespacho.IndInfoVideo.HasValue) { if (itemCD.CotizacionDespacho.IndInfoVideo.Value) { swReqCosteo = true; } }
                    if (itemCD.CotizacionDespacho.IndMantPreventivo.HasValue) { if (itemCD.CotizacionDespacho.IndMantPreventivo.Value) { swReqCosteo = true; } }
                    if (itemCD.CotizacionDespacho.IndCalibracion.HasValue) { if (itemCD.CotizacionDespacho.IndCalibracion.Value) { swReqCosteo = true; } }
                    if (itemCD.CotizacionDespacho.IndFlete.HasValue) { if (itemCD.CotizacionDespacho.IndFlete.Value) { swReqCosteo = true; } }
                }
            }
            return swReqCosteo;
        }

        [HttpPost]
        public JsonResult GuardarValorizacion(CotizacionDTO oCotizacion)
        {
            try
            {
                if (oCotizacion.IdCotizacion == 0) { throw new Exception("Cotización no registrada"); }

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();
                var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");
                var numSol = VariableSesion.getCadena("numSol");

                var oResSolicitud = ventasBL.ObtenerSolicitudes(new SolicitudDTO { Id_Solicitud = int.Parse(numSol) });
                var oSolicitudActual = oResSolicitud.Result.First();

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaFinal);

                if (lstItems != null)
                {
                    var swProductos = lstItems.Any(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto && x.Cantidad > 0);
                    var swServicios = lstItems.Any(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio && x.Cantidad > 0);
                    if (oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                    {
                        if (!swServicios) { throw new Exception("La cotización no contiene servicios para la venta."); }
                    }
                    if (oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles ||
                        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                    {
                        if (!swProductos) { throw new Exception("La cotización no contiene productos para la venta."); }
                    }
                }
                else { throw new Exception("La cotización no contiene servicios o productos para la venta."); }

                foreach (CotizacionDetalleDTO oItem in lstItems.Where(o => o.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio).ToList())
                {

                    //Se validará los campos de Costo FOB o Valor Unitario si son EDITABLES no estén vacíos
                    var swValidarCostoFOB = false;
                    var swValidarValorUni = false;
                    if (oItem.Features != null)
                    {
                        if (oItem.Features.SubPropiedades != null)
                        {
                            var oPropCostoFob = oItem.Features.SubPropiedades.FirstOrDefault(x => x.Tag == MultiFlujo.Tag.CotDetalle.Campo.CostoFOB);
                            if (oPropCostoFob.IsVisible && oPropCostoFob.IsEnabled) { swValidarCostoFOB = true; }
                            var oPropValUni = oItem.Features.SubPropiedades.FirstOrDefault(x => x.Tag == MultiFlujo.Tag.CotDetalle.Campo.ValUni);
                            if (oPropValUni.IsVisible && oPropValUni.IsEnabled) { swValidarValorUni = true; }
                        }
                    }

                    //if (swValidarCostoFOB)
                    //{
                    //    var swDatos = false;
                    //     if (!string.IsNullOrEmpty(oItem.CostoFOB)) { swDatos = true; } 

                    //    if (!swDatos) { throw new Exception("No se ha ingresado el COSTO FOB de '" + oItem.Descripcion + "'"); }
                    //}

                    if (swValidarValorUni)
                    {
                        var swDatos = false;
                        if (oItem.VentaUnitaria.HasValue)
                        { if (oItem.VentaUnitaria.Value > 0) { swDatos = true; } }

                        if (!swDatos) { throw new Exception("No se ha ingresado el VALOR UNITARIO de '" + oItem.Descripcion + "'"); }
                    }

                }

                ActualizarCotizacion(oCotizacion);

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

                //Se valida si se necesita que este COSTEADO para enviar CORREO
                var swReqCosteo = false;
                foreach (CotizacionDetalleDTO itemCD in lstItems)
                {
                    if (EsCosteoRequerido(itemCD) == true && swReqCosteo == false) { swReqCosteo = true; }
                }

                if (NombreRol != ConstantesDTO.WorkflowRol.Venta.Asesor
                    && NombreRol != ConstantesDTO.WorkflowRol.Venta.CoordServ
                    && NombreRol != ConstantesDTO.WorkflowRol.Venta.CoordAtc)
                {
                    //Cuando se valoriza el COSTO FOB se notificará al ASESOR DE COSTOS
                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente)
                    {
                        NotificarValorizacion_ValorUnitario(cotActualDTO.IdSolicitud);
                    }
                    else
                    {
                        if (swReqCosteo)
                        {
                            if (swValorizado && swCosteado)
                            { NotificarCotizacionValorizada(cotActualDTO.IdSolicitud); }
                        }
                        else
                        {
                            if (swValorizado)
                            { NotificarCotizacionValorizada(cotActualDTO.IdSolicitud); }
                        }
                    }
                }

                if (cotActualDTO.IndDsctoRequiereAprob.HasValue)
                {
                    if (cotActualDTO.IndDsctoRequiereAprob.Value)
                    {
                        if (cotActualDTO.IndDsctoAprob.HasValue == false)
                        {
                            NotificarDescuentoPendienteAprobacion(cotActualDTO.IdSolicitud);
                        }
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

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaFinal);

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

                var resCotDetCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { IdCotizacion = IdCotizacion });
                var lstCostos = resCotDetCostos.Result.ToList();

                var resCotDetActividades = ventasBL.ObtenerCotDetActividades(new CotDetActividadDTO() { IdCotizacion = IdCotizacion });
                var lstActividades = resCotDetActividades.Result.ToList();

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
                cotizacionDTO.PorcentajeDescuento = null;
                cotizacionDTO.IndDsctoRequiereAprob = null;
                cotizacionDTO.IndDsctoAprob = null;
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
                    itemCD.PorcentajeGanancia = null;
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
                    if (lstCostos != null)
                    {
                        var arrCostosxCD = lstCostos.Where(x => x.IdCotizacionDetalle == itemCD.Id).ToArray();
                        for (int a = 0; a < arrCostosxCD.Length; a++)
                        {
                            var itemCDC = arrCostosxCD[a];
                            itemCDC.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                            itemCDC.IdCotizacionDetalle = resCD.Result.Codigo;
                            itemCDC.MontoTotalCosto = null;
                            itemCDC.MontoUnitarioCosto = null;
                            itemCDC.UsuarioRegistra = User.ObtenerUsuario();
                            itemCDC.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetCosto(itemCDC);
                        }
                    }
                    if (lstActividades != null)
                    {
                        var arrActividades = lstActividades.Where(x => x.IdCotizacionDetalle == itemCD.Id).ToArray();
                        for (int b = 0; b < arrActividades.Length; b++)
                        {
                            var itemActividad = arrActividades[b];
                            itemActividad.TipoProceso = ConstantesDTO.CotizacionDetalleActividad.TipoProceso.Insertar;
                            itemActividad.IdCotizacionDetalle = resCD.Result.Codigo;
                            itemActividad.UsuarioRegistra = User.ObtenerUsuario();
                            itemActividad.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetActividad(itemActividad);
                        }
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

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();

                List<CotizacionDetalleDTO> lstItems = GetCotDetItems(opcTablaFinal);
                var numSol = VariableSesion.getCadena("numSol");

                var oResSolicitud = ventasBL.ObtenerSolicitudes(new SolicitudDTO { Id_Solicitud = int.Parse(numSol) });
                var oSolicitudActual = oResSolicitud.Result.First();

                //if (lstItems != null)
                //{
                //    var swProductos = lstItems.Any(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto && x.Cantidad > 0);
                //    var swServicios = lstItems.Any(x => x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Servicio && x.Cantidad > 0);
                //    if (oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.Servicio ||
                //        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                //    {
                //        if (!swServicios) { throw new Exception("La cotización no contiene servicios para la venta."); }
                //    }
                //    if (oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaEquipos ||
                //        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.VentaMateriales ||
                //        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.RepuestosoConsumibles ||
                //        oSolicitudActual.Tipo_Sol == ConstantesDTO.SolicitudVenta.TipoSolicitud.ServiciosyRepuestos)
                //    {
                //        if (!swProductos) { throw new Exception("La cotización no contiene productos para la venta."); }
                //    }
                //}
                //else { throw new Exception("La cotización no contiene servicios o productos para la venta."); }

                ActualizarCotizacion(oCotizacion);

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
                            var resCotDetAct = ventasBL.ObtenerCotDetActividades(new CotDetActividadDTO() { IdCotizacionDetalle = itemCD.Id });
                            if (resCotDetAct.Result != null)
                            {
                                var itemActividad = new CotDetActividadDTO();
                                itemActividad.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Eliminar;
                                itemActividad.UsuarioRegistra = User.ObtenerUsuario();
                                itemActividad.FechaRegistro = DateTime.Now;
                                itemActividad.IdCotizacionDetalle = itemCD.Id;
                                ventasBL.MantenimientoCotDetActividad(itemActividad);
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
                    if (itemCD.CotizacionActividades != null)
                    {
                        for (int a = 0; a < itemCD.CotizacionActividades.Length; a++)
                        {
                            var itemActividad = itemCD.CotizacionActividades[a];
                            itemActividad.TipoProceso = ConstantesDTO.CotizacionDetalleDespacho.TipoProceso.Insertar;
                            itemActividad.IdCotizacionDetalle = itemCD.Id;
                            itemActividad.UsuarioRegistra = User.ObtenerUsuario();
                            itemActividad.FechaRegistro = DateTime.Now;
                            var resCDC = ventasBL.MantenimientoCotDetActividad(itemActividad);
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
            var lstItems = GetCotDetItems(opcTablaTemporal);

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
            var lstItems = GetCotDetItems(opcTablaTemporal);
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

            var lstItems = GetCotDetItems(opcTablaFinal);

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

                var lstItems = GetCotDetItems(opcGrilla);
                CotizacionDetalleDTO itemCotDet = new CotizacionDetalleDTO();

                //Si la grilla es de tabla final trabaja con el listado de SESSION de los TABS
                if (opcGrilla == opcTablaTabs)
                {
                    if (VariableSesion.getObject(TAG_CDCI_Tabs) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_Tabs); }
                    lstItems = GetCotDetItems(opcTablaFinal);
                    itemCotDet = lstItems.FirstOrDefault(x => x.Id == CostoItem.IdCotizacionDetalle);
                }
                else
                {
                    if (VariableSesion.getObject(TAG_CDCI_CotDetItem) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI_CotDetItem); }

                    itemCotDet = lstItems.FirstOrDefault(x => x.Id == CostoItem.IdCotizacionDetalle);
                    itemCotDet.Cantidad = CostoItem.CantidadCotizada;

                    var cantAgregada = lstCostos.Where(o => o.CantidadCosto.HasValue && o.Id != CostoItem.Id && o.CodCosto == CostoItem.CodCosto).
                        Select(x => x.CantidadCosto.Value).Sum();

                    if (cantAgregada + CostoItem.CantidadCosto.Value > itemCotDet.Cantidad)
                    { throw new Exception("La cantidad total que se está costeando no puede ser mayor a la cotizada"); }

                }

                var ventasBL = new VentasBL();
                if (CostoItem.Id == 0) { CostoItem.Id = (lstCostos.Count() + 1) * -1; }

                CostoItem.UsuarioRegistra = User.ObtenerUsuario();
                if (CostoItem.Id > 0)
                {
                    CostoItem.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Modificar;
                    var oCostoAux = lstCostos.FirstOrDefault(x => x.Id == CostoItem.Id);
                    if (oCostoAux != null) { CostoItem.NumSecuencia = oCostoAux.NumSecuencia; }
                }
                else
                {
                    if(lstCostos.Where(x => x.CodCosto == CostoItem.CodCosto).Any())
                    { CostoItem.NumSecuencia = lstCostos.Where(x => x.CodCosto == CostoItem.CodCosto).Select(y => y.NumSecuencia).Max() + 1; }
                    else
                    { CostoItem.NumSecuencia = 1; }
                    CostoItem.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Insertar;
                }

                if (opcGrilla == opcTablaTabs)
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
                    itemCotDet.IsUpdated = true;

                    AddModifyCDI(itemCotDet);

                    VariableSesion.setObject(TAG_CDCI_CotDetItem, lstCostos);

                }

                //Solo se devuelve los costos de la grilla respectiva
                if (opcGrilla == opcTablaTabs)
                {
                    var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.CodCosto == CostoItem.CodCosto));
                    return Json(response);
                }
                else
                {
                    var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.IdCotizacionDetalle == CostoItem.IdCotizacionDetalle));
                    return Json(response);
                }
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
                    var lstItems = GetCotDetItems(opcTablaTemporal);
                    var itemCD = lstItems.FirstOrDefault(x => x.Id == oCosto.IdCotizacionDetalle);

                    lstCostos = lstCostos.Where(x => x.Id != cotdetCosto.Id).ToList();
                    itemCD.CotizacionCostos = lstCostos.ToArray();
                    itemCD.IsUpdated = true;
                    AddModifyCDI(itemCD);

                    VariableSesion.setObject(TAG_CDCI_CotDetItem, lstCostos);

                }

                //Solo se devuelve los costos de la grilla respectiva
                if(opcGrilla == opcTablaFinal)
                {
                    var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.CodCosto == oCosto.CodCosto));
                    return Json(response);
                }
                else
                {
                    var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.IdCotizacionDetalle == oCosto.IdCotizacionDetalle));
                    return Json(response);
                }
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarDatosCostoItem(CotDetCostoDTO cotdetCosto, string opcGrilla)
        {
            List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();
            if (opcGrilla == opcTablaTabs)
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
                var lstItems = GetCotDetItems(opcTablaTemporal);
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

            var lstItemsActuales = GetCotDetItems(opcTablaFinal);
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
            (x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto || x.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)));

            return Json(response);
        }

        [HttpPost]
        public JsonResult DeshacerCambiosSERTemporales()
        {

            var lstItemsActuales = GetCotDetItems(opcTablaFinal);
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
                if (!cot.IndDsctoAprob.Value) { 
                    oCotizacion.PorcentajeDescuento = null;
                    NotificarDescuentoDesaprobado(oCotizacion.IdSolicitud);
                }
                else
                {
                    NotificarDescuentoAprobado(oCotizacion.IdSolicitud);
                }
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

        public JsonResult GestionLogistica(DatosDespachoDTO datosDespachoDTO)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                CCLog Log = new CCLog();
                datosDespachoDTO.Tipo = "P";
                datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);

                result.Codigo = envio_log.Result.Codigo;
                result.Mensaje = envio_log.Result.Mensaje;
                //if (envio_log.Result.Codigo > 0)
                //{

                //    if(envio_log.Result.Codigo > 1) //Si la atención de logistica cambia a venta programada:
                //    {
                //        //Envio de correo:
                //        var filtros = new FiltroPlantillaDTO();
                //        filtros.CodigoProceso = 1;
                //        if(datosDespachoDTO.Stock == "S")
                //        {
                //            filtros.CodigoPlantilla = "PLANATLOCS";
                //        }
                //        else if(datosDespachoDTO.Stock == "N")
                //        {
                //            filtros.CodigoPlantilla = "PLANATLOSS";
                //        }

                //        filtros.Usuario = User.ObtenerUsuario();
                //        filtros.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                //        var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                //        var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                //        if (respuesta != "OK")
                //        {
                //            Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta);

                //            result.Codigo = 0;
                //            result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                //        }
                //        else
                //        {
                //            #region Envio Correo Servicio Tecnico
                //            if (datosDespachoDTO.EstadoAprobacion == "TSOL05" && envio_log.Result.Codigo == 3) //Solo para equipos y con instalacion:
                //            {
                //                //Envio de correo:
                //                var filtros2 = new FiltroPlantillaDTO();
                //                filtros2.CodigoProceso = 1;
                //                if (datosDespachoDTO.Stock == "S")
                //                {
                //                    filtros2.CodigoPlantilla = "PLANSSERCS";
                //                }
                //                else if(datosDespachoDTO.Stock == "N")
                //                {
                //                    filtros2.CodigoPlantilla = "PLANSSERSS";
                //                }

                //                filtros2.Usuario = User.ObtenerUsuario();
                //                filtros2.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                //                var datos_correo2 = plantillasBL.ConsultarPlantillaCorreo(filtros2).Result;
                //                var respuesta2 = Utilidades.Send(datos_correo2.To, datos_correo2.CC, "", datos_correo2.Subject, datos_correo2.Body, null, "");
                //                if (respuesta2 != "OK")
                //                {
                //                    Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta2);
                //                }
                //                else
                //                {
                //                    Log.TraceInfo("Envio exitoso de correo de series a servicio tecnico de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString());
                //                }
                //            }
                //            #endregion
                //        }
                //    }

                //    result.Codigo = 1;
                //    result.Mensaje = "Se realizó el envio de la Gestión de Logística de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();

                //}
                //else
                //{
                //    Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                //    result.Codigo = 0;
                //    result.Mensaje = "No se pudo realizar la atención de logistica de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                //}
            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        public JsonResult ObservacionGerencia(DatosDespachoDTO datosDespachoDTO)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                CCLog Log = new CCLog();
                datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);
                if (envio_log.Result.Codigo > 0)
                {
                    //Envio de correo:
                    var filtros = new FiltroPlantillaDTO();
                    filtros.CodigoProceso = 1;
                    filtros.CodigoPlantilla = "PLANOBSVTA";
                    filtros.Usuario = User.ObtenerUsuario();
                    filtros.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                    var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                    var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                    if (respuesta != "OK")
                    {
                        Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta);

                        result.Codigo = 0;
                        result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                    }
                    else
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de la observación de gerencia de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                    }
                    
                }
                else
                {
                    Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + envio_log.Result.Mensaje);
                    result.Codigo = 0;
                    result.Mensaje = "No se pudo enviar el correo de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                }
            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
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
            datos.UsuarioRegistra = User.ObtenerUsuario();

            //VALIDA SI EXISTE REGISTRO DE SERIE:
            var datosDespachoDTO = new DatosDespachoDTO();
            datosDespachoDTO.Tipo = "S";
            datosDespachoDTO.Stock = datos.Tipo;
            datosDespachoDTO.NumeroOrden = datos.NumeroSerie;
            datosDespachoDTO.CodigoSolicitud = datos.codDetalleDespacho;
            datosDespachoDTO.Observacion = datos.Series;
            datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
            datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
            var valida_series = ventasBL.MantenimientoDespacho(datosDespachoDTO);

            if(valida_series.Result.Codigo > 0)
            {
                if (datos.FlagCarga > 0)
                {
                    // Convertir el string Base64 a un arreglo de bytes
                    byte[] archivoBytes = Convert.FromBase64String(datos.Archivo);

                    var correlativo = DateTime.Now.ToString("yyyyMMddHHmmss");
                    string ruta_temporal = ConfigurationManager.AppSettings.Get("tempFiles");
                    string UploadSize = ConfigurationManager.AppSettings.Get("UploadSize");
                    string folder = DateTime.Now.ToString("yyyyMM");
                    string rutafinal = ruta_temporal + folder;
                    string nombre = "VENT" + correlativo;
                    string rutaDocumento = folder + "\\" + nombre + "." + datos.Extension;
                    string rutaArchivo = rutafinal + "\\" + nombre + "." + datos.Extension;

                    bool exists = System.IO.Directory.Exists(rutafinal);

                    if (!exists)
                        System.IO.Directory.CreateDirectory(rutafinal);

                    // Guardar el archivo en la ruta especificada:
                    System.IO.File.WriteAllBytes(rutaArchivo, archivoBytes);

                    var documentosBL = new DocumentosBL();
                    var documentoDTO = new DocumentoDTO();
                    documentoDTO.Accion = "I";
                    documentoDTO.NombreUsuario = User.ObtenerNombresCompletos();
                    documentoDTO.NombrePerfil = User.ObtenerPerfil();
                    documentoDTO.UsuarioRegistra = User.ObtenerUsuario();
                    documentoDTO.CodigoDocumento = 0;
                    documentoDTO.CodigoWorkFlow = datos.CodigoWorkFlow;
                    documentoDTO.CodigoTipoDocumento = "DVT08"; //Guia de Remision
                    documentoDTO.NombreDocumento = datos.NombreArchivo;
                    documentoDTO.VerDocumento = true;
                    documentoDTO.RutaDocumento = rutaDocumento;
                    documentoDTO.Eliminado = 0;
                    var doc = documentosBL.MantenimientoDocumentos(documentoDTO);
                    datos.RutaDocumento = rutaDocumento;
                    datos.CodigoDocumento = doc.Result.Codigo;
                }

                var response = ventasBL.ActualizarNumeroSerie(datos);
                return Json(response);
            }
            else
            {
                return Json(valida_series);
            }
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
                    if ((doc.CodigoTipoDocumento == "DVT07" || doc.CodigoTipoDocumento == "DVT05") && doc.Eliminado == 0) //Solo documentos de tipo Guia de pedidos y manuscrita:
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

                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, "X", 1, 2, 1, User.ObtenerUsuario());
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
                    if (doc.CodigoTipoDocumento == "DVT06" && doc.Eliminado == 0) //Solo documentos de tipo Guia de BO:
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
        public JsonResult EnviarGestionVentaConStock(DatosDespachoDTO datosDespachoDTO)
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

                   // var datosDespachoDTO = new DatosDespachoDTO();
                    datosDespachoDTO.Tipo = "X";
                    datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                    datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                    datosDespachoDTO.Stock = "S";
                   // datosDespachoDTO.CodigoSolicitud = codigoSolicitud;
                   // datosDespachoDTO.CodigoWorkFlow = codigoWorkFlow;
                    var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);

                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de la gestión de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                        #region Envio Correo Servicio Tecnico
                        if(datosDespachoDTO.TipoVenta == "TSOL05" && envio_log.Result.Codigo == 2) //Solo para equipos y con instalación:
                        {
                            //Envio de correo:
                            var filtros2 = new FiltroPlantillaDTO();
                            filtros2.CodigoProceso = 1;
                            filtros2.CodigoPlantilla = "PLANSSERCS";
                            filtros2.Usuario = User.ObtenerUsuario();
                            filtros2.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                            var datos_correo2 = plantillasBL.ConsultarPlantillaCorreo(filtros2).Result;
                            var respuesta2 = Utilidades.Send(datos_correo2.To, datos_correo2.CC, "", datos_correo2.Subject, datos_correo2.Body, null, "");
                            if (respuesta2 != "OK")
                            {
                                Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta2);
                            }
                            else
                            {
                                Log.TraceInfo("Envio exitoso de correo de series a servicio tecnico de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString());
                            }
                        }
                       
                        #endregion



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
        public JsonResult EnviarGestionVentaSinStock(DatosDespachoDTO datosDespachoDTO)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();
            try
            {
                var plantillasBL = new PlantillasBL();
                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 1;
                filtros.CodigoPlantilla = "PLANATLOSS";
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

                   // var datosDespachoDTO = new DatosDespachoDTO();
                    datosDespachoDTO.Tipo = "X";
                    datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                    datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                    datosDespachoDTO.Stock = "N";
                    var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);

                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de la gestión de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString();
                        #region Envio Correo Servicio Tecnico
                        if (datosDespachoDTO.TipoVenta == "TSOL05" && envio_log.Result.Codigo == 2) //Solo para equipos y con instalacion:
                        {
                            //Envio de correo:
                            var filtros2 = new FiltroPlantillaDTO();
                            filtros2.CodigoProceso = 1;
                            filtros2.CodigoPlantilla = "PLANSSERSS";
                            filtros2.Usuario = User.ObtenerUsuario();
                            filtros2.Codigo = Convert.ToInt32(datosDespachoDTO.CodigoSolicitud);

                            var datos_correo2 = plantillasBL.ConsultarPlantillaCorreo(filtros2).Result;
                            var respuesta2 = Utilidades.Send(datos_correo2.To, datos_correo2.CC, "", datos_correo2.Subject, datos_correo2.Body, null, "");
                            if (respuesta2 != "OK")
                            {
                                Log.TraceInfo("Solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString() + ":" + respuesta2);
                            }
                            else
                            {
                                Log.TraceInfo("Envio exitoso de correo de series a servicio tecnico de la solicitud N° " + datosDespachoDTO.CodigoSolicitud.ToString());
                            }
                        }
                        
                        #endregion

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


                    result.Codigo = 1;
                    result.Mensaje = "Se realizó correo al servicio tecnico de la solicitud N° " + codigoSolicitud.ToString();


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
        public JsonResult EnviarAprobacionImportacion(long codigoSolicitud, long codigoWorkFlow)
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
                    
                    var datosDespachoDTO = new DatosDespachoDTO();
                    datosDespachoDTO.Tipo = "A";
                    datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                    datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                    datosDespachoDTO.CodigoSolicitud = codigoSolicitud;
                    datosDespachoDTO.CodigoWorkFlow = codigoWorkFlow;
                    var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);
                    if (envio_log.Result.Codigo > 0)
                    {
                        result.Codigo = 1;
                        result.Mensaje = "Se realizó el envio de importación de la solicitud N° " + codigoSolicitud.ToString();

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

        private void NotificarDescuentoPendienteAprobacion(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo a Gerente
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.DsctoPendienteAprob;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);
            datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo para Gerente de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }

        }

        private void NotificarDescuentoAprobado(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo a Usuario
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.DsctoAprobado;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);
            datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo para Gerente de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }

        }

        private void NotificarDescuentoDesaprobado(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo a Usuario
            filtros.CodigoProceso = ConstantesDTO.Procesos.Ventas.ID;
            filtros.CodigoPlantilla = ConstantesDTO.Plantillas.Ventas.DsctoDesaprobado;
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = Convert.ToInt32(codigoSolicitud);
            datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            if (respuesta != "OK")
            {
                CCLog Log = new CCLog();
                Log.TraceInfo("Solicitud N° " + codigoSolicitud.ToString() + ":" + respuesta);
                result.Codigo = 0;
                result.Mensaje = "No se pudo enviar el correo para Gerente de la solicitud N° " + codigoSolicitud.ToString();
                //throw new Exception(respuesta);
            }

        }

        [HttpPost]
        public JsonResult GenerarHojaLiquidacion(CotizacionDTO cotizacionDTO)
        {
            var tipoSol = VariableSesion.getCadena("tipoSol");


            var ventasBL = new VentasBL();
            var datosCabeceraCotizacion = ventasBL.ObtenerCotizacionVenta(cotizacionDTO).Result.First();

            var detalle_datos = new CotizacionDetalleDTO();
            detalle_datos.IdCotizacion = cotizacionDTO.IdCotizacion;
            //var datosDetalleCotizacion = ventasBL.ObtenerCotizacionVentaDetalle(detalle_datos).Result;
            var datosDetalleCotizacion = GetCotDetItems(opcTablaFinal);

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
            cell1.SetCellValue("N° Solicitud:");

            cell1 = row1.CreateCell(cellnum1++);
            var numero = "000000" + datosCabeceraCotizacion.IdSolicitud.ToString();
            numero = numero.Substring(numero.Length - 6);
            cell1.SetCellValue(numero);
            //cell1.SetCellValue("PC-"+num);

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
            cell4.SetCellValue("Garantía:");

            cell4 = row4.CreateCell(cellnum4++);
            cell4.SetCellValue(cotizacionDTO.DescGarantia);

            cell4 = row4.CreateCell(3);
            cell4.SetCellValue("Forma de Pago:");

            cell4 = row4.CreateCell(4);
            cell4.SetCellValue(cotizacionDTO.DescFormaPago);

            cell4 = row4.CreateCell(6);
            cell4.SetCellValue("Moneda:");

            cell4 = row4.CreateCell(7);
            cell4.SetCellValue(cotizacionDTO.DescMoneda);

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

            //cell = row.CreateCell(cellnum++);
            //cell.CellStyle = style;
            //cell.SetCellValue("Stock Disponible");

            //Se controla para solicitudes de tipo servicio
            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio)
            {
                cell = row.CreateCell(cellnum++);
                cell.CellStyle = style;
                cell.SetCellValue("Unidad de Medida");
            }
            
            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Cantidad");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Valor Venta Total Sin IGV");

            //Se controla para solicitudes de tipo servicio/repuesto/comestibles
            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.ServiciosYRepuestos && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.RepuestosOComestibles)
            {
                cell = row.CreateCell(cellnum++);
                cell.CellStyle = style;
                cell.SetCellValue("Margen Adicional(%)");

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = style;
                cell.SetCellValue("Valor Venta Total Sin IGV (Con Margen Adicional)");
            }

            //// Impresión de la data
            foreach (var item in datosDetalleCotizacion)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NroItem.ToString());


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodItem);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Descripcion);

                //cell = row.CreateCell(cellnum++);
                //if (item.Stock.HasValue)
                //{
                //    cell.SetCellValue(item.Stock.ToString());
                //}

                if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio)
                {
                    cell = row.CreateCell(cellnum++);
                    cell.SetCellValue(item.CodUnidad);
                }

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cantidad.ToString());

                var ventaTotalSinIgv = "";
                if (item.VentaTotalSinIGVDscto.HasValue)
                {
                    ventaTotalSinIgv = item.VentaTotalSinIGVDscto.Value.ToString("0.00");
                    
                }
                else
                {
                    if (item.VentaTotalSinIGV.HasValue)
                    {
                        ventaTotalSinIgv = item.VentaTotalSinIGV.Value.ToString("0.00");
                    }
                }

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(ventaTotalSinIgv);

                if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.ServiciosYRepuestos && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.RepuestosOComestibles)
                {

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

            //cell5 = row5.CreateCell(cellnum5++);
            //cell5.SetCellValue("");
            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio)
            {
                cell5 = row5.CreateCell(cellnum5++);
                cell5.SetCellValue("");
            }

            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.ServiciosYRepuestos && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.RepuestosOComestibles)
            {
                cell5 = row5.CreateCell(cellnum5++);
                cell5.SetCellValue("");

                cell5 = row5.CreateCell(cellnum5++);
                cell5.SetCellValue("");
            }

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

            //cell6 = row6.CreateCell(cellnum6++);
            //cell6.SetCellValue("");


            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio)
            {
                cell6 = row6.CreateCell(cellnum6++);
                cell6.SetCellValue("");
            }

            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.ServiciosYRepuestos && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.RepuestosOComestibles)
            {
                cell6 = row6.CreateCell(cellnum6++);
                cell6.SetCellValue("");

                cell6 = row6.CreateCell(cellnum6++);
                cell6.SetCellValue("");
            }

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

            //cell7 = row7.CreateCell(cellnum7++);
            //cell7.SetCellValue("");


            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio)
            {
                cell7 = row7.CreateCell(cellnum7++);
                cell7.SetCellValue("");
            }

            if (tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.Servicio && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.ServiciosYRepuestos && tipoSol != ConstantesDTO.DatosGenerales.TipoSolicitud.Valor1.RepuestosOComestibles)
            {
                cell7 = row7.CreateCell(cellnum7++);
                cell7.SetCellValue("");

                cell7 = row7.CreateCell(cellnum7++);
                cell7.SetCellValue("");
            }

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

        [HttpPost]
        public JsonResult CargarCotDetItemServicio(string CodItem, string opcGrillaItems)
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