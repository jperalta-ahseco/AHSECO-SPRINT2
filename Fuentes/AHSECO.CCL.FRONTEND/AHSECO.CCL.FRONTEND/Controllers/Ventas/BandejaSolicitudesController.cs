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
using static AHSECO.CCL.COMUN.ConstantesDTO;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.Util;
using System.IdentityModel.Claims;

namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaSolicitudesVentasController : Controller
    {

        const string TAG_ConceptosVenta = "ConceptosVenta";
        const string TAG_CDI = "CDItems";
        const string TAG_CDCI = "CostoItems";

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

            ViewBag.MostrarCDI_Valorizacion = true;
            ViewBag.EsCotizacionValorizada = false;

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
            ViewBag.PermitirCancelarCot = true;
            ViewBag.PermitirRegistroCotizacion = true;
            ViewBag.PermitirEditarCotizacion = true; //Se bloquea los campos de cabecera de cotización
            ViewBag.PermitirAgregarCotDet = false;
            ViewBag.PermitirEnvioCotizacion = false;
            ViewBag.PermitirReCotizacion = false;
            ViewBag.PermitirGuardarValorizacion = false;
            ViewBag.PermitirAgregarServicios = false;
            ViewBag.PermitirImprimirCotizacion = false;
            ViewBag.MostrarCDI_Ganancia = false;
            ViewBag.PermitirEditarInfoVenta = true;

            ViewBag.PermitirTabDetCot = true;
            ViewBag.PermitirTabInsta = false;
            ViewBag.PermitirTabMantPrevent = false;
            ViewBag.PermitirTabLLaveMano = false;
            ViewBag.PermitirTabManuales = false;
            ViewBag.PermitirTabVideos = false;
            ViewBag.PermitirTabGarantiaAdic = false;
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

            if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Gerente || NombreRol == ConstantesDTO.WorkflowRol.Venta.Costos)
            {
                ViewBag.MostrarCDI_Valorizacion = true;
            }
            else
            {
                ViewBag.MostrarCDI_Valorizacion = false;
            }

            if (ViewBag.MostrarCDI_Valorizacion == true)
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

                if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordServ
                    || NombreRol == ConstantesDTO.WorkflowRol.Venta.CoordAtc)
                {

                    if(soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                    {
                        ViewBag.PermitirImprimirCotizacion = true;
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

                                ViewBag.VerNavSinStock = true;
                                ViewBag.InActiveSinStock = "in active";
                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.Btn_EnviarGuia = "inline-block";
                                ViewBag.Btn_GuiaPedido = "inline-block";
                                ViewBag.VerNavConStock = true;
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
                        ViewBag.Btn_FinalizarVenta = "inline-block";
                        ViewBag.VerGestionLogistica = true;

                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;

                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;

                            }
                        }

                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                    {
                        ViewBag.PermitirCancelarCot = false;
                        ViewBag.VerGestionLogistica = true;
                        if (validarDespacho.Result != null)
                        {
                            if (validarDespacho.Result.ContadorSinStock > 0 && validarDespacho.Result.EnvioGPSinStock > 0)
                            {
                                ViewBag.VerNavSinStock = true;

                            }
                            if (validarDespacho.Result.ContadorConStock > 0 && validarDespacho.Result.EnvioGPConStock > 0)
                            {
                                ViewBag.VerNavConStock = true;

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

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion)
                {
                    if (ViewBag.MostrarCDI_Valorizacion == false)
                    {
                        if(soli.Tipo_Sol == "TSOL01" || soli.Tipo_Sol == "TSOL03")
                        {
                            ViewBag.PermitirAgregarServicios = true;
                        }

                        if(soli.Tipo_Sol == "TSOL02" || soli.Tipo_Sol == "TSOL03" || soli.Tipo_Sol == "TSOL04" || soli.Tipo_Sol == "TSOL05")
                        {
                            ViewBag.PermitirAgregarCotDet = true;
                        }

                        
                        ViewBag.PermitirEnvioCotizacion = true;
                    }
                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                {
                    ViewBag.VerGestionVenta = true;
                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {

                    if (ViewBag.MostrarCDI_Valorizacion == true)
                    {
                        ViewBag.PermitirEditarInfoVenta = false;
                    }

                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.ServTecnico)
                    {
                        ViewBag.PermitirTabInsta = true;
                        ViewBag.PermitirTabMantPrevent = true;
                        ViewBag.PermitirTabLLaveMano = true;
                        ViewBag.PermitirTabManuales = true;
                        ViewBag.PermitirTabVideos = true;
                        ViewBag.PermitirTabGarantiaAdic = true;
                    }

                    //if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                    //{
                    //    ViewBag.PermitirTabCalib = true;
                    //    ViewBag.PermitirTabFlete = true;
                    //}

                    if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Logistica)
                    {
                        ViewBag.PermitirTabFlete = true;
                    }

                    //Se quita los botones de acción para el asesor ya que se envio a valorizar la cotización
                    if (ViewBag.MostrarCDI_Valorizacion == false)
                    {
                        string[] arrCotDetCols = ViewBag.CabeceraCotDet;
                        int indexToRemove = arrCotDetCols.Length - 1;
                        ViewBag.CabeceraCotDet = arrCotDetCols.Where((source, index) => index != indexToRemove).ToArray();
                    }

                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                {
                    ViewBag.VerGestionVenta = true;
                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                {
                    ViewBag.PermitirEditarCotizacion = false;
                    ViewBag.PermitirRegistroCotizacion = false;
                    ViewBag.PermitirCancelarCot = false;
                }

                var rptaCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO()
                {
                    IdSolicitud = int.Parse(numSol),
                    Estado = ConstantesDTO.CotizacionVenta.Estados.Activo
                });

                if (rptaCotizacion.Result.Any())
                {

                    ViewBag.MostrarCotizacionDetalle = true;
                    ViewBag.PermitirRegistroCotizacion = false;
                    ViewBag.PermitirEditarCotizacion = false;

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

                    //Solo se puede recotizar la venta si se ingresó los costos de venta de cada item seleccionado para la cotización
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                    {
                        if (oCotizacion.IndValorizado.HasValue)
                        {
                            if (oCotizacion.IndValorizado.Value) { ViewBag.EsCotizacionValorizada = true; }
                        }

                    }

                    if (ViewBag.EsCotizacionValorizada == true)
                    {
                        if (NombreRol == ConstantesDTO.WorkflowRol.Venta.Asesor)
                        {
                            ViewBag.PermitirReCotizacion = true;
                            ViewBag.MostrarCDI_Ganancia = true;
                        }
                    }
                    else
                    {
                        if (ViewBag.MostrarCDI_Valorizacion == true)
                        {
                            ViewBag.PermitirGuardarValorizacion = true;
                        }
                    }

                    var resCotDet = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                    if (resCotDet.Result != null)
                    {
                        if (resCotDet.Result.Any())
                        {

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
                        if (x.Id == 0) { x.Id = x.Id; }
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
                lstItems.Add(CotDet);
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
                cotizacionDTO.FecCotizacion = DateTime.Now;
                cotizacionDTO.Estado = ConstantesDTO.CotizacionVenta.Estados.Activo;
                cotizacionDTO.UsuarioRegistra = User.ObtenerUsuario(); cotizacionDTO.FechaRegistro = DateTime.Now;
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
                var rpta = dgBL.Obtener(new DatosGeneralesDetalleDTO() { Dominio = "RAZSOCIAL" });
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

                if (rpta.Result.Any())
                {
                    foreach (ProcesoEstadoDTO item in rpta.Result)
                    {
                        if (item.Habilitado)
                        { lstEstados.Add(new ComboDTO() { Id = item.CodigoEstado, Text = item.NombreEstado }); }
                    }
                }

                return Json(new { Status = 1, EstadosSolicitud = lstEstados });
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
        public JsonResult ObtenerTipoCostos()
        {
            var dgBL = new DatosGeneralesBL();
            var lstDG = dgBL.Obtener(new DatosGeneralesDetalleDTO() { DatosGenerales = new DatosGeneralesDTO { Dominio = ConstantesDTO.DatosGenerales.Dominios.CostoEnvio } });
            var lst = new List<ComboDTO>();
            foreach (DatosGeneralesDetalleDTO item in lstDG.Result)
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
        public JsonResult ListarCotDetItems(string opcGrillaItems)
        {
            try
            {
                var ventaBL = new VentasBL();

                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);

                lstItems.ForEach(x =>
                {
                    if(x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                    {
                        x.EsItemPadre = true;
                    }
                    else
                    {
                        x.EsItemPadre = false;
                    }
                });

                lstItems = CompletarInfoCotDet(lstItems);

                lstItems.ForEach(x =>
                {
                    AddModifyCDI(x);
                });

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

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

                var servicioDto = new ServicioDTO();
                servicioDto.CodigoServicio = Convert.ToInt32(CodItem);

                var servicio = servicioBL.ObtenerServicios(servicioDto).Result.First();

                //Registro Detalle
                var select = new CotizacionDetalleDTO();
                select.CodItem = CodItem;
                select.CodItemTemp = "";
                select.Descripcion = "Servicio:"+servicio.TipoServicio.Trim()+", Equipo: "+servicio.Equipo.Trim()+", Modelo:  "+servicio.Modelo.Trim();
                select.Stock = 0;
                select.TipoItem = ConstantesDTO.CotizacionVentaDetalle.TipoItem.Producto;
                select.EsItemPadre = true;
                select.IsTempRecord = true;
                select.CodItem_IsUpdatable = true;
                select.Cantidad = 0;
                select.VentaUnitaria = servicio.Precio;
                select.VentaTotalSinIGV = 0;

                if (lstItems.Any()) { select.NroItem = lstItems.Max(x => x.NroItem) + 1; }
                else { select.NroItem = 1; }

                if (lstItems.Any(x => x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                { throw new Exception("Producto y/o Servicio ya fue selecionado"); }
                if (select.Id <= 0) { select.Id = select.NroItem * -1; }

                lstItems.Add(select);
                VariableSesion.setObject(TAG_CDI, lstItems);

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems);

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult AgregarItemCotDet(string CodItem)
        {
            try
            {
                var ventaBL = new VentasBL();
                var oArticulo = findSaleItemRecord(CodItem);

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

                VariableSesion.setObject(TAG_CDCI, lstCostos);

                //Se agregan los costos de la cotizacion detalle
                select.CotizacionCostos = lstCostos.ToArray();

                if (select.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    var lstItemsPadre = lstItems.Where(x => x.Select).ToList();
                    if (!lstItemsPadre.Any()) { throw new Exception("Para agregar un accesorio a la cotización deberá previamente seleccionar un producto para asociarlo. Favor de seleccionar un producto."); }
                    foreach (CotizacionDetalleDTO itemPadre in lstItemsPadre)
                    {
                        if (lstItems.Any(x => x.NroItem == itemPadre.NroItem && x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                        { throw new Exception("Accesorio ya fue selecionado"); }
                        CotizacionDetalleDTO item = select;
                        item.NroItem = itemPadre.NroItem;
                        //if (item.Id <= 0) { item.Id = item.NroItem * -1; }
                        AddModifyCDI(item);
                    }
                }
                else
                {
                    if (lstItems.Any()) { select.NroItem = lstItems.Max(x => x.NroItem) + 1; }
                    else { select.NroItem = 1; }
                    if (lstItems.Any(x => x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                    { throw new Exception("Producto y/o Servicio ya fue selecionado"); }
                    //if (select.Id <= 0) { select.Id = select.NroItem * -1; }
                    AddModifyCDI(select);
                }

                lstItems = GetCDIList(opcTablaTemporal);
                lstItems = CompletarInfoCotDet(lstItems);

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult SeleccionarRowCotDet(string CodigoItem)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                foreach (CotizacionDetalleDTO item in lstItems)
                {
                    if (item.CodItem.TrimEnd() == CodigoItem.TrimEnd()) {
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
        public JsonResult QuitarItemCotDet(string CodItem, string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = new List<CotizacionDetalleDTO>();

                if (opcGrillaItems == opcTablaTemporal)
                {
                    lstItems = GetCDIList(opcTablaTemporal);
                    var lstItems_2 = GetCDIList(opcTablaFinal);

                    var itemArticulo = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItem.Trim());
                    if (itemArticulo.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != itemArticulo.NroItem).ToList(); }
                    else
                    { lstItems = lstItems.Where(x => x.CodItem.Trim() != CodItem.Trim()).ToList(); }

                    lstItems.AddRange(lstItems_2);
                    VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                    lstItems = GetCDIList(opcTablaTemporal);
                }

                if (opcGrillaItems == opcTablaFinal)
                {
                    lstItems = GetCDIList(opcTablaFinal);

                    var itemArticulo = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItem.Trim());
                    if (itemArticulo.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != itemArticulo.NroItem).ToList(); }
                    else
                    { lstItems = lstItems.Where(x => x.CodItem.Trim() != CodItem.Trim()).ToList(); }

                    var lstItems_2 = new List<CotizacionDetalleDTO>();
                    lstItems.ForEach(x =>
                    {
                        var oItem = new CotizacionDetalleDTO();
                        x.CopyProperties(ref oItem);
                        oItem.IsTempRecord = true;
                        lstItems_2.Add(oItem);
                    });

                    lstItems.AddRange(lstItems_2);
                    VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                    lstItems = GetCDIList(opcTablaFinal);
                }

                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems);

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EditarItemCotDet(string CodItem, string opcGrillaItems)
        {
            try
            {
                var ventasBL = new VentasBL();

                CotizacionDetalleDTO itemCotDet = findCotDetRecord(CodItem, opcGrillaItems);
                
                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                if(opcGrillaItems == opcTablaFinal)
                {
                    //Se carga todos los costos
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { CotizacionDetalle = new CotizacionDetalleDTO() { Id = itemCotDet.Id } });
                    lstCostos = resCostos.Result.ToList();
                }
                else
                {
                    if (VariableSesion.getObject(TAG_CDCI) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI); }
                }

                //Se completa los datos de cotizacion detalle para costos
                lstCostos.ForEach(x =>
                {
                    var cditemAux = new CotizacionDetalleDTO();
                    itemCotDet.CopyProperties(ref cditemAux);
                    if (cditemAux != null) { x.CotizacionDetalle = cditemAux; }
                });

                VariableSesion.setObject(TAG_CDCI, lstCostos);

                //Se agregan los costos de la cotizacion detalle
                itemCotDet.CotizacionCostos = lstCostos.ToArray();

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerSubItems(string CodItemPadre)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);

                List<CotizacionDetalleDTO> lstSubItems = new List<CotizacionDetalleDTO>();

                if (lstItems.Any())
                {
                    var oItemPadre = lstItems.FirstOrDefault(x => x.CodItem.TrimEnd() == CodItemPadre.TrimEnd());
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
        public JsonResult QuitarSubItemCotDet(string CodItemPadre, string CodItem)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcTablaTemporal);
                List<CotizacionDetalleDTO> lstItems_2 = GetCDIList(opcTablaFinal);

                var itemPadre = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItemPadre.Trim());
                if (itemPadre != null)
                {
                    lstItems = lstItems.Where(x => x.NroItem == itemPadre.NroItem && x.CodItem.Trim() != CodItem.Trim()).ToList();
                    lstItems.AddRange(lstItems_2);
                    lstItems = TotalizarCotDet(lstItems);
                    VariableSesion.setObject(TAG_CDI, lstItems);
                }
                lstItems = GetCDIList(opcTablaTemporal);
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x =>
                x.CodItem.Trim() != CodItemPadre.Trim() && x.NroItem == itemPadre.NroItem));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EditarSubItemCotDet(string CodItemPadre, string CodItem)
        {
            try
            {
                var ventaBL = new VentasBL();

                CotizacionDetalleDTO itemCotDet = findSubCotDetRecord(CodItemPadre, CodItem);

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult GrabarDatosCotDetItem(string CodItemPadre, CotizacionDetalleDTO CotDet, string opcGrillaItems)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList(opcGrillaItems);

                if (lstItems.Any(x => x.CodItem.Trim() == CotDet.CodItemTemp.Trim() && CotDet.CodItem_IsUpdatable))
                {
                    throw new Exception("El código '" + CotDet.CodItemTemp.Trim() + "' ya está siendo usado en la cotización");
                }

                CotizacionDetalleDTO oItem = null;
                if (string.IsNullOrEmpty(CodItemPadre))
                {
                    oItem = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CotDet.CodItem.Trim() && x.EsItemPadre == true);
                }
                else
                {
                    var oItemPadre = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItemPadre.Trim() && x.EsItemPadre == true);
                    oItem = lstItems.FirstOrDefault(x => x.NroItem == oItemPadre.NroItem && x.CodItem == CotDet.CodItem);
                }

                var oItemAux = new CotizacionDetalleDTO();
                oItem.CopyProperties(ref oItemAux);

                oItemAux.CodItem = CotDet.CodItemTemp;
                oItemAux.CodItemTemp = CotDet.CodItemTemp;
                oItemAux.CodItem_IsUpdatable = false;
                oItemAux.DescripcionAdicional = CotDet.DescripcionAdicional;
                oItemAux.Cantidad = CotDet.Cantidad;
                oItemAux.CostoFOB = CotDet.CostoFOB;
                oItemAux.VentaUnitaria = CotDet.VentaUnitaria;
                oItemAux.PorcentajeGanancia = CotDet.PorcentajeGanancia;
                oItemAux.IndStock = CotDet.IndStock;
                if (CotDet.CotizacionDespacho != null)
                {
                    if (oItemAux.CotizacionDespacho == null) { oItemAux.CotizacionDespacho = new CotDetDespachoDTO(); }
                    var oCotDetDespAux = oItemAux.CotizacionDespacho;
                    CotDet.CotizacionDespacho.CopyProperties(ref oCotDetDespAux);
                    oItemAux.CotizacionDespacho = oCotDetDespAux;
                }

                if (VariableSesion.getObject(TAG_CDCI) != null) { oItemAux.CotizacionCostos = ((List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI)).ToArray(); }

                AddModifyCDI(oItemAux);

                lstItems = TotalizarCotDet(lstItems);
                lstItems = CompletarInfoCotDet(lstItems);

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

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
                    }
                }
            }
            return lstItems;
        }

        [HttpPost]
        public JsonResult GrabarDatosCotDet()
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

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems_1.Where(x => !x.IsTempRecord && x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EnviarCotizacion(int IdCotizacion, int IdWorkFlow)
        {
            try
            {
                if (IdCotizacion == 0) { throw new Exception("Cotización no registrada"); }

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

                var resCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = IdCotizacion });
                CotizacionDTO cotizacionDTO = resCotizacion.Result.ToList().First();

                var log = new FiltroWorkflowLogDTO();

                //Se registra el workflow para Valorización
                log.CodigoWorkflow = IdWorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesoBL.InsertarWorkflowLog(log);

                //Se cambia el estado a En Valorización
                ventasBL.ActualizarSolicitudEstado(new SolicitudDTO()
                {
                    Id_Solicitud = cotizacionDTO.IdSolicitud,
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
                ViewBag.IdCotizacion = cotizacionDTO.IdCotizacion;

                //Se elimina los datos actuales para solo grabar lo que está en pantalla
                var resCotDetAux = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = cotizacionDTO.IdCotizacion });
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
                    itemCD.IdCotizacion = cotizacionDTO.IdCotizacion;
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

                //NotificarValorizacionPendiente(cotizacionDTO.IdSolicitud);

                return Json(new { Status = 1, Mensaje = "Cotización Enviada correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult GuardarValorizacion(int IdCotizacion)
        {
            try
            {
                if (IdCotizacion == 0) { throw new Exception("Cotización no registrada"); }

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

                //Se graba el Detalle de la Cotización
                foreach (CotizacionDetalleDTO itemCD in lstItems)
                {
                    itemCD.TipoProceso = ConstantesDTO.CotizacionVentaDetalle.TipoProceso.Modificar;
                    itemCD.IdCotizacion = IdCotizacion;
                    itemCD.UsuarioRegistra = User.ObtenerUsuario();
                    itemCD.FechaRegistro = DateTime.Now;
                    var resCD = ventasBL.MantenimientoCotizacionDetalle(itemCD);
                }

                var resCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = IdCotizacion });
                CotizacionDTO cotizacionDTO = resCotizacion.Result.ToList().First();

                NotificarCotizacionValorizada(cotizacionDTO.IdSolicitud);

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
        public JsonResult ListarCDCostosItems(CotDetCostoDTO cotdetCosto)
        {
            var ventasBL = new VentasBL();

            var lstItems = GetCDIList(opcTablaFinal);

            List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

            //Se carga todos los costos
            var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { CotizacionDetalle = cotdetCosto.CotizacionDetalle });
            lstCostos = resCostos.Result.ToList();

            //Se completa los datos de cotizacion detalle para costos
            lstCostos.ForEach(x =>
            {
                var cditem = lstItems.FirstOrDefault(y => y.Id == x.IdCotizacionDetalle);
                if (cditem != null) { x.CotizacionDetalle = cditem; }
            });
            VariableSesion.setObject(TAG_CDCI, lstCostos);

            //Solo se devuelve los costos de la grilla respectiva
            var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => string.IsNullOrEmpty(cotdetCosto.CodCosto) || x.CodCosto == cotdetCosto.CodCosto));

            return Json(response);
        }

        [HttpPost]
        public JsonResult GrabarDatosCostoItem(CotDetCostoDTO cotdetCosto, string opcGrilla)
        {
            try
            {
                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                if (VariableSesion.getObject(TAG_CDCI) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI); }

                var lstItems = GetCDIList(opcTablaFinal);
                CotizacionDetalleDTO itemCD = new CotizacionDetalleDTO();

                //Si la grilla es de tabla final ya se tendrá cargado los detalles de la cotización
                //sino se utilizará el detalle que está en pantalla para validar su informacion (Campo Cantidad)
                if (opcGrilla == opcTablaFinal)
                {
                    itemCD = lstItems.FirstOrDefault(x => x.Id == cotdetCosto.IdCotizacionDetalle);
                }
                else
                {
                    if (cotdetCosto.CotizacionDetalle != null)
                    {
                        itemCD = cotdetCosto.CotizacionDetalle;
                    }
                }

                if (lstCostos.Where(o => o.CantidadCosto.HasValue && o.Id != cotdetCosto.Id && o.CodCosto == cotdetCosto.CodCosto).Select(x => x.CantidadCosto.Value).Sum() + cotdetCosto.CantidadCosto.Value > itemCD.Cantidad)
                {
                    throw new Exception("La cantidad total que se está costeando no puede ser mayor a la cotizada");
                }

                var ventasBL = new VentasBL();
                if (cotdetCosto.Id == 0) { cotdetCosto.Id = (lstCostos.Count() + 1) * -1; }
                cotdetCosto.UsuarioRegistra = User.ObtenerUsuario();
                if (cotdetCosto.Id > 0)
                { cotdetCosto.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Modificar; }
                else
                {
                    cotdetCosto.NumSecuencia = lstCostos.Where(x => x.CodCosto == cotdetCosto.CodCosto).ToList().Count + 1;
                    cotdetCosto.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Insertar;
                }

                if (opcGrilla == opcTablaFinal)
                {
                    var resMant = ventasBL.MantenimientoCotDetCosto(cotdetCosto);
                    cotdetCosto.Id = resMant.Result.Codigo;
                    //Se carga todos los costos
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { CotizacionDetalle = cotdetCosto.CotizacionDetalle });
                    lstCostos = resCostos.Result.ToList();
                }
                else
                {
                    lstCostos.Add(cotdetCosto);
                }

                //Se completa los datos de cotizacion detalle para costos
                lstCostos.ForEach(x =>
                {
                    var itemCDAux = new CotizacionDetalleDTO();
                    itemCD.CopyProperties(ref itemCDAux);
                    x.CotizacionDetalle = itemCDAux;
                    x.IdCotizacionDetalle = itemCDAux.Id;
                });

                VariableSesion.setObject(TAG_CDCI, lstCostos);

                //Solo se devuelve los costos de la grilla respectiva
                var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.CodCosto == cotdetCosto.CodCosto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult EliminarCostoItem(CotDetCostoDTO cotdetCosto)
        {
            try
            {
                List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();

                var lstItems = GetCDIList(opcTablaFinal);

                if (!cotdetCosto.IsTempRecord)
                {
                    var ventasBL = new VentasBL();
                    cotdetCosto.UsuarioRegistra = User.ObtenerUsuario();
                    cotdetCosto.TipoProceso = ConstantesDTO.CotizacionDetalleCostos.TipoProceso.Eliminar;
                    var resMant = ventasBL.MantenimientoCotDetCosto(cotdetCosto);
                    cotdetCosto.Id = resMant.Result.Codigo;

                    //Se carga todos los costos
                    var resCostos = ventasBL.ObtenerCotDetCostos(new CotDetCostoDTO() { CotizacionDetalle = cotdetCosto.CotizacionDetalle });
                    lstCostos = resCostos.Result.ToList();
                }
                else
                {

                }

                //Se completa los datos de cotizacion detalle para costos
                lstCostos.ForEach(x =>
                {
                    var cditem = lstItems.FirstOrDefault(y => y.Id == x.IdCotizacionDetalle);
                    if (cditem != null) { x.CotizacionDetalle = cditem; }
                });
                VariableSesion.setObject(TAG_CDCI, lstCostos);

                //Solo se devuelve los costos de la grilla respectiva
                var response = new ResponseDTO<IEnumerable<CotDetCostoDTO>>(lstCostos.Where(x => x.CodCosto == cotdetCosto.CodCosto));

                return Json(response);
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult CargarDatosCostoItem(CotDetCostoDTO cotdetCosto)
        {
            List<CotDetCostoDTO> lstCostos = new List<CotDetCostoDTO>();
            if (VariableSesion.getObject(TAG_CDCI) != null) { lstCostos = (List<CotDetCostoDTO>)VariableSesion.getObject(TAG_CDCI); }

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
                cdcItem.CotizacionDetalle.DescUnidad = cdItem.DescUnidad;
            }

            var response = new ResponseDTO<CotDetCostoDTO>(cdcItem);

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
                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, stock, 1, 2, User.ObtenerUsuario());
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

                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, "N", 2, 1, User.ObtenerUsuario());
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

                    var envio_log = ventasBL.ActualizarEnvioDespacho(codigoSolicitud, "", 1, 2, User.ObtenerUsuario());
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

        private void NotificarValorizacionPendiente(long codigoSolicitud)
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
                throw new Exception(respuesta);
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
                throw new Exception(respuesta);
            }
        }

        private void NotificarCosteoPendiente(long codigoSolicitud)
        {
            var result = new RespuestaDTO();
            var ventasBL = new VentasBL();

            var plantillasBL = new PlantillasBL();
            var filtros = new FiltroPlantillaDTO();
            PlantillaCorreoDTO datos_correo = null;
            string respuesta = null;

            //Envio de correo de costos
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
                throw new Exception(respuesta);
            }

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
                throw new Exception(respuesta);
            }

            //if(ViewBag.TipoSolicitud==ConstantesDTO.)

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



    }
}