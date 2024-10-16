using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Globalization;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Reportes;
using AHSECO.CCL.BL;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;
using NPOI.Extension;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.HSSF.Record.Chart;
using NPOI.OpenXmlFormats.Shared;
using AHSECO.CCL.FRONTEND.Reporte;
//using NPOI.XWPF.UserModel;
using System.Configuration;
using Winnovative;
using NPOI.OpenXmlFormats.Dml;
using System.Web.Http.Results;
using System.Diagnostics.Tracing;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.SS.Formula.Functions;


namespace AHSECO.CCL.FRONTEND.Controllers.Viaticos
{
    public class BandejaViaticoController : Controller
    {
        // GET: Convenio
        //[OutputCache(NoStore = true, Duration = 0)]
        [Permissions(Permissions = "BANDEJAVIATICO")]
        public ActionResult Index()
        {
            ViewBag.Usuario = User.ObtenerUsuario();
            var procesosBL = new ProcesosBL();
            var roles = procesosBL.ConsultaWorkFLowRoles(User.ObtenerUsuario(), 4).Result.FirstOrDefault();
            ViewBag.RolUsuario = roles.NombreRol;
            ViewBag.CodigoArea = roles.CodigoArea;

            ViewBag.ReportViewer = "";

            if (roles.NombreRol == "SGI_VIAT_SOLICITANTE")
            {
                ViewBag.BtnNuevo = "inline-block";//"visible";
                ViewBag.BtnAprobar = "none";//"hidden";
                ViewBag.BtnEnvApr = "inline-block";//"visible";
                ViewBag.BtnImprimir = "inline-block";//"visible";
                ViewBag.BtnExportar = "inline-block";//"visible";
                ViewBag.BtnBuscar = "inline-block";//"visible";
                ViewBag.BtnVer = "S";
                ViewBag.BtnEditar = "S";
                ViewBag.BtnAnular = "S";
            }
            else if (roles.NombreRol == "SGI_VIAT_GERENTE")
            {
                ViewBag.BtnNuevo = "none";//"hidden";
                ViewBag.BtnAprobar = "inline-block";//"visible";
                ViewBag.BtnEnvApr = "none";//"hidden";
                ViewBag.BtnImprimir = "inline-block";//"visible";
                ViewBag.BtnExportar = "inline-block";//"visible";
                ViewBag.BtnBuscar = "inline-block";//"visible";
                ViewBag.BtnVer = "S";
                ViewBag.BtnEditar = "N";
                ViewBag.BtnAnular = "N";
            }
            else if (roles.NombreRol == "SGI_VIAT_ADMINISTRADOR")
            {
                ViewBag.BtnNuevo = "none";//"hidden";
                ViewBag.BtnAprobar = "none";//"hidden";
                ViewBag.BtnEnvApr = "none";//"hidden";
                ViewBag.BtnImprimir = "inline-block";//"visible";
                ViewBag.BtnExportar = "inline-block";//"visible";
                ViewBag.BtnBuscar = "inline-block";//"visible";
                ViewBag.BtnVer = "S";
                ViewBag.BtnEditar = "S";
                ViewBag.BtnAnular = "S";
            }
            else if (roles.NombreRol == "SGI_VIAT_CONTADOR")
            {
                ViewBag.BtnNuevo = "none"; //"hidden";
                ViewBag.BtnAprobar = "none";//"hidden";
                ViewBag.BtnEnvApr = "none";//"hidden";
                ViewBag.BtnImprimir = "inline-block";//"visible";
                ViewBag.BtnExportar = "inline-block";//"visible";
                ViewBag.BtnBuscar = "inline-block";//"visible";
                ViewBag.BtnVer = "S";
                ViewBag.BtnEditar = "S";
                ViewBag.BtnAnular = "N";
            }
            else
            {
                ViewBag.BtnNuevo = //"hidden";
                ViewBag.BtnAprobar = //"hidden";
                ViewBag.BtnEnvApr = //"hidden";
                ViewBag.BtnImprimir = //"hidden";
                ViewBag.BtnExportar = //"hidden";
                ViewBag.BtnBuscar = //"hidden";
                ViewBag.BtnVer = "N";
                ViewBag.BtnEditar = "N";
                ViewBag.BtnAnular = "N";
            }
            

            return View();
        }


