using AHSECO.CCL.BD.ServicioTecnico.BandejaGarantias;
using System;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using System.Collections.Generic;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using System.DirectoryServices;

namespace AHSECO.CCL.BL.ServicioTecnico.BandejaGarantias
{
    public class GarantiasBL
    {

        private GarantiasBD Repository;
        private CCLog Log;

        public GarantiasBL() : this(new GarantiasBD(), new CCLog())
        { }

        public GarantiasBL(GarantiasBD instalacionTecnicaBD, CCLog log)
        {
            Repository = instalacionTecnicaBD;
            Log = log;
        }

        public ResponseDTO<FiltroGarantiasDTO> ObtenerFiltrosGarantias()
        {
            try
            {
                var result = Repository.ObtenerFiltrosGarantias();
                return new ResponseDTO<FiltroGarantiasDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<FiltroGarantiasDTO>(ex);
            };
        }
        
        public ResponseDTO<RespuestaDTO> MantReclamo(ReclamosDTO reclamo)
        {
            try
            {
                var result = Repository.MantReclamo(reclamo);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex) 
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantTecnicosReclamo(TecnicoGarantiaDTO tecnico)
        {
            try
            {
                var result = Repository.MantTecnicosReclamo(tecnico);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError (Utilidades.GetCaller()+ "::"+ ex.Message);
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
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<ReclamosDTO>> ObtenerReclamos(FiltroReclamosDTO filtros)
        {
            try
            {
                var result = Repository.ObtenerReclamos(filtros);
                return new ResponseDTO<IEnumerable<ReclamosDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ReclamosDTO>>(ex);
            }
        }

        public ResponseDTO<GrupoReclamoDTO> ObtenerMainReclamo(long NumReclamo, long IdWorkFlow)
        {
            try
            {
                var result = Repository.ObtenerMainReclamo(NumReclamo, IdWorkFlow);
                return new ResponseDTO<GrupoReclamoDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<GrupoReclamoDTO>(ex);
            }
        }

        public ResponseDTO<GrupoGarantiasDTO> ObtenerDatosEquipo(string NumSerie)
        {
            try
            {
                var result = Repository.ObtenerDatosEquipo(NumSerie);
                return new ResponseDTO<GrupoGarantiasDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<GrupoGarantiasDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<TecnicoGarantiaDTO>> ObtenerTecnicosReclamo(long numReclamo)
        {
            try
            {
                var result = Repository.ObtenerTecnicosReclamo(numReclamo);
                return new ResponseDTO<IEnumerable<TecnicoGarantiaDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<TecnicoGarantiaDTO>>(ex);
            }
        }

    }
}
