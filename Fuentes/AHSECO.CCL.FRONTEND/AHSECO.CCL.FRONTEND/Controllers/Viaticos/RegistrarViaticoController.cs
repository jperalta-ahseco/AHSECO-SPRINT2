using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;
using CrystalDecisions.ReportAppServer.DataDefModel;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Reflection;
using System.Net.Mime;
using System.Net;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;
using NPOI.Util;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers.Viaticos
{
    public class RegistrarViaticoController: Controller
    {
        // GET: RegistrarConvenio
        [OutputCache(NoStore = true, Duration = 0)]
        [Permissions(Permissions = "BANDEJAVIATICO")]
        public ActionResult Registro()
        {
            var procesosBL = new ProcesosBL();
            var roles = procesosBL.ConsultaWorkFLowRoles(User.ObtenerUsuario(), 4).Result.FirstOrDefault();
            ViewBag.RolUsuario = roles.NombreRol;
            ViewBag.CodigoArea = roles.CodigoArea;
            return View();
        }


        [HttpPost]
        public virtual JsonResult UploadFiles(string extension)
        {
            CCLog log = new CCLog();
            try
            {
                log.TraceInfo(Utilidades.GetCaller());

                var correlativo = DateTime.Now.ToString("yyyyMMddHHmmss");
                string nombre = "VIA" + correlativo;
                string rutaArchivo = "";
                string fileName = "";

                string ruta_temporal = Utilidades.ObtenerValorConfig("tempFiles");
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


        [HttpPost]
        public JsonResult ListarTipoDetalleViatico()
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "TIPOVIATI";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            datosGeneralesDetalleDTO.Habilitado = true;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true).Select(i => new
                {
                    Id = i.CodValor1,
                    Text = i.Valor1
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult MantenimientoCabeceraViaticos(ViaticosDTO viaticosDTO)
        {
            var viaticosBL = new ViaticosBL();
            viaticosDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = viaticosBL.MantenimientoCabeceraViaticos(viaticosDTO);
            return Json(response);
        }

        [HttpPost]
        public JsonResult MantenimientoDetalleViaticos(ViaticosDetalleDTO viaticosDetalleDTO)
        {
            var viaticosBL = new ViaticosBL();
            viaticosDetalleDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = viaticosBL.MantenimientoDetalleViaticos(viaticosDetalleDTO);
            return Json(response);
        }

        [HttpPost]
        public JsonResult EnviarContabilidadViatico(ViaticosDTO viaticosDTO)
        {
            var result = new RespuestaDTO();
            try
            {
                var viaticosBL = new ViaticosBL();
                var procesosBL = new ProcesosBL();

                viaticosDTO.Accion = "C";
                viaticosDTO.UsuarioRegistra = User.ObtenerUsuario();
                viaticosDTO.FechaViatico = DateTime.Now;
                var response = viaticosBL.MantenimientoCabeceraViaticos(viaticosDTO);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = response.Result.Codigo;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "EAC";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 4;
                filtros.CodigoPlantilla = "PLANVIACON";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(viaticosDTO.CodigoViatico);
                var plantillasBL = new PlantillasBL();
                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Viatico N° " + viaticosDTO.CodigoViatico + ":" + respuesta);
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de correo para el viatico N° " + viaticosDTO.CodigoViatico);
                }



                result.Codigo = 1;
                result.Mensaje = "Se realizo el envío a contabilidad del viático.";


            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult AbonarViatico(ViaticosDTO viaticosDTO)
        {
            var result = new RespuestaDTO();
            try
            {
                var viaticosBL = new ViaticosBL();
                var procesosBL = new ProcesosBL();

                viaticosDTO.Accion = "B";
                viaticosDTO.UsuarioRegistra = User.ObtenerUsuario();
                var response = viaticosBL.MantenimientoCabeceraViaticos(viaticosDTO);

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = response.Result.Codigo;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "ABO";
                log.UsuarioRegistro = User.ObtenerUsuario();
                procesosBL.InsertarWorkflowLog(log);

                //Envio de correo:
                var filtros = new FiltroPlantillaDTO();
                filtros.CodigoProceso = 4;
                filtros.CodigoPlantilla = "PLANVIAABO";
                filtros.Usuario = User.ObtenerUsuario();
                filtros.Codigo = Convert.ToInt32(viaticosDTO.CodigoViatico);
                var plantillasBL = new PlantillasBL();
                var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;
                var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
                CCLog Log = new CCLog();
                if (respuesta != "OK")
                {
                    Log.TraceInfo("Viatico N° " + viaticosDTO.CodigoViatico + ":" + respuesta);
                }
                else
                {
                    Log.TraceInfo("Envio exitoso de correo para el viatico N° " + viaticosDTO.CodigoViatico);
                }

                result.Codigo = 1;
                result.Mensaje = "Se realizo el abono del viático.";


            }
            catch (Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult RegistrarNuevoViatico(ViaticosGrupalDTO viatico)
        {
            var result = new RespuestaDTO();
            try
            {
                var procesosBL = new ProcesosBL();
                var viaticosBL = new ViaticosBL();
                var documentosBL = new DocumentosBL();

                var workflow = new FiltroWorkflowDTO();
                workflow.CodigoProceso = 4; //Proceso de viaticos.
                workflow.UsuarioRegistro = User.ObtenerUsuario();
                workflow.SubTipo = "";
                var rpta = procesosBL.InsertarWorkflow(workflow);
                viatico.CabeceraViatico.CodigoWorkflow = rpta.Result;
                viatico.CabeceraViatico.UsuarioRegistra = User.ObtenerUsuario();

                //Se registra la cabecera de viaticos:
                var cabecera =viaticosBL.MantenimientoCabeceraViaticos(viatico.CabeceraViatico);


                //Se registra el detalle de viaticos:
                foreach (var x in viatico.DetallesViatico)
                {
                    x.Accion = "I";
                    x.CodigoViatico = cabecera.Result.Codigo;
                    x.UsuarioRegistra = User.ObtenerUsuario();
                    viaticosBL.MantenimientoDetalleViaticos(x);
                }

              

                result.Codigo = 1;
                result.Mensaje = "Se realizó la inserción de los registros de viaticos";

                //Se realiza el registro de seguimiento de workflow:
                var log = new FiltroWorkflowLogDTO();
                log.CodigoWorkflow = rpta.Result;
                log.Usuario = User.ObtenerUsuario();
                log.CodigoEstado = "REG";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesosBL.InsertarWorkflowLog(log);

                //Se registra los adjuntos:
                foreach (var doc in viatico.Adjuntos)
                {
                    doc.Accion = "I";
                    doc.CodigoWorkFlow = rpta.Result;
                    doc.NombreUsuario = User.ObtenerNombresCompletos();
                    doc.NombrePerfil = User.ObtenerPerfil();
                    doc.UsuarioRegistra = User.ObtenerUsuario();
                    documentosBL.MantenimientoDocumentos(doc);
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
        public JsonResult VerViaticos(int codViatico)
        {
            var viaticosBL = new ViaticosBL();
            var response = viaticosBL.VerViaticos(codViatico);
            return Json(response);
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

                result.Codigo = 1;
                result.Mensaje = "Se realizó la inserción del adjunto de viaticos";
            }
            catch(Exception ex)
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
            catch(Exception ex)
            {
                result.Codigo = 0;
                result.Mensaje = ex.Message.ToString();
            }
            return Json(new ResponseDTO<RespuestaDTO>(result));
        }

        [HttpPost]
        public JsonResult DownloadFiles(int id)
        {
            string ruta_temporal = ConfigurationManager.AppSettings.Get("tempFiles");

            string ruta_completa = ruta_temporal; //+ url;//url es lo que se generará.

            return Json(new
            {
                Status = 1,
                Archivo = ruta_completa
            });
        }



        public async Task<FileResult> DownloadDocumento(long codWorkflow, int codDocumento)
        {
            CCLog log = new CCLog();
            try
            {
                string ruta = ConfigurationManager.AppSettings.Get("tempFiles");
                var documentosBL = new DocumentosBL();
                var lista_documentos = documentosBL.ConsultaDocumentos(codWorkflow);

                var documentoDownload = lista_documentos.Result.Where(t => t.CodigoDocumento == codDocumento).First();

                string rutafinal = ruta + documentoDownload.RutaDocumento;

                if (System.IO.File.Exists(rutafinal))
                {
                    byte[] content = System.IO.File.ReadAllBytes(rutafinal);

                    var indexOfLastDot = rutafinal.LastIndexOf('.');
                    var fileName = Path.GetFileName(rutafinal);
                    var contentType = MimeMapping.GetMimeMapping(fileName);

                    return File(content, contentType, fileName);
                }
                else
                {
                    log.TraceError("La ruta no existe: " + rutafinal);
                    return null;
                }
            }
            catch (Exception ex)
            {
                log.TraceError(ex.ToString());
                return null;
            }
        }

    }
}