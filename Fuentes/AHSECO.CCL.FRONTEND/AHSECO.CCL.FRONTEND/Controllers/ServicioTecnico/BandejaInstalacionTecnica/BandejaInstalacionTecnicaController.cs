using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using System.Net.Http;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Security;
using AHSECO.CCL.BL.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BL.Ventas;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BL.Mantenimientos;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.IO;
using System.Web;
using System.Configuration;
using static AHSECO.CCL.COMUN.ConstantesDTO;
using System.Web.Http.Results;
using Microsoft.Ajax.Utilities;
using System.Data.SqlTypes;
using System.Xml.XPath;

namespace AHSECO.CCL.FRONTEND.Controllers.ServicioTecnico.BandejaInstalacionTecnica
{
    public class BandejaInstalacionTecnicaController : Controller
    {
        //GET BandejaInstalacionTecnica
        [Permissions(Permissions = "BANDEJAINSTALACIONTECNICA")]
        public ActionResult Index()
        {
            VariableSesion.setCadena("NumReq", "");
            VariableSesion.setCadena("CodEstado", "");
            VariableSesion.setCadena("IdWorkFlow", "");
            VariableSesion.setCadena("TipoProceso", "");
            return View();
        }
        
        public JsonResult ObtenerFiltrosInstalacion()
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerFiltrosInstalacion();
            return Json(result);
        }
        public JsonResult ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerSolicitudes(solicitudDTO);
            return Json(result);
        }
        public JsonResult ObtenerDetalleSolicitud(long id)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerDetalleSolicitud(id);
            return Json(result);
        }
        public JsonResult ObtenerInstalacionesTec(FiltroInstalacionTecDTO filtros)
        {

            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerInstalacionesTec(filtros);
            return Json(result);
        }
        public JsonResult ObtenerMainInstalacion(long NumReq, long IdWorkFlow)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerMainInstalacion(NumReq, IdWorkFlow);
            return Json(result);
        }
        public JsonResult ObtenerDetalleInstalacion(InstalacionTecnicaDetalleDTO detalle)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerDetalleInstalacion(detalle);
            return Json(result);
        }

        [Permissions(Permissions = "BANDEJAINSTALACIONTECNICA")]
        public ActionResult RegistroInstallTec()
        {
            return View();
        }

        public JsonResult SetVariablesGenerales(InstalacionTecnicaDTO instalacion)
        {
            try
            {
                VariableSesion.setCadena("NumReq", instalacion.NumReq.ToString());
                VariableSesion.setCadena("CodEstado", instalacion.CodEstado);
                VariableSesion.setCadena("IdWorkFlow", instalacion.Id_WorkFlow.ToString());
                VariableSesion.setCadena("TipoProceso", instalacion.TipoProceso);
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
                    Message = ex.Message
                });
            }
        }
        public JsonResult RegistroRequerimientoMain(GrupoInstalacionTecnicaDTO grupoInstalacionTecnicaDTO)
        {
            try
            {
                var procesoBL = new ProcesosBL();
                var instalacionTecnicaBL = new InstalacionTecnicaBL();
                var documentosBL = new DocumentosBL();

                var workflow = new FiltroWorkflowDTO();
                workflow.CodigoProceso = 3; //Código de proceso de SERVICIO TÉCNICO
                workflow.UsuarioRegistro = User.ObtenerUsuario();
                workflow.SubTipo = "";

                var rpta = procesoBL.InsertarWorkflow(workflow);


                grupoInstalacionTecnicaDTO.CabeceraInstalacion.Id_WorkFlow = rpta.Result;
                grupoInstalacionTecnicaDTO.CabeceraInstalacion.UsuarioRegistra = User.ObtenerUsuario();

                //Registra Main Solicitudes
                var mainRequerimiento = instalacionTecnicaBL.MantInstalacion(grupoInstalacionTecnicaDTO.CabeceraInstalacion);

                foreach (var detalle in grupoInstalacionTecnicaDTO.DetalleInstalacion)
                {
                    detalle.TipoProceso = "I";
                    detalle.NumReq = mainRequerimiento.Result.Codigo;
                    detalle.UsuarioRegistra = User.ObtenerUsuario();
                    var rptaDetalle = instalacionTecnicaBL.MantInstalacionTecnicaDetalle(detalle);
                    if (rptaDetalle.Result.Codigo == 0)
                    {
                        return Json(new
                        {
                            Status = 0,
                            Mensaje = rptaDetalle.Result.Mensaje
                        });
                    };
                }

                //Registra documentos
                if (grupoInstalacionTecnicaDTO.Adjuntos != null)
                {
                    foreach (var documento in grupoInstalacionTecnicaDTO.Adjuntos)
                    {
                        documento.Accion = "I";
                        documento.CodigoWorkFlow = rpta.Result;
                        documento.NombreUsuario = User.ObtenerNombresCompletos();
                        documento.NombrePerfil = User.ObtenerPerfil();
                        documento.UsuarioRegistra = User.ObtenerUsuario();
                        documentosBL.MantenimientoDocumentos(documento);
                    };
                };

                if (grupoInstalacionTecnicaDTO.Observaciones != null)
                {
                    foreach (var observacion in grupoInstalacionTecnicaDTO.Observaciones)
                    {
                        observacion.Id_WorkFlow = rpta.Result;
                        observacion.Nombre_Usuario = User.ObtenerUsuario();
                        observacion.UsuarioRegistra = User.ObtenerUsuario();
                        observacion.Perfil_Usuario = User.ObtenerPerfil();

                        var resultObservacion = instalacionTecnicaBL.MantenimientoObservaciones(observacion);
                    };
                };

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = rpta.Result;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "STREG";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesoBL.InsertarWorkflowLog(log);

                //result.CodigoSolicitud = "1";
                //result.Mensaje = "Se realizo el registro con exito";
                return Json(new
                {
                    Status = 1,
                    Requerimiento = new InstalacionTecnicaDTO()
                    {
                        NumReq = mainRequerimiento.Result.Codigo,
                        Estado = grupoInstalacionTecnicaDTO.CabeceraInstalacion.Estado,
                        Id_WorkFlow = rpta.Result
                    }
                });
            }
            catch (Exception ex)
            {
                //result.Codigo = 0;
                //result.Mensaje = ex.Message.ToString();
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message,
                });
            }
            //return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        public virtual JsonResult UploadFiles(string extension)
        {
            CCLog log = new CCLog();
            try
            {
                log.TraceInfo(Utilidades.GetCaller());

                var correlativo = DateTime.Now.ToString("yyyyMMddHHmmss");
                string nombre = "INSTAL_TEC" + correlativo;
                string rutaArchivo = "";
                string fileName = "";

                string ruta_temporal = Utilidades.ObtenerValorConfig("tempFilesInsTec");
                string UploadSize = Utilidades.ObtenerValorConfig("UploadSize");

                log.TraceError("ruta_temporal::" + ruta_temporal);
                log.TraceError("UploadSize::" + UploadSize);

                string folder = DateTime.Now.ToString("yyyyMM");
                string rutafinal = ruta_temporal + folder;

                log.TraceError("rutafinal::" + rutafinal);

                bool exists = System.IO.Directory.Exists(rutafinal);

                if (!exists)
                    System.IO.Directory.CreateDirectory(rutafinal);


                if (System.IO.Directory.Exists(rutafinal))
                {
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

                        log.TraceError("rutaFin::" + rutaFin);

                        file.SaveAs(rutaFin); //File will be saved in application root



                    }
                    log.TraceError("Llego imprimir::" + folder + fileName);
                    return Json(folder + "\\" + nombre + "." + extension);
                }
                else
                {
                    log.TraceError("Ruta no existe::" + rutafinal);
                    return Json("false");
                }

            }
            catch (Exception ex)
            {
                log.TraceError(Utilidades.GetCaller() + "::Error::" + ex.Message.ToString());
                return Json("error");
            }
        }
        public JsonResult MantInstalacion(InstalacionTecnicaDTO instalacion)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            instalacion.UsuarioRegistra = User.ObtenerUsuario();
            var result = instalacionTecnicaBL.MantInstalacion(instalacion);
            return Json(result);
        }

        public JsonResult MantInstalacionTecnicaDetalle(InstalacionTecnicaDetalleDTO detalle)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            detalle.UsuarioRegistra = User.ObtenerUsuario();
            var result = instalacionTecnicaBL.MantInstalacionTecnicaDetalle(detalle);
            return Json(result);
        }

        public JsonResult MantTecnicoxDetalle(TecnicoInstalacionDTO tecnico)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            tecnico.UsuarioRegistra = User.ObtenerUsuario();
            var result = instalacionTecnicaBL.MantTecnicoxDetalle(tecnico);
            return Json(result);
        }

        public JsonResult SetDatosElementos(ElementosxProductoDTO elemento)
        {
            var rpta = new RespuestaDTO();
            var result = new ResponseDTO<RespuestaDTO>(rpta);

            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            elemento.UsuarioModifica = User.ObtenerUsuario();
            if (elemento.Id_DespachoList == null)
            {
                result = instalacionTecnicaBL.SetDatosElementos(elemento);
            }
            else
            {
                foreach (var producto in elemento.Id_DespachoList)
                {
                    elemento.Id = producto.Parse<long>();
                    result = instalacionTecnicaBL.SetDatosElementos(elemento);
                    if (result.Result.Codigo == 0)
                    {
                        return Json(result);
                    };
                }
            }
            return Json(result);
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
        public JsonResult GuardarObservacion(ObservacionDTO observacionDTO)
        {
            try
            {
                observacionDTO.UsuarioRegistra = User.ObtenerUsuario();
                var instalacionTecnicaBL = new InstalacionTecnicaBL();
                observacionDTO.Nombre_Usuario = User.ObtenerNombresCompletos();
                observacionDTO.Perfil_Usuario = User.ObtenerPerfil();
                observacionDTO.UsuarioRegistra = User.ObtenerUsuario();

                var resultObservacion = instalacionTecnicaBL.MantenimientoObservaciones(observacionDTO);

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
        public void GenerarReporte(FiltroInstalacionTecDTO filtros)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var instalaciones = instalacionTecnicaBL.ObtenerInstalacionesTec(filtros).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Requerimientos");

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
            ICell cell;

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Requerimiento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");    

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Cliente");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo de Venta");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Vendedor");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Empresa");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Máxima de Entrega");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Destinos (Departamentos)");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Proceso");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Contrato");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Orden Compra");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");


            //// Impresión de la data
            foreach (var item in instalaciones)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                var num_req = "000000" + item.NumReq.ToString();
                var format = num_req.Substring(num_req.Length - 6);
                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(format);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FecRegFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NomEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoVenta);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Vendedor);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaMax.ToString("dd/MM/yyyy"));

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Destino);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NroProceso);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Contrato);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.OrdenCompra);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Estado);

                sh.SetColumnWidth(0, 20 * 256);
                sh.SetColumnWidth(1, 20 * 256);
                sh.SetColumnWidth(2, 20 * 256);
                sh.SetColumnWidth(3, 20 * 256);
                sh.SetColumnWidth(4, 20 * 256);
                sh.SetColumnWidth(5, 20 * 256);
                sh.SetColumnWidth(6, 20 * 256);
                sh.SetColumnWidth(7, 20 * 256);
                sh.SetColumnWidth(8, 20 * 256);
                sh.SetColumnWidth(9, 20 * 256);
                sh.SetColumnWidth(10, 20 * 256);

            }

            var filename = "REPORTE" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
        public FileResult DescargarFile(string url, string nombreDoc)
        {
            string pao_files = ConfigurationManager.AppSettings.Get("tempFilesInsTec");
            string ruta = pao_files + url;

            var fileName = Path.GetFileName(url);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }

        public JsonResult EnProcesoInstalacion(InstalacionTecnicaDTO instalacion)
        {
            var result = new RespuestaDTO();
            try
            {
                var instalacionBL = new InstalacionTecnicaBL();
                var procesosBL = new ProcesosBL();

                var response = instalacionBL.MantInstalacion(instalacion);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = instalacion.Id_WorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "STEPI";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                result.Codigo = 1;
                result.Mensaje = "Se realizó el cambio de estado satisfactoriamente";
                return Json(new
                {
                    Status = 1,
                    Message = result.Mensaje
                });
            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = "Ocurrió un error al realizar el cambio de estado, por favor revisar." + ex.Message;
                return Json(new
                {
                    Status = 0,
                    Message = result.Mensaje
                });
            }
        }

        public JsonResult Instalado(InstalacionTecnicaDTO instalacion)
        {
            var result = new RespuestaDTO();
            try
            {
                var instalacionBL = new InstalacionTecnicaBL();
                var procesosBL = new ProcesosBL();

                var response = instalacionBL.MantInstalacion(instalacion);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = instalacion.Id_WorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "STINS";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                result.Codigo = 1;
                result.Mensaje = "Se realizó el cambio de estado satisfactoriamente";
                return Json(new
                {
                    Status = 1,
                    Message = result.Mensaje
                });
            }
            catch(Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = "Ocurrió un error al realizar el cambio de estado, por favor revisar." + ex.Message;
                return Json(new
                {
                    Status = 0, 
                    Message = result.Mensaje
                });
            }
        }
        public JsonResult CerrarInstalacion(InstalacionTecnicaDTO instalacion)
        {
            var result = new RespuestaDTO();
            var instalacionBL = new InstalacionTecnicaBL();
            var procesosBL = new ProcesosBL();

            try
            {
                var response = instalacionBL.MantInstalacion(instalacion);
                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = instalacion.Id_WorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "STFIN";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 3;
                filtros.CodigoPlantilla = "PLANINSTEC";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(instalacion.NumReq);

                //Se verifica los adjuntos:
                var adjuntos = new List<string>();
                var documentosBL = new DocumentosBL();
                var documentos = documentosBL.ConsultaDocumentos(instalacion.Id_WorkFlow);
                foreach (var doc in documentos.Result)
                {
                    if (doc.CodigoTipoDocumento == "DI01" && doc.Eliminado == 0) //Solo documentos de tipo Acta de Instalación:
                    {
                        string pao_files = ConfigurationManager.AppSettings.Get("tempFilesInsTec");
                        string ruta = pao_files + doc.RutaDocumento;
                        adjuntos.Add(ruta);
                    }
                }

                //Envío de correo.
                var plantillasBL = new PlantillasBL();
                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, adjuntos, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Requerimiento N° " + instalacion.NumReq + ":" + respuesta);
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de correo para el requerimiento N° " + instalacion.NumReq);
                }

                result.Codigo = 1;
                result.Mensaje = "Se realizó el envío de correo a las áreas implicadas.";
                return Json(
                    new
                    {
                        Status= result.Codigo
                        ,Mensaje= result.Mensaje
                    });
            }
            catch(Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message;
                return Json(new
                {

                    Status = result.Codigo,
                    Mensaje = result.Mensaje
                });
            }
        }

        public JsonResult ObtenerElementosdeProducto(long IdProducto)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerElementosdeProducto(IdProducto);
            return Json(result);
        }


        public JsonResult CrearMantPrevent(long solicitud)
        {
            var instalacionBL = new InstalacionTecnicaBL();
            var usuario = User.ObtenerUsuario();
            var result = instalacionBL.CrearMantPrevent(solicitud, usuario);
            return Json(result);
        }

        public JsonResult ObtenerDetalleInfoSolicitud(long codDetalle)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerDetalleInfoSolicitud(codDetalle);
            return Json(result);
        }

        #region Tecnico/Empleados
        public JsonResult ObtenerTecnico(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            var empleadosBL = new EmpleadosBL();
            filtroEmpleadosDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = empleadosBL.ListarEmpleados(filtroEmpleadosDTO);
            return Json(response);
        }

        #endregion


    }
}