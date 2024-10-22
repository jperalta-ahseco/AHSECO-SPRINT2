using AHSECO.CCL.BD;
using AHSECO.CCL.BD.Ventas;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL.Ventas
{
    public class VentasBL
    {
        private VentasBD Repository;

        private CCLog Log;
        public VentasBL() : this(new VentasBD(), new CCLog())
        { }


        public VentasBL(VentasBD ventasBD, CCLog log)
        {
            Repository = ventasBD;
            Log = log;
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

        public ResponseDTO<IEnumerable<CotizacionDTO>> ObtenerCotizacionVenta(CotizacionDTO cotizacionDTO)
        {
            try
            {
                var result = Repository.ObtenerCotizacionVenta(cotizacionDTO);
                return new ResponseDTO<IEnumerable<CotizacionDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<CotizacionDTO>>(ex);
            }
        }

        public ResponseDTO<IEnumerable<CotizacionDetalleDTO>> ObtenerCotizacionVentaDetalle(CotizacionDetalleDTO cotizacionDetDTO)
        {
            try
            {
                var result = Repository.ObtenerCotizacionVentaDetalle(cotizacionDetDTO);
                return new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<CotizacionDetalleDTO>>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantenimientoSolicitudes(SolicitudDTO solicitudDTO)
        {

            try
            {
                var result = Repository.MantenimientoSolicitudes(solicitudDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantenimientoCotizacion(CotizacionDTO cotizacion)
        {
            try
            {
                var result = Repository.MantenimientoCotizacion(cotizacion);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantenimientoCotizacionDetalle(DetalleCotizacionDTO cotizacionDetalle)
        {
            try
            {
                var result = Repository.MantenimientoCotizacionDetalle(cotizacionDetalle);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantenimientoObservaciones(ObservacionDTO observacion)
        {
            try
            {
                var result = Repository.MantenimientoObservaciones(observacion);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<SolicitudVentaGrupoDTO> VerDetalleSolicitud(SolicitudDTO solicitudDTO)
        {
            try
            {
                var result = Repository.VerDetalleSolicitud(solicitudDTO);
                return new ResponseDTO<SolicitudVentaGrupoDTO>(result);
            }
            catch( Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<SolicitudVentaGrupoDTO>(ex);
            };
        }

        public ResponseDTO<FiltroGrupoSolicitudVentaDTO> GrupoSolicitudVentaFiltro()
        {
            try
            {
                var result = Repository.GrupoSolicitudVentaFiltro();
                return new ResponseDTO<FiltroGrupoSolicitudVentaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<FiltroGrupoSolicitudVentaDTO>(ex);
            };
        }

        public ResponseDTO<bool> ActualizarSolicitudEstado(SolicitudDTO solicitudDTO)
        {
            try
            {
                var result = Repository.ActualizarSolicitudEstado(solicitudDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

    }
}
