using AHSECO.CCL.BD;
using AHSECO.CCL.BD.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BE.Ventas.Despacho;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AHSECO.CCL.BL.ServicioTecnico.BandejaInstalacionTecnica
{
    public class InstalacionTecnicaBL
    {
        private InstalacionTecnicaBD Repository;
        private CCLog Log;

        public InstalacionTecnicaBL() : this(new InstalacionTecnicaBD(), new CCLog())
        { }

        public InstalacionTecnicaBL(InstalacionTecnicaBD instalacionTecnicaBD, CCLog log)
        {
            Repository = instalacionTecnicaBD;
            Log = log;
        }

        public ResponseDTO<FiltroInstalacionTecnica> ObtenerFiltrosInstalacion()
        {
            try
            {
                var result = Repository.ObtenerFiltrosInstalacion();
                return new ResponseDTO<FiltroInstalacionTecnica>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<FiltroInstalacionTecnica>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> MantenimientoObservaciones(ObservacionDTO observacion)
        {
            try
            {
                var result = Repository.MantenimientoObservaciones(observacion);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<SolicitudDTO>> ObtenerSolicitudes(ReqDespachoCabecera req)
        {
            try
            {
                var result = Repository.ObtenerSolicitudes(req);
                return new ResponseDTO<IEnumerable<SolicitudDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<SolicitudDTO>>(ex);
            }
        }

        public ResponseDTO<GrupoSolicitudVentaTecDTO> ObtenerDetalleSolicitud(long id)
        {
            try
            {
                var result = Repository.ObtenerDetalleSolicitud(id);
                return new ResponseDTO<GrupoSolicitudVentaTecDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<GrupoSolicitudVentaTecDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<ContactoInstalDTO>> ObtenerContactos(long NumReq)
        {
            try
            {
                var result = Repository.ObtenerContactos(NumReq);
                return new ResponseDTO<IEnumerable<ContactoInstalDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ContactoInstalDTO>>(ex);
            }
        }

        public ResponseDTO<IEnumerable<ContactoDTO>> ObtenerContactosxRuc(ContactoDTO contacto)
        {
            try
            {
                var result = Repository.ObtenerContactosxRuc(contacto);
                return new ResponseDTO<IEnumerable<ContactoDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ContactoDTO>>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantContactos(ContactoInstalDTO contacto)
        {
            try
            {
                var result = Repository.MantContactos(contacto);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }
        public ResponseDTO<RespuestaDTO> MantInstalacion(InstalacionTecnicaDTO instalacion)
        {
            try
            {
                var result = Repository.MantInstalacion(instalacion);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantInstalacionTecnicaDetalle(InstalacionTecnicaDetalleDTO detalle)
        {
            try
            {
                var result = Repository.MantInstalacionTecnicaDetalle(detalle);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<List<InstalacionTecnicaDetalleDTO>> ObtenerDetalleInstalacion(InstalacionTecnicaDetalleDTO detalle)
        {
            try
            {
                var result = Repository.ObtenerDetalleInstalacion(detalle);
                return new ResponseDTO<List<InstalacionTecnicaDetalleDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<List<InstalacionTecnicaDetalleDTO>>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantTecnicoxDetalle(TecnicoInstalacionDTO tecnico)
        {
            try
            {
                var result = Repository.MantTecnicoxDetalle(tecnico);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }
        public ResponseDTO<RespuestaDTO> SetDatosElementos(ElementosxProductoDTO elemento)
        {
            try
            {
                var result = Repository.SetDatosElementos(elemento);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::<" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }
        public ResponseDTO<IEnumerable<InstalacionTecnicaDTO>> ObtenerInstalacionesTec(FiltroInstalacionTecDTO filtros)
        {
            try
            {
                var result = Repository.ObtenerInstalacionesTec(filtros);
                return new ResponseDTO<IEnumerable<InstalacionTecnicaDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<InstalacionTecnicaDTO>>(ex);
            }
        }

        public ResponseDTO<GrupoInstalacionTecnicaDTO> ObtenerMainInstalacion(long NumReq, long IdWorkFlow)
        {
            try
            {
                var result = Repository.ObtenerMainInstalacion(NumReq, IdWorkFlow);
                return new ResponseDTO<GrupoInstalacionTecnicaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<GrupoInstalacionTecnicaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<InstalacionTecnicaDetalleDTO>> ObtenerElementosdeProducto(long IdProducto)
        {
            try
            {
                var result = Repository.ObtenerElementosdeProducto(IdProducto);
                return new ResponseDTO<IEnumerable<InstalacionTecnicaDetalleDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + " :: " + ex.Message);
                return new ResponseDTO<IEnumerable<InstalacionTecnicaDetalleDTO>>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> CrearMantPrevent(long solicitud, string usuario, long id_despacho)
        {
            try
            {
                var result = Repository.CrearMantPrevent(solicitud, usuario, id_despacho);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::"+ ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<DetalleInfoSolDTO>> ObtenerDetalleInfoSolicitud(long codDetalle)
        {
            try
            {
                var result = Repository.ObtenerDetalleInfoSolicitud(codDetalle);
                return new ResponseDTO<IEnumerable<DetalleInfoSolDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<DetalleInfoSolDTO>>(ex);
            }
        }

    }
}
