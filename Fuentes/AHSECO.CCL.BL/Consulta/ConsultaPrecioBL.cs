using AHSECO.CCL.BD.Consulta;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Filtros;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL.Consulta
{
    public class ConsultaPrecioBL
    {
        private ConsultaPreciosBD Repository;
        private CCLog Log;
        public ConsultaPrecioBL() :this(new ConsultaPreciosBD(),new CCLog())
        {
        }
        public ConsultaPrecioBL(ConsultaPreciosBD consultaPreciosBD,CCLog log)
        {
            Repository = consultaPreciosBD;
            Log=log;
        }
        public ResponseDTO<IEnumerable<PrecioDTO>> ObtenerPrecios(PrecioDTO precioDTO)
        {
            try
            {
                var result = Repository.ObtenerPrecios(precioDTO);
                return new ResponseDTO<IEnumerable<PrecioDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::"+ex.Message);
                return new ResponseDTO<IEnumerable<PrecioDTO>>(ex);
            }
        }

        public ResponseDTO<FiltroGrupoPreciosDTO> FiltrosPrecios()
        {
            try
            {
                var result = Repository.FiltrosPrecios();
                return new ResponseDTO<FiltroGrupoPreciosDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<FiltroGrupoPreciosDTO>(ex);
            }
        }
    }
}
