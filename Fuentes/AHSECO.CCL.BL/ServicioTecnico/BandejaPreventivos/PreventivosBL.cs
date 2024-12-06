using AHSECO.CCL.BD.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL.ServicioTecnico.BandejaPreventivos
{
    public class PreventivosBL
    {

        private PreventivosBD Repository;

        private CCLog Log;

        public PreventivosBL()
            : this(new PreventivosBD(), new CCLog())
        {
        }

        public PreventivosBL(PreventivosBD preventivosBD, CCLog log)
        {
            Repository = preventivosBD;
            Log = log;
        }

        public ResponseDTO<FiltrosPreventivosDTO> ObtenerFiltrosPreventivos()
        {
            try
            {
                var result = Repository.ObtenerFiltrosPreventivos();
                return new ResponseDTO<FiltrosPreventivosDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + " :: "+ex.Message);
                return new ResponseDTO<FiltrosPreventivosDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<ResultPreventivoDTO>> ObtenerPreventivos(ReqPreventivoDTO req)
        {
            try
            {
                var result = Repository.ObtenerPreventivos(req);
                return new ResponseDTO<IEnumerable<ResultPreventivoDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ResultPreventivoDTO>>(ex);
            }
        }

        public ResponseDTO<GrupoPrevEquipoDTO> ObtenerMainMant(long NumMant)
        {
            try
            {
                var result = Repository.ObtenerMainMant(NumMant);
                return new ResponseDTO<GrupoPrevEquipoDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + " :: " + ex.Message);
                return new ResponseDTO<GrupoPrevEquipoDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantTecnicosPrev(TecnicoMantPreventivoDTO tecnico)
        {
            try
            {
                var result = Repository.MantTecnicosPrev(tecnico);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> MantPreventivos(ReqPreventivoDTO req)
        {
            try
            {
                var result = Repository.MantPreventivos(req);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<TecnicoMantPreventivoDTO>> ObtenerTecnicosPreventivos(long NumPreventivo)
        {
            try
            {
                var result = Repository.ObtenerTecnicosPreventivos(NumPreventivo);
                return new ResponseDTO<IEnumerable<TecnicoMantPreventivoDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<TecnicoMantPreventivoDTO>>(ex);
            }
        }
        public ResponseDTO<GrupoMantPreventivoDTO> ObtenerMainPreventivo(long NumPreventivo, long IdWorkFlow)
        {
            try
            {
                var result = Repository.ObtenerMainPreventivo(NumPreventivo, IdWorkFlow);
                return new ResponseDTO<GrupoMantPreventivoDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<GrupoMantPreventivoDTO>(ex);
            }
        }
    }
}
