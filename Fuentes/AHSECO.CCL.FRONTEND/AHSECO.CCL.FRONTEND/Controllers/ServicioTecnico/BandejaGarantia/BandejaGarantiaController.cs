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
using AHSECO.CCL.BL.ServicioTecnico.BandejaGarantias;
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
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using Microsoft.Identity.Client;

namespace AHSECO.CCL.FRONTEND.Controllers.ServicioTecnico.BandejaGarantia
{
    public class BandejaGarantiaController : Controller
    {
        //GET BandejaGarantia
        [Permissions(Permissions = "BANDEJAGARANTIA")]
        public ActionResult Index()
        {
            VariableSesion.setCadena("NumReclamo", "");
            VariableSesion.setCadena("CodEstado", "");
            VariableSesion.setCadena("IdWorkFlow", "");
            VariableSesion.setCadena("TipoProceso", "");
            return View();
        }
        
        public JsonResult ObtenerFiltrosGarantias()
        {
            var garantiasBL = new GarantiasBL();
            var result = garantiasBL.ObtenerFiltrosGarantias();
            return Json(result);
        }
        public JsonResult ObtenerReclamos(FiltroReclamosDTO filtros)
        {

            var garantiasBL = new GarantiasBL();
            var result = garantiasBL.ObtenerReclamos(filtros);
            return Json(result);
        }
        public JsonResult SetVariablesGenerales(ReclamosDTO reclamo)
        {
            try
            {
                VariableSesion.setCadena("NumReclamo", reclamo.Id_Reclamo.ToString());
                VariableSesion.setCadena("CodEstado", reclamo.CodEstado);
                VariableSesion.setCadena("IdWorkFlow", reclamo.Id_Workflow.ToString());
                VariableSesion.setCadena("TipoProceso", reclamo.TipoProceso);
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

        public JsonResult ObtenerMainReclamo(long NumReclamo, long IdWorkFlow)
        {
            var garantiasBL = new GarantiasBL();
            var result = garantiasBL.ObtenerMainReclamo(NumReclamo, IdWorkFlow);
            return Json(result);
        }
        public ActionResult RegistroGarantia()
        {
            return View();
        }

        public JsonResult ObtenerDatosEquipo(string NumSerie)
        {
            var garantiasBL = new GarantiasBL();
            var result = garantiasBL.ObtenerDatosEquipo(NumSerie);
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
                string nombre = "REC" + correlativo;
                string rutaArchivo = "";
                string fileName = "";

                string ruta_temporal = Utilidades.ObtenerValorConfig("tempFilesReclamo");
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

        public JsonResult RegistroGarantiaMain(GrupoReclamoDTO grupoReclamoDTO)
        {
            try
            {
                var procesoBL = new ProcesosBL();
                var garantiasBL = new GarantiasBL();
                var documentosBL = new DocumentosBL();

                var workflow = new FiltroWorkflowDTO();
                workflow.CodigoProceso = 7; //Código de proceso de GARANTIAS
                workflow.UsuarioRegistro = User.ObtenerUsuario();
                workflow.SubTipo = "";

                var rpta = procesoBL.InsertarWorkflow(workflow);
                grupoReclamoDTO.Reclamo.Id_Workflow = rpta.Result;
                grupoReclamoDTO.Reclamo.UsuarioRegistra = User.ObtenerUsuario();

                //Registra Main Solicitudes
                var mainReclamo = garantiasBL.MantReclamo(grupoReclamoDTO.Reclamo);

                foreach (var tecnico in grupoReclamoDTO.Tecnicos)
                {
                    tecnico.TipoProceso = "I";
                    tecnico.Id_Reclamo = mainReclamo.Result.Codigo;
                    tecnico.UsuarioRegistra = User.ObtenerUsuario();
                    var rptaTecnico = garantiasBL.MantTecnicosReclamo(tecnico);
                    if (rptaTecnico.Result.Codigo == 0)
                    {
                        return Json(new
                        {
                            Status = 0,
                            Mensaje = rptaTecnico.Result.Mensaje
                        });
                    };
                }

                //Registra documentos
                if (grupoReclamoDTO.Adjuntos != null)
                {
                    foreach (var documento in grupoReclamoDTO.Adjuntos)
                    {
                        documento.Accion = "I";
                        documento.CodigoWorkFlow = rpta.Result;
                        documento.NombreUsuario = User.ObtenerNombresCompletos();
                        documento.NombrePerfil = User.ObtenerPerfil();
                        documento.UsuarioRegistra = User.ObtenerUsuario();
                        documentosBL.MantenimientoDocumentos(documento);
                    };
                };

                if (grupoReclamoDTO.Observaciones != null)
                {
                    foreach (var observacion in grupoReclamoDTO.Observaciones)
                    {
                        observacion.Id_WorkFlow = rpta.Result;
                        observacion.Nombre_Usuario = User.ObtenerUsuario();
                        observacion.UsuarioRegistra = User.ObtenerUsuario();
                        observacion.Perfil_Usuario = User.ObtenerPerfil();

                        var resultObservacion = garantiasBL.MantenimientoObservaciones(observacion);
                    };
                };

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = rpta.Result;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "REG";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesoBL.InsertarWorkflowLog(log);

                return Json(new
                {
                    Status = 1
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

        public JsonResult MantReclamo(ReclamosDTO reclamo)
        {
            var garantiaBL = new GarantiasBL();
            reclamo.UsuarioRegistra = User.ObtenerUsuario();
            var result = garantiaBL.MantReclamo(reclamo);
            return Json(result);
        }

        public JsonResult MantTecnicosReclamo(TecnicoGarantiaDTO tecnico)
        {
            var garantiaBL = new GarantiasBL();
            tecnico.UsuarioRegistra = User.ObtenerUsuario();
            var result = garantiaBL.MantTecnicosReclamo(tecnico);
            return Json(result);
        }

        public JsonResult ObtenerTecnicosReclamo(long numReclamo)
        {
            var garantiasBL = new GarantiasBL();
            var result = garantiasBL.ObtenerTecnicosReclamo(numReclamo);
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
                var garantiasBL = new GarantiasBL();
                observacionDTO.Nombre_Usuario = User.ObtenerNombresCompletos();
                observacionDTO.Perfil_Usuario = User.ObtenerPerfil();
                observacionDTO.UsuarioRegistra = User.ObtenerUsuario();

                var resultObservacion = garantiasBL.MantenimientoObservaciones(observacionDTO);

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
        public void GenerarReporte(FiltroReclamosDTO filtros)
        {
            var garantiasBL = new GarantiasBL();
            var garantias = garantiasBL.ObtenerReclamos(filtros).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Reclamos");

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
            cell.SetCellValue("N° Reclamo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre de Cliente");    

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Serie");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Reclamo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Urgencia");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Programación");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Técnico Asignado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");


            //// Impresión de la data
            foreach (var item in garantias)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                var num_rec = "000000" + item.Id_Reclamo.ToString();
                var format = num_rec.Substring(num_rec.Length - 6);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(format);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NomEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Serie);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaReclamo.ToString("dd/MM/yyyy"));

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Urgencia);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaProgramacionFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NomTecnico);

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

            }

            var filename = "REPORTE_GAR_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
        public FileResult DescargarFile(string url, string nombreDoc)
        {
            string pao_files = ConfigurationManager.AppSettings.Get("tempFilesReclamo");
            string ruta = pao_files + url;

            var fileName = Path.GetFileName(url);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }
        
        public JsonResult FinalizarGarantia(ReclamosDTO reclamo)
        {
            var result = new RespuestaDTO();
            var garantiaBL = new GarantiasBL();
            var procesosBL = new ProcesosBL();

            try
            {
                var respuesta = garantiaBL.MantReclamo(reclamo);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = reclamo.Id_Workflow;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "FIN";
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