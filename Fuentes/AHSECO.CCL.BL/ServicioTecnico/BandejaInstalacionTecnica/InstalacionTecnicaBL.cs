using AHSECO.CCL.BD.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
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

        public ResponseDTO<IEnumerable<SolicitudDTO>> ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            try
            {
                var result = Repository.ObtenerSolicitudes(solicitudDTO);
                return new ResponseDTO<IEnumerable<SolicitudDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<SolicitudDTO>>(ex);
            }
        }

        public ResponseDTO<SolicitudVentaGrupoDTO> ObtenerDetalleSolicitud(long id)
        {
            try
            {
                var result = Repository.ObtenerDetalleSolicitud(id);
                return new ResponseDTO<SolicitudVentaGrupoDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<SolicitudVentaGrupoDTO>(ex);
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
                Log.TraceError(Utilidades.GetCaller()   + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO> (ex);
            }
        }


        public ResponseDTO<RespuestaDTO> MantTecnicoxDetalle(TecnicoInstalacionDTO tecnico)
        {
            try
            {
                var result = Repository.MantTecnicoxDetalle(tecnico);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller()+"::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }
        public ResponseDTO<IEnumerable<InstalacionTecnicaDTO>> ObtenerInstalacionesTec(FiltroInstalacionTecDTO filtros)
        {
            try
            {
                var result = Repository.ObtenerInstalacionesTec(filtros);
                return new ResponseDTO<IEnumerable<InstalacionTecnicaDTO>> (result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() +"::" + ex.Message);
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
            catch(Exception ex)
            {
                Log.TraceError (Utilidades.GetCaller()+"::" + ex.Message);
                return new ResponseDTO<GrupoInstalacionTecnicaDTO> (ex);
            }
        }
    }
}
