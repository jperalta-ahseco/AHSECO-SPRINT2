using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;


namespace AHSECO.CCL.FRONTEND.Controllers.Procesos
{
    public class ProcesosController: Controller
    {
        [HttpPost]
        public JsonResult ListarEstadosxProceso(FiltroProcesoEstadoDTO filtroProcesoEstadoDTO)
        {
            var procesosBL = new ProcesosBL();
            var result = procesosBL.ListarEstadosxProceso(filtroProcesoEstadoDTO);
            return Json(result);
        }

        [HttpPost]
        public JsonResult InsertarWorkflow(FiltroWorkflowDTO filtroWorkflowDTO)
        {
            var procesosBL = new ProcesosBL();
            var result = procesosBL.InsertarWorkflow(filtroWorkflowDTO);
            return Json(result);
        }

        [HttpPost]
        public JsonResult InsertarWorkflowLog(FiltroWorkflowLogDTO filtroWorkflowLogDTO)
        {
            var procesosBL = new ProcesosBL();
            var result = procesosBL.InsertarWorkflowLog(filtroWorkflowLogDTO);
            return Json(result);
        }

        [HttpPost]
        public JsonResult ListarEstadosxProcesoCombo(FiltroProcesoEstadoDTO filtroProcesoEstadoDTO)
        {
            var procesosBL = new ProcesosBL();
            var result = procesosBL.ListarEstadosxProceso(filtroProcesoEstadoDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.CodigoEstado,
                    Text = i.AbreviaturaEstado
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ConsultaSeguimiento(FiltroWorkflowLogDTO filtroWorkflowLogDTO)
        {
            var procesosBL = new ProcesosBL();
            var result = procesosBL.ConsultaSeguimiento(filtroWorkflowLogDTO);
            return Json(result);
        }

        [HttpPost]
        public JsonResult ConsultaWorkFLowRoles(string usuario, int codProceso)
        {
            var procesosBL = new ProcesosBL();
            var result = procesosBL.ConsultaWorkFLowRoles(usuario, codProceso);
            return Json(result);
        }

    }
}