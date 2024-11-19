using AHSECO.CCL.BD.ServicioTecnico.BandejaGarantias;
using System;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using System.Collections.Generic;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;

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
    }
}
