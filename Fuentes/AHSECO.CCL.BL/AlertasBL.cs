using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;

namespace AHSECO.CCL.BL
{
    public class AlertasBL
    {
        private AlertasBD Repository;

        private CCLog Log;
        public AlertasBL()
            : this(new AlertasBD(), new CCLog())
        {
        }
        public AlertasBL(AlertasBD alertasBD, CCLog log)
        {
            Repository = alertasBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<GarantiaResultDTO>> ObtenerGarantiasProximasVencer()
        {
            try
            {
                var result = Repository.ObtenerGarantiasProximasVencer();
                return new ResponseDTO<IEnumerable<GarantiaResultDTO>>(result);
            }
            catch (Exception ex) 
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<GarantiaResultDTO>>(ex);
            }  
        }

    }
}
