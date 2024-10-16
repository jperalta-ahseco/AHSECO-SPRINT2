using AHSECO.CCL.BD.Consulta;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BL.Consulta
{
    public class ConsultaStocksBL
    {
        private ConsultaStockBD Repository;
        private CCLog Log;

        public ConsultaStocksBL() : this(new ConsultaStockBD(), new CCLog())
        {
        }

        public ConsultaStocksBL(ConsultaStockBD consultaStockBD, CCLog log)
        {
            Repository = consultaStockBD;
            Log = log;
        }
        public ResponseDTO<IEnumerable<StockDTO>> ObtenerStock(StockDTO stockDTO)
        {
            try
            {
                var result = Repository.ObtenerStock(stockDTO);
                return new ResponseDTO<IEnumerable<StockDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<StockDTO>>(ex);
            }
        }
    }
}
