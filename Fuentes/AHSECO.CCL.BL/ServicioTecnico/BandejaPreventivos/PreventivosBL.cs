using AHSECO.CCL.BD.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.BE;
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

    }
}
