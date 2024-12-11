using AHSECO.CCL.BD;
using AHSECO.CCL.BD.Ventas;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
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

        public ResponseDTO<IEnumerable<CotDetCostoDTO>> ObtenerCotDetCostos(CotDetCostoDTO cotCostoDTO)
        {
            try
            {
                var result = Repository.ObtenerCotDetCostos(cotCostoDTO);
                return new ResponseDTO<IEnumerable<CotDetCostoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<CotDetCostoDTO>>(ex);
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

        public ResponseDTO<RespuestaDTO> MantenimientoCotizacionDetalle(CotizacionDetalleDTO cotizacionDetalle)
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

        public ResponseDTO<RespuestaDTO> MantenimientoCotDetDespacho(CotDetDespachoDTO detCotDespacho)
        {
            try
            {
                var result = Repository.MantenimientoCotDetDespacho(detCotDespacho);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantenimientoCotDetCosto(CotDetCostoDTO detCotCosto)
        {
            try
            {
                var result = Repository.MantenimientoCotDetCosto(detCotCosto);
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

        public ResponseDTO<FiltroGrupoSolicitudVentaDTO> GrupoSolicitudVentaFiltro(int codFlujo, long codSolicitud)
        {
            try
            {
                var result = Repository.GrupoSolicitudVentaFiltro(codFlujo, codSolicitud);
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

        public ResponseDTO<IEnumerable<ProcesoEstadoDTO>> ObtenerEstadosProcesos(ProcesoEstadoDTO procestDTO)
        {
            try
            {
                var result = Repository.ObtenerEstadosProcesos(procestDTO);
                return new ResponseDTO<IEnumerable<ProcesoEstadoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ProcesoEstadoDTO>>(ex);
            }
        }
		
		public ResponseDTO<IEnumerable<HistorialCotizacionCabeceraDTO>> ListarHistorialCotizacion(long codCotizacion, long codSolicitud)
        {
            try
            {
                var result = Repository.ListarHistorialCotizacion(codCotizacion, codSolicitud);
                return new ResponseDTO<IEnumerable<HistorialCotizacionCabeceraDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<HistorialCotizacionCabeceraDTO>>(ex);
            };
        }

        public ResponseDTO<DocumentoCotizacionDTO> ConsultaCotizacionCliente(long codCotizacion)
        {
            try
            {
                var result = Repository.ConsultaCotizacionCliente(codCotizacion);
                return new ResponseDTO<DocumentoCotizacionDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<DocumentoCotizacionDTO>(ex);
            };
        }

        public ResponseDTO<IEnumerable<ArticuloDTO>> ObtenerArticulosxFiltro(FiltroArticuloDTO filtro)
        {
            try
            {
                var result = Repository.ObtenerArticulosxFiltro(filtro);
                if (result != null)
                {
                    foreach(ArticuloDTO item in result)
                    {
                        if (item.Almacenes != null)
                        {
                            item.StockDisponible = item.Almacenes.Sum(y => y.StockDisponible);
                            if (item.StockDisponible > 0) { item.EsDisponible = true; }
                        }
                    }
                }
                return new ResponseDTO<IEnumerable<ArticuloDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ArticuloDTO>>(ex);
            }
        }

        public ResponseDTO<GuiaDTO> ConsultaGuia(long codSolicitud, string tipo)
        {
            try
            {
                var result = Repository.ConsultaGuia(codSolicitud,tipo);
                return new ResponseDTO<GuiaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<GuiaDTO>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> MantenimientoDespacho(DatosDespachoDTO datosDespachoDTO)
        {
            try
            {
                var result = Repository.MantenimientoDespacho(datosDespachoDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

        public ResponseDTO<ContadorCabeceraDespacho> ValidarDespacho(long CodigoSolicitud)
        {
            try
            {
                var result = Repository.ValidarDespacho(CodigoSolicitud);
                return new ResponseDTO<ContadorCabeceraDespacho>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<ContadorCabeceraDespacho>(ex);
            };
        }

        public ResponseDTO<DetalleDespachoDTO> VerDetalleItemDespacho(long codDetalleDespacho)
        {
            try
            {
                var result = Repository.VerDetalleItemDespacho(codDetalleDespacho);
                return new ResponseDTO<DetalleDespachoDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<DetalleDespachoDTO>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> ActualizarNumeroSerie(DatosActualizarSerieSTO datos)
        {
            try
            {
                var result = Repository.ActualizarNumeroSerie(datos);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> ActualizarEnvioDespacho(long CodigoSolicitud, string Stock, int EnvioGP, int EnvioBO,int EnvioFC, string Usuario)
        {
            try
            {
                var result = Repository.ActualizarEnvioDespacho(CodigoSolicitud,Stock,EnvioGP,EnvioBO, EnvioFC,Usuario);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> FinalizarVenta(DatosDespachoDTO datosDespachoDTO)
        {
            try
            {
                var result = Repository.FinalizarVenta(datosDespachoDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

        public ResponseDTO<CabeceraDespachoDTO> ValidarAprobacionSinStock(long CodigoSolicitud)
        {
            try
            {
                var result = Repository.ValidarAprobacionSinStock(CodigoSolicitud);

                return new ResponseDTO<CabeceraDespachoDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<CabeceraDespachoDTO>(ex);
            };
        }

        public ResponseDTO<IEnumerable<ClienteDTO>> ObtenerClientesVentas(ClienteDTO clienteDTO)
        {
            try
            {
                var result = Repository.ObtenerClientesVentas(clienteDTO);

                return new ResponseDTO<IEnumerable<ClienteDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> MantTecnicosDespacho(TecnicoGarantiaDTO tecnico)
        {
            try
            {
                var result = Repository.MantTecnicosDespacho(tecnico);

                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

    }
}
