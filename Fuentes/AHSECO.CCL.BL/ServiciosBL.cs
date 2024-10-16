using AHSECO.CCL.BD;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL
{
    public class ServiciosBL
    {
        private ServicioBD Repository;

        private CCLog Log;
        public ServiciosBL()
            : this(new ServicioBD(), new CCLog())
        {
        }
        public ServiciosBL(ServicioBD servicioBD, CCLog log)
        {
            Repository = servicioBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<ServicioDTO>> ObtenerServicios(ServicioDTO servicioDTO)
        {
            try
            {
                var result = Repository.ObtenerServicios(servicioDTO);
                return new ResponseDTO<IEnumerable<ServicioDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ServicioDTO>>(ex);
            }
        }
     }
}
