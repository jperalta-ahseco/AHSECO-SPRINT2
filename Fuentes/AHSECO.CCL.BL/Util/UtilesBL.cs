using AHSECO.CCL.BD.Util;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BL.Util
{
    public class UtilesBL
    {
        private UtilesBD Repository;
        private CCLog Log;

        public UtilesBL() : this(new UtilesBD(), new CCLog())
        {
        }

        public UtilesBL(UtilesBD utilesBD, CCLog log)
        {
            Repository = utilesBD;
            Log = log;
        }

        public ResponseDTO<int> ValidarParametros(FiltroValidadorDTO filtroValidadorDTO)
        {
            try
            {
                var result = Repository.ValidarParametros(filtroValidadorDTO);
                return new ResponseDTO<int>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<int>(ex);
            }
        }
    }
}
