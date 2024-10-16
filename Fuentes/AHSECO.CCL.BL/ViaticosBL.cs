using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.Collections.Generic;
using AHSECO.CCL.BE.Filtros;

namespace AHSECO.CCL.BL
{
    public class ViaticosBL
    {
        private ViaticosBD Repository;

        private CCLog Log;
        public ViaticosBL()
            : this(new ViaticosBD(), new CCLog())
        {
        }
        public ViaticosBL(ViaticosBD viaticosBD, CCLog log)
        {
            Repository = viaticosBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<ViaticosDTO>> ListarViaticos(FiltroViaticosDTO filtroViaticosDTO)
        {
            try
            {
                var result = Repository.ListarViaticos(filtroViaticosDTO);
                return new ResponseDTO<IEnumerable<ViaticosDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<ViaticosDTO>>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> ValidarViaticos(string codigos)
        {
            try
            {
                var result = Repository.ValidarViaticos(codigos);

                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<FiltroGrupoViaticosDTO> GrupoFiltrosViaticos(string nombreRol,int codArea)
        {
            try
            {
                var result = Repository.GrupoFiltrosViaticos(nombreRol,codArea);

                return new ResponseDTO<FiltroGrupoViaticosDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<FiltroGrupoViaticosDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO>  MantenimientoCabeceraViaticos(ViaticosDTO viaticosDTO)
        {
            try
            {
                var result = Repository.MantenimientoCabeceraViaticos(viaticosDTO);

                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantenimientoDetalleViaticos(ViaticosDetalleDTO viaticosDetalleDTO)
        {
            try
            {
                var result = Repository.MantenimientoDetalleViaticos(viaticosDetalleDTO);

                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<CargoDTO>> ObtenerCargosxAreaViaticos(int codigoArea)
        {
            try
            {
                var result = Repository.ObtenerCargosxAreaViaticos(codigoArea);

                return new ResponseDTO<IEnumerable<CargoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<CargoDTO>>(ex);
            }
        }

        public ResponseDTO<ViaticosGrupalDTO> VerViaticos(int codViatico)
        {
            try
            {
                var result = Repository.VerViaticos(codViatico);

                return new ResponseDTO<ViaticosGrupalDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<ViaticosGrupalDTO>(ex);
            }
        }
    }
}
