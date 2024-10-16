using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;

namespace AHSECO.CCL.BL
{
    public class ProcesosBL
    {
        private ProcesosBD Repository;

        private CCLog Log;
        public ProcesosBL()
            : this(new ProcesosBD(), new CCLog())
        {
        }
        public ProcesosBL(ProcesosBD procesosBD, CCLog log)
        {
            Repository = procesosBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<ProcesoEstadoDTO>> ListarEstadosxProceso(FiltroProcesoEstadoDTO filtroProcesoEstadoDTO)
        {
            try
            {
                var result = Repository.ListarEstadosxProceso(filtroProcesoEstadoDTO);
                return new ResponseDTO<IEnumerable<ProcesoEstadoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<ProcesoEstadoDTO>>(ex);
            }
        }

        public ResponseDTO<long> InsertarWorkflow(FiltroWorkflowDTO filtroWorkflowDTO)
        {
            try
            {
                var result = Repository.InsertarWorkflow(filtroWorkflowDTO);
                return new ResponseDTO<long>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<long>(ex);
            }
        }

        public ResponseDTO<long> InsertarWorkflowLog(FiltroWorkflowLogDTO filtroWorkflowLogDTO)
        {
            try
            {
                var result = Repository.InsertarWorkflowLog(filtroWorkflowLogDTO);
                return new ResponseDTO<long>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<long>(ex);
            }
        }

        public ResponseDTO<IEnumerable<WorkflowLogDTO>> ConsultaSeguimiento(FiltroWorkflowLogDTO filtroWorkflowLogDTO)
        {
            try
            {
                var result = Repository.ConsultaSeguimiento(filtroWorkflowLogDTO);
                return new ResponseDTO<IEnumerable<WorkflowLogDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<WorkflowLogDTO>>(ex);
            }
        }

        public ResponseDTO<IEnumerable<WorkFlowRolDTO>> ConsultaWorkFLowRoles(string usuario, int codProceso)
        {
            try
            {
                var result = Repository.ConsultaWorkFLowRoles(usuario,codProceso);
                return new ResponseDTO<IEnumerable<WorkFlowRolDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<WorkFlowRolDTO>>(ex);
            }
        }
    }
}
