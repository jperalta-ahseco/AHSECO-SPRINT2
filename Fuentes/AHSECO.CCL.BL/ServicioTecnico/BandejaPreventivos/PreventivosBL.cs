using AHSECO.CCL.BD.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.BE;
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

        public ResponseDTO<GrupoMantPreventivoDTO> ObtenerMainMant(long NumMant, long IdWorkFlow)
        {
            try
            {
                var result = Repository.ObtenerMainMant(NumMant, IdWorkFlow);
                return new ResponseDTO<GrupoMantPreventivoDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + " :: " + ex.Message);
                return new ResponseDTO<GrupoMantPreventivoDTO>(ex);
            }
        }
    }
}
