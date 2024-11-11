﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AHSECO.CCL.FRONTEND.Identity;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.BE.Mantenimiento;
using System.Web.Security;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BL.Ventas;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Core;
using System.Web;
using System.Configuration;
using AHSECO.CCL.FRONTEND.Security;
using AHSECO.CCL.FRONTEND.Controllers.Mantenimientos;
using NPOI.SS.Formula.Functions;
using System.Security.Cryptography;
using System.Collections;
using System.Drawing;
using Newtonsoft.Json;
using System.Windows.Input;
using Winnovative;
using System.Web.Http.Results;
using NPOI.OpenXmlFormats.Dml;
using System.ComponentModel.Design;
using System.IO;
using AHSECO.CCL.BL.Mantenimientos;
using AHSECO.CCL.BL.Consulta;
using NPOI.OpenXmlFormats.Spreadsheet;
using System.Web.UI.WebControls;
using static AHSECO.CCL.COMUN.ConstantesDTO.CotizacionVentaDetalle;
using AHSECO.CCL.BL.Util;
using Microsoft.Office.Interop.Word;
using static AHSECO.CCL.COMUN.ConstantesDTO;

namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaSolicitudesVentasController : Controller
    {

        const string TAG_CDI = "CDItems";
        const string TAG_ConceptosVenta = "ConceptosVenta";

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
            ViewBag.Btn_EnviarGuia = "none";
            ViewBag.Btn_GuiaPedido = "none";
            ViewBag.Btn_GuiaBO = "none";
            ViewBag.Btn_Aprobar = "none";
            ViewBag.Btn_Observar = "none";  
            ViewBag.TxtOrdenCompra = "disabled";
            ViewBag.TxtFecOrdenCompra = "disabled";
            ViewBag.TxtCodigoPedido = "disabled";
            ViewBag.IngresoAlmacen ="disabled";
            ViewBag.FechaEntregaPedidoSE = "disabled";
            ViewBag.TxtNumeroFacturaSE = "disabled";
            ViewBag.TxtNumeroGuiaRemisionSE = "disabled";
            ViewBag.TxtNumeroSerieSE = "disabled";
            ViewBag.FechaEntregaPedidoCE = "disabled";
            ViewBag.TxtNumeroFacturaCE = "disabled";
            ViewBag.TxtNumeroGuiaRemisionCE = "disabled";
            ViewBag.TxtNumeroSerieCE = "disabled";

            if (NombreRol == "SGI_VENTA_GERENTE" || NombreRol == "SGI_VENTA_COSTOS")
            {
                string[] dtHeadProducto = //detalle de las columnas
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
                ViewBag.Cabecera = dtHeadProducto;
            }
            else
            {
                string[] dtHeadProducto = //detalle de las columnas
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
            };

            ViewBag.NombreRol = NombreRol;
            ViewBag.EstadoSolicitud = "";
            ViewBag.IdCotizacion = 0;
            ViewBag.IdContacto = 0;
            ViewBag.Observacion = ConstantesDTO.CotizacionVenta.Observaciones.Msj01;
            ViewBag.PermitirCancelarCot = false;
            ViewBag.VerTabCotDet = false;
            ViewBag.PermitirAgregarCotDet = false;
            ViewBag.PermitirEnvioCotizacion = false;
            ViewBag.PermitirNuevoCot = false;
            ViewBag.TitleDetItem = string.Empty;
            ViewBag.AcordionCollapsedLiq = "collapsed";
            ViewBag.TabAcordionCollapsedLiq = "collapse";
            ViewBag.AcordionCollapsedGest = "collapsed";
            ViewBag.TabAcordionCollapsedGest = "collapse";
            ViewBag.VerGestionVenta = false;
            VariableSesion.setObject(TAG_CDI, new List<CotizacionDetalleDTO>());
            ViewBag.PermitirTabDetCot = false;
            ViewBag.PermitirTabCalib = false;
            ViewBag.PermitirTabInsta = false;
            ViewBag.PermitirTabMantPrevent = false;
            ViewBag.PermitirTabFlete = false;
            ViewBag.PermitirModificarCodItem = false;

            if (NombreRol == "SGI_VENTA_GERENTE" || NombreRol == "SGI_VENTA_COSTOS")
            {
                ViewBag.PermitirTabDetCot = true;
            }

            if (numSol != null)
            {
                var rptaSoli = ventasBL.ObtenerSolicitudes(new SolicitudDTO() { Id_Solicitud = int.Parse(numSol) });
                var soli = rptaSoli.Result.First();
                ViewBag.EstadoSolicitud = soli.Estado;


                if (NombreRol == "SGI_VENTA_ASESOR" || NombreRol == "SGI_VENTA_COORDINASERV" || NombreRol == "SGI_VENTA_COORDINAATC")
                {
                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg)
                    {
                        ViewBag.Btn_FinalizarVenta = "inline-block";
                    }
                        
                    ViewBag.Btn_GuardarDespacho = "inline-block";
                    ViewBag.Btn_EnviarGuia = "inline-block";
                    ViewBag.Btn_GuiaPedido = "inline-block";
                    ViewBag.Btn_GuiaBO = "inline-block";
                    ViewBag.TxtOrdenCompra = "";
                    ViewBag.TxtFecOrdenCompra = "";
                }
                else if (NombreRol == "SGI_VENTA_GERENTE")
                {
                    ViewBag.Btn_Aprobar = "inline-block";
                    ViewBag.Btn_Observar = "inline-block";
                }
                else if (NombreRol == "SGI_VENTA_LOGISTICA")
                {
                    ViewBag.Btn_GuardarDespacho = "inline-block";
                    ViewBag.FechaEntregaPedidoSE = "";
                    ViewBag.TxtNumeroFacturaSE = "";
                    ViewBag.TxtNumeroGuiaRemisionSE = "";
                    ViewBag.TxtNumeroSerieSE = "";
                    ViewBag.FechaEntregaPedidoCE = "";
                    ViewBag.TxtNumeroFacturaCE = "";
                    ViewBag.TxtNumeroGuiaRemisionCE = "";
                    ViewBag.TxtNumeroSerieCE = "";
                }
                else if (NombreRol == "SGI_VENTA_IMPORTACION")
                {
                    ViewBag.TxtCodigoPedido = "";
                    ViewBag.IngresoAlmacen = "";
                    ViewBag.Btn_GuardarDespacho = "inline-block";
                }


                var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
                { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = soli.Estado });

                if (rptaEst.Result.Any()) { VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado); }

                if (soli.Estado != ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                {
                    ViewBag.PermitirCancelarCot = true;
                }

                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Registrado
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion
                    || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion)
                {
                    ViewBag.PermitirAgregarCotDet = true;
                }
                if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Finalizado)
                {
                    ViewBag.VerGestionVenta = true;
                }


                var rptaCotizacion = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdSolicitud = int.Parse(numSol), 
                    Estado = ConstantesDTO.CotizacionVenta.Estados.Activo });

                if (rptaCotizacion.Result.Any())
                {

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnCotizacion || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta)
                    {
                        ViewBag.AcordionCollapsedLiq = "";
                        ViewBag.TabAcordionCollapsedLiq = "";
                    }

                    if (soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.EnProcVentas || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.VentaProg || soli.Estado == ConstantesDTO.EstadosProcesos.ProcesoVenta.CotAprob)
                    {
                        ViewBag.AcordionCollapsedGest = "";
                        ViewBag.TabAcordionCollapsedGest = "";
                    }

                    ViewBag.VerTabCotDet = true;
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
                    var resCotDet = ventasBL.ObtenerCotizacionVentaDetalle(new CotizacionDetalleDTO() { IdCotizacion = oCotizacion.IdCotizacion });
                    if (resCotDet.Result != null)
                    {
                        if (resCotDet.Result.Any())
                        {
                            ViewBag.PermitirEnvioCotizacion = true;
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
                                    var oArticulo = resArticulos.Result.FirstOrDefault();
                                    if (oArticulo != null)
                                    {
                                        x.DescUnidad = oArticulo.DescUnidad;
                                    }
                                }
                            });
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
                    if (x.NroItem == CotDet.NroItem && x.CodItem.Trim() == CotDet.CodItem.Trim() && CotDet.IsTempRecord && x.IsTempRecord)
                    {
                        swEdit = true;
                    }
                    if (x.NroItem == CotDet.NroItem && x.CodItem.Trim() == CotDet.CodItem.Trim() && !CotDet.IsTempRecord)
                    {
                        swEdit = true;
                    }

                    if (swEdit)
                    {
                        x.Id = x.NroItem * -1;
                        x.Cantidad = CotDet.Cantidad;
                        x.CostoFOB = CotDet.CostoFOB;
                        x.VentaUnitaria = CotDet.VentaUnitaria;
                        x.PorcentajeGanancia = CotDet.PorcentajeGanancia;
                        x.CodUnidad = CotDet.CodUnidad;
                        x.DescUnidad = CotDet.DescUnidad;
                        x.EsItemPadre = CotDet.EsItemPadre;
                        if (CotDet.CotizacionDespacho != null)
                        {
                            if (x.CotizacionDespacho == null) { x.CotizacionDespacho = new CotDetDespachoDTO(); }
                            //x.CotizacionDespacho.CantPreventivo = CotDet.CotizacionDespacho.CantPreventivo;
                            //x.CotizacionDespacho.CodCicloPreventivo = CotDet.CotizacionDespacho.CodCicloPreventivo;
                            x.CotizacionDespacho.IndInfoVideo = CotDet.CotizacionDespacho.IndInfoVideo;
                            x.CotizacionDespacho.IndInfoManual = CotDet.CotizacionDespacho.IndInfoManual;
                            x.CotizacionDespacho.IndInstaCapa = CotDet.CotizacionDespacho.IndInstaCapa;
                            x.CotizacionDespacho.GarantiaAdicional = CotDet.CotizacionDespacho.GarantiaAdicional;
                            x.CotizacionDespacho.IndLLaveMano = CotDet.CotizacionDespacho.IndLLaveMano;
                            //x.CotizacionDespacho.CodUbigeoDestino = CotDet.CotizacionDespacho.CodUbigeoDestino;
                            //x.CotizacionDespacho.DescUbigeoDestino = CotDet.CotizacionDespacho.DescUbigeoDestino;
                            //x.CotizacionDespacho.Direccion = CotDet.CotizacionDespacho.Direccion;
                            //x.CotizacionDespacho.NroPiso = CotDet.CotizacionDespacho.NroPiso;
                            x.CotizacionDespacho.Dimensiones = CotDet.CotizacionDespacho.Dimensiones;
                            x.CotizacionDespacho.IndCompraLocal = CotDet.CotizacionDespacho.IndCompraLocal;
                            x.CotizacionDespacho.IndFianza = CotDet.CotizacionDespacho.IndFianza;
                            x.CotizacionDespacho.MontoPrestPrin = CotDet.CotizacionDespacho.MontoPrestPrin;
                            x.CotizacionDespacho.MontoPrestAcc = CotDet.CotizacionDespacho.MontoPrestAcc;
                        }
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
            List<CotizacionDetalleDTO> lstItems = null;
            if (!string.IsNullOrEmpty(opcGrillaItems))
            {
                if (opcGrillaItems == "1")
                {
                    if (VariableSesion.getObject(TAG_CDI) != null) { lstItems = ((List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI)).Where(x => x.IsTempRecord).ToList(); }
                }
                if (opcGrillaItems == "2")
                {
                    if (VariableSesion.getObject(TAG_CDI) != null) { lstItems = ((List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI)).Where(x => !x.IsTempRecord).ToList(); }
                }
            }
            else
            {
                lstItems = (List<CotizacionDetalleDTO>)VariableSesion.getObject(TAG_CDI);
            }
            return lstItems;
        }

        private ArticuloDTO findSaleItemRecord(string CodItem)
        {

            var ventaBL = new VentasBL();
            var oArticulo = new ArticuloDTO();

            var swLstTemp = false;
            if (VariableSesion.getObject(TAG_ConceptosVenta) != null)
            {
                if (((List<ArticuloDTO>)VariableSesion.getObject(TAG_ConceptosVenta)).Any()) { swLstTemp = true; }
            }

            if (swLstTemp)
            {
                var lstArticulos = (List<ArticuloDTO>)VariableSesion.getObject(TAG_ConceptosVenta);
                //Articulo Seleccionado
                if (lstArticulos.Any(x => x.CodArticulo == CodItem))
                { oArticulo = lstArticulos.First(x => x.CodArticulo == CodItem); }
            }
            else
            {
                var respArt = ventaBL.ObtenerArticulosxFiltro(new FiltroArticuloDTO { CodsArticulo = CodItem });
                //Articulo Seleccionado
                if (respArt.Result.Any(x => x.CodArticulo == CodItem))
                { oArticulo = respArt.Result.First(x => x.CodArticulo == CodItem); }
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

            List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

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

                string ruta_temporal = ConfigurationManager.AppSettings.Get("temppFiles");
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

        public JsonResult GrupoSolicitudVentaFiltro(int codFlujo)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.GrupoSolicitudVentaFiltro(codFlujo);
            return Json(result);
        }

        public FileResult DescargarFile(string url, string nombreDoc)
        {
            string pao_files = ConfigurationManager.AppSettings.Get("temppFiles");
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
                    var solicitud = ventasBL.ObtenerSolicitudes(new SolicitudDTO()
                    { Id_Solicitud = cotizacionDTO.IdSolicitud });
                    cotizacionDTO.IdWorkFlow = solicitud.Result.First().Id_WorkFlow;
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

                //Solo se debe tener una cotizacion activa
                ResponseDTO<RespuestaDTO> resultCV = null;
                if (cotizacionDTO.IdCotizacion > 0)
                {
                    //Deshabilitar la cotización actual
                    var rptaCotAux = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = cotizacionDTO.IdCotizacion });
                    var oCotAux = rptaCotAux.Result.ToList().First();
                    oCotAux.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Modificar;
                    oCotAux.Estado = ConstantesDTO.CotizacionVenta.Estados.Inactivo;
                    oCotAux.UsuarioRegistra = User.ObtenerUsuario(); oCotAux.FechaRegistro = DateTime.Now;
                    resultCV = ventasBL.MantenimientoCotizacion(oCotAux);
                }

                cotizacionDTO.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Insertar;
                cotizacionDTO.FecCotizacion = DateTime.Now;
                cotizacionDTO.Estado = ConstantesDTO.CotizacionVenta.Estados.Activo;
                cotizacionDTO.UsuarioRegistra = User.ObtenerUsuario(); cotizacionDTO.FechaRegistro = DateTime.Now;
                resultCV = ventasBL.MantenimientoCotizacion(cotizacionDTO);

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

                if (rptaEst.Result.Any()) { VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado); }

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

                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

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
        public JsonResult CancelarSolicitud(int ID_Solicitud)
        {
            try
            {
                var ventasBL = new VentasBL();
                var solicitudDTO = new SolicitudDTO();
                solicitudDTO.Id_Solicitud = ID_Solicitud;
                solicitudDTO.UsuarioModifica = User.ObtenerUsuario();
                solicitudDTO.IpMaquinaModifica = User.ObtenerIP();
                solicitudDTO.Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.CotSinVenta;
                var result = ventasBL.ActualizarSolicitudEstado(solicitudDTO);
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
        public JsonResult ListarItemsCotDet()
        {
            try
            {
                var ventaBL = new VentasBL();

                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

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

                lstItems = ReconteoSubItemsCotDet(lstItems);

                lstItems.ForEach(x =>
                {
                    AddModifyCDI(x);
                });

                //Solo cargar los productos en pantalla
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems.Where(x => x.IsTempRecord && x.TipoItem != ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio));

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

                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

                //Registro Detalle
                var select = new CotizacionDetalleDTO();
                select.CodItem = oArticulo.CodArticulo;
                select.CodItemTemp = oArticulo.CodArticuloTemp;
                select.Descripcion = oArticulo.DescRealArticulo;
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

                if (select.TipoItem == ConstantesDTO.CotizacionVentaDetalle.TipoItem.Accesorio)
                {
                    var lstItemsPadre = lstItems.Where(x => x.Select).ToList();
                    if (!lstItemsPadre.Any()) { throw new Exception("Para agregar un accesorio a la cotización deberá previamente seleccionar un producto para asociarlo. Favor de seleccionar un producto."); }
                    foreach(CotizacionDetalleDTO itemPadre in lstItemsPadre)
                    {
                        if (lstItems.Any(x => x.NroItem == itemPadre.NroItem && x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                        { throw new Exception("Accesorio ya fue selecionado"); }
                        CotizacionDetalleDTO item = select;
                        item.NroItem = itemPadre.NroItem;
                        item.Id = item.NroItem * -1;
                        AddModifyCDI(item);
                    }
                }
                else
                {
                    if (lstItems.Any()) { select.NroItem = lstItems.Max(x => x.NroItem) + 1; }
                    else { select.NroItem = 1; }
                    if (lstItems.Any(x => x.CodItem.TrimEnd() == CodItem.TrimEnd()))
                    { throw new Exception("Producto y/o Servicio ya fue selecionado"); }
                    select.Id = select.NroItem * -1;
                    AddModifyCDI(select);
                }

                lstItems = ReconteoSubItemsCotDet(lstItems);
                lstItems = GetCDIList("1");

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
                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

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

                if (opcGrillaItems == "1")
                {
                    lstItems = GetCDIList("1");
                    var lstItems_2 = GetCDIList("2");

                    var itemArticulo = lstItems.FirstOrDefault(x => x.CodItem.Trim() == CodItem.Trim());
                    if (itemArticulo.EsItemPadre)
                    { lstItems = lstItems.Where(x => x.NroItem != itemArticulo.NroItem).ToList(); }
                    else
                    { lstItems = lstItems.Where(x => x.CodItem.Trim() != CodItem.Trim()).ToList(); }

                    lstItems.AddRange(lstItems_2);
                    VariableSesion.setObject(TAG_CDI, lstItems.ToList());
                    lstItems = GetCDIList("1");
                }

                if (opcGrillaItems == "2")
                {
                    lstItems = GetCDIList("2");

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
                    lstItems = GetCDIList("2");
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
                var ventaBL = new VentasBL();
                var ubigeoBL = new UbigeoBL();

                CotizacionDetalleDTO itemCotDet = findCotDetRecord(CodItem, opcGrillaItems);

                //int nUbigeoDest;
                //if(itemCotDet.CotizacionDespacho != null)
                //{
                //    if (!string.IsNullOrEmpty(itemCotDet.CotizacionDespacho.CodUbigeoDestino) && string.IsNullOrEmpty(itemCotDet.CotizacionDespacho.DescUbigeoDestino) 
                //        && int.TryParse(itemCotDet.CotizacionDespacho.CodUbigeoDestino, out nUbigeoDest))
                //    {
                //        if (nUbigeoDest > 0)
                //        {
                //            var rptaUbigeos = ubigeoBL.Obtener(new UbigeoDTO() { UbigeoId = itemCotDet.CotizacionDespacho.CodUbigeoDestino });
                //            var oUbigeoDestino = rptaUbigeos.Result.FirstOrDefault();
                //            itemCotDet.CotizacionDespacho.DescUbigeoDestino = oUbigeoDestino.NombreDepartamento + " / " + oUbigeoDestino.NombreProvincia + " / " + oUbigeoDestino.NombreDistrito;
                //        }
                //    }
                //}

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        [HttpPost]
        public JsonResult ObtenerSubItems(string CodItemPadre)
        {
            try
            {
                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

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
                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");
                List<CotizacionDetalleDTO> lstItems_2 = GetCDIList("2");

                var itemPadre = lstItems.FirstOrDefault(x => x.CodItem == CodItemPadre);
                if (itemPadre != null)
                {
                    lstItems = lstItems.Where(x => x.NroItem == itemPadre.NroItem && x.CodItem.Trim() != CodItem.Trim()).ToList();
                    lstItems.AddRange(lstItems_2);
                    lstItems = ReconteoSubItemsCotDet(lstItems);
                    VariableSesion.setObject(TAG_CDI, lstItems);
                }
                lstItems = GetCDIList("1");
                var response = new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(lstItems);

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
                var ubigeoBL = new UbigeoBL();

                CotizacionDetalleDTO itemCotDet = findSubCotDetRecord(CodItemPadre, CodItem);

                //int nUbigeo;
                //if (itemCotDet.CotizacionDespacho != null)
                //{
                //    if (string.IsNullOrEmpty(itemCotDet.CotizacionDespacho.CodUbigeoDestino) && int.TryParse(itemCotDet.CotizacionDespacho.CodUbigeoDestino,out nUbigeo))
                //    {
                //        if (nUbigeo > 0)
                //        {
                //            var rptaUbigeos = ubigeoBL.Obtener(new UbigeoDTO() { UbigeoId = itemCotDet.CotizacionDespacho.CodUbigeoDestino });
                //            var oUbigeoDestino = rptaUbigeos.Result.FirstOrDefault();
                //            itemCotDet.CotizacionDespacho.DescUbigeoDestino = oUbigeoDestino.NombreDepartamento + " / " + oUbigeoDestino.NombreProvincia + " / " + oUbigeoDestino.NombreDistrito;
                //        }
                //    }
                //}

                return Json(new ResponseDTO<CotizacionDetalleDTO>(itemCotDet));
            }
            catch (Exception ex) { return Json(new { Status = 0, CurrentException = ex.Message }); }
        }

        private List<CotizacionDetalleDTO> ReconteoSubItemsCotDet(List<CotizacionDetalleDTO> lstItems)
        {
            if (lstItems != null)
            {
                foreach (CotizacionDetalleDTO item in lstItems)
                {
                    if (item.EsItemPadre)
                    {
                        item.CantSubItem = lstItems.Where(x => x.CodItem != item.CodItem && x.NroItem == item.NroItem).Count();
                    }
                }
            }
            return lstItems;
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
                
                //Se actualiza los datos y el código de item
                lstItems.ForEach(x =>
                {
                    if (x.NroItem == oItem.NroItem && x.CodItem.Trim() == oItem.CodItem.Trim())
                    {
                        x.Id = x.NroItem * -1;
                        x.CodItem = CotDet.CodItemTemp;
                        x.CodItemTemp = CotDet.CodItemTemp;
                        x.CodItem_IsUpdatable = false;
                        x.Cantidad = CotDet.Cantidad;
                        x.CostoFOB = CotDet.CostoFOB;
                        x.VentaUnitaria = CotDet.VentaUnitaria;
                        x.PorcentajeGanancia = CotDet.PorcentajeGanancia;
                        if (CotDet.CotizacionDespacho != null)
                        {
                            if (x.CotizacionDespacho == null) { x.CotizacionDespacho = new CotDetDespachoDTO(); }
                            //x.CotizacionDespacho.CantPreventivo = CotDet.CotizacionDespacho.CantPreventivo;
                            //x.CotizacionDespacho.CodCicloPreventivo = CotDet.CotizacionDespacho.CodCicloPreventivo;
                            x.CotizacionDespacho.IndInfoVideo = CotDet.CotizacionDespacho.IndInfoVideo;
                            x.CotizacionDespacho.IndInfoManual = CotDet.CotizacionDespacho.IndInfoManual;
                            x.CotizacionDespacho.IndInstaCapa = CotDet.CotizacionDespacho.IndInstaCapa;
                            x.CotizacionDespacho.GarantiaAdicional = CotDet.CotizacionDespacho.GarantiaAdicional;
                            x.CotizacionDespacho.IndLLaveMano = CotDet.CotizacionDespacho.IndLLaveMano;
                            //x.CotizacionDespacho.CodUbigeoDestino = CotDet.CotizacionDespacho.CodUbigeoDestino;
                            //x.CotizacionDespacho.DescUbigeoDestino = CotDet.CotizacionDespacho.DescUbigeoDestino;
                            //x.CotizacionDespacho.Direccion = CotDet.CotizacionDespacho.Direccion;
                            //x.CotizacionDespacho.NroPiso = CotDet.CotizacionDespacho.NroPiso;
                            x.CotizacionDespacho.Dimensiones = CotDet.CotizacionDespacho.Dimensiones;
                            x.CotizacionDespacho.IndCompraLocal = CotDet.CotizacionDespacho.IndCompraLocal;
                            x.CotizacionDespacho.IndFianza = CotDet.CotizacionDespacho.IndFianza;
                            x.CotizacionDespacho.MontoPrestPrin = CotDet.CotizacionDespacho.MontoPrestPrin;
                            x.CotizacionDespacho.MontoPrestAcc = CotDet.CotizacionDespacho.MontoPrestAcc;
                        }
                    }
                }
                );

                lstItems = ReconteoSubItemsCotDet(lstItems);
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

        private List<CotizacionDetalleDTO> TotalizacionCotDet(List<CotizacionDetalleDTO> lstItems)
        {
            if (lstItems != null)
            {
                var lstItemsPadre = lstItems.Where(x => x.EsItemPadre).ToList();
                foreach (CotizacionDetalleDTO item in lstItems)
                {
                    if (item.EsItemPadre)
                    {
                        item.CantSubItem = lstItems.Where(x => x.CodItem != item.CodItem && x.NroItem == item.NroItem).Count();
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

                List<CotizacionDetalleDTO> lstItems = GetCDIList("1");

                if (!lstItems.Any()) { throw new Exception("No se ha agregado ning&uacute;n producto o servicio"); }

                List<CotizacionDetalleDTO> lstItemsPadre = lstItems.Where(x => x.EsItemPadre).ToList();

                //Se realiza lo siguiente:
                //1. Se totaliza el precio por cada registro de cotizacion detalle (Monto del Producto o Servicio más sus accesorios)
                //2. La ganancia por registro de Cotizacion Detalle
                //3. El descuento total de la venta pero se le divide entre cada uno de los registros de cotizacion detalle
                foreach (CotizacionDetalleDTO itemPadre in lstItemsPadre)
                {
                    var oArticulo = findSaleItemRecord(itemPadre.CodItem);

                    itemPadre.Stock = oArticulo.StockDisponible;
                    if (itemPadre.EsItemPadre)
                    {
                        itemPadre.VentaTotalSinIGV = lstItems.Where(x => x.NroItem == itemPadre.NroItem && x.VentaUnitaria.HasValue).Select(y => y.VentaUnitaria.Value * y.Cantidad).Sum();
                        if (itemPadre.VentaTotalSinIGV.HasValue)
                        {
                            if (itemPadre.PorcentajeGanancia.HasValue)
                            {
                                if (itemPadre.PorcentajeGanancia.Value > 0)
                                {
                                    itemPadre.VentaTotalSinIGVConGanacia = itemPadre.VentaTotalSinIGV.Value * (itemPadre.PorcentajeGanancia.Value / 100);
                                }
                                else
                                {
                                    itemPadre.VentaTotalSinIGVConGanacia = itemPadre.VentaTotalSinIGV.Value;
                                }
                            }
                        }
                    }
                    itemPadre.CodUnidad = oArticulo.CodUnidad;
                    itemPadre.DescUnidad = oArticulo.DescUnidad;
                }

                //Se actualiza los datos de la cotizacion
                lstItems.ForEach(x =>
                {
                    var itemPadre = lstItemsPadre.FirstOrDefault(y => y.NroItem == x.NroItem && y.CodItem == x.CodItem);
                    if (itemPadre != null)
                    {
                        x.VentaTotalSinIGV = itemPadre.VentaTotalSinIGV;
                        x.VentaTotalSinIGVConGanacia = itemPadre.VentaTotalSinIGVConGanacia;
                        x.CodUnidad = itemPadre.CodUnidad;
                        x.DescUnidad = itemPadre.DescUnidad;
                    }
                });

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
        public JsonResult enviarCotizacion(int IdCotizacion,int IdWorkFlow)
        {
            try
            {
                if (IdCotizacion <= 0) { throw new Exception("Cotización no registrada"); }

                List<CotizacionDetalleDTO> lstItems = GetCDIList("2");

                var ventasBL = new VentasBL();
                var procesoBL = new ProcesosBL();

                var swValorizada = false;
                if (lstItems.Any(x => x.CostoFOB.HasValue) || lstItems.Any(x => x.VentaUnitaria.HasValue))
                {
                    if (lstItems.Any(x => x.CostoFOB.Value > 0) || lstItems.Any(x => x.VentaUnitaria.Value > 0))
                    {
                        swValorizada = true;
                    }
                }

                CotizacionDTO cotizacionDTO = new CotizacionDTO();
                cotizacionDTO.IdCotizacion = IdCotizacion;
                var rptaCotAux = ventasBL.ObtenerCotizacionVenta(new CotizacionDTO() { IdCotizacion = cotizacionDTO.IdCotizacion });
                cotizacionDTO = rptaCotAux.Result.FirstOrDefault();
                cotizacionDTO.IdWorkFlow = IdWorkFlow;

                ResponseDTO<RespuestaDTO> resultCV = null;
                if (swValorizada)
                {
                    //Deshabilitar la cotización actual
                    var oCotAux = rptaCotAux.Result.ToList().First();
                    oCotAux.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Modificar;
                    oCotAux.Estado = ConstantesDTO.CotizacionVenta.Estados.Inactivo;
                    oCotAux.UsuarioRegistra = User.ObtenerUsuario(); oCotAux.FechaRegistro = DateTime.Now;
                    resultCV = ventasBL.MantenimientoCotizacion(oCotAux);

                    //Se crea nueva solicitud
                    cotizacionDTO.TipoProceso = ConstantesDTO.CotizacionVenta.TipoProceso.Insertar;
                    cotizacionDTO.FecCotizacion = DateTime.Now;
                    cotizacionDTO.Estado = ConstantesDTO.CotizacionVenta.Estados.Activo;
                    cotizacionDTO.UsuarioRegistra = User.ObtenerUsuario(); cotizacionDTO.FechaRegistro = DateTime.Now;
                    resultCV = ventasBL.MantenimientoCotizacion(cotizacionDTO);
                    cotizacionDTO.IdCotizacion = resultCV.Result.Codigo;
                }

                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = cotizacionDTO.IdWorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
                log.UsuarioRegistro = User.ObtenerUsuario();
                var resultWF = procesoBL.InsertarWorkflowLog(log);

                ventasBL.ActualizarSolicitudEstado(new SolicitudDTO()
                {
                    Id_Solicitud = cotizacionDTO.IdSolicitud,
                    Estado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion
                });

                var rptaEst = ventasBL.ObtenerEstadosProcesos(new ProcesoEstadoDTO
                { IdProceso = ConstantesDTO.Procesos.Ventas.ID, CodigoEstado = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion });

                if (rptaEst.Result.Any()) { VariableSesion.setCadena("estadoAbrev", rptaEst.Result.First().AbreviaturaEstado); }

                ViewBag.EstadoSolicitud = ConstantesDTO.EstadosProcesos.ProcesoVenta.Valorizacion;
                ViewBag.IdCotizacion = cotizacionDTO.IdCotizacion;

                //Se graba el Detalle de la Cotización
                if (lstItems.Any())
                {
                    foreach (CotizacionDetalleDTO itemCD in lstItems)
                    {
                        itemCD.IdCotizacion = cotizacionDTO.IdCotizacion;
                        itemCD.UsuarioRegistra = User.ObtenerUsuario();
                        itemCD.FechaRegistro = DateTime.Now;
                        ventasBL.MantenimientoCotizacionDetalle(itemCD);
                    }
                }

                return Json(new { Status = 1, Mensaje = "Cotización Enviada correctamente" });
            }
            catch (Exception ex) { return Json(new { Status = 0, Mensaje = ex.Message }); }
        }

    }
}