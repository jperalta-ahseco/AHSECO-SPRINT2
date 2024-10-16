using AHSECO.CCL.BD.Util;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BL.Util
{
    public class UbigeoBL
    {
        private UbigeoBD Repository;
        private CCLog Log;

        public UbigeoBL() : this(new UbigeoBD(), new CCLog())
        {
        }

        public UbigeoBL(UbigeoBD ubigeoBD, CCLog log)
        {
            Repository = ubigeoBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<UbigeoDTO>> Obtener(UbigeoDTO ubigeoDTO)
        {
            try
            {
                var result = Repository.Obtener(ubigeoDTO);
                return new ResponseDTO<IEnumerable<UbigeoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<UbigeoDTO>>(ex);
            }
        }
    }
}
