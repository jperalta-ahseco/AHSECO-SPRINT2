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

namespace AHSECO.CCL.FRONTEND.Controllers.ServicioTecnico.BandejaInstalacionTecnica
{
    public class BandejaInstalacionTecnicaController : Controller
    {
        //GET BandejaInstalacionTecnica
        [Permissions(Permissions = "BANDEJAINSTALACIONTECNICA")]
        public ActionResult Index()
        {
            return View();
        }
        
        public JsonResult ObtenerFiltrosInstalacion()
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.ObtenerFiltrosInstalacion();
            return Json(result);
        }

        public ActionResult RegistroInstallTec()
        {
            string[] cabeceraProductos1 =
            {
                "Id",
                "Descripcion",
                "Cantidad",
                "Modelo",
                "Serie"
            };

            string[] cabeceraProductos2 =
            {
                "Id",
                "Descripcion",
                "Cantidad",
                "Modelo",
                "Serie",
                "Fecha Instalación",
                "Fecha Real",
                "Acciones"
            };

            ViewBag.cabecera = cabeceraProductos1;

            return View();
        }

        public JsonResult RegistroRequerimientoMain(GrupoInstalacionTecnicaDTO grupoInstalacionTecnicaDTO)
        {
            try
            {
                var procesoBL = new ProcesosBL();
                var instalacionTecnicaBL = new InstalacionTecnicaBL();
                var documentosBL = new DocumentosBL();

                var workflow = new FiltroWorkflowDTO();
                workflow.CodigoProceso = 1; //Código de proceso de VENTAS
                workflow.UsuarioRegistro = User.ObtenerUsuario();
                workflow.SubTipo = "";

                var rpta = procesoBL.InsertarWorkflow(workflow);
                grupoInstalacionTecnicaDTO.CabeceraInstalacion.Id_WokFlow = rpta.Result;
                grupoInstalacionTecnicaDTO.CabeceraInstalacion.UsuarioRegistra = User.ObtenerUsuario();

                //Registra Main Solicitudes
                var mainSolicitudes = instalacionTecnicaBL.MantenimientoSolicitudes(solicitudVentaGrupoDTO.Solicitud);

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
                log.CodigoEstado = "REG";
                log.UsuarioRegistro = User.ObtenerUsuario();
                var result2 = procesoBL.InsertarWorkflowLog(log);

                //result.CodigoSolicitud = "1";
                //result.Mensaje = "Se realizo el registro con exito";
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

        public JsonResult MantInstalacion(InstalacionTecnicaDTO instalacion)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.MantInstalacion(instalacion);
            return Json(result);
        }

        /*Pendiente
        public JsonResult MantTecnicoxDetalle(TecnicoInstalacionDTO tecnico)
        {
            var instalacionTecnicaBL = new InstalacionTecnicaBL();
            var result = instalacionTecnicaBL.MantTecnicoxDetalle();
            return Json(result);
        }
        */
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
    }
}