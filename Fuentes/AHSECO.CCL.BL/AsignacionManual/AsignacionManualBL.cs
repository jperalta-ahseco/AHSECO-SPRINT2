using AHSECO.CCL.BD.AsignacionManual;
using AHSECO.CCL.BE.AsignacionManual;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BL.AsignacionManual
{
    public class AsignacionManualBL
    {
        private AsignacionManualBD Repository;
        private CCLog Log;
        public AsignacionManualBL() : this(new AsignacionManualBD(), new CCLog())
        {
        }
        public AsignacionManualBL(AsignacionManualBD asignacionTerritorialBD, CCLog log)
        {
            Repository = asignacionTerritorialBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<ClientevsAsesorDTO>>ObtenerListClientevsAsesor(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            try
            {
                var result = Repository.ObtenerListClientevsAsesor(clientevsAsesorDTO);
                return new ResponseDTO<IEnumerable<ClientevsAsesorDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ClientevsAsesorDTO>>(ex);
            }
        }

        public ResponseDTO<bool> Mantenimiento(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            try
            {
                var result = Repository.Mantenimiento(clientevsAsesorDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<bool>(ex);

            }
        }

        public ResponseDTO<IEnumerable<ClientevsAsesorDTO>> ObtenerListClientevsAsesorExcel(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            try
            {
                var result = Repository.ObtenerListClientevsAsesorExcel(clientevsAsesorDTO);
                return new ResponseDTO<IEnumerable<ClientevsAsesorDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ClientevsAsesorDTO>>(ex);
            }
        }
    }
}