        [HttpPost]
        public JsonResult ObtenerCargosxAreaViaticos(int codigoArea)
        {
            var viaticosBL = new ViaticosBL();
            var result = viaticosBL.ObtenerCargosxAreaViaticos(codigoArea);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.CodigoCargo,
                    Text = i.NombreCargo
                })
            };
            return Json(rs);
        }

        public FileResult ExportarFile(string url, string nombreDoc)
        {
            string pao_files = ConfigurationManager.AppSettings.Get("RutaCargaViatico");
            string ruta = pao_files + url;

            var fileName = Path.GetFileName(url);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
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

        public JsonResult ImprimirViaticosPDF(string ids)

        {

            var viaticosBL = new ViaticosBL();

            string[] idsViaticos = ids.Split(',');

            List<ViaticosDTO> viaticos = new List<ViaticosDTO>();

            List<List<ViaticosDetalleDTO>> viaticosDetalle = new List<List<ViaticosDetalleDTO>>();

            List<List<WorkflowLogDTO>> viaticosSeguimiento = new List<List<WorkflowLogDTO>>();

            var url1 = new Uri(HttpContext.Request.Url, Url.Content("~/resources/img/RAZ1.png"));

            var imageLogo1 = url1.AbsoluteUri;

            var url2 = new Uri(HttpContext.Request.Url, Url.Content("~/resources/img/RAZ2.png"));

            var imageLogo2 = url2.AbsoluteUri;

            string htmlTotal = "";

            //string htmlCompletoTotal = "";

            foreach (var id in idsViaticos)

            {
                string tableCabecera = "";

                string tableContenido = "";

                string tableFooter = "";

                string tableCompleto = "";

                string htmlCompleto = "";

                string htmlCabecera = "";

                string htmlFooter = "";

                viaticos.Add(viaticosBL.VerViaticos(Int32.Parse(id)).Result.CabeceraViatico);

                viaticosDetalle.Add(viaticosBL.VerViaticos(Int32.Parse(id)).Result.DetallesViatico);

                viaticosSeguimiento.Add(viaticosBL.VerViaticos(Int32.Parse(id)).Result.Seguimiento);

                foreach (var seguimiento in viaticosSeguimiento)
                {
                    foreach (var estado in seguimiento)
                    {
                        if (estado.DescripcionEstado == "Aprobado")
                        {
                            htmlFooter = "<table style='height: 28px; width:670px'>" +
                                            "<tbody>" +
                                                    "<tr>" +
                                                        "<td style='width: 577.333px; text-align: center; background-color:#FAD619'><strong>AUTORIZADO POR&nbsp; </strong></td>" +
                                                    "</tr>" +
                                                "</tbody>" +
                                            "</table>" +
                                            "<table style='height: 29px;width: 670px'>" +
                                                "<tbody>" +
                                                    "<tr>" +
                                                        "<td class='aprTabla' style='width: 188.552px;'>{FechaAutorizacion}</td>" +
                                                        "<td class='aprTabla' style='width: 188.552px;'>{CargoAutorizacion}</td>" +
                                                        "<td class='aprTabla' style='width: 188.562px;'>{NombreUsuarioRegistroAutorizacion}</td>" +
                                                    "</tr>" +
                                                "</tbody>" +
                                            "</table>" +
                                            "<div style='max-height:100px;width:670px'><p style='text-align: center;'>Yo, <strong>{NombreEncargado}</strong>, identificado con <strong> {TIPODOC} {DOC}</strong>, empleado de la empresa <strong>{NombreEmpresa}</strong>, me comprometo a rendir cuenta debidamente documentada de la suma depositada en mi cuenta sueldo, para la comisión de viaje asignada.</p></div>" +
                                            "<p style='left:250px; position:absolute;'><span style='text-decoration: underline;'>{NombreEncargado}</span></p>" +
                                            "<br><p style='left:250px; position:absolute;'>FIRMA DEL SOLICITANTE</p>" +
                                            "<p style='text-align: center;'>&nbsp;</p>"+
                                            "<p style='text-align: center;'>&nbsp;</p>";

                            htmlFooter = htmlFooter.Replace("{FechaAutorizacion}", estado.FechaRegistro == "" || estado.FechaRegistro == null? "" : estado.FechaRegistro);
                            htmlFooter = htmlFooter.Replace("{CargoAutorizacion}", estado.Cargo == "" || estado.Cargo == null? "": estado.Cargo);
                            htmlFooter = htmlFooter.Replace("{NombreUsuarioRegistroAutorizacion}", estado.NombreUsuarioRegistro == "" || estado.NombreUsuarioRegistro == null ?"":estado.NombreUsuarioRegistro);
                        };
                    };
                };

                foreach (var viatico in viaticos)
                {
                    htmlCabecera = "<html style='height:1500px'>" +

                            "<head><div style='display: flex;width: 693px;justify-content: space-between; height: 54px;'><img style='text-align: left; width: 190px; height: 70px' src='{Logo}'/><p style='border: 1.5px solid black;border-radius: 5px;padding: 5px;height: 13px;'>N° de Solicitud: <strong>{CODVIATICO}</strong></p></div></head>" +

                            "<body style='width: 800px; font-size:12px ;font-family:Arial;'><br><p style='left:330px;font-size: 14px; position:absolute;'><strong>ANEXO A</strong></p><br>" +
                                "<p style='font-size: 14px;left:220px; position:absolute;'><span style='text-decoration: underline;'><strong>SOLICITUD DE PASAJES Y GASTOS DE VIAJE</strong></span></p><br>" +
                            "<br>" +
                                "<div style='max-height: 250px ;min-height: 150px; max-width: 697px; display: flex; flex-wrap: wrap; justify-content: space-between;'>" +
                                    "<div style='flex: 1; min-width: 200px; max-width: 300px;'>" +
                                        "<p><strong>FECHA:</strong> {FechaViatico}</p>" +
                                        "<p><strong>NOMBRE:</strong> {NombreEncargado}</p>" +
                                        "<p><strong>CARGO:</strong> {NombreCargo}</p>" +
                                        "<p><strong>MOTIVO:</strong> {Motivo}</p>" +
                                    "</div>" +
                                    "<div style='flex: 1; min-width: 200px; max-width: 380px;'>" +
                                        "<p style='max-height: 55px;overflow: hidden;'><strong>DÍAS DE VIAJE:</strong> {DiasViaje}</p>" +
                                        "<p style='max-height: 52px;overflow: hidden;'><strong>CLIENTE:</strong> {Cliente}</p>" +
                                        "<p><strong>LUGAR DE DESTINO:</strong> {CodigoUbigeo}</p>" +
                                    "</div>" +
                                "</div>";
                    if (viatico.CodigoEmpresa == "RAZ2")
                    {
                        htmlCabecera = htmlCabecera.Replace("{Logo}", imageLogo2);
                    }
                    else if (viatico.CodigoEmpresa == "RAZ1")
                    {
                        htmlCabecera = htmlCabecera.Replace("{Logo}", imageLogo1);
                    }

                    htmlCabecera = htmlCabecera.Replace("{FechaViatico}", viatico.FechaViatico.ToString("dd/MM/yyyy"));

                    htmlCabecera = htmlCabecera.Replace("{NombreEncargado}", viatico.NombreEncargado);

                    htmlCabecera = htmlCabecera.Replace("{NombreCargo}", viatico.NombreCargo);

                    htmlCabecera = htmlCabecera.Replace("{Cliente}", viatico.Cliente);

                    htmlCabecera = htmlCabecera.Replace("{Motivo}", viatico.Motivo);

                    htmlCabecera = htmlCabecera.Replace("{CodigoUbigeo}", viatico.CodigoUbigeo);

                    htmlCabecera = htmlCabecera.Replace("{DiasViaje}", viatico.DiasViaje);

                    var CodigoViatico = ("000000" + viatico.CodigoViatico.ToString());

                    htmlCabecera = htmlCabecera.Replace("{CODVIATICO}", CodigoViatico.Substring((CodigoViatico.Length)-6,CodigoViatico.Length-((CodigoViatico.Length) - 6)));

                    if (htmlFooter == "")
                    {
                        htmlFooter = "<table style='height: 28px; width:670px'>" +
                                            "<tbody>" +
                                                    "<tr>" +
                                                        "<td style='width: 577.333px; text-align: center; background-color:#FAD619'><strong>AUTORIZADO POR&nbsp; </strong></td>" +
                                                    "</tr>" +
                                                "</tbody>" +
                                            "</table>" +
                                            "<table style='height: 29px;width: 670px'>" +
                                                "<tbody>" +
                                                    "<tr>" +
                                                        "<td class='aprTabla' style='width: 188.552px;'> </td>" +
                                                        "<td class='aprTabla' style='width: 188.552px;'> </td>" +
                                                        "<td class='aprTabla' style='width: 188.562px;'> </td>" +
                                                    "</tr>" +
                                                "</tbody>" +
                                            "</table>" +
                                            "<div style='max-height:100px;width:670px'><p style='text-align: center;'>Yo, <strong>{NombreEncargado}</strong>, identificado con <strong> {TIPODOC} {DOC}</strong>, empleado de la empresa <strong>{NombreEmpresa}</strong>, me comprometo a rendir cuenta debidamente documentada de la suma depositada en mi cuenta sueldo, para la comisión de viaje asignada.</p></div>" +
                                            "<p style='left:250px; position:absolute;'><span style='text-decoration: underline;'>{NombreEncargado}</span></p>" +
                                            "<br><p style='left:250px; position:absolute;'>FIRMA DEL SOLICITANTE</p>" +
                                            "<p style='text-align: center;'>&nbsp;</p>" +
                                            "<p style='text-align: center;'>&nbsp;</p>";
                    }


                    htmlFooter = htmlFooter.Replace("{NombreEncargado}", viatico.NombreEncargado== "" || viatico.NombreEncargado == null || viatico.NombreEncargado == "  " ? "______________": viatico.NombreEncargado);
                    htmlFooter = htmlFooter.Replace("{NombreEmpresa}", viatico.NombreEmpresa);
                    htmlFooter = htmlFooter.Replace("{TIPODOC}", viatico.TipoDocumento);
                    htmlFooter = htmlFooter.Replace("{DOC}", viatico.NumeroDocumento);
                };

                tableCabecera = "<div class='tablaDetalle'>" +
                    "<table style='height: 57px;' width='697px'>" +

                        "<tbody>" +

                            "<tr>" +
                                "<td class='cabezaTabla' style='width: 92.6042px;'><strong>TIPO</strong></td>" +

                                "<td class='cabezaTabla' style='width: 92.6042px;'><strong>CONCEPTO</strong></td>" +

                                "<td class='cabezaTabla' style='width: 92.6042px;'><strong>DETALLE</strong></td>" +

                                "<td class='cabezaTabla' style='width: 92.6042px;'><strong>CANTIDAD</strong></td>" +

                                "<td class='cabezaTabla' style='width: 92.6042px;'><strong>V.UNIT</strong></td>" +

                                "<td class='cabezaTabla' style='width: 92.6458px;'><strong>MONTO S/.</strong></td>" +

                            "</tr>";

                tableFooter = "<tr style='background-color: #eaeaea'>" +
                    "<td style='background-color: black;height:5px'></td>" +
                    "<td style='background-color: black;height:5px'></td>" +
                    "<td style='background-color: black;height:5px'></td>" +
                    "<td style='background-color: black;height:5px'></td>" +
                    "<td style='background-color: black;height:5px'></td>" +
                    "<td style='background-color: black;height:5px'></td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='total'></td>" +
                    "<td class='total'></td>" +
                    "<td class='total'></td>" +
                    "<td class='total'></td>" +
                    "<td class='total' style='font-size: 15px; background-color:#FAD619;'>TOTAL:</td>" +
                    "<td style='font-size: 15px;background-color: #eaeaea;'><strong>{Total}</strong></td>" +
                    "</tr>";

                decimal totalMonto = 0;
                if (viaticosDetalle.Count > 0)

                {
                    foreach (var viatico in viaticosDetalle)
                    {
                        IEnumerable<ViaticosDetalleDTO> lista1 = (viatico.Where(x => x.CodigoTipo == "TVT1"));            //validar para ambos códigos meterlo en la listas respectivas
                        IEnumerable<ViaticosDetalleDTO> lista2 = (viatico.Where(x => x.CodigoTipo == "TVT2"));            //validar para ambos códigos

                        if (lista1.Count() > 0)
                        {
                            tableContenido = tableContenido + "<tr><td class='seccion' colspan='6'><strong>{SECCION1}</strong></td></tr><tr>";

                            foreach (var detalle in lista1)
                            {
                                tableContenido = tableContenido + "<td style='width: 92.6042px;background-color: #eaeaea;'>{TIPO}</td>" +

                                "<td style='width: 92.6042px;background-color: #eaeaea;'>{CONCEPTO}</td>" +

                                "<td style='width: 92.6042px;background-color: #eaeaea;'>{DETALLE}</td>" +

                                "<td style='width: 92.6042px;background-color: #eaeaea;'>{CANTIDAD}</td>" +

                                "<td style='width: 92.6458px;background-color: #eaeaea;'>{V.UNIT}</td>" +

                                "<td style='width: 92.6458px;background-color: #eaeaea;'>{MONTO}</td>";

                                tableContenido = tableContenido.Replace("{SECCION1}", detalle.DescripcionTipo);

                                tableContenido = tableContenido.Replace("{TIPO}", detalle.Tipo);

                                tableContenido = tableContenido.Replace("{CONCEPTO}", detalle.Concepto);

                                tableContenido = tableContenido.Replace("{DETALLE}", detalle.Detalle);

                                tableContenido = tableContenido.Replace("{CANTIDAD}", detalle.Cantidad.ToString());

                                tableContenido = tableContenido.Replace("{V.UNIT}", "S/. " + detalle.ValorUnitario.ToString());

                                tableContenido = tableContenido.Replace("{MONTO}", "S/. " + detalle.Monto.ToString());

                                tableContenido = tableContenido + "</tr>";

                                totalMonto += detalle.Monto;
                            }
                        }
                        
                        if (lista2.Count() > 0)
                        {
                            tableContenido = tableContenido + "<tr><td class='seccion' colspan='6'><strong>{SECCION2}</strong></td></tr><tr>";

                            foreach (var detalle in lista2)
                            {
                                tableContenido = tableContenido + "<td style='width: 92.6042px;background-color: #eaeaea;'>{TIPO}</td>" +

                                "<td style='width: 92.6042px;background-color: #eaeaea;'>{CONCEPTO}</td>" +

                                "<td style='width: 92.6042px;background-color: #eaeaea;'>{DETALLE}</td>" +

                                "<td style='width: 92.6042px;background-color: #eaeaea;'>{CANTIDAD}</td>" +

                                "<td style='width: 92.6458px;background-color: #eaeaea;'>{V.UNIT}</td>" +

                                "<td style='width: 92.6458px;background-color: #eaeaea;'>{MONTO}</td>";

                                tableContenido = tableContenido.Replace("{SECCION2}", detalle.DescripcionTipo);

                                tableContenido = tableContenido.Replace("{TIPO}", detalle.Tipo);

                                tableContenido = tableContenido.Replace("{CONCEPTO}", detalle.Concepto);

                                tableContenido = tableContenido.Replace("{DETALLE}", detalle.Detalle);

                                tableContenido = tableContenido.Replace("{CANTIDAD}", detalle.Cantidad.ToString());

                                tableContenido = tableContenido.Replace("{V.UNIT}", "S/. " + detalle.ValorUnitario.ToString());

                                tableContenido = tableContenido.Replace("{MONTO}", "S/. " + detalle.Monto.ToString());

                                tableContenido = tableContenido + "</tr>";

                                totalMonto += detalle.Monto;
                            }
                        }
                        tableFooter = tableFooter.Replace("{Total}", "S/. " + totalMonto.ToString());
                    };

                }

                else
                {
                    tableContenido = "<tr><td colspan='6'>Sin detalle</td></tr><tr>";
                }
                
                tableCompleto = tableCabecera + tableContenido + tableFooter + "</tbody></table></div>";

                string style = "<style>" +
                                "td{border: 0.5px solid black;text-align: center;width: 30px;height: 2vh;font-size: 13px;}" +
                                ".total{border: none;text-align: center;}" +
                                ".cabezaTabla{;background-color:#FAD619;} " +
                                ".seccion{;background-color:#cdcdcd}" +
                                ".tablaDetalle{ height:625px; width: 770px;}"+
                                ".aprTabla{background-color: #eaeaea; border: 0.5px solid black;text-align: center;font-size: 13px;}</style>";

                htmlCompleto = htmlCabecera + tableCompleto +  htmlFooter + "</body>" + style + "</html>";

                if (htmlTotal == "")
                {
                    htmlTotal = htmlCompleto;
                }
                else
                {
                    htmlTotal = htmlTotal + htmlCompleto;
                }
                viaticos.Clear();
                viaticosDetalle.Clear();
                viaticosSeguimiento.Clear();
            };

            //armando cuerpo


            Document pdfDocument;

            PdfConverter pdfConverter = new PdfConverter();

            pdfConverter.LicenseKey = ConfigurationManager.AppSettings.Get("LicenseKeyWinnovative");
            
            if ( idsViaticos.Length == 1)
            {
                pdfConverter.HtmlViewerHeight = 1067;
            }

            pdfConverter.PdfDocumentOptions.LeftMargin = 30;

            pdfConverter.PdfDocumentOptions.TopMargin = 10;

            pdfConverter.PdfDocumentOptions.RightMargin = 30;

            pdfConverter.PdfDocumentOptions.BottomMargin = 10;

            pdfConverter.PdfDocumentOptions.FitHeight = false;

            pdfConverter.PdfDocumentOptions.FitWidth = false;

            pdfConverter.PdfDocumentOptions.AutoSizePdfPage = false;

            pdfConverter.PdfDocumentOptions.PdfPageSize = PdfPageSize.A4;

            pdfConverter.PdfDocumentOptions.PdfCompressionLevel = PdfCompressionLevel.NoCompression;

            pdfConverter.PdfDocumentOptions.PdfPageOrientation = PdfPageOrientation.Portrait;

            pdfDocument = pdfConverter.GetPdfDocumentObjectFromHtmlString(htmlTotal);


            string pao_files = ConfigurationManager.AppSettings.Get("RutaCargaViatico");

            string nombre = "VIATICOS" + "-REST-" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".pdf";

            var ruta_file = pao_files + nombre;

            pdfDocument.Save(pao_files + nombre);

            pdfDocument.Close();


            return Json(new

            {
                Status = 1,
                Archivo = nombre

            });

        }


        [HttpPost]
        public JsonResult ListarViaticos(FiltroViaticosDTO filtroViaticosDTO)
        {
            var viaticosBL = new ViaticosBL();
            var result = viaticosBL.ListarViaticos(filtroViaticosDTO);
            return Json(result);
        }

        [HttpPost]
        public JsonResult GrupoFiltrosViaticos(string nombreRol,int codArea)
        {
            var viaticosBL = new ViaticosBL();
            var response = viaticosBL.GrupoFiltrosViaticos(nombreRol,codArea);
            return Json(response);
        }

        [HttpPost]
        public JsonResult ObtenerEncargados(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            var empleadosBL = new EmpleadosBL();
            filtroEmpleadosDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = empleadosBL.ListarEmpleados(filtroEmpleadosDTO);
            var rs = new
            {
                response.Status,
                response.CurrentException,
                Result = response.Result.Select(i => new
                {
                    Id = i.CodigoEmpleado+"|"+i.Cargo.CodigoCargo,
                    Text = i.NombresCompletosEmpleado
                }).OrderBy(i => i.Text)
            };
            return Json(rs);

        }
        
        [HttpPost]
        public JsonResult EnviarAprobacion(string viaticos)
        {
            var result = new RespuestaDTO();
            try
            {
                var viaticosBL = new ViaticosBL();
                var procesosBL = new ProcesosBL();
                var plantillasBL = new PlantillasBL();


                //Validacion de registros de los viaticos seleccionados:
                var valida = viaticosBL.ValidarViaticos(viaticos);
                if(valida.Result.Codigo > 0)
                {
                    result.Codigo = 0;
                    result.Mensaje = valida.Result.Mensaje;
                }
                else { 

                string[] items = viaticos.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (string viatico in items)
                {
                    var filtro = new ViaticosDTO();
                    filtro.Accion = "E";
                    filtro.CodigoViatico = Convert.ToInt32(viatico);
                    filtro.UsuarioRegistra = User.ObtenerUsuario();
                    filtro.FechaViatico = DateTime.Now;
                    var response = viaticosBL.MantenimientoCabeceraViaticos(filtro);

                    //Se realiza el registro de seguimiento de workflow:
                    var log = new FiltroWorkflowLogDTO();
                    log.CodigoWorkflow = response.Result.Codigo;
                    log.Usuario = User.ObtenerUsuario();
                    log.CodigoEstado = "PAP";
                    log.UsuarioRegistro = User.ObtenerUsuario();
                    procesosBL.InsertarWorkflowLog(log);

                    //Envio de correo:
                    var filtros = new FiltroPlantillaDTO();
                    filtros.CodigoProceso = 4;
                    filtros.CodigoPlantilla = "PLANVIAPAP";
                    filtros.Usuario = User.ObtenerUsuario();
                    filtros.Codigo = Convert.ToInt32(viatico);

                    var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                    //Se verifica los adjuntos:
                    var adjuntos = new List<string>();
                    var documentosBL = new DocumentosBL();
                    var documentos =documentosBL.ConsultaDocumentos(response.Result.Codigo);
                    foreach(var doc in documentos.Result)
                    {
                        if(doc.CodigoTipoDocumento == "DV03" && doc.Eliminado == 0) //Solo documentos de tipo programacion:
                        {
                            string pao_files = ConfigurationManager.AppSettings.Get("tempFiles");
                            string ruta = pao_files + doc.RutaDocumento;
                            adjuntos.Add(ruta);
                        }
                    }

                    var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, adjuntos, "");
                    CCLog Log = new CCLog();
                    if (respuesta != "OK")
                    {
                        Log.TraceInfo("Viatico N° " + viatico + ":" + respuesta);
                    }
                    else
                    {
                        Log.TraceInfo("Envio exitoso de correo para el viatico N° " + viatico);
                    }

                }

                result.Codigo = 1;
                result.Mensaje = "Se realizó el envio de viáticos para su aprobación";

                }
            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }
        
        public JsonResult Aprobacion(string viaticos)
        {
            var result = new RespuestaDTO();
            try
            {
                var viaticosBL = new ViaticosBL();
                var procesosBL = new ProcesosBL();
                var plantillasBL = new PlantillasBL();
                string[] items = viaticos.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (string viatico in items)
                {
                    var filtro = new ViaticosDTO();
                    filtro.Accion = "T";
                    filtro.CodigoViatico = Convert.ToInt32(viatico);
                    filtro.UsuarioRegistra = User.ObtenerUsuario();
                    filtro.FechaViatico = DateTime.Now;
                    var response = viaticosBL.MantenimientoCabeceraViaticos(filtro);

                    //Se realiza el registro de seguimiento de workflow:
                    var log = new FiltroWorkflowLogDTO();
                    log.CodigoWorkflow = response.Result.Codigo;
                    log.Usuario = User.ObtenerUsuario();
                    log.CodigoEstado = "APR";
                    log.UsuarioRegistro = User.ObtenerUsuario();
                    procesosBL.InsertarWorkflowLog(log);

                    //Envio de correo:
                    var filtros = new FiltroPlantillaDTO();
                    filtros.CodigoProceso = 4;
                    filtros.CodigoPlantilla = "PLANVIAAPR";
                    filtros.Usuario = User.ObtenerUsuario();
                    filtros.Codigo = Convert.ToInt32(viatico);

                    var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                    var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null,"");

                    CCLog Log = new CCLog();
                    if (respuesta != "OK")
                    {

                        Log.TraceInfo("Viatico N° "+ viatico +":" +respuesta);
                    }
                    else
                    {
                        Log.TraceInfo("Envio exitoso de correo para el viatico N° " + viatico);
                    }


                }

                result.Codigo = 1;
                result.Mensaje = "Se realizó la aprobación de los viáticos seleccionados.";


            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult AnularViatico(ViaticosDTO viaticosDTO)
        {
            var result = new RespuestaDTO();
            try
            {
                var viaticosBL = new ViaticosBL();
                var procesosBL = new ProcesosBL();
                var plantillasBL = new PlantillasBL();

                viaticosDTO.Accion = "D";
                viaticosDTO.UsuarioRegistra = User.ObtenerUsuario();
                viaticosDTO.FechaViatico = DateTime.Now;
                var response = viaticosBL.MantenimientoCabeceraViaticos(viaticosDTO);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = response.Result.Codigo;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "ANU";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 4;
                filtros.CodigoPlantilla = "PLANVIAANU";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = viaticosDTO.CodigoViatico;

                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    
                    Log.TraceInfo("Viatico N° " + viaticosDTO.CodigoViatico.ToString() + ":"+respuesta);
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de correo para el viatico N° "+ viaticosDTO.CodigoViatico.ToString());
                }

                result.Codigo = 1;
                result.Mensaje = "Se realizó la anulación del viático.";


            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }


        [HttpPost]
        public void ExportarViaticos(FiltroViaticosDTO filtroViaticosDTO)
        {
            var viaticosBL = new ViaticosBL();
            var listaViaticos = viaticosBL.ListarViaticos(filtroViaticosDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Viaticos");

            // Creacion del estilo
            var fontbold = hssfworkbook.CreateFont();
            fontbold.Boldweight = (short)FontBoldWeight.Bold;
            fontbold.Color = HSSFColor.White.Index;
            fontbold.FontHeightInPoints = 8;
            fontbold.FontName = "Arial";

            var style = hssfworkbook.CreateCellStyle();
            style.SetFont(fontbold);
            style.BorderBottom = BorderStyle.Thin;
            style.BorderTop = BorderStyle.None;
            style.BorderRight = BorderStyle.None;
            style.BorderLeft = BorderStyle.None;
            style.FillForegroundColor = HSSFColor.Red.Index;
            style.FillPattern = FillPattern.SolidForeground;

            var fontBoldII = hssfworkbook.CreateFont();
            fontBoldII.Boldweight = (short)FontBoldWeight.Bold;
            fontBoldII.Color = HSSFColor.DarkBlue.Index;
            fontBoldII.FontHeightInPoints = 8;
            fontBoldII.FontName = "Arial";

            var styleII = hssfworkbook.CreateCellStyle();
            styleII.SetFont(fontBoldII);
            styleII.BorderBottom = BorderStyle.Thin;
            styleII.BorderTop = BorderStyle.None;
            styleII.BorderRight = BorderStyle.None;
            styleII.BorderLeft = BorderStyle.None;
            styleII.FillForegroundColor = HSSFColor.Yellow.Index;
            styleII.FillPattern = FillPattern.SolidForeground;

            IDataFormat dataFormatCustom = hssfworkbook.CreateDataFormat();
            var styleDate = hssfworkbook.CreateCellStyle();
            styleDate.DataFormat = dataFormatCustom.GetFormat("dd/MM/yyyy");

            var styleIII = hssfworkbook.CreateCellStyle();
            styleIII.SetFont(fontbold);
            styleIII.BorderBottom = BorderStyle.Thin;
            styleIII.BorderTop = BorderStyle.None;
            styleIII.BorderRight = BorderStyle.None;
            styleIII.BorderLeft = BorderStyle.None;
            styleIII.FillForegroundColor = HSSFColor.Red.Index;
            styleIII.FillPattern = FillPattern.SolidForeground;
            styleIII.DataFormat = dataFormatCustom.GetFormat("dd/MM/yyyy");


            // Impresion de cabeceras
            int rownum = 0;
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            NPOI.SS.UserModel.ICell cell;

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Solicitud");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Empresa");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("RUC Empresa");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Viático");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Area");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Cargo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Encargado");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Lugar de Destino");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Dias de Viaje");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Autorizado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Anulado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Abonado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Abono");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Observación");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = styleIII;
            cell.SetCellValue("Usuario Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");

            //// Impresión de la data
            foreach (var item in listaViaticos)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoViatico);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Empresa.Valor1);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Empresa.Valor2);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                DateTime fechaViatico = DateTime.Parse(item.FechaViatico.ToString("dd/MM/yyyy"));
                cell.SetCellValue(fechaViatico);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Area.NombreArea);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cargo.NombreCargo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Encargado.NombresCompletosEmpleado);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Ubigeo);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DiasViaje);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Autorizado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Anulado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Abonado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaAbonado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Observacion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                DateTime fechaRegistro = DateTime.Parse(item.FechaRegistro.ToString("dd/MM/yyyy"));
                cell.SetCellValue(fechaRegistro);
               

            }

            var filename = "REPORTE_VIATICOS_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }


    }
}