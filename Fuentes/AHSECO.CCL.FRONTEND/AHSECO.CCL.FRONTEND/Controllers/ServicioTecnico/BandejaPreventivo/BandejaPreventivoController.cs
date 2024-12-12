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
using AHSECO.CCL.BL.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos;
using static NPOI.HSSF.Util.HSSFColor;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using AHSECO.CCL.BL.ServicioTecnico.BandejaGarantias;

namespace AHSECO.CCL.FRONTEND.Controllers.ServicioTecnico.BandejaPreventivo
{
    public class BandejaPreventivoController : Controller
    {
        //GET BandejaPreventivo
        [Permissions(Permissions = "BANDEJAPREVENTIVO")]
        public ActionResult Index()
        {
            VariableSesion.setCadena("NumMant", "");
            VariableSesion.setCadena("TipoTarea", "");

            return View();
        }
        
        public ActionResult RegistroPreventivo()
        {
            VariableSesion.setCadena("NumPreventivo", "");
            VariableSesion.setCadena("TipoAccion", "");
            VariableSesion.setCadena("EstadoPrev", "");
            VariableSesion.setCadena("idWorkFlow", "");
            VariableSesion.setCadena("IdMant", "");
            return View();
        }

        public ActionResult DetallePreventivo()
        {
            return View();
        }

        public JsonResult ObtenerFiltrosPreventivos()
        {
            var preventivosBL = new PreventivosBL();
            var result = preventivosBL.ObtenerFiltrosPreventivos();
            return Json(result);
        }

        public JsonResult ObtenerPreventivos(ReqPreventivoDTO req)
        {
            var preventivosBL = new PreventivosBL();
            var result = preventivosBL.ObtenerPreventivos(req);
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

        public JsonResult ObtenerTecnicosPreventivos(long NumPreventivo)
        {
            var preventivosBL = new PreventivosBL();
            var result = preventivosBL.ObtenerTecnicosPreventivos(NumPreventivo);
            return Json(result);
        }

        public JsonResult MantTecnicosPrev(TecnicoMantPreventivoDTO tecnico)
        {
            var preventivoBL = new PreventivosBL();
            tecnico.UsuarioRegistra = User.ObtenerUsuario();
            var result = preventivoBL.MantTecnicosPrev(tecnico);
            return Json(result);
        }
        public JsonResult ObtenerMainMant(long NumMant)
        {
            var preventivoBL = new PreventivosBL();
            var result = preventivoBL.ObtenerMainMant(NumMant);
            return Json(result);
        }
        public JsonResult ObtenerDetalleInstalacion(InstalacionTecnicaDetalleDTO detalle)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerDetalleInstalacion(detalle);
            return Json(result);
        }
        public JsonResult SetVariablesGenerales(ReqPreventivoDTO req)
        {
            try
            {
                VariableSesion.setCadena("NumMant", req.Id_Mant.ToString());
                VariableSesion.setCadena("TipoTarea", req.TipoTarea);

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

        public JsonResult ProgramarMant(ReqPreventivoDTO req)
        {
            var preventivoBL = new PreventivosBL();
            var procesosBL = new ProcesosBL();

            try
            {
                req.UsuarioRegistra = User.ObtenerUsuario();
                var respuesta = preventivoBL.MantPreventivos(req);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = req.Id_WorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "PROG";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesosBL.InsertarWorkflowLog(log);


                if (respuesta.Result.Codigo == 0)
                {
                    return Json(new
                    {
                        Status = 0,
                        Mensaje = respuesta.Result.Mensaje
                    });
                }
                else
                {
                    return Json(new
                    {
                        Status = 1,
                        Mensaje = respuesta.Result.Mensaje
                    });
                }

            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message
                });
            }
        }

        public JsonResult FinalizarMant(ReqPreventivoDTO req)
        {
            var preventivoBL = new PreventivosBL();
            var procesosBL = new ProcesosBL();

            try
            {
                req.UsuarioRegistra = User.ObtenerUsuario();
                var respuesta = preventivoBL.MantPreventivos(req);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = req.Id_WorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "FIN";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesosBL.InsertarWorkflowLog(log);

                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 6;
                filtros.CodigoPlantilla = "PLANPREV";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(req.Id_Detalle);

                var adjuntos = new List<string>();
                var documentosBL = new DocumentosBL();
                var documentos = documentosBL.ConsultaDocumentos(respuesta.Result.Codigo);
                foreach (var doc in documentos.Result)
                {
                    if (doc.CodigoTipoDocumento == "DP04" && doc.Eliminado == 0) //Solo documentos de tipo Acta de Instalación:
                    {
                        string pao_files = ConfigurationManager.AppSettings.Get("tempMantPreventivo");
                        string ruta = pao_files + doc.RutaDocumento;
                        adjuntos.Add(ruta);
                    };
                };

                //Envío de correo.
                var plantillasBL = new PlantillasBL();
                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                var response = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, adjuntos, "");
                CCLog Log = new CCLog();
                if (response != "OK")
                {
                    Log.TraceInfo("Mantenimiento N° " + req.Id_Detalle + ":" + respuesta);
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de correo para el mantenimiento N° " + req.Id_Detalle);
                }

                if (respuesta.Result.Codigo == 0)
                {
                    return Json(new
                    {
                        Status = 0,
                        Mensaje = respuesta.Result.Mensaje
                    });
                }
                else
                {
                    return Json(new
                    {
                        Status = 1,
                        Mensaje = respuesta.Result.Mensaje
                    });
                }

            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message
                });
            }
        }

        public JsonResult CerrarMantenimiento(ReqPreventivoDTO req)
        {
            var preventivoBL = new PreventivosBL();
            var procesosBL = new ProcesosBL();

            try
            {
                req.UsuarioRegistra = User.ObtenerUsuario();
                var respuesta = preventivoBL.MantPreventivos(req);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = req.Id_WorkFlow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "COM";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesosBL.InsertarWorkflowLog(log);


                if (respuesta.Result.Codigo == 0)
                {
                    return Json(new
                    {
                        Status = 0,
                        Mensaje = respuesta.Result.Mensaje
                    });
                }
                else
                {
                    return Json(new
                    {
                        Status = 1,
                        Mensaje = respuesta.Result.Mensaje
                    });
                }

            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Mensaje = ex.Message
                });
            }
        }


        public virtual JsonResult UploadFiles(string extension)
        {
            CCLog log = new CCLog();
            try
            {
                log.TraceInfo(Utilidades.GetCaller());

                var correlativo = DateTime.Now.ToString("yyyyMMddHHmmss");
                string nombre = "MANTPREV" + correlativo;
                string rutaArchivo = "";
                string fileName = "";

                string ruta_temporal = Utilidades.ObtenerValorConfig("tempMantPreventivo");
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


        public JsonResult SetMantPrev(MantPreventivoDTO mantenimiento)
        {
            try
            {
                VariableSesion.setCadena("NumPreventivo", mantenimiento.Id.ToString());
                VariableSesion.setCadena("TipoAccion", mantenimiento.TipoTarea);
                VariableSesion.setCadena("EstadoPrev", mantenimiento.CodEstado);
                VariableSesion.setCadena("idWorkFlow", mantenimiento.Id_WorkFlow.ToString());
                VariableSesion.setCadena("IdMant", mantenimiento.Id_Mant.ToString());
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

        public JsonResult MantPreventivos(ReqPreventivoDTO req)
        {
            var preventivoBL = new PreventivosBL();
            req.UsuarioRegistra = User.ObtenerUsuario();
            var result = preventivoBL.MantPreventivos(req);
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
        public void GenerarReporte(ReqPreventivoDTO req)
        {
            var preventivoBL = new PreventivosBL();
            var preventivos = preventivoBL.ObtenerPreventivos(req).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Mant. Preventivos");

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
            cell.SetCellValue("Número de Mantenimiento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Número de Serie");    

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre de Equipo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Instalación");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Próximo mantenimiento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Total de Preventivos");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Preventivos Realizados");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Preventivos Pendientes");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ubicación de Instalación");

            //// Impresión de la data
            foreach (var item in preventivos)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Id_Mant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Serie);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                DateTime fechaRegistro = DateTime.Parse(item.FechaInstalacion.ToString("dd/MM/yyyy"));
                cell.SetCellValue(fechaRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ProxFechaMant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TotalPrevent);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PreventReal);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PreventPend);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UbigeoDest);

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
            string pao_files = ConfigurationManager.AppSettings.Get("tempMantPreventivo");
            string ruta = pao_files + url;

            var fileName = Path.GetFileName(url);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
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
                log.CodigoWorkflow = response.Result.Codigo;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "STINS";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 3;
                filtros.CodigoPlantilla = "PLANINSTECVEN";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(instalacion.NumReq);

                //Se verifica los adjuntos:
                var adjuntos = new List<string>();
                var documentosBL = new DocumentosBL();
                var documentos = documentosBL.ConsultaDocumentos(response.Result.Codigo);
                foreach (var doc in documentos.Result)
                {
                    if (doc.CodigoTipoDocumento == "DI01" && doc.Eliminado == 0) //Solo documentos de tipo Acta de Instalación:
                    {
                        string pao_files = ConfigurationManager.AppSettings.Get("tempFiles");
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
                return Json(result);
            }
            catch(Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message;
                return Json(result);
            }
        }

        public JsonResult ObtenerMainPreventivo(long NumPreventivo, long IdWorkFlow)
        {
            var preventivosBL = new PreventivosBL();
            var result = preventivosBL.ObtenerMainPreventivo(NumPreventivo, IdWorkFlow);
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